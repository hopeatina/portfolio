# Agent UI Patterns Reference

This document captures the strongest agent-product interaction patterns from our portfolio research so they can be reused in:

- Portfolio design decisions
- Future blog posts
- Technical discussions
- Product critiques
- UI explorations and prototypes

The core conclusion is simple: the best agent products do not feel like "more chat." They feel like calm, high-leverage control planes for delegated work.

## Core Thesis

Agent-first UX should optimize for these outcomes:

- Delegation feels explicit, not magical.
- Background work stays quiet until human judgment is needed.
- State is visible without becoming dashboard theater.
- Review feels high-trust, artifact-first, and reversible.
- Context compounds over time instead of being restated every session.
- The interface reduces cognitive overhead rather than adding another stream of notifications.

The right mental model is not "chatbot with buttons." It is:

- Conversation surface for intent and refinement
- Control plane for orchestration and state
- Artifact surface for outputs
- Review queue for approvals, corrections, and takeovers

## Pattern Families

### 1. One Clear Next Action

The best systems reduce the viewport to a single meaningful decision.

Patterns:

- Show one dominant action per screen or panel.
- Phrase the action as a verb: `Review`, `Approve`, `Launch`, `Inspect`, `Take over`.
- Collapse secondary context until it becomes relevant.
- Group lower-priority work under a single summary like `5 things running in background`.

Why it works:

- Delegated systems already introduce uncertainty.
- A strong next action restores user control without forcing them to manage the whole machine.

Best expression:

- Hero or focus panel answers: `What needs me right now?`
- Everything else is subordinate.

### 2. Silent Work, Thoughtful Surfacing

Agent systems should not narrate every internal step.

Patterns:

- Track everything internally, surface almost nothing by default.
- Notify only on:
  - decision required
  - meaningful milestone reached
  - risk, ambiguity, or blocked execution
  - final artifact ready for review
- Prefer ambient indicators over interruptive toasts.
- Group completions into review moments instead of per-task pings.

Why it works:

- Users want outcomes, not job queue theater.
- Constant updates make the system feel fragile and needy.

Good status language:

- `Ready for review`
- `Needs direction`
- `Blocked on auth approach`
- `Working on migration plan`

Bad status language:

- `47% complete`
- `Job #18482 running`
- `Task 3 of 8 complete`

### 3. Review Queue, Not Activity Feed

The best agent products do not make the user monitor logs. They make the user review decisions and outputs.

Patterns:

- Center the UI around `What needs review`, not `What just happened`.
- Present artifacts one at a time or in tight batches.
- Keep actions reversible and explicit.
- Store review history so users can see how judgment shaped future behavior.

Recommended review actions:

- `Approve`
- `Request changes`
- `Ask a question`
- `Defer`
- `Take over`

Why it works:

- Approval is the highest-trust moment in agent UX.
- Good review flow reinforces that the human remains the source of judgment.

### 4. Artifact-First Work Surfaces

Output should be inspectable in its own right, not buried inside chat bubbles.

Patterns:

- Give code, plans, diffs, research, and designs dedicated surfaces.
- Support selection-based refinement instead of only whole-response retry.
- Keep artifact layout stable while the surrounding orchestration UI changes.
- Separate creation from review from execution.

Artifact surface types:

- Editor/canvas
- Diff viewer
- Research brief with citations
- Architecture diagram
- Spec or plan document
- Generated file set with provenance

Why it works:

- Serious work needs stable objects, not ephemeral messages.
- Users need to point, highlight, compare, and annotate.

### 5. Explicit State Machines

Agent systems feel more trustworthy when state is finite, legible, and human-readable.

Recommended state model:

- `Planning`
- `Ready to launch`
- `Running`
- `Needs input`
- `Ready for review`
- `Blocked`
- `Shipped`
- `Archived`

Patterns:

- Use plain-language states everywhere.
- Make transition rules clear.
- Tie each state to an expected user action or no action.
- Avoid ambiguous mixed states like `pending/active`.

Why it works:

- Delegated systems are otherwise hard to reason about.
- A clean state model reduces support burden and interaction anxiety.

### 6. Just-in-Time Context

Context should appear when needed, not as a constant wall of metadata.

Patterns:

- Hide rationale by default, reveal it on demand.
- Use `Why?`, `Because`, `Evidence`, `Assumptions`, and `Receipts` as entry points.
- Show concise summaries first, with drill-down for source material.
- Let agents reference prior decisions naturally instead of dumping raw ancestry chains.

