import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProjectCard from "@/components/site/ProjectCard";
import SiteButton from "@/components/site/SiteButton";
import { featuredProjects } from "@/data/portfolio";

const productionCompanies = [
  {
    name: "Alma",
    logo: "/images/logos/alma.png",
    environment: "Mental health · HIPAA production",
    role: "Software Engineer, Quality Enablement · 2023–Present",
    impact:
      "999 commits across 7 feature areas. Celery reassessment workflows at 72% adoption. Datadog observability cut production errors 20%.",
  },
  {
    name: "Vessel Health",
    logo: "/images/logos/vessel.png",
    environment: "Consumer health · connected hardware",
    role: "Lead Backend Engineer · 2020–2023",
    impact:
      "End-to-end technical ownership for auth, hardware calibration, and AWS-backed platform workflows. API re-arch reduced bug output 93%.",
  },
  {
    name: "Capital One",
    logo: "/images/logos/capital-one.png",
    environment: "Regulated finance · data platform",
    role: "Software & Data Engineer · 2017–2019",
    impact:
      "Automated Snowflake onboarding pipelines. Tuned Spark/Scala apps ingesting millions of near-real-time records in a regulated environment.",
  },
];

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
          <section className="case-study-hero" style={{ paddingTop: "1rem" }}>
            <div className="case-study-intro">
              <div className="case-study-meta">
                <span className="eyebrow">
                  Hope Atina · Senior AI Infrastructure Engineer · Founder, OrgX
                </span>
              </div>
              <h1>
                If you&apos;re building agent infrastructure, I&apos;m already
                shipping it.
              </h1>
              <p className="case-study-description">
                Persistent organizational memory, trust scoring, decision
                provenance, and the MCP tooling that ties them together across
                Claude Code, Cursor, and ChatGPT. 7+ years in production before
                this — healthtech compliance, regulated fintech data, and
                AI-native products.
              </p>
              <div className="proof-bar" style={{ marginTop: "0.25rem" }}>
                <span>61 MCP tools · 12-repo platform</span>
                <span>136+ benchmark tasks</span>
                <span>999 HIPAA commits · 20% fewer errors at Alma</span>
                <span>93% bug reduction at Vessel</span>
              </div>
              <div
                className="hero-actions"
                style={{ marginTop: "1.25rem" }}
              >
                <SiteButton href="/hiring">For hiring managers →</SiteButton>
                <SiteButton href="/projects/orgx" variant="secondary">
                  Read OrgX case study
                </SiteButton>
                <SiteButton href="/blog" variant="text">
                  Writing ↗
                </SiteButton>
              </div>
            </div>

            <div className="case-study-hero-visual">
              <Image
                src="/images/projects/orgx-illustration.png"
                alt="OrgX — multi-agent orchestration across Claude Code, Cursor, and ChatGPT"
                fill
                priority
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover"
              />
              <div className="work-card-overlay" />
            </div>
          </section>

          <section className="page-content">
            <div className="page-header-stack" style={{ gap: "0.8rem" }}>
              <span className="eyebrow">Shipped in production</span>
              <h2 className="lead-title">Judgment that holds under real constraints.</h2>
              <p style={{ maxWidth: "42rem", margin: 0 }}>
                Healthcare compliance, consumer reliability, and regulated
                enterprise data. Three environments, one posture: ship what
                survives inspection.
              </p>
            </div>
            <div className="work-grid-supporting">
              {productionCompanies.map((company) => (
                <article key={company.name} className="contact-card">
                  <div
                    style={{
                      position: "relative",
                      width: "96px",
                      height: "34px",
                      marginBottom: "0.9rem",
                      opacity: 0.85,
                      filter: "brightness(0) invert(1)",
                    }}
                  >
                    <Image
                      src={company.logo}
                      alt={`${company.name} logo`}
                      fill
                      sizes="96px"
                      style={{ objectFit: "contain", objectPosition: "left" }}
                    />
                  </div>
                  <div className="eyebrow" style={{ fontSize: "0.7rem" }}>
                    {company.environment}
                  </div>
                  <h3
                    style={{
                      margin: "0.4rem 0 0",
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.6rem",
                    }}
                  >
                    {company.name}
                  </h3>
                  <p style={{ margin: 0, color: "var(--shell-muted)", fontSize: "0.9rem" }}>
                    {company.role}
                  </p>
                  <p style={{ margin: "0.9rem 0 0", fontSize: "0.95rem" }}>
                    {company.impact}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="page-content">
            <div className="page-header-stack" style={{ gap: "0.8rem" }}>
              <span className="eyebrow">Selected work</span>
              <h2 className="lead-title">
                Flagship: OrgX. Then three proofs under different constraints.
              </h2>
              <p style={{ maxWidth: "42rem", margin: 0 }}>
                OrgX is where the thesis lives. The supporting three show the
                same judgment applied to production AI, developer tooling, and
                plugin architecture.
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
            <p style={{ marginTop: "1.25rem" }}>
              <Link href="/projects" className="site-link-inline">
                Open the full work index →
              </Link>
            </p>
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
