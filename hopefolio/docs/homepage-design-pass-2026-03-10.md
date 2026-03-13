# Design Pass

## Surface

- page or component: homepage
- current branch: `main`
- related files:
  - `src/pages/index.tsx`
  - `src/components/ui/Hero3D.tsx`
  - `src/components/ui/WhatNeedsAttention.tsx`
  - `src/components/ui/FeaturedProjects.tsx`
  - `src/components/ui/TechStack.tsx`
  - `src/components/ui/CTASection.tsx`
  - `src/components/ui/StateBadge.tsx`
  - `src/components/layout/Header.tsx`
  - `src/data/homepage.ts`

## Goal

- what should feel sharper?
  - the thesis, the dominant proof object, and the first action
- what should feel quieter?
  - theme controls, badge density, equal-weight cards, and decorative section scaffolding
- what should dominate?
  - the statement that Hope builds infrastructure for autonomous AI agents, with OrgX as the primary review object
- what proof should become visible?
  - real operator surfaces, review state, real shipped systems, and flagship-system hierarchy

## Score Before

- overall score: `7.5/10`
- thesis score: `8/10`
- hierarchy score: `6.5/10`
- proof score: `7.5/10`
- mobile score: `6/10`

## Findings

### Critical

- finding:
  - the mobile first fold clipped the hero headline and pushed the primary action below the review object
- why it breaks the 100/10 bar:
  - the mobile surface failed the charter requirement that the first fold preserve thesis, action, and proof-bearing object
- file reference:
  - `src/components/ui/Hero3D.tsx`
  - `src/pages/index.tsx`

- finding:
  - several hero and CTA opacity classes were invalid Tailwind tokens, causing muted text to fall back to darker inherited color
- why it breaks the 100/10 bar:
  - supporting copy became unreadable, which flattened proof and destroyed quiet confidence
- file reference:
  - `src/components/ui/Hero3D.tsx`
  - `src/components/ui/CTASection.tsx`

### Major

- finding:
  - the hero wrapped too many competing ideas into one viewport: thesis, identity, proof strip, CTA row, and full review panel
- why it weakens perception:
  - the user understood the content, but the page did not feel inevitable
- file reference:
  - `src/components/ui/Hero3D.tsx`

- finding:
  - the page used the same rounded-card recipe too often, especially in support surfaces
- why it weakens perception:
  - the object language started to feel component-driven instead of authored
- file reference:
  - `src/components/ui/WhatNeedsAttention.tsx`
  - `src/components/ui/FeaturedProjects.tsx`
  - `src/components/ui/TechStack.tsx`

### Minor

- finding:
  - the hero signal strip is still quieter than ideal relative to the CTA row
- why it still matters:
  - the proof is present, but it is not yet pulling enough weight in the visual rhythm
- file reference:
  - `src/components/ui/Hero3D.tsx`

- finding:
  - the homepage is materially stronger but still not fully at the `9/10+` authored-object bar
- why it still matters:
  - OrgX is dominant now, but the right-side inspection surface still reads as a polished panel rather than a truly unforgettable control object
- file reference:
  - `src/components/ui/Hero3D.tsx`

## Redesign Moves

1. dominant idea:
   - reduce the homepage thesis to one statement: `Infrastructure for autonomous AI agents`
2. dominant object:
   - keep OrgX as the primary review object and restructure the hero around a single inspection panel
3. subtraction list:
   - remove loud theme language
   - reduce animation delay on critical copy
   - remove equal-weight flagship treatment
   - remove dead-muted text caused by broken utility tokens
4. proof changes:
   - move from generic cards to explicit review state, proof receipts, shipped-production section, and asymmetric flagship hierarchy
5. mobile changes:
   - shrink headline scale
   - surface the primary CTA before the compact mobile review card
   - preserve a proof-bearing object in the first fold
6. motion changes:
   - reduce hero reveal latency so the thesis and proof read immediately instead of staging too theatrically

## Visual Verification

### Before

- desktop capture:
  - `docs/verification/homepage/pass2-after-desktop.png`
- mobile capture:
  - `docs/verification/homepage/pass2-after-mobile.png`
- references used:
  - `docs/portfolio-100-10-design-charter.md`
  - `docs/homepage-100-10-redesign-brief.md`
  - `docs/agent-ui-patterns.md`

### During

- checkpoint 1:
  - `docs/verification/homepage/pass3-after-desktop.png`
  - verified improved full-page pacing but exposed invalid text-opacity tokens
- checkpoint 2:
  - `docs/verification/homepage/pass4-after-desktop.png`
  - `docs/verification/homepage/pass4-after-mobile.png`
  - verified legibility and mobile review-object preservation after hero/token fixes
- checkpoint 3:
  - `docs/verification/homepage/pass5-after-mobile.png`
  - verified mobile CTA visibility after moving the compact review object below the action row

### After

- desktop final:
  - `docs/verification/homepage/pass5-after-desktop.png`
- mobile final:
  - `docs/verification/homepage/pass5-after-mobile.png`
- reduced-motion review:
  - not yet explicitly re-captured in browser with reduced motion enabled

## Pass Checklist

- [x] One dominant idea in the first viewport
- [x] One authored object carrying the screen
- [x] Proof visible without hover
- [x] No badge soup
- [x] No equal-weight flagship objects
- [x] Mobile preserves the same core concept
- [x] Header tone matches page seriousness
- [x] Motion explains state, not presence
- [x] The page feels more authored after subtraction

## Score After

- overall score: `8.8/10`
- thesis score: `9.3/10`
- hierarchy score: `8.8/10`
- proof score: `8.7/10`
- mobile score: `8.9/10`

## Go / No-Go

- decision:
  - `go` for this homepage pass as the new baseline
- what still blocks a `9/10+` score:
  - the hero inspection panel still needs a more singular object quality
  - the proof strip could carry more visual confidence
  - reduced-motion verification still needs an explicit pass
- next pass owner:
  - homepage refinement, then apply the same pass template to the projects index and flagship case study pages