Good context reveal:

- `Why this matters`
- `What changed since last review`
- `Which constraints guided this`
- `What evidence supports this recommendation`

Why it works:

- Full context is valuable, but full context all the time is exhausting.
- Great agent UX makes history feel available, not heavy.

### 7. Provenance and Receipts

Users need to know where outputs came from.

Patterns:

- Attach source links, tool traces, or evidence lists to outputs.
- Distinguish model synthesis from retrieved facts.
- Show which tools, repos, files, or systems contributed.
- Preserve decision trails for sensitive or high-stakes work.

Key questions every artifact should answer:

- What did the agent look at?
- Which tools did it call?
- What assumptions did it make?
- Where can I inspect the evidence?

Why it works:

- Provenance turns "AI said so" into inspectable reasoning.
- It supports debugging, trust, and future iteration.

### 8. Human-in-the-Loop by Design

The strongest systems are not fully autonomous. They are selectively autonomous.

Patterns:

- Ask for approval at expensive, risky, or irreversible boundaries.
- Let the user set autonomy level by task or domain.
- Make handoff and takeover cheap.
- Preserve user edits as training signals or preference signals.

High-risk boundaries that deserve approval:

- deployments
- code merge
- billing actions
- customer communication
- destructive file changes
- security-sensitive auth changes

Why it works:

- Good autonomy is scoped autonomy.
- Users trust systems that know when not to act alone.

### 9. Interruptibility and Takeover

Users should be able to redirect, pause, or take over work without breaking the mental model.

Patterns:

- `Pause`, `Resume`, `Cancel`, and `Take over` should exist for long-running work.
- Follow-ups should append to the current task, not spawn disconnected duplicates.
- Keep state and artifacts intact after interruption.
- Let the system explain what it will preserve before stopping.

Why it works:

- Real work changes mid-flight.
- Non-interruptible automation feels brittle and unsafe.

### 10. Calm Density

Agent interfaces should feel information-rich but emotionally quiet.

Patterns:

- Use strong hierarchy and restrained motion.
- Let typography, spacing, and grouping do most of the work.
- Use color for state sparingly and never as the only signal.
- Prefer stable layouts over constantly shifting cards.
- Keep the viewport readable at a glance.

Good visual cues:

- a single focus panel
- an understated status rail
- subtle pulse for active work
- muted timestamps like `This morning`
- progressive disclosure for detail

Bad visual cues:

- noisy dashboards
- rainbow status chips everywhere
- fake terminal streaming
- over-animated logs
- multiple equally loud cards competing for attention

### 11. Keyboard-First, Power-User Friendly

Agent tools often attract technical users who move faster with command-like interaction.

Patterns:

- Global command surface for intent entry and navigation
- Keyboard shortcuts for approve, defer, inspect, take over
- Search as a first-class control path
- Select-and-refine interaction for artifacts
- Fast escape hatch back to overview

Why it works:

- High-leverage tooling should reward fluency.
- It reinforces the feeling of control and precision.

### 12. Microcopy That Sounds Like a Calm Operator

The tone should be concrete, steady, and useful.

Patterns:

- Use verbs and nouns, not slogans.
- Describe outcomes, not internal implementation.
- Keep reading level low while preserving precision.
- Avoid anthropomorphic hype.

Good copy:

- `Nova paused here until you review.`
- `3 tasks need you.`
- `Ready to review.`
- `Blocked on pricing decision.`

Bad copy:

- `Your AI employees are crushing it`
- `The future of work is here`
- `Unleashing autonomous intelligence`

## Reference Product Patterns

These products are useful because they solve different parts of the agent UX problem well.

### OpenAI Canvas

Strong patterns:

- Separate work surface from chat surface.
- Let users highlight a specific region and refine locally.
- Treat writing/code as an editable artifact, not only a generated message.

Takeaway:

- If the portfolio shows systems work, use dedicated artifact surfaces for diagrams, diffs, specs, and plans.

Reference:

- `https://help.openai.com/en/articles/9930697-what-is-the-canvas-feature-in-chatgpt-and-how-do-i-use-it`

### OpenAI Deep Research

Strong patterns:

- Ask the user to review and approve the plan before long-running execution.
- Support asynchronous work over meaningful durations.
- Return a cited brief rather than a chatty transcript.

Takeaway:

- Planning and approval should be distinct from execution.
- Long-running agent work needs explicit lifecycle and a reviewable output.

Reference:

- `https://help.openai.com/en/articles/10500283-deep-research-faq`

