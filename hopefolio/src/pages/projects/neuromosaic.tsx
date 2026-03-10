import React from "react";
import ProjectLayout from "@/components/projects/ProjectLayout";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectSection from "@/components/projects/ProjectSection";
import ProjectCTA from "@/components/projects/ProjectCTA";
import TechStack from "@/components/projects/TechStack";
import FeatureGrid from "@/components/projects/FeatureGrid";
import StatsDisplay from "@/components/projects/StatsDisplay";
import ProjectCard from "@/components/projects/ProjectCard";
import MermaidDiagram from "@/components/projects/MermaidDiagram";

export default function Neuromosaic() {
  const techStack = [
    {
      category: "Infrastructure",
      technologies: "Docker, Kubernetes, Container Orchestration",
    },
    { category: "Backend", technologies: "FastAPI, SQLAlchemy, Alembic" },
    { category: "Database", technologies: "PostgreSQL, SQLite, 20+ Tables" },
    {
      category: "ML/AI",
      technologies: "PyTorch, Transformers, LLM Code Generation",
    },
    {
      category: "Distributed",
      technologies: "Multi-node Training, Resource Management",
    },
    { category: "Monitoring", technologies: "WebSocket, Real-time Dashboard" },
    { category: "Cloud", technologies: "AWS, HuggingFace Hub" },
    { category: "Quality", technologies: "Pytest, Coverage, Pre-commit" },
  ];

  const infrastructureFeatures = [
    {
      title: "Distributed Experiment Orchestration",
      description:
        "Container-based infrastructure for running, tracking, and managing ML experiments at scale",
      items: [
        "Docker-based experiment isolation with automatic environment provisioning and cleanup",
        "Multi-node distributed training across compute clusters with resource allocation",
        "FastAPI backend with 15+ endpoint categories managing experiments, architectures, and results",
        "PostgreSQL database with 20+ tables handling the full experiment lifecycle",
      ],
    },
    {
      title: "LLM-Powered Architecture Generation",
      description:
        "Automated neural architecture search using LLM code generation and meta-learning optimization",
      items: [
        "Compositional encoding: vector representation of neural architectures with 50+ component types",
        "GPT-4 and local LLaMA models generate PyTorch code directly from architecture vectors",
        "Meta-learning loop: Bayesian optimization and evolutionary search guide architecture selection",
        "Complete versioning of generated code, environments, and results for full reproducibility",
      ],
    },
  ];

  const monitoringFeatures = [
    {
      title: "Real-Time Experiment Monitoring",
      description:
        "WebSocket-powered monitoring infrastructure for distributed ML experiments",
      items: [
        "Live training metrics streamed via WebSocket to interactive Dash/Plotly dashboard",
        "3D architecture space visualization with experiments color-coded by performance",
        "Cluster analysis automatically groups similar architectures and identifies patterns",
        "Resource monitoring tracks compute utilization across the distributed cluster",
      ],
    },
    {
      title: "Multi-Language SDK & API Layer",
      description:
        "Comprehensive API infrastructure for programmatic access to the experiment platform",
      items: [
        "RESTful API with 15+ endpoint categories and full OpenAPI documentation",
        "Multi-language SDKs (Python, TypeScript, Go) for integration into existing ML workflows",
        "Type-safe data layer with Pydantic/SQLModel for experiment configuration and results",
        "Database migrations with Alembic for schema evolution without data loss",
      ],
    },
  ];

  const impactStats = [
    {
      value: "50+",
      label: "Architecture Components",
      description: "Compositional search space",
    },
    {
      value: "15+",
      label: "API Endpoints",
      description: "Full experiment management",
    },
    {
      value: "20+",
      label: "Database Tables",
      description: "Complete experiment lifecycle",
    },
    {
      value: "3",
      label: "SDK Languages",
      description: "Python, TypeScript, Go",
    },
  ];

  const architectureDiagram = `
    flowchart TD
      A[Architecture Vector] --> B[LLM Code Gen]
      B --> C[PyTorch Model Code]
      C --> D[Docker Container]
      D --> E[Distributed Training]
      E --> F[Results Database]
      F --> G[Monitoring Dashboard]

      H[Meta-Learning] --> I[Search Strategy]
      I --> A
      F --> H

      J[WebSocket Server] --> K[Real-time Updates]
      E --> J
      K --> G

      L[FastAPI Backend] --> M[REST API / SDKs]
      M --> F
      M --> D

      style A fill:#8E5BEF,stroke:#7A4DD8,color:#fff
      style D fill:#3B82F6,stroke:#2563EB,color:#fff
      style G fill:#F59E0B,stroke:#D97706,color:#fff
      style L fill:#10B981,stroke:#059669,color:#fff
  `;

  return (
    <ProjectLayout
      title="Neuromosaic"
      description="Distributed ML infrastructure for automated neural architecture search with LLM code generation and container orchestration"
    >
      <ProjectHero
        title="Neuromosaic"
        description="Distributed ML infrastructure that automates neural architecture search. LLM-powered code generation, container-based experiment orchestration, multi-node training, and real-time monitoring across a 20+ table PostgreSQL backend."
        tags={[
          "Distributed ML",
          "Infrastructure",
          "Docker",
          "FastAPI",
          "PyTorch",
          "LLM Code Gen",
        ]}
        image="/images/projects/neuromosaic.jpg"
      />

      <TechStack items={techStack} />

      <ProjectSection title="The Problem">
        <p className="text-lg mb-4">
          <strong>
            ML researchers waste weeks on manual architecture experimentation
            with no infrastructure for systematic exploration.
          </strong>{" "}
          Each variation requires hand-coding, manual deployment, and ad-hoc
          tracking — limiting the search space and making results
          irreproducible.
        </p>
        <ul className="space-y-2 list-disc list-inside">
          <li>
            <strong>No orchestration</strong>: Each experiment runs manually
            with custom scripts and no resource management
          </li>
          <li>
            <strong>Limited exploration</strong>: Human bias constrains
            architecture search to familiar patterns
          </li>
          <li>
            <strong>Poor reproducibility</strong>: No systematic tracking of
            code, environment, and configuration across experiments
          </li>
          <li>
            <strong>Resource waste</strong>: No visibility into compute
            utilization across distributed experiments
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Infrastructure Architecture">
        <MermaidDiagram
          title="Distributed Experiment Pipeline"
          diagram={architectureDiagram}
          description="End-to-end infrastructure from architecture vector encoding to distributed training, with meta-learning feedback loop and real-time WebSocket monitoring."
          className="mb-8"
        />

        <FeatureGrid features={infrastructureFeatures} columns={1} />
      </ProjectSection>

      <ProjectSection title="Monitoring & API Infrastructure">
        <FeatureGrid features={monitoringFeatures} columns={1} />
      </ProjectSection>

      <ProjectSection title="Infrastructure Metrics">
        <StatsDisplay stats={impactStats} className="mb-8" />

        <div className="space-y-6">
          <ProjectCard variant="secondary">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Why Container-Based Experiment Isolation
            </h3>
            <p>
              Each experiment runs in its own Docker container with pinned
              dependencies and automatic cleanup. This guarantees
              reproducibility — any experiment can be re-run months later with
              identical results. It also enables safe parallel execution across
              the cluster without dependency conflicts.
            </p>
          </ProjectCard>

          <ProjectCard variant="accent">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Why LLM Code Generation Over Configuration Files
            </h3>
            <p>
              Configuration-based NAS systems are limited to predefined
              building blocks. LLM code generation can produce novel
              architectural patterns that wouldn't exist in a predefined search
              space. The meta-learning loop then evaluates these novel
              architectures and feeds results back to guide future generation.
            </p>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectCTA
        githubUrl="https://github.com/hopeatina/neuromosaic"
        demoUrl="https://neuromosaic.dev"
      />
    </ProjectLayout>
  );
}
