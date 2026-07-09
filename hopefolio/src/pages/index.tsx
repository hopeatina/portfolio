import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Chapter = {
  id: string;
  number: string;
  verb: string;
  title: string;
  body: string;
  signal: string;
  proof: string;
  image: string;
  imageAlt: string;
  detail: string;
};

const chapters: Chapter[] = [
  {
    id: "context",
    number: "01",
    verb: "Context survives",
    title: "The system remembers what the prompt forgets.",
    body:
      "Org memory carries decisions, constraints, evidence, and intent forward so every new agent starts from a living operating context—not an empty chat window.",
    signal: "12 repositories · one shared context layer",
    proof: "Persistent memory",
    image: "/images/case-studies/orgx-live.png",
    imageAlt: "OrgX command center with live initiatives and organizational context",
    detail: "Workspace context → decision provenance → durable handoff",
  },
  {
    id: "action",
    number: "02",
    verb: "Agents act",
    title: "Delegation gets aggressive. The operating picture stays calm.",
    body:
      "Specialist agents route work across MCP tools, durable workflows, and real operator surfaces. The point is not more activity. It is more leverage without losing the thread.",
    signal: "61 MCP tools · 16 categories",
    proof: "Coordinated execution",
    image: "/images/case-studies/orgx-agents.png",
    imageAlt: "OrgX specialist agent roster and active work timeline",
    detail: "Route → execute → observe → recover",
  },
  {
    id: "judgment",
    number: "03",
    verb: "Judgment gates risk",
    title: "Autonomy expands only when the evidence earns it.",
    body:
      "Trust tiers, capability gates, and approval surfaces keep the human boundary explicit. Low-risk work moves. Consequential decisions arrive with context, cost, and a reversible next step.",
    signal: "Strict · balanced · open trust tiers",
    proof: "Human decision boundary",
    image: "/images/case-studies/orgx-mcp-agent-status.png",
    imageAlt: "OrgX MCP agent status and human review state",
    detail: "Risk scored → boundary checked → human engaged when it matters",
  },
  {
    id: "memory",
    number: "04",
    verb: "Outcomes become memory",
    title: "Failures stop being incidents. They become infrastructure.",
    body:
      "Every result feeds quality history, outcome attribution, and the next routing decision. That is how agent systems get more trustworthy instead of merely more autonomous.",
    signal: "136+ benchmark tasks · independent judges",
    proof: "Learning loop",
    image: "/images/projects/orgx-home.png",
    imageAlt: "OrgX interface showing durable work and organizational memory",
    detail: "Outcome → attribution → learning → better next action",
  },
];

const careerArc = [
  {
    year: "2017",
    company: "Capital One",
    lesson: "Reliability is designed before the data moves.",
    result: "Spark and Scala pipelines moving millions of near-real-time records in regulated finance.",
  },
  {
    year: "2020",
    company: "Vessel Health",
    lesson: "Ownership means the hardware, API, and operator experience all count.",
    result: "Led an API re-architecture that reduced bug output by 93%.",
  },
  {
    year: "2023",
    company: "Alma",
    lesson: "AI is only useful when trust survives production pressure.",
    result: "999 commits; 72% reassessment adoption; 20% fewer production errors.",
  },
  {
    year: "Now",
    company: "OrgX",
    lesson: "The next system boundary is human judgment itself.",
    result: "A 12-repo continuity platform for governed multi-agent work.",
  },
];

