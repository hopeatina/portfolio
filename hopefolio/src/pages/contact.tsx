import Head from "next/head";
import React from "react";
import SiteButton from "@/components/site/SiteButton";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact | Hope Atina</title>
        <meta
          name="description"
          content="Reach Hope Atina for senior/staff IC roles on agent platforms, MCP infrastructure, AI developer productivity, or evals and observability."
        />
      </Head>

      <main id="main-content" className="page-frame">
        <div className="page-stack">
          <section className="contact-card">
            <div className="page-header-stack" style={{ maxWidth: "44rem" }}>
              <span className="eyebrow">Contact</span>
              <h1>The fastest path is email.</h1>
              <p style={{ margin: 0 }}>
                Senior/staff IC roles on agent platforms, MCP infrastructure,
                AI developer productivity, or evals and observability. I reply
                to every serious message within 24 hours.
              </p>
              <div className="hero-actions" style={{ marginTop: "1.4rem" }}>
                <SiteButton
                  href="mailto:hopeatina@gmail.com?subject=%5Byour%20company%5D%20%E2%80%94%20role%20conversation"
                  external
                >
                  Email me →
                </SiteButton>
                <SiteButton href="/hiring" variant="secondary">
                  Hiring manager brief
                </SiteButton>
                <SiteButton href="/resume/hope-atina-resume.md" variant="text" external>
                  Download resume
                </SiteButton>
              </div>
              <p style={{ margin: "1.4rem 0 0", color: "var(--shell-muted)", fontSize: "0.95rem" }}>
                Also here:{" "}
                <a href="https://github.com/hopeatina" target="_blank" rel="noreferrer">
                  GitHub
                </a>{" "}
                ·{" "}
                <a href="https://github.com/useorgx" target="_blank" rel="noreferrer">
                  @useorgx
                </a>{" "}
                ·{" "}
                <a href="https://linkedin.com/in/hopeatina" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>{" "}
                ·{" "}
                <a href="https://x.com/emerginghope_" target="_blank" rel="noreferrer">
                  X
                </a>{" "}
                ·{" "}
                <a href="https://medium.com/@hopeatina" target="_blank" rel="noreferrer">
                  Medium
                </a>
              </p>
              <p style={{ margin: "0.3rem 0 0", fontSize: "0.8rem", color: "var(--shell-muted)" }}>
                Houston CT · remote-friendly · open to hybrid SF / NYC / Seattle
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
