import type { ToolEvidence } from "@/components/v5/TechnologyAtlas";

export interface CapabilityEvidence {
  name: string;
  skills: string[];
  description: string;
  evidence: Array<{ label: string; href: string }>;
}

export const practiceCapabilities: CapabilityEvidence[] = [
  {
    name: "Product & interaction",
    skills: ["Product architecture", "Interface design", "Accessible interaction"],
    description: "Take a product from the shape of the problem to the details of the interface: information architecture, state, onboarding, feedback, and the next useful action.",
    evidence: [{ label: "BrainBuffet", href: "/projects/brain-buffet" }, { label: "Meridian", href: "/projects/meridian" }],
  },
  {
    name: "Backend, cloud & data",
    skills: ["API architecture", "Distributed workflows", "Data pipelines & governance"],
    description: "Build and operate the systems behind the interface. Healthcare workflows, hardware calibration, and financial data taught me to design for failure, permissions, scale, and the people operating the result.",
    evidence: [{ label: "Alma", href: "/projects/alma" }, { label: "Vessel · Capital One · MD Anderson", href: "/about#experience" }],
  },
  {
    name: "AI & agent systems",
    skills: ["Agent orchestration", "MCP & identity", "Evaluation & observability"],
    description: "Design the memory, tools, client integrations, and evaluation loops that let agents do useful work across sessions while keeping authority and outcomes inspectable.",
    evidence: [{ label: "OrgX", href: "/projects/orgx" }, { label: "OrgX for OpenClaw", href: "/projects/openclaw" }],
  },
  {
    name: "Research & machine learning",
    skills: ["Scientific computing", "Model architecture", "Experiment design"],
    description: "Connect research ideas to representations, code, and experiments. My bioengineering foundation informs the method; Neuromosaic explores it through a neural-architecture research workbench.",
    evidence: [{ label: "Neuromosaic", href: "/projects/neuromosaic" }, { label: "Rice · DermaShift", href: "/about#origins" }],
  },
  {
    name: "3D & game development",
    skills: ["Real-time rendering", "Materials & lighting", "Gameplay & worldbuilding"],
    description: "Work across the scene and the feeling of controlling it: geometry, camera, materials, input, and feedback. From a Cameroonian driving world to the living ribbon running through this portfolio.",
    evidence: [{ label: "Chaos Riders", href: "/projects/chaos-riders" }, { label: "Interactive material studies", href: "/projects#material-orgx" }],
  },
  {
    name: "Native & developer tools",
    skills: ["Systems programming", "CLI & runtime design", "Testing & distribution"],
    description: "Make tools that fit the machine and the developer's habits: a small runtime, useful terminal surfaces, observable failures, and an installation path that completes the product.",
    evidence: [{ label: "Perf Pulse", href: "/projects/perfpulse" }, { label: "Plugin engineering", href: "/projects/openclaw" }],
  },
  {
    name: "Creative direction & community",
    skills: ["Visual storytelling", "Motion composition", "Collaborative facilitation"],
    description: "Compose the experience around the system. Design, music, dance, and shared making inform the pacing and taste; Figma and Chill turned that practice into a global creative community.",
    evidence: [{ label: "Figma and Chill · Config", href: "/about#community" }, { label: "Motion systems · FrameFX", href: "/projects/archive" }],
  },
];

type PracticeTool = Omit<ToolEvidence, "category">;
const group = (category: string, href: string, tools: PracticeTool[]): ToolEvidence[] =>
  tools.map((tool) => ({ ...tool, category, href: tool.href ?? href }));

