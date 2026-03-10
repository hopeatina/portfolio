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
  const [primary, alma, perfPulse, openClaw] = flagshipSystems;

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
        <div className="mb-14 max-w-3xl">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: "var(--color-primary)", opacity: 0.9 }}
          >
            Flagship systems
          </p>
          <h2
            className="mb-5 text-4xl font-bold md:text-5xl"
            style={{
              color: isDarkTheme ? "var(--color-primary)" : "var(--color-text)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "var(--letter-spacing-tight)",
            }}
          >
            Start with the strongest object
          </h2>
          <p
            className="text-lg md:text-xl"
            style={{
              color: "var(--color-text)",
              opacity: isDarkTheme ? 0.84 : 0.76,
            }}
          >
            OrgX is the clearest expression of the work. The other systems matter
            because they prove the same judgment in production AI, developer
            tooling, and agent workflow UX.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <Link href={`/projects/${primary.slug}`} className="group no-underline">
            <article
              className="flex h-full flex-col overflow-hidden rounded-[2rem] border"
              style={{
                background: isDarkTheme
                  ? "linear-gradient(180deg, rgba(9, 17, 31, 0.96), rgba(15, 23, 42, 0.9))"
                  : "rgba(255, 255, 255, 0.96)",
                borderColor: isDarkTheme
                  ? "rgba(56, 189, 248, 0.18)"
                  : "rgba(15, 23, 42, 0.08)",
                boxShadow: isDarkTheme
                  ? "0 26px 70px rgba(2, 6, 23, 0.34)"
                  : "0 20px 48px rgba(15, 23, 42, 0.08)",
              }}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={primary.image}
                  alt={`Primary artifact for ${primary.name}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              </div>

              <div className="flex flex-1 flex-col px-6 py-6 md:px-8 md:py-7">
                <StateBadge state={primary.state} />
                <p
                  className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: "var(--color-primary)", opacity: 0.82 }}
                >
                  {primary.meta}
                </p>
                <h3
                  className="mt-3 text-3xl font-semibold md:text-[2.2rem]"
                  style={{
                    color: isDarkTheme
                      ? "var(--color-primary)"
                      : "var(--color-text)",
                    fontFamily: "var(--font-heading)",
                    lineHeight: 0.98,
                  }}
                >
                  {primary.name}
                </h3>
                <p
                  className="mt-4 max-w-2xl text-base leading-relaxed md:text-lg"
                  style={{
                    color: "var(--color-text)",
                    opacity: isDarkTheme ? 0.88 : 0.78,
                  }}
                >
                  {primary.summary}
                </p>

                <div className="mt-6 grid gap-5 border-t border-white/10 pt-5 md:grid-cols-2">
                  <div>
                    <p
                      className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                      style={{ color: "var(--color-primary)", opacity: 0.82 }}
                    >
                      Proof
                    </p>
                    <p
                      className="mt-2 text-sm leading-relaxed md:text-[15px]"
                      style={{
                        color: "var(--color-text)",
                        opacity: isDarkTheme ? 0.84 : 0.76,
                      }}
                    >
                      {primary.proof}
                    </p>
                  </div>

                  <div>
                    <p
                      className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                      style={{ color: "var(--color-primary)", opacity: 0.82 }}
                    >
                      Why it matters
                    </p>
                    <p
                      className="mt-2 text-sm leading-relaxed md:text-[15px]"
                      style={{
                        color: "var(--color-text)",
                        opacity: isDarkTheme ? 0.84 : 0.76,
                      }}
                    >
                      {primary.whyItMatters}
                    </p>
                  </div>
                </div>

                <div
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium"
                  style={{ color: "var(--color-primary)" }}
                >
                  <span>Inspect case study</span>
                  <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </article>
          </Link>

          <div className="flex flex-col gap-6">
            {[alma, perfPulse].map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group no-underline"
              >
                <article
                  className="grid gap-4 overflow-hidden rounded-[1.8rem] border p-4 md:grid-cols-[150px_minmax(0,1fr)] md:p-5"
                  style={{
                    background: isDarkTheme
                      ? "rgba(9, 17, 31, 0.86)"
                      : "rgba(255, 255, 255, 0.94)",
                    borderColor: isDarkTheme
                      ? "rgba(148, 163, 184, 0.14)"
                      : "rgba(15, 23, 42, 0.08)",
                    boxShadow: isDarkTheme
                      ? "0 18px 46px rgba(2, 6, 23, 0.26)"
                      : "0 18px 40px rgba(15, 23, 42, 0.06)",
                  }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.2rem]">
                    <Image
                      src={project.image}
                      alt={`Artifact preview for ${project.name}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 240px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                  </div>

                  <div className="flex flex-col">
                    <StateBadge state={project.state} />
                    <p
                      className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em]"
                      style={{ color: "var(--color-primary)", opacity: 0.82 }}
                    >
                      {project.meta}
                    </p>
                    <h3
                      className="mt-2 text-2xl font-semibold"
                      style={{
                        color: "var(--color-text)",
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {project.name}
                    </h3>
                    <p
                      className="mt-3 text-sm leading-relaxed md:text-[15px]"
                      style={{
                        color: "var(--color-text)",
                        opacity: isDarkTheme ? 0.84 : 0.76,
                      }}
                    >
                      {project.summary}
                    </p>
                    <p
                      className="mt-4 text-sm leading-relaxed"
                      style={{
                        color: "var(--color-text)",
                        opacity: isDarkTheme ? 0.72 : 0.7,
                      }}
                    >
                      {project.proof}
                    </p>
                    <div
                      className="mt-5 inline-flex items-center gap-2 text-sm font-medium"
                      style={{ color: "var(--color-primary)" }}
                    >
                      <span>Inspect case study</span>
                      <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        <Link href={`/projects/${openClaw.slug}`} className="group no-underline block">
          <article
            className="mt-6 grid gap-4 overflow-hidden rounded-[1.75rem] border px-5 py-5 md:grid-cols-[120px_minmax(0,1fr)_220px] md:items-center md:px-6"
            style={{
              background: isDarkTheme
                ? "rgba(255, 255, 255, 0.03)"
                : "rgba(255, 255, 255, 0.9)",
              borderColor: isDarkTheme
                ? "rgba(148, 163, 184, 0.12)"
                : "rgba(15, 23, 42, 0.08)",
            }}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1rem]">
              <Image
                src={openClaw.image}
                alt={`Artifact preview for ${openClaw.name}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                sizes="160px"
              />
            </div>

            <div>
              <StateBadge state={openClaw.state} />
              <h3
                className="mt-3 text-2xl font-semibold"
                style={{
                  color: "var(--color-text)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {openClaw.name}
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed md:text-[15px]"
                style={{
                  color: "var(--color-text)",
                  opacity: isDarkTheme ? 0.84 : 0.76,
                }}
              >
                {openClaw.summary}
              </p>
            </div>

            <div>
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: "var(--color-primary)", opacity: 0.82 }}
              >
                {openClaw.meta}
              </p>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{
                  color: "var(--color-text)",
                  opacity: isDarkTheme ? 0.74 : 0.7,
                }}
              >
                {openClaw.proof}
              </p>
              <div
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium"
                style={{ color: "var(--color-primary)" }}
              >
                <span>Inspect workflow</span>
                <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </div>
          </article>
        </Link>
      </div>
    </section>
  );
}
