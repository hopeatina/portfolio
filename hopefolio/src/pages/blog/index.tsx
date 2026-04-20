import Head from "next/head";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { GetStaticProps } from "next";
import { getAllPosts } from "@/modules/blog/posts";

const CATEGORY_GROUPS = [
  {
    id: "all",
    label: "All",
    matches: (_category: string) => true,
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
  const filteredRest = useMemo(() => {
    const group = CATEGORY_GROUPS.find((g) => g.id === activeGroup) ?? CATEGORY_GROUPS[0];
    return rest.filter((p) => group.matches(p.category));
  }, [rest, activeGroup]);

  return (
    <>
      <Head>
        <title>Writing | Hope Atina</title>
        <meta
          name="description"
          content="Technical writing on agent orchestration, MCP protocol, and production AI systems."
        />
      </Head>

      <main id="main-content" className="page-frame">
        <div className="page-stack">
          <header className="page-header-stack">
            <span className="eyebrow">Writing</span>
            <h1>What breaks when you put agents in production.</h1>
            <p style={{ maxWidth: "42rem", margin: 0 }}>
              Essays on memory, MCP, trust scoring, decision provenance, and
              why single-shot benchmarks hide what matters. On-site first,
              then the OrgX essays in order of strength.
            </p>
          </header>

          {featured ? (
            <article className="blog-featured">
              <span className="eyebrow">{featured.category}</span>
              <h2>{featured.title}</h2>
              <p style={{ margin: "0.8rem 0 0", color: "var(--shell-text-soft)", maxWidth: "40rem" }}>
                {featured.excerpt}
              </p>
              <div className="proof-bar" style={{ marginTop: "1rem" }}>
                <span>{new Date(featured.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                <span>{featured.readTime}</span>
                {featured.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <p style={{ margin: "1.1rem 0 0" }}>
                <Link href={`/blog/${featured.slug}`} className="site-link-inline">
                  Read featured post →
                </Link>
              </p>
            </article>
          ) : null}

          <section className="page-content">
            <div
              role="tablist"
              aria-label="Blog category filter"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginBottom: "1.5rem",
              }}
            >
              {CATEGORY_GROUPS.map((g) => {
                const isActive = g.id === activeGroup;
                const count =
                  g.id === "all"
                    ? rest.length
                    : rest.filter((p) => g.matches(p.category)).length;
                if (g.id !== "all" && count === 0) return null;
                return (
                  <button
                    key={g.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveGroup(g.id)}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      padding: "0.45rem 0.9rem",
                      borderRadius: "999px",
                      border: isActive
                        ? "1px solid rgba(0, 229, 160, 0.55)"
                        : "1px solid rgba(255, 255, 255, 0.1)",
                      background: isActive
                        ? "rgba(0, 229, 160, 0.1)"
                        : "transparent",
                      color: isActive ? "var(--shell-text)" : "var(--shell-muted)",
                      cursor: "pointer",
                      transition: "all 150ms ease",
                    }}
                  >
                    {g.label} <span style={{ opacity: 0.6 }}>({count})</span>
                  </button>
                );
              })}
            </div>
            <div className="blog-list">
              {filteredRest.map((post) => (
                <article key={post.slug} className="blog-list-item">
                  <span className="eyebrow">{post.category}</span>
                  <h2 style={{ margin: 0, fontSize: "clamp(1.5rem, 4vw, 2rem)" }}>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p style={{ margin: 0, maxWidth: "42rem" }}>{post.excerpt}</p>
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

          <section className="page-content">
            <div className="page-header-stack" style={{ gap: "0.8rem" }}>
              <span className="eyebrow">OrgX essays · useorgx.com/blog</span>
              <h2>Writing from the platform itself</h2>
              <p style={{ maxWidth: "42rem", margin: 0 }}>
                The OrgX blog is where the substrate work gets argued out:
                memory, benchmarks, MCP, trust, and where autonomy stops
                being a demo and starts being real infrastructure.
              </p>
            </div>
            <div className="blog-list">
              {orgxEssays.map((essay) => (
                <article key={essay.title} className="blog-list-item">
                  <span className="eyebrow">{essay.focus}</span>
                  <h2 style={{ margin: 0, fontSize: "clamp(1.5rem, 4vw, 2rem)" }}>
                    <a href={essay.url} target="_blank" rel="noreferrer">
                      {essay.title}
                    </a>
                  </h2>
                  <p style={{ margin: 0, maxWidth: "42rem" }}>{essay.summary}</p>
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
