# Skills and tools coverage evidence

Read-only audit, 2026-09-06. This note supports the portfolio's expanded practice registry. It distinguishes implementation evidence, career claims already supplied in the portfolio, and research or asset work still in development. It does not assign expertise ratings or turn package dependencies into experience claims.

## Main finding

The portfolio had enough evidence for a broad engineering and creative practice, but the homepage presentation concentrated attention on OrgX and AI clients. Backend and data work appeared mostly inside Alma or low on About; research, product flows, games, and motion work were difficult to discover as capabilities. The new seven-domain `src/data/practice.ts` is a sound structure for correcting that imbalance.

The breadth is most credible when each capability leads to a project, an employment record, or an actual artifact. Tools are supporting details: a Django workflow, a Spark ingestion pipeline, a touch-controlled scene, and a research representation demonstrate different kinds of judgment.

## Evidence levels

- **Implementation:** source was inspected at an executable component, function, service, or integration, not only in a dependency manifest. This establishes use in the codebase, not a new successful run or deployment.
- **Career record:** a claim exists in the saved public resume, About, the Alma case, or portfolio experience data. Employer source was deliberately not opened; performance and employment claims remain self-reported unless the existing portfolio supplies independent evidence.
- **Research / development:** implemented experiments, components, or asset workflows demonstrate exploration. They do not establish scientific results, model quality, final game assets, or a released full product.
- **Existing public citation:** the portfolio already links a public artifact. This audit did not refresh external availability or outcome evidence.

No credentials, environment files, account stores, clinical data, customer data, or private operational receipts were read. Source applications were not run. Only this evidence document was written by this audit.

## Seven capability domains

