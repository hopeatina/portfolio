export type ReviewState =
  | "Ready for review"
  | "Shipped in production"
  | "Live tool"
  | "Experimental";

export type HeroSignal = {
  label: string;
  value: string;
};

export type FocusCheckpoint = {
  label: string;
  value: string;
};

export type FocusSystem = {
  name: string;
  state: ReviewState;
  title: string;
  summary: string;
  proof: string;
  checkpoints: FocusCheckpoint[];
  actionLabel: string;
  href: string;
};

export type ReviewQueueItem = {
  name: string;
  state: ReviewState;
  title: string;
  summary: string;
  proof: string;
  actionLabel: string;
  href: string;
};

export type FlagshipSystem = {
  id: string;
  name: string;
  slug: string;
  state: ReviewState;
  image: string;
  summary: string;
  proof: string;
  whyItMatters: string;
  meta: string;
};

export const heroSignals: HeroSignal[] = [
  {
    label: "Experience",
    value: "7+ years shipping production systems",
  },
  {
    label: "Current focus",
    value: "Agent orchestration, tooling, and review surfaces",
  },
  {
    label: "Operator surfaces",
    value: "CLI, web, extension, production AI workflows",
  },
];

export const focusSystem: FocusSystem = {
  name: "OrgX",
  state: "Ready for review",
  title: "OrgX orchestration command center",
  summary:
    "A multi-agent platform that routes work, holds memory, and keeps human judgment at the right boundaries instead of pretending every decision can be automated.",
  proof:
    "1,270+ commits across a 12-repo ecosystem spanning workspace-first onboarding, live command center review, public proof surfaces, and agent tooling.",
  checkpoints: [
    {
      label: "Current review",
      value: "Spawn guards, approval flows, and trust-calibrated routing",
    },
    {
      label: "Human boundary",
      value: "Decision review before escalation, merge, or deployment",
    },
    {
      label: "Receipts",
      value: "MCP integrations, org memory, quality scoring, and autonomous sessions",
    },
  ],
  actionLabel: "Inspect OrgX",
  href: "/projects/orgx",
};

export const reviewQueue: ReviewQueueItem[] = [
  {
    name: "Alma",
    state: "Shipped in production",
    title: "Clinical AI systems under real constraints",
    summary:
      "HIPAA-compliant reassessment and documentation systems that improved therapist adoption while staying operationally trustworthy.",
    proof:
      "999 commits across 7 major feature areas over 2.7 years. HIPAA-compliant production with audit and document workflows.",
    actionLabel: "Review production system",
    href: "/projects/alma",
  },
  {
    name: "PerfPulse",
    state: "Live tool",
    title: "Local-first performance tooling",
    summary:
      "Rust tooling with CLI, web, and TUI surfaces built to inspect system health without hiding behind abstractions.",
    proof: "Homebrew distribution with three operator surfaces and AI-assisted recommendations",
    actionLabel: "Inspect tool surface",
    href: "/projects/perfpulse",
  },
  {
    name: "OpenClaw",
    state: "Experimental",
    title: "Browser control for agent workflows",
    summary:
      "Agent orchestration plugin with web dashboard, 30 MCP tools, task queue state machine, and real-time mission control via SSE.",
    proof: "558 commits shaping agent orchestration plugin and workflow UX",
    actionLabel: "Inspect workflow",
    href: "/projects/openclaw",
  },
];

export const flagshipSystems: FlagshipSystem[] = [
  {
    id: "orgx",
    name: "OrgX",
    slug: "orgx",
    state: "Ready for review",
    image: "/images/projects/orgx-illustration.png",
    summary:
      "Multi-agent orchestration with MCP integrations, trust governance, approval flows, and durable workflows.",
    proof: "1,270+ commits across the platform. 12 repos spanning memory, scoring, orchestration, plugins, SDKs, and tooling.",
    whyItMatters:
      "This is the clearest expression of how I think about agent systems: delegate aggressively, keep provenance visible, and reserve judgment for the moments that matter.",
    meta: "Multi-agent orchestration · command center · proof surfaces",
  },
  {
    id: "alma",
    name: "Alma",
    slug: "alma",
    state: "Shipped in production",
    image: "/images/projects/alma.svg",
    summary:
      "Production AI systems for compliant reassessment, documentation, and clinical review workflows.",
    proof: "999 commits, 7 feature areas, HIPAA production over 2.7 years.",
    whyItMatters:
      "It proves I can ship AI under real operational, legal, and product constraints rather than only in demos.",
    meta: "Production AI systems · HIPAA-compliant workflows",
  },
  {
    id: "perfpulse",
    name: "PerfPulse",
    slug: "perfpulse",
    state: "Live tool",
    image: "/images/projects/perfpulse.svg",
    summary:
      "Rust-based performance tooling with CLI, web dashboard, and TUI surfaces for operator-grade inspection.",
    proof: "Homebrew-installable with local-first system inspection and AI-guided recommendations.",
    whyItMatters:
      "It shows command of developer-tool UX, performance-minded implementation, and productized distribution.",
    meta: "Rust tooling · CLI + web + TUI",
  },
  {
    id: "openclaw",
    name: "OpenClaw",
    slug: "openclaw",
    state: "Experimental",
    image: "/images/projects/openclaw.svg",
    summary:
      "Agent orchestration plugin with web dashboard, 30 MCP tools, task queue state machine, and real-time mission control via SSE.",
    proof: "558 commits shaping agent orchestration plugin and workflow UX.",
    whyItMatters:
      "It expands the orchestration story into interaction design: what it feels like to supervise and guide active systems.",
    meta: "30 MCP tools · agent workflow UX",
  },
];
