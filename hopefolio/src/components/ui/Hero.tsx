import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import { BiBrain } from "react-icons/bi";
import { FaGraduationCap } from "react-icons/fa";

interface ProjectHighlight {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const projectHighlights: ProjectHighlight[] = [
  {
    title: "AI Research",
    description: "Exploring the frontiers of artificial intelligence",
    icon: <BiBrain size={24} />,
  },
  {
    title: "Education",
    description: "Building tools for better learning experiences",
    icon: <FaGraduationCap size={24} />,
  },
];

export default function Hero() {
  const { theme, getThemeStyles } = useTheme();
  const styles = getThemeStyles();

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1
            className={`text-4xl md:text-6xl mb-6 ${styles.headingH1} ${styles.gradientText}`}
          >
            Building, Creating, and Rethinking Possibility
          </h1>

          {/* Subtitle */}
          <h2
            className={`text-xl md:text-2xl mb-8 ${styles.headingH2}`}
            style={{
              color: "var(--text)",
              opacity: theme === "futuristic" ? 0.85 : 0.9,
            }}
          >
            Engineer, Artist, and Futurist—transforming ideas into reality
          </h2>

          {/* Tagline */}
          <p
            className={`text-lg md:text-xl mb-12 ${styles.body}`}
            style={{
              color: "var(--text)",
              opacity: theme === "futuristic" ? 0.85 : 0.9,
            }}
          >
            No one can beat you at being you
          </p>

          {/* Project Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {projectHighlights.map((project, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg ${styles.card} group`}
              >
                <div className="flex items-center justify-center mb-4">
                  <span
                    className={`${styles.icon} transition-transform group-hover:scale-110`}
                    style={{
                      color: "var(--text)",
                      opacity: theme === "futuristic" ? 0.85 : 0.9,
                    }}
                  >
                    {project.icon}
                  </span>
                </div>
                <h3
                  className={`text-xl mb-2 ${styles.headingH3} ${styles.gradientText}`}
                >
                  {project.title}
                </h3>
                <p
                  className={styles.body}
                  style={{
                    color: "var(--text)",
                    opacity: theme === "futuristic" ? 0.85 : 0.9,
                  }}
                >
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
