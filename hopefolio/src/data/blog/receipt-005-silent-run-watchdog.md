---
title: "Daily Autonomy Receipt 005: A wedged agent held my benchmark batch for hours, and nothing was watching"
date: "2026-09-30"
excerpt: "Two agent runs went silent for 4h47m and 58m after an MCP call, and the batch got through two agents in nine hours. hopeatina/orgx#3232 now kills a run after 20 silent minutes and scores it invalid."
category: "Autonomy Receipt"
tags: ["receipts", "failure", "agent-runtime"]
type: receipt
receipt:
  question: "When I removed the wall-clock cap from my autonomy benchmark runner, what did I lose, and can I get the safety back without re-punishing slow agents that are still working?"
  result: "hopeatina/orgx#3232 merged 2026-09-29 (+150/-4 across 2 files): a stall watchdog kills a run with no stdout or stderr for --stall-min minutes (default 20) and records it as aborted / harness_limitation, which the report excludes. The PR records 4 passing tests in tests/autonomyRunnerStall.spec.ts, and a discrimination check where disabling the watchdog failed the two kill assertions. Separately, useorgx/orgx-mcp#424 opened as a draft (+687/-88 across 16 files) for atomic MCP admission; the PR records 1,640 tests passing across 195 suites and exactly 100 of 140 simultaneous checks admitted against Redis 7.4."
  failure: "Two runs wedged after an orgx-openclaw MCP tool call: orchestrator-b-codex was silent for 4h47m of a 5h37m run, product-b-codex for 58m of 62m. Both had to be killed by hand, and the queue behind them got through two agents in nine hours. The root hang is not fixed. The watchdog caps it at 20 minutes. On #424, two OAuth consent browser suites are still unverified because the pinned Chromium could not be downloaded."
  score: [artifact, baseline, failure]
  artifacts:
    - label: "hopeatina/orgx#3232: kill a silent run, score it invalid (merged)"
      href: "https://github.com/hopeatina/orgx/pull/3232"
    - label: "useorgx/orgx-mcp#424: atomic MCP admission (draft)"
      href: "https://github.com/useorgx/orgx-mcp/pull/424"
---

## The baseline

Earlier I took the wall-clock cap off my autonomy benchmark runner. The cap was cutting off agents that were still working. Taking it off was the right call. It also meant nothing was watching for a harness that had stopped doing anything at all.

That showed up twice on Tuesday, in the same place both times. According to the #3232 PR body:

| Run | Wall | Silent | Tool calls | Ended by |
|---|---|---|---|---|
| `orchestrator-b-codex` | 5h37m | 4h47m | 154 | killed by hand |
| `product-b-codex` | 62m | 58m | 49 | killed by hand |

Both went quiet right after an `orgx-openclaw` MCP tool call completed, with a Codex model-refresh timeout on stderr. With no cap, one hung run held every queued agent behind it. The batch finished two agents in nine hours.

## What ran

[hopeatina/orgx#3232](https://github.com/hopeatina/orgx/pull/3232) adds a watchdog that measures silence, not elapsed time. If a run writes nothing to stdout or stderr for 20 minutes (configurable, and `0` turns it off), the runner kills it and records it as `aborted` / `harness_limitation`. That's the same bucket a provider usage cutoff already lands in, and the report leaves it out.

The distinction matters more than the kill. A timeout is a budget I chose, so the run is still scored. Silence means the harness failed, so scoring the run would be grading the agent for my infrastructure. A six-hour run that keeps talking is left alone.

The spec starts real child processes. A wedged child gets killed, a slow child that keeps talking survives, a disabled watchdog does nothing, and the silent duration is reported. To check that the test can actually fail, the watchdog was turned off: the two kill assertions failed and the other two passed.

In another repo, [useorgx/orgx-mcp#424](https://github.com/useorgx/orgx-mcp/pull/424) opened as a draft. It moves MCP rate-limit admission into a single Redis operation, because concurrent callers could get past the allowance.

## What I withheld and why

**Measured:** withheld. Every number here comes from PR bodies and GitHub metadata I read today. I haven't re-run the spec or the Redis test myself.

**Reproducible:** withheld. The spec copies the runner's watchdog logic instead of importing it, because the runner is a script and not a module. It pins down the algorithm, but the wiring was only checked by hand.

**External:** withheld. No one outside my own CI has looked at either change.

This is Execution, the unglamorous kind. The watchdog doesn't make the agent any better. It stops my harness from charging the agent for its own failures.

## Tomorrow's test

Did the resumed batch finish, and did the watchdog fire? If it fired, the aborted run should show `harness_limitation` and be missing from the report. If it didn't, I still need a real wedge to prove the wiring. Either way, the next job is the `orgx-openclaw` MCP path, where both stalls happened. Right now a hang costs 20 minutes instead of five hours, but it still happens.
