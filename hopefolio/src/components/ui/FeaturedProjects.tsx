import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import { FiArrowRight } from "react-icons/fi";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  tags: string[];
  metric?: string;
};

const projects: Project[] = [
  {
    id: "1",
    title: "OrgX",
    description:
      "Multi-agent coordination platform. MCP server integrations, durable agent workflows, tool-calling middleware, org memory, trust-based governance. 19-repo ecosystem, 1,457+ commits.",
    image: "/images/projects/orgx.jpg",
    slug: "orgx",
    tags: ["Multi-Agent Orchestration", "MCP Protocol", "Agent Governance"],
    metric: "1,457+ commits",
  },
  {
    id: "2",
    title: "OpenClaw Plugin",
    description:
      "Browser extension for agent control and orchestration. 644+ commits. CLI-first UX for agent interaction, real-time task management.",
    image: "/images/projects/orgx.jpg",
    slug: "openclaw",
    tags: ["Browser Extension", "Agent UX", "CLI Orchestration"],
    metric: "644+ commits",
  },
  {
    id: "3",
    title: "PerfPulse",
    description:
      "AI-powered macOS Activity Monitor replacement. Rust CLI + web dashboard + TUI. Homebrew-installable. Performance scoring with Claude-powered recommendations.",
    image: "/images/projects/neuromosaic.jpg",
    slug: "perfpulse",
    tags: ["Rust", "Homebrew Tap", "CLI Tool", "AI-Powered"],
    metric: "Homebrew tap",
  },
  {
    id: "4",
    title: "BrainBuffet",
    description:
      "AI course platform. Multi-step LLM pipelines, RAG retrieval, structured generation. 250+ courses created, 90% time reduction. Real customers.",
    image: "/images/projects/brain-buffet.jpg",
    slug: "brain-buffet",
    tags: ["LLM Pipelines", "RAG", "Shipped Product"],
    metric: "250+ courses",
  },
];

const FeaturedProjects = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "futuristic";

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
            Systems I've Built
          </h2>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{
              color: "var(--color-text)",
              fontFamily: "var(--font-body)",
              opacity: isDarkTheme ? 0.9 : 1,
            }}
          >
            Agent infrastructure, orchestration platforms, and production AI
            systems
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group relative block"
            >
              <div
                className="relative rounded-2xl overflow-hidden transition-all duration-500 transform group-hover:scale-[1.02]"
                style={{
                  background: isDarkTheme
                    ? "rgba(255, 255, 255, 0.02)"
                    : "white",
                  border: isDarkTheme
                    ? "1px solid var(--color-primary)"
                    : "1px solid var(--color-border)",
                  boxShadow: isDarkTheme
                    ? "0 0 40px rgba(0, 238, 92, 0.1)"
                    : "0 10px 30px rgba(0, 0, 0, 0.1)",
                }}
              >
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`Preview of ${project.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Metric Badge */}
                  {project.metric && (
                    <div
                      className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: isDarkTheme
                          ? "rgba(0, 238, 92, 0.9)"
                          : "var(--color-primary)",
                        color: isDarkTheme ? "black" : "white",
                      }}
                    >
                      {project.metric}
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm rounded-full transition-all duration-300"
                        style={{
                          background: isDarkTheme
                            ? "rgba(0, 238, 92, 0.1)"
                            : "var(--color-primary)",
                          color: isDarkTheme ? "var(--color-primary)" : "white",
                          border: isDarkTheme
                            ? "1px solid var(--color-primary)"
                            : "none",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{
                      color: isDarkTheme
                        ? "var(--color-primary)"
                        : "var(--color-text)",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="mb-4"
                    style={{
                      color: "var(--color-text)",
                      fontFamily: "var(--font-body)",
                      opacity: isDarkTheme ? 0.9 : 1,
                      lineHeight: "1.6",
                    }}
                  >
                    {project.description}
                  </p>

                  {/* View Case Study Link */}
                  <div
                    className="inline-flex items-center group/link transition-all duration-300"
                    style={{
                      color: isDarkTheme
                        ? "var(--color-primary)"
                        : "var(--color-primary)",
                    }}
                  >
                    <span className="font-medium">View Case Study</span>
                    <FiArrowRight className="ml-2 transform transition-transform group-hover/link:translate-x-2" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
