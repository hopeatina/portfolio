# Distribution playbook — 30 days to inevitable

The portfolio, resume, and LinkedIn are now coherent. The remaining gap is distribution: making sure the right people see the work without you hand-delivering it.

The plan is compound, not linear. Week 1 actions enable Week 2 opportunities; Week 2 actions enable Week 3 opportunities. Don't skip weeks.

---

## Week 1 — Fix the front door

| Day | Action | Time | Blocker? |
|---|---|---|---|
| 1 | Update GitHub bio (`gh` command in `artifacts/github-profile-updates.md`) | 5 min | No |
| 1 | Re-pin 6 repos on github.com/hopeatina | 5 min | Manual |
| 1 | Create hopeatina/hopeatina profile README (draft in `artifacts/github-profile-readme.md`) | 15 min | No |
| 1 | Update LinkedIn headline + About + add OrgX experience entry | 30 min | Manual |
| 1 | Turn on LinkedIn "Open to work → recruiters only" with agent-infra titles | 5 min | Manual |
| 2 | Add repo descriptions + topics to every useorgx repo | 30 min | gh CLI |
| 2 | Record 90-second Loom: "OrgX in 90 seconds" (script in this doc) | 45 min | You |
| 3 | Submit orgx-mcp to Smithery featured + MCP.so + awesome-mcp list | 30 min | You |
| 3 | Submit orgx-mcp to Anthropic MCP directory | 15 min | You |
| 4 | Post Loom to X, LinkedIn, r/ClaudeAI, MCP Discord | 30 min | You |
| 5 | Deploy portfolio updates to production (already done locally) | 10 min | Review |

---

## Week 2 — First wave of writing

Target: publish one technical essay every 3 days. Two here, two in Week 3. Each post is a 90-minute block.

**Monday:** Publish **"Why MCP needs OAuth 2.1 + DCR, not API keys"** (draft in `hopefolio/src/data/blog/`)
- Post to: useorgx.com, LinkedIn long-form, HN (Show HN), MCP Discord
- Tag: @anthropic, @smithery, @mcpio on X

**Thursday:** Publish **"The claim graph: typed provenance for agent systems"**
- Post to: useorgx.com, X thread, r/LocalLLaMA, r/MachineLearning

Each post should:
- Have a copy-pasteable code snippet (recruiters and engineers screenshot snippets)
- End with a concrete next-action link (install orgx-mcp / read benchmark / email me)
- Reference one specific real-world system or lab (Anthropic's MCP spec, Cursor's harness, etc.)

---

## Week 3 — Second wave of writing + first outreach

**Monday:** Publish **"Durable Objects for agent memory: a Cloudflare pattern"**
- Post to: useorgx.com, HN (this one has the best HN shot), X
- Tag: @cloudflaredev

**Thursday:** Publish **"We ran 136 agent tasks. Here's what single-shot benchmarks hide."**
- Post to: useorgx.com, r/MachineLearning, X (this is the one most likely to get quoted)
- Tag: independent evals researchers

**Throughout the week:**
- Send 10 cold DMs (Week 1 batch from `outreach-templates.md`)
- Engage on 5 posts from target hiring managers (substantive replies, not "great post")

---

## Week 4 — Amplify + close

By now you should have:
- 4 technical essays published
- 30 DMs sent
- 1 Loom demo with ~100 views
- 2-5 active conversations with hiring managers
- A profile that ranks for "AI agent infrastructure engineer" when a recruiter searches LinkedIn

This week:
- **Monday:** Apply formally to every Tier 1 role (Stripe, Hightouch, Mercury, OpenAI, Decagon, Anthropic, Replit, Cursor, Plaid)
- **Tuesday:** Follow up on every Week 2-3 DM that didn't respond (one time only)
- **Wednesday:** Ship one more substantive artifact — either the next benchmark run (more inclusive: more models, more domains) or the `corgx-wizard` v1 release with a launch post
- **Friday:** Submit one podcast pitch (Latent Space / Practical AI / MCP Community) with "I've shipped a production MCP server and would love to talk about OAuth 2.1 for MCP and the 136-task benchmark we're running"

