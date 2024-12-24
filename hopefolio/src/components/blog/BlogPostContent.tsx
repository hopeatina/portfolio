import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import { marked } from "marked";
import styles from "@/styles/themes/futuristic-theme.module.css";

interface BlogPostContentProps {
  content: string;
}

export default function BlogPostContent({ content }: BlogPostContentProps) {
  const { themeProps, theme } = useTheme();

  return (
    <article
      className={`prose lg:prose-xl mx-auto ${
        theme === "futuristic" ? styles.fadeIn : ""
      }`}
      style={{
        color: themeProps.colors.text,
        fontFamily: themeProps.typography.bodyFont,
        lineHeight: themeProps.typography.lineHeight,
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
      <style jsx global>{`
        .prose h2,
        .prose h3,
        .prose h4 {
          color: ${theme === "futuristic"
            ? "transparent"
            : themeProps.colors.primary};
          font-family: ${themeProps.typography.headingFont};
          font-weight: ${themeProps.typography.headingWeight};
          letter-spacing: ${themeProps.typography.letterSpacing};
          ${theme === "futuristic"
            ? `
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            background-clip: text;
            text-shadow: 0 0 10px rgba(0, 255, 102, 0.3);
            `
            : ""}
        }

        .prose a {
          color: ${themeProps.colors.accent};
          text-decoration: none;
          transition: ${themeProps.animation.transition};
          ${theme === "futuristic"
            ? `
            border-bottom: 1px solid var(--icon-border);
            padding-bottom: 2px;
            `
            : ""}
        }

        .prose a:hover {
          color: ${themeProps.colors.primary};
          ${theme === "futuristic"
            ? `
            border-bottom-color: var(--primary);
            text-shadow: 0 0 8px rgba(0, 255, 102, 0.4);
            `
            : ""}
        }

        .prose code {
          background-color: ${theme === "futuristic"
            ? "var(--card-bg)"
            : themeProps.colors.secondary};
          color: ${theme === "futuristic"
            ? "var(--primary)"
            : themeProps.colors.primary};
          padding: 0.2em 0.4em;
          border-radius: ${themeProps.borderRadius};
          ${theme === "futuristic"
            ? `
            border: 1px solid var(--icon-border);
            text-shadow: 0 0 8px rgba(0, 255, 102, 0.3);
            `
            : ""}
        }

        .prose pre {
          background-color: ${theme === "futuristic"
            ? "var(--card-bg)"
            : themeProps.colors.secondary};
          border-radius: ${themeProps.borderRadius};
          padding: 1em;
          ${theme === "futuristic"
            ? `
            border: 1px solid var(--icon-border);
            box-shadow: 0 0 20px rgba(0, 255, 102, 0.1);
            `
            : ""}
        }

        .prose blockquote {
          border-left-color: ${theme === "futuristic"
            ? "var(--primary)"
            : themeProps.colors.accent};
          color: ${themeProps.colors.text};
          font-style: italic;
          ${theme === "futuristic"
            ? `
            background: var(--icon-bg);
            padding: 1em;
            border-radius: 0 ${themeProps.borderRadius} ${themeProps.borderRadius} 0;
            `
            : ""}
        }

        .prose img {
          border-radius: ${themeProps.borderRadius};
          box-shadow: ${themeProps.boxShadow};
          ${theme === "futuristic"
            ? `
            border: 1px solid var(--icon-border);
            transition: ${themeProps.animation.transition};
            &:hover {
              transform: scale(1.02);
              box-shadow: 0 0 30px rgba(0, 255, 102, 0.2);
            }
            `
            : ""}
        }

        .prose ul li::before {
          ${theme === "futuristic"
            ? `
            color: var(--primary);
            `
            : ""}
        }

        .prose hr {
          ${theme === "futuristic"
            ? `
            border-color: var(--icon-border);
            `
            : ""}
        }
      `}</style>
    </article>
  );
}
