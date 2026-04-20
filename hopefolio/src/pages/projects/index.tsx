import Head from "next/head";
import React from "react";
import Link from "next/link";
import ProjectCard from "@/components/site/ProjectCard";
import { featuredProjects } from "@/data/portfolio";

export default function Projects() {
  const [orgx, ...supporting] = featuredProjects;

  return (
    <>
      <Head>
        <title>Work | Hope Atina</title>
        <meta
          name="description"
          content="Curated case studies in multi-agent orchestration, production backend systems, developer tooling, and plugin architecture."
        />
      </Head>

      <main id="main-content" className="page-frame">
        <div className="page-stack">
          <header className="page-header-stack">
            <span className="eyebrow">Index · 4 case studies, 1 thesis</span>
            <h1>Make autonomy trustworthy. Then make the review surface the product.</h1>
            <p style={{ maxWidth: "42rem", margin: 0 }}>
              OrgX is the flagship. The supporting three are that same thesis
              applied under different constraints: production AI in HIPAA,
              developer tooling on the local machine, and plugin architecture
              inside a coding agent.
            </p>
          </header>

          <section className="page-content">
            <div className="page-header-stack" style={{ gap: "0.5rem" }}>
              <span className="eyebrow">Flagship · agent platform</span>
            </div>
            <ProjectCard project={orgx} featured />
          </section>

          <section className="page-content">
            <div className="page-header-stack" style={{ gap: "0.75rem" }}>
              <span className="eyebrow">Supporting · production · tooling · plugin</span>
              <h2>Three proofs under different constraints</h2>
            </div>
            <div className="work-grid-supporting">
              {supporting.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </section>

          <section className="contact-card">
            <span className="eyebrow">Archive</span>
            <h2 style={{ marginTop: "0.5rem" }}>Everything else is still available, just off the main stage.</h2>
            <p style={{ margin: "0.8rem 0 0", maxWidth: "36rem" }}>
              Older experiments and weaker-fit projects stay reachable in a
              hidden archive so the main index can stay tightly aligned with the
              agent infrastructure story.
            </p>
            <p style={{ marginTop: "1rem" }}>
              <Link href="/projects/archive" className="site-link-inline">
                Open archive ↗
              </Link>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
