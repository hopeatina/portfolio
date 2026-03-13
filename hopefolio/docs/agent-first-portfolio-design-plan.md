# Agent-First Portfolio Design Addendum

This is the design layer missing from the current portfolio overhaul plan.

The content strategy is already moving in the right direction: proof-first, agent infra, orchestration, production systems. What this addendum does is define how the interaction model, visual hierarchy, and motion language should make the site *feel* agent-native.

This document should be implemented alongside the existing portfolio overhaul plan, not after it.

Related reference:

- [agent-ui-patterns.md](./agent-ui-patterns.md)
- [portfolio-100-10-design-charter.md](./portfolio-100-10-design-charter.md)
- [homepage-100-10-redesign-brief.md](./homepage-100-10-redesign-brief.md)
- [portfolio-design-pass-template.md](./portfolio-design-pass-template.md)
- [visual-verification-workflow.md](./visual-verification-workflow.md)

## Design Bar

This addendum is only valid under the `100/10` design standard documented in:

- [portfolio-100-10-design-charter.md](./portfolio-100-10-design-charter.md)

That means:

- one dominant idea per viewport
- one authored object per screen
- proof visible without hover
- mobile parity
- ruthless subtraction

If a surface does not meet that bar, it is still in progress.

## North Star

The website should not feel like a polished brochure about AI systems.

It should feel like a calm, crafted control plane for reviewing serious technical work.

The user experience should communicate:

- this person builds systems that delegate work cleanly
- this person understands approval, provenance, orchestration, and handoff
- this person knows the difference between agent theater and real agent UX
- this person has taste, restraint, and a product-level understanding of interaction design

The target feeling is:

- future-facing
- precise
- quiet confidence
- information-rich but not noisy
- cinematic in pacing, not gimmicky in styling

## Design Positioning

The portfolio should be framed as:

- a proof surface
- a review surface
- an artifact surface
- a lightweight command center for your body of work

It should *not* be framed as:

- a generic personal website
- a dribbblified design experiment
- a dashboard with fake telemetry
- a chat UI pretending to be agent-native

## Core Design Principles

### 1. One Dominant Action Per View

Every major screen should answer:

- what should I look at first?
- what can I do next?

Homepage:

- dominant action is reviewing flagship systems

Case study page:

- dominant action is inspecting architecture, outcomes, or artifacts

Blog page:

- dominant action is reading an applied technical insight

### 2. Review, Not Browse

The site should feel like reviewing serious work, not browsing project cards.

That means:

- stronger hierarchy
- fewer equally weighted tiles
- more “inspect this system” moments
- visible proof without needing hover effects

### 3. Calm Async Energy

The site should imply systems in motion without behaving like a noisy dashboard.

Use:

- subtle pulses
- delayed reveals
- progressive disclosure
- queue-like grouping

Avoid:

- live-feed theater
- fake log streams
- meaningless counters
- hyperactive transitions

### 4. Artifact-First Storytelling

The strongest proof is not decorative imagery. It is inspectable outputs.

Prioritize:

- architecture diagrams
- screenshots of command centers and tools
- code snippets
- metrics
- review surfaces
- artifact thumbnails

Deprioritize:

- stock-like project images
- abstract hero art with no relation to the work
- decorative card hover gimmicks

### 5. Human-in-the-Loop as a Visual Motif

The interface should repeatedly show the pattern:

- system works in background
- human judgment enters at important boundaries
- results are reviewable
- control is never lost

This is one of the most important signals for agent-first maturity.

## Experience Architecture

### Homepage = Control Plane for Reputation

The homepage should behave like a command center for your work.

Recommended information architecture:

1. Hero / focus surface
2. What needs attention now
3. Shipped in production
4. Systems under review
5. Capabilities as operating pillars
6. Receipts / metrics / proof
7. Writing / research / contact

The current proof-first homepage structure is directionally correct. It needs a stronger interaction model.

### Projects Index = Review Queue

The projects page should not feel like a gallery.

It should feel like:

- featured systems ready for review
- selected systems grouped by type and maturity
- lower-priority work collapsed or demoted

Recommended grouping:

- Flagship systems
- Production systems
- Experimental infrastructure
- Supporting creative systems

### Case Study Pages = Artifact Inspection Surfaces

Each flagship page should feel like a review room for one system.

Recommended flow:

1. Problem brief
2. System state and outcome snapshot
3. Architecture
4. What I built
5. Human decision points / design tradeoffs
6. Proof and receipts
7. Reflection / why it matters

## Homepage Interaction Patterns

## 1. Control Plane Hero

Current component:

- `src/components/ui/Hero3D.tsx`

Update the hero from “beautiful branded intro” to “agent-native focus surface.”

Add:

