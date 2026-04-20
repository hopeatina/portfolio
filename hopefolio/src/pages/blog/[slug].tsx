import Head from "next/head";
import Link from "next/link";
import React, { useMemo } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { marked } from "marked";
import BlogProgressBar from "@/components/site/BlogProgressBar";
import BlogToc, { TocEntry } from "@/components/site/BlogToc";
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

interface PostPageProps {
  post: PostData;
  related: Array<{ slug: string; title: string }>;
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
              <header className="blog-featured">
                <span className="eyebrow">{post.category}</span>
                <h1>{post.title}</h1>
                <p style={{ margin: "0.8rem 0 0", color: "var(--shell-text-soft)" }}>
                  {post.excerpt}
                </p>
                <div className="proof-bar" style={{ marginTop: "1rem" }}>
                  <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                  <span>{post.readTime}</span>
                  {post.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </header>

              <div className="prose-shell" dangerouslySetInnerHTML={{ __html: html }} />

              <section className="contact-card">
                <span className="eyebrow">Read next</span>
                {related.length > 0 ? (
                  <div className="blog-list" style={{ marginTop: "1rem" }}>
                    {related.map((item) => (
                      <div key={item.slug} className="blog-list-item">
                        <h2 style={{ margin: 0, fontSize: "1.35rem" }}>
                          <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                        </h2>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ marginTop: "1rem" }}>
                    <Link href="/blog" className="site-link-inline">
                      Back to writing
                    </Link>
                  </p>
                )}
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
  const related = allPosts
    .filter((candidate) =>
      post.relatedPosts.length > 0
        ? post.relatedPosts.includes(candidate.slug)
        : candidate.slug !== post.slug && candidate.category === post.category
    )
    .slice(0, 2)
    .map((candidate) => ({ slug: candidate.slug, title: candidate.title }));

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
