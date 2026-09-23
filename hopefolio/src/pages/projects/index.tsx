import { selectedProjects } from "@/data/selected-projects";
import { archivedProjects } from "@/data/portfolio";
import MaterialProjectIndex from "@/components/material/MaterialProjectIndex";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ContinuityPlayhead, SectionSignal, TextLink } from "@/components/v4/V4Primitives";

export default function Projects() {
  return (
    <>
      <Head>
        <title>Selected work — Hope Atina</title>
        <meta
          name="description"
          content="Eight projects by Hope Atina across AI infrastructure, learning, distributed ML, games, market research, clinical systems, and developer tooling."
        />
      </Head>

      <main id="main-content" className="v4-page v4-work-page">
        <ContinuityPlayhead label="selected work" />
        <header className="v4-work-hero v4-motif-backed">
          <MaterialProjectIndex />
          <span>Selected systems / 2017—now</span>
          <h1 data-thread="">Different worlds. One way of seeing.</h1>
          <p>
            Agent infrastructure, learning, collective intelligence, games, markets. Eight
            projects, each under a different kind of pressure.
          </p>
        </header>

        <section className="v4-work-spectrum v4-motif-backed" aria-labelledby="spectrum-title">
          <SectionSignal index="01">Constraint spectrum</SectionSignal>
          <h2 id="spectrum-title" className="sr-only">Selected project spectrum</h2>
          {selectedProjects.map((project) => (
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
                  {project.stageLabel ? <em className="material-project-stage">{project.stageLabel}</em> : null}
                </span>
                <h2>{project.title}</h2>
              </div>
              <p>{project.thesis}</p>
              <div className="v4-work-entry-evidence">{project.evidence}</div>
              <div className="v4-work-entry-image" aria-hidden="true">
                <Image src={project.heroImage} alt="" fill sizes="(max-width: 820px) 85vw, 32vw" />
              </div>
              <b aria-hidden="true">inspect ↗</b>
            </Link>
          ))}
        </section>

        <section className="v4-work-method v4-motif-backed">
          <SectionSignal index="02">Reading the work</SectionSignal>
          <div>
            <h2>Every case study answers the same five questions.</h2>
            <ol>
              <li><span>01</span> What was the problem, and who paid for it?</li>
              <li><span>02</span> What did I notice that changed the frame?</li>
              <li><span>03</span> Which decision changed the system?</li>
              <li><span>04</span> What's the proof?</li>
              <li><span>05</span> What changed in how I work?</li>
            </ol>
          </div>
        </section>

        <section className="v4-work-archive v4-motif-backed">
          <span>The earlier experiments still count. They just don't all need the stage.</span>
          <h2 data-thread="">The archive has the range. This page has the signal.</h2>
          <TextLink href="/projects/archive">Archive · {archivedProjects.length} systems</TextLink>
        </section>
      </main>
    </>
  );
}