### GitHub Copilot Coding Agent

Strong patterns:

- Delegate work from an existing issue/task object.
- Tie execution to version-controlled artifacts and PRs.
- Keep the human in a review-and-merge role.

Takeaway:

- Agent work feels more trustworthy when attached to existing software primitives like issues, branches, and PRs.

References:

- `https://docs.github.com/en/copilot/concepts/coding-agent/coding-agent`
- `https://github.blog/news-insights/product-news/github-copilot-the-agent-awakens/`

### Cursor Background Agents

Strong patterns:

- Treat background agents as durable sessions, not ephemeral prompts.
- Let users monitor, follow up, and take over.
- Keep execution separate from the main editing flow.

Takeaway:

- Async agent UX should feel like a managed work queue with history and continuation, not a temporary spinner.

Reference:

- `https://docs.cursor.com/background-agent`

### Linear Triage

Strong patterns:

- Extremely crisp decision UI for incoming work.
- Fast, lightweight actions such as archive, backlog, snooze, or request info.
- Minimal ceremony around classification.

Takeaway:

- Agent review queues should borrow from triage UX: one quick judgment, low friction, strong defaults.

Reference:

- `https://linear.app/docs/issues/triage-issues`

### Anthropic Computer Use

Strong patterns:

- Make higher-risk automated actions visually inspectable.
- Keep tool use explicit.
- Reinforce that the system is operating over real interfaces and actions.

Takeaway:

- The more agent actions resemble real-world control, the more important visible mediation and inspectability become.

Reference:

- `https://docs.anthropic.com/en/docs/build-with-claude/computer-use`

## OrgX-Derived Internal Patterns

Our strongest internal references came from OrgX design work. These are especially relevant because they already align with the future portfolio direction.

### From the Momentum Surface Spec

Core idea:

- Deliver one clear next step while the system handles the rest.

Best patterns:

- single focus panel
- blockers and reviews dominate
- background work stays collapsed
- copy stays simple and actionable
- default view fits within the viewport

### From the Design Excellence Review

Core idea:

- `Technology should recede. Progress should emerge.`

Best patterns:

- surface only meaningful milestones
- review one artifact at a time
- show confidence over fake precision
- reveal context only when asked
- prefer decisions over audit logs
- hide dependency complexity behind next-action clarity

### From the Brand Strategy Brief

Core idea:

- agents are instruments that extend judgment, not replacements for it

Best patterns:

- position the user as the director, not the passenger
- use strong grids and subtle motion
- make the interface feel high leverage, not busy

### From the Microcopy System

Core idea:

- grade-6 readability with concrete task language

Best patterns:

- short titles
- direct verb-driven CTAs
- narrative status lines
- zero hype

## Portfolio Translation Patterns

These patterns translate the research into the portfolio itself.

### 1. Homepage as Control Plane, Not Brochure

Use:

- a hero that frames the site as a live proof surface
- a `What needs attention` panel
- a collapsed `Working in background` section
- a visible proof rail with commits, shipped systems, adoption metrics, and architecture thumbnails

Avoid:

- generic marketing hero copy
- decorative project carousels with no proof
- equal emphasis on all projects

### 2. Case Studies as Review Surfaces

Each flagship case study should feel like reviewing a system, not reading a portfolio card.

Include:

- problem brief
- system architecture
- agent workflow or orchestration model
- human decision points
- receipts and outcomes
- artifacts: screenshots, diagrams, code snippets, metrics

### 3. State-Driven Visual Language

Every major module should encode state clearly.

Examples:

- `Ready for review`
- `Needs input`
- `Shipped in production`
- `Still exploratory`

Do not rely only on colored pills. Use hierarchy, labels, placement, iconography, and copy.

### 4. Artifact Surfaces Over Decorative Imagery

Replace vague project imagery with:

- orchestration diagrams
- screenshots of command centers
- review panels
- code or tool traces
- output artifacts with citations or provenance

### 5. Future Feel Through Interaction, Not Sci-Fi Styling

The site should feel advanced because:

- intent is captured clearly
- work is delegated elegantly
- state is calm and legible
- artifacts are interactive
- review and refinement are precise

Not because:

- it has neon gradients everywhere
- it mimics a terminal without real substance
- it floods the screen with "AI activity"

## Anti-Patterns

These patterns consistently weaken agent products and should be avoided in the portfolio and in future design work.

### 1. Chat Everywhere

Problem:

- Everything becomes a transcript, including outputs that should be stable artifacts.

