# Projects Design Pass — 2026-03-12

## Scope

- Projects index
- Flagship case study scaffolding
- OrgX case study
- Alma case study
- OpenClaw case study
- PerfPulse case study

## Before

The project surfaces were structurally correct but visually soft:

- the index treated all flagship systems with the same polite card weight
- the project pages opened with the same `tags + title + image` pattern
- vertical feature sections stacked into repeated pastel cards
- proof was present, but not arranged as a review surface
- CTA endings fell back into generic SaaS closure patterns

## What Changed

### Shared project scaffolding

- `ProjectLayout` now uses a calmer reading container and a quieter back-navigation shell.
- `ProjectHero` was rebuilt as a review surface with:
  - explicit eyebrow/context
  - proof facts
  - either a real artifact image or an inspection panel
- `ProjectCard` variants now have materially different tones instead of all mapping to the same card recipe.
- `FeatureGrid` in single-column mode is now a dossier/list surface instead of repeated stacked cards.
- `TechStack` was reframed as `Build surface` instead of a generic tech stack wall.
- `StatsDisplay` now uses calmer proof tiles rather than hover-heavy metric cards.
- `ProjectCTA` now closes as an inspection object rather than a promo card.

### Projects index

- one dominant flagship object: OrgX
- supporting flagship cards are quieter and clearer
- selected work moved to compact review rows where images were not earning trust
- experimental work moved into a low-noise dark list
- the page opens with a reading guide instead of a generic archive header

### Flagship pages

- OrgX now opens with a real artifact and system facts
- Alma, OpenClaw, and PerfPulse now use panel-led heroes that communicate operating constraints and system behavior even without screenshot-heavy artifacts

## Verification

### Before captures

- `docs/verification/projects/before-projects-index-desktop.png`
- `docs/verification/projects/before-orgx-desktop.png`
- `docs/verification/projects/before-alma-desktop.png`

### After captures

- `docs/verification/projects/after-projects-index-desktop.png`
- `docs/verification/projects/after-projects-index-mobile.png`
- `docs/verification/projects/after-orgx-desktop.png`
- `docs/verification/projects/after-orgx-mobile.png`
- `docs/verification/projects/after-alma-desktop.png`
- `docs/verification/projects/after-alma-mobile.png`
- `docs/verification/projects/after-openclaw-desktop.png`
- `docs/verification/projects/after-perfpulse-desktop.png`

### Code gates

- `npx eslint` on the changed project scaffolding and flagship pages
- `npm run build`

## Remaining Gaps

- Some long case study pages still become rhythmically repetitive in the middle third because the underlying content is dense and prose-heavy.
- The index is substantially stronger, but the selected-work rows could become even more editorial over time.
- Case study pages still rely on some placeholder or non-artifact imagery outside the flagship top surfaces.
- Existing `next/image` lint warnings remain on a few `<img>` usages because this pass prioritized hierarchy and object language over image-component migration.

## Rules for Future Project Passes

1. One system should dominate the page. Equal weighting is usually the wrong call.
2. If an image does not increase trust, replace it with a structured artifact panel.
3. Proof should be visible in the first viewport.
4. Single-column feature sections should read like a dossier, not a card stack.
5. Endings should direct inspection, not market the page.
