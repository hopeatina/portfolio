# Meridian portfolio evidence

Read-only source and public-surface audit: 2026-09-06. Portfolio additions are local review work, not deployed changes.

## Identity, role, and status

- Source: `/Users/hopeatina/Code/meridian`, branch `main`, HEAD `8b7d58e`; extensive pre-existing strategy/QuantConnect changes remain uncommitted and untouched.
- GitHub metadata confirms `hopeatina/meridian` is **private** and advertises `https://meridian-two-beryl.vercel.app` as its homepage. Do not offer the repository as a public CTA.
- Commit history attributes UI and engineering work to `hopeatina`, including configurable conviction scores, signal transitions, and the end-to-end UX audit. The case describes the evidenced role as product design and engineering; it makes no team-size or customer claims.
- Honest project status: **Research prototype**. The architecture document contains older aspirational Python/framework plans; the current implementation is JavaScript, Next.js, React, Convex, and separate Node services.
- The later `/Users/hopeatina/Code/meridian-paper-routine` worktree is on `codex/daily-paper-routine` with uncommitted local safety work. Those controls are described as a separate local iteration, never as deployed/main behavior.

## Source-backed decisions

1. Inspectable conviction: `lib/signal-scoring.js`, `components/meridian/ConvictionWeightsPanel.jsx`, and `components/meridian/screens/SignalAnalysis.jsx` implement weighted conviction, contributions, local weight configuration, and expandable evidence.
2. Connected review: `components/meridian/MeridianApp.jsx` preserves tab/view/signal identity in query parameters. `components/meridian/ui/DecisionGraph.jsx` and `DecisionGraphPanel.jsx` expose decision stages and links back to conviction evidence.
3. Separate paper eligibility: the local paper worktree's `lib/paper-trading/runtime-gate.js`, `lib/paper-trading/preflight.js`, and `lib/execution-policy.js` require matching strategy evidence and explicit paper/broker checks; the policy rejects live mode. No preflight, broker connection, strategy run, order, or dispatch action was performed for this portfolio task.

Additional implementation: `convex/memory.js` links memory to signal/order IDs and supports text/tag or embedding-based lookup. `package.json` confirms Next.js, React, Convex, Tailwind CSS, Framer Motion, Lightweight Charts, PostgreSQL client, and IBKR client dependencies.

## Public URL verification and limitations

- `https://meridian-two-beryl.vercel.app` returned HTTP 200 and was visually opened in a fresh Chrome research tab. Its current public landing, workflow preview, and example plan fields were visible.
- `https://meridian-two-beryl.vercel.app/app` displayed a server-side exception, digest `1100364046`. The portfolio CTA targets the working landing page; the visitor copy does not imply that the authenticated/interactive app is currently operational.
- The main repository's `convex/engine/backtest.js` generates randomized demo statistics. These are not strategy validation or returns. No performance numbers, profitability claims, trading recommendations, or activation claims are included in the case.

## Authentic visual assets

No pre-existing raster UI screenshots were found in either Meridian worktree. These captures were made from the currently public landing in an unsigned-in research tab; no private account data or orders were shown.

- `public/images/case-studies/meridian/public-landing.png`: authentic public landing viewport, 1200 × 762. Main registry/hero candidate. Caption identifies the landing and avoids treating its pilot positioning as traction.
- `public/images/case-studies/meridian/signal-preview.png`: authentic public workflow/plan preview viewport, 1200 × 762, source `https://meridian-two-beryl.vercel.app/#how`. Example scores, prices, size, and risk must remain explicitly described as demo values.

## Validation

- Source repositories were inspected only and their existing dirty work was preserved.
- Public landing availability and screenshot content were checked directly.
- `npx tsc --noEmit --incremental false` passed for the portfolio, and scoped ESLint passed for the new page. Both screenshots were read back and their 1200 × 762 dimensions confirmed. Final browser/build integration remains with the parent task.
