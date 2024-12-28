"use client";

import React from "react";
import BlogLayout from "@/components/blog/BlogLayout";
import BlogPostCard from "@/components/blog/BlogPostCard";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import styles from "@/styles/themes/base-theme.module.css";

const BLOG_DESCRIPTION = "Thoughts on technology, culture, and innovation";

// This would typically come from your CMS or data source
const posts = [
  {
    slug: "hello-world",
    title: "Hello World: Building with Purpose",
    date: "2023-12-24",
    excerpt:
      "Exploring the intersection of technology, creativity, and social impact through code.",
    category: "Engineering",
  },
  {
    slug: "cultural-tech",
    title: "Bridging Cultures Through Technology",
    date: "2023-12-23",
    excerpt:
      "How my Cameroonian heritage influences my approach to software development and innovation.",
    category: "Culture",
  },
  {
    slug: "ai-ethics",
    title: "AI Ethics: A Developer's Perspective",
    date: "2023-12-22",
    excerpt:
      "Reflecting on the responsibilities we have as builders of AI-powered solutions.",
    category: "AI & Ethics",
  },
];

export default function Blog() {
  const { theme, getThemeStyles } = useTheme();
  const themeStyles = getThemeStyles();

  return (
    <BlogLayout title="Blog" description={BLOG_DESCRIPTION}>
      <main className={`${styles.backgroundPattern} min-h-screen bg-opacity-2`}>
        {/* Header Section */}
        <section className="relative pt-24 pb-12 md:pb-16">
          <div className={`${styles.container} relative z-10 text-center`}>
            <h1 className={`${styles.headingH1} ${styles.gradientText} mb-4`}>
              Blog
            </h1>

            {/* Divider */}
            <div
              className={`${styles.dividerShape} w-16 h-0.5 mx-auto mb-4 opacity-60`}
            />

            <p
              className={`${styles.bodyLarge} max-w-2xl mx-auto`}
              style={{ color: "var(--text-on-dark)" }}
            >
              {BLOG_DESCRIPTION}
            </p>
          </div>

          {/* Background Pattern */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background: "var(--cosmic-swirl)",
              backgroundBlendMode: "overlay",
              opacity: "0.05",
            }}
          />
        </section>

        {/* Posts Grid */}
        <section className="py-6 md:py-8">
          <div className={`${styles.container} px-4 sm:px-6`}>
            <div className="grid gap-6 max-w-3xl mx-auto">
              {posts.map((post, index) => (
                <article
                  key={post.slug}
                  className={`${styles.fadeUp}`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <BlogPostCard {...post} />

                  {/* Only add divider if not last item */}
                  {index !== posts.length - 1 && (
                    <div
                      className={`${styles.dividerShape} h-px mt-6 opacity-20`}
                    />
                  )}
                </article>
              ))}
            </div>

            {/* Newsletter Section */}
            <div
              className={`${styles.card} mt-10 py-6 px-4 sm:px-6 text-center max-w-2xl mx-auto`}
            >
              <h2
                className={`${styles.headingH3} mb-3`}
                style={{
                  color:
                    theme === "futuristic"
                      ? "var(--text-on-dark)"
                      : "var(--text)",
                }}
              >
                Stay Updated
              </h2>
              <p
                className={`${styles.body} mb-4`}
                style={{
                  color:
                    theme === "futuristic"
                      ? "var(--text-muted-on-dark)"
                      : "var(--text-muted)",
                }}
              >
                Get notified when I publish new articles and insights
              </p>
              <button
                className={`${styles.primaryButton} ${styles.primaryButtonHover}`}
              >
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </section>
      </main>
    </BlogLayout>
  );
}
