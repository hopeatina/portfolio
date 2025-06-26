import React from "react";
import Head from "next/head";
import Hero from "@/components/ui/Hero";
import AboutSection from "@/components/ui/AboutSection";
import FeaturedProjects from "@/components/ui/FeaturedProjects";
import TechStack from "@/components/ui/TechStack";
import Testimonials from "@/components/ui/Testimonials";
import CTASection from "@/components/ui/CTASection";
import CompanyLogos from "@/components/ui/CompanyLogos";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import styles from "@/styles/themes/base-theme.module.css";

export default function Home() {
  const { theme } = useTheme();
  const isDarkTheme = theme === "futuristic";
  const isRiceTheme = theme === "rice";
  const bgIsDark = isDarkTheme || theme === "rice" || theme === "cameroonian";

  // For Rice theme, we'll use a subtle gradient background
  const getRiceBackground = () => {
    if (!isRiceTheme) return "";
    return `
      linear-gradient(
        to bottom,
        var(--primary) 0%,
        var(--background) 100%
      )
    `;
  };

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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className="min-h-screen relative"
        style={{
          background: isRiceTheme
            ? getRiceBackground()
            : bgIsDark
            ? "var(--background)"
            : "var(--surface)",
          color: isRiceTheme
            ? "var(--text-on-dark)"
            : bgIsDark
            ? "var(--text-on-dark)"
            : "var(--text)",
        }}
      >
        {/* Background Pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "var(--background-pattern)",
            opacity: isRiceTheme ? 0.05 : bgIsDark ? 0.15 : 0.1,
            mixBlendMode: "overlay",
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          <Hero />
          <AboutSection />
          <CompanyLogos />
          <FeaturedProjects />
          <TechStack />
          <Testimonials />
          <CTASection />
        </div>
      </main>
    </>
  );
}
