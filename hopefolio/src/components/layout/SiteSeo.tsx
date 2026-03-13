import Head from "next/head";
import { useRouter } from "next/router";
import {
  SITE_DESCRIPTION,
  SITE_HANDLE,
  SITE_IMAGE,
  SITE_KEYWORDS,
  SITE_NAME,
  absoluteUrl,
  getCanonicalPath,
  SOCIAL_LINKS,
} from "@/lib/site-metadata";

export default function SiteSeo() {
  const router = useRouter();
  const canonicalPath = getCanonicalPath(router.asPath || router.pathname || "/");
  const canonicalUrl = absoluteUrl(canonicalPath);
  const isNotFound = router.pathname === "/404";
  const robotsContent = isNotFound
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    description: SITE_DESCRIPTION,
    inLanguage: "en-US",
    publisher: {
      "@type": "Person",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    jobTitle: "AI Agent Infrastructure Engineer",
    description: SITE_DESCRIPTION,
    image: absoluteUrl(SITE_IMAGE),
    sameAs: [
      SOCIAL_LINKS.github,
      SOCIAL_LINKS.linkedin,
      SOCIAL_LINKS.medium,
      SOCIAL_LINKS.x,
    ],
    knowsAbout: SITE_KEYWORDS,
  };

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="author" content={SITE_NAME} />
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="keywords" content={SITE_KEYWORDS.join(", ")} />
      {!isNotFound && <link rel="canonical" href={canonicalUrl} />}
      <link
        rel="alternate"
        type="application/rss+xml"
        title={`${SITE_NAME} RSS feed`}
        href={absoluteUrl("/rss.xml")}
      />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={absoluteUrl(SITE_IMAGE)} />
      <meta property="og:image:alt" content={`${SITE_NAME} profile photo`} />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE_HANDLE} />
      <meta name="twitter:creator" content={SITE_HANDLE} />
      <meta name="twitter:image" content={absoluteUrl(SITE_IMAGE)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </Head>
  );
}