const systems = [
  {
    index: "01",
    title: "OrgX",
    category: "Flagship · multi-agent infrastructure",
    thesis: "A control plane for work that outlives the prompt.",
    proof: ["1,270+ commits", "61 MCP tools", "12-repo ecosystem"],
    image: "/images/case-studies/orgx-live.png",
    imageAlt: "OrgX live command center",
    href: "/projects/orgx",
    feature: true,
  },
  {
    index: "02",
    title: "Alma",
    category: "Production AI · HIPAA environment",
    thesis: "Clinical workflows that had to earn adoption and survive inspection.",
    proof: ["999 commits", "72% adoption", "20% fewer errors"],
    image: "/images/projects/alma.svg",
    imageAlt: "Alma production systems case study graphic",
    href: "/projects/alma",
    feature: false,
  },
  {
    index: "03",
    title: "PerfPulse",
    category: "Developer tooling · Rust",
    thesis: "Operator-grade performance inspection across CLI, TUI, and web.",
    proof: ["3 operator surfaces", "Local first", "Homebrew"],
    image: "/images/case-studies/perfpulse-dashboard.png",
    imageAlt: "PerfPulse system performance dashboard",
    href: "/projects/perfpulse",
    feature: false,
  },
  {
    index: "04",
    title: "OpenClaw",
    category: "Agent workflow UX · plugin architecture",
    thesis: "Mission control for resumable, browser-native agent work.",
    proof: ["558 commits", "30 MCP tools", "SSE + SQLite"],
    image: "/images/case-studies/openclaw-mission-control.png",
    imageAlt: "OpenClaw agent mission control",
    href: "/projects/openclaw",
    feature: false,
  },
];

function ContinuitySignal() {
  const fillRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
        if (fillRef.current) fillRef.current.style.transform = `scaleY(${progress})`;
        if (valueRef.current) {
          valueRef.current.textContent = String(Math.round(progress * 100)).padStart(2, "0");
        }
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <aside className="continuity-signal" aria-label="Page progress">
      <span>Continuity</span>
      <div className="continuity-signal-track">
        <div ref={fillRef} />
      </div>
      <strong ref={valueRef}>00</strong>
    </aside>
  );
}

