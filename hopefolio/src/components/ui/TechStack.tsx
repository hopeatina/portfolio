"use client";

import React, { useState } from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

type CapabilityPillar = {
  name: string;
  label: string;
  summary: string;
  behaviors: string[];
  shipped: string[];
  tools: string[];
};

const capabilityPillars: CapabilityPillar[] = [
  {
    name: "Multi-Agent Orchestration",
    label: "Control",
    summary:
      "I design systems that spawn, route, score, pause, and hand off work across multiple agents without losing accountability.",
    behaviors: [
      "Spawn agents only when the task and quality bar justify it",
      "Hold review and approval at the boundaries that actually matter",
      "Keep routing, memory, and scoring legible instead of hiding them behind abstraction",
    ],
    shipped: ["OrgX", "OpenClaw plugin", "Claude Code skills"],
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
    label: "Plumbing",
    summary:
      "I build the connective tissue that makes agent actions safe, composable, and understandable across tools, identities, and workflows.",
    behaviors: [
      "Design schema and tool boundaries that reduce ambiguity",
      "Handle auth, re-auth, and retries as part of the product experience",
      "Treat tool calling as UX, not only backend integration",
    ],
    shipped: ["OrgX MCP integrations", "Transmorph", "OpenClaw plugin"],
    tools: [
      "TypeScript",
      "Python",
      "MCP Protocol",
      "Node.js",
      "Claude Code",
      "OAuth flows",
    ],
  },
  {
    name: "Observability / Evals / Routing",
    label: "Trust",
    summary:
      "I care about the systems behind the systems: how they are measured, debugged, routed, and made trustworthy over time.",
    behaviors: [
      "Make failures inspectable instead of mysterious",
      "Track quality, cost, and performance in the same operating loop",
      "Build tooling that helps operators decide what to inspect next",
    ],
    shipped: ["PerfPulse", "Alma backend monitoring (Sentry, Datadog patterns)", "Outcome scoring in OrgX"],
    tools: ["Rust", "Datadog", "Sentry", "Redis", "OpenTelemetry"],
  },
  {
    name: "Product Engineering at Scale",
    label: "Production",
    summary:
      "I ship product systems under real constraints: healthcare compliance, data scale, reliability, customer impact, and cross-functional handoff.",
    behaviors: [
      "Design workflows that survive rollout, failure, and compliance pressure",
      "Build batch and stateful systems with explicit operational boundaries",
      "Treat product quality and operational quality as the same problem",
    ],
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
            Operating model
          </p>
          <h2
            className="mb-5 text-4xl font-bold md:text-5xl"
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
              opacity: isDarkTheme ? 0.84 : 0.76,
            }}
          >
            The same operating patterns recur across the work: explicit control,
            safe tool calling, visible trust signals, and production-minded execution.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="space-y-3">
            {capabilityPillars.map((item, index) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(index)}
                className="w-full rounded-[1.5rem] border px-5 py-4 text-left transition-all duration-200"
                style={{
                  background:
                    activeTab === index
                      ? isDarkTheme
                        ? "rgba(255, 255, 255, 0.04)"
                        : "rgba(255, 255, 255, 0.9)"
                      : "transparent",
                  borderColor:
                    activeTab === index
                      ? isDarkTheme
                        ? "rgba(56, 189, 248, 0.18)"
                        : "rgba(15, 23, 42, 0.12)"
                      : isDarkTheme
                      ? "rgba(148, 163, 184, 0.12)"
                      : "rgba(15, 23, 42, 0.08)",
                  boxShadow:
                    activeTab === index && !isDarkTheme
                      ? "0 18px 40px rgba(15, 23, 42, 0.06)"
                      : "none",
                }}
              >
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: "var(--color-primary)", opacity: 0.82 }}
                >
                  {item.label}
                </p>
                <p
                  className="mt-2 text-lg font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  {item.name}
                </p>
              </button>
            ))}
          </div>

          <div
            className="overflow-hidden rounded-[2rem] border"
            style={{
              background: isDarkTheme
                ? "rgba(10, 18, 32, 0.5)"
                : "rgba(255, 255, 255, 0.94)",
              borderColor: isDarkTheme
                ? "rgba(56, 189, 248, 0.16)"
                : "rgba(15, 23, 42, 0.08)",
              boxShadow: isDarkTheme
                ? "0 22px 60px rgba(2, 6, 23, 0.3)"
                : "0 18px 40px rgba(15, 23, 42, 0.08)",
            }}
          >
            <div className="border-b border-white/10 px-6 py-6 md:px-8">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: "var(--color-primary)", opacity: 0.82 }}
              >
                {pillar.label}
              </p>
              <h3
                className="mt-3 text-3xl font-semibold"
                style={{
                  color: "var(--color-text)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {pillar.name}
              </h3>
              <p
                className="mt-4 max-w-2xl text-base leading-relaxed md:text-lg"
                style={{
                  color: "var(--color-text)",
                  opacity: isDarkTheme ? 0.86 : 0.78,
                }}
              >
                {pillar.summary}
              </p>
            </div>

            <div className="grid gap-8 px-6 py-6 md:px-8 lg:grid-cols-3">
              <div>
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: "var(--color-primary)", opacity: 0.82 }}
                >
                  Behaviors
                </p>
                <ul className="mt-4 space-y-3 list-none p-0">
                  {pillar.behaviors.map((behavior) => (
                    <li
                      key={behavior}
                      className="flex items-start gap-3 text-sm leading-relaxed md:text-[15px]"
                      style={{
                        color: "var(--color-text)",
                        opacity: isDarkTheme ? 0.84 : 0.76,
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 rounded-full"
                        style={{ background: "var(--color-primary)" }}
                      />
                      <span>{behavior}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: "var(--color-primary)", opacity: 0.82 }}
                >
                  Where it shipped
                </p>
                <ul className="mt-4 space-y-3 list-none p-0">
                  {pillar.shipped.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed md:text-[15px]"
                      style={{
                        color: "var(--color-text)",
                        opacity: isDarkTheme ? 0.84 : 0.76,
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

              <div>
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: "var(--color-primary)", opacity: 0.82 }}
                >
                  Core tools
                </p>
                <ul className="mt-4 space-y-3 list-none p-0">
                  {pillar.tools.map((tool) => (
                    <li
                      key={tool}
                      className="text-sm leading-relaxed md:text-[15px]"
                      style={{
                        color: "var(--color-text)",
                        opacity: isDarkTheme ? 0.84 : 0.76,
                      }}
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
