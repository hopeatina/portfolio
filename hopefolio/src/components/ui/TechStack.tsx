"use client";

import React, { useState } from "react";
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full py-40 px-6 lg:px-12 bg-transparent">
      <div className="mx-auto max-w-7xl">
        <div className="mb-32">
          <p className="mb-6 text-xs font-mono uppercase tracking-[0.25em] text-text-muted">
            Operating model
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-medium tracking-tight text-text">
            How the systems <span className="italic text-primary font-light">behave</span>
          </h2>
        </div>

        <div className="flex flex-col border-t border-white/10">
          {capabilityPillars.map((item, index) => (
            <div
              key={item.name}
              className="group relative border-b border-white/10 py-16 transition-colors duration-500 hover:bg-white/[0.02]"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 relative z-10 px-8">
                
                {/* Typographic Left */}
                <div className="flex flex-col justify-center">
                  <p className="text-xs font-mono text-white/40 mb-6 tracking-widest uppercase">
                    0{index + 1} {"//"} {item.label}
                  </p>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading text-text group-hover:text-primary transition-colors duration-500">
                    {item.name}
                  </h3>
                </div>

                {/* Details revealed on hover (always visible on mobile, fading on desktop) */}
                <div className={`flex flex-col gap-10 transition-all duration-500 ${hoveredIndex === index ? 'opacity-100 translate-y-0' : 'lg:opacity-0 lg:translate-y-4 opacity-100 translate-y-0'}`}>
                  <p className="text-2xl font-body font-light text-text-muted leading-relaxed">
                    {item.summary}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/50 mb-6">Behaviors</p>
                      <ul className="space-y-4">
                        {item.behaviors.map((behavior, i) => (
                          <li key={i} className="text-base text-text-muted font-light leading-relaxed flex items-start gap-4">
                            <span className="text-primary mt-1 text-xs">✦</span>
                            {behavior}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/50 mb-6">Tooling</p>
                      <div className="flex flex-wrap gap-4">
                        {item.tools.map((tool) => {
                          const Icon = tool.icon;
                          return (
                            <div key={tool.name} className="flex items-center gap-2 text-sm text-text-muted bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:border-primary hover:text-primary transition-colors cursor-default">
                              <Icon className="text-lg" />
                              <span>{tool.name}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Glowing Interaction Effect */}
              <div 
                className={`absolute inset-0 z-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 transition-opacity duration-700 pointer-events-none ${hoveredIndex === index ? 'opacity-100' : ''}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
