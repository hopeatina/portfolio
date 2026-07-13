# Portfolio V5 evidence map

## Narrative spine

The material metaphor is functional, not decorative:

- **Thread** — context, a contribution, or a constraint carried forward.
- **Knot** — a consequential decision that changes what can happen next.
- **Tension** — risk, cost, compliance, latency, or another force the system must absorb.
- **Snap** — a failure, lost handoff, broken assumption, or interrupted run.
- **Reweave** — recovery that uses the failure to create a stronger path.
- **Cloth** — organizational memory: accumulated work that a future person or agent can continue.

Every major project section should disclose three depths:

1. **Surface** — what changed for the person using it.
2. **Structure** — the decision and mechanism that produced the change.
3. **Fiber** — authentic product evidence, source, architecture, or measurable consequence.

## OrgX

| Recruiter-facing claim | Implemented evidence | Portfolio treatment |
| --- | --- | --- |
| A new agent can continue without reconstructing the chat. | `buildAgentContextPack` carries a compiled goal frame, earned boundary, chronicle, permitted verbs, missing permissions, confidence, and next action. `compileGoalFrame` degrades safely instead of blocking a run. | Selectable continuity thread: lost handoff -> compiled frame -> next action. |
| The owner controls the quality bar. | `QualitySettingsPanel` authors a global bar, domain bars, artifact-type overrides, and weighted criteria. `qualityGate` can throttle domains below threshold. | Real quality-settings proof plus a plain-language quality knot. |
| Progress is tied to goals and economics, not activity theatre. | `computeGoalRoi` binds initiatives and proof receipts to a goal, reads realized cost/value from the economic ledger, and exposes budget remaining. | ROI thread shows goal -> work -> proof -> realized return, without publishing unverified vanity totals. |
| Tool usage is governed by consequence. | `toolPolicyProfiles` defines allowed/denied categories, human-gated publishing/external effects, and fail-closed classification for unknown high-risk tools. | Governance thread shows read -> change -> external effect, with the human gate moving according to consequence. |
| Failure can become a bounded recovery path. | `recoveryStrategies` maps failure types to retry, context enrichment, fallback, scope reduction, checkpoint, review, pause, and escalation. | A snapped strand visibly reconnects through a recovery knot; never imply limitless autonomous healing. |
| The operating picture is available inside the AI client. | OrgX MCP widgets include initiative pulse, morning brief, decisions, status, search, scaffold, and artifact review surfaces. | Use authentic widget captures as embedded proof, not generic dashboard mockups. |
| OrgX reaches many clients without pretending they are one product. | Public `useorgx` repositories include MCP, Codex, Claude Code, Cursor, OpenCode, OpenClaw, gateway, local shell, UI kit, data, skills, and benchmark surfaces. | Present the ecosystem as integration seams around one work graph, not as a repository count. |

## Alma

- Public-safe claim: production backend ownership under HIPAA constraints across clinical workflows, background jobs, durable state, observability, third-party integrations, and reversible rollout.
- Current work may be described as **a Spring Health integration in progress**; do not imply a shipped outcome or disclose private architecture.
- Show integration boundaries as tension points with the technology/vendor mark and a one-sentence reason it existed.
- Never use fabricated clinical UI as proof.

## PerfPulse

- Authentic implementation: Rust 2021, `sysinfo`, Axum, Clap, Crossterm, Reqwest, Serde; macOS; CLI, terminal TUI, and local dashboard; Homebrew distribution; binary goal under 5 MiB.
- The interactive proof should keep one underlying signal visible while the user changes the surface from CLI to TUI to web.
- The key decision is not “make a dashboard.” It is matching the interface to the time horizon while keeping collection local and action reversible.

## Rice bioengineering

- Rice News and ASME record Hope as a member of DermaShift, the Rice bioengineering team that built a low-cost diagnostic device for pressure-ulcer formation and won the 2015 SB3C undergraduate design competition for rehabilitation and assistive devices.
- Authentic photo: `/images/evidence/rice-dermashift-team.jpg`, sourced from ASME and attributed in the UI.
- This is the origin of the multidisciplinary throughline: identify a human consequence, combine technical disciplines, build the intervention, and prove that it works.

## Figma and Chill

- Authentic Config 2021 talk image: `/images/evidence/figma-config-2021.jpg`.
- Public framing: a BIPOC design community using play, shared making, emerging technology, connection, and culture.
- Treat it as evidence of product taste and community-building, not a decorative conference logo.

## Technology atlas rules

- Every mark needs **where it was used** and **why it was selected**.
- A configured MCP or installed tool is not automatically proof of deep expertise.
- Group by operating role (clients, protocol, product, runtime, data, proof, creative), not by a flat logo cloud.
- Prefer official brand marks where available; use a restrained text mark for protocols without an installed icon.
- Do not publish secret configuration, keys, tenant data, private integration details, or unsupported expertise claims.

## Language calibration

- “Continuity is the product” -> “The prompt ends. The work should not.”
- “Context survives” -> “A decision made in Claude is still there when Codex takes over.”
- “Judgment gates risk” -> “High-consequence work pauses for the right person.”
- “Outcome becomes memory” -> “The next run starts from what the last one learned.”
- “Proof layer” -> “See what an agent did, why it was allowed, and whether it met the bar.”
