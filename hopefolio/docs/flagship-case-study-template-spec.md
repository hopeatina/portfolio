# Flagship Case Study Template Spec

This document defines the shared interaction and content template for flagship case study pages in `hopefolio`.

Target pages:

- `src/pages/projects/orgx.tsx`
- `src/pages/projects/alma.tsx`
- `src/pages/projects/openclaw.tsx`
- `src/pages/projects/perfpulse.tsx`

Use this alongside:

- [agent-ui-patterns.md](./agent-ui-patterns.md)
- [agent-first-portfolio-design-plan.md](./agent-first-portfolio-design-plan.md)
- [portfolio-100-10-design-charter.md](./portfolio-100-10-design-charter.md)
- [portfolio-design-pass-template.md](./portfolio-design-pass-template.md)
- [visual-verification-workflow.md](./visual-verification-workflow.md)

## Objective

Each flagship case study should feel like a review room for one serious system.

The page should not read like:

- a long narrative with screenshots
- a marketing page for a side project
- a generic portfolio template with new copy

It should read like:

- system brief
- architecture review
- artifact inspection surface
- outcome and decision record

Every flagship case study also has to pass the `100/10` design standard:

- one authored inspection object near the top
- one obvious proof-bearing artifact
- no gallery-like equal weighting
- mobile parity

## Existing Reusable Components

Current reusable project primitives:

- `src/components/projects/ProjectLayout.tsx`
- `src/components/projects/ProjectHero.tsx`
- `src/components/projects/ProjectSection.tsx`
- `src/components/projects/ProjectCard.tsx`
- `src/components/projects/FeatureGrid.tsx`
- `src/components/projects/MermaidDiagram.tsx`
- `src/components/projects/StatsDisplay.tsx`
- `src/components/projects/ProjectCTA.tsx`
- `src/components/projects/TechStack.tsx`

These components are directionally useful, but the flagship pages need stronger structure and a few new primitives.

## Shared Page Structure

Every flagship page should follow this flow:

1. State snapshot hero
2. Problem brief
3. Architecture review
4. What I built
5. Human decision boundaries
6. Proof and receipts
7. Reflection / significance
8. CTA

## Page-Level Spec

## 1. `ProjectLayout`

### Keep

- SEO shell
- back navigation
- single content column

### Change

The layout should better support a review-room feel.

Add:

- slightly stronger top spacing rhythm
- optional sticky subnav or section jump links for longer flagship pages
- tighter max-width control so large diagrams and proofs feel intentional

### Acceptance criteria

- page never feels like a blog wall
- navigation back to projects remains easy
- long pages remain scannable

## 2. `ProjectHero`

### Current role

- title, description, tags, optional image

### New role

- state snapshot hero

### Required new content blocks

#### A. State row

Must include:

- system state
- domain
- proof anchor

Example:

- `State: Shipped`
- `Domain: Multi-agent orchestration`
- `Proof: 19 repos • 1,457+ commits`

#### B. Headline + summary

Must answer:

- what the system is
- why it matters

#### C. Snapshot grid

Add a compact 3-4 item summary block in hero:

- role
- scope
- key outcome
- environment

Example for Alma:

- `Role: Software Engineer`
- `Environment: HIPAA-compliant production`
- `Outcome: therapist adoption 40% → 89%`
- `Core stack: Django, Celery, PostgreSQL`

#### D. Artifact preview

Instead of a generic hero image, use one of:

- product screenshot
- architecture preview
- CLI / dashboard surface
- compact proof montage

### New primitive recommended

- `CaseStudySnapshot`

### Acceptance criteria

- page is scannable in 10 seconds
- state and outcome are visible before reading body copy
- hero artifact is evidence-bearing, not decorative

## 3. `ProjectSection`

### Keep

- simple section wrapper

### Change

Treat sections as review modules rather than generic content blocks.

Each major section should support:

- short intro
- one primary artifact or proof block
- optional drill-down

### Section naming rules

Prefer:

- `Problem`
- `System Architecture`
- `What I Built`
- `Decision Boundaries`
- `Proof`
- `Why It Matters`

Avoid:

- vague conceptual labels
- too many sections on one page

## 4. New Section Type: `Decision Boundaries`

This is mandatory for flagship pages.

Purpose:

- show where automation ended and judgment began
- demonstrate actual agent-systems maturity

### Content model

For each page, include 2-4 decision boundary cards.

Each card contains:

- boundary title
- what the system could do autonomously
- what required human approval or design judgment
- why that boundary mattered

Examples:

#### OrgX

- spawn guards
- approval flows
- trust calibration
- quality thresholds

#### Alma

- compliance and audit boundaries
- retry and fallback logic
- feature-flagged rollout decisions

#### PerfPulse

- what stays local
- when AI suggestions are optional
- security and privacy boundaries

#### OpenClaw

- browser interaction boundaries
- task-control boundaries
- state sync expectations

### New primitive recommended

- `DecisionBoundaryGrid`

## 5. `MermaidDiagram`

### Keep

- architecture review capability

### Change

Treat diagrams as review artifacts, not section decoration.

Each flagship page should have one primary architecture diagram.

Optional second diagram:

- workflow
- data path
- approval model

### Diagram rules

