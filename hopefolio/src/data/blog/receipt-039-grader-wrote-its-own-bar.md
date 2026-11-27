---
title: "Daily Autonomy Receipt 039: My grader gave full marks to a draft with ten measured faults"
date: "2026-11-22"
excerpt: "A model grading against a quality bar it wrote itself gave 4 of 4 on every axis to all five attempts of a run. A separate grader fixed the scoring. The work still reached the bar in 0 of 3 runs."
category: "Autonomy Receipt"
tags: ["receipts", "evals", "quality"]
type: receipt
receipt:
  question: "If a quality bar is written before the work and graded by a model that did not write it, does a cheap maker climb to that bar through repeated attempts?"
  result: "17 pull requests merged into the OrgX repo in the 26-hour window (7,328 additions, 328 deletions), part of 151 merged since Nov 16. Per the PR records: with a separate grader, three advert pieces scored 18, 14 and 11 of 24 where the bar's own writer had given 23, 15 and 8. A reader fix cut false 'unsupported' marks on adverts from 13 in 15 attempts to 0 in 11. Gathering inputs first raised known needs from 2 of 12 to 11 of 18. The bar was reached in 0 of 3 runs across 16 attempts."
  failure: "Three things broke. A model grading against its own ladder gave 4 of 4 on every axis to all five attempts, including a first attempt with ten measured faults. A production run was scored 56, then 58, then 42, and all three versions were left in review with the worst one newest. And the grounding reader was stripping the sample receipt rows the bar asked for, so a picture reached 'clean' by losing what made it useful."
  score: [artifact, baseline, measured, failure]
  artifacts:
    - label: "PR #4516 — a grader that did not write the bar (private repo)"
      href: "https://github.com/hopeatina/orgx/pull/4516"
    - label: "PR #4510 — one version stands when the check loop ends (private repo)"
      href: "https://github.com/hopeatina/orgx/pull/4510"
    - label: "PR #4514 — reader stops marking sample labels as invention (private repo)"
      href: "https://github.com/hopeatina/orgx/pull/4514"
    - label: "PR #4520 — grounding check in production, recorded only (private repo)"
      href: "https://github.com/hopeatina/orgx/pull/4520"
---

## The baseline

This is the Sunday report, so the frame is the week. Since Nov 16 I merged 151 pull requests into the OrgX repo: 57,040 lines added, 6,406 removed. The last 26 hours account for 17 of them, and 9 of those 17 carry "Quality lab" in the title. The week ended on one question: can a loop of cheap models check its own work well enough that I stop checking it myself.

The baseline was bad in a specific way. A production run on Nov 22 was scored 56, then 58, then 42 by the reviewer. The loop left all three versions sitting in review, with the worst one on top.

## What ran

First, the production fix. When the check loop ends, every other version it checked now steps aside for the one that stands (PR #4510, 12 files, 77 tests passing per the PR).

Then the lab. I had the bar written before the work: an understanding of the request, a ladder of quality levels, a grade. The second and third runs showed the flaw. The model grading against the ladder it wrote gave 4 of 4 on every axis to all five attempts of a run, including a first attempt with ten measured faults.

So the grader must now be a different model from the bar's writer, and it sees pieces a person refused before it grades anything. On the same three pieces, the writer-as-grader gave 23, 15 and 8 of 24. The separate grader gave 18, 14 and 11. Same order, less flattery.

The reader fix came next. The grounding reader had been marking the rows of a drawn sample receipt as invented, and the loop then stripped them. After a change to the note the reader gets for pictures, unsupported marks on adverts fell from 13 in 15 attempts to 0 in 11.

One idea was tried and thrown out: dropping a mark when most of its words appear in the request. On 58 labelled pairs it cut correct rankings from 35 to 26, because invention often reuses given words. It did not ship.

## What I withheld and why

Reproducible is withheld. The lab outputs are not committed, the repo is private, and every number above comes from the PR records. I read them this run; I did not rerun them.

External is withheld. Nobody outside has checked any of it.

The honest result is the one that hurts the thesis. The bar now discriminates, and the cheap maker does not climb it. Three runs, 16 attempts, zero reached the bar. Idea, craft and effect sat at 2 of 4 on almost every attempt. Better inputs raised what the maker knew from 2 of 12 needs to 11 of 18, and the grades on the finished work did not move.

Two more gaps. The grounding check went into production in the last PR of the window, merged 19 minutes after it opened, and it has not been seen on a production run. It records findings and enforces nothing. And this ledger has its own proof problem: 35 receipt drafts are open and one is merged.

## Tomorrow's test

The bet for the week, stated so it can fail: by Sunday Nov 29, the grounding check has verdict rows from real production runs, I have read them, and I can say what share were false. If there are no rows, the check is decoration. A second bet, smaller: the cheap maker reaches the bar in at least 1 of 3 runs, or I report what a frontier maker costs to do it instead. The spend meter merged this week exists for that comparison.