---

## The 90-second Loom script

Record this exactly. Don't over-produce it. One take is better than five.

```
[0:00 — face cam, 5 sec]
"Hey. I'm Hope. I'm building OrgX — continuity infrastructure for AI agents.
Here's what it actually does in 90 seconds."

[0:05 — screen share Claude Code]
"This is Claude Code. Cold session, zero context. I'll ask it a question
about what I was working on yesterday — which is a real initiative in OrgX."

[0:15 — type question, show MCP tool call]
"Claude calls OrgX MCP. 61 tools exposed. This one — get_initiative_pulse —
pulls my active initiative, the open workstreams, and the decisions from
yesterday. Full provenance."

[0:35 — show decision graph, approval gate]
"The agent makes a decision. Instead of silently executing, it hits an
approval gate. Here's the human-in-the-loop — I approve or reject. Audit
trail is appended-only."

[0:55 — close Claude Code, open Cursor]
"Now I open Cursor. Same MCP. Same initiative. The agent here has the
context the Claude Code agent had. No re-prompting. No copy-paste. That's
the continuity layer."

[1:15 — screen fade back to face]
"Under the hood: Cloudflare Workers, Durable Objects for state, OAuth 2.1
with dynamic client registration — no API keys. And there's a public
benchmark with 136 tasks if you want to see it evaluated.

Links: mcp.useorgx.com, github.com/useorgx. If you're hiring for agent
platforms or MCP infrastructure, I want to talk."
```

**Upload locations (hit all of them):**
- Loom (share link goes in DMs)
- YouTube (goes on LinkedIn featured + pinned tweet)
- X video post
- LinkedIn native video post
- Embed on useorgx.com homepage
- Embed on hopeatina.com/projects/orgx
- Embed in orgx-mcp README

---

## Things that compound (start them now, they don't pay off for 30 days)

1. **Follow + reply to Anthropic Connectivity team, Cursor agents team, Replit agents team, Cloudflare Workers DX team, MCP spec contributors** on X. One substantive reply per week per person. After 30 days, you're a familiar name.

2. **Open one non-trivial PR to the official Anthropic MCP SDK or to Claude Code.** Target: a small but real improvement — better error messages, a test for an edge case, a docs fix for MCP Apps widgets. A merged upstream PR is social proof that lasts forever.

3. **Write a `WHY.md` in orgx-mcp** explaining the OAuth 2.1 + DCR decision. Short (400 words). Link it from the README. This is the file that will get quoted if anyone references OrgX in a spec discussion.

4. **Post the benchmark leaderboard** as a static page at useorgx.com/benchmarks. Even v1 with just the current results is better than the current "coming soon" vibe. Update it weekly. Eventually the page becomes a reference, not a marketing surface.

5. **Respond to every Claude Code / MCP / Cursor / Codex issue on GitHub that touches org memory or MCP auth.** Substantive replies only. These threads are read by the people who build the tools.

---

## Metrics to track

| Metric | Baseline | 30-day target |
|---|---|---|
| orgx-mcp stars | 1 | 50+ |
| useorgx.com monthly uniques | — | 2k+ |
| LinkedIn profile views / week | — | 200+ |
| Inbound recruiter messages / week | — | 5+ |
| DMs sent | 0 | 30 |
| DMs responded to | — | 5+ |
| Active hiring conversations | 0 | 3+ |
| Published essays | 8 (on useorgx.com) | 12 |

If the 30-day targets land, you have 2-3 active interview loops by day 45 and an offer by day 60. If they don't, the gap is almost always one of three things: (a) the artifact doesn't grab — fix the 90-second demo; (b) the profile still reads junior — revisit LinkedIn headline and GitHub pins; (c) the DMs are too generic — go back to template structure and lead with a specific technical observation.
