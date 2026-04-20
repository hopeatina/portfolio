---
title: "The Claim Graph: Why Typed Provenance Beats RAG for Agent Systems"
date: "2026-04-17"
excerpt: "RAG retrieves text. A claim graph retrieves decisions, their justifications, and who approved them. For agent systems, the second one is what actually matters."
category: "Agent Infrastructure"
readTime: "8 min read"
tags:
  - Agents
  - Memory
  - RAG
  - Provenance
  - Architecture
relatedPosts:
  - mcp-in-production
  - building-multi-agent-orchestration
  - trust-models-for-agent-autonomy
---

The default answer to "how should my agent have memory" in 2026 is RAG. Chunk the docs, embed them, retrieve the top-k most similar on each turn. For a chatbot answering questions about a static knowledge base, this works.

For an agent making decisions that affect real work — shipping code, approving a transaction, writing to a database — it doesn't. Not because the retrieval is wrong. Because the thing being retrieved is wrong.

What agents need is **provenance**, not prose. This post is about why, and about the data structure we built to deliver it in [OrgX](https://useorgx.com): the **claim graph**.

## What RAG gives an agent, and what it leaves out

RAG gives an agent three things per turn:

1. Some text that is semantically similar to what was just said.
2. Some metadata (source, date, URL).
3. Nothing else.

That's fine for "help me summarize this PDF." It is not fine for "decide whether to approve this code change based on what we decided last week."

The missing pieces are structural:

- **Who** made the relevant decision, and when?
- **What** were they deciding between?
- **Why** did they choose what they chose?
- **Who** approved it, and on what evidence?
- **What** has changed since — has that decision been superseded, weakened, or reinforced?
- **Is this decision still binding**, or did we quietly abandon it?

You can try to pack this into RAG by jamming it all into one long document and hoping the embedding captures it. It won't. These are graph questions, not semantic-similarity questions.

## What a claim graph is

A claim graph is a typed directed graph where every node is an assertion (a "claim") and every edge encodes the relationship between claims. Every node has structured metadata — who made it, when, what it's attached to, what evidence supports it, whether it's been superseded.

Here's the minimal shape we use in OrgX:

```typescript
type Claim = {
  id: string;
  type: 'decision' | 'observation' | 'constraint' | 'commitment' | 'evidence';
  statement: string;           // human-readable
  author: AgentId | HumanId;
  authored_at: ISO8601;
  attached_to: EntityRef[];     // initiative, workstream, task, ...
  supporting: ClaimId[];         // claims this one builds on
  contradicts: ClaimId[];        // claims this one refutes
  superseded_by: ClaimId | null; // null if active
  approval: ApprovalRecord | null;
};
```

And edges:

- `SUPPORTS` — claim A provides evidence for claim B.
- `CONTRADICTS` — claim A refutes claim B. (Both can stay in the graph; one gets flagged as inactive.)
- `SUPERSEDES` — claim A replaces claim B in the active layer.
- `COMMITS_TO` — claim A binds a claimant to claim B.
- `REQUIRES_APPROVAL_FROM` — claim A cannot become active without approval B.

That's it. Five node types, five edge types, structured metadata. From that primitive, you can reconstruct the decision history of any initiative.

## What retrieval looks like against a claim graph

When an agent asks "what's the current plan for launching feature X," the retrieval isn't "give me text similar to 'launching feature X.'" It's a typed query:

1. Find all active `commitment` claims attached to entity `feature-X`.
2. For each, walk backward through `SUPPORTS` edges to find the evidence.
3. For each, walk forward through `SUPERSEDES` to confirm the claim is still active.
4. For each, walk through `REQUIRES_APPROVAL_FROM` to confirm approval state.

The agent gets back a graph, not a paragraph. It knows what was decided, why, by whom, and whether anything has changed. It knows what's still open. It knows what's blocked.

Compare this to RAG returning "We discussed launching feature X on April 3. Someone mentioned we might want to wait for the security review." Useful if you squint. Useless for deciding what to do now.

## Why structure beats embeddings for this job

RAG's strength — "find stuff that looks similar" — is also its weakness. Decisions that look similar semantically are often decisions that explicitly contradict each other. "We will ship this feature next week" and "We decided to hold this feature until security review" are near-identical in embedding space and complete opposites in intent.

The claim graph makes that explicit. `CONTRADICTS` is a first-class edge. When two claims contradict, the graph tells you directly. The agent never has to infer it from semantic distance.

The tradeoff is labor. RAG is cheap: chunk, embed, retrieve. A claim graph requires that claims get structured at creation time. Either a human does it, or an agent does it, or a system does it. That's real overhead.

In OrgX we pay that overhead because the use case demands it. Every MCP tool that creates a decision, an observation, a commitment, or approval submits a structured claim. The agents that operate through OrgX can only update org state by emitting claims. That's the contract. Raw text inputs go through a normalization pass that extracts claim structure — imperfectly, but good enough that retrieval works.

## When a claim graph is the wrong tool

Not every agent system needs this. If your agent is answering questions about a static document corpus, RAG is fine. If your agent's output is one-shot text generation with no persistence, RAG is fine.

Use a claim graph when:

- **State persists across sessions** and different agents need to read each other's work.
- **Decisions have consequences** — writing to prod, spending money, altering records.
- **Human approval is required** for some actions and the approval provenance matters.
- **Conflict resolution matters** — two agents or humans can disagree, and you need the system to surface the disagreement instead of hiding it in embedding space.

Every production agent system I've built or looked at closely has needed claim-graph-shaped memory. The ones that shipped RAG-only eventually paid in production incidents that looked like amnesia: the agent forgot a commitment, overrode a decision, made the same mistake twice.

## Where this is going

The MCP ecosystem is about to get serious about memory. The Anthropic team's work on [MCP Apps](https://github.com/modelcontextprotocol) already includes structured resource APIs that hint at a graph direction. I expect the 2026 production agent stack to look like: typed claim graph at the memory layer, MCP at the tool layer, OAuth 2.1 + DCR at the auth layer.

OrgX is one implementation of that stack. Code for the claim graph lives in [github.com/useorgx](https://github.com/useorgx). The full architecture walkthrough is in the [OrgX case study on my portfolio](/projects/orgx).

If you're building agent memory for a production system and want to compare notes, my email is hopeatina@gmail.com. If you're hiring for agent platforms or MCP infrastructure, I'm at [hopeatina.com/hiring](/hiring).
