import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import BlogLayout from "@/components/blog/BlogLayout";
import BlogPostHeader from "@/components/blog/BlogPostHeader";
import BlogPostContent from "@/components/blog/BlogPostContent";
import BlogPostCTA from "@/components/blog/BlogPostCTA";
import { getAllPosts, getPostBySlug } from "@/modules/blog/posts";
import {
  UserCircleIcon as UserCircleIconBase,
  PhoneIcon as PhoneIconBase,
  RssIcon as RssIconBase,
} from "@heroicons/react/24/solid";

interface PostData {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt: string;
  category: string;
}

interface PostProps {
  post: PostData;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const UserCircleIcon = UserCircleIconBase as React.FC<
    React.SVGProps<SVGSVGElement>
  >;
  const PhoneIcon = PhoneIconBase as React.FC<React.SVGProps<SVGSVGElement>>;
  const RssIcon = RssIconBase as React.FC<React.SVGProps<SVGSVGElement>>;

  const socialLinks = [
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/yourusername",
      icon: <UserCircleIcon className="w-5 h-5" />,
    },
    {
      platform: "TikTok",
      url: "https://tiktok.com/@yourusername",
      icon: <PhoneIcon className="w-5 h-5" />,
    },
    {
      platform: "RSS Feed",
      url: "/rss.xml",
      icon: <RssIcon className="w-5 h-5" />,
    },
  ];

  if (!post) {
    return <div>Loading...</div>;
  }

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
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const posts = getAllPosts();
    const paths = posts.map((post) => ({
      params: { slug: post.slug },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  if (!params?.slug || typeof params.slug !== "string") {
    return { notFound: true };
  }

  try {
    const post = getPostBySlug(params.slug);

    return {
      props: {
        post,
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      notFound: true,
    };
  }
};

export default Post;
