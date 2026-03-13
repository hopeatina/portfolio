import type { GetServerSideProps } from "next";
import { getAllPosts } from "@/modules/blog/posts";
import { SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "@/lib/site-metadata";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildRssXml() {
  const posts = getAllPosts();

  const items = posts
    .map((post) =>
      [
        "<item>",
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${absoluteUrl(`/blog/${post.slug}`)}</link>`,
        `<guid>${absoluteUrl(`/blog/${post.slug}`)}</guid>`,
        `<pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
        `<description>${escapeXml(post.excerpt || post.title)}</description>`,
        "</item>",
      ].join("")
    )
    .join("");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "<channel>",
    `<title>${SITE_NAME}</title>`,
    `<link>${absoluteUrl("/")}</link>`,
    `<description>${escapeXml(SITE_DESCRIPTION)}</description>`,
    `<language>en-us</language>`,
    items,
    "</channel>",
    "</rss>",
  ].join("");
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
  res.write(buildRssXml());
  res.end();

  return { props: {} };
};

export default function RssXml() {
  return null;
}
