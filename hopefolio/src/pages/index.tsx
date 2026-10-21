import { selectedProjects } from "@/data/selected-projects";
import { heroLine, leadQuote } from "@/data/quotes";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import MaterialJourney from "@/components/material/MaterialJourney";
import Logo from "@/components/ui/Logo";
import { ContinuityPlayhead, SectionSignal, TextLink } from "@/components/v4/V4Primitives";
import ProjectReel from "@/components/v4/ProjectReel";

const orgx = selectedProjects.find((item) => item.slug === "orgx")!;
const openBecoming = selectedProjects.find((item) => item.slug === "open-becoming")!;

export default function Home() {
  return (
    <>
      <Head>
        <title>Hope Atina — Systems thinker and maker, Houston</title>
        <meta
          name="description"
          content="Hope Atina thinks in systems and builds in whatever medium the problem needs: clinical software, data pipelines, a Rust tool, a game set in Cameroon, music, a design community, and infrastructure for a company run by one person."
        />
      </Head>

      <main id="main-content" className="v4-page v4-home">
        <ContinuityPlayhead />

        <section className="home-hero" aria-labelledby="hero-title">
          <div className="home-hero-copy">
            <span className="material-eyebrow"><i aria-hidden="true" /> Hope Atina · systems thinker, maker · Houston, by way of Cameroon</span>
            <h1 id="hero-title" className="home-hero-line">“{heroLine.text}”</h1>
            <span className="home-hero-cite">In my words · {heroLine.date}</span>
            <p>
              I think in systems and I build in whatever medium the problem needs. Software for
              clinics and banks, a Rust tool on a Mac, a browser game about driving in Yaoundé,
              music, a design community, and lately the tooling that lets one person run a company.
              The why stays the same. The how is where the creativity goes.
            </p>
            <div className="material-home-actions">
              <Link href="/projects" className="material-primary-link">See the work <span aria-hidden="true">↗</span></Link>
              <TextLink href="/about">The way of seeing</TextLink>
            </div>
          </div>
          <ProjectReel
            src="/video/reels/highlight.mp4"
            poster="/video/reels/highlight.jpg"
            label="Eight projects · 29 seconds"
            caption="Each film’s own line carries the next. Opens on my voice from Figma Config 2021 and ends by drawing my portrait."
            score="“UBEAT V1” by Hope Atina"
            className="home-hero-reel"
          />
        </section>

        <section className="v4-range-section v4-motif-backed" aria-labelledby="range-title">
          <SectionSignal index="01">The range</SectionSignal>
          <div className="v4-range-heading">
            <h2 id="range-title">One way of seeing. Nine kinds of pressure.</h2>
            <p>
              Clinical software, bank data, a Rust tool, a game set in Yaoundé, a research workbench,
              a learning product, a life companion, and the infrastructure for a company run by one
              person. Same question each time: does it hold, and does it feel right?
            </p>
          </div>
          <div className="v4-range-list">
            {selectedProjects.map((item) => (
              <Link href={item.href} className="v4-range-item" key={item.title}>
                <span className="v4-range-number">{item.index}</span>
                <div className="v4-range-title">
                  <span>{item.role}</span>
                  <h3>{item.title}</h3>
                </div>
                <p>{item.thesis}</p>
                <small>{item.evidence}</small>
                <div className="v4-range-preview" aria-hidden="true">
                  <Image src={item.heroImage} alt="" fill sizes="(max-width: 820px) 85vw, 24vw" />
                </div>
                <b aria-hidden="true">↗</b>
              </Link>
            ))}
          </div>
        </section>

        <MaterialJourney />

        <aside className="home-receipt" aria-label="One receipt, up front">
          <div className="home-receipt-paper">
            <div className="home-receipt-head">
              <span>Receipt</span>
              <span>No. 01 / 2026</span>
            </div>
            <dl>
              <div><dt>Decided in</dt><dd>Claude Code</dd></div>
              <div><dt>Inherited by</dt><dd>Codex</dd></div>
              <div><dt>Goal</dt><dd>intact</dd></div>
              <div><dt>Decision</dt><dd>intact</dd></div>
              <div><dt>Evidence</dt><dd>attached</dd></div>
            </dl>
            <Link href="/proof/orgx-mcp-server" className="home-receipt-link">Open the full receipt <span aria-hidden="true">→</span></Link>
            <Logo className="home-receipt-seal" size={64} tone="var(--v4-heat)" carve="#f2efe4" />
          </div>
          <p className="home-receipt-note">
            One of the hows, as an object: a handoff between two agents with the why still attached
            on the other side. The same shape as a clinical audit trail or a learner’s notes, built
            for a company that runs on agents.
          </p>
        </aside>

        <section className="home-now v4-motif-backed" aria-labelledby="now-title">
          <SectionSignal index="02">Building now</SectionSignal>
          <div className="home-now-heading">
            <h2 id="now-title">Two products. One question: what does a person keep?</h2>
            <p>
              OrgX keeps a company’s decisions and proof when agents do the work. Open Becoming
              keeps a person’s moments when life does. Same founder, opposite palettes, same spine.
            </p>
          </div>
          <div className="home-now-grid">
            <Link href={orgx.href} className="home-now-card is-carbon">
              <div className="home-now-media">
                <Image src={orgx.heroImage} alt={orgx.heroAlt ?? ""} fill sizes="(min-width: 900px) 46vw, 100vw" />
              </div>
              <span>01 / {orgx.status}</span>
              <h3>{orgx.title}</h3>
              <p>The artifact is the receipt. Output, provenance, quality bar, and the human boundary on one surface, underneath the AI clients people already use.</p>
              <b>Read the case <i aria-hidden="true">→</i></b>
            </Link>
            <Link href={openBecoming.href} className="home-now-card is-paper">
              <div className="home-now-media">
                <Image src={openBecoming.heroImage} alt={openBecoming.heroAlt ?? ""} fill sizes="(min-width: 900px) 46vw, 100vw" />
              </div>
              <span>02 / in development</span>
              <h3>{openBecoming.title}</h3>
              <p>A Life Clock: years as rings, twelve ways of living as slices, moments as dots. Nib, the pen tip, helps you practise what you care about. Asking for help counts.</p>
              <b>Read the case <i aria-hidden="true">→</i></b>
            </Link>
          </div>
        </section>

        <section className="home-words v4-motif-backed" aria-labelledby="words-title">
          <SectionSignal index="03">In my own words</SectionSignal>
          <h2 id="words-title" className="sr-only">In Hope’s own words</h2>
          <div className="home-words-grid">
            <blockquote className="home-quote">
              <p>“{leadQuote.text}”</p>
              <cite>{leadQuote.source} · {leadQuote.date}</cite>
            </blockquote>
            <a
              className="home-words-film"
              href="https://www.youtube.com/watch?v=JSpfsuK75j0&t=171s"
              target="_blank"
              rel="noreferrer"
              aria-label="Watch Hope Atina on the origin of Figma and Chill at Config 2021"
            >
              <Image
                src="/images/evidence/figma-config-2021.jpg"
                alt="Figma Config 2021 talk cover for Figma and Chill"
                fill
                sizes="(min-width: 900px) 40vw, 100vw"
              />
              <span>Config 2021 · Figma &amp; Chill · watch from 02:51 ↗</span>
            </a>
          </div>
          <p className="home-words-more">
            Figma and Chill started as an empty Clubhouse room and became a global BIPOC design
            community that learned by making things together. <TextLink href="/about#about-words-title">More, in my words</TextLink>
          </p>
        </section>

        <section className="v4-home-close v4-motif-backed">
          <span>Any claim above has a receipt behind it.</span>
          <h2>Ask for the one you need.</h2>
          <div>
            <TextLink href="/proof">The ledger</TextLink>
            <TextLink href="/about#skills">Skills and tools</TextLink>
            <TextLink href="mailto:hopeatina@gmail.com" external>Email me</TextLink>
          </div>
        </section>
      </main>
    </>
  );
}
