import Head from "next/head";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { experienceEntries } from "@/data/portfolio";

type AboutWorld = "base" | "cameroon" | "rice" | "future";

const worldCopy: Record<
  AboutWorld,
  { label: string; title: string; body: string; className: string }
> = {
  base: {
    label: "Base",
    title: "Clean systems shell",
    body: "The default world is restrained: clear hierarchy, dark surfaces, and proof-first interaction.",
    className: "theme-preview-base",
  },
  cameroon: {
    label: "Cameroon",
    title: "Grounded ambition",
    body: "Cameroon shows up as warmth, rhythm, and identity without turning the interface into a costume.",
    className: "theme-preview-cameroon",
  },
  rice: {
    label: "Rice",
    title: "Academic precision",
    body: "Rice leans toward blue-steel restraint and a slightly more formal posture.",
    className: "theme-preview-rice",
  },
  future: {
    label: "Future",
    title: "Calm optimism",
    body: "Future keeps the shell dark and minimal, then pushes the accent slightly more forward.",
    className: "theme-preview-future",
  },
};

export default function About() {
  const [world, setWorld] = useState<AboutWorld>("base");
  const theme = useMemo(() => worldCopy[world], [world]);

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
                8+ years shipping production systems across healthcare,
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

          <section className="about-worlds">
            <span className="eyebrow">Theme worlds</span>
            <p style={{ margin: 0, color: "var(--shell-text-soft)" }}>
              These themes stay off the global nav now. They live here as a
              small story device instead of an always-on control.
            </p>
            <div className="theme-chip-row">
              {(["base", "cameroon", "rice", "future"] as AboutWorld[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`theme-chip ${world === item ? "theme-chip-active" : ""}`}
                  onClick={() => setWorld(item)}
                >
                  {worldCopy[item].label}
                </button>
              ))}
            </div>
            <div className={`theme-preview ${theme.className}`}>
              <span className="theme-preview-kicker">{theme.label}</span>
              <h3 style={{ margin: 0, fontFamily: "var(--font-heading)", fontSize: "1.7rem" }}>
                {theme.title}
              </h3>
              <p style={{ color: "var(--shell-text-soft)" }}>{theme.body}</p>
            </div>
          </section>

          <section className="contact-card">
            <span className="eyebrow">Now</span>
            <h2 style={{ marginTop: "0.5rem" }}>March 2026</h2>
            <div className="page-content">
              <p><strong>Currently building:</strong> agent infrastructure, review surfaces, and proof-heavy portfolio systems.</p>
              <p><strong>Currently reading:</strong> papers and product writing about autonomy, observability, and human oversight.</p>
              <p><strong>Currently thinking about:</strong> where agent tooling stops being a demo and starts becoming operational software.</p>
              <p><strong>Currently listening to:</strong> music that still reminds me structure and feeling are not separate jobs.</p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
