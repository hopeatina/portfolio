import type { GetServerSideProps } from "next";
import { getAllPosts } from "@/modules/blog/posts";
import { renderLlmsFullTxt } from "@/lib/site-metadata";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.write(renderLlmsFullTxt(getAllPosts()));
  res.end();

  return { props: {} };
};

export default function LlmsFullTxt() {
  return null;
}
