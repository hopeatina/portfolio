import Head from "next/head";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { GetStaticProps } from "next";
import { getAllPosts } from "@/modules/blog/posts";
import { ContinuityPlayhead } from "@/components/v4/V4Primitives";

const CATEGORY_GROUPS = [
  {
    id: "all",
    label: "All",
    matches: (_category: string) => true,
  },
  {
    id: "receipts",
    label: "Daily receipts",
    matches: (category: string) => /receipt/i.test(category),
  },
  {
    id: "mcp-infra",
    label: "MCP & Infrastructure",
    matches: (category: string) =>
      /MCP|Infrastructure|Agent Infrastructure/i.test(category),
  },
  {
    id: "evals-trust",
    label: "Evals & Trust",
    matches: (category: string) => /Evals|Governance|Trust/i.test(category),
  },
  {
    id: "essays",
    label: "Essays",
    matches: (category: string) => /Essay/i.test(category),
  },
  {
    id: "tooling",
    label: "Developer tooling",
    matches: (category: string) => /Developer|Tooling|Tools/i.test(category),
  },
] as const;

type GroupId = (typeof CATEGORY_GROUPS)[number]["id"];

interface BlogIndexProps {
  posts: Array<{
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    category: string;
    readTime: string;
    tags: string[];
    type: "essay" | "receipt";
    receipt: { score: string[] } | null;
  }>;
}

interface OrgXEssay {
  title: string;
  summary: string;
  url: string;
  focus: string;
}

const orgxEssays: OrgXEssay[] = [
  {
    title: "Memory is the structural lift — Phase 2 substrate benchmark",
    summary:
      "136 tasks across multiple models and orchestration cells. Single-shot benchmarks structurally hide what agents cannot fake: cascading context.",
    url: "https://useorgx.com/blog/phase-2-substrate-matrix-memory-lift",
    focus: "Benchmarks · substrate",
  },
  {
    title: "You are the API between your AI tools. OrgX MCP fixes that.",
    summary:
      "Manual context-carrying between ChatGPT, Claude, and Cursor is the leak. MCP is the continuity layer for unified organizational context.",
    url: "https://useorgx.com/blog/orgx-mcp-launch",
    focus: "MCP · memory",
  },
  {
    title: "How we prove OrgX works",
    summary:
      "Weekly benchmarking: 12 tasks, 7 domains, 3 execution modes against a single-agent baseline and a human baseline — with full provenance.",
    url: "https://useorgx.com/blog/orgx-autonomous-initiative-benchmark-methodology",
    focus: "Evals · methodology",
  },
  {
    title: "Our autonomous benchmark has independent judges now",
    summary:
      "Published artifacts, independent judgments, token-level costs, and failure cases requiring human review.",
    url: "https://useorgx.com/blog/autonomous-benchmark-first-judged-run",
    focus: "Trust · credibility",
  },
  {
    title: "The most underrated product surface in AI is the setup script",
    summary:
      "Initial configuration determines whether AI tools share organizational context or operate in isolation. OrgX Wizard as infrastructure.",
    url: "https://useorgx.com/blog/ai-setup-script-as-product-surface",
    focus: "Infrastructure · onboarding",
  },
  {
    title: "The OrgX way",
    summary:
      "Distributed AI tool usage is a coordination failure. The founder is the integration layer that should be code, not willpower.",
    url: "https://useorgx.com/blog/orgx-way-manifesto",
    focus: "Systems thinking",
  },
  {
    title: "Why AI-generated brand content is mostly slop",
    summary:
      "It is not prompting — it is systemic design. A model asked to carry taste, memory, and QA by itself will fail predictably.",
    url: "https://useorgx.com/blog/ai-content-that-knows-your-brand",
    focus: "Systems thinking · trust",
  },
  {
    title: "We generated 75 ad concepts. The useful part was killing 60.",
    summary:
      "Filtering and curation are higher-leverage than volume in AI generation. Rigor in selection matters more than throughput.",
    url: "https://useorgx.com/blog/seventy-five-ad-concepts-one-afternoon",
    focus: "Evals · craft",
  },
];

