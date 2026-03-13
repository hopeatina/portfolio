# Playwright MCP Recovery

## The actual failure mode

The recurring Playwright MCP launch failure on this machine is not random.

It comes from two things happening together:

1. `playwright-mcp` uses a persistent Chrome profile at:
   - `~/Library/Caches/ms-playwright/mcp-chrome`
2. old `playwright-mcp` node processes and Chrome helper processes are being left behind across sessions

When a new MCP session tries to call `launchPersistentContext`, Chrome sees the old profile lock files:

- `SingletonLock`
- `SingletonCookie`
- `SingletonSocket`

and the launch fails.

## Evidence on this machine

When this issue was investigated on 2026-03-12, the machine had:

- multiple stale `playwright-mcp` node processes from prior days
- active Chrome helper processes still pointing at `~/Library/Caches/ms-playwright/mcp-chrome`
- persistent lock files inside that profile directory

This is why the fallback to repo-local Playwright CLI keeps working while MCP intermittently fails: CLI launches use an isolated temp profile; MCP reuses the shared one.

## Fast recovery

Run:

```bash
/Users/hopeatina/Code/portfolio/scripts/reset-playwright-mcp.sh
```

If the shared profile is still corrupted or wedged, run:

```bash
/Users/hopeatina/Code/portfolio/scripts/reset-playwright-mcp.sh --hard-reset
```

The hard reset moves the profile aside and starts a fresh one.

## What the reset script does

- kills stale `playwright-mcp` processes
- kills Chrome helpers still attached to the MCP profile
- removes profile lock files:
  - `SingletonLock`
  - `SingletonCookie`
  - `SingletonSocket`
  - `DevToolsActivePort`
- optionally rotates the whole profile on `--hard-reset`

## Best practice

1. Use MCP Playwright as the primary browser QA path.
2. If launch fails with `launchPersistentContext`, run the reset script immediately.
3. Only fall back to repo-local Playwright CLI if MCP still fails after a hard reset.

## Long-term fix

The real long-term fix is to ensure only one active MCP Playwright server owns the profile at a time. The reset script makes recovery deterministic, but the underlying issue is stale session cleanup, not the site being tested.
