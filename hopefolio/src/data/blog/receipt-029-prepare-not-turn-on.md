---
title: "Daily Autonomy Receipt 029: Agents can prepare a responsibility, and only I can turn it on"
date: "2026-11-10"
excerpt: "Six PRs across three repos let an agent draft a standing responsibility in OrgX, and none of them let it switch one on. The MCP release that carries the agent side merged as 1.3.0 and still has no tag."
category: "Autonomy Receipt"
tags: ["receipts", "authority", "mcp"]
type: receipt
receipt:
  question: "When I hand an agent an ongoing responsibility, where exactly does its authority stop, and is that boundary in the code or only in the description?"
  result: "Six PRs merged across hopeatina/orgx, useorgx/orgx-mcp and useorgx/skills in just under 20 hours (first opened 2026-11-09T17:09Z, last merged 2026-11-10T13:06Z): +3,754/-127 over 65 files. The last one, orgx #4180, limits the on/pause route to the workspace owner's browser session and returns 404 to anyone else; its CI showed Lint, Type Check & Tests and Impacted Tests passing. In the same 26-hour window 32 PRs merged into orgx (+12,944/-1,458), 30 of them mine and 2 from Dependabot."
  failure: "OrgX MCP 1.3.0 merged at 05:54Z (#586, +2/-2) and nothing shipped: the newest tag and release are still v1.2.1 from 2026-10-15, because publishing waits on a v1.3.0 tag I have not pushed. The first 1.3.0 release PR (#544) sat open from 2026-10-16 until it was 42 commits behind and conflicting. Two fix PRs say main was red: the env manifest check from #4107 to #4199 (5h37m between merges) and the PublicAgentTools spec from #4059 to #4187 (22h01m between merges). And yesterday's test, one package through all four benchmark arms, has no PR reporting a run."
  score: [artifact, measured, failure]
  artifacts:
    - label: "orgx-mcp #584: responsibility on the plan tools"
      href: "https://github.com/useorgx/orgx-mcp/pull/584"
    - label: "orgx-mcp #585: read one responsibility's brief"
      href: "https://github.com/useorgx/orgx-mcp/pull/585"
    - label: "orgx-mcp #586: Release 1.3.0 (merged, untagged)"
      href: "https://github.com/useorgx/orgx-mcp/pull/586"
    - label: "skills #40: hand-over-a-responsibility"
      href: "https://github.com/useorgx/skills/pull/40"
---

## The baseline

Until yesterday an agent reading my OrgX workspace got quality bars and nothing about what it was allowed to own. It could finish a task I gave it. It could not hold a standing job, like following up on sales threads every weekday, because there was nowhere to write down the job, the measure, or the line it must not cross.

I don't have a measured before-number for this. The PR that started the work says a fresh agent read 57 bars and no responsibilities. I did not count them myself, so that figure is not part of this receipt's result.

## What ran

One decision path, six PRs, three repos.

An agent reads the workspace and gets a capability report next to the bars (orgx #4178, merged 24 minutes after it opened). It drafts an operating agreement through the existing plan tools: outcome, measure, owner, and stages that each carry an authority level of observe, prepare, gated or autonomous (orgx-mcp #584). Saving returns a preview and writes nothing beyond the plan. Completing records the agreement as confirmed, or returns questions while the measure or owner is missing.

Work gets recorded against the responsibility with a receipt that states its effects: none, draft, sent, changed or deleted (orgx #4179, orgx-mcp #585). The skill that teaches this ships one worked path, sales follow-ups, drafts only (skills #40).

The decision that matters is in orgx #4180. I chose queue mode. OrgX works out when a cycle is due and says so in the brief, but it never starts an agent run. Turning a responsibility on or pausing it happens on a page, through a route that takes a browser session and CSRF token, is limited to the workspace owner, and returns 404 to anyone else. An agent holding an MCP token can prepare the whole agreement and cannot make it active.

That is Authority written as a route guard. #4180 took 17h30m from open to merge, the longest of the six.

## What I withheld and why

**Baseline.** No measured before-state, as above.

**Reproducible.** The orgx repo is private. The 54 tests in 11 files that #4180 cites come from its description. I saw the CI checks pass and did not rerun the suite.

**External.** Nobody outside has used this. I also did not check that the orgx PRs are deployed, only that they merged. Both MCP PRs say the server must be live first or the new fields get a 400. They merged in the right order. Merge order is the only part I can vouch for.

I have not confirmed that a single responsibility has been turned on in production. The path exists; I have no evidence anything has walked it.

The release is the plain failure. Receipt 027 complained the last MCP release was 24 days old. 1.3.0 is now merged and the tag is still mine to push.

## Tomorrow's test

Push `v1.3.0` and confirm the registry version moves. Then turn on one responsibility from the page, let one cycle come due, and record one receipt against it. If the brief does not flip from waiting on the agent to waiting on nobody, the dueness logic is wrong and I will say so here.

The four-arm run from yesterday is still owed.
