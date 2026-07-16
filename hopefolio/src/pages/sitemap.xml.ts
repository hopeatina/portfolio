import type { GetServerSideProps } from "next";
import { getAllPosts } from "@/modules/blog/posts";
import { absoluteUrl, getAllCrawlEntries } from "@/lib/site-metadata";
import { proofReceipts } from "@/data/proof";

function proofSummaries() {
  return proofReceipts.map((receipt) => ({
    slug: receipt.slug,
    title: receipt.title,
    question: receipt.question,
    date: receipt.date,
    scoreEarned: receipt.score.length,
  }));
}


function buildSitemapXml() {
  const entries = getAllCrawlEntries(getAllPosts(), proofSummaries());

  const urls = entries
    .map((entry) => {
      const lastModTag = entry.lastModified
        ? `<lastmod>${new Date(entry.lastModified).toISOString()}</lastmod>`
        : "";
      const changeFreqTag = entry.changeFrequency
        ? `<changefreq>${entry.changeFrequency}</changefreq>`
        : "";
      const priorityTag =
        typeof entry.priority === "number"
          ? `<priority>${entry.priority.toFixed(1)}</priority>`
          : "";

      return [
        "<url>",
        `<loc>${absoluteUrl(entry.path)}</loc>`,
        lastModTag,
        changeFreqTag,
        priorityTag,
        "</url>",
      ]
        .filter(Boolean)
        .join("");
    })
    .join("");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
  ].join("");
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.write(buildSitemapXml());
  res.end();

  return { props: {} };
};

export default function SiteMapXml() {
  return null;
}
