import {
  CASE_STUDIES,
  PRIMARY_PAGES,
  SITE_DESCRIPTION,
  SITE_IMAGE,
  SITE_NAME,
  getCanonicalPath,
} from "./site-metadata";
import { selectedProjects } from "@/data/selected-projects";

export interface PageSeoProps {
  post?: {
    slug: string;
    title: string;
    excerpt: string;
    date?: string;
  };
  receipt?: {
    slug: string;
    title: string;
    question: string;
    date?: string;
  };
}

export interface PageMetadata {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  type: "website" | "article";
  publishedTime?: string;
}

const staticPages = [
  ...PRIMARY_PAGES,
  ...CASE_STUDIES,
  {
    path: "/hiring",
    title: "Work with Hope Atina",
    description:
      "Hope Atina brings production backend and data experience, AI systems engineering, product design, research, and interactive 3D to ambitious teams.",
  },
];

function publishedTime(date?: string) {
  if (!date) return undefined;
  const timestamp = Date.parse(date);
  return Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : undefined;
}

/** Share metadata stays tied to the canonical route, including during navigation. */
export function getPageMetadata(path: string, pageProps: PageSeoProps = {}): PageMetadata {
  const canonicalPath = getCanonicalPath(path);
  const entry = staticPages.find((page) => page.path === canonicalPath);
  const project = selectedProjects.find((project) => project.href === canonicalPath);
  const shareImage = project && !project.heroImage.endsWith(".svg") ? project.heroImage : SITE_IMAGE;
  const metadata: PageMetadata = {
    title: entry && canonicalPath !== "/"
      ? entry.title.includes(SITE_NAME) ? entry.title : `${entry.title} — ${SITE_NAME}`
      : `${SITE_NAME} — Systems, product, and creative practice`,
    description: entry?.description || SITE_DESCRIPTION,
    image: shareImage,
    imageAlt: shareImage === SITE_IMAGE ? `${SITE_NAME} portfolio inspection field` : project?.heroAlt ?? project?.title ?? SITE_NAME,
    type: "website",
  };

  const { post, receipt } = pageProps;
  if (post?.title && canonicalPath === `/blog/${post.slug}`) {
    metadata.title = `${post.title} | ${SITE_NAME}`;
    metadata.description = post.excerpt || SITE_DESCRIPTION;
    metadata.type = "article";
    metadata.publishedTime = publishedTime(post.date);
  } else if (receipt?.title && canonicalPath === `/proof/${receipt.slug}`) {
    metadata.title = `${receipt.title} — Proof — ${SITE_NAME}`;
    metadata.description = receipt.question || SITE_DESCRIPTION;
    metadata.type = "article";
    metadata.publishedTime = publishedTime(receipt.date);
  }

  return metadata;
}
