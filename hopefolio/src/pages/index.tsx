import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SiAnthropic, SiClaude, SiFigma, SiGithub, SiOpenai } from "react-icons/si";
import {
  CausalFlow,
  ContinuityPlayhead,
  EvidenceSpecimen,
  SectionSignal,
  SystemGlyph,
  TextLink,
} from "@/components/v4/V4Primitives";
import MaterialThreadField from "@/components/v5/MaterialThreadField";
import TechnologyAtlas, { ToolEvidence } from "@/components/v5/TechnologyAtlas";

const heroThreads = [
  {
    id: "continuity",
    label: "carry the work",
    before: "A capable agent starts the next session without the goal, the decisions, or the reason behind them.",
    decision: "Compile the goal, constraints, prior proof, permissions, and next move into one handoff.",
    consequence: "A decision made in Claude is still there when Codex takes over.",
    evidence: "OrgX context pack + goal frame",
    tone: "cold" as const,
  },
  {
    id: "quality",
    label: "set the bar",
    before: "More output creates more review, while the standard remains trapped in one person's head.",
    decision: "Let the owner author the global bar, then tune it by team and artifact type.",
    consequence: "Work below the bar loops back before it reaches the reviewer.",
    evidence: "OrgX quality bar + domain gates",
    tone: "signal" as const,
  },
  {
    id: "value",
    label: "prove movement",
    before: "Agent activity looks impressive even when it does not move the goal.",
    decision: "Bind work, proof, cost, value, and budget to the goal that authorized it.",
    consequence: "A person can see what moved, what it cost, and whether the next action still earns its place.",
    evidence: "Goal ROI + economic ledger",
    tone: "heat" as const,
  },
];

const toolEvidence: ToolEvidence[] = [
  { name: "Claude", icon: "anthropic", category: "AI clients", project: "OrgX", reason: "A strong native surface for long-context product and engineering work; OrgX carries the organizational state into it instead of replacing it." },
  { name: "Codex", icon: "openai", category: "AI clients", project: "OrgX", reason: "Repo-native execution and verification. The continuity layer gives each run the goal, boundaries, and prior decisions before code changes begin." },
  { name: "MCP", mark: "MCP", category: "Protocol", project: "OrgX", reason: "The portable contract that makes the same organizational memory and governed actions available across otherwise different AI clients." },
  { name: "MCP Apps", mark: "UI", category: "Protocol", project: "OrgX", reason: "Turns a tool result into an inspectable, actionable surface inside the client—briefs, decisions, status, search, and proof." },
  { name: "Next.js", icon: "next", category: "Product", project: "OrgX", reason: "One typed product surface for operator workflows, proof views, settings, and server-side read models." },
  { name: "TypeScript", icon: "typescript", category: "Product", project: "OrgX + plugins", reason: "Keeps tool contracts, host integrations, UI state, and cross-repo packages legible as the ecosystem expands." },
  { name: "Cloudflare", icon: "cloudflare", category: "Runtime", project: "OrgX MCP", reason: "Edge transport, OAuth, session isolation, and durable state close to every client connection." },
  { name: "Inngest", mark: "IN", category: "Runtime", project: "OrgX", reason: "Durable background execution for work that must survive request boundaries, retries, and recovery." },
  { name: "Supabase", icon: "supabase", category: "Data", project: "OrgX", reason: "A shared work graph for goals, initiatives, decisions, receipts, artifacts, and the economics connecting them." },
  { name: "PostgreSQL", icon: "postgres", category: "Data", project: "Alma + OrgX", reason: "Durable relational state where traceability, long-running workflows, and accountable changes matter." },
  { name: "Django", icon: "django", category: "Product", project: "Alma", reason: "Narrow, reviewable clinical API boundaries with a mature permissions and data model ecosystem." },
  { name: "Datadog", icon: "datadog", category: "Proof", project: "Alma", reason: "Makes failure paths visible early enough for engineering to intervene before clinical operators absorb them." },
  { name: "Rust", icon: "rust", category: "Runtime", project: "PerfPulse", reason: "A small local core lets the diagnostic tool respect the machine it is inspecting and ship as one binary." },
  { name: "GitHub", icon: "github", category: "Proof", project: "Across the work", reason: "Source, review, CI, and merge receipts keep engineering claims attached to inspectable evidence." },
  { name: "Figma", icon: "figma", category: "Creative", project: "Figma and Chill", reason: "A multiplayer creative surface where shared making—not presentation—became the mechanism for community and taste." },
  { name: "OpenAI", icon: "openai", category: "AI clients", project: "OrgX", reason: "Agents and model judgment are used abundantly, but inside an authored goal, quality, and consequence system." },
];

