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

const orchestrationDiagram = `
flowchart TB
  subgraph Event["Event layer"]
    A[Task event] --> B[Spawn guard]
    B --> C[Agent launched]
    C --> D[Workflow execution]
    D --> E[Quality gate]
  end

  subgraph Gov["Governance layer"]
    F[Trust tier] --> G[Capability gates]
    G --> H[Risk score]
    H --> I{Approval?}
    I -->|Yes| J[Human review]
    I -->|No| K[Autonomous action]
  end

  subgraph Intel["Intelligence layer"]
    L[Org memory] --> M[Composite scoring]
    M --> N[Outcome attribution]
    N --> O[Economic ledger]
  end

  E --> F
  J --> D
  K --> D
  O --> L
`;

export default function OrgXPage() {
  return (
    <>
      <Head>
        <title>OrgX | Hope Atina</title>
        <meta
          name="description"
          content="OrgX case study: multi-agent orchestration, trust governance, durable workflows, and review surfaces for autonomous systems."
        />
      </Head>

      <main id="main-content" className="page-frame">
        <div className="page-stack">
          <CaseStudyHero
            kicker="Case study 01"
            status="Ready for review"
            title="OrgX"
            subtitle="Continuity infrastructure for AI agents: persistent organizational memory, trust scoring, decision provenance, and MCP tooling across Claude Code, Cursor, and ChatGPT."
            description="OrgX is the clearest expression of how I think about agent infrastructure. Delegate aggressively, keep provenance visible, and make the review surface strong enough that human judgment can stay precise instead of becoming a bottleneck."
            facts={[
              { label: "Commits", value: "1,270+" },
              { label: "MCP tools", value: "61" },
              { label: "Tool categories", value: "16" },
              { label: "Platform repos", value: "12" },
              { label: "Benchmark tasks", value: "136+" },
              { label: "Public essays", value: "8" },
            ]}
            image="/images/projects/orgx-illustration.png"
            imageAlt="OrgX multi-agent orchestration illustration"
          />

          <BuildSurface
            items={[
              { label: "Frontend", value: "Next.js, React, TypeScript" },
              { label: "Workflow", value: "Inngest durable functions" },
              { label: "Data", value: "Supabase + PostgreSQL" },
              { label: "Observability", value: "PostHog, Sentry, OpenTelemetry" },
            ]}
          />

          <CaseStudySection
            kicker="01 // technical depth"
            title="The boring infrastructure choices that matter"
          >
            <CaseStudySplit
              media={
                <TerminalPanel
                  label="orgx-mcp internals"
                  lines={[
                    "auth",
                    "  OAuth 2.1 + PKCE",
                    "  dynamic client registration via POST /register",
                    "  no API keys in env — creds in Durable Object SQLite",
                    "",
                    "state",
                    "  Durable Objects for session isolation",
                    "  cross-deploy persistence across Worker restarts",
                    "  context[] JSON pointers on every entity",
                    "",
                    "registry",
                    "  Ed25519-signed domain verification",
                    "  automated release pipeline to Smithery",
                    "",
                    "transport",
                    "  HTTP streaming + SSE fallback",
                    "  MCP Apps widget rendering for compatible hosts",
                  ]}
                />
              }
            >
              <p>
                The public narrative around MCP today is &quot;connect a tool
                to a model.&quot; That&apos;s table stakes. The harder
                question is: how do you run an MCP server that production
                teams will actually trust with real organizational state?
              </p>
              <p>
                OrgX MCP is built on Cloudflare Workers + Durable Objects
                because session isolation, SQLite persistence, and
                cross-deploy state survival matter more than easy scaling.
                Auth uses OAuth 2.1 with dynamic client registration — no
                API keys, no shared secrets — because every serious MCP
                client is going to need this in six months anyway.
              </p>
              <CalloutList
                items={[
                  "OAuth 2.1 + PKCE + DCR: credentials never touch environment variables.",
                  "Durable Object SQLite: session and workspace state survive deploys.",
                  "Ed25519-signed registry: domain verification, automated release pipeline.",
                  "Context pointers, not embeds: entities reference URLs and other entities without payload bloat.",
                  "Inngest over Temporal: workflow durability without a separate orchestration cluster.",
                  "Supabase over custom backend: real-time subscriptions, auth, velocity — one system.",
                ]}
              />
            </CaseStudySplit>
          </CaseStudySection>

          <CaseStudySection kicker="02 // system frame" title="What the platform actually does" raised>
            <CaseStudySplit
              media={
                <TerminalPanel
                  label="trust tiers"
                  lines={[
                    "strict   -> read, analyze, propose; no mutation without approval",
                    "balanced -> low-risk mutation allowed; medium risk escalates",
                    "open     -> full autonomy inside tool and budget guardrails",
                    "",
                    "spawn guards",
                    "  max_agents_per_task: enforced",
                    "  budget_per_run: enforced",
                    "  human escalation: required for destructive actions",
                  ]}
                />
              }
            >
              <p>
                OrgX treats the organization, not the single prompt, as the
                primitive. Tasks turn into workflows. Agents become operating
                actors with tool access, trust boundaries, cost footprints, and
                quality history.
              </p>
              <p>
                The value is not just that the system can delegate. The value is
                that delegation stays legible: you can see what was routed,
                which tools were used, what quality bar was applied, and where a
                human stepped in.
              </p>
              <CalloutList
                items={[
                  "Spawn and route specialist agents without losing context.",
                  "Gate autonomy through trust tiers instead of hard-coded fear or blind freedom.",
                  "Carry decisions, learnings, and costs forward through org memory and outcome attribution.",
                ]}
              />
            </CaseStudySplit>
          </CaseStudySection>

          <CaseStudySection
            kicker="03 // architecture"
            title="Three layers keep the platform honest"
          >
            <DiagramFrame
              title="OrgX architecture"
              description="Events drive durable execution, governance decides what can happen next, and the intelligence layer records quality, cost, and memory."
              diagram={orchestrationDiagram}
            />
          </CaseStudySection>

          <CaseStudySection kicker="04 // visual proof" title="The product surface is part of the system" raised>
            <VisualFrame
              src="/images/case-studies/orgx-live.png"
              alt="OrgX command center dashboard"
              caption="Primary operator view: the command center that makes active work, review state, and orchestration legible."
            />
            <VisualFrame
              src="/images/case-studies/orgx-mcp-agent-status.png"
              alt="OrgX MCP agent status screen"
              caption="MCP proof surface showing agent status and system activity rather than abstract platform claims."
            />
          </CaseStudySection>

          <CaseStudySection
            kicker="05 // benchmark"
            title="Single-shot benchmarks hide what agents can't fake"
            raised
          >
            <CaseStudySplit
              media={
                <TerminalPanel
                  label="autonomous-initiative-benchmark"
                  lines={[
                    "tasks               136+",
                    "domains             7 (product, eng, ops, design, ...)",
                    "execution modes     3 (agent, api, cli)",
                    "judges              independent LLM panels",
                    "artifacts           task, judgment, cost, token logs",
                    "failure cases       published with human review notes",
                    "",
                    "methodology         useorgx.com/blog",
                    "next run            more inclusive — more models,",
                    "                    more domains, broader substrate",
                  ]}
                />
              }
            >
              <p>
                Most agent benchmarks are single-shot: one prompt, one model,
                one task. That structurally hides the thing that actually
                breaks in production — cascading context across sessions,
                tools, and time.
              </p>
              <p>
                The OrgX benchmark evaluates cross-session continuity,
                memory handoff, and decision provenance across real
                initiatives. Results, judgments, token costs, and failure
                cases are published openly.
              </p>
              <div className="hero-actions" style={{ marginTop: "1rem" }}>
                <a
                  href="https://useorgx.com/blog"
                  target="_blank"
                  rel="noreferrer"
                  className="site-link-inline"
                >
                  Read the methodology + published runs ↗
                </a>
              </div>
            </CaseStudySplit>
          </CaseStudySection>

          <CaseStudySection
            kicker="06 // ecosystem"
            title="12 repos, one coherent platform"
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "0.25rem 2rem",
                fontSize: "0.95rem",
              }}
            >
              <div>
                <p style={{ margin: "0.3rem 0" }}>
                  <a href="https://github.com/useorgx/orgx-mcp" target="_blank" rel="noreferrer" className="site-link-inline">
                    orgx-mcp ↗
                  </a>{" "}
                  <span style={{ color: "var(--shell-muted)" }}>
                    — 61 MCP tools · Cloudflare Workers + Durable Objects · OAuth 2.1 + DCR
                  </span>
                </p>
                <p style={{ margin: "0.3rem 0" }}>
                  <a href="https://github.com/useorgx/orgx-gateway-sdk" target="_blank" rel="noreferrer" className="site-link-inline">
                    orgx-gateway-sdk ↗
                  </a>{" "}
                  <span style={{ color: "var(--shell-muted)" }}>— Gateway Protocol v1 client SDK</span>
                </p>
                <p style={{ margin: "0.3rem 0" }}>
                  <a href="https://github.com/useorgx/openclaw-plugin" target="_blank" rel="noreferrer" className="site-link-inline">
                    openclaw-plugin ↗
                  </a>{" "}
                  <span style={{ color: "var(--shell-muted)" }}>— 30-tool MCP + browser mission control</span>
                </p>
                <p style={{ margin: "0.3rem 0" }}>
                  <a href="https://github.com/useorgx/orgx-claude-code-plugin" target="_blank" rel="noreferrer" className="site-link-inline">
                    orgx-claude-code-plugin ↗
                  </a>{" "}
                  <span style={{ color: "var(--shell-muted)" }}>— Claude Code runtime integration</span>
                </p>
                <p style={{ margin: "0.3rem 0" }}>
                  <a href="https://github.com/useorgx/cursor-plugin" target="_blank" rel="noreferrer" className="site-link-inline">
                    cursor-plugin ↗
                  </a>{" "}
                  <span style={{ color: "var(--shell-muted)" }}>— MCP, rules, skills, hooks, commands</span>
                </p>
                <p style={{ margin: "0.3rem 0" }}>
                  <a href="https://github.com/useorgx/orgx-codex-plugin" target="_blank" rel="noreferrer" className="site-link-inline">
                    orgx-codex-plugin ↗
                  </a>{" "}
                  <span style={{ color: "var(--shell-muted)" }}>— Codex + initiative-aware skills</span>
                </p>
              </div>
              <div>
                <p style={{ margin: "0.3rem 0" }}>
                  <a href="https://github.com/useorgx/orgx-opencode-plugin" target="_blank" rel="noreferrer" className="site-link-inline">
                    orgx-opencode-plugin ↗
                  </a>{" "}
                  <span style={{ color: "var(--shell-muted)" }}>— OpenCode peer driver</span>
                </p>
                <p style={{ margin: "0.3rem 0" }}>
                  <a href="https://github.com/useorgx/orgx-ui-kit" target="_blank" rel="noreferrer" className="site-link-inline">
                    orgx-ui-kit ↗
                  </a>{" "}
                  <span style={{ color: "var(--shell-muted)" }}>— React components + tokens</span>
                </p>
                <p style={{ margin: "0.3rem 0" }}>
                  <a href="https://github.com/useorgx/orgx-data" target="_blank" rel="noreferrer" className="site-link-inline">
                    orgx-data ↗
                  </a>{" "}
                  <span style={{ color: "var(--shell-muted)" }}>— typed contracts + React hooks</span>
                </p>
                <p style={{ margin: "0.3rem 0" }}>
                  <a href="https://github.com/useorgx/orgx-local-shell" target="_blank" rel="noreferrer" className="site-link-inline">
                    orgx-local-shell ↗
                  </a>{" "}
                  <span style={{ color: "var(--shell-muted)" }}>— Tauri 2 desktop app</span>
                </p>
                <p style={{ margin: "0.3rem 0" }}>
                  <a href="https://github.com/useorgx/skills" target="_blank" rel="noreferrer" className="site-link-inline">
                    skills ↗
                  </a>{" "}
                  <span style={{ color: "var(--shell-muted)" }}>— reusable agent skill library</span>
                </p>
                <p style={{ margin: "0.3rem 0" }}>
                  <a href="https://github.com/useorgx/autonomous-initiative-benchmark" target="_blank" rel="noreferrer" className="site-link-inline">
                    autonomous-initiative-benchmark ↗
                  </a>{" "}
                  <span style={{ color: "var(--shell-muted)" }}>— public methodology + catalog</span>
                </p>
              </div>
            </div>
          </CaseStudySection>

          <CaseStudySection
            kicker="07 // try it"
            title="Install OrgX MCP in a compatible client"
            raised
          >
            <CaseStudySplit
              media={
                <TerminalPanel
                  label="install"
                  lines={[
                    "# Smithery (recommended)",
                    "npx @smithery/cli install @useorgx/orgx-mcp --client claude",
                    "",
                    "# Direct MCP config",
                    "{",
                    '  "mcpServers": {',
                    '    "orgx": {',
                    '      "url": "https://mcp.useorgx.com"',
                    "    }",
                    "  }",
                    "}",
                  ]}
                />
              }
            >
              <p>
                The MCP server exposes 61 tools for org memory, planning,
                decisions, scoring, and workspace management. It works in
                Claude Desktop, Claude Code, Cursor, and any compatible
                MCP client.
              </p>
              <p>
                Dynamic client registration handles auth. Durable Objects
                handle state survival across deploys. You get working
                context in the first session.
              </p>
              <div className="hero-actions" style={{ marginTop: "1rem" }}>
                <a
                  href="https://mcp.useorgx.com"
                  target="_blank"
                  rel="noreferrer"
                  className="site-link-inline"
                >
                  mcp.useorgx.com ↗
                </a>
                <a
                  href="https://smithery.ai/server/@useorgx/orgx-mcp"
                  target="_blank"
                  rel="noreferrer"
                  className="site-link-inline"
                >
                  View on Smithery ↗
                </a>
              </div>
            </CaseStudySplit>
          </CaseStudySection>

          <CaseStudyEndcap
            title="OrgX is the system I’d build again from scratch tomorrow."
            body={
              <>
                <p>
                  If you&apos;re hiring for agent infrastructure, agent
                  platforms, AI developer productivity, or MCP tooling — this
                  is a preview of the work I&apos;ll ship on your team from
                  day one.
                </p>
              </>
            }
            primaryHref="/hiring"
            primaryLabel="For hiring managers"
            secondaryHref="https://useorgx.com"
            secondaryLabel="View live platform"
          />
        </div>
      </main>
    </>
  );
}
