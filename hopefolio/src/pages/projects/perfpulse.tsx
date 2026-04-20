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
} from "@/components/site/CaseStudyPrimitives";

const architectureDiagram = `
flowchart TB
  subgraph Collection["Data collection"]
    A[sysinfo] --> B[Rust core]
    B --> C[Process metrics]
    B --> D[System stats]
    B --> E[History store]
  end

  subgraph Interfaces["Operator surfaces"]
    F[CLI via clap]
    G[Web dashboard via Axum]
    H[TUI via crossterm]
  end

  subgraph Intelligence["Optional AI layer"]
    I[Process knowledge base]
    J[Claude explanations]
    K[LRU cache]
  end

  C --> F
  C --> G
  C --> H
  D --> F
  D --> G
  D --> H
  C --> J
  J --> K
  I --> F
  I --> G
`;

function DashboardSurface() {
  return (
    <div className="contact-card" style={{ padding: "1.5rem" }}>
      <span className="eyebrow">Web dashboard</span>
      <h3 style={{ margin: "0.4rem 0 1rem", fontFamily: "var(--font-heading)", fontSize: "1.7rem" }}>
        One Rust binary, three operator surfaces
      </h3>
      <div style={{ display: "grid", gap: "0.9rem" }}>
        <div
          style={{
            border: "1px solid var(--shell-border)",
            borderRadius: "18px",
            padding: "1rem",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          <div className="proof-bar">
            <span>127.0.0.1:3847</span>
            <span>meeting mode</span>
            <span>historical charts</span>
          </div>
          <div style={{ display: "grid", gap: "0.5rem", marginTop: "1rem" }}>
            {[78, 62, 41, 83].map((value) => (
              <div key={value} style={{ display: "grid", gap: "0.35rem" }}>
                <div className="eyebrow" style={{ letterSpacing: "0.06em" }}>
                  {value === 78
                    ? "CPU"
                    : value === 62
                      ? "Memory"
                      : value === 41
                        ? "Battery"
                        : "Score"}
                </div>
                <div
                  style={{
                    height: "10px",
                    background: "rgba(255,255,255,0.07)",
                    borderRadius: "999px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${value}%`,
                      height: "100%",
                      background: "linear-gradient(90deg, var(--shell-accent), rgba(0,229,160,0.35))",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PerfPulsePage() {
  return (
    <>
      <Head>
        <title>PerfPulse | Hope Atina</title>
        <meta
          name="description"
          content="PerfPulse case study: Rust system monitor with CLI, TUI, Axum dashboard, Homebrew distribution, and Claude-assisted process explanations."
        />
      </Head>

      <main id="main-content" className="page-frame">
        <div className="page-stack">
          <CaseStudyHero
            kicker="Case study 03"
            status="Live tool"
            title="PerfPulse"
            subtitle="A utility-grade developer tool with real install paths, real runtime constraints, and three usable interfaces."
            description="PerfPulse started as a fix for a slow video call and turned into a product lesson: distribution is part of the feature. The project proves I can build tooling that feels fast, ships cleanly, and respects the system it is inspecting."
            facts={[
              { label: "Language", value: "Rust" },
              { label: "Operator surfaces", value: "CLI + web + TUI" },
              { label: "Distribution", value: "Homebrew" },
              { label: "Binary", value: "3.3 MiB" },
            ]}
          />

          <BuildSurface
            items={[
              { label: "Language", value: "Rust 2021" },
              { label: "Web", value: "Axum + inline HTML" },
              { label: "Terminal", value: "crossterm" },
              { label: "Distribution", value: "GitHub Actions + Homebrew" },
            ]}
          />

          <CaseStudySection kicker="01 // origin" title="Why this tool exists">
            <CaseStudySplit
              media={
                <TerminalPanel
                  label="perf-pulse top"
                  lines={[
                    "PID    CPU%   MEM%   PROCESS",
                    "4289   43.1   12.8   Docker Desktop",
                    "1884   26.4    8.1   Slack",
                    "9192   18.7    6.3   vite dev server",
                    "",
                    "recommendation -> enable meeting mode to pause heavy background processes",
                  ]}
                />
              }
            >
              <p>
                Activity Monitor could tell me what was hurting my machine, but
                it could not act on the insight. PerfPulse closes that gap: it
                shows the state, explains the state, and gives you a next step
                that respects developer reality.
              </p>
              <p>
                The design constraint was simple: if the monitoring tool is
                itself heavy, it has already failed. That is why Rust, small
                binaries, and minimal runtime overhead mattered from the start.
              </p>
            </CaseStudySplit>
          </CaseStudySection>

          <CaseStudySection kicker="02 // architecture" title="One core, three interfaces" raised>
            <DiagramFrame
              title="PerfPulse architecture"
              description="The same Rust core powers a CLI, a local web dashboard, and a tiny TUI, with optional Claude explanations layered on top."
              diagram={architectureDiagram}
            />
          </CaseStudySection>

          <CaseStudySection kicker="03 // product surface" title="Distribution made the project real">
            <CaseStudySplit media={<DashboardSurface />}>
              <p>
                The CLI is the primary surface. The Axum dashboard exists
                because some signals deserve charts. The TUI exists because
                sometimes the right answer is to stay in the terminal. Together
                they make the tool feel complete instead of clever.
              </p>
              <CalloutList
                items={[
                  "Meeting mode pauses heavyweight background processes before a call, then resumes them later.",
                  "Claude explanations add context when process names are opaque instead of pretending AI is the whole product.",
                  "The dashboard stays inside the Rust binary, which keeps install and deployment complexity low.",
                ]}
              />
            </CaseStudySplit>
          </CaseStudySection>

          <CaseStudySection kicker="04 // install path" title="Homebrew is not a bonus feature" raised>
            <TerminalPanel
              label="distribution"
              lines={[
                "$ brew tap hopeatina/perf-pulse",
                "$ brew install perf-pulse",
                "$ perf-pulse serve",
                "",
                "launches local dashboard at http://127.0.0.1:3847",
              ]}
            />
          </CaseStudySection>

          <CaseStudyEndcap
            title="Distribution is the feature."
            body={
              <>
                <p>
                  A tool nobody can install is a tool nobody uses. PerfPulse is
                  strongest when judged like a real utility product: install
                  path, runtime footprint, and operator clarity.
                </p>
              </>
            }
            shellLine="$ brew install hopeatina/perf-pulse/perf-pulse"
            primaryHref="https://github.com/hopeatina/perf-pulse"
            primaryLabel="View source"
            secondaryHref="https://perf-pulse-web.vercel.app"
            secondaryLabel="Try the web dashboard"
          />
        </div>
      </main>
    </>
  );
}
