import Head from "next/head";
import React from "react";
import ProjectCard from "@/components/site/ProjectCard";
import SiteButton from "@/components/site/SiteButton";
import TypewriterName from "@/components/site/TypewriterName";
import { featuredProjects } from "@/data/portfolio";

export default function Home() {
  const [orgx, ...supporting] = featuredProjects;

  return (
    <>
      <Head>
        <title>Hope Atina | Senior AI Infrastructure Engineer</title>
        <meta
          name="description"
          content="Senior AI Infrastructure Engineer. Building OrgX — continuity infra for AI agents: MCP, persistent memory, trust scoring, decision provenance."
        />
        <meta name="theme-color" content="#09090b" />
      </Head>

      <main id="main-content" className="page-frame">
        <div className="page-stack">
          <section className="page-header-stack" style={{ paddingTop: "2rem" }}>
            <span className="eyebrow">Agent infrastructure · MCP · memory · trust · provenance</span>
            <TypewriterName text="Hope Atina" />
            <div className="hero-reveal-group hero-reveal-group-delay">
              <p
                className="eyebrow"
                style={{
                  color: "var(--shell-muted)",
                  fontSize: "0.95rem",
                  letterSpacing: "0.18em",
                }}
              >
                Senior AI Infrastructure Engineer · Founder, OrgX
              </p>
            </div>
            <div className="hero-reveal-group hero-reveal-group-delay">
              <p className="lead-copy" style={{ maxWidth: "40rem", margin: 0 }}>
                I build the systems that make AI agents reliable in production:
                persistent organizational memory, trust scoring, decision
                provenance, and the MCP tooling that ties them together across
                Claude Code, Cursor, and ChatGPT.
              </p>
            </div>
            <div className="hero-reveal-group hero-reveal-group-delay-2">
              <div className="proof-bar">
                <span>7+ years shipping production systems</span>
                <span>OrgX: 61 MCP tools · 12-repo platform · 136+ benchmark tasks</span>
                <span>Alma: 999 commits in HIPAA production · 20% fewer errors</span>
                <span>Vessel: 93% bug reduction via API re-architecture</span>
              </div>
            </div>
            <div className="hero-reveal-group hero-reveal-group-delay-2">
              <div className="hero-actions">
                <SiteButton href="/projects">View my work →</SiteButton>
                <SiteButton href="/blog" variant="text">
                  Read my writing ↗
                </SiteButton>
              </div>
            </div>
          </section>

          <section className="page-content">
            <div className="page-header-stack" style={{ gap: "0.8rem" }}>
              <span className="eyebrow">Selected work</span>
              <h2 className="lead-title">Four systems, one clear story.</h2>
              <p style={{ maxWidth: "42rem", margin: 0 }}>
                The portfolio now starts where the proof is strongest: one
                flagship platform, then the production and tooling work that
                proves the same judgment under different constraints.
              </p>
            </div>

            <div className="work-grid">
              <ProjectCard project={orgx} featured />
              <div className="work-grid-supporting">
                {supporting.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </div>
          </section>

          <section className="contact-card">
            <div className="page-header-stack" style={{ gap: "1rem" }}>
              <span className="eyebrow">Hiring</span>
              <h2>Currently looking for my next role.</h2>
              <p style={{ margin: 0, maxWidth: "38rem" }}>
                I&apos;m targeting senior/staff IC roles on teams building
                agent platforms, MCP infrastructure, AI developer productivity,
                or evals + observability. Best fit: teams where OrgX looks
                like a preview of what you&apos;re already building.
              </p>
              <div className="hero-actions">
                <SiteButton href="/hiring">For hiring managers →</SiteButton>
                <SiteButton href="/contact" variant="text">
                  Get in touch ↗
                </SiteButton>
                <SiteButton href="mailto:hopeatina@gmail.com" variant="text" external>
                  hopeatina@gmail.com
                </SiteButton>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
