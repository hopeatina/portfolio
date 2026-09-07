# Chaos Riders case evidence

Research date: 2026-09-06. This case describes an independent creative and engineering project, its launch experience, and a playable browser prototype. It does not claim a released full game, tested device-performance results, traction, or finished new vehicle exports.

## Sources and state

- `/Users/hopeatina/Code/chaos-riders-launch`: current source for the launch experience and micro-demo. Remote `main` was checked read-only with `git ls-remote`: `76392d60bd7cecd9447a8f0b6172b1367328c2f4` (Restore Chaos Riders signature flair, 2026-07-11). Local branch `codex/chaos-riders-astra-thread` at `36421bf` has extensive newer dirty refinements. Code claims were cross-checked against remote-tracking main when possible.
- `/Users/hopeatina/Code/chaos-riders`: separate game/engine exploration. Remote `main` was checked read-only: `0aefc235c8fc96a7ad2dbba1581bd4c3589be88f` (2025-09-01). Local physics and surface changes are dirty. Its dynamic-programming optimal-line algorithm is distinct from the launch demo's deterministic, repulsion-based path; the case does not conflate them.
- Launch repository history contains Hope Atina/hopeatina and AI-assisted contributions. The portfolio role is direction and engineering; no exclusive-author or external-team claim is made.
- GitHub repository metadata identifies the launch repo as private and lists `https://chaos-riders-launch.vercel.app` as its homepage. A public web read did not establish current availability. The case therefore links to its own prototype captures and exposes no private repository CTA.
- No source repository was modified, no source app/server was run, and no credentials or environment files were inspected.

## Claim mapping

| Case claim | Source evidence | Boundary |
| --- | --- | --- |
| Cameroon-first world with Yaoundé, Douala, Bamenda, and Limbe direction | `src/LandingExperience.tsx` route registry on launch main and local source | Regional concept direction, not four shipped playable maps |
| Browser driving prototype, starting with a 20-second clock | Launch `src/demo/DemoGame.tsx`, `DEMO_SECONDS = 20`, input handlers and HUD | Main adds time for clean fields; newer local refinement changes clock bounds. Copy says initial clock, not invariant duration |
| Shared deterministic hazards and a line computed around potholes | Launch `src/demo/track.ts`, `forEachPotholeNear`, `lineOffset`, soft road clamp; imported by demo | Implemented algorithm, no new clearance benchmark claimed |
| Steering, braking, timed stability, and flow feedback | Launch main `src/demo/DemoGame.tsx`, keyboard/touch handlers and field transitions | Implemented prototype, no user-study or retention claim |
| Explicit lazy-loaded playable entry | Launch main and current `src/LandingExperience.tsx`, `lazy(() => import("./demo/DemoGame"))`, playing state | Does not claim the entire page is GPU-free or an achieved load budget |
| Concept/build distinction | Current local `Drive` status bar labels target look versus running build | Local refinement is not represented as deployed provider state |
| Vehicle and broader game development continues | Dirty vehicle pipeline and `qa/social/chaos-riders-astra/README.md` draft/authoring-candidate boundaries | No v16 model, finished GLB fidelity claim, or Blender comparison render is used |

## Copied assets

All files were visually inspected and copied byte-for-byte from the launch workspace. No new image generation or retouching was performed.

| Portfolio file | Original path under launch repo | Classification | SHA-256 |
| --- | --- | --- | --- |
| `public/images/case-studies/chaos-riders/world-market.webp` | `public/assets/photos/CR-10_hero_taxi_market.webp` | Existing world concept art, 3840 × 2144; source file locally modified | `fbfeccf139a2f3e3ae57f6b2936b989f1e4682e715a93b3282c162a1cabfd165` |
| `public/images/case-studies/chaos-riders/prototype-gameplay.png` | `qa/reports/landing-revamp/desktop-game.png` | Existing captured browser prototype, 1440 × 900; untracked historical QA capture | `b4faceda9a8f6c378d5de9063c220aba191cfd0170e142ff67215f0f2079390f` |
| `public/images/case-studies/chaos-riders/bamenda-world.webp` | `public/assets/regions/CR-07_hero_bamenda.webp` | Existing regional concept art, 3200 × 1786; tracked | `3d972c08b4e8610991b2f13186fe71e83f1a1842c81ca36f318613f4aba1570c` |

The capture's internal “LIVE BUILD” label describes the recorded running renderer. Its portfolio caption explicitly identifies it as a development capture, not a fresh live-provider receipt. Concept imagery is labeled as concept art in alt text, labels, and captions.
