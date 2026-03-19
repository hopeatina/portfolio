import React, { useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import mermaid from "mermaid";

// Inline Mermaid component without generic card borders
const StarkMermaid = ({ diagram }: { diagram: string }) => {
  const diagramRef = useRef<HTMLDivElement>(null);
  const diagramId = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: "dark",
      themeVariables: {
        primaryColor: "transparent",
        primaryTextColor: "#fff",
        primaryBorderColor: "rgba(255,255,255,0.2)",
        lineColor: "rgba(255,255,255,0.5)",
        background: "transparent",
        mainBkg: "transparent",
        secondBkg: "rgba(255,255,255,0.05)",
        tertiaryColor: "rgba(255,255,255,0.1)",
        fontFamily: "Inter, system-ui, sans-serif",
      },
      fontFamily: "Inter, system-ui, sans-serif",
      fontSize: 16,
      flowchart: {
        curve: "basis",
        padding: 30,
        nodeSpacing: 80,
        rankSpacing: 80,
        htmlLabels: true,
      },
      securityLevel: "loose",
    });

    if (diagramRef.current) {
      diagramRef.current.innerHTML = `<div class="mermaid" id="${diagramId}">${diagram}</div>`;
      mermaid.contentLoaded();
    }
  }, [diagram, diagramId]);

  return (
    <div className="w-full overflow-x-auto py-12 flex justify-center">
      <div ref={diagramRef} className="min-w-[800px] w-full max-w-5xl" />
      <style jsx global>{`
        .mermaid .edgeLabel {
          background-color: #000 !important;
          color: #fff !important;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 4px;
          padding: 2px 8px;
        }
        .mermaid .node rect, .mermaid .node circle, .mermaid .node polygon {
          stroke: rgba(255,255,255,0.3) !important;
          fill: rgba(255,255,255,0.02) !important;
          stroke-width: 1px !important;
        }
        .mermaid .node text {
          fill: #fff !important;
        }
        .mermaid .cluster rect {
          stroke: rgba(255,255,255,0.1) !important;
          fill: rgba(255,255,255,0.03) !important;
        }
      `}</style>
    </div>
  );
};

