# GitHub profile updates — action list

## 1. Update profile bio (requires `user` scope — run yourself)

The `gh` token in this environment has `gist, read:org, repo, workflow` but not `user`. Refresh auth, then patch the profile:

```bash
gh auth refresh -h github.com -s user
gh api --method PATCH user \
  -f bio='Building OrgX — continuity infra for AI agents. MCP, persistent memory, trust scoring, decision provenance. Prev: Alma, Vessel, Capital One.' \
  -f blog='useorgx.com' \
  -f company='@useorgx'
```

Alternative: do it in the UI at https://github.com/settings/profile

- **Name:** Hope Atina
- **Bio:** `Building OrgX — continuity infra for AI agents. MCP, persistent memory, trust scoring, decision provenance. Prev: Alma, Vessel, Capital One.`
- **Company:** `@useorgx`
- **Website:** `useorgx.com`
- **Location:** Houston, TX

## 2. Re-pin 6 repos (must be done in the UI — no REST API)

Go to https://github.com/hopeatina → "Customize your pins" → remove the current pins (biobreaks, biodesign-mail, purrchr, percey-mlnd-capstone, portfolio) and replace with these in this order:

1. **useorgx/orgx-mcp** — flagship MCP server, 61 tools, OAuth 2.1 + DCR
2. **useorgx/autonomous-initiative-benchmark** — public methodology, 136+ tasks
3. **useorgx/orgx-claude-code-plugin** — Claude Code integration
4. **useorgx/openclaw-plugin** — browser-native mission control, 30 MCP tools
5. **useorgx/orgx-gateway-sdk** — Gateway Protocol v1 SDK
6. **hopeatina/portfolio** — this site (Next.js, case studies)

Note: GitHub lets you pin repos from orgs you're a member of. If you can't see useorgx repos in the pin picker, make sure your membership on the useorgx org is set to "Public" visibility at https://github.com/orgs/useorgx/people.

## 3. Also worth doing

- **Set the repo descriptions** on every useorgx repo so they render well on the pinned grid. Run this for a quick audit:
  ```bash
  gh repo list useorgx --limit 50 --json name,description,url --jq '.[] | select(.description == "" or .description == null) | "[EMPTY] " + .name + " → " + .url'
  ```
- **Add topics** to pinned repos (`mcp`, `ai-agents`, `agent-infrastructure`, `llm-tools`, `orchestration`). Topics are what makes repos discoverable through GitHub search.
  ```bash
  gh api --method PUT "repos/useorgx/orgx-mcp/topics" -f names='["mcp","ai-agents","agent-infrastructure","llm-tools","orchestration","cloudflare-workers","typescript"]'
  ```
- **Star your own repos** from the @hopeatina account. Not vanity — starring is how GitHub surfaces "repos by this user you might like" to followers. Every star on useorgx/orgx-mcp = one more chance it appears on someone's feed.
- **Add a README profile** at https://github.com/hopeatina/hopeatina (special repo that renders on your profile page). Short pitch + links to OrgX + top artifacts. See draft at `artifacts/github-profile-readme.md`.

## 4. Verification

After the pins are re-ordered:

```bash
gh api graphql -f query='
query {
  user(login: "hopeatina") {
    pinnedItems(first: 10) {
      nodes {
        ... on Repository { nameWithOwner description }
      }
    }
  }
}' --jq '.data.user.pinnedItems.nodes'
```

Should return the six repos in order.
