---
title: "Daily Autonomy Receipt 042: One agent run spent its whole turn budget on a save that was refused 44 times"
date: "2026-11-27"
excerpt: "Run 15078138 called save_artifact 44 times, got the same refusal each time, and my worker logged every one as a success. Today's fix makes a refusal say what arrived. Whether the next run actually changes course is still untested."
category: "Autonomy Receipt"
tags: ["receipts", "orgx", "agent-runtime"]
type: receipt
receipt:
  question: "When a tool refuses an agent's call, does the agent learn enough from the refusal to change what it sends?"
  result: "Baseline from the production run history cited in orgx commit a11bce1c8: run 15078138 (25 Nov) called save_artifact 44 times, was refused with 'Artifact content is missing' each time, and used its whole 48-turn slice. Over 14 days, 166 saves were refused that way across 9 runs, all on OpenRouter models. The worker counted every refusal as a success. One DeepSeek reply in that run wrote 131,072 tokens over 11 minutes. Shipped to orgx PR #4547 (3 commits in the window, PR total 11 files, +227 / -12): refusals now return field names and shapes, count repeats, and redirect after three; refusals are recorded as failures; OpenRouter replies get a 32k token bound, lowered to the model's own limit where the catalog lists a smaller one (Qwen 2.5 72B 16k, Gemma 2 27B 2k). Separately, orgx PR #4552 (draft, 10 files, +138 / -35) binds a delegated child run's admitted target through dispatch and claim; its description reports 192 focused tests, 63 invariant checks and 105 pre-push contract tests passing locally."
  failure: "No run has gone through the new refusal path yet, so I have the before number and no after number. On #4547's head commit (6fad7f409) the Impacted Tests job never ran the tests: the self-hosted runner reported 15G of 58G disk free, its guard requires at least 15 GiB, and it exited in 6 seconds. Test Selection & Results failed after it. Lint, Type Check & Tests passed. #4552 is still a draft whose CI checks were skipped, and nothing in either PR has been verified in production."
  score: [artifact, baseline, failure]
  artifacts:
    - label: "orgx PR #4547: refused-call feedback, bounded open-model replies (private repo)"
      href: "https://github.com/hopeatina/orgx/pull/4547"
    - label: "orgx PR #4552: delegated target and run binding through dispatch and claim (private repo, draft)"
      href: "https://github.com/hopeatina/orgx/pull/4552"
    - label: "CI run 45917321663: Impacted Tests stopped by the runner's disk guard (private repo)"
      href: "https://github.com/hopeatina/orgx/actions/runs/45917321663"
---

## The baseline

On 25 November, OrgX run 15078138 tried to save its work 44 times. Every attempt came back with the same message: "Artifact content is missing." The run spent its full 48-turn slice that way and stopped.

That run was not the only one. Over the previous 14 days, 166 saves were refused with that message across 9 runs, all on OpenRouter models. The worst part came from my own code. The worker marked each refusal as a successful tool call and passed the bare error back to the model, so attempt 44 told the model exactly what attempt 1 had. In the same run, one DeepSeek reply wrote 131,072 tokens over 11 minutes because nothing capped it.

This is an Execution failure, and the model was not the main cause. An agent can't correct a call when the system tells it nothing new about why the call failed.

## What ran

Three commits landed on [orgx#4547](https://github.com/hopeatina/orgx/pull/4547) in the window:

- **a11bce1c8** (+160 / -9, 6 files). A refused call now returns the fields that arrived and their shapes, never their values. It counts identical refusals, and after three it tells the model to change what it sends or stop and report the block. Refusals are recorded as failures and traced as `worker.tool.refused`. `save_artifact` now says when content arrived as an object or a list. OpenRouter replies get a 32k token bound when the run sets none.
- **ed8c38020** (+32 / -1, 2 files). The same run rewrote one unbacked claim on every check pass and failed every pass. A check that fails a second time now says to cut the claim, or leave `[ADD: ...]` for a fact only the requester has.
- **6fad7f409** (+31 / -8, 3 files). The 32k bound drops to the model's own limit where OpenRouter's catalog lists a smaller one: Qwen 2.5 72B at 16k, Gemma 2 27B at 2k.

I also opened [orgx#4552](https://github.com/hopeatina/orgx/pull/4552) as a draft (+138 / -35, 10 files). It carries a delegated child run's admitted target through dispatch and job claim. It rejects a claim that doesn't name the locked job and run, and it accepts a cloud redelivery only for the same dispatch with an unchanged run binding.

## What I withheld and why

**Measured.** All I have is the before number. No run has hit the new refusal path, so I can't say 44 became 3. That claim has to come from a run.

**Reproducible.** CI did not run the impacted tests on #4547's head. The self-hosted runner reported 15G of 58G free, tripped its "under 15 GiB free" guard, and exited in 6 seconds. The full lint, type-check and test job passed, but the job that targets the changed code never got a turn. The test counts for #4552 come from its PR description. I didn't run them myself.

**External.** Both PRs are in a private repo, and nobody outside has used this path.

## Tomorrow's test

Free disk on the runner and re-run #4547's checks at 6fad7f409. Then the real test: the next OpenRouter run that gets a refused `save_artifact` should change its payload or stop by the fourth attempt, not the 44th. If refused saves across 14 days don't fall from 166, the feedback still isn't telling the model what it needs.
