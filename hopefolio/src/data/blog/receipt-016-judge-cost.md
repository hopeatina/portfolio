---
title: "Daily Autonomy Receipt 016: The cheap model cost 2 cents to run and $1.65 to judge, and its revise loop failed 20 of 28 times"
date: "2026-10-22"
excerpt: "Three frontier-gap runs today spent $27.45 on OpenRouter and $14.15 of it went to judges. DeepSeek V4 Flash inside the OrgX harness scored 64.3 against GPT-6.1-sol's 95.5 on the hard suite at about 1/22 of the model cost, and the revise loop meant to close that gap timed out on 20 of 28 rows."
category: "Autonomy Receipt"
tags: ["receipts", "economics", "evals"]
type: receipt
receipt:
  question: "Can a cheap open model inside the OrgX harness close the gap to a frontier model on real OrgX work, and what does measuring that gap cost?"
  result: "Three workflow_dispatch runs of the hard suite (8 tasks, 2 repeats, 2 judges) spent $27.45 against $50 of budget caps; judges took $14.15 of it. Run 39721791606, mean of 16 rows per arm: DeepSeek V4 Flash raw 29.6, DeepSeek + OrgX harness 64.3, GPT-6.1-sol raw 54.9, GPT-6.1-sol + OrgX 95.5. Model cost for the 16 DeepSeek + OrgX rows was $0.021; judging them cost $1.653. Run 39743091500: the revise loop reached 79.8 at $0.651 and 381 s per row; one-shot GPT-6.1-sol + OrgX reached 91.7 at $0.258 and 58 s. Also merged: orgx #3728, dollar top-ups with a 5.5% fee (minimum $0.80) replacing packs that charged about 2.9x usage, +1,788 / -204 across 36 files. In the 26-hour window: 26 PRs merged in orgx, 11 in the useorgx satellite repos, 1 in portfolio."
  failure: "The revise loop failed on 20 of 28 rows across the three runs (14 of 16, 4 of 4, 2 of 8), mostly 'aborted due to timeout'. Where it finished it kept the wrong draft: its self-check read 100 every round, so keep-best chose round 1, and per #3731 the judged score (63.8) came out under one-shot DeepSeek + OrgX (68.8). #3731 fixes both; its live check, run 39789559129, was still in progress when this was written. The Claude Fable 5.1 + OrgX arm scored 39.1 at $4.475 because the section parser reported every section missing on both marketing tasks; I did not open those outputs, so whether that is a format mismatch is unverified. DeepSeek hit its 32,000-token output cap on 4 of 8 one-shot rows in the third run. Judges took 44%, 56% and 78% of each run's spend. The credits change fixed purchased credits that refilled every period, but live Stripe is unverified until a real $10 top-up. 13 receipt PRs, #34 through #47, are open and unmerged."
  score: [artifact, baseline, measured, failure]
  artifacts:
    - label: "orgx #3720: frontier-gap experiment, five arms and an outside judge (private repo)"
      href: "https://github.com/hopeatina/orgx/pull/3720"
    - label: "orgx #3722: hard suite, multi-judge scoring, loop v2 (private repo)"
      href: "https://github.com/hopeatina/orgx/pull/3722"
    - label: "orgx #3731: keep the draft that beats the reference (private repo)"
      href: "https://github.com/hopeatina/orgx/pull/3731"
    - label: "orgx #3728: credits checkout as a dollar balance with fee and receipt (private repo)"
      href: "https://github.com/hopeatina/orgx/pull/3728"
    - label: "useorgx/skills #28: remove unnecessary approval and workflow gates"
      href: "https://github.com/useorgx/skills/pull/28"
---

## The baseline

Yesterday's receipt was about a class of run nobody counted. Today's is about a cost nobody had priced. OrgX bills agent work by the credit, at 1 credit = 2¢. The open question has been whether a cheap open model inside the harness (workspace facts, voice, brand pack, quality bar, a revise loop) can do what a frontier model does, and what it costs to find out.