const signatures = [
  {
    glyph: "context" as const,
    title: "Memory",
    body: "The next run inherits the goal, the decisions, and the prior proof — compiled context, not a re-typed prompt.",
  },
  {
    glyph: "judgment" as const,
    title: "Authority",
    body: "Agents act inside bounded permission tiers; high-consequence work waits for the right person, not every action.",
  },
  {
    glyph: "branch" as const,
    title: "Execution",
    body: "One operating context survives the jump between Claude, Codex, Cursor, OpenCode, and OpenClaw — each keeps its native strength.",
  },
  {
    glyph: "receipt" as const,
    title: "Proof",
    body: "Every claim carries a receipt: a baseline, a measured result, a documented failure, and an artifact you can open.",
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
        <title>Hope Atina — Memory, authority, execution, proof</title>
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
          <MaterialThreadField stories={heroThreads} className="v5-hero-weave" compact />
          <div className="v4-home-hero-copy">
            <motion.span
              className="v4-hero-kicker"
              initial={reduceMotion ? false : { opacity: 1, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Hope Atina · the execution layer for governed agent work
            </motion.span>
            <motion.h1
              id="hero-title"
              initial={reduceMotion ? false : { opacity: 1, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              I build systems where intelligence survives the handoff.
            </motion.h1>
            <motion.p
              className="v4-hero-deck"
              initial={reduceMotion ? false : { opacity: 1, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
            >
              Memory, authority, execution, proof: I build the layer that lets a real
              organization continue, govern, judge, and trust the work its agents deliver.
            </motion.p>
            <motion.div
              className="v4-hero-actions"
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.28 }}
            >
              <TextLink href="/proof">See the receipts</TextLink>
              <TextLink href="/projects/orgx">Read the flagship case</TextLink>
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
              <span>Cameroonian roots</span>
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
          <SectionSignal index="01">Memory · Authority · Execution · Proof</SectionSignal>
          <div className="v4-signature-intro">
            <h2 id="signatures-title">Four words. Every system I build serves one of them.</h2>
            <p>
              The territory is the organizational runtime for governed agent work: what the
              next run remembers, what it may do, where it runs, and how it proves what happened.
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
          <SectionSignal index="02">The system I keep building toward</SectionSignal>
          <div className="v4-continuity-heading">
            <h2 id="continuity-title">The prompt ends. The work should not.</h2>
            <p>
              Autonomy is easy to demonstrate. The harder problem is carrying the goal, decisions,
              quality bar, and evidence as work crosses clients and people.
            </p>
          </div>
          <CausalFlow
            steps={[
              { glyph: "context", label: "Carry the why", detail: "The next agent receives the goal, constraints, decisions, and prior proof together." },
              { glyph: "branch", label: "Use the right client", detail: "Claude, Codex, Cursor, and other specialists keep their native strengths.", tone: "cold" },
              { glyph: "judgment", label: "Pause at consequence", detail: "High-consequence work waits for the right person—not every action.", tone: "heat" },
              { glyph: "receipt", label: "Teach the next run", detail: "The result returns with enough evidence to improve what happens next." },
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

        <section className="v5-tool-section v4-motif-backed">
          <SectionSignal index="03">The working ecosystem</SectionSignal>
          <TechnologyAtlas tools={toolEvidence} title="A wide stack, held together by reasons." />
        </section>

        <section className="v4-orgx-home v4-motif-backed" aria-labelledby="orgx-title">
          <SectionSignal index="04">Flagship / OrgX</SectionSignal>
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
          <SectionSignal index="05">Range under constraint</SectionSignal>
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
          <SectionSignal index="06">Product taste is collaborative</SectionSignal>
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
