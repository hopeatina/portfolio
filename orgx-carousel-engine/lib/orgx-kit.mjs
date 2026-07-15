// OrgX share-card chrome, ported from the real kit (work-graph OG card) to HTML strings.
// Scaled for 1080x1920 portrait. Keeps the reserved-gradient discipline.
import { COLORS, BRAND_GRADIENT, RADIUS, logoDataUrl } from './theme.mjs';
import { icon, RECEIPTS_FLOW } from './icons.mjs';

const gradText = (s, size, weight = 800, ls = 0) =>
  `<span style="background:${BRAND_GRADIENT};-webkit-background-clip:text;background-clip:text;color:transparent;font-size:${size}px;font-weight:${weight};letter-spacing:${ls}px;display:inline-block;">${s}</span>`;

// Real logo mark + "OrgX" wordmark (Geist 800).
export function orgxBrand({ mark = 64, type = 52 } = {}) {
  const logo = logoDataUrl();
  const img = logo
    ? `<img src="${logo}" width="${mark}" height="${mark}" alt="OrgX" style="width:${mark}px;height:${mark}px;display:block;"/>`
    : '';
  return `<div style="display:flex;align-items:center;gap:18px;">${img}<span style="font-size:${type}px;font-weight:800;color:${COLORS.fg};letter-spacing:-1px;">OrgX</span></div>`;
}

// Gradient-bordered chip with gradient-clipped text (top-right context label).
export function chipGradient(text, { size = 22, padV = 12, padH = 22 } = {}) {
  return `<div style="display:flex;padding:2px;background:${BRAND_GRADIENT};border-radius:${RADIUS.badge + 2}px;">
    <div style="display:flex;align-items:center;padding:${padV}px ${padH}px;background:${COLORS.bg};border-radius:${RADIUS.badge}px;">
      ${gradText(text.toUpperCase(), size, 800, 3.4)}
    </div></div>`;
}

// Solid-bordered chip in one signal color.
export function chipSolid(text, color, { size = 22, padV = 12, padH = 22 } = {}) {
  return `<div style="display:flex;align-items:center;padding:${padV}px ${padH}px;border:1px solid ${color}66;background:${color}1A;color:${color};font-size:${size}px;font-weight:800;letter-spacing:3.4px;border-radius:${RADIUS.badge}px;">${text.toUpperCase()}</div>`;
}

// Gradient-border, gradient-text CTA.
export function gradientButton(text, { size = 30 } = {}) {
  return `<div style="display:flex;padding:2.4px;background:${BRAND_GRADIENT};border-radius:${RADIUS.button}px;">
    <div style="display:flex;align-items:center;padding:16px 28px;background:${COLORS.bg};border-radius:${RADIUS.button - 2}px;">
      ${gradText(text, size, 800, 0)}
    </div></div>`;
}

// The brand-gradient underline bar.
export function gradientUnderline({ width = 360, height = 6, mt = 8 } = {}) {
  return `<div style="width:${width}px;height:${height}px;background:${BRAND_GRADIENT};margin-top:${mt}px;border-radius:2px;"></div>`;
}

// Trust signal.
export function publicSafeBadge(label = 'Public-safe · raw transcripts excluded') {
  return `<div style="display:flex;align-items:center;gap:12px;">${icon('shield', { size: 26, color: COLORS.fgFaint })}<span style="font-size:22px;color:${COLORS.fgMuted};">${label}</span></div>`;
}

// Icon inside a colored disk (the kit's step/stat marker).
export function iconDisk(name, color, { disk = 66, ic = 34 } = {}) {
  return `<div style="display:flex;width:${disk}px;height:${disk}px;border-radius:999px;border:2px solid ${color}88;background:${color}15;align-items:center;justify-content:center;flex-shrink:0;">${icon(name, { size: ic, color })}</div>`;
}

// The SIGNAL → DECISION → ARTIFACT → PROOF → OUTCOME receipts flow (vertical), with halo + dashed arc.
export function receiptsFlow(color, { size = 640 } = {}) {
  const rows = RECEIPTS_FLOW.map((s) =>
    `<div style="display:flex;align-items:center;gap:22px;">${iconDisk(s.icon, color, { disk: 74, ic: 38 })}<span style="font-size:28px;font-weight:700;color:${COLORS.fg};letter-spacing:4px;">${s.label}</span></div>`
  ).join('');
  const arcW = size, arcH = size;
  return `<div style="position:relative;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;">
    <div style="position:absolute;width:${size - 30}px;height:${size - 30}px;border-radius:999px;border:1px solid ${color}33;background:radial-gradient(circle at center, ${color}14 0%, ${color}00 70%);"></div>
    <svg width="${arcW}" height="${arcH}" viewBox="0 0 360 360" style="position:absolute;left:0;top:0;">
      <path d="M 120 38 Q 60 130 120 180 Q 60 230 120 322" stroke="${color}" stroke-width="1.6" stroke-dasharray="3 5" fill="none" opacity="0.55"/>
    </svg>
    <div style="display:flex;flex-direction:column;gap:26px;padding-left:120px;position:relative;">${rows}</div>
  </div>`;
}

// The signature CardFrame: brand-gradient hairline around the whole slide.
export function cardFrame(innerHtml, { pad = '96px 84px' } = {}) {
  return `<div class="frame-outer" style="display:flex;width:100%;height:100%;background:${COLORS.bg};padding:26px;">
    <div style="display:flex;flex-direction:column;flex:1;padding:2px;background:${BRAND_GRADIENT};border-radius:${RADIUS.card + 8}px;">
      <div class="frame-inner" style="display:flex;flex:1;flex-direction:column;background:${COLORS.bg};padding:${pad};border-radius:${RADIUS.card + 6}px;overflow:hidden;position:relative;">
        ${innerHtml}
      </div>
    </div>
  </div>`;
}
