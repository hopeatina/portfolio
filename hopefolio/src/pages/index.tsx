import React from "react";
import Head from "next/head";
import Hero3D from "@/components/ui/Hero3D";
import FeaturedProjects from "@/components/ui/FeaturedProjects";
import TechStack from "@/components/ui/TechStack";
import Testimonials from "@/components/ui/Testimonials";
import CTASection from "@/components/ui/CTASection";
import CompanyLogos from "@/components/ui/CompanyLogos";
import WhatNeedsAttention from "@/components/ui/WhatNeedsAttention";

export default function Home() {
  return (
    <>
      <Head>
        <title>Hope Atina - AI Agent Infrastructure Engineer</title>
        <meta
          name="description"
          content="AI Agent Infrastructure Engineer. Multi-agent orchestration, MCP protocol, developer tooling. Creator of OrgX and PerfPulse. 8+ years shipping production systems."
        />
        <meta name="theme-color" content="var(--color-primary)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-background text-text overflow-hidden selection:bg-primary selection:text-background">
        <Hero3D />
        <WhatNeedsAttention />
        <CompanyLogos />
        <FeaturedProjects />
        <TechStack />
        <Testimonials />
        <CTASection />
      </main>
    </>
  );
}
