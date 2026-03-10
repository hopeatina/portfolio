"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

const focusAreas = [
  "Multi-agent orchestration",
  "MCP / tool calling",
  "Observability",
  "AI infrastructure",
];

export default function CTASection() {
  const { theme } = useTheme();
  const isDarkTheme = theme === "futuristic";

  return (
    <section
      className="relative overflow-hidden py-24"
      style={{
        background: isDarkTheme ? "var(--color-background)" : "var(--color-surface)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div
          className="rounded-[2.25rem] px-8 py-10 md:px-12 md:py-12"
          style={{
            background: isDarkTheme
              ? "linear-gradient(135deg, rgba(15, 23, 42, 0.96), rgba(8, 47, 73, 0.78))"
              : "linear-gradient(135deg, rgba(15, 23, 42, 0.96), rgba(30, 41, 59, 0.9))",
            border: "1px solid rgba(148, 163, 184, 0.16)",
            boxShadow: "0 28px 80px rgba(2, 6, 23, 0.28)",
          }}
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/[0.55]">
                Next step
              </p>
              <h2
                className="mb-5 text-4xl md:text-5xl font-bold text-white"
                style={{
                  fontFamily: "var(--font-heading)",
                  letterSpacing: "var(--letter-spacing-tight)",
                }}
              >
                Building agent infrastructure? Let&apos;s talk.
              </h2>
              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
                I&apos;m looking for senior engineering roles where orchestration,
                product systems, and operational taste all matter. The best fit
                is work that needs both systems rigor and interaction judgment.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="no-underline inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 md:text-base"
                  style={{
                    boxShadow: "0 18px 46px rgba(2, 6, 23, 0.22)",
                  }}
                >
                  Start a conversation
                  <FiArrowRight />
                </Link>
                <Link
                  href="/projects"
                  className="no-underline inline-flex items-center gap-2 rounded-full border border-white/[0.18] bg-white/[0.08] px-7 py-4 text-sm font-medium text-white/90 transition-all duration-200 hover:border-white/30 hover:bg-white/[0.12] md:text-base"
                  style={{
                    backdropFilter: "blur(12px)",
                  }}
                >
                  Review the systems
                </Link>
              </div>

              <p className="mt-8 text-sm text-white/[0.68]">
                Prefer email?{" "}
                <a
                  href="mailto:hopeatina@gmail.com"
                  className="no-underline font-medium text-white"
                >
                  hopeatina@gmail.com
                </a>
              </p>
            </div>

            <aside
              className="rounded-[1.65rem] border border-white/[0.12] bg-white/[0.06] px-6 py-6 backdrop-blur-md"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/[0.52]">
                Best fit
              </p>
              <div className="mb-5 flex flex-wrap gap-2">
                {focusAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-white/[0.12] bg-white/[0.07] px-3 py-1.5 text-sm font-medium text-white/[0.88]"
                  >
                    {area}
                  </span>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-white/[0.72]">
                Senior IC roles, platform teams, and product-infrastructure work
                where reliable automation and crafted interaction design both
                matter.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
