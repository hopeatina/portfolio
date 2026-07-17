// The evolving brain. Loads playbook.json, selects the day's concept via Thompson
// sampling over learned dimension weights, and exposes the update primitives the learner uses.
import { paths, readJson, writeJson, nowIso } from './util.mjs';

export function loadPlaybook() {
  const pb = readJson(paths.playbook);
  if (!pb) throw new Error(`playbook.json not found at ${paths.playbook}`);
  return pb;
}

export function savePlaybook(pb) {
  pb.meta = pb.meta || {};
  pb.meta.updated = nowIso();
  writeJson(paths.playbook, pb);
}

// --- Beta / Gamma sampling (Thompson) ---
function sampleGamma(shape) {
  // Marsaglia-Tsang; shape >= 1 (our alpha/beta start at 1 and only grow).
  const d = shape - 1 / 3;
  const c = 1 / Math.sqrt(9 * d);
  for (;;) {
    let x, v;
    do {
      const u1 = Math.random(), u2 = Math.random();
      x = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2); // standard normal
      v = 1 + c * x;
    } while (v <= 0);
    v = v * v * v;
    const u = Math.random();
    if (u < 1 - 0.0331 * x * x * x * x) return d * v;
    if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) return d * v;
  }
}
export function sampleBeta(a = 1, b = 1) {
  const x = sampleGamma(Math.max(1, a));
  const y = sampleGamma(Math.max(1, b));
  return x / (x + y);
}

function dimWeight(bandit, dim, value) {
  const m = bandit?.dims?.[dim];
  const cell = (m && m[value]) || { alpha: 1, beta: 1 };
  return sampleBeta(cell.alpha, cell.beta);
}

// Score a concept: quality prior x sampled dim weights x novelty. Randomness = Thompson exploration.
export function scoreConcept(pb, c, cfg) {
  const bandit = pb.bandit;
  const base = ((c.review && c.review.overall) || 6) / 10; // 0..1 quality prior
  const wPillar = dimWeight(bandit, 'pillar', c.pillar);
  const wHook = dimWeight(bandit, 'hook_type', c.hook_type);
  const topics = (c.topic_tags && c.topic_tags.length) ? c.topic_tags : ['_none'];
  const wTopic = topics.reduce((s, t) => s + dimWeight(bandit, 'topic', t), 0) / topics.length;
  const noveltyBoost = (cfg?.selection?.noveltyBoost) ?? 1.6;
  const novelty = c.uses > 0 ? 1 / (1 + c.uses) : noveltyBoost;
  return base * wPillar * wHook * wTopic * novelty;
}

// Pick the day's concept. Prefers unused ('ready'); recycles least-used if the bank is exhausted.
export function selectConcept(pb, cfg = {}) {
  const ready = pb.concepts.filter((c) => c.status === 'ready');
  const pool = ready.length ? ready
    : [...pb.concepts].sort((a, b) => (a.uses - b.uses) || ((a.last_used || '') < (b.last_used || '') ? -1 : 1)).slice(0, 6);
  let best = null, bestScore = -Infinity, scored = [];
  for (const c of pool) {
    const s = scoreConcept(pb, c, cfg);
    scored.push({ id: c.id, pillar: c.pillar, hook_type: c.hook_type, score: +s.toFixed(4) });
    if (s > bestScore) { bestScore = s; best = c; }
  }
  scored.sort((a, b) => b.score - a.score);
  return { concept: best, scored, recycled: ready.length === 0 };
}

export function markConceptUsed(pb, id, dateStr) {
  const c = pb.concepts.find((x) => x.id === id);
  if (!c) return;
  c.uses = (c.uses || 0) + 1;
  c.last_used = dateStr;
  c.status = 'used';
}

// --- learner update primitives ---
function ensureCell(bandit, dim, value) {
  bandit.dims[dim] = bandit.dims[dim] || {};
  if (!bandit.dims[dim][value]) bandit.dims[dim][value] = { alpha: 1, beta: 1, posts: 0, wins: 0, signalSum: 0 };
  return bandit.dims[dim][value];
}

// success in [0,1]; fractional Beta update. Records raw signal for baseline tracking.
export function updateDim(pb, dim, value, success, rawSignal = 0) {
  if (value == null) return;
  const cell = ensureCell(pb.bandit, dim, value);
  cell.alpha += success;
  cell.beta += 1 - success;
  cell.posts += 1;
  if (success >= 0.5) cell.wins += 1;
  cell.signalSum += rawSignal;
}

export function getCta(pb) {
  const bank = pb.cta_bank || [];
  return bank.length ? bank[Math.floor(Math.random() * bank.length)] : 'more at useorgx.com';
}

export function getHashtags(pb, topicTags = [], n = 6) {
  const base = pb.hashtag_sets || [];
  const norm = (h) => (h.startsWith('#') ? h : '#' + h.replace(/^#/, ''));
  const picks = new Set(topicTags.map((t) => norm(t.replace(/[^a-z0-9]/gi, ''))).filter((h) => h.length > 2));
  const shuffled = [...base].sort(() => Math.random() - 0.5);
  for (const h of shuffled) { if (picks.size >= n) break; picks.add(norm(h)); }
  return [...picks].slice(0, n);
}
