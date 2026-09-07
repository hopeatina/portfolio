# Case-study tool coverage

Source review: September 6, 2026. This pass edits the seven case-study
`toolEvidence` arrays and corrects the directly affected OpenClaw durability
claims. OrgX and the shared mark registry are maintained separately.

The four newer cases previously had stack text but no tool atlas. Each case now
has 8–9 selected tools with a concrete role. This is a curated explanation of
the work, not a package-lock inventory. Legacy arbitrary initials were removed;
the shared `TechnologyMark` resolves exact names, using a visible text name when
a legitimate mark is unavailable.

| Case | Count | Selected tools |
| --- | ---: | --- |
| Alma | 9 | Python, Django, Django REST Framework, Celery, Redis, PostgreSQL, Amazon S3, Datadog, Spring Health |
| BrainBuffet | 8 | Next.js, React, TypeScript, Tailwind CSS, NextUI, Framer Motion, Supabase, Axios |
| Neuromosaic | 9 | Python, PyTorch, NumPy, FastAPI, Docker, TypeScript, Three.js, React Three Fiber, React Flow |
| Chaos Riders | 9 | Three.js, React Three Fiber, Blender, Python, FFmpeg, TypeScript, React, Framer Motion, Vite |
| Meridian | 9 | Next.js, React, Tailwind CSS, Framer Motion, Lightweight Charts, Convex, PostgreSQL, Node.js, Interactive Brokers |
| Perf Pulse | 9 | Rust, Tokio, sysinfo, launchd, Axum, Clap, Crossterm, GitHub, Homebrew |
| OrgX for OpenClaw | 9 | OpenClaw, TypeScript, MCP, SQLite, React, Tailwind CSS, Framer Motion, Vite, Playwright |

## Evidence and boundaries

### Alma

The existing public-safe case and `docs/portfolio-v5-evidence-map.md` name Python,
Django, Django REST Framework, Celery, Redis, PostgreSQL, S3, and Datadog. The
atlas now includes DRF and names the evidenced AWS service precisely as Amazon
S3. Spring Health is explicitly **in progress**. No employer source repository,
private clinical architecture, patient data, or production configuration was
accessed for this pass.

### BrainBuffet

Source: `/Users/hopeatina/Code/brainbuffet`. See the repository state and scope in
`docs/new-project-evidence-brain-neuro.md`.

- `package.json` identifies the Next.js / React / TypeScript / Tailwind stack.
- `components/providers/CourseCreationProvider.tsx` and `ChapterProvider.tsx`
  implement the creation and study state coordination.
- `components/CreateCourseFlow/TopicInputCreateFlow.tsx` and
  `components/ion/CoursePreviewChapterAccordionItem.tsx` use NextUI controls.
- `components/ion/CreateCourseStepTop.tsx` and `ChapterStepTop.tsx` use Framer
  Motion in the step experience.
- `services/apiClient.ts` and `utils/apiClient.ts` use Axios with the Supabase session;
  `components/CreateCourseFlow/CreateSignUp.tsx` uses Supabase authentication.

The manifest also contains 3D and payment libraries. The inspected
LearningMountain integration is unmounted and DynamicComponent is commented
out, so these were not promoted to evidence of the learning product's active
experience. The remote course-generation backend was not inspected.

### Neuromosaic

Source: `/Users/hopeatina/Code/neuromosaic`. See the alpha/research boundaries in
`docs/new-project-evidence-brain-neuro.md`.

- `neuromosaic/arch_space/vector_representation.py` uses NumPy to encode and
  decode architecture specifications; the orchestrator coordinates Python
  generation, execution, and recording.
- `nm_output/generated_code/model.py` and `train.py` are saved PyTorch model and
  training artifacts. `neuromosaic/utils/storage_manager.py` and CLI device
  helpers also use PyTorch. Code existence is not a successful training receipt.
- `neuromosaic/api/main.py` constructs FastAPI and registers research resources.
- `neuromosaic/env_manager/providers.py` implements Docker environment checks
  and container management.
- `website/src/components/3d/ModelVisualization.tsx` uses Three.js / React Three
  Fiber and is mounted by `DomainTaskSelectionScreen.tsx`.
- `website/src/components/explorer/ArchitectureView.tsx` implements the React
  Flow hierarchy view. Its live route wiring was not established by this pass.

