import CaseStudyNarrative from "@/components/v4/CaseStudyNarrative";

export default function OrgXForOpenClawPage() {
  return (
    <CaseStudyNarrative
      pageTitle="OrgX for OpenClaw case study — Hope Atina"
      description="How OrgX for OpenClaw adds persistent organizational memory, coordinated execution, and proof to OpenClaw agents."
      index="Case 04 / plugin architecture"
      status="Published plugin · active"
      title="OrgX for OpenClaw"
      subtitle="Persistent organizational memory and coordinated execution inside OpenClaw."
      introduction="This is not OpenClaw itself and not another standalone dashboard. It is the OrgX bridge that lets OpenClaw agents enter shared organizational context, coordinate work, and return evidence without leaving the host environment."
      facts={[
        { label: "Product", value: "OrgX plugin" },
        { label: "Host", value: "OpenClaw" },
        { label: "Continuity", value: "persistent state" },
        { label: "Control", value: "live + resumable" },
      ]}
      heroProof={{
        src: "/images/case-studies/orgx-openclaw-v4/full-dashboard.png",
        alt: "OrgX Live dashboard connected to OpenClaw with agents, activity, and next-up work",
        label: "OrgX Live inside the OpenClaw operating loop",
        caption: "Named agents, current work, blocked decisions, activity, and next-up actions remain visible in one live control surface.",
      }}
      problem={{
        eyebrow: "The host already had agents; it lacked organizational continuity",
        title: "A capable local agent can still wake up without the company in its head.",
        body: (
          <>
            <p>
              OpenClaw could run agents and tools, but long-running organizational work needed more
              than a session. Tasks had to survive restarts, handoffs, and changing operators without
              becoming a pile of local state and logs.
            </p>
            <p>
              Asking people to leave the host for a separate orchestration product would have added
              adoption friction at exactly the wrong boundary.
            </p>
          </>
        ),
        notes: [
          "Session state was not the same thing as organizational memory.",
          "Realtime activity could not be allowed to outrun durable state.",
          "A separate destination would fracture the operator's workflow.",
        ],
      }}
      insight={{
        eyebrow: "The plugin boundary was the product opportunity",
        title: "Bring the organization into the host instead of moving the operator out of it.",
        body: (
          <>
            <p>
              The right architecture inherits OpenClaw's environment and lifecycle, then adds OrgX
              where the host is intentionally thin: shared context, resumable coordination, trust
              state, decisions, and receipts.
            </p>
            <p>
              That makes the integration feel native while keeping the organizational model portable
              across the rest of the OrgX client ecosystem.
            </p>
          </>
        ),
      }}
      decision={{
        eyebrow: "One local bridge; durable work on the other side",
        title: "Treat live transport as a view of state—not the source of truth.",
        body: (
          <>
            <p>
              The plugin coordinates through an MCP bridge, persistent queue state, and a live
              surface. Streaming keeps the interface current; durable records keep it honest when
              the stream disconnects, the host restarts, or work resumes later.
            </p>
          </>
        ),
      }}
      flow={[
        { glyph: "context", label: "Org context", detail: "The initiative, constraints, and prior decisions enter OpenClaw together." },
        { glyph: "branch", label: "Host execution", detail: "OpenClaw agents act through the plugin's coordinated tool surface.", tone: "cold" },
        { glyph: "judgment", label: "Durable boundary", detail: "Queue state and decisions survive the live connection.", tone: "heat" },
        { glyph: "receipt", label: "OrgX receipt", detail: "Outcomes return to the shared work graph with provenance." },
      ]}
      system={{
        eyebrow: "Host-native architecture",
        title: "A local bridge, durable recovery path, and live control surface—without replacing OpenClaw.",
        introduction: "The plugin has to respect two truths at once: OpenClaw owns the agent runtime, while OrgX owns the shared organizational context. The bridge is designed so either side can restart without making live transport the source of truth.",
        layers: [
          { label: "host", title: "OpenClaw agents and gateway", detail: "Coding, research, marketing, and operations agents keep their existing tools, workspaces, and runtime lifecycle.", technology: "OpenClaw gateway · agent workspaces", tone: "cold" },
          { label: "plugin bootstrap", title: "Register one host-native integration", detail: "A strict TypeScript ES module registers tools, services, dashboard routes, and background behavior through the host's single plugin entry point.", technology: "TypeScript · Node 18+ · native fetch" },
          { label: "local protocol", title: "Expose the work graph through MCP", detail: "The local bridge at /orgx/mcp gives OpenClaw, Claude, Cursor, and Codex structured access without forcing a second cloud OAuth flow.", technology: "MCP tools · structured JSON · client config backups", tone: "signal" },
          { label: "durable edge", title: "Buffer what the network cannot guarantee", detail: "Credentials, snapshots, run records, and a local outbox survive disconnection. Queued events replay after sync and remain visible in local projections while offline.", technology: "file-backed JSON stores · outbox replay", tone: "heat" },
          { label: "live projection", title: "Stream the view; recover from the snapshot", detail: "SSE is the primary live transport, with polling against the canonical snapshot as a fallback. Next Up intent stays separate from In Progress runtime state.", technology: "SSE · snapshot fallback · React hooks", tone: "cold" },
          { label: "shared graph", title: "Return work to OrgX", detail: "Initiatives, workstreams, milestones, tasks, decisions, activity, and receipts become shared context for every future agent and client.", technology: "OrgX API · entity graph · receipt model", tone: "signal" },
        ],
        rationale: [
          { pressure: "The plugin runs inside many local environments", choice: "Keep zero production dependencies and use native fetch", reason: "The installed bridge stays portable and avoids turning local setup into a package-resolution problem." },
          { pressure: "Native SQLite adds build and platform complexity", choice: "Use inspectable, file-backed stores with recovery code", reason: "Local state remains portable across OpenClaw environments and easy for an operator to audit." },
          { pressure: "Realtime connections fail", choice: "SSE-first with canonical snapshot fallback", reason: "The interface can recover its operating picture without presenting the stream as durable truth." },
          { pressure: "Queued intent is not active execution", choice: "Separate Next Up from In Progress", reason: "Operators can distinguish scheduling, runtime state, blockers, and recovery instead of reading one ambiguous activity feed." },
        ],
        decisions: [
          {
            id: "host-boundary",
            label: "respect the host",
            before: "Moving an OpenClaw operator into a second orchestration destination would fracture the workflow the plugin is meant to improve.",
            decision: "Let OpenClaw own the runtime and tools while OrgX adds the missing organizational context through one native plugin seam.",
            consequence: "Agents keep the host's strengths and gain shared goals, decisions, trust state, and receipts where they already work.",
            evidence: "openclaw-plugin · public source",
            evidenceHref: "https://github.com/useorgx/openclaw-plugin",
            tone: "cold",
          },
          {
            id: "stream-truth",
            label: "separate live from true",
            before: "A dropped stream or restarted host can make real-time activity look like durable completion.",
            decision: "Use SSE to update the view, but recover from a canonical snapshot and durable queue state.",
            consequence: "The live surface can reconnect without rewriting history or losing the operating picture.",
            evidence: "SSE · snapshot fallback · persistent queue",
            tone: "signal",
          },
          {
            id: "offline-seam",
            label: "survive disconnection",
            before: "Local agents continue to produce events when the OrgX connection is unavailable.",
            decision: "Persist an inspectable local outbox, replay it after sync, and keep queued intent separate from active execution.",
            consequence: "Offline work remains visible and resumable without pretending the network guaranteed delivery.",
            evidence: "file-backed JSON · outbox replay · Next Up vs In Progress",
            tone: "heat",
          },
          {
            id: "recovery-control",
            label: "make runs recoverable",
            before: "A long-running agent session can block, fail, or outlive the operator who started it.",
            decision: "Expose pause, resume, cancel, checkpoint, rollback, triage, and named handoffs as product controls.",
            consequence: "The operator can intervene at the actual boundary instead of reading an ambiguous terminal feed.",
            evidence: "session detail · triage · activity receipts",
            tone: "heat",
          },
        ],
        surfaces: [
          { name: "Connect + pairing", mode: "onboarding", detail: "Browser pairing and manual key fallback establish the boundary without exposing credentials in the interface." },
          { name: "Mission Control", mode: "hierarchy", detail: "Initiative → workstream → milestone → task state makes the shared plan visible inside the host." },
          { name: "Next Up queue", mode: "intent", detail: "Pin, reorder, move, and bulk controls express scheduling before a run begins." },
          { name: "Activity + handoffs", mode: "history", detail: "Live updates, decisions, completion, and failure stay attributable to named work." },
          { name: "Triage", mode: "judgment", detail: "Blocked and needs-review items become a focused operator queue rather than background noise." },
          { name: "Session detail", mode: "control", detail: "Pause, resume, cancel, checkpoint, and rollback make long-running agent work recoverable." },
        ],
        technologies: [
          { label: "Core", values: ["TypeScript strict mode", "ES modules", "Node 18+", "native fetch"] },
          { label: "Dashboard", values: ["React 18", "Vite", "Tailwind", "Framer Motion"] },
          { label: "Protocol + transport", values: ["MCP", "SSE", "HTTP", "snapshot polling"] },
          { label: "Durability", values: ["JSON stores", "local outbox", "automatic replay", "gateway watchdog"] },
          { label: "Verification", values: ["node:test", "Playwright", "strict typecheck", "end-to-end harness"] },
        ],
        toolEvidence: [
          { name: "OpenClaw", mark: "OC", category: "Host", project: "OrgX plugin", reason: "The host retains agent runtime, workspaces, tools, and lifecycle; the plugin adds the organizational layer instead of replacing it." },
          { name: "TypeScript", icon: "typescript", category: "Bridge", project: "Plugin core", reason: "Strict types keep the host entry point, tool contracts, stores, routes, and background behavior aligned with zero production dependencies." },
          { name: "Node.js", icon: "node", category: "Bridge", project: "Local runtime", reason: "Native fetch and the existing Node runtime keep installation portable across OpenClaw environments." },
          { name: "MCP", mark: "MCP", category: "Protocol", project: "Local bridge", reason: "One structured protocol exposes the OrgX work graph to OpenClaw and other local AI clients without inventing a private command language." },
          { name: "React", icon: "react", category: "Surface", project: "OrgX Live", reason: "Mission control, queue, triage, activity, and session controls need a responsive projection over durable state." },
          { name: "Tailwind", icon: "tailwind", category: "Surface", project: "OrgX Live", reason: "A compact host-native styling layer supports fast iteration while the OrgX design system governs hierarchy and interaction." },
          { name: "Playwright", mark: "PW", category: "Proof", project: "Plugin verification", reason: "The value is in the complete host flow, so browser-level checks cover pairing, live state, recovery, and operator controls." },
          { name: "GitHub", icon: "github", category: "Proof", project: "Published plugin", reason: "The public plugin source, tests, checks, and releases distinguish the OrgX integration from OpenClaw itself." },
        ],
      }}
      receiptSlugs={["orgx-mcp-server"]}
      proofs={[
        {
          src: "/images/case-studies/orgx-openclaw-v4/mission-control.png",
          alt: "Mission control view for OrgX for OpenClaw showing active work and next actions",
          label: "Mission control",
          caption: "The next action remains explicit even when multiple workstreams are active or degraded.",
        },
        {
          src: "/images/case-studies/orgx-openclaw-v4/activity-timeline.png",
          alt: "OrgX for OpenClaw activity timeline with completed and failed agent work",
          label: "Activity with consequence",
          caption: "Completion, failure, and intervention remain attached to named work instead of collapsing into a terminal feed.",
        },
      ]}
      learning={{
        eyebrow: "Integration quality is product quality",
        title: "The best orchestration surface is sometimes the one the operator does not have to adopt.",
        body: (
          <>
            <p>
              OrgX for OpenClaw sharpened a rule I now use across the platform: preserve the host's
              strengths, add only the missing control layer, and keep durable truth independent from
              live transport.
            </p>
          </>
        ),
        notes: [
          "Do not confuse the OpenClaw host with the OrgX plugin.",
          "Let streams update the view; let durable state govern recovery.",
          "Make continuity portable without making every client identical.",
        ],
      }}
      primaryLink={{
        href: "https://github.com/useorgx/openclaw-plugin",
        label: "View the plugin",
        external: true,
      }}
      secondaryLink={{ href: "/projects/orgx", label: "See the OrgX platform" }}
      next={{ href: "/projects/orgx", label: "Return / flagship system", title: "OrgX" }}
    />
  );
}
