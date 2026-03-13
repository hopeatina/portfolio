# Visual Verification Workflow

This document makes visual verification a required part of the portfolio redesign.

The goal is simple: do not rely on taste alone, and do not wait until the end to discover that the interface missed the mark.

Verification must happen in three phases:

1. before implementation
2. during implementation
3. after implementation

This applies to homepage work, projects index work, and flagship case study work.

## Standard

Every meaningful UI change should be visually checked on:

- desktop
- mobile at `375px`
- reduced motion mode conceptually or via browser preference when possible

Use Playwright for captures and state verification when the page is running locally.

Scoring reference:

- [portfolio-100-10-design-charter.md](./portfolio-100-10-design-charter.md)
- [portfolio-design-pass-template.md](./portfolio-design-pass-template.md)

Repo baseline:

- local dev server via `npm run dev`

## Before Implementation

Purpose:

- calibrate the target
- reduce aesthetic drift
- choose the proof surfaces before building

### Required tasks

#### 1. Capture current state

Before touching a surface, capture:

- desktop screenshot of current implementation
- mobile screenshot of current implementation

Surfaces to capture:

- homepage
- projects index
- each flagship case study being changed

#### 2. Capture reference examples

For any major redesign, collect 2-4 references that represent:

- calm hierarchy
- artifact-first review
- state clarity
- agent-native flow

Use references from:

- OrgX internal design docs and screenshots
- OpenAI Canvas / Deep Research
- GitHub Copilot coding agent
- Cursor background agents
- Linear triage

#### 3. Define visual target

For the specific surface, write down:

- primary action
- primary proof surface
- state model
- what should feel quieter than before
- what should feel sharper than before

#### 4. Choose artifact sources before design

Decide which concrete proof objects will be used:

- screenshot
- diagram
- metric cluster
- code excerpt
- system snapshot

This prevents decorative placeholders from sneaking back in.

### Before-phase checklist

- Do we have current desktop and mobile captures?
- Do we have at least 2 relevant references?
- Have we named the primary action for this surface?
- Have we chosen the proof/artifact sources up front?

## During Implementation

Purpose:

- catch drift early
- verify hierarchy before polishing
- prevent hover-only or desktop-only design

### Checkpoint rhythm

Take visual checkpoints after each meaningful module is implemented, not only after the whole page is done.

Examples:

- hero checkpoint
- attention module checkpoint
- flagship cards checkpoint
- capabilities section checkpoint
- receipts section checkpoint

### What to verify at each checkpoint

#### 1. Hierarchy

- Is the first thing to look at obvious?
- Is there one dominant action?
- Are proof and artifacts visible without interaction?

#### 2. State clarity

- Are states visible and understandable?
- Are labels doing real work?
- Is color only reinforcing meaning, not carrying it alone?

#### 3. Artifact quality

- Does the visual evidence support the claim?
- Is the artifact legible at the current size?
- Is the page still strong if the artifact is the focal point?

#### 4. Motion behavior

- Is motion adding clarity or just presence?
- Are reveals too dramatic?
- Would the layout still read without animation?

#### 5. Mobile behavior

- Does the layout stack with hierarchy intact?
- Are cards still understandable without hover?
- Is anything turning into a long unlabeled image column?

### During-phase capture matrix

For each checkpoint, capture:

- desktop full-width screenshot
- mobile screenshot
- one cropped screenshot of the changed module if helpful

### During-phase intervention rule

If a checkpoint fails one of these, stop and correct before moving on:

- no obvious first action
- proof hidden behind hover
- artifact unreadable
- too many equally loud cards
- mobile hierarchy collapse

## After Implementation

Purpose:

- validate the final experience
- confirm the redesign feels agent-first, not just different

### Required final checks

#### 1. Full-page desktop review

Check:

- flow from top to bottom
- pacing between sections
- section-to-section coherence
- consistency of states, proof, and CTAs

#### 2. Full-page mobile review

Check:

- hierarchy survives
- proof still surfaces early
- interaction density is manageable
- no accidental visual clutter

#### 3. Interaction review

Check:

- hover states are additive, not required
- CTA interactions feel restrained
- expandable modules feel intentional
- the page does not behave like a noisy dashboard

#### 4. Reduced-motion review

Check:

- the design still reads without animation
- no key meaning depends on animation timing

#### 5. 10-second test

Ask:

- Can a target-company hiring manager tell what you build within 10 seconds?
- Can they identify 2-3 flagship systems quickly?
- Does the site imply agent-system maturity rather than generic AI interest?

#### 6. Evidence test

Ask:

- Are the strongest claims attached to visible proof?
- Is there enough artifact evidence above the fold and in flagship cards?
- Do the case studies show judgment boundaries clearly?

#### 7. Design bar check

Ask:

- Does this surface score `9/10` or higher against the design charter?
- Has the design pass template been completed for this surface?
- Is the page more authored because of subtraction, not decoration?

## Surface-Specific Verification Guides

## Homepage

Before:

- capture current hero and section flow
- select hero proof items and attention cards

During:

- verify hero at desktop/mobile
- verify `What needs attention`
- verify flagship cards with proof visible pre-click

After:

- full-page flow review
- 10-second comprehension test

## Projects Index

Before:

- capture current featured/selected structure

During:

- verify grouping logic
- verify card maturity labels
- verify flagship vs supporting hierarchy

After:

- confirm page reads like a review queue, not a gallery

## Flagship Case Studies

Before:

- capture current page
- select hero artifact and architecture artifact

During:

- verify hero state snapshot
- verify architecture readability
- verify receipts and decision boundaries

After:

- full-page review
- mobile one-fast-scroll comprehension check

## What Good Looks Like

The redesign is visually successful if:

- the site feels composed, not generated
- proof is visible early
- artifacts carry narrative weight
- state is legible
- motion is calm
- mobile keeps hierarchy intact
- the experience suggests real operational taste

## Failure Signals

Stop and revise if the page starts to look like:

- an AI-themed marketing site
- a dashboard with fake telemetry
- a stack of hover cards
- a portfolio gallery with stronger copy but the same interaction quality
- a terminal cosplay interface

## Suggested Working Ritual

For each major UI task:

1. capture current state
2. define target feeling and proof object
3. build one module
4. capture desktop + mobile
5. correct immediately if hierarchy or proof is off
6. continue to next module
7. run final full-page review at the end

This is the workflow that keeps the redesign from drifting off-course.
