---
title: "Taking MCP to Production: How OrgX Uses the Model Context Protocol"
date: "2025-01-28"
excerpt: "A deep-dive into MCP protocol, building MCP server integrations, tool-calling middleware patterns, and reducing agent friction in production."
category: "MCP Protocol"
---

# Taking MCP to Production: How OrgX Uses the Model Context Protocol

The Model Context Protocol (MCP) is one of those ideas that sounds simple but changes everything. Instead of building custom integrations for every AI client, you build one MCP server and any compatible client can use your tools. In OrgX, MCP isn't a nice-to-have — it's the core integration layer that makes multi-agent orchestration possible.

This post covers how OrgX uses MCP in production, the patterns that emerged, and the friction points I had to solve.

## Why MCP for Agent Orchestration

Before MCP, every agent integration in OrgX was a custom API call. Claude Code needed one integration. Cursor needed another. The CLI needed a third. Each time I added a capability to OrgX, I had to update three or four clients.

MCP eliminates this. Every OrgX capability is exposed as an MCP tool:

```typescript
// One tool definition, accessible from any MCP client
server.tool("save_issue", {
  description: "Create or update a task in OrgX",
  inputSchema: {
    type: "object",
    properties: {
      title: { type: "string" },
      description: { type: "string" },
      status: { type: "string", enum: ["backlog", "in_progress", "done"] },
      assignee: { type: "string" },
    },
    required: ["title"],
  },
});
```

Now Claude Code, Cursor, and my CLI all discover and use this tool through the same protocol. When I add a new capability, all clients get it automatically.

## The OrgX MCP Server Architecture

The OrgX MCP server exposes 131+ tools across 22 MCP servers, organized into capability groups:

**Entity Management**
- `orgx_create_entity`, `orgx_update_entity`, `list_entities` — CRUD for tasks, projects, initiatives
- `save_issue`, `get_issue`, `list_issues` — Task management
- `save_project`, `get_project`, `list_projects` — Project management
- `save_milestone`, `get_milestone` — Milestone tracking

**Agent Orchestration**
- `spawn_agent_task` — Launch a specialized sub-agent
- `handoff_task` — Transfer work between agents
- `start_autonomous_session` — Begin an autonomous work session
- `check_spawn_guard` — Verify agent spawning permissions
- `get_agent_status` — Check agent state and active sessions

**Governance**
- `get_pending_decisions` — List actions awaiting approval
- `approve_decision` — Approve a proposed action
- `reject_decision` — Reject with feedback
- `get_my_trust_context` — Check current trust level

**Quality**
- `orgx_quality_score`, `record_quality_score` — Score agent output
- `get_scoring_signals` — Get scoring criteria
- `verify_entity_completion` — Validate completion criteria
- `record_outcome` — Record task outcome for attribution

**Intelligence**
- `query_org_memory` — Semantic search over organizational knowledge
- `submit_learning` — Record a new learning
- `get_relevant_learnings` — Context-aware learning retrieval
- `get_morning_brief` — Daily summary of org activity

**External Integrations (22 MCP Servers)**

Beyond the core OrgX tools, the platform integrates with 22 external MCP servers: GitHub, Slack, Google Drive, Notion, HubSpot, Figma, Stripe, Vercel, Supabase, Asana, PostHog, Sentry, Intercom, Datadog, Box, Kling AI, Runway, Firecrawl, Playwright, Fal.AI, and more. Each integration exposes additional tools through the same MCP protocol, allowing agents to interact with external services as naturally as they interact with OrgX itself.

## Tool-Calling Middleware Patterns

Raw MCP tool definitions aren't enough for production. You need middleware. In OrgX, every tool call passes through:

### 1. Authentication & Authorization

Every MCP connection carries session context. Before a tool executes, middleware checks:
- Is this agent authenticated?
- Does this agent have permission for this action?
- Is this action within the agent's trust level?

### 2. Input Validation

MCP's JSON Schema validation catches type errors, but business logic validation happens in middleware:

```typescript
async function validateSpawnGuard(params: SpawnParams) {
  const activeAgents = await getActiveAgentCount(params.sessionId);
  if (activeAgents >= MAX_CONCURRENT_AGENTS) {
    throw new Error(`Agent limit reached (${MAX_CONCURRENT_AGENTS})`);
  }

  const parentDepth = await getTaskDepth(params.parent_task_id);
  if (parentDepth >= MAX_SPAWN_DEPTH) {
    throw new Error("Maximum agent nesting depth reached");
  }
}
```

