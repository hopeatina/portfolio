---
title: "Durable Objects for Agent Memory: A Cloudflare Pattern"
date: "2026-04-14"
excerpt: "If your MCP server's session state disappears on deploy, you haven't finished building it. Here's the pattern we use in OrgX to keep it alive."
category: "Infrastructure"
readTime: "7 min read"
tags:
  - Cloudflare
  - Durable Objects
  - MCP
  - Infrastructure
  - Agents
relatedPosts:
  - mcp-in-production
  - mcp-needs-oauth-dcr
  - building-multi-agent-orchestration
---

The first time I deployed [orgx-mcp](https://github.com/useorgx/orgx-mcp) to Cloudflare Workers, I did the thing every first-time Workers user does: I put session state in memory inside the Worker.

It worked beautifully — for about four hours. Then Cloudflare scaled the Worker across regions, my user's next MCP call landed on a different instance, and the session had no idea who they were. I learned what every Workers user learns: Workers are stateless. They have to be.

What saved the project was the same platform feature that punished me: **Durable Objects**. This post is about how we actually use them in orgx-mcp, why the pattern works for MCP specifically, and what I would tell you if you were about to build something similar.

## The shape of the problem

An MCP session has more state than an HTTP request:

- **Identity** — which user, which client, which workspace.
- **Auth** — OAuth tokens, refresh tokens, expiry.
- **Transport** — HTTP streaming or SSE, with in-flight tool calls.
- **Conversation context** — what tools have been called, what's been returned.
- **Workspace state** — which initiative the agent is operating in, which entities are in scope.

In a traditional server you'd put most of this in memory for the lifetime of the connection and reach for Redis for anything that needed to survive a restart. On Workers, there is no lifetime. The next request might hit a different machine in a different region with no memory of the last one.

You have three options:

1. **Stateless + external store** (Postgres, Redis, KV). Every request pays the round-trip cost. Works but expensive.
2. **Stateful edge** (Durable Objects). The request gets routed to the instance that holds the state. Cheap and fast, but you have to think about how to shape the state.
3. **Some combination.**

For MCP sessions, option 2 is the right answer, and the reason is latency. Every MCP tool call is in the critical path of an LLM response. If your auth check and session lookup take 150ms, the user feels it. Durable Objects put the state on the edge where the request is already landing.

## The orgx-mcp Durable Object pattern

We use one Durable Object per MCP session. Here's the relevant piece of the Wrangler config:

```toml
[[durable_objects.bindings]]
name = "MCP_SESSION"
class_name = "MCPSession"

[[migrations]]
tag = "v1"
new_sqlite_classes = ["MCPSession"]
```

And the class itself:

```typescript
export class MCPSession {
  private state: DurableObjectState;
  private sql: SqlStorage;

  constructor(state: DurableObjectState) {
    this.state = state;
    this.sql = state.storage.sql;
    this.initSchema();
  }

  private initSchema() {
    this.sql.exec(`
      CREATE TABLE IF NOT EXISTS auth (
        client_id TEXT PRIMARY KEY,
        access_token TEXT,
        refresh_token TEXT,
        expires_at INTEGER
      );

      CREATE TABLE IF NOT EXISTS context (
        key TEXT PRIMARY KEY,
        value JSON
      );

      CREATE TABLE IF NOT EXISTS in_flight_calls (
        call_id TEXT PRIMARY KEY,
        tool TEXT,
        args JSON,
        started_at INTEGER
      );
    `);
  }

  async fetch(request: Request) {
    // route MCP messages into per-session handlers
    // SQL is the persistence boundary
  }
}
```

The key move is `new_sqlite_classes`. This upgrades the DO from its legacy KV-like storage API to an actual embedded SQLite. That matters because MCP session state has relational shape — you want to join `auth`, `context`, and `in_flight_calls`, and you want transactions.

## Why this pattern survives deploys

The entire point of a Durable Object is that its lifetime is decoupled from Worker deploys. When I push a new version of orgx-mcp:

1. New Worker code is deployed globally within a few seconds.
2. Any in-flight request completes against the old version.
3. Next request hits the new Worker code.
4. The DO instance storing the session is the same DO instance. Its SQLite data is intact.
5. The Worker's new code hits the existing DO and resumes the session.

I've deployed orgx-mcp hundreds of times now. Users don't get logged out. In-flight tool calls don't drop. The MCP `listChanged` notifications keep flowing because the SSE transport reconnects against the same DO.

Compare that to a session store in Redis. Every deploy, I'd need to worry about cache keys, about in-flight operations, about what happens if the Worker restarts mid-stream. The DO pattern removes that entire class of problem.

## The three things that tripped me up

**One. DO IDs have to be deterministic.** Your MCP session needs to route to the *same* DO every request. We derive the DO ID from a hash of `(client_id, workspace_id)`. That means if a user has two clients (Claude Desktop and Cursor) connected to the same workspace, they get two separate DOs. Good — each client has its own session. But it also means if I change the hash function, every existing session orphans. I haven't changed it. I won't.

**Two. SQLite classes can't be un-declared.** Once you migrate a DO class to SQLite-backed storage, you can't go back. You can't even delete the class without a graveyard migration. This is fine in practice but worth knowing before you commit.

**Three. DO execution is serialized per-instance.** That's usually a feature — no concurrency bugs inside a single session — but it means if one MCP tool call takes 30 seconds, other calls to the same DO wait. We move long-running work out of the DO fast path by queueing it into [Trigger.dev](https://trigger.dev) and returning a call ID. The DO stores the call ID; the client polls or subscribes.

## Cost

For orgx-mcp's current scale, Durable Objects cost essentially nothing. The first GB of SQLite storage is free. The first 1M DO invocations are free. I've never come close to leaving the free tier.

The cost curve gets interesting around 10k+ active daily sessions. At that scale you'd want to think about (a) session TTL and archival, (b) whether some sessions should share a DO, (c) whether the DO should coordinate with an R2 bucket for larger artifacts. Not my problem yet, but I've sketched the migration.

## The broader lesson

If you're building MCP infrastructure on Cloudflare Workers, the right default is: **every MCP session is a Durable Object; the DO holds SQLite-backed state; long-running work moves out of the DO fast path**. That pattern covers 90% of what a production MCP server needs.

The full implementation is in [github.com/useorgx/orgx-mcp](https://github.com/useorgx/orgx-mcp). The auth module is particularly worth a look if you care about how OAuth state survives across deploys — I wrote about [that piece separately here](/blog/mcp-needs-oauth-dcr).

If you're at a team building on Cloudflare Workers + MCP and want to trade notes, find me at hopeatina@gmail.com or on [github.com/useorgx](https://github.com/useorgx).
