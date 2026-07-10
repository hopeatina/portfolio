import Head from "next/head";
import { ContinuityPlayhead, LivingMotif, TextLink } from "@/components/v4/V4Primitives";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Hope Atina</title>
        <meta
          name="description"
          content="Contact Hope Atina about founder collaborations and consequential AI infrastructure, product, or senior/staff systems work."
        />
      </Head>

      <main id="main-content" className="v4-page v4-contact-page">
        <ContinuityPlayhead label="contact" />
        <section className="v4-contact-hero v4-motif-backed">
          <LivingMotif variant="resolve" className="v4-contact-hero-motif" label="Separate systems resolving into a shared starting point" />
          <span>Contact / Houston CT</span>
          <h1>Bring me the system that needs to become coherent.</h1>
          <p>
            The best message names the company, the system, the pressure it is under, and why the
            problem matters now. Serious notes get a serious reply.
          </p>
          <div>
            <TextLink href="mailto:hopeatina@gmail.com?subject=Consequential%20system%20%E2%80%94%20%5Bcompany%5D" external>Email Hope</TextLink>
            <TextLink href="https://calendly.com/hopeatina/orgx-discovery" external>Book 30 minutes</TextLink>
            <TextLink href="/hiring">Read the team brief</TextLink>
          </div>
        </section>
        <section className="v4-contact-links v4-motif-backed" aria-label="Elsewhere">
          <LivingMotif variant="handoff" className="v4-section-motif" />
          <a href="https://github.com/hopeatina" target="_blank" rel="noreferrer"><span>Code</span><strong>GitHub ↗</strong></a>
          <a href="https://github.com/useorgx" target="_blank" rel="noreferrer"><span>Company</span><strong>OrgX ↗</strong></a>
          <a href="https://linkedin.com/in/hopeatina" target="_blank" rel="noreferrer"><span>Work history</span><strong>LinkedIn ↗</strong></a>
          <a href="https://x.com/emerginghope_" target="_blank" rel="noreferrer"><span>In public</span><strong>X ↗</strong></a>
        </section>
      </main>
    </>
  );
}