function ChapterProof({ chapter }: { chapter: Chapter }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="chapter-proof-shell">
      <div className="chapter-proof-topline">
        <span className="signal-dot" />
        <span>Live proof surface</span>
        <strong>{chapter.number} / 04</strong>
      </div>

      <AnimatePresence initial={false}>
        <motion.div
          key={chapter.id}
          className="chapter-proof-content"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="chapter-proof-copy">
            <span>{chapter.proof}</span>
            <h3>{chapter.verb}</h3>
            <p>{chapter.detail}</p>
          </div>
          <div className="chapter-proof-image">
            <Image
              src={chapter.image}
              alt={chapter.imageAlt}
              fill
              sizes="(min-width: 1000px) 46vw, 100vw"
              priority={chapter.id === "context"}
            />
            <div className="chapter-proof-scan" aria-hidden="true" />
          </div>
          <div className="chapter-proof-footer">
            <span>{chapter.signal}</span>
            <span>Verified system state</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const [activeChapter, setActiveChapter] = useState(chapters[0].id);
  const currentChapter = chapters.find((chapter) => chapter.id === activeChapter) ?? chapters[0];

  useEffect(() => {
    const chapterElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-continuity-chapter]"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const active = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (active?.target instanceof HTMLElement) {
          setActiveChapter(active.target.dataset.continuityChapter ?? chapters[0].id);
        }
      },
      { rootMargin: "-28% 0px -38% 0px", threshold: [0.15, 0.35, 0.6] },
    );

    chapterElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Hope Atina — AI Systems Engineer &amp; Founder</title>
        <meta
          name="description"
          content="Hope Atina builds continuity infrastructure for AI agents: persistent context, governed autonomy, decision provenance, and human review systems."
        />
        <meta name="theme-color" content="#080a09" />
      </Head>

      <ContinuitySignal />

      <main id="main-content" className="narrative-home">
        <section className="narrative-hero" aria-labelledby="hero-title">
          <div className="narrative-grid" aria-hidden="true" />
          <div className="narrative-hero-inner">
            <div className="hero-copy-column">
              <div className="hero-role-line">
                <div className="hero-mobile-identity">
                  <Image
                    src="/images/hope-profile.jpg"
                    alt=""
                    width={48}
                    height={48}
                    aria-hidden="true"
                  />
                  <strong>Hope Atina</strong>
                </div>
                <span>Senior AI infrastructure engineer</span>
                <span>Founder, OrgX</span>
                <span>Houston / remote</span>
              </div>
              <h1 id="hero-title">
                I build the systems that let AI agents act—
                <em>without losing the plot.</em>
              </h1>
              <p className="hero-deck">
                I&apos;m Hope Atina. I design the continuity, trust, and review
                infrastructure that makes autonomous work useful in production.
              </p>
              <div className="hero-cta-row">
                <a className="narrative-button narrative-button-primary" href="#continuity">
                  Enter the operating model <span aria-hidden="true">↓</span>
                </a>
                <Link className="narrative-button narrative-button-quiet" href="/hiring">
                  60-second hiring brief <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <div className="hero-proof-ledger" aria-label="Selected proof">
                <div><strong>61</strong><span>MCP tools shipped</span></div>
                <div><strong>12</strong><span>repos in one platform</span></div>
                <div><strong>999</strong><span>HIPAA production commits</span></div>
                <div><strong>93%</strong><span>bug reduction at Vessel</span></div>
              </div>
            </div>

            <div className="hero-human-column">
              <div className="portrait-stage">
                <Image
                  src="/images/hope-profile.jpg"
                  alt="Portrait of Hope Atina"
                  fill
                  priority
                  sizes="(min-width: 1000px) 42vw, 100vw"
                />
                <div className="portrait-tone" aria-hidden="true" />
                <div className="portrait-boundary-label">
                  <span className="signal-dot" />
                  Human judgment remains here
                </div>
                <div className="portrait-receipt">
                  <span>Current system</span>
                  <strong>OrgX continuity layer</strong>
                  <p>Context intact · risk gated · provenance visible</p>
                </div>
              </div>
              <p className="hero-side-note">
                Most portfolios show outputs. This one shows the control system behind them.
              </p>
            </div>
          </div>
          <div className="hero-scroll-cue" aria-hidden="true">
            <span>Scroll to follow the signal</span>
            <i />
          </div>
        </section>

        <section id="continuity" className="continuity-story" aria-labelledby="continuity-title">
          <div className="section-intro section-intro-dark">
            <span className="section-index">01 / Operating model</span>
            <h2 id="continuity-title">
              Autonomy is easy to demo.
              <em>Continuity is hard to engineer.</em>
            </h2>
            <p>
              The differentiator is not how many agents you can launch. It is whether
              context, responsibility, and learning survive every handoff.
            </p>
          </div>

          <div className="continuity-layout">
            <div className="continuity-chapters">
              {chapters.map((chapter) => (
                <article
                  key={chapter.id}
                  id={`chapter-${chapter.id}`}
                  className={`continuity-chapter ${activeChapter === chapter.id ? "is-active" : ""}`}
                  data-continuity-chapter={chapter.id}
                >
                  <div className="continuity-chapter-number">{chapter.number}</div>
                  <div>
                    <span>{chapter.verb}</span>
                    <h3>{chapter.title}</h3>
                    <p>{chapter.body}</p>
                    <strong>{chapter.signal}</strong>
                  </div>
                </article>
              ))}
            </div>
            <div className="continuity-proof-sticky">
              <ChapterProof chapter={currentChapter} />
            </div>
          </div>
        </section>

        <section className="career-section" aria-labelledby="career-title">
          <div className="career-section-inner">
            <div className="section-intro section-intro-light">
              <span className="section-index">02 / Pressure arc</span>
              <h2 id="career-title">
                This thesis wasn&apos;t invented in a prompt.
                <em>It was pressure-tested for 7+ years.</em>
              </h2>
            </div>

            <ol className="career-arc">
              {careerArc.map((moment, index) => (
                <li key={moment.company}>
                  <div className="career-marker">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="career-year">{moment.year}</div>
                  <div className="career-copy">
                    <h3>{moment.company}</h3>
                    <strong>{moment.lesson}</strong>
                    <p>{moment.result}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="systems-section" aria-labelledby="systems-title">
          <div className="systems-section-inner">
            <div className="section-intro section-intro-dark section-intro-split">
              <div>
                <span className="section-index">03 / Selected systems</span>
                <h2 id="systems-title">Four proofs. Four different kinds of pressure.</h2>
              </div>
              <p>
                Not a gallery of side projects. A record of systems that had to be
                operable, legible, and trustworthy for different reasons.
              </p>
            </div>

            <div className="systems-list">
              {systems.map((system) => (
                <Link
                  key={system.title}
                  href={system.href}
                  className={`system-proof ${system.feature ? "system-proof-feature" : ""}`}
                >
                  <div className="system-proof-index">{system.index}</div>
                  <div className="system-proof-copy">
                    <span>{system.category}</span>
                    <h3>{system.title}</h3>
                    <p>{system.thesis}</p>
                    <div className="system-proof-metrics">
                      {system.proof.map((item) => <strong key={item}>{item}</strong>)}
                    </div>
                  </div>
                  <div className="system-proof-image">
                    <Image
                      src={system.image}
                      alt={system.imageAlt}
                      fill
                      sizes={system.feature ? "(min-width: 1000px) 54vw, 100vw" : "(min-width: 1000px) 34vw, 100vw"}
                    />
                  </div>
                  <div className="system-proof-arrow" aria-hidden="true">↗</div>
                </Link>
              ))}
            </div>

            <Link className="all-work-link" href="/projects">
              Inspect the full work archive <span>15 systems ↗</span>
            </Link>
          </div>
        </section>

        <section className="judgment-section" aria-labelledby="judgment-title">
          <div className="judgment-section-inner">
            <div className="section-intro section-intro-dark">
              <span className="section-index">04 / Point of view</span>
              <h2 id="judgment-title">
                My differentiator isn&apos;t autonomy.
                <em>It&apos;s judgment architecture.</em>
              </h2>
            </div>

            <div className="judgment-map" role="img" aria-label="Human judgment sits at the center of four system principles">
              <div className="judgment-orbit judgment-orbit-one" aria-hidden="true" />
              <div className="judgment-orbit judgment-orbit-two" aria-hidden="true" />
              <div className="judgment-core">
                <Image src="/images/hope-profile.jpg" alt="" fill sizes="180px" />
                <div>
                  <span>Decision boundary</span>
                  <strong>Human judgment</strong>
                </div>
              </div>
              <div className="judgment-node judgment-node-context">
                <span>01</span><strong>Preserve context</strong><p>No handoff starts from zero.</p>
              </div>
              <div className="judgment-node judgment-node-delegate">
                <span>02</span><strong>Delegate aggressively</strong><p>Leverage without theater.</p>
              </div>
              <div className="judgment-node judgment-node-risk">
                <span>03</span><strong>Gate by risk</strong><p>Autonomy is earned.</p>
              </div>
              <div className="judgment-node judgment-node-memory">
                <span>04</span><strong>Remember outcomes</strong><p>Failure becomes infrastructure.</p>
              </div>
            </div>

            <p className="judgment-statement">
              The best agent system is not the one that removes people. It is the one
              that makes their judgment rarer, better informed, and more consequential.
            </p>
          </div>
        </section>

        <section className="closing-section" aria-labelledby="closing-title">
          <div className="closing-portrait">
            <Image src="/images/hope-profile.jpg" alt="Hope Atina" fill sizes="(min-width: 900px) 38vw, 100vw" />
          </div>
          <div className="closing-copy">
            <span className="section-index">05 / The next handoff</span>
            <h2 id="closing-title">
              The next era of software needs people who can engineer
              <em>both sides of the handoff.</em>
            </h2>
            <p>
              I&apos;m looking for a senior or staff IC role where agent infrastructure,
              developer tooling, or evaluation systems are already becoming core product.
            </p>
            <div className="hero-cta-row">
              <Link className="narrative-button narrative-button-dark" href="/hiring">
                See the hiring brief <span aria-hidden="true">↗</span>
              </Link>
              <a className="closing-email" href="mailto:hopeatina@gmail.com">hopeatina@gmail.com</a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
