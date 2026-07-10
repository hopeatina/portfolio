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
        { label: "Distribution", value: "Homebrew" },
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
      proofs={[
        {
          src: "/images/case-studies/perfpulse-dashboard.png",
          alt: "PerfPulse web interface with score, charts, and active processes",
          label: "The chart surface has a reason to exist",
          caption: "History, process comparison, and meeting readiness benefit from a visual surface; quick diagnosis does not require one.",
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
