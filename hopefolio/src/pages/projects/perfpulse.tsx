import CaseStudyNarrative from "@/components/v4/CaseStudyNarrative";

export default function PerfPulsePage() {
  return (
    <CaseStudyNarrative
      pageTitle="PerfPulse case study — Hope Atina"
      description="A Rust system monitor designed as a small, local-first product across CLI, TUI, web, and Homebrew distribution."
      index="Case 03 / developer tooling"
      status="Open source · live utility"
      title="PerfPulse"
      subtitle="A system inspector that respects the machine it is inspecting."
      introduction="PerfPulse began with a slow video call and became a product lesson: diagnosis, action, runtime footprint, and installation are one experience. A utility only becomes real when it is easy to trust and easy to run."
      facts={[
        { label: "Core", value: "Rust" },
        { label: "Surfaces", value: "CLI / TUI / web" },
        { label: "Footprint", value: "3.3 MiB" },
        { label: "Install", value: "brew install perf-pulse", note: "public tap · pinned SHA-256 · real binaries" },
      ]}
      heroProof={{
        src: "/images/case-studies/perfpulse-dashboard.png",
        alt: "PerfPulse local dashboard showing system health, processes, and meeting mode",
        label: "One core, three operator surfaces",
        caption: "The local dashboard gives charts room to breathe while the CLI remains the fastest path to diagnosis and action.",
      }}
      problem={{
        eyebrow: "Inspection stopped at information",
        title: "Activity Monitor could show the problem, but it could not help me recover the moment.",
        body: (
          <>
            <p>
              A slow call is not the time to interpret opaque process names, compare multiple charts,
              or wonder which background service is safe to pause. The system tools exposed state but
              left the operator to convert it into action under pressure.
            </p>
            <p>
              Any replacement also had to avoid becoming the next heavyweight process on the list.
            </p>
          </>
        ),
        notes: [
          "The primary interaction had to stay in the terminal.",
          "Optional AI context could clarify—but not become the product.",
          "Installation and runtime overhead were part of the feature contract.",
        ],
      }}
      insight={{
        eyebrow: "The user needed a next move, not another dashboard",
        title: "Explain the state at the level where action is possible.",
        body: (
          <>
            <p>
              PerfPulse pairs process and system metrics with direct operating modes. Meeting mode can
              pause heavyweight background work before a call, then restore it later. Claude-assisted
              explanations are layered only where process names or tradeoffs are opaque.
            </p>
          </>
        ),
      }}
      decision={{
        eyebrow: "Distribution completed the architecture",
        title: "Keep one small Rust core and let each interface earn its existence.",
        body: (
          <>
            <p>
              The CLI is the default. The TUI supports sustained terminal inspection. The local Axum
              dashboard exists for history and charts. All three ship in one binary through Homebrew,
              which keeps the path from curiosity to use intentionally short.
            </p>
          </>
        ),
      }}
      flow={[
        { glyph: "context", label: "Collect locally", detail: "System and process state stay on the machine." },
        { glyph: "branch", label: "Choose a surface", detail: "CLI, TUI, or web appears only when the task needs it.", tone: "cold" },
        { glyph: "judgment", label: "Recommend action", detail: "The operator sees the tradeoff before a process is paused.", tone: "heat" },
        { glyph: "receipt", label: "Restore state", detail: "Meeting mode returns the machine to its prior operating state." },
      ]}
      system={{
        eyebrow: "One core, earned surfaces",
        title: "Collection, explanation, action, and recovery share a small local-first architecture.",
        introduction: "Each interface exists for a different temporal need: the CLI for the next move, the TUI for sustained inspection, and the web surface for history and comparison. None owns a separate truth.",
        layers: [
          { label: "collector", title: "Read the machine locally", detail: "A small Rust core gathers system and process state without sending the operating picture away.", technology: "Rust · system APIs", tone: "cold" },
          { label: "decision", title: "Translate state into an operator choice", detail: "Process context and optional explanations clarify what is safe to pause and what the tradeoff will be.", technology: "local rules · optional Claude context", tone: "heat" },
          { label: "surfaces", title: "Match the interface to the time horizon", detail: "CLI, TUI, and Axum web views share one core instead of becoming three products.", technology: "CLI · TUI · Axum", tone: "signal" },
          { label: "distribution", title: "Make use the default outcome", detail: "A single binary and Homebrew formula collapse the distance between discovering the tool and running it.", technology: "single binary · Homebrew" },
        ],
        rationale: [
          { pressure: "The diagnostic tool cannot become the workload", choice: "Use a compact Rust core", reason: "Runtime footprint remains part of the product promise." },
          { pressure: "Urgent diagnosis and historical inspection are different jobs", choice: "Default to CLI; add TUI and web only where they earn the cost", reason: "Each surface preserves the fastest useful path instead of competing for primacy." },
          { pressure: "Pausing work creates recovery debt", choice: "Record and restore prior state in Meeting Mode", reason: "Action stays reversible, which makes the recommendation trustworthy." },
        ],
        decisions: [
          {
            id: "local-core",
            label: "respect the machine",
            before: "A performance tool can become another heavyweight process or send the operating picture somewhere else.",
            decision: "Collect locally in a compact Rust core and keep the runtime footprint inside the product promise.",
            consequence: "The inspector stays small enough to trust on the machine it is diagnosing.",
            evidence: "Rust · local system APIs · stripped binary",
            tone: "cold",
          },
          {
            id: "earned-surfaces",
            label: "match the moment",
            before: "A slow call does not leave time to interpret a dashboard designed for leisurely analysis.",
            decision: "Use the CLI for the next move, the TUI for sustained inspection, and the web surface only for history and comparison.",
            consequence: "One underlying signal changes representation without becoming three competing products.",
            evidence: "Clap CLI · Crossterm TUI · Axum dashboard",
            tone: "signal",
          },
          {
            id: "meeting-recovery",
            label: "make action reversible",
            before: "Pausing Docker, Spotlight, or another heavy process can fix the call and create a recovery problem later.",
            decision: "Record the prior state when Meeting Mode pauses work, then restore it automatically or on demand.",
            consequence: "The recommendation becomes trustworthy because the tool owns the return path, not only the interruption.",
            evidence: "Meeting Mode · timed + manual restore",
            tone: "heat",
          },
          {
            id: "distribution",
            label: "finish the product",
            before: "A useful developer tool remains hypothetical when installation requires build knowledge or repository archaeology.",
            decision: "Ship both Mac architectures as one binary and make Homebrew the default path from curiosity to use.",
            consequence: "Distribution becomes the first coherent product interaction instead of an afterthought.",
            evidence: "homebrew-perf-pulse · public tap, pinned SHA-256",
            evidenceHref: "https://github.com/hopeatina/homebrew-perf-pulse",
            tone: "cold",
          },
        ],
        surfaces: [
          { name: "CLI", mode: "immediate", detail: "Fast diagnosis and direct action at the point where developers already work." },
          { name: "TUI", mode: "sustained", detail: "A persistent terminal view for live system inspection without leaving the shell." },
          { name: "Local dashboard", mode: "visual", detail: "History, process comparison, and meeting readiness receive the space charts actually need." },
          { name: "Homebrew", mode: "distribution", detail: "Installation becomes the first coherent product interaction, not a README obstacle." },
        ],
        technologies: [
          { label: "Core", values: ["Rust", "local system APIs", "single binary"] },
          { label: "Surfaces", values: ["CLI", "TUI", "Axum web server"] },
          { label: "Delivery", values: ["Homebrew", "local-first runtime", "optional Claude context"] },
        ],
        toolEvidence: [
          { name: "Rust", icon: "rust", category: "Core", project: "PerfPulse", reason: "A memory-safe, compact system core keeps collection fast and the inspector's own footprint visible." },
          { name: "Clap", mark: "CL", category: "Surface", project: "CLI", reason: "A direct command grammar keeps diagnosis and action close to the terminal where a developer already works." },
          { name: "Crossterm", mark: "CT", category: "Surface", project: "TUI", reason: "A persistent live view earns more space without forcing the operator into a browser." },
          { name: "Axum", mark: "AX", category: "Surface", project: "Local dashboard", reason: "A small local server gives history and charts the space they need while keeping system data on the machine." },
          { name: "sysinfo", mark: "SI", category: "Collection", project: "PerfPulse", reason: "Cross-process CPU, memory, battery, and system state feed one shared model across every surface." },
          { name: "Claude", icon: "anthropic", category: "Explanation", project: "Optional context", reason: "AI clarifies opaque process names and tradeoffs only where local rules are insufficient; it does not become the product dependency." },
          { name: "GitHub", icon: "github", category: "Delivery", project: "Releases + CI", reason: "Tests, Clippy, architecture builds, checksums, and releases make a small binary independently inspectable." },
          { name: "Homebrew", mark: "BR", category: "Delivery", project: "Distribution", reason: "One familiar command closes the final mile between discovering the tool and using it under pressure." },
        ],
      }}
      receiptSlugs={["perf-pulse-homebrew"]}
      proofs={[
        {
          src: "/images/case-studies/perfpulse-dashboard.png",
          alt: "PerfPulse web interface with score, charts, and active processes",
          label: "The chart surface has a reason to exist",
          caption: "History, process comparison, and meeting readiness benefit from a visual surface; quick diagnosis does not require one.",
        },
        {
          src: "/images/case-studies/perfpulse-cli-live.png",
          alt: "PerfPulse CLI product preview showing JSON analysis piped to Claude",
          label: "Immediate / CLI",
          caption: "The shortest path from machine state to an actionable explanation stays in the terminal and can feed another tool when needed.",
        },
        {
          src: "/images/case-studies/perfpulse-tui-live.png",
          alt: "PerfPulse terminal TUI product preview with live CPU and memory process state",
          label: "Sustained / TUI",
          caption: "The same core signal earns a persistent terminal surface when the operator needs to watch change over time.",
        },
        {
          src: "/images/case-studies/perfpulse-meeting-mode-live.png",
          alt: "PerfPulse Meeting Mode product preview showing paused processes and automatic restore timing",
          label: "Reversible action / Meeting Mode",
          caption: "The interface makes the intervention, resources freed, paused processes, and restore path visible in one state.",
        },
      ]}
      learning={{
        eyebrow: "A tool is more than its core algorithm",
        title: "The final mile is where engineering becomes product.",
        body: (
          <>
            <p>
              PerfPulse changed how I assess developer tooling. A technically strong core is
              unfinished until the install path, operator hierarchy, recovery behavior, and runtime
              footprint resolve into one trustworthy experience.
            </p>
          </>
        ),
        notes: [
          "Default to the fastest useful surface.",
          "Use AI to clarify the boundary, not to decorate the feature list.",
          "Treat installation as the first product interaction.",
        ],
      }}
      primaryLink={{
        href: "https://github.com/hopeatina/perf-pulse",
        label: "View the source",
        external: true,
      }}
      secondaryLink={{
        href: "https://perf-pulse-web.vercel.app",
        label: "Try the web surface",
        external: true,
      }}
      next={{ href: "/projects/openclaw", label: "Next / plugin architecture", title: "OrgX for OpenClaw" }}
    />
  );
}
