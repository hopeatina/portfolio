import React from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import { getAllPosts } from "@/modules/blog/posts";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
}

interface BlogProps {
  posts: Post[];
}

export default function Blog({ posts }: BlogProps) {
  return (
    <>
      <Head>
        <title>Blog | Emerging Hope</title>
        <meta
          name="description"
          content="Thoughts on engineering, creativity, and building hope through technology"
        />
      </Head>

      <Header />

      <main className="container py-12">
        <h1>Blog</h1>
        <div className="grid gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="hover:shadow-xl transition-shadow">
                <h2 className="text-2xl font-bold">{post.title}</h2>
                <time className="text-gray-500 mt-2 block">
                  {new Date(post.date).toLocaleDateString()}
                </time>
                <p className="mt-4">{post.excerpt}</p>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return {
    props: { posts },
  };
}
