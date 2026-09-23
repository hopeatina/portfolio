import MaterialSpecimen from "@/components/material/MaterialSpecimen";
import { materialContexts } from "@/components/material/material-context";
import Head from "next/head";
import Image from "next/image";
import {
  ContinuityPlayhead,
  SectionSignal,
  SystemGlyph,
  TextLink,
} from "@/components/v4/V4Primitives";
import MaterialThreadField from "@/components/v5/MaterialThreadField";
import TechnologyAtlas from "@/components/v5/TechnologyAtlas";
import { practiceCapabilities, practiceTools } from "@/data/practice";

const practiceThreads = [
  {
    id: "human-consequence",
    label: "human consequence",
    before: "A problem can look solved while the person living with it still pays for it.",
    decision: "Start with the person. Then bring whatever disciplines the fix actually needs.",
    consequence: "Bioengineering stuck as a product instinct. Understand the system, build the mechanism, prove it worked.",
    evidence: "Rice bioengineering · DermaShift",
    tone: "heat" as const,
  },
  {
    id: "creative-rhythm",
    label: "creative rhythm",
    before: "An interface can be technically correct and still feel flat.",
    decision: "Compose software with timing, tension, release, and room for someone else to play.",
    consequence: "Music and dance stay quiet in the work. They still set the pacing.",
    evidence: "Music production · shared making",
    tone: "cold" as const,
  },
  {
    id: "amplification",
    label: "amplify people",
    before: "People's best work gets hidden by the room, the process, or the tools.",
    decision: "Set up the conditions where people make things together and can see each other's work.",
    consequence: "The system becomes an amplifier. A community, a product team, a fleet of agents working for one company.",
    evidence: "Figma and Chill · OrgX",
    tone: "signal" as const,
  },
];

