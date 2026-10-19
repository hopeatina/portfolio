---
title: "Daily Autonomy Receipt 013: My CI runner said 'active' for two days and took no jobs"
date: "2026-10-19"
excerpt: "A Mac mini CI runner reported active from Oct 15 to Oct 18 while running nothing; in the 26 hours I measured, 9 of 11 finished deploy runs failed and 47 of 72 CI runs were cancelled."
category: "Autonomy Receipt"
tags: ["receipts", "ci", "observability"]
type: receipt
receipt:
  question: "When the only thing watching my CI runner is its own status line, how long can it be dead before anything notices?"
  result: "Answer: about two days. The light-lane runner on the Mac mini took no jobs from 2026-10-15 20:54 UTC to 2026-10-18 while systemd reported it active. In the 26-hour window ending 2026-10-19 13:39 UTC, the Deploy to VPS workflow finished 11 runs: 1 success, 9 failures, 1 cancelled, with 1 more in progress. Main-repo CI started 72 runs: 22 succeeded, 2 failed, 47 were cancelled, 1 was in progress. Two fixes merged: a light lane that gets killed instead of throttled (19/19 workflow tests pass), and a deploy gate that waits up to 180 minutes for CI instead of 30 (37/37 pass). Neither fix has been observed working in production yet."
  failure: "The runner throttled itself instead of dying. MemoryHigh=1400M held a Scorecard Lint job at its cap with swap full, so the job never exited, GitHub's cancellation never reached it, and the journal stayed empty for two days. Every light-lane check sat queued until GitHub cancelled it at 24 hours. Separately, every scheduled deploy since the earlier batching change failed with 'No successful CI for release', because main's CI queued behind PR runs for longer than the 30-minute wait."
  score: [baseline, failure]
  artifacts:
    - label: "orgx PR #3667: unfreeze the mini light lane (private repo)"
      href: "https://github.com/hopeatina/orgx/pull/3667"
    - label: "orgx PR #3670: deploy gate waits out main's CI (private repo)"
      href: "https://github.com/hopeatina/orgx/pull/3670"
---

## The baseline

Last week I moved OrgX's CI off hosted runners and onto one Mac mini, with one heavy runner and a light lane running as a systemd unit. The plan assumed that a broken lane would fail loudly. It didn't.

From 2026-10-15 20:54 UTC until sometime on 2026-10-18, the light runner (`orgx-mini-light-1`) took no jobs. `systemctl` said `active` the whole time. There were no journal lines for two days. The only sign was indirect: light-lane checks sat in the queue until GitHub cancelled them at the 24-hour limit.

## What ran

The cause was a single line. `MemoryHigh=1400M` throttles a unit that goes over the limit. It doesn't kill it. With swap full, a Scorecard Lint job sat at the cap and never exited, so the cancel signal never reached it. The process wasn't crashed and it wasn't healthy. It just stopped making progress.

PR #3667 removed `MemoryHigh` and kept the hard caps (`MemoryMax=1800M`, `MemorySwapMax`). A runaway job now gets OOM-killed and the runner keeps listening. The same PR replaced the six-job shard fallback with one job that runs six shards in turn, because a matrix that assumes six parallel hosted runners makes no sense on one heavy runner. Workflow topology tests: 19/19 pass. The PR's validation box for "light runner picks up and finishes a queued job after the live fix" is checked.

The deploy side broke in parallel. Main's CI was queueing behind PR runs on the one heavy runner for longer than the deploy build's 30-minute wait, so scheduled deploys refused to activate. PR #3670 moved the wait into the cheap gate job: it polls once a minute for up to 180 minutes and only starts the build once CI is green. Deploy workflow tests: 37/37 pass.

Here's the scale of it in the 26 hours before this post. Deploy to VPS: 11 finished runs, 1 success. Main CI: 72 runs, 47 cancelled.

## What I withheld and why

- **artifact:** both PRs are in a private repo, so you can't click through and check them. A link only you can't open doesn't count as proof.
- **measured:** I counted runs, but I didn't measure the fix. The "7 to 9 minutes saved per fallback PR" in #3667 is an estimate, not a measurement. Its second validation box, a fallback PR showing one shard job and a green results check, is still unchecked.
- **reproducible:** the tests run anywhere, but the failure only happens on that VM under memory pressure.
- **external:** nobody outside me has looked at this.
- I can't explain the 47 cancelled CI runs from what I pulled today. Some are probably the light-lane cancellations and some are superseded pushes. I haven't split them, so I'm not claiming either.

The lesson I'd stake something on: a status line is the runner judging itself, and that's not proof it works. The proof is a job finishing. Nothing in my setup was watching for that.

## Tomorrow's test

The first scheduled deploy after #3670 started at 13:36 UTC today and was still running when I wrote this. Tomorrow I check three things. Did it deploy or skip with a warning? How many light-lane jobs finished since the fix? Did any fallback PR run its shards as one job? If the deploy skipped again, the 180-minute wait was a guess too.
