/**
 * The proof ledger.
 *
 * Every entry is a falsifiable receipt: a question, a baseline, a method,
 * a measured result, a documented failure, and inspectable artifacts.
 * Each receipt scores itself against six proof criteria — and the score is
 * honest, which means most receipts do NOT earn all six. That is the point.
 */

export type ProofScoreKey =
  | "artifact"
  | "baseline"
  | "measured"
  | "reproducible"
  | "failure"
  | "external";

export const PROOF_SCORE_LABELS: Record<ProofScoreKey, { short: string; label: string; description: string }> = {
  artifact: {
    short: "A",
    label: "Runnable artifact",
    description: "Code, demo, or product you can open and inspect",
  },
  baseline: {
    short: "B",
    label: "Meaningful baseline",
    description: "What happens without the system — measured, not implied",
  },
  measured: {
    short: "M",
    label: "Measured result",
    description: "A number that could have come out worse",
  },
  reproducible: {
    short: "R",
    label: "Reproducible method",
    description: "Steps or harness another engineer can rerun",
  },
  failure: {
    short: "F",
    label: "Documented failure",
    description: "Where it still broke, on the record",
  },
  external: {
    short: "E",
    label: "External validation",
    description: "Someone who is not me depends on it or verified it",
  },
};

export const PROOF_SCORE_ORDER: ProofScoreKey[] = [
  "artifact",
  "baseline",
  "measured",
  "reproducible",
  "failure",
  "external",
];

export interface ProofArtifact {
  label: string;
  href: string;
  kind: "repo" | "pr" | "demo" | "video" | "talk" | "doc" | "package" | "release" | "site";
}

export interface ProofReceipt {
  slug: string;
  index: string;
  title: string;
  /** The falsifiable question this receipt answers. */
  question: string;
  date: string;
  domain: string;
  /** What the world looked like without the system. */
  baseline: string;
  /** What was built or run, concretely. */
  method: string;
  /** The measured outcome. Numbers over adjectives. */
  result: string;
  /** Where it still broke. Every honest receipt has one. */
  failure: string;
  artifacts: ProofArtifact[];
  score: ProofScoreKey[];
  /** Optional one-line justification for hard-earned or withheld criteria. */
  scoreNote?: string;
  next?: string;
}

