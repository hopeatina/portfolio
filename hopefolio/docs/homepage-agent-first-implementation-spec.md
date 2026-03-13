# Homepage Agent-First Implementation Spec

This document translates the portfolio strategy into a concrete homepage implementation plan tied to the current `hopefolio` component structure.

Use this alongside:

- [agent-ui-patterns.md](./agent-ui-patterns.md)
- [agent-first-portfolio-design-plan.md](./agent-first-portfolio-design-plan.md)
- [portfolio-100-10-design-charter.md](./portfolio-100-10-design-charter.md)
- [homepage-100-10-redesign-brief.md](./homepage-100-10-redesign-brief.md)
- [portfolio-design-pass-template.md](./portfolio-design-pass-template.md)
- [visual-verification-workflow.md](./visual-verification-workflow.md)

## Objective

The homepage should feel like a calm control plane for reviewing serious systems work.

It should communicate within 10 seconds:

- what Hope builds
- what systems matter most
- what proof supports those claims
- where human judgment sits inside the systems

The current homepage already has the right broad section order. The missing layer is interaction quality and component behavior.

This spec should now be read together with:

- [homepage-100-10-redesign-brief.md](./homepage-100-10-redesign-brief.md)

The redesign brief is the stricter document. If this implementation spec and the brief disagree, follow the brief.

## Current Homepage Structure

Current page:

- `src/pages/index.tsx`

Current sections:

1. `Hero3D`
2. `CompanyLogos`
3. `FeaturedProjects`
4. `TechStack`
5. `Testimonials`
6. `CTASection`

Current issues:

- hero is visually strong but not operational enough
- production section reads like a credibility strip, not a proof surface
- flagship project cards are image-first, not artifact-first
- capabilities tabs expose technologies but not interaction patterns or receipts
- metrics section is static and detached from systems
- CTA is strong in message but not integrated into the control-plane feel

## Homepage Target Structure

Keep the same high-level order, but upgrade each section to behave like part of a review/control surface.

Target structure:

1. Hero as focus surface
2. `What needs attention` module
3. `Shipped in production` proof section
4. `Systems under review` flagship cards
5. `Operating pillars` capability section
6. `Receipts` metrics section
7. CTA with role-fit and reviewable next steps

## Component-by-Component Spec

## 1. `src/components/ui/Hero3D.tsx`

### Current role

- cinematic entry point
- 3D background with layered title and CTA

### New role

- control-plane hero
- focus surface for current positioning
- bridge between personal identity and serious systems review

### Keep

- 3D background
- theme responsiveness
- strong typography
- current domain-focused copy direction

### Change

Add a foreground layout with two zones on desktop:

- left: primary headline stack
- right: compact focus panel

Stack to single column on mobile.

### New submodules inside hero

#### A. Positioning stack

Contents:

- eyebrow
- headline
- supporting proof line
- CTA row

Required behavior:

- one primary CTA: `Review systems`
- one secondary CTA: `Read technical writing`
- CTA motion should be restrained and directional

#### B. Focus panel

Purpose:

- make the hero feel like a command center, not a title card

Panel title:

- `What needs attention`

Suggested rows:

- `OrgX` — `Ready for review`
- `Alma` — `Shipped in production`
- `PerfPulse` — `Live tool`

Each row should include:

- system name
- state label
- one-line proof
- direct action link

### Interaction rules

- no floating, bouncing UI
- panel should fade/slide in after hero copy, not before
- hover on panel rows should slightly sharpen contrast and reveal action affordance
- no hover-only information that hides core proof

### New data shape

Recommended local data object:

```ts
type FocusItem = {
  name: string;
  state: "Ready for review" | "Shipped in production" | "Live tool" | "Experimental";
  proof: string;
  href: string;
};
```

### Acceptance criteria

- user can identify what you build without scrolling
- user sees at least 3 concrete systems in hero context
- user sees one proof-bearing action surface above the fold
- hero remains legible at `375px`
- hero still works with reduced motion

## 2. `src/pages/index.tsx`

### Current role

- section composition shell

### New role

- information architecture controller for the homepage

### Change

Keep current order, but add a new module directly after `Hero3D`:

- `WhatNeedsAttention`

This should likely be a new component:

- `src/components/ui/WhatNeedsAttention.tsx`

### Responsibilities

- connect hero to proof-first content
- frame the page as a review queue rather than a brochure

### Section labels

Recommended sequence:

