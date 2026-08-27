# Perf Pulse portfolio refresh — design QA

## Comparison target

- Source visual truth:
  - `/Users/hopeatina/.codex/visualizations/2026/08/26/01a0401d-aa14-7e22-b353-0cf05f751134/portfolio-perf-pulse-local/17-source-home-perf-pulse-desktop.png`
  - `/Users/hopeatina/.codex/visualizations/2026/08/26/01a0401d-aa14-7e22-b353-0cf05f751134/portfolio-perf-pulse-local/18-source-home-perf-pulse-mobile.png`
  - `/Users/hopeatina/.codex/visualizations/2026/08/26/01a0401d-aa14-7e22-b353-0cf05f751134/portfolio-perf-pulse/03-live-perfpulse-card.png`
  - `/Users/hopeatina/.codex/visualizations/2026/08/26/01a0401d-aa14-7e22-b353-0cf05f751134/portfolio-perf-pulse/04-live-perfpulse-page.png`
  - `/Users/hopeatina/.codex/visualizations/2026/08/26/01a0401d-aa14-7e22-b353-0cf05f751134/portfolio-perf-pulse/06-live-perfpulse-card-mobile.png`
  - `/Users/hopeatina/.codex/visualizations/2026/08/26/01a0401d-aa14-7e22-b353-0cf05f751134/portfolio-perf-pulse/07-live-perfpulse-page-mobile.png`
- Rendered implementation:
  - `/Users/hopeatina/.codex/visualizations/2026/08/26/01a0401d-aa14-7e22-b353-0cf05f751134/portfolio-perf-pulse-local/15-home-perf-pulse-desktop-final.png`
  - `/Users/hopeatina/.codex/visualizations/2026/08/26/01a0401d-aa14-7e22-b353-0cf05f751134/portfolio-perf-pulse-local/16-home-perf-pulse-mobile-final.png`
  - `/Users/hopeatina/.codex/visualizations/2026/08/26/01a0401d-aa14-7e22-b353-0cf05f751134/portfolio-perf-pulse-local/08-projects-hover-desktop-revised.png`
  - `/Users/hopeatina/.codex/visualizations/2026/08/26/01a0401d-aa14-7e22-b353-0cf05f751134/portfolio-perf-pulse-local/02-perf-pulse-case-desktop.png`
  - `/Users/hopeatina/.codex/visualizations/2026/08/26/01a0401d-aa14-7e22-b353-0cf05f751134/portfolio-perf-pulse-local/03-projects-perf-pulse-mobile.png`
  - `/Users/hopeatina/.codex/visualizations/2026/08/26/01a0401d-aa14-7e22-b353-0cf05f751134/portfolio-perf-pulse-local/04-perf-pulse-case-mobile.png`
- Viewports: `1440 × 1000` desktop and `375 × 812` mobile.
- Pixel normalization: source and implementation captures match their CSS viewport at 1× density; no resampling was required before comparison.
- State: homepage range with project 03 visible; selected Work spectrum with project 03 visible; Perf Pulse case-study hero; Crash Guard proof image in view; desktop hover preview.

## Full-view comparison evidence

- Desktop homepage comparison: `/Users/hopeatina/.codex/visualizations/2026/08/26/01a0401d-aa14-7e22-b353-0cf05f751134/portfolio-perf-pulse-local/compare-home-desktop.png` (source left, implementation right).
- Mobile homepage comparison: `/Users/hopeatina/.codex/visualizations/2026/08/26/01a0401d-aa14-7e22-b353-0cf05f751134/portfolio-perf-pulse-local/compare-home-mobile.png` (source left, implementation right).
- Desktop Work comparison: `/Users/hopeatina/.codex/visualizations/2026/08/26/01a0401d-aa14-7e22-b353-0cf05f751134/portfolio-perf-pulse-local/compare-projects-desktop-revised.png` (source left, implementation right).
- Desktop case-study comparison: `/Users/hopeatina/.codex/visualizations/2026/08/26/01a0401d-aa14-7e22-b353-0cf05f751134/portfolio-perf-pulse-local/compare-case-desktop.png` (source left, implementation right).
- Mobile Work comparison: `/Users/hopeatina/.codex/visualizations/2026/08/26/01a0401d-aa14-7e22-b353-0cf05f751134/portfolio-perf-pulse-local/compare-projects-mobile.png` (source left, implementation right).
- Mobile case-study comparison: `/Users/hopeatina/.codex/visualizations/2026/08/26/01a0401d-aa14-7e22-b353-0cf05f751134/portfolio-perf-pulse-local/compare-case-mobile.png` (source left, implementation right).

## Focused region comparison evidence

- Desktop proof-image treatment: `/Users/hopeatina/.codex/visualizations/2026/08/26/01a0401d-aa14-7e22-b353-0cf05f751134/portfolio-perf-pulse-local/compare-case-proof-desktop.png` (source left, implementation right).
- Mobile proof-image treatment: `/Users/hopeatina/.codex/visualizations/2026/08/26/01a0401d-aa14-7e22-b353-0cf05f751134/portfolio-perf-pulse-local/compare-case-proof-mobile.png` (source left, implementation right).
- Desktop hover asset: `/Users/hopeatina/.codex/visualizations/2026/08/26/01a0401d-aa14-7e22-b353-0cf05f751134/portfolio-perf-pulse-local/08-projects-hover-desktop-revised.png`.

## Findings

- No actionable P0, P1, or P2 findings remain.
- Fonts and typography: the existing families, optical weights, hierarchy, line height, letter spacing, and mobile scaling are unchanged. The two-word brand remains one line at 375 px.
- Spacing and layout rhythm: the spectrum row, case-study grid, CTA spacing, fact rows, proof frame, margins, and mobile stacking retain the source system. No horizontal overflow was present at either viewport.
- Colors and visual tokens: the mineral-black surface, bone text, lime signals, line opacity, and motif treatment are inherited without new tokens or decorative drift.
- Image quality and asset fidelity: the real 1274 × 717 Crash Guard capture is sharp at the desktop proof width, remains legible in the hover preview, and scales without distortion or clipping on mobile.
- Copy and content: current `Perf Pulse` branding, v1.7 status, local-first positioning, tunable thresholds, read-only storage diagnostics, and identity-checked stop requests remain proof-bounded. The stale open-source claim and obsolete demo URL are removed.
- Affordances and interactions: primary and documentation CTAs resolve to the intended public URLs. The project row hover preview displays the Crash Guard capture. Browser console checks returned no errors.

## Comparison history

1. Initial comparison found one P2 density regression: `Crash Guard / launchd / local / Homebrew` wrapped onto two lines in the desktop evidence column, unlike the source row's single-line rhythm.
2. Fix: shortened the evidence string to `Guard / launchd / local / brew` without changing the underlying claim.
3. Post-fix evidence: `/Users/hopeatina/.codex/visualizations/2026/08/26/01a0401d-aa14-7e22-b353-0cf05f751134/portfolio-perf-pulse-local/compare-projects-fix-history.png` and `/Users/hopeatina/.codex/visualizations/2026/08/26/01a0401d-aa14-7e22-b353-0cf05f751134/portfolio-perf-pulse-local/compare-projects-desktop-revised.png`; the evidence line now remains single-line and the row preserves the source density.

## Implementation checklist

- [x] Preserve the existing portfolio system and project order.
- [x] Refresh homepage, Work index, full case study, and crawler metadata.
- [x] Replace the stale product screenshot with the current Crash Guard dashboard.
- [x] Verify desktop, mobile, hover, CTAs, overflow, and console state.
- [x] Resolve the only P2 finding and recompare.

final result: passed
