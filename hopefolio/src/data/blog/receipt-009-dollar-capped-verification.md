---
title: "Daily Autonomy Receipt 009: Verification runs stop at $5 of real spend, and nothing has priced one yet"
date: "2026-10-09"
excerpt: "OrgX's PR verification dropped its turn and time limits for a $5 default spend cap priced off the model that actually answered, every receipt now names its model and harness, and 20 repos got their CI actions pinned in 36 minutes. No run has been priced in production."
category: "Autonomy Receipt"
tags: ["receipts", "economics", "verification"]
type: receipt
receipt:
  question: "Can OrgX verify a pull request under a dollar cap instead of a turn or time limit, with the receipt naming who ran it, on what model, for how much?"
  result: "hopeatina/orgx #3373 merged 2026-10-08 17:16 UTC (+4042/-145, 50 files, 34 receipt-review tests passing, 16 new): turn and time limits removed, spend cap defaults to $5 per run, spend is priced from the pricing snapshot for the model actually served, a cap on a model OrgX can't price is refused, one live run per PR, stale runs released after 75 minutes, an hourly reconciler releases runs with no progress for 30 minutes. useorgx/orgx-mcp #483 (+202/-32, 11 files): an agent names its model once at orgx_bootstrap and every receipt that session inherits it. #490 (+61/-4, 3 files, 2,775 tests passed): the AI client's name rides on every tool executor call. Security sweep: 20 repos received a 'security: pin CI actions' commit between 21:19 and 21:55 UTC on 2026-10-08, 6 of them also patched dependencies; hopeatina/orgx #3389 alone was +8089/-3071 across 127 files, starting from 133 advisory hits and ending with 4 version-based alerts mitigated by local patches."
  failure: "The agree-on-done UI merged in two repos (hopeatina/orgx #3387, +3614/-61, 323 tests across 39 files; useorgx/orgx-mcp #484, +2650/-83, 2,754 tests passed) and nothing ever asked the app to draft a bar. Scaffold and launch created the hierarchy and launched without calling the expectations route, so every initiative scaffolded from ChatGPT or Claude started with nothing agreed and the widget showed only the caller's own suggestions. Caught 2026-10-09 and fixed in orgx-mcp #492, which is still open. Separately: no verification run has been priced under the new cap, the branch-protection and secret-push-protection settings in #3389 could not be changed because the settings API returned Forbidden, and the historical credentials it found still need rotation by their provider."
  score: [artifact, baseline, failure]
  artifacts:
    - label: "orgx-mcp #483: name the model once at bootstrap"
      href: "https://github.com/useorgx/orgx-mcp/pull/483"
    - label: "orgx-mcp #490: name the AI client on tool executor calls"
      href: "https://github.com/useorgx/orgx-mcp/pull/490"
    - label: "orgx-mcp #484: agree on what done means before work starts"
      href: "https://github.com/useorgx/orgx-mcp/pull/484"
    - label: "orgx-mcp #492: scaffold asks OrgX for the bar (open)"
      href: "https://github.com/useorgx/orgx-mcp/pull/492"
    - label: "orgx-mcp #485: the security sweep, public copy"
      href: "https://github.com/useorgx/orgx-mcp/pull/485"
---

## The baseline

Before yesterday, a verification run in OrgX was bounded the way most agent loops are bounded: by a turn count and a clock. Both are proxies. A run that burns 40 cheap turns and a run that burns 4 expensive ones look the same to a turn limit, and the thing I actually care about, how much of someone's money the agent spent checking a pull request, was never on the receipt.

Attribution had the same gap. Every `orgx_submit_receipt` call had to pass `model` by hand, and a decision settled in the ChatGPT widget reached OrgX with no idea which client it came from. You can't price what you can't attribute.

## What ran

**Spending is the only limit (hopeatina/orgx #3373, merged 17:16 UTC on the 8th).** The turn and time limits are gone. A run stops exploring when its spend cap is spent: $5 by default, settable per run, or no cap. Spend is priced from the pricing snapshot for the model the provider actually served, and if OrgX can't price that model, the cap is refused rather than guessed. The receipt's cost field is the real spend in USD. Stuck runs are handled by money and time together: one live run per PR, stale runs released after 75 minutes, and an hourly reconciler that releases anything with no progress for 30 minutes and records where it got to and what it spent. The keys follow the same logic. A workspace's own Anthropic key is always used when present, and the platform key is a per-run toggle that the admin page names as the payer.

**Attribution (useorgx/orgx-mcp #483 and #490).** An agent now names its model once at `orgx_bootstrap`, saved in both Durable Object storage and SQLite so it survives resets, and every receipt that session inherits it. The second change is 61 lines: the MCP handshake's `clientInfo.name` rides along on every tool executor call as `source_client`, trimmed to 60 characters. It grants nothing. It only lets a decision outcome be broken down by surface.

**The sweep.** Between 21:19 and 21:55 UTC, 20 repositories got a `security: pin CI actions` commit. Six also patched dependencies. The main app's copy (#3389) started from 133 advisory hits and ended at 4 version-based alerts covered by local patches to braces, extract-zip and node-forge, each with an exploit regression and a CI guard that fails if the patch declaration is removed. The 20-repo fan-out took 36 minutes. The audit that fed it did not, and I have no number for that part.

This is Proof work. A receipt that names its model, its harness, its client and its cost is one you can argue with.

## What I withheld and why

**Measured.** Every number above comes from a PR body or a diff stat. Nobody has run a verification under the $5 cap and read the cost off the receipt. The test counts are the agents' own, not mine.

**Reproducible.** The cap and the pricing snapshot live in the private app repo. The attribution and the sweep are public.

**External.** Nobody outside the project has run any of it.

The failure that matters is in the frontmatter: the agree-on-done feature shipped its widgets, its hold state, its six Playwright states at 375px, and 2,754 passing tests on the worker side, and no code path ever asked the app to draft the bar. Launch went straight through. The fix in #492 is 334 lines and is still open.

## Tomorrow's test

Start one verification run from `/admin/receipts` against a public PR with the default cap. Pass means: the run ends with a receipt whose cost is a dollar figure under $5.00, whose `Ran with` line names the served model id and `orgx-verify 1`, and whose `decision_resolved` event, if I settle it from the ChatGPT widget, carries `channel=host_widget` and the ChatGPT client name. If the receipt shows a turn count and no cost, this receipt's main claim fails.
