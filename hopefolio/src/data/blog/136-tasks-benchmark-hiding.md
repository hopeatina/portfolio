---
title: "We Ran 136 Agent Tasks. Here's What Single-Shot Benchmarks Hide."
date: "2026-04-10"
excerpt: "Most agent benchmarks are one prompt, one model, one score. That structurally conceals the thing that breaks in production: cascading context across sessions."
category: "Evals"
readTime: "10 min read"
tags:
  - Benchmarks
  - Evals
  - Agents
  - Memory
  - Methodology
relatedPosts:
  - claim-graph-vs-rag
  - building-multi-agent-orchestration
  - trust-models-for-agent-autonomy
---

Most public benchmarks for AI agents are variations on the same template: give the model a prompt, let it respond, score the response. SWE-Bench does it. GAIA does it. MMLU, HumanEval, ARC, the entire GLUE descendant tree — same shape. One prompt, one response, one score.

That shape is useful. It is also structurally dishonest about what production agents do. Production agents don't answer one question. They carry context across sessions. They delegate to other agents. They hit tools whose outputs change the next prompt. They get interrupted by humans and resumed hours later. They accumulate memory — or fail to.

None of that shows up in single-shot benchmarks. So they grade on the easy part and leave the hard part invisible.

Over the past few months I've been running a different kind of benchmark for [OrgX](https://useorgx.com) — one that deliberately evaluates cascading context, memory handoff, and decision provenance across sessions. It's called the [Autonomous Initiative Benchmark](https://github.com/useorgx/autonomous-initiative-benchmark). We've now run 136+ tasks across 7 domains and 3 execution modes, with independent LLM judges and published artifacts.

This post is about what that data shows, and what it structurally exposes that the standard benchmarks can't.

## The three things single-shot benchmarks hide

**Continuity.** In production, an agent often picks up where another agent left off. The Claude Code agent stops. The Cursor agent starts. Does the new agent know what the old one decided? Single-shot benchmarks never ask this question because they only ever run one agent once.

**Forgetting.** Agents trained on single-shot benchmarks optimize for maximum use of the single prompt they receive. In production, that's the wrong optimization. A production agent needs to remember what it committed to, what was approved, what was superseded. Forgetting is a failure mode. Single-shot benchmarks cannot measure forgetting because they have no prior session to forget from.

**Provenance drift.** When an agent writes to shared state (a database, a file, an issue tracker) and a later agent reads that state, does the reader understand the writer's intent? Single-shot benchmarks never test this because their state doesn't persist.

## The Autonomous Initiative Benchmark, in one paragraph

Tasks are framed as real OrgX initiatives — product, engineering, operations, design, content, research, and ops/compliance domains. Each task has a starting context, a desired end state, and a reference decision graph. The benchmark runs the same task in three modes — autonomous agent, API-only, and CLI-only — across multiple frontier models (Claude Opus/Sonnet variants, GPT-5, Gemini 2.5). Execution is scored on (a) task completion, (b) decision provenance quality, (c) token and dollar cost, (d) cross-session continuity where the task has a second session. Judgment is done by an independent LLM panel with explicit rubrics; failure cases are flagged for human review.

## What 136 tasks have shown so far

I'm not going to put the aggregate numbers here because the benchmark is ongoing and the next run will be more inclusive — more models, more domains, broader substrate. What I'll do is share the three patterns that have been consistent enough to bet on.

**Pattern 1: Single-shot quality predicts nothing about cross-session continuity.** The model that scored highest on one-shot task completion in Week 1 did not score highest on the two-session continuity tasks. The gap was not subtle. Some of the most impressive one-shot performers dropped 30+ points on the continuity task type because they ignored the state the prior agent had written.

**Pattern 2: Memory architecture matters more than raw capability.** When we ran the same model in OrgX's structured memory mode vs. a generic vector-search memory, the structured version won on continuity by double-digit margins. The model's "reasoning" didn't change. The retrieval substrate did. That's a sign the benchmark is actually measuring the right thing — it rewards the system, not just the model.

**Pattern 3: Failure modes are more informative than scores.** The judge panel's flagged-for-human-review bundles tell us more than the scored results. Agents make specific, repeatable mistakes: ignoring superseded decisions, re-doing work another agent completed, making commitments they can't audit. Those are the patterns we can build infrastructure against. A single score can't show them.

## What I'd fix about our own methodology

**The domain coverage skews engineering-heavy.** Seven domains sounds balanced; in practice the tasks we've written are disproportionately eng and product. The next run needs more ops, compliance, research, and content tasks. That's what "more inclusive" means for the benchmark in its next iteration.

**The judge panel is still LLMs.** Independent judges sound impressive until you remember they're GPT-5s judging Claude Opuses. Known biases exist; we correct for them partially by rotating judge models. The version-after-next will add a human adjudication layer for a sampled subset — specifically the cases the LLM panel flags as contested.

**Cost scoring is naive.** We report tokens and dollars. Production agent cost is more than that — it's also wall-clock time, approval latency, and human-review time. Future versions need an integrated latency column.

**One-off failure narratives are not surfaced enough.** The benchmark bundles include failure cases, but they're hidden behind a lot of JSON. The next release will surface the most informative failure cases directly, with human annotation.

## Why this matters beyond OrgX

Labs and platform companies building agent products already run internal evals that look more like this than like single-shot benchmarks. What's been missing is a public, reproducible, methodology-forward version so the industry can actually compare.

My guess is that in 2026 we'll see several serious attempts at cross-session and tool-use benchmarks go public. This is one of them. If you're building another, I want to see it. The more public methodology we have, the faster the real performance gaps become legible.

## Artifacts

- Methodology, task catalog, bundle schema: [github.com/useorgx/autonomous-initiative-benchmark](https://github.com/useorgx/autonomous-initiative-benchmark)
- Published results + commentary: [useorgx.com/blog](https://useorgx.com/blog)
- The platform the benchmark pressure-tests: [useorgx.com](https://useorgx.com)

If you're working on agent evals at a lab or platform team and want to compare approaches, email me at hopeatina@gmail.com. If you're hiring for an evals, agent-platform, or agent-infrastructure role, I'm at [hopeatina.com/hiring](/hiring) — this is the kind of work I want to do next.
