// OrgX concept icons — ported verbatim from the real share-card kit
// (~/Code/orgx/orgx/app/work-graph/[token]/opengraph-image.tsx `Icon`).
// 24x24, stroke = currentColor, round caps. The authentic OrgX icon vocabulary.

// inner markup builders; {s}=stroke color placeholder handled by caller via currentColor
const P = 'fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"';

export const ICONS = {
  signal: `<path ${P} d="M2 12c0-5.5 4.5-10 10-10 5.5 0 10 4.5 10 10"/><path ${P} d="M5.5 12c0-3.6 2.9-6.5 6.5-6.5 3.6 0 6.5 2.9 6.5 6.5"/><path ${P} d="M9 12c0-1.7 1.3-3 3-3 1.7 0 3 1.3 3 3"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/>`,
  decision: `<path ${P} d="M12 2l10 10-10 10L2 12z"/><path ${P} d="M9 12l2 2 4-4"/>`,
  artifact: `<path ${P} d="M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path ${P} d="M15 3v5h5"/><path ${P} d="M9 13h7M9 17h7"/>`,
  proof: `<path ${P} d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5l8-3z"/><rect x="9" y="11" width="6" height="6" rx="1" ${P}/><path ${P} d="M10 11V9.5a2 2 0 0 1 4 0V11"/>`,
  outcome: `<path ${P} d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5L12 3z"/>`,
  refresh: `<path ${P} d="M3 12a9 9 0 1 0 3-6.7"/><path ${P} d="M3 4v5h5"/>`,
  star: `<path ${P} d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5L12 3z"/>`,
  person: `<circle cx="12" cy="8" r="3.5" ${P}/><path ${P} d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>`,
  sparkle: `<path fill="currentColor" d="M12 3l1.7 5L19 9.7 14 11.4 12.3 16 11 11.4 6 9.7 11 8z"/><circle cx="19" cy="18" r="1.5" fill="currentColor"/><circle cx="5" cy="17" r="1" fill="currentColor"/>`,
  'heart-pulse': `<path ${P} d="M2 12h4l2-4 3 8 2-6 2 2h7"/>`,
  shield: `<path ${P} d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5l8-3z"/>`,
  'shield-check': `<path ${P} d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5l8-3z"/><path ${P} d="M8 12l3 3 5-6"/>`,
  lock: `<rect x="5" y="10" width="14" height="11" rx="2" ${P}/><path ${P} d="M8 10V7a4 4 0 0 1 8 0v3"/>`,
  'eye-off': `<path ${P} d="M2 12s4-7 10-7c2.5 0 4.7 1.2 6.4 2.6M22 12s-4 7-10 7c-2.5 0-4.7-1.2-6.4-2.6"/><path ${P} d="M3 3l18 18"/><circle cx="12" cy="12" r="3" ${P}/>`,
  document: `<path ${P} d="M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path ${P} d="M15 3v5h5"/>`,
  terminal: `<rect x="3" y="4" width="18" height="16" rx="2" ${P}/><path ${P} d="M7 9l3 3-3 3M13 15h4"/>`,
  users: `<circle cx="9" cy="8" r="3" ${P}/><path ${P} d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5" ${P}/><path ${P} d="M21 20c0-2.7-1.8-5-4-5.7"/>`,
  'arrow-right': `<path ${P} d="M5 12h14M14 6l6 6-6 6"/>`,
  'chevron-right': `<path ${P} d="M9 6l6 6-6 6"/>`,
};

// Full <svg>. color applied by caller (CSS color / inline). strokeWidth ~ s/14 (kit rule).
export function icon(name, { size = 24, color = 'currentColor', style = '' } = {}) {
  const inner = ICONS[name] || ICONS['arrow-right'];
  const sw = Math.max(1, size / 14).toFixed(2);
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" style="display:flex;color:${color};stroke-width:${sw};${style}" aria-hidden="true">${inner}</svg>`;
}

export function hasIcon(name) {
  return !!ICONS[name];
}

// The receipts narrative sequence (used for the ReceiptsFlow motif).
export const RECEIPTS_FLOW = [
  { icon: 'signal', label: 'SIGNAL' },
  { icon: 'decision', label: 'DECISION' },
  { icon: 'artifact', label: 'ARTIFACT' },
  { icon: 'proof', label: 'PROOF' },
  { icon: 'outcome', label: 'OUTCOME' },
];
