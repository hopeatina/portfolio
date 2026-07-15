// OrgX carousel renderer — v3 "machined light".
//
// Design thesis (from orgx-brand-pack.json): the world is machined and dark;
// light is the ONE reserved reward, and it glows from within. So light
// escalates across the carousel arc:
//   hook     -> a single seam of gradient light (a door, cracked open)
//   interior -> matte instrument surfaces, almost no color
//   receipt  -> the full gradient frame + the PROOF ATTACHED stamp. Earned.
//
// The end card is a literal thermal receipt — because the artifact IS the receipt.
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { CANVAS, COLORS, BRAND_GRADIENT, signal, fontFaceCss, logoDataUrl } from './theme.mjs';
import { icon } from './icons.mjs';

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const MONO = `font-family:'GeistMono',ui-monospace,monospace`;

// Inline emphasis:
//   **word**  -> emissive gradient light (glows from within)
//   ~~word~~  -> struck through, dimmed (the rejected idea)
function rich(s = '') {
  return esc(s)
    .replace(/\*\*(.+?)\*\*/g,
      `<span style="background:${BRAND_GRADIENT};-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 0 26px rgba(191,255,0,0.28));">$1</span>`)
    .replace(/~~(.+?)~~/g,
      `<span style="color:${COLORS.fgFaint};text-decoration:line-through;text-decoration-thickness:6px;text-decoration-color:rgba(248,113,113,0.75);">$1</span>`);
}

function headlineSize(text = '', boost = 0) {
  const n = text.replace(/\*\*|~~/g, '').length;
  let s;
  if (n <= 18) s = 172; else if (n <= 32) s = 138; else if (n <= 52) s = 108;
  else if (n <= 78) s = 88; else s = 70;
  return s + boost;
}

// --- micro-chrome ---------------------------------------------------------

function markImg(size = 56, opacity = 1) {
  const logo = logoDataUrl();
  return logo ? `<img src="${logo}" width="${size}" height="${size}" style="width:${size}px;height:${size}px;display:block;opacity:${opacity};" alt=""/>` : '';
}

// top: mark + a machined index readout. No chips, no labels-about-labels.
function topChrome(idx, total, accent) {
  const idxStr = String(idx + 1).padStart(2, '0');
  return `<div style="display:flex;align-items:center;justify-content:space-between;position:relative;z-index:3;">
    <div style="display:flex;align-items:center;gap:16px;">${markImg(54)}
      <span style="font-size:40px;font-weight:800;letter-spacing:-1px;color:${COLORS.fg};">OrgX</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;${MONO};font-variant-numeric:tabular-nums;">
      <span style="font-size:30px;font-weight:700;color:${accent};">${idxStr}</span>
      <span style="font-size:22px;color:${COLORS.fgGhost};">/ ${String(total).padStart(2, '0')}</span>
    </div></div>`;
}

// bottom: one hairline + micro ledger line. Progress = a position mark on the hairline.
function bottomChrome(idx, total, accent, note) {
  const pct = total > 1 ? (idx / (total - 1)) * 100 : 0;
  return `<div style="position:relative;z-index:3;">
    <div style="position:relative;height:2px;background:rgba(244,246,250,0.10);">
      <div style="position:absolute;left:0;top:0;height:2px;width:${pct}%;background:${accent};opacity:0.85;"></div>
      <div style="position:absolute;left:${pct}%;top:-4px;width:10px;height:10px;transform:translateX(-5px);background:${accent};border-radius:1px;"></div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-top:22px;${MONO};">
      <span style="font-size:20px;letter-spacing:4px;color:${COLORS.fgFaint};">ORGX — AI-NATIVE RECEIPTS</span>
      <span style="font-size:20px;letter-spacing:2px;color:${COLORS.fgFaint};">${esc(note || '@useorgx')}</span>
    </div></div>`;
}

// kicker: a machined section label — tick + mono smallcaps, no pill.
function kickerHtml(text, accent) {
  if (!text) return '';
  return `<div style="display:flex;align-items:center;gap:18px;margin-bottom:36px;">
    <div style="width:34px;height:3px;background:${accent};"></div>
    <span style="${MONO};font-size:26px;font-weight:700;letter-spacing:7px;color:${accent};">${esc(text).toUpperCase()}</span></div>`;
}

