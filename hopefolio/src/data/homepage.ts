export type ReviewState =
  | "Ready for review"
  | "Shipped in production"
  | "Live tool"
  | "Experimental";

export type HeroProofStat = {
  label: string;
  value: string;
};

export type AttentionItem = {
  name: string;
  title: string;
  state: ReviewState;
  proof: string;
  summary: string;
  actionLabel: string;
  href: string;
};

export const heroProofStats: HeroProofStat[] = [
  {
    label: "Flagship systems",
    value: "4 systems",
  },
  {
    label: "Production environments",
    value: "3 shipped",
  },
  {
    label: "Core platform",
    value: "1 orchestration engine",
  },
];

export const attentionItems: AttentionItem[] = [
  {
    name: "OrgX",
    title: "OrgX orchestration model",
    state: "Ready for review",
    proof: "19 repos, trust governance, durable workflows",
    summary:
      "Multi-agent orchestration platform with MCP, memory, scoring, and approval flows.",
    actionLabel: "Inspect architecture",
    href: "/projects/orgx",
  },
  {
    name: "Alma",
    title: "Alma clinical AI systems",
    state: "Shipped in production",
    proof: "Therapist adoption 40% → 89%",
    summary:
      "HIPAA-compliant reassessment and documentation systems running in production.",
    actionLabel: "Review system",
    href: "/projects/alma",
  },
  {
    name: "PerfPulse",
    title: "PerfPulse performance tooling",
    state: "Live tool",
    proof: "Rust CLI, web dashboard, Homebrew distribution",
    summary:
      "A local-first performance monitor with AI recommendations and three operator surfaces.",
    actionLabel: "Inspect tool",
    href: "/projects/perfpulse",
  },
  {
    name: "OpenClaw",
    title: "OpenClaw browser control UX",
    state: "Experimental",
    proof: "Browser-native agent control, CLI-first orchestration",
    summary:
      "A browser extension that turns agent task control into a usable orchestration surface.",
    actionLabel: "Inspect workflow",
    href: "/projects/openclaw",
  },
];
