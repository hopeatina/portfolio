"use client";

import React, { useState } from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

type CapabilityPillar = {
  name: string;
  summary: string;
  behaviors: string[];
  shipped: string[];
  tools: string[];
};

const capabilityPillars: CapabilityPillar[] = [
  {
    name: "Multi-Agent Orchestration",
    summary:
      "I design systems that spawn, route, score, pause, and hand off work across multiple agents without losing accountability.",
    behaviors: ["spawn", "handoff", "review", "quality gates", "trust calibration"],
    shipped: ["OrgX", "OpenClaw plugin", "Claude Code skills ecosystem"],
    tools: [
      "MCP Protocol",
      "TypeScript",
      "Supabase",
      "Claude API",
      "OpenAI API",
      "Cloudflare Workers",
    ],
  },
  {
    name: "MCP / Tool Calling / Auth",
    summary:
      "I build the plumbing that makes agent actions safe, legible, and composable across tools, identities, and workflows.",
    behaviors: ["tool discovery", "auth flows", "schema validation", "guardrails", "retry / re-auth"],
    shipped: ["OrgX MCP integrations", "Transmorph", "OpenClaw plugin"],
    tools: ["TypeScript", "Python", "MCP Protocol", "Node.js", "Claude Code", "OAuth flows"],
  },
  {
    name: "Observability / Evals / Routing",
    summary:
      "I care about the systems behind the systems: how they are measured, debugged, routed, and made trustworthy over time.",
    behaviors: ["monitoring", "performance debugging", "quality scoring", "routing", "cost attribution"],
    shipped: ["PerfPulse", "Alma dashboards", "Outcome scoring in OrgX"],
    tools: ["Rust", "Datadog", "Sentry", "Redis", "OpenTelemetry"],
  },
  {
    name: "Product Engineering at Scale",
    summary:
      "I ship product systems under real constraints: healthcare compliance, data scale, reliability, customer impact, and cross-functional handoff.",
    behaviors: ["batch workflows", "feature flags", "state machines", "rollout safety", "production reliability"],
    shipped: ["Alma", "Vessel Health", "Capital One", "BrainBuffet"],
    tools: ["Django", "Celery", "PostgreSQL", "AWS", "Next.js", "Spark / Scala"],
  },
];

