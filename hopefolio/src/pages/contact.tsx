import Head from "next/head";
import React from "react";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact | Hope Atina</title>
        <meta
          name="description"
          content="Hiring for agent infrastructure, orchestration, observability, or MCP platforms? Reach Hope Atina directly."
        />
      </Head>

      <main id="main-content" className="page-frame">
        <div className="page-stack">
          <section className="contact-card">
            <div className="page-header-stack" style={{ maxWidth: "42rem" }}>
              <span className="eyebrow">Contact</span>
              <h1>Hiring for agent infrastructure?</h1>
              <p style={{ margin: 0 }}>
                I&apos;m looking for senior IC positions in multi-agent
                orchestration, MCP platforms, observability, and AI
                infrastructure engineering. If that&apos;s what you&apos;re
                building, let&apos;s talk.
              </p>
              <p
                style={{
                  margin: "1rem 0 0",
                  fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
                  fontWeight: 600,
                }}
              >
                <a href="mailto:hopeatina@gmail.com" className="site-link-inline">
                  hopeatina@gmail.com
                </a>
              </p>
              <p style={{ margin: 0, color: "var(--shell-muted)" }}>
                <a href="https://github.com/hopeatina" target="_blank" rel="noreferrer">
                  GitHub
                </a>{" "}
                ·{" "}
                <a href="https://linkedin.com/in/hopeatina" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>{" "}
                ·{" "}
                <a href="https://x.com/emerginghope_" target="_blank" rel="noreferrer">
                  X
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
