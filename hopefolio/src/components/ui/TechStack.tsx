import React, { useState } from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import {
  SiPython,
  SiTypescript,
  SiRust,
  SiPostgresql,
  SiReact,
  SiNextdotjs,
  SiDjango,
  SiNodedotjs,
  SiApachespark,
  SiCelery,
  SiVercel,
  SiSupabase,
  SiSentry,
  SiOpenai,
  SiDatadog,
  SiRedis,
  SiFlask,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { DiScala } from "react-icons/di";

type CapabilityPillar = {
  name: string;
  proof: string;
  technologies: {
    name: string;
    icon?: React.ComponentType<any>;
  }[];
};

const capabilityPillars: CapabilityPillar[] = [
  {
    name: "Multi-Agent Orchestration",
    proof: "OrgX: agent spawning, task handoff, decision approval, autonomous sessions, durable workflows, quality gates",
    technologies: [
      { name: "MCP Protocol" },
      { name: "Claude API" },
      { name: "OpenAI API", icon: SiOpenai },
      { name: "Supabase", icon: SiSupabase },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Cloudflare Workers" },
    ],
  },
  {
    name: "MCP / Tool Calling / Auth",
    proof: "MCP server integrations, tool-calling middleware, OAuth/auth flows, Claude Code skills, Cursor plugin",
    technologies: [
      { name: "TypeScript", icon: SiTypescript },
      { name: "Python", icon: SiPython },
      { name: "MCP Protocol" },
      { name: "Claude Code" },
      { name: "Node.js", icon: SiNodedotjs },
    ],
  },
  {
    name: "Observability / Evals / Routing",
    proof: "PerfPulse, Datadog dashboards at Alma, production monitoring, cost attribution, performance debugging",
    technologies: [
      { name: "Rust", icon: SiRust },
      { name: "Datadog", icon: SiDatadog },
      { name: "Sentry", icon: SiSentry },
      { name: "Redis", icon: SiRedis },
      { name: "OpenTelemetry" },
    ],
  },
  {
    name: "Product Engineering at Scale",
    proof: "Alma (HIPAA clinical), Vessel Health (re-architecture), Capital One (data pipelines), BrainBuffet (LLM product)",
    technologies: [
      { name: "Django", icon: SiDjango },
      { name: "Celery", icon: SiCelery },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "AWS", icon: FaAws },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Flask", icon: SiFlask },
      { name: "Spark", icon: SiApachespark },
      { name: "Scala", icon: DiScala },
    ],
  },
];

const TechStack = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "futuristic";
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background: isDarkTheme
          ? "var(--color-background)"
          : "var(--color-surface)",
        minHeight: "600px",
      }}
    >
      {/* Content Container */}
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              color: isDarkTheme ? "var(--color-primary)" : "var(--color-text)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "var(--letter-spacing-tight)",
            }}
          >
            Capabilities
          </h2>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{
              color: "var(--color-text)",
              fontFamily: "var(--font-body)",
              opacity: isDarkTheme ? 0.9 : 1,
            }}
          >
            Four pillars of infrastructure I build and ship
          </p>
        </div>

        {/* Tabs */}
        <div
          className="flex flex-wrap justify-center mb-12 gap-3"
          role="tablist"
        >
          {capabilityPillars.map((pillar, index) => (
            <button
              key={pillar.name}
              onClick={() => setActiveTab(index)}
              role="tab"
              aria-selected={activeTab === index}
              className="px-5 py-3 rounded-full transition-all duration-300 relative group text-sm md:text-base"
              style={{
                background:
                  activeTab === index
                    ? isDarkTheme
                      ? "var(--color-primary)"
                      : "var(--gradient-primary)"
                    : "transparent",
                color:
                  activeTab === index
                    ? isDarkTheme
                      ? "var(--color-background)"
                      : "white"
                    : "var(--color-text)",
                border: `2px solid ${
                  activeTab === index
                    ? "transparent"
                    : isDarkTheme
                    ? "var(--color-primary)"
                    : "var(--color-border)"
                }`,
              }}
            >
              <span className="relative z-10 font-medium">{pillar.name}</span>
            </button>
          ))}
        </div>

        {/* Active Pillar Content */}
        <div
          className="relative p-8 rounded-2xl overflow-hidden"
          style={{
            background: isDarkTheme ? "rgba(255, 255, 255, 0.02)" : "white",
            border: isDarkTheme
              ? "1px solid var(--color-primary)"
              : "1px solid var(--color-border)",
            boxShadow: isDarkTheme
              ? "0 0 40px rgba(0, 238, 92, 0.1)"
              : "0 10px 30px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Proof Statement */}
          <p
            className="text-base mb-8 max-w-3xl"
            style={{
              color: "var(--color-text)",
              fontFamily: "var(--font-body)",
              opacity: isDarkTheme ? 0.85 : 0.8,
              lineHeight: "1.7",
            }}
          >
            {capabilityPillars[activeTab].proof}
          </p>

          {/* Technologies Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {capabilityPillars[activeTab].technologies.map((item) => (
              <div
                key={item.name}
                className="group relative flex items-center justify-center p-6 rounded-xl transition-all duration-500 hover:scale-[1.02] cursor-pointer"
                style={{
                  background: isDarkTheme
                    ? "rgba(0, 238, 92, 0.05)"
                    : "var(--color-surface)",
                  border: isDarkTheme
                    ? "1px solid rgba(0, 238, 92, 0.2)"
                    : "1px solid var(--color-border)",
                  height: "100px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = isDarkTheme
                    ? "0 0 30px rgba(0, 238, 92, 0.3)"
                    : "0 10px 20px rgba(109, 40, 217, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="flex flex-col items-center justify-center gap-3">
                  {item.icon && (
                    <div className="transition-transform duration-500 group-hover:scale-110">
                      {React.createElement(item.icon, {
                        className: "w-7 h-7",
                        style: {
                          color: isDarkTheme
                            ? "var(--color-primary)"
                            : "var(--color-primary)",
                        },
                      })}
                    </div>
                  )}
                  <div
                    className="font-medium text-center text-sm"
                    style={{
                      color: "var(--color-text)",
                      opacity: isDarkTheme ? 0.9 : 1,
                    }}
                  >
                    {item.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
