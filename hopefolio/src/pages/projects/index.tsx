import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";

const projects = [
  // --- Flagship Systems ---
  {
    id: "orgx",
    title: "OrgX",
    description:
      "Multi-agent orchestration platform with MCP server integrations, durable workflows, and trust-based governance.",
    longDescription:
      "Multi-agent coordination platform. MCP server integrations, durable agent workflows, tool-calling middleware, org memory, trust-based governance. 19-repo ecosystem, 1,457+ commits.",
    link: "/projects/orgx",
    image: "/images/projects/orgx.jpg",
    tags: ["Multi-Agent Orchestration", "MCP Protocol", "Agent Governance"],
    color: "green",
    featured: true,
    tier: "flagship",
    metric: "1,457+ commits",
  },
  {
    id: "openclaw",
    title: "OpenClaw Plugin",
    description:
      "Browser extension for agent control and orchestration with CLI-first UX.",
    longDescription:
      "Browser extension for agent control and orchestration. 644+ commits. CLI-first UX for agent interaction, real-time task management.",
    link: "/projects/openclaw",
    image: "/images/projects/orgx.jpg",
    tags: ["Browser Extension", "Agent UX", "CLI Orchestration"],
    color: "blue",
    featured: true,
    tier: "flagship",
    metric: "644+ commits",
  },
  {
    id: "perfpulse",
    title: "PerfPulse",
    description:
      "AI-powered macOS Activity Monitor replacement. Rust CLI + web dashboard + TUI.",
    longDescription:
      "AI-powered macOS Activity Monitor replacement. Rust CLI + web dashboard + TUI. Homebrew-installable. Performance scoring with Claude-powered recommendations.",
    link: "/projects/perfpulse",
    image: "/images/projects/neuromosaic.jpg",
    tags: ["Rust", "Homebrew Tap", "CLI Tool", "AI-Powered"],
    color: "orange",
    featured: true,
    tier: "flagship",
    metric: "Homebrew tap",
  },
  {
    id: "alma",
    title: "Alma: Production AI",
    description:
      "HIPAA-compliant clinical AI features. Therapist adoption 40% → 89%.",
    longDescription:
      "AI-powered automated reassessment system, compliant progress notes, Brellium audit integration. Django/Celery/PostgreSQL at HIPAA scale. Therapist adoption 40% → 89%.",
    link: "/projects/alma",
    image: "/images/projects/brain-buffet.jpg",
    tags: ["Production AI", "HIPAA", "Django", "Healthcare"],
    color: "purple",
    featured: true,
    tier: "flagship",
    metric: "89% adoption",
  },
  // --- Selected Work ---
  {
    id: "brain-buffet",
    title: "BrainBuffet",
    description:
      "AI course platform with multi-step LLM pipelines, RAG retrieval, and real customers.",
    longDescription:
      "AI course platform. Multi-step LLM pipelines, RAG retrieval, structured generation. 250+ courses created, 90% time reduction. Real customers.",
    link: "/projects/brain-buffet",
    image: "/images/projects/brain-buffet.jpg",
    tags: ["LLM Pipelines", "RAG", "Shipped Product"],
    color: "blue",
    featured: true,
    tier: "selected",
    metric: "250+ courses",
  },
  {
    id: "deep-human",
    title: "Deep Human",
    description:
      "MCP-based digital twin framework with multi-agent persona systems.",
    longDescription:
      "MCP-based digital twin framework. Multi-agent AI personas, compatibility algorithms, dynamic personality modeling. 50+ custom tools, 2000+ lines of Python.",
    link: "/projects/deep-human",
    image: "/images/projects/deep-human.jpg",
    tags: ["MCP Protocol", "Multi-Agent AI", "Digital Twin"],
    color: "pink",
    featured: true,
    tier: "selected",
  },
  {
    id: "neuromosaic",
    title: "Neuromosaic",
    description:
      "Distributed ML infrastructure for scalable neural network training.",
    longDescription:
      "Distributed ML research platform. Scalable neural network training infrastructure for researchers and developers.",
    link: "/projects/neuromosaic",
    image: "/images/projects/neuromosaic.jpg",
    tags: ["Distributed ML", "Infrastructure", "Python"],
    color: "purple",
    featured: true,
    tier: "selected",
  },
  {
    id: "framefx",
    title: "FrameFX",
    description:
      "8-package Remotion monorepo for token-driven motion design.",
    longDescription:
      "8-package Remotion monorepo. Token-driven motion design system with FPS-aware conversion, animation hooks, and declarative components.",
    link: "/projects/framefx",
    image: "/images/projects/transmorph.jpg",
    tags: ["Remotion", "Monorepo", "Design Tokens"],
    color: "cyan",
    tier: "selected",
    metric: "8 packages",
  },
  {
    id: "meridian",
    title: "Meridian",
    description:
      "Premium trading signal platform with Convex + TimescaleDB + IBKR.",
    longDescription:
      "Premium trading signal platform. Multi-source data ingestion, approval workflows, real-time analytics. Convex + TimescaleDB + IBKR integration.",
    link: "/projects/meridian",
    image: "/images/projects/transmorph.jpg",
    tags: ["Real-Time Data", "Convex", "TimescaleDB"],
    color: "teal",
    tier: "selected",
  },
  // --- Other / Experimental ---
  {
    id: "evalvybes",
    title: "EvalVybes",
    description:
      "Conversational AI evaluation platform for comparing multiple AI models.",
    longDescription:
      "Compare AI models through natural conversation. Test prompts across GPT-4, Claude, and more.",
    link: "/projects/evalvybes",
    image: "/images/projects/evalvybes.jpg",
    tags: ["Voice AI", "Model Comparison", "Next.js"],
    color: "pink",
    tier: "other",
  },
  {
    id: "theaicookup",
    title: "The AI Cook-Up",
    description:
      "Community platform for AI hackathon events in Houston.",
    longDescription:
      "Fostering Houston's AI community through organized events and LLM-powered team formation.",
    link: "/projects/theaicookup",
    image: "/images/projects/theaicookup.jpg",
    tags: ["Event Platform", "Community", "AI"],
    color: "teal",
    tier: "other",
  },
  {
    id: "belief-map",
    title: "Belief Map",
    description: "Interactive belief mapping to explore personal assumptions.",
    longDescription:
      "Visual conversation with yourself — externalize thoughts into an interactive graph.",
    link: "/projects/belief-map",
    image: "/images/projects/belief-map.jpg",
    tags: ["Experimental", "Visualization"],
    color: "indigo",
    tier: "other",
  },
  {
    id: "upload-to-mail",
    title: "Upload to Mail",
    description: "Upload documents online and send them as physical mail.",
    longDescription:
      "Bridging digital files and real mailboxes.",
    link: "/projects/upload-to-mail",
    image: "/images/projects/upload-to-mail.jpg",
    tags: ["Full Stack", "React", "Node.js"],
    color: "red",
    tier: "other",
  },
  {
    id: "tasktomodel",
    title: "TaskToModel",
    description: "Convert plain-text descriptions into custom AI models.",
    longDescription:
      "Democratizing AI development by making building a specialized AI as easy as writing out your idea.",
    link: "/projects/tasktomodel",
    image: "/images/projects/tasktomodel.jpg",
    tags: ["AI Platform", "Code Generation"],
    color: "orange",
    tier: "other",
  },
  {
    id: "transmorph",
    title: "Transmorph",
    description: "Transform any API into an AI-driven tool.",
    longDescription:
      "Making MCP-Gen accessible through a simple UI — instantly turn APIs into intelligent services.",
    link: "/projects/transmorph",
    image: "/images/projects/transmorph.jpg",
    tags: ["Developer Tools", "MCP Protocol"],
    color: "cyan",
    tier: "other",
  },
  {
    id: "bodyfx",
    title: "BodyFX",
    description:
      "AI video segmentation for After Effects and OBS streaming.",
    longDescription:
      "Automated rotoscoping with Meta's SAM2 and real-time background removal.",
    link: "/projects/bodyfx",
    image: "/images/projects/bodyfx.jpg",
    tags: ["Computer Vision", "Python"],
    color: "purple",
    tier: "other",
  },
];

