import { useId, useState } from "react";
import Link from "next/link";
import TechnologyMark from "./TechnologyMark";
import type { CapabilityEvidence } from "@/data/practice";

export interface ToolEvidence {
  name: string;
  category: string;
  project: string;
  reason: string;
  icon?: string;
  mark?: string;
  href?: string;
}

function ToolDetails({ tool }: { tool: ToolEvidence }) {
  return <>
    <span className="practice-tool-context">{tool.category} / {tool.project}</span>
    <div className="practice-active-tool"><TechnologyMark name={tool.name} icon={tool.icon} /><h3>{tool.name}</h3></div>
    <p>{tool.reason}</p>
    {tool.href && <Link className="practice-evidence-link" href={tool.href}>See it in the work <span aria-hidden="true">↗</span></Link>}
  </>;
}

export default function TechnologyAtlas({
  tools,
  title = "The tools behind the decisions.",
  capabilities,
}: {
  tools: ToolEvidence[];
  title?: string;
  capabilities?: CapabilityEvidence[];
}) {
  const id = useId();
  const [category, setCategory] = useState("All");
  const [activeName, setActiveName] = useState(tools[0]?.name ?? "");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const categories = ["All", ...Array.from(new Set(tools.map((tool) => tool.category)))];
  const search = query.trim().toLocaleLowerCase();
  const matching = tools.filter((tool) =>
    (category === "All" || tool.category === category) &&
    (!search || [tool.name, tool.project, tool.reason, tool.category, ...(capabilities?.find((item) => item.name === tool.category)?.skills ?? [])].some((value) => value.toLocaleLowerCase().includes(search)))
  );
  const overview = capabilities && category === "All" && !search && !expanded;
  const visible = overview
    ? capabilities.flatMap((capability) => matching.filter((tool) => tool.category === capability.name).slice(0, 2))
    : matching;
  const active = visible.find((tool) => tool.name === activeName) ?? visible[0];
  const selectedCapability = capabilities?.find((item) => item.name === category);

  function selectCategory(nextCategory: string) {
    setCategory(nextCategory);
    setQuery("");
    setExpanded(false);
    setActiveName((nextCategory === "All" ? tools[0] : tools.find((tool) => tool.category === nextCategory))?.name ?? "");
  }

  if (!tools.length) return null;

  return (
    <section className={`v5-tool-atlas${capabilities ? " practice-atlas" : ""}`} aria-labelledby={`${id}-title`}>
      <div className="v5-tool-atlas-heading">
        <span>{capabilities ? "Capabilities / tools / the work behind them" : "Technology atlas / select a tool"}</span>
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{capabilities
          ? "Production engineering, independent products, research, and creative practice. Explore a discipline, then a tool to see how I use it."
          : "Select a tool to see the role it plays in this system."}</p>
      </div>

      {capabilities ? (
        <div className="practice-domains" role="group" aria-label="Explore capabilities">
          <button className="practice-domain practice-domain-overview" type="button" aria-pressed={category === "All"} onClick={() => selectCategory("All")}>
            <span className="practice-domain-index">00</span>
            <span><strong>The whole practice</strong><small>{capabilities.length} disciplines · {tools.length} tools · connected by the work</small></span>
            <span className="practice-domain-arrow" aria-hidden="true">↗</span>
          </button>
          {capabilities.map((item, index) => (
            <button type="button" className="practice-domain" key={item.name} aria-pressed={category === item.name} onClick={() => selectCategory(item.name)}>
              <span className="practice-domain-index">{String(index + 1).padStart(2, "0")}</span>
              <span><strong>{item.name}</strong><small>{item.skills.join(" · ")}</small></span>
              <span className="practice-domain-arrow" aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="v5-tool-filters" aria-label="Filter technologies by role">
          {categories.map((item) => (
            <button key={item} type="button" aria-pressed={category === item} onClick={() => selectCategory(item)}>{item}</button>
          ))}
        </div>
      )}

      {selectedCapability && (
        <div className="practice-domain-detail">
          <p>{selectedCapability.description}</p>
          <div aria-label="Related work">{selectedCapability.evidence.map((item) => <Link key={item.href} href={item.href}>{item.label} <span aria-hidden="true">↗</span></Link>)}</div>
        </div>
      )}

      {capabilities && (
        <div className="practice-search-row">
          <label htmlFor={`${id}-search`}><span>Find a tool, skill, or project</span><input id={`${id}-search`} type="search" value={query} placeholder="Try Python, motion, or Capital One" onChange={(event) => {setQuery(event.target.value); setCategory("All"); setExpanded(true);}} /></label>
          <p role="status">{overview ? `${visible.length} highlights · ${tools.length} tools to explore` : `${matching.length} ${matching.length === 1 ? "tool" : "tools"}${category === "All" ? " across the practice" : " in this discipline"}`}</p>
        </div>
      )}

      {active ? (
        <div className="v5-tool-atlas-body">
          <div>
            <ul className="v5-tool-grid" aria-label="Technologies used">
              {visible.map((tool) => (
                <li key={`${tool.project}-${tool.name}`} className={tool.name === active.name ? "is-active" : ""}>
                  <button type="button" className={tool.name === active.name ? "is-active" : ""} aria-pressed={tool.name === active.name} aria-controls={`${id}-rationale ${id}-inline-rationale`} onClick={() => setActiveName(tool.name)}>
                    <TechnologyMark name={tool.name} icon={tool.icon} />
                    <span className="technology-name">{tool.name}</span>
                    <small>{tool.project}</small>
                  </button>
                  {tool.name === active.name && <div id={`${id}-inline-rationale`} className="practice-inline-rationale" aria-live="polite" aria-atomic="true"><ToolDetails tool={tool} /></div>}
                </li>
              ))}
            </ul>
            {overview && visible.length < tools.length && <button className="practice-expand" type="button" onClick={() => setExpanded(true)}>Explore all {tools.length} tools <span aria-hidden="true">↓</span></button>}
            {capabilities && expanded && !search && category === "All" && <button className="practice-expand" type="button" onClick={() => setExpanded(false)}>Return to highlights <span aria-hidden="true">↑</span></button>}
          </div>
          <aside id={`${id}-rationale`} className="v5-tool-rationale" aria-live="polite" aria-atomic="true">
            <ToolDetails tool={active} />
          </aside>
        </div>
      ) : (
        <div className="practice-empty" role="status"><p>No tools match “{query}”. Try a discipline or a project name.</p><button type="button" onClick={() => selectCategory("All")}>Show the whole practice</button></div>
      )}
    </section>
  );
}
