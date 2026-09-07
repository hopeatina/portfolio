import CaseStudyNarrative from "@/components/v4/CaseStudyNarrative";

export default function MeridianPage() {
  return (
    <CaseStudyNarrative
      pageTitle="Meridian case study — Hope Atina"
      description="Designing an explainable trading research desk: inspectable conviction, connected decision paths, and a deliberate boundary between a demo and paper execution."
      index="Case 08 / decision systems"
      status="Research prototype"
      title="Meridian"
      subtitle="Make conviction inspectable."
      introduction="I designed and built Meridian around a question that gets lost in a busy trading desk: what, exactly, supports this decision? The research prototype connects a ranked signal, its contributing evidence, and a structured review path. It explores the interface and engineering of judgment; its demo values are not a trading record."
      facts={[
        { label: "Role", value: "Product design + engineering" },
        { label: "Audience", value: "Discretionary traders" },
        { label: "Focus", value: "Explainable conviction", note: "signal → evidence → review" },
        { label: "Stage", value: "Research prototype", note: "demo interface · paper-only safety work" },
      ]}
      heroProof={{
        src: "/images/case-studies/meridian/public-landing.png",
        width: 1200,
        height: 762,
        alt: "Meridian’s public landing page with the headline The Operating System for Conviction and a private desk pilot label",
        label: "Public project surface / Meridian",
        caption: "The public face of Meridian leads with auditable reasoning, explicit gates, and operator control. Its private-desk positioning frames the research prototype.",
      }}
      problem={{
        eyebrow: "The number arrives before the explanation",
        title: "A confidence score can hide the most important part of a decision.",
        body: (
          <>
            <p>
              A trader moves between price structure, market regime, positioning, events, and risk.
              Compressing those inputs into a ranked list is useful for scanning, but the ranking
              alone cannot explain which inputs agreed, which conflicted, or what should stop the next step.
            </p>
            <p>
              Meridian needed to stay calm enough to scan while retaining enough structure to
              interrogate a single idea. The design problem was connecting those two levels of attention.
            </p>
          </>
        ),
        notes: [
          "Keep a signal’s explanation attached to the signal.",
          "Expose contributions and concerns alongside the headline score.",
          "Treat review and execution as different states.",
        ],
      }}
      insight={{
        eyebrow: "A score should open a conversation",
        title: "Conviction becomes useful when its ingredients remain visible.",
        body: (
          <p>
            I treated the score as an entry point into evidence. A conviction stack shows each
            source, score, weight, and contribution. A connected decision graph then puts those
            inputs into a sequence: trigger, confirmation, validation, context, and execution.
            Selecting a node can lead back to the evidence that contributed to it.
          </p>
        ),
      }}
      decision={{
        eyebrow: "Progressive detail, continuous context",
        title: "Build one review path from the desk to the underlying evidence.",
        body: (
          <p>
            The interface moves from Pulse to a signal, deeper analysis, and a structured plan.
            Tabs, signal identity, and analysis state live in the URL, making a particular view
            addressable and recoverable. Configurable conviction weights expose the calculation
            instead of making the ranking feel untouchable. A separate paper-only engineering
            iteration adds evidence checks before any broker-paper dispatch can become eligible.
          </p>
        ),
      }}
      flow={[
        { glyph: "context", label: "Scan the desk", detail: "A compact signal card brings direction, conviction, risk, and plan context into the first read." },
        { glyph: "branch", label: "Inspect the inputs", detail: "Open the conviction stack and follow a decision node back to its contributing evidence.", tone: "cold" },
        { glyph: "judgment", label: "Review the plan", detail: "Keep entry, stop, target, and size explicit before a consequential next step.", tone: "heat" },
        { glyph: "receipt", label: "Retain the context", detail: "Signal and order references connect the operating model to searchable memory and review." },
      ]}
      system={{
        eyebrow: "The explanation has a structure",
        title: "Source context, scoring, interaction, and authority each have a place.",
        introduction: "The implemented application uses a JavaScript web stack and Convex domain models. The research and paper-safety work remain distinct from a validated strategy or a production trading operation.",
        layers: [
          { label: "context", title: "Give evidence a name and a source", detail: "Adapters and conviction builders represent regime, positioning, orderflow, calendar, and historical context as inspectable inputs.", technology: "Convex · source adapters", tone: "cold" },
          { label: "reasoning", title: "Show how the score is assembled", detail: "Weighted conviction, individual contributions, and linked decision nodes make the ranking open to inspection.", technology: "JavaScript scoring · decision graph", tone: "signal" },
          { label: "surface", title: "Carry one signal through the review", detail: "Addressable views connect desk scanning, signal detail, analysis, and plan fields across desktop and mobile layouts.", technology: "Next.js · React · Lightweight Charts", tone: "cold" },
          { label: "authority", title: "Separate demo behavior from paper readiness", detail: "A local paper-safety branch checks strategy-bound evidence, account identity, and broker acknowledgements. Live execution is explicitly disabled in that branch.", technology: "Node.js · IBKR adapter · evidence gates", tone: "heat" },
        ],
        rationale: [
          { pressure: "One score conceals disagreement", choice: "Expose source weights and individual contributions", reason: "A researcher can inspect the calculation and see what the number depends on." },
          { pressure: "Drill-down navigation loses the original idea", choice: "Carry signal and view identity in the URL", reason: "Moving between summary and detail preserves a recoverable review context." },
          { pressure: "A polished demo can imply execution readiness", choice: "Keep paper validation behind separate evidence and broker gates", reason: "Interface completeness cannot silently become authority to dispatch." },
        ],
        decisions: [
          {
            id: "inspectable-conviction",
            label: "open the number",
            before: "A ranked signal can look decisive while hiding the contribution of each input.",
            decision: "Show a weighted conviction stack with source-level scores, weights, and contributions; make local weights configurable.",
            consequence: "The ranking becomes an inspectable research model rather than a claim of certainty.",
            evidence: "ConvictionWeightsPanel · computeConvictionBreakdown",
            tone: "signal",
          },
          {
            id: "connected-decision-path",
            label: "retain the why",
            before: "A summary, chart, and rationale can become disconnected screens.",
            decision: "Link decision nodes to conviction evidence and persist tab, view, and signal identity in the route.",
            consequence: "The reader can move from an overview to a specific reason and return without reconstructing the context.",
            evidence: "DecisionGraphPanel · MeridianApp route state",
            tone: "cold",
          },
          {
            id: "paper-boundary",
            label: "make eligibility explicit",
            before: "Synthetic fills and incomplete research can resemble a ready trading workflow.",
            decision: "In a separate local iteration, distinguish demo from broker-paper mode and require matching, fully costed held-out evidence before dispatch eligibility.",
            consequence: "Failed or incomplete evidence keeps the paper path blocked. Passing a gate does not activate live trading.",
            evidence: "Local paper-safety branch · runtime gate · execution policy",
            tone: "heat",
          },
        ],
        surfaces: [
          { name: "Pulse + signals", mode: "scan", detail: "A compact first read of candidates, directional context, and conviction." },
          { name: "Signal analysis", mode: "inspect", detail: "Source-level conviction, concerns, and connected decision paths." },
          { name: "Plan + operations", mode: "review", detail: "Structured plan fields alongside separate approval, order, and memory surfaces." },
          { name: "Paper evidence", mode: "research", detail: "Local journals and runtime checks that keep demo, paper readiness, and live authority distinct." },
        ],
        technologies: [
          { label: "Interface", values: ["Next.js", "React", "Tailwind CSS", "Framer Motion"] },
          { label: "Visual analysis", values: ["Lightweight Charts", "decision graphs", "weighted conviction"] },
          { label: "Data + services", values: ["Convex", "PostgreSQL / TimescaleDB", "Node.js", "IBKR integration"] },
        ],
        toolEvidence: [
          { name: "Next.js", icon: "next", category: "Product", project: "Meridian", reason: "The public introduction and research application share a web delivery framework and route structure." },
          { name: "React", icon: "react", category: "Interaction", project: "Research workspace", reason: "Selected instruments, workspace views, and expanded evidence stay coordinated as an analyst changes depth." },
          { name: "Tailwind CSS", icon: "tailwind", category: "Interface", project: "Meridian", reason: "A shared styling vocabulary keeps dense signal, chart, and plan surfaces visually consistent." },
          { name: "Framer Motion", category: "Motion", project: "Signal analysis", reason: "Animated expansions reveal the evidence behind a summary without losing the surrounding decision context." },
          { name: "Lightweight Charts", category: "Visualization", project: "Instrument chart", reason: "A dedicated financial chart places price context alongside signals and research evidence." },
          { name: "Convex", category: "Data", project: "Research memory", reason: "Persistent research records connect decisions and accumulated context across workspace sessions." },
          { name: "PostgreSQL", icon: "postgres", category: "Time-series data", project: "Ingestion services", reason: "The service schema uses PostgreSQL and TimescaleDB for timestamped market-data records." },
          { name: "Node.js", icon: "node", category: "Services", project: "Ingestion + execution adapters", reason: "Separate services define the boundaries between incoming data, research state, and broker integration." },
          { name: "Interactive Brokers", category: "Integration", project: "Paper / research boundary", reason: "Broker adapter code is paired with explicit paper-safety controls; its presence does not imply activated live trading." },
        ],
      }}
      proofs={[
        {
          src: "/images/case-studies/meridian/signal-preview.png",
          width: 1200,
          height: 762,
          alt: "Meridian’s public workflow preview showing Detect, Explain, Control, and Improve alongside an example signal card and structured trade-plan fields",
          label: "Public UI preview / example data",
          caption: "The existing public preview places the signal and its plan fields together. The displayed scores, prices, size, and risk are illustrative demo values, not execution or performance evidence.",
        },
      ]}
      learning={{
        eyebrow: "Explanation is part of the product",
        title: "A convincing interface must leave room for an unconvincing hypothesis.",
        body: (
          <>
            <p>
              Meridian taught me to design the path for scrutiny as carefully as the first impression.
              A clean chart or confident score can help someone orient, but the product earns a second
              look when the inputs, disagreements, and stopping conditions remain available.
            </p>
            <p>
              The work remains a research prototype. The lasting design lesson is that better
              presentation should make uncertainty easier to examine, and never turn a demo into
              an implied claim about real-world outcomes.
            </p>
          </>
        ),
        notes: [
          "Make a summary expandable into its evidence.",
          "Keep context intact across changes in depth.",
          "Let an honest stop be a complete product state.",
        ],
      }}
      primaryLink={{ href: "https://meridian-two-beryl.vercel.app", label: "View project site", external: true }}
      next={{ href: "/projects/orgx", label: "Next / agent operations", title: "OrgX" }}
    />
  );
}
