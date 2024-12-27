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
      className={`prose lg:prose-xl mx-auto relative ${
        theme === "futuristic" ? styles.fadeIn : ""
      }`}
      style={{
        color: theme === "futuristic" ? "var(--text-on-dark)" : "var(--text)",
        fontFamily: "var(--font-body)",
        lineHeight: "var(--line-height-body)",
        maxWidth: "65ch",
      }}
    >
      {/* Decorative Side Line */}
      {theme === "futuristic" && (
        <div
          className="absolute -left-8 top-0 bottom-0 w-px"
          style={{
            background:
              "linear-gradient(to bottom, var(--primary), transparent)",
            opacity: 0.3,
          }}
        />
      )}

      <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
      <style jsx global>{`
        .prose {
          color: ${theme === "futuristic"
            ? "var(--text-on-dark)"
            : "var(--text)"};
        }

        .prose h2,
        .prose h3,
        .prose h4 {
          color: ${theme === "futuristic" ? "transparent" : "var(--text)"};
          font-family: var(--font-heading);
          font-weight: var(--font-weight-heading-h2);
          letter-spacing: var(--letter-spacing-heading);
          line-height: 1.3;
          margin-top: 2.5em;
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
            padding-left: 1em;
            &::before {
              content: "";
              position: absolute;
              left: 0;
              top: 50%;
              width: 0.5em;
              height: 2px;
              background: var(--primary);
              transform: translateY(-50%);
              opacity: 0.8;
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
        }

        .prose p {
          margin-bottom: 1.5em;
          color: ${theme === "futuristic"
            ? "var(--text-on-dark)"
            : "var(--text)"};
          line-height: 1.8;
          font-size: 1.125rem;
        }

        .prose a {
          color: var(--accent);
          text-decoration: none;
          transition: var(--transition-base);
          position: relative;
          ${theme === "futuristic"
            ? `
            color: var(--primary);
            padding: 0.1em 0.2em;
            margin: 0 -0.2em;
            border-radius: var(--border-radius-sm);
            background: rgba(var(--primary-rgb), 0.1);
            `
            : `
            border-bottom: 1px solid var(--accent);
            `}
        }

        .prose a:hover {
          color: var(--primary);
          ${theme === "futuristic"
            ? `
            background: rgba(var(--primary-rgb), 0.2);
            text-shadow: 0 0 8px rgba(var(--primary-rgb), 0.4);
            `
            : `
            border-bottom-color: var(--primary);
            `}
        }

        .prose code {
          background-color: ${theme === "futuristic"
            ? "rgba(var(--card-bg-rgb), 0.8)"
            : "var(--icon-bg)"};
          color: ${theme === "futuristic" ? "var(--primary)" : "var(--text)"};
          padding: 0.2em 0.4em;
          border-radius: var(--border-radius-sm);
          font-family: var(--font-mono);
          font-size: 0.875em;
          ${theme === "futuristic"
            ? `
            border: 1px solid rgba(var(--primary-rgb), 0.2);
            text-shadow: 0 0 8px rgba(var(--primary-rgb), 0.3);
            `
            : ""}
        }

        .prose pre {
          background-color: ${theme === "futuristic"
            ? "rgba(var(--card-bg-rgb), 0.8)"
            : "var(--icon-bg)"};
          border-radius: var(--border-radius);
          padding: 1.5em;
          overflow-x: auto;
          font-size: 0.875em;
          ${theme === "futuristic"
            ? `
            border: 1px solid rgba(var(--primary-rgb), 0.2);
            box-shadow: 0 0 20px rgba(var(--primary-rgb), 0.1);
            backdrop-filter: blur(4px);
            `
            : ""}
        }

        .prose pre code {
          background: none;
          border: none;
          padding: 0;
          color: inherit;
          font-size: inherit;
          text-shadow: none;
        }

        .prose blockquote {
          border-left: 4px solid
            ${theme === "futuristic" ? "var(--primary)" : "var(--accent)"};
          color: ${theme === "futuristic"
            ? "var(--text-muted-on-dark)"
            : "var(--text-muted)"};
          font-style: italic;
          margin: 2em 0;
          padding: 1em 0 1em 2em;
          position: relative;
          ${theme === "futuristic"
            ? `
            background: rgba(var(--card-bg-rgb), 0.5);
            padding: 1.5em 2em;
            border-radius: 0 var(--border-radius) var(--border-radius) 0;
            backdrop-filter: blur(4px);
            &::before {
              content: """;
              position: absolute;
              top: -0.5em;
              left: 0.5em;
              font-size: 3em;
              color: var(--primary);
              opacity: 0.2;
            }
            `
            : ""}
        }

        .prose img {
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          margin: 2em 0;
          ${theme === "futuristic"
            ? `
            border: 1px solid rgba(var(--primary-rgb), 0.2);
            transition: var(--transition-base);
            &:hover {
              transform: scale(1.02);
              box-shadow: 0 0 30px rgba(var(--primary-rgb), 0.2);
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
          padding-left: 0.5em;
          position: relative;
        }

        .prose ul li::before {
          content: "•";
          color: ${theme === "futuristic" ? "var(--primary)" : "var(--accent)"};
          display: inline-block;
          width: 1em;
          margin-left: -1em;
          opacity: ${theme === "futuristic" ? "0.8" : "1"};
        }

        .prose hr {
          border: none;
          height: 1px;
          background: ${theme === "futuristic"
            ? "linear-gradient(to right, var(--primary), transparent)"
            : "var(--accent)"};
          margin: 3em 0;
          opacity: 0.2;
        }

        .prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 2em 0;
          font-size: 0.875em;
        }

        .prose th,
        .prose td {
          padding: 0.75em;
          border: 1px solid
            ${theme === "futuristic"
              ? "rgba(var(--primary-rgb), 0.2)"
              : "var(--accent)"};
        }

        .prose th {
          background: ${theme === "futuristic"
            ? "rgba(var(--card-bg-rgb), 0.8)"
            : "var(--icon-bg)"};
          font-weight: var(--font-weight-body-medium);
          ${theme === "futuristic" ? "backdrop-filter: blur(4px);" : ""}
        }
      `}</style>
    </article>
  );
}
