# BrainBuffet and Neuromosaic case-study evidence

Read-only source inspection: September 6, 2026. No source application was run,
no environment or credential files were read, and neither source repository was
modified. These pages describe implementation, not current product health or
measured customer outcomes.

## Repository state and authorship

| Project | Inspected source | Current remote main | Working tree | Visibility |
| --- | --- | --- | --- | --- |
| BrainBuffet | `/Users/hopeatina/Code/brainbuffet` | `b44f822be7edb53afaffad4354a31a8a0edd4931` | Existing modified `package.json` and untracked `.npmrc`; untouched | Private |
| Neuromosaic | `/Users/hopeatina/Code/neuromosaic` | `fb572c4be2809b6f0414b30c6433b50ecf3aa53a` | Clean | Private |

`git ls-remote origin refs/heads/main` matched each local HEAD and origin/main.
`gh repo view` confirmed both repositories are private; visitor CTAs do not link
to them. No repository-specific AGENTS.md or CLAUDE.md was found by the scoped
file search. BrainBuffet's README is inherited SaaS-starter documentation and was
not treated as a product specification.

Git history identifies Hope's implementation work: BrainBuffet's shortlog has
570 commits under `hopeatina`, 161 under `Hope Atina`, and 43 under `hopevh`;
Neuromosaic has 519 under `hopeatina` and 2 under `Hope Atina`. These support the
engineering role, not adoption, exclusive authorship of upstream dependencies,
or a measured product result. Case copy uses product/engineering and
research/engineering roles rather than inventing employment or funding facts.

## BrainBuffet

Purpose: a web product for self-directed learners to shape personal courses and
study through chapters, quizzes, videos, and contextual notes.

Source-grounded decisions:

- **Gather context in stages.** `components/providers/CourseCreationProvider.tsx:39`
  defines topic, expertise, subtopics, preferences, and quiz state; `:54` defines
  the creation sequence; `:267` feeds expertise into recommendations; `:314`
  feeds selected subtopics into quiz generation.
- **Separate generation from preview.** The same provider at `:148` checks
  generation state and preview fields, and `:285` starts course generation and
  preserves the returned course identifier in the route.
  `components/CreateCourseFlow/CoursePreview.tsx:94` presents the title,
  expected outcomes, description, and chapter outline.
- **Keep study state and notes contextual.**
  `components/providers/ChapterProvider.tsx:123` restores steps/progress from
  chapter data; `:200` persists chapter progress;
  `components/ChapterFlow/ChapterStep.tsx:57` maps step-specific navigation and
  `:111` displays quiz feedback;
  `components/ChapterFlow/CourseNoteSidebarSection.tsx:77` filters notes by course
  and chapter, and `:97` saves the course/chapter/step identifiers.

Technology: Next.js 14, React, TypeScript, Tailwind CSS, NextUI, Framer Motion,
Supabase Auth, Axios, and course/quiz/note API integrations. The backend behind
those API calls was not inspected or exercised.

Honest boundary: `components/DynamicComponent.tsx` is commented out;
`components/Interactive.tsx:41` retains an unfinished generated-code fallback;
`components/ProfileDetails.tsx:104` leaves LearningMountain unmounted.
`components/providers/ChapterProvider.tsx:196` also retains an empty generic
step-progress callback. Do not claim a complete adaptive-learning engine or
improved retention, learning speed, or learning outcomes.

Assets copied byte-for-byte from existing portfolio assets:

- `hopefolio/public/images/projects/brain-buffet-desktop.png` →
  `hopefolio/public/images/case-studies/brain-buffet/desktop-study.png`.
  Saved desktop device composition with chapter content, progress, video, and
  notes. Capture date unknown; not a new live capture.
- `hopefolio/public/images/projects/brain-buffet.jpg` →
  `hopefolio/public/images/case-studies/brain-buffet/mobile-study.jpg`.
  Saved mobile landing-page composition. Marketing copy in the image is not
  used as outcome evidence.

## Neuromosaic

Purpose: a research workbench connecting papers, explicit neural architecture
specifications, model code generation, and experiment records. README target
users are ML researchers, practitioners, AutoML enthusiasts, and developers.

Source-grounded decisions:

- **Represent architectures explicitly.**
  `neuromosaic/arch_space/vector_representation.py:78` defines numeric bounds and
  categorical options; `:193` and `:243` implement encode/decode operations.
- **Keep implementation and experiment provenance together.**
  `neuromosaic/orchestrator/orchestrator.py:271` implements the sequence from
  architecture suggestion through code generation/versioning, execution, result
  recording, strategy update, and final cleanup. Stored fields include
  architecture specification, code version, and metrics.
- **Expose different scales of inspection.**
  `website/src/components/3d/ModelVisualization.tsx:67` supplies selectable model
  points and `:86` documents interaction controls; it is used by
  `website/src/components/screens/DomainTaskSelectionScreen.tsx:331`.
  `website/src/components/explorer/ArchitectureView.tsx:34` converts hierarchical
  components into a React Flow diagram. This is an implemented component; this
  review did not establish its live route wiring.

Additional depth: `neuromosaic/api/services/paper_processor.py:47` implements a
staged paper-processing job with progress. `nm_output/generated_code/model.py`
and `train.py`, plus `workflow_output/generated_code/`, contain saved MNIST
model/training artifacts. Their existence is not proof of successful training.

Technology: Python, PyTorch, NumPy, Pydantic, FastAPI, SQLModel/PostgreSQL,
Docker/local execution interfaces, Next.js, React Three Fiber, Three.js, React
Flow, and TypeScript.

Honest boundary: `pyproject.toml:15` labels the package Alpha.
`neuromosaic/meta_learning/optimization.py:85` returns random suggestions where
Bayesian optimization is unfinished;
`neuromosaic/orchestrator/strategies/bayesopt_strategy.py:68` has an unimplemented
prediction method. `website/src/app/explorer/page.tsx:62` combines sample papers
with API papers. No comparative architecture-performance claim is supported.
The historical CLI status document has inconsistent dates/metrics and is not
used as current test evidence.

Assets copied byte-for-byte from the source repository:

- `website/public/images/neuromosaic_logo.png` →
  `hopefolio/public/images/case-studies/neuromosaic/identity.png`.
- `website/public/images/mosaic_pattern_1.png` →
  `hopefolio/public/images/case-studies/neuromosaic/mosaic-study.png`.

Both are original website identity/art assets, explicitly captioned as such.
No authentic application screenshot was found in the scoped source inventory.
The older portfolio `public/images/projects/neuromosaic.jpg` could not be decoded
by the image viewer and is not used by the new case study.

## Public link checks and portfolio validation

Anonymous HTTP GET checks on September 6, 2026:

- `https://app.brainbuffet.co` → HTTP 200 after a redirect to `/signin` with a
  return route. Its server response exposed a minimal shell. Course generation,
  authentication, billing, and backend health were not tested.
- `https://brainbuffet.vercel.app` → HTTP 200 after a similar sign-in redirect.
- `https://neuromosaic.vercel.app` → HTTP 200 with the Neuromosaic public landing
  content. This proves the landing response only.

The web research tool could not open these URLs, so direct anonymous GETs were
used for the bounded reachability check. No sign-in or form action was taken.

New page validation: scoped ESLint and repository TypeScript passed. Source
image copies were decoded and inspected. Browser layout and route integration
remain part of the parent portfolio task's QA.
