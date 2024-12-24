import React from "react";
import BlogLayout from "@/components/blog/BlogLayout";
import BlogPostCard from "@/components/blog/BlogPostCard";
import { getAllPosts } from "@/modules/blog/posts";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category?: string;
}

interface BlogProps {
  posts: Post[];
}

export default function Blog({ posts }: BlogProps) {
  return (
    <BlogLayout
      title="Blog"
      description="Thoughts on engineering, creativity, and building hope through technology"
    >
      <div className="grid gap-8">
        {posts.map((post) => (
          <BlogPostCard
            key={post.slug}
            slug={post.slug}
            title={post.title}
            date={post.date}
            excerpt={post.excerpt}
            category={post.category}
          />
        ))}
      </div>
    </BlogLayout>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return {
    props: { posts },
  };
}