- a compact focus panel layered into the hero
- one high-priority statement of current positioning
- one strong CTA to inspect systems
- one secondary CTA to inspect how you think

Recommended hero composition:

- eyebrow: domain clarity
- headline: role clarity
- supporting line: production proof
- focus panel:
  - `What needs attention`
  - `4 flagship systems`
  - `3 production environments`
  - `1 orchestration platform`
- CTA row:
  - `Review systems`
  - `Read technical writing`

Important:

- The 3D background can remain, but it must stop being the hero’s main point.
- The layered foreground should feel sharper and more operational.

## 2. “What Needs Attention” Module

This should appear immediately below the hero or partially inside it.

Purpose:

- make the homepage feel like a queue of meaningful review points

Example cards:

- `OrgX: orchestration architecture`
- `Alma: production AI systems`
- `PerfPulse: Rust + AI ops tooling`

Each card should expose:

- state
- one-line proof
- one direct action

Example states:

- `Ready for review`
- `Shipped in production`
- `Live system`
- `Experimental but active`

## 3. Working in Background

Use a collapsed section that summarizes supporting work without overwhelming the page.

Examples:

- `LLM pipelines`
- `motion systems`
- `digital twin experiments`
- `real-time analytics work`

This pattern helps the site feel like a body of systems, not a flat list of projects.

## 4. Proof Rail

Replace passive trust-building with a persistent proof rail pattern.

This can appear as:

- slim horizontal stats band
- side rail on desktop
- stacked proof cards on mobile

Proof types:

- commit depth
- shipped systems
- adoption metrics
- bug reduction
- Homebrew distribution
- real customers / production environments

Key point:

- metrics should always attach to a system, not float as isolated claims

## 5. Artifact Teasers

Featured project cards should preview artifacts, not just a cover image.

Each flagship card should show at least one of:

- diagram thumbnail
- UI screenshot
- output artifact
- metrics cluster
- code or infra snippet

The card should imply:

- this is a system with inspectable internals

not:

- this is a project with a pretty banner

## Case Study Interaction Patterns

### 1. Start With a State Snapshot

At the top of each case study, add a compact system snapshot:

- status
- scope
- outcome
- key proof

Example:

- `State: shipped`
- `Domain: multi-agent orchestration`
- `Proof: 19-repo ecosystem`
- `Why it matters: durable workflows + governance`

This makes the page immediately scannable.

### 2. Show Human Decision Boundaries

Every flagship case study should explicitly show where automation ends and judgment begins.

Examples:

- trust gates
- approval flows
- risk boundaries
- retry / fallback decisions
- quality scoring

This is one of the clearest ways to demonstrate real agent-systems thinking.

### 3. Use Review-Surface Layouts

Important modules should feel like inspection views, not long-form marketing copy.

Patterns to use:

- split-screen architecture + explanation
- expandable “receipts” sections
- evidence or tooling lists
- decision cards
- stateful metrics blocks

### 4. Add Provenance Blocks

Each case study should have a compact block for:

- tools / stack
- where the system ran
- what artifacts it produced
- what proof supports the claims

This supports trust and sharpens the portfolio’s credibility.

### 5. Keep Copy Dense but Breathable

Agent-first design does not mean clutter.

Use:

- short sections
- strong headings
- clear status labels
- sentence-case microcopy
- layered drill-down

Avoid:

- giant text walls
- too many decorative dividers
- overly compressed cards

## Visual Language

### 1. Future Feel Through System Precision

The site should feel futuristic because the interaction model is advanced.

That means:

- strong hierarchy
- clean state transitions
- layered surfaces
- crisp typography
- deliberate disclosure

Not because:

- neon everywhere
- holographic tropes
- generic AI aesthetics

### 2. Surface Hierarchy

Use a clear 4-level surface system:

- Base surface: page background
- Elevated surface: cards and modules
- Focus surface: current high-priority item
- Artifact surface: inspectable proof

This will make the site feel more like a real product system.

### 3. Typography

The typography needs to carry more of the interface intelligence.

Use typography to distinguish:

- state
- section type
- proof vs commentary
- action vs narrative

Desired effect:

- less decorative emphasis
- more operational clarity

### 4. Iconography

Use icons as semantic markers, not decoration.

Good icon roles:

- system state
- artifact type
- review action
- infra domain

Avoid:

- random icon usage in every card
- icon-only meaning

## Motion System

The motion should feel like orchestration, not animation for its own sake.

### Principles

- no bounce
- no flashy springiness
- short and deliberate transitions
- slower reveals for large sections
- instant or reduced motion for system feedback

### Recommended motion use

- staged reveal in hero copy
- subtle pulse for active systems
- soft expansion for evidence panels
- slide/fade for review modules
- tiny directional movement on CTA intent

### Recommended timing

