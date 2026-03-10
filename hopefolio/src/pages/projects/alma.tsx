import React from "react";
import ProjectLayout from "@/components/projects/ProjectLayout";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectSection from "@/components/projects/ProjectSection";
import ProjectCTA from "@/components/projects/ProjectCTA";
import TechStack from "@/components/projects/TechStack";
import FeatureGrid from "@/components/projects/FeatureGrid";
import ProjectCard from "@/components/projects/ProjectCard";
import MermaidDiagram from "@/components/projects/MermaidDiagram";
import StatsDisplay from "@/components/projects/StatsDisplay";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

export default function AlmaCove() {
  const { themeProps } = useTheme();

  const techStack = [
    { category: "Language", technologies: "Python (96.4% of file touches)" },
    { category: "Framework", technologies: "Django, Django REST Framework" },
    { category: "Async", technologies: "Celery workers, scheduled tasks" },
    { category: "Database", technologies: "PostgreSQL" },
    { category: "Storage", technologies: "S3 with RBAC permissions" },
    {
      category: "Integration",
      technologies: "Brellium API, PDF generation",
    },
  ];

  const architectureDiagram = `
    flowchart TB
      subgraph "Django / DRF API"
        A[ViewSets & Serializers] --> B[Feature Flags]
        A --> C[RBAC Permissions]
      end

      subgraph "Celery Workers"
        D[Reassessment Jobs] --> E[Backfill Tasks]
        D --> F[Cadence Scheduling]
        G[Session Feedback] --> H[Hourly Reminders]
      end

      subgraph "Data Layer"
        I[PostgreSQL] --> J[Clinical Models]
        K[S3] --> L[PDFs & Documents]
      end

      subgraph "External"
        M[Brellium API] --> N[Audit Requests]
      end

      A --> D
      A --> G
      D --> I
      A --> K
      A --> M

      style A fill:#8B5CF6,stroke:#7C3AED,color:#fff
      style D fill:#3B82F6,stroke:#2563EB,color:#fff
      style I fill:#10B981,stroke:#059669,color:#fff
      style M fill:#F59E0B,stroke:#D97706,color:#fff
  `;

  const featureAreas = [
    {
      title: "1. Automated Clinical Reassessments",
      description:
        "Jul 2023 -- Nov 2025. Built from scratch as the longest-running feature area. The most-modified file in the entire codebase: cove/api/lib/automated_reassessment.py (44 touches).",
      items: [
        "Backfill jobs for retroactive reassessment generation across existing patient populations",
        "Custom cadence logic determining reassessment timing per patient, with support for multiple cadence types",
        "Batch enrollment for onboarding large patient cohorts into the reassessment flow",
        "Family-based assessment logic and multi-assessment-type support added over successive iterations",
        "Session and non-session feedback integration feeding into reassessment decisions",
        "Comprehensive test suite (test_automated_reassessment.py: 36 touches) covering each iteration",
      ],
    },
    {
      title: "2. Compliant Progress Notes & PDF Generation",
      description:
        "Jan 2024 -- Mar 2026. The single most-touched file in the codebase: progress_note.py serializer (56 touches), reflecting continuous compliance requirements.",
      items: [
        "Overhauled serializers across multiple phases to meet evolving clinical compliance standards",
        "PDF templates with layout, styling, and font selectability for Brellium audit compatibility",
        "Appointment metadata, mental status exams, risk/protective factor fields added to notes",
        "Download logic and document management for compliant progress note delivery",
        "Multi-phase migration path: each compliance change required careful data migration alongside serializer updates",
      ],
    },
    {
      title: "3. Brellium Audit Integration",
      description:
        "Aug -- Sep 2025. Complete third-party API client built in a focused two-month sprint. brellium_client.py (32 touches) was iterated on heavily to handle production edge cases.",
      items: [
        "Full API client with authentication, exponential backoff, and retry logic",
        "Automatic 401 re-authentication for long-running batch jobs that outlast token lifetimes",
        "PDF upload and document retrieval endpoints for audit submission workflows",
        "AuditRequestsViewSet with serializers, URL routing, and OpenAPI documentation",
        "Extensive test suite using both class-based and decorator-based mock patterns",
      ],
    },
    {
      title: "4. Appointment Document Management",
      description:
        "May -- Jul 2025. Full document lifecycle from upload through download with compliance-driven access controls.",
      items: [
        "AppointmentDocument model with migrations and S3 integration for file storage",
        "Full CRUD ViewSet supporting upload, download, and metadata operations",
        "30-day replace window validation: documents could only be replaced within 30 days of creation",
        "RBAC groups and permissions controlling who could upload, view, and manage documents",
        "Feature-flagged access control for staged rollout to clinical teams",
      ],
    },
    {
      title: "5. Membership Agreement / Provider Consent",
      description:
        "Feb -- Mar 2026. Shipped as a multi-PR feature across 5 branches, deliberately decomposed to keep each PR reviewable and each migration safe.",
      items: [
        "ProviderConsent model with a state machine: pending, consented, dismissed",
        "Decomposed into model, migration, business logic, API, and monitoring PRs",
        "Feature flags gating serializer exposure so the feature could be enabled per-provider",
        "Why multi-PR: consent touches auth, billing, and clinical flows -- shipping atomically would have been a single massive, high-risk PR",
      ],
    },
    {
      title: "6. Session Feedback System",
      description:
        "Apr -- Jun 2024. Feedback collection integrated into the reassessment pipeline.",
      items: [
        "Migration and management command for bootstrapping session feedback data",
        "Celery scheduled task sending hourly reminders to therapists for pending feedback",
        "Integration with the automated reassessment flow so feedback data informed reassessment timing",
        "Why Celery for reminders: hourly cadence needed to be reliable and decoupled from request/response cycles",
      ],
    },
    {
      title: "7. Audit Protection & Compliance",
      description:
        "Mar -- Jun 2025. Infrastructure for tracking and enforcing audit readiness across appointments.",
      items: [
        "AuditProtection model for tracking audit statuses per appointment",
        "RBAC groups and permissions ensuring only authorized roles could modify audit compliance state",
        "Tied into appointment document management for end-to-end audit coverage",
      ],
    },
  ];

  const stats = [
    {
      value: "999",
      label: "Commits",
      description: "891 non-merge, Jul 2023 -- Mar 2026",
    },
    {
      value: "98690",
      label: "Net Lines",
      prefix: "+",
      description: "117,863 added / 19,173 removed",
    },
    {
      value: "7",
      label: "Major Features",
      description: "Shipped to production",
    },
    {
      value: "96.4",
      label: "Percent Python",
      suffix: "%",
      description: "1,893 of 1,966 file touches",
    },
  ];

  const hotFiles = [
    "cove/api/view_serializers/progress_note.py: 56 touches -- compliance kept changing, so this serializer kept changing with it",
    "cove/api/lib/automated_reassessment.py: 44 touches -- core business logic for the reassessment system, evolved over 2+ years",
    "cove/api/tests/test_progress_note.py: 36 touches -- every serializer change required corresponding test updates",
    "cove/api/tests/test_automated_reassessment.py: 36 touches -- comprehensive coverage for each new cadence type and edge case",
    "cove/api/lib/brellium_client.py: 32 touches -- rapid iteration during the Brellium integration sprint",
  ];

  const tradeoffs = [
    {
      title: "Why Celery for Async",
      description:
        "Backfills, batch enrollment, and hourly reminders all need to run outside the request/response cycle. Celery gave us reliable scheduling, retries on failure, and visibility into task state -- critical when a backfill job touches thousands of patient records and you need to know if it stalled.",
    },
    {
      title: "Why Feature Flags for Rollout",
      description:
        "Clinical software cannot break mid-session. Feature flags let us deploy code to production, then enable it for specific providers or teams. The ProviderConsent feature, for example, was fully deployed behind a flag weeks before it was turned on, giving QA time to verify in the production environment.",
    },
    {
      title: "Why Multi-PR for Provider Consent",
      description:
        "The consent feature touched auth, billing, and clinical flows simultaneously. A single PR would have been 1,000+ lines touching 5 different domains. Splitting into model, migration, business logic, API, and monitoring PRs kept each review focused and each migration reversible.",
    },
  ];

  return (
    <ProjectLayout
      title="Alma (Cove) - Production Backend Engineering"
      description="999 commits of HIPAA-compliant Django backend work: automated reassessments, compliant progress notes, third-party audit integration, and more."
    >
      <ProjectHero
        title="Alma (Cove): 2.7 Years of Production Backend"
        description="Core backend contributor on Alma's internal platform, Cove. 999 commits over July 2023 through March 2026, shipping 7 major feature areas in HIPAA-compliant Django/DRF. This page is backed by a verified contribution report -- every number here comes from git history."
        tags={[
          "Python",
          "Django / DRF",
          "Celery",
          "PostgreSQL",
          "S3",
          "HIPAA",
        ]}
        image="/images/projects/alma.svg"
      />

      <TechStack items={techStack} />

      <ProjectSection title="By the Numbers">
        <p className="text-lg mb-6">
          These metrics come from a verified contribution report covering my
          entire tenure at Alma. 999 commits (891 non-merge), 117,863 lines
          added, 19,173 removed, across 2,247 file changes. Python accounted
          for 96.4% of all file touches (1,893 of 1,966), with the remainder
          split across HTML templates (35), JavaScript (36), and TypeScript (2).
        </p>
        <StatsDisplay stats={stats} className="mb-8" />
      </ProjectSection>

      <ProjectSection title="System Architecture">
        <p className="text-lg mb-6">
          Cove is a Django/DRF backend serving clinical workflows for
          therapists. PostgreSQL stores clinical data, S3 holds generated PDFs
          and uploaded documents, and Celery workers handle everything that
          should not block an API response: backfills, scheduled reminders,
          batch enrollment, and long-running audit submissions.
        </p>

        <MermaidDiagram
          title="Cove Backend Architecture"
          diagram={architectureDiagram}
          description="Django API layer with feature-flagged endpoints and RBAC permissions, Celery workers for async processing, PostgreSQL and S3 for data and document storage, and Brellium as the external audit integration."
        />

        <ProjectCard variant="secondary" className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-primary">
            HIPAA as a Foundational Constraint
          </h3>
          <p>
            Every feature was built under HIPAA compliance requirements. This
            means RBAC on every endpoint, audit trails for document access,
            feature flags gating clinical data exposure, and careful migration
            planning so production data was never exposed during schema changes.
            Compliance was not a phase -- it was the environment every line of
            code shipped into.
          </p>
        </ProjectCard>
      </ProjectSection>

      <ProjectSection title="7 Major Feature Areas">
        <p className="text-lg mb-6">
          These are the major systems I built or substantially extended over
          2.7 years. Each section includes the time range and what made the
          work non-trivial.
        </p>
        <FeatureGrid features={featureAreas} columns={1} />
      </ProjectSection>

      <ProjectSection title="Where the Work Actually Happened">
        <p className="text-lg mb-6">
          The most frequently modified files tell the real story of where
          complexity lived. These five files account for a disproportionate
          share of total touches because they sit at the intersection of
          evolving compliance requirements, business logic, and test coverage.
        </p>

        <ProjectCard variant="accent" className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-primary">
            Most-Touched Files
          </h3>
          <ul className="space-y-3">
            {hotFiles.map((file, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2 bg-primary" />
                <span className="text-body font-mono text-sm">
                  {file}
                </span>
              </li>
            ))}
          </ul>
        </ProjectCard>

        <p className="text-base text-body-secondary">
          The pattern is clear: the progress note serializer was modified more
          than any other file because clinical compliance standards kept
          evolving. Every time a new field was required for audit readiness --
          mental status exams, risk factors, appointment metadata -- the
          serializer changed, its tests changed, and often the PDF template
          changed too. This is what production compliance work looks like: not
          one heroic rewrite, but dozens of careful, incremental updates.
        </p>
      </ProjectSection>

      <ProjectSection title="Engineering Tradeoffs">
        <p className="text-lg mb-6">
          Production systems are shaped by tradeoffs. Here are three decisions
          that defined the architecture and why they were the right calls.
        </p>

        <div className="grid md:grid-cols-1 gap-6">
          {tradeoffs.map((tradeoff, index) => {
            const variants = ["secondary", "highlight", "accent"] as const;
            return (
              <ProjectCard
                key={index}
                variant={variants[index % variants.length]}
              >
                <h3 className="text-xl font-semibold mb-3 text-primary">
                  {tradeoff.title}
                </h3>
                <p>{tradeoff.description}</p>
              </ProjectCard>
            );
          })}
        </div>
      </ProjectSection>

      <ProjectSection title="What This Work Demonstrates">
        <div className="grid md:grid-cols-2 gap-6">
          <ProjectCard variant="secondary">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Sustained Production Ownership
            </h3>
            <p>
              999 commits over 2.7 years is not a sprint -- it is sustained
              ownership of production systems. The automated reassessment
              feature alone evolved over 28 months, from initial backfill jobs
              through custom cadence support, family-based logic, and
              multi-assessment-type support. Each iteration shipped to
              production under HIPAA constraints.
            </p>
          </ProjectCard>

          <ProjectCard variant="highlight">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Depth Over Breadth
            </h3>
            <p>
              96.4% Python across nearly 2,000 file touches means deep
              expertise in Django/DRF patterns: serializer design, migration
              safety, Celery task reliability, RBAC modeling, and test
              architecture. The Brellium integration sprint (32 touches on the
              client file in two months) shows the ability to go deep on
              third-party API integration with production-grade error handling.
            </p>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectCTA demoUrl="https://helloalma.com" />
    </ProjectLayout>
  );
}
