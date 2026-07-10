import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
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
    body: "Architecture, product surface, rollout, evidence, and adoption remain one problem until the user can trust the result.",
  },
  {
    glyph: "branch" as const,
    title: "I work AI-natively",
    body: "Agents expand my execution surface across code, research, quality, and distribution; judgment and accountability stay authored.",
  },
  {
    glyph: "judgment" as const,
    title: "I stay calm near consequence",
    body: "Healthcare and regulated data systems trained me to make failure modes smaller, rollouts reversible, and decisions legible.",
  },
  {
    glyph: "receipt" as const,
    title: "I finish the product",
    body: "Install paths, operator hierarchy, interaction details, and proof are not polish after the engineering. They complete it.",
  },
];

export default function Hiring() {
  return (
    <>
      <Head>
        <title>Work with Hope Atina</title>
        <meta
          name="description"
          content="A concise brief for founders and hiring teams considering Hope Atina for consequential AI infrastructure, product engineering, or senior/staff systems work."
        />
      </Head>

      <main id="main-content" className="v4-page v4-hiring-page">
        <ContinuityPlayhead label="work with me" />

        <header className="v4-hiring-hero">
          <span>For founders / recruiters / ambitious teams</span>
          <h1>If the hard problem lives between AI capability, product judgment, and production consequence—that is my lane.</h1>
          <div>
            <p>
              I am an engineer, founder, and product thinker with deep production ownership across
              healthcare, fintech data, developer tooling, and AI infrastructure. I am strongest when
              the work needs both systems depth and a surface people can trust.
            </p>
            <div className="v4-hiring-actions">
              <TextLink href="mailto:hopeatina@gmail.com?subject=Consequential%20work%20%E2%80%94%20%5Bcompany%5D" external>
                Start a conversation
              </TextLink>
              <TextLink href="https://calendly.com/hopeatina/orgx-discovery" external>
                Book 30 minutes
              </TextLink>
            </div>
          </div>
        </header>

        <section className="v4-hiring-contribution">
          <SectionSignal index="01">What changes when I join the problem</SectionSignal>
          <div className="v4-hiring-contribution-heading">
            <h2>Depth without tunnel vision. Range without hand-waving.</h2>
            <p>
              I can move from a failing background workflow to a product hierarchy, a trust model,
              or a founder decision without losing the connective tissue between them.
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

        <section className="v4-hiring-proof">
          <SectionSignal index="02">Three ways to inspect the claim</SectionSignal>
          <div className="v4-hiring-proof-grid">
            <Link href="/projects/orgx" className="v4-hiring-proof-featured">
              <div>
                <span>Founder proof / OrgX</span>
                <h2>I designed the continuity and proof layer I believed agent work was missing.</h2>
                <p>
                  Product thesis, shared work graph, client ecosystem, trust boundaries, quality bars,
                  receipts, distribution, and the operator surfaces that connect them.
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
              <h3>I turn collaboration into a making environment—not a meeting.</h3>
              <p>Figma and Chill · global BIPOC design community · play, iteration, and action.</p>
              <b>Watch the talk ↗</b>
            </a>
          </div>
        </section>

        <section className="v4-hiring-fit">
          <SectionSignal index="03">Where the fit is strongest</SectionSignal>
          <div className="v4-hiring-fit-grid">
            <h2>Give me the consequential system, not the isolated ticket.</h2>
            <div>
              <p>
                Founder collaborations, senior/staff IC roles, and small high-agency teams building
                agent platforms, AI developer experience, MCP infrastructure, evals, observability,
                or operational products where trust has to be designed into the workflow.
              </p>
              <ul>
                <li>Houston-based and remote-friendly</li>
                <li>Comfortable across backend, product surface, and system narrative</li>
                <li>Best with ownership, candid collaboration, and an evidence-driven bar</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="v4-hiring-close">
          <span>A good first conversation is concrete.</span>
          <h2>Show me the system, the pressure, and what has resisted becoming clear.</h2>
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
