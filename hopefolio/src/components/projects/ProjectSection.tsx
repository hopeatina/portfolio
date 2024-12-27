import React, { ReactNode } from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import styles from "@/styles/themes/base-theme.module.css";

interface ProjectSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function ProjectSection({
  title,
  children,
  className = "",
}: ProjectSectionProps) {
  const { theme, getThemeStyles } = useTheme();
  const themeStyles = getThemeStyles();
  const isDarkTheme = theme === "futuristic";

  return (
    <section className={`relative my-16 ${className}`}>
      {/* Decorative Side Line */}
      {isDarkTheme && (
        <div
          className="absolute -left-8 top-0 bottom-0 w-px"
          style={{
            background:
              "linear-gradient(to bottom, var(--primary), transparent)",
            opacity: 0.3,
          }}
        />
      )}

      {/* Section Title */}
      <div className="relative mb-8">
        <h2
          className={`text-3xl md:text-4xl font-bold ${styles.headingH2} ${
            isDarkTheme ? styles.gradientText : ""
          }`}
          style={{
            color: isDarkTheme ? "transparent" : "var(--text)",
            fontFamily: "var(--font-heading)",
            textShadow: isDarkTheme
              ? "0 0 15px rgba(var(--primary-rgb), 0.4)"
              : "none",
            letterSpacing: "-0.02em",
            lineHeight: 1.3,
          }}
        >
          {title}
        </h2>

        {/* Decorative Title Underline */}
        <div
          className="absolute -bottom-2 left-0 h-px w-24"
          style={{
            background: isDarkTheme
              ? "linear-gradient(to right, var(--primary), transparent)"
              : "var(--accent)",
            opacity: isDarkTheme ? 0.8 : 0.6,
          }}
        />
      </div>

      {/* Content Container */}
      <div
        className="relative"
        style={{
          background: isDarkTheme
            ? "rgba(var(--card-bg-rgb), 0.3)"
            : "rgba(var(--background-rgb), 0.5)",
          borderRadius: "var(--border-radius)",
          border: isDarkTheme
            ? "1px solid rgba(var(--primary-rgb), 0.1)"
            : "none",
          padding: "2rem",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Corner Accents */}
        {isDarkTheme && (
          <>
            <div
              className="absolute top-0 left-0 w-12 h-12"
              style={{
                background:
                  "linear-gradient(135deg, rgba(var(--primary-rgb), 0.1) 0%, transparent 100%)",
                borderTopLeftRadius: "var(--border-radius)",
              }}
            />
            <div
              className="absolute top-0 right-0 w-12 h-12"
              style={{
                background:
                  "linear-gradient(-135deg, rgba(var(--primary-rgb), 0.1) 0%, transparent 100%)",
                borderTopRightRadius: "var(--border-radius)",
              }}
            />
          </>
        )}

        {/* Content */}
        <div
          className={`prose lg:prose-xl max-w-none ${
            isDarkTheme ? styles.fadeIn : ""
          }`}
          style={{
            color: isDarkTheme ? "var(--text-on-dark)" : "var(--text)",
            fontFamily: "var(--font-body)",
            lineHeight: "1.8",
          }}
        >
          {children}
        </div>

        {/* Hover Effect Overlay */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
          style={{
            background: isDarkTheme
              ? "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(var(--primary-rgb), 0.1) 0%, transparent 60%)"
              : "none",
            borderRadius: "var(--border-radius)",
            pointerEvents: "none",
          }}
        />
      </div>

      <style jsx>{`
        section:hover .hover-effect {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
