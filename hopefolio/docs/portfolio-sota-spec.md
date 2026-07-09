# Portfolio SOTA Redesign Spec

## STATUS: APPROVED - 2026-07-09

Approval source: the user asked for an end-to-end SOTA redesign and social walkthrough, then explicitly said “continue” after the audit and proposed production approach.

## Objective

Turn Hope Atina’s portfolio into a distinctive, proof-led scroll narrative that demonstrates the same operating philosophy the work describes. The homepage must make Hope’s role, technical depth, judgment, and current focus legible in seconds, while retaining direct paths for hiring managers, collaborators, and technical reviewers.

## Audience

1. Hiring leaders building agent platforms, AI developer productivity, MCP infrastructure, evals, or observability.
2. Technical founders and engineering leaders evaluating Hope as a senior/staff-level systems engineer.
3. Design- and engineering-aware peers who may share the portfolio socially.

## Narrative Spine

**The Continuity Loop**

1. Context survives.
2. Agents act.
3. Judgment gates risk.
4. Outcomes become memory.

The scroll experience should make that loop visible rather than merely describing it.

## Homepage Requirements

### Scene 00 — Human + thesis

- Show Hope’s real portrait, not an anonymous illustration.
- Lead with: “I build the systems that let AI agents act—without losing the plot.”
- Establish role: senior AI infrastructure engineer and founder of OrgX.
- Expose four proof points above the fold.
- Primary action: enter the operating model.
- Secondary action: hiring brief.

### Scene 01 — The continuity loop

- Four scroll chapters with one sticky proof surface on desktop.
- The proof surface must update as the active chapter changes.
- Each chapter ties one systems principle to a real artifact or metric.
- Native scroll only; no scroll hijacking.

### Scene 02 — Pressure-tested trajectory

- Replace equal company cards with one chronological pressure arc.
- Capital One → Vessel → Alma → OrgX.
- Make the accumulation of judgment explicit, not just the job history.

### Scene 03 — Selected systems

- OrgX visibly dominates.
- Alma, PerfPulse, and OpenClaw appear as supporting proofs with different constraints.
- Use actual product screenshots where available.
- Each item exposes role, consequence, and inspectable evidence.

### Scene 04 — Judgment architecture

- Visualize the human decision boundary.
- Show four principles: preserve context, delegate aggressively, gate by risk, turn failure into memory.
- The visual must communicate the model without requiring the paragraph.

### Scene 05 — Close

- Return to Hope as the human behind the systems.
- Position the next role as a continuation of the thesis, not a generic job search.
- Clear contact and hiring actions.

## Layout and Typography

- Desktop content width: 1280px maximum.
- Desktop outer gutter: 32-48px.
- Mobile outer gutter: 18px.
- Hero type: 64-112px desktop; 46-66px mobile.
- Body: 18-21px desktop; 16-18px mobile.
- One display grotesk, one editorial serif accent, one mono utility face.
- Use asymmetry, scale contrast, and intentional negative space.
- Avoid repeating the same rounded bordered card treatment.

## Color and Contrast

- Near-black base: `#080a09`.
- Warm paper: `#f2efe7`.
- Signal green: `#b7f34a`.
- Human ochre: `#d69a45`.
- Default body copy on dark must exceed WCAG AA.
- Green is a signal, not a background flood.

## Motion

- A fixed continuity signal shows reading progress.
- Sticky chapter panel changes only when a new chapter becomes active.
- Motion explains handoff, focus, or state.
- No bounce easing, ambient floating, or constant decorative motion.
- `prefers-reduced-motion` must preserve the complete narrative.

## Technical Requirements

- Next.js pages router, React, TypeScript, existing Framer Motion dependency.
- Preserve semantic heading order and keyboard-visible focus.
- Verify at 1440px desktop and 375px mobile.
- Verify mobile navigation, all primary links, and reduced motion.
- Production build and typecheck must pass.

## Video Deliverable

- 9:16, 1080x1920, 30fps, 25-35 seconds.
- Show Hope’s portrait and the live redesigned portfolio.
- Follow the same continuity-loop story.
- Include burned-in typography and a standalone captions file.
- Cut and typography timing must be driven by an analyzed audio bed.
- Export H.264 MP4 plus poster frame.

## Spec Approval Checklist

- All scenes and artifacts listed: YES
- Visual directions literal: YES
- Product UI requirements explicit: YES
- Zone layouts specified: YES
- Typography scale defined: YES
- Five brand screenshots referenced in the brand pack: YES
- Available assets and tools sufficient: YES
- No blocking ambiguity remains: YES
