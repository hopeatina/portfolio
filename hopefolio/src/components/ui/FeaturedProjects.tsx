"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import StateBadge from "./StateBadge";
import type { ReviewState } from "@/data/homepage";

type Project = {
  id: string;
  title: string;
  summary: string;
  image: string;
  slug: string;
  tags: string[];
  state: ReviewState;
  proof: string[];
  artifactLabel: string;
};

const projects: Project[] = [
  {
    id: "1",
    title: "OrgX",
    summary:
      "Multi-agent orchestration platform with MCP integrations, trust governance, quality gates, and durable workflows.",
    image: "/images/projects/orgx.jpg",
    slug: "orgx",
    tags: ["Multi-Agent Orchestration", "MCP Protocol", "Agent Governance"],
    state: "Ready for review",
    proof: ["1,457+ commits", "19 repos", "Memory + scoring loops"],
    artifactLabel: "Architecture review",
  },
  {
    id: "2",
    title: "OpenClaw Plugin",
    summary:
      "Browser-native agent control surface with CLI-first orchestration patterns and real-time task management.",
    image: "/images/projects/openclaw.svg",
    slug: "openclaw",
    tags: ["Browser Extension", "Agent UX", "CLI Orchestration"],
    state: "Experimental",
    proof: ["644+ commits", "Browser control UX", "Agent task flow"],
    artifactLabel: "Workflow surface",
  },
  {
    id: "3",
    title: "PerfPulse",
    summary:
      "Rust performance tooling with CLI, web dashboard, and TUI surfaces plus optional AI recommendations.",
    image: "/images/projects/perfpulse.svg",
    slug: "perfpulse",
    tags: ["Rust", "Homebrew Tap", "CLI Tool", "AI-Powered"],
    state: "Live tool",
    proof: ["Homebrew install", "3 operator surfaces", "Local-first inspection"],
    artifactLabel: "Interface preview",
  },
  {
    id: "4",
    title: "BrainBuffet",
    summary:
      "Multi-step LLM product with retrieval, structured generation, and real customer usage in production.",
    image: "/images/projects/brain-buffet.jpg",
    slug: "brain-buffet",
    tags: ["LLM Pipelines", "RAG", "Shipped Product"],
    state: "Shipped in production",
    proof: ["250+ courses", "90% time reduction", "Real customers"],
    artifactLabel: "Product snapshot",
  },
];

export default function FeaturedProjects() {
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
        <div className="mb-14 max-w-3xl">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{
              color: "var(--color-primary)",
              opacity: 0.9,
            }}
          >
            Systems Under Review
          </p>
          <h2
            className="mb-5 text-4xl md:text-5xl font-bold"
            style={{
              color: isDarkTheme ? "var(--color-primary)" : "var(--color-text)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "var(--letter-spacing-tight)",
            }}
          >
            Systems I&apos;ve built
          </h2>
          <p
            className="text-lg md:text-xl"
            style={{
              color: "var(--color-text)",
              opacity: isDarkTheme ? 0.88 : 0.78,
            }}
          >
            These are the systems I would want a hiring manager to inspect first:
            the platforms, tools, and production implementations where orchestration,
            judgment, and proof all show up clearly.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group no-underline"
            >
              <article
                className="flex h-full flex-col overflow-hidden rounded-[2rem] transition-all duration-200 hover:-translate-y-1"
                style={{
                  background: isDarkTheme
                    ? "linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(15, 23, 42, 0.84))"
                    : "rgba(255, 255, 255, 0.95)",
                  border: isDarkTheme
                    ? "1px solid rgba(56, 189, 248, 0.18)"
                    : "1px solid rgba(15, 23, 42, 0.08)",
                  boxShadow: isDarkTheme
                    ? "0 22px 60px rgba(2, 6, 23, 0.34)"
                    : "0 18px 40px rgba(15, 23, 42, 0.08)",
                }}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`Artifact preview for ${project.title}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <div className="absolute left-4 top-4">
                    <StateBadge state={project.state} />
                  </div>
                  <div
                    className="absolute bottom-4 left-4 rounded-full border border-white/12 bg-slate-950/65 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-white/72 backdrop-blur-md"
                  >
                    {project.artifactLabel}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3
                    className="mb-3 text-2xl font-semibold"
                    style={{
                      color: isDarkTheme ? "var(--color-primary)" : "var(--color-text)",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {project.title}
                  </h3>

                  <p
                    className="mb-5 text-base leading-relaxed"
                    style={{
                      color: "var(--color-text)",
                      opacity: isDarkTheme ? 0.9 : 0.78,
                    }}
                  >
                    {project.summary}
                  </p>

                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.proof.map((item) => (
                      <span
                        key={item}
                        className="rounded-full px-3 py-1 text-xs font-medium"
                        style={{
                          background: isDarkTheme
                            ? "rgba(15, 23, 42, 0.84)"
                            : "rgba(15, 23, 42, 0.05)",
                          border: isDarkTheme
                            ? "1px solid rgba(148, 163, 184, 0.16)"
                            : "1px solid rgba(15, 23, 42, 0.06)",
                          color: isDarkTheme ? "rgba(226,232,240,0.92)" : "var(--color-text)",
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full px-3 py-1 text-xs font-medium"
                        style={{
                          background: isDarkTheme
                            ? "rgba(56, 189, 248, 0.12)"
                            : "rgba(15, 23, 42, 0.05)",
                          color: isDarkTheme ? "var(--color-primary)" : "var(--color-text)",
                          border: isDarkTheme
                            ? "1px solid rgba(56, 189, 248, 0.2)"
                            : "1px solid rgba(15, 23, 42, 0.08)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div
                    className="mt-auto inline-flex items-center gap-2 text-sm font-medium"
                    style={{
                      color: "var(--color-primary)",
                    }}
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
    </section>
  );
}