export default function About() {
  return (
    <>
      <Head>
        <title>About Hope Atina</title>
        <meta
          name="description"
          content="Hope Atina is a Houston-based engineer, founder, and product thinker working across production software, data, AI, research, interactive 3D, and creative communities."
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
          <MaterialSpecimen context={materialContexts.about} className="material-inner-object" compact />
          <div>
            <span>About / inspection as a creative practice</span>
            <h1 data-thread="">Every thread I pull should reveal more of what people can become.</h1>
            <p>
              Houston builder, Cameroonian roots. What I keep coming back to is amplification.
              Understand a system well enough that a person, a team, or a generation can move with
              more agency.
            </p>
            <TextLink href="#skills">Explore my skills and tools</TextLink>
            <figure className="v4-about-portrait">
              <Image
                src="/images/hope-profile.jpg"
                alt="Hope Atina"
                fill
                sizes="(min-width: 900px) 320px, 62vw"
              />
              <figcaption>
                <span>Houston</span>
                <span>Cameroonian roots</span>
              </figcaption>
            </figure>
          </div>
        </header>

        <section className="v4-life-thread" aria-labelledby="life-thread-title">
          <SectionSignal index="00">One thread, four scales</SectionSignal>
          <div className="v4-life-thread-heading">
            <h2 id="life-thread-title">The biography and the thread are the same drawing.</h2>
            <p>
              Everything I build makes something survive a handoff. I learned each version of that
              at a different scale.
            </p>
          </div>
          <ol className="v4-life-thread-list">
            <li>
              <SystemGlyph name="context" />
              <div>
                <span>Weave · Cameroonian roots</span>
                <h3 data-thread="">Meaning has to survive translation.</h3>
                <p>
                  The same words carry different weight depending on who is listening and what they
                  have lived. Check the structure before you trust the surface.
                </p>
              </div>
            </li>
            <li>
              <SystemGlyph name="judgment" />
              <div>
                <span>Registration · Rice → DermaShift → clinical production</span>
                <h3 data-thread="">At the human boundary, a dropped handoff costs a person.</h3>
                <p>
                  Bioengineering, then healthcare systems under HIPAA. Make the risk visible, keep the
                  rollout reversible, attach the evidence. The boundary is where the consequence lives.
                </p>
              </div>
            </li>
            <li>
              <SystemGlyph name="branch" />
              <div>
                <span>Branch · Figma &amp; Chill</span>
                <h3 data-thread="">One thread, many hands, nothing lost in the fork.</h3>
                <p>
                  A community built by making things together. Everyone kept their own strength and
                  the thing still held. Figma platformed it.
                </p>
              </div>
            </li>
            <li>
              <SystemGlyph name="receipt" />
              <div>
                <span>Memory knot · OrgX</span>
                <h3 data-thread="">The decision returns as a receipt the next run inherits.</h3>
                <p>
                  Memory, authority, execution, and proof for agent work. The thread, shipped as
                  infrastructure.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section id="origins" className="v4-about-origin v4-motif-backed">
          <SectionSignal index="01">The root system</SectionSignal>
          <div className="v4-about-origin-grid">
            <h2>Multidisciplinary from the first serious problem.</h2>
            <div>
              <p>
                My Cameroonian roots were my first lesson in translation. The same thing can mean
                something different depending on context and history. I learned early to look at
                the structure before believing the surface.
              </p>
              <p>
                Bioengineering at Rice gave that instinct rigor. With DermaShift, our team built a
                low-cost way to detect pressure-ulcer risk and won a national undergraduate design
                competition. A human need, clinicians, sensors, product design, proof. I still work
                that way.
              </p>
              <p>
                Music and dance sit in the background. Timing, tension, release. A composition can be
                technically correct and still feel unfinished.
              </p>
            </div>
          </div>
          <div className="v5-origin-proof">
            <figure>
              <div className="v5-origin-proof-media">
                <Image
                  src="/images/evidence/rice-dermashift-team.jpg"
                  alt="Hope Atina with the Rice DermaShift bioengineering team"
                  fill
                  sizes="(min-width: 900px) 46vw, 100vw"
                />
              </div>
              <figcaption>
                <span>Rice bioengineering · DermaShift</span>
                <a href="https://www.asme.org/topics-resources/content/asmes-bioengineering-division-and-nsf-inspire-stu" target="_blank" rel="noreferrer">Photo / ASME ↗</a>
              </figcaption>
            </figure>
            <div className="v5-origin-proof-copy">
              <span>2015 / rehabilitation + assistive devices</span>
              <h3>A real person. A physical system. A device that had to earn belief.</h3>
              <p>
                Pressure ulcers aren't a dashboard problem. We had to understand the clinical need,
                build a portable device, make the economics work, and explain the evidence plainly.
                That's still how I want engineering to meet the world.
              </p>
            </div>
          </div>
        </section>

        <section className="v4-about-method v4-motif-backed">
          <SectionSignal index="02">The practice</SectionSignal>
          <div className="v4-about-method-heading">
            <h2>Look closely. Find the boundary. Build the fix. Leave it stronger.</h2>
            <p>
              A hard problem is useful once it shows you the mechanism underneath. I like working
              with people where disagreement sharpens the model and evidence settles the next move.
            </p>
          </div>
          <MaterialThreadField
            stories={practiceThreads}
            eyebrow="One practice / different materials"
            title="A bend can become a break. A break can reveal the next weave."
            compact
          />
        </section>

        <section id="experience" className="v4-about-experience v4-motif-backed">
          <SectionSignal index="03">The questions got harder</SectionSignal>
          <div className="v4-about-arc-heading">
            <h2>Each environment added a boundary I could no longer ignore.</h2>
            <p>One practice that kept growing. Not a list of unrelated jobs.</p>
          </div>
          <div className="v4-about-chapter-list">
            <article>
              <span>01 / Capital One · scale</span>
              <h3>Can data be trusted before it starts moving?</h3>
              <p>In regulated finance, data quality and lineage were part of the system. You didn't get to clean up after the pipeline.</p>
              <small>Spark · Scala · Snowflake · near-real-time ETL</small>
            </article>
            <article>
              <span>02 / Vessel Health · ownership</span>
              <h3>What changes when the API touches hardware and operations?</h3>
              <p>I led backend work across auth, calibration, AWS, and internal workflows. Ownership stopped ending at the code.</p>
              <small>API architecture · hardware calibration · AWS · operations</small>
            </article>
            <article>
              <span>03 / Alma · consequence</span>
              <h3>How do you move continuously when failure reaches clinical work?</h3>
              <p>HIPAA production taught me to bring privacy in early, make failure visible, keep rollouts reversible, and treat operator trust as engineering quality.</p>
              <small>Django · Celery · PostgreSQL · Datadog</small>
            </article>
            <article>
              <span>Research / MD Anderson · visualization</span>
              <h3>Can the right picture change an operational decision?</h3>
              <p>Research that turned operating-room capacity into a picture people could actually use.</p>
              <small>React · D3.js · scientific and operational visualization</small>
            </article>
            <article className="v4-about-chapter-featured">
              <span>04 / OrgX · synthesis</span>
              <h3>How can many intelligent actors move without losing the organization?</h3>
              <p>OrgX pulls all of it together. Shared context, agents working in the clients you already use, judgment where it matters, and proof that improves the next decision.</p>
              <small>Founder · product · architecture · distribution</small>
              <TextLink href="/projects/orgx">Inspect the system</TextLink>
            </article>
          </div>
        </section>

        <section id="community" className="v4-about-collaboration v4-motif-backed">
          <SectionSignal index="04">Collaboration is a creative technology</SectionSignal>
          <div>
            <h2>I started Figma and Chill because talking about design wasn't enough.</h2>
            <p>
              It started as an empty Clubhouse room. It grew into a global BIPOC design community
              where people made things together in real time. At Config 2021 we shared how it
              worked.
            </p>
            <a
              href="https://www.youtube.com/watch?v=JSpfsuK75j0&t=171s"
              target="_blank"
              rel="noreferrer"
              className="v4-text-link"
            >
              Watch the Config talk <span aria-hidden="true">↗</span>
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

        <section id="skills" data-material-form="weave" className="v5-tool-section v4-motif-backed">
          <TechnologyAtlas tools={practiceTools} capabilities={practiceCapabilities} title="What I bring to the work." />
        </section>

        <section className="v4-about-now v4-motif-backed">
          <span>Now / September 2026</span>
          <h2 data-thread="">Building OrgX in public. Proof for AI-delivered work.</h2>
          <p>
            Open to founder collaborations and senior or staff roles where systems depth, product
            judgment, and AI-native execution all matter at once.
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
