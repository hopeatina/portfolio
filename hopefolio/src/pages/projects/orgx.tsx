import CaseStudyNarrative from "@/components/v4/CaseStudyNarrative";

export default function OrgXPage() {
  return (
    <CaseStudyNarrative
      pageTitle="OrgX case study — Hope Atina"
      description="How Hope Atina designed OrgX as a continuity and proof layer for accountable AI-delivered work across clients."
      index="Case 01 / flagship"
      status="Founder-built · active platform"
      title="OrgX"
      subtitle="The continuity and proof layer for AI-delivered work."
      introduction="OrgX is the clearest expression of how I think: make AI work resumable, reviewable, and provable across agents. The product is not another chat or a generic dashboard. It is the organizational state that survives both."
      facts={[
        { label: "Category", value: "organizational continuity" },
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
        title: "Agent work became powerful faster than it became accountable.",
        body: (
          <>
            <p>
              The model could draft, research, code, and coordinate. But the work scattered across
              prompts, clients, repositories, and human memories. Every new session paid a context
              tax. Every review asked the operator to reconstruct why the output existed.
            </p>
            <p>
              More autonomy made that problem worse. Activity increased while the operating picture
              became less coherent.
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
        title: "The organization—not the conversation—had to remember.",
        body: (
          <>
            <p>
              A useful continuity layer carries intent, decisions, evidence, trust, and outcomes
              forward. It lets Claude Code, Codex, Cursor, OpenCode, and OpenClaw enter the same
              operating context without pretending those clients are the same product.
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
        title: "Expose one work graph across clients, then make every consequential output prove itself.",
        body: (
          <>
            <p>
              Initiatives, agents, decisions, artifacts, receipts, and proof rooms form the shared
              language. Client plugins carry the context into execution. Trust and quality gates
              decide what can move. The artifact returns with enough provenance to be reviewed on
              its own terms.
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
        title: "The architecture carries organizational state across clients—then returns work with enough context to judge it.",
        introduction: "The difficult part is not any one component. It is preserving the causal chain as a task moves from intent to tool execution, through a judgment boundary, into a durable artifact, and back into the next agent's context.",
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