export default function OrgX() {
  const techStack = [
    { category: "Frontend", technologies: "Next.js 15, React, TypeScript" },
    { category: "Database", technologies: "Supabase (PostgreSQL with RLS)" },
    { category: "Auth", technologies: "Clerk (session management, RBAC)" },
    { category: "Workflows", technologies: "Inngest (47+ durable workflow functions)" },
    { category: "AI/LLM", technologies: "Anthropic Claude SDK, OpenAI SDK, OpenRouter" },
    { category: "MCP", technologies: "22 servers, 131+ tools" },
    { category: "Observability", technologies: "PostHog, Sentry, OpenTelemetry" },
    { category: "Evaluation", technologies: "Promptfoo-based eval pipelines" },
  ];

  const mcpFeatures = [
    {
      title: "22 MCP Servers, 131+ Tools",
      description: "Each MCP server wraps a SaaS API into a standardized tool interface that any agent can discover and invoke. The servers handle authentication, rate limiting, and schema validation so agents interact with tools through a consistent protocol rather than raw API calls.",
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
      description: "A 3-tier trust system (strict, balanced, open) controls what agents can do autonomously. Each tier gates which tools are available and what risk level of action an agent can take without human approval. Risk tiers range from 0 (read-only, no approval needed) to 4 (destructive actions, always require approval).",
      items: [
        "Strict mode: agents can read and analyze but require approval for any mutation",
        "Balanced mode: agents can execute low-risk mutations autonomously, escalate medium-risk",
        "Open mode: agents operate with full autonomy within their capability set",
        "Spawn guards prevent uncontrolled agent proliferation with budget and count limits",
      ],
    },
    {
      title: "Quality Gates and Scoring",
      description: "A composite scoring engine evaluates agent outputs across multiple dimensions before work is accepted. Scores feed into workstream prioritization: higher-quality agents get routed to higher-stakes work. Domain-specific quality thresholds ensure that, for example, code changes meet a different bar than documentation edits.",
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
      description: "Temporal is the industry standard for durable workflows, but it requires running a separate cluster and introduces significant operational overhead. Inngest runs as a managed service with an event-driven model that maps naturally to how agent tasks flow: an event fires (task assigned, approval received, quality check passed), a function runs, and if it fails, it retries with backoff. The 47+ workflow functions in OrgX handle everything from agent spawning to morning brief generation to autonomous session management."
    },
    {
      title: "Why Supabase Over Custom Backend",
      description: "Organizational memory requires both structured data and real-time subscriptions. Supabase provides PostgreSQL with Row Level Security for multi-tenant data isolation, real-time channels for live updates, and edge functions for lightweight compute -- all without managing infrastructure. The tradeoff is less flexibility than a custom backend, but the development velocity has been worth it for a solo-built system."
    },
    {
      title: "Why MCP as Protocol Layer",
      description: "MCP provides a standardized interface between LLMs and external tools. Instead of writing bespoke integrations for each model-tool combination, each tool exposes an MCP server, and any MCP-compatible agent can discover and invoke it. The tradeoff: MCP is still a young protocol with evolving semantics, but standardizing on it early means OrgX benefits from the growing ecosystem of MCP-compatible tools without custom integration work."
    },
  ];

  const capabilityFeatures = [
    {
      title: "Agent Spawning & Routing",
      description: "Agents are spawned with configurable trust levels, tool access, and model assignments. Opus handles planning and complex reasoning tasks; Sonnet handles execution and routine operations. Spawn guards enforce budget limits and prevent runaway agent proliferation.",
    },
    {
      title: "Autonomous Session Management",
      description: "Long-running agent sessions operate independently with periodic check-ins and configurable budget guardrails. Sessions survive interruptions through Inngest's durable workflow execution, picking up where they left off after failures.",
    },
    {
      title: "Morning Brief System",
      description: "An Inngest-powered skill that generates automated daily summaries of agent activity, pending decisions, initiative progress, and organizational health metrics. Delivered as a structured report covering what happened, what needs attention, and what is blocked.",
    },
    {
      title: "Organizational Memory",
      description: "Semantic search over decisions, agent status, and initiative history. The memory layer captures what agents learned, what decisions were made and why, and what outcomes resulted -- making institutional knowledge queryable rather than lost between sessions.",
    },
    {
      title: "Economic Ledger",
      description: "Cost attribution and ROI tracking by agent and capability. Every LLM call, tool invocation, and workflow execution is logged with its cost, enabling analysis of which agents and workflows deliver value relative to their compute spend.",
    },
    {
      title: "Evaluation Pipelines",
      description: "Promptfoo-based evaluation pipelines that test agent behavior against defined scenarios. Used to validate model routing decisions, quality gate thresholds, and tool-calling accuracy before deploying changes to production.",
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
  `;

  const projectStats = [
    { value: "874K", label: "Lines of Code" },
    { value: "1,270+", label: "Commits" },
    { value: "131+", label: "MCP Tools" },
    { value: "15 mo", label: "Active Dev" },
  ];

  return (
    <>
      <Head>
        <title>OrgX | Case Study</title>
        <meta name="description" content="A multi-agent orchestration platform built solo over 15 months." />
      </Head>

      <div className="bg-black text-white min-h-screen selection:bg-white/30 selection:text-white font-sans antialiased overflow-x-hidden relative">
        
        {/* Navigation / Header */}
        <nav className="fixed top-0 w-full z-50 p-6 mix-blend-difference flex justify-between items-center text-white/70">
          <Link href="/projects" className="text-sm tracking-[0.2em] uppercase hover:text-white transition-colors duration-500 flex items-center gap-3">
            <span className="opacity-50">&larr;</span> Projects
          </Link>
          <span className="text-xs tracking-[0.3em] uppercase opacity-50">Case Study 01</span>
        </nav>

        {/* Cinematic Hero */}
        <section className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-20">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/images/projects/orgx-home.png" 
              fill 
              className="object-cover opacity-[0.15] scale-105 blur-[2px]" 
              alt="OrgX Background"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent" />
          </div>

          <div className="z-10 max-w-5xl mx-auto flex flex-col items-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-[5rem] md:text-[9rem] lg:text-[12rem] font-[var(--font-heading)] font-medium tracking-tighter leading-[0.8] mb-6 md:mb-10 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                OrgX.
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-3xl lg:text-4xl text-white/70 max-w-4xl font-light leading-snug tracking-tight"
            >
              A multi-agent orchestration platform. 22 MCP servers, 131+ tools, trust-based governance, and organizational memory.
            </motion.p>
          </div>
        </section>

        {/* Pull Quote */}
        <section className="py-40 md:py-64 px-6 md:px-12 max-w-6xl mx-auto text-center flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-[var(--font-heading)] font-medium leading-[1.1] tracking-tight text-white/90"
          >
            "I was running multiple sessions and kept hitting the same wall: agents duplicating work, losing context, and making decisions I could not trace back."
          </motion.h2>
          <div className="mt-16 text-white/40 text-sm uppercase tracking-[0.3em] flex flex-col items-center gap-4">
            <div className="w-[1px] h-12 bg-white/20"></div>
            The Coordination Problem
          </div>
        </section>

        {/* Edge-to-Edge High-Fidelity UI Capture */}
        <section className="w-full relative py-20 bg-[#050505]">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="text-xs text-white/40 uppercase tracking-[0.2em] mb-8 flex justify-between items-center border-b border-white/10 pb-4">
              <span>Artifact: Command Center</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Live Production Data
              </span>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-[0_0_100px_rgba(255,255,255,0.05)]"
            >
              <Image 
                src="/images/projects/orgx-home.png" 
                fill 
                className="object-cover object-top" 
                alt="OrgX Command Center High Fidelity" 
              />
            </motion.div>
          </div>
        </section>

        {/* Operating System Analogy - Editorial Layout */}
        <section className="py-32 md:py-48 px-6 max-w-7xl mx-auto border-b border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 items-start">
            <div className="md:col-span-5 md:sticky md:top-32">
              <h3 className="text-4xl md:text-6xl font-[var(--font-heading)] tracking-tighter leading-[1.1] text-white/90">
                The Operating System Analogy.
              </h3>
            </div>
            <div className="md:col-span-7 space-y-12 text-xl md:text-2xl text-white/60 font-light leading-relaxed">
              <p>
                An OS does not run your programs for you — it provides process management, permissions, memory, and inter-process communication. <strong className="text-white font-medium">OrgX does the same thing for AI agents.</strong>
              </p>
              <p>
                It manages spawning, enforces trust boundaries, maintains shared memory, and coordinates handoffs between agents working on related tasks.
              </p>
              <p>
                LangChain and CrewAI solve the 'chain LLM calls together' problem. I needed something different: a system where agents operate autonomously over hours, not seconds. That means governance (who approved this decision?), durability (what happens when a session crashes mid-task?), and organizational memory (what did we learn last week that is relevant now?).
              </p>
            </div>
          </div>
        </section>

        {/* Feature Deep Dive */}
        <section className="py-32 md:py-48 px-6 max-w-7xl mx-auto border-b border-white/5">
          <div className="mb-24 md:mb-40 max-w-4xl">
            <h3 className="text-5xl md:text-7xl font-[var(--font-heading)] tracking-tighter text-white/90 mb-8">What the system does.</h3>
            <p className="text-2xl text-white/50 font-light leading-relaxed">The core of OrgX is the MCP integration layer, the trust governance system, and the quality scoring engine.</p>
          </div>

          <div className="space-y-40">
            {mcpFeatures.map((feature, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
                <div className="md:col-span-5">
                  <div className="text-sm text-white/30 tracking-[0.2em] uppercase mb-6 font-mono">0{idx + 1} {"//"} Core System</div>
                  <h4 className="text-3xl md:text-5xl font-[var(--font-heading)] tracking-tight leading-[1.1]">{feature.title}</h4>
                </div>
                <div className="md:col-span-7">
                  <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed mb-12">{feature.description}</p>
                  {feature.items && (
                    <ul className="space-y-6">
                      {feature.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-6 text-white/80 text-lg md:text-xl font-light">
                          <span className="text-white/20 mt-1 font-serif text-2xl leading-none">&mdash;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Infrastructure & Tradeoffs - Grid Break Layout */}
        <section className="py-32 md:py-48 bg-[#030303]">
          <div className="px-6 max-w-7xl mx-auto">
            <h3 className="text-5xl md:text-7xl font-[var(--font-heading)] tracking-tighter text-white/90 mb-24 md:mb-32">Technical Tradeoffs.</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 md:gap-24">
              {tradeoffDecisions.map((decision, idx) => (
                <div key={idx} className="flex flex-col">
                  <h4 className="text-2xl md:text-3xl font-[var(--font-heading)] tracking-tight mb-8 text-white">{decision.title}</h4>
                  <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed">{decision.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Architecture Diagram */}
        <section className="py-32 md:py-48 px-6 max-w-7xl mx-auto border-y border-white/5">
          <div className="text-center mb-24">
            <h3 className="text-4xl md:text-6xl font-[var(--font-heading)] tracking-tight mb-8">Architecture Overview</h3>
            <p className="text-xl text-white/50 font-light max-w-3xl mx-auto">
              Three independent layers: Event (Inngest), Governance, and Intelligence. They evolve separately, preventing tight coupling between orchestration and permissions.
            </p>
          </div>
          <div className="glass bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-16 backdrop-blur-2xl">
            <StarkMermaid diagram={orchestrationDiagram} />
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="py-32 md:py-48 px-6 max-w-7xl mx-auto">
          <div className="mb-24 flex items-baseline gap-8">
            <h3 className="text-4xl md:text-6xl font-[var(--font-heading)] tracking-tighter">Agent Capabilities.</h3>
            <div className="flex-grow h-[1px] bg-white/10"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-24">
            {capabilityFeatures.map((feature, idx) => (
              <div key={idx} className="group cursor-default">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/30 font-mono text-sm mb-8 group-hover:border-white/40 group-hover:text-white transition-colors duration-500">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <h4 className="text-2xl md:text-3xl font-[var(--font-heading)] text-white mb-6 tracking-tight">{feature.title}</h4>
                <p className="text-white/50 text-lg font-light leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Infrastructure Stack List */}
        <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-16">
            <div className="md:col-span-1">
              <h3 className="text-sm tracking-[0.2em] uppercase text-white/40 mb-12">The Stack</h3>
            </div>
            <div className="md:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-16">
                {techStack.map(stack => (
                  <div key={stack.category} className="flex flex-col gap-2 border-b border-white/5 pb-8">
                    <span className="text-white/40 text-xs uppercase tracking-widest">{stack.category}</span>
                    <span className="text-xl text-white/90 font-light">{stack.technologies}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Proof of Work & Outro */}
        <section className="py-40 md:py-64 px-6 text-center max-w-5xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            <h2 className="text-5xl md:text-8xl font-[var(--font-heading)] font-medium tracking-tighter mb-12 leading-[1.1]">
              15 Months. 7 Repos.<br/><span className="text-white/30">1 Production System.</span>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 max-w-4xl mx-auto">
              {projectStats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                   <span className="text-4xl md:text-5xl font-[var(--font-heading)] tracking-tighter text-white">{stat.value}</span>
                   <span className="text-white/40 text-xs uppercase tracking-[0.2em]">{stat.label}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href="https://useorgx.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-10 py-5 bg-white text-black rounded-full font-medium tracking-wide hover:scale-105 transition-transform duration-500 w-full sm:w-auto"
              >
                View Live Platform
              </a>
              <a 
                href="https://github.com/hopeatina" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-10 py-5 bg-transparent border border-white/20 text-white rounded-full font-medium tracking-wide hover:bg-white/5 transition-colors duration-500 w-full sm:w-auto"
              >
                Review Ecosystem
              </a>
            </div>
            <p className="mt-12 text-white/30 text-sm font-light">
              Not a demo. Not a prototype. A working system I use daily.
            </p>
          </motion.div>
        </section>
        
      </div>
    </>
  );
}
