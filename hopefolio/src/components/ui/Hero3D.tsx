"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { focusSystem, heroSignals } from "@/data/homepage";
import StateBadge from "./StateBadge";

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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8 text-xs font-semibold uppercase tracking-widest text-text-muted font-mono"
          >
            Agent infrastructure · multi-agent orchestration · developer tooling
          </motion.p>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[7rem] font-heading font-normal tracking-tight leading-[1.05] text-text mb-8">
            Infrastructure for <br/><span className="text-primary italic font-light">autonomous</span> AI agents
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl mx-auto text-lg sm:text-xl text-text-muted font-body font-light leading-relaxed mb-16"
          >
            Hope Atina builds orchestration, review surfaces, and production AI
            systems where delegation is aggressive, provenance stays visible,
            and human judgment still has a clear place.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              href="/projects"
              className="group flex items-center gap-3 px-8 py-4 bg-text text-background rounded-full font-body font-medium transition-transform hover:scale-105 duration-300 shadow-xl"
            >
              Review systems
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/blog"
              className="group flex items-center gap-3 px-8 py-4 bg-transparent border border-border text-text rounded-full font-body font-medium transition-colors hover:border-text duration-300"
            >
              Read technical writing
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