export const proofReceipts: ProofReceipt[] = [
  {
    slug: "continuity-signal",
    index: "001",
    title: "One persistent signal: the thread survives the route handoff",
    question:
      "Can a site's core claim — intelligence survives the handoff — be made structurally true: one visual element that literally never unmounts across navigation?",
    date: "2026-07-15",
    domain: "Continuity infrastructure",
    baseline:
      "The previous implementation rendered 32 sealed SVG decals, each drawing once on scroll-into-view and freezing. A repo-wide grep for scroll-linked motion values (useScroll, scrollYProgress) returned zero hits, and the motif unmounted and redrew from nothing on every route change — the literal opposite of the thesis.",
    method:
      "Replaced the decals with a single dependency-free 3D canvas mounted once in _app.tsx, above the router: a perspective camera (position, look-at, focal length) with keyframed shots — dolly-zoom at the handoff, orbit at the memory knot, crane at resolve — driving one yarn through six topologies as a pure function of scroll position. Persistence was verified by tagging the canvas DOM node with a data attribute, navigating Home to /projects/orgx, and confirming the identical node was still mounted and drawing.",
    result:
      "Same canvas DOM node alive across the route change (verified by attribute survival, 12.46% lit pixels post-navigation). Render cost measured at 3.1–8ms per frame at 2880×1800 — 60fps with headroom. Chartreuse accent held to 0.2–0.9% of pixels against a brand budget of 8%.",
    failure:
      "Three defects on the record. (1) The first material pass used ctx.filter blur on long strokes, costing multiple seconds per frame — replaced with stacked low-alpha strokes at ~100x lower cost. (2) Variable-width chunked strokes rendered as capsule seams at high zoom — replaced with a single variable-width ribbon fill. (3) After the merge, the signal was invisible: .site-shell carried an opaque background that painted over the canvas site-wide. Found by walking the live site, fixed in a follow-up commit.",
    artifacts: [
      {
        label: "PR #24 — merged to main",
        href: "https://github.com/hopeatina/portfolio/pull/24",
        kind: "pr",
      },
      {
        label: "ContinuitySignal.tsx — the component",
        href: "https://github.com/hopeatina/portfolio/blob/main/hopefolio/src/components/v5/ContinuitySignal.tsx",
        kind: "repo",
      },
      {
        label: "This site — scroll any page, then navigate",
        href: "/",
        kind: "demo",
      },
    ],
    score: ["artifact", "baseline", "measured", "reproducible", "failure"],
    scoreNote:
      "External validation withheld: no one outside this site depends on the component yet.",
    next: "Page-transition FLIP handoff: the lit node slides through the door into the case-study spine instead of easing in place.",
  },
  {
    slug: "orgx-mcp-server",
    index: "002",
    title: "57 governed tools, 654 tests, one live MCP server",
    question:
      "Can one MCP server carry organizational memory, bounded authority, and receipts to every major AI client — and stay up in production?",
    date: "2026-07-09",
    domain: "Agent infrastructure",
    baseline:
      "Without a continuity layer, each AI client starts cold: the goal, prior decisions, quality bar, and permissions live in the human's head and get re-typed into every session. The human is the API between their own tools.",
    method:
      "A Cloudflare Worker MCP server (orgx-mcp) exposing 57 tools across memory, planning, delegation, decisions, receipts, and lifecycle — with OAuth, session isolation, and durable state. Distribution manifests shipped for Smithery, Glama, and the ChatGPT apps directory. Test suite: 654 automated cases across ~90 spec files.",
    result:
      "Live at mcp.useorgx.com with a public .well-known/mcp.json manifest. 57 published tools, 654 passing tests, and a public status page showing 98.271% uptime since April 2026 — the incidents are on the record, not hidden. Repos under github.com/useorgx have external stargazers.",
    failure:
      "98.271% is not 99.9%: real outages sit on the public status page. And GitHub star counts are near zero — distribution manifests shipped, but registry-driven adoption is still an open bet, not a result.",
    artifacts: [
      { label: "orgx-mcp — public source", href: "https://github.com/useorgx/orgx-mcp", kind: "repo" },
      { label: "Live MCP manifest", href: "https://mcp.useorgx.com/.well-known/mcp.json", kind: "demo" },
      { label: "Public status page — uptime, incidents included", href: "https://status.useorgx.com", kind: "site" },
      { label: "OrgX — the product it serves", href: "https://useorgx.com", kind: "site" },
    ],
    score: ["artifact", "measured", "failure", "external"],
    scoreNote:
      "Baseline and reproducible withheld: the cold-start baseline is argued, not measured, and the server is a product, not a rerunnable harness. The benchmark receipt covers that ground.",
    next: "Publish per-tool success-rate and latency numbers from production traffic.",
  },
  {
    slug: "autonomous-initiative-benchmark",
    index: "003",
    title: "12 tasks, 7 domains, 3 execution modes — with a human baseline",
    question:
      "Does orchestrated multi-agent execution actually beat a single agent — and a human — on real initiative-level work, measured the same way every week?",
    date: "2026-06-12",
    domain: "Evals & benchmarks",
    baseline:
      "Two baselines, run through the identical harness: a single agent with the same tools, and a human doing the same task. Most agent demos compare against nothing.",
    method:
      "A public benchmark repo (useorgx/autonomous-initiative-benchmark): a 15-task catalog across three tiers, 12 tasks live across 7 domains, each run in 3 execution modes. Bundle validator and scorecard recompute keep results honest; methodology is published, with the literature it builds on cited.",
    result:
      "59 result bundles committed with numeric per-task scores. A verified gpt-5-nano run completed 12/12 tasks through the bundle validator. Instrumented-worlds eval: pass^k = 1.0 on 4 of 5 worlds, including an 8/8 on the six-trap arithmetic world.",
    failure:
      "Catalog coverage was 12/15 at the June gap analysis — three tier-3 tasks were specified but not yet runnable. And 1 of 5 instrumented worlds did not hold pass^k = 1.0. Both gaps are documented in the repo, not smoothed over.",
    artifacts: [
      { label: "Benchmark repo — catalog, harness, 59 result bundles", href: "https://github.com/useorgx/autonomous-initiative-benchmark", kind: "repo" },
      { label: "Published methodology", href: "https://useorgx.com/blog/orgx-autonomous-initiative-benchmark-methodology", kind: "doc" },
      { label: "Memory-lift benchmark write-up (Phase 2 substrate matrix)", href: "https://useorgx.com/blog/phase-2-substrate-matrix-memory-lift", kind: "doc" },
    ],
    score: ["artifact", "baseline", "measured", "reproducible", "failure"],
    scoreNote:
      "External validation withheld until judges or reproductions come from outside the project.",
    next: "Independent judges scoring runs they did not build — then the E column gets earned.",
  },
  {
    slug: "perf-pulse-homebrew",
    index: "004",
    title: "A solo Rust tool that installs like a real product",
    question:
      "Can one person ship a native developer tool with the full distribution surface — versioned releases, checksums, a Homebrew tap, a landing page — not just a repo?",
    date: "2026-07-15",
    domain: "Developer tooling",
    baseline:
      "The default fate of side-project CLIs: a GitHub repo you must clone and compile yourself, with no releases, no checksums, and no upgrade path.",
    method:
      "PerfPulse: a Rust system-monitor for developers (23 modules, LTO release profile, CLI + TUI + web dashboard surfaces). Distribution: versioned tarballs for darwin-arm64 and x86_64 with pinned SHA-256 hashes, a public Homebrew tap with an install test, and a landing page with install instructions.",
    result:
      "brew install works against real binaries: the v1.5.4 darwin-arm64 tarball serves HTTP 200 at 2,071,219 bytes. The tap formula pins both architectures with SHA-256 hashes and runs a --version smoke test on install.",
    failure:
      "The tap lagged the source for a stretch — formula at 1.3.1 while the changelog reached 1.6.0 — meaning users could install stale builds. The changelog also documents a flaky iostat-dependent test that had to be deterministically hardened. Release automation is the open gap.",
    artifacts: [
      { label: "Homebrew tap — formula with pinned hashes", href: "https://github.com/hopeatina/homebrew-perf-pulse", kind: "repo" },
      { label: "perf-pulse.com — live landing + install", href: "https://perf-pulse.com", kind: "site" },
      { label: "v1.5.4 darwin-arm64 release tarball", href: "https://perf-pulse.com/releases/v1.5.4/perf-pulse-1.5.4-darwin-arm64.tar.gz", kind: "release" },
    ],
    score: ["artifact", "measured", "reproducible", "failure"],
    scoreNote:
      "Baseline withheld (no measured comparison against existing monitors); external withheld until install counts or user reports exist.",
    next: "Wire release automation so the tap can never lag source again, then publish install telemetry.",
  },
  {
    slug: "figma-config-2021",
    index: "005",
    title: "Config 2021: Figma platformed the community I built",
    question:
      "Did the community-through-making thesis — less talk, more people in the file — hold up in front of the industry it came from?",
    date: "2021-05-21",
    domain: "Community & external validation",
    baseline:
      "Design community in 2020 defaulted to conversation: panels, Twitter threads, empty Clubhouse rooms. The bet was that shared making — multiplayer files, play, iteration — would bind people where talk could not.",
    method:
      "Founded #FigmaAndChill, a global BIPOC design community organized around making together in multiplayer files rather than talking about design. Grew it to a Config 2021 talk: 'a catalyst to connection, community, & culture.'",
    result:
      "The talk is published on Figma's official YouTube channel — the platform itself validated and distributed the work. The Config speaker archive independently corroborates the bio: engineer at Vessel Health, Rice University bioengineering, creator of #FigmaAndChill.",
    failure:
      "The canonical config.figma.com talk page has since 404'd — the durable receipts are the YouTube video and the archived speaker page. And the community's Clubhouse-era home declined with the platform; the thesis outlived the venue, the venue did not.",
    artifacts: [
      { label: "The talk — Figma's official channel, from 2:51", href: "https://www.youtube.com/watch?v=JSpfsuK75j0&t=171s", kind: "talk" },
      { label: "Config 2021 speaker page (archive)", href: "https://figma-config.netlify.app/speakers/hope-atina/", kind: "doc" },
    ],
    score: ["artifact", "baseline", "failure", "external"],
    scoreNote:
      "Measured and reproducible withheld: community size claims are not independently verifiable today, and a community is not a rerunnable experiment.",
  },
  {
    slug: "framefx-npm",
    index: "006",
    title: "Eight motion packages, live on public npm",
    question:
      "Is the 'token-driven Remotion monorepo' a real, installable system — or a private folder with a nice README?",
    date: "2026-01-28",
    domain: "Motion systems",
    baseline:
      "Motion work usually ships as one-off project code: nothing versioned, nothing another team can npm-install.",
    method:
      "FrameFX: a Remotion monorepo split into eight scoped packages — @framefx/core, vectors, text, transitions, fx, studio, layout, recipes — published to the public npm registry under this account.",
    result:
      "All eight packages verified live on the registry at v0.1.0, published 2026-01-28, maintainer hopeatina. npm install @framefx/core works for anyone.",
    failure:
      "Every package's repository field points to github.com/framefx/framefx — which does not exist (the username belongs to an unrelated empty account). A dead provenance link on all eight packages, found during this audit and queued for the next publish. v0.1.0 also means: published, not yet adopted.",
    artifacts: [
      { label: "@framefx/core on npm", href: "https://www.npmjs.com/package/@framefx/core", kind: "package" },
      { label: "FrameFX source", href: "https://github.com/hopeatina/framefx", kind: "repo" },
    ],
    score: ["artifact", "measured", "failure"],
    scoreNote:
      "Three of six — the weakest receipt on the ledger, kept here because an honest ledger includes its own thin entries.",
    next: "Fix the repository field, publish 0.2.0, and earn R with a runnable example gallery.",
  },
];

export function getProofReceipt(slug: string) {
  return proofReceipts.find((receipt) => receipt.slug === slug);
}

export function getAllProofSlugs() {
  return proofReceipts.map((receipt) => receipt.slug);
}
