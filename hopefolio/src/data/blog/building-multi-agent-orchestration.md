---
title: "Building a Multi-Agent Orchestration Platform: Lessons from OrgX"
date: "2025-02-15"
excerpt: "Durable workflows, trust-based governance, quality gates, and agent spawning — what I learned building a 7-repo multi-agent orchestration platform."
category: "Agent Infrastructure"
---

# Building a Multi-Agent Orchestration Platform: Lessons from OrgX

Over the past 15 months and 1,270+ commits, I've been building OrgX — a multi-agent orchestration platform that coordinates AI agents across organizational workflows. This post covers the architectural decisions, hard-won lessons, and patterns that emerged from building agent infrastructure at scale.

## The Problem: Agents Need Coordination

Single-agent systems are well-understood. You give an agent a tool, a prompt, and a goal. It does its thing. But when you need *multiple* agents to collaborate on complex work — with handoffs, approvals, quality checks, and organizational memory — the coordination problem explodes.

At OrgX, I needed agents that could:
- **Spawn sub-agents** for specialized tasks
- **Hand off work** between agents with full context preservation
- **Get human approval** before taking high-impact actions
- **Score and evaluate** their own output quality
- **Remember** organizational patterns and decisions across sessions

None of the existing frameworks handled all of this well. Existing frameworks focus on single-agent chains or crew-based task assignment, but don't address organization-wide governance, trust calibration, or quality scoring across autonomous agents. I needed something that treated the *organization* as a first-class primitive.

## Architecture: Why MCP Protocol

The Model Context Protocol (MCP) became the backbone of OrgX for a specific reason: it provides a standardized way for agents to discover and use tools without tight coupling.

In OrgX, every capability is exposed as an MCP server:
- **Entity management** (creating tasks, projects, initiatives)
- **Agent spawning** (launching specialized sub-agents)
- **Decision approval** (human-in-the-loop governance)
- **Quality scoring** (composite evaluation of agent output)
- **Org memory** (querying organizational knowledge)

This means any MCP-compatible client — Claude Code, Cursor, a custom CLI — can interact with the full OrgX system through a single protocol. No custom integrations needed.

```typescript
// Example: Agent spawning via MCP tool call
const result = await mcpClient.callTool("spawn_agent_task", {
  title: "Review PR #847",
  description: "Check for security vulnerabilities and test coverage",
  assignee: "security-review-agent",
  parent_task_id: currentTask.id,
});
```

## Durable Workflows: Beyond Request-Response

The biggest architectural shift was moving from request-response agent interactions to **durable workflows**. An agent task in OrgX isn't a single LLM call — it's a stateful workflow that can:

1. **Pause for approval** — Agent proposes an action, human reviews
2. **Resume after interruption** — Context preserved across sessions
3. **Fork into sub-tasks** — Agent spawns child tasks that report back
4. **Accumulate quality scores** — Each step contributes to a composite score

This required a state machine approach. Every task has a lifecycle: `created → in_progress → pending_approval → approved → completed`, with quality gates at each transition.

## Trust-Based Governance

Not all agents should have the same permissions. OrgX implements a trust model where:

- **New agents** start with limited autonomy — every action requires approval
- **Proven agents** (based on quality scores and outcome attribution) earn more autonomy
- **High-impact actions** always require human approval regardless of trust level
- **Trust degrades** if quality scores drop

This isn't theoretical — it's how you actually run agents in a production environment where mistakes have consequences.

```typescript
// Simplified trust check
async function checkAgentAutonomy(agentId: string, action: Action) {
  const trustContext = await getTrustContext(agentId);

  if (action.impact === "high") return { requiresApproval: true };
  if (trustContext.score < AUTONOMY_THRESHOLD) return { requiresApproval: true };

  return { requiresApproval: false };
}
```

## Quality Gates and Composite Scoring

Every piece of agent work in OrgX gets scored across multiple dimensions:

- **Completeness** — Did the agent address all requirements?
- **Accuracy** — Is the output factually correct?
- **Code quality** — Does generated code follow standards?
- **Communication** — Did the agent explain its reasoning?

These individual scores feed into a **composite scoring engine** that weights dimensions based on the task type. A code review task weights accuracy and code quality higher; a research task weights completeness higher.

The scoring isn't just for record-keeping — it feeds back into the trust model, outcome attribution, and future agent routing decisions.

## Org Memory: Learning Across Sessions

One of the hardest problems was organizational memory. Agents need to:
- Remember past decisions and their outcomes
- Learn from what worked and what didn't
- Share knowledge across agent boundaries

OrgX stores learnings in Supabase with semantic search capability. When an agent starts a new task, it queries relevant learnings:

```typescript
const learnings = await queryOrgMemory({
  context: task.description,
  limit: 5,
  minRelevance: 0.7,
});
```

This creates a compounding advantage — the more work agents do, the better the organization's collective memory becomes.

## The 7-Repo Ecosystem

OrgX isn't a single repo. It's a 7-repo ecosystem that includes:

- **Core platform** — Next.js app with Supabase backend
- **MCP server** — Tool definitions and handler implementations
- **Claude Code skills** — Custom skills for Claude Code integration
- **Cursor plugin** — IDE integration for agent orchestration
- **CLI tools** — Command-line interfaces for agent management
- **OpenClaw plugin** — Browser extension for agent control

This modularity was intentional. Each piece can evolve independently, and the MCP protocol ensures they all interoperate.

## What I'd Do Differently

1. **Start with the trust model earlier.** I added governance after building the core orchestration, and retrofitting trust checks was painful.

2. **Invest in observability from day one.** Debugging multi-agent workflows without good tracing is like debugging distributed systems without logs.

3. **Design for human-in-the-loop from the start.** The approval workflow wasn't an afterthought, but I underestimated how central it would become.

## Key Takeaways

Building agent infrastructure is fundamentally different from building agent applications. Applications use agents; infrastructure makes agents reliable, governable, and observable.

The patterns that matter most:
- **Durable workflows** over request-response
- **Trust-based governance** over unlimited autonomy
- **Quality gates** at every state transition
- **Organizational memory** that compounds over time
- **Protocol-first design** (MCP) for interoperability

If you're building in this space, I'd love to compare notes. Reach out at [hopeatina@gmail.com](mailto:hopeatina@gmail.com) or find me on [GitHub](https://github.com/hopeatina).
