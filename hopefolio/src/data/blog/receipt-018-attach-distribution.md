---
title: "Daily Autonomy Receipt 018: One attach operation merged in five repos, and the newest plugin release predates all of it"
date: "2026-10-24"
excerpt: "Six PRs across five repos merged in 3 hours 12 minutes to let an agent hand back the work it made; the Claude Code plugin's main branch says 0.1.17 while its latest tagged release is still v0.1.15."
category: "Autonomy Receipt"
tags: ["receipts", "distribution", "proof"]
type: receipt
receipt:
  question: "When one capability ships across a server, an MCP layer, two client plugins and a local ledger in a single afternoon, how much of it can an installed user actually reach?"
  result: "Six PRs merged on 2026-10-23 between 13:06Z and 16:18Z across five repos: orgx #3761 (+347/−19), trail #29 (+323/−11), orgx-mcp #553 (+504/−27), orgx-claude-code-plugin #55 (+164/−74) and #56 (+1,834/−169), orgx-codex-plugin #82 (+32/−0, docs only). That is 3,204 lines added and 300 removed. Per the PR bodies, the suites behind them report 228 tests (orgx-mcp), 157/157 (trail) and 40 (plugin). I did not re-run any of them."
  failure: "Merged is not distributed. The plugin's package.json on main reads 0.1.17, but its latest GitHub release is v0.1.15 from 2026-10-15. The canary that would prove the deployed MCP route advertises the new attachment schema (orgx #3780) is still open, and its own body says live authenticated success has not been measured. The plugin also fails `--strict` validation on an existing name warning. I could not check whether the app route is deployed."
  score: [artifact, baseline, failure]
  artifacts:
    - label: "orgx-mcp #553: attach artifacts through existing work updates"
      href: "https://github.com/useorgx/orgx-mcp/pull/553"
    - label: "orgx-claude-code-plugin #56: bounded OAuth retry outbox"
      href: "https://github.com/useorgx/orgx-claude-code-plugin/pull/56"
    - label: "trail #29: link observed OrgX outputs to their threads"
      href: "https://github.com/useorgx/trail/pull/29"
    - label: "orgx-claude-code-plugin releases (latest: v0.1.15)"
      href: "https://github.com/useorgx/orgx-claude-code-plugin/releases"
---

## The baseline

An agent could finish a piece of work in Claude Code or Codex and still have no clean way to hand it back. `orgx_update_work` could patch a task's text, but it couldn't attach the output that text described. Trail, my local session ledger, dropped successful non-shell tool results, so a thread that produced an OrgX output couldn't link to it. And if the plugin got interrupted partway through an attachment, it lost the retry.

## What ran

One operation, fanned out across five repos in order: server first, clients last.

- **orgx #3761** (13:06Z) added the authorized app writer that receives an attachment.
- **trail #29** (14:02Z) captures only explicit artifact UUID acknowledgments from completed `orgx_attach`, `orgx_attach_artifact` and `orgx_update_work` responses, binds each one to the thread that made the call, and caps them at 20 per thread. Agent prose, read results and arbitrary URLs can't create a link.
- **orgx-mcp #553** (14:20Z) gives `orgx_update_work` one strict `artifact` branch. A call sends exactly one of `fields` or `artifact`, plus a stable retry key. The result is "review pending", never approval or completion. No new MCP tool.
- **orgx-claude-code-plugin #55 and #56** (14:34Z, 16:18Z) route user-requested attachments through native OAuth and keep interrupted ones in a local outbox. The outbox is bounded: 20 entries, three Stop-hook attempts, a seven-day pause, and no network or credential client of its own. Auth and validation failures wait for the user to retry.
- **orgx-codex-plugin #82** (14:34Z) documents the same path for Codex.

The primitive I care about is that an attachment is a claim, not a verdict. Every layer records "here is what I made" and leaves acceptance to a person.

## What I withheld and why

**Measured** — every test count above comes from a PR body. I didn't run the suites for this draft.
**Reproducible** — there's no public command a reader can run to see an attachment land end to end.
**External** — no tagged release ships 0.1.17, and I have no install count to show anyone reached it another way.

That last one is the real story of the day. Merging six PRs in 3 hours 12 minutes felt like shipping. Measured by tagged releases, nothing reached users yet. Distribution is its own state, and today it is still red.

## Tomorrow's test

Tag the plugin release that carries 0.1.17. Merge #3780. Then record one hosted canary run where the deployed MCP route lists the `orgx_update_work.artifact` schema. If the canary is still `unconfigured` or red by the next receipt, I'll say so there.
