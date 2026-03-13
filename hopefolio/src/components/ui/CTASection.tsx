"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

const closingRows = [
  {
    label: "Current target",
    value: "Multi-agent orchestration, MCP platforms, observability, and AI infrastructure.",
  },
  {
    label: "Best team shape",
    value: "Senior IC, platform, and product-infrastructure teams where reliable automation and crafted interaction design both matter.",
  },
  {
    label: "What I bring",
    value: "Systems rigor under production constraints, plus the interaction taste to make complex tooling feel inevitable.",
  },
];

export default function CTASection() {
  const { theme } = useTheme();
  const isDarkTheme = theme === "futuristic";

  return (
    <section
      className="relative overflow-hidden py-24"
      style={{
        background: isDarkTheme
          ? "var(--color-background)"
          : "var(--color-surface)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div
          className="overflow-hidden rounded-[2.35rem] border"
          style={{
            background: isDarkTheme
              ? "linear-gradient(145deg, rgba(9, 17, 31, 0.98), rgba(8, 47, 73, 0.72))"
              : "linear-gradient(145deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.92))",
            borderColor: "rgba(148, 163, 184, 0.16)",
            boxShadow: "0 28px 80px rgba(2, 6, 23, 0.28)",
          }}
        >
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="px-8 py-10 md:px-12 md:py-12">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/[0.54]">
                Next step
              </p>
              <h2
                className="mt-4 text-4xl font-bold text-white md:text-5xl"
                style={{
                  fontFamily: "var(--font-heading)",
                  letterSpacing: "var(--letter-spacing-tight)",
                }}
              >
                Building agent infrastructure? Let&apos;s talk.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
                I&apos;m looking for senior engineering roles where orchestration,
                product systems, and operational taste all matter. The best fit
                is work that needs both systems rigor and interaction judgment.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
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
                  className="no-underline inline-flex items-center gap-2 rounded-full border border-white/[0.18] px-7 py-4 text-sm font-medium text-white/90 transition-all duration-200 hover:border-white/30 hover:bg-white/[0.08] md:text-base"
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
              className="border-t border-white/10 bg-white/[0.04] px-6 py-6 backdrop-blur-md lg:border-l lg:border-t-0"
            >
              {closingRows.map((row, index) => (
                <div
                  key={row.label}
                  className={`${index !== closingRows.length - 1 ? "border-b" : ""} py-5`}
                  style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/[0.5]">
                    {row.label}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/[0.8] md:text-[15px]">
                    {row.value}
                  </p>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
