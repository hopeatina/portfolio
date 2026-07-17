import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import {
  CausalFlow,
  ContinuityPlayhead,
  EvidenceSpecimen,
  GlyphName,
  LivingMotif,
  SectionSignal,
  TextLink,
} from "./V4Primitives";
import { PROOF_SCORE_LABELS, PROOF_SCORE_ORDER, getProofReceipt } from "@/data/proof";
import MaterialThreadField, { ThreadStory } from "@/components/v5/MaterialThreadField";
import TechnologyAtlas, { ToolEvidence } from "@/components/v5/TechnologyAtlas";

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

export interface SystemChapter {
  eyebrow: string;
  title: string;
  introduction: string;
  layers: Array<{
    label: string;
    title: string;
    detail: string;
    technology?: string;
    tone?: "heat" | "cold" | "signal";
  }>;
  rationale: Array<{ pressure: string; choice: string; reason: string }>;
  surfaces: Array<{ name: string; mode: string; detail: string }>;
  technologies: Array<{ label: string; values: string[] }>;
  surfaceProofs?: NarrativeProof[];
  decisions?: ThreadStory[];
  toolEvidence?: ToolEvidence[];
}

interface CaseStudyNarrativeProps {
  pageTitle: string;
  description: string;
  index: string;
  status: string;
  title: string;
  subtitle: string;
  introduction: string;
  facts: Array<{ label: string; value: string; note?: string }>;
  /** Terminal-first signature move: a copyable install/run command in the hero. */
  heroTerminal?: { command: string; note?: string };
  heroProof: NarrativeProof;
  problem: NarrativeBlock;
  insight: NarrativeBlock;
  decision: NarrativeBlock;
  flow: Array<{ glyph: GlyphName; label: string; detail: string; tone?: "heat" | "cold" }>;
  system?: SystemChapter;
  proofs: NarrativeProof[];
  /** Ledger receipts backing this case — slugs resolved against the proof data. */
  receiptSlugs?: string[];
  learning: NarrativeBlock;
  primaryLink: { href: string; label: string; external?: boolean };
  secondaryLink?: { href: string; label: string; external?: boolean };
  next: { href: string; label: string; title: string };
}

