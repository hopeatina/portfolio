# Portfolio 100/10 Design Charter

This document defines the design bar for every major surface in `hopefolio`.

Use it alongside:

- [agent-ui-patterns.md](./agent-ui-patterns.md)
- [agent-first-portfolio-design-plan.md](./agent-first-portfolio-design-plan.md)
- [homepage-100-10-redesign-brief.md](./homepage-100-10-redesign-brief.md)
- [portfolio-design-pass-template.md](./portfolio-design-pass-template.md)
- [visual-verification-workflow.md](./visual-verification-workflow.md)

## Standard

The standard is not "good portfolio design."

The standard is:

- unmistakable clarity within 3 seconds
- visible proof within 10 seconds
- authored interaction design, not template polish
- material restraint
- mobile parity
- quiet confidence

Anything below `9/10` is not done.

`10/10` does not mean "more polished."

It means:

- the page has one dominant idea
- the object language feels inevitable
- proof is embedded in the surface
- the hierarchy is felt before it is read
- the interaction model reveals how you think

## What 100/10 Design Feels Like

### 1. One Dominant Idea Per Viewport

Every viewport needs one obvious answer to:

- what is this page about?
- what should I inspect first?

If the eye bounces between multiple equal elements, the design is not ready.

### 2. One Authored Object Per Screen

Each major surface needs one unforgettable object that carries the page.

Examples:

- homepage: a review object or agent-run inspection panel
- projects index: one dominant flagship system card
- case study: one state snapshot or architecture inspection surface

If the page is just a collection of cards, it is not authored enough.

### 3. Proof Over Claims

Claims must be attached to inspectable evidence.

Use:

- architecture diagrams
- screenshots of real interfaces
- receipts
- metrics with context
- review states
- decision boundaries

Avoid:

- decorative hero art that does not encode meaning
- floating stats without source or consequence
- badges that merely restate the headline

### 4. Asymmetric Hierarchy

Important things must take more space, more contrast, or better position.

Never give all flagship systems equal weight.

The strongest project, proof object, or action should dominate.

### 5. Ruthless Reduction

Every page should survive the removal of:

- extra badges
- repeated eyebrows
- duplicate labels
- non-essential borders
- ornamental motion

If the page gets better after removing something, it should stay removed.

### 6. Material Honesty

Surfaces should feel like purposeful objects, not effects applied to rectangles.

The same rounded card, thin border, blur, and soft shadow recipe repeated across every section is not a design system. It is visual laziness.

Each object should justify its:

- edge treatment
- depth
- spacing
- motion
- contrast

### 7. Motion With Causality

Motion must explain state, not decorate presence.

Good motion:

- follows user intent
- reveals new information
- clarifies handoff and focus

Bad motion:

- bounces
- glows for atmosphere only
- adds activity without consequence

### 8. Mobile Parity

The core concept must survive on mobile.

If mobile turns the interface into a poster, the design has failed.

On mobile, the page must still expose:

- the primary thesis
- the primary action
- one proof object or review object

### 9. Typographic Restraint

Typography should feel authored, not loud.

The bar is:

- fewer styles
- fewer all-caps labels
- stronger rhythm
- tighter hierarchy
- more confidence in spacing

### 10. Tonal Coherence

The page must feel like one mind made it.

Do not mix:

- serious infrastructure tone with novelty gimmicks
- future-facing claims with playful chrome
- quiet content with loud controls

## Common Failure Modes

These are automatic deductions.

### Badge Soup

Three or more pill-like labels competing in one object.

Fix:

- keep only the highest-value state label
- turn the rest into plain metadata or remove them

### Eyebrow Overload

Every section using the same small uppercase label pattern.

Fix:

- use section labels only when they disambiguate
- let strong titles do more work

### Equal-Weight Grids

Every system, project, or point treated as equally important.

Fix:

- promote one object
- compress or collapse supporting objects

### Decorative Futurism

Dark gradients, glows, and oversized display type carrying more weight than the actual content.

Fix:

- reduce atmosphere
- increase information-bearing form

### Brochure Architecture

The site talks about orchestration, review, and provenance but does not let the user feel any of those things.

Fix:

- add a review object
- expose a stateful artifact
- show decision boundaries

## Required Design Passes

Every meaningful UI change must pass these six passes.

### Pass 1. Thesis

Can a target hiring manager answer in 3 seconds:

- what do you build?
- why are you differentiated?

### Pass 2. Hierarchy

Can I point to the single dominant object in the viewport without hesitation?

### Pass 3. Proof

Is there visible evidence attached to the strongest claim?

### Pass 4. Object Language

Do surfaces feel intentionally different based on role, or is everything the same card?

### Pass 5. Interaction

Does the page reveal causality, review, and control, or only navigation?

### Pass 6. Mobile

Does the mobile first fold still contain:

- the thesis
- the primary action
- one proof-bearing object

## Surface Requirements

### Homepage

Must include:

- one dominant thesis
- one primary review object
- one clearly dominant flagship system
- visible proof above the fold

### Projects Index

Must include:

- asymmetry between flagship and supporting work
- clear maturity labels
- review-first framing instead of gallery framing

### Flagship Case Studies

Must include:

- state snapshot
- architecture inspection surface
- decision boundaries
- receipts and outcomes

### About / Blog / Contact

Must preserve the same tone:

- fewer gimmicks
- stronger typographic rhythm
- visible seriousness

## Done Criteria

A design pass is done only if all of these are true:

- score is `9/10` or higher
- desktop and mobile captures exist
- the primary action is obvious
- the dominant object is obvious
- proof is visible without interaction
- the page feels more authored after subtraction, not after adding decoration
