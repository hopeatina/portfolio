import Head from "next/head";
import Image from "next/image";
import React from "react";
import { experienceEntries } from "@/data/portfolio";

export default function About() {
  return (
    <>
      <Head>
        <title>About | Hope Atina</title>
        <meta
          name="description"
          content="Cameroon-born, Houston-based engineer building systems where aggressive delegation stays legible."
        />
      </Head>

      <main id="main-content" className="page-frame">
        <div className="page-stack">
          <section className="about-grid">
            <div className="page-header-stack">
              <span className="eyebrow">About</span>
              <h1>Hope Atina</h1>
              <p style={{ margin: 0, fontSize: "1.25rem", color: "var(--shell-muted)" }}>
                Cameroon-born, Houston-based engineer building systems where
                aggressive delegation stays legible.
              </p>
              <p style={{ margin: 0, maxWidth: "36rem" }}>
                7+ years shipping production systems across healthcare,
                enterprise data, and AI infrastructure. B.S. Bioengineering,
                Rice University.
              </p>
            </div>

            <figure className="visual-frame">
              <div className="visual-frame-media">
                <Image
                  src="/images/hope-profile.jpg"
                  alt="Portrait of Hope Atina"
                  fill
                  priority
                  sizes="(min-width: 1024px) 34vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption>Profile portrait, re-framed into the darker shell.</figcaption>
            </figure>
          </section>

          <section className="contact-card">
            <span className="eyebrow">Philosophy</span>
            <div
              style={{
                display: "grid",
                gap: "0.7rem",
                marginTop: "0.9rem",
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.8rem, 4vw, 2.3rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              <span>Make delegation aggressive.</span>
              <span>Make provenance visible.</span>
              <span>Make trust earned, not assumed.</span>
              <span>Make failures inspectable.</span>
              <span>Make the review surface the product.</span>
              <span>Make it ship.</span>
            </div>
          </section>

          <section className="page-content">
            <div className="page-header-stack" style={{ gap: "0.8rem" }}>
              <span className="eyebrow">Experience</span>
              <h2>Production environments</h2>
            </div>
            <div className="work-grid">
              {experienceEntries.map((entry) => (
                <article key={entry.company} className="contact-card">
                  <div className="eyebrow">{entry.period}</div>
                  <h3 style={{ margin: "0.35rem 0 0", fontFamily: "var(--font-heading)", fontSize: "1.75rem" }}>
                    {entry.company}
                  </h3>
                  <p style={{ margin: 0, color: "var(--shell-muted)" }}>{entry.role}</p>
                  <p style={{ margin: "0.9rem 0 0" }}>{entry.outcome}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="about-grid">
            <div className="page-content">
              <div className="page-header-stack" style={{ gap: "0.8rem" }}>
                <span className="eyebrow">Beyond code</span>
                <h2>Story and taste</h2>
              </div>
              <p>
                My story begins in Cameroon, where my family&apos;s
                entrepreneurial energy and love of education shaped how I think
                about range, ambition, and responsibility.
              </p>
              <p>
                The move to Houston widened the aperture. Rice gave me the
                engineering vocabulary. Music gave me taste, pacing, and a feel
                for when a system is technically correct but still not resolved.
              </p>
              <p>
                That mix is why the work sits where it does now: I care about
                the hard infrastructure problems, but I care just as much about
                the human surface wrapped around them.
              </p>
            </div>

            <div className="work-grid">
              {["/images/art/piece1.jpg", "/images/art/piece2.jpg", "/images/art/piece3.jpg"].map(
                (src) => (
                  <figure key={src} className="visual-frame">
                    <div className="visual-frame-media">
                      <Image
                        src={src}
                        alt="Creative work from Hope Atina"
                        fill
                        sizes="(min-width: 1024px) 30vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </figure>
                )
              )}
            </div>
          </section>

          <section className="contact-card">
            <span className="eyebrow">Now · April 2026</span>
            <h2 style={{ marginTop: "0.5rem" }}>Building the continuity layer for AI agents.</h2>
            <p style={{ margin: "0.9rem 0 0", maxWidth: "42rem" }}>
              Shipping OrgX MCP in public. Running a weekly agent benchmark
              with independent judges. Writing about memory, provenance, and
              trust in production agent systems. Looking for a senior/staff
              IC seat on a team already building in this lane.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