function SystemDepth({ chapter }: { chapter: SystemChapter }) {
  const decisions = chapter.decisions ?? chapter.rationale.map((item, index) => ({
    id: `decision-${index}`,
    label: item.pressure,
    before: item.pressure,
    decision: item.choice,
    consequence: item.reason,
    evidence: chapter.layers[index]?.technology,
    tone: chapter.layers[index]?.tone === "heat" || chapter.layers[index]?.tone === "cold"
      ? chapter.layers[index]?.tone
      : "signal",
  }));

  return (
    <div className="v4-system-depth">
      <div className="v4-system-depth-intro">
        <span>{chapter.eyebrow}</span>
        <h2>{chapter.title}</h2>
        <p>{chapter.introduction}</p>
      </div>

      <MaterialThreadField
        stories={decisions}
        eyebrow="Decision anatomy / select a knot"
        title="Pressure did not decorate the architecture. It determined it."
        compact
      />

      <div className="v4-architecture-map" role="list" aria-label="System architecture layers">
        {chapter.layers.map((layer, index) => (
          <article className={layer.tone ? `is-${layer.tone}` : ""} role="listitem" key={`${layer.label}-${layer.title}`}>
            <div>
              <span>{String(index + 1).padStart(2, "0")} / {layer.label}</span>
              <strong>{layer.title}</strong>
            </div>
            <p>{layer.detail}</p>
            {layer.technology ? <small>{layer.technology}</small> : null}
          </article>
        ))}
      </div>

      <div className="v4-rationale-block">
        <span>Architecture rationale / pressure → choice → consequence</span>
        <div className="v4-rationale-table" role="table" aria-label="Architecture rationale">
          <div className="v4-rationale-heading" role="row">
            <span role="columnheader">Pressure</span>
            <span role="columnheader">Decision</span>
            <span role="columnheader">Why it mattered</span>
          </div>
          {chapter.rationale.map((item) => (
            <div role="row" key={item.pressure}>
              <strong role="cell">{item.pressure}</strong>
              <span role="cell">{item.choice}</span>
              <p role="cell">{item.reason}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="v4-surface-atlas">
        <div className="v4-surface-atlas-heading">
          <span>Surface atlas</span>
          <p>The architecture is only complete when every operator and client boundary has a legible surface.</p>
        </div>
        <div className="v4-surface-atlas-grid">
          {chapter.surfaces.map((surface, index) => (
            <article key={surface.name}>
              <span>{String(index + 1).padStart(2, "0")} / {surface.mode}</span>
              <h3>{surface.name}</h3>
              <p>{surface.detail}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="v4-technology-lattice" aria-label="Technology choices">
        {chapter.technologies.map((group) => (
          <div key={group.label}>
            <span>{group.label}</span>
            <p>{group.values.join(" · ")}</p>
          </div>
        ))}
      </div>

      {chapter.toolEvidence?.length ? (
        <TechnologyAtlas tools={chapter.toolEvidence} />
      ) : null}

      {chapter.surfaceProofs?.length ? (
        <div className="v4-surface-proof-field">
          <div className="v4-surface-proof-heading">
            <span>Embedded surfaces / real product evidence</span>
            <p>These are working MCP and operator surfaces, not concept renders.</p>
          </div>
          <div className="v4-surface-proof-grid">
            {chapter.surfaceProofs.map((proof) => (
              <EvidenceSpecimen {...proof} key={proof.src} className="v4-widget-specimen" />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
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

function HeroTerminal({ command, note }: { command: string; note?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="v4-hero-terminal">
      <code>
        <span aria-hidden="true">$ </span>
        {command}
      </code>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard?.writeText(command).then(() => {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
          });
        }}
        aria-label={copied ? "Copied" : "Copy install command"}
      >
        {copied ? "copied" : "copy"}
      </button>
      {note ? <em className="v4-disclosure">{note}</em> : null}
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
          <LivingMotif variant="handoff" className="v4-case-hero-motif" label="A continuity signal crossing a system boundary" />
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
                {fact.note ? <em className="v4-disclosure">{fact.note}</em> : null}
              </div>
            ))}
            {props.heroTerminal ? (
              <HeroTerminal command={props.heroTerminal.command} note={props.heroTerminal.note} />
            ) : null}
          </div>

          <EvidenceSpecimen {...props.heroProof} priority className="v4-case-hero-proof" />
        </header>

        <section className="v4-narrative-section v4-narrative-section-problem v4-motif-backed">
          <LivingMotif variant="weave" className="v4-section-motif" />
          <SectionSignal index="01">The consequential problem</SectionSignal>
          <NarrativeCopy block={props.problem} />
        </section>

        <section className="v4-narrative-section v4-narrative-section-insight v4-motif-backed">
          <LivingMotif variant="aperture" className="v4-section-motif" />
          <SectionSignal index="02">What I saw</SectionSignal>
          <NarrativeCopy block={props.insight} />
        </section>

        <section className="v4-narrative-section v4-narrative-section-decision v4-motif-backed">
          <LivingMotif variant="branch" className="v4-section-motif" />
          <SectionSignal index="03">The decision that changed the system</SectionSignal>
          <NarrativeCopy block={props.decision} />
          <CausalFlow steps={props.flow} />
        </section>

        {props.system ? (
          <section className="v4-system-chapter v4-motif-backed">
            <LivingMotif variant="handoff" className="v4-system-chapter-motif" />
            <SectionSignal index="04">System anatomy / rationale / surfaces</SectionSignal>
            <SystemDepth chapter={props.system} />
          </section>
        ) : null}

        <section className="v4-proof-field v4-motif-backed">
          <LivingMotif variant="aperture" className="v4-section-motif" />
          {props.receiptSlugs && props.receiptSlugs.length > 0 ? (
            <div className="v4-case-receipts" aria-label="Ledger receipts for this system">
              <span className="v4-case-receipts-label">On the ledger</span>
              {props.receiptSlugs.map((slug) => {
                const receipt = getProofReceipt(slug);
                if (!receipt) return null;
                return (
                  <Link href={`/proof/${receipt.slug}`} key={slug} className="v4-case-receipt">
                    <span className="v4-proof-score" aria-label={`Proof score ${receipt.score.length} of 6`}>
                      {PROOF_SCORE_ORDER.map((key) => (
                        <i key={key} className={`${receipt.score.includes(key) ? "is-earned" : ""} ${key === "external" ? "is-external" : ""}`}>
                          {PROOF_SCORE_LABELS[key].short}
                        </i>
                      ))}
                    </span>
                    <b>Receipt {receipt.index}</b>
                    <span className="v4-case-receipt-title">{receipt.title}</span>
                    <i aria-hidden="true">&rarr;</i>
                  </Link>
                );
              })}
            </div>
          ) : null}

          <SectionSignal index={props.system ? "05" : "04"}>Authentic proof</SectionSignal>
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

        <section className="v4-learning-section v4-motif-backed">
          <LivingMotif variant="memory" className="v4-section-motif" />
          <SectionSignal index={props.system ? "06" : "05"}>What changed in my operating model</SectionSignal>
          <NarrativeCopy block={props.learning} />
        </section>

        <footer className="v4-case-next v4-motif-backed">
          <LivingMotif variant="resolve" className="v4-case-next-motif" />
          <span>{props.next.label}</span>
          <TextLink href={props.next.href}>{props.next.title}</TextLink>
        </footer>
      </main>
    </>
  );
}
