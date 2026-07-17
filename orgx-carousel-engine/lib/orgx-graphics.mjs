// Authentic OrgX visual vocabulary, ported verbatim from the product repo:
//   ~/Code/orgx/orgx/components/graphics/icons/{AgentGlyphs,RadialBurst}.tsx
// Static SVG generators (no React) for use on carousel slides.
import { ACCENTS } from './theme.mjs';

const rgb = (name) => `rgb(${ACCENTS[name] || ACCENTS.teal})`;

// --- Real OrgX agent glyphs (24x24 filled paths) + their spectrum colors ---
export const AGENT_GLYPHS = {
  product: { color: 'lime', path: 'M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm2 15H10v-1h4v1zm0-2H10v-1h4v1zm1.5-4.5L14 12h-4l-1.5-1.5V9.5L10 8h4l1.5 1.5v1z' },
  engineering: { color: 'cyan', path: 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z' },
  marketing: { color: 'pink', path: 'M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zm4.4-12.01c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z' },
  sales: { color: 'lemon', path: 'M12.22 19.85c-.18.18-.5.21-.71 0L3 11.34V7l8.5 8.5 3.5-3.5L12 9l1.41-1.41L17 11.17V15l-4.78 4.85zM21 7v4.34l-8.51 8.51c-.18.18-.5.21-.71 0l-.71-.71 4.93-4.93L21 9.28V7h-4l-5 5-1.41-1.41L15.17 6H21z' },
  operations: { color: 'iris', path: 'M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z' },
  design: { color: 'purple', path: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' },
  orchestrator: { color: 'teal', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z' },
};

// Named OrgX agents -> glyph type (Pace/Eli/Mark/Sage/Orion/Dana/Xandy).
export const AGENT_NAMES = {
  pace: 'product', eli: 'engineering', mark: 'marketing', sage: 'sales',
  orion: 'operations', dana: 'design', xandy: 'orchestrator',
};

// Filled agent glyph with the OrgX gradient (color -> color99) + soft glow. viewBox 24.
export function agentGlyph(type, { size = 120, colorName } = {}) {
  const g = AGENT_GLYPHS[type] || AGENT_GLYPHS.orchestrator;
  const c = rgb(colorName || g.color);
  const id = `ag-${type}`;
  return `<svg class="ic" width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c}"/><stop offset="1" stop-color="${c}" stop-opacity="0.6"/></linearGradient></defs>
    <path d="${g.path}" fill="${c}" opacity="0.28" style="filter:blur(3px)"/>
    <path d="${g.path}" fill="url(#${id})"/>
  </svg>`;
}

// Static recreation of RadialBurst — 12 alternating rays, gradient -> teal, center dot.
export function radialBurst({ size = 460, colorName = 'teal', rays = 12, opacity = 0.5 } = {}) {
  const c = rgb(colorName);
  const center = size / 2;
  const outer = center * 0.9;
  const inner = outer * 0.3;
  const id = `rb-${colorName}`;
  let lines = '';
  for (let i = 0; i < rays; i++) {
    const a = (i * (Math.PI * 2)) / rays - Math.PI / 2;
    const long = i % 2 === 0;
    const or = long ? outer : outer * 0.7;
    const x1 = center + Math.cos(a) * inner, y1 = center + Math.sin(a) * inner;
    const x2 = center + Math.cos(a) * or, y2 = center + Math.sin(a) * or;
    lines += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="url(#${id})" stroke-width="2.5" stroke-linecap="round"/>`;
  }
  return `<svg class="burst" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="opacity:${opacity}" aria-hidden="true">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c}"/><stop offset="1" stop-color="${rgb('teal')}"/></linearGradient></defs>
    <g style="filter:blur(1px)">${lines}</g>
    <circle cx="${center}" cy="${center}" r="${(inner * 0.4).toFixed(1)}" fill="${c}"/>
  </svg>`;
}

// The "decisions on rails" motif (from app/launch/opengraph-image.tsx): labeled horizontal rails.
export function rails(items = [], { accentName = 'teal', width = 900 } = {}) {
  const tone = (t) => (t === 'gold' ? rgb('lemon') : t === 'warm' ? rgb('amber') : rgb(accentName));
  const rows = items.map((it, i) => {
    const y = i * 46;
    return `<text x="0" y="${y + 20}" font-family="JetBrainsMonoOX,monospace" font-size="21" letter-spacing="3" fill="rgba(242,247,255,0.55)">${it.label.toUpperCase()}</text>
      <rect x="220" y="${y + 12}" width="${width - 220}" height="2.5" rx="2" fill="${tone(it.tone)}" opacity="0.85"/>`;
  }).join('');
  const h = items.length * 46;
  return `<svg class="rails" width="100%" viewBox="0 0 ${width} ${h}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${rows}</svg>`;
}