// giant ghost numeral, cropped off the right edge (type as image).
function ghostNumeral(ch, accent) {
  return `<div style="position:absolute;right:-140px;top:44%;transform:translateY(-50%);z-index:1;
    font-size:1250px;font-weight:800;line-height:0.8;letter-spacing:-40px;
    color:transparent;-webkit-text-stroke:3px ${accent}2E;pointer-events:none;">${esc(ch)}</div>`;
}

// the cracked-door light seam (hook only): a vertical gradient hairline + spill.
function doorSeam() {
  return `<div style="position:absolute;left:0;top:0;bottom:0;width:4px;background:linear-gradient(180deg,#FFE066,#BFFF00,#4AE08C,#14B8A6,#0AD4C4);z-index:2;"></div>
  <div style="position:absolute;left:0;top:0;bottom:0;width:420px;z-index:1;pointer-events:none;
    background:linear-gradient(90deg, rgba(191,255,0,0.10), rgba(20,184,166,0.04) 45%, transparent 100%);"></div>`;
}

// faint machined grid + one accent glow whose POSITION means something:
// pain sits low like a horizon, the turn blooms center, proof holds the top edge.
const GLOW_BY_ROLE = {
  hook: '82% 8%',
  tension: '50% 106%',
  turn: '50% 42%',
  proof: '78% 0%',
  cta: '82% 8%',
};
function grid(accent, role = 'proof') {
  const at = GLOW_BY_ROLE[role] || '82% 8%';
  return `<div style="position:absolute;inset:0;pointer-events:none;z-index:0;
    background:
      radial-gradient(circle at ${at}, ${accent}12, transparent 52%),
      linear-gradient(rgba(255,255,255,0.024) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.024) 1px, transparent 1px);
    background-size:100% 100%, 52px 52px, 52px 52px;
    -webkit-mask-image:radial-gradient(130% 90% at 50% 20%, #000 40%, transparent 90%);"></div>`;
}

// blinking terminal cursor (rendered solid — this is a still).
const cursor = (size) => `<span style="display:inline-block;width:${Math.round(size * 0.5)}px;height:${Math.round(size * 0.82)}px;background:#BFFF00;margin-left:${Math.round(size * 0.12)}px;transform:translateY(${Math.round(size * 0.08)}px);box-shadow:0 0 34px rgba(191,255,0,0.5);"></span>`;

// A ghost numeral must be LOAD-BEARING: the slide enumerates something
// (leads with "N." or counts "N doors/steps/fields/..."), or the kicker indexes it
// ("DOOR 5"). A stray digit doesn't earn 1250px of ink.
function findNumeral(text = '', kicker = '') {
  const plain = text.replace(/\*\*|~~/g, '').trim();
  let m = plain.match(/^(\d)\./); // "5. today-you..."
  if (m) return m[1];
  m = plain.match(/\b(\d)\s+(?:specific\s+)?(?:doors?|steps?|fields?|ways|things|agents?|repairs?|loops?)\b/i);
  if (m) return m[1];
  m = (kicker || '').match(/\b(\d)\b/); // "door 5"
  if (m) return m[1];
  return null;
}

// --- role compositions ------------------------------------------------------

// HOOK — film poster. Bottom-anchored type, door seam, cursor. No footer chrome.
function hookSlide(slide, carousel) {
  const accent = signal(slide.accentSignal);
  const size = headlineSize(slide.headline, 8);
  const num = findNumeral(slide.headline, slide.kicker);
  return `
  ${grid(accent, 'hook')}
  ${doorSeam()}
  ${num ? ghostNumeral(num, accent) : ''}
  <div style="position:absolute;top:96px;left:96px;right:96px;z-index:3;display:flex;align-items:center;justify-content:space-between;">
    <div style="display:flex;align-items:center;gap:16px;">${markImg(56)}<span style="font-size:42px;font-weight:800;letter-spacing:-1px;color:${COLORS.fg};">OrgX</span></div>
    <span style="${MONO};font-size:22px;letter-spacing:5px;color:${COLORS.fgFaint};">USEORGX.COM</span>
  </div>
  <div style="position:absolute;left:96px;right:96px;bottom:420px;z-index:3;">
    <h1 style="font-size:${size}px;font-weight:800;letter-spacing:${-size * 0.035}px;line-height:0.99;color:${COLORS.fg};margin:0;">${rich(slide.headline)}${cursor(size)}</h1>
    ${slide.subtext ? `<p style="font-size:42px;line-height:1.35;color:${COLORS.fgMuted};margin:44px 0 0;max-width:820px;">${rich(slide.subtext)}</p>` : ''}
  </div>
  <div style="position:absolute;left:96px;bottom:352px;z-index:3;display:flex;align-items:center;gap:26px;${MONO};">
    <span style="font-size:21px;letter-spacing:4px;color:${COLORS.fgFaint};">01 / ${String(carousel.slides.length).padStart(2, '0')}</span>
    <div style="width:60px;height:2px;background:${accent};"></div>
    <span style="font-size:21px;letter-spacing:4px;color:${accent};">HOLD &amp; READ</span>
  </div>`;
}