| Domain | Grounded capability | Concrete technologies with evidence | Visitor destination | Qualification |
| --- | --- | --- | --- | --- |
| Product and interaction | Information hierarchy, onboarding, persistent progress, contextual notes, inspectable decision state | React, TypeScript, JavaScript, Next.js, Tailwind, Framer Motion; Convex and Lightweight Charts in Meridian | [BrainBuffet](/projects/brain-buffet), [Meridian](/projects/meridian) | Product implementation; no unsupported learning-outcome or trading-performance claims |
| Backend, cloud and data | API architecture, permissions, durable jobs, observability, hardware/platform workflows, ETL, metadata and quality governance | Python, Django, DRF, Celery, Redis, PostgreSQL, S3, Datadog; AWS Lambda and Airflow at Vessel; Spark, Scala, Snowflake at Capital One; React/D3 at MD Anderson | [Alma](/projects/alma), [Employment history](/about#experience), [Saved resume](/resume/hope-atina-resume.md) | Employer-specific claims rely on the saved career record; individual cloud services must remain attached to the employer actually named |
| AI and agent systems | MCP contracts, identity and sessions, context continuity, execution orchestration, evaluation, recovery, client integration | MCP, MCP Apps, Zod, Cloudflare Workers, Durable Objects, SQLite, Supabase, OpenAI Agents SDK, Anthropic SDK, E2B, Inngest, Trigger.dev | [OrgX](/projects/orgx), [OrgX for OpenClaw](/projects/openclaw) | Implemented integration paths; exact runtime defaults, tool counts and current provider health are separate questions |
| Research and machine learning | Architecture representations, experiment provenance, numerical work, generated model code, scientific problem framing | Python, NumPy, FastAPI, SQLModel, Docker/local execution interfaces, PyTorch model/training artifacts; Q-learning in saved education record | [Neuromosaic](/projects/neuromosaic), [Rice / DermaShift](/about#origins), [Saved resume](/resume/hope-atina-resume.md) | Neuromosaic is an alpha research workbench. PyTorch artifacts are code evidence, not a successful training benchmark. Q-learning is a named educational capstone |
| 3D and game development | Real-time scenes, materials and lighting, geometry, camera response, input, deterministic track logic, gameplay feedback | Three.js, React Three Fiber, drei, Blender/Python asset workflow; Three.js WebGPU renderer in this portfolio | [Chaos Riders](/projects/chaos-riders), [Portfolio material studies](/projects#material-orgx) | Playable prototype and ongoing asset development. No finished Blender-export fidelity or full-game launch claim |
| Native and developer tools | Systems monitoring, CLI/TUI design, local services, process identity checks, background execution, portable distribution | Rust, Tokio, Axum, sysinfo, Clap, Crossterm, launchd, GitHub Actions, Homebrew; TypeScript/Node plugin runtime and SQLite outbox | [Perf Pulse](/projects/perfpulse), [Plugin engineering](/projects/openclaw) | Implementation and existing distribution receipts; no fresh release or runtime-health verification in this audit |
| Creative direction and community | Visual storytelling, motion composition, shared making, facilitation, presentation and world direction | Figma, Remotion, Framer Motion, Blender; original world imagery and portfolio film implementation | [Figma and Chill](/about#community), [FrameFX archive](/projects/archive), [Proof ledger](/proof) | Figma talk and FrameFX package evidence already exist in the ledger. Music/dance informs practice; no new professional music qualification is inferred |

## Career evidence that should remain visible

| Organization | Existing evidence | Capability worth exposing | Safe treatment |
| --- | --- | --- | --- |
| Alma | `src/pages/projects/alma.tsx:64`, `:84`, `:140`; saved resume experience section | Python/Django/DRF APIs; clinical rules and permissions; Celery/Redis background workflows; PostgreSQL/S3; Datadog and reversible rollout | Production engineering in a regulated setting. Keep internal adoption/reliability measures labeled self-reported. Spring Health remains an integration in progress |
| Vessel Health | Saved resume experience section; `src/pages/about.tsx` career chapter; `src/data/portfolio.ts` experience entry | Backend leadership, API and data-model design, authentication, hardware calibration, internal React tools, AWS Lambda/Postgres/Airflow data processing, operational problem solving | Distinguish the calibration responsibility from the specific Airflow workload; the resume does not directly say Airflow performed calibration |
| Capital One | Saved resume experience section; About career chapter; portfolio experience entry | ETL automation, metadata registration, data quality and governance; Spark/Scala ingestion into Snowflake | These tools have an explicit role mapping. AWS/EMR and Kafka appear elsewhere in the resume skills list, but this audit did not establish their specific Capital One use |
| MD Anderson | `src/data/portfolio.ts` Research Extern entry | React and D3 operating-room capacity visualization for scientific/operational decisions | Portfolio-reported experience; not separately represented in the saved resume. No dates, research publications, patient outcomes, or source code were established |
| Rice / DermaShift | About origin section and `docs/portfolio-v5-evidence-map.md`; existing ASME link | Bioengineering, sensing, multidisciplinary product design, clinical collaboration and problem framing | Credit the team. Existing story identifies a student design competition, not a personal clinical validation or commercialized medical device claim |
| Udacity | Saved resume education section | ML-engineering study and directed network evolution using Q-learning | Education evidence only; do not silently transform it into professional reinforcement-learning research experience |

The saved resume is useful evidence but contains older product counts and outcome statements. Expanding the tool vocabulary does not justify copying those numbers into new UI without their original qualifications.

## Implementation anchors

Repository paths below are local inspection references; private source repositories should not become visitor CTAs.

### OrgX and MCP

- `/Users/hopeatina/Code/orgx/orgx/lib/agents/multiPatternAgents.ts:21`, `:161`, `:287`: imports OpenAI Agents SDK, constructs agents, and calls the runner. This is stronger than a package dependency.
- `/Users/hopeatina/Code/orgx/orgx/lib/agents/runners/claude-sdk-runner.ts:12`, `:308`: Anthropic client implementation. Distinguish Anthropic model integration from use of a coding client.
- `/Users/hopeatina/Code/orgx/orgx/lib/server/sandbox/runtime.ts:15`, `:527`: E2B sandbox import and creation path.
- `/Users/hopeatina/Code/orgx/orgx/inngest/client.ts:230` and `inngest/functions/missionPlanGeneration.ts:18`: client construction and staged background functions.
- `/Users/hopeatina/Code/orgx/orgx/trigger/outcome-scorer/index.ts:31`, `:38`, `:61`: Trigger.dev task with token creation and durable waiting. `trigger/daily-brief/index.ts:36` implements a scheduled task. Trigger.dev deserves visibility alongside Inngest; their presence does not mean every path is currently deployed through both.
- `/Users/hopeatina/Code/orgx-mcp/src/index.ts:3`, `:13`, `:15`, `:397`, `:549`: MCP server, Zod contracts, Cloudflare OAuth provider, and persistent Durable Object SQLite session state.
- `/Users/hopeatina/Code/orgx/orgx/lib/agents/toolPolicyProfiles.ts` and `lib/server/contextProjectionService.ts`: explicit tools/policy and context-projection implementation, rather than generic “prompt engineering.”

### OpenClaw plugin

- `/Users/hopeatina/Code/orgx-openclaw-plugin/src/index.ts:390`, `:1961`: host-native registration and core tool registration.
- `src/outbox.ts:24`, `:243`, `:259` and `src/sync/outbox-replay.ts:81`: SQLite-backed event outbox and replay implementation, with compatibility/import handling for older JSON storage.
- **Source drift confirmed against local `origin/main`:** `src/stores/sqlite-state.ts` imports `better-sqlite3`; `package.json` version is `0.7.39` and includes `better-sqlite3` and `@sentry/node` production dependencies. The older portfolio wording “zero production dependencies” / “file-backed JSON instead of SQLite” should be historically scoped or updated. This was sent to the case-page owner.

### Perf Pulse

- `/Users/hopeatina/Code/perf-pulse/src/collector.rs:5`, `:346`: real sysinfo collection.
- `src/main.rs:46`, `:378`: Clap command interface and Tokio runtime.
- `src/server.rs:1`, `:1896`: Axum router and local dashboard.
- `src/top_view.rs:1`, `:8`: Crossterm terminal interface.
- `src/process_control.rs:137`, `:310`: identity revalidation before process termination.
- `src/guardian.rs:672`: per-user LaunchAgent installation path.
- `.github/workflows/release.yml`: Apple Silicon/Intel builds and release packaging. Existing case and ledger connect this to Homebrew distribution.

### BrainBuffet

- `/Users/hopeatina/Code/brainbuffet/components/providers/CourseCreationProvider.tsx:290`, `:325`: course creation and quiz API integration.
- `components/providers/ChapterProvider.tsx:214`, `:303`: persistent chapter-progress operations.
- `components/ChapterFlow/CourseNoteSidebarSection.tsx:116`: contextual note persistence.
- `services/apiClient.ts:4`, `:22`: Axios client and Supabase Auth session integration.
- `utils/stripe-client.ts:1`, `utils/stripe.ts:1`, `utils/supabase-admin.ts:200`: Stripe client and subscription synchronization implementation. These files descend from a SaaS starter; describe integration use, not authorship of Stripe or all inherited infrastructure.
- The saved resume also attributes Flask, AWS/SQS, OpenAI, Anthropic, Fal and Langtrace to BrainBuffet. Its backend was outside the source reviewed for the new case. These can be labeled resume-backed, but should not be presented as freshly inspected backend implementation.

### Neuromosaic

- `/Users/hopeatina/Code/neuromosaic/neuromosaic/arch_space/vector_representation.py:25`, `:193`, `:243`: NumPy-backed architecture encode/decode implementation.
- `neuromosaic/orchestrator/orchestrator.py:271`: architecture, code, execution and result-recording sequence.
- `neuromosaic/api/main.py:300`: instantiated FastAPI application.
- `neuromosaic/results_db/models.py:14`: SQLModel experiment schema; database service files contain actual SQLModel queries.
- `neuromosaic/env_manager/providers.py:60`, `:154`, `:505`: Docker and local subprocess execution interfaces. Availability or successful execution was not tested.
- `nm_output/generated_code/model.py:5` and `train.py:16`: saved PyTorch model/training code. No accuracy or completed-run claim follows from file existence.
- `website/src/components/3d/ModelVisualization.tsx:99` uses R3F Canvas; `website/src/components/explorer/ArchitectureView.tsx:102` uses React Flow. The latter's live route wiring was not established.
- `neuromosaic/meta_learning/optimization.py:91` still substitutes random suggestions for an unfinished Bayesian path. Avoid a claim of completed Bayesian optimization or a superior automated architecture-search system.

### Chaos Riders

- `/Users/hopeatina/Code/chaos-riders-launch/src/demo/track.ts`: shared deterministic hazards and path computation.
- `src/demo/DemoGame.tsx:28`, `:51`: R3F/Three scene and initial twenty-second clock; source includes touch/keyboard control, stability timing, collision, camera and flow response.
- `src/components/fx/GarageStage.tsx:36`, `:936`: R3F scene and glTF asset integration with materials, lighting and framing.
- `qa/social/chaos-riders-astra/render_orbits.py:4`, `:37`, `:63`: Blender Python camera and render workflow. The associated README explicitly identifies asset work as development candidates. Blender belongs in the range, with that scope intact.
- Full asset and prototype boundaries are recorded in `docs/new-project-evidence-chaos-riders.md`.

### Meridian

- `/Users/hopeatina/Code/meridian/lib/signal-scoring.js:23`, `:46`: weighted conviction and inspectable contributions.
- `convex/memory.js:4`, `:36`: Convex memory mutation/query implementations with entity links and similarity calculation.
- `components/meridian/ui/InstrumentChart.jsx:4`, `:141`: actual Lightweight Charts construction.
- No Zod use was found in the scoped `app/api` and `lib` JavaScript search. The shared tool registry should map Zod to OrgX only unless a concrete Meridian call site is supplied.
- This is a research product/prototype. Its demo statistics and dependencies do not support trading returns, a production broker integration, or quantitative-research expertise claims.

### Portfolio and motion work

- `video/index.ts:1` and `video/src/Root.tsx:7`: registered Remotion root and compositions.
- `video/src/PortfolioFilm.tsx:49`, `:74`: timed motion composition using spring and interpolation. Remotion is real implementation evidence in this portfolio, independently of FrameFX's archive status.
- `src/components/material/MaterialObject.tsx:95`, `:151`: Three.js WebGPU renderer and physical material implementation in the current local portfolio revision. Identify it as this portfolio's work, not prior employer experience.
- `src/data/proof.ts` includes a Figma Config talk, an archived speaker page, and FrameFX package receipts with explicit limits. These are already supplied public citations; this audit did not refresh them.

## Review of the new practice registry

The seven domain names and their project links are supported. Recommended additions with concrete implementation anchors are Trigger.dev, E2B, Convex, Lightweight Charts and Django REST Framework. React Flow, SQLModel, Docker, sysinfo and Crossterm are also supported if additional depth is useful; avoid expanding the overview merely to maximize a logo count.

Recommended accuracy refinements sent to the implementation owner:

1. Map Zod to OrgX, not Meridian, until an actual Meridian call site is identified.
2. Map AWS directly to Vessel and Alma; BrainBuffet also has a saved resume mapping. The inspected record does not explicitly map AWS/EMR to Capital One.
3. Describe Airflow as Vessel data processing/internal workflows. Do not infer that it performed hardware calibration specifically.
4. Python is well supported across Alma and research. Its specific Vessel use is less explicit in the inspected career record; avoid adding a employer-language mapping solely because it is plausible.
5. Preserve research status for PyTorch/Neuromosaic and development status for Blender vehicle work.
6. The initial `group()` helper in `practice.ts` assigns a category-wide href after spreading each tool. A per-tool href added through an `as PracticeTool` cast is therefore discarded. Either remove that misleading override or make individual evidence destinations explicit in the type and precedence.

## Gaps beyond tools

- Give the capability section its own discoverable entry and retain the employment details behind it. MD Anderson existed in data but lacked its own visible About chapter in the pre-expansion narrative.
- The hiring page still primarily addresses governed agent infrastructure. Its fit language should also allow production backend/data, product engineering, creative technology and research-tool collaborations when that matches the user’s intended opportunities.
- Archive copy that says a project “weakens the infrastructure story” actively works against the now-requested range. Describe the project's actual status and contribution instead.
- Use a capability → evidence → technology path. Broad claims such as “accessible interaction” become more useful when linked to keyboard behavior, motion preferences, or a concrete product state, rather than standing alone as a skill label.
- Keep Java, Kafka, AWS EMR, Modal, Fal, Hetzner and Langtrace out of an unqualified “expertise” list. Several appear in the saved resume, and some have project mappings, but their inclusion should carry that exact evidence level. Their absence from the highlighted overview is preferable to a guessed assignment.

## Inspection snapshot

No fetch or branch change was needed for this bounded local-source audit. Values below identify what was read; they do not claim current upstream freshness.

| Repository | Local HEAD | Local tracked upstream | State at inspection |
| --- | --- | --- | --- |
| `orgx/orgx` | `ec26fd893` | `origin/main` `1b10983e0` | One existing changed path |
| `orgx-mcp` | `b3e029c` | `origin/main` `f4fdbd0` | Clean branch, different from tracked main |
| `orgx-openclaw-plugin` | `aa32c74` | `origin/main` `ffd044c` | Six existing changed paths; SQLite also confirmed in tracked main |
| `perf-pulse` | `fa29b14` | `origin/master` `ec53999` | One existing changed path |
| `brainbuffet` | `b44f822` | `origin/main` `b44f822` | Two existing changed paths |
| `neuromosaic` | `fb572c4` | `origin/main` `fb572c4` | Clean |
| `chaos-riders-launch` | `36421bf` | `origin/main` `76392d6` | Extensive existing asset/game refinements |
| `meridian` | `8b7d58e` | `origin/main` `8b7d58e` | Existing strategy and UI changes |

Alma, Vessel, Capital One and MD Anderson were assessed through public-safe portfolio material only. No employer repository or internal data was inspected.
