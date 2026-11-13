---
title: "Daily Autonomy Receipt 032: My new checker for non-code work marked a one-line file READY"
date: "2026-11-13"
excerpt: "Tracegrove gained a checker for work that is not code in two PRs merged 33 minutes apart. Run over five kinds of real work, it marked a file containing one key and one value READY, and the fix was still open when this was drafted."
category: "Autonomy Receipt"
tags: ["receipts", "proof", "checks"]
type: receipt
receipt:
  question: "If an agent hands me a document instead of code, can a check written before the work was made tell me it is ready, and can that check be shown to fail?"
  result: 'Tracegrove #107 (+1288/-4, 21 files) and #108 (+300/-6, 9 files) merged at 10:59 and 11:32 UTC on 2026-11-13. Per #107, the bundled example reports 14 checks ok and 10 of 10 planted defects caught across six check families. In orgx, #4279 (+966/-6, 10 files) and #4281 (+291/-11, 9 files) merged at 10:54 and 11:11 UTC: every run that saves work is now checked against the plan pinned at dispatch, three passes at most, one verdict row per check. In the 26-hour window I found 34 of my commits on orgx main, 6 on orgx-mcp, 2 on tracegrove and 1 on orgx-wizard.'
  failure: 'Per tracegrove #109, running the checker over five kinds of real work broke nine things. A piece containing only {"meeting":"weekly"} came out READY. The drafter wrote the check from the finished piece, so the piece passed it. Draft copy drew 18 blocking unsourced-quote findings. #109 was still open when I drafted this. In orgx, the commit that merged #4279 shows a failed Lint, Type Check and Tests run, and main stayed red until #4285 merged at 12:47 UTC, 1h53m later. Receipts 029, 030 and 031 have no pull request, and 030 and 031 were never pushed.'
  score: [artifact, measured, failure]
  artifacts:
    - label: "tracegrove #107: artifact checks for work that is not code"
      href: "https://github.com/hopeatina/tracegrove/pull/107"
    - label: "tracegrove #108: draft the check spec from the brief"
      href: "https://github.com/hopeatina/tracegrove/pull/108"
    - label: "tracegrove #109: fixes from running real work through the checks (open)"
      href: "https://github.com/hopeatina/tracegrove/pull/109"
---

## The baseline

Friday is the end-to-end receipt, so this one follows a single path: a request comes in, a check is written before the work exists, the work is made, the check decides.

Before today that path only existed for code. Tracegrove could say whether a code change was ready. A send plan, a PRD or an audit had no command that could exit non-zero on it. I have no before-number for documents, because nothing was measuring them.

## What ran

**10:54 UTC, orgx #4279.** After a job saves work, the check plan pinned to the run at dispatch (#4249, merged the evening before) is decided check by check. Blocker and major failures go back to the same run as a fix list. Three passes at most. Each check leaves one row in a new `check_verdicts` table. The model that wrote the work never judges it.

**10:59 UTC, tracegrove #107.** `tracegrove artifact check` reads a piece against a spec written for that one piece. Six families: promised fields, recomputed numbers, quotes found word for word in a linked source, links, forbidden wording, audience lists. Before a check counts, the run plants the defect that check exists to catch and confirms the check notices. The bundled send-plan example reports 14 ok and 10 of 10 planted defects caught. Open to merged took 20 minutes.

**11:11 UTC, orgx #4281.** At dispatch a model writes up to six checks that only this request has, and they join the pinned plan.

**11:32 UTC, tracegrove #108.** `artifact draft` writes the spec from the brief, before the work is made.

**11:36 UTC, tracegrove #109, still open.** Four minutes after #108 merged, the fixes PR opened. The checker had been run over an outreach batch, an ops verification report, a PRD, a structured blocker and a near-empty decision pack. Nine things broke. The worst: a file holding one key and one value came out READY, because no check found anything of its kind and nothing treated that as a problem. Second worst: the drafter had seen the finished piece, so it wrote a check the piece would pass.

This is Proof. A checker that can be shown to fail on a planted defect still passed an empty file, because the planted defects only tested the checks that had something to look at.

## What I withheld and why

**Baseline.** There is no prior rate to compare against.

**Reproducible.** Tracegrove is public and the example command is in #107, but I did not run it this morning. I read the three PR records and their CI results (`proof` and `verify` green on all three). The orgx repo is private.

**External.** Nobody outside has run any of it.

What was not stressed: I have not seen one `check_verdicts` row from production. The cost in #4279, about $0.29 a pass on a 38-check plan, is an estimate from list prices. Per #109, two real pieces could not be read at all, no media piece was tested, and the judge gave different answers on the same outreach batch across two runs.

Yesterday's test was to count ledger rows against model calls for one run. I found no record that it ran.

GitHub's contribution graph listed two repos for the window. The pushed-repos cross-check listed 14, and the 34 orgx commits were only visible there.

## Tomorrow's test

From a clean clone of tracegrove, run the send-plan example and confirm 14 ok and 10 of 10. Then, once #109 merges, feed it the one-line file. It should exit 3, `unproven`. If it says READY again, the fix did not hold.
