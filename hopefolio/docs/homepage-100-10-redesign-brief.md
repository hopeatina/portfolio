# Homepage 100/10 Redesign Brief

This document translates the current homepage critique into a concrete redesign target.

It is tied to the current implementation in:

- [Hero3D.tsx](../src/components/ui/Hero3D.tsx)
- [WhatNeedsAttention.tsx](../src/components/ui/WhatNeedsAttention.tsx)
- [FeaturedProjects.tsx](../src/components/ui/FeaturedProjects.tsx)
- [TechStack.tsx](../src/components/ui/TechStack.tsx)
- [StateBadge.tsx](../src/components/ui/StateBadge.tsx)
- [Header.tsx](../src/components/layout/Header.tsx)
- [homepage.ts](../src/data/homepage.ts)

Use it alongside:

- [portfolio-100-10-design-charter.md](./portfolio-100-10-design-charter.md)
- [homepage-agent-first-implementation-spec.md](./homepage-agent-first-implementation-spec.md)
- [visual-verification-workflow.md](./visual-verification-workflow.md)

## Current Score

Current homepage quality is roughly `7.5/10`.

It is clear and much stronger than the old portfolio, but it still feels like a good modern portfolio rather than a singular product object.

## North Star

The homepage should feel like:

- a reputation control plane
- a review room for serious systems
- a calm instrument for inspecting how you think

It should not feel like:

- a portfolio template with better copy
- a dark-mode AI landing page
- a grid of equally weighted project cards

## Current Problems

### 1. The hero is still too distributed

Current issue:

- [Hero3D.tsx#L143](/Users/hopeatina/Code/portfolio/hopefolio/src/components/ui/Hero3D.tsx#L143)

Symptoms:

- name, proposition, proof stats, CTAs, and review rail all compete
- the eye does not settle on one inevitable object

### 2. Mobile loses the control-plane concept

Current issue:

- [Hero3D.tsx#L248](/Users/hopeatina/Code/portfolio/hopefolio/src/components/ui/Hero3D.tsx#L248)

Symptoms:

- the review rail disappears
- the first fold becomes mostly display typography
- the site feels poster-like instead of inspectable

### 3. The object language is too uniform

Current issue:

- [WhatNeedsAttention.tsx#L55](/Users/hopeatina/Code/portfolio/hopefolio/src/components/ui/WhatNeedsAttention.tsx#L55)
- [FeaturedProjects.tsx#L119](/Users/hopeatina/Code/portfolio/hopefolio/src/components/ui/FeaturedProjects.tsx#L119)
- [TechStack.tsx#L138](/Users/hopeatina/Code/portfolio/hopefolio/src/components/ui/TechStack.tsx#L138)

Symptoms:

- too many similarly treated cards
- repeated border + blur + rounded panel recipe
- insufficient distinction between major and minor objects

### 4. There are too many labels and pills

Current issue:

- [StateBadge.tsx#L48](/Users/hopeatina/Code/portfolio/hopefolio/src/components/ui/StateBadge.tsx#L48)
- [FeaturedProjects.tsx#L149](/Users/hopeatina/Code/portfolio/hopefolio/src/components/ui/FeaturedProjects.tsx#L149)
- [TechStack.tsx#L191](/Users/hopeatina/Code/portfolio/hopefolio/src/components/ui/TechStack.tsx#L191)

Symptoms:

- state badge plus artifact label plus proof pills plus tag pills
- too much small metadata competing with the actual system name

### 5. The page says "agent-first" more than it feels "agent-first"

Current issue:

- [homepage.ts#L37](/Users/hopeatina/Code/portfolio/hopefolio/src/data/homepage.ts#L37)

Symptoms:

- review objects are static
- no inspectable state progression
- no artifact unfolding
- no explicit human decision boundary in the homepage itself

### 6. OrgX is not dominant enough

Current issue:

- [FeaturedProjects.tsx#L23](/Users/hopeatina/Code/portfolio/hopefolio/src/components/ui/FeaturedProjects.tsx#L23)
- [FeaturedProjects.tsx#L119](/Users/hopeatina/Code/portfolio/hopefolio/src/components/ui/FeaturedProjects.tsx#L119)

Symptoms:

- the strongest differentiator is one card among peers
- the flagship story is too symmetric

### 7. The theme control is tonally too loud

Current issue:

- [Header.tsx#L223](/Users/hopeatina/Code/portfolio/hopefolio/src/components/layout/Header.tsx#L223)

Symptoms:

- `Change Reality` is clever, but it visually competes with the actual portfolio thesis
- it makes the site feel more playful than precise

## Required Redesign Moves

### Move 1. Make the hero about the thesis, not the name

Required change:

- demote the visual dominance of `Hope Atina`
- promote the proposition and one review object

Target:

- header carries identity
- hero carries thesis

### Move 2. Replace the right rail with one authored inspection object

Required change:

- stop stacking multiple mini-cards in the hero
- use one compact review object that feels like a real system panel

The object should include:

- current system in focus
- state
- one artifact or proof row
- one direct inspection action

This object should work on both desktop and mobile.

### Move 3. Make mobile first-fold inspectable

Required change:

- mobile first fold must contain:
  - thesis
  - primary CTA
  - one proof-bearing review object

No acceptable mobile state should depend on scrolling to discover the interface concept.

### Move 4. Reduce metadata by half

Required change:

- keep only one high-value state label per object
- remove repeated small labels where the title already does the job
- collapse proof pills into fewer, stronger proof statements

### Move 5. Break the repeated card recipe

Required change:

- hero object, review queue, flagship object, and operating pillars must feel like different classes of object
- stop treating every section as a large rounded panel with similar edge language

### Move 6. Make OrgX the homepage anchor

Required change:

- OrgX should dominate the flagship section
- the layout should become asymmetric

Suggested pattern:

- one large flagship object for OrgX
- two medium supporting objects
- one compact tertiary object

### Move 7. Replace brochure cards with inspectable artifacts

Required change:

- the hero and flagship sections should show more inspection surfaces and fewer generic thumbnails

Good homepage artifacts:

- architecture snippets
- system snapshot panels
- command/output fragments
- run-state summaries

### Move 8. Demote the theme switcher

Required change:

- keep the theme system, but reduce the visual authority of the control
- rename or restyle it so it no longer reads like a theatrical primary action

## Homepage-Specific Acceptance Criteria

The homepage passes this redesign brief only if all of these are true:

- the single most important thing in the first viewport is the thesis, not the name
- there is one authored inspection object above the fold
- mobile exposes the same concept, not a simplified poster
- OrgX is visibly the anchor system
- the number of badge-like objects is significantly reduced
- each major section has a distinct object role
- the header tone supports seriousness rather than novelty

## Implementation Order

1. Redesign `Hero3D` around one inspection object
2. Adjust `homepage.ts` data model to support a single focus object plus supporting queue
3. Rebuild `FeaturedProjects` into an asymmetric flagship layout
4. Simplify `StateBadge` and remove secondary metadata pills where possible
5. Tame `Header` theme-switcher tone
6. Re-run desktop and mobile verification
