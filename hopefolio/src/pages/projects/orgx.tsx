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

export default function OrgX() {
  const { themeProps } = useTheme();

  const techStack = [
    {
      category: "Core",
      technologies: "TypeScript, React, Next.js",
    },
    {
      category: "Protocol",
      technologies: "MCP Protocol, Claude API, OpenAI API",
    },
    {
      category: "Backend",
      technologies: "Supabase, PostgreSQL, Cloudflare Workers",
    },
    {
      category: "Orchestration",
      technologies: "Agent Spawning, Task Handoff, Durable Workflows",
    },
    {
      category: "Quality",
      technologies: "Composite Scoring, Quality Gates, Trust Governance",
    },
    {
      category: "Infrastructure",
      technologies: "Vercel, Redis, Edge Computing",
    },
    {
      category: "Auth",
      technologies: "OAuth Flows, RBAC, Session Management",
    },
    {
      category: "Tools",
      technologies: "Claude Code Skills, Cursor Plugin, CLI",
    },
  ];

  const problemFeatures = [
    {
      title: "Coordination Complexity",
      description:
        "When multiple AI agents operate across an organization, they need shared context, consistent decision-making, and clear handoff protocols. Without orchestration, agents duplicate work, contradict each other, and produce inconsistent outputs.",
    },
    {
      title: "Governance Gap",
      description:
        "Autonomous agents making decisions at scale require trust boundaries, approval workflows, and quality assurance. Organizations need visibility into what agents are doing and the ability to intervene when needed.",
    },
    {
      title: "Observability Deficit",
      description:
        "Tracking agent performance, scoring output quality, and maintaining organizational memory across sessions is essential for continuous improvement but missing from existing tooling.",
    },
  ];

  const ecosystemFeatures = [
    {
      title: "MCP Server Integrations",
      description:
        "Core protocol layer implementing the Model Context Protocol for standardized agent-to-tool communication. Enables agents to discover, invoke, and compose tools across the organization with consistent interfaces.",
      items: [
        "MCP server implementations for Linear, Gmail, Google Calendar, Cloudflare, and Vercel",
        "Tool-calling middleware with schema validation and error handling",
        "Dynamic tool discovery and capability negotiation between agents",
        "Standardized resource and prompt management across all integrations",
      ],
    },
    {
      title: "CLI-First Orchestration Engine",
      description:
        "Command-line interface for spawning, monitoring, and managing agent workflows. Designed for developer ergonomics with composable commands and real-time streaming output.",
      items: [
        "Agent spawning with configurable models, tools, and trust levels",
        "Task handoff protocols for multi-agent collaboration chains",
        "Durable workflow execution with checkpoint and resume capabilities",
        "Real-time streaming of agent activity with structured logging",
      ],
    },
    {
      title: "Quality & Scoring System",
      description:
        "Composite scoring engine that evaluates agent outputs against multiple quality dimensions. Integrates with quality gates to enforce standards before work is accepted.",
      items: [
        "Multi-signal scoring combining relevance, completeness, correctness, and style",
        "Quality gates that block progression until outputs meet configurable thresholds",
        "Outcome attribution tracking which agents and decisions led to results",
        "Historical scoring data powering continuous improvement and trust calibration",
      ],
    },
  ];

  const technicalDecisions = [
    {
      title: "Why MCP Protocol",
      description:
        "MCP provides a standardized interface between LLMs and external tools, eliminating the need to write custom integrations for every model-tool combination. By adopting MCP as the protocol layer, OrgX agents can use any MCP-compatible tool without modification, and new tools become instantly available to all agents in the organization.",
      items: [
        "Vendor-agnostic: works with Claude, GPT, and other LLM providers",
        "Composable tool ecosystem with shared schemas and discovery",
        "Community-driven standard with growing adoption across the industry",
      ],
    },
    {
      title: "Why Supabase for Org Memory",
      description:
        "Organizational memory requires both structured data (entities, relationships, decisions) and real-time subscriptions (live agent activity, collaborative editing). Supabase provides PostgreSQL for complex queries with Row Level Security, plus real-time channels for live updates -- all with minimal infrastructure overhead.",
      items: [
        "Row Level Security enables per-org and per-user data isolation",
        "Real-time subscriptions power live dashboards and agent monitoring",
        "Edge Functions for lightweight serverless compute close to users",
      ],
    },
    {
      title: "Trust-Based Governance Model",
      description:
        "Rather than binary allow/deny permissions, OrgX implements a graduated trust model where agents earn autonomy through demonstrated quality. New agents start with limited scope and require human approval for consequential actions. As they accumulate positive outcomes, their trust level increases and approval requirements relax.",
      items: [
        "Graduated autonomy: agents earn broader permissions over time",
        "Decision approval workflows for high-stakes actions",
        "Spawn guards preventing uncontrolled agent proliferation",
        "Audit trail of every decision, outcome, and trust adjustment",
      ],
    },
  ];

  const autonomousSessionFeatures = [
    {
      title: "Autonomous Session System",
      description:
        "Long-running agent sessions that operate independently with periodic check-ins and configurable guardrails.",
    },
    {
      title: "Claude Code Skills Ecosystem",
      description:
        "Custom skills that extend Claude Code with organization-specific capabilities, workflows, and domain knowledge.",
    },
    {
      title: "Cursor Plugin",
      description:
        "IDE integration bringing OrgX orchestration directly into the development workflow with inline agent management.",
    },
    {
      title: "Initiative Streaming",
      description:
        "Break large initiatives into streams of work that agents can pick up, execute, and hand off with full context preservation.",
    },
    {
      title: "Morning Brief System",
      description:
        "Automated daily summaries of agent activity, pending decisions, and organizational health metrics.",
    },
    {
      title: "Outcome Attribution",
      description:
        "Track which agents, decisions, and workflows led to specific outcomes for continuous learning and optimization.",
    },
  ];

  const orchestrationDiagram = `
    flowchart TB
      subgraph "Protocol Layer"
        A[MCP Server] --> B[Agent Spawning]
        B --> C[Task Handoff]
      end

      subgraph "Governance Layer"
        D[Decision Approval] --> E[Quality Gates]
        E --> F[Trust Governance]
      end

      subgraph "Intelligence Layer"
        G[Org Memory] --> H[Composite Scoring]
        H --> I[Outcome Attribution]
      end

      C --> D
      F --> G
      I --> A

      style A fill:#8B5CF6,stroke:#7C3AED,color:#fff
      style E fill:#DC2626,stroke:#B91C1C,color:#fff
      style G fill:#10B981,stroke:#059669,color:#fff
  `;

  const projectStats = [
    {
      value: "1,457+",
      label: "Commits",
      description: "Across the ecosystem",
    },
    {
      value: "19",
      label: "Repositories",
      description: "Interconnected ecosystem",
    },
    {
      value: "Live",
      label: "Production",
      description: "At useorgx.com",
    },
    {
      value: "12 mo",
      label: "Active Development",
      description: "And counting",
    },
  ];

  const architectureHighlights = [
    "19-Repo Ecosystem: Modular architecture spanning MCP servers, CLI tools, web apps, plugins, and shared libraries",
    "Durable Workflows: Agent tasks survive disconnections and resume with full context from checkpoints",
    "Composite Scoring Engine: Multi-signal quality evaluation combining automated metrics with human feedback",
    "Trust Calibration: Dynamic trust levels that adapt based on agent track record and outcome attribution",
    "Spawn Guards: Prevent runaway agent proliferation with configurable limits and approval requirements",
  ];

  return (
    <ProjectLayout
      title="OrgX"
      description="Multi-agent orchestration platform with MCP protocol integration, trust-based governance, and organizational memory for coordinating AI agents at scale"
    >
      <ProjectHero
        title="OrgX"
        description="A multi-agent orchestration platform that coordinates AI agents across an organization with MCP protocol integration, trust-based governance, quality gates, and persistent organizational memory. Built as a 19-repository ecosystem powering durable agent workflows at scale."
        tags={[
          "Multi-Agent Orchestration",
          "MCP Protocol",
          "Agent Governance",
          "Tool Calling",
        ]}
        image="/images/projects/orgx.jpg"
      />

      <TechStack items={techStack} />

      <ProjectSection title="The Problem">
        <p className="text-lg mb-8">
          Coordinating multiple AI agents across an organization requires
          orchestration, governance, and observability. Without these
          foundations, agents operate in silos, make conflicting decisions, and
          produce outputs no one can trace or trust.
        </p>

        <FeatureGrid features={problemFeatures} columns={3} />
      </ProjectSection>

      <ProjectSection title="Architecture Overview">
        <p className="text-lg mb-6">
          OrgX implements a three-layer architecture: a protocol layer for
          standardized agent-tool communication via MCP, a governance layer for
          decision approval and quality enforcement, and an intelligence layer
          for organizational memory and continuous learning.
        </p>

        <MermaidDiagram
          title="Multi-Agent Orchestration Pipeline"
          diagram={orchestrationDiagram}
          description="End-to-end flow from MCP server integration through agent spawning, task handoff, decision approval, quality gates, trust governance, and organizational memory with outcome attribution feeding back into the system."
        />

        <ProjectCard variant="secondary" className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-primary">
            Why This Architecture
          </h3>
          <p>
            Each layer can evolve independently. The protocol layer adopts new
            MCP tools without touching governance. The governance layer can
            tighten or relax controls without changing how agents communicate.
            The intelligence layer learns from every interaction, making the
            entire system smarter over time.
          </p>
        </ProjectCard>
      </ProjectSection>

      <ProjectSection title="What I Built">
        <p className="text-lg mb-8">
          A 19-repository ecosystem including MCP server integrations,
          CLI-first orchestration, durable agent workflows, tool-calling
          middleware, composite scoring engines, quality gates, autonomous
          session systems, a Claude Code skills ecosystem, and a Cursor plugin.
        </p>

        <FeatureGrid features={ecosystemFeatures} columns={1} />
      </ProjectSection>

      <ProjectSection title="Technical Decisions">
        <FeatureGrid features={technicalDecisions} columns={1} />
      </ProjectSection>

      <ProjectSection title="Agent Capabilities">
        <p className="text-lg mb-6">
          Beyond core orchestration, OrgX provides a rich set of capabilities
          that make agents genuinely useful in day-to-day workflows.
        </p>

        <FeatureGrid features={autonomousSessionFeatures} columns={2} />

        <ProjectCard variant="highlight" className="mt-8">
          <p className="italic text-center text-lg text-body">
            "OrgX is not a wrapper around an API. It is the operating system
            for how AI agents work together inside an organization -- with the
            governance, observability, and trust mechanisms that make autonomous
            agents viable at scale."
          </p>
        </ProjectCard>
      </ProjectSection>

      <ProjectSection title="Proof of Work">
        <StatsDisplay stats={projectStats} className="mb-8" />

        <ProjectCard variant="accent" className="mb-6">
          <h3 className="text-xl font-semibold mb-4 text-primary">
            Architecture Highlights
          </h3>
          <ul className="space-y-3">
            {architectureHighlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2 bg-primary" />
                <span className="text-body">
                  <strong>{highlight.split(":")[0]}:</strong>{" "}
                  {highlight.split(":").slice(1).join(":")}
                </span>
              </li>
            ))}
          </ul>
        </ProjectCard>

        <div className="grid md:grid-cols-2 gap-6">
          <ProjectCard variant="secondary">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Ecosystem Scale
            </h3>
            <p>
              19 repositories working together: MCP servers for Linear, Gmail,
              Google Calendar, Cloudflare, and Vercel; a CLI orchestration
              engine; web dashboard; Claude Code skills; Cursor plugin; shared
              TypeScript libraries; Supabase backend; and Cloudflare Workers
              for edge compute. Each repo has its own CI/CD pipeline, and they
              compose into a coherent platform.
            </p>
          </ProjectCard>

          <ProjectCard variant="highlight">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Live in Production
            </h3>
            <p>
              OrgX is live at useorgx.com, actively used for managing
              multi-agent workflows. The platform handles agent spawning, task
              handoff, decision approval, quality scoring, and organizational
              memory in production -- not a demo, not a prototype, but a
              working system with 12 months of active development and 1,457+
              commits behind it.
            </p>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectCTA
        demoUrl="https://useorgx.com"
        githubUrl="https://github.com/hopeatina"
      />
    </ProjectLayout>
  );
}
