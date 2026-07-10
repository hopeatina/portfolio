import Head from "next/head";
import Image from "next/image";
import { experienceEntries } from "@/data/portfolio";
import {
  CausalFlow,
  ContinuityPlayhead,
  SectionSignal,
  TextLink,
} from "@/components/v4/V4Primitives";

export default function About() {
  return (
    <>
      <Head>
        <title>About Hope Atina</title>
        <meta
          name="description"
          content="Hope Atina is a Houston-based engineer, founder, and product thinker building coherent systems across AI infrastructure and regulated products."
        />
      </Head>

      <main id="main-content" className="v4-page v4-about-page">
        <ContinuityPlayhead label="about" />

        <header className="v4-about-hero">
          <Image
            src="/images/generated/reflection-field.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            aria-hidden="true"
          />
          <div>
            <span>About / inspection as a creative practice</span>
            <h1>I build systems to understand what matters—and use the work to become more precise.</h1>
            <p>
              I am a Cameroon- and Estonia-rooted, Houston-based engineer, founder, and product thinker.
              The throughline is not technology for its own sake. It is coherence: between a system's
              ambition, the people operating it, and the evidence that earns trust.
            </p>
          </div>
        </header>

        <section className="v4-about-origin">
          <SectionSignal index="01">How I came to the work</SectionSignal>
          <div className="v4-about-origin-grid">
            <h2>Engineering gave me rigor. Collaboration gave it range. Inspection gave it depth.</h2>
            <div>
              <p>
                Bioengineering at Rice trained me to see interacting systems instead of isolated
                features. Capital One taught me that reliability begins before the data moves.
                Vessel Health expanded ownership across hardware, APIs, and operations. Alma made
                consequence, privacy, and reversible rollout impossible to separate.
              </p>
              <p>
                Building OrgX pulled those lessons into one founder problem: how do many intelligent
                actors move quickly without losing the shared context, judgment, and proof that make
                the work accountable?
              </p>
              <p>
                Music stays in the background, where it belongs: in pacing, tension, release, and a
                sensitivity to when something is technically correct but not yet resolved.
              </p>
            </div>
          </div>
        </section>

        <section className="v4-about-method">
          <SectionSignal index="02">My operating pattern</SectionSignal>
          <div className="v4-about-method-heading">
            <h2>Inspect deeply. Locate the boundary. Compose the intervention. Leave a stronger system.</h2>
            <p>
              Challenges become useful when they reveal the mechanism underneath them. I prefer the
              kind of collaboration where disagreement sharpens the model and evidence settles the next move.
            </p>
          </div>
          <CausalFlow
            steps={[
              { glyph: "inspect", label: "Inspect", detail: "Observe the real system, including the awkward and invisible parts." },
              { glyph: "context", label: "Name the boundary", detail: "Find where context, trust, or responsibility is being lost." },
              { glyph: "judgment", label: "Intervene", detail: "Make the smallest structural decision that changes the cause chain.", tone: "heat" },
              { glyph: "receipt", label: "Learn", detail: "Return the outcome as evidence that improves the next operating model." },
            ]}
          />
        </section>

        <section className="v4-about-experience">
          <SectionSignal index="03">Production environments</SectionSignal>
          <div className="v4-experience-list">
            <article className="v4-experience-featured">
              <span>Now</span>
              <div>
                <small>Founder / OrgX</small>
                <h2>Building the continuity and proof layer for AI-delivered work.</h2>
              </div>
              <p>
                Product, architecture, distribution, quality systems, and the connective tissue across
                Claude Code, Codex, Cursor, OpenCode, and OpenClaw.
              </p>
              <TextLink href="/projects/orgx">Inspect OrgX</TextLink>
            </article>
            {experienceEntries.map((entry) => (
              <article key={entry.company}>
                <span>{entry.period}</span>
                <div>
                  <small>{entry.role}</small>
                  <h3>{entry.company}</h3>
                </div>
                <p>{entry.outcome}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="v4-about-collaboration">
          <SectionSignal index="04">Collaboration is a creative technology</SectionSignal>
          <div>
            <h2>I started Figma and Chill because talking about making was not enough.</h2>
            <p>
              What began as an empty Clubhouse room grew into a global BIPOC design community where
              people made things together in real time. At Config 2021, our team shared how play,
              connection, community, and culture became a repeatable creative practice.
            </p>
            <a
              href="https://www.youtube.com/watch?v=JSpfsuK75j0&t=171s"
              target="_blank"
              rel="noreferrer"
              className="v4-text-link"
            >
              Watch the Config talk from Hope's origin story <span aria-hidden="true">↗</span>
            </a>
          </div>
          <a
            href="https://www.youtube.com/watch?v=JSpfsuK75j0&t=171s"
            target="_blank"
            rel="noreferrer"
            className="v4-about-proof-link"
          >
            <Image
              src="/images/evidence/figma-config-2021.jpg"
              alt="Figma Config 2021 talk cover for Figma and Chill"
              fill
              sizes="(min-width: 900px) 44vw, 100vw"
            />
            <span>Connection → community → culture</span>
          </a>
        </section>

        <section className="v4-about-now">
          <span>Now / July 2026</span>
          <h2>Building in public where AI infrastructure becomes a human operating system.</h2>
          <p>
            I am most interested in founder collaborations and senior/staff work where systems depth,
            product judgment, and AI-native execution all matter at once.
          </p>
          <div>
            <TextLink href="/hiring">How I work with teams</TextLink>
            <TextLink href="mailto:hopeatina@gmail.com" external>Talk with me</TextLink>
          </div>
        </section>
      </main>
    </>
  );
}
