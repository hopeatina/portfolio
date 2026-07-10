# Portfolio V4 — production verification

Date: 2026-07-09

## Build and code quality

- `npm run build` — pass on Next.js 15.5.20; 33 pages generated and the V4 routes prerendered successfully.
- `npm run lint` — pass through the repository flat ESLint configuration.
- `npx tsc --noEmit` — pass.
- `npm audit --omit=dev` — zero critical and zero high production findings. Two moderate findings remain in Next.js’s bundled PostCSS path; npm offers no non-breaking remediation for that pair.
- `sharp` 0.35.3 is installed, removing the production image-optimization fallback.

## Production browser sweep

Playwright ran against `next start`, not the development server.

Desktop at 1440×1000:

- `/`
- `/projects`
- `/projects/orgx`
- `/projects/alma`
- `/projects/perfpulse`
- `/projects/openclaw`
- `/about`
- `/hiring`
- `/contact`
- `/blog`

All ten routes returned 200, had zero horizontal overflow, zero images without `alt`, and zero unnamed links or buttons.

Mobile at 375×812:

- `/`
- `/projects/orgx`
- `/about`
- `/hiring`
- `/contact`

All five routes returned 200 with zero horizontal overflow.

## Interaction and regression checks

- Evidence inspection toggle reaches `aria-pressed="true"`, updates its label to `release`, and applies the inspection state.
- Mobile navigation has a solid carbon background, locks body scroll, exposes its expanded state, closes with Escape, and restores body scroll.
- Browser Back restores the homepage hero at opacity 1 and visible state.
- No console errors or failed network requests occurred in the fresh production sweep. A long-held mobile case-study view may emit Next.js’s advisory that the eagerly loaded hero proof was not consumed immediately; the eager load remains intentional for desktop LCP.
- Lazy product images were scrolled into view and verified complete with non-zero natural dimensions before visual inspection.

## Visual evidence

- `home-desktop.png`
- `home-mobile.png`
- `home-mobile-menu.png`
- `orgx-desktop.png`
- `orgx-mobile.png`
- `orgx-proof-mobile-viewport.png`

The film’s encoded-frame, waveform, format-variant, and loudness evidence lives in `video/qa/final-video-qa.md`.