// INTERIOR — machined asymmetric editorial. Headline in the upper zone,
// evidence (readout / ledger / flow) machined into the lower zone.
function interiorSlide(slide, idx, total, carousel) {
  const accent = signal(slide.accentSignal);
  const size = headlineSize(slide.headline);
  const num = findNumeral(slide.headline, slide.kicker);

  let evidence = '';
  if (slide.visual?.flow) evidence = flowRail(accent, slide.visual.flowStep ?? 3);
  else if (slide.readout) evidence = ledger(slide.readout, accent);
  else if (slide.items) evidence = specList(slide.items, accent);

  return `
  ${grid(accent, slide.role)}
  ${num && !evidence ? ghostNumeral(num, accent) : ''}
  <div style="position:absolute;top:96px;left:96px;right:96px;z-index:3;">${topChrome(idx, total, accent)}</div>
  <div style="position:absolute;left:96px;right:96px;top:230px;bottom:210px;z-index:3;display:flex;flex-direction:column;justify-content:center;">
    ${kickerHtml(slide.kicker, accent)}
    <h1 style="font-size:${size}px;font-weight:800;letter-spacing:${-size * 0.033}px;line-height:1.01;color:${COLORS.fg};margin:0;max-width:900px;">${rich(slide.headline)}</h1>
    ${slide.subtext ? `<p style="font-size:38px;line-height:1.4;color:${COLORS.fgMuted};margin:38px 0 0;max-width:800px;">${rich(slide.subtext)}</p>` : ''}
    ${evidence ? `<div style="margin-top:84px;">${evidence}</div>` : ''}
  </div>
  <div style="position:absolute;left:96px;right:96px;bottom:84px;z-index:3;">${bottomChrome(idx, total, accent, carousel.handle)}</div>`;
}

// evidence: the receipts flow as a horizontal machined rail (no disks).
// `lit` = the step this slide is actually about; steps before it read as passed.
function flowRail(accent, lit = 3) {
  const steps = ['SIGNAL', 'DECISION', 'ARTIFACT', 'PROOF', 'OUTCOME'];
  const names = ['signal', 'decision', 'artifact', 'proof', 'outcome'];
  const cells = steps.map((s, i) => {
    const color = i === lit ? accent : i < lit ? COLORS.fgMuted : COLORS.fgGhost;
    const label = i === lit ? accent : i < lit ? COLORS.fgFaint : COLORS.fgGhost;
    return `
    <div style="display:flex;flex-direction:column;align-items:center;gap:18px;flex:1;position:relative;">
      ${icon(names[i], { size: 44, color })}
      <span style="${MONO};font-size:19px;letter-spacing:3.5px;color:${label};font-weight:700;">${s}</span>
    </div>`;
  }).join(`<div style="width:54px;height:2px;background:rgba(244,246,250,0.14);margin-top:-26px;"></div>`);
  return `<div style="border-top:1px solid rgba(244,246,250,0.10);border-bottom:1px solid rgba(244,246,250,0.10);padding:44px 0;display:flex;align-items:center;">${cells}</div>`;
}

// evidence: the context-pack ledger — ruled mono rows, tabular.
function ledger(rows, accent) {
  const line = (r, i) => `<div style="display:flex;justify-content:space-between;align-items:baseline;padding:24px 4px;border-bottom:1px ${i === rows.length - 1 ? 'solid transparent' : 'solid rgba(244,246,250,0.09)'};">
      <span style="${MONO};font-size:32px;color:${COLORS.fgMuted};letter-spacing:1px;">${esc(r.k)}</span>
      <span style="flex:1;margin:0 26px;border-bottom:2px dotted rgba(244,246,250,0.14);transform:translateY(-8px);"></span>
      <span style="${MONO};font-size:32px;font-weight:700;color:${r.tone === 'muted' ? COLORS.fgFaint : accent};letter-spacing:0.5px;">${esc(r.v || '')}</span>
    </div>`;
  return `<div style="border-top:2px solid ${accent};padding-top:10px;">${rows.map(line).join('')}</div>`;
}

