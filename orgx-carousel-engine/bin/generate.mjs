#!/usr/bin/env node
// DAILY STEP 1 — select the day's concept, render slides, log the experiment.
// Does NOT touch the network. (Posting happens in queue.mjs, after the PNGs are committed.)
//
// Usage:
//   node bin/generate.mjs                 # bandit-select + render + log
//   node bin/generate.mjs --author        # try LLM-authored fresh concept first (needs ANTHROPIC_API_KEY)
//   node bin/generate.mjs --concept <id>  # force a specific concept
//   node bin/generate.mjs --dry-run       # render only; no playbook/experiment writes
import { join } from 'node:path';
import { loadPlaybook, savePlaybook, selectConcept, markConceptUsed } from '../lib/playbook.mjs';
import { conceptToCarousel, buildCaption } from '../lib/generate.mjs';
import { renderCarousel } from '../lib/render.mjs';
import { appendExperiment } from '../lib/experiments.mjs';
import { authorFreshConcept } from '../lib/llm.mjs';
import { hostedUrls } from '../lib/host.mjs';
import { paths, readJson, writeJson, localDate, log, nowIso } from '../lib/util.mjs';

const has = (f) => process.argv.includes(`--${f}`);
const val = (f) => { const i = process.argv.indexOf(`--${f}`); return i >= 0 ? process.argv[i + 1] : null; };

const cfg = readJson(paths.config, {});
const pb = loadPlaybook();
const dryRun = has('dry-run');
const date = val('date') || localDate(cfg.cadence?.timezone || 'America/Chicago');

// --- pick the concept ---
let concept, why;
const forceId = val('concept');
if (forceId) {
  concept = pb.concepts.find((c) => c.id === forceId);
  why = `forced --concept ${forceId}`;
} else if (has('author') || cfg.llm?.enabled) {
  const sel = selectConcept(pb, cfg); // use bandit to pick which pillar is hot
  const fresh = await authorFreshConcept(pb, { pillar: sel.concept?.pillar, model: cfg.llm?.model });
  if (fresh) {
    concept = fresh;
    if (!dryRun) { pb.concepts.push({ ...fresh, created: nowIso() }); }
    why = `LLM-authored (pillar ${fresh.pillar})`;
  } else {
    concept = sel.concept; why = `bandit (LLM unavailable) — top ${sel.scored.slice(0, 3).map((s) => s.id).join(', ')}`;
  }
} else {
  const sel = selectConcept(pb, cfg);
  concept = sel.concept;
  why = `${sel.recycled ? 'recycled ' : ''}bandit — top: ${sel.scored.slice(0, 3).map((s) => `${s.id}(${s.score})`).join('  ')}`;
}
if (!concept) { log.err('no concept available'); process.exit(1); }

log.step(`date ${date}  •  concept ${concept.id}  [${concept.pillar} / ${concept.hook_type}]`);
log.info(why);

// --- render ---
const carousel = conceptToCarousel(pb, concept);
const caption = buildCaption(pb, concept);
const outDir = join(paths.posted, date);
const rendered = await renderCarousel(carousel, { outDir, scale: cfg.render?.scale || 2 });
const files = rendered.map((r) => r.path.split('/').pop());
const image_urls = hostedUrls(cfg, date, files);
log.ok(`rendered ${rendered.length} slides -> posted/${date}/`);

// --- experiment record + review bundle ---
const exp = {
  id: `${date}-${concept.id}`,
  date,
  service: (cfg.publish?.services || ['tiktok'])[0],
  concept_id: concept.id,
  pillar: concept.pillar,
  hook_type: concept.hook_type,
  slide_count: carousel.slides.length,
  topic_tags: concept.topic_tags || [],
  title: concept.title || concept.id,
  hook: carousel.slides[0].headline,
  hypothesis: concept.hypothesis || '',
  caption: caption.text,
  hashtags: caption.hashtags,
  image_files: files,
  image_urls,
  status: 'rendered',
  buffer_idea_id: null,
  metrics: null,
  success: null,
  created: nowIso(),
};

writeJson(join(outDir, 'bundle.json'), { experiment: exp, carousel, caption });

if (!dryRun) {
  markConceptUsed(pb, concept.id, date);
  savePlaybook(pb);
  appendExperiment(exp);
  log.ok(`logged experiment ${exp.id} (status: rendered)`);
} else {
  log.warn('dry-run: no playbook / experiment writes');
}

console.log(`\n--- caption ---\n${caption.text}\n---------------`);
console.log(`\nnext: commit posted/${date}/ then run  node bin/queue.mjs --date ${date}`);
