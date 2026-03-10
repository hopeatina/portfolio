import React from "react";
import Head from "next/head";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";

const PERSONAL_QUOTE = {
  text: "No one can beat me at being me",
  attribution: "— and the same goes for you",
};

export default function About() {
  const { theme } = useTheme();
  const isDarkTheme = theme === "futuristic";

  return (
    <>
      <Head>
        <title>About | Hope Atina - AI Agent Infrastructure Engineer</title>
        <meta
          name="description"
          content="AI Agent Infrastructure Engineer. 8+ years shipping production systems at Alma, Vessel Health, and Capital One. Creator of OrgX and PerfPulse."
        />
      </Head>

      <main
        className="min-h-screen"
        style={{ paddingTop: "var(--spacing-24)" }}
      >
        {/* Hero Quote Section */}
        <section
          className="relative py-24 md:py-32 text-center"
          style={{
            background: isDarkTheme
              ? "linear-gradient(to bottom, var(--background), var(--background-secondary))"
              : "linear-gradient(to bottom, var(--surface), var(--background))",
          }}
        >
          <div className="container mx-auto px-4">
            <blockquote className="max-w-4xl mx-auto">
              <p
                className="text-4xl md:text-6xl font-bold mb-6"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--primary)",
                  lineHeight: "var(--line-height-heading)",
                }}
              >
                {PERSONAL_QUOTE.text}
              </p>
              <cite
                className="text-xl"
                style={{
                  color: isDarkTheme
                    ? "var(--text-on-dark-secondary)"
                    : "var(--text-secondary)",
                  fontStyle: "normal",
                }}
              >
                {PERSONAL_QUOTE.attribution}
              </cite>
            </blockquote>
          </div>

          {/* Background pattern */}
          <div
            className="absolute inset-0 -z-10 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, var(--primary) 0%, transparent 50%)`,
            }}
          />
        </section>

        {/* What I Build */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2
              className="text-3xl md:text-4xl font-bold mb-12"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--primary)",
              }}
            >
              What I Build
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <Card
                variant={isDarkTheme ? "glass" : "elevated"}
                className="p-8"
              >
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--accent)",
                  }}
                >
                  Agent Infrastructure
                </h3>
                <p
                  className="mb-4"
                  style={{
                    color: isDarkTheme ? "var(--text-on-dark)" : "var(--text)",
                    lineHeight: "var(--line-height-body)",
                  }}
                >
                  I build the systems that make AI agents reliable in
                  production. OrgX is a multi-agent orchestration platform with
                  MCP server integrations, durable workflows, trust-based
                  governance, and org memory — a 7-repo ecosystem with 1,270+
                  commits over 15 months.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Tag size="sm">Multi-Agent Orchestration</Tag>
                  <Tag size="sm">MCP Protocol</Tag>
                  <Tag size="sm">Tool Calling</Tag>
                </div>
              </Card>

              <Card
                variant={isDarkTheme ? "glass" : "elevated"}
                className="p-8"
              >
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--accent)",
                  }}
                >
                  Developer Tooling
                </h3>
                <p
                  className="mb-4"
                  style={{
                    color: isDarkTheme ? "var(--text-on-dark)" : "var(--text)",
                    lineHeight: "var(--line-height-body)",
                  }}
                >
                  PerfPulse is a Rust CLI that replaces macOS Activity Monitor
                  with AI-powered recommendations. Homebrew-installable, three
                  interface modes (CLI, web dashboard, TUI), and Claude API
                  integration. I care about tools that developers actually want
                  to use.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Tag size="sm">Rust</Tag>
                  <Tag size="sm">CLI Tools</Tag>
                  <Tag size="sm">Homebrew</Tag>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Where I've Worked */}
        <section
          className="py-16 md:py-24"
          style={{
            background: isDarkTheme
              ? "var(--background-secondary)"
              : "var(--surface)",
          }}
        >
          <div className="container mx-auto px-4">
            <h2
              className="text-3xl md:text-4xl font-bold mb-12"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--primary)",
              }}
            >
              Where I've Worked
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <Card
                variant={isDarkTheme ? "glass" : "elevated"}
                className="p-8"
              >
                <h3
                  className="text-xl font-bold mb-2"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--accent)",
                  }}
                >
                  Alma
                </h3>
                <p
                  className="text-sm font-medium mb-3"
                  style={{
                    color: isDarkTheme
                      ? "var(--text-on-dark-secondary)"
                      : "var(--text-secondary)",
                  }}
                >
                  Software Engineer, Quality Enablement
                </p>
                <p
                  style={{
                    color: isDarkTheme ? "var(--text-on-dark)" : "var(--text)",
                    lineHeight: "var(--line-height-body)",
                  }}
                >
                  999 commits across 7 major feature areas over 2.7 years.
                  Automated reassessments, compliant progress notes with PDF
                  generation, Brellium audit integration, and RBAC document
                  management. HIPAA-compliant throughout.
                </p>
              </Card>

              <Card
                variant={isDarkTheme ? "glass" : "elevated"}
                className="p-8"
              >
                <h3
                  className="text-xl font-bold mb-2"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--accent)",
                  }}
                >
                  Vessel Health
                </h3>
                <p
                  className="text-sm font-medium mb-3"
                  style={{
                    color: isDarkTheme
                      ? "var(--text-on-dark-secondary)"
                      : "var(--text-secondary)",
                  }}
                >
                  Lead Backend Engineer
                </p>
                <p
                  style={{
                    color: isDarkTheme ? "var(--text-on-dark)" : "var(--text)",
                    lineHeight: "var(--line-height-body)",
                  }}
                >
                  Led backend re-architecture for reliability and data pipeline
                  improvements. Built scalable infrastructure for healthcare
                  delivery.
                </p>
              </Card>

              <Card
                variant={isDarkTheme ? "glass" : "elevated"}
                className="p-8"
              >
                <h3
                  className="text-xl font-bold mb-2"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--accent)",
                  }}
                >
                  Capital One
                </h3>
                <p
                  className="text-sm font-medium mb-3"
                  style={{
                    color: isDarkTheme
                      ? "var(--text-on-dark-secondary)"
                      : "var(--text-secondary)",
                  }}
                >
                  Software & Data Engineer
                </p>
                <p
                  style={{
                    color: isDarkTheme ? "var(--text-on-dark)" : "var(--text)",
                    lineHeight: "var(--line-height-body)",
                  }}
                >
                  Pre-approval Auto Loans team. Built internal D0-D3 self-service
                  platform for building real-time Spark/Scala streams.
                </p>
              </Card>

              <Card
                variant={isDarkTheme ? "glass" : "elevated"}
                className="p-8"
              >
                <h3
                  className="text-xl font-bold mb-2"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--accent)",
                  }}
                >
                  MD Anderson Cancer Center
                </h3>
                <p
                  className="text-sm font-medium mb-3"
                  style={{
                    color: isDarkTheme
                      ? "var(--text-on-dark-secondary)"
                      : "var(--text-secondary)",
                  }}
                >
                  Research Extern
                </p>
                <p
                  style={{
                    color: isDarkTheme ? "var(--text-on-dark)" : "var(--text)",
                    lineHeight: "var(--line-height-body)",
                  }}
                >
                  Research extern. Built OR capacity monitoring dashboards with
                  React, D3.js, and AngularJS.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Beyond Code */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--primary)",
              }}
            >
              Beyond Code
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <Card
                variant={isDarkTheme ? "glass" : "elevated"}
                className="p-8"
              >
                <p
                  className="mb-4"
                  style={{
                    color: isDarkTheme ? "var(--text-on-dark)" : "var(--text)",
                    lineHeight: "var(--line-height-body)",
                  }}
                >
                  My story begins in Cameroon, where my family's entrepreneurial
                  spirit and love for education laid the foundation for who I am
                  today. The move to Houston opened new horizons, introducing me
                  to a vibrant blend of cultures and possibilities.
                </p>
                <p
                  style={{
                    color: isDarkTheme
                      ? "var(--text-on-dark-secondary)"
                      : "var(--text-secondary)",
                    lineHeight: "var(--line-height-body)",
                  }}
                >
                  At Rice University, I discovered my passion for technology and
                  its potential to transform communities.
                </p>
              </Card>

              <Card
                variant={isDarkTheme ? "glass" : "elevated"}
                className="p-8"
              >
                <p
                  className="mb-4"
                  style={{
                    color: isDarkTheme ? "var(--text-on-dark)" : "var(--text)",
                    lineHeight: "var(--line-height-body)",
                  }}
                >
                  Music has always been my sanctuary — a place where engineering
                  precision meets creative expression. Whether I'm producing
                  beats or collaborating with artists, music helps me think
                  differently about problem-solving in tech.
                </p>
                <p
                  style={{
                    color: isDarkTheme
                      ? "var(--text-on-dark-secondary)"
                      : "var(--text-secondary)",
                    lineHeight: "var(--line-height-body)",
                  }}
                >
                  This interdisciplinary background — Cameroon to Rice, bioengineering
                  to software, music to infrastructure — gives me range and taste
                  that shows up in the systems I build.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Brand Statement */}
        <section
          className="py-16 md:py-24"
          style={{
            background: isDarkTheme
              ? "linear-gradient(to bottom, var(--background), var(--primary-dark))"
              : "linear-gradient(to bottom, var(--primary-light), var(--accent-light))",
          }}
        >
          <div className="container mx-auto px-4">
            <Card
              variant={isDarkTheme ? "glass" : "elevated"}
              className="p-12 max-w-4xl mx-auto text-center"
            >
              <h2
                className="text-3xl md:text-4xl font-bold mb-6"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--primary)",
                }}
              >
                Let's Build Together
              </h2>
              <p
                className="text-lg md:text-xl mb-8"
                style={{
                  color: isDarkTheme ? "var(--text-on-dark)" : "var(--text)",
                  lineHeight: "var(--line-height-body)",
                }}
              >
                I'm looking for roles in multi-agent orchestration,
                MCP/tool-calling platforms, observability, and AI infrastructure.
                8+ years of shipping production systems, ready for the next
                challenge.
              </p>
              <div className="flex justify-center gap-4">
                <Button href="/projects" variant="primary" size="lg">
                  View My Work
                </Button>
                <Button href="/contact" variant="secondary" size="lg">
                  Get In Touch
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
}
