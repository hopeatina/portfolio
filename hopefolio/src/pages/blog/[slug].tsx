import Head from "next/head";
import Link from "next/link";
import React, { useMemo } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { marked } from "marked";
import BlogProgressBar from "@/components/site/BlogProgressBar";
import BlogToc, { TocEntry } from "@/components/site/BlogToc";
import MaterializeHero from "@/components/site/MaterializeHero";
import { getAllPosts, getPostBySlug } from "@/modules/blog/posts";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

interface PostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  content: string;
  readTime: string;
  tags: string[];
  relatedPosts: string[];
}

interface RelatedPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
}

interface PostPageProps {
  post: PostData;
  related: RelatedPost[];
  toc: TocEntry[];
}

export default function PostPage({ post, related, toc }: PostPageProps) {
  const html = useMemo(() => {
    const renderer = new marked.Renderer();
    renderer.heading = (text: string, level: number) => {
      const id = slugify(text);
      return `<h${level} id="${id}">${text}</h${level}>`;
    };
    return marked.parse(post.content, { renderer }) as string;
  }, [post.content]);

  return (
    <>
      <Head>
        <title>{`${post.title} | Hope Atina`}</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <BlogProgressBar />

      <main id="main-content" className="page-frame">
        <div className="page-stack">
          <div className="blog-post-grid">
            <article className="blog-post-article">
              <MaterializeHero
                variant="page"
                storageKey={`blog:${post.slug}`}
                className="blog-featured"
              >
                <span
                  className="eyebrow"
                  data-materialize
                  style={{ ["--materialize-delay" as any]: "180ms" }}
                >
                  {post.category}
                </span>
                <h1 data-materialize style={{ ["--materialize-delay" as any]: "260ms" }}>
                  {post.title}
                </h1>
                <p
                  data-materialize
                  style={{
                    margin: "0.8rem 0 0",
                    color: "var(--shell-text-soft)",
                    ["--materialize-delay" as any]: "340ms",
                  }}
                >
                  {post.excerpt}
                </p>
                <div
                  className="proof-bar"
                  data-materialize
                  style={{
                    marginTop: "1rem",
                    ["--materialize-delay" as any]: "440ms",
                  }}
                >
                  <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                  <span>{post.readTime}</span>
                  {post.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </MaterializeHero>

              <div className="prose-shell" dangerouslySetInnerHTML={{ __html: html }} />

              <section className="contact-card">
                <span className="eyebrow">Read next</span>
                {related.length > 0 ? (
                  <div
                    style={{
                      display: "grid",
                      gap: "1rem",
                      marginTop: "1rem",
                      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    }}
                  >
                    {related.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/blog/${item.slug}`}
                        style={{
                          display: "grid",
                          gap: "0.45rem",
                          padding: "1rem 1.1rem",
                          borderRadius: "12px",
                          border: "1px solid rgba(255,255,255,0.08)",
                          background: "rgba(255,255,255,0.02)",
                          textDecoration: "none",
                          color: "inherit",
                          transition:
                            "border-color 180ms ease, background 180ms ease, transform 180ms ease",
                        }}
                        className="read-next-card"
                      >
                        <span
                          className="eyebrow"
                          style={{ fontSize: "0.7rem", letterSpacing: "0.14em" }}
                        >
                          {item.category} · {item.readTime}
                        </span>
                        <h3
                          style={{
                            margin: "0.2rem 0 0",
                            fontFamily: "var(--font-heading)",
                            fontSize: "1.15rem",
                            letterSpacing: "-0.01em",
                            lineHeight: 1.25,
                          }}
                        >
                          {item.title}
                        </h3>
                        <p
                          style={{
                            margin: 0,
                            color: "var(--shell-text-soft)",
                            fontSize: "0.88rem",
                            lineHeight: 1.5,
                          }}
                        >
                          {item.excerpt}
                        </p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p style={{ marginTop: "1rem" }}>
                    <Link href="/blog" className="site-link-inline">
                      Back to writing
                    </Link>
                  </p>
                )}
                <p
                  style={{
                    marginTop: "1.25rem",
                    fontSize: "0.85rem",
                    color: "var(--shell-muted)",
                  }}
                >
                  Or see{" "}
                  <Link href="/blog" className="site-link-inline">
                    all writing
                  </Link>
                  {" · "}
                  <Link href="/projects/orgx" className="site-link-inline">
                    read the OrgX case study ↗
                  </Link>
                </p>
              </section>
            </article>

            <BlogToc entries={toc} />
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();

  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({ params }) => {
  if (!params?.slug || typeof params.slug !== "string") {
    return { notFound: true };
  }

  const post = getPostBySlug(params.slug);
  const allPosts = getAllPosts();
  const related: RelatedPost[] = allPosts
    .filter((candidate) =>
      post.relatedPosts.length > 0
        ? post.relatedPosts.includes(candidate.slug)
        : candidate.slug !== post.slug && candidate.category === post.category
    )
    .slice(0, 2)
    .map((candidate) => ({
      slug: candidate.slug,
      title: candidate.title,
      excerpt: candidate.excerpt,
      category: candidate.category,
      readTime: candidate.readTime,
    }));

  // Extract H2 + H3 for TOC
  const toc: TocEntry[] = [];
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  let m: RegExpExecArray | null;
  while ((m = headingRegex.exec(post.content)) !== null) {
    const level = m[1].length === 2 ? 2 : 3;
    const text = m[2].trim();
    toc.push({ slug: slugify(text), text, level });
  }

  return {
    props: {
      post,
      related,
      toc,
    },
  };
};
