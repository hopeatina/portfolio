#!/usr/bin/env node
// LEARNING ROUTINE — fold post performance back into the playbook.
//   1. attach metrics to experiments (Buffer API if token; + state/metrics-inbox.jsonl)
//   2. compute a success signal vs the running baseline
//   3. nudge the bandit Beta weights per pillar / hook_type / topic (idempotent per experiment)
//   4. write reports/learn-<date>.md with what's winning + what to do next
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { loadPlaybook, savePlaybook, updateDim, sampleBeta } from '../lib/playbook.mjs';
import { readExperiments, patchExperiment } from '../lib/experiments.mjs';
import { fetchRecentPosts, normalizeMetrics, hasToken } from '../lib/buffer.mjs';
import { paths, readJson, writeJson, localDate, nowIso, log, ensureDir } from '../lib/util.mjs';

const cfg = readJson(paths.config, {});
const pb = loadPlaybook();
const date = localDate(cfg.cadence?.timezone || 'America/Chicago');
const lookbackDays = cfg.learning?.lookbackDays || 30;

// ---------- 1. gather metrics ----------
// a) Buffer API -> match to experiments by (date, service)
let apiAttached = 0;
if (hasToken()) {
  try {
    const posts = await fetchRecentPosts({ organizationId: cfg.publish.bufferOrganizationId, first: 60 });
    const exps = readExperiments();
    for (const post of posts) {
      const m = normalizeMetrics(post.metrics || []);
      if (!(m.impressions || m.interactions)) continue;
      const pd = (post.sentAt || post.dueAt || '').slice(0, 10);
      const match = exps.find((e) => e.date === pd && e.service === post.channelService && !e.metrics);
      if (match) { patchExperiment(match.id, { metrics: { ...m, buffer_post_id: post.id } }); apiAttached++; }
    }
    log.ok(`Buffer API: attached metrics to ${apiAttached} experiment(s)`);
  } catch (e) {
    log.warn(`Buffer API metrics unavailable: ${e.message || e}`);
  }
} else {
  log.info('No BUFFER_ACCESS_TOKEN — using metrics-inbox only.');
}

// b) metrics-inbox.jsonl (populated via the Buffer MCP path or by hand): {id|date, service, ...metrics}
const inboxPath = join(paths.state, 'metrics-inbox.jsonl');
if (existsSync(inboxPath)) {
  const rows = readFileSync(inboxPath, 'utf8').split('\n').filter(Boolean)
    .map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
  const exps = readExperiments();
  let inboxAttached = 0;
  for (const row of rows) {
    const match = row.id ? exps.find((e) => e.id === row.id)
      : exps.find((e) => e.date === row.date && e.service === (row.service || e.service) && !e.metrics);
    if (match && !match.metrics) {
      const m = row.metrics || normalizeMetrics(row.metricsList || []);
      patchExperiment(match.id, { metrics: m });
      inboxAttached++;
    }
  }
  if (inboxAttached) log.ok(`metrics-inbox: attached metrics to ${inboxAttached} experiment(s)`);
}

// ---------- 2 + 3. compute success + update bandit (idempotent) ----------
const all = readExperiments();
const withMetrics = all.filter((e) => e.metrics && (e.metrics.impressions || e.metrics.interactions || e.metrics.engagementRate));
const signals = withMetrics.map((e) => e.metrics.engagementRate || 0).filter((x) => x > 0).sort((a, b) => a - b);
const baseline = signals.length ? signals[Math.floor(signals.length / 2)] : (pb.bandit.baseline || 0);
const scale = Math.max(baseline * 0.75, 0.005);

const unlearned = withMetrics.filter((e) => !e.learned);
let folded = 0;
for (const e of unlearned) {
  const er = e.metrics.engagementRate || 0;
  const z = (er - baseline) / scale;
  const success = Math.min(0.98, Math.max(0.02, 1 / (1 + Math.exp(-z))));
  updateDim(pb, 'pillar', e.pillar, success, er);
  updateDim(pb, 'hook_type', e.hook_type, success, er);
  for (const t of (e.topic_tags || [])) updateDim(pb, 'topic', t, success, er);
  patchExperiment(e.id, { success: +success.toFixed(3), learned: true });
  folded++;
}
pb.bandit.baseline = baseline;
pb.bandit.updated = nowIso();
if (folded) savePlaybook(pb);