export default function BlogIndex({ posts }: BlogIndexProps) {
  const [featured, ...rest] = posts;
  const [activeGroup, setActiveGroup] = useState<GroupId>("all");
  // "All" keeps the featured card + the rest; a specific filter searches EVERY post,
  // featured included, so the receipts tab can never hide the only receipt.
  const showFeatured = activeGroup === "all";
  const filteredRest = useMemo(() => {
    const group = CATEGORY_GROUPS.find((g) => g.id === activeGroup) ?? CATEGORY_GROUPS[0];
    return activeGroup === "all"
      ? rest.filter((p) => group.matches(p.category))
      : posts.filter((p) => group.matches(p.category));
  }, [posts, rest, activeGroup]);

  return (
    <>
      <Head>
        <title>Writing | Hope Atina</title>
        <meta
          name="description"
          content="Technical writing on agent orchestration, MCP protocol, and production AI systems."
        />
      </Head>

      <main id="main-content" className="v4-page material-writing-page">
        <ContinuityPlayhead label="writing" />
        <div className="page-stack">
          <header className="page-header-stack material-writing-hero">
            <span className="eyebrow">Writing / the living ledger</span>
            <h1>What breaks when you put agents in production.</h1>
            <p className="material-writing-deck">
              Essays on memory, MCP, trust scoring, decision provenance, and
              why single-shot benchmarks hide what matters — plus the daily
              autonomy receipts as they land.
            </p>
            {(() => {
              const receipts = posts.filter((p) => p.type === "receipt");
              if (receipts.length === 0) return null;
              const latest = receipts[0];
              return (
                <p className="blog-live-strip" aria-label="Ledger status">
                  <i aria-hidden="true" />
                  <span>
                    Live · {receipts.length} daily receipt{receipts.length === 1 ? "" : "s"} on
                    record · latest{" "}
                    {new Date(`${latest.date}T12:00:00`).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <Link href="/proof" className="site-link-inline">
                    flagship ledger →
                  </Link>
                </p>
              );
            })()}
          </header>

          {featured && showFeatured ? (
            <article className="blog-featured">
              <span className="eyebrow">
                {featured.category}
                {featured.type === "receipt" && featured.receipt ? (
                  <em className="blog-receipt-chip">{featured.receipt.score.length}/6 proof</em>
                ) : null}
              </span>
              <h2>{featured.title}</h2>
              <p className="material-writing-excerpt">
                {featured.excerpt}
              </p>
              <div className="proof-bar">
                <span>{new Date(featured.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                <span>{featured.readTime}</span>
                {featured.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <p className="material-writing-read">
                <Link href={`/blog/${featured.slug}`} className="site-link-inline">
                  Read featured post →
                </Link>
              </p>
            </article>
          ) : null}

          <section className="page-content material-writing-section">
            <div
              role="group"
              aria-label="Blog category filter"
              className="material-writing-filters"
            >
              {CATEGORY_GROUPS.map((g) => {
                const isActive = g.id === activeGroup;
                const count =
                  g.id === "all"
                    ? posts.length
                    : posts.filter((p) => g.matches(p.category)).length;
                if (g.id !== "all" && count === 0) return null;
                return (
                  <button
                    key={g.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveGroup(g.id)}
                  >
                    {g.label} <span>{count}</span>
                  </button>
                );
              })}
            </div>
            <p className="sr-only" aria-live="polite">
              {filteredRest.length + (showFeatured && featured ? 1 : 0)} posts shown.
            </p>
            <div className="blog-list">
              {filteredRest.map((post) => (
                <article key={post.slug} className="blog-list-item">
                  <span className="eyebrow">
                    {post.category}
                    {post.type === "receipt" && post.receipt ? (
                      <em className="blog-receipt-chip">
                        {post.receipt.score.length}/6 proof
                      </em>
                    ) : null}
                  </span>
                  <h2>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p>{post.excerpt}</p>
                  <div className="blog-meta">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    · {post.readTime}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="page-content material-writing-section">
            <div className="page-header-stack material-writing-section-header">
              <span className="eyebrow">OrgX essays · useorgx.com/blog</span>
              <h2>Writing from the platform itself</h2>
              <p className="material-writing-deck">
                The OrgX blog is where the substrate work gets argued out:
                memory, benchmarks, MCP, trust, and where autonomy stops
                being a demo and starts being real infrastructure.
              </p>
            </div>
            <div className="blog-list">
              {orgxEssays.map((essay) => (
                <article key={essay.title} className="blog-list-item">
                  <span className="eyebrow">{essay.focus}</span>
                  <h2>
                    <a href={essay.url} target="_blank" rel="noreferrer">
                      {essay.title}
                    </a>
                  </h2>
                  <p>{essay.summary}</p>
                  <div className="blog-meta">
                    Published on useorgx.com ↗
                  </div>
                </article>
              ))}
            </div>
            <p style={{ marginTop: "1.5rem" }}>
              <a href="https://useorgx.com/blog" target="_blank" rel="noreferrer" className="site-link-inline">
                Read the full OrgX blog ↗
              </a>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
  return {
    props: {
      posts: getAllPosts(),
    },
  };
};
