import Head from "next/head";
import Link from "next/link";
import React from "react";
import { GetStaticProps } from "next";
import { getAllPosts } from "@/modules/blog/posts";

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

export default function BlogIndex({ posts }: BlogIndexProps) {
  const [featured, ...rest] = posts;

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
            <h1>Technical writing on agent orchestration, MCP protocol, and production AI systems.</h1>
            <p style={{ maxWidth: "42rem", margin: 0 }}>
              Featured writing stays on-site now. The index leads with the
              strongest essay, then keeps the rest compressed and easy to scan.
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
            <div className="blog-list">
              {rest.map((post) => (
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
