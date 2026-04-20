# Hiring manager outreach — templates + target map

## The strategy in one sentence

Cold applications hit ~1% response rate. Targeted DMs to hiring managers or teammates with a specific, relevant artifact attached hit 10–30%. The leverage is the artifact, not the pitch. Every DM below leads with a concrete thing you've already built, not with your résumé.

---

## Rules of engagement

1. **Never DM about the job directly in the first message.** Lead with a substantive observation about what they're building. Then mention you'd be interested.
2. **One artifact per DM.** orgx-mcp for MCP/platform roles. The 136-task benchmark for evals/quality roles. The Claude Code plugin for developer-productivity roles. Pick the one that matches their surface.
3. **Always link the live URL, not GitHub.** `mcp.useorgx.com` is more tangible than a repo.
4. **Keep it under 150 words.** If you can't say it short, you don't understand what you're selling.
5. **Follow up once after 5 business days.** Then stop.
6. **Use Twitter/X DMs and LinkedIn DMs in parallel.** Different platforms, different inbox-awareness.

---

## Template A — Agent infrastructure / platform roles

Use for: Decagon (Agent Orchestration), Replit (Agent Platform), Sierra (Agent Architecture), Cognition (Infrastructure), Glean (Agentic Runtime), Anthropic (Platform).

```
Subject: OrgX → [team name]

Hey [first name],

I saw [team] is hiring for [role]. I've been building OrgX — a production MCP server and agent continuity layer that runs on Cloudflare Workers + Durable Objects. 61 tools. OAuth 2.1 + PKCE with dynamic client registration. An open benchmark with 136+ tasks across 7 domains.

The reason I'm writing: a lot of what I've shipped overlaps directly with [specific technical problem their team works on — e.g., "cross-session agent state in Replit's Agent Platform" / "reasoning reliability in Decagon's execution layer" / "MCP authorization patterns in Anthropic Connectivity"].

90-second walkthrough: mcp.useorgx.com
Code: github.com/useorgx/orgx-mcp
Writing: useorgx.com/blog

If any of that lands, I'd love 20 minutes to talk about the role — or just to swap notes on the hard parts.

Hope
```

---

## Template B — AI developer productivity / internal AI

Use for: Hightouch (AI Productivity), Mercury (AI Engineering), Whatnot (AI Dev Tools), SoFi (AI Accelerated SDLC), WorkOS (Applied AI), Docker (AI Tools and Security).

```
Subject: Cursor + Datadog MCP → [company]

Hey [first name],

Quick note. At Alma I gave an internal talk on Cursor + Datadog MCP for faster dashboard iteration, and it drove real AI tooling adoption across Quality Enablement. Since then I've been building OrgX — a production MCP server that gives AI clients persistent organizational memory, trust scoring, and decision provenance across Claude Code, Cursor, and ChatGPT.

I saw [team]'s [role] posting, and the framing — [quote one specific sentence from their JD, e.g., "MCP integrations for CircleCI, Slack, Datadog, GitHub"] — is basically the thing I've already been shipping.

Live: mcp.useorgx.com
Code: github.com/useorgx
Methodology: useorgx.com/blog

Would love 20 minutes to talk.

Hope
```

---

## Template C — Evals / quality / trust / observability

Use for: Cursor (Agent Harness / Agent Evaluation & Quality), Anthropic (Claude Code Model Quality), OpenAI (Dev Productivity), LangChain (LangSmith), HackerOne (Applied AI), TRM Labs (Agent Engineering), Datadog (AI Agent Engineer).

```
Subject: 136 agent tasks, independent judges → [team]

Hey [first name],

I've been running a public benchmark called the Autonomous Initiative Benchmark: 136+ tasks across 7 domains and 3 execution modes, with independent LLM judges and published artifacts (costs, token logs, failure cases).

The thesis is that single-shot benchmarks structurally hide cascading context — which is where most agents fail in production. I built it to pressure-test OrgX, but the methodology generalizes.

I saw [team]'s [role] posting. The overlap with what I've been running is direct. Would you be open to a 20-minute conversation? Happy to send a scored failure case or a full bundle first if it's more useful.

Methodology: useorgx.com/blog
Code: github.com/useorgx/autonomous-initiative-benchmark

Hope
```

---

## Template D — Stripe-specific

Stripe is different because your existing résumé track (Alma, Capital One) gives you warm-path credibility. Route through a referral if possible; if not, DM.

For **Bridge** and **Experimental Projects**:

```
Hi [first name],

I'm interested in the [Bridge / Experimental Projects] role. I've spent 7+ years across Capital One (regulated finance infra), Vessel (API re-architecture), Alma (HIPAA compliance + AI tooling), and now founding OrgX — an execution control plane for AI-native teams with a production MCP server, 22 MCP surfaces, and a public benchmark of 136+ autonomous tasks.

The [Bridge / Experimental] brief matches exactly how I work: ambiguous product surface, backend + systems + product in the same head, ship under pace. Would love 20 minutes to make the case.

Live work: useorgx.com · mcp.useorgx.com
Portfolio: hopeatina.com/projects/orgx

Happy to send a walkthrough first.

Hope
```

