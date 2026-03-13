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
      category: "Runtime",
      technologies: "TypeScript, Custom HTTP Router (zero production deps)",
    },
    {
      category: "Communication",
      technologies: "SSE (Server-Sent Events), Polling Fallback",
    },
    {
      category: "Dashboard",
      technologies: "React, TypeScript (73K LOC)",
    },
    {
      category: "Persistence",
      technologies: "SQLite (offline-first outbox with replay)",
    },
    {
      category: "Agent Protocol",
      technologies: "MCP (30 registered tools), CLI integration",
    },
    {
      category: "Background Services",
      technologies: "Sync, Gateway Watchdog, Worker Supervisor",
    },
  ];

  const architectureDiagram = `
    flowchart TB
      subgraph "Agent Hosts"
        A1[Claude CLI] --> MCP["/orgx/mcp\nLocal MCP Bridge"]
        A2[Codex] --> MCP
        A3[Cursor] --> MCP
      end

      subgraph "OpenClaw Plugin Core"
        MCP --> TR[Custom HTTP Router\nzero deps]
        TR --> TQ[Task Queue\nState Machine]
        TR --> SSE[SSE Stream\n+ Polling Fallback]
        TQ --> SQ[SQLite Outbox\nOffline-First]
      end

      subgraph "Background Services"
        BS1[Sync Service\n5 min interval] --> SQ
        BS2[Gateway Watchdog] --> TR
        BS3[Worker Supervisor] --> TQ
        BS4[Auto-Continue\nPipeline] --> TQ
      end

      subgraph "Dashboard UI @ :18789/orgx/live"
        SSE --> D1[Mission Control]
        SSE --> D2[Next Up Queue]
        SSE --> D3[Decision Queue]
        SSE --> D4[Activity Timeline]
        SSE --> D5[Session Inspector]
      end

      style TR fill:#8B5CF6,stroke:#7C3AED,color:#fff
      style TQ fill:#3B82F6,stroke:#2563EB,color:#fff
      style SQ fill:#10B981,stroke:#059669,color:#fff
      style MCP fill:#F59E0B,stroke:#D97706,color:#fff
  `;

  const features = [
    {
      title: "Local MCP Bridge with Auto-Configuration",
      description:
        "A single endpoint at /orgx/mcp that agent hosts connect to, eliminating per-agent config files",
      items: [
        "Auto-configures ~/.claude/mcp.json, ~/.codex/config.toml, and ~/.cursor/mcp.json on first run",
        "30 registered MCP tools: orgx_status, orgx_spawn_check, orgx_quality_score, orgx_create_entity, orgx_update_entity, orgx_list_entities, orgx_emit_activity, orgx_request_decision, and more",
        "Any agent that speaks MCP can connect without custom integration code",
        "Plugin architecture means the host app (OpenClaw) handles auth, routing, and lifecycle -- the plugin just registers tools",
      ],
    },
    {
      title: "Task Queue State Machine",
      description:
        "A deterministic state machine that models every task's lifecycle, making it possible to resume after crashes or network drops",
      items: [
        "Task states: QUEUED, RUNNING, BLOCKED, IDLE, COMPLETED -- transitions enforced at the state-machine level, not by convention",
        "Lane states add a second axis: IDLE, RUNNING, BLOCKED, WAITING_DEPENDENCY, RATE_LIMITED, COMPLETED",
        "SQLite-backed outbox queues mutations offline and replays them on reconnect, so nothing is lost if the gateway goes down",
        "Background worker supervisor restarts stalled lanes and auto-continue pipeline picks up where a task left off",
      ],
    },
    {
      title: "SSE Streaming with Polling Fallback",
      description:
        "Server-Sent Events for real-time dashboard updates, with automatic degradation to polling when SSE is unavailable",
      items: [
        "SSE chosen over WebSocket: unidirectional server-to-client push is all the dashboard needs, and SSE works through proxies and firewalls without upgrade negotiation",
        "Polling fallback activates automatically when SSE connections drop, so the dashboard never goes blank",
        "Dashboard served at http://127.0.0.1:18789/orgx/live with nine panels: Mission Control, Next Up Queue, In Progress, Activity Timeline, Decision Queue, Session Inspector, Triage Queue, Artifact Gallery, Settings",
        "Mission Control renders a hierarchy tree of all entities; Decision Queue surfaces items needing human approval",
      ],
    },
    {
      title: "CLI Integration",
      description:
        "Terminal commands for developers who prefer staying in their shell",
      items: [
        "`orgx status` -- current task queue state, lane health, and active sessions at a glance",
        "`orgx sync` -- force an immediate sync cycle (flags available for selective sync)",
        "CLI output is structured for piping into other tools (JSON mode available)",
        "Same state machine backs both CLI and dashboard -- no divergence between what the terminal and the UI show",
      ],
    },
  ];

  const stats = [
    {
      value: "134K+",
      label: "Lines of Code",
      description: "60K backend + 73K dashboard",
    },
    {
      value: "558",
      label: "Commits",
      description: "Sustained development",
    },
    {
      value: "30",
      label: "MCP Tools",
      description: "Registered and callable",
    },
    {
      value: "0",
      label: "Production Deps",
      description: "Custom HTTP router",
    },
  ];

  const heroFacts = [
    { label: "Proof", value: "558 commits", detail: "Sustained plugin development" },
    { label: "Codebase", value: "134K+ LOC", detail: "Backend + dashboard" },
    { label: "Tooling", value: "30 MCP tools", detail: "Registered and callable" },
    { label: "Resilience", value: "Offline-first", detail: "SQLite outbox with replay" },
  ];

  const artifactPanel = {
    title: "Mission control surface",
    items: [
      "A local MCP bridge that auto-configures Claude, Codex, and Cursor against one endpoint.",
      "Task queue and lane states designed for deterministic resume after drops, crashes, and reconnects.",
      "SSE-first dashboard with polling fallback, so the orchestration surface never goes blind.",
      "Background services for sync, watchdog, supervision, and auto-continue instead of manual babysitting.",
    ],
    footer:
      "The point of this plugin is not ornament. It is local control, survivable state, and a browser-native way to reason about agent work.",
  };

  return (
    <ProjectLayout
      title="OpenClaw Plugin"
      description="Agent plugin with web dashboard for multi-agent orchestration via MCP, SSE streaming, and offline-first persistence"
    >
      <ProjectHero
        title="OpenClaw Plugin"
        description="An OpenClaw agent plugin that serves a full web dashboard over HTTP, giving developers a single pane of glass for multi-agent orchestration. 30 MCP tools, SSE-streamed UI, SQLite offline-first outbox, and a custom zero-dependency HTTP router -- all in 134K lines of TypeScript across 558 commits."
        eyebrow="Flagship plugin review"
        facts={heroFacts}
        tags={[
          "Agent Plugin",
          "MCP Protocol",
          "SSE Streaming",
          "TypeScript",
          "SQLite",
        ]}
        artifactPanel={artifactPanel}
      />

      <TechStack items={techStack} />

      <ProjectSection title="Why a Plugin, Not a Standalone App">
        <div className="grid md:grid-cols-2 gap-8 items-start mb-8">
          <div>
            <h3
              className="text-2xl font-semibold mb-4"
              style={{ color: themeProps.colors.primary }}
            >
              Architecture Decision
            </h3>
            <p className="text-lg mb-4">
              A standalone orchestration server would need its own auth, its own
              process management, and its own deployment story. By building as an
              OpenClaw plugin instead, the orchestration layer inherits all of
              that from the host. The plugin registers its 30 MCP tools, mounts
              its HTTP routes, and lets OpenClaw handle everything else.
            </p>
            <p className="text-lg">
              This also means any agent that speaks MCP -- Claude CLI, Codex,
              Cursor -- can connect through the local bridge at{" "}
              <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                /orgx/mcp
              </code>{" "}
              without writing custom integration code. The plugin auto-configures
              each agent&apos;s MCP config file on first run.
            </p>
          </div>
          <ProjectCard variant="secondary">
            <h4 className="text-lg font-semibold mb-3 text-primary">
              What the Plugin Provides
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2 bg-primary" />
                <span>
                  <strong>MCP Bridge</strong> -- single endpoint for all agent
                  hosts
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2 bg-primary" />
                <span>
                  <strong>Web Dashboard</strong> -- nine-panel UI at
                  :18789/orgx/live
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2 bg-primary" />
                <span>
                  <strong>Task Queue</strong> -- deterministic state machine with
                  SQLite persistence
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2 bg-primary" />
                <span>
                  <strong>Background Services</strong> -- sync, watchdog,
                  supervisor, auto-continue
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2 bg-primary" />
                <span>
                  <strong>CLI Commands</strong> -- orgx status, orgx sync
                </span>
              </li>
            </ul>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectSection title="System Architecture">
        <p className="text-lg mb-6">
          The plugin sits between agent hosts (Claude, Codex, Cursor) and the
          dashboard UI. Agent commands flow in through MCP, get queued in a
          SQLite-backed state machine, and stream out to the dashboard over SSE.
          Four background services keep everything healthy without manual
          intervention.
        </p>

        <MermaidDiagram
          title="Plugin Architecture"
          diagram={architectureDiagram}
          description="Agent hosts connect via the MCP bridge. The custom HTTP router dispatches to the task queue (SQLite-backed) and SSE stream. Background services handle sync, health checks, worker supervision, and task auto-continuation."
        />

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <ProjectCard variant="secondary">
            <h3 className="text-xl font-semibold mb-4 text-primary">
              Why SSE Over WebSocket
            </h3>
            <p>
              The dashboard only needs server-to-client push -- task state
              changes, activity events, decision requests. There is no case
              where the dashboard needs to push structured data back to the
              server (form submissions go through normal HTTP POST). SSE gives us
              that unidirectional stream without the complexity of WebSocket
              upgrade negotiation, which also means it works through corporate
              proxies and load balancers that sometimes block WebSocket upgrades.
              When SSE drops, polling takes over automatically.
            </p>
          </ProjectCard>

          <ProjectCard variant="secondary">
            <h3 className="text-xl font-semibold mb-4 text-primary">
              Why Zero Production Dependencies
            </h3>
            <p>
              The HTTP router is custom-built with no express, fastify, or other
              framework. This was a deliberate choice: the plugin runs inside a
              host process (OpenClaw), so every dependency is a potential version
              conflict. A zero-dep router means the plugin can be loaded into any
              host without worrying about transitive dependency trees. It also
              keeps the attack surface minimal for a process that listens on a
              local port.
            </p>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectSection title="Core Capabilities">
        <FeatureGrid features={features} columns={1} />
      </ProjectSection>

      <ProjectSection title="Offline-First Persistence">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h3
              className="text-2xl font-semibold mb-4"
              style={{ color: themeProps.colors.primary }}
            >
              Why SQLite for the Outbox
            </h3>
            <p className="text-lg mb-4">
              Agent orchestration is inherently unreliable. The gateway might be
              down, the network might drop, or the user might close their laptop
              mid-task. Every mutation -- entity creates, status transitions,
              activity emissions -- gets written to a local SQLite outbox before
              anything is sent over the network.
            </p>
            <p className="text-lg mb-4">
              When connectivity returns, the sync service replays the outbox in
              order. This means a developer can work on a plane, queue up a dozen
              task transitions, and have them all apply cleanly when they land.
              SQLite was chosen over a custom file format because it gives us
              ACID transactions, WAL mode for concurrent reads during writes, and
              a query interface for the dashboard to read queue state without
              parsing anything.
            </p>
          </div>
          <ProjectCard variant="accent">
            <h4 className="text-lg font-semibold mb-3 text-primary">
              Background Services
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2 bg-primary" />
                <span>
                  <strong>Sync Service</strong> -- runs every 5 minutes, replays
                  the outbox and pulls remote state
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2 bg-primary" />
                <span>
                  <strong>Gateway Watchdog</strong> -- monitors the connection to
                  the OrgX gateway and triggers fallback modes
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2 bg-primary" />
                <span>
                  <strong>Worker Supervisor</strong> -- detects stalled lanes
                  (BLOCKED or RATE_LIMITED) and restarts them
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2 bg-primary" />
                <span>
                  <strong>Auto-Continue Pipeline</strong> -- picks up tasks that
                  were RUNNING when the process last exited
                </span>
              </li>
            </ul>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectSection title="By the Numbers">
        <StatsDisplay stats={stats} className="mb-8" />

        <div className="grid md:grid-cols-2 gap-6">
          <ProjectCard variant="accent">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Scale of the Codebase
            </h3>
            <p>
              134K+ lines of TypeScript split roughly 45/55 between backend
              (custom router, state machine, MCP tool implementations, background
              services) and frontend (React dashboard with nine distinct panels).
              The backend has zero production dependencies. The dashboard uses
              React and TypeScript but no component library -- every panel is
              purpose-built for agent orchestration workflows.
            </p>
          </ProjectCard>

          <ProjectCard variant="highlight">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Development Trajectory
            </h3>
            <p>
              558 commits across the v0.7.x release line (currently v0.7.25),
              with active development on the task queue state machine, dashboard
              panels, and MCP tool surface. The plugin has grown from a simple
              status viewer into a full orchestration control plane with offline
              support, background services, and multi-agent bridging.
            </p>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectCTA
        githubUrl="https://github.com/hopeatina"
        title="Inspect the plugin architecture"
        description="This case study matters because it shows the interaction layer around agent systems: queueing, local control, resilience, dashboard review, and protocol-level bridging."
        note="The plugin is the connective tissue between abstract orchestration ideas and the actual surfaces a developer uses to supervise work."
      />
    </ProjectLayout>
  );
}