// evidence: numbered spec list — a machined index, not pills.
function specList(items, accent) {
  const li = (t, i) => `<div style="display:flex;align-items:baseline;gap:30px;padding:26px 0;border-bottom:1px solid rgba(244,246,250,0.09);">
      <span style="${MONO};font-size:30px;font-weight:700;color:${accent};font-variant-numeric:tabular-nums;">${String(i + 1).padStart(2, '0')}</span>
      <span style="font-size:38px;font-weight:600;color:${COLORS.fg};line-height:1.25;">${rich(t)}</span>
    </div>`;
  return `<div style="border-top:2px solid ${accent};">${items.map(li).join('')}</div>`;
}

// RECEIPT — the end card. A thermal receipt: the argument, itemized, proof attached.
function receiptSlide(slide, idx, total, carousel) {
  const accent = signal(slide.accentSignal || 'lime');
  const now = carousel.date || '2026-07-15';
  const serial = `RCPT-${now.replace(/-/g, '')}-${String(idx + 1).padStart(2, '0')}`;

  // itemize the argument: prior slides' kickers become line items (deduped; roles are too generic).
  const seen = new Set();
  const items = carousel.slides.slice(0, -1)
    .map((s) => (s.kicker || '').toUpperCase().slice(0, 22))
    .filter((label) => label && !seen.has(label) && seen.add(label))
    .map((label) => ({ label, val: '✓' }));
  const fixed = [
    { label: 'GOAL', val: 'CARRIED' },
    { label: 'DECISIONS', val: '+WHY' },
    { label: 'TRANSCRIPT DUMPS', val: '0' },
  ];
  const lineRows = [...fixed, ...items.slice(0, 3)];

  const rows = lineRows.map((r) => `
    <div style="display:flex;justify-content:space-between;align-items:baseline;padding:13px 0;">
      <span style="${MONO};font-size:27px;color:#1c2030;letter-spacing:1px;">${esc(r.label)}</span>
      <span style="flex:1;margin:0 18px;border-bottom:2px dotted rgba(28,32,48,0.28);transform:translateY(-6px);"></span>
      <span style="${MONO};font-size:27px;font-weight:700;color:#1c2030;">${esc(r.val)}</span>
    </div>`).join('');

  // a barcode of the work graph (aesthetic, varying widths)
  const widths = [3, 8, 3, 5, 12, 3, 6, 3, 9, 4, 3, 11, 5, 3, 7, 3, 5, 9, 3, 6, 12, 3, 4, 8, 3, 6, 3, 10, 4, 3];
  const barcode = widths.map((w, i) => `<div style="width:${w}px;height:76px;background:#1c2030;margin-right:${i % 3 === 0 ? 7 : 4}px;"></div>`).join('');

  const zig = `background-image:linear-gradient(45deg, #F2F0E9 25%, transparent 25%), linear-gradient(-45deg, #F2F0E9 25%, transparent 25%);background-size:26px 26px;background-position:0 0;`;

  return `
  ${grid(accent, 'cta')}
  <div style="position:absolute;top:96px;left:96px;right:96px;z-index:3;">${topChrome(idx, total, accent)}</div>
  <div style="position:absolute;left:96px;right:96px;top:270px;z-index:3;">
    <h1 style="font-size:${headlineSize(slide.headline)}px;font-weight:800;letter-spacing:-3px;line-height:1.0;color:${COLORS.fg};margin:0;max-width:880px;">${rich(slide.headline)}</h1>
  </div>

  <!-- the receipt -->
  <div style="position:absolute;left:50%;transform:translateX(-50%) rotate(-1.6deg);bottom:330px;width:660px;z-index:4;filter:drop-shadow(0 40px 60px rgba(0,0,0,0.6));">
    <div style="height:26px;${zig};background-color:transparent;transform:rotate(180deg);"></div>
    <div style="background:#F2F0E9;padding:44px 48px 38px;position:relative;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span style="${MONO};font-size:30px;font-weight:700;letter-spacing:5px;color:#1c2030;">ORGX</span>
        <span style="${MONO};font-size:21px;color:#6a6f80;">${esc(serial)}</span>
      </div>
      <div style="${MONO};font-size:20px;letter-spacing:3px;color:#6a6f80;margin-top:6px;">CONTINUITY + PROOF · ${esc(now)}</div>
      <div style="height:2px;background:#1c2030;margin:26px 0 10px;"></div>
      ${rows}
      <div style="height:2px;background:#1c2030;margin:12px 0 24px;"></div>
      <div style="display:flex;justify-content:space-between;align-items:baseline;">
        <span style="${MONO};font-size:30px;font-weight:700;color:#1c2030;letter-spacing:2px;">THE ARTIFACT</span>
        <span style="${MONO};font-size:30px;font-weight:700;color:#1c2030;letter-spacing:2px;">IS THE RECEIPT</span>
      </div>
      <div style="display:flex;margin-top:30px;align-items:flex-end;justify-content:space-between;">
        <div style="display:flex;align-items:flex-end;">${barcode}</div>
      </div>
      <!-- stamp -->
      <div style="position:absolute;right:34px;bottom:96px;transform:rotate(8deg);border:5px solid #199d6e;border-radius:10px;padding:10px 22px;${MONO};font-size:30px;font-weight:700;letter-spacing:4px;color:#199d6e;opacity:0.9;">PROOF ATTACHED</div>
      <div style="${MONO};font-size:20px;color:#6a6f80;margin-top:26px;letter-spacing:2px;">${esc(slide.subtext || 'THE PROMPT ENDS. THE COMPANY KEEPS MOVING.')}</div>
    </div>
    <div style="height:26px;${zig}"></div>
  </div>

  <div style="position:absolute;left:96px;right:96px;bottom:84px;z-index:3;display:flex;justify-content:space-between;align-items:baseline;${MONO};">
    <span style="font-size:24px;letter-spacing:4px;color:${COLORS.fg};font-weight:700;">USEORGX.COM</span>
    <span style="font-size:20px;letter-spacing:2px;color:${COLORS.fgFaint};">${esc(carousel.handle || '@useorgx')}</span>
  </div>`;
}