- diagrams must explain one thing well
- no overloaded all-in-one maps
- labels must be human-readable
- mobile behavior must degrade cleanly

### Surrounding context

Every diagram should include:

- one-sentence framing
- one-sentence takeaway

## 6. `FeatureGrid`

### Current role

- card grid for capabilities or features

### New role

- system component review surface

### Use for

- what I built
- subsystems
- decision boundaries
- architectural tradeoffs

### Change

Each card should bias toward one of these patterns:

- subsystem
- workflow stage
- trust/control primitive
- outcome-bearing capability

Avoid generic “feature list” wording.

## 7. `TechStack`

### Current role

- category/technology list

### New role

- implementation substrate summary

### Change

Do not let stack dominate the page.

Use it early, but keep it compact and tied to system shape.

Recommended categories:

- core runtime
- storage / infra
- orchestration / protocol
- observability / quality
- interfaces

### Acceptance criteria

- stack is useful but not the main story
- categories explain the system, not just the resume

## 8. `StatsDisplay`

### Current role

- animated metrics

### New role

- proof snapshot

### Rules

- only use metrics that are specific and credible
- attach each metric to a clear context
- no vanity numbers without explanation

Recommended use:

- top-third or proof section
- 3 to 4 items max

## 9. New Section Type: `Receipts`

This is mandatory.

Purpose:

- attach claims to evidence

### Content model

Each page should include a receipts block with items like:

- shipped environment
- commit depth
- adoption metric
- bug reduction
- distribution method
- customer usage
- production constraints

### Format

Each receipt includes:

- claim
- proof
- source context

Example:

- `Claim: production orchestration system`
- `Proof: 19 repos, 1,457+ commits, live at useorgx.com`
- `Context: built over the last 12 months`

### New primitive recommended

- `ReceiptList`

## 10. New Section Type: `Artifact Review`

Purpose:

- let the user inspect one or two concrete artifacts from the system

Artifact types:

- screenshot
- code excerpt
- command output
- workflow diagram
- interface panel
- generated deliverable

### Rules

- each flagship page should have at least one artifact preview beyond the hero
- artifacts should have captions that explain what matters

## 11. `ProjectCTA`

### Current role

- demo/source CTA

### New role

- next-step action after review

### Change

CTA copy should match page type.

Examples:

#### OrgX

- `View OrgX`
- `Read the orchestration writing`

#### PerfPulse

- `View source`
- `Install via Homebrew`

#### Alma

- likely no source CTA
- use `See more production systems` or `Get in touch`

### Acceptance criteria

- CTA feels earned by the preceding review
- CTA options match available proof and access

## New Reusable Primitives To Add

These are worth building once and reusing across flagship pages.

### 1. `CaseStudySnapshot`

Purpose:

- compact top-of-page state and proof summary

### 2. `StateBadge`

Purpose:

- consistent state signaling across hero, cards, and receipts

### 3. `DecisionBoundaryGrid`

Purpose:

- showcase judgment boundaries clearly

### 4. `ReceiptList`

Purpose:

- attach claims to proof in a structured way

### 5. `ArtifactReviewPanel`

Purpose:

- display screenshots, code, or diagrams as inspectable evidence

## Per-Page Specialization Notes

## OrgX

Bias toward:

- orchestration model
- governance
- trust boundaries
- memory and scoring loops

Must show:

- architecture
- decision boundaries
- ecosystem scale
- why this is not “just another PM tool”

## Alma

Bias toward:

- production constraints
- compliance
- asynchronous workflows
- measurable operational impact

Must show:

- where AI meets healthcare rigor
- why reliability and compliance shaped the implementation

## PerfPulse

Bias toward:

- Rust systems thinking
- interface pluralism
- optional AI layer
- distribution and local-tool credibility

Must show:

- CLI/web/TUI interplay
- security and privacy boundaries

## OpenClaw

Bias toward:

- browser-native control
- orchestration ergonomics
- task management and agent control surfaces

Must show:

- how interaction design supports orchestration, not just extension functionality

## Motion Rules

Case study motion should be quieter than the homepage.

Use:

- small reveal transitions
- minimal hover elevation
- no large animated hero theatrics

Priority:

- reading clarity
- artifact inspection
- state comprehension

## Visual Verification Requirements

Use the workflow in [visual-verification-workflow.md](./visual-verification-workflow.md).

Required checkpoints for every flagship page:

- before: reference capture and artifact selection
- during: hero snapshot, architecture section, proof section review
- after: full-page desktop and mobile validation

## Acceptance Checklist

- Can the page be understood in one fast scroll?
- Is system state visible near the top?
- Is there at least one architecture artifact?
- Are human decision boundaries explicit?
- Are metrics tied to proof?
- Does the page feel like a system review, not a portfolio essay?
- Does the page work on mobile without collapsing into visual noise?
- Does the page remain strong with reduced motion?

## Recommended Build Order

1. upgrade `ProjectHero`
2. add `StateBadge`
3. add `CaseStudySnapshot`
4. add `ReceiptList`
5. add `DecisionBoundaryGrid`
6. retrofit `orgx.tsx`
7. retrofit `alma.tsx`
8. retrofit `perfpulse.tsx`
9. retrofit `openclaw.tsx`

This creates the reusable skeleton first, then applies it to the most important pages.
