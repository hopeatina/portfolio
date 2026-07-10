import Head from "next/head";
import { CausalFlow, ContinuityPlayhead, EvidenceSpecimen, GlyphName, SectionSignal, TextLink } from "./V4Primitives";

export interface NarrativeBlock {
  eyebrow: string;
  title: string;
  body: React.ReactNode;
  notes?: string[];
}

export interface NarrativeProof {
  src: string;
  alt: string;
  label: string;
  caption: string;
}

interface CaseStudyNarrativeProps {
  pageTitle: string;
  description: string;
  index: string;
  status: string;
  title: string;
  subtitle: string;
  introduction: string;
  facts: Array<{ label: string; value: string }>;
  heroProof: NarrativeProof;
  problem: NarrativeBlock;
  insight: NarrativeBlock;
  decision: NarrativeBlock;
  flow: Array<{ glyph: GlyphName; label: string; detail: string; tone?: "heat" | "cold" }>;
  proofs: NarrativeProof[];
  learning: NarrativeBlock;
  primaryLink: { href: string; label: string; external?: boolean };
  secondaryLink?: { href: string; label: string; external?: boolean };
  next: { href: string; label: string; title: string };
}

function NarrativeCopy({ block }: { block: NarrativeBlock }) {
  return (
    <div className="v4-narrative-copy">
      <span>{block.eyebrow}</span>
      <h2>{block.title}</h2>
      <div className="v4-narrative-body">{block.body}</div>
      {block.notes?.length ? (
        <ul className="v4-constraint-list">
          {block.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function CaseStudyNarrative(props: CaseStudyNarrativeProps) {
  return (
    <>
      <Head>
        <title>{props.pageTitle}</title>
        <meta name="description" content={props.description} />
      </Head>

      <main id="main-content" className="v4-page v4-case-study">
        <ContinuityPlayhead label={props.title} />

        <header className="v4-case-hero">
          <div className="v4-case-hero-copy">
            <div className="v4-case-meta">
              <span>{props.index}</span>
              <span>{props.status}</span>
            </div>
            <h1>{props.title}</h1>
            <p className="v4-case-subtitle">{props.subtitle}</p>
            <p className="v4-case-intro">{props.introduction}</p>
            <div className="v4-case-links">
              <TextLink {...props.primaryLink}>{props.primaryLink.label}</TextLink>
              {props.secondaryLink ? (
                <TextLink {...props.secondaryLink}>{props.secondaryLink.label}</TextLink>
              ) : null}
            </div>
          </div>

          <div className="v4-case-facts" aria-label="Project facts">
            {props.facts.map((fact) => (
              <div key={fact.label}>
                <span>{fact.label}</span>
                <strong>{fact.value}</strong>
              </div>
            ))}
          </div>

          <EvidenceSpecimen {...props.heroProof} priority className="v4-case-hero-proof" />
        </header>

        <section className="v4-narrative-section v4-narrative-section-problem">
          <SectionSignal index="01">The consequential problem</SectionSignal>
          <NarrativeCopy block={props.problem} />
        </section>

        <section className="v4-narrative-section v4-narrative-section-insight">
          <SectionSignal index="02">What I saw</SectionSignal>
          <NarrativeCopy block={props.insight} />
        </section>

        <section className="v4-narrative-section v4-narrative-section-decision">
          <SectionSignal index="03">The decision that changed the system</SectionSignal>
          <NarrativeCopy block={props.decision} />
          <CausalFlow steps={props.flow} />
        </section>

        <section className="v4-proof-field">
          <SectionSignal index="04">Authentic proof</SectionSignal>
          <div className="v4-proof-grid">
            {props.proofs.map((proof, index) => (
              <EvidenceSpecimen
                {...proof}
                key={proof.src}
                className={index === 0 ? "v4-proof-primary" : ""}
              />
            ))}
          </div>
        </section>

        <section className="v4-learning-section">
          <SectionSignal index="05">What changed in my operating model</SectionSignal>
          <NarrativeCopy block={props.learning} />
        </section>

        <footer className="v4-case-next">
          <span>{props.next.label}</span>
          <TextLink href={props.next.href}>{props.next.title}</TextLink>
        </footer>
      </main>
    </>
  );
}
