import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import FeaturedProjects from "@/components/ui/FeaturedProjects";
import TechStack from "@/components/ui/TechStack";
import Testimonials from "@/components/ui/Testimonials";
import CTASection from "@/components/ui/CTASection";
import CompanyLogos from "@/components/ui/CompanyLogos";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

// Dynamically import Hero3D to avoid SSR issues with Three.js
const Hero3D = dynamic(() => import("@/components/ui/Hero3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-background">
      <div className="animate-pulse">
        <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-primary/20" />
        <div className="h-8 w-64 mx-auto bg-primary/20 rounded mb-4" />
        <div className="h-4 w-48 mx-auto bg-primary/20 rounded" />
      </div>
    </div>
  ),
});

export default function Home() {
  const { theme } = useTheme();

  return (
    <>
      <Head>
        <title>Hope Atina - AI Agent Infrastructure Engineer</title>
        <meta
          name="description"
          content="AI Agent Infrastructure Engineer. Multi-agent orchestration, MCP protocol, developer tooling. Creator of OrgX and PerfPulse. 8+ years shipping production systems."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="var(--primary)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-background">
        {/* Hero Section with 3D Scene */}
        <section className="relative w-full h-screen">
          <Hero3D />
        </section>

        {/* Shipped in Production */}
        <CompanyLogos />

        {/* Flagship Case Studies */}
        <FeaturedProjects />

        {/* Capabilities */}
        <TechStack />

        {/* By the Numbers */}
        <Testimonials />

        {/* CTA Section */}
        <CTASection />
      </main>
    </>
  );
}
