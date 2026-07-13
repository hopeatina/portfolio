import { useState } from "react";
import type { IconType } from "react-icons";
import {
  SiAmazonwebservices,
  SiAnthropic,
  SiCloudflare,
  SiDatadog,
  SiDjango,
  SiFigma,
  SiGithub,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiRust,
  SiSentry,
  SiStripe,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiZod,
} from "react-icons/si";

export interface ToolEvidence {
  name: string;
  category: string;
  project: string;
  reason: string;
  icon?: keyof typeof icons;
  mark?: string;
}

const icons = {
  anthropic: SiAnthropic,
  aws: SiAmazonwebservices,
  cloudflare: SiCloudflare,
  datadog: SiDatadog,
  django: SiDjango,
  figma: SiFigma,
  github: SiGithub,
  next: SiNextdotjs,
  node: SiNodedotjs,
  openai: SiOpenai,
  postgres: SiPostgresql,
  python: SiPython,
  react: SiReact,
  redis: SiRedis,
  rust: SiRust,
  sentry: SiSentry,
  stripe: SiStripe,
  supabase: SiSupabase,
  tailwind: SiTailwindcss,
  typescript: SiTypescript,
  vercel: SiVercel,
  zod: SiZod,
} satisfies Record<string, IconType>;

export default function TechnologyAtlas({
  tools,
  title = "The tools are evidence only when the choice is legible.",
}: {
  tools: ToolEvidence[];
  title?: string;
}) {
  const categories = ["All", ...Array.from(new Set(tools.map((tool) => tool.category)))];
  const [category, setCategory] = useState("All");
  const [activeName, setActiveName] = useState(tools[0]?.name ?? "");
  const visible = category === "All" ? tools : tools.filter((tool) => tool.category === category);
  const active = tools.find((tool) => tool.name === activeName) ?? visible[0] ?? tools[0];

  if (!active) return null;

  return (
    <section className="v5-tool-atlas" aria-labelledby="tool-atlas-title">
      <div className="v5-tool-atlas-heading">
        <span>Technology atlas / select a mark</span>
        <h2 id="tool-atlas-title">{title}</h2>
        <p>A curated record of where each system earned its place—not a wallpaper of configured integrations.</p>
      </div>

      <div className="v5-tool-filters" aria-label="Filter technologies by role">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            onClick={() => {
              setCategory(item);
              const next = item === "All" ? tools[0] : tools.find((tool) => tool.category === item);
              if (next) setActiveName(next.name);
            }}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="v5-tool-atlas-body">
        <ul className="v5-tool-grid" aria-label="Technologies used">
          {visible.map((tool) => {
            const Icon = tool.icon ? icons[tool.icon] : undefined;
            return (
              <li key={`${tool.project}-${tool.name}`}>
                <button
                  type="button"
                  className={tool.name === active.name ? "is-active" : ""}
                  aria-pressed={tool.name === active.name}
                  onClick={() => setActiveName(tool.name)}
                >
                  {Icon ? <Icon aria-hidden="true" /> : <strong aria-hidden="true">{tool.mark ?? tool.name.slice(0, 2)}</strong>}
                  <span>{tool.name}</span>
                  <small>{tool.project}</small>
                </button>
              </li>
            );
          })}
        </ul>

        <aside className="v5-tool-rationale" aria-live="polite">
          <span>{active.category} / {active.project}</span>
          <h3>{active.name}</h3>
          <p>{active.reason}</p>
        </aside>
      </div>
    </section>
  );
}
