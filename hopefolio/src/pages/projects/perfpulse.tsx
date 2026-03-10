import React from "react";
import ProjectLayout from "@/components/projects/ProjectLayout";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectSection from "@/components/projects/ProjectSection";
import ProjectCTA from "@/components/projects/ProjectCTA";
import TechStack from "@/components/projects/TechStack";
import FeatureGrid from "@/components/projects/FeatureGrid";
import ProjectCard from "@/components/projects/ProjectCard";
import MermaidDiagram from "@/components/projects/MermaidDiagram";
import StatsDisplay from "@/components/projects/StatsDisplay";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

export default function PerfPulse() {
  const { themeProps } = useTheme();

  const techStack = [
    {
      category: "Language",
      technologies: "Rust 2021 edition, 8,803 lines across 21 source files",
    },
    {
      category: "System",
      technologies: "sysinfo v0.33, crossterm v0.28, chrono, dirs",
    },
    {
      category: "Web",
      technologies: "Axum v0.8, tower-http v0.6, inline HTML/CSS/JS",
    },
    {
      category: "CLI",
      technologies: "clap v4 (20+ subcommands), serde/serde_json",
    },
    {
      category: "Async/Network",
      technologies: "tokio v1, reqwest v0.12",
    },
    {
      category: "Distribution",
      technologies: "Homebrew tap, GitHub Actions CI/CD",
    },
  ];

  const architectureDiagram = `
    flowchart TB
      subgraph "Data Collection"
        A[sysinfo v0.33] --> B[Rust Core]
        B --> C[Process Metrics]
        B --> D[System Stats]
        B --> E[Historical Store]
      end

      subgraph "3 Interface Modes"
        F[CLI - clap v4]
        G[Web Dashboard - Axum v0.8]
        H[Terminal TUI - crossterm v0.28]
      end

      subgraph "Intelligence"
        I[75+ Process Knowledge Base]
        J[Claude CLI - Haiku Model]
        K[LRU Cache - 500 entries]
      end

      C --> F
      C --> G
      C --> H
      D --> F
      D --> G
      D --> H
      E --> G
      C --> J
      J --> K
      I --> F
      I --> G

      style B fill:#8B5CF6,stroke:#7C3AED,color:#fff
      style G fill:#3B82F6,stroke:#2563EB,color:#fff
      style J fill:#10B981,stroke:#059669,color:#fff
  `;

  const interfaceFeatures = [
    {
      title: "CLI: 20+ Subcommands via clap v4",
      description:
        "The primary interface. Every feature is a subcommand: serve, status, top, ports, recommend, analyze, explain, score, meeting-mode, battery, optimize, startup, scheduler, alerts, patterns, profile, report, and more.",
      items: [
        "perf-pulse top: live process table sorted by CPU/memory",
        "perf-pulse score: performance score 0-100 with breakdown",
        "perf-pulse recommend: actionable suggestions based on current state",
        "perf-pulse explain <pid>: Claude-powered natural language explanation of what a process does",
      ],
    },
    {
      title: "Web Dashboard: Axum v0.8 at 127.0.0.1:7575",
      description:
        "A single-page dashboard served by Axum with all HTML, CSS, and JS inlined. No React, no build step, no node_modules. Just one Rust binary serving a complete monitoring UI.",
      items: [
        "Live process table with sorting and filtering",
        "Historical charts with selectable ranges (1 day to 30 days)",
        "Performance scoring breakdown and meeting mode controls",
        "Dark/light mode toggle, all rendered server-side as inline HTML",
      ],
    },
    {
      title: "Terminal TUI: crossterm v0.28 (89 lines)",
      description:
        "A lightweight terminal UI built directly on crossterm -- no ratatui, no tui-rs, no framework. 89 lines of Rust that give you real-time system vitals without leaving the terminal.",
      items: [
        "Real-time CPU and memory utilization bars",
        "Top processes by resource consumption, updated every 2 seconds",
        "Raw terminal control via crossterm for minimal overhead",
        "Deliberately minimal: does one thing and does it fast",
      ],
    },
  ];

  const meetingModeFeatures = [
    {
      title: "Meeting Mode (390 lines of Rust)",
      description:
        "The feature that made the project worth distributing. Pauses resource-heavy background processes via SIGSTOP before a video call and resumes them via SIGCONT when you are done.",
      items: [
        "13 default process categories: Docker, Slack, Teams, Dropbox, Google Drive, OneDrive, Creative Cloud, webpack, vite, esbuild, turbo, and more",
        "Auto-restore after 60 minutes (configurable) so nothing stays paused if you forget",
        "CPU/memory savings estimates before and after activation",
        "Config stored at ~/.config/perf-pulse/meeting_mode.json for per-machine customization",
      ],
    },
    {
      title: "Claude API Integration (106 lines)",
      description:
        "Uses the Claude CLI with the Haiku model to explain what processes are doing in plain English. Not a gimmick -- it is the fastest way to figure out why some mystery process is eating 4 GB of RAM.",
      items: [
        "Batch explain: up to 10 processes described in a single call",
        "Deep explain: detailed breakdown of a single process with resource context",
        "Persistent LRU cache at ~/.config/perf-pulse/explanations.json (500 entries max)",
        "Rate-limited to once per 60 seconds for background enrichment to avoid API abuse",
      ],
    },
  ];

  const additionalFeatures = [
    {
      title: "Performance Scoring",
      description:
        "0-100 score based on current CPU, memory, disk, and process health. Useful for before/after comparisons when tuning a dev machine.",
    },
    {
      title: "AI Pattern Detection",
      description:
        "Identifies time-of-day slowdowns, recurring bottlenecks, and potential memory leaks from historical data with 30-day retention.",
    },
    {
      title: "Battery Optimizer",
      description:
        "Identifies energy-hungry processes and suggests actions to extend battery life on MacBooks.",
    },
    {
      title: "Startup Item Manager",
      description:
        "Scans and manages macOS LaunchAgents and LaunchDaemons. Lists what runs at login and lets you disable items from the CLI.",
    },
    {
      title: "Webhook Alerts",
      description:
        "Configurable thresholds that fire webhooks when CPU, memory, or specific processes exceed limits.",
    },
    {
      title: "75+ Process Knowledge Base",
      description:
        "Built-in descriptions for common macOS processes so you get instant context without waiting for an API call.",
    },
  ];

  const stats = [
    {
      value: "v1.5.4",
      label: "Current Version",
      description: "35 commits, changelog from v1.0.0 (Jan 2025)",
    },
    {
      value: "8,803",
      label: "Lines of Rust",
      description: "21 source files, Rust 2021 edition",
    },
    {
      value: "3.3 MiB",
      label: "Release Binary (ARM64)",
      description: "opt-level=3, LTO, strip=true",
    },
    {
      value: "3",
      label: "Interface Modes",
      description: "CLI, Web Dashboard, Terminal TUI",
    },
  ];

  return (
    <ProjectLayout
      title="PerfPulse"
      description="A Rust CLI for macOS system monitoring with a web dashboard, terminal TUI, and Claude-powered process explanations. Distributed via Homebrew."
    >
      <ProjectHero
        title="PerfPulse"
        description="A weekend experiment that grew into a real tool. PerfPulse is a Rust CLI that replaces Activity Monitor with 20+ subcommands, a web dashboard served by Axum, and a terminal TUI -- plus Claude-powered process explanations and a meeting mode that actually reclaims CPU before video calls."
        tags={[
          "Rust",
          "CLI Tool",
          "Homebrew",
          "Axum",
          "Claude API",
        ]}
        image="/images/projects/perfpulse.svg"
      />

      <TechStack items={techStack} />

      <ProjectSection title="Origin Story">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h3
              className="text-2xl font-semibold mb-4"
              style={{ color: themeProps.colors.primary }}
            >
              It Started with a Slow Zoom Call
            </h3>
            <p className="text-lg mb-4">
              I was on a video call and my laptop was crawling. Activity Monitor
              told me Docker and webpack were eating resources, but it could not
              do anything about it. I wanted a tool that would just pause the
              heavy stuff, give me my CPU back, and resume everything when the
              call ended.
            </p>
            <p className="text-lg mb-4">
              The first version was 200 lines of Rust that sent SIGSTOP to a
              hardcoded list of processes. Then I added a CLI. Then a web
              dashboard because I wanted charts. Then a TUI because sometimes
              you want to glance at stats without opening a browser. Then
              Claude integration because I was tired of Googling mystery
              process names. Then Homebrew distribution because I wanted other
              people to actually use it.
            </p>
            <p className="text-lg">
              Eight months and 35 commits later, it is 8,803 lines of Rust
              across 21 source files and the tool I run every day.
            </p>
          </div>
          <ProjectCard variant="secondary">
            <h3 className="text-xl font-semibold mb-4 text-primary">
              Why Rust over Go?
            </h3>
            <p className="mb-4">
              For a system monitor, overhead matters. The tool is measuring
              the system it runs on, so it needs to be invisible. Rust gives
              me zero-cost abstractions, no garbage collector pauses, and a
              release binary of 3.3 MiB (ARM64) with LTO and strip enabled.
              The dev build is 4.3 MiB. Both start instantly.
            </p>
            <p>
              Go would have been faster to write initially, but Rust's
              release profile options (opt-level=3, lto=true, codegen-units=1,
              strip=true) produce tighter binaries, and sysinfo is a
              battle-tested crate for cross-platform system metrics. The
              tradeoff was compile time for runtime performance, which is the
              right call for a tool you run hundreds of times.
            </p>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectSection title="Architecture">
        <p className="text-lg mb-6">
          The core pattern is simple: sysinfo collects metrics, and three
          independent interface layers consume them. The CLI is the primary
          interface with 20+ clap subcommands. The web dashboard is an Axum
          server that renders a single HTML page with inline CSS and JS. The
          TUI is 89 lines of raw crossterm. All three share the same Rust
          data collection layer.
        </p>

        <MermaidDiagram
          title="PerfPulse Architecture"
          diagram={architectureDiagram}
          description="sysinfo collects metrics, three interface modes consume them (CLI via clap, web via Axum, TUI via crossterm), and Claude Haiku provides optional process explanations with an LRU cache."
        />

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <ProjectCard variant="default">
            <h3 className="text-lg font-semibold mb-3 text-primary">
              Why Axum for the web dashboard?
            </h3>
            <p className="text-sm">
              I considered warp and actix-web, but Axum's tower-based
              middleware and first-class tokio integration made it the
              cleanest fit. The dashboard is a single inline HTML page --
              no React, no npm, no build step. Just Rust serving HTML with
              embedded JavaScript for the charts. It is the opposite of
              overengineered and that is the point.
            </p>
          </ProjectCard>

          <ProjectCard variant="default">
            <h3 className="text-lg font-semibold mb-3 text-primary">
              Why crossterm, not ratatui?
            </h3>
            <p className="text-sm">
              The TUI is 89 lines. It shows CPU, memory, and top processes
              with a 2-second refresh. Ratatui is great for complex terminal
              UIs with layouts, widgets, and event handling, but for
              something this simple, it would be more framework than feature.
              Crossterm gives me raw terminal control and nothing else,
              which is exactly what 89 lines needs.
            </p>
          </ProjectCard>

          <ProjectCard variant="default">
            <h3 className="text-lg font-semibold mb-3 text-primary">
              Why inline HTML instead of React?
            </h3>
            <p className="text-sm">
              The dashboard ships inside the Rust binary. No static file
              directory, no asset pipeline, no CORS issues serving from a
              different port. You run perf-pulse serve and the dashboard is
              at 127.0.0.1:7575 with historical charts, live process tables,
              dark/light mode, and meeting mode controls. One binary, zero
              dependencies to serve a full monitoring UI.
            </p>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectSection title="Three Interface Modes">
        <FeatureGrid features={interfaceFeatures} columns={1} />
      </ProjectSection>

      <ProjectSection title="Meeting Mode & Claude Integration">
        <FeatureGrid features={meetingModeFeatures} columns={1} />

        <ProjectCard variant="accent" className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-primary">
            How Meeting Mode Actually Works
          </h3>
          <p className="mb-4">
            When you run <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">perf-pulse meeting-mode start</code>,
            PerfPulse iterates through 13 default process categories (Docker
            containers, Slack, Teams, Dropbox, Google Drive, OneDrive, Creative
            Cloud, webpack, vite, esbuild, turbo, and others) and sends each
            matching process a SIGSTOP signal. The process freezes in place --
            memory stays allocated, file handles stay open, but CPU usage drops
            to zero.
          </p>
          <p>
            When you run <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">perf-pulse meeting-mode stop</code> (or
            the auto-restore timer fires after 60 minutes), every paused
            process gets a SIGCONT and picks up exactly where it left off.
            No data loss, no restart required. The category list is
            configurable in ~/.config/perf-pulse/meeting_mode.json.
          </p>
        </ProjectCard>
      </ProjectSection>

      <ProjectSection title="Additional Features">
        <FeatureGrid features={additionalFeatures} columns={3} />
      </ProjectSection>

      <ProjectSection title="Distribution: The Homebrew Story">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-lg mb-4">
              Getting a Rust binary into someone else's hands is the part
              most side projects skip. I wanted a one-liner install, which
              meant Homebrew.
            </p>
            <p className="text-lg mb-4">
              The{" "}
              <a
                href="https://github.com/hopeatina/homebrew-perf-pulse"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                hopeatina/homebrew-perf-pulse
              </a>{" "}
              tap hosts the formula. GitHub Actions builds release binaries for
              both aarch64-apple-darwin (Apple Silicon) and x86_64-apple-darwin
              (Intel), then updates the tap formula with the new SHA256 hashes.
              Users get a pre-built binary -- no Rust toolchain required.
            </p>
            <p className="text-lg">
              The release binary is 3.3 MiB on ARM64 and 3.5 MiB on x86_64
              (v1.3.1 measurements). The release profile uses opt-level=3,
              LTO, codegen-units=1, and strip=true to keep it tight.
            </p>
          </div>

          <ProjectCard variant="default">
            <h3 className="text-xl font-semibold mb-4 text-primary">
              Install in One Command
            </h3>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm space-y-3">
              <p className="text-gray-500 text-xs"># Install from Homebrew tap</p>
              <p>
                <span className="text-gray-500">$</span> brew install
                hopeatina/perf-pulse/perf-pulse
              </p>
              <p className="text-gray-500 text-xs mt-4"># Or tap first, then install</p>
              <p>
                <span className="text-gray-500">$</span> brew tap
                hopeatina/perf-pulse
              </p>
              <p>
                <span className="text-gray-500">$</span> brew install perf-pulse
              </p>
              <p className="text-gray-500 text-xs mt-4"># Launch the web dashboard</p>
              <p>
                <span className="text-gray-500">$</span> perf-pulse serve
              </p>
              <p className="text-gray-500 text-xs"># Opens at 127.0.0.1:7575</p>
            </div>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectSection title="By the Numbers">
        <StatsDisplay stats={stats} className="mb-8" />

        <div className="grid md:grid-cols-2 gap-6">
          <ProjectCard variant="secondary">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              What I Shipped
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 bg-primary" />
                <span>20+ CLI subcommands covering monitoring, optimization, and reporting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 bg-primary" />
                <span>Web dashboard with historical charts (1-30 day range), live process table, and dark/light mode</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 bg-primary" />
                <span>Meeting mode that pauses/resumes 13 categories of background processes via SIGSTOP/SIGCONT</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 bg-primary" />
                <span>Claude Haiku integration with LRU cache (500 entries) and rate limiting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 bg-primary" />
                <span>Homebrew tap with CI/CD pipeline for ARM64 + x86_64 macOS binaries</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 bg-primary" />
                <span>Free/Pro tiering with license system</span>
              </li>
            </ul>
          </ProjectCard>

          <ProjectCard variant="highlight">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              What I Learned
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 bg-primary" />
                <span>
                  <strong>Distribution is the feature.</strong> A tool nobody can install is a tool nobody uses. The Homebrew tap took a weekend but made the project real.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 bg-primary" />
                <span>
                  <strong>Inline HTML scales further than you think.</strong> The web dashboard is one big string literal in Rust. It sounds cursed, but it means zero deployment complexity.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 bg-primary" />
                <span>
                  <strong>SIGSTOP/SIGCONT is underused.</strong> Most "optimizer" tools kill processes. Pausing them preserves state and is completely reversible.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 bg-primary" />
                <span>
                  <strong>Caching matters more than the API call.</strong> The Claude explanation cache prevents duplicate API calls and makes the tool feel instant for processes you have seen before.
                </span>
              </li>
            </ul>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectCTA
        demoUrl="https://perf-pulse-web.vercel.app"
        githubUrl="https://github.com/hopeatina/perf-pulse"
      />
    </ProjectLayout>
  );
}
