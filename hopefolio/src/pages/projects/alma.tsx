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

export default function AlmaProductionAI() {
  const { themeProps } = useTheme();

  const techStack = [
    { category: "Backend", technologies: "Python 96%, Django, DRF" },
    { category: "Async", technologies: "Celery, Redis, scheduled tasks" },
    { category: "Database", technologies: "PostgreSQL, S3 with RBAC" },
    { category: "Monitoring", technologies: "Datadog, Sentry" },
    { category: "Auth", technologies: "Feature flags, state machines" },
    {
      category: "Integration",
      technologies: "Brellium API, PDF generation",
    },
  ];

  const architectureDiagram = `
    flowchart TB
      subgraph "Application Layer"
        A[Django / DRF] --> B[Feature Flags]
        A --> C[State Machines]
      end

      subgraph "Async Processing"
        D[Celery Workers] --> E[Backfill Jobs]
        D --> F[Scheduled Tasks]
        D --> G[Batch Enrollment]
      end

      subgraph "Data & Storage"
        H[PostgreSQL] --> I[Clinical Data]
        J[S3 with RBAC] --> K[PDF Reports]
      end

      subgraph "Observability"
        L[Datadog] --> M[Metrics & Alerts]
        N[Sentry] --> O[Error Tracking]
      end

      A --> D
      D --> H
      D --> J
      A --> L
      A --> N

      style A fill:#8B5CF6,stroke:#7C3AED,color:#fff
      style D fill:#3B82F6,stroke:#2563EB,color:#fff
      style L fill:#10B981,stroke:#059669,color:#fff
  `;

  const features = [
    {
      title: "AI-Powered Automated Reassessments",
      description:
        "Intelligent clinical reassessment system that automates therapist workflows while maintaining HIPAA compliance",
      items: [
        "Backfill jobs for retroactive reassessment generation across patient populations",
        "Cadence logic engine that determines optimal reassessment timing per patient",
        "Batch enrollment system for onboarding large patient cohorts efficiently",
        "State machine-driven workflow ensuring assessments follow clinical protocols",
      ],
    },
    {
      title: "Compliant Progress Notes",
      description:
        "HIPAA-compliant progress note generation with structured clinical metadata and PDF export",
      items: [
        "Automated PDF generation with clinical formatting and metadata",
        "Structured clinical data capture with validation rules",
        "Role-based access control (RBAC) for document storage on S3",
        "Audit trail for all document creation and access events",
      ],
    },
    {
      title: "Brellium Audit Integration",
      description:
        "Robust third-party API integration for clinical quality auditing with production-grade reliability",
      items: [
        "API client with exponential backoff and retry logic",
        "Automatic 401 re-authentication handling for long-running jobs",
        "Webhook ingestion for real-time audit status updates",
        "Comprehensive error handling with Sentry alerting on failures",
      ],
    },
  ];

  const stats = [
    {
      value: "40%→89%",
      label: "Therapist Adoption",
      description: "Reassessment completion rate",
    },
    {
      value: "20%",
      label: "Fewer Errors",
      description: "System error reduction",
    },
    {
      value: "HIPAA",
      label: "Compliant",
      description: "Full regulatory compliance",
    },
    {
      value: "96%",
      label: "Python",
      description: "Primary language",
    },
  ];

  const keyAchievements = [
    "Therapist Adoption: Drove reassessment completion from 40% to 89% through intelligent automation and UX improvements",
    "System Reliability: Reduced system errors by 20% via Celery task hardening, retry logic, and Datadog monitoring",
    "Clinical Compliance: Built HIPAA-compliant PDF generation and S3 storage with role-based access control",
    "API Resilience: Implemented Brellium API client with exponential backoff, automatic re-auth, and circuit breaker patterns",
    "Scale: Designed batch enrollment and backfill systems processing thousands of patient records asynchronously",
  ];

  return (
    <ProjectLayout
      title="Alma - Production AI Systems"
      description="HIPAA-compliant clinical AI features powering therapist workflows at scale"
    >
      <ProjectHero
        title="Alma: Production AI at Scale"
        description="Building HIPAA-compliant clinical AI features that power therapist workflows at Alma. From automated reassessments to compliant progress notes, these production systems drove therapist adoption from 40% to 89% while reducing system errors by 20%."
        tags={[
          "Production AI",
          "HIPAA Compliant",
          "Django",
          "Celery",
          "Healthcare",
        ]}
        image="/images/projects/alma.svg"
      />

      <TechStack items={techStack} />

      <ProjectSection title="System Architecture">
        <p className="text-lg mb-6">
          Alma's clinical AI systems are built on Django and DRF, with Celery
          handling asynchronous processing for batch operations, scheduled
          tasks, and long-running AI workflows. PostgreSQL and S3 provide
          HIPAA-compliant data storage, while Datadog and Sentry ensure
          production observability.
        </p>

        <MermaidDiagram
          title="Production Architecture"
          diagram={architectureDiagram}
          description="Django application layer manages clinical workflows through feature flags and state machines, delegating heavy processing to Celery workers that interact with PostgreSQL, S3, and external APIs under Datadog and Sentry observability."
        />

        <ProjectCard variant="secondary" className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-primary">
            Production-Grade Healthcare AI
          </h3>
          <p>
            Every feature is built with HIPAA compliance as a foundational
            requirement, not an afterthought. Feature flags gate rollouts,
            state machines enforce clinical protocols, and comprehensive
            audit logging ensures regulatory traceability across all patient
            interactions.
          </p>
        </ProjectCard>
      </ProjectSection>

      <ProjectSection title="Core Features">
        <FeatureGrid features={features} columns={1} />
      </ProjectSection>

      <ProjectSection title="Impact & Metrics">
        <StatsDisplay stats={stats} className="mb-8" />

        <ProjectCard variant="accent" className="mb-6">
          <h3 className="text-xl font-semibold mb-4 text-primary">
            Key Achievements
          </h3>
          <ul className="space-y-3">
            {keyAchievements.map((achievement, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2 bg-primary" />
                <span className="text-body">
                  <strong>{achievement.split(":")[0]}:</strong>{" "}
                  {achievement.split(":").slice(1).join(":")}
                </span>
              </li>
            ))}
          </ul>
        </ProjectCard>

        <div className="grid md:grid-cols-2 gap-6">
          <ProjectCard variant="secondary">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Clinical Impact
            </h3>
            <p>
              The automated reassessment system transformed therapist
              workflows, enabling clinicians to focus on patient care rather
              than administrative tasks. By handling cadence logic, batch
              enrollment, and backfill operations automatically, the system
              nearly doubled reassessment completion rates.
            </p>
          </ProjectCard>

          <ProjectCard variant="highlight">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Engineering Excellence
            </h3>
            <p>
              Production reliability was achieved through robust Celery task
              design with idempotency guarantees, comprehensive Datadog
              monitoring with custom dashboards, and Sentry integration for
              real-time error tracking and alerting across all clinical
              workflows.
            </p>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectCTA demoUrl="https://helloalma.com" />
    </ProjectLayout>
  );
}
