import type { GetServerSideProps } from "next";
import { SITE_URL, absoluteUrl } from "@/lib/site-metadata";

function buildRobotsTxt() {
  return [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${absoluteUrl("/sitemap.xml")}`,
    `Host: ${SITE_URL}`,
  ].join("\n");
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.write(buildRobotsTxt());
  res.end();

  return { props: {} };
};

export default function RobotsTxt() {
  return null;
}
