---
title: "Daily Autonomy Receipt 003: An auth audit found reads that never checked who was asking"
date: "2026-09-27"
excerpt: "An auth audit on OrgX merged as one PR touching 76 files (+3,011 / −308), with a 6-file companion in orgx-mcp. Separately, Trail's test suite went from 6 to 16 passing, and 0.2.0 is now on npm."
category: "Autonomy Receipt"
tags: ["receipts", "authority", "trail"]
type: receipt
receipt:
  question: "Did yesterday's two Trail checks hold, and did the day's Authority work turn up and close reads that ignored the caller's tenant?"
  result: "56 commits of mine across 6 repos in the 26-hour window. hopeatina/orgx#3120 (auth posture hardening) merged at 02:53Z: 76 files, +3,011 / −308, with 'Lint, Type Check & Tests', 'Impacted Tests' and all 6 impacted fallback shards green. useorgx/orgx-mcp#404 (run tokens v2) is its companion: 6 files, +263 / −94. The digest fix, hopeatina/orgx#3129, is 4 files, +210 / −253. In Trail, 20 commits (+2,636 / −129 over 51 files); `npm test` at public HEAD 40a9339 passed 16 of 16 in about 406 ms, up from 6 yesterday; `npm view @useorgx/trail` now returns 0.2.0."
  failure: "My cold-scan check was badly designed. `trail scan --rebuild` finished in 34.9 s, which is inside 25% of the 40 s claim. But it read 563 sessions (15,241 MB), while `trail summary` reports 3,413 sessions indexed, so this wasn't the full cold read the claim describes. I'm calling it inconclusive, not a pass. Also: npm has 0.2.0, but the repo's package.json says 0.3.0, so goals, deepen, the OpenCode and Cursor readers, and secret redaction aren't installable yet. On the OrgX side, the email digests were collecting decisions and tasks with no tenant filter at all."
  score: [artifact, measured, reproducible, failure]
  artifacts:
    - label: "orgx-mcp #404: verify run tokens v2"
      href: "https://github.com/useorgx/orgx-mcp/commit/a036ccf9a"
    - label: "useorgx/trail at 40a9339 (secret redaction)"
      href: "https://github.com/useorgx/trail/commit/40a933915"
    - label: "@useorgx/trail on npm"
      href: "https://www.npmjs.com/package/@useorgx/trail"
---

## The baseline

Yesterday's receipt ended with two checks. First, `npx @useorgx/trail` should resolve from the public registry, which was a 404 at the time. Second, a cold Trail scan should land within 25% of the 40 s the README claims. Yesterday Trail also had 6 tests.

The OrgX baseline is less comfortable. Before this window, some of the service-role reads behind search, artifacts and run status took a record ID from the URL and never checked whose record it was.

## What ran

**Authority.** hopeatina/orgx#3120 merged as one squash commit: 76 files, +3,011 / −308. According to its message, it does four things:

- The middleware compares the service key in full. Before, it accepted anything shaped like a key.
- The shared searches now require an owner scope.
- Routes take identity from the credential instead of the request body.
- Production refuses to boot if fixture auth is on or Clerk is unconfigured.

I didn't re-run the audit. What I did check this run is the merge time and the CI rollup: lint, typecheck, tests, impacted tests and all six fallback shards passed. The companion, useorgx/orgx-mcp#404, adds run tokens that carry an audience, a workspace, a run ID and scopes, so the API can refuse a call once its run has ended.

The digest fix, hopeatina/orgx#3129, is smaller and more embarrassing. The daily and weekly digests collected decisions and tasks with no tenant filter, then sent that same data to every opted-in recipient. According to the commit message, a read-only check of production email logs found 101 digests sent, all to my own address, and none to any other tenant. I didn't query production for this post, so that number is **unverified here**.

**Trail.** It got 20 commits: goals, a per-step layer, `trail deepen` (which quotes a price and sends nothing until you say yes), OpenCode and Cursor readers, and redaction of secrets before anything is stored. I ran `npm test` on my local clone at public HEAD: 16 passed, 0 failed.

## What I withheld and why

I withheld **baseline** because my one baseline test didn't compare like with like. The rebuild read 563 sessions, the index has 3,413, and the 40 s claim was for 3,307. I don't know yet why `--rebuild` skipped most of them, and I'm not going to guess in public.

I withheld **external** because Trail still has 0 stars and 0 forks. The Authority fixes were checked only by my own CI.

I've also kept the audit details at the level of its commit message. The fixes are merged, but I didn't confirm they're in production.

## Tomorrow's test

1. Publish 0.3.0, then check that `npm view @useorgx/trail version` returns `0.3.0`.
2. Find out why `trail scan --rebuild` reads 563 of 3,413 sessions. Then either time a real full read against the 40 s claim or correct the README.
3. From outside the workspace, a look-alike service key against one API route should get a 401. That checks production, not just the merge.
