# OrgX Carousel Engine

A self-running system that publishes one **OrgX TikTok carousel per day** and
**learns from the results** — so the content that works gets made more, automatically.

Two always-on cloud routines (GitHub Actions), one shared brain (`playbook.json`),
rendered in OrgX's own design system, queued into Buffer **for your review** (never auto-published).

```
                        ┌──────────────  playbook.json (the brain)  ──────────────┐
                        │  pillars · hook formulas · 15 vetted concepts · bandit  │
                        └───────────▲───────────────────────────────┬────────────┘
   DAILY PUBLISHER                  │ reads / marks used            │ nudges weights
   (09:17 CT, always-on)           │                               │
   select concept (Thompson) ──► render 1080×1920 slides ──► commit PNGs ──► Buffer Idea (review)
        │                                                                          │
        └────────────────► experiments.jsonl (what we tried + hypothesis) ◄────────┘
                                          ▲
   WEEKLY LEARNER (Mon)                   │ join by date + service
   pull Buffer metrics ──► compute success vs baseline ──► update bandit ──► reports/latest.md
```

The prompt ends. The company keeps moving. So does the content.

---

## The loop, concretely

1. **Pick** — `bin/generate.mjs` uses Thompson sampling over learned weights (pillar × hook type × topic × novelty) to choose the day's concept from the vetted bank. Unused concepts are preferred; the bank recycles when exhausted (or set `--author` to write a fresh one via Claude).
2. **Render** — `lib/render.mjs` turns the concept into 6–9 slides at 1080×1920 using the OrgX design system (matte `#02040a`, Inter + JetBrains Mono, the signature gradient line, HUD brackets, context-pack readouts). Fonts are embedded (base64) so CI renders identically to local.
3. **Host** — slides are committed to the repo; Buffer ingests them via `raw.githubusercontent.com`.
4. **Queue** — `bin/queue.mjs` creates a Buffer **Idea** (a draft) tagged `tiktok`, with the caption + slides. It lands in your Buffer Ideas board. **You review and publish.** Nothing goes live on its own.
5. **Log** — every post is recorded in `state/experiments.jsonl` with its hypothesis (what it's testing).
6. **Learn** — `bin/learn.mjs` pulls performance, joins it to the experiments, and moves the bandit toward what works. Read `reports/latest.md`.

---

## One-time setup

The engine is built and tested. To turn it on:

1. **Merge to `main`.** GitHub only runs *scheduled* workflows from the default branch. The two workflows live in `.github/workflows/orgx-carousel-*.yml`.
2. **Connect TikTok in Buffer.** You're on the free plan at its 3-channel cap (Instagram, X, LinkedIn). Free a slot or upgrade, then connect TikTok at [publish.buffer.com](https://publish.buffer.com). *(Ideas still queue without this — `service` is metadata — but TikTok metrics won't flow until it's connected.)*
3. **Add a Buffer token.** Generate one at [publish.buffer.com/settings/api](https://publish.buffer.com/settings/api) → GitHub repo **Settings → Secrets and variables → Actions** → add `BUFFER_ACCESS_TOKEN`.
4. *(Optional)* **Add `ANTHROPIC_API_KEY`** as a repo secret to let the daily run author fresh concepts once the seed bank is used up (`--author`, or set `llm.enabled` in `config.json`).
5. **Check the schedule.** Daily at 14:17 UTC (~9:17am Central), learner Mondays 15:23 UTC. Edit the `cron:` lines to taste.

That's it. First run: **Actions → OrgX carousel — daily publisher → Run workflow** to fire one immediately.

> Heads-up on TikTok: photo carousels via any scheduler often need a final tap in the TikTok app to publish (a TikTok API limit, not Buffer's). The review-queue flow already puts you in the loop, so this fits.

---

## Run it locally

```bash
cd orgx-carousel-engine
npm install
npx playwright install chromium

npm run preview                          # render a bandit-picked concept to out/preview/
node bin/preview.mjs --concept felt-five-doors
node bin/preview.mjs --pillar teardown

node bin/generate.mjs --dry-run          # pick + render, no writes
node bin/generate.mjs                     # pick + render + log (then commit + queue)
node bin/queue.mjs                        # push today's bundle to Buffer (needs token)
node bin/learn.mjs                        # fold in metrics + write a report
node bin/channels.mjs                     # is TikTok connected? (needs token)
```

---

## Editing the content

- **Concepts** live in `playbook.json → concepts[]`. Each has `slides[]` (`role`, `kicker`, `headline`, `subtext`, `accent`), a Hope-voice `caption`, `hashtags`, and a `hypothesis`. Wrap key words in `**double asterisks**` to accent-color them. Add your own — set `status: "ready"`, `uses: 0`.
- **Hook formulas / CTAs / hashtags** live alongside them and feed the optional LLM author.
- **Accents**: `lime` (execution), `teal` (how-it-works), `amber` (pain), `iris` (ideas), `danger` (the wrong way).
- **Truth rule**: no fabricated metrics/traction. Credibility comes from the thesis + real architecture + building in public.

## How the learning actually works

Each concept carries dimensions: `pillar`, `hook_type`, `topic_tags`. The bandit keeps a Beta(α,β) per value. When a post's engagement beats the running baseline, those dimensions' α rises (picked more); when it underperforms, β rises. Selection samples from the Betas (Thompson) so it exploits winners while still exploring. The weekly report ranks pillars/hooks/topics and names the next concept to explore. It's idempotent — each experiment folds in exactly once.

## Guardrails

- **Never auto-publishes.** Output is a Buffer *Idea* (draft). You publish.
- **Free-plan aware.** Ideas don't count against the 10 scheduled-post cap (100 ideas allowed).
- **Graceful.** No token → the bundle is still rendered, hosted, and logged; nothing crashes.

## Portability

This is a self-contained folder. Move it to a dedicated repo (e.g. `useorgx/growth`) and it keeps working — update `config.json → hosting.repo`. Prefer a different always-on runner? The same `bin/*` scripts drop into a **Trigger.dev** scheduled task or a **Cloudflare Worker** cron (both already in OrgX's stack).
