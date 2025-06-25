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
    featured: true,
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
    featured: true,
  },
  {
    title: "Deep Human",
    description:
      "Personalized AI personas for richer human connection and preparation.",
    longDescription:
      "Creating AI versions of people that feel real enough to meaningfully interact with – exploring what makes us human through technology.",
    link: "/projects/deep-human",
    image: "/images/projects/deep-human.jpg",
    tags: ["AI Personas", "MCP Protocol", "Python"],
    featured: true,
  },
  {
    title: "OrgX",
    description: "AI-accelerated product development platform for teams.",
    longDescription:
      "Where human creativity meets AI speed – helping teams turn great ideas into great products faster than ever before.",
    link: "/projects/orgx",
    image: "/images/projects/orgx.jpg",
    tags: ["Project Management", "AI Collaboration", "Next.js"],
    featured: true,
  },
  {
    title: "TaskToModel",
    description: "Convert plain-text descriptions into custom AI models.",
    longDescription:
      "Democratizing AI development by making building a specialized AI as easy as writing out your idea – no coding required.",
    link: "/projects/tasktomodel",
    image: "/images/projects/tasktomodel.jpg",
    tags: ["AI Platform", "Code Generation", "TypeScript"],
  },
  {
    title: "Transmorph",
    description: "Transform any API into an AI-driven tool with a few clicks.",
    longDescription:
      "Making the powerful capabilities of MCP-Gen accessible through a simple UI – instantly turn APIs into intelligent services.",
    link: "/projects/transmorph",
    image: "/images/projects/transmorph.jpg",
    tags: ["Developer Tools", "AI Agents", "MCP Protocol"],
  },
  {
    title: "Belief Map",
    description: "Interactive belief mapping to explore personal assumptions.",
    longDescription:
      "A visual conversation with yourself – externalize thoughts into an interactive graph to better understand and challenge your beliefs.",
    link: "/projects/belief-map",
    image: "/images/projects/belief-map.jpg",
    tags: ["Experimental", "Visualization", "Self-Reflection"],
  },
  {
    title: "Upload to Mail",
    description: "Upload documents online and send them as physical mail.",
    longDescription:
      "Bridging digital files and real mailboxes – bringing back that magical feeling when a letter arrives in the mail.",
    link: "/projects/upload-to-mail",
    image: "/images/projects/upload-to-mail.jpg",
    tags: ["Full Stack", "React", "Node.js"],
  },
];

// Separate featured from non-featured projects
const featuredProjects = projects.filter((p) => p.featured);
const otherProjects = projects.filter((p) => !p.featured);

export default function Projects() {
  const { theme } = useTheme();
  const isDarkTheme = theme === "futuristic";

  return (
    <>
      <Head>
        <title>Projects | Emerging Hope</title>
        <meta
          name="description"
          content="Featured projects exploring AI, developer tools, personal growth, and human potential"
        />
      </Head>

      <main className={`min-h-screen ${styles.heroBackground}`}>
        {/* Header Section */}
        <div className={`${styles.container} pt-24 pb-12 md:pb-16 relative`}>
          <div className="relative z-10">
            <h1
              className={`text-4xl md:text-5xl font-bold mb-4 ${styles.gradientText}`}
              style={{
                fontFamily: "var(--font-heading)",
                letterSpacing: "var(--letter-spacing-heading)",
              }}
            >
              Projects
            </h1>
            <p
              className={`text-xl md:text-2xl max-w-3xl ${styles.bodyLarge} mb-12`}
              style={{
                color: "var(--text-on-dark)",
                fontFamily: "var(--font-body)",
                lineHeight: "var(--line-height-body)",
                opacity: 0.9,
              }}
            >
              Exploring the intersection of AI, human potential, and social
              impact – from education and personal growth to developer tools and
              beyond
            </p>
          </div>

          {/* Featured Projects Section */}
          <h2
            className={`text-2xl md:text-3xl font-bold mb-8 ${styles.gradientText}`}
            style={{
              fontFamily: "var(--font-heading)",
            }}
          >
            Featured Projects
          </h2>

          {/* Featured Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-10 mb-16">
            {featuredProjects.map((project, index) => (
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
                  <h3
                    className={`text-2xl md:text-3xl font-bold mb-4 ${styles.gradientText}`}
                    style={{
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {project.title}
                  </h3>

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

          {/* More Projects Section */}
          {otherProjects.length > 0 && (
            <>
              <h2
                className={`text-2xl md:text-3xl font-bold mb-8 ${styles.gradientText}`}
                style={{
                  fontFamily: "var(--font-heading)",
                }}
              >
                More Projects
              </h2>

              {/* Other Projects Grid - 3 columns */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {otherProjects.map((project, index) => (
                  <Link
                    key={project.title}
                    href={project.link}
                    className={`${styles.fadeUp}`}
                    style={{
                      animationDelay: `${
                        (featuredProjects.length + index) * 0.1
                      }s`,
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
                      <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
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
                      <h3
                        className={`text-xl md:text-2xl font-bold mb-3 ${styles.gradientText}`}
                        style={{
                          fontFamily: "var(--font-heading)",
                        }}
                      >
                        {project.title}
                      </h3>

                      {/* Project Description */}
                      <p
                        className={styles.body}
                        style={{
                          color: isDarkTheme
                            ? "var(--text-on-dark)"
                            : "var(--text)",
                          opacity: 0.9,
                          marginBottom: "var(--element-spacing)",
                        }}
                      >
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 2).map((tag) => (
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
                        className="flex items-center transition-colors duration-300 text-sm"
                        style={{
                          color: "var(--accent)",
                        }}
                      >
                        <span className="mr-2">View Project</span>
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
            </>
          )}
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
