import React from "react";
import Head from "next/head";
import Hero from "@/components/ui/Hero";
import AboutSection from "@/components/ui/AboutSection";
import FeaturedProjects from "@/components/ui/FeaturedProjects";
import TechStack from "@/components/ui/TechStack";
import Testimonials from "@/components/ui/Testimonials";
import CTASection from "@/components/ui/CTASection";
import CompanyLogos from "@/components/ui/CompanyLogos";

export default function Home() {
  return (
    <>
      <Head>
        <title>Emerging Hope Portfolio</title>
        <meta
          name="description"
          content="Portfolio showcasing engineering, creativity, and entrepreneurship"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <Hero />
        <AboutSection />
        <CompanyLogos />
        <FeaturedProjects />
        <TechStack />
        <Testimonials />
        <CTASection />
      </main>
    </>
  );
}
