import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import { marked } from "marked";
import styles from "@/styles/themes/base-theme.module.css";

interface BlogPostContentProps {
  content: string;
}

export default function BlogPostContent({ content }: BlogPostContentProps) {
  const { theme, getThemeStyles } = useTheme();
  const themeStyles = getThemeStyles();

  return (
    <article
      className={`prose lg:prose-xl mx-auto relative px-4 sm:px-6 lg:px-8 ${
        theme === "futuristic" ? styles.fadeIn : ""
      }`}
      style={{
        color: theme === "futuristic" ? "var(--text-on-dark)" : "var(--text)",
        fontFamily: "var(--font-body)",
        lineHeight: "var(--line-height-body)",
        maxWidth: "65ch",
      }}
    >
      {/* Decorative Side Lines */}
      {theme === "futuristic" && (
        <>
          <div
            className="absolute -left-8 top-0 bottom-0 w-px"
            style={{
              background:
                "linear-gradient(to bottom, var(--primary), transparent)",
              opacity: 0.3,
            }}
          />
          <div
            className="absolute -right-8 top-0 bottom-0 w-px"
            style={{
              background:
                "linear-gradient(to bottom, var(--primary), transparent)",
              opacity: 0.15,
            }}
          />
        </>
      )}

      <div
        className="relative"
        dangerouslySetInnerHTML={{ __html: marked(content) }}
      />

      <style jsx global>{`
        .prose {
          color: ${theme === "futuristic"
            ? "var(--text-on-dark)"
            : "var(--text)"};
        }

        .prose > * + * {
          margin-top: 1.5em;
        }

        .prose h2,
        .prose h3,
        .prose h4 {
          color: ${theme === "futuristic" ? "transparent" : "var(--text)"};
          font-family: var(--font-heading);
          font-weight: var(--font-weight-heading-h2);
          letter-spacing: var(--letter-spacing-heading);
          line-height: 1.3;
          margin-top: 3em;
          margin-bottom: 1em;
          position: relative;
          ${theme === "futuristic"
            ? `
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            background-clip: text;
            text-shadow: 0 0 15px rgba(var(--primary-rgb), 0.4);
            `
            : ""}
        }

        .prose h2 {
          font-size: 2.25em;
          ${theme === "futuristic"
            ? `
            padding-left: 1.5em;
            &::before {
              content: "";
              position: absolute;
              left: 0;
              top: 50%;
              width: 1em;
              height: 2px;
              background: var(--gradient-primary);
              transform: translateY(-50%);
              opacity: 0.8;
              box-shadow: 0 0 10px rgba(var(--primary-rgb), 0.3);
            }
            `
            : ""}
        }

        .prose h3 {
          font-size: 1.75em;
          color: ${theme === "futuristic"
            ? "var(--text-on-dark)"
            : "var(--text)"};
          opacity: 0.9;
          margin-top: 2.5em;
        }

        .prose h4 {
          font-size: 1.5em;
          margin-top: 2em;
        }

        .prose p {
          margin-bottom: 1.5em;
          color: ${theme === "futuristic"
            ? "var(--text-on-dark)"
            : "var(--text)"};
          line-height: 1.8;
          font-size: 1.125rem;
          max-width: 65ch;
        }

        .prose a {
          color: var(--accent);
          text-decoration: none;
          transition: var(--transition-base);
          position: relative;
          padding-bottom: 2px;
          border-bottom: 1px solid transparent;

          &:hover {
            color: var(--primary);
            border-bottom-color: var(--primary);
          }

          ${theme === "futuristic"
            ? `
            &::after {
              content: "";
              position: absolute;
              bottom: -2px;
              left: 0;
              width: 100%;
              height: 1px;
              background: var(--gradient-primary);
              transform: scaleX(0);
              transform-origin: right;
              transition: transform 0.3s ease;
            }

            &:hover::after {
              transform: scaleX(1);
              transform-origin: left;
            }
            `
            : ""}
        }

        .prose ul,
        .prose ol {
          margin: 1.5em 0;
          padding-left: 1.5em;
        }

        .prose li {
          margin: 0.5em 0;
          position: relative;
          ${theme === "futuristic"
            ? `
            &::before {
              content: "•";
              color: var(--primary);
              position: absolute;
              left: -1em;
              opacity: 0.8;
            }
            `
            : ""}
        }

        .prose blockquote {
          margin: 2em 0;
          padding: 1em 1.5em;
          border-left: 4px solid var(--primary);
          background: ${theme === "futuristic"
            ? "rgba(var(--primary-rgb), 0.1)"
            : "rgba(var(--accent-rgb), 0.1)"};
          border-radius: 0.5em;
          font-style: italic;

          p {
            margin: 0;
            opacity: 0.9;
          }
        }

        .prose code {
          background: ${theme === "futuristic"
            ? "rgba(var(--primary-rgb), 0.1)"
            : "rgba(var(--accent-rgb), 0.1)"};
          padding: 0.2em 0.4em;
          border-radius: 0.3em;
          font-size: 0.9em;
          font-family: var(--font-mono);
          color: var(--primary);
        }

        .prose pre {
          margin: 2em 0;
          padding: 1.5em;
          background: ${theme === "futuristic"
            ? "rgba(0, 0, 0, 0.5)"
            : "var(--code-bg)"};
          border-radius: 0.5em;
          overflow-x: auto;
          border: 1px solid var(--border-color);

          code {
            background: none;
            padding: 0;
            font-size: 0.9em;
            color: ${theme === "futuristic"
              ? "var(--text-on-dark)"
              : "var(--text)"};
          }
        }

        .prose img {
          margin: 2em 0;
          border-radius: 0.5em;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          ${theme === "futuristic"
            ? `
            border: 1px solid rgba(var(--primary-rgb), 0.2);
            `
            : ""}
        }

        .prose hr {
          margin: 3em 0;
          border: none;
          height: 1px;
          background: ${theme === "futuristic"
            ? "var(--gradient-primary)"
            : "var(--border-color)"};
          opacity: 0.3;
        }
      `}</style>
    </article>
  );
}