### 3. Audit Logging

Every tool call is logged with full context — who called it, what parameters, what result, how long it took. This is essential for debugging multi-agent workflows and for the outcome attribution system.

### 4. Rate Limiting

Agents can be chatty. Without rate limiting, a misbehaving agent can blow through API quotas in minutes. OrgX implements per-agent rate limits with backpressure.

## Reducing Agent Friction

The biggest lesson from building MCP integrations: **agent friction kills productivity**. Agent friction is anything that makes it harder for an agent to do useful work:

- **Discovery friction**: Agent doesn't know what tools exist
- **Schema friction**: Tool parameters are confusing or poorly documented
- **Error friction**: Failures return unhelpful messages
- **Context friction**: Agent loses context between tool calls

### Solving Discovery Friction

MCP handles basic discovery, but I found that agents need *guided* discovery. OrgX includes a `recommend_next_action` tool that suggests what the agent should do next based on current context:

```typescript
server.tool("recommend_next_action", {
  description: "Get a recommended next action based on current task context",
  // Returns: { action: "spawn_agent_task", reason: "PR needs security review", params: {...} }
});
```

### Solving Error Friction

Every OrgX tool returns structured errors with recovery suggestions:

```json
{
  "error": "Task not found",
  "code": "ENTITY_NOT_FOUND",
  "suggestion": "Use list_issues to find available tasks, or create a new one with save_issue"
}
```

This alone dramatically improved agent success rates. Instead of retrying the same failed call, agents can self-correct.

### Solving Context Friction

Multi-step workflows lose context between tool calls. OrgX solves this with `get_task_with_context` — a single tool call that returns the current task plus all relevant context (parent task, related issues, recent activity, applicable learnings):

```typescript
const context = await callTool("get_task_with_context", { task_id: current.id });
// Returns: task + parent + children + recent_activity + relevant_learnings + trust_context
```

## OAuth and Auth Flows

One of the trickiest production concerns is authentication. MCP connections from Claude Code use one auth flow; connections from a web app use another; connections from the CLI use a third.

OrgX implements a unified auth layer that handles:
- **OAuth flows** for web-based clients
- **API key auth** for CLI and programmatic access
- **Session-based auth** for MCP connections with session context
- **Re-authentication** on 401 responses (critical for long-running agent sessions)

The re-auth pattern was particularly important. Agent sessions can run for hours, and tokens expire. Without automatic re-auth, long sessions would fail silently.

## Claude Code Skills Integration

Beyond the MCP server, OrgX integrates directly with Claude Code through custom skills. These skills provide higher-level workflows:

- **`/orgx-plan`** — Start a planning session for an initiative
- **`/orgx-review`** — Review and score a completed task
- **`/orgx-brief`** — Get a morning brief of organizational activity

Skills compose multiple MCP tool calls into coherent workflows. A single `/orgx-plan` skill call might invoke an estimated 8-10 MCP tools under the hood.

## Production Lessons

**1. Test tools with real agents, not unit tests.** Unit tests verify that tools work. Real agent testing reveals that tools are confusing, poorly named, or return too much data.

**2. Version your MCP server.** Breaking changes in tool schemas break every client simultaneously. Semantic versioning and deprecation warnings save headaches.

**3. Monitor tool call patterns.** Which tools do agents use most? Which do they never use? Which fail most often? This data drives API design improvements.

**4. Keep tool descriptions extremely clear.** The description field in an MCP tool definition is the primary way agents decide whether to use a tool. Vague descriptions = wrong tool choices.

## What's Next

The MCP ecosystem is evolving fast. Sampling, resources, and prompts are expanding what's possible. For OrgX, the next steps are:

- **MCP resources** for exposing org memory as browsable context
- **Streaming results** for long-running agent operations
- **Multi-server composition** — agents using tools from multiple MCP servers in a single workflow

If you're building MCP server integrations, I'd love to hear about your patterns and friction points. The protocol is young enough that the community's shared experience will shape best practices.

Find me at [hopeatina@gmail.com](mailto:hopeatina@gmail.com) or on [GitHub](https://github.com/hopeatina).
