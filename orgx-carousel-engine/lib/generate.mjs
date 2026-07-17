// Maps a vetted concept -> a render-ready carousel spec, and assembles the post caption.
import { getHashtags } from './playbook.mjs';
import { PILLAR_ACCENT } from './theme.mjs';
import { hasIcon } from './icons.mjs';

const PILLAR_LABEL = {
  contrarian: 'Hot take', 'build-in-public': 'Building OrgX', teardown: 'How it works',
  pain: 'The problem', framework: 'Mental model',
};

// concept slide.accent (lime/teal/amber/iris/danger) -> a kit SIGNAL key.
const ACCENT_TO_SIGNAL = { lime: 'lime', teal: 'cyan', amber: 'sun', iris: 'purple', danger: 'danger', cyan: 'cyan', green: 'green', sun: 'sun', purple: 'purple' };

export function pillarSignal(pillarKey) {
  return PILLAR_ACCENT[pillarKey] || 'cyan';
}

// Infer a concrete supporting visual (real OrgX icon + optional receipts-flow) from slide content.
function inferVisual(slide, concept) {
  const t = `${slide.headline} ${slide.kicker || ''} ${slide.subtext || ''} ${(concept.topic_tags || []).join(' ')}`.toLowerCase();
  const match = (pairs, fb) => { for (const [re, v] of pairs) if (re.test(t)) return v; return fb; };
  const iconName = match([
    [/hand ?off|changes hands|hand between|transcript|paste|context.?pack|packet/, 'artifact'],
    [/decision|decide|gate|escalat|consequence|approv|oversight|reversible/, 'decision'],
    [/receipt|provenance|proof|said .?done|not proof|a vibe/, 'proof'],
    [/quality bar|threshold|loops back|owner-authored|bar\b/, 'shield-check'],
    [/\bloop\b|7.?step|step loop|goal.*plan.*work|continuity/, 'refresh'],
    [/memory|remember|forgot|forget|amnesia/, 'refresh'],
    [/work graph|\borg\b|graph|initiativ|fleet|multi.?agent/, 'users'],
    [/signal|detect|notice|see /, 'signal'],
    [/outcome|result|ship|moving|keeps moving/, 'outcome'],
    [/prompt|primitive|\bchat\b/, 'terminal'],
    [/agent/, 'users'],
  ], 'signal');
  let flow = false;
  if (slide.role === 'proof' || slide.role === 'turn') {
    flow = /receipt|proof|signal.*decision|artifact.*proof|the loop|goal.*plan.*work.*decision|decision.*artifact.*proof/.test(t);
  }
  return { icon: hasIcon(iconName) ? iconName : 'signal', flow };
}

// Which step of SIGNAL→DECISION→ARTIFACT→PROOF→OUTCOME a slide is actually about.
function flowStep(slide) {
  const t = `${slide.headline} ${slide.kicker || ''} ${slide.subtext || ''}`.toLowerCase();
  if (/outcome|ship|keeps moving|result/.test(t)) return 4;
  if (/proof|receipt|provenance|evidence|review state/.test(t)) return 3;
  if (/artifact|work below|quality bar|output/.test(t)) return 2;
  if (/decision|decide|escalat|approv|gate/.test(t)) return 1;
  if (/signal|notice|detect/.test(t)) return 0;
  return 3;
}

function listLike(text = '') {
  const seps = (text.match(/ · | \| | — /g) || []).length;
  return seps >= 2 ? text.split(/ · | \| | — /).map((s) => s.trim()).filter(Boolean) : null;
}

function enrichSlide(s, concept, pillarSig) {
  const accentSignal = ACCENT_TO_SIGNAL[s.accent] || pillarSig;
  const out = { role: s.role, kicker: s.kicker || '', headline: s.headline, subtext: s.subtext || '', accentSignal };
  out.visual = inferVisual(s, concept);
  if ((s.role === 'proof' || s.role === 'turn') && !s.items && !out.visual.flow) {
    const items = listLike(s.subtext);
    if (items && items.length >= 3) { out.items = items; out.subtext = ''; }
  }
  if (s.items) out.items = s.items;
  if (s.readout) out.readout = s.readout;
  return out;
}

export function conceptToCarousel(pb, concept) {
  const product = (pb.meta && pb.meta.product) || { handle: '@useorgx', url: 'useorgx.com' };
  const pillarSig = pillarSignal(concept.pillar);
  const slides = concept.slides.map((s) => enrichSlide(s, concept, pillarSig));

  // The flow rail is a motif, not wallpaper: it appears ONCE per carousel, on the
  // slide that introduces the sequence (prefer the turn), with the lit step
  // inferred from that slide's content.
  const flowIdxs = slides.map((s, i) => (s.visual?.flow ? i : -1)).filter((i) => i >= 0);
  if (flowIdxs.length) {
    const keep = flowIdxs.find((i) => slides[i].role === 'turn') ?? flowIdxs[0];
    for (const i of flowIdxs) {
      if (i === keep) {
        slides[i].visual.flowStep = flowStep(slides[i]);
        // the rail and a long subtext compete for the lower zone — keep the rail
        if (slides[i].subtext && slides[i].subtext.length >= 60) slides[i].subtext = '';
      } else {
        slides[i].visual.flow = false;
      }
    }
  }

  return {
    id: concept.id,
    pillar: concept.pillar,
    pillarLabel: PILLAR_LABEL[concept.pillar] || 'OrgX',
    handle: product.handle,
    url: product.url,
    slides,
  };
}

export function buildCaption(pb, concept) {
  const hashtags = (concept.hashtags && concept.hashtags.length)
    ? concept.hashtags.map((h) => (h.startsWith('#') ? h : '#' + h.replace(/[^a-z0-9]/gi, ''))).slice(0, 8)
    : getHashtags(pb, concept.topic_tags, 6);
  const body = (concept.caption || '').trim();
  const text = `${body}\n\n${hashtags.join(' ')}`.trim();
  return { text, body, hashtags, firstComment: hashtags.join(' ') };
}
