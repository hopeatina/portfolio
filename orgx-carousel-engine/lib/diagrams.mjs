// OrgX schematic diagrams — the "make the abstract concrete" layer for proof/turn slides.
// Horizontal SVGs (~viewBox 0 0 920 xxx) placed in a slide panel. Accent = currentColor.
// Mono labels use the page's embedded JetBrainsMonoOX. Restrained: one idea, clearly drawn.

const A = 'stroke="currentColor"';
const white = 'rgba(248,250,252,0.92)';
const muted = 'rgba(248,250,252,0.45)';
const faint = 'rgba(248,250,252,0.16)';
const mono = "font-family='JetBrainsMonoOX,monospace'";

function wrap(vb, inner) {
  return `<svg class="dgm" viewBox="0 0 ${vb}" width="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${inner}</svg>`;
}

// before/after: messy transcript -> compiled context pack
export function compile() {
  const rows = ['goal', 'done', 'decisions +why', 'next action'];
  const packet = rows.map((r, i) =>
    `<line x1="612" y1="${118 + i * 46}" x2="632" y2="${118 + i * 46}" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>` +
    `<text x="648" y="${125 + i * 46}" ${mono} font-size="26" fill="${white}">${r}</text>`).join('');
  return wrap('920 340', `
    <g ${A} fill="none" stroke-width="3" stroke-linecap="round">
      <rect x="40" y="80" width="250" height="200" rx="14" stroke="${faint}"/>
      ${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M70 ${112 + i * 28} q40 -10 80 0 t80 0" stroke="${muted}" opacity="0.7"/>`).join('')}
      <text x="40" y="66" ${mono} font-size="24" fill="${muted}">transcript</text>

      <path d="M320 180 H430" stroke="currentColor" stroke-width="4"/>
      <path d="M414 168 430 180 414 192" stroke="currentColor" stroke-width="4"/>
      <text x="330" y="164" ${mono} font-size="24" fill="currentColor">compile</text>

      <rect x="560" y="80" width="320" height="200" rx="14" stroke="currentColor"/>
      <text x="560" y="66" ${mono} font-size="24" fill="currentColor">context.pack</text>
      ${packet}
    </g>`);
}

// consequence-based escalation ladder
export function escalation() {
  const tiers = [
    { y: 40, w: 300, label: 'reversible', act: '→ let it run', o: 1 },
    { y: 120, w: 470, label: 'ambiguous', act: '→ ask the owner', o: 0.85 },
    { y: 200, w: 640, label: 'irreversible', act: '→ gate it', o: 0.7 },
  ];
  const rows = tiers.map((t) => `
    <rect x="40" y="${t.y}" width="${t.w}" height="60" rx="10" fill="rgba(255,255,255,0.03)" stroke="currentColor" stroke-width="3" opacity="${t.o}"/>
    <text x="64" y="${t.y + 38}" ${mono} font-size="27" fill="${white}">${t.label}</text>
    <text x="${t.w - 150}" y="${t.y + 38}" ${mono} font-size="27" fill="currentColor">${t.act}</text>`).join('');
  return wrap('920 290', `<g>${rows}<text x="720" y="40" ${mono} font-size="23" fill="${muted}">consequence ↑</text></g>`);
}

// the 7-step loop most agents run only part of
export function loop() {
  const steps = ['goal', 'plan', 'work', 'decision', 'artifact', 'proof', 'next'];
  const n = steps.length;
  const nodes = steps.map((s, i) => {
    const x = 70 + i * 130;
    const done = i < 4;
    return `<circle cx="${x}" cy="120" r="16" fill="rgba(255,255,255,0.04)" stroke="currentColor" stroke-width="3" opacity="${done ? 1 : 0.5}"/>
      <text x="${x}" y="176" ${mono} font-size="22" fill="${done ? white : muted}" text-anchor="middle">${s}</text>` +
      (i < n - 1 ? `<path d="M${x + 20} 120 H${x + 110}" stroke="currentColor" stroke-width="3" opacity="${i < 3 ? 1 : 0.45}" ${i >= 3 ? 'stroke-dasharray="6 8"' : ''}/><path d="M${x + 104} 114 ${x + 112} 120 ${x + 104} 126" fill="none" stroke="currentColor" stroke-width="3" opacity="${i < 3 ? 1 : 0.45}"/>` : '');
  }).join('');
  return wrap('920 210', `<g>${nodes}<text x="40" y="44" ${mono} font-size="22" fill="${muted}">most agents stop at 4 →</text></g>`);
}

// context dying at 5 specific boundaries
export function fiveDoors() {
  const doors = ['client', 'repo', 'agent', 'session', 'memory'];
  const items = doors.map((d, i) => {
    const x = 60 + i * 172;
    const alive = 1 - i * 0.2;
    return `<line x1="${x}" y1="60" x2="${x}" y2="200" stroke="currentColor" stroke-width="3" opacity="0.8"/>
      <line x1="${x + 96}" y1="60" x2="${x + 96}" y2="200" stroke="currentColor" stroke-width="3" opacity="0.8"/>
      <circle cx="${x + 48}" cy="130" r="${9 + alive * 6}" fill="currentColor" opacity="${Math.max(0.12, alive)}"/>
      <text x="${x + 48}" y="238" ${mono} font-size="22" fill="${muted}" text-anchor="middle">${d}</text>`;
  }).join('');
  return wrap('920 270', `<g>${items}<text x="60" y="40" ${mono} font-size="22" fill="${muted}">context</text><text x="820" y="40" ${mono} font-size="22" fill="currentColor" text-anchor="end">gone</text></g>`);
}

// quality bar — pass rides above, sub-threshold loops back
export function qualityGate() {
  return wrap('920 260', `
    <g fill="none" stroke-width="3" stroke-linecap="round">
      <line x1="40" y1="130" x2="880" y2="130" stroke="currentColor" stroke-width="4"/>
      <text x="40" y="112" ${mono} font-size="22" fill="currentColor">quality bar</text>
      <circle cx="200" cy="78" r="14" stroke="currentColor" fill="rgba(255,255,255,0.04)"/><text x="228" y="86" ${mono} font-size="24" fill="${white}">ships</text>
      <circle cx="520" cy="70" r="14" stroke="currentColor" fill="rgba(255,255,255,0.04)"/><text x="548" y="78" ${mono} font-size="24" fill="${white}">ships</text>
      <circle cx="380" cy="190" r="14" stroke="${muted}" fill="none"/><text x="408" y="198" ${mono} font-size="24" fill="${muted}">loops back</text>
      <path d="M380 176 q-40 -46 0 -46" stroke="${muted}" stroke-dasharray="5 7"/><path d="M374 136 380 128 388 134" stroke="${muted}"/>
    </g>`);
}

export const DIAGRAMS = { compile, escalation, loop, fiveDoors, qualityGate };
export function diagram(name) {
  const fn = DIAGRAMS[name];
  return fn ? fn() : '';
}
export function hasDiagram(name) {
  return !!DIAGRAMS[name];
}
