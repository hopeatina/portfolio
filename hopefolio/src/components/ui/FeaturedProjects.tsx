"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import StateBadge from "./StateBadge";
import { flagshipSystems } from "@/data/homepage";

export default function FeaturedProjects() {
  const { theme } = useTheme();
  const isDarkTheme = theme === "futuristic";
  const [primary, ...secondary] = flagshipSystems;

  return (
    <section
      className="relative overflow-hidden border-y py-24"
      style={{
        background: isDarkTheme
          ? "linear-gradient(180deg, rgba(2, 6, 23, 1), rgba(6, 12, 22, 1))"
          : "linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(12, 18, 33, 0.98))",
        borderColor: "rgba(148, 163, 184, 0.12)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
            Flagship systems
          </p>
          <h2
            className="text-4xl font-bold text-white md:text-5xl"
            style={{
              fontFamily: "var(--font-heading)",
              letterSpacing: "var(--letter-spacing-tight)",
            }}
          >
            Start with the strongest object
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/80 md:text-xl">
            OrgX should feel like the unmistakable center of gravity. The other
            systems matter because they prove the same operating judgment under
            production, tooling, and workflow constraints.
          </p>
        </div>

        <Link href={`/projects/${primary.slug}`} className="group block no-underline">
          <article
            className="overflow-hidden rounded-[2.5rem] border"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              borderColor: "rgba(148, 163, 184, 0.12)",
              boxShadow: "0 30px 100px rgba(2, 6, 23, 0.42)",
            }}
          >
            <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div className="flex flex-col px-7 py-7 md:px-10 md:py-10">
                <StateBadge state={primary.state} />
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/78">
                  {primary.meta}
                </p>
                <h3
                  className="mt-3 text-[2.4rem] font-semibold text-white md:text-[3rem]"
                  style={{
                    fontFamily: "var(--font-heading)",
                    lineHeight: 0.94,
                  }}
                >
                  {primary.name}
                </h3>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-white/78 md:text-lg">
                  {primary.summary}
                </p>

                <blockquote className="mt-8 border-l border-emerald-300/28 pl-4 text-lg leading-relaxed text-white/88 md:text-xl">
                  {primary.whyItMatters}
                </blockquote>

                <div className="mt-auto grid gap-6 border-t border-white/10 pt-7 md:grid-cols-2">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/78">
                      Proof
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/72 md:text-[15px]">
                      {primary.proof}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/78">
                      Surface
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/72 md:text-[15px]">
                      Workspace-first onboarding, proof-first landing, and command
                      center review built as one cohesive system.
                    </p>
                  </div>
                </div>

                <div className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-emerald-300 md:text-base">
                  <span>Inspect case study</span>
                  <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>

              <div
                className="relative min-h-[22rem] border-t border-white/10 lg:min-h-full lg:border-l lg:border-t-0"
                style={{
                  background:
                    "radial-gradient(circle at top, rgba(16, 185, 129, 0.18), transparent 28%), linear-gradient(180deg, rgba(2, 6, 23, 0.24), rgba(2, 6, 23, 0.62))",
                }}
              >
                <Image
                  src={primary.image}
                  alt={`Primary artifact for ${primary.name}`}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
                <div className="absolute inset-x-4 bottom-4 rounded-[1.35rem] border border-white/10 bg-slate-950/72 px-4 py-4 backdrop-blur-md md:inset-x-6 md:bottom-6 md:px-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/78">
                    Featured artifact
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/78 md:text-[15px]">
                    The landing experience itself acts as a proof surface: a
                    command center preview, live output framing, and receipts
                    before setup.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </Link>

        <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.9fr)]">
          {secondary.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group no-underline"
            >
              <article
                className="flex h-full flex-col overflow-hidden rounded-[1.7rem] border"
                style={{
                  background:
                    project.id === "openclaw"
                      ? "rgba(255, 255, 255, 0.04)"
                      : "rgba(255, 255, 255, 0.06)",
                  borderColor: "rgba(148, 163, 184, 0.12)",
                }}
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10">
                  <Image
                    src={project.image}
                    alt={`Artifact preview for ${project.name}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 32vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                </div>

                <div className="flex flex-1 flex-col px-5 py-5 md:px-6">
                  <StateBadge state={project.state} />
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/78">
                    {project.meta}
                  </p>
                  <h3
                    className="mt-3 text-2xl font-semibold text-white"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {project.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/72 md:text-[15px]">
                    {project.summary}
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-white/64">
                    {project.proof}
                  </p>
                  <div className="mt-auto pt-6 text-sm font-medium text-emerald-300">
                    <span className="inline-flex items-center gap-2">
                      Inspect case study
                      <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
