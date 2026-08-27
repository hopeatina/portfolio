import CaseStudyNarrative from "@/components/v4/CaseStudyNarrative";

export default function PerfPulsePage() {
  return (
    <CaseStudyNarrative
      pageTitle="Perf Pulse Crash Guard case study — Hope Atina"
      description="A local-first macOS performance suite that warns about runaway memory and shrinking disk headroom, then opens the live Crash Guard dashboard for deliberate intervention."
      index="Case 03 / developer tooling"
      status="Live product · v1.7"
      title="Perf Pulse"
      subtitle="Crash Guard for developer Macs."
      introduction="Perf Pulse came from a recurring failure mode: multiple agents, builds, and desktop apps could consume memory or disk until the Mac stopped responding—while Activity Monitor waited to be checked. Crash Guard turns that late diagnosis into an always-on warning, a relevant local dashboard, and a deliberate next move."
      facts={[
        { label: "Core", value: "Rust" },
        { label: "Protection", value: "Memory + disk" },
        { label: "Runtime", value: "Per-user launchd", note: "no root daemon · no system extension" },
        { label: "Install", value: "brew install perf-pulse", note: "public tap · pinned SHA-256 · real binaries" },
      ]}
      heroProof={{
        src: "/images/case-studies/perf-pulse-crash-guard.jpg",
        alt: "Perf Pulse Crash Guard dashboard showing protection status, memory and disk thresholds, incidents, and stop controls",
        label: "Crash Guard / one local operating picture",
        caption: "The notification opens the exact live dashboard developers need: current risk, tunable thresholds, recent incidents, and identity-checked stop controls in one place.",
      }}
      problem={{
        eyebrow: "The warning arrived after the damage",
        title: "Activity Monitor can show a problem. It does not watch for the moment before the machine goes down.",
        body: (
          <>
            <p>
              The failure rarely begins with one obvious process. Agent sessions accumulate, a build
              spikes, swap grows, or generated artifacts quietly consume the remaining writable disk.
              By the time the Mac becomes visibly slow, opening another inspection tool is already late.
            </p>
            <p>
              A useful guard had to run continuously, explain which resource was approaching danger,
              and lead directly to a safe response—without requiring root access or becoming another
              heavyweight service.
            </p>
          </>
        ),
        notes: [
          "Warn while there is still time to act.",
          "Open the relevant local incident surface—not an editor or an opaque script.",
          "Never delete files automatically; keep destructive action explicit.",
        ],
      }}
      insight={{
        eyebrow: "A warning is a doorway",
        title: "Detection only becomes useful when the next move is attached.",
        body: (
          <>
            <p>
              Crash Guard connects three moments that system utilities usually separate: the trend
              before failure, a concise native alert, and the exact live dashboard for that incident.
              Developers can tune the guard to their machine, inspect bounded storage hotspots, and
              decide whether to stop a process with its identity revalidated at action time.
            </p>
          </>
        ),
      }}
      decision={{
        eyebrow: "Always on, still local-first",
        title: "Use a per-user agent for protection and a local dashboard for judgment.",
        body: (
          <>
            <p>
              A headless launchd agent samples memory pressure and writable-disk headroom even when the
              dashboard is closed. When a threshold is crossed, a native alert can reopen the dedicated
              Crash Guard tab on the live localhost server. The user—not the monitor—keeps authority over
              stopping processes, changing thresholds, and disabling protection.
            </p>
          </>
        ),
      }}
      flow={[
        { glyph: "context", label: "Watch headroom", detail: "A per-user agent samples memory pressure and writable disk locally." },
        { glyph: "branch", label: "Detect trajectory", detail: "Thresholds and disk forecasting surface risk before the machine becomes unresponsive.", tone: "cold" },
        { glyph: "judgment", label: "Open the incident", detail: "The alert leads to the dedicated live Crash Guard dashboard with the relevant context.", tone: "heat" },
        { glyph: "receipt", label: "Intervene deliberately", detail: "The user tunes protection, inspects storage, or requests an identity-checked process stop." },
      ]}
      system={{
        eyebrow: "One guard, one operating picture",
        title: "Continuous detection and human-controlled action share a small local-first architecture.",
        introduction: "The guard can keep watch without an open browser, while the dashboard appears only when the developer needs context or control. CLI, TUI, and overview surfaces read from the same underlying system state.",
        layers: [
          { label: "collector", title: "Read pressure and headroom locally", detail: "The Rust core gathers memory, swap, disk, and process state on the Mac it is protecting.", technology: "Rust · sysinfo · macOS", tone: "cold" },
          { label: "guard", title: "Model risk before failure", detail: "Tunable thresholds, trend checks, and disk forecasting distinguish current load from a deteriorating trajectory.", technology: "Tokio · local rules", tone: "heat" },
          { label: "incident", title: "Bind the alert to the live context", detail: "Native notifications can open the dedicated Crash Guard tab on the exact localhost dashboard serving that Mac.", technology: "launchd · Axum · native alerts", tone: "signal" },
          { label: "authority", title: "Keep intervention in human hands", detail: "Configuration is explicit, storage diagnostics stay read-only, and stop requests revalidate process identity before signaling.", technology: "PID + name + start time" },
        ],
        rationale: [
          { pressure: "A snapshot can miss the path toward a crash", choice: "Track pressure, growth, and remaining disk headroom", reason: "The product can warn while the developer still has room to respond." },
          { pressure: "A generic notification creates another hunt", choice: "Open the dedicated live incident surface", reason: "Risk, controls, and current process context arrive together." },
          { pressure: "A stale PID can point at a different process", choice: "Validate PID, name, and start time before a stop request", reason: "Convenient action does not erase the safety boundary." },
        ],
        decisions: [
          {
            id: "always-on-guard",
            label: "watch before failure",
            before: "Manual inspection begins only after the developer notices slowdown, low disk, or a frozen machine.",
            decision: "Run Crash Guard as an opt-in per-user launchd agent with tunable memory and disk thresholds.",
            consequence: "Protection persists across dashboard sessions without a root daemon or macOS system extension.",
            evidence: "launchd LaunchAgent · local config · native alerts",
            tone: "cold",
          },
          {
            id: "incident-surface",
            label: "make the alert actionable",
            before: "A dense notification or unrelated application leaves the user to reconstruct what happened.",
            decision: "Use concise incident-first copy and open the live Crash Guard tab for the Mac that raised the alert.",
            consequence: "The next view answers what is at risk, why the alert fired, and which controls are available.",
            evidence: "native notification · localhost dashboard · tab-spam guard",
            tone: "signal",
          },
          {
            id: "identity-checked-action",
            label: "preserve operator authority",
            before: "A process can exit and its PID can be reused between detection and intervention.",
            decision: "Revalidate PID, process name, and start time; block protected macOS services and Perf Pulse itself.",
            consequence: "The dashboard can request a graceful or forceful stop without pretending the action is risk-free or recovery is guaranteed.",
            evidence: "identity check · protected-process policy · explicit confirmation",
            tone: "heat",
          },
          {
            id: "distribution",
            label: "finish the product",
            before: "A useful developer tool remains hypothetical when installation requires build knowledge or repository archaeology.",
            decision: "Ship Apple Silicon and Intel builds and make Homebrew the default path from curiosity to protection.",
            consequence: "The install path stays short enough to use before the next high-load session.",
            evidence: "homebrew-perf-pulse · public tap, pinned SHA-256",
            evidenceHref: "https://github.com/hopeatina/homebrew-perf-pulse",
            tone: "cold",
          },
        ],
        surfaces: [
          { name: "Crash Guard", mode: "always on", detail: "Persistent memory and disk protection with tunable thresholds and native alerts." },
          { name: "Local dashboard", mode: "incident", detail: "The exact live operating picture for protection status, recent incidents, and intervention." },
          { name: "CLI + TUI", mode: "diagnostic", detail: "Fast checks and sustained inspection stay where developers already work." },
          { name: "Homebrew", mode: "distribution", detail: "Installation becomes the first coherent product interaction, not a README obstacle." },
        ],
        technologies: [
          { label: "Core", values: ["Rust", "Tokio", "sysinfo"] },
          { label: "Runtime", values: ["launchd", "Axum", "local API"] },
          { label: "Delivery", values: ["Homebrew", "native alerts", "optional webhooks"] },
        ],
        toolEvidence: [
          { name: "Rust", icon: "rust", category: "Core", project: "Perf Pulse", reason: "A memory-safe, compact core keeps continuous collection predictable on the machine it is protecting." },
          { name: "Tokio", mark: "TK", category: "Runtime", project: "Crash Guard", reason: "Async scheduling coordinates recurring checks, alert delivery, and the local server without turning protection into a heavyweight daemon." },
          { name: "sysinfo", mark: "SI", category: "Collection", project: "Perf Pulse", reason: "Process and system state feed one shared model across Crash Guard, CLI, TUI, and dashboard surfaces." },
          { name: "launchd", mark: "LD", category: "Runtime", project: "Crash Guard", reason: "A per-user LaunchAgent keeps protection available across logins without root privileges or a system extension." },
          { name: "Axum", mark: "AX", category: "Surface", project: "Local dashboard", reason: "A small localhost server binds each alert to a focused live incident and control surface." },
          { name: "Clap", mark: "CL", category: "Surface", project: "CLI", reason: "Guard status, checks, storage diagnostics, and installation remain scriptable from the terminal." },
          { name: "Crossterm", mark: "CT", category: "Surface", project: "TUI", reason: "A persistent live view supports inspection without forcing the operator into a browser." },
          { name: "GitHub", icon: "github", category: "Delivery", project: "Releases + CI", reason: "Tests, Clippy, architecture builds, checksums, and releases make a small binary independently inspectable." },
          { name: "Homebrew", mark: "BR", category: "Delivery", project: "Distribution", reason: "One familiar command closes the final mile between discovering the tool and using it under pressure." },
        ],
      }}
      heroTerminal={{
        command: "brew install hopeatina/perf-pulse/perf-pulse",
        note: "public tap · Apple Silicon + Intel · protection remains opt-in",
      }}
      receiptSlugs={["perf-pulse-homebrew"]}
      proofs={[
        {
          src: "/images/case-studies/perf-pulse-crash-guard.jpg",
          alt: "Perf Pulse Crash Guard live dashboard with protection status, thresholds, incidents, and process controls",
          label: "Early warning / Crash Guard",
          caption: "Protection state, threshold controls, incident history, and the next safe action stay in one focused local surface.",
        },
        {
          src: "/images/case-studies/perfpulse-cli-live.png",
          alt: "Perf Pulse CLI product preview showing JSON analysis piped to Claude",
          label: "Immediate / CLI",
          caption: "The shortest path from machine state to an actionable explanation stays in the terminal and can feed another tool when needed.",
        },
        {
          src: "/images/case-studies/perfpulse-tui-live.png",
          alt: "Perf Pulse terminal TUI product preview with live CPU and memory process state",
          label: "Sustained / TUI",
          caption: "The same core signal earns a persistent terminal surface when the operator needs to watch change over time.",
        },
        {
          src: "/images/case-studies/perfpulse-meeting-mode-live.png",
          alt: "Perf Pulse Meeting Mode product preview showing paused processes and automatic restore timing",
          label: "Reversible action / Meeting Mode",
          caption: "The interface makes the intervention, resources freed, paused processes, and restore path visible in one state.",
        },
      ]}
      learning={{
        eyebrow: "The interface begins at the interruption",
        title: "A warning earns trust when it carries the user to a clear choice.",
        body: (
          <>
            <p>
              Crash Guard changed the product from something a developer remembers to open into
              protection that can notice first. The hard part was not adding another alert; it was
              joining early detection, useful context, configurable sensitivity, and carefully bounded
              intervention without overstating what a signal request can guarantee.
            </p>
          </>
        ),
        notes: [
          "Design the alert and destination as one interaction.",
          "Expose sensitivity without making safe defaults feel unfinished.",
          "Keep automation ahead of failure and behind user authority.",
        ],
      }}
      primaryLink={{
        href: "https://perf-pulse.com",
        label: "View Perf Pulse",
        external: true,
      }}
      secondaryLink={{
        href: "https://perf-pulse.com/docs#crash-guard",
        label: "Read the Crash Guard docs",
        external: true,
      }}
      next={{ href: "/projects/openclaw", label: "Next / plugin architecture", title: "OrgX for OpenClaw" }}
    />
  );
}
