# Resume variants — tailoring guide

Your master resume is at `hopefolio/public/resume/hope-atina-resume.md`. It's the version people download from the portfolio. For specific top-tier applications, make these small, surgical edits so the keywords match what the recruiter's ATS and hiring manager are scanning for. **Never rewrite the whole thing — just swap the summary, reorder two bullets, and adjust the skills line.**

## How to export to PDF

From the markdown file in this repo:

```bash
# Option 1: Pandoc (cleanest typography, requires LaTeX engine)
pandoc hopefolio/public/resume/hope-atina-resume.md \
  -o hopefolio/public/resume/hope-atina-resume.pdf \
  --pdf-engine=xelatex \
  -V geometry:margin=0.7in -V fontsize=10pt

# Option 2: Markdown → HTML → PDF via Chrome headless (no LaTeX needed)
npx md-to-pdf hopefolio/public/resume/hope-atina-resume.md

# Option 3: VS Code "Markdown PDF" extension (easiest)
# Right-click the md file → "Markdown PDF: Export (pdf)"
```

Drop the generated PDF at `hopefolio/public/resume/hope-atina-resume.pdf` so the "Download resume" link on `/hiring` works.

---

## Variant 1 — Stripe Bridge / Experimental Projects

**What to change:** Replace the Summary block with this:

```markdown
## Summary

Senior software engineer and founder with 7+ years shipping backend systems, internal platforms, and AI-native products across regulated healthtech, fintech data platforms, and agent infrastructure. Strong in API design, async workflows, orchestration, observability, and turning ambiguous operational problems into production systems. Currently building OrgX — a production MCP server and agent continuity layer with 61 tools, OAuth 2.1 + dynamic client registration, and a public benchmark of 136+ autonomous tasks.
```

**Also do:** Move BrainBuffet bullet point up — put it immediately after OrgX so the ship-to-market story reads tight. Add a line to the OrgX section: "Led product, architecture, and implementation end-to-end from 0→1 under evolving requirements."

**Keep everything else.**

---

## Variant 2 — Stripe Product Security Data Platforms (and other infra/security roles)

**What to change:** Replace the Summary block with this:

```markdown
## Summary

Senior software engineer with 7+ years building backend platforms, data pipelines, and production systems in regulated and operationally sensitive environments. At Capital One, automated ETL, dataset metadata registration, and governance workflows for Snowflake in regulated finance. At Alma, shipped HIPAA-compliant workflows and Datadog observability that reduced production errors by 20%. Currently building OrgX — a production MCP server with OAuth 2.1 + PKCE + dynamic client registration, Ed25519-signed domain verification, Durable-Object-backed session state, and audit-trail-driven decision provenance.
```

**Also do:** Reorder the Experience section so Capital One comes before Alma in visual prominence (keep dates accurate, just make the Capital One bullets richer). Add a bullet to Alma: "Built observability coverage (Datadog dashboards, alerts) for clinical workflows with audit and compliance requirements."

In the OrgX section, bring the auth/governance/provenance language to the top:

```markdown
- Designed a production MCP server with OAuth 2.1 + PKCE + dynamic client registration — no API keys in environments, credentials persisted in Durable Object SQLite.
- Built Ed25519-signed domain verification and an automated release pipeline for platform registry publishing.
- Architected append-only audit trails, evidence capture, and human-in-the-loop approval gates for graduated agent autonomy.
```

---

## Variant 3 — Agent platform / MCP infrastructure roles (Anthropic, Replit, Decagon, Cursor, Sierra, Cognition, Plaid, Hightouch)

**What to change:** Replace the Summary block with this:

```markdown
## Summary

Senior software engineer building agent orchestration infrastructure: persistent organizational memory, trust scoring, decision provenance, and MCP tooling that unifies context across Claude Code, Cursor, and ChatGPT. 7+ years of production experience across healthtech compliance (Alma), data platforms (Capital One), and 0→1 AI products. Currently ship OrgX — a platform of 12 repos, 22 MCP servers, 131+ tools, OAuth 2.1 + DCR auth, and a public benchmark of 136+ cross-session autonomous tasks with independent judges.
```

**Also do:** This is the variant where OrgX absolutely leads. Move "Selected founder products" section **above** "Experience" so OrgX is the first thing a reader sees after Summary + Skills. Add a bullet to OrgX: "Opened the OrgX Gateway Protocol v1 and published companion SDKs (`orgx-gateway-sdk`, `orgx-ui-kit`, `orgx-data`) to let external tools integrate into the execution layer."

---

## Shared tweaks for all variants

- In the Skills line, reorder so the first technology matches the role's primary stack. For Anthropic → TypeScript first. For Stripe backend → Python first. For data platforms → SQL + Scala first.
- Keep the resume under 1 page if possible, at most 1.5. The current length is ~700 words — already one page in most layouts.
- Never lie, never exaggerate. Every number in the resume (136+ tasks, 61 tools, 22 MCP servers, 20% error reduction, 72% adoption, 93% bug reduction) is already true.

## File naming

Save each variant as its own file for clarity when you submit:

```
hopefolio/public/resume/hope-atina-resume.pdf             (master)
hopefolio/public/resume/hope-atina-resume-stripe.pdf
hopefolio/public/resume/hope-atina-resume-infra.pdf
hopefolio/public/resume/hope-atina-resume-agents.pdf
```

The `/hiring` page uses the master. Hand the variants out in direct applications.
