import type { PortfolioProject } from "./portfolio";

/** Shared selection for the home range, Work index, and material selector. */
export interface SelectedProject extends PortfolioProject {
  index: string;
  selectorLabel: string;
  stageLabel?: string;
  role: string;
  thesis: string;
  tension: string;
  evidence: string;
  tone: "signal" | "heat" | "paper" | "cold";
  heroImage: string;
  href: string;
}

export const selectedProjects: SelectedProject[] = [
  {
    slug: "orgx", index: "01", title: "OrgX", selectorLabel: "OrgX",
    status: "Live tool", tier: "flagship", shortLabel: "AI continuity + proof",
    role: "Founder · engineering · product",
    summary: "The continuity and proof layer for accountable AI-delivered work across clients.",
    description: "OrgX preserves organizational context, trust, decisions, and receipts across the interfaces where AI work actually happens.",
    thesis: "Make AI-delivered work accountable after the prompt disappears.",
    tension: "distributed autonomy", evidence: "receipts / trust / continuity", tone: "signal",
    proof: ["Continuity across clients", "Receipt-first artifacts", "Human consequence gates"],
    heroImage: "/images/case-studies/orgx-v4/artifact-receipt.png",
    heroAlt: "OrgX artifact receipt with provenance and a visible quality bar",
    href: "/projects/orgx", primaryCta: "Read case study",
    secondaryHref: "https://useorgx.com", secondaryLabel: "View live platform",
  },
  {
    slug: "alma", index: "02", title: "Alma", selectorLabel: "Alma",
    status: "Shipped in production", tier: "supporting", shortLabel: "Production systems",
    role: "Production backend engineering",
    summary: "HIPAA-constrained backend systems for reassessments, notes, audits, and document workflows.",
    description: "Production backend engineering under compliance pressure: careful rollout and reliability work in real clinical operations.",
    thesis: "Ship continuously where reliability, privacy, and auditability are inseparable.",
    tension: "regulated consequence", evidence: "HIPAA / rollout / adoption", tone: "heat",
    proof: ["HIPAA production", "72% reassessment adoption", "Reversible rollout"],
    heroImage: "/images/projects/alma-system-v4.svg", heroAlt: "Clinical workflow continuity and audit map",
    href: "/projects/alma", primaryCta: "Read case study",
  },
  {
    slug: "perfpulse", index: "03", title: "Perf Pulse", selectorLabel: "Perf Pulse",
    status: "Live tool", tier: "supporting", shortLabel: "Developer tooling",
    role: "Product engineering · Rust",
    summary: "Crash Guard for runaway memory and shrinking disk headroom on developer Macs.",
    description: "A local utility that joins continuous detection, native warnings, and deliberate intervention.",
    thesis: "Warn before runaway memory or low disk headroom takes the Mac down.",
    tension: "pre-crash intervention", evidence: "Guard / launchd / local / brew", tone: "paper",
    proof: ["Rust core", "CLI / TUI / web", "Distribution as product"],
    heroImage: "/images/case-studies/perf-pulse-crash-guard.jpg", heroAlt: "Perf Pulse Crash Guard dashboard",
    href: "/projects/perfpulse", primaryCta: "Read case study",
    secondaryHref: "https://github.com/hopeatina/homebrew-perf-pulse", secondaryLabel: "Homebrew tap",
  },
  {
    slug: "openclaw", index: "04", title: "OrgX for OpenClaw", selectorLabel: "OpenClaw",
    status: "Live tool", tier: "supporting", shortLabel: "Continuity plugin",
    role: "Plugin architecture · agent operations",
    summary: "Persistent organizational memory and coordinated execution for OpenClaw agents.",
    description: "The OrgX plugin carries shared context, resumable work, decisions, and receipts through one local bridge.",
    thesis: "Add organizational memory and accountable execution where agents already work.",
    tension: "hosted continuity", evidence: "state / streaming / proof", tone: "cold",
    proof: ["Host-native adoption", "Durable state", "Live control + receipts"],
    heroImage: "/images/case-studies/orgx-openclaw-v4/full-dashboard.png", heroAlt: "OrgX Live connected to OpenClaw agents and workstreams",
    href: "/projects/openclaw", primaryCta: "Read case study",
    secondaryHref: "https://github.com/useorgx/openclaw-plugin", secondaryLabel: "View source",
  },
  {
    slug: "brain-buffet", index: "05", title: "BrainBuffet", selectorLabel: "BrainBuffet",
    status: "Experimental", stageLabel: "Product prototype", tier: "supporting", shortLabel: "Personal learning",
    role: "Product design · full-stack engineering",
    summary: "Personal learning pathways shaped by a learner's goals, prior knowledge, and interests.",
    description: "An AI learning product that connects course planning, structured lessons, and saved study progress.",
    thesis: "Turn a learner's curiosity into a course they can preview, study, and return to.",
    tension: "personal context", evidence: "pathways / lessons / progress", tone: "cold",
    proof: ["Goal-aware pathways", "Structured lessons", "Saved progress"],
    heroImage: "/images/case-studies/brain-buffet/desktop-study.png", heroAlt: "Saved BrainBuffet product composition showing the course study experience",
    href: "/projects/brain-buffet", primaryCta: "Read case study",
    secondaryHref: "https://app.brainbuffet.co", secondaryLabel: "View BrainBuffet",
  },
  {
    slug: "neuromosaic", index: "06", title: "Neuromosaic", selectorLabel: "Neuromosaic",
    status: "Experimental", stageLabel: "Research prototype", tier: "supporting", shortLabel: "Research workbench",
    role: "ML systems · product engineering",
    summary: "A research workbench connecting papers, neural architectures, generated model code, and experiments.",
    description: "An inspectable path from research literature to structured architecture proposals and model experiments.",
    thesis: "Keep the experiment connected to the ideas and architecture that produced it.",
    tension: "research into structure", evidence: "papers / architecture / experiments", tone: "signal",
    proof: ["Research sources", "Architecture structure", "Model code"],
    heroImage: "/images/case-studies/neuromosaic/identity.png", heroAlt: "Original Neuromosaic project identity artwork",
    href: "/projects/neuromosaic", primaryCta: "Read case study",
    secondaryHref: "https://neuromosaic.vercel.app", secondaryLabel: "View project site",
  },
  {
    slug: "chaos-riders", index: "07", title: "Chaos Riders", selectorLabel: "Chaos Riders",
    status: "Experimental", stageLabel: "Playable prototype", tier: "supporting", shortLabel: "Game world",
    role: "Creative direction · game engineering",
    summary: "A Cameroon-rooted driving world, made tangible through a short browser prototype.",
    description: "Vehicle handling, a browser-playable driving loop, and Cameroonian worldbuilding developed as one creative project.",
    thesis: "Make a place, a vehicle, and a moment of control feel like one world.",
    tension: "culture into motion", evidence: "driving / physics / worldbuilding", tone: "heat",
    proof: ["Browser prototype", "Vehicle handling", "Cameroonian worldbuilding"],
    heroImage: "/images/case-studies/chaos-riders/world-market.webp", heroAlt: "Chaos Riders world concept showing a taxi in a Yaoundé market",
    href: "/projects/chaos-riders", primaryCta: "Read case study",
  },
  {
    slug: "meridian", index: "08", title: "Meridian", selectorLabel: "Meridian",
    status: "Experimental", stageLabel: "Research prototype", tier: "supporting", shortLabel: "Decision systems",
    role: "Product design · engineering",
    summary: "An explainable trading-research interface connecting market signals, inspectable conviction, and deliberate review.",
    description: "Research and paper-evaluation surfaces that make signal explanations and the boundary before execution visible.",
    thesis: "Give a market signal an explanation and a review path before it becomes a decision.",
    tension: "signal into judgment", evidence: "explanations / paper / review", tone: "paper",
    proof: ["Signal explanations", "Paper controls", "Review boundaries"],
    heroImage: "/images/case-studies/meridian/public-landing.png", heroAlt: "Meridian public landing page showing its research interface and example signal presentation",
    href: "/projects/meridian", primaryCta: "Read case study",
    secondaryHref: "https://meridian-two-beryl.vercel.app", secondaryLabel: "View project site",
  },
];