// Project Card Component
interface ProjectCardProps {
  project: (typeof projects)[0];
  featured?: boolean;
}

function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const { theme } = useTheme();
  const isDarkTheme = theme === "futuristic";

  return (
    <Link href={project.link}>
      <Card
        variant={isDarkTheme ? "glass" : "elevated"}
        className="group h-full cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02]"
        padding={featured ? "lg" : "md"}
      >
        {/* Project Image */}
        <div
          className={`relative ${
            featured ? "h-56" : "h-48"
          } -mx-6 -mt-6 mb-6 overflow-hidden`}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />

          {/* Metric Badge */}
          {project.metric && (
            <div
              className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: isDarkTheme
                  ? "rgba(0, 238, 92, 0.9)"
                  : "var(--primary)",
                color: isDarkTheme ? "black" : "white",
              }}
            >
              {project.metric}
            </div>
          )}
        </div>

        {/* Project Title */}
        <h3
          className={`${
            featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
          } font-bold mb-3`}
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--primary)",
          }}
        >
          {project.title}
        </h3>

        {/* Project Description */}
        <p
          className={`mb-4 ${
            featured ? "text-base md:text-lg" : "text-sm md:text-base"
          }`}
          style={{
            color: isDarkTheme
              ? "var(--text-on-dark-secondary)"
              : "var(--text-secondary)",
            lineHeight: "var(--line-height-body)",
          }}
        >
          {featured ? project.longDescription : project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, featured ? 4 : 3).map((tag) => (
            <Tag key={tag} size="sm" className="text-xs">
              {tag}
            </Tag>
          ))}
        </div>

        {/* Learn More Link */}
        <div
          className="flex items-center text-sm font-medium transition-colors duration-300"
          style={{ color: "var(--accent)" }}
        >
          <span>{featured ? "View Case Study" : "View Details"}</span>
          <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </Card>
    </Link>
  );
}

