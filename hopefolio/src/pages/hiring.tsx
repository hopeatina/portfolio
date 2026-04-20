import Head from "next/head";
import Link from "next/link";
import React from "react";
import SiteButton from "@/components/site/SiteButton";

export default function Hiring() {
  return (
    <>
      <Head>
        <title>For hiring managers | Hope Atina</title>
        <meta
          name="description"
          content="60-second brief for hiring managers at agent platforms, AI developer productivity, MCP infrastructure, and evals/observability teams."
        />
      </Head>

      <main id="main-content" className="page-frame">
        <div className="page-stack">
          <section className="page-header-stack" style={{ paddingTop: "2rem" }}>
            <span className="eyebrow">For hiring managers · 60-second brief</span>
            <h1>If you&apos;re building agent infrastructure, I&apos;m already shipping it.</h1>
            <p className="lead-copy" style={{ maxWidth: "44rem", margin: 0 }}>
              I&apos;m a senior software engineer with 7+ years in production
              systems across healthtech compliance, fintech data platforms,
              and AI-native products. Currently building OrgX — continuity
              infrastructure for AI agents with persistent organizational
              memory, trust scoring, decision provenance, and MCP tooling
              across Claude Code, Cursor, and ChatGPT.
            </p>
            <div className="proof-bar" style={{ marginTop: "1rem" }}>
              <span>61 MCP tools · 16 categories</span>
              <span>136+ benchmark tasks</span>
              <span>999 HIPAA commits · 20% fewer prod errors at Alma</span>
              <span>93% bug reduction via API re-arch at Vessel</span>
            </div>
            <div className="proof-bar" style={{ marginTop: "0.4rem", fontSize: "0.85rem" }}>
              <span>Role target: Senior or Staff IC</span>
              <span>Based: Houston, TX · remote-friendly</span>
              <span>Open to: hybrid SF, NYC, Seattle</span>
              <span>Availability: 4-week start</span>
            </div>
          </section>

          <section className="page-content">
            <div className="page-header-stack" style={{ gap: "0.8rem" }}>
              <span className="eyebrow">Strongest fit</span>
              <h2>Teams where OrgX looks like a preview of what you&apos;re building</h2>
              <p style={{ maxWidth: "42rem", margin: 0 }}>
                Agent platforms. AI developer productivity. MCP infrastructure
                and security. Evals and observability. Forward-deployed
                engineering at AI labs. Anywhere memory, trust, and provenance
                are first-class concerns.
              </p>
            </div>
            <div className="work-grid-supporting">
              <article className="contact-card">
                <div className="eyebrow">Proof #1 · Flagship platform</div>
                <h3 style={{ margin: "0.35rem 0 0", fontFamily: "var(--font-heading)", fontSize: "1.5rem" }}>
                  OrgX
                </h3>
                <p style={{ margin: "0.7rem 0 0", color: "var(--shell-text-soft)" }}>
                  12-repo platform. 61 MCP tools across 16 categories. OAuth 2.1
                  + PKCE + DCR. Durable Objects for cross-deploy state.
                  Ed25519-signed registry. Live at mcp.useorgx.com and listed
                  on Smithery.
                </p>
                <p style={{ marginTop: "0.8rem" }}>
                  <Link href="/projects/orgx" className="site-link-inline">Read the case study →</Link>
                </p>
              </article>
              <article className="contact-card">
                <div className="eyebrow">Proof #2 · Public methodology</div>
                <h3 style={{ margin: "0.35rem 0 0", fontFamily: "var(--font-heading)", fontSize: "1.5rem" }}>
                  Autonomous Initiative Benchmark
                </h3>
                <p style={{ margin: "0.7rem 0 0", color: "var(--shell-text-soft)" }}>
                  136+ tasks across 7 domains and 3 execution modes.
                  Independent judges. Published artifacts, token-level costs,
                  and failure cases with human review notes.
                </p>
                <p style={{ marginTop: "0.8rem" }}>
                  <a href="https://useorgx.com/blog" target="_blank" rel="noreferrer" className="site-link-inline">
                    Read methodology + results ↗
                  </a>
                </p>
              </article>
              <article className="contact-card">
                <div className="eyebrow">Proof #3 · Production AI</div>
                <h3 style={{ margin: "0.35rem 0 0", fontFamily: "var(--font-heading)", fontSize: "1.5rem" }}>
                  Alma — Quality Enablement
                </h3>
                <p style={{ margin: "0.7rem 0 0", color: "var(--shell-text-soft)" }}>
                  Compliance systems, Datadog MCP integration for AI tooling
                  adoption, Celery-based reassessment workflows in a HIPAA
                  environment. 999 commits across 7 major feature areas.
                </p>
                <p style={{ marginTop: "0.8rem" }}>
                  <Link href="/projects/alma" className="site-link-inline">Read the case study →</Link>
                </p>
              </article>
            </div>
          </section>

          <section className="page-content">
            <div className="page-header-stack" style={{ gap: "0.8rem" }}>
              <span className="eyebrow">Signal · what makes this a strong bet</span>
              <h2>Six reasons this résumé is worth a conversation</h2>
            </div>
            <div className="work-grid-supporting">
              <article className="contact-card">
                <h3 style={{ margin: 0, fontFamily: "var(--font-heading)", fontSize: "1.2rem" }}>
                  I&apos;ve built it, not just used it
                </h3>
                <p style={{ margin: "0.5rem 0 0", color: "var(--shell-text-soft)" }}>
                  Production MCP server with OAuth 2.1 + DCR. Most candidates
                  list &quot;MCP&quot; as a keyword. I ship a server that
                  other MCP servers should look at.
                </p>
              </article>
              <article className="contact-card">
                <h3 style={{ margin: 0, fontFamily: "var(--font-heading)", fontSize: "1.2rem" }}>
                  I ship and write
                </h3>
                <p style={{ margin: "0.5rem 0 0", color: "var(--shell-text-soft)" }}>
                  8 technical essays published on OrgX. One shows up in every
                  conversation I have with agent-platform engineers at labs.
                </p>
              </article>
              <article className="contact-card">
                <h3 style={{ margin: 0, fontFamily: "var(--font-heading)", fontSize: "1.2rem" }}>
                  I run real benchmarks
                </h3>
                <p style={{ margin: "0.5rem 0 0", color: "var(--shell-text-soft)" }}>
                  136+ tasks with independent judges and published artifacts.
                  Most teams building agents don&apos;t have a harness this
                  rigorous internally.
                </p>
              </article>
              <article className="contact-card">
                <h3 style={{ margin: 0, fontFamily: "var(--font-heading)", fontSize: "1.2rem" }}>
                  I carry regulated-system judgment
                </h3>
                <p style={{ margin: "0.5rem 0 0", color: "var(--shell-text-soft)" }}>
                  HIPAA at Alma. Regulated financial data at Capital One.
                  I know how to ship AI in environments where &quot;move fast
                  and break things&quot; is a fireable offense.
                </p>
              </article>
              <article className="contact-card">
                <h3 style={{ margin: 0, fontFamily: "var(--font-heading)", fontSize: "1.2rem" }}>
                  I work across the stack
                </h3>
                <p style={{ margin: "0.5rem 0 0", color: "var(--shell-text-soft)" }}>
                  Backend (Python, TypeScript, Scala, Java). Infra (Cloudflare
                  Workers, AWS, Hetzner, Trigger.dev). Product UX. SDKs.
                  Developer tools.
                </p>
              </article>
              <article className="contact-card">
                <h3 style={{ margin: 0, fontFamily: "var(--font-heading)", fontSize: "1.2rem" }}>
                  I write tools other engineers install
                </h3>
                <p style={{ margin: "0.5rem 0 0", color: "var(--shell-text-soft)" }}>
                  corgx-wizard + skills libraries open-sourced. OrgX MCP
                  listed on Smithery. PerfPulse distributed via Homebrew.
                </p>
              </article>
            </div>
          </section>

          <section className="contact-card">
            <span className="eyebrow">Next step</span>
            <h2 style={{ marginTop: "0.5rem" }}>30 minutes is enough to know if this is a fit.</h2>
            <p style={{ margin: "0.8rem 0 0", maxWidth: "36rem" }}>
              Email me with the role and a time window. I&apos;ll come with a
              live OrgX walkthrough specific to what your team is building
              and I can ship running demos in the call.
            </p>
            <div className="hero-actions" style={{ marginTop: "1.2rem" }}>
              <SiteButton href="mailto:hopeatina@gmail.com?subject=Role%20conversation" external>
                Email me →
              </SiteButton>
              <SiteButton href="/resume/hope-atina-resume.md" variant="secondary" external>
                Download resume
              </SiteButton>
              <SiteButton href="https://github.com/useorgx" variant="text" external>
                github.com/useorgx ↗
              </SiteButton>
              <SiteButton href="https://useorgx.com" variant="text" external>
                useorgx.com ↗
              </SiteButton>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
