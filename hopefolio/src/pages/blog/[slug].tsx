import React from "react";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import { getAllPosts, getPostBySlug } from "@/modules/blog/posts";
import { marked } from "marked";

interface PostProps {
  post: {
    slug: string;
    title: string;
    date: string;
    content: string;
  };
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title} | Emerging Hope</title>
      </Head>

      <main className="container py-12">
        <article className="prose lg:prose-xl mx-auto">
          <h1>{post.title}</h1>
          <time className="text-gray-500 block mb-8">
            {new Date(post.date).toLocaleDateString()}
          </time>
          <div dangerouslySetInnerHTML={{ __html: marked(post.content) }} />
        </article>
      </main>
    </>
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
