import Head from "next/head";
import React from "react";
import Link from "next/link";
import { archivedProjects } from "@/data/portfolio";

export default function ProjectsArchive() {
  return (
    <>
      <Head>
        <title>Project Archive | Hope Atina</title>
        <meta
          name="description"
          content="Archived projects and experiments that are no longer part of the main curated portfolio narrative."
        />
      </Head>

      <main id="main-content" className="page-frame">
        <div className="page-stack">
          <header className="page-header-stack">
            <span className="eyebrow">Archive</span>
            <h1>Additional projects</h1>
            <p style={{ maxWidth: "38rem", margin: 0 }}>
              These projects remain available for context, but they do not lead
              the current story about agent infrastructure, observability, and
              production systems work.
            </p>
            <p style={{ margin: 0 }}>
              <Link href="/projects" className="site-link-inline">
                Back to curated work
              </Link>
            </p>
          </header>

          <section className="page-content">
            <div className="work-grid-supporting">
              {archivedProjects.map((project) => (
                <Link key={project.slug} href={project.href} className="work-card">
                  <div className="work-card-body">
                    <span className="eyebrow">{project.shortLabel}</span>
                    <div className="work-card-copy">
                      <h3>{project.title}</h3>
                      <p>{project.summary}</p>
                    </div>
                    <div className="work-card-proof">
                      {project.proof.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                    <div className="work-card-link">Open archive entry →</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
