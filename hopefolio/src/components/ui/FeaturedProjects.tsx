import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import styles from "@/styles/themes/base-theme.module.css";
import { motion, AnimatePresence } from "framer-motion";
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

const LoadingCard = () => {
  const { theme } = useTheme();
  const bgIsDark =
    theme === "futuristic" || theme === "rice" || theme === "cameroonian";

  return (
    <div
      className="relative rounded-2xl overflow-hidden animate-pulse"
      style={{
        background: bgIsDark ? "rgba(10, 10, 10, 0.5)" : "var(--card-bg)",
        border: `1px solid ${
          bgIsDark ? "rgba(var(--primary-rgb), 0.2)" : "var(--icon-border)"
        }`,
      }}
    >
      <div className="aspect-video bg-primary/10" />
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 w-16 rounded-full bg-primary/10" />
          ))}
        </div>
        <div className="h-8 w-3/4 bg-primary/10 rounded mb-4" />
        <div className="h-4 w-full bg-primary/10 rounded mb-2" />
        <div className="h-4 w-2/3 bg-primary/10 rounded" />
      </div>
    </div>
  );
};

const FeaturedProjects = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "futuristic";
  const bgIsDark = isDarkTheme || theme === "rice" || theme === "cameroonian";
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  // Simulate loading state
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = (imageUrl: string) => {
    setLoadedImages((prev) => new Set([...prev, imageUrl]));
  };

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              styles.headingH2
            } ${bgIsDark ? styles.gradientText : ""}`}
            style={{
              color:
                theme === "rice"
                  ? "var(--text)"
                  : bgIsDark
                  ? "transparent"
                  : "var(--text)",
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
              color:
                theme === "rice"
                  ? "var(--text)"
                  : bgIsDark
                  ? "var(--text-on-dark)"
                  : "var(--text)",
              fontFamily: "var(--font-body)",
              lineHeight: "var(--line-height-body)",
              opacity: 0.9,
            }}
          >
            Exploring the intersection of AI, education, and social impact
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <>
                <LoadingCard />
                <LoadingCard />
              </>
            ) : (
              projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group relative block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-2xl"
                    aria-labelledby={`project-${project.id}-title`}
                  >
                    <div
                      className="relative rounded-2xl overflow-hidden transition-all duration-500 group-hover:transform group-hover:scale-[1.02] group-focus:scale-[1.02]"
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
                          alt={`Preview of ${project.title}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={project.id === "1"}
                          className={`object-cover transition-transform duration-500 group-hover:scale-[1.05] ${
                            loadedImages.has(project.image)
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                          onLoad={() => handleImageLoad(project.image)}
                        />
                        {/* Loading Placeholder */}
                        {!loadedImages.has(project.image) && (
                          <div className="absolute inset-0 bg-primary/10 animate-pulse" />
                        )}
                        {/* Image Overlay */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: bgIsDark
                              ? "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 100%)"
                              : "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.4) 100%)",
                          }}
                          aria-hidden="true"
                        />
                      </div>

                      {/* Project Content */}
                      <div className="p-6 relative">
                        {/* Tags */}
                        <div
                          className="flex flex-wrap gap-2 mb-4"
                          aria-label="Project technologies"
                        >
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 text-sm rounded-full"
                              style={{
                                background: bgIsDark
                                  ? "rgba(var(--primary-rgb), 0.1)"
                                  : "rgba(var(--accent-rgb), 0.1)",
                                color: bgIsDark
                                  ? "var(--primary)"
                                  : "var(--accent)",
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
                          id={`project-${project.id}-title`}
                          className={`text-2xl font-bold mb-2 ${
                            styles.headingH3
                          } ${bgIsDark ? styles.gradientText : ""}`}
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
                            color: bgIsDark
                              ? "var(--text-on-dark)"
                              : "var(--text)",
                            opacity: 0.9,
                          }}
                        >
                          {project.description}
                        </p>

                        {/* View Case Study Link */}
                        <div
                          className="mt-4 inline-flex items-center group/link"
                          style={{
                            color: bgIsDark
                              ? "var(--primary)"
                              : "var(--accent)",
                          }}
                        >
                          <span className="font-medium">View Case Study</span>
                          <FiArrowRight className="ml-2 transform transition-transform group-hover/link:translate-x-1" />
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
                            aria-hidden="true"
                          />
                          <div
                            className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                              background:
                                "linear-gradient(-45deg, var(--primary) 0%, transparent 100%)",
                              opacity: 0.2,
                            }}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