// Tier groupings
const flagshipProjects = projects.filter((p) => p.tier === "flagship");
const selectedProjects = projects.filter((p) => p.tier === "selected");
const otherProjects = projects.filter((p) => p.tier === "other");

export default function Projects() {
  const { theme } = useTheme();
  const isDarkTheme = theme === "futuristic";

  return (
    <>
      <Head>
        <title>Projects | Hope Atina - AI Agent Infrastructure</title>
        <meta
          name="description"
          content="Systems and tools for AI agent infrastructure, multi-agent orchestration, and production AI."
        />
      </Head>

      <main
        className="min-h-screen"
        style={{ paddingTop: "var(--spacing-24)" }}
      >
        {/* Header Section */}
        <section className="relative">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl">
              <h1
                className="text-5xl md:text-7xl font-bold mb-6"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: isDarkTheme ? "var(--text-on-dark)" : "var(--text)",
                  lineHeight: "var(--line-height-heading)",
                }}
              >
                Projects
              </h1>
              <p
                className="text-xl md:text-2xl"
                style={{
                  fontFamily: "var(--font-body)",
                  color: isDarkTheme
                    ? "var(--text-on-dark-secondary)"
                    : "var(--text-secondary)",
                  lineHeight: "var(--line-height-body)",
                }}
              >
                Systems and tools for AI agent infrastructure, multi-agent
                orchestration, and production AI
              </p>
            </div>
          </div>

          {/* Background decoration */}
          <div
            className="absolute inset-0 -z-10 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, var(--primary) 0%, transparent 50%)`,
            }}
          />
        </section>

        {/* Flagship Systems */}
        <section
          className="relative py-16"
          style={{
            background: isDarkTheme ? "var(--background)" : "var(--surface)",
          }}
        >
          <div className="container mx-auto px-4">
            <h2
              className="text-3xl md:text-4xl font-bold mb-12"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--primary)",
              }}
            >
              Flagship Systems
            </h2>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {flagshipProjects.map((project) => (
                <ProjectCard key={project.id} project={project} featured />
              ))}
            </div>
          </div>
        </section>

        {/* Selected Work */}
        <section
          className="relative py-16"
          style={{
            background: isDarkTheme
              ? "var(--background-secondary)"
              : "var(--background)",
          }}
        >
          <div className="container mx-auto px-4">
            <h2
              className="text-3xl md:text-4xl font-bold mb-12"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--primary)",
              }}
            >
              Selected Work
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {selectedProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  featured={false}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Other / Experimental */}
        {otherProjects.length > 0 && (
          <section
            className="relative py-16"
            style={{
              background: isDarkTheme
                ? "var(--background)"
                : "var(--surface)",
            }}
          >
            <div className="container mx-auto px-4">
              <h2
                className="text-3xl md:text-4xl font-bold mb-12"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--primary)",
                }}
              >
                Other Projects
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {otherProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    featured={false}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section
          className="relative py-24"
          style={{
            background: isDarkTheme
              ? "linear-gradient(to bottom right, var(--background), var(--primary-dark))"
              : "linear-gradient(to bottom right, var(--primary-light), var(--accent-light))",
          }}
        >
          <div className="container mx-auto px-4 text-center">
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{
                fontFamily: "var(--font-heading)",
                color: isDarkTheme ? "var(--text-on-dark)" : "var(--text)",
              }}
            >
              Building agent infrastructure? Let's talk.
            </h2>
            <p
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
              style={{
                color: isDarkTheme
                  ? "var(--text-on-dark-secondary)"
                  : "var(--text-secondary)",
              }}
            >
              I'm looking for roles in multi-agent orchestration, MCP/tool-calling
              platforms, observability, and AI infrastructure.
            </p>
            <Button
              href="/contact"
              size="lg"
              variant="primary"
              className="mx-auto"
            >
              Get In Touch
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
