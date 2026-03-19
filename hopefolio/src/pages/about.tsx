import React from "react";
import Head from "next/head";
import Image from "next/image";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import Button from "@/components/ui/Button";

const PERSONAL_QUOTE = {
  text: "No one can beat me at being me",
  attribution: "— and the same goes for you.",
};

export default function About() {
  const { theme } = useTheme();

  return (
    <>
      <Head>
        <title>About | Hope Atina - AI Agent Infrastructure Engineer</title>
        <meta
          name="description"
          content="AI Agent Infrastructure Engineer. 8+ years shipping production systems at Alma, Vessel Health, and Capital One. Creator of OrgX and PerfPulse."
        />
      </Head>

      <main className="min-h-screen pb-32" style={{ backgroundColor: "var(--background)" }}>
        
        {/* EDITORIAL HERO */}
        <section className="relative pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center min-h-[70vh]">
            <div className="lg:col-span-6 lg:col-start-1 flex flex-col justify-center order-2 lg:order-1 z-10">
              <h1 
                className="text-6xl md:text-8xl lg:text-[7rem] leading-[0.9] tracking-tighter"
                style={{ fontFamily: "var(--font-heading)", color: "var(--primary)" }}
              >
                “{PERSONAL_QUOTE.text}”
              </h1>
              <p 
                className="mt-8 text-2xl md:text-3xl italic"
                style={{ color: "var(--text-secondary)", fontFamily: "var(--font-heading)" }}
              >
                {PERSONAL_QUOTE.attribution}
              </p>
            </div>
            
            <div className="lg:col-span-5 lg:col-start-8 order-1 lg:order-2">
              <div className="relative aspect-[3/4] w-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out">
                <Image 
                  src="/images/hope-profile.jpg" 
                  alt="Hope Atina" 
                  fill 
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                  priority
                />
              </div>
              <div className="mt-6 flex gap-4 text-sm tracking-widest uppercase opacity-60" style={{ color: "var(--text)" }}>
                <span>Houston, TX</span>
                <span>—</span>
                <span>Engineer</span>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT I BUILD - ASYMMETRIC FLOW */}
        <section className="py-24 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
          <h2 
            className="text-5xl md:text-7xl font-bold mb-24 lg:mb-32 uppercase tracking-tighter"
            style={{ fontFamily: "var(--font-heading)", color: "var(--text)", opacity: 0.1 }}
          >
            What I Build
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-8">
            {/* Agent Infra - Left aligned */}
            <div className="md:col-span-6 lg:col-span-5">
              <h3 
                className="text-4xl md:text-5xl mb-8"
                style={{ fontFamily: "var(--font-heading)", color: "var(--accent)" }}
              >
                Agent Infrastructure
              </h3>
              <p 
                className="text-xl md:text-2xl leading-relaxed mb-10"
                style={{ color: "var(--text)" }}
              >
                I build the systems that make AI agents reliable in production. OrgX is a multi-agent orchestration platform with MCP server integrations, durable workflows, trust-based governance, and org memory — a 7-repo ecosystem with 1,270+ commits over 15 months.
              </p>
              <div className="flex flex-wrap gap-4 text-sm font-medium uppercase tracking-wider" style={{ color: "var(--primary)" }}>
                <span>Multi-Agent Orchestration</span>
                <span>•</span>
                <span>MCP Protocol</span>
                <span>•</span>
                <span>Tool Calling</span>
              </div>
            </div>

            {/* Dev Tooling - Right shifted, pushed down */}
            <div className="md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8 md:mt-48">
              <h3 
                className="text-4xl md:text-5xl mb-8"
                style={{ fontFamily: "var(--font-heading)", color: "var(--accent)" }}
              >
                Developer Tooling
              </h3>
              <p 
                className="text-xl md:text-2xl leading-relaxed mb-10"
                style={{ color: "var(--text)" }}
              >
                PerfPulse is a Rust CLI that replaces macOS Activity Monitor with AI-powered recommendations. Homebrew-installable, three interface modes (CLI, web dashboard, TUI), and Claude API integration. I care about tools that developers actually want to use.
              </p>
              <div className="flex flex-wrap gap-4 text-sm font-medium uppercase tracking-wider" style={{ color: "var(--primary)" }}>
                <span>Rust</span>
                <span>•</span>
                <span>CLI Tools</span>
                <span>•</span>
                <span>Homebrew</span>
              </div>
            </div>
          </div>
        </section>

        {/* WHERE I'VE WORKED - MAGAZINE LIST */}
        <section className="py-32 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto mt-16 md:mt-32 border-t border-opacity-20" style={{ borderColor: "var(--text)" }}>
          <h2 
            className="text-4xl md:text-6xl mb-24 uppercase tracking-tighter"
            style={{ fontFamily: "var(--font-heading)", color: "var(--text)" }}
          >
            Experience
          </h2>

          <div className="flex flex-col gap-24">
            {/* Alma */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline group">
              <div className="md:col-span-4 lg:col-span-3">
                <h3 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--text)" }}>Alma</h3>
                <p className="mt-2 text-lg uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>Quality Enablement</p>
              </div>
              <div className="md:col-span-8 lg:col-span-7 lg:col-start-5">
                <p className="text-xl md:text-2xl leading-relaxed" style={{ color: "var(--text)" }}>
                  999 commits across 7 major feature areas over 2.7 years. Automated reassessments, compliant progress notes with PDF generation, Brellium audit integration, and RBAC document management. HIPAA-compliant throughout.
                </p>
              </div>
            </div>

            {/* Vessel Health */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline group">
              <div className="md:col-span-4 lg:col-span-3">
                <h3 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--text)" }}>Vessel Health</h3>
                <p className="mt-2 text-lg uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>Lead Backend</p>
              </div>
              <div className="md:col-span-8 lg:col-span-7 lg:col-start-5">
                <p className="text-xl md:text-2xl leading-relaxed" style={{ color: "var(--text)" }}>
                  Led backend re-architecture for reliability and data pipeline improvements. Built scalable infrastructure for healthcare delivery.
                </p>
              </div>
            </div>

            {/* Capital One */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline group">
              <div className="md:col-span-4 lg:col-span-3">
                <h3 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--text)" }}>Capital One</h3>
                <p className="mt-2 text-lg uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>Software & Data</p>
              </div>
              <div className="md:col-span-8 lg:col-span-7 lg:col-start-5">
                <p className="text-xl md:text-2xl leading-relaxed" style={{ color: "var(--text)" }}>
                  Pre-approval Auto Loans team. Built internal D0-D3 self-service platform for building real-time Spark/Scala streams.
                </p>
              </div>
            </div>

            {/* MD Anderson */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline group">
              <div className="md:col-span-4 lg:col-span-3">
                <h3 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--text)" }}>MD Anderson</h3>
                <p className="mt-2 text-lg uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>Research Extern</p>
              </div>
              <div className="md:col-span-8 lg:col-span-7 lg:col-start-5">
                <p className="text-xl md:text-2xl leading-relaxed" style={{ color: "var(--text)" }}>
                  Research extern. Built OR capacity monitoring dashboards with React, D3.js, and AngularJS.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BEYOND CODE - TEXT FLOW */}
        <section className="py-32 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <h2 
                className="text-5xl md:text-6xl mb-8 uppercase tracking-tighter"
                style={{ fontFamily: "var(--font-heading)", color: "var(--primary)" }}
              >
                Beyond<br/>Code
              </h2>
            </div>
            
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              <div>
                <p className="text-lg md:text-xl leading-relaxed mb-8" style={{ color: "var(--text)" }}>
                  <span className="text-5xl float-left mr-3 leading-none" style={{ fontFamily: "var(--font-heading)", color: "var(--accent)" }}>M</span>
                  y story begins in Cameroon, where my family's entrepreneurial spirit and love for education laid the foundation for who I am today. The move to Houston opened new horizons, introducing me to a vibrant blend of cultures and possibilities.
                </p>
                <p className="text-lg md:text-xl leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  At Rice University, I discovered my passion for technology and its potential to transform communities.
                </p>
              </div>
              <div>
                <p className="text-lg md:text-xl leading-relaxed mb-8" style={{ color: "var(--text)" }}>
                  Music has always been my sanctuary — a place where engineering precision meets creative expression. Whether I'm producing beats or collaborating with artists, music helps me think differently about problem-solving in tech.
                </p>
                <p className="text-lg md:text-xl leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  This interdisciplinary background — Cameroon to Rice, bioengineering to software, music to infrastructure — gives me range and taste that shows up in the systems I build.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BRAND STATEMENT / CTA */}
        <section className="py-32 mt-16 text-center px-6">
          <div className="max-w-5xl mx-auto">
            <h2 
              className="text-5xl md:text-8xl lg:text-[6rem] mb-12 leading-none tracking-tighter"
              style={{ fontFamily: "var(--font-heading)", color: "var(--text)" }}
            >
              Let's Build Together
            </h2>
            <p 
              className="text-2xl md:text-4xl mb-16 font-light max-w-3xl mx-auto"
              style={{ color: "var(--text-secondary)", fontFamily: "var(--font-heading)" }}
            >
              Looking for roles in multi-agent orchestration, MCP platforms, observability, and AI infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button href="/projects" variant="primary" size="lg" className="text-lg px-12 py-6 rounded-none">
                View My Work
              </Button>
              <Button href="/contact" variant="secondary" size="lg" className="text-lg px-12 py-6 rounded-none border-2">
                Get In Touch
              </Button>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
