import React from "react";
import Link from "next/link";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import Card from "@/components/ui/Card";
import styles from "@/styles/themes/futuristic-theme.module.css";

interface BlogPostCardProps {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category?: string;
}

export default function BlogPostCard({
  slug,
  title,
  date,
  excerpt,
  category,
}: BlogPostCardProps) {
  const { themeProps, theme } = useTheme();

  return (
    <Link href={`/blog/${slug}`}>
      <Card
        className={`group cursor-pointer ${
          theme === "futuristic" ? styles.card : ""
        } ${theme === "futuristic" ? styles.cardHover : "hover-card"}`}
      >
        {category && (
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm mb-4 ${
              theme === "futuristic" ? styles.tag : ""
            }`}
            style={{
              backgroundColor:
                theme === "futuristic"
                  ? "var(--icon-bg)"
                  : themeProps.colors.secondary,
              color: themeProps.colors.primary,
              fontFamily: themeProps.typography.bodyFont,
              border:
                theme === "futuristic"
                  ? "1px solid var(--icon-border)"
                  : "none",
            }}
          >
            {category}
          </span>
        )}

        <h2
          className={`text-2xl mb-2 ${
            theme === "futuristic" ? styles.gradientText : ""
          }`}
          style={{
            color:
              theme === "futuristic"
                ? "transparent"
                : themeProps.colors.primary,
            fontFamily: themeProps.typography.headingFont,
            fontWeight: themeProps.typography.headingWeight,
            letterSpacing: themeProps.typography.letterSpacing,
          }}
        >
          {title}
        </h2>

        <time
          className="text-sm block mb-4"
          style={{
            color: themeProps.colors.accent,
            fontFamily: themeProps.typography.bodyFont,
            opacity: theme === "futuristic" ? 0.85 : 1,
          }}
        >
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>

        <p
          className={theme === "futuristic" ? styles.body : ""}
          style={{
            color: themeProps.colors.text,
            fontFamily: themeProps.typography.bodyFont,
            lineHeight: themeProps.typography.lineHeight,
            opacity: theme === "futuristic" ? 0.85 : 1,
          }}
        >
          {excerpt}
        </p>

        {theme === "futuristic" && (
          <div className="mt-4">
            <span className={`${styles.tag} ${styles.tagHover}`}>
              Read More →
            </span>
          </div>
        )}
      </Card>
      <style jsx global>{`
        .hover-card {
          transition: ${themeProps.animation.transition};
        }
        .hover-card:hover {
          transform: ${themeProps.animation.hoverScale};
          box-shadow: ${themeProps.boxShadow};
        }
      `}</style>
    </Link>
  );
}
