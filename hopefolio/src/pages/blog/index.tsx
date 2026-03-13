"use client";

import React from "react";
import Head from "next/head";
import BlogPostCard from "@/components/blog/BlogPostCard";
import { isThemeDark, useTheme } from "@/modules/mode-switch/ThemeContext";

const BLOG_DESCRIPTION = "Technical writing on agent orchestration, MCP protocol, and production AI infrastructure";

// This would typically come from your CMS or data source
const posts = [
  {
    slug: "building-multi-agent-orchestration",
    title: "Building a Multi-Agent Orchestration Platform: Lessons from OrgX",
    date: "2025-02-15",
    excerpt:
      "Durable workflows, trust-based governance, quality gates, and agent spawning — what I learned building a 7-repo multi-agent orchestration platform.",
    category: "Agent Infrastructure",
    readTime: "12 min read",
    author: "Hope Atina",
    tags: ["Multi-Agent", "Orchestration", "MCP Protocol"],
  },
  {
    slug: "mcp-in-production",
    title: "Taking MCP to Production: How OrgX Uses the Model Context Protocol",
    date: "2025-01-28",
    excerpt:
      "A deep-dive into MCP protocol, building MCP server integrations, tool-calling middleware patterns, and reducing agent friction in production.",
    category: "MCP Protocol",
    readTime: "10 min read",
    author: "Hope Atina",
    tags: ["MCP", "Tool Calling", "Production"],
  },
  {
    slug: "building-dev-tools-in-rust",
    title: "Building a Homebrew-Installable Dev Tool in Rust: The PerfPulse Story",
    date: "2025-01-10",
    excerpt:
      "Why Rust for CLI tools, cross-platform M1/Intel builds, Homebrew tap distribution, and integrating Claude API for AI-powered recommendations.",
    category: "Developer Tooling",
    readTime: "10 min read",
    author: "Hope Atina",
    tags: ["Rust", "CLI", "Homebrew", "Developer Tools"],
  },
];

export default function Blog() {
  const { theme } = useTheme();
  const isDarkTheme = isThemeDark(theme);

  return (
    <>
      <Head>
        <title>Blog | Hope Atina - AI Agent Infrastructure</title>
        <meta name="description" content={BLOG_DESCRIPTION} />
      </Head>

      <main
        className="min-h-screen"
        style={{ paddingTop: "var(--spacing-24)" }}
      >
        {/* Header Section */}
        <section
          className="relative py-20 md:py-28"
          style={{
            background: isDarkTheme
              ? "linear-gradient(180deg, rgba(var(--background-rgb), 1) 0%, rgba(var(--color-surface-rgb), 0.94) 100%)"
              : "linear-gradient(180deg, rgba(var(--color-surface-rgb), 0.7) 0%, rgba(var(--background-rgb), 1) 100%)",
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
              Technical Writing
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
            <div className="grid max-w-3xl gap-10 mx-auto md:gap-12">
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

            {/* More writing CTA */}
            <div className="mt-24 max-w-2xl mx-auto text-center">
              <p
                className="text-lg"
                style={{
                  color: isDarkTheme
                    ? "var(--text-on-dark-secondary)"
                    : "var(--text-secondary)",
                  lineHeight: "var(--line-height-body)",
                }}
              >
                More articles on{" "}
                <a
                  href="https://medium.com/@hopeatina"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--primary)" }}
                >
                  Medium
                </a>
              </p>
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
