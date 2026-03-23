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

function ContributionSurface() {
  const blocks = [
    1, 2, 2, 3, 4, 3, 2, 2, 1, 2, 3, 4,
    4, 4, 3, 3, 2, 3, 4, 4, 3, 2, 2, 1,
    2, 3, 4, 4, 3, 3, 4, 4, 3, 2, 1, 1,
  ];

  return (
    <div className="contact-card" style={{ padding: "1.5rem" }}>
      <span className="eyebrow">Contribution history</span>
      <h3 style={{ margin: "0.45rem 0 0", fontFamily: "var(--font-heading)", fontSize: "1.7rem" }}>
        2.7 years of sustained ownership
      </h3>
      <p style={{ margin: "0.8rem 0 1rem", color: "var(--shell-text-soft)" }}>
        999 commits, 7 feature areas, 96.4% Python. The story is not one heroic
        sprint; it is repeated operational ownership under compliance pressure.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
          gap: "0.35rem",
        }}
      >
        {blocks.map((value, index) => (
          <span
            key={`${value}-${index}`}
            style={{
              aspectRatio: "1 / 1",
              borderRadius: "10px",
              background:
                value === 4
                  ? "rgba(0,229,160,0.95)"
                  : value === 3
                    ? "rgba(0,229,160,0.58)"
                    : value === 2
                      ? "rgba(255,255,255,0.18)"
                      : "rgba(255,255,255,0.08)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

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
            description="This is the production proof case study. It shows the kind of long-running, failure-sensitive backend ownership that never becomes flashy but becomes indispensable when the system cannot break."
            facts={[
              { label: "Commits", value: "999" },
              { label: "Tenure", value: "2.7 years" },
              { label: "Feature areas", value: "7 shipped" },
              { label: "Language mix", value: "96.4% Python" },
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
            <CaseStudySplit media={<ContributionSurface />}>
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
            title="999 commits in HIPAA production is the kind of work that doesn’t make demo reels."
            body={
              <>
                <p>
                  It is the work that matters when systems cannot break. That
                  is exactly why it belongs in the portfolio.
                </p>
              </>
            }
            primaryHref="https://www.helloalma.com"
            primaryLabel="View Alma"
            secondaryHref="/projects/orgx"
            secondaryLabel="Read about OrgX"
          />
        </div>
      </main>
    </>
  );
}