1. Hero / focus surface
2. `What needs attention`
3. `Shipped in production`
4. `Systems I've built`
5. `Operating pillars`
6. `Receipts`
7. CTA

### Acceptance criteria

- every section title implies action or evaluation, not generic branding
- the page reads as a guided review flow
- no section feels like filler between hero and projects

## 3. New Component: `src/components/ui/WhatNeedsAttention.tsx`

### Purpose

- create the homepage’s first review queue moment

### Content model

Three to four cards only.

Each card includes:

- state label
- title
- one-line proof
- one direct action

Example cards:

- `Ready for review` / `OrgX orchestration model` / `19-repo ecosystem, trust governance, MCP layer` / `Inspect architecture`
- `Shipped in production` / `Alma clinical AI systems` / `Therapist adoption 40% → 89%` / `Review system`
- `Live tool` / `PerfPulse` / `Rust CLI + web dashboard + Homebrew tap` / `Inspect tool`

### Layout

Desktop:

- 3-card row or 2x2 grid

Mobile:

- stacked cards with strong hierarchy

### Interaction rules

- cards should not depend on hover for understanding
- state should be visible immediately
- action should be always present

### Visual rules

- stronger state rail on left edge or top edge
- artifact/icon hint allowed, but keep it restrained
- no giant background image

### Acceptance criteria

- section works as a review queue at a glance
- each card answers `what is it`, `why it matters`, `what can I do`

## 4. `src/components/ui/CompanyLogos.tsx`

### Current role

- production credibility strip

### New role

- shipped-in-production proof board

### Keep

- company set
- role and impact framing

### Change

Move away from “logo as main event.”

The primary content should be:

- company
- role
- impact
- environment type

Logo becomes supporting, not dominant.

### Add

Per card:

- small label like `Healthcare`, `Consumer Health`, `Enterprise Data`, `Research`
- one stronger proof line
- optional `What I shipped` disclosure row

### Interaction rules

- cards can elevate on hover, but must remain informative without hover
- avoid grayscale-logo-first treatment as the visual center

### Acceptance criteria

- section distinguishes you from demo-only candidates
- proof is stronger than branding
- mobile cards remain readable without feeling repetitive

## 5. `src/components/ui/FeaturedProjects.tsx`

### Current role

- flagship project card grid

### New role

- systems-under-review surface

### Core change

Convert the cards from image-first to artifact-first.

### Current issues

- image dominates the card
- tags are visually louder than proof
- metric appears as a floating badge rather than part of the evidence model

### New card anatomy

Each card should have five layers:

1. state
2. system name
3. one-sentence system description
4. proof cluster
5. artifact teaser

### Recommended order

- state badge
- title
- one-line value / domain
- proof row
- artifact preview area
- tags
- CTA

### Proof cluster

Use 2-3 compact facts:

- `1,457+ commits`
- `19 repos`
- `MCP + governance`

Do not isolate one proof badge in a corner.

### Artifact teaser options

Per project, choose one:

- architecture diagram preview
- screenshot of interface
- compact metric grid
- code or CLI excerpt

### New data shape

```ts
type FeaturedProject = {
  title: string;
  slug: string;
  state: "Ready for review" | "Shipped in production" | "Live tool" | "Active build";
  summary: string;
  proof: string[];
  tags: string[];
  artifactType: "diagram" | "screenshot" | "metrics" | "code";
  artifactPreview: string;
};
```

### Interaction rules

- remove image zoom as the primary hover behavior
- use subtle emphasis on CTA and proof row instead
- artifact preview can sharpen or reveal slight detail on hover

### Acceptance criteria

- visitor understands why each flagship system matters without clicking
- cards feel inspectable, not decorative
- artifact preview supports the claim being made

## 6. `src/components/ui/TechStack.tsx`

### Current role

- tabbed capabilities section

### New role

- operating pillars section

### Keep

- tab model
- four-pillar structure

### Change

Each pillar should stop behaving like a technology bucket and start behaving like an operating capability.

### Current issues

- proof line exists, but it is buried
- technologies grid takes too much emphasis
- no explicit interaction pattern or outcome model

### New content model per tab

Each pillar should contain four blocks:

1. `What I build`
2. `How it behaves`
3. `Where it shipped`
4. `Core tools`

Example for orchestration:

- What I build: `multi-agent execution systems with trust gates and handoff`
- How it behaves: `spawn, delegate, pause, approve, resume`
- Where it shipped: `OrgX, OpenClaw plugin`
- Core tools: `MCP Protocol, TypeScript, Supabase, Claude/OpenAI`

