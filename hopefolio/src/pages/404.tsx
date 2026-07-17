import Head from "next/head";
import Link from "next/link";
import { TextLink } from "@/components/v4/V4Primitives";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 — This thread doesn&apos;t exist | Hope Atina</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main id="main-content" className="v4-page v4-notfound" aria-labelledby="nf-title">
        <div className="v4-notfound-inner">
          <span className="v4-notfound-code" aria-hidden="true">
            404 · thread snapped
          </span>
          <h1 id="nf-title">This thread doesn&apos;t exist. The ledger does.</h1>
          <p>
            Whatever you were following ends here — moved, retired into the archive, or never
            spun. The work that survives is one link away.
          </p>
          <div className="v4-notfound-actions">
            <TextLink href="/proof">See the receipts</TextLink>
            <TextLink href="/projects">Inspect the work</TextLink>
            <Link href="/" className="v4-text-link">
              Home <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