export default function TechStack() {
  const { theme } = useTheme();
  const isDarkTheme = theme === "futuristic";
  const [activeTab, setActiveTab] = useState(0);
  const pillar = capabilityPillars[activeTab];

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
            style={{ color: "var(--color-primary)", opacity: 0.9 }}
          >
            Operating Pillars
          </p>
          <h2
            className="mb-5 text-4xl md:text-5xl font-bold"
            style={{
              color: isDarkTheme ? "var(--color-primary)" : "var(--color-text)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "var(--letter-spacing-tight)",
            }}
          >
            How the systems behave
          </h2>
          <p
            className="text-lg md:text-xl"
            style={{
              color: "var(--color-text)",
              opacity: isDarkTheme ? 0.88 : 0.78,
            }}
          >
            This is the operating model behind the projects: the patterns,
            control surfaces, and infrastructure habits that show up repeatedly
            across orchestration, tooling, and production product work.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap gap-3" role="tablist">
          {capabilityPillars.map((item, index) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(index)}
              role="tab"
              aria-selected={activeTab === index}
              className="rounded-full px-5 py-3 text-sm font-medium transition-all duration-200 md:text-base"
              style={{
                background:
                  activeTab === index
                    ? isDarkTheme
                      ? "rgba(56, 189, 248, 0.16)"
                      : "rgba(15, 23, 42, 0.08)"
                    : "transparent",
                color:
                  activeTab === index
                    ? isDarkTheme
                      ? "var(--color-primary)"
                      : "var(--color-text)"
                    : "var(--color-text)",
                border: `1px solid ${
                  activeTab === index
                    ? isDarkTheme
                      ? "rgba(56, 189, 248, 0.25)"
                      : "rgba(15, 23, 42, 0.12)"
                    : isDarkTheme
                    ? "rgba(148, 163, 184, 0.18)"
                    : "rgba(15, 23, 42, 0.08)"
                }`,
                opacity: activeTab === index ? 1 : 0.78,
              }}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div
          className="rounded-[2rem] p-8 md:p-10"
          style={{
            background: isDarkTheme
              ? "linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(15, 23, 42, 0.82))"
              : "rgba(255, 255, 255, 0.95)",
            border: isDarkTheme
              ? "1px solid rgba(56, 189, 248, 0.16)"
              : "1px solid rgba(15, 23, 42, 0.08)",
            boxShadow: isDarkTheme
              ? "0 22px 60px rgba(2, 6, 23, 0.34)"
              : "0 18px 40px rgba(15, 23, 42, 0.08)",
          }}
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <p
                className="mb-2 text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: "var(--color-primary)", opacity: 0.9 }}
              >
                What I build
              </p>
              <h3
                className="mb-4 text-3xl font-semibold"
                style={{
                  color: "var(--color-text)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {pillar.name}
              </h3>
              <p
                className="mb-8 max-w-2xl text-base leading-relaxed md:text-lg"
                style={{
                  color: "var(--color-text)",
                  opacity: isDarkTheme ? 0.9 : 0.78,
                }}
              >
                {pillar.summary}
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                <div
                  className="rounded-2xl px-5 py-5"
                  style={{
                    background: isDarkTheme
                      ? "rgba(15, 23, 42, 0.7)"
                      : "rgba(15, 23, 42, 0.04)",
                    border: isDarkTheme
                      ? "1px solid rgba(148, 163, 184, 0.16)"
                      : "1px solid rgba(15, 23, 42, 0.06)",
                  }}
                >
                  <p
                    className="mb-3 text-xs font-semibold uppercase tracking-[0.16em]"
                    style={{ color: "var(--color-primary)" }}
                  >
                    How it behaves
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {pillar.behaviors.map((behavior) => (
                      <span
                        key={behavior}
                        className="rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.12em]"
                        style={{
                          background: isDarkTheme
                            ? "rgba(56, 189, 248, 0.12)"
                            : "rgba(15, 23, 42, 0.06)",
                          border: isDarkTheme
                            ? "1px solid rgba(56, 189, 248, 0.18)"
                            : "1px solid rgba(15, 23, 42, 0.08)",
                          color: isDarkTheme ? "var(--color-primary)" : "var(--color-text)",
                        }}
                      >
                        {behavior}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className="rounded-2xl px-5 py-5"
                  style={{
                    background: isDarkTheme
                      ? "rgba(15, 23, 42, 0.7)"
                      : "rgba(15, 23, 42, 0.04)",
                    border: isDarkTheme
                      ? "1px solid rgba(148, 163, 184, 0.16)"
                      : "1px solid rgba(15, 23, 42, 0.06)",
                  }}
                >
                  <p
                    className="mb-3 text-xs font-semibold uppercase tracking-[0.16em]"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Where it shipped
                  </p>
                  <ul className="space-y-2 list-none p-0">
                    {pillar.shipped.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-relaxed"
                        style={{
                          color: "var(--color-text)",
                          opacity: isDarkTheme ? 0.9 : 0.78,
                        }}
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 rounded-full"
                          style={{ background: "var(--color-primary)" }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <aside
              className="rounded-[1.6rem] px-6 py-6"
              style={{
                background: isDarkTheme
                  ? "rgba(15, 23, 42, 0.72)"
                  : "rgba(15, 23, 42, 0.04)",
                border: isDarkTheme
                  ? "1px solid rgba(148, 163, 184, 0.16)"
                  : "1px solid rgba(15, 23, 42, 0.06)",
              }}
            >
              <p
                className="mb-3 text-xs font-semibold uppercase tracking-[0.16em]"
                style={{ color: "var(--color-primary)" }}
              >
                Core tools
              </p>
              <div className="flex flex-wrap gap-2">
                {pillar.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full px-3 py-1.5 text-sm font-medium"
                    style={{
                      background: isDarkTheme
                        ? "rgba(255, 255, 255, 0.04)"
                        : "rgba(255, 255, 255, 0.88)",
                      border: isDarkTheme
                        ? "1px solid rgba(148, 163, 184, 0.14)"
                        : "1px solid rgba(15, 23, 42, 0.06)",
                      color: "var(--color-text)",
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
