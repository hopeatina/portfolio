"use client";

import React from "react";
import Head from "next/head";
import Link from "next/link";
import BlogPostCard from "@/components/blog/BlogPostCard";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

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
    readTime: "5 min read",
    author: "Hope Atina",
    tags: ["Engineering", "Technology", "Impact"],
  },
  {
    slug: "cultural-tech",
    title: "Bridging Cultures Through Technology",
    date: "2023-12-23",
    excerpt:
      "How my Cameroonian heritage influences my approach to software development and innovation.",
    category: "Culture",
    readTime: "7 min read",
    author: "Hope Atina",
    tags: ["Culture", "Innovation", "Technology"],
  },
  {
    slug: "ai-ethics",
    title: "AI Ethics: A Developer's Perspective",
    date: "2023-12-22",
    excerpt:
      "Reflecting on the responsibilities we have as builders of AI-powered solutions.",
    category: "AI & Ethics",
    readTime: "10 min read",
    author: "Hope Atina",
    tags: ["AI", "Ethics", "Development"],
  },
];

export default function Blog() {
  const { theme } = useTheme();
  const isDarkTheme = theme === "futuristic";

  return (
    <>
      <Head>
        <title>Blog | Hope Atina</title>
        <meta name="description" content={BLOG_DESCRIPTION} />
      </Head>

      <main
        className="min-h-screen"
        style={{ paddingTop: "var(--spacing-24)" }}
      >
        {/* Header Section */}
        <section
          className="relative py-24 md:py-32"
          style={{
            background: isDarkTheme
              ? "linear-gradient(to bottom, var(--background), var(--background-secondary))"
              : "linear-gradient(to bottom, var(--surface), var(--background))",
          }}
        >
          <div className="container mx-auto px-4 text-center">
            <h1
              className="text-5xl md:text-7xl font-bold mb-6"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--primary)",
                lineHeight: "var(--line-height-heading)",
              }}
            >
              Thoughts on Engineering, Art & Future
            </h1>

            {/* Decorative element */}
            <div
              className="w-24 h-1 mx-auto mb-8 rounded-full"
              style={{
                background: "var(--gradient-primary)",
                opacity: 0.8,
              }}
            />

            <p
              className="text-xl md:text-2xl max-w-2xl mx-auto"
              style={{
                fontFamily: "var(--font-body)",
                color: isDarkTheme
                  ? "var(--text-on-dark-secondary)"
                  : "var(--text-secondary)",
                lineHeight: "var(--line-height-body)",
              }}
            >
              {BLOG_DESCRIPTION}
            </p>
          </div>

          {/* Background pattern */}
          <div
            className="absolute inset-0 -z-10 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 0%, var(--primary) 0%, transparent 70%)`,
            }}
          />
        </section>

        {/* Posts Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 max-w-3xl mx-auto">
              {posts.map((post, index) => (
                <article
                  key={post.slug}
                  className="relative"
                  style={{
                    animation: `fadeInUp 0.6s ease-out forwards`,
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0,
                  }}
                >
                  <BlogPostCard {...post} />

                  {/* Divider between posts */}
                  {index !== posts.length - 1 && (
                    <div
                      className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-1/2 h-px"
                      style={{
                        background: "var(--border)",
                        opacity: 0.3,
                      }}
                    />
                  )}
                </article>
              ))}
            </div>

            {/* Newsletter Section */}
            <div className="mt-24 max-w-2xl mx-auto">
              <Card
                variant={isDarkTheme ? "glass" : "elevated"}
                className="text-center p-12"
              >
                <h2
                  className="text-3xl md:text-4xl font-bold mb-4"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--primary)",
                  }}
                >
                  Stay Updated
                </h2>
                <p
                  className="text-lg mb-8 max-w-xl mx-auto"
                  style={{
                    color: isDarkTheme
                      ? "var(--text-on-dark-secondary)"
                      : "var(--text-secondary)",
                    lineHeight: "var(--line-height-body)",
                  }}
                >
                  Get notified when I publish new articles about engineering,
                  creativity, and the future of technology.
                </p>

                <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg transition-all duration-200"
                    style={{
                      background: isDarkTheme
                        ? "rgba(255, 255, 255, 0.05)"
                        : "var(--background)",
                      border: "1px solid var(--border)",
                      color: "var(--text)",
                      fontFamily: "var(--font-body)",
                    }}
                  />
                  <Button variant="primary" size="lg" type="submit">
                    Subscribe
                  </Button>
                </form>
              </Card>
            </div>

            {/* View All Posts */}
            <div className="mt-16 text-center">
              <Link href="/blog/archive">
                <Button variant="secondary" size="lg">
                  View All Posts
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
