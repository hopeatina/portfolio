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
            subtitle="The flagship platform: multi-agent orchestration, trust governance, and proof-first operator surfaces."
            description="OrgX is the clearest expression of how I think about agent infrastructure. Delegate aggressively, keep provenance visible, and make the review surface strong enough that human judgment can stay precise instead of becoming a bottleneck."
            facts={[
              { label: "Commits", value: "1,270+" },
              { label: "MCP servers", value: "22" },
              { label: "Tools", value: "131+" },
              { label: "Workflow layer", value: "47+ durable functions" },
            ]}
            image="/images/case-studies/orgx-live.png"
            imageAlt="OrgX live platform interface"
          />

          <BuildSurface
            items={[
              { label: "Frontend", value: "Next.js, React, TypeScript" },
              { label: "Workflow", value: "Inngest durable functions" },
              { label: "Data", value: "Supabase + PostgreSQL" },
              { label: "Observability", value: "PostHog, Sentry, OpenTelemetry" },
            ]}
          />

          <CaseStudySection kicker="01 // system frame" title="What the platform actually does">
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
            kicker="02 // architecture"
            title="Three layers keep the platform honest"
            raised
          >
            <DiagramFrame
              title="OrgX architecture"
              description="Events drive durable execution, governance decides what can happen next, and the intelligence layer records quality, cost, and memory."
              diagram={orchestrationDiagram}
            />
          </CaseStudySection>

          <CaseStudySection kicker="03 // visual proof" title="The product surface is part of the system">
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
            kicker="04 // decisions"
            title="The important architecture choices"
            raised
          >
            <CaseStudySplit
              media={
                <CalloutList
                  items={[
                    "Inngest over Temporal to keep workflow durability without running separate orchestration infrastructure.",
                    "Supabase over a custom backend to get real-time subscriptions, auth boundaries, and velocity in one system.",
                    "MCP as the protocol layer so tools are discoverable and portable across clients instead of rewritten per runtime.",
                  ]}
                />
              }
            >
              <p>
                These choices are pragmatic, not theoretical. They favor a solo
                builder&apos;s ability to ship and observe the system without
                drowning in platform maintenance before the product proves
                itself.
              </p>
              <p>
                The throughline is the same one I want in my next role: build
                the substrate that makes autonomy trustworthy, then build the
                operator surface that proves it.
              </p>
            </CaseStudySplit>
          </CaseStudySection>

          <CaseStudyEndcap
            title="OrgX is the system I’d build again from scratch tomorrow."
            body={
              <>
                <p>
                  If you&apos;re hiring for agent infrastructure, this is the
                  work I want to do next: orchestration, governance,
                  observability, and the interface layer that makes serious
                  automation usable.
                </p>
              </>
            }
            primaryHref="/contact"
            primaryLabel="Get in touch"
            secondaryHref="https://useorgx.com"
            secondaryLabel="View live platform"
          />
        </div>
      </main>
    </>
  );
}
