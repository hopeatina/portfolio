import Head from "next/head";
import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";
import {
  PROOF_SCORE_LABELS,
  PROOF_SCORE_ORDER,
  getAllProofSlugs,
  getProofReceipt,
  proofReceipts,
  type ProofReceipt,
} from "@/data/proof";
import { TextLink } from "@/components/v4/V4Primitives";

interface ProofNeighbor {
  slug: string;
  index: string;
  title: string;
}

interface ProofPageProps {
  receipt: ProofReceipt;
  prev: ProofNeighbor | null;
  next: ProofNeighbor | null;
}

const ARTIFACT_KIND_LABELS: Record<ProofReceipt["artifacts"][number]["kind"], string> = {
  repo: "CODE",
  pr: "MERGED PR",
  demo: "LIVE",
  video: "VIDEO",
  talk: "TALK",
  doc: "DOC",
  package: "PACKAGE",
  release: "RELEASE",
  site: "SITE",
};

export default function ProofPage({ receipt, prev, next }: ProofPageProps) {
  return (
    <>
      <Head>
        <title>{`${receipt.title} — Proof — Hope Atina`}</title>
        <meta name="description" content={receipt.question} />
      </Head>

      <main id="main-content" className="v4-page v4-proof-page">
        <article className="v4-receipt" aria-labelledby="receipt-title">
          <header className="v4-receipt-head">
            <Link href="/proof" className="v4-receipt-back">
              &larr; The ledger
            </Link>
            <div className="v4-receipt-id">
              <span>Receipt {receipt.index}</span>
              <span>{receipt.domain}</span>
              <time dateTime={receipt.date}>{receipt.date}</time>
            </div>
            <h1 id="receipt-title">{receipt.title}</h1>
            <p className="v4-receipt-question">
              <span>The falsifiable question</span>
              {receipt.question}
            </p>
            <div className="v4-proof-scorecard" role="list" aria-label="Proof criteria scored">
              {PROOF_SCORE_ORDER.map((key) => {
                const earned = receipt.score.includes(key);
                return (
                  <div
                    role="listitem"
                    key={key}
                    className={`v4-proof-crit ${earned ? "is-earned" : "is-withheld"} ${key === "external" ? "is-external" : ""}`}
                  >
                    <b>{PROOF_SCORE_LABELS[key].short}</b>
                    <strong>{PROOF_SCORE_LABELS[key].label}</strong>
                    <span>{earned ? "earned" : "withheld"}</span>
                    {receipt.scoreReasons?.[key] ? <em>{receipt.scoreReasons[key]}</em> : null}
                  </div>
                );
              })}
            </div>
            {receipt.scoreNote ? (
              <p className="v4-receipt-scorenote">{receipt.scoreNote}</p>
            ) : null}
          </header>

          <div className="v4-receipt-body">
            <section>
              <h2>Baseline</h2>
              <p>{receipt.baseline}</p>
            </section>
            <section>
              <h2>Method</h2>
              <p>{receipt.method}</p>
            </section>
            <section className="is-result">
              <h2>Measured result</h2>
              <p>{receipt.result}</p>
            </section>
            <section className="is-failure">
              <h2>Where it broke</h2>
              <p>{receipt.failure}</p>
            </section>
            {receipt.updates && receipt.updates.length > 0 ? (
              <section className="is-updates">
                <h2>Updates</h2>
                <ul className="v4-receipt-updates">
                  {receipt.updates.map((u) => (
                    <li key={`${u.date}-${u.note.slice(0, 12)}`}>
                      <time dateTime={u.date}>{u.date}</time>
                      <span>{u.note}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
            {receipt.next ? (
              <section>
                <h2>Next test</h2>
                <p>{receipt.next}</p>
              </section>
            ) : null}
          </div>

          <footer className="v4-receipt-artifacts" aria-label="Artifacts">
            <h2>Open the evidence</h2>
            <ul>
              {receipt.artifacts.map((artifact) => {
                const isExternal = /^https?:\/\//.test(artifact.href);
                return (
                  <li key={artifact.href}>
                    <a
                      href={artifact.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                    >
                      <b>{ARTIFACT_KIND_LABELS[artifact.kind]}</b>
                      <span>{artifact.label}</span>
                      <i aria-hidden="true">{isExternal ? "↗" : "→"}</i>
                    </a>
                  </li>
                );
              })}
            </ul>
            <nav className="v4-receipt-nav" aria-label="Adjacent receipts">
              {prev ? (
                <Link href={`/proof/${prev.slug}`}>
                  <span>&larr; Receipt {prev.index}</span>
                  <b>{prev.title}</b>
                </Link>
              ) : (
                <span aria-hidden="true" />
              )}
              {next ? (
                <Link href={`/proof/${next.slug}`} className="is-next">
                  <span>Receipt {next.index} &rarr;</span>
                  <b>{next.title}</b>
                </Link>
              ) : (
                <span aria-hidden="true" />
              )}
            </nav>
            <TextLink href="/proof">Back to the ledger</TextLink>
          </footer>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllProofSlugs().map((slug) => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<ProofPageProps> = async ({ params }) => {
  const receipt = getProofReceipt(String(params?.slug));
  if (!receipt) return { notFound: true };
  const ordered = [...proofReceipts].sort((a, b) => (a.index < b.index ? -1 : 1));
  const i = ordered.findIndex((r) => r.slug === receipt.slug);
  const pick = (r: ProofReceipt | undefined) =>
    r ? { slug: r.slug, index: r.index, title: r.title } : null;
  return {
    props: {
      receipt,
      prev: pick(ordered[i - 1]),
      next: pick(ordered[i + 1]),
    },
  };
};
