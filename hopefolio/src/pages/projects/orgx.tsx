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
      introduction="OrgX is the clearest expression of how I think: delegate aggressively, preserve the operating context, and make the evidence strong enough that human judgment becomes precise instead of overwhelmed."
      facts={[
        { label: "Primitive", value: "the organization" },
        { label: "Boundary", value: "human consequence" },
        { label: "Surface", value: "many AI clients" },
        { label: "Proof model", value: "receipt-first" },
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
