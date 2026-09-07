import { selectedProjects } from "@/data/selected-projects";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import MaterialSpecimen from "@/components/material/MaterialSpecimen";
import MaterialJourney from "@/components/material/MaterialJourney";
import { materialContexts } from "@/components/material/material-context";
import { SiFigma } from "react-icons/si";
import TechnologyMark from "@/components/v5/TechnologyMark";
import { practiceCapabilities, practiceTools } from "@/data/practice";
import {
  CausalFlow,
  ContinuityPlayhead,
  EvidenceSpecimen,
  SectionSignal,
  TextLink,
} from "@/components/v4/V4Primitives";
import TechnologyAtlas from "@/components/v5/TechnologyAtlas";

const clientSurfaces = ["Claude Code", "Codex", "Cursor", "OpenCode", "OpenClaw", "MCP"];

export default function Home() {

  return (
    <>
      <Head>
        <title>Hope Atina — Systems, product, and creative practice</title>
        <meta
          name="description"
          content="Hope Atina builds across production software, data platforms, AI systems, research, interactive 3D, and creative communities."
        />
      </Head>

      <main id="main-content" className="v4-page v4-home">
        <ContinuityPlayhead />

        <section data-material-form="knot" className="material-home-hero" aria-labelledby="hero-title">
          <div className="material-home-copy">
            <span className="material-eyebrow"><i aria-hidden="true" /> Hope Atina / engineer, founder, product thinker</span>
            <h1 id="hero-title">Intelligence<br />survives the<br /><em>handoff.</em></h1>
            <p>I build the memory, authority, and proof that make ambitious systems hold together. Across clinical software, data platforms, AI agents, and interactive worlds.</p>
            <div className="material-home-actions">
              <Link href="/projects" className="material-primary-link">Explore the work <span aria-hidden="true">↗</span></Link>
              <TextLink href="/proof">See the receipts</TextLink>
              <TextLink href="#skills">Skills &amp; tools</TextLink>
            </div>
            <span className="material-home-coordinate">Houston, TX · Cameroonian roots · A continuous practice</span>
          </div>
          <MaterialSpecimen context={materialContexts.home} className="material-home-object" compact />
          <div className="material-home-bottom"><span>Systems with depth.<br />Details with a reason.</span><a href="#material-journey-title">Follow the thread <span aria-hidden="true">↓</span></a><span>Selected work / 2026</span></div>
        </section>

        <aside className="material-receipt-strip" aria-label="One receipt, up front">
          <span>One handoff, in practice</span><p>Decided in Claude <i aria-hidden="true">→</i> inherited by Codex.</p>
          <Link href="/proof/orgx-mcp-server">The goal, the decision, the evidence. Intact. <span aria-hidden="true">↗</span></Link>
        </aside>

        <MaterialJourney />

        <section data-material-form="bridge" className="v4-continuity-section v4-motif-backed" aria-labelledby="continuity-title">
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
            {clientSurfaces.map((name) => (
              <div key={name}>
                <TechnologyMark name={name} />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" data-material-form="weave" className="v5-tool-section v4-motif-backed">
          <SectionSignal index="03">The working ecosystem</SectionSignal>
          <TechnologyAtlas tools={practiceTools} capabilities={practiceCapabilities} title="The range is part of the method." />
        </section>

        <section data-material-form="knot" className="v4-orgx-home v4-motif-backed" aria-labelledby="orgx-title">
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

        <section data-material-form="weave" className="v4-range-section v4-motif-backed" aria-labelledby="range-title">
          <SectionSignal index="05">Range under constraint</SectionSignal>
          <div className="v4-range-heading">
            <h2 id="range-title">Eight projects. Different kinds of pressure.</h2>
            <p>
              Learning, collective intelligence, games, clinical software, and market research.
              The domain changes. The attention to how a system holds together stays.
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

        <section data-material-form="weave" className="v4-collaboration-section v4-motif-backed" aria-labelledby="collaboration-title">
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
                <TechnologyMark name="Claude Code" />
                <TechnologyMark name="Codex" />
                <TechnologyMark name="GitHub" />
                <span>AI is abundant in the process. Judgment remains authored.</span>
              </div>
            </div>
          </div>
        </section>

        <section data-material-form="bridge" className="v4-home-close v4-motif-backed">
          <span>Watch the thread hold as you leave this page.</span>
          <h2>Everything above has a receipt. Ask for the one you need.</h2>
          <div>
            <TextLink href="/proof">See the receipts</TextLink>
              <TextLink href="#skills">Skills &amp; tools</TextLink>
            <TextLink href="mailto:hopeatina@gmail.com" external>Start a conversation</TextLink>
          </div>
        </section>
      </main>
    </>
  );
}
