import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import styles from "@/styles/themes/base-theme.module.css";

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
    title: "Neuromosaic",
    description:
      "A revolutionary AI-powered learning platform that adapts to individual learning styles.",
    image: "/images/neuromosaic.jpg",
    slug: "neuromosaic",
    tags: ["AI", "Education", "React", "Python"],
  },
  {
    id: "2",
    title: "Brain Buffet",
    description:
      "Democratizing access to quality education through interactive learning experiences.",
    image: "/images/brain-buffet.jpg",
    slug: "brain-buffet",
    tags: ["EdTech", "Web Development", "NextJS"],
  },
];

const FeaturedProjects = () => {
  const { theme, getThemeStyles } = useTheme();
  const isDarkTheme = theme === "futuristic";
  const bgIsDark = isDarkTheme || theme === "rice" || theme === "cameroonian";

  return (
    <section
      className={`py-24 relative overflow-hidden ${styles.fadeUp}`}
      style={{
        background: bgIsDark ? "var(--background)" : "var(--surface)",
      }}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0"
        style={{
          background: "var(--overlay-pattern)",
          opacity: bgIsDark ? 0.15 : 0.1,
          mixBlendMode: "overlay",
        }}
      />

      {/* Content Container */}
      <div className={`${styles.container} relative z-10`}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              styles.headingH2
            } ${bgIsDark ? styles.gradientText : ""}`}
            style={{
              color: bgIsDark ? "transparent" : "var(--text)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "var(--letter-spacing-heading)",
              lineHeight: "var(--line-height-heading)",
            }}
          >
            Featured Projects
          </h2>
          <p
            className={`text-lg md:text-xl max-w-2xl mx-auto ${styles.bodyLarge}`}
            style={{
              color: bgIsDark ? "var(--text-on-dark)" : "var(--text)",
              fontFamily: "var(--font-body)",
              lineHeight: "var(--line-height-body)",
              opacity: 0.9,
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
              className="group relative"
            >
              <div
                className="relative rounded-2xl overflow-hidden transition-all duration-500 group-hover:transform group-hover:scale-[1.02]"
                style={{
                  background: bgIsDark
                    ? "rgba(10, 10, 10, 0.5)"
                    : "var(--card-bg)",
                  border: `1px solid ${
                    bgIsDark
                      ? "rgba(var(--primary-rgb), 0.2)"
                      : "var(--icon-border)"
                  }`,
                  boxShadow: "var(--box-shadow-card)",
                }}
              >
                {/* Project Image */}
                <div className="relative aspect-video">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                  {/* Image Overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: bgIsDark
                        ? "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 100%)"
                        : "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.4) 100%)",
                    }}
                  />
                </div>

                {/* Project Content */}
                <div className="p-6 relative">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm rounded-full"
                        style={{
                          background: bgIsDark
                            ? "rgba(var(--primary-rgb), 0.1)"
                            : "rgba(var(--accent-rgb), 0.1)",
                          color: bgIsDark ? "var(--primary)" : "var(--accent)",
                          border: `1px solid ${
                            bgIsDark ? "var(--primary)" : "var(--accent)"
                          }`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-2xl font-bold mb-2 ${styles.headingH3} ${
                      bgIsDark ? styles.gradientText : ""
                    }`}
                    style={{
                      color: bgIsDark ? "transparent" : "var(--text)",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`${styles.body}`}
                    style={{
                      color: bgIsDark ? "var(--text-on-dark)" : "var(--text)",
                      opacity: 0.9,
                    }}
                  >
                    {project.description}
                  </p>

                  {/* View Case Study Link */}
                  <div
                    className="mt-4 inline-flex items-center group/link"
                    style={{
                      color: bgIsDark ? "var(--primary)" : "var(--accent)",
                    }}
                  >
                    <span className="font-medium">View Case Study</span>
                    <span className="ml-2 transform transition-transform group-hover/link:translate-x-1">
                      →
                    </span>
                  </div>
                </div>

                {/* Corner Accents */}
                {bgIsDark && (
                  <>
                    <div
                      className="absolute top-0 left-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--primary) 0%, transparent 100%)",
                        opacity: 0.2,
                      }}
                    />
                    <div
                      className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "linear-gradient(-45deg, var(--primary) 0%, transparent 100%)",
                        opacity: 0.2,
                      }}
                    />
                  </>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
