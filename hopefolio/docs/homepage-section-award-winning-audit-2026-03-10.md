# Homepage Section Audit

This is a hard visual critique of the current homepage based on section-level screenshots and the standards in:

- [portfolio-100-10-design-charter.md](./portfolio-100-10-design-charter.md)
- [homepage-design-pass-2026-03-10.md](./homepage-design-pass-2026-03-10.md)

The question is not whether the page is "good enough."

The question is: what would an award-winning designer refuse to let ship?

## Cross-Cutting Problems

- An award-winning designer would not let the sticky header bisect section compositions while scrolling. The section captures repeatedly show the header slicing through titles and top rhythm, which means the page lacks a fully controlled scroll-state composition.
- An award-winning designer would not switch emotional register this abruptly. The homepage moves from a dark cinematic hero into soft lavender body sections without enough transitional logic.
- An award-winning designer would not reuse the same white-card-on-pastel recipe this many times in a row. The page starts to feel systematized by component defaults instead of authored by intent.
- An award-winning designer would not rely this heavily on small uppercase labels to establish hierarchy. Eyebrows are doing too much work that stronger form and better pacing should handle.
- An award-winning designer would not let the best proof objects live inside generic rectangular cards. The interface still explains seriousness more than it embodies it.

## 1. Hero

Screenshot:

- [01-hero-clean.png](./verification/homepage/sections/01-hero-clean.png)

What an award-winning designer would not do:

- They would not let the 3D background compete this directly with the explanatory copy and proof strip. The headline survives, but the environment is still doing too much visual talking.
- They would not let the review panel feel visually bolted onto the hero instead of emerging from the same object language.
- They would not let the bottom proof strip fall this quiet relative to the headline and CTAs. It is useful information, but it feels subordinate enough to be missed.
- They would not let the navigation bar read as a generic site shell over a supposedly instrument-like hero. The chrome and the hero are not yet in full agreement.

What this section still needs:

- a more singular review object
- a quieter, more disciplined background
- stronger integration between hero thesis and review panel

Relevant files:

- `src/components/ui/Hero3D.tsx`
- `src/components/layout/Header.tsx`

## 2. Supporting Review Queue

Screenshot:

- [02-supporting-review-queue-clean.png](./verification/homepage/sections/02-supporting-review-queue-clean.png)

What an award-winning designer would not do:

- They would not headline a section with "adjacent to the core story." It frames the content as secondary and apologetic instead of confidently curated.
- They would not let the left title column dominate that much while the actual queue content gets compressed into a narrow, repetitive list.
- They would not allow this much eye travel between state, title, proof, and CTA on each row. The rows read more like spreadsheet fragments than a designed review surface.
- They would not accept the sticky header cutting directly through the section’s top composition.

What this section still needs:

- a better title that does not sound subordinate
- tighter row composition with less left-right ping-pong
- fewer structural repetitions

Relevant files:

- `src/components/ui/WhatNeedsAttention.tsx`

## 3. Shipped in Production

Screenshot:

- [03-shipped-in-production-clean.png](./verification/homepage/sections/03-shipped-in-production-clean.png)

What an award-winning designer would not do:

- They would not give four companies almost identical visual weight when the real proof hierarchy is not equal.
- They would not use inset sub-cards for "Impact" inside already large cards unless the nesting created meaningful structure. Here it mostly adds bulk and sameness.
- They would not let logo placement feel this incidental and inconsistent from card to card.
- They would not keep the intro copy this long when the section should be about immediate credibility.
- They would not let the sticky header disrupt the top of the section.

What this section still needs:

- one clearly dominant production story
- flatter card architecture
- faster credibility extraction

Relevant files:

- `src/components/ui/CompanyLogos.tsx`

## 4. Flagship Systems

Screenshot:

- [04-flagship-systems-clean.png](./verification/homepage/sections/04-flagship-systems-clean.png)

What an award-winning designer would not do:

- They would not let the lead flagship artifact mismatch the flagship story. The OrgX card is visually topped by an image that reads like another project entirely, which destroys trust instantly.
- They would not title the section "Start with the strongest object" and then allow the section to still feel partially grid-driven.
- They would not let the OpenClaw row get visually compressed into the leftover shape at the bottom.
- They would not keep this much text in the OrgX primary card without a sharper focal object inside it.
- They would not let the sticky header intrude on the section composition.

What this section still needs:

- correct artifact imagery for OrgX
- a more unforgettable primary flagship object
- better treatment of the secondary and tertiary systems

Relevant files:

- `src/components/ui/FeaturedProjects.tsx`
- `src/data/homepage.ts`

## 5. Operating Model

Screenshot:

- [05-operating-model-clean.png](./verification/homepage/sections/05-operating-model-clean.png)

What an award-winning designer would not do:

- They would not let the section heading sit half-hidden behind the sticky header.
- They would not repeat the same labels twice in slightly different roles. "Control" appears as both selector framing and detail framing, which wastes hierarchy.
- They would not leave this much dead space in the main detail panel relative to the content actually being shown.
- They would not let the selector rail feel this generic. It looks like safe product UI, not authored interaction design.
- They would not let the section promise behavior and then resolve into a mostly static information board.

What this section still needs:

- cleaner scroll composition
- more expressive state difference in the selector rail
- a stronger sense of interaction consequence

Relevant files:

- `src/components/ui/TechStack.tsx`

## 6. By the Numbers

Screenshot:

- [06-by-the-numbers-clean.png](./verification/homepage/sections/06-by-the-numbers-clean.png)

What an award-winning designer would not do:

- They would not let three statistic cards share such equal weight when the numbers have different strategic value.
- They would not use big numerals without stronger directional context. The numbers are legible, but the section still stops short of turning them into argument.
- They would not let the stat card design read this generically. It feels like a competent metrics block, not a memorable proof surface.
- They would not need both "Receipts" and "By the numbers" to explain the same section.

What this section still needs:

- stronger ordering of which proof matters most
- more contextual meaning around each number
- less template-like card treatment

Relevant files:

- `src/components/ui/Testimonials.tsx`

## 7. CTA

Screenshots:

- [07-cta-clean.png](./verification/homepage/sections/07-cta-clean.png)
- [07-cta-ref.png](./verification/homepage/sections/07-cta-ref.png)

What an award-winning designer would not do:

- They would not let the "Best fit" pill cluster read like residual badge soup after the rest of the homepage has already been tightened.
- They would not keep the right-side panel this generic if the section is supposed to close with conviction.
- They would not let the CTA section revert into familiar SaaS-gradient language without a stronger connection to the review/control aesthetic established earlier.
- They would not allow the section to close with a strong headline but a comparatively conventional supporting object.

What this section still needs:

- a sharper closing object
- fewer pill-like treatments
- a closer relationship to the homepage’s control-plane thesis

Relevant files:

- `src/components/ui/CTASection.tsx`

## Highest-Priority Fixes

- Fix the incorrect or trust-breaking flagship artifact in the flagship systems section.
- Resolve sticky-header composition so sections do not read as interrupted while scrolling.
- Replace repetitive white-card compositions with more intentional object differentiation.
- Strengthen the hero review object so it becomes memorable, not merely competent.
- Reduce remaining label and pill dependency, especially in the CTA and supporting-review sections.
