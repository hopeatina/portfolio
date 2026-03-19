"use client";

import React from "react";
import Head from "next/head";
import Link from "next/link";
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

      <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 bg-background">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <header className="mb-32">
            <div className="text-xs uppercase tracking-[0.2em] mb-6 text-body-secondary">
              Index
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-[-0.04em] text-heading" style={{ fontFamily: "var(--font-heading)" }}>
              Writing
            </h1>
            <p className="mt-8 text-xl md:text-2xl max-w-2xl text-body-secondary leading-relaxed font-light">
              {BLOG_DESCRIPTION}
            </p>
          </header>

          {/* Posts List */}
          <div className="flex flex-col border-t border-border">
            {posts.map((post, index) => (
              <article key={post.slug} className="group border-b border-border transition-colors hover:bg-[var(--surface)]">
                <Link href={`/blog/${post.slug}`} className="block py-10 md:py-16 px-4 md:px-8">
                  <div className="grid md:grid-cols-[200px_minmax(0,1fr)_120px] gap-6 md:gap-12 items-start">
                    <div className="text-sm tracking-[0.1em] text-body-secondary font-mono mt-2">
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    
                    <div>
                      <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-heading mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                        {post.title}
                      </h2>
                      <p className="text-lg text-body-secondary leading-relaxed max-w-2xl">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="hidden md:flex justify-end mt-2 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                      <span className="text-2xl text-heading">→</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-32 text-center">
            <a
              href="https://medium.com/@hopeatina"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm uppercase tracking-[0.2em] font-medium text-body-secondary hover:text-heading transition-colors"
            >
              More articles on Medium <span className="ml-2">↗</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
