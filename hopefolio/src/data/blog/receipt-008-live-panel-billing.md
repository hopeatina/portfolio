---
title: "Daily Autonomy Receipt 008: The live panel would have billed people for watching it, so I made it stop itself"
date: "2026-10-08"
excerpt: "The OrgX panel now polls two reads every 3-6 seconds. I shipped the billing exemption first and a feed that halts for 10 minutes if a single poll comes back billed, and the deploy was then blocked by a 20ms timing test."
category: "Autonomy Receipt"
tags: ["receipts", "economics", "mcp"]
type: receipt
receipt:
  question: "Can an MCP panel update live inside ChatGPT without the background polling quietly spending the person's MCP call allowance?"
  result: "Billing exemption merged first (hopeatina/orgx #3369, +283/-8, 6 metering cases + 4 route cases): only `get_pending_decisions` and `get_agent_status`, only with `usage_class: live_refresh`, capped at 240 exempt reads/min per person, metered as usual above the cap and never refused. Live feed merged after it (useorgx/orgx-mcp #474, +1729/-63, 34 files, 2666 tests passed): polls every 6s at rest and 3s while agent work runs, and halts for 10 minutes if a poll reports billed or omits `usage`. Panel payload went from 557 to 598 KB across #474 and #477."
  failure: "The production deploy of #474 failed validation on one test that checked a screen-reader announcement one tick early. The UI writes it 20ms later. #476 fixed the test only. Separately, the production panel in ChatGPT showed 'In progress 13' above a body that read 'could not be read': the panel's own agent-status read fails in production and the cause is still unknown. I added logging and have not read the logs yet. I also have no production evidence that the billing guard ever ran."
  score: [artifact, failure]
  artifacts:
    - label: "orgx-mcp #474: live updates from a per-viewer feed"
      href: "https://github.com/useorgx/orgx-mcp/pull/474"
    - label: "orgx-mcp #476: the deploy-blocking test fix"
      href: "https://github.com/useorgx/orgx-mcp/pull/476"
    - label: "orgx-mcp #477: polish pass from the production panel"
      href: "https://github.com/useorgx/orgx-mcp/pull/477"
---

## The baseline

Before this change, the OrgX panel inside ChatGPT updated only when you opened it or pressed Refresh. If you settled a decision in the web app, the panel kept showing it until you reloaded. Being stale was the cost, and it was free.

Making the panel live means polling. The feed reads two tools, pending decisions and agent status, every 6 seconds at rest and every 3 seconds while agent work is running. By the PR's own numbers that's 20 to 40 reads a minute for each open panel, or 1,200 to 2,400 an hour. That's my arithmetic, not a measurement. Each of those reads goes through the same endpoint that counts against a person's MCP call allowance. Shipped naively, the feature would have spent people's plans while they just looked at it.

## What ran

The fix went in as two changes in a set order, with the server change deployed first.

**The server side (hopeatina/orgx #3369, merged 03:57 UTC).** The tools endpoint exempts a read only when three things hold. It's marked `usage_class: "live_refresh"`. It's one of exactly two read-only tools. The person is under 240 exempt reads per minute. A mutation that carries the marker is still billed. Above the cap, calls are billed as usual and never refused, so the queue stays visible even when someone is at their limit. Every response returns `usage: { metered, billed, reason }`. The PR has 6 metering test cases and 4 new route cases.

**The client side (useorgx/orgx-mcp #474, merged 04:10 UTC).** The feed doesn't trust the server. If a poll comes back billed, or comes back with no `usage` field at all, the feed halts for 10 minutes and saves the halt in Durable Object storage. If the server change hadn't deployed, the panel would have fallen back to refresh-on-open rather than charge anyone. The full suite passed 2666 tests with 2 skipped.

Economics also covers payload, not only calls. Inlining the live store took the panel budget from 557 to 582 KB, and the polish pass in #477 brought it to 598 KB. Nobody has measured what 41 extra KB costs on a cold load in ChatGPT.

This counts as Authority work: the system checks what it's allowed to spend on someone's behalf before it spends anything.

## What I withheld and why

**Baseline and measured.** I have no production billing data showing the exemption firing, and no `feed_halted` log lines either way. Both PRs list a post-deploy check that I haven't done. The 20-to-40-reads figure comes from the configuration, not from traffic.

**Reproducible.** The client guard and its tests are in a public repo. The exemption that makes the economics work is in a private one.

**External.** No one outside the project has run it.

The honest failure is bigger than the flaky test. The production critique in #477 found the In progress tab showing 13 items over a body that said "could not be read." The panel's own agent read is failing in production. The feed's read of the same data works. #477 now renders the feed's rows and logs the failure, which covers the symptom but leaves the cause unknown.

## Tomorrow's test

Read the `live-feed-do` logs and the `[panel] agent status read failed` lines. Settle one decision in the web app while the panel is open in ChatGPT. Pass means: the decision leaves the panel within one poll interval, the span shows `orgx.mcp.metered=false` for the feed reads, and there are zero `feed_halted` events. If any feed read shows `billed: true`, the exemption doesn't work in production and this receipt's main claim fails.
