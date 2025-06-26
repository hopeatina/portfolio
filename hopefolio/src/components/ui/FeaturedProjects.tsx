import React, { useState } from "react";
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
};

// Sample projects data - you can move this to a separate data file later
const projects: Project[] = [
  {
    id: "1",
    title: "Deep Human",
    description:
      "Creating personalized AI personas that feel real enough to meaningfully interact with – exploring what makes us human through technology.",
    image: "/images/projects/deep-human.jpg",
    slug: "deep-human",
    tags: ["AI Personas", "MCP Protocol", "Python", "Multi-Agent"],
  },
  {
    id: "2",
    title: "OrgX",
    description:
      "AI-accelerated product development platform where human creativity meets AI speed – turning great ideas into great products faster.",
    image: "/images/projects/orgx.jpg",
    slug: "orgx",
    tags: ["AI Collaboration", "Project Management", "Next.js"],
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
            Featured Projects
          </h2>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{
              color: "var(--color-text)",
              fontFamily: "var(--font-body)",
              opacity: isDarkTheme ? 0.9 : 1,
            }}
          >
            Exploring the intersection of AI, education, and social impact
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
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Image Overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: isDarkTheme
                        ? "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.8) 100%)"
                        : "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.4) 100%)",
                    }}
                  />
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
