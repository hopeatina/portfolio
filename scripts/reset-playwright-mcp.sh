#!/usr/bin/env bash

set -euo pipefail

PROFILE_DIR="${PLAYWRIGHT_MCP_PROFILE_DIR:-$HOME/Library/Caches/ms-playwright/mcp-chrome}"
TIMESTAMP="$(date +%s)"
HARD_RESET=0

if [[ "${1:-}" == "--hard-reset" ]]; then
  HARD_RESET=1
fi

echo "Resetting Playwright MCP profile state"
echo "Profile: $PROFILE_DIR"

MCP_PIDS="$(pgrep -f "playwright-mcp|@playwright/mcp" || true)"
if [[ -n "$MCP_PIDS" ]]; then
  echo "Stopping stale playwright-mcp processes: $MCP_PIDS"
  # shellcheck disable=SC2086
  kill $MCP_PIDS 2>/dev/null || true
  sleep 1
  # shellcheck disable=SC2086
  kill -9 $MCP_PIDS 2>/dev/null || true
else
  echo "No stale playwright-mcp processes found"
fi

if [[ -d "$PROFILE_DIR" ]]; then
  PROFILE_PIDS="$(pgrep -f "$PROFILE_DIR" || true)"
  if [[ -n "$PROFILE_PIDS" ]]; then
    echo "Stopping Chrome helpers still attached to MCP profile: $PROFILE_PIDS"
    # shellcheck disable=SC2086
    kill $PROFILE_PIDS 2>/dev/null || true
    sleep 1
    # shellcheck disable=SC2086
    kill -9 $PROFILE_PIDS 2>/dev/null || true
  fi

  rm -f \
    "$PROFILE_DIR/SingletonLock" \
    "$PROFILE_DIR/SingletonCookie" \
    "$PROFILE_DIR/SingletonSocket" \
    "$PROFILE_DIR/DevToolsActivePort"

  if (( HARD_RESET == 1 )); then
    BACKUP_DIR="${PROFILE_DIR}.bak.${TIMESTAMP}"
    echo "Hard reset enabled. Moving profile to $BACKUP_DIR"
    mv "$PROFILE_DIR" "$BACKUP_DIR"
    mkdir -p "$PROFILE_DIR"
  fi
else
  echo "Profile directory does not exist yet. Nothing to clean."
fi

echo "Playwright MCP reset complete"
echo "Next step: retry the MCP browser action. Use --hard-reset if the profile still refuses to launch."
