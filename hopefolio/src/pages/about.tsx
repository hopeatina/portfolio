import Head from "next/head";
import Image from "next/image";
import {
  CausalFlow,
  ContinuityPlayhead,
  LivingMotif,
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
          <LivingMotif variant="weave" className="v4-about-hero-motif" label="Roots, disciplines, and experiences weaving into one practice" />
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

        <section className="v4-about-origin v4-motif-backed">
          <LivingMotif variant="weave" className="v4-section-motif" />
          <SectionSignal index="01">The root system</SectionSignal>
          <div className="v4-about-origin-grid">
            <h2>Two cultures taught me to look for the system beneath the surface.</h2>
            <div>
              <p>
                My Cameroonian and Estonian roots are not a moodboard. They are an early lesson in
                translation: the same thing can carry different meaning depending on context,
                history, and the people interpreting it. I learned to inspect the structure before
                assuming the surface told the whole story.
              </p>
              <p>
                Bioengineering at Rice gave that instinct technical rigor. Complex outcomes emerge
                from relationships between parts; the useful intervention is rarely the loudest one.
                That became the foundation of how I approach software, products, and teams.
              </p>
              <p>
                Music stays in the background of the practice: timing, tension, counterpoint, and the
                feeling that a technically correct composition can still be unresolved.
              </p>
            </div>
          </div>
        </section>

        <section className="v4-about-method v4-motif-backed">
          <LivingMotif variant="aperture" className="v4-section-motif" />
          <SectionSignal index="02">The practice</SectionSignal>
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

        <section className="v4-about-experience v4-motif-backed">
          <LivingMotif variant="branch" className="v4-section-motif" />
          <SectionSignal index="03">The questions got harder</SectionSignal>
          <div className="v4-about-arc-heading">
            <h2>Each environment added a boundary I could no longer ignore.</h2>
            <p>This is one evolving practice—not a list of unrelated roles.</p>
          </div>
          <div className="v4-about-chapter-list">
            <article>
              <span>01 / Capital One · scale</span>
              <h3>Can data be trusted before it starts moving?</h3>
              <p>Regulated finance made data quality, lineage, and reliable ingestion part of the system—not cleanup after the pipeline.</p>
              <small>Spark · Scala · Snowflake · near-real-time ETL</small>
            </article>
            <article>
              <span>02 / Vessel Health · ownership</span>
              <h3>What changes when the API touches hardware and operations?</h3>
              <p>Leading backend work across authentication, calibration, AWS infrastructure, and internal workflows expanded the unit of ownership beyond code.</p>
              <small>API architecture · hardware calibration · AWS · operations</small>
            </article>
            <article>
              <span>03 / Alma · consequence</span>
              <h3>How do you move continuously when failure reaches clinical work?</h3>
              <p>HIPAA production taught me to make privacy enter early, failure visible, rollout reversible, and operator trust part of engineering quality.</p>
              <small>Django · Celery · PostgreSQL · Datadog</small>
            </article>
            <article className="v4-about-chapter-featured">
              <span>04 / OrgX · synthesis</span>
              <h3>How can many intelligent actors move without losing the organization?</h3>
              <p>OrgX integrates the questions: shared context, client-native execution, consequence-aware judgment, and proof that improves the next decision.</p>
              <small>Founder · product · architecture · distribution</small>
              <TextLink href="/projects/orgx">Inspect the system</TextLink>
            </article>
          </div>
        </section>

        <section className="v4-about-collaboration v4-motif-backed">
          <LivingMotif variant="handoff" className="v4-section-motif" />
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

        <section className="v4-about-now v4-motif-backed">
          <LivingMotif variant="resolve" className="v4-about-now-motif" />
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