Next.js and React remain represented in the broader stack text. Additional
source-evidenced analysis tools include pandas in
`neuromosaic/meta_learning/visualization.py` and `cli/commands/evaluate.py`, plus
Matplotlib and Seaborn in visualization. They were omitted from the nine-card
selection to preserve the research/runtime/spatial range. `sklearn` appeared as
configured metric function strings in `api/endpoints/evaluations.py`, which is
insufficient to claim substantive scikit-learn use. No comparative model or
optimization outcome is implied.

### Chaos Riders

Source: `/Users/hopeatina/Code/chaos-riders-launch`. Existing dirty vehicle
authoring work was read, not changed. See
`docs/new-project-evidence-chaos-riders.md` for the prototype and asset boundary.

- `src/demo/DemoGame.tsx` and `src/demo/track.ts` implement the Three.js / React
  Three Fiber driving scene and track behavior.
- `src/LandingExperience.tsx` uses React, Framer Motion, and a lazy demo entry;
  `package.json` identifies the Vite / TypeScript build.
- `blender/build_demo_cars_v4.py`, `blender/render_capture_matrix.py`, and
  `blender/fleet_attempt2/pipeline.py` provide concrete Blender/Python authoring
  and review evidence.
- `qa/build_vehicle_evolution_video_v8.py` and
  `qa/social/chaos-riders-astra/build_media.py` implement FFmpeg-based review
  media from frame sequences.

Blender/Python/FFmpeg describe an evolving local asset pipeline, not a claim
that every generated vehicle is approved, exported, or present in a released
game. No Blender scene, render, build, or source application was run here.

### Meridian

Source: `/Users/hopeatina/Code/meridian`. See the public demo/research boundary in
`docs/new-project-evidence-meridian.md`.

- `components/meridian/MeridianApp.jsx` coordinates the React workspace;
  `package.json` identifies Next.js and Tailwind CSS.
- `components/meridian/screens/SignalAnalysis.jsx` uses Framer Motion for
  analysis expansion; `components/meridian/ui/InstrumentChart.jsx` uses
  Lightweight Charts.
- `convex/schema.js` and `convex/memory.js` define persistent research memory.
- `services/ingestion/index.js`, `services/execution/index.js`, and database
  migrations establish Node services and PostgreSQL/TimescaleDB storage.
- Broker adapter source and the paper-routine safety evidence support the
  Interactive Brokers integration card, explicitly scoped to paper/research.

The primary web application is JavaScript; TypeScript and Python were not added
by inference. No live trading, returns, strategy readiness, activated broker
connection, or successful dispatch is claimed. No trading operation was run.

### Perf Pulse

Source: `/Users/hopeatina/Code/perf-pulse`. `Cargo.toml` identifies Rust, Tokio,
sysinfo, Axum, Clap, and Crossterm. The CLI/TUI/local-server implementation,
LaunchAgent integration, and release workflows support the existing selection.
The existing GitHub/Homebrew release evidence remains in the case. This pass
only removes arbitrary initials; it does not upgrade release or runtime claims.
The local server's interface is inline HTML/CSS/JavaScript, so React was not
added.

### OrgX for OpenClaw: source drift corrected

Source: `/Users/hopeatina/Code/orgx-openclaw-plugin`, inspected `origin/main`
`ffd044c` (package version `0.7.39`). The working checkout and older guidance
describe earlier states, so current remote source is used for these corrections.

- `package.json` has production dependencies `better-sqlite3` and `@sentry/node`.
  The old absolute zero-production-dependency claim was removed.
- `src/stores/sqlite-state.ts` creates `orgx-state.sqlite`, enables WAL, and
  defines runtime, run, outbox, and snapshot tables. It also handles recovery
  from missing native bindings.
- `src/outbox.ts` reads/writes SQLite, imports legacy JSON records, and retains
  dead-letter JSONL records. The case now describes SQLite with JSON migration
  rather than claiming a deliberate rejection of SQLite.
- `dashboard/package.json` and `dashboard/vite.config.ts` identify the React,
  TypeScript, Tailwind, Framer Motion, and Vite build. Dashboard component imports
  confirm Framer Motion use for overlays, state changes, and reorderable views.
- The MCP bridge and Playwright verification remain in the selected evidence.
  Node.js remains in the architecture/stack text; public source remains linked.

This is a source correction, not a newly published-package or deployed-runtime
receipt. No host gateway, background job, dispatch, or application was started.

## Validation

Scoped ESLint passed for all seven case pages. `git diff --check` passed.
Full `npx tsc --noEmit --incremental false` passed after the shared mark component
landed and its partial-map typing was corrected. Earlier integration checks
caught missing-module and always-defined-condition errors in that parallel
component; the final rerun cleared both. Browser evidence for the final logo
treatment belongs to the parent task.