### Optional new primitive

- small interaction-pattern chips:
  - `delegation`
  - `review`
  - `handoff`
  - `state`
  - `provenance`

### Acceptance criteria

- each tab answers both technical and product-level questions
- section shows not only tools but operating philosophy

## 7. `src/components/ui/Testimonials.tsx`

### Current role

- metrics section

### New role

- receipts section

### Change

Rename internally in the design language from `By the Numbers` to a receipts-style module, even if visible heading remains `By the Numbers`.

### Current issues

- cards are isolated metrics
- metrics do not map strongly enough to systems

### New card anatomy

- metric
- label
- system source
- outcome statement

Example:

- `1,457+`
- `Commits`
- `OrgX`
- `19-repo orchestration platform over the last 12 months`

### Optional enhancement

Add a compact inline label at the top of each card:

- `Receipt`
- `Production result`
- `System proof`

### Acceptance criteria

- every metric maps to a concrete system
- no card feels like standalone brag copy

## 8. `src/components/ui/CTASection.tsx`

### Current role

- closing recruiting CTA

### New role

- final operating-fit CTA

### Change

Keep the message, but make it feel less like a marketing splash band and more like a strong closing prompt after review.

### Layout changes

- reduce pure decorative gradient dominance
- make the section feel like a concluding action panel
- include short role-fit checklist or focus tags

Suggested additions:

- `Looking for: orchestration, MCP/tool calling, observability, AI infra`
- `Best fit: senior IC, infra/product systems, agent platform`

### CTA pair

- `Start a conversation`
- `Review the systems`

### Acceptance criteria

- closing section feels specific and earned
- does not break the calm control-plane tone

## New Primitive Recommendations

These should be reusable, not one-off hacks.

### 1. `FocusPanel`

Use in:

- hero
- potentially case-study headers later

Contents:

- current priority items
- state labels
- direct actions

### 2. `StateBadge`

Use for:

- flagship systems
- case study snapshots
- attention cards

States:

- `Ready for review`
- `Shipped in production`
- `Live tool`
- `Experimental`
- `Active build`

### 3. `ProofCluster`

Use for:

- project cards
- receipts
- case study hero snapshots

Purpose:

- present 2-3 tight proof points with hierarchy

### 4. `ArtifactPreview`

Use for:

- featured project cards
- case study headers

Purpose:

- preview architecture, UI, metrics, or code

## Motion Specification

The homepage motion should suggest orchestration and confidence.

### Use

- fade + slight translate for reveals
- subtle pulse for active-state indicators
- short directional movement on CTA affordances
- slight surface lift on focusable cards

### Avoid

- large-scale zooms
- bouncing buttons
- dramatic spring motion
- repeated hover theatrics

### Suggested timing

- card hover: `120-160ms`
- panel expand: `180-220ms`
- section reveal: `240-320ms`

## Mobile Rules

At `375px`, the homepage should still read as a guided review experience.

Requirements:

- hero focus panel stacks cleanly under copy
- no card relies on hover
- proof rows wrap cleanly
- artifact previews remain legible
- the page never turns into a stack of unlabeled visuals

## Verification Checklist

- Can a hiring manager identify your domain and strongest systems without scrolling?
- Does the hero contain a true review surface, not just text over art?
- Does each flagship card show proof before click?
- Does the production section prioritize impact over logos?
- Do the capability tabs reveal interaction thinking, not just stack familiarity?
- Do the metrics read as receipts tied to systems?
- Does the homepage still feel calm with motion disabled?
- Does the mobile experience preserve hierarchy and proof?

## Visual Verification Gates

Use the full workflow in [visual-verification-workflow.md](./visual-verification-workflow.md).

For the homepage specifically:

- before: capture current homepage desktop + mobile and define target artifact surfaces
- during: checkpoint hero, attention module, flagship cards, capabilities, and receipts separately
- after: run full-page desktop/mobile review and 10-second comprehension test

## Implementation Sequence

Recommended build order:

1. `Hero3D.tsx`
2. new `WhatNeedsAttention.tsx`
3. `index.tsx`
4. `FeaturedProjects.tsx`
5. `CompanyLogos.tsx`
6. `TechStack.tsx`
7. `Testimonials.tsx`
8. `CTASection.tsx`

This order establishes the interaction model early, then pushes it consistently through the rest of the homepage.