// --- assembly ---------------------------------------------------------------

function slideHtml(slide, idx, total, carousel) {
  const isCta = slide.role === 'cta';
  const isHook = slide.role === 'hook';
  let inner;
  if (isHook) inner = hookSlide(slide, carousel);
  else if (isCta) inner = receiptSlide(slide, idx, total, carousel);
  else inner = interiorSlide(slide, idx, total, carousel);

  // Light escalation: hook + interior = matte panel w/ hairline; receipt = the full gradient frame.
  if (isCta) {
    return `<section class="slide"><div style="display:flex;width:100%;height:100%;background:${COLORS.bg};padding:24px;">
      <div style="display:flex;flex:1;padding:3px;background:${BRAND_GRADIENT};border-radius:30px;">
        <div style="position:relative;flex:1;background:${COLORS.bg};border-radius:27px;overflow:hidden;">${inner}</div>
      </div></div></section>`;
  }
  return `<section class="slide"><div style="position:relative;width:100%;height:100%;background:${COLORS.bg};border:1px solid rgba(244,246,250,0.07);overflow:hidden;">${inner}</div></section>`;
}

function pageCss() {
  return `${fontFaceCss()}
  *{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased;text-rendering:geometricPrecision;}
  html,body{background:#000;}
  .sheet{display:flex;flex-direction:column;}
  .slide{width:${CANVAS.w}px;height:${CANVAS.h}px;overflow:hidden;background:${COLORS.bg};
    font-family:'Geist',-apple-system,system-ui,sans-serif;color:${COLORS.fg};font-feature-settings:'ss02' on,'cv02' on;}
  h1{text-wrap:balance;}`;
}

export function buildHtml(carousel) {
  const total = carousel.slides.length;
  const slides = carousel.slides.map((s, i) => slideHtml(s, i, total, carousel)).join('\n');
  return `<!doctype html><html><head><meta charset="utf-8"><style>${pageCss()}</style></head>
<body><div class="sheet">${slides}</div></body></html>`;
}

export async function renderCarousel(carousel, { outDir, scale = 2 } = {}) {
  mkdirSync(outDir, { recursive: true });
  const html = buildHtml(carousel);
  writeFileSync(join(outDir, 'preview.html'), html);
  const browser = await chromium.launch({ args: ['--force-color-profile=srgb', '--font-render-hinting=none'] });
  try {
    const page = await browser.newPage({ viewport: { width: CANVAS.w, height: CANVAS.h }, deviceScaleFactor: scale });
    await page.setContent(html, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const nodes = page.locator('.slide');
    const count = await nodes.count();
    const results = [];
    for (let i = 0; i < count; i++) {
      const path = join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
      await nodes.nth(i).screenshot({ path, type: 'png' });
      results.push({ index: i, role: carousel.slides[i].role, path });
    }
    return results;
  } finally {
    await browser.close();
  }
}
