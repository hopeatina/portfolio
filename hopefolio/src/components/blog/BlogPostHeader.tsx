"use client";

import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import Tag from "@/components/ui/Tag";
import styles from "@/styles/themes/base-theme.module.css";

interface BlogPostHeaderProps {
  title: string;
  date: string;
  category?: string;
  excerpt?: string;
}

export default function BlogPostHeader({
  title,
  date,
  category,
  excerpt,
}: BlogPostHeaderProps) {
  const { theme, getThemeStyles } = useTheme();
  const themeStyles = getThemeStyles();

  return (
    <header className="relative mb-16">
      {/* Decorative Elements */}
      <div
        className="absolute -left-8 top-0 w-2 h-32 rounded-full"
        style={{
          background: "var(--gradient-primary)",
          opacity: theme === "futuristic" ? 0.8 : 0.6,
        }}
      />

      {category && (
        <div className="mb-6 relative">
          <Tag
            variant="outline"
            size="md"
            style={{
              background:
                theme === "futuristic"
                  ? "rgba(var(--primary-rgb), 0.1)"
                  : "rgba(var(--accent-rgb), 0.1)",
              borderColor: "var(--primary)",
              color:
                theme === "futuristic" ? "var(--primary)" : "var(--accent)",
              backdropFilter: "blur(4px)",
              boxShadow:
                theme === "futuristic"
                  ? "0 0 20px rgba(var(--primary-rgb), 0.2)"
                  : "none",
              transition: "all 0.3s ease",
            }}
            className="hover:scale-105"
          >
            {category}
          </Tag>
        </div>
      )}

      <h1
        className={`text-5xl md:text-6xl font-bold mb-6 ${styles.headingH1} ${
          theme === "futuristic" ? styles.gradientText : ""
        }`}
        style={{
          color: theme === "futuristic" ? "transparent" : "var(--text)",
          fontFamily: "var(--font-heading)",
          textShadow:
            theme === "futuristic"
              ? "0 0 20px rgba(var(--primary-rgb), 0.4)"
              : "none",
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
        }}
      >
        {title}
      </h1>

      <div className="flex items-center mb-8">
        <time
          className={`text-sm ${styles.bodyLarge}`}
          style={{
            color:
              theme === "futuristic"
                ? "var(--text-muted-on-dark)"
                : "var(--text-muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <span
          className="mx-3"
          style={{
            color: theme === "futuristic" ? "var(--primary)" : "var(--accent)",
            opacity: 0.5,
          }}
        >
          •
        </span>
        <span
          style={{
            color:
              theme === "futuristic"
                ? "var(--text-muted-on-dark)"
                : "var(--text-muted)",
          }}
        >
          5 min read
        </span>
      </div>

      {excerpt && (
        <div className="relative">
          <p
            className={`text-xl md:text-2xl ${styles.bodyLarge}`}
            style={{
              color:
                theme === "futuristic" ? "var(--text-on-dark)" : "var(--text)",
              fontFamily: "var(--font-body)",
              lineHeight: "1.6",
              maxWidth: "65ch",
              opacity: 0.9,
            }}
          >
            {excerpt}
          </p>
          {theme === "futuristic" && (
            <div
              className="absolute -left-4 -right-4 top-1/2 h-px"
              style={{
                background:
                  "linear-gradient(to right, var(--primary), transparent)",
                opacity: 0.2,
                transform: "translateY(-50%)",
              }}
            />
          )}
        </div>
      )}
    </header>
  );
}
