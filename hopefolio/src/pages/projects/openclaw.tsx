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

export default function OpenClaw() {
  const { themeProps } = useTheme();

  const techStack = [
    {
      category: "Browser Extension",
      technologies: "Chrome APIs, Manifest V3",
    },
    { category: "Frontend", technologies: "React, TypeScript" },
    {
      category: "Communication",
      technologies: "WebSocket, Message Passing",
    },
    {
      category: "Agent Runtime",
      technologies: "CLI Integration, Task Management",
    },
    { category: "Build", technologies: "Webpack, Chrome DevTools" },
  ];

  const architectureDiagram = `
    flowchart LR
      subgraph "Browser Layer"
        A[Browser Extension] --> B[Chrome APIs]
        B --> C[Message Passing]
      end

      subgraph "Agent Layer"
        D[Agent Runtime] --> E[Task Queue]
        D --> F[State Manager]
      end

      subgraph "CLI Layer"
        G[CLI Interface] --> H[Command Parser]
        H --> I[Task Executor]
      end

      C --> D
      D --> G
      I --> E

      style A fill:#8B5CF6,stroke:#7C3AED,color:#fff
      style D fill:#3B82F6,stroke:#2563EB,color:#fff
      style G fill:#10B981,stroke:#059669,color:#fff
  `;

  const features = [
    {
      title: "Real-Time Agent Interaction",
      description:
        "Live bidirectional communication between the browser extension and agent runtime for seamless orchestration",
      items: [
        "WebSocket-based real-time sync between browser and agent processes",
        "Chrome extension popup for quick agent status and control",
        "Message passing protocol for structured agent commands",
        "Live task progress tracking with visual indicators",
      ],
    },
    {
      title: "Task Management System",
      description:
        "Comprehensive task queue and management for organizing agent workflows",
      items: [
        "Priority-based task queue with configurable ordering",
        "Task state machine with pending, active, completed, and failed states",
        "Batch task operations for bulk agent orchestration",
        "Task history and audit logging for debugging",
      ],
    },
    {
      title: "CLI-First User Experience",
      description:
        "Keyboard-driven interface designed for power users who prefer terminal workflows",
      items: [
        "Command palette for rapid agent control",
        "Configurable keyboard shortcuts for common operations",
        "Terminal-style output with structured logging",
        "Integration with existing CLI tools and shell environments",
      ],
    },
  ];

  const stats = [
    {
      value: "644+",
      label: "Commits",
      description: "Active development history",
    },
    {
      value: "Active",
      label: "Development",
      description: "Ongoing feature work",
    },
    {
      value: "Real-time",
      label: "Sync",
      description: "WebSocket communication",
    },
    {
      value: "CLI-first",
      label: "UX Paradigm",
      description: "Power user focused",
    },
  ];

  return (
    <ProjectLayout
      title="OpenClaw Plugin"
      description="Browser extension for agent control and orchestration with CLI-first UX"
    >
      <ProjectHero
        title="OpenClaw Plugin"
        description="A browser extension for agent control and orchestration, bridging the gap between browser-based workflows and CLI-driven agent runtimes. With 644+ commits of active development, OpenClaw provides a seamless interface for managing AI agents directly from your browser."
        tags={[
          "Browser Extension",
          "Agent UX",
          "CLI Orchestration",
          "TypeScript",
        ]}
      />

      <TechStack items={techStack} />

      <ProjectSection title="System Architecture">
        <p className="text-lg mb-6">
          OpenClaw bridges the browser and CLI worlds through a layered
          architecture that enables real-time agent orchestration from a
          familiar browser extension interface.
        </p>

        <MermaidDiagram
          title="Extension Architecture"
          diagram={architectureDiagram}
          description="Browser Extension communicates with the Agent Runtime via WebSocket message passing, which in turn orchestrates CLI commands through a task queue system."
        />

        <ProjectCard variant="secondary" className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-primary">
            Bridging Browser and CLI
          </h3>
          <p>
            OpenClaw uses Chrome's Manifest V3 APIs and WebSocket connections
            to maintain a persistent link between the browser extension and
            the agent runtime. This allows users to control CLI-based agents
            without leaving their browser workflow.
          </p>
        </ProjectCard>
      </ProjectSection>

      <ProjectSection title="Core Features">
        <FeatureGrid features={features} columns={1} />
      </ProjectSection>

      <ProjectSection title="Impact & Metrics">
        <StatsDisplay stats={stats} className="mb-8" />

        <div className="grid md:grid-cols-2 gap-6">
          <ProjectCard variant="accent">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Developer Experience
            </h3>
            <p>
              OpenClaw prioritizes a CLI-first experience, recognizing that
              developers working with AI agents prefer keyboard-driven
              workflows. The extension enhances rather than replaces terminal
              usage, providing visual context while maintaining speed.
            </p>
          </ProjectCard>

          <ProjectCard variant="highlight">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Active Development
            </h3>
            <p>
              With over 644 commits, OpenClaw is under active development
              with continuous improvements to agent orchestration
              capabilities, extension performance, and cross-browser
              compatibility.
            </p>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectCTA githubUrl="https://github.com/hopeatina" />
    </ProjectLayout>
  );
}
