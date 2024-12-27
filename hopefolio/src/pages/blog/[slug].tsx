import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import BlogLayout from "@/components/blog/BlogLayout";
import BlogPostHeader from "@/components/blog/BlogPostHeader";
import BlogPostContent from "@/components/blog/BlogPostContent";
import BlogPostCTA from "@/components/blog/BlogPostCTA";
import { getAllPosts, getPostBySlug } from "@/modules/blog/posts";
import { UserCircleIcon, PhoneIcon, RssIcon } from "@heroicons/react/24/solid";

interface PostProps {
  post: {
    slug: string;
    title: string;
    date: string;
    content: string;
    excerpt?: string;
    category?: string;
  };
}

export default function Post({ post }: PostProps) {
  const socialLinks = [
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/yourusername",
      icon: UserCircleIcon,
    },
    {
      platform: "TikTok",
      url: "https://tiktok.com/@yourusername",
      icon: PhoneIcon,
    },
    {
      platform: "RSS Feed",
      url: "/rss.xml",
      icon: RssIcon,
    },
  ];

  return (
    <BlogLayout title={post.title} description={post.excerpt} isPost={true}>
      <article>
        <BlogPostHeader
          title={post.title}
          date={post.date}
          category={post.category}
          excerpt={post.excerpt}
        />

        <BlogPostContent content={post.content} />

        <BlogPostCTA socialLinks={socialLinks} />
      </article>
    </BlogLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = getPostBySlug(params?.slug as string);
  return {
    props: { post },
  };
};
