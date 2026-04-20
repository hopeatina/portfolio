# Portfolio overhaul — artifacts index

This directory contains everything I produced during the April 20 2026 portfolio overhaul session. Each file is copy-paste-ready or commit-ready.

## What changed in the portfolio itself (already in hopefolio/)

| File | Change |
|---|---|
| `hopefolio/src/pages/index.tsx` | Tightened hero positioning — "Senior AI Infrastructure Engineer · Founder, OrgX". Updated proof-bar with benchmark + OrgX metrics. New hiring CTA routes to `/hiring`. |
| `hopefolio/src/pages/projects/orgx.tsx` | Added four new sections: technical depth (OAuth 2.1 + DCR, Durable Objects, Ed25519), benchmark methodology, 12-repo ecosystem grid, and install-in-60-seconds. Endcap now routes to `/hiring`. |
| `hopefolio/src/pages/hiring.tsx` | New page — the 60-second brief for hiring managers. 3 proofs, 6 reasons to take the call, CTA row. |
| `hopefolio/src/pages/blog/index.tsx` | Added an "OrgX essays" section below on-site posts, linking out to all 8 useorgx.com/blog posts. |
| `hopefolio/src/data/blog/` | 4 new posts added (see below). |
| `hopefolio/public/resume/hope-atina-resume.md` | Master resume as markdown (for download link + PDF export). |

## Artifacts for your hands (copy/paste into external systems)

| File | Purpose |
|---|---|
| `github-profile-updates.md` | Commands + UI instructions to update GitHub bio and re-pin 6 repos. |
| `github-profile-readme.md` | Draft for the `hopeatina/hopeatina` profile README. |
| `linkedin-rewrite.md` | Headline, About, Experience, and Featured rewrites. Ready to paste. |
| `outreach-templates.md` | 4 DM templates (A/B/C for agent infra, AI productivity, evals; D for Stripe) mapped to top 30 target roles. |
| `distribution-plan.md` | 30-day week-by-week checklist. Includes 90-second Loom script. |
| `resume-variants-guide.md` | Three targeted resume variants + PDF export instructions. |

## Blog posts drafted (ready to cross-post)

Each is written to live on-site first, then be reposted to useorgx.com, HN, Reddit, and X.

| Slug | Title | Target audience |
|---|---|---|
| `mcp-needs-oauth-dcr` | Why MCP Servers Need OAuth 2.1 + DCR, Not API Keys | Anthropic, WorkOS, Plaid, MCP spec community |
| `claim-graph-vs-rag` | The Claim Graph: Why Typed Provenance Beats RAG for Agent Systems | Agent platform teams, memory researchers |
| `durable-objects-for-agent-memory` | Durable Objects for Agent Memory: A Cloudflare Pattern | Cloudflare, platform teams |
| `136-tasks-benchmark-hiding` | We Ran 136 Agent Tasks. Here's What Single-Shot Benchmarks Hide. | Evals researchers, quality teams at labs |

## Day-1 execution order (what to do right now)

Copy this as a personal checklist:

1. [ ] Run `gh auth refresh -h github.com -s user` then the `gh api --method PATCH user ...` command in `github-profile-updates.md`.
2. [ ] Re-pin your 6 repos at github.com/hopeatina using the UI instructions.
3. [ ] Create the `hopeatina/hopeatina` profile README using `github-profile-readme.md`.
4. [ ] Update LinkedIn headline + About + Experience entries using `linkedin-rewrite.md`.
5. [ ] Turn on LinkedIn "Open to work → recruiters only" with the titles listed in the LinkedIn doc.
6. [ ] Export the master resume to PDF and drop at `hopefolio/public/resume/hope-atina-resume.pdf` (see `resume-variants-guide.md`).
7. [ ] Review and approve the portfolio changes in hopefolio/, then commit + push.
8. [ ] Record the 90-second Loom demo using the script in `distribution-plan.md`.
9. [ ] Start Week 1 of the distribution plan.
10. [ ] Send 5 cold DMs from `outreach-templates.md` within 48 hours.
