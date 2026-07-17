import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ContinuityPlayhead, LivingMotif, SectionSignal, TextLink } from "@/components/v4/V4Primitives";

const projects = [
  {
    index: "01",
    title: "OrgX",
    role: "Founder · engineering · product",
    thesis: "Make AI-delivered work accountable after the prompt disappears.",
    tension: "distributed autonomy",
    evidence: "receipts / trust / continuity",
    image: "/images/case-studies/orgx-v4/artifact-receipt.png",
    href: "/projects/orgx",
    tone: "signal",
  },
  {
    index: "02",
    title: "Alma",
    role: "Production backend engineering",
    thesis: "Ship continuously where reliability, privacy, and auditability are inseparable.",
    tension: "regulated consequence",
    evidence: "HIPAA / rollout / adoption",
    image: "/images/projects/alma.svg",
    href: "/projects/alma",
    tone: "heat",
  },
  {
    index: "03",
    title: "PerfPulse",
    role: "Product engineering · Rust",
    thesis: "Respect the machine you are inspecting—and the person operating it.",
    tension: "local constraint",
    evidence: "CLI / TUI / web / Homebrew",
    image: "/images/case-studies/perfpulse-dashboard.png",
    href: "/projects/perfpulse",
    tone: "paper",
  },
  {
    index: "04",
    title: "OrgX for OpenClaw",
    role: "Plugin architecture · agent operations",
    thesis: "Add organizational memory and accountable execution where agents already work.",
    tension: "hosted continuity",
    evidence: "state / streaming / proof",
    image: "/images/case-studies/orgx-openclaw-v4/full-dashboard.png",
    href: "/projects/openclaw",
    tone: "cold",
  },
];

export default function Projects() {
  return (
    <>
      <Head>
        <title>Selected work — Hope Atina</title>
        <meta
          name="description"
          content="Selected systems work by Hope Atina across AI continuity, regulated production, developer tooling, and plugin architecture."
        />
      </Head>

      <main id="main-content" className="v4-page v4-work-page">
        <ContinuityPlayhead label="selected work" />
        <header className="v4-work-hero v4-motif-backed">
          <LivingMotif variant="branch" className="v4-work-hero-motif" label="One practice branching across four systems" />
          <span>Selected systems / 2017—now</span>
          <h1>Range, measured by the constraints that changed the work.</h1>
          <p>
            This is not a grid of equal projects. It is a spectrum—from founder-led AI
            infrastructure to regulated production and local tools—showing how I think when the
            system, audience, and consequence change.
          </p>
        </header>

        <section className="v4-work-spectrum v4-motif-backed" aria-labelledby="spectrum-title">
          <LivingMotif variant="handoff" className="v4-section-motif" />
          <SectionSignal index="01">Constraint spectrum</SectionSignal>
          <h2 id="spectrum-title" className="sr-only">Selected project spectrum</h2>
          {projects.map((project) => (
            <Link
              href={project.href}
              className={`v4-work-entry is-${project.tone} ${project.index === "01" ? "is-flagship" : ""}`}
              key={project.title}
            >
              <div className="v4-work-entry-index">
                <span>{project.index}</span>
                <small>{project.tension}</small>
              </div>
              <div className="v4-work-entry-title">
                <span>
                  {project.role}
                  {project.index === "01" ? <em className="v4-work-flagship-tag">flagship</em> : null}
                </span>
                <h2>{project.title}</h2>
              </div>
              <p>{project.thesis}</p>
              <div className="v4-work-entry-evidence">{project.evidence}</div>
              <div className="v4-work-entry-image" aria-hidden="true">
                <Image src={project.image} alt="" fill sizes="32vw" />
              </div>
              <b aria-hidden="true">inspect ↗</b>
            </Link>
          ))}
        </section>

        <section className="v4-work-method v4-motif-backed">
          <LivingMotif variant="aperture" className="v4-section-motif" />
          <SectionSignal index="02">Reading the work</SectionSignal>
          <div>
            <h2>Every case study answers five questions.</h2>
            <ol>
              <li><span>01</span> What was the consequential problem?</li>
              <li><span>02</span> What did I see that changed the frame?</li>
              <li><span>03</span> Which decision changed the system?</li>
              <li><span>04</span> What is the authentic proof?</li>
              <li><span>05</span> How did it change my operating model?</li>
            </ol>
          </div>
        </section>

        <section className="v4-work-archive v4-motif-backed">
          <LivingMotif variant="resolve" className="v4-section-motif" />
          <span>Earlier experiments still matter; they just do not all deserve the same stage.</span>
          <h2>The archive holds the breadth. This page holds the signal.</h2>
          <TextLink href="/projects/archive">Archive · 12 systems · 2017—2024</TextLink>
        </section>
      </main>
    </>
  );
}
