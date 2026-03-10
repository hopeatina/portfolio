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
    { category: "Core", technologies: "Rust, sysinfo crate" },
    { category: "Web", technologies: "Axum server, HTML/CSS dashboard" },
    { category: "TUI", technologies: "crossterm, ratatui" },
    { category: "AI", technologies: "Claude API integration" },
    { category: "Distribution", technologies: "Homebrew tap, CI/CD" },
    {
      category: "Security",
      technologies: "XSS prevention, CORS, input sanitization",
    },
  ];

  const architectureDiagram = `
    flowchart TB
      subgraph "Data Collection"
        A[sysinfo crate] --> B[Rust Core]
        B --> C[Process Metrics]
        B --> D[System Stats]
      end

      subgraph "Interface Layer"
        E[CLI Output]
        F[Web Dashboard]
        G[TUI Interface]
      end

      subgraph "AI Layer"
        H[Claude API] --> I[Recommendations]
      end

      C --> E
      C --> F
      C --> G
      D --> E
      D --> F
      D --> G
      C --> H
      D --> H
      I --> F

      style B fill:#8B5CF6,stroke:#7C3AED,color:#fff
      style F fill:#3B82F6,stroke:#2563EB,color:#fff
      style H fill:#10B981,stroke:#059669,color:#fff
  `;

  const features = [
    {
      title: "Three Interface Modes",
      description:
        "Choose the interface that fits your workflow: CLI for quick checks, web dashboard for rich visuals, or TUI for terminal power users",
      items: [
        "CLI mode for scriptable, pipeable system metrics output",
        "Web dashboard served via Axum with real-time HTML/CSS visualizations",
        "TUI mode built with ratatui and crossterm for interactive terminal monitoring",
        "Consistent data across all three interfaces from the shared Rust core",
      ],
    },
    {
      title: "Homebrew Distribution",
      description:
        "Install with a single command via the custom Homebrew tap, supporting both Apple Silicon and Intel Macs",
      items: [
        "Custom Homebrew tap: brew install hopeatina/perf-pulse/perf-pulse",
        "Pre-built binaries for macOS ARM64 (M1/M2/M3) and x86_64 (Intel)",
        "Automated CI/CD pipeline for release builds",
        "Approximately 5MB binary size for fast installation",
      ],
    },
    {
      title: "AI-Powered Recommendations",
      description:
        "Leverage Claude API integration to get intelligent recommendations for optimizing system performance",
      items: [
        "Claude API analyzes current system metrics and process patterns",
        "Contextual recommendations based on resource usage trends",
        "Meeting Mode that identifies and suggests actions for video call optimization",
        "Natural language explanations of system bottlenecks",
      ],
    },
    {
      title: "Cross-Platform & Secure",
      description:
        "Built with security-first principles and cross-platform support for modern macOS hardware",
      items: [
        "Native support for Apple Silicon (M1/M2/M3) and Intel processors",
        "XSS prevention and input sanitization on web dashboard",
        "CORS configuration for secure web interface access",
        "Sandboxed process inspection with minimal system privileges",
      ],
    },
  ];

  const stats = [
    {
      value: "v1.5.4",
      label: "Current Version",
      description: "Stable release",
    },
    {
      value: "~5MB",
      label: "Binary Size",
      description: "Lightweight Rust binary",
    },
    {
      value: "3",
      label: "Interfaces",
      description: "CLI, Web, TUI",
    },
    {
      value: "Homebrew",
      label: "Distribution",
      description: "Custom tap available",
    },
  ];

  return (
    <ProjectLayout
      title="PerfPulse"
      description="AI-powered macOS Activity Monitor replacement built in Rust with CLI, web dashboard, and TUI interfaces"
    >
      <ProjectHero
        title="PerfPulse"
        description="An AI-powered macOS Activity Monitor replacement built entirely in Rust. PerfPulse combines a high-performance CLI, a web dashboard served via Axum, and an interactive TUI to give you complete visibility into system performance -- with Claude-powered recommendations to optimize your workflow."
        tags={[
          "Rust",
          "Homebrew Tap",
          "CLI Tool",
          "AI-Powered",
          "Cross-Platform",
        ]}
      />

      <TechStack items={techStack} />

      <ProjectSection title="System Architecture">
        <p className="text-lg mb-6">
          PerfPulse is built around a shared Rust core that collects system
          metrics via the sysinfo crate and distributes them to three
          independent interface layers, with optional AI analysis through
          Claude API integration.
        </p>

        <MermaidDiagram
          title="PerfPulse Architecture"
          diagram={architectureDiagram}
          description="The Rust core collects system metrics via sysinfo and feeds three interface modes (CLI, Web, TUI) while optionally routing data through Claude API for intelligent performance recommendations."
        />

        <ProjectCard variant="secondary" className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-primary">
            Why Rust?
          </h3>
          <p>
            Rust provides zero-cost abstractions and memory safety guarantees
            that are critical for a system monitoring tool. PerfPulse achieves
            minimal overhead while inspecting processes, ensuring it doesn't
            skew the very metrics it measures. The resulting binary is
            approximately 5MB and starts instantly.
          </p>
        </ProjectCard>
      </ProjectSection>

      <ProjectSection title="Core Features">
        <FeatureGrid features={features} columns={1} />
      </ProjectSection>

      <ProjectSection title="Quick Start">
        <ProjectCard variant="default">
          <h3 className="text-xl font-semibold mb-4 text-primary">
            Install via Homebrew
          </h3>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm space-y-2">
            <p>
              <span className="text-gray-500">$</span> brew tap
              hopeatina/perf-pulse
            </p>
            <p>
              <span className="text-gray-500">$</span> brew install
              perf-pulse
            </p>
            <p>
              <span className="text-gray-500">$</span> perf-pulse --mode web
            </p>
          </div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Or install in a single command:{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
              brew install hopeatina/perf-pulse/perf-pulse
            </code>
          </p>
        </ProjectCard>
      </ProjectSection>

      <ProjectSection title="Metrics & Distribution">
        <StatsDisplay stats={stats} className="mb-8" />

        <div className="grid md:grid-cols-2 gap-6">
          <ProjectCard variant="accent">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Meeting Mode
            </h3>
            <p>
              PerfPulse's Meeting Mode automatically detects video
              conferencing applications and provides targeted recommendations
              for optimizing system resources during calls -- closing
              unnecessary background processes and freeing memory for smooth
              video and audio.
            </p>
          </ProjectCard>

          <ProjectCard variant="highlight">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Security First
            </h3>
            <p>
              The web dashboard implements XSS prevention, CORS
              configuration, and input sanitization to ensure safe operation
              even on shared networks. All process data is collected with
              minimal privileges and never transmitted externally without
              explicit user consent.
            </p>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectCTA githubUrl="https://github.com/hopeatina/perf-pulse" />
    </ProjectLayout>
  );
}