- micro-interactions: 120-180ms
- panel transitions: 180-240ms
- section reveals: 240-400ms

### Reduced motion

This is mandatory for a mature interaction system.

- all meaningful transitions should still read without motion
- no core interaction should depend on parallax or animated reveal

## Interaction Primitives To Add

These are the reusable portfolio-level primitives that would make the site feel agent-first.

### 1. Focus Panel

Purpose:

- show the highest-priority review item

Use in:

- homepage hero
- flagship project headers

### 2. State Badge System

Purpose:

- communicate maturity and review status consistently

Recommended states:

- `Shipped`
- `In production`
- `Ready for review`
- `Experimental`
- `Active build`

### 3. Receipt Block

Purpose:

- attach claims to evidence

Contents:

- metric
- proof source
- environment
- outcome

### 4. Artifact Preview Module

Purpose:

- show architecture / UI / output previews inline

Use in:

- homepage flagship cards
- project cards
- case study headers

### 5. Decision Boundary Callout

Purpose:

- highlight where the system required judgment

Use in:

- OrgX
- Alma
- OpenClaw
- BrainBuffet

### 6. Evidence Drawer

Purpose:

- let users inspect more without expanding the page into clutter

Use in:

- architecture notes
- technical tradeoffs
- citations / links / stack details

## “Feels Like the Future” Guidelines

To get the crafted future feel right:

- reward curiosity with depth
- hide complexity until asked for it
- make every interaction feel intentional
- use fewer, better modules
- let the site feel composed, not generated

The emotional target is:

- “This person understands where software is going.”

Not:

- “This person made an AI-themed website.”

## Anti-Patterns to Avoid

### 1. AI Dashboard Cliches

- endless metrics
- fake status feeds
- terminal cosplay
- glowing borders everywhere

### 2. Generic Hover Cards

- image zoom only
- no proof
- no state
- no action

### 3. Decorative Futurism

- excessive gradients
- sci-fi chrome
- too many overlays
- visual noise mistaken for sophistication

### 4. Chat-As-Default

- putting everything in conversation bubbles
- treating artifacts like messages
- no separate review surface

### 5. Flat Storytelling

- every project card weighted equally
- no signal of maturity
- no production vs exploratory distinction

## Changes to the Current Plan

These additions should be merged into the existing plan.

### Add to Phase 2: Homepage Restructure

Add a sub-phase:

- `2.6 Agent-First Interaction Model`

New tasks:

- Convert the hero into a focus surface with a compact control-plane panel
- Add a “What needs attention” module near the hero
- Add a proof rail pattern across the homepage
- Make flagship cards artifact-first instead of image-first
- Introduce state labels on key modules

### Add to Phase 3: Case Study Pages

New requirements for each flagship page:

- top-of-page state snapshot
- explicit human decision points
- provenance / receipts block
- dedicated artifact preview(s)
- architecture review layout, not just narrative sections

### Add to Phase 5: Visual Language Shift

Expand Phase 5 to include:

- surface hierarchy system
- state badge system
- motion timing system
- review-surface modules
- proof-forward artifact treatments

### Add to Verification Plan

Add these checks:

- Can a visitor identify the site’s primary “next action” within 5 seconds?
- Do the flagship cards show proof without hover?
- Does the site imply serious systems in motion without fake telemetry?
- Do case studies make human decision boundaries visible?
- Does the interface still feel strong with reduced motion enabled?
- Does mobile preserve hierarchy and reviewability?

### Add a Visual Verification Track

Visual verification should be treated as a parallel workstream, not an end-of-project QA step.

Required phases:

- before implementation: capture current desktop/mobile states, collect references, choose proof artifacts
- during implementation: take module-level desktop/mobile checkpoints and correct drift immediately
- after implementation: full-page desktop/mobile review, reduced-motion check, and 10-second test

Reference:

- [visual-verification-workflow.md](./visual-verification-workflow.md)

## File-Level Notes

Current files most affected by this addendum:

- `src/components/ui/Hero3D.tsx`
- `src/pages/index.tsx`
- `src/components/ui/FeaturedProjects.tsx`
- `src/components/ui/CompanyLogos.tsx`
- `src/components/ui/TechStack.tsx`
- `src/components/ui/Testimonials.tsx`
- `src/pages/projects/index.tsx`
- `src/pages/projects/orgx.tsx`
- `src/pages/projects/openclaw.tsx`
- `src/pages/projects/perfpulse.tsx`
- `src/pages/projects/alma.tsx`

## Final Standard

If the redesign is working, the portfolio should make a strong technical founder or hiring manager think:

- this person builds real agent systems
- this person understands orchestration and judgment boundaries
- this person has product taste, not just engineering skill
- this site itself demonstrates the interaction standards they would bring to our products

That is the bar.
