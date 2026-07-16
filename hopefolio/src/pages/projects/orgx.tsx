import CaseStudyNarrative from "@/components/v4/CaseStudyNarrative";

export default function OrgXPage() {
  return (
    <CaseStudyNarrative
      pageTitle="OrgX case study — Hope Atina"
      description="How Hope Atina designed OrgX as a continuity and proof layer for accountable AI-delivered work across clients."
      index="Case 01 / flagship"
      status="Founder-built · active platform"
      title="OrgX"
      subtitle="The prompt ends. The company keeps moving."
      introduction="OrgX lets a person manage a fleet of agents from the AI client they already use—without losing the goal, the decisions, the quality bar, or the proof when work changes hands. It is the shared operating context beneath the clients, not another chat destination."
      facts={[
        { label: "Job", value: "carry work across agents" },
        { label: "Ownership", value: "founder · product · architecture" },
        { label: "Boundary", value: "human consequence" },
        { label: "Delivery", value: "web · MCP · plugins · widgets" },
      ]}
      heroProof={{
        src: "/images/case-studies/orgx-v4/artifact-receipt.png",
        alt: "OrgX artifact viewer showing a lead claim pack, decision provenance, and evidence score",
        label: "The artifact is the receipt",
        caption: "Output, provenance, quality, and review state are inspected together—not reconstructed after the fact.",
      }}
      problem={{
        eyebrow: "The failure was fragmentation, not intelligence",
        title: "Agents could do more work than a person could reliably follow.",
        body: (
          <>
            <p>
              The model could draft, research, code, and coordinate. But the work scattered across
              prompts, clients, repositories, and human memory. A handoff between Claude and Codex
              could erase the goal, the decision that shaped it, and the evidence already gathered.
            </p>
            <p>
              More autonomy made the gap more dangerous. Activity increased while the founder or
              team lead had less confidence about what moved, why it moved, and what deserved attention.
            </p>
          </>
        ),
        notes: [
          "Context vanished at client and repository boundaries.",
          "Output was separated from decisions, constraints, and evidence.",
          "Human review scaled with activity instead of consequence.",
        ],
      }}
      insight={{
        eyebrow: "The prompt was the wrong primitive",
        title: "The organization—not the conversation—had to remember why the work exists.",
        body: (
          <>
            <p>
              The next agent needs more than a summary. It needs the goal, definition of done,
              decisions and why, available tools, missing permissions, budget, confidence, and the
              next useful action. Those become a compiled handoff instead of a transcript dump.
            </p>
            <p>
              That reframed OrgX from an orchestration destination into infrastructure that can meet
              the operator where the work already happens.
            </p>
          </>
        ),
      }}
      decision={{
        eyebrow: "The architecture followed the product thesis",
        title: "Carry one work graph across clients, then make consequence—not activity—control the system.",
        body: (
          <>
            <p>
              The work graph connects goals, initiatives, agents, decisions, artifacts, receipts,
              cost, and value. The owner's quality bar decides what returns for review. Tool policy
              pauses publishing, payments, messages, merges, and other external effects at the human
              boundary. Recovery can retry, narrow scope, ask a specialist, checkpoint, or stop.
            </p>
          </>
        ),
      }}
      flow={[
        { glyph: "context", label: "Shared context", detail: "Intent, constraints, decisions, and prior evidence enter together." },
        { glyph: "branch", label: "Client execution", detail: "Specialists act in the interface best suited to the work.", tone: "cold" },
        { glyph: "judgment", label: "Trust boundary", detail: "Consequence determines when human judgment must enter.", tone: "heat" },
        { glyph: "receipt", label: "Proof returns", detail: "The artifact, provenance, and quality outcome become memory." },
      ]}
      system={{
        eyebrow: "A platform, protocol surface, and proof system",
        title: "Five mechanisms turn a fleet of agents into accountable company movement.",
        introduction: "The difficult part is preserving the cause chain: why the work exists, what the agent knew, which tools it could use, where a person had to decide, what the result proved, and whether the next move is still worth its cost.",
        layers: [
          {
            label: "client edge",
            title: "Meet the operator where work already happens",
            detail: "Claude, ChatGPT, Codex, Cursor, VS Code, Windsurf, Zed, OpenClaw, and other MCP-capable clients enter the same organizational context without being flattened into one UI.",
            technology: "MCP clients · native plugins · web app",
            tone: "cold",
          },
          {
            label: "transport + identity",
            title: "Authenticate the person; isolate the session",
            detail: "Streamable HTTP and SSE coexist behind OAuth 2.1, PKCE, and dynamic client registration. Each MCP session is isolated in a Durable Object rather than trusted as a stateless chat request.",
            technology: "Cloudflare Workers · OAuth Provider · Durable Objects · SQLite",
            tone: "heat",
          },
          {
            label: "tool grammar",
            title: "Constrain capability into legible verbs",
            detail: "A canonical tool grammar moves from bootstrap and search through plan, spawn, decide, write, attach, act, and submit receipt. Zod contracts keep calls structured and interoperable.",
            technology: "Model Context Protocol · Zod · structured results",
            tone: "signal",
          },
          {
            label: "work graph",
            title: "Remember the organization, not only the user",
            detail: "Initiatives, workstreams, milestones, tasks, agents, decisions, approvals, artifacts, and outcomes retain the relationships a new session needs in order to continue responsibly.",
            technology: "Next.js · TypeScript · Supabase · React Query",
          },
          {
            label: "execution plane",
            title: "Let specialists act without hiding the boundary",
            detail: "Agent runtimes, queues, sandboxes, and durable workflows execute the work. Trust ladders and consequence-aware gates determine when an operator must enter.",
            technology: "OpenAI Agents SDK · Anthropic Agent SDK · Inngest · E2B · Trigger.dev",
            tone: "cold",
          },
          {
            label: "proof return",
            title: "Make the outcome independently inspectable",
            detail: "Artifacts return with versions, provenance, evaluation, review state, and a receipt. Proof rooms and embedded widgets make that state legible beyond the dashboard that created it.",
            technology: "MCP Apps · artifact renderers · evaluators · proof rooms",
            tone: "heat",
          },
        ],
        rationale: [
          {
            pressure: "The task outlives the chat",
            choice: "Use an organizational work graph as the durable primitive",
            reason: "The next agent can resume from decisions, owners, artifacts, approvals, and proof instead of reconstructing a transcript.",
          },
          {
            pressure: "Many clients, one operating context",
            choice: "Separate the continuity contract from each client surface",
            reason: "Clients keep their native strengths while organizational state remains portable and accountable.",
          },
          {
            pressure: "Autonomy increases review volume",
            choice: "Escalate by consequence and return receipts",
            reason: "Human attention is reserved for irreversible or ambiguous boundaries—not every unit of agent activity.",
          },
          {
            pressure: "Proof must travel",
            choice: "Return structured results plus embedded MCP Apps",
            reason: "A reviewer can inspect the artifact, status, provenance, and next action inside the client where the work arrived.",
          },
        ],
        decisions: [
          {
            id: "context-pack",
            label: "pass the work",
            before: "A new agent receives a task title and reconstructs the company from scattered chats, docs, and repo state.",
            decision: "Compile the goal, definition of done, decisions and why, proof, permissions, confidence, and next action into one context pack.",
            consequence: "The next client can continue the work without pretending a transcript is organizational memory.",
            evidence: "buildAgentContextPack · compileGoalFrame · private core",
            tone: "cold",
          },
          {
            id: "quality-bar",
            label: "control quality",
            before: "The founder reviews every artifact because the real standard exists only in their head.",
            decision: "Make the quality bar owner-authored, versionable, and tunable by team and artifact type.",
            consequence: "Work below threshold can loop back before it consumes the reviewer's attention.",
            evidence: "quality gates · benchmark methodology (public)",
            evidenceHref: "https://useorgx.com/blog/orgx-autonomous-initiative-benchmark-methodology",
            tone: "signal",
          },
          {
            id: "goal-roi",
            label: "prove ROI",
            before: "Agent volume and completed tasks can rise while the company goal stands still.",
            decision: "Bind initiatives, proof receipts, realized cost, realized value, and budget remaining to the authorizing goal.",
            consequence: "A person can judge movement and reallocate attention without rewarding activity theatre.",
            evidence: "computeGoalRoi · economic_ledger · private core",
            tone: "heat",
          },
          {
            id: "tool-policy",
            label: "govern tools",
            before: "A novel connector can create an external consequence that no static allowlist anticipated.",
            decision: "Define explicit profiles, gate publishing and external effects, and classify unknown high-risk tools fail-closed.",
            consequence: "Agents retain useful room to act while merges, messages, payments, and other consequential writes remain governed.",
            evidence: "toolPolicyProfiles · consequence classifier · private core",
            tone: "heat",
          },
          {
            id: "recovery",
            label: "reweave failure",
            before: "A timeout, failed tool, low-quality output, or blocked dependency turns a run into a dead end.",
            decision: "Use bounded recovery: retry with context, fallback, reduce scope, ask a specialist, checkpoint, pause, then escalate.",
            consequence: "A snapped thread can reveal the next safe weave without hiding the failure or retrying forever.",
            evidence: "recoveryStrategies · escalation policy · private core",
            tone: "cold",
          },
        ],
        surfaces: [
          { name: "Agent desk + chat timeline", mode: "operator", detail: "Focus, delegation, approvals, tool calls, and outcomes stay attached to the agent's current work." },
          { name: "Live room + processing inspector", mode: "runtime", detail: "Active execution, handoffs, blocked decisions, and run state become legible without pretending raw telemetry is judgment." },
          { name: "Artifact viewer", mode: "proof", detail: "Code, design, video, data, diffs, marketing work, receipts, and pull requests render on their own terms." },
          { name: "Quality + trust controls", mode: "governance", detail: "Versioned quality bars remain separate from observed signals; autonomy is bounded by consequence." },
          { name: "Proof rooms", mode: "external", detail: "Selected outcomes become durable, shareable capsules instead of screenshots without provenance." },
          { name: "MCP widget system", mode: "embedded", detail: "Initiative pulse, morning brief, decisions, search, status, and task surfaces bring the work graph into AI clients." },
          { name: "Client + host plugins", mode: "integration", detail: "OpenClaw and other client bridges inherit host strengths while adding shared organizational memory." },
          { name: "Benchmark + evaluation", mode: "quality", detail: "Judged criteria, receipts, and publication artifacts turn quality claims into a repeatable evidence system." },
        ],
        technologies: [
          { label: "Product + interface", values: ["Next.js App Router", "React", "TypeScript", "React Query", "Xyflow"] },
          { label: "Data + identity", values: ["Supabase", "PostgreSQL", "Clerk", "OAuth 2.1", "PKCE"] },
          { label: "Agent + workflow", values: ["OpenAI Agents SDK", "Anthropic Agent SDK", "Inngest", "E2B", "Trigger.dev"] },
          { label: "Protocol + edge", values: ["Model Context Protocol", "MCP Apps", "Cloudflare Workers", "Durable Objects", "Zod"] },
          { label: "Reliability + business", values: ["Sentry", "PostHog", "OpenTelemetry", "Upstash", "Stripe"] },
        ],
        toolEvidence: [
          { name: "MCP", mark: "MCP", category: "Protocol", project: "Cross-client continuity", reason: "One portable contract exposes organizational memory and governed actions inside Claude, ChatGPT, Cursor, Codex, OpenCode, OpenClaw, and other MCP hosts." },
          { name: "MCP Apps", mark: "UI", category: "Protocol", project: "Embedded OrgX", reason: "A tool response can become a brief, decision, plan, status view, or proof surface inside the client where the question was asked." },
          { name: "Cloudflare", icon: "cloudflare", category: "Runtime", project: "MCP edge", reason: "Workers, OAuth, Durable Objects, and session-scoped state support authenticated client connections without treating them as anonymous chat requests." },
          { name: "Next.js", icon: "next", category: "Product", project: "Operator app", reason: "The typed product surface connects live work, settings, proof, decisions, and server-side read models." },
          { name: "TypeScript", icon: "typescript", category: "Product", project: "Platform + plugins", reason: "Shared types keep tool grammar, work-graph entities, plugins, widget payloads, and operator UI aligned across repositories." },
          { name: "Supabase", icon: "supabase", category: "Data", project: "Work graph", reason: "Goals, initiatives, decisions, artifacts, receipts, approvals, and economics need durable, attributable relationships." },
          { name: "Zod", icon: "zod", category: "Protocol", project: "Tool grammar", reason: "Structured contracts make the same action legible to multiple clients and reject malformed calls at the boundary." },
          { name: "OpenAI", icon: "openai", category: "Agents", project: "Execution + judgment", reason: "Agent runtimes and model judges handle execution and evaluation inside an authored goal and quality system." },
          { name: "Anthropic", icon: "anthropic", category: "Agents", project: "Execution + clients", reason: "Claude is both a strong specialist runtime and a native client surface for carrying shared organizational context." },
          { name: "GitHub", icon: "github", category: "Proof", project: "Engineering receipts", reason: "Source, pull requests, checks, and merges let an engineering outcome return with independently inspectable evidence." },
          { name: "Sentry", icon: "sentry", category: "Proof", project: "Runtime quality", reason: "Operational errors must remain attributable to the run and system boundary that produced them." },
          { name: "Stripe", icon: "stripe", category: "Business", project: "Commercial boundary", reason: "Billing is treated as a consequential external system with explicit state and governance—not a decorative integration badge." },
        ],
        surfaceProofs: [
          {
            src: "/images/case-studies/widgets/initiative-pulse.png",
            alt: "OrgX initiative pulse MCP widget showing health, blockers, workstreams, decisions, and outputs",
            label: "Initiative pulse",
            caption: "Organizational health, the blocking boundary, workstream progress, and a live continuation action in one embedded surface.",
          },
          {
            src: "/images/case-studies/widgets/agent-status.png",
            alt: "OrgX agent status MCP widget showing focus, blockers, tasks, artifacts, and progress",
            label: "Agent status",
            caption: "The widget distinguishes current focus, blocked work, review, artifacts, and progress instead of compressing everything into online or offline.",
          },
          {
            src: "/images/case-studies/widgets/morning-brief.png",
            alt: "OrgX morning brief MCP widget summarizing priorities, decisions, and work requiring attention",
            label: "Morning brief",
            caption: "The next session begins with grounded organizational state and explicit judgment requests—not a blank prompt.",
          },
          {
            src: "/images/case-studies/widgets/decisions.png",
            alt: "OrgX decisions MCP widget with pending decisions and decision history",
            label: "Decision surface",
            caption: "The information needed to decide, the consequence, and the approval action stay together inside the client.",
          },
          {
            src: "/images/case-studies/widgets/search-results.png",
            alt: "OrgX search MCP widget returning organizational memory across artifacts and decisions",
            label: "Memory search",
            caption: "A new session can recover the relevant decision and artifact without reading the entire organizational transcript.",
          },
          {
            src: "/images/case-studies/widgets/scaffolded-initiative.png",
            alt: "OrgX scaffolded initiative MCP widget with workstreams, owners, and next actions",
            label: "Plan becomes work",
            caption: "The output is not a paragraph called a plan; it is an inspectable structure with owners, boundaries, and a next action.",
          },
        ],
      }}
      proofs={[
        {
          src: "/images/case-studies/orgx-v4/live-desk.png",
          alt: "OrgX live desk showing an agent's focus, trust state, work, and recent outcomes",
          label: "The operator's desk",
          caption: "The interface privileges current focus, the next consequential boundary, and grounded history over raw activity.",
        },
        {
          src: "/images/case-studies/orgx-v4/live-timeline.png",
          alt: "OrgX timeline showing decisions, trust events, and work outcomes",
          label: "What happened, when",
          caption: "Decision, trust, and work events remain attributable in the same timeline instead of dissolving into logs.",
        },
        {
          src: "/images/case-studies/orgx-v4/quality-settings.png",
          alt: "OrgX quality settings showing task-specific quality bars and model judges",
          label: "A quality bar that can be inspected",
          caption: "The bar is explicit, versioned, and task-specific; observed signals stay visible without masquerading as the standard.",
        },
      ]}
      learning={{
        eyebrow: "The control surface is not a dashboard afterthought",
        title: "The product is the quality of judgment the system makes possible.",
        body: (
          <>
            <p>
              OrgX changed my operating model from “automate the workflow” to “design the cause chain.”
              Every meaningful action should preserve context, expose its boundary, and return proof
              that improves the next decision.
            </p>
            <p>
              Autonomy remains useful. Continuity is what makes it compound.
            </p>
          </>
        ),
        notes: [
          "Escalate consequence, not mere activity.",
          "Keep the score-bearing quality bar separate from runtime signals.",
          "Treat the receipt as a first-class product surface.",
        ],
      }}
      primaryLink={{ href: "https://useorgx.com", label: "View OrgX", external: true }}
      secondaryLink={{ href: "https://github.com/useorgx", label: "Explore the ecosystem", external: true }}
      next={{ href: "/projects/alma", label: "Next / regulated production", title: "Alma" }}
    />
  );
}
