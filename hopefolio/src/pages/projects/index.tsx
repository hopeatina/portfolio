import React from "react";
import Head from "next/head";
import Link from "next/link";

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

const flagshipProjects = projects.filter((project) => project.tier === "flagship");
const selectedProjects = projects.filter((project) => project.tier === "selected");
const otherProjects = projects.filter((project) => project.tier === "other");

const [orgxProject, ...supportingFlagships] = flagshipProjects;

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8 max-w-3xl">
      <h2 className="text-3xl font-semibold tracking-[-0.04em] text-heading md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-body-secondary md:text-lg">
        {description}
      </p>
    </div>
  );
}

function FlagshipSupportCard({ project }: { project: Project }) {
  return (
    <Link
      href={project.link}
      className="group overflow-hidden rounded-[28px] border border-border bg-[var(--card-bg)] shadow-[0_24px_80px_-56px_rgba(15,23,42,0.24)] transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="border-b border-border bg-[linear-gradient(180deg,var(--surface),var(--card-bg))] px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-body-secondary">
              supporting flagship
            </div>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-heading">
              {project.title}
            </h3>
          </div>
          {project.metric && (
            <div className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-body-secondary">
              {project.metric}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-5 px-6 py-6">
        {project.image && (
          <div className="flex h-24 items-center justify-center rounded-2xl border border-border bg-background p-5">
            <img
              src={project.image}
              alt={project.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        )}

        <p className="text-sm leading-6 text-body">{project.description}</p>

        {project.proof && (
          <div className="border-t border-border pt-4 text-sm leading-6 text-body-secondary">
            {project.proof}
          </div>
        )}

        <div className="text-sm font-medium text-link transition-colors group-hover:text-link-hover">
          Review case study →
        </div>
      </div>
    </Link>
  );
}

function SelectedWorkRow({ project }: { project: Project }) {
  return (
    <Link
      href={project.link}
      className="grid gap-4 border-t border-border px-6 py-5 transition-colors hover:bg-[var(--surface)] first:border-t-0 md:grid-cols-[160px_minmax(0,1fr)_260px]"
    >
      <div className="text-sm leading-6 text-body-secondary">
        {project.metric || project.proof || "Selected work"}
      </div>
      <div>
        <h3 className="text-xl font-semibold tracking-[-0.03em] text-heading">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-body">{project.description}</p>
      </div>
      <div className="flex items-start justify-between gap-4 text-sm leading-6 text-body-secondary">
        <div>{project.proof || project.tags.join(" · ")}</div>
        <span className="font-medium text-link">→</span>
      </div>
    </Link>
  );
}

function OtherProjectRow({ project }: { project: Project }) {
  return (
    <Link
      href={project.link}
      className="flex items-center justify-between gap-4 border-t border-white/10 px-6 py-4 text-white/72 transition-colors hover:bg-white/[0.03] first:border-t-0"
    >
      <div>
        <div className="text-base font-medium text-white">{project.title}</div>
        <div className="mt-1 text-sm leading-6 text-white/56">
          {project.description}
        </div>
      </div>
      <div className="text-sm text-white/42">→</div>
    </Link>
  );
}

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects | Hope Atina - AI Agent Infrastructure</title>
        <meta
          name="description"
          content="Systems reviews and case studies spanning multi-agent orchestration, production AI, developer tooling, and product infrastructure."
        />
      </Head>

      <main className="min-h-screen bg-background text-body" style={{ paddingTop: "var(--spacing-24)" }}>
        <section className="pb-16 pt-10">
          <div className="mx-auto max-w-[1180px] px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.12fr)_320px]">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-body-secondary">
                  Project index
                </div>
                <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-heading md:text-7xl">
                  Systems I can defend under inspection
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-body-secondary md:text-xl">
                  This page is organized as a review surface, not a gallery. The
                  flagship systems carry the most weight, the supporting work is
                  intentionally quieter, and the proof is visible before you click.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[24px] border border-border bg-[var(--card-bg)] px-5 py-5">
                    <div className="text-xs uppercase tracking-[0.18em] text-body-secondary">
                      Flagships
                    </div>
                    <div className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-heading">
                      4
                    </div>
                    <div className="mt-2 text-sm leading-6 text-body-secondary">
                      OrgX, OpenClaw, PerfPulse, and Alma carry the core
                      narrative.
                    </div>
                  </div>
                  <div className="rounded-[24px] border border-border bg-[var(--card-bg)] px-5 py-5">
                    <div className="text-xs uppercase tracking-[0.18em] text-body-secondary">
                      Production
                    </div>
                    <div className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-heading">
                      3+
                    </div>
                    <div className="mt-2 text-sm leading-6 text-body-secondary">
                      Alma, Vessel Health, Capital One, and customer-facing AI
                      products.
                    </div>
                  </div>
                  <div className="rounded-[24px] border border-border bg-[var(--card-bg)] px-5 py-5">
                    <div className="text-xs uppercase tracking-[0.18em] text-body-secondary">
                      Tenure
                    </div>
                    <div className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-heading">
                      8+
                    </div>
                    <div className="mt-2 text-sm leading-6 text-body-secondary">
                      Years building products, infrastructure, and developer tools.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[32px] border border-white/10 bg-[#06121c] p-6 text-white shadow-[0_30px_100px_-65px_rgba(2,8,23,0.9)] md:p-8">
                <div className="text-xs uppercase tracking-[0.18em] text-white/42">
                  Reading guide
                </div>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">
                  What this index optimizes for
                </h2>
                <div className="mt-6 space-y-4">
                  {[
                    "The most consequential system should dominate the page.",
                    "Proof should appear before aesthetic ornament.",
                    "If an image does not increase trust, it should not be there.",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4"
                    >
                      <div className="mt-0.5 text-xs tracking-[0.16em] text-white/35">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="text-sm leading-6 text-white/72">{item}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="mx-auto max-w-[1180px] px-4 md:px-6">
            <SectionHeader
              title="Flagship system reviews"
              description="One system should carry most of the argument. The others support it, but they should not flatten its importance."
            />

            <Link
              href={orgxProject.link}
              className="grid gap-0 overflow-hidden rounded-[34px] border border-white/10 bg-[#06121c] text-white shadow-[0_38px_110px_-72px_rgba(2,8,23,0.9)] lg:grid-cols-[minmax(0,1.05fr)_480px]"
            >
              <div className="p-8 md:p-10 lg:p-12">
                <div className="text-xs uppercase tracking-[0.18em] text-white/42">
                  Primary flagship
                </div>
                <h3 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
                  {orgxProject.title}
                </h3>
                <p className="mt-6 max-w-2xl text-base leading-7 text-white/76 md:text-lg">
                  {orgxProject.longDescription}
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
                    <div className="text-xs uppercase tracking-[0.16em] text-white/42">
                      Proof
                    </div>
                    <div className="mt-2 text-lg font-semibold tracking-[-0.03em] text-white">
                      {orgxProject.metric}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
                    <div className="text-xs uppercase tracking-[0.16em] text-white/42">
                      Surface
                    </div>
                    <div className="mt-2 text-lg font-semibold tracking-[-0.03em] text-white">
                      Command center
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
                    <div className="text-xs uppercase tracking-[0.16em] text-white/42">
                      Scope
                    </div>
                    <div className="mt-2 text-lg font-semibold tracking-[-0.03em] text-white">
                      Agent OS layer
                    </div>
                  </div>
                </div>
                <div className="mt-8 border-t border-white/10 pt-5 text-sm leading-6 text-white/58">
                  {orgxProject.proof}
                </div>
                <div className="mt-8 text-sm font-medium text-white">
                  Review the OrgX case study →
                </div>
              </div>

              <div className="border-t border-white/10 bg-[#081826] p-6 md:p-8 lg:border-l lg:border-t-0">
                <div className="text-xs uppercase tracking-[0.18em] text-white/42">
                  Live artifact
                </div>
                <div className="mt-4 overflow-hidden rounded-[28px] border border-white/10 bg-[#09131c]">
                  <img
                    src={orgxProject.image}
                    alt="OrgX command center"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-4 text-sm leading-6 text-white/55">
                  The homepage and command center surfaces are used as product
                  proof, not decorative placeholders. This is where the
                  orchestration story starts to feel real.
                </p>
              </div>
            </Link>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              {supportingFlagships.map((project) => (
                <FlagshipSupportCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="mx-auto max-w-[1180px] px-4 md:px-6">
            <SectionHeader
              title="Selected work"
              description="These projects support the core narrative without trying to compete with it. The layout is deliberately quieter."
            />

            <div className="overflow-hidden rounded-[32px] border border-border bg-[var(--card-bg)] shadow-[0_24px_80px_-56px_rgba(15,23,42,0.24)]">
              {selectedProjects.map((project) => (
                <SelectedWorkRow key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="mx-auto max-w-[1180px] px-4 md:px-6">
            <SectionHeader
              title="Other experiments"
              description="Interesting side paths stay accessible, but they should not crowd the top-level argument."
            />

            <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[#06121c] shadow-[0_28px_90px_-64px_rgba(2,8,23,0.86)]">
              {otherProjects.map((project) => (
                <OtherProjectRow key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24 pt-8">
          <div className="mx-auto max-w-[1180px] px-4 md:px-6">
            <div className="grid gap-0 overflow-hidden rounded-[34px] border border-white/10 bg-[#06121c] text-white shadow-[0_34px_100px_-68px_rgba(2,8,23,0.9)] md:grid-cols-[minmax(0,1fr)_320px]">
              <div className="p-8 md:p-10">
                <div className="text-xs uppercase tracking-[0.18em] text-white/42">
                  Contact
                </div>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white md:text-4xl">
                  Building agent infrastructure? Start with the flagship reviews.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/72 md:text-lg">
                  The portfolio is strongest when read in sequence: OrgX first,
                  then the plugin/tooling layer, then the production systems
                  evidence. If the fit is clear, reach out.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition-colors hover:bg-white/90"
                  >
                    Contact me
                  </Link>
                  <Link
                    href="/projects/orgx"
                    className="inline-flex items-center rounded-full border border-white/12 px-5 py-3 text-sm font-medium text-white/78 transition-colors hover:bg-white/[0.04]"
                  >
                    Start with OrgX
                  </Link>
                </div>
              </div>

              <div className="border-t border-white/10 bg-white/[0.03] p-8 md:border-l md:border-t-0 md:p-10">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
                  <div className="text-xs uppercase tracking-[0.16em] text-white/42">
                    Best fit
                  </div>
                  <div className="mt-2 text-sm leading-6 text-white/78">
                    Multi-agent orchestration, MCP/tool-calling platforms,
                    observability, developer tooling, and production AI infra.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