export const practiceTools: ToolEvidence[] = [
  ...group("Product & interaction", "/projects/brain-buffet", [
    { name: "React", project: "BrainBuffet · Meridian · Alma", reason: "Compose stateful interfaces around the work: learning progress, clinical workflows, and evidence-led decisions." },
    { name: "TypeScript", project: "Products · plugins · games", reason: "Keep data contracts, interactions, and server boundaries coherent as one product spans multiple surfaces." },
    { name: "JavaScript", project: "Product engineering", reason: "Build browser behavior, asynchronous integrations, and interactive interfaces across the web stack." },
    { name: "Next.js", project: "OrgX · BrainBuffet · Meridian", reason: "Join application routes, server reads, authentication, and product UI in a full-stack React application." },
    { name: "Tailwind CSS", project: "BrainBuffet · OrgX Live", reason: "Translate a shared visual language into responsive layouts and consistent interface states." },
    { name: "Stripe", project: "BrainBuffet · OrgX", reason: "Connect billing and account state to actual product access, with explicit boundaries around consequential changes." },
    { name: "Zod", project: "OrgX", reason: "Validate structured inputs at the point where external data enters the application's contracts.", href: "/projects/orgx" },
    { name: "Convex", project: "Meridian", reason: "Keep research memory and application records available through a reactive data layer.", href: "/projects/meridian" },
    { name: "Lightweight Charts", project: "Meridian", reason: "Give market research a focused time-series view alongside the evidence used to interpret a signal.", href: "/projects/meridian" },
  ]),
  ...group("Backend, cloud & data", "/about#experience", [
    { name: "Python", project: "Alma · Neuromosaic", reason: "Production APIs, clinical business rules, data processing, and scientific work share a language but require different operational choices." },
    { name: "AWS", project: "Vessel · Alma", reason: "Lambda, data infrastructure, object storage, and operational workflows support products where hardware, people, and services meet." },
    { name: "Django", project: "Alma", reason: "Model clinical workflows, permission boundaries, APIs, and administrative operations in a mature production backend." },
    { name: "Django REST Framework", project: "Alma", reason: "Express clinical API boundaries through serializers, permissions, and request handling.", href: "/projects/alma" },
    { name: "PostgreSQL", project: "Alma · Vessel · OrgX", reason: "Preserve relationships and durable state across workflow changes, permissions, and long-running operations." },
    { name: "Celery", project: "Alma", reason: "Run reassessments, reminders, backfills, and documents outside synchronous clinical requests." },
    { name: "Redis", project: "Alma", reason: "Support background job coordination and operational state alongside the durable application database." },
    { name: "SQL", project: "Production · data platforms", reason: "Model, query, and validate the data underlying product behavior and analytical pipelines." },
    { name: "Apache Spark", project: "Capital One", reason: "Tune distributed ingestion and transformation of millions of near-real-time financial records." },
    { name: "Scala", project: "Capital One", reason: "Implement and improve the distributed Spark applications behind financial data pipelines." },
    { name: "Snowflake", project: "Capital One", reason: "Automate dataset onboarding, metadata registration, and data quality checks for governed analytical data." },
    { name: "Apache Airflow", project: "Vessel Health", reason: "Coordinate real-time data processing and internal operational workflows." },
    { name: "D3.js", project: "MD Anderson", reason: "Make operating-room capacity and scientific operations legible through React-based data visualization." },
    { name: "Datadog", project: "Alma", reason: "Build dashboards and alerts that make production failures actionable before clinicians absorb their cost." },
    { name: "Node.js", project: "OrgX plugins", reason: "Build portable local services and integrations using the host runtime and native networking." },
    { name: "Cloudflare Workers", project: "OrgX MCP", reason: "Run authenticated MCP transport, session isolation, and durable connection state at the edge." },
    { name: "Supabase", project: "OrgX · BrainBuffet", reason: "Connect relational data, identity, storage, and access control to the workflows people use." },
  ]),
  ...group("AI & agent systems", "/projects/orgx", [
    { name: "Claude Code", project: "Engineering · OrgX integration", reason: "Use a native coding agent with shared organizational context, project boundaries, and inspectable work." },
    { name: "MCP", project: "OrgX · client plugins", reason: "Expose shared memory and governed actions through a portable protocol across independent AI clients." },
    { name: "Codex", project: "Engineering · OrgX integration", reason: "Connect repository execution and verification to the goal, previous decisions, and the evidence required from each run." },
    { name: "Cursor", project: "Alma · OrgX integration", reason: "Work inside an AI editor and bring external operational context into the development loop through MCP." },
    { name: "OpenCode", project: "OrgX integration", reason: "Carry shared organizational state into another native agent client through its plugin surface." },
    { name: "OpenClaw", project: "OrgX plugin", reason: "Integrate organizational memory, mission control, and accountable handoffs with the host's existing runtime." },
    { name: "MCP Apps", project: "Embedded OrgX", reason: "Turn a tool response into an interactive brief, decision, search result, or proof surface in the client." },
    { name: "OpenAI", project: "OrgX · BrainBuffet", reason: "Use model APIs and agent runtimes for generation, execution, and judgment within explicit product contracts." },
    { name: "Anthropic", project: "OrgX · research tools", reason: "Integrate Claude model and agent capabilities into authored workflows with bounded context and explicit evaluation." },
    { name: "Inngest", project: "OrgX", reason: "Make long-running workflows durable across request boundaries, retries, and recovery." },
    { name: "Trigger.dev", project: "OrgX", reason: "Run durable background tasks, outcome scoring, and scheduled briefs with explicit execution state." },
    { name: "E2B", project: "OrgX", reason: "Give generated work an isolated execution environment inside the platform's sandbox runtime." },
    { name: "Sentry", project: "OrgX", reason: "Attach operational errors to the execution and system boundary that produced them." },
  ]),
  ...group("Research & machine learning", "/projects/neuromosaic", [
    { name: "PyTorch", project: "Neuromosaic", reason: "Represent and generate neural model components while keeping experiment configuration connected to architecture." },
    { name: "NumPy", project: "Neuromosaic", reason: "Support numerical analysis and the representations used by the research workbench." },
    { name: "pandas", project: "Neuromosaic", reason: "Organize evaluation outputs and analytical data for inspection and visualization." },
    { name: "FastAPI", project: "Neuromosaic", reason: "Expose research and architecture workflows through typed Python endpoints while long-running processing stays inspectable." },
    { name: "Docker", project: "Neuromosaic", reason: "Provide a container runtime for the research execution environment." },
    { name: "React Flow", project: "Neuromosaic", reason: "Represent model components and their relationships in the implemented architecture-view component." },
  ]),
  ...group("3D & game development", "/projects/chaos-riders", [
    { name: "Three.js", project: "Chaos Riders · portfolio", reason: "Build responsive real-time scenes, cameras, geometry, physical materials, and light that react to user input." },
    { name: "Blender", project: "Chaos Riders · asset development", reason: "Author vehicle geometry and develop materials, lighting, and render studies for the game's world. Vehicle assets remain in development." },
    { name: "React Three Fiber", project: "Chaos Riders · Neuromosaic", reason: "Connect scene state and interactive 3D objects to the surrounding React application." },
    { name: "WebGPU", project: "This portfolio", reason: "Render the shared ribbon through Three.js's WebGPU renderer, with a WebGL fallback for other environments." },
  ]),
  ...group("Native & developer tools", "/projects/perfpulse", [
    { name: "Rust", project: "Perf Pulse", reason: "Keep continuous system monitoring small, memory-safe, and predictable on the machine it protects." },
    { name: "GitHub Actions", project: "Plugins · Perf Pulse", reason: "Connect review, automated checks, builds, and releases to inspectable engineering outcomes." },
    { name: "Tokio", project: "Perf Pulse", reason: "Coordinate recurring checks, notifications, and the local server through asynchronous execution." },
    { name: "Axum", project: "Perf Pulse", reason: "Serve a focused local dashboard that connects an alert to the actual incident and its controls." },
    { name: "Clap", project: "Perf Pulse", reason: "Make diagnostic commands and configuration predictable and scriptable from the terminal." },
    { name: "Homebrew", project: "Perf Pulse", reason: "Make discovering and installing the utility one continuous product experience." },
    { name: "Playwright", project: "OrgX plugins · product QA", reason: "Exercise browser flows, interaction states, and responsive surfaces as part of delivery." },
  ]),
  ...group("Creative direction & community", "/about#community", [
    { name: "Figma", project: "Figma and Chill · Config", reason: "Use the multiplayer design file as a place for shared making, creative facilitation, and community." },
    { name: "Remotion", project: "FrameFX · portfolio film", reason: "Compose motion and editorial storytelling as reusable, timed React sequences with consistent design tokens." },
    { name: "Framer Motion", project: "Portfolio · OrgX Live", reason: "Give state changes, transitions, and interaction feedback a deliberate rhythm." },
  ]),
];
