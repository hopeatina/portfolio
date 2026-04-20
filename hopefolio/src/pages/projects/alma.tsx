import Head from "next/head";
import React from "react";
import {
  BuildSurface,
  CalloutList,
  CaseStudyEndcap,
  CaseStudyHero,
  CaseStudySection,
  CaseStudySplit,
  DiagramFrame,
  TerminalPanel,
} from "@/components/site/CaseStudyPrimitives";

const architectureDiagram = `
flowchart TB
  subgraph API["Django / DRF"]
    A[ViewSets + serializers] --> B[Feature flags]
    A --> C[RBAC permissions]
  end

  subgraph Async["Celery workers"]
    D[Reassessment jobs] --> E[Backfills]
    D --> F[Cadence scheduling]
    G[Session feedback] --> H[Hourly reminders]
  end

  subgraph Data["Data layer"]
    I[PostgreSQL] --> J[Clinical models]
    K[S3] --> L[PDFs + documents]
  end

  subgraph External["External systems"]
    M[Brellium API] --> N[Audit requests]
  end

  A --> D
  A --> G
  D --> I
  A --> K
  A --> M
`;

export default function AlmaPage() {
  return (
    <>
      <Head>
        <title>Alma | Hope Atina</title>
        <meta
          name="description"
          content="Alma case study: HIPAA-compliant backend engineering for automated reassessments, compliant progress notes, audit integrations, and document workflows."
        />
      </Head>

      <main id="main-content" className="page-frame">
        <div className="page-stack">
          <CaseStudyHero
            kicker="Case study 02"
            status="Shipped in production"
            title="Alma"
            subtitle="999 commits in HIPAA production across reassessments, compliance, audit integrations, and document workflows."
            description="Long-running, failure-sensitive backend ownership in a regulated environment: reassessment logic, audit integrations, Datadog observability, Celery workflows, and RBAC document management — all shipped without breaking production."
            facts={[
              { label: "Commits", value: "999" },
              { label: "Tenure", value: "2.7 years" },
              { label: "Feature areas", value: "7 shipped" },
              { label: "Error reduction", value: "20%" },
              { label: "Adoption", value: "72%" },
            ]}
          />

          <BuildSurface
            items={[
              { label: "Language", value: "Python" },
              { label: "Framework", value: "Django + DRF" },
              { label: "Async", value: "Celery workers" },
              { label: "Storage", value: "PostgreSQL + S3" },
            ]}
          />

          <CaseStudySection kicker="01 // production frame" title="What the work actually demanded">
            <CaseStudySplit
              media={
                <TerminalPanel
                  label="feature areas shipped"
                  lines={[
                    "automated_reassessments    → 72% adoption",
                    "compliant_progress_notes   → HIPAA-safe workflows",
                    "brellium_audit_integration → third-party audit hooks",
                    "rbac_document_management   → permission-scoped docs",
                    "celery_reminders           → async therapist comms",
                    "datadog_observability      → 20% fewer prod errors",
                    "serializer_evolution       → evolving compliance reqs",
                    "",
                    "over 999 commits · 2.7 years · operational ownership",
                  ]}
                />
              }
            >
              <p>
                Alma is where the portfolio proves I can operate under
                healthcare constraints, not just prototype around them. The work
                covered automated reassessment logic, serializer churn for
                evolving compliance requirements, document pipelines, and
                third-party audit integrations.
              </p>
              <p>
                The constant here was operational care: feature flags, multi-PR
                rollout strategy, reversible migrations, and background jobs
                designed to survive large backfills and token-expiring external
                APIs.
              </p>
            </CaseStudySplit>
          </CaseStudySection>

          <CaseStudySection kicker="02 // architecture" title="The system had to stay boring in the right ways" raised>
            <DiagramFrame
              title="Clinical backend architecture"
              description="Django and DRF for request surfaces, Celery for asynchronous work, PostgreSQL and S3 for durable data, and Brellium for external audit flows."
              diagram={architectureDiagram}
            />
          </CaseStudySection>

          <CaseStudySection kicker="03 // feature areas" title="The seven areas that mattered">
            <CalloutList
              items={[
                "Automated clinical reassessments with backfills, cadence logic, family-based assessment rules, and batch enrollment flows.",
                "Compliant progress notes and PDF generation where serializer shape and audit requirements kept evolving.",
                "Brellium audit integration with retries, re-authentication, and production-ready API handling.",
                "Appointment document management with RBAC and S3-backed lifecycle rules.",
                "Provider consent rollout decomposed into multiple safe PRs instead of one risky launch.",
                "Session feedback and reminder systems tied back into the reassessment engine.",
                "Audit-protection infrastructure for appointment-level compliance state.",
              ]}
            />
          </CaseStudySection>

          <CaseStudySection kicker="04 // decisions" title="Why the implementation choices mattered" raised>
            <CaseStudySplit
              media={
                <CalloutList
                  items={[
                    "Celery handled backfills, reminders, and long-running work that should never block a request.",
                    "Feature flags let production code land safely before provider-facing rollout.",
                    "Multi-PR decomposition kept a sensitive consent feature reviewable and reversible.",
                  ]}
                />
              }
            >
              <p>
                In a HIPAA environment, velocity is not the same thing as rush.
                The engineering challenge is to ship continuously while keeping
                the failure modes controlled and the audit trail legible.
              </p>
              <p>
                That kind of work rarely produces a glamorous demo, but it does
                produce trust. That is the real artifact here.
              </p>
            </CaseStudySplit>
          </CaseStudySection>

          <CaseStudyEndcap
            title="The work that holds when the system cannot break."
            body={
              <>
                <p>
                  Long-running, failure-sensitive backend ownership in a
                  regulated environment. The same instinct carries directly
                  into agent infrastructure: build systems that stay
                  inspectable when they matter most.
                </p>
              </>
            }
            primaryHref="/projects/orgx"
            primaryLabel="Read OrgX case study →"
            secondaryHref="https://www.helloalma.com"
            secondaryLabel="View Alma"
          />
        </div>
      </main>
    </>
  );
}
