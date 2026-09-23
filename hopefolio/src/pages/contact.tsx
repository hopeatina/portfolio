import MaterialSpecimen from "@/components/material/MaterialSpecimen";
import { materialContexts } from "@/components/material/material-context";
import Head from "next/head";
import { ContinuityPlayhead, TextLink } from "@/components/v4/V4Primitives";

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
          <MaterialSpecimen context={materialContexts.home} className="material-inner-object" compact />
          <span>Contact / Houston, CT</span>
          <h1 data-thread="">Bring me the system that doesn't hold together yet.</h1>
          <p>
            Tell me the company, the system, what's pressing on it, and why now. Serious notes get
            a serious reply.
          </p>
          <div>
            <TextLink href="mailto:hopeatina@gmail.com?subject=Consequential%20system%20%E2%80%94%20%5Bcompany%5D" external>Email Hope</TextLink>
            <TextLink href="https://calendly.com/hopeatina/orgx-discovery" external>Book 30 minutes</TextLink>
            <TextLink href="/hiring">Read the team brief</TextLink>
          </div>
        </section>
        <section className="v4-contact-links v4-motif-backed" aria-label="Elsewhere">
          <a href="https://github.com/hopeatina" target="_blank" rel="noreferrer"><span>Code</span><strong>GitHub ↗</strong></a>
          <a href="https://github.com/useorgx" target="_blank" rel="noreferrer"><span>Company</span><strong>OrgX ↗</strong></a>
          <a href="https://linkedin.com/in/hopeatina" target="_blank" rel="noreferrer"><span>Work history</span><strong>LinkedIn ↗</strong></a>
          <a href="https://x.com/emerginghope_" target="_blank" rel="noreferrer"><span>In public</span><strong>X ↗</strong></a>
        </section>
      </main>
    </>
  );
}
