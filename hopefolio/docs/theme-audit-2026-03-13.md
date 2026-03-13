# Theme Audit: 2026-03-13

## Scope

Audit target:

- all major routes in all four themes
- desktop full-page captures for every primary route and project page
- mobile full-page captures for `/`, `/about`, `/blog`, `/contact`, and `/projects`

Capture harness:

- [theme-audit-capture.spec.js](/Users/hopeatina/Code/portfolio/hopefolio/scripts/theme-audit-capture.spec.js)

Capture sets:

- generated locally under `hopefolio/docs/verification/theme-audit/`
- intentionally not committed to keep repo history and deployments lean

## Hard Findings

### 1. Theme semantics were wrong at the root

`rice` and `cameroonian` were being treated as dark themes in shared logic. That contaminated:

- header chrome
- small-label contrast
- dark/light surface assumptions

Affected files:

- [ThemeContext.tsx](/Users/hopeatina/Code/portfolio/hopefolio/src/modules/mode-switch/ThemeContext.tsx)
- [Header.tsx](/Users/hopeatina/Code/portfolio/hopefolio/src/components/layout/Header.tsx)
- [StateBadge.tsx](/Users/hopeatina/Code/portfolio/hopefolio/src/components/ui/StateBadge.tsx)

### 2. The global token layer was incomplete

Several surfaces were referencing variables that did not exist in the global token system:

- `--background-rgb`
- `--background-secondary`
- `--text-secondary`
- `--text-on-dark-secondary`
- `--gradient-end`
- `--border`
- `--border-color`
- `--box-shadow`
- `--box-shadow-card`
- `--icon-border`

That meant some pages were only “working” by accident.

Affected file:

- [theme-variables.css](/Users/hopeatina/Code/portfolio/hopefolio/src/styles/theme-variables.css)

### 3. The header was overpowering light themes

On non-home pages in `rice` and `cameroonian`, the header was still rendering with dark-chrome logic. It visually dominated the page and reduced theme clarity.

Representative baseline examples generated locally:

- `before/desktop/rice/home.jpg`
- `before/desktop/cameroonian/about.jpg`

### 4. Footer alignment and density were weak

The footer had too much dead space, weak hierarchy, and loose alignment. On long pages it read like leftover scaffolding instead of a resolved closing surface.

Representative baseline examples generated locally:

- `before/desktop/cameroonian/contact.jpg`
- `before/desktop/cameroonian/blog.jpg`

### 5. Contact actions were cramped on mobile

The social CTA buttons wrapped unevenly and felt mechanically laid out rather than composed.

Representative baseline examples generated locally:

- `before/mobile/cameroonian/contact.jpg`
- `before/mobile/rice/contact.jpg`

### 6. Blog post shells mixed token systems

The blog post layout was mixing module-only variables with global variables. That is a fragile way to theme anything and makes future refinement harder.

Representative baseline example generated locally:

- `before/desktop/rice/blog--mcp-in-production.jpg`

## Fixes Applied

### Theme logic

- exported a single dark-theme helper and corrected the dark-mode model
- stopped treating `rice` and `cameroonian` as dark themes
- updated document `color-scheme` to reflect the active theme

Files:

- [ThemeContext.tsx](/Users/hopeatina/Code/portfolio/hopefolio/src/modules/mode-switch/ThemeContext.tsx)
- [Layout.tsx](/Users/hopeatina/Code/portfolio/hopefolio/src/components/layout/Layout.tsx)
- [globals.css](/Users/hopeatina/Code/portfolio/hopefolio/src/styles/globals.css)

### Token completion

- added the missing RGB, text, border, shell, and transition aliases to the global theme layer for all themes
- removed accidental reliance on undefined CSS variables

File:

- [theme-variables.css](/Users/hopeatina/Code/portfolio/hopefolio/src/styles/theme-variables.css)

### Header

- light themes now use light chrome on non-hero pages
- hero-over-dark behavior remains intact
- reduced top padding and softened the shell for better page composition
- unified text, border, and selected-state handling

File:

- [Header.tsx](/Users/hopeatina/Code/portfolio/hopefolio/src/components/layout/Header.tsx)

### Footer

- rebuilt the footer as a denser, cleaner closing surface
- improved column hierarchy, alignment, and icon treatment
- removed the “leftover page furniture” feeling

File:

- [Footer.tsx](/Users/hopeatina/Code/portfolio/hopefolio/src/components/layout/Footer.tsx)

### Contact page

- tightened card spacing
- converted the social button group to a stable two-column grid
- improved mobile layout rhythm and footer transition

File:

- [contact.tsx](/Users/hopeatina/Code/portfolio/hopefolio/src/pages/contact.tsx)

### Blog surfaces

- simplified the blog post shell
- replaced invalid token references with the completed global token layer
- reduced decorative noise and improved section calmness

Files:

- [BlogLayout.tsx](/Users/hopeatina/Code/portfolio/hopefolio/src/components/blog/BlogLayout.tsx)
- [blog/index.tsx](/Users/hopeatina/Code/portfolio/hopefolio/src/pages/blog/index.tsx)

## Representative After Captures

Generated locally:

- `after/desktop/rice/home.jpg`
- `after/desktop/cameroonian/about.jpg`
- `after/desktop/cameroonian/blog.jpg`
- `after/desktop/cameroonian/contact.jpg`
- `after/desktop/rice/blog--mcp-in-production.jpg`
- `after/mobile/cameroonian/contact.jpg`
- `after/mobile/rice/contact.jpg`
- `after/desktop/futuristic/contact.jpg`

## Residual Issues

These are still real, but they are outside the theme/layout pass completed here:

- build warnings remain for several `<img>` usages and some pre-existing hook warnings
- dev mode still logs existing viewport-meta and title-array issues from other parts of the app
- the mobile projects index is structurally long because the content model is dense; it is visually stable now, but still a candidate for a dedicated mobile editorial pass

## Verification

Commands run:

- `npx eslint src/modules/mode-switch/ThemeContext.tsx src/components/layout/Layout.tsx src/components/layout/Header.tsx src/components/ui/StateBadge.tsx src/components/layout/Footer.tsx src/components/blog/BlogLayout.tsx src/pages/blog/index.tsx src/pages/contact.tsx scripts/theme-audit-capture.spec.js`
- `npm run build`
- `THEME_AUDIT_PHASE=before THEME_AUDIT_BASE_URL=http://127.0.0.1:3013 npx playwright test scripts/theme-audit-capture.spec.js --workers=1`
- `THEME_AUDIT_PHASE=after THEME_AUDIT_BASE_URL=http://127.0.0.1:3015 npx playwright test scripts/theme-audit-capture.spec.js --workers=1`
