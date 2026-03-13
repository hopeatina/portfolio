"use client";

import React, { useState } from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import type { IconType } from "react-icons";
import { FiActivity, FiCpu, FiShield } from "react-icons/fi";
import { FaAws } from "react-icons/fa";
import { TbPlugConnected } from "react-icons/tb";
import {
  SiAnthropic,
  SiApachespark,
  SiCelery,
  SiCloudflareworkers,
  SiDatadog,
  SiDjango,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPython,
  SiRedis,
  SiRust,
  SiSentry,
  SiSupabase,
  SiTypescript,
} from "react-icons/si";

type CapabilityTool = {
  name: string;
  icon: IconType;
};

type CapabilityPillar = {
  name: string;
  label: string;
  summary: string;
  behaviors: string[];
  shipped: string[];
  tools: CapabilityTool[];
};

const capabilityPillars: CapabilityPillar[] = [
  {
    name: "Multi-Agent Orchestration",
    label: "Control",
    summary:
      "I design systems that spawn, route, score, pause, and hand off work across multiple agents without losing accountability.",
    behaviors: [
      "Spawn agents only when the task and quality bar justify it.",
      "Hold review and approval at the boundaries that actually matter.",
      "Keep routing, memory, and scoring legible instead of hiding them behind abstraction.",
    ],
    shipped: ["OrgX", "OpenClaw plugin", "Claude Code skills"],
    tools: [
      { name: "MCP Protocol", icon: TbPlugConnected },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Supabase", icon: SiSupabase },
      { name: "Claude API", icon: SiAnthropic },
      { name: "OpenAI API", icon: SiOpenai },
      { name: "Cloudflare Workers", icon: SiCloudflareworkers },
    ],
  },
  {
    name: "MCP / Tool Calling / Auth",
    label: "Plumbing",
    summary:
      "I build the connective tissue that makes agent actions safe, composable, and understandable across tools, identities, and workflows.",
    behaviors: [
      "Design schema and tool boundaries that reduce ambiguity.",
      "Handle auth, re-auth, and retries as part of the product experience.",
      "Treat tool calling as UX, not only backend integration.",
    ],
    shipped: ["OrgX MCP integrations", "Transmorph", "OpenClaw plugin"],
    tools: [
      { name: "TypeScript", icon: SiTypescript },
      { name: "Python", icon: SiPython },
      { name: "MCP Protocol", icon: TbPlugConnected },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Claude Code", icon: SiAnthropic },
      { name: "OAuth flows", icon: FiShield },
    ],
  },
  {
    name: "Observability / Evals / Routing",
    label: "Trust",
    summary:
      "I care about the systems behind the systems: how they are measured, debugged, routed, and made trustworthy over time.",
    behaviors: [
      "Make failures inspectable instead of mysterious.",
      "Track quality, cost, and performance in the same operating loop.",
      "Build tooling that helps operators decide what to inspect next.",
    ],
    shipped: [
      "PerfPulse",
      "Alma backend monitoring",
      "Outcome scoring in OrgX",
    ],
    tools: [
      { name: "Rust", icon: SiRust },
      { name: "Datadog", icon: SiDatadog },
      { name: "Sentry", icon: SiSentry },
      { name: "Redis", icon: SiRedis },
      { name: "OpenTelemetry", icon: FiActivity },
      { name: "Agent runtime", icon: FiCpu },
    ],
  },
  {
    name: "Product Engineering at Scale",
    label: "Production",
    summary:
      "I ship product systems under real constraints: healthcare compliance, data scale, reliability, customer impact, and cross-functional handoff.",
    behaviors: [
      "Design workflows that survive rollout, failure, and compliance pressure.",
      "Build batch and stateful systems with explicit operational boundaries.",
      "Treat product quality and operational quality as the same problem.",
    ],
    shipped: ["Alma", "Vessel Health", "Capital One", "BrainBuffet"],
    tools: [
      { name: "Django", icon: SiDjango },
      { name: "Celery", icon: SiCelery },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "AWS", icon: FaAws },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Spark / Scala", icon: SiApachespark },
    ],
  },
];

