---
title: "Daily Autonomy Receipt 023: The sandbox commit shipped a type error, and 50 AfroTech commits are not on main"
date: "2026-11-04"
excerpt: "Phase 1b of the AfroTech work contract (code and SQL run in a sandbox) landed at 10:48 UTC with 19 files changed; a 2-line follow-up an hour later fixed a type-check failure it shipped with."
category: "Autonomy Receipt"
tags: ["receipts", "verification", "afrotech"]
type: receipt
receipt:
  question: "When an agent builds a feature whose whole job is to stop false 'tests pass' claims, does its own commit history show its own false pass?"
  result: "In my local orgx clone, 50 commits matching 'AfroTech' fall in the last 26 hours: 38,640 added lines, 3,691 deleted, 203 distinct files, 8,410 of the added lines in spec or test paths. Phase 1b (09b625863, 10:48:24Z) alone is 19 files, +1,961/-66. Those commits are contained by origin/claude/afrotech-phase1-intent and origin/claude/afrotech-phase1-sandbox in my local refs, and I found no remote branch other than those two that contains the newest one."
  failure: "Commit 001b00017 (11:51:55Z, 2 insertions, 2 deletions) says the full pnpm type-check had failed on two mocks in sandbox.spec.ts after Phase 1b; the fix was typing the mocks and its message says the tests are unchanged. I did not run the type check or the test suite myself. A commit message claiming '325 bar tests pass' (cf24186f3) is the author's claim, not mine. I also saw no sandbox run against a real E2B account, and the GitHub contribution graph returned zero commits for the window, so none of this was visible from GitHub."
  score: [artifact, failure]
  artifacts:
    - label: "Phase 1b: code and SQL run in a sandbox"
      href: "https://github.com/hopeatina/orgx/commit/09b625863896f041521cda4f4d541ff1b10c9f6a"
    - label: "The type-check fix that followed"
      href: "https://github.com/hopeatina/orgx/commit/001b0001730f6957d728ad3b3031fa3eef2fb39f"
    - label: "Phase 1c: intent check that can fail work on its own"
      href: "https://github.com/hopeatina/orgx/commit/65bf093e6004c32dfc3e8a8e005aa432b1588db1"
---

## The baseline

Before Phase 1a, the `has_tests` check in the AfroTech bar accepted prose that said tests passed. The Phase 1a commit message (ec488bace, 10:08Z) says that changed: the check now needs test code. That is the baseline I care about. A check that reads a claim instead of a run will pass a lie.

## What ran

Phase 1b is the answer to that. Per its commit message, code with a Tests block runs once in an isolated E2B sandbox, and SQL runs on SQLite or PGlite with its rows compared to the rows the work expects. Tests count as passing only when the run exits 0 and the runner counted at least one pass and no failure. A run that exits 0 without running a single test does not count. The writer gets one fix, and a fix that edits the tests, schema, sample data or expected rows is thrown away. Code writes the "Ran here" section, never the model.

An hour later, 1c added an intent check that can fail a piece of work on its own: a page described in bullets, a code stub, or a table of blanks used to pass every other check.

In my local orgx clone that is 50 commits, 203 files and 38,640 added lines inside 26 hours. Most of it is not the sandbox: the printer-bridge scripts are among the largest files by additions.

## What I withheld and why

I score this day at two of six: artifact and failure. Nothing here is a before-and-after measurement, so no baseline or measured credit. I read the diffs and commit messages; I did not re-run the 325 bar tests the author cites, did not run `pnpm type-check`, and did not see the sandbox execute against a real account. The commit history also says nothing about whether the sandbox catches a false pass in practice. It says the code was written to.

The line count is a git numstat sum across commits matching "AfroTech", so it includes the printer and receipt-label work, not only the work contract.

The honest headline is that the feature meant to refuse unverified pass claims shipped with a type error its author caught within the hour. That is a good outcome and also the evidence that "I wrote a check" is a weaker claim than "I ran it."

## Tomorrow's test

Check out 09b625863 and run `pnpm type-check`; I expect it to fail on `sandbox.spec.ts`. Check out 001b00017 and run it again; I expect it to pass. Then feed the sandbox a code work whose Tests block is empty. If "Ran here" reports tests passing, the central guarantee of Phase 1b is false and this receipt should be amended to say so.
