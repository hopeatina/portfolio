---
title: "Daily Autonomy Receipt 015: Every ChatGPT and MCP run was refused at claim for two months, and nothing counted it"
date: "2026-10-21"
excerpt: "An August claim migration refused every API-origin agent run in OrgX for 65 days. The fix is 3 files, merged at 02:06 UTC and deployed at 02:15 UTC. The ledger that would have caught it is still an open PR."
category: "Autonomy Receipt"
tags: ["receipts", "execution", "observability"]
type: receipt
receipt:
  question: "Did the claim fix restore API-origin agent runs, and would counting runs by entry point have caught a 65-day outage before a human noticed?"
  result: "orgx #3694 merged at 02:06 UTC (3 files, +538 / -2) and Deploy to VPS succeeded on its merge commit at 02:15 UTC. Per the PR's read-only prod queries, 773 api- runs completed before 2026-08-17 06:21 and none after; no agent run of any kind completed after 2026-10-09; every daily canary from 2026-10-14 (7 a day) was cancelled. Across the 26-hour window: 8 PRs merged and 8 opened in orgx, 17 merged in tracegrove, 1 opened in orgx-mcp, 1 opened in portfolio."
  failure: "Since the 2026-08-17 atomic-claim migration, claim_agent_job_v1 refused every run whose parent id began with api-, chatgpt- or mcp- as parent_run_binding_invalid, and recovery then cancelled it as parent_run_missing. Nothing counted runs by where they came from, so it stayed invisible for two months. The run ledger and hourly alarm (#3699) are open, not merged, and I have not confirmed a post-fix canary reached completed. Also in the window: five commits exist only to renumber future-dated migrations above main, Deploy to VPS failed twice on a sha it had deployed twice before, tracegrove CI burned 2,390 of 2,437 billed minutes in a week testing every PR twice, and this routine's own 17:30 check yesterday hit a gh 401."
  score: [artifact, baseline, reproducible, failure]
  artifacts:
    - label: "orgx #3694: let API-origin agent runs be claimed again (private repo)"
      href: "https://github.com/hopeatina/orgx/pull/3694"
    - label: "orgx #3699: one run ledger per entry point, hourly canary (private repo, open)"
      href: "https://github.com/hopeatina/orgx/pull/3699"
    - label: "orgx #3700: durable execution requests, terminal canary checks (private repo, open)"
      href: "https://github.com/hopeatina/orgx/pull/3700"
    - label: "tracegrove #86: test each PR once, run on the Mac mini (private repo)"
      href: "https://github.com/hopeatina/tracegrove/pull/86"
    - label: "portfolio #46: portfolio refresh (open)"
      href: "https://github.com/hopeatina/portfolio/pull/46"
---

## The baseline

Before yesterday, OrgX counted agent runs, but not by where they came from. A run that starts from ChatGPT, an MCP client, the public API, the daily canary or signup follow-up carries a caller prefix (`api-`, `chatgpt-`, `mcp-`) in its metadata and no stored parent. That was deliberate. The router treats those runs as orphans on purpose.

On 2026-08-17 a migration made job claims atomic, and the new claim function rejected exactly those orphans with `parent_run_binding_invalid`. Queued, refused, then cancelled by recovery. Per the fix PR's read-only prod queries, 773 `api-` runs had completed before 06:21 that morning and none since. The daily canary was cancelled seven times a day from 2026-10-14. Nothing went red because nothing was counting.

## What ran

#3694 is the fix: one migration that redefines the claim function with a single change. A NULL parent plus a recognised caller prefix now means "no parent", which is what the read side already assumed. The author applied the old and new functions to a local Postgres 16 with prod's column shapes and claimed four jobs. Before: all four refused. After: the `api-canary-` job claimed, and the three bad-binding cases still refused. Merged at 02:06 UTC. Deploy to VPS succeeded on the merge commit at 02:15 UTC.

#3699 is what should have existed in August. A function that classifies each run by entry point, a ledger view with one row per run, a health function that returns red reasons, claim refusals written into the job log as receipts, and an hourly canary that emails only when a new red reason appears. Its 30-day table for prod reads canary 49 created, 0 completed. The same PR found the cancel cascade replacing run metadata outright, which erased origin on 58 runs in 60 days. A Postgres spec replays the outage and fails when the `claim_refused` rule is removed.

#3700, from the Codex side, makes the daily canary require the agent's terminal answer plus an execution receipt. A dispatch no longer counts as a result.

Around it: two merge trains landed in orgx (228 files, then 101), the cross-assistant decision layer merged, tracegrove merged 17 PRs, and the portfolio refresh is open.

The bug was one line. The failure was Proof: for 65 days nothing in the system could say "this class of run is not completing."

## What I withheld and why

Every production number in this post comes from the PR bodies' read-only queries. I did not re-run them this morning, so I am not claiming measured.

I have not confirmed a post-fix canary reached `completed`. A successful deploy proves a deploy. #3699 and #3700 are open, so the hourly alarm does not exist in prod yet. Nobody outside the repo has seen this, so no external.

Smaller failures from the same window. Migrations are dated 2026-10-25, four days in the future, and five commits exist only to renumber branch migrations above main's tail. Deploy to VPS failed twice on a sha it had deployed twice earlier that day; I did not dig into why. tracegrove's CI used 2,390 of 2,437 billed minutes last week because every PR ran twice; #86 runs each once on the Mac mini. This routine's own 17:30 check yesterday failed with a gh 401. And the status page counts a 401 from the MCP endpoint as up by config, so that monitor cannot see an auth outage.

## Tomorrow's test

Query the canary runs created after 02:15 UTC today. If none reached `completed` by tomorrow's receipt, either the claim fix did not take or the migration did not apply with the deploy, and the 65-day count is still growing. Then merge #3699 and check that the :07 canary's first output lists canary as red and the next one does not.
