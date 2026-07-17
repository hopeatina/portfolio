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
          content="Twelve archived systems, 2017–2024 — kept as an honest ledger of range, not as the lead story."
        />
      </Head>

      <main id="main-content" className="page-frame">
        <div className="page-stack">
          <header className="page-header-stack">
            <span className="eyebrow">Archive · 12 systems · 2017—2024</span>
            <h1>The earlier chapters, kept honest.</h1>
            <p style={{ maxWidth: "38rem", margin: 0 }}>
              These systems remain on the record for range and context, but they do not lead
              the current story. Where the source is public, the link is real; where it is
              not, there is no door pretending to open.
            </p>
            <p style={{ margin: 0 }}>
              <Link href="/projects" className="site-link-inline">
                Back to curated work
              </Link>
            </p>
          </header>

          <section className="page-content">
            <div className="archive-ledger" role="list">
              {archivedProjects.map((project) => {
                const row = (
                  <>
                    <span className="archive-ledger-label">{project.shortLabel}</span>
                    <div className="archive-ledger-copy">
                      <h3>{project.title}</h3>
                      <p>{project.summary}</p>
                    </div>
                    <div className="archive-ledger-proof">
                      {project.proof.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                    <span className="archive-ledger-cta">
                      {project.href ? (
                        <>
                          {project.primaryCta} <i aria-hidden="true">↗</i>
                        </>
                      ) : (
                        <em>no public source</em>
                      )}
                    </span>
                  </>
                );

                return project.href ? (
                  <a
                    key={project.slug}
                    role="listitem"
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="archive-ledger-row is-linked"
                  >
                    {row}
                  </a>
                ) : (
                  <div key={project.slug} role="listitem" className="archive-ledger-row">
                    {row}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
