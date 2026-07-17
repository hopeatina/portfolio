// OrgX brand theme for carousels — mirrors the real share-card kit at
// ~/Code/orgx/orgx/app/work-graph/[token]/opengraph-image.tsx + orgx-brand-pack.json.
// Discipline (brand pack): the lemon→cyan gradient is RESERVED reward light — the
// signature frame / CTA / accents only. Surface stays matte #02040A; ink is white.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FONT_DIR = join(__dirname, '..', 'assets', 'fonts');
const BRAND_DIR = join(__dirname, '..', 'assets', 'brand');

// Kit tokens (verbatim from the OG card).
export const COLORS = {
  bg: '#02040A',
  fg: '#F4F6FA',
  fgMuted: 'rgba(244,246,250,0.62)',
  fgFaint: 'rgba(244,246,250,0.40)',
  fgGhost: 'rgba(244,246,250,0.18)',
  border: 'rgba(244,246,250,0.10)',
};

export const BRAND_GRADIENT = 'linear-gradient(90deg, #FFE066, #BFFF00, #4AE08C, #14B8A6, #0AD4C4)';
export const BRAND_GRADIENT_135 = 'linear-gradient(135deg, #FFE066, #BFFF00, #4AE08C, #14B8A6, #0AD4C4)';

// Named signal colors from the kit (used sparingly, as reward/signal).
export const SIGNAL = {
  cyan: '#0AD4C4',   // ACCENT
  bright: '#9FF7EF', // ACCENT_BRIGHT
  lime: '#BFFF00',
  sun: '#FFE066',
  green: '#4AE08C',
  teal: '#14B8A6',
  purple: '#A78BFA',
  amber: '#F59E0B',
  danger: '#F87171',
};

// Pillar -> a single reserved accent (used for the slide's icon/chip/underline only).
export const PILLAR_ACCENT = {
  contrarian: 'lime',
  'build-in-public': 'purple',
  teardown: 'cyan',
  pain: 'sun',
  framework: 'green',
};

export const RADIUS = { badge: 6, icon: 10, button: 12, panel: 14, card: 16, pill: 999 };

export const CANVAS = { w: 1080, h: 1920 };

export function signal(name) {
  return SIGNAL[name] || SIGNAL.cyan;
}

// --- fonts (real Geist variable woff, base64-inlined for identical CI rendering) ---
let _fontCss = null;
function b64(file) {
  return readFileSync(join(FONT_DIR, file)).toString('base64');
}
export function fontFaceCss() {
  if (_fontCss) return _fontCss;
  _fontCss = [
    `@font-face{font-family:'Geist';font-style:normal;font-weight:100 900;font-display:block;src:url(data:font/woff;base64,${b64('geist.woff')}) format('woff');}`,
    `@font-face{font-family:'GeistMono';font-style:normal;font-weight:100 900;font-display:block;src:url(data:font/woff;base64,${b64('geist-mono.woff')}) format('woff');}`,
  ].join('\n');
  return _fontCss;
}

// --- brand assets ---
let _logoDataUrl = null;
export function logoDataUrl() {
  if (_logoDataUrl === null) {
    try {
      _logoDataUrl = `data:image/png;base64,${readFileSync(join(BRAND_DIR, 'orgx-logo-medium.png')).toString('base64')}`;
    } catch { _logoDataUrl = ''; }
  }
  return _logoDataUrl;
}
