import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

type Project = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  link: string;
  image?: string;
  tier: "flagship" | "selected" | "other";
  metric?: string;
  proof?: string;
  tags: string[];
};

const projects: Project[] = [
  {
    id: "orgx",
    title: "OrgX",
    description:
      "Multi-agent orchestration platform with MCP integrations, durable workflows, trust-based governance, and organizational memory.",
    longDescription:
      "The operating system layer for autonomous agents: MCP servers, trust gates, scoring, orchestration, and an interface designed around review and action.",
    link: "/projects/orgx",
    image: "/images/projects/orgx-home.png",
    tier: "flagship",
    metric: "1,270+ commits",
    proof: "22 MCP servers · 131+ tools · 47+ workflows · live at useorgx.com",
    tags: [
      "Multi-agent orchestration",
      "MCP protocol",
      "Trust governance",
    ],
  },
  {
    id: "openclaw",
    title: "OpenClaw Plugin",
    description:
      "Agent plugin with a web dashboard, local MCP bridge, offline-first outbox, and task-lane state machine.",
    longDescription:
      "Browser-native mission control for agent work with SSE streaming, 30 MCP tools, local persistence, and a queue designed to survive drops and resumes.",
    link: "/projects/openclaw",
    image: "/images/projects/openclaw.svg",
    tier: "flagship",
    metric: "558 commits",
    proof: "30 MCP tools · SSE streaming · SQLite outbox",
    tags: ["Plugin architecture", "Dashboard UX", "State machine"],
  },
  {
    id: "perfpulse",
    title: "PerfPulse",
    description:
      "Rust system monitor with CLI, web dashboard, TUI, meeting mode, and Claude-powered process explanations.",
    longDescription:
      "A utility-grade developer tool with real distribution: Homebrew install, multi-interface design, and a product surface built around real machine state.",
    link: "/projects/perfpulse",
    image: "/images/projects/perfpulse.svg",
    tier: "flagship",
    metric: "Homebrew",
    proof: "Rust core · 3 interface modes · 3.3 MiB binary",
    tags: ["Rust", "CLI product", "System tooling"],
  },
  {
    id: "alma",
    title: "Alma",
    description:
      "HIPAA-constrained backend systems for automated reassessments, compliant notes, audit integrations, and document workflows.",
    longDescription:
      "Production AI and backend engineering under clinical constraints: long-lived ownership, serializer churn, async orchestration, and compliance-first delivery.",
    link: "/projects/alma",
    image: "/images/projects/alma.svg",
    tier: "flagship",
    metric: "999 commits",
    proof: "2.7 years · 7 major feature areas · 96.4% Python",
    tags: ["Production AI", "Healthcare", "Django"],
  },
  {
    id: "brain-buffet",
    title: "BrainBuffet",
    description:
      "AI course platform with multi-step LLM pipelines, structured generation, and real customer usage.",
    longDescription:
      "LLM product engineering with generation pipelines, recommendations, and revenue surfaces.",
    link: "/projects/brain-buffet",
    tier: "selected",
    metric: "774 commits",
    proof: "LLM pipelines · structured generation · Stripe",
    tags: ["LLM pipelines", "Structured outputs", "Product"],
  },
  {
    id: "deep-human",
    title: "Deep Human",
    description:
      "MCP hackathon prototype exploring persona-as-a-service and digital twin interaction design.",
    longDescription:
      "Experimental but useful for understanding the edge of agent-persona UX.",
    link: "/projects/deep-human",
    tier: "selected",
    proof: "FastMCP · 7 tools · persona graph",
    tags: ["MCP", "Prototype", "Persona systems"],
  },
  {
    id: "neuromosaic",
    title: "Neuromosaic",
    description:
      "Distributed ML infrastructure for scalable neural network training and research iteration.",
    longDescription:
      "Early systems work on the infrastructure side of machine learning.",
    link: "/projects/neuromosaic",
    tier: "selected",
    proof: "Distributed ML · Python · research infra",
    tags: ["Distributed ML", "Infra", "Python"],
  },
  {
    id: "framefx",
    title: "FrameFX",
    description:
      "8-package Remotion monorepo for token-driven motion design and reusable animation systems.",
    longDescription:
      "A library design project that shows systems thinking in a different medium.",
    link: "/projects/framefx",
    tier: "selected",
    metric: "8 packages",
    proof: "Remotion · monorepo · design tokens",
    tags: ["Motion systems", "Monorepo", "Tooling"],
  },
  {
    id: "meridian",
    title: "Meridian",
    description:
      "Premium trading signal platform with real-time analytics, approvals, and market data ingestion.",
    longDescription:
      "A full-stack product surface with real-time constraints and approval workflows.",
    link: "/projects/meridian",
    tier: "selected",
    proof: "Convex · TimescaleDB · IBKR",
    tags: ["Real-time data", "Approvals", "Analytics"],
  },
  {
    id: "evalvybes",
    title: "EvalVybes",
    description: "Conversational AI evaluation platform.",
    longDescription: "Model comparison through natural conversation.",
    link: "/projects/evalvybes",
    tier: "other",
    tags: ["Voice AI", "Evals"],
  },
  {
    id: "theaicookup",
    title: "The AI Cook-Up",
    description: "Community platform for AI hackathon events.",
    longDescription: "Event-driven community tooling.",
    link: "/projects/theaicookup",
    tier: "other",
    tags: ["Community", "Events"],
  },
  {
    id: "belief-map",
    title: "Belief Map",
    description: "Interactive belief mapping.",
    longDescription: "Experimental visualization work.",
    link: "/projects/belief-map",
    tier: "other",
    tags: ["Experimental", "Visualization"],
  },
  {
    id: "upload-to-mail",
    title: "Upload to Mail",
    description: "Send online documents as physical mail.",
    longDescription: "Bridging digital documents and real-world delivery.",
    link: "/projects/upload-to-mail",
    tier: "other",
    tags: ["Full stack", "Utilities"],
  },
  {
    id: "tasktomodel",
    title: "TaskToModel",
    description: "Convert plain-text descriptions into custom AI models.",
    longDescription: "An abstraction layer for model generation.",
    link: "/projects/tasktomodel",
    tier: "other",
    tags: ["AI platform", "Generation"],
  },
  {
    id: "transmorph",
    title: "Transmorph",
    description: "Transform any API into an AI-driven tool.",
    longDescription: "Developer tooling for toolification.",
    link: "/projects/transmorph",
    tier: "other",
    tags: ["Developer tools", "MCP"],
  },
  {
    id: "bodyfx",
    title: "BodyFX",
    description: "AI video segmentation for After Effects.",
    longDescription: "SAM2-based rotoscoping tooling.",
    link: "/projects/bodyfx",
    tier: "other",
    tags: ["Computer vision", "Video tooling"],
  },
];

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <>
      <Head>
        <title>Projects | Hope Atina - AI Agent Infrastructure</title>
        <meta
          name="description"
          content="Systems reviews and case studies spanning multi-agent orchestration, production AI, developer tooling, and product infrastructure."
        />
      </Head>

      <main className="relative min-h-screen bg-background text-body pb-32 pt-40 md:pt-56">
        
        {/* Massive Floating High-Res Image (No bounding box, blended) */}
        <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden bg-background">
          {projects.map((project) => {
            if (!project.image) return null;
            const isActive = hoveredProject === project.id;
            
            return (
              <div
                key={project.id}
                className={`absolute inset-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center ${
                  isActive ? "opacity-30 scale-100" : "opacity-0 scale-110"
                }`}
              >
                <div 
                  className="relative w-[150vw] h-[150vh] md:w-[100vw] md:h-[120vh]"
                  style={{
                    WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 60%)",
                    maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 60%)",
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority={project.tier === "flagship"}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Global background gradient shift */}
        <div 
          className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-1000 ${hoveredProject ? "opacity-100" : "opacity-0"}`}
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 100%)"
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
          
          <header className="mb-24 md:mb-40 max-w-4xl">
            <p className="text-sm font-mono tracking-widest uppercase text-body-secondary mb-8">
              Index 001 — Systems & Products
            </p>
            <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-[var(--font-heading)] font-light tracking-tighter text-heading leading-[0.9]">
              Selected <br /> Works.
            </h1>
          </header>

          <div className="flex flex-col border-t border-border/30">
            {projects.map((project, index) => {
              const isHovered = hoveredProject === project.id;
              const isAnyHovered = hoveredProject !== null;
              
              return (
                <Link
                  key={project.id}
                  href={project.link}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className={`group relative flex flex-col xl:flex-row xl:items-center justify-between py-12 md:py-20 border-b border-border/30 transition-all duration-700 ${
                    isAnyHovered && !isHovered ? "opacity-20" : "opacity-100"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-baseline gap-6 md:gap-16 w-full xl:w-2/3">
                    <span className="text-sm font-mono tracking-widest uppercase text-body-secondary/60 shrink-0 mt-3 md:mt-0 xl:w-16">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {/* The project name in a massive Serif title */}
                    <h2 className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-[var(--font-heading)] tracking-tighter text-heading transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isHovered ? "translate-x-4 md:translate-x-12" : ""
                    }`}>
                      {project.title}
                    </h2>
                  </div>

                  <div className="mt-10 xl:mt-0 flex flex-col xl:text-right w-full xl:w-1/3 xl:pl-8">
                    <p className={`text-lg md:text-xl text-body-secondary transition-all duration-500 ease-out ${
                      isHovered ? "text-heading translate-x-0" : "xl:-translate-x-2"
                    }`}>
                      {project.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 xl:justify-end">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs font-mono tracking-widest uppercase text-body-secondary/60">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          
        </div>
      </main>
    </>
  );
}
