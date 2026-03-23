export type ProjectStatus =
  | "Shipped in production"
  | "Live tool"
  | "Experimental"
  | "Ready for review";

export interface PortfolioProject {
  slug: string;
  title: string;
  status: ProjectStatus;
  shortLabel: string;
  summary: string;
  description: string;
  proof: string[];
  heroImage?: string;
  heroAlt?: string;
  href: string;
  primaryCta: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  tier: "flagship" | "supporting" | "archive";
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  outcome: string;
}

export const navItems = [
  { label: "Work", href: "/projects" },
  { label: "Writing", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const featuredProjects: PortfolioProject[] = [
  {
    slug: "orgx",
    title: "OrgX",
    status: "Ready for review",
    shortLabel: "Multi-agent orchestration",
    summary:
      "Operational control plane for multi-agent work: routing, governance, memory, and review surfaces.",
    description:
      "Multi-agent orchestration with trust governance, approval gates, durable workflows, and the interfaces operators need when autonomy stops being a toy.",
    proof: ["1,270+ commits", "22 MCP servers", "131+ tools"],
    heroImage: "/images/projects/orgx-home.png",
    heroAlt: "OrgX command center screenshot",
    href: "/projects/orgx",
    primaryCta: "Read case study",
    secondaryHref: "https://useorgx.com",
    secondaryLabel: "View live platform",
    tier: "flagship",
  },
  {
    slug: "alma",
    title: "Alma",
    status: "Shipped in production",
    shortLabel: "Production systems",
    summary:
      "HIPAA-constrained backend systems for reassessments, notes, audits, and document workflows.",
    description:
      "Production backend engineering under compliance pressure: long-lived ownership, careful rollout, and reliability work that had to hold up in real clinical operations.",
    proof: ["999 commits", "2.7 years", "HIPAA production"],
    href: "/projects/alma",
    primaryCta: "Read case study",
    tier: "supporting",
  },
  {
    slug: "perfpulse",
    title: "PerfPulse",
    status: "Live tool",
    shortLabel: "Developer tooling",
    summary:
      "Rust system monitor with CLI, web dashboard, TUI, and distribution through Homebrew.",
    description:
      "A utility-grade developer tool that treats installation, runtime footprint, and operator clarity as product work, not afterthoughts.",
    proof: ["Rust", "3 operator surfaces", "Homebrew"],
    href: "/projects/perfpulse",
    primaryCta: "Read case study",
    secondaryHref: "https://github.com/hopeatina/perf-pulse",
    secondaryLabel: "View source",
    tier: "supporting",
  },
  {
    slug: "openclaw",
    title: "OpenClaw",
    status: "Experimental",
    shortLabel: "Plugin architecture",
    summary:
      "Browser-native mission control for agent workflows with MCP bridging, SSE, and resumable state.",
    description:
      "Plugin-based orchestration surface with real-time dashboarding, offline-first task state, and a local bridge that makes agent tooling usable from software people already run.",
    proof: ["558 commits", "30 MCP tools", "SSE + SQLite"],
    href: "/projects/openclaw",
    primaryCta: "Read case study",
    secondaryHref: "https://github.com/hopeatina/orgx-openclaw-plugin",
    secondaryLabel: "View source",
    tier: "supporting",
  },
];

export const archivedProjects: PortfolioProject[] = [
  {
    slug: "brain-buffet",
    title: "BrainBuffet",
    status: "Experimental",
    shortLabel: "LLM product",
    summary: "AI course platform with structured generation and paid usage.",
    description: "Archived from the primary narrative pending a deeper case study.",
    proof: ["774 commits", "LLM pipelines", "Stripe"],
    href: "/projects/brain-buffet",
    primaryCta: "Open archive entry",
    tier: "archive",
  },
  {
    slug: "deep-human",
    title: "Deep Human",
    status: "Experimental",
    shortLabel: "Persona systems",
    summary: "Hackathon prototype exploring persona-as-a-service interactions.",
    description: "Kept for reference, not as a lead signal for the main portfolio narrative.",
    proof: ["FastMCP", "7 tools", "persona graph"],
    href: "/projects/deep-human",
    primaryCta: "Open archive entry",
    tier: "archive",
  },
  {
    slug: "neuromosaic",
    title: "Neuromosaic",
    status: "Experimental",
    shortLabel: "ML infrastructure",
    summary: "Distributed ML infrastructure work from an earlier systems chapter.",
    description: "Archived to keep the current site tightly aligned with agent infrastructure.",
    proof: ["Distributed ML", "Python", "research infra"],
    href: "/projects/neuromosaic",
    primaryCta: "Open archive entry",
    tier: "archive",
  },
  {
    slug: "framefx",
    title: "FrameFX",
    status: "Experimental",
    shortLabel: "Motion systems",
    summary: "Remotion monorepo for token-driven motion design.",
    description: "Archived while the main portfolio foregrounds infrastructure work.",
    proof: ["8 packages", "Remotion", "design tokens"],
    href: "/projects/framefx",
    primaryCta: "Open archive entry",
    tier: "archive",
  },
  {
    slug: "meridian",
    title: "Meridian",
    status: "Experimental",
    shortLabel: "Trading platform",
    summary: "Analytics and approvals for a premium trading signal product.",
    description: "Archived until its case study is developed to flagship depth.",
    proof: ["Convex", "TimescaleDB", "IBKR"],
    href: "/projects/meridian",
    primaryCta: "Open archive entry",
    tier: "archive",
  },
  {
    slug: "evalvybes",
    title: "EvalVybes",
    status: "Experimental",
    shortLabel: "Conversation evals",
    summary: "Conversational AI evaluation platform.",
    description: "Archived from the curated index.",
    proof: ["Voice AI", "evals"],
    href: "/projects/evalvybes",
    primaryCta: "Open archive entry",
    tier: "archive",
  },
  {
    slug: "theaicookup",
    title: "The AI Cook-Up",
    status: "Experimental",
    shortLabel: "Community platform",
    summary: "Community tooling for AI events and hackathons.",
    description: "Archived from the main narrative because it weakens the infrastructure story.",
    proof: ["Community", "events"],
    href: "/projects/theaicookup",
    primaryCta: "Open archive entry",
    tier: "archive",
  },
  {
    slug: "belief-map",
    title: "Belief Map",
    status: "Experimental",
    shortLabel: "Visualization",
    summary: "Interactive belief mapping interface.",
    description: "Archived from the curated index.",
    proof: ["Experimental", "visualization"],
    href: "/projects/belief-map",
    primaryCta: "Open archive entry",
    tier: "archive",
  },
  {
    slug: "upload-to-mail",
    title: "Upload to Mail",
    status: "Experimental",
    shortLabel: "Utility",
    summary: "Service for sending online documents as physical mail.",
    description: "Archived from the main narrative.",
    proof: ["Full stack", "utility"],
    href: "/projects/upload-to-mail",
    primaryCta: "Open archive entry",
    tier: "archive",
  },
  {
    slug: "tasktomodel",
    title: "TaskToModel",
    status: "Experimental",
    shortLabel: "AI platform",
    summary: "Convert plain-text descriptions into custom AI models.",
    description: "Archived from the curated index.",
    proof: ["AI platform", "generation"],
    href: "/projects/tasktomodel",
    primaryCta: "Open archive entry",
    tier: "archive",
  },
  {
    slug: "transmorph",
    title: "Transmorph",
    status: "Experimental",
    shortLabel: "Developer tools",
    summary: "Turn APIs into AI-callable tools.",
    description: "Archived until expanded into a stronger proof surface.",
    proof: ["Developer tools", "MCP"],
    href: "/projects/transmorph",
    primaryCta: "Open archive entry",
    tier: "archive",
  },
  {
    slug: "bodyfx",
    title: "BodyFX",
    status: "Experimental",
    shortLabel: "Computer vision",
    summary: "AI video segmentation for After Effects.",
    description: "Archived from the curated index.",
    proof: ["Computer vision", "video tooling"],
    href: "/projects/bodyfx",
    primaryCta: "Open archive entry",
    tier: "archive",
  },
];

export const experienceEntries: ExperienceEntry[] = [
  {
    company: "Alma",
    role: "Software Engineer, Quality Enablement",
    period: "2023–2026",
    outcome:
      "999 commits across 7 major feature areas. Led automated reassessment work that reached 89% therapist adoption while staying HIPAA-safe.",
  },
  {
    company: "Vessel Health",
    role: "Lead Backend Engineer",
    period: "2021–2023",
    outcome:
      "Led backend re-architecture for reliability, data-pipeline hardening, and healthier production operations.",
  },
  {
    company: "Capital One",
    role: "Software & Data Engineer",
    period: "2019–2021",
    outcome:
      "Built internal self-service infrastructure for real-time Spark and Scala streams used by multiple teams.",
  },
  {
    company: "MD Anderson",
    role: "Research Extern",
    period: "Earlier",
    outcome:
      "Built OR capacity monitoring dashboards in React and D3 for scientific and operational decision-making.",
  },
];

