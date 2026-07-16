import CaseStudyNarrative from "@/components/v4/CaseStudyNarrative";

export default function AlmaPage() {
  return (
    <CaseStudyNarrative
      pageTitle="Alma case study — Hope Atina"
      description="Production backend engineering under HIPAA constraints: reassessments, compliant workflows, observability, and reversible rollout."
      index="Case 02 / regulated production"
      status="Production ownership · 2.7 years"
      title="Alma"
      subtitle="Clinical systems that had to earn adoption and survive inspection."
      introduction="Alma is the proof that I can own long-running backend systems where privacy, auditability, adoption, and reliability are not separate requirements. They are the product boundary."
      facts={[
        { label: "Constraint", value: "HIPAA production" },
        { label: "Adoption", value: "72% reassessments · self-reported, internal metrics" },
        { label: "Reliability", value: "20% fewer errors · self-reported, internal metrics" },
        { label: "Current", value: "Spring Health integration" },
      ]}
      heroProof={{
        src: "/images/projects/alma-system-v4.svg",
        alt: "Clinical workflow continuity map for reassessments, documentation, consent, and audit gates",
        label: "Clinical workflow continuity",
        caption: "Privacy enters at the first boundary; each branch returns through an explicit audit gate before becoming an accountable outcome.",
      }}
      problem={{
        eyebrow: "The workflow lived longer than any request",
        title: "Clinical state had to remain correct across time, actors, vendors, and changing requirements.",
        body: (
          <>
            <p>
              Reassessments, progress notes, appointment documents, consent, and external audits
              cross synchronous requests, background jobs, provider workflows, and third-party APIs.
              A small mistake could become a compliance problem long after the original code path ran.
            </p>
            <p>
              The challenge was not merely shipping features. It was evolving the system without
              making clinical operations absorb the risk.
            </p>
          </>
        ),
        notes: [
          "Cadence and eligibility rules changed while work was already in flight.",
          "Backfills and reminders could not block provider-facing requests.",
          "External audit tokens and vendor APIs failed on their own timelines.",
        ],
      }}
      insight={{
        eyebrow: "Reliability was a product behavior",
        title: "The safest implementation was the one operators could understand and reverse.",
        body: (
          <>
            <p>
              Feature flags, decomposed pull requests, explicit job state, and observable failure
              paths made the work reviewable before it became production pressure. That discipline
              also made adoption easier: clinicians did not have to become debuggers.
            </p>
          </>
        ),
      }}
      decision={{
        eyebrow: "Move consequence out of the request path",
        title: "Decompose sensitive workflows into durable, observable, reversible stages.",
        body: (
          <>
            <p>
              Django and DRF handled clear request surfaces. Celery owned backfills, reminders, PDF
              generation, and vendor interactions. PostgreSQL and S3 carried durable state. Datadog
              made the failure path visible enough to intervene before operators felt it.
            </p>
          </>
        ),
      }}
      flow={[
        { glyph: "context", label: "Clinical event", detail: "Eligibility, cadence, consent, and prior state enter together." },
        { glyph: "branch", label: "Durable workflows", detail: "Long-running work moves into explicit background stages.", tone: "cold" },
        { glyph: "judgment", label: "Audit boundary", detail: "Flags, permissions, and external audit state gate rollout.", tone: "heat" },
        { glyph: "receipt", label: "Operator trust", detail: "The result is traceable, observable, and safe to reverse." },
      ]}
      system={{
        eyebrow: "Production anatomy",
        title: "Sensitive workflows became durable stages with explicit failure and recovery paths.",
        introduction: "The architecture optimized for operational clarity: keep provider-facing requests narrow, move long-running work into observable jobs, preserve the clinical state transition, and make rollout reversible.",
        layers: [
          { label: "request edge", title: "Narrow clinical APIs", detail: "Permission, eligibility, consent, and cadence rules enter through reviewable request boundaries.", technology: "Django · Django REST Framework", tone: "heat" },
          { label: "workflow", title: "Durable background execution", detail: "Backfills, reminders, documents, and vendor interactions leave the synchronous request path.", technology: "Celery · Redis", tone: "cold" },
          { label: "state", title: "Durable clinical records", detail: "Workflow state remains queryable and attributable across long-running operations.", technology: "PostgreSQL · S3" },
          { label: "operator", title: "Observable rollout", detail: "Flags, metrics, and failure context make releases reviewable and reversible before clinical operations absorb the risk.", technology: "Datadog · feature flags", tone: "signal" },
        ],
        rationale: [
          { pressure: "Provider requests cannot wait on long-running work", choice: "Move documents, reminders, vendors, and backfills into Celery", reason: "The clinical surface remains responsive while failure and retry state stays explicit." },
          { pressure: "Regulated changes need a narrow blast radius", choice: "Ship decomposed changes behind reversible flags", reason: "Review, rollout, and rollback remain legible to engineering and operations." },
          { pressure: "A silent failure becomes an operator problem", choice: "Instrument the failure path, not only throughput", reason: "The team can intervene before a clinician has to diagnose the backend." },
        ],
        decisions: [
          {
            id: "request-boundary",
            label: "protect the request",
            before: "Documents, reminders, backfills, and vendor calls can outlive a provider-facing request or fail on another company's timeline.",
            decision: "Keep the clinical API narrow and move long-running work into durable, observable background stages.",
            consequence: "The provider-facing path stays responsive while retry and failure state remain visible to engineering.",
            evidence: "Django REST Framework · Celery · Redis",
            tone: "cold",
          },
          {
            id: "compliance-boundary",
            label: "make risk visible",
            before: "A small code-path mistake can become a privacy or audit problem long after the request completed.",
            decision: "Make permission, consent, audit, and vendor boundaries explicit before automation crosses them.",
            consequence: "Reviewers can see where sensitive state enters, where it leaves, and which conditions block movement.",
            evidence: "HIPAA workflows · audit state · scoped integrations",
            tone: "heat",
          },
          {
            id: "reversible-rollout",
            label: "shrink failure",
            before: "A large release makes clinical operations absorb the uncertainty all at once.",
            decision: "Decompose changes, ship behind flags, instrument the failure path, and preserve rollback.",
            consequence: "Velocity comes from making each failure smaller, diagnosable, and reversible—not from ignoring consequence.",
            evidence: "Feature flags · Datadog · decomposed PRs",
            tone: "signal",
          },
          {
            id: "spring-integration",
            label: "cross a company seam",
            before: "A third-party clinical integration brings two data models, authentication boundaries, operational timelines, and failure modes together.",
            decision: "Treat the Spring Health integration as an explicit seam with scoped contracts, durable state, and observable failure behavior.",
            consequence: "The current work can evolve without presenting an in-progress integration as a finished outcome.",
            evidence: "Current work · Spring Health integration",
            tone: "heat",
          },
        ],
        surfaces: [
          { name: "Reassessments", mode: "clinical", detail: "Cadence, eligibility, and prior state coordinate a workflow that unfolds over time." },
          { name: "Progress notes", mode: "documentation", detail: "Provider-authored clinical records preserve permissions and audit context." },
          { name: "Document workflows", mode: "operations", detail: "Generation, storage, delivery, and retry state remain durable and traceable." },
          { name: "Consent + audit", mode: "compliance", detail: "Sensitive boundaries enter early and remain visible through external integrations." },
          { name: "Third-party integrations", mode: "system seam", detail: "Authentication, data contracts, retry behavior, and audit context are designed for another company's independent timeline." },
        ],
        technologies: [
          { label: "Application", values: ["Python", "Django", "Django REST Framework"] },
          { label: "Workflow + data", values: ["Celery", "Redis", "PostgreSQL", "S3"] },
          { label: "Operations", values: ["Datadog", "feature flags", "vendor APIs", "background jobs"] },
        ],
        toolEvidence: [
          { name: "Python", icon: "python", category: "Application", project: "Alma", reason: "A mature language ecosystem for production backend systems, clinical business rules, and integration work." },
          { name: "Django", icon: "django", category: "Application", project: "Alma", reason: "Reviewable request boundaries, permissions, data modeling, and administrative tooling for a long-lived healthcare product." },
          { name: "Celery", mark: "CY", category: "Workflow", project: "Alma", reason: "Moves backfills, reminders, documents, and vendor operations out of the synchronous clinical request path." },
          { name: "Redis", icon: "redis", category: "Workflow", project: "Alma", reason: "Supports background execution and coordination where job state must remain operationally visible." },
          { name: "PostgreSQL", icon: "postgres", category: "Data", project: "Alma", reason: "Durable relational state for workflows that unfold across time, actors, permissions, and audits." },
          { name: "AWS", icon: "aws", category: "Infrastructure", project: "Alma", reason: "Durable object storage and production infrastructure for document-heavy backend workflows." },
          { name: "Datadog", icon: "datadog", category: "Proof", project: "Alma", reason: "Turns the failure path into an engineering surface so the team can intervene before clinicians become debuggers." },
          { name: "Spring Health", mark: "SH", category: "Integration", project: "Alma · current", reason: "The current integration is treated as a system seam: contract, authentication, durable state, observability, and compliance—not a logo hookup." },
        ],
      }}
      proofs={[
        {
          src: "/images/projects/alma-system-v4.svg",
          alt: "High-contrast clinical backend workflow diagram",
          label: "Seven feature areas; one operating principle",
          caption: "Reassessments, notes, document workflows, reminders, consent, audit integrations, and observability were treated as one continuity problem.",
        },
      ]}
      learning={{
        eyebrow: "Production changed the meaning of velocity",
        title: "Move quickly by making the failure mode smaller.",
        body: (
          <>
            <p>
              Alma taught me that care and speed are not opposites. A rollout can move continuously
              when each step is reviewable, measurable, and reversible. That operating instinct now
              shapes how I design trust boundaries for agent systems.
            </p>
          </>
        ),
        notes: [
          "Design for the backfill, not only the happy-path request.",
          "Treat observability as an operator interface.",
          "Make sensitive rollout state explicit before adding automation.",
        ],
      }}
      primaryLink={{ href: "https://www.helloalma.com", label: "Visit Alma", external: true }}
      secondaryLink={{ href: "/projects/orgx", label: "See the continuity thesis" }}
      next={{ href: "/projects/perfpulse", label: "Next / local tooling", title: "PerfPulse" }}
    />
  );
}
