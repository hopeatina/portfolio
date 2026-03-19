"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { ThemeAnimatedSection, ThemeHoverElement } from "../animations/ThemePhysics";
import { ThemeText } from "../animations/ThemeText";

export default function Hero3D() {
  return (
    <div className="relative min-h-[90vh] w-full overflow-hidden flex items-center justify-center p-8 lg:p-16">
      {/* Volumetric Mesh Gradient Background */}
      <div 
        className="absolute inset-0 z-0 mix-blend-screen pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, rgba(30, 40, 60, 0.4), transparent 60%),
            radial-gradient(circle at 80% 20%, rgba(20, 80, 120, 0.3), transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(40, 20, 60, 0.3), transparent 50%)
          `,
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center mt-20">
        <ThemeAnimatedSection className="max-w-4xl" staggerChildren={0.2}>
          <motion.p 
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="mb-8 text-xs font-semibold uppercase tracking-widest text-text-muted font-mono"
          >
            <ThemeText>Agent infrastructure</ThemeText> · <ThemeText>multi-agent orchestration</ThemeText> · <ThemeText>developer tooling</ThemeText>
          </motion.p>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[7rem] font-heading font-normal tracking-tight leading-[1.05] text-text mb-8">
            <ThemeText>Infrastructure for</ThemeText> <br/>
            <span className="text-primary italic font-light"><ThemeText>autonomous</ThemeText></span> <ThemeText>AI agents</ThemeText>
          </h1>

          <motion.p 
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            className="max-w-2xl mx-auto text-lg sm:text-xl text-text-muted font-body font-light leading-relaxed mb-16"
          >
            Hope Atina builds orchestration, review surfaces, and production AI
            systems where delegation is aggressive, provenance stays visible,
            and human judgment still has a clear place.
          </motion.p>

          <motion.div 
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <ThemeHoverElement>
              <Link
                href="/projects"
                className="group flex items-center gap-3 px-8 py-4 bg-text text-background rounded-full font-body font-medium transition-transform shadow-xl"
              >
                Review systems
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </ThemeHoverElement>
            <ThemeHoverElement>
              <Link
                href="/blog"
                className="group flex items-center gap-3 px-8 py-4 bg-transparent border border-border text-text rounded-full font-body font-medium transition-colors hover:border-text"
              >
                Read technical writing
              </Link>
            </ThemeHoverElement>
          </motion.div>
        </ThemeAnimatedSection>
      </div>
    </div>
  );
}
