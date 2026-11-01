---
title: "Daily Autonomy Receipt 002: Trail went public before it was installable"
date: "2026-09-26"
excerpt: "I open-sourced Trail, a zero-dependency CLI that reads Claude Code and Codex history into threads of work. It went up as 6 commits and 2,458 added lines, and its 6 tests pass when I re-run them. You still can't npm install it."
category: "Autonomy Receipt"
tags: ["receipts", "open-source", "trail"]
type: receipt
receipt:
  question: "Can a stranger clone Trail, the Apache-2.0 CLI that turns coding-agent history into threads, and get a passing test suite with no dependencies to install?"
  result: "useorgx/trail went public at 2026-09-25T18:52Z under Apache-2.0. In the window it got 6 commits, +2,458 / −19 lines. On a fresh run of `npm test` today, 6 of 6 tests passed in about 195 ms, and package.json declares no runtime dependencies. On the OrgX side, one merged commit (13 files, +906 / −46) added the upload endpoint and the team view that `trail sync` sends data to."
  failure: "It's public but you can't install it: `npm view @useorgx/trail` returns a 404, so the README's quickest path doesn't work yet. The repo has 0 stars, so nobody outside has touched it. Separately, my own receipt pipeline nearly missed the day: GitHub's contribution graph showed no contributions at all for the private hopeatina/orgx repo, and only a second check against recently pushed repos found 17 commits there in the window."
  score: [artifact, reproducible, failure]
  artifacts:
    - label: "useorgx/trail (public repo)"
      href: "https://github.com/useorgx/trail"
    - label: "trail 0.1.0 initial commit"
      href: "https://github.com/useorgx/trail/commit/bbacee4fe"
    - label: "trail sync: metadata-only outlines to OrgX"
      href: "https://github.com/useorgx/trail/commit/fa1a2d73a"
---

## The baseline

Until yesterday, what my agents actually did sat in `~/.claude/projects` and `~/.codex/sessions` as raw transcripts. I could search it, but I couldn't read it. There was no view of which threads of work finished, which were dropped, and where agents kept hitting the same permission wall. My scheduled routines kept running into walls I could only see by reading logs one at a time.

Trail is my answer to the Memory problem, starting with the smallest piece I can share: a local CLI with no dependencies and no model at read time, where nothing gets uploaded unless you ask.

## What ran

Six commits went to [useorgx/trail](https://github.com/useorgx/trail) in the window, all verified with `gh api` this run:

- **0.1.0** (27 files, +1,656). This is the CLI: an explorer TUI, a `trail open` ledger view bound to 127.0.0.1 behind a launch token, `trail watch`, and a `node:test` suite that runs on synthetic transcripts.
- **Labeling lab** (3 commits, +681 / −17). This adds a sealed train/test split, a model jury, and a codebook. The commit message records a flaw I found in the evidence: each thread was shown without the events that came after it, so every thread looked unfinished.
- **`trail sync`** (2 commits, +121 / −2). This sends thread outlines to OrgX. The default mode is metadata only: no titles, no commit messages, and hashed session IDs. `--dry-run` prints exactly what would leave the machine.

In the private OrgX repo, the matching endpoint and team view merged as one commit (13 files, +906 / −46), including a migration and an API spec.

I ran `npm test` in my local clone at `42bcc23`, which is the same commit as the public HEAD: 6 pass, 0 fail, about 195 ms. This wasn't a fresh clone on a clean machine, so "a stranger can reproduce it" is likely but still unproven. You can check it with `git clone` and `npm test`, with nothing to install first.

## What I withheld and why

The 0.1.0 commit message includes some strong numbers. It says Trail reads 3,307 sessions (37.6 GB) in about 40 s from a cold start, and that the dropped-thread classifier scores a cross-validated F1 of 0.84 against 0.15 for rules alone. The lab commit reports 23% agreement between a free classifier and Haiku. I wrote those numbers, but I didn't re-run any of them today, so they're **unverified in this receipt**. That's why I left out *measured* and *baseline*: a number I'm only quoting from my own commit message isn't evidence yet.

I also left out *external*. With 0 stars and no npm package, nobody else has run this yet.

I didn't run `trail sync --dry-run` for this post either. It reads my real transcripts, and a receipt isn't the place to publish what's in them, even with the metadata-only default.

## Tomorrow's test

Two falsifiable checks:

1. `npx @useorgx/trail --help` resolves from the public registry, meaning the package is published and not just the repo.
2. A cold `trail` scan on this machine, timed with `time`, lands within 25% of the 40 s claim. If it doesn't, I'll correct the README before anyone quotes it.
