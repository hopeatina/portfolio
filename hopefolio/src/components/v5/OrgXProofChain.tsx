const thesisSignals = [
  {
    index: "01",
    category: "Unit of work",
    title: "Delegation is becoming long-horizon.",
    detail:
      "OpenAI describes the shift from short chatbot interactions to delegated work that can run for minutes or hours across tools and environments.",
    source: "OpenAI Economic Research · Jun 2026",
    href: "https://openai.com/index/how-agents-are-transforming-work/",
  },
  {
    index: "02",
    category: "Reliability",
    title: "Completion remains probabilistic.",
    detail:
      "METR measures frontier-agent time horizons at both 50% and 80% reliability across more than one hundred software tasks. Capability is rising; a demo is still not a guarantee.",
    source: "METR Time Horizons · May 2026",
    href: "https://metr.org/time-horizons/",
  },
  {
    index: "03",
    category: "Evaluation",
    title: "The final answer is not enough evidence.",
    detail:
      "Anthropic’s agent-evaluation guidance combines automated evals, production monitoring, transcript review, and human judgment because no single layer catches every failure.",
    source: "Anthropic Engineering · Jan 2026",
    href: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents",
  },
  {
    index: "04",
    category: "Precedent",
    title: "Consequential automation already travels with attestations.",
    detail:
      "The CNCF-graduated in-toto framework verifies that supply-chain steps happened as planned, under the right authority, without the result being altered in transit.",
    source: "in-toto · stable specification",
    href: "https://in-toto.io/docs/getting-started/",
  },
];

const contractProof = [
  {
    label: "Public contract",
    detail: "Account-free schema, types, fixtures, conformance vectors, and validator source.",
    meta: "Apache-2.0 · repository preview",
    href: "https://github.com/useorgx/agent-work-receipt",
  },
  {
    label: "Live validator",
    detail: "Paste or load a receipt and check it without creating an OrgX account.",
    meta: "No persistence · 256 KB boundary",
    href: "https://useorgx.com/agent-work-receipts",
  },
  {
    label: "Machine schema",
    detail: "The portable contract another runtime can implement directly.",
    meta: "JSON Schema · Draft 2020-12",
    href: "https://useorgx.com/schemas/agent-work-receipt/v0.1/schema.json",
  },
  {
    label: "Negative fixture",
    detail: "A receipt without declared authority is rejected at the contract boundary.",
    meta: "Expected failure · schema.required",
    href: "https://useorgx.com/agent-work-receipts/examples/invalid-missing-authority.json",
  },
];

const usageSteps = [
  {
    index: "01",
    title: "Connect the clients already in use.",
    command: "npx @useorgx/wizard@latest setup",
    detail: "The Wizard detects supported surfaces, pairs auth, writes managed MCP config, and offers companion plugins.",
    href: "https://docs.useorgx.com/docs/guides/wizard-cli-onboarding",
    linkLabel: "Read the Wizard guide",
  },
  {
    index: "02",
    title: "Make installation prove reachability.",
    command: "npx @useorgx/wizard@latest doctor",
    detail: "A written config is not counted as a working path. Doctor checks the connection and exits non-zero on blocking failures.",
    href: "https://www.npmjs.com/package/@useorgx/wizard",
    linkLabel: "Inspect the package",
  },
  {
    index: "03",
    title: "Run a continuity test, not a dashboard tour.",
    command: "Show me what shipped, who approved it, and the evidence.",
    detail: "Ask in one client, then continue in another. The claim is that the work graph—not the transcript—survives the handoff.",
    href: "https://github.com/useorgx/orgx-mcp/tree/main/docs/benchmarks/agent-amnesia-test",
    linkLabel: "Open the Agent Amnesia Test",
  },
  {
    index: "04",
    title: "Inspect the returned surfaces.",
    command: "smithery mcp add useorgx/orgx-mcp",
    detail: "Use the independent registry listing, then inspect every MCP App surface in the live widget gallery.",
    href: "https://mcp.useorgx.com/widgets/index.html",
    linkLabel: "Open the live Widget Gallery",
  },
];

const ecosystemLinks = [
  { label: "Smithery listing", href: "https://smithery.ai/servers/useorgx/orgx-mcp" },
  { label: "MCP source", href: "https://github.com/useorgx/orgx-mcp" },
  { label: "Skills library", href: "https://github.com/useorgx/skills" },
  { label: "Codex plugin", href: "https://github.com/useorgx/orgx-codex-plugin" },
  { label: "Claude Code plugin", href: "https://github.com/useorgx/orgx-claude-code-plugin" },
  { label: "OpenCode plugin", href: "https://github.com/useorgx/orgx-opencode-plugin" },
  { label: "OpenClaw plugin", href: "https://github.com/useorgx/openclaw-plugin" },
  { label: "Wizard documentation", href: "https://docs.useorgx.com/docs/guides/wizard-cli-onboarding" },
];

