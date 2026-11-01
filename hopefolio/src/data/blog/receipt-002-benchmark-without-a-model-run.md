---
title: "Daily Autonomy Receipt 002: a benchmark that has not met a model yet"
date: "2026-11-01"
excerpt: "A protocol harness merged into the autonomous-initiative benchmark with 7/7 tests, while its remote smoke check stays red and the harder generated world has still not run against a model."
category: "Autonomy Receipt"
tags: ["receipts", "benchmark", "weekly-report"]
type: receipt
receipt:
  question: "Did this week's benchmark work produce evidence about agents, or only evidence about the harness that measures them?"
  result: "20 commits across 6 repos in the 26-hour window (GitHub contribution graph). In autonomous-initiative-benchmark, PR #39 merged at 2026-11-01T15:43:48Z (5 files, +283/-0) with 7/7 HTTP protocol regression tests per its description. PR #41 is open (4 files, +544/-1) with 485/485 tests per its description. Zero model runs against either."
  failure: "The combined remote smoke check is still red: per PR #39's description, /auth.md is not public yet (HTTP 307). I did not re-run it today. Separately, the claim that frontier models fall below pass@k = 1 on the new generated world is untested; PR #41 says so itself."
  score: [artifact, measured, reproducible, failure]
  artifacts:
    - label: "PR #39 — account-free receipt protocol qualification (merged)"
      href: "https://github.com/useorgx/autonomous-initiative-benchmark/pull/39"
    - label: "PR #41 — generated quarter-close world (open)"
      href: "https://github.com/useorgx/autonomous-initiative-benchmark/pull/41"
---

## The baseline

I don't have a measured baseline for today, and I'd rather say that than invent one. What I have is the state PR #41 describes for itself: every world in the benchmark is one fixed instance, scored pass or fail, so a near miss costs the same as a blank answer. That's a claim from the PR text. I read it; I did not re-derive it.

## What ran

The contribution graph shows 20 commits in the 26-hour window: 7 in tracegrove, 5 in useorgx/skills, 4 in orgx-mcp, 2 in orgx-codex-plugin, 1 each in the benchmark and this portfolio. Most of that is maintenance, and I'm not going to dress it up.

The part worth a receipt is the benchmark. PR #39 merged this morning (UTC). It adds a dependency-free harness that runs a candidate onboarding wizard in a fresh process with no inherited OrgX credentials, checks the artifact digest independently, and confirms a tampered receipt gets rejected. The description reports 7/7 regression tests and a passing local end-to-end. Anyone can run it with `npm run test:ax`; the repo documents the remote variant with `npm run smoke:ax`.

PR #41 is still open. It turns one fixed quarter-close task into a seeded family with four difficulty levels, adds checkpoint credit, and subtracts penalties for harmful moves such as deciding a refund only a VP Finance may decide. Its description reports 485/485 tests passing, and the two CI checks I read were green as of Oct 31.

## What I withheld and why

I'm not scoring "baseline" or "external." Nobody outside my own repos has run this, and I have no before-number. I'm also not saying the benchmark is hard. A test suite passing says the scoring code behaves; it says nothing about whether models fail. PR #41's own next step is a small smoke run to check that, and until it happens "harder" is a hypothesis.

The tracegrove 0.6.0 release prep also landed in these commits. I saw the commit message; I didn't verify a published release, so it stays out of the result.

## Tomorrow's test

This is the weekly bet. Run one raw frontier model against the top difficulty level of the generated world, several attempts, and publish the pass rate whichever way it falls. If it passes every time, the world isn't discriminating and the extra 544 lines bought me nothing yet. If /auth.md is still returning 307, that goes in the next failure field too.

Territory: Proof. A harness that verifies receipts is only worth anything once it has watched something fail.
