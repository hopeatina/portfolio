import type { GetServerSideProps } from "next";
import { getAllPosts } from "@/modules/blog/posts";
import { renderLlmsFullTxt } from "@/lib/site-metadata";
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


export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.write(renderLlmsFullTxt(getAllPosts(), proofSummaries()));
  res.end();

  return { props: {} };
};

export default function LlmsFullTxt() {
  return null;
}
