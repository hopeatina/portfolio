import Head from "next/head";
import Link from "next/link";
import {
  PROOF_SCORE_LABELS,
  PROOF_SCORE_ORDER,
  proofReceipts,
} from "@/data/proof";
import { SectionSignal, TextLink } from "@/components/v4/V4Primitives";

export default function ProofIndex() {
  return (
    <>
      <Head>
        <title>Proof — Hope Atina</title>
        <meta
          name="description"
          content="A ledger of falsifiable receipts: question, baseline, method, measured result, documented failure, inspectable artifacts. Every entry scores itself against six proof criteria."
        />
      </Head>

      <main id="main-content" className="v4-page v4-proof-page">
        <section className="v4-proof-hero" aria-labelledby="proof-title">
          <span className="v4-proof-kicker">Proof / the ledger</span>
          <h1 id="proof-title">Claims are cheap. Receipts are the interface.</h1>
          <p className="v4-proof-deck">
            Every entry answers a falsifiable question with a baseline, a method, a measured
            result, a documented failure, and artifacts you can open. Each one scores itself
            against six criteria — honestly, which means most do not earn all six.
          </p>
          <dl className="v4-proof-legend" aria-label="Proof criteria">
            {PROOF_SCORE_ORDER.map((key) => (
              <div key={key}>
                <dt>
                  <b aria-hidden="true">{PROOF_SCORE_LABELS[key].short}</b>
                  {PROOF_SCORE_LABELS[key].label}
                </dt>
                <dd>{PROOF_SCORE_LABELS[key].description}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="v4-proof-ledger" aria-label="Receipts">
          <SectionSignal index="01">Receipts, newest first</SectionSignal>
          <p className="v4-proof-heartbeat" aria-label="Ledger cadence">
            <i aria-hidden="true" />
            {proofReceipts.length} receipts on the ledger · next drafted daily at 07:10 ·
            external validation earned by {proofReceipts.filter((r) => r.score.includes("external")).length} of {proofReceipts.length}
          </p>
          <div className="v4-proof-list">
            {[...proofReceipts]
              .sort((a, b) => (a.date < b.date ? 1 : -1))
              .map((receipt, rowIndex) => (
                <Link
                  href={`/proof/${receipt.slug}`}
                  className={`v4-proof-row ${rowIndex === 0 ? "is-latest" : ""}`}
                  key={receipt.slug}
                >
                  <span className="v4-proof-row-index">{receipt.index}</span>
                  <div className="v4-proof-row-main">
                    <span className="v4-proof-row-domain">
                      {receipt.domain}
                      {rowIndex === 0 ? <b className="v4-proof-latest-tag">latest</b> : null}
                    </span>
                    <h2>{receipt.title}</h2>
                    <p>{receipt.question}</p>
                    {rowIndex === 0 ? (
                      <p className="v4-proof-row-failure">
                        <span>Where it broke:</span> {receipt.failure.split(". ")[0]}.
                      </p>
                    ) : null}
                  </div>
                  <div className="v4-proof-row-meta">
                    <span className="v4-proof-score" aria-label={`Proof score ${receipt.score.length} of 6`}>
                      {PROOF_SCORE_ORDER.map((key) => (
                        <i
                          key={key}
                          className={`${receipt.score.includes(key) ? "is-earned" : ""} ${key === "external" ? "is-external" : ""}`}
                          title={`${PROOF_SCORE_LABELS[key].label}${receipt.score.includes(key) ? "" : " — not earned"}`}
                        >
                          {PROOF_SCORE_LABELS[key].short}
                        </i>
                      ))}
                    </span>
                    <time dateTime={receipt.date}>{receipt.date}</time>
                    <b aria-hidden="true">&rarr;</b>
                  </div>
                </Link>
              ))}
          </div>
        </section>

        <section className="v4-proof-close">
          <p>
            The standard for this page: at least four of six criteria before an entry ships,
            and the failure field is never empty. External validation is the hardest column
            to earn — that is what makes it worth tracking.
          </p>
          <TextLink href="/projects">Inspect the systems behind the receipts</TextLink>
        </section>
      </main>
    </>
  );
}
