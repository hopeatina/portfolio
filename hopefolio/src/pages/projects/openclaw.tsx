import CaseStudyNarrative from "@/components/v4/CaseStudyNarrative";

export default function OrgXForOpenClawPage() {
  return (
    <CaseStudyNarrative
      pageTitle="OrgX for OpenClaw case study — Hope Atina"
      description="How OrgX for OpenClaw adds persistent organizational memory, coordinated execution, and proof to OpenClaw agents."
      index="Case 04 / plugin architecture"
      status="Published plugin · v0.7"
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
