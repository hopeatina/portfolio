import React from "react";
import Link from "next/link";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import styles from "@/styles/themes/base-theme.module.css";

interface ProjectCTAProps {
  demoUrl?: string;
  githubUrl?: string;
  className?: string;
}

export default function ProjectCTA({
  demoUrl,
  githubUrl,
  className = "",
}: ProjectCTAProps) {
  const { theme, getThemeStyles } = useTheme();
  const themeStyles = getThemeStyles();
  const isDarkTheme = theme === "futuristic";

  return (
    <section className={`relative mt-16 ${className}`}>
      {/* Background Gradient */}
      <div
        className="absolute inset-0 rounded-lg -z-10"
        style={{
          background: isDarkTheme
            ? "linear-gradient(135deg, rgba(var(--primary-rgb), 0.1) 0%, transparent 100%)"
            : "linear-gradient(135deg, var(--gradient-start) 0%, transparent 100%)",
          opacity: 0.5,
        }}
      />

      {/* Content Container */}
      <div
        className="relative p-8 md:p-12 rounded-lg"
        style={{
          background: isDarkTheme
            ? "rgba(var(--card-bg-rgb), 0.3)"
            : "rgba(var(--background-rgb), 0.5)",
          border: isDarkTheme
            ? "1px solid rgba(var(--primary-rgb), 0.2)"
            : "none",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Corner Accents */}
        {isDarkTheme && (
          <>
            <div
              className="absolute top-0 left-0 w-16 h-16"
              style={{
                background:
                  "linear-gradient(135deg, rgba(var(--primary-rgb), 0.2) 0%, transparent 100%)",
                borderTopLeftRadius: "var(--border-radius-lg)",
              }}
            />
            <div
              className="absolute top-0 right-0 w-16 h-16"
              style={{
                background:
                  "linear-gradient(-135deg, rgba(var(--primary-rgb), 0.2) 0%, transparent 100%)",
                borderTopRightRadius: "var(--border-radius-lg)",
              }}
            />
          </>
        )}

        {/* Title */}
        <h2
          className={`text-2xl md:text-3xl font-bold mb-6 ${styles.headingH2} ${
            isDarkTheme ? styles.gradientText : ""
          }`}
          style={{
            color: isDarkTheme ? "transparent" : "var(--text)",
            fontFamily: "var(--font-heading)",
            textShadow: isDarkTheme
              ? "0 0 15px rgba(var(--primary-rgb), 0.4)"
              : "none",
          }}
        >
          Experience It Yourself
        </h2>

        {/* Buttons Container */}
        <div className="flex flex-wrap gap-4">
          {demoUrl && (
            <Link
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative inline-flex items-center px-6 py-3 rounded-lg transition-all duration-300 ${
                isDarkTheme ? "hover:scale-105" : "hover:translate-y-[-2px]"
              }`}
              style={{
                background: isDarkTheme
                  ? "rgba(var(--primary-rgb), 0.1)"
                  : "var(--accent)",
                border: isDarkTheme
                  ? "1px solid rgba(var(--primary-rgb), 0.3)"
                  : "none",
                color: isDarkTheme ? "var(--primary)" : "var(--text-on-accent)",
                boxShadow: isDarkTheme
                  ? "0 0 20px rgba(var(--primary-rgb), 0.2)"
                  : "var(--box-shadow)",
              }}
            >
              <span className="relative z-10">View Live Demo</span>
              {isDarkTheme && (
                <div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(var(--primary-rgb), 0.2) 0%, transparent 100%)",
                  }}
                />
              )}
            </Link>
          )}

          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative inline-flex items-center px-6 py-3 rounded-lg transition-all duration-300 ${
                isDarkTheme ? "hover:scale-105" : "hover:translate-y-[-2px]"
              }`}
              style={{
                background: "transparent",
                border: `1px solid ${
                  isDarkTheme
                    ? "rgba(var(--primary-rgb), 0.3)"
                    : "var(--accent)"
                }`,
                color: isDarkTheme ? "var(--text-on-dark)" : "var(--text)",
              }}
            >
              <span className="relative z-10">View Source Code</span>
              {isDarkTheme && (
                <div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(var(--primary-rgb), 0.1) 0%, transparent 100%)",
                  }}
                />
              )}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
