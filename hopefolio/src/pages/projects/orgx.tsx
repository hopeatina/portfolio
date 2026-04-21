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
import NextProjectNav from "@/components/site/NextProjectNav";
import RevealOnScroll from "@/components/site/RevealOnScroll";

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
            image="/images/case-studies/orgx-live.png"
            imageAlt="OrgX live command center — real product surface, not a marketing illustration"
            materialize="page"
            materializeDirection="left-right"
            materializeKey="orgx"
          />

          <section
            aria-label="Install quickstart"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "1rem",
              padding: "0.85rem 1.25rem",
              borderRadius: "12px",
              border: "1px solid rgba(0, 229, 160, 0.22)",
              background:
                "linear-gradient(180deg, rgba(0, 229, 160, 0.05), rgba(0, 229, 160, 0.02))",
              fontSize: "0.92rem",
            }}
          >
            <span
              className="eyebrow"
              style={{ fontSize: "0.72rem", letterSpacing: "0.14em" }}
            >
              Install
            </span>
            <code
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--shell-text)",
                background: "rgba(0,0,0,0.35)",
                padding: "0.3rem 0.7rem",
                borderRadius: "6px",
                fontSize: "0.85rem",
                flex: "1 1 auto",
                minWidth: "0",
                overflowX: "auto",
                whiteSpace: "nowrap",
              }}
            >
              npx @smithery/cli install @useorgx/orgx-mcp --client claude
            </code>
            <a
              href="https://smithery.ai/server/@useorgx/orgx-mcp"
              target="_blank"
              rel="noreferrer"
              className="site-link-inline"
              style={{ whiteSpace: "nowrap" }}
            >
              View on Smithery ↗
            </a>
          </section>

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
              src="/images/case-studies/orgx-agents.png"
              alt="OrgX live — the full agents grid and next-up queue with named specialists, activity timeline, and queued decisions"
              caption="Production density: 6 named specialist agents (Mark, OrgX, Eli, Holt, Claude Code, Kimi), activity timeline with 20+ blocked and 1 decisions, and a next-up queue with plugin packaging, ads campaigns, and account management. The product surface earns the &ldquo;live&rdquo; label."
            />
            <VisualFrame
              src="/images/case-studies/orgx-mcp-agent-status.png"
              alt="OrgX MCP agent status screen"
              caption="MCP proof surface showing agent status and system activity rather than abstract platform claims."
            />
          </CaseStudySection>

          <CaseStudySection
            kicker="05 // widgets"
            title="Six production MCP Apps widgets — UI that renders inside any MCP host"
          >
            <p style={{ margin: "0 0 0.75rem", maxWidth: "44rem", color: "var(--shell-text-soft)" }}>
              Every OrgX widget ships typed data contracts, demo / loading /
              empty states, and SSR-safe rendering so an MCP host can embed
              them in a chat surface or dashboard without custom code. These
              are real demos, served live at{" "}
              <a
                href="https://mcp.useorgx.com/widgets/index.html"
                target="_blank"
                rel="noreferrer"
                className="site-link-inline"
              >
                mcp.useorgx.com/widgets ↗
              </a>
              .
            </p>
            <RevealOnScroll
              as="div"
              className="materialize-stagger"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {[
                {
                  src: "/images/case-studies/widgets/initiative-pulse.png",
                  title: "Initiative Pulse",
                  caption:
                    "Health, ROI, and blockers in a single conversational card. 78 health score, +431% ROI, 1 blocker surfaced with resolution path.",
                  href: "https://mcp.useorgx.com/widgets/initiative-pulse.html?demo=true",
                },
                {
                  src: "/images/case-studies/widgets/agent-status.png",
                  title: "Agent Status",
                  caption:
                    "Live status of every specialist agent. Current focus, tasks in flight, blocked/review signals, and the &ldquo;needs you&rdquo; prompts that drive human review.",
                  href: "https://mcp.useorgx.com/widgets/agent-status.html?demo=true",
                },
                {
                  src: "/images/case-studies/widgets/morning-brief.png",
                  title: "Morning Brief",
                  caption:
                    "Daily executive summary. Top priorities by domain, decisions made, receipts, and what needs attention — generated and citable.",
                  href: "https://mcp.useorgx.com/widgets/morning-brief.html?demo=true",
                },
                {
                  src: "/images/case-studies/widgets/decisions.png",
                  title: "Pending Decisions",
                  caption:
                    "Interactive approval surface with approve / revise actions, cost estimates, and countdown-to-auto-approve. The UI that closes the human-in-the-loop.",
                  href: "https://mcp.useorgx.com/widgets/decisions.html?demo=true",
                },
                {
                  src: "/images/case-studies/widgets/scaffolded-initiative.png",
                  title: "Scaffolded Initiative",
                  caption:
                    "Work-breakdown structure rendered from a typed scaffold event. Workstreams, milestones, and tasks with live status badges and owners.",
                  href: "https://mcp.useorgx.com/widgets/scaffolded-initiative.html?demo=true",
                },
                {
                  src: "/images/case-studies/widgets/search-results.png",
                  title: "Search Results",
                  caption:
                    "Unified retrieval across artifacts, decisions, and initiatives with relevance scores. The shape of memory, visible.",
                  href: "https://mcp.useorgx.com/widgets/search-results.html?demo=true",
                },
              ].map((w) => (
                <a
                  key={w.title}
                  href={w.href}
                  target="_blank"
                  rel="noreferrer"
                  data-materialize
                  style={{
                    display: "grid",
                    gap: "0.7rem",
                    padding: "0.9rem",
                    borderRadius: "14px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.02)",
                    textDecoration: "none",
                    color: "inherit",
                    transition: "border-color 200ms ease, background 200ms ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0, 229, 160, 0.45)";
                    e.currentTarget.style.background = "rgba(0, 229, 160, 0.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      aspectRatio: "560 / 760",
                      overflow: "hidden",
                      borderRadius: "10px",
                      background: "rgba(0,0,0,0.3)",
                    }}
                  >
                    <img
                      src={w.src}
                      alt={`${w.title} widget demo`}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "top",
                        display: "block",
                      }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.05rem",
                        fontWeight: 600,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {w.title}{" "}
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--shell-muted)",
                          fontWeight: 400,
                        }}
                      >
                        ↗
                      </span>
                    </div>
                    <p
                      style={{
                        margin: "0.35rem 0 0",
                        color: "var(--shell-text-soft)",
                        fontSize: "0.88rem",
                        lineHeight: 1.5,
                      }}
                      dangerouslySetInnerHTML={{ __html: w.caption }}
                    />
                  </div>
                </a>
              ))}
            </RevealOnScroll>
          </CaseStudySection>

          <CaseStudySection
            kicker="06 // benchmark"
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
            kicker="07 // ecosystem"
            title="12 repos, one coherent platform"
          >
            <RevealOnScroll
              as="div"
              className="materialize-stagger-grid"
            >
              <div
                className="materialize-stagger"
                style={{ margin: 0 }}
              >
                <p style={{ margin: "0.3rem 0" }} data-materialize>
                  <a href="https://github.com/useorgx/orgx-mcp" target="_blank" rel="noreferrer" className="site-link-inline">
                    orgx-mcp ↗
                  </a>{" "}
                  <span style={{ color: "var(--shell-muted)" }}>
                    — 61 MCP tools · Cloudflare Workers + Durable Objects · OAuth 2.1 + DCR
                  </span>
                </p>
                <p style={{ margin: "0.3rem 0" }} data-materialize>
                  <a href="https://github.com/useorgx/orgx-gateway-sdk" target="_blank" rel="noreferrer" className="site-link-inline">
                    orgx-gateway-sdk ↗
                  </a>{" "}
                  <span style={{ color: "var(--shell-muted)" }}>— Gateway Protocol v1 client SDK</span>
                </p>
                <p style={{ margin: "0.3rem 0" }} data-materialize>
                  <a href="https://github.com/useorgx/openclaw-plugin" target="_blank" rel="noreferrer" className="site-link-inline">
                    openclaw-plugin ↗
                  </a>{" "}
                  <span style={{ color: "var(--shell-muted)" }}>— 30-tool MCP + browser mission control</span>
                </p>
                <p style={{ margin: "0.3rem 0" }} data-materialize>
                  <a href="https://github.com/useorgx/orgx-claude-code-plugin" target="_blank" rel="noreferrer" className="site-link-inline">
                    orgx-claude-code-plugin ↗
                  </a>{" "}
                  <span style={{ color: "var(--shell-muted)" }}>— Claude Code runtime integration</span>
                </p>
                <p style={{ margin: "0.3rem 0" }} data-materialize>
                  <a href="https://github.com/useorgx/cursor-plugin" target="_blank" rel="noreferrer" className="site-link-inline">
                    cursor-plugin ↗
                  </a>{" "}
                  <span style={{ color: "var(--shell-muted)" }}>— MCP, rules, skills, hooks, commands</span>
                </p>
                <p style={{ margin: "0.3rem 0" }} data-materialize>
                  <a href="https://github.com/useorgx/orgx-codex-plugin" target="_blank" rel="noreferrer" className="site-link-inline">
                    orgx-codex-plugin ↗
                  </a>{" "}
                  <span style={{ color: "var(--shell-muted)" }}>— Codex + initiative-aware skills</span>
                </p>
              </div>
              <div
                className="materialize-stagger"
                style={{ margin: 0 }}
              >
                <p style={{ margin: "0.3rem 0" }} data-materialize>
                  <a href="https://github.com/useorgx/orgx-opencode-plugin" target="_blank" rel="noreferrer" className="site-link-inline">
                    orgx-opencode-plugin ↗
                  </a>{" "}
                  <span style={{ color: "var(--shell-muted)" }}>— OpenCode peer driver</span>
                </p>
                <p style={{ margin: "0.3rem 0" }} data-materialize>
                  <a href="https://github.com/useorgx/orgx-ui-kit" target="_blank" rel="noreferrer" className="site-link-inline">
                    orgx-ui-kit ↗
                  </a>{" "}
                  <span style={{ color: "var(--shell-muted)" }}>— React components + tokens</span>
                </p>
                <p style={{ margin: "0.3rem 0" }} data-materialize>
                  <a href="https://github.com/useorgx/orgx-data" target="_blank" rel="noreferrer" className="site-link-inline">
                    orgx-data ↗
                  </a>{" "}
                  <span style={{ color: "var(--shell-muted)" }}>— typed contracts + React hooks</span>
                </p>
                <p style={{ margin: "0.3rem 0" }} data-materialize>
                  <a href="https://github.com/useorgx/orgx-local-shell" target="_blank" rel="noreferrer" className="site-link-inline">
                    orgx-local-shell ↗
                  </a>{" "}
                  <span style={{ color: "var(--shell-muted)" }}>— Tauri 2 desktop app</span>
                </p>
                <p style={{ margin: "0.3rem 0" }} data-materialize>
                  <a href="https://github.com/useorgx/skills" target="_blank" rel="noreferrer" className="site-link-inline">
                    skills ↗
                  </a>{" "}
                  <span style={{ color: "var(--shell-muted)" }}>— reusable agent skill library</span>
                </p>
                <p style={{ margin: "0.3rem 0" }} data-materialize>
                  <a href="https://github.com/useorgx/autonomous-initiative-benchmark" target="_blank" rel="noreferrer" className="site-link-inline">
                    autonomous-initiative-benchmark ↗
                  </a>{" "}
                  <span style={{ color: "var(--shell-muted)" }}>— public methodology + catalog</span>
                </p>
              </div>
            </RevealOnScroll>
          </CaseStudySection>

          <CaseStudySection
            kicker="08 // try it"
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

          <NextProjectNav currentSlug="orgx" />
        </div>
      </main>
    </>
  );
}
