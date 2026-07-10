import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SiAnthropic, SiClaude, SiFigma, SiGithub, SiOpenai } from "react-icons/si";
import {
  CausalFlow,
  ContinuityPlayhead,
  EvidenceSpecimen,
  LivingMotif,
  SectionSignal,
  SystemGlyph,
  TextLink,
} from "@/components/v4/V4Primitives";

const signatures = [
  {
    glyph: "context" as const,
    title: "Protocol → product",
    body: "I turn technical capability into a surface people can understand, trust, and actually use.",
  },
  {
    glyph: "branch" as const,
    title: "Continuity across clients",
    body: "One operating context can survive the jump between Claude, Codex, Cursor, OpenCode, and OpenClaw.",
  },
  {
    glyph: "judgment" as const,
    title: "Production under pressure",
    body: "Regulated systems taught me to make risk visible, rollout reversible, and reliability part of the design.",
  },
  {
    glyph: "receipt" as const,
    title: "Taste with receipts",
    body: "The interaction, evidence, and final mile matter as much as the architecture underneath them.",
  },
];

const clientSurfaces = [
  { name: "Claude Code", icon: SiClaude },
  { name: "Codex", icon: SiOpenai },
  { name: "Cursor", mark: "C/" },
  { name: "OpenCode", mark: "OC" },
  { name: "OpenClaw", mark: "◩" },
  { name: "MCP", mark: "MCP" },
];

const range = [
  {
    number: "01",
    title: "OrgX",
    mode: "Founder / systems / product",
    thesis: "A continuity and proof layer for AI-delivered work.",
    constraint: "Many agents. Many clients. One accountable operating picture.",
    href: "/projects/orgx",
    image: "/images/case-studies/orgx-v4/artifact-receipt.png",
  },
  {
    number: "02",
    title: "Alma",
    mode: "Production engineering",
    thesis: "Healthcare systems that hold when failure has consequences.",
    constraint: "HIPAA constraints, long-running workflows, careful rollout.",
    href: "/projects/alma",
    image: "/images/projects/alma.svg",
  },
  {
    number: "03",
    title: "PerfPulse",
    mode: "Developer tooling",
    thesis: "A Rust utility whose install path is part of the product.",
    constraint: "Three operator surfaces. One small, local-first core.",
    href: "/projects/perfpulse",
    image: "/images/case-studies/perfpulse-dashboard.png",
  },
  {
    number: "04",
    title: "OrgX for OpenClaw",
    mode: "Plugin architecture",
    thesis: "Persistent organizational memory inside the agent environment.",
    constraint: "Resumable state, real-time control, proof at the handoff.",
    href: "/projects/openclaw",
    image: "/images/case-studies/orgx-openclaw-v4/full-dashboard.png",
  },
];

