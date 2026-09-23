import MaterialSpecimen from "@/components/material/MaterialSpecimen";
import { materialContexts } from "@/components/material/material-context";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { practiceCapabilities } from "@/data/practice";
import {
  ContinuityPlayhead,
  SectionSignal,
  SystemGlyph,
  TextLink,
} from "@/components/v4/V4Primitives";

const contribution = [
  {
    glyph: "context" as const,
    title: "I see the whole system",
    body: "Architecture, the product surface, rollout, and adoption are one problem until the person using it trusts the result.",
  },
  {
    glyph: "branch" as const,
    title: "I work AI-natively",
    body: "Agents stretch how much I can ship across code, research, and distribution. The judgment is still mine.",
  },
  {
    glyph: "judgment" as const,
    title: "I stay calm near consequence",
    body: "Healthcare and regulated data taught me to shrink failure modes, keep rollouts reversible, and make decisions readable.",
  },
  {
    glyph: "receipt" as const,
    title: "I finish the product",
    body: "The install path, the interaction details, and the proof finish the engineering. They aren't polish on top.",
  },
];

export default function Hiring() {
  return (
    <>
      <Head>
        <title>Work with Hope Atina</title>
        <meta
          name="description"
          content="Hope Atina brings production backend and data experience, AI systems engineering, product design, research, and interactive 3D to ambitious teams."
        />
      </Head>

      <main id="main-content" className="v4-page v4-hiring-page">
        <ContinuityPlayhead label="work with me" />

        <header className="v4-hiring-hero v4-motif-backed">
          <MaterialSpecimen context={materialContexts.home} className="material-inner-object" compact />
          <span>For founders / recruiters / ambitious teams</span>
          <h1 data-thread="">Systems depth. Product taste. Range that ships.</h1>
          <div>
            <p>
              I've owned production systems in healthcare, fintech data, and backend infrastructure.
              As a founder I build AI infrastructure, learning products, research tools, and 3D worlds.
              I connect the architecture to the thing people actually touch.
            </p>
            <div className="v4-hiring-actions">
              <TextLink href="mailto:hopeatina@gmail.com?subject=Consequential%20work%20%E2%80%94%20%5Bcompany%5D" external>
                Start a conversation
              </TextLink>
              <TextLink href="https://calendly.com/hopeatina/orgx-discovery" external>
                Book 30 minutes
              </TextLink>
            </div>
            <p className="v4-hiring-ace">
              Skip the claims and read the receipts. Each one is scored against six criteria,
              failures included.{" "}
              <Link href="/proof" className="v4-text-link">
                Open the ledger <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
        </header>

        <section className="v4-hiring-contribution v4-motif-backed">
          <SectionSignal index="01">What changes when I join the problem</SectionSignal>
          <div className="v4-hiring-contribution-heading">
            <h2>Deep enough to fix it. Wide enough to see what it breaks.</h2>
            <p>
              I can go from a failing background job to a product decision to a trust model and keep
              track of how they connect.
            </p>
          </div>
          <div className="v4-hiring-contribution-grid">
            {contribution.map((item, index) => (
              <article key={item.title}>
                <span>0{index + 1}</span>
                <SystemGlyph name={item.glyph} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="practice-brief v4-motif-backed" aria-labelledby="practice-brief-title">
          <span>Capabilities / the full range</span>
          <h2 id="practice-brief-title">Different disciplines. Useful together.</h2>
          <ul>{practiceCapabilities.map((item) => <li key={item.name}><strong>{item.name}</strong><span>{item.skills.join(" · ")}</span></li>)}</ul>
          <TextLink href="/about#skills">Explore skills, tools, and the work behind them</TextLink>
        </section>

        <section className="v4-hiring-proof v4-motif-backed">
          <SectionSignal index="02">Three ways to inspect the claim</SectionSignal>
          <div className="v4-hiring-proof-grid">
            <Link href="/projects/orgx" className="v4-hiring-proof-featured">
              <div>
                <span>Founder proof / OrgX</span>
                <h2>I built the proof layer I thought agent work was missing.</h2>
                <p>
                  The thesis, the shared work graph, the client integrations, the trust boundaries,
                  the receipts, and the surfaces operators use every day.
                </p>
                <b>Inspect the flagship →</b>
              </div>
              <div className="v4-hiring-proof-image">
                <Image
                  src="/images/case-studies/orgx-v4/artifact-receipt.png"
                  alt="OrgX receipt-first artifact viewer"
                  fill
                  sizes="(min-width: 900px) 52vw, 100vw"
                />
              </div>
            </Link>
            <Link href="/projects/alma">
              <span>Production proof / Alma</span>
              <h3>Regulated workflows that earned adoption and stayed observable.</h3>
              <p>HIPAA production · reassessments · reversible rollout · measurable reliability.</p>
              <b>Inspect Alma →</b>
            </Link>
            <a href="https://www.youtube.com/watch?v=JSpfsuK75j0&t=171s" target="_blank" rel="noreferrer">
              <span>Product-culture proof / Config</span>
              <h3>I turn collaboration into making things, not another meeting.</h3>
              <p>Figma and Chill · global BIPOC design community · play, iteration, and action.</p>
              <b>Watch the talk ↗</b>
            </a>
          </div>
        </section>

        <section className="v4-hiring-fit v4-motif-backed">
          <SectionSignal index="03">Where the fit is strongest</SectionSignal>
          <div className="v4-hiring-fit-grid">
            <h2>Give me the system that matters, not an isolated ticket.</h2>
            <div>
              <p>
                Founder collaborations, senior or staff IC roles, and small teams with real ownership.
                Agent platforms, developer tools, data-heavy products, learning, or operational software
                where the architecture and the interaction both matter.
              </p>
              <ul>
                <li>Houston-based and remote-friendly</li>
                <li>Comfortable across backend, product surface, and system narrative</li>
                <li>Best with ownership, honest feedback, and a bar set by evidence</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="v4-hiring-close v4-motif-backed">
          <span>A good first conversation is concrete.</span>
          <h2 data-thread="">Bring the system, the pressure on it, and the part that still won't make sense.</h2>
          <div>
            <TextLink href="https://calendly.com/hopeatina/orgx-discovery" external>Book 30 minutes</TextLink>
            <TextLink href="mailto:hopeatina@gmail.com?subject=Work%20together%20%E2%80%94%20%5Bcompany%5D" external>Email me</TextLink>
            <TextLink href="/resume/hope-atina-resume.md" external>Read the resume</TextLink>
          </div>
        </section>
      </main>
    </>
  );
}