Before last night there was no number. #3720 merged the harness: five arms from open raw to frontier + OrgX as the pinned reference, a judge from outside every family under test, and a budget cap read from OpenRouter usage. #3722 made it hard: 8 tasks, severity-weighted rubrics, 32 hidden tests per engineering task, and two judges that both have to pass a criterion.

## What ran

Three dispatches of the hard suite, all today. Every score and dollar below is read from the `FRONTIER_GAP_ROW` and `FRONTIER_GAP_META` lines of those runs; the per-arm means are mine.

**Run 39721791606** (82 minutes, $17.97 of a $38 cap, 16 rows per arm):

| Arm | Model | Mean score | Model cost | Judge cost |
| --- | --- | --- | --- | --- |
| open raw | DeepSeek V4 Flash | 29.6 | $0.05 | $1.03 |
| open + OrgX | DeepSeek V4 Flash | 64.3 | $0.02 | $1.65 |
| open + OrgX + loop | DeepSeek V4 Flash | 63.8 (2 of 16 finished) | $0.21 | $0.30 |
| frontier raw | GPT-6.1-sol | 54.9 | $0.34 | $1.31 |
| frontier + OrgX | GPT-6.1-sol | 95.5 | $0.47 | $1.66 |
| frontier raw | Claude Fable 5.1 | 52.6 | $3.58 | $1.34 |
| frontier + OrgX | Claude Fable 5.1 | 39.1 | $4.48 | $0.60 |

The harness moved the cheap model 34.7 points for about two cents of model spend, and moved the frontier model 40.6 points. The gap that remains after the harness is 31 points. Judging the cheap arm cost 79 times what running it cost. Across the run, judges were $7.90 of $17.97.

**Run 39731135926** (main, 70 minutes, $5.16 of $7, product-writing tasks only): one-shot DeepSeek + OrgX 77.5 at $0.007, GPT-6.1-sol + OrgX 95.7 at $0.084, Fable + OrgX 87.3 at $1.134. The loop timed out on 4 of 4 rows. Judges were 56% of spend.

**Run 39743091500** (98 minutes, $4.32 of $5): the loop finished 6 of 8 rows and reached 79.8, six points over one-shot DeepSeek + OrgX at 73.8, for $0.651 against $0.011 and 381 seconds per row against 148. One-shot GPT-6.1-sol + OrgX reached 91.7 at $0.258 in 58 seconds. Judges were 78% of spend.

So the loop as built costs more than the frontier one-shot and scores 12 points lower. #3731 ranks kept drafts by the reference comparison instead of the self-check, and a timed-out round now ends the loop with the best draft instead of failing the row. Its live check was dispatched at 13:44 UTC and had not finished when this was written.

The same morning, #3728 changed what a credit costs to buy: dollar top-ups from $10 to $1,000 with a 5.5% fee (minimum $0.80) shown before Pay, where the old packs charged about 2.9 times usage. It also found purchases summed over all time while usage reset every 30 days, so purchased credits refilled every period. 340 specs pass. Live Stripe is unverified.

## What I withheld and why

Reproducible is withheld. No two runs used the same arm set or budget cap, and the loop arm never completed a full matrix. The workflow is rerunnable; the result is not yet.

External is withheld. Nobody outside the repo has read these runs.

Measured is claimed with limits. I did not open a single model output. The Fable arm's zero-section result reads like a format mismatch with the section parser, and that is a guess until someone reads one. The 68.8 figure is from #3731's body, not my aggregation. The Proof here is the bill: the harness now reports what it spent to say what it knows.

## Tomorrow's test

Read run 39789559129 when it finishes. If keep-best reports a kept round other than 1 on the agency campaign and the loop completes 8 of 8 rows, #3731 did what it says. If the loop's judged score still sits under one-shot DeepSeek + OrgX, the loop is not worth 59 times the model cost and should be cut from the harness, not tuned. Separately: one real $10 top-up through the new checkout, then check that the Stripe invoice exists and that the first period close writes a `topup_burn` row.