export default function OrgXProofChain() {
  return (
    <div className="v5-orgx-proof-chain">
      <header className="v5-proof-chain-heading">
        <span>Thesis stress test / independent signal</span>
        <h2>Capability is scaling faster than inspectability.</h2>
        <p>
          Four systems outside OrgX converge on the same missing layer. The inference is
          mine; the underlying evidence is not.
        </p>
      </header>

      <div className="v5-thesis-signal-list" role="list" aria-label="Independent evidence for the OrgX thesis">
        {thesisSignals.map((signal) => (
          <a
            href={signal.href}
            target="_blank"
            rel="noreferrer"
            role="listitem"
            key={signal.title}
          >
            <span>{signal.index} / {signal.category}</span>
            <strong>{signal.title}</strong>
            <p>{signal.detail}</p>
            <small>{signal.source} <i aria-hidden="true">↗</i></small>
          </a>
        ))}
      </div>

      <div className="v5-proof-inference">
        <span>What the evidence supports / what remains open</span>
        <h3>A work receipt is the narrowest contract that closes this gap.</h3>
        <p>
          Taken together, the sources support a bounded claim: when software acts across
          steps and tools under delegated authority, the result needs inspectable intent,
          actor, authority, actions, artifacts, evidence, outcome, verification, cost,
          lineage, and human intervention. They do not prove OrgX is the only answer.
          Independent emitters, retained users, and paid outcome lift remain open tests.
        </p>
        <div aria-label="Agent Work Receipt required records">
          {["intent", "actor", "authority", "actions", "artifacts", "evidence", "outcome", "verification", "cost", "lineage"].map((field) => (
            <code key={field}>{field}</code>
          ))}
        </div>
      </div>

      <div className="v5-contract-proof">
        <div className="v5-contract-proof-heading">
          <span>Mechanism proof / inspect the contract</span>
          <div>
            <h3>The claim has a public failure boundary.</h3>
            <p>
              On July 27, 2026, the live validator accepted the Codex fixture and
              rejected the missing-authority fixture with <code>schema.required</code>.
            </p>
          </div>
        </div>
        <div className="v5-contract-proof-links">
          {contractProof.map((item) => (
            <a href={item.href} target="_blank" rel="noreferrer" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.detail}</strong>
              <small>{item.meta} <i aria-hidden="true">↗</i></small>
            </a>
          ))}
        </div>
      </div>

      <a
        className="v5-smithery-signal"
        href="https://smithery.ai/servers/useorgx/orgx-mcp"
        target="_blank"
        rel="noreferrer"
        aria-label="Inspect OrgX on Smithery"
      >
        <div>
          <span>External distribution proof / Smithery</span>
          <strong>3,683 observed tool calls</strong>
        </div>
        <dl>
          <div>
            <dt>30-day uptime</dt>
            <dd>99.87%</dd>
          </div>
          <div>
            <dt>Listing score</dt>
            <dd>95 / 100</dd>
          </div>
          <div>
            <dt>Evidence date</dt>
            <dd>27 Jul 2026</dd>
          </div>
        </dl>
        <p>
          Platform-reported usage proves the server is being called outside the portfolio.
          It does not yet prove retention, customer outcomes, or revenue. <i aria-hidden="true">↗</i>
        </p>
      </a>

      <div className="v5-reproduce-proof">
        <div className="v5-reproduce-proof-heading">
          <span>Reproduce the product claim</span>
          <h3>From install to inspectable handoff in four moves.</h3>
        </div>
        <ol>
          {usageSteps.map((step) => (
            <li key={step.index}>
              <span>{step.index}</span>
              <div>
                <strong>{step.title}</strong>
                <code>{step.command}</code>
                <p>{step.detail}</p>
                <a href={step.href} target="_blank" rel="noreferrer">
                  {step.linkLabel} <i aria-hidden="true">↗</i>
                </a>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <nav className="v5-ecosystem-map" aria-label="OrgX public implementation map">
        <span>Public implementation map</span>
        <div>
          {ecosystemLinks.map((link) => (
            <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>
              {link.label} <i aria-hidden="true">↗</i>
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