// ---------- 4. report ----------
function rankDim(dim) {
  const m = pb.bandit.dims[dim] || {};
  return Object.entries(m)
    .map(([k, c]) => ({
      value: k, posts: c.posts || 0,
      mean: c.alpha / (c.alpha + c.beta),
      avgSignal: c.posts ? c.signalSum / c.posts : 0,
      sampled: sampleBeta(c.alpha, c.beta),
    }))
    .sort((a, b) => b.mean - a.mean);
}
const table = (rows) => rows.length
  ? rows.map((r) => `| ${r.value} | ${r.posts} | ${(r.mean * 100).toFixed(0)}% | ${(r.avgSignal * 100).toFixed(2)}% |`).join('\n')
  : '| _(no data yet)_ | | | |';

const pillars = rankDim('pillar');
const hooks = rankDim('hook_type').slice(0, 8);
const topics = rankDim('topic').slice(0, 10);
const nextPillar = [...pillars].sort((a, b) => b.sampled - a.sampled)[0];
const ready = pb.concepts.filter((c) => c.status === 'ready').length;

let body;
if (withMetrics.length < (cfg.learning?.minPostsForBaseline || 4)) {
  body = `## Status: warming up (${withMetrics.length} post(s) with metrics)

The loop is wired and waiting on data. To start learning:
1. Connect **TikTok** as a Buffer channel (free plan is at its 3-channel cap — free a slot or upgrade).
2. Approve the queued **Ideas** in Buffer so they actually publish.
3. Metrics lag ~24h; the learner will fold them in on its next run.

**Experiments logged:** ${all.length} • **rendered/queued but no metrics yet:** ${all.length - withMetrics.length}
**Seed concepts still unused:** ${ready}/${pb.concepts.length}
`;
} else {
  body = `## What's working (baseline engagement ${(baseline * 100).toFixed(2)}%)

Folded **${folded}** new result(s) this run • **${withMetrics.length}** posts measured total.

### Pillars
| pillar | posts | win-rate | avg engagement |
|---|---|---|---|
${table(pillars)}

### Hook types (top)
| hook_type | posts | win-rate | avg engagement |
|---|---|---|---|
${table(hooks)}

### Topics (top)
| topic | posts | win-rate | avg engagement |
|---|---|---|---|
${table(topics)}

### Recommendations
- **Lean into:** ${pillars.slice(0, 2).map((p) => p.value).join(', ')} (highest win-rate).
- **Next concept should explore:** \`${nextPillar?.value || 'contrarian'}\` (Thompson pick — best upside right now).
- **Reconsider:** ${pillars.slice(-1).map((p) => p.value).join(', ') || '—'} (lowest so far — needs a stronger hook or retire).
- **Seed concepts still unused:** ${ready}/${pb.concepts.length}${ready === 0 ? ' — bank exhausted; enable `--author` (LLM) or add concepts.' : ''}
`;
}

const report = `# OrgX carousel learning report — ${date}

_generated ${nowIso()} • lookback ${lookbackDays}d • metric: ${cfg.learning?.successMetric || 'engagement_rate'}_

${body}
`;
ensureDir(paths.reports);
writeJson(join(paths.reports, `_meta-${date}.json`), { date, folded, measured: withMetrics.length, baseline, nextPillar: nextPillar?.value });
const fs = await import('node:fs');
fs.writeFileSync(join(paths.reports, `learn-${date}.md`), report);
fs.writeFileSync(join(paths.reports, 'latest.md'), report);
log.ok(`report -> reports/learn-${date}.md  (folded ${folded}, measured ${withMetrics.length})`);
console.log('\n' + report);