export default function TechStack() {
  const { theme } = useTheme();
  const isDarkTheme = theme === "futuristic";
  const [activeTab, setActiveTab] = useState(0);
  const pillar = capabilityPillars[activeTab];
  const accentColor = isDarkTheme
    ? "var(--color-primary)"
    : "var(--color-text)";

  return (
    <section
      className="relative overflow-hidden py-24"
      style={{
        background: isDarkTheme
          ? "rgba(2, 6, 23, 0.98)"
          : "var(--color-surface)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-3xl">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: "var(--color-primary)", opacity: 0.9 }}
          >
            Operating model
          </p>
          <h2
            className="text-4xl font-bold md:text-5xl"
            style={{
              color: isDarkTheme
                ? "var(--color-primary)"
                : "var(--color-text)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "var(--letter-spacing-tight)",
            }}
          >
            How the systems behave
          </h2>
          <p
            className="mt-5 text-lg leading-relaxed md:text-xl"
            style={{
              color: "var(--color-text)",
              opacity: isDarkTheme ? 0.82 : 0.74,
            }}
          >
            Explicit control, safe tool calling, visible trust signals, and
            production-minded execution should read as behavior, not just as a
            list of technologies.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[248px_minmax(0,1fr)]">
          <div className="space-y-3">
            {capabilityPillars.map((item, index) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(index)}
                className="w-full rounded-[1.55rem] border px-5 py-4 text-left transition-all duration-200"
                style={{
                  background:
                    activeTab === index
                      ? isDarkTheme
                        ? "rgba(255, 255, 255, 0.04)"
                        : "rgba(255, 255, 255, 0.92)"
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
                      ? "0 16px 40px rgba(15, 23, 42, 0.06)"
                      : "none",
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: "var(--color-primary)", opacity: 0.82 }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-sm font-medium"
                    style={{
                      color: "var(--color-text)",
                      opacity: activeTab === index ? 0.6 : 0.48,
                    }}
                  >
                    0{index + 1}
                  </p>
                </div>
                <p
                  className="mt-3 text-lg font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  {item.name}
                </p>
                <div className="mt-4 flex items-center gap-2 text-base">
                  {item.tools.slice(0, 3).map((tool) => {
                    const Icon = tool.icon;

                    return (
                      <span
                        key={tool.name}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border"
                        style={{
                          borderColor: isDarkTheme
                            ? "rgba(148, 163, 184, 0.18)"
                            : "rgba(15, 23, 42, 0.1)",
                          background: isDarkTheme
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(255, 255, 255, 0.72)",
                          color: accentColor,
                        }}
                        aria-hidden="true"
                      >
                        <Icon />
                      </span>
                    );
                  })}
                </div>
              </button>
            ))}
          </div>

          <div
            className="overflow-hidden rounded-[2.1rem] border"
            style={{
              background: isDarkTheme
                ? "linear-gradient(180deg, rgba(9, 17, 31, 0.94), rgba(5, 10, 20, 0.94))"
                : "rgba(255, 255, 255, 0.95)",
              borderColor: isDarkTheme
                ? "rgba(56, 189, 248, 0.16)"
                : "rgba(15, 23, 42, 0.08)",
              boxShadow: isDarkTheme
                ? "0 22px 64px rgba(2, 6, 23, 0.32)"
                : "0 18px 42px rgba(15, 23, 42, 0.08)",
            }}
          >
            <div className="grid gap-8 px-6 py-6 md:px-8 md:py-8 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div>
                <h3
                  className="text-3xl font-semibold"
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
                    opacity: isDarkTheme ? 0.84 : 0.76,
                  }}
                >
                  {pillar.summary}
                </p>

                <div className="mt-8 grid gap-8 md:grid-cols-2">
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
                            opacity: isDarkTheme ? 0.82 : 0.74,
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
                            opacity: isDarkTheme ? 0.82 : 0.74,
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

              <div>
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: "var(--color-primary)", opacity: 0.82 }}
                >
                  Frameworks & tools
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {pillar.tools.map((tool) => {
                    const Icon = tool.icon;

                    return (
                      <div
                        key={tool.name}
                        className="flex items-center gap-3 rounded-[1rem] border px-3 py-3"
                        style={{
                          borderColor: isDarkTheme
                            ? "rgba(148, 163, 184, 0.12)"
                            : "rgba(15, 23, 42, 0.08)",
                          background: isDarkTheme
                            ? "rgba(255, 255, 255, 0.03)"
                            : "rgba(248, 250, 252, 0.72)",
                        }}
                      >
                        <span
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border text-lg"
                          style={{
                            borderColor: isDarkTheme
                              ? "rgba(148, 163, 184, 0.18)"
                              : "rgba(15, 23, 42, 0.08)",
                            color: accentColor,
                            background: isDarkTheme
                              ? "rgba(255, 255, 255, 0.05)"
                              : "rgba(255, 255, 255, 0.88)",
                          }}
                          aria-hidden="true"
                        >
                          <Icon />
                        </span>
                        <span
                          className="text-sm font-medium leading-tight md:text-[15px]"
                          style={{
                            color: "var(--color-text)",
                            opacity: isDarkTheme ? 0.9 : 0.82,
                          }}
                        >
                          {tool.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