Fix:

- Split chat, artifact, and review surfaces.

### 2. Fake Liveness

Problem:

- Streaming logs and endless micro-updates simulate intelligence but mainly create noise.

Fix:

- Surface progress at milestones and decision boundaries.

### 3. Dashboard Theater

Problem:

- Too many panels, graphs, queues, and status chips create management overhead.

Fix:

- Default to one focus area and collapse the rest.

### 4. Ambiguous Autonomy

Problem:

- Users do not know what the system will do on its own.

Fix:

- Make autonomy scope explicit and editable.

### 5. Missing Receipts

Problem:

- Recommendations look unsupported and fragile.

Fix:

- Show evidence, tools used, and assumptions.

### 6. Anthropomorphic Marketing

Problem:

- "AI employees" framing overpromises and reduces trust.

Fix:

- Frame agents as directed instruments working inside defined constraints.

### 7. Style Without Leverage

Problem:

- Futuristic aesthetics mask weak interaction design.

Fix:

- Earn the future feeling through flow quality, clarity, and precision.

## Reusable Blog and Talk Angles

These are strong starting points for future writing and speaking.

### Agent UX Topics

- Why the best agent products look less like chat and more like control planes
- Silent work, thoughtful surfacing: designing agent systems that do not feel needy
- Review queues over activity feeds: the real center of agent UX
- Artifact-first interfaces: why serious AI work needs stable work surfaces
- Designing state machines for agentic products
- Human-in-the-loop as a product advantage, not a concession

### Orchestration Topics

- How to make delegation feel trustworthy
- Provenance, receipts, and inspectability in multi-agent systems
- When to ask for approval in autonomous workflows
- Why background agents need interruption, continuation, and takeover
- The difference between agent telemetry and user-facing status

### Design Critique Topics

- Why most "AI-native" UIs still feel like support chat
- The problem with dashboard theater in agent products
- What product teams can learn from Linear triage for agent review surfaces
- Canvas, research briefs, and PR workflows: three models for agent output review

## Open Questions for Future Exploration

- What is the right primitive for long-running agent work: task, session, branch, thread, or something new?
- How should trust levels and autonomy scopes be visualized without turning into admin clutter?
- When should agent state feel conversational vs operational?
- How should users compare multiple candidate outputs without overload?
- What is the best review flow for multimodal outputs like code, plans, and designs together?
- How should memory be surfaced so it feels helpful instead of invasive?
- What is the right mobile expression of control-plane UX?

## Practical Heuristics

Use this checklist when evaluating a new agent interface.

- Can the user tell what needs them right now within 5 seconds?
- Is background work quiet until it matters?
- Are outputs stable artifacts or just messages?
- Is provenance visible?
- Is state finite and understandable?
- Can the user pause, redirect, or take over?
- Are risky actions gated by approval?
- Does the interface reduce cognitive load?
- Does the visual design feel calm, deliberate, and high leverage?
- Would this still work if all the "AI" branding were removed?

## Sources

External references:

- OpenAI Canvas: `https://help.openai.com/en/articles/9930697-what-is-the-canvas-feature-in-chatgpt-and-how-do-i-use-it`
- OpenAI Deep Research FAQ: `https://help.openai.com/en/articles/10500283-deep-research-faq`
- OpenAI Agents guide: `https://platform.openai.com/docs/guides/agents`
- GitHub Copilot coding agent docs: `https://docs.github.com/en/copilot/concepts/coding-agent/coding-agent`
- GitHub Copilot agent announcement: `https://github.blog/news-insights/product-news/github-copilot-the-agent-awakens/`
- Cursor background agents: `https://docs.cursor.com/background-agent`
- Linear triage issues: `https://linear.app/docs/issues/triage-issues`
- Anthropic computer use: `https://docs.anthropic.com/en/docs/build-with-claude/computer-use`

Internal references:

- `/Users/hopeatina/Code/orgx/orgx/docs/design/orgx/spec.md`
- `/Users/hopeatina/Code/orgx/orgx/docs/design/orgx/microcopy.md`
- `/Users/hopeatina/Code/orgx/orgx/docs/design/orgx/brand-strategy-brief.md`
- `/Users/hopeatina/Code/orgx/orgx/docs/architecture/DESIGN-EXCELLENCE-REVIEW.md`

Use this document as a source layer, not a script. The goal is not to copy individual products. The goal is to internalize the interaction principles that make agent systems feel trustworthy, powerful, and genuinely new.
