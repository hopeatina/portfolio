import Head from "next/head";
import React from "react";
import {
  BuildSurface,
  CalloutList,
  CaseStudyEndcap,
  CaseStudyHero,
  CaseStudySection,
  CaseStudySplit,
  DiagramFrame,
  TerminalPanel,
  VisualFrame,
} from "@/components/site/CaseStudyPrimitives";

const architectureDiagram = `
flowchart TB
  subgraph Hosts["Agent hosts"]
    A1[Claude CLI] --> MCP["/orgx/mcp"]
    A2[Codex] --> MCP
    A3[Cursor] --> MCP
  end

  subgraph Plugin["Plugin core"]
    MCP --> TR[HTTP router]
    TR --> TQ[Task queue state machine]
    TR --> SSE[SSE + polling fallback]
    TQ --> SQ[SQLite outbox]
  end

  subgraph Background["Background services"]
    B1[Sync service] --> SQ
    B2[Watchdog] --> TR
    B3[Worker supervisor] --> TQ
    B4[Auto-continue] --> TQ
  end

  subgraph UI["Dashboard @ :18789/orgx/live"]
    SSE --> D1[Mission Control]
    SSE --> D2[Next Up]
    SSE --> D3[Activity]
    SSE --> D4[Decision Queue]
    SSE --> D5[Session Inspector]
  end
`;

export default function OpenClawPage() {
  return (
    <>
      <Head>
        <title>OpenClaw | Hope Atina</title>
        <meta
          name="description"
          content="OpenClaw case study: plugin architecture, MCP bridge, task queue state machine, SSE dashboard, and offline-first agent workflow control."
        />
      </Head>

      <main id="main-content" className="page-frame">
        <div className="page-stack">
          <CaseStudyHero
            kicker="Case study 04"
            status="Experimental"
            title="OpenClaw"
            subtitle="Plugin architecture for agent workflow control, not another standalone orchestration toy."
            description="OpenClaw matters because it makes existing tools better instead of asking users to adopt yet another dashboard from scratch. The plugin inherits the host environment, adds a local MCP bridge, and exposes a browser-native mission control for active agent work."
            facts={[
              { label: "Commits", value: "558" },
              { label: "MCP tools", value: "30" },
              { label: "Persistence", value: "SQLite outbox" },
              { label: "Streaming", value: "SSE + polling fallback" },
            ]}
            image="/images/case-studies/openclaw-dashboard.png"
            imageAlt="OpenClaw full dashboard screenshot"
          />

          <BuildSurface
            items={[
              { label: "Runtime", value: "TypeScript" },
              { label: "Transport", value: "SSE + polling fallback" },
              { label: "Persistence", value: "SQLite outbox" },
              { label: "Agent layer", value: "MCP bridge + CLI integration" },
            ]}
          />

          <CaseStudySection kicker="01 // why plugin" title="Why this had to live inside another tool">
            <CaseStudySplit
              media={
                <TerminalPanel
                  label="/orgx/mcp"
                  lines={[
                    "claude  -> ~/.claude/mcp.json auto-configured",
                    "codex   -> ~/.codex/config.toml auto-configured",
                    "cursor  -> ~/.cursor/mcp.json auto-configured",
                    "",
                    "single local bridge, single auth story, shared lifecycle",
                  ]}
                />
              }
            >
              <p>
                A standalone orchestration app would have needed its own auth,
                process management, lifecycle handling, and deployment story.
                The plugin avoids that tax by inheriting the host app&apos;s
                environment and focusing only on the orchestration value.
              </p>
              <p>
                The result is a smaller adoption ask: make the tool people
                already use better, then add the control surface they were
                missing.
              </p>
            </CaseStudySplit>
          </CaseStudySection>

          <CaseStudySection kicker="02 // architecture" title="A survivable workflow stack" raised>
            <DiagramFrame
              title="OpenClaw plugin flow"
              description="Agent hosts connect through one MCP bridge, the plugin manages queue state and streaming, and the dashboard stays current through SSE with a polling fallback."
              diagram={architectureDiagram}
            />
          </CaseStudySection>

          <CaseStudySection kicker="03 // dashboard proof" title="The interface shows why the architecture matters">
            <VisualFrame
              src="/images/case-studies/openclaw-dashboard.png"
              alt="OpenClaw full nine-panel dashboard"
              caption="The full dashboard: mission control, next-up queue, activity timeline, decisions, and live system state in one place."
            />
            <VisualFrame
              src="/images/case-studies/openclaw-mission-control.png"
              alt="OpenClaw mission control panel"
              caption="Mission control detail view, where hierarchy and next actions stay visible instead of collapsing into log noise."
            />
          </CaseStudySection>

          <CaseStudySection kicker="04 // resilience" title="State machines and fallbacks keep the UI from lying" raised>
            <CaseStudySplit
              media={
                <CalloutList
                  items={[
                    "Task states are enforced by the state machine, not by scattered conventions.",
                    "SQLite outbox preserves mutations offline and replays them when the gateway reconnects.",
                    "SSE is primary, polling is backup, so the dashboard never goes blind when streaming drops.",
                  ]}
                />
              }
            >
              <p>
                This is the part that matters most in practice. The value of the
                dashboard disappears immediately if it shows stale or partial
                truth. The queue model, outbox, and transport fallback exist so
                the interface can stay trustworthy under failure, not just under
                demos.
              </p>
            </CaseStudySplit>
          </CaseStudySection>

          <CaseStudyEndcap
            title="The value of a plugin is that you don’t have to convince anyone to adopt a new tool."
            body={
              <>
                <p>
                  You just make the tool they already use better. That is the
                  architectural instinct I wanted this project to make obvious.
                </p>
              </>
            }
            primaryHref="https://github.com/hopeatina/orgx-openclaw-plugin"
            primaryLabel="View source"
            secondaryHref="/projects/orgx"
            secondaryLabel="Read about OrgX"
          />
        </div>
      </main>
    </>
  );
}
