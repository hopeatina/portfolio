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
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
          <div
            className={`${styles.container} relative z-10 text-center max-w-4xl mx-auto px-4`}
          >
            <h1
              className={`${styles.headingH1} ${styles.gradientText} mb-6 text-4xl md:text-5xl lg:text-6xl`}
              style={{
                letterSpacing: "-0.02em",
                lineHeight: "1.2",
              }}
            >
              Thoughts on Engineering, Art & Future
            </h1>

            {/* Divider */}
            <div
              className={`${styles.dividerShape} w-24 h-1 mx-auto mb-8 opacity-60`}
              style={{
                background: "var(--gradient-primary)",
              }}
            />

            <p
              className={`${styles.bodyLarge} max-w-2xl mx-auto text-lg md:text-xl leading-relaxed`}
              style={{
                color: "var(--text-on-dark)",
                opacity: 0.9,
              }}
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
              opacity: "0.1",
            }}
          />
        </section>

        {/* Posts Grid */}
        <section className="py-12 md:py-16">
          <div className={`${styles.container} px-4 sm:px-6 lg:px-8`}>
            <div className="grid gap-12 max-w-3xl mx-auto">
              {posts.map((post, index) => (
                <article
                  key={post.slug}
                  className={`${styles.fadeUp} relative`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <BlogPostCard {...post} />

                  {/* Only add divider if not last item */}
                  {index !== posts.length - 1 && (
                    <div
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-px opacity-10"
                      style={{
                        background: "var(--gradient-primary)",
                      }}
                    />
                  )}
                </article>
              ))}
            </div>

            {/* Newsletter Section */}
            <div
              className={`${styles.card} mt-20 py-12 px-6 sm:px-8 text-center max-w-2xl mx-auto rounded-2xl`}
              style={{
                background:
                  theme === "futuristic"
                    ? "rgba(0, 0, 0, 0.3)"
                    : "var(--card-bg)",
                backdropFilter: "blur(10px)",
                border: "1px solid var(--border-color)",
              }}
            >
              <h2
                className={`${styles.headingH3} mb-4 text-2xl md:text-3xl`}
                style={{
                  color:
                    theme === "futuristic"
                      ? "var(--text-on-dark)"
                      : "var(--text)",
                  letterSpacing: "-0.01em",
                }}
              >
                Stay Updated
              </h2>
              <p
                className={`${styles.body} mb-8 text-lg max-w-xl mx-auto`}
                style={{
                  color:
                    theme === "futuristic"
                      ? "var(--text-muted-on-dark)"
                      : "var(--text-muted)",
                  lineHeight: "1.6",
                }}
              >
                Get notified when I publish new articles about engineering,
                creativity, and the future of technology.
              </p>
              <button
                className={`${styles.primaryButton} ${styles.primaryButtonHover} px-8 py-3 text-lg`}
                style={{
                  fontWeight: 500,
                }}
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
