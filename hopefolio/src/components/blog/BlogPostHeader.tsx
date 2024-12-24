import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

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
  const { themeProps } = useTheme();

  return (
    <header className="mb-12">
      {category && (
        <span
          className="inline-block px-3 py-1 rounded-full text-sm mb-4"
          style={{
            backgroundColor: themeProps.colors.secondary,
            color: themeProps.colors.primary,
            fontFamily: themeProps.typography.bodyFont,
          }}
        >
          {category}
        </span>
      )}

      <h1
        className="text-4xl mb-4"
        style={{
          color: themeProps.colors.primary,
          fontFamily: themeProps.typography.headingFont,
          fontWeight: themeProps.typography.headingWeight,
          letterSpacing: themeProps.typography.letterSpacing,
          background: themeProps.colors.gradients.primary,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {title}
      </h1>

      <time
        className="text-sm block mb-4"
        style={{
          color: themeProps.colors.accent,
          fontFamily: themeProps.typography.bodyFont,
        }}
      >
        {new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>

      {excerpt && (
        <p
          className="text-xl"
          style={{
            color: themeProps.colors.text,
            fontFamily: themeProps.typography.bodyFont,
            lineHeight: themeProps.typography.lineHeight,
          }}
        >
          {excerpt}
        </p>
      )}
    </header>
  );
}
