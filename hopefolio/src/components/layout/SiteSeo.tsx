import Head from "next/head";
import { useRouter } from "next/router";
import { getPageMetadata, type PageSeoProps } from "@/lib/page-metadata";
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

export default function SiteSeo({ pageProps = {} }: { pageProps?: PageSeoProps }) {
  const router = useRouter();
  const canonicalPath = getCanonicalPath(router.asPath || router.pathname || "/");
  const canonicalUrl = absoluteUrl(canonicalPath);
  const metadata = getPageMetadata(canonicalPath, pageProps);
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
    jobTitle: "Engineer, Founder, and Product Thinker",
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
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="author" content={SITE_NAME} />
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="keywords" content={SITE_KEYWORDS.join(", ")} />
      {!isNotFound && <link key="canonical" rel="canonical" href={canonicalUrl} />}
      <link
        rel="alternate"
        type="application/rss+xml"
        title={`${SITE_NAME} RSS feed`}
        href={absoluteUrl("/rss.xml")}
      />
      <meta key="og:site_name" property="og:site_name" content={SITE_NAME} />
      <meta key="og:title" property="og:title" content={metadata.title} />
      <meta key="og:description" property="og:description" content={metadata.description} />
      <meta key="og:type" property="og:type" content={metadata.type} />
      <meta key="og:url" property="og:url" content={canonicalUrl} />
      <meta key="og:image" property="og:image" content={absoluteUrl(metadata.image)} />
      <meta key="og:image:alt" property="og:image:alt" content={metadata.imageAlt} />
      <meta key="og:locale" property="og:locale" content="en_US" />
      {metadata.publishedTime && (
        <meta
          key="article:published_time"
          property="article:published_time"
          content={metadata.publishedTime}
        />
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE_HANDLE} />
      <meta name="twitter:creator" content={SITE_HANDLE} />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={absoluteUrl(metadata.image)} />
      <meta name="twitter:image:alt" content={metadata.imageAlt} />
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