export default function Home() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <Head>
        <title>Hope Atina — Engineer, founder, product thinker</title>
        <meta
          name="description"
          content="Hope Atina builds the continuity, product, and proof layers that make ambitious AI systems coherent."
        />
      </Head>

      <main id="main-content" className="v4-page v4-home">
        <ContinuityPlayhead />

        <section className="v4-home-hero" aria-labelledby="hero-title">
          <Image
            className="v4-hero-field"
            src="/images/generated/inspection-field.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            aria-hidden="true"
          />
          <LivingMotif variant="weave" className="v4-hero-live-motif" label="Multiple systems resolving into one continuous signal" />
          <div className="v4-home-hero-copy">
            <motion.span
              className="v4-hero-kicker"
              initial={reduceMotion ? false : { opacity: 1, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Hope Atina · engineer / founder / product thinker
            </motion.span>
            <motion.h1
              id="hero-title"
              initial={reduceMotion ? false : { opacity: 1, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              I build the invisible layer that makes ambitious systems coherent.
            </motion.h1>
            <motion.p
              className="v4-hero-deck"
              initial={reduceMotion ? false : { opacity: 1, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
            >
              Across AI clients, regulated products, and operator surfaces, I keep context alive,
              judgment explicit, and outcomes inspectable.
            </motion.p>
            <motion.div
              className="v4-hero-actions"
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.28 }}
            >
              <TextLink href="/projects/orgx">Inspect the flagship</TextLink>
              <TextLink href="/hiring">Work with me</TextLink>
            </motion.div>
          </div>

          <motion.figure
            className="v4-hero-portrait"
            initial={reduceMotion ? false : { opacity: 1, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/hope-profile.jpg"
              alt="Hope Atina"
              fill
              priority
              sizes="(min-width: 1000px) 28vw, 42vw"
            />
            <figcaption>
              <span>Houston</span>
              <span>Cameroon / Estonia</span>
            </figcaption>
          </motion.figure>

          <div className="v4-hero-register" aria-label="Working modes">
            <span>Systems</span>
            <span>Product</span>
            <span>AI-native execution</span>
            <span>Founder ownership</span>
          </div>
        </section>

        <section className="v4-signature-section v4-motif-backed" aria-labelledby="signatures-title">
          <LivingMotif variant="aperture" className="v4-section-motif" />
          <SectionSignal index="01">Capability signatures</SectionSignal>
          <div className="v4-signature-intro">
            <h2 id="signatures-title">Range is only useful when it resolves into judgment.</h2>
            <p>
              The common thread is not a stack or a number. It is the ability to see the whole
              system, locate the consequential boundary, and make it legible.
            </p>
          </div>
          <div className="v4-signature-grid">
            {signatures.map((signature, index) => (
              <article key={signature.title}>
                <span>0{index + 1}</span>
                <SystemGlyph name={signature.glyph} />
                <h3>{signature.title}</h3>
                <p>{signature.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="v4-continuity-section v4-motif-backed" aria-labelledby="continuity-title">
          <LivingMotif variant="branch" className="v4-section-motif" />
          <SectionSignal index="02">The system I keep building toward</SectionSignal>
          <div className="v4-continuity-heading">
            <h2 id="continuity-title">Continuity is the product.</h2>
            <p>
              Autonomy is easy to demonstrate. The harder engineering problem is preserving what
              matters as work branches, crosses clients, meets human judgment, and returns as memory.
            </p>
          </div>
          <CausalFlow
            steps={[
              { glyph: "context", label: "Context survives", detail: "Intent, constraints, decisions, and evidence enter together." },
              { glyph: "branch", label: "Work branches", detail: "Specialists act across clients without losing the operating picture.", tone: "cold" },
              { glyph: "judgment", label: "Risk meets judgment", detail: "The system escalates consequence, not mere activity.", tone: "heat" },
              { glyph: "receipt", label: "Outcome becomes memory", detail: "Proof returns to the graph and improves the next decision." },
            ]}
          />
          <div className="v4-client-rail" aria-label="AI clients and surfaces">
            <span className="v4-client-rail-label">one operating context / many surfaces</span>
            {clientSurfaces.map(({ name, icon: Icon, mark }) => (
              <div key={name}>
                {Icon ? <Icon aria-hidden="true" /> : <strong aria-hidden="true">{mark}</strong>}
                <span>{name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="v4-orgx-home v4-motif-backed" aria-labelledby="orgx-title">
          <LivingMotif variant="handoff" className="v4-section-motif" />
          <SectionSignal index="03">Flagship / OrgX</SectionSignal>
          <div className="v4-orgx-home-heading">
            <div>
              <span>Founder-built continuity infrastructure</span>
              <h2 id="orgx-title">The proof layer for AI-delivered work.</h2>
            </div>
            <p>
              OrgX turns agent activity into accountable work: initiatives, agents, decisions,
              artifacts, receipts, and proof rooms that remain legible after the prompt is gone.
            </p>
          </div>

          <div className="v4-orgx-proof-grid">
            <EvidenceSpecimen
              src="/images/case-studies/orgx-v4/artifact-receipt.png"
              alt="OrgX artifact viewer showing a lead claim pack with decision provenance and an evidence score"
              label="Receipt-first artifact viewer"
              caption="The output, the decision path, the quality bar, and the human boundary live on one proof surface."
              priority
              className="v4-proof-primary"
            />
            <EvidenceSpecimen
              src="/images/case-studies/orgx-v4/live-desk.png"
              alt="OrgX live desk showing an agent's current work, trust state, and recent outcomes"
              label="Operator desk"
              caption="Trust is expressed through what the agent may do next—not through a generic status badge."
            />
          </div>

          <div className="v4-orgx-home-footer">
            <p>
              The consequential decision was making the operating context accessible across clients.
              That turns OrgX from one destination into a continuity layer.
            </p>
            <TextLink href="/projects/orgx">Read the OrgX case study</TextLink>
          </div>
        </section>

        <section className="v4-range-section v4-motif-backed" aria-labelledby="range-title">
          <LivingMotif variant="weave" className="v4-section-motif" />
          <SectionSignal index="04">Range under constraint</SectionSignal>
          <div className="v4-range-heading">
            <h2 id="range-title">Four systems. Four different kinds of pressure.</h2>
            <p>
              Founder work, healthcare production, local developer tooling, and plugin architecture
              reveal more than an equal grid of project cards ever could.
            </p>
          </div>
          <div className="v4-range-list">
            {range.map((item) => (
              <Link href={item.href} className="v4-range-item" key={item.title}>
                <span className="v4-range-number">{item.number}</span>
                <div className="v4-range-title">
                  <span>{item.mode}</span>
                  <h3>{item.title}</h3>
                </div>
                <p>{item.thesis}</p>
                <small>{item.constraint}</small>
                <div className="v4-range-preview" aria-hidden="true">
                  <Image src={item.image} alt="" fill sizes="24vw" />
                </div>
                <b aria-hidden="true">↗</b>
              </Link>
            ))}
          </div>
        </section>

        <section className="v4-collaboration-section v4-motif-backed" aria-labelledby="collaboration-title">
          <LivingMotif variant="resolve" className="v4-section-motif" />
          <SectionSignal index="05">Product taste is collaborative</SectionSignal>
          <div className="v4-collaboration-grid">
            <a
              className="v4-config-proof"
              href="https://www.youtube.com/watch?v=JSpfsuK75j0&t=171s"
              target="_blank"
              rel="noreferrer"
              aria-label="Watch Hope Atina discuss the origin of Figma and Chill at Config 2021"
            >
              <Image
                src="/images/evidence/figma-config-2021.jpg"
                alt="Figma Config 2021 talk cover for Figma and Chill"
                fill
                sizes="(min-width: 900px) 54vw, 100vw"
              />
              <span>Config 2021 · watch from 02:51 ↗</span>
            </a>
            <div className="v4-collaboration-copy">
              <SiFigma aria-hidden="true" />
              <span>Figma &amp; Chill</span>
              <h2 id="collaboration-title">Less talk. More action. More people in the file.</h2>
              <p>
                I started Figma and Chill because conversation alone was not enough. It became a
                global BIPOC design community built through play, shared making, iteration, and culture.
              </p>
              <blockquote>
                “I’m less about talk and more about action.”
                <cite>Hope Atina · Config 2021</cite>
              </blockquote>
              <div className="v4-ai-proof-row" aria-label="AI-native collaborators">
                <SiAnthropic title="Anthropic" />
                <SiOpenai title="OpenAI" />
                <SiGithub title="GitHub" />
                <span>AI is abundant in the process. Judgment remains authored.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="v4-home-close v4-motif-backed">
          <LivingMotif variant="memory" className="v4-home-close-motif" />
          <span>Depth becomes visible through inspection.</span>
          <h2>Bring me the system that needs to become coherent.</h2>
          <div>
            <TextLink href="mailto:hopeatina@gmail.com" external>Start a conversation</TextLink>
            <TextLink href="/projects">Inspect the work</TextLink>
          </div>
        </section>
      </main>
    </>
  );
}
