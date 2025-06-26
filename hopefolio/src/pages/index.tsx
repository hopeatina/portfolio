import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import AboutSection from "@/components/ui/AboutSection";
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
    <div className="w-full h-screen flex items-center justify-center">
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
  const isDarkTheme = theme === "futuristic";

  return (
    <>
      <Head>
        <title>
          Hope Atina - Software Developer, Bioengineer, and Musician
        </title>
        <meta
          name="description"
          content="Hi, I'm Hope - Software Developer, Bioengineer, and Musician. Building innovative solutions at the intersection of technology, science, and creativity."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="var(--color-primary)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        {/* Hero Section with 3D Scene */}
        <section className="relative w-full h-screen">
          <Hero3D />
        </section>

        {/* About Section */}
        <section
          className="relative py-24 md:py-32"
          style={{
            background: isDarkTheme
              ? "var(--background-secondary)"
              : "var(--surface)",
          }}
        >
          <div className="container mx-auto px-4">
            <AboutSection />
          </div>
        </section>

        {/* Company Logos */}
        <section
          className="relative py-16"
          style={{
            background: isDarkTheme ? "var(--background)" : "var(--background)",
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="container mx-auto px-4">
            <CompanyLogos />
          </div>
        </section>

        {/* Featured Projects */}
        <section
          className="relative py-24 md:py-32"
          style={{
            background: isDarkTheme
              ? "var(--background-secondary)"
              : "var(--surface)",
          }}
        >
          <div className="container mx-auto px-4">
            <FeaturedProjects />
          </div>
        </section>

        {/* Tech Stack */}
        <section
          className="relative py-24 md:py-32"
          style={{
            background: isDarkTheme ? "var(--background)" : "var(--background)",
          }}
        >
          <div className="container mx-auto px-4">
            <TechStack />
          </div>
        </section>

        {/* Testimonials */}
        <section
          className="relative py-24 md:py-32"
          style={{
            background: isDarkTheme
              ? "var(--background-secondary)"
              : "var(--surface)",
          }}
        >
          <div className="container mx-auto px-4">
            <Testimonials />
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="relative py-24 md:py-32"
          style={{
            background: isDarkTheme
              ? "linear-gradient(to bottom right, var(--background), var(--primary-dark))"
              : "linear-gradient(to bottom right, var(--primary-light), var(--accent-light))",
          }}
        >
          <div className="container mx-auto px-4">
            <CTASection />
          </div>
        </section>
      </main>
    </>
  );
}