For **Product Security Data Platforms**:

```
Hi [first name],

Writing about the Product Security Data Platforms role. My background is compliance + data platforms: Capital One (Snowflake / Spark / governance pipelines in regulated finance), Alma (HIPAA observability + audit workflows), and now OrgX — where I've built a production MCP server with OAuth 2.1 + PKCE + dynamic client registration, Ed25519-signed domain verification, and full decision provenance + audit trails for agent actions.

That stack maps directly to what the newly-established Product Security Data Platforms team is likely building. Would love to talk through it.

MCP server: github.com/useorgx/orgx-mcp
Portfolio: hopeatina.com/hiring

Hope
```

---

## Target map — who to DM for each of the top 30 roles

You won't always find the named hiring manager. In that case, DM the most senior IC on the team (look at LinkedIn "People at [company]" filtered by the relevant team/skill) with a slightly softer version of the template.

### Tier 1 — Apply first, DM first, refer if possible

| Company · Role | Who to target | Template |
|---|---|---|
| Stripe · Bridge | Engineering manager on the Bridge team (Stripe LinkedIn search: "Bridge" + "Stripe") | D |
| Stripe · Experimental Projects | Same | D |
| Stripe · Product Security Data Platforms | PSEC leadership | D |
| Hightouch · AI Productivity | Engineering leadership | B |
| Mercury · Senior SWE, AI Engineering | AI Engineering EM | B |
| OpenAI · Dev Productivity | Engineering manager for Dev Prod | C |
| OpenAI · Codex Cloud | Codex team leads | A |
| Decagon · Staff SWE Agent Orchestration | Agent Orchestration leads | A |
| Cursor · Agent Harness / Agent Eval | Cursor agents team ICs | C |
| Anthropic · Model Quality SWE Claude Code | Anthropic Claude Code team | C |
| Anthropic · SWE Platform (MCP / Connectivity) | Connectivity EM | A |
| Anthropic · SWE Full-stack | Enterprise / connectors leads | A |
| Plaid · Staff SWE AI Applications | AI Applications EM | A |
| Replit · Staff SWE Agent Platform | Agent Platform EM | A |

### Tier 2 — Strong alignment, send within 2 weeks

| Company · Role | Template |
|---|---|
| Coinbase · Principal SWE AI Automation | B |
| Sierra · Agent Architecture | A |
| Cognition · SWE Infrastructure | A |
| Ivo · SWE Infrastructure | A |
| General Intelligence Company · Applied AI Engineer | A |
| Glean · Agentic Runtime | A |
| Glean · Context Platform | A |
| WorkOS · Applied AI | B |
| Whatnot · AI Dev Tools | B |
| Docker · Senior SWE AI Tools and Security | A |

### Tier 3 — Worth applying, don't over-invest

| Company · Role | Template |
|---|---|
| TRM Labs · Staff Agent Engineering | C |
| HackerOne · Staff Applied AI | C |
| Auctor · Applied AI | A |
| Anduril · Senior LLM SWE | A |
| Capital One · Lead AI Engineer Gen AI Platform | A (ref your prior Cap1 work) |
| Temporal · Staff SWE DevProd | A |
| LangChain · Senior Backend SWE LangSmith | C |
| Aircall · Senior Applied AI | A |
| Cognition (second role if relevant) | A |

---

## Outreach rhythm

- **Week 1:** send 10 DMs (5 Tier 1, 5 Tier 2). Don't wait to send perfectly — send well-enough.
- **Week 2:** send 10 more (remaining Tier 1, Tier 3). Follow up on any Week 1 that didn't respond.
- **Week 3:** apply formally to every role where a DM got a response (warm), plus the top 10 where you didn't find a target (cold).
- **Week 4:** second-touch cadence — engage publicly with posts from people you DM'd. Reply substantively to one of their tweets/posts per week.

**Target outcome:** 30 DMs → 5 conversations → 2 onsites → 1 offer inside 6 weeks.

---

## Don't skip: the warm-path audit

Before sending any cold DMs, spend 30 minutes on LinkedIn with this specific query for each of your top 15 targets:

```
"Senior" OR "Staff" at [Company Name] — filter to your 1st and 2nd degree connections.
```

If you have a 2nd-degree connection at any of these companies, the warmest possible move is:

1. Message your 1st-degree connection: "Hey — I saw you're connected to [name] at [company]. I'm applying for [role] and their work on [specific thing] maps directly to what I've been building with OrgX. Would you be open to a short intro?"

A referral request from a mutual connection converts at 30–50%. One good warm intro is worth 20 cold DMs.
