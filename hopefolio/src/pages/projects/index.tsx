import React from "react";
import Head from "next/head";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import styles from "@/styles/themes/base-theme.module.css";

const projects = [
  {
    title: "Neuromosaic",
    description:
      "Distributed ML research platform focused on scalable neural network training.",
    longDescription:
      "Building the future of machine learning infrastructure with scalable, efficient, and accessible tools for researchers and developers.",
    link: "/projects/neuromosaic",
    image: "/images/projects/neuromosaic.jpg",
    tags: ["Machine Learning", "Distributed Systems", "Python"],
  },
  {
    title: "Brain Buffet",
    description:
      "LLM-powered course creation platform for personalized learning experiences.",
    longDescription:
      "Revolutionizing education with AI-driven personalization, making learning more engaging, effective, and accessible for everyone.",
    link: "/projects/brain-buffet",
    image: "/images/projects/brain-buffet.jpg",
    tags: ["AI", "Education", "Next.js"],
  },
];

export default function Projects() {
  const { theme } = useTheme();
  const isDarkTheme = theme === "futuristic";

  return (
    <>
      <Head>
        <title>Projects | Emerging Hope</title>
        <meta
          name="description"
          content="Featured projects including Neuromosaic and Brain Buffet"
        />
      </Head>

      <main className={`min-h-screen ${styles.heroBackground}`}>
        {/* Header Section */}
        <div className={`${styles.container} py-12 md:py-16 relative`}>
          <div className="relative z-10">
            <h1
              className={`text-4xl md:text-5xl font-bold mb-4 ${styles.gradientText}`}
              style={{
                fontFamily: "var(--font-heading)",
                letterSpacing: "var(--letter-spacing-heading)",
              }}
            >
              Featured Projects
            </h1>
            <p
              className={`text-xl md:text-2xl max-w-2xl ${styles.bodyLarge} mb-12`}
              style={{
                color: "var(--text-on-dark)",
                fontFamily: "var(--font-body)",
                lineHeight: "var(--line-height-body)",
                opacity: 0.9,
              }}
            >
              Exploring the intersection of AI, education, and social impact
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            {projects.map((project, index) => (
              <Link
                key={project.title}
                href={project.link}
                className={`${styles.fadeUp}`}
                style={{
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                <Card
                  className="group h-full transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: isDarkTheme
                      ? "var(--card-bg)"
                      : "var(--background)",
                    boxShadow: "var(--box-shadow-card)",
                    border: "1px solid var(--icon-border)",
                  }}
                >
                  {/* Project Image */}
                  <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300
                               group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>

                  {/* Project Title */}
                  <h2
                    className={`text-2xl md:text-3xl font-bold mb-4 ${styles.gradientText}`}
                    style={{
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {project.title}
                  </h2>

                  {/* Project Description */}
                  <p
                    className={styles.bodyLarge}
                    style={{
                      color: isDarkTheme
                        ? "var(--text-on-dark)"
                        : "var(--text)",
                      opacity: 0.9,
                      marginBottom: "var(--element-spacing)",
                    }}
                  >
                    {project.longDescription}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <Tag
                        key={tag}
                        variant={isDarkTheme ? "outline" : "default"}
                        size="sm"
                        style={{
                          color: isDarkTheme
                            ? "var(--primary)"
                            : "var(--accent)",
                          borderColor: isDarkTheme
                            ? "var(--icon-border)"
                            : "transparent",
                        }}
                      >
                        {tag}
                      </Tag>
                    ))}
                  </div>

                  {/* Learn More Link */}
                  <div
                    className="flex items-center transition-colors duration-300"
                    style={{
                      color: "var(--accent)",
                    }}
                  >
                    <span className="mr-2">Learn More</span>
                    <span
                      className="transform transition-transform duration-300
                                   group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Background Pattern */}
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            background: "var(--cosmic-swirl), var(--starry-pattern)",
            backgroundBlendMode: "overlay",
          }}
        />
      </main>
    </>
  );
}
