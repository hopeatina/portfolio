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

export default function OrgX() {
  const techStack = [
    {
      category: "Frontend",
      technologies: "Next.js 15, React, TypeScript",
    },
    {
      category: "Database",
      technologies: "Supabase (PostgreSQL with RLS)",
    },
    {
      category: "Auth",
      technologies: "Clerk (session management, RBAC)",
    },
    {
      category: "Workflows",
      technologies: "Inngest (47+ durable workflow functions)",
    },
    {
      category: "AI/LLM",
      technologies: "Anthropic Claude SDK, OpenAI SDK, OpenRouter",
    },
    {
      category: "MCP",
      technologies: "22 servers, 131+ tools",
    },
    {
      category: "Observability",
      technologies: "PostHog, Sentry, OpenTelemetry",
    },
    {
      category: "Evaluation",
      technologies: "Promptfoo-based eval pipelines",
    },
  ];

  const germinationFeatures = [
    {
      title: "The Coordination Problem",
      description:
        "I was running multiple Claude Code sessions across different repos and kept hitting the same wall: agents duplicating work, losing context between sessions, and making decisions I could not trace back. There was no shared memory, no way to set boundaries on what an agent could do unsupervised, and no feedback loop to improve quality over time.",
    },
    {
      title: "Why Not Existing Tools",
      description:
        "LangChain and CrewAI solve the 'chain LLM calls together' problem. I needed something different: a system where agents operate autonomously over hours, not seconds. That means governance (who approved this decision?), durability (what happens when a session crashes mid-task?), and organizational memory (what did we learn last week that is relevant now?).",
    },
    {
      title: "The Operating System Analogy",
      description:
        "An OS does not run your programs for you -- it provides process management, permissions, memory, and inter-process communication. OrgX does the same thing for AI agents: it manages spawning, enforces trust boundaries, maintains shared memory, and coordinates handoffs between agents working on related tasks.",
    },
  ];

  const mcpFeatures = [
    {
      title: "22 MCP Servers, 131+ Tools",
      description:
        "Each MCP server wraps a SaaS API into a standardized tool interface that any agent can discover and invoke. The servers handle authentication, rate limiting, and schema validation so agents interact with tools through a consistent protocol rather than raw API calls.",
      items: [
        "Development: GitHub, Vercel, Supabase, Playwright",
        "Communication: Slack, Intercom",
        "Project Management: Notion, Asana",
        "Business: HubSpot, Stripe, Figma",
        "Data/Docs: Google Drive, Box, Firecrawl",
        "Observability: PostHog, Sentry, Datadog",
        "Media: Kling AI, Runway, Fal.AI",
      ],
    },
    {
      title: "Trust-Based Governance",
      description:
        "A 3-tier trust system (strict, balanced, open) controls what agents can do autonomously. Each tier gates which tools are available and what risk level of action an agent can take without human approval. Risk tiers range from 0 (read-only, no approval needed) to 4 (destructive actions, always require approval).",
      items: [
        "Strict mode: agents can read and analyze but require approval for any mutation",
        "Balanced mode: agents can execute low-risk mutations autonomously, escalate medium-risk",
        "Open mode: agents operate with full autonomy within their capability set",
        "Spawn guards prevent uncontrolled agent proliferation with budget and count limits",
      ],
    },
    {
      title: "Quality Gates and Scoring",
      description:
        "A composite scoring engine evaluates agent outputs across multiple dimensions before work is accepted. Scores feed into workstream prioritization: higher-quality agents get routed to higher-stakes work. Domain-specific quality thresholds ensure that, for example, code changes meet a different bar than documentation edits.",
      items: [
        "Multi-signal scoring combining relevance, completeness, correctness, and domain fit",
        "Quality gates that block progression until outputs meet configurable thresholds",
        "Outcome attribution tracking which agents and decisions led to specific results",
        "Historical scoring data powering trust calibration and model routing decisions",
      ],
    },
  ];

  const tradeoffDecisions = [
    {
      title: "Why Inngest Over Temporal",
      description:
        "Temporal is the industry standard for durable workflows, but it requires running a separate cluster and introduces significant operational overhead. Inngest runs as a managed service with an event-driven model that maps naturally to how agent tasks flow: an event fires (task assigned, approval received, quality check passed), a function runs, and if it fails, it retries with backoff. The 47+ workflow functions in OrgX handle everything from agent spawning to morning brief generation to autonomous session management.",
      items: [
        "Zero infrastructure: no cluster to manage, no workers to scale",
        "Event-driven model matches agent workflow patterns naturally",
        "Built-in retry logic with configurable backoff and failure handling",
        "Step functions for multi-stage workflows with durable state between steps",
      ],
    },
    {
      title: "Why Supabase Over a Custom Backend",
      description:
        "Organizational memory requires both structured data (entities, decisions, trust levels, scoring history) and real-time subscriptions (live agent activity, collaborative dashboards). Supabase provides PostgreSQL with Row Level Security for multi-tenant data isolation, real-time channels for live updates, and edge functions for lightweight compute -- all without managing infrastructure. The tradeoff is less flexibility than a custom backend, but the development velocity has been worth it for a solo-built system.",
      items: [
        "Row Level Security enables per-org data isolation without application-level checks",
        "Real-time subscriptions power live agent monitoring dashboards",
        "PostgreSQL's full-text search supports semantic search over org memory",
        "Edge functions handle webhook processing and lightweight API endpoints",
      ],
    },
    {
      title: "Why MCP as the Protocol Layer",
      description:
        "MCP provides a standardized interface between LLMs and external tools. Instead of writing bespoke integrations for each model-tool combination, each tool exposes an MCP server, and any MCP-compatible agent can discover and invoke it. The tradeoff: MCP is still a young protocol with evolving semantics, but standardizing on it early means OrgX benefits from the growing ecosystem of MCP-compatible tools without custom integration work.",
      items: [
        "New tools become available to all agents instantly via MCP discovery",
        "Schema validation at the protocol layer catches malformed tool calls before execution",
        "Tool-level authentication and rate limiting handled once per server, not per agent",
      ],
    },
  ];

  const capabilityFeatures = [
    {
      title: "Agent Spawning and Model Routing",
      description:
        "Agents are spawned with configurable trust levels, tool access, and model assignments. Opus handles planning and complex reasoning tasks; Sonnet handles execution and routine operations. Spawn guards enforce budget limits and prevent runaway agent proliferation.",
    },
    {
      title: "Autonomous Session Management",
      description:
        "Long-running agent sessions operate independently with periodic check-ins and configurable budget guardrails. Sessions survive interruptions through Inngest's durable workflow execution, picking up where they left off after failures.",
    },
    {
      title: "Morning Brief System",
      description:
        "An Inngest-powered skill that generates automated daily summaries of agent activity, pending decisions, initiative progress, and organizational health metrics. Delivered as a structured report covering what happened, what needs attention, and what is blocked.",
    },
    {
      title: "Organizational Memory",
      description:
        "Semantic search over decisions, agent status, and initiative history. The memory layer captures what agents learned, what decisions were made and why, and what outcomes resulted -- making institutional knowledge queryable rather than lost between sessions.",
    },
    {
      title: "Economic Ledger",
      description:
        "Cost attribution and ROI tracking by agent and capability. Every LLM call, tool invocation, and workflow execution is logged with its cost, enabling analysis of which agents and workflows deliver value relative to their compute spend.",
    },
    {
      title: "Evaluation Pipelines",
      description:
        "Promptfoo-based evaluation pipelines that test agent behavior against defined scenarios. Used to validate model routing decisions, quality gate thresholds, and tool-calling accuracy before deploying changes to production.",
    },
  ];

  const orchestrationDiagram = `
    flowchart TB
      subgraph "Event Layer (Inngest)"
        A[Task Event] --> B[Spawn Guard Check]
        B --> C[Agent Spawned]
        C --> D[Workflow Execution]
        D --> E[Quality Gate]
      end

      subgraph "Governance Layer"
        F[Trust Tier Check] --> G[Capability Gating]
        G --> H[Risk Assessment 0-4]
        H --> I{Approval Required?}
        I -->|Yes| J[Human Review]
        I -->|No| K[Auto-Proceed]
      end

      subgraph "Intelligence Layer"
        L[Org Memory] --> M[Composite Scoring]
        M --> N[Outcome Attribution]
        N --> O[Economic Ledger]
      end

      E --> F
      J --> D
      K --> D
      O --> L

      style A fill:#8B5CF6,stroke:#7C3AED,color:#fff
      style E fill:#DC2626,stroke:#B91C1C,color:#fff
      style L fill:#10B981,stroke:#059669,color:#fff
  `;

  const projectStats = [
    {
      value: "874K",
      label: "Lines of Code",
      description: "Across 8,704 files",
    },
    {
      value: "1,270+",
      label: "Commits",
      description: "Across 7-repo ecosystem",
    },
    {
      value: "131+",
      label: "MCP Tools",
      description: "Across 22 servers",
    },
    {
      value: "15 mo",
      label: "Active Development",
      description: "Dec 2024 - present",
    },
  ];

  const architectureHighlights = [
    "7-Repo Ecosystem: Modular architecture spanning MCP servers, web app, Inngest workflows, shared libraries, and evaluation pipelines",
    "47+ Inngest Functions: Durable workflows handling agent spawning, task orchestration, morning briefs, autonomous sessions, and quality gate enforcement",
    "3-Tier Trust Model: Strict, balanced, and open governance modes with risk tiers 0-4 controlling what agents can do unsupervised",
    "Model Routing: Opus for planning and complex reasoning, Sonnet for execution and routine operations, OpenRouter for fallback",
    "Composite Scoring Engine: Multi-signal quality evaluation feeding into workstream prioritization and trust calibration",
  ];

  const heroFacts = [
    { label: "Proof", value: "1,270+ commits", detail: "Across the OrgX ecosystem" },
    { label: "System", value: "7 repos", detail: "Web app, MCP servers, workflows, shared libs" },
    { label: "Tooling", value: "131+ tools", detail: "Across 22 MCP servers" },
    { label: "State", value: "Live", detail: "Running at useorgx.com" },
  ];

  return (
    <ProjectLayout
      title="OrgX"
      description="Multi-agent orchestration platform with 22 MCP servers, trust-based governance, durable Inngest workflows, and organizational memory -- live at useorgx.com"
    >
      <ProjectHero
        title="OrgX"
        description="A multi-agent orchestration platform I built solo over 15 months. 22 MCP servers with 131+ tools, trust-based governance with risk tiers, durable workflows via Inngest, and organizational memory with semantic search. 874K lines of code across a 7-repo ecosystem, live in production at useorgx.com."
        eyebrow="Flagship system review"
        facts={heroFacts}
        tags={[
          "Multi-Agent Orchestration",
          "MCP Protocol",
          "Trust Governance",
          "Inngest Workflows",
          "Supabase",
        ]}
        image="/images/projects/orgx-home.png"
        artifactLabel="Command center artifact"
        artifactCaption="The OrgX command center is used here as live proof: a real orchestration surface where agent work, governance, and review states converge."
      />

      <TechStack items={techStack} />

      <ProjectSection title="Why I Built This">
        <p className="text-lg mb-8">
          OrgX started from a practical problem: I was running multiple AI agent
          sessions across repos and had no way to coordinate them. Agents
          duplicated work, lost context between sessions, and made decisions I
          could not audit. I needed an operating system for agents -- not another
          LLM wrapper, but infrastructure for process management, permissions,
          shared memory, and inter-agent communication.
        </p>

        <FeatureGrid features={germinationFeatures} columns={3} />
      </ProjectSection>

      <ProjectSection title="Architecture Overview">
        <p className="text-lg mb-6">
          OrgX is structured in three layers. The event layer (Inngest) handles
          durable workflow execution -- spawning agents, running quality gates,
          managing autonomous sessions. The governance layer enforces trust tiers
          and risk-based approval flows. The intelligence layer maintains
          organizational memory, composite scoring, outcome attribution, and
          cost tracking.
        </p>

        <MermaidDiagram
          title="Agent Orchestration Pipeline"
          diagram={orchestrationDiagram}
          description="End-to-end flow: a task event triggers an Inngest workflow, which runs spawn guard checks, executes the agent workflow, and applies quality gates. The governance layer checks trust tiers and risk levels, routing to human review or auto-proceeding. The intelligence layer captures outcomes, scores quality, and feeds learnings back into org memory."
        />

        <ProjectCard variant="secondary" className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-primary">
            Why This Layering Matters
          </h3>
          <p>
            Each layer evolves independently. I can add new MCP servers without
            touching governance. I can tighten trust controls without changing
            how workflows execute. And the intelligence layer learns from every
            interaction regardless of what triggered it. This separation was not
            the original design -- it emerged after the first three months when I
            realized governance changes kept breaking workflow logic because they
            were too tightly coupled.
          </p>
        </ProjectCard>
      </ProjectSection>

      <ProjectSection title="What the System Does">
        <p className="text-lg mb-8">
          The core of OrgX is the MCP integration layer, the trust governance
          system, and the quality scoring engine. These three subsystems work
          together: MCP servers give agents access to tools, governance controls
          which tools agents can use and when they need approval, and scoring
          evaluates the quality of what agents produce.
        </p>

        <FeatureGrid features={mcpFeatures} columns={1} />
      </ProjectSection>

      <ProjectSection title="Technical Tradeoffs">
        <p className="text-lg mb-8">
          Every major infrastructure decision in OrgX involved a tradeoff. Here
          are the three that shaped the system most, and why I made the choices I
          did.
        </p>

        <FeatureGrid features={tradeoffDecisions} columns={1} />
      </ProjectSection>

      <ProjectSection title="Agent Capabilities">
        <p className="text-lg mb-6">
          Beyond the core orchestration infrastructure, OrgX provides a set of
          capabilities that make agents useful for sustained, autonomous work --
          not just one-shot tasks.
        </p>

        <FeatureGrid features={capabilityFeatures} columns={2} />

        <ProjectCard variant="highlight" className="mt-8">
          <p className="italic text-center text-lg text-body">
            OrgX is not a wrapper around an API. It is infrastructure for how AI
            agents operate inside an organization -- with the governance,
            durability, and observability that make autonomous agents viable
            beyond demo-scale.
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
              7 repositories working together: 22 MCP servers integrating
              GitHub, Slack, Notion, HubSpot, Figma, Stripe, and 16 other
              services; a Next.js 15 web dashboard; Inngest workflow functions;
              Promptfoo evaluation pipelines; shared TypeScript libraries; and a
              Supabase backend with Row Level Security. 874K lines of code
              across 8,704 files, with 692 commits in the main repo and 1,270+
              across the ecosystem.
            </p>
          </ProjectCard>

          <ProjectCard variant="highlight">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Live in Production
            </h3>
            <p>
              OrgX is live at useorgx.com and has been in active development
              since December 2024 -- 15 months of continuous iteration. The
              platform handles agent spawning, trust-gated tool execution,
              durable workflow orchestration via Inngest, quality scoring,
              autonomous sessions with budget guardrails, and organizational
              memory with semantic search. Not a demo. Not a prototype. A
              working system I use daily.
            </p>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectCTA
        demoUrl="https://useorgx.com"
        githubUrl="https://github.com/hopeatina"
        title="Inspect OrgX in production"
        description="The strongest evidence for OrgX is the live command center and the surrounding ecosystem code. Review both to understand how the orchestration model actually behaves."
        note="The public site is the visible surface. The larger proof is the repo ecosystem, the workflow layer, and the MCP integrations behind it."
      />
    </ProjectLayout>
  );
}
