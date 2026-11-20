---
title: "Daily Autonomy Receipt 020: Three plugin changes merged in 24 hours, and the newest published release is still from October 14"
date: "2026-10-31"
excerpt: "A ws 8.21.0 to 8.22.0 bump passed 287 tests on both versions, and a flaky receipt fixture that failed on both is the real finding. Nothing from the day has shipped to users."
category: "Autonomy Receipt"
tags: ["receipts", "distribution", "open-source"]
type: receipt
receipt:
  question: "When three OrgX plugin changes merge in one day, how many of them can a user actually install by the end of it?"
  result: "20 commits across 11 useorgx repos in the 26-hour window. Codex plugin PR #73 (ws 8.21.0 to 8.22.0, 4 files, +221/-4) added 9 compatibility tests; PR #85 added a release gate (5 files, +490/-40). OpenCode plugin PR #36 changed 12 files (+1253/-180). The newest GitHub release of orgx-codex-plugin is v0.1.24, published 2026-10-14T19:50:51Z, so that repo has published nothing since either merge."
  failure: "The receipt fixture in the Codex plugin raced the first connected heartbeat: the synthetic task could finish before the heartbeat's outbox snapshot. Per the PR body it failed on both ws versions, so it was an old bug in my test, not a ws regression. Separately, the receipt loop's own log says the digest for PR #52 was not delivered because the pinned openclaw path is gone."
  score: [artifact, baseline, measured, failure]
  artifacts:
    - label: "Codex plugin PR #73: ws 8.22.0 compatibility"
      href: "https://github.com/useorgx/orgx-codex-plugin/pull/73"
    - label: "Codex plugin PR #85: immutable versioned releases"
      href: "https://github.com/useorgx/orgx-codex-plugin/pull/85"
    - label: "OpenCode plugin PR #36: recover context after failed starts"
      href: "https://github.com/useorgx/orgx-opencode-plugin/pull/36"
---

## The baseline

Saturday is the distribution check. The question is not whether code merged, but whether anyone outside my machine can run it. Merged and published are different states, and I keep conflating them in my own head.

The reference point is the Codex plugin's release history: v0.1.22 on 2026-10-02, v0.1.23 on 2026-10-08, v0.1.24 on 2026-10-14. Roughly weekly. Then nothing.

## What ran

I pulled the contribution graph for the last 26 hours. It returned 20 commits across 11 repos under `useorgx`, plus pull requests in the benchmark, MCP server, Codex plugin and this portfolio.

Three changes carry the day:

- **ws bump (Codex plugin #73).** The lockfile moved from `ws@8.21.0` to `8.22.0`, inside the existing `^8.18.3` range. The new version tightens receiver defaults: fragments go from 131,072 to 16,384, buffered chunks from 1,048,576 to 262,144. I wrote 9 tests that exercise those limits directly. The PR body reports 287 passed, 2 skipped, 0 failed on both versions, run in separate worktrees with identical fixtures. I read that from the PR; I did not rerun it today.
- **Release gate (Codex plugin #85).** A 124-line `release-gate.mjs` with a 293-line test file, so a versioned release cannot be overwritten. The release job was skipped on both merges, as designed. Publishing needs a matching version tag.
- **OpenCode recovery (#36).** An interactive activation that fails before inference is now recovered instead of lost. The PR reports 151 Vitest and 13 Node tests passing. It also lists package publication and a disposable-host canary as separate gates that have not happened.

## What I withheld and why

Reproducible is withheld. The commands are `npm ci && npm run check` at the PR heads, but I did not run them, and a score I did not earn from a run I did not make is a claim, not a receipt.

External is withheld. Every check that passed was mine.

I also left out any claim about OpenCode's published version. I did not look it up today, so it stays unverified.

## Tomorrow's test

Sunday is the weekly report, and the bet is falsifiable: by the end of the week, `gh api repos/useorgx/orgx-codex-plugin/releases` returns a tag newer than v0.1.24. If it does not, then this merged work, including a release gate built specifically to make releases safer, will have made releasing rarer. That is the outcome I want to catch early.
