import { selectedProjects } from "./selected-projects";

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
  href?: string;
  hrefExternal?: boolean;
  primaryCta?: string;
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
  { label: "Proof", href: "/proof" },
  { label: "Writing", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Work with me", href: "/hiring" },
  { label: "Contact", href: "/contact" },
];

export const featuredProjects: PortfolioProject[] = selectedProjects;

export const archivedProjects: PortfolioProject[] = [
  {
    slug: "deep-human",
    title: "Deep Human",
    status: "Experimental",
    shortLabel: "Persona systems",
    summary: "Hackathon prototype exploring persona-as-a-service interactions.",
    description: "Kept for reference, not as a lead signal for the main portfolio narrative.",
    proof: ["FastMCP", "7 tools", "persona graph"],
    href: "https://github.com/hopeatina/deep-human",
    hrefExternal: true,
    primaryCta: "View source",
    tier: "archive",
  },
  {
    slug: "framefx",
    title: "FrameFX",
    status: "Experimental",
    shortLabel: "Motion systems",
    summary: "Remotion monorepo for token-driven motion design.",
    description: "An exploration of reusable motion systems and a consistent visual language.",
    proof: ["8 packages", "Remotion", "design tokens"],
    href: "https://github.com/hopeatina/framefx",
    hrefExternal: true,
    primaryCta: "View source",
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
    tier: "archive",
  },
  {
    slug: "theaicookup",
    title: "The AI Cook-Up",
    status: "Experimental",
    shortLabel: "Community platform",
    summary: "Community tooling for AI events and hackathons.",
    description: "Community infrastructure for bringing people together through AI events and shared making.",
    proof: ["Community", "events"],
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
    tier: "archive",
  },
];

export const experienceEntries: ExperienceEntry[] = [
  {
    company: "Alma",
    role: "Software Engineer, Quality Enablement",
    period: "2023–Present",
    outcome:
      "999 commits across 7 major feature areas. Automated reassessment workflows reached 72% feature adoption. Datadog dashboards and alerting cut production errors by 20%.",
  },
  {
    company: "Vessel Health",
    role: "Lead Backend Engineer",
    period: "2020–2023",
    outcome:
      "Owned end-to-end tech specs for an API re-architecture that reduced bug output by 93%. Led auth, hardware calibration, and AWS-backed internal platform workflows.",
  },
  {
    company: "Capital One",
    role: "Software & Data Engineer",
    period: "2017–2019",
    outcome:
      "Automated ETL pipeline generation and data quality validation for Snowflake onboarding. Tuned Spark/Scala apps ingesting millions of near-real-time records in regulated finance.",
  },
  {
    company: "MD Anderson",
    role: "Research Extern",
    period: "Earlier",
    outcome:
      "Built OR capacity monitoring dashboards in React and D3 for scientific and operational decision-making.",
  },
];
