import type { IconType } from "react-icons";
import {
  SiAmazonwebservices, SiAmazons3, SiAnthropic, SiApacheairflow,
  SiApachekafka, SiApachespark, SiAxios, SiBlender, SiCelery, SiClaude,
  SiCloudflare, SiD3Dotjs, SiDatadog, SiDjango, SiDocker, SiFastapi,
  SiFfmpeg, SiFigma, SiFlask, SiGithub, SiGithubactions, SiHetzner,
  SiHomebrew, SiJavascript, SiModal, SiNextdotjs, SiNextui, SiNodedotjs,
  SiNumpy, SiOpenai, SiPandas, SiPostgresql, SiPython, SiPytorch,
  SiReact, SiRedis, SiRust, SiScala, SiScikitlearn, SiSentry,
  SiSnowflake, SiSqlite, SiStripe, SiSupabase, SiTailwindcss,
  SiTensorflow, SiTerraform, SiThreedotjs, SiTypescript, SiUnity,
  SiVercel, SiVite, SiWebgpu, SiZod,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";

export interface TechnologyMarkProps {
  name: string;
  /** Legacy atlas keys are accepted; the recognized product name takes priority. */
  icon?: string;
  className?: string;
}

const icons: Partial<Record<string, IconType>> = {
  typescript: SiTypescript, javascript: SiJavascript, python: SiPython,
  rust: SiRust, postgresql: SiPostgresql, sqlite: SiSqlite,
  react: SiReact, nextjs: SiNextdotjs, nodejs: SiNodedotjs,
  fastapi: SiFastapi, flask: SiFlask, django: SiDjango,
  pytorch: SiPytorch, tensorflow: SiTensorflow, scikitlearn: SiScikitlearn,
  openai: SiOpenai, claude: SiClaude, anthropic: SiAnthropic,
  supabase: SiSupabase, redis: SiRedis, aws: SiAmazonwebservices,
  amazons3: SiAmazons3, docker: SiDocker, terraform: SiTerraform,
  github: SiGithub, githubactions: SiGithubactions, vercel: SiVercel,
  blender: SiBlender, threejs: SiThreedotjs, webgpu: SiWebgpu,
  figma: SiFigma, tailwindcss: SiTailwindcss, stripe: SiStripe,
  pandas: SiPandas, numpy: SiNumpy, unity: SiUnity,
  apachespark: SiApachespark, scala: SiScala, snowflake: SiSnowflake,
  apachekafka: SiApachekafka, apacheairflow: SiApacheairflow,
  celery: SiCelery, d3js: SiD3Dotjs, java: FaJava, modal: SiModal,
  hetzner: SiHetzner, cloudflare: SiCloudflare, datadog: SiDatadog,
  sentry: SiSentry, zod: SiZod, homebrew: SiHomebrew,
  nextui: SiNextui, ffmpeg: SiFfmpeg, vite: SiVite, axios: SiAxios,
};

const assets: Partial<Record<string, string>> = {
  cursor: "cursor.svg",
  opencode: "opencode.svg",
  openclaw: "openclaw.svg",
  inngest: "inngest.svg",
  mcp: "mcp.svg",
  motion: "motion.svg",
  remotion: "remotion.svg",
  fal: "fal.png",
  codex: "codex.png",
  triggerdev: "trigger-dev.svg",
  reactflow: "react-flow.svg",
  convex: "convex.png",
  playwright: "playwright.svg",
  e2b: "e2b.png",
  djangorestframework: "django-rest-framework.png",
  lightweightcharts: "lightweight-charts.svg",
};

const aliases: Record<string, string> = {
  next: "nextjs", nextdotjs: "nextjs", node: "nodejs", nodedotjs: "nodejs",
  postgres: "postgresql", tailwind: "tailwindcss", three: "threejs",
  threedotjs: "threejs", d3: "d3js", d3dotjs: "d3js",
  amazonwebservices: "aws", s3: "amazons3", awss3: "amazons3",
  spark: "apachespark", airflow: "apacheairflow", kafka: "apachekafka",
  claudeai: "claude", claudecode: "claude", anthropicclaude: "claude",
  openaicodex: "codex", cursorai: "cursor", falai: "fal",
  modelcontextprotocol: "mcp", framermotion: "motion", motiondev: "motion",
  cloudflareworkers: "cloudflare", trigger: "triggerdev",
  triggerdotdev: "triggerdev", csharp: "c#",
};

function keyFor(value: string) {
  const key = value.toLocaleLowerCase().replace(/[^a-z0-9#]/g, "");
  return aliases[key] ?? key;
}

// These names deliberately retain text until a distinct, verified mark is available.
// In particular, an ecosystem logo is not a substitute for a different product.
const textNames = new Set([
  "sql", "c#", "mcpapps", "reactthreefiber", "interactivebrokers",
  "springhealth", "tokio", "sysinfo", "launchd", "axum", "clap", "crossterm",
]);

/** Decorative mark: callers supply the adjacent, accessible technology name. */
export default function TechnologyMark({ name, icon, className = "" }: TechnologyMarkProps) {
  const nameKey = keyFor(name);
  const key = icons[nameKey] || assets[nameKey] || textNames.has(nameKey)
    ? nameKey
    : keyFor(icon ?? name);
  const Icon = icons[key];
  const asset = assets[key];

  return (
    <span
      className={`technology-mark${className ? ` ${className}` : ""}`}
      data-technology={key}
      data-mark-kind={Icon || asset ? "logo" : "text"}
      aria-hidden="true"
    >
      {Icon ? <Icon focusable="false" /> : asset ? (
        // These are small local brand assets; preserve their original aspect ratios.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`/images/technology/${asset}`} alt="" decoding="async" />
      ) : <span className="technology-mark-text">{name}</span>}
    </span>
  );
}
