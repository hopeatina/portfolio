import type { GetServerSideProps } from "next";
import { getAllPosts } from "@/modules/blog/posts";
import { renderLlmsTxt } from "@/lib/site-metadata";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.write(renderLlmsTxt(getAllPosts()));
  res.end();

  return { props: {} };
};

export default function LlmsTxt() {
  return null;
}
