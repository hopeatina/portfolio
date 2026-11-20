---
title: "Daily Autonomy Receipt 014: I split my agent harness into arms, and the base arm moved five points on its own"
date: "2026-10-20"
excerpt: "Seven merged PRs turned the OrgX benchmark into a five-arm ablation. On the one task that discriminates, only the full harness improved across two CI runs (94.3, then 99.2), and the untouched base arm drifted from 89.6 to 84.6."
category: "Autonomy Receipt"
tags: ["receipts", "evals", "benchmarks"]
type: receipt
receipt:
  question: "If I switch OrgX's decisions, context, and skills layers on and off one at a time, does any single layer measurably beat a bare model on tasks where the right answer lives in org state?"
  result: "Seven PRs merged (orgx #3675 to #3681, +3,814 / -267 lines). Two five-arm CI runs on gpt-5.4-nano, 3 repeats per cell. On state-honor-architecture-decision: run 1 base 89.6, context 84.8, decisions 89.6, skills 89.6, full 94.3; run 2 base 84.6, context 84.7, decisions 84.9, skills 89.5, full 99.2. Full was the only arm whose binding-decision check failed fewer than 2 of 3 times in both runs (1, then 0). The refund and launch-facts tasks sat at 98 to 99 for almost every arm in both runs."
  failure: "The first arms run produced 40 of 40 invalid cells: the runner attached tool_search, which the API rejects for nano, plus a hosted MCP server that answered 424 without workspace auth. The context arm was identical to base until #3680 because CI has no database. Design agent picks were being validated away and silently routed to research. And the base arm moved 5.0 points between runs with no change to its path, which means a single layer's effect is still inside the noise."
  score: [artifact, baseline, measured, failure]
  artifacts:
    - label: "orgx #3676: per-component harness switch (private repo)"
      href: "https://github.com/hopeatina/orgx/pull/3676"
    - label: "orgx #3680: context arm gets the Goal Frame (private repo)"
      href: "https://github.com/hopeatina/orgx/pull/3680"
    - label: "orgx #3681: long-log task and log window (private repo)"
      href: "https://github.com/hopeatina/orgx/pull/3681"
---

## The baseline

Before yesterday, the OrgX benchmark could ask one question: does the full harness beat a single agent? Every acceptance criterion went through an LLM judge, and the only previous run scored 95 to 100 on 12 of 12 tasks. A benchmark that saturates can't tell you which layer is doing the work, so it can't tell you what to cut.

## What ran

The architecture decision is how to define a layer's uplift: that arm's score minus the base arm's score, on the same task and model, with seed data, the specialist pass, and the cleanup pass held fixed. `ORGX_BENCHMARK_COMPONENTS` now picks the arm (`none`, `decisions`, `context`, `skills`, or all of them), and each result records which arm produced it.

Two things had to come first. Criteria can now carry exact regex checks that score 100 or 0, so a fluent wrong answer stops earning keyword credit. And four tier 3 tasks put the right answer in a seeded workspace log, behind superseded decisions, stale drafts, and one 124-entry log with a revert hidden in it.

Then the CI runs, nano, 3 repeats per cell. The architecture task was the only one that discriminated. Full went from 94.3 to 99.2 and was the only arm to pass the binding-decision check in all three repeats of the second run. Context alone scored 84.8 on the first run, below base. On the 124-entry log, every arm got all ten packaging values right. Only the judged quality score moved (base 93.6, context 96.9).

Building it also turned up a bug outside the benchmark. A labeled correctness eval found `post_slack_message` being auto-approved as low risk in gated and autopilot modes. That's an Authority bug in production code, and it's fixed now.

## What I withheld and why

I'm not claiming any single layer helps. Base drifted 5.0 points between runs, and none of its inputs had changed. With 3 repeats per cell, that drift is as big as every single-layer delta I measured. The combined effect (full beats base by 4.7, then 14.6) is the only result that held up across both runs, and two runs is a small sample.

The context arm gets supersession links from annotations in the log. So it measures the Goal Frame given correct links, not OrgX working out the links on its own. The correctness labels were written by an agent and no human has reviewed them yet. I'm leaving out reproducible and external: the repo is private, and nobody outside it has run this.

## Tomorrow's test

Run the log window (`log_window_days`) so the prompts only see recent entries while the context arm still builds its Goal Frame from the full log. If context doesn't beat base by more than the 5-point drift I saw today, then on nano the context layer isn't earning its tokens yet.
