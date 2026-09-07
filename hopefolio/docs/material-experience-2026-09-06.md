# Material continuity — local implementation

The portfolio now uses one shared three-dimensional ribbon structure as an inspectable object, a persistent background, and the source of smaller surface reflections. The background changes with the work being read. Chapter changes drive both foreground and background from the same selection.

## Material vocabulary

| Form | Role | Inlay |
| --- | --- | --- |
| Knot | Continuity across independent systems | Lime `#b7f34a` |
| Weave | Shared context and a collaborative practice | Sage `#a1b79b` |
| Bridge | Authority, boundaries, and handoffs | Amber `#d6a965` |
| Orbit | Evidence returning to the system | Mineral `#d6e1c7` |

Newsreader carries editorial statements; Recursive carries working detail, navigation, and product names. Both variable fonts are self-hosted with their licenses. The same accent vocabulary appears in material inlays, background reflections, hover light, fine rules, and controls.

## Interaction and implementation

- `MaterialObject.tsx` renders the shared mesh with a procedural studio environment and physical materials. Three.js 0.185.1 uses WebGPU where available and WebGL2 fallback. No remote environment assets are needed.
- `MaterialAtmosphere.tsx` persists above route changes. It follows semantic sections, project hover/focus, and selected studies. Pointer parallax is small; long-form articles receive substantially lower opacity.
- Foreground objects support drag, arrow keys, Home, layer separation, and explicit zoom. Foreground rendering settles after interaction. Ambient actual rendering is capped at 24fps and pauses when hidden; reduced motion settles immediately, including changes made while the page is open.
- The home journey uses viewport-height-based observer margins and shares its active form with the atmosphere. Mobile keeps a smaller study above the scrolling chapters.
- Share links restore selected project and exposed-layer state. The image control composes the current study into a local 1200 × 1200 PNG preview with a native download link. It does not publish anything.
- Deterministic SVG loading/failure posters use the same mesh and form palette. Regenerate with `node scripts/generate-material-posters.mjs` on Node 24.

Renderer references: [Three.js WebGPURenderer](https://threejs.org/docs/pages/WebGPURenderer.html), [physical materials](https://threejs.org/docs/pages/MeshPhysicalMaterial.html). Observer margin percentages use width, so the chapter observer deliberately uses pixels derived from viewport height; see the [Intersection Observer specification](https://www.w3.org/TR/intersection-observer/#dom-intersectionobserver-rootmargin).

## Validation on September 6, 2026

- Full ESLint, TypeScript, optimized Next.js production build, and diff whitespace checks pass. The final build generates all 34 static pages.
- Browser checks covered home, Work, the original four case studies, About, Proof, Writing, Hiring, Contact, archive, a blog article, and a proof detail at 375px with no document overflow. Final shared-heading changes were rechecked at 375px and 1440px. The four added case studies were checked at both widths, including individual content bounds to catch clipping masked by body overflow rules.
- Visually inspected home, chapter interaction, project study, About, Contact, reading surface, and export preview. Browser screenshots are present in the task tool history, not saved as repository fixtures.
- Keyboard rotation, reset, zoom, exposed layers, deep-linked Alma selection, and mobile menu Escape/focus return were exercised.
- Natural scrolling advanced the chapter at desktop and mobile widths, with matching foreground and background forms. This caught and fixed percentage-based observer margins and separate selection thresholds.
- A live preference toggle stopped the ambient draw counter at 2; it remained at 2 on the subsequent read, and returned to ambient rendering when motion was enabled. This caught and replaced a motion-library hook that did not subscribe to preference changes.
- WebGPU was observed. A fresh project object rendered successfully through WebGL after WebGPU was made unavailable in the test page.
- The composed export preview was visually confirmed in the production build. The automation did not return a native download receipt, so saving the file to disk remains unconfirmed by automation.
- No console errors were returned from the final production preview session. No physical-device GPU/battery benchmark or social-platform preview fetch was performed.

## Case-study framing correction

Project pages now lead with their own visual work. Their shared reading order is title and premise, authentic project image, then introduction and compact project facts. The foreground 3D study is removed from all eight case-study heroes. The interactive studies on Home and Work remain available in their existing context.

The persistent material background has a dedicated case-study mode: the reading center is masked out, fragments appear only at the perimeter, and pointer/scroll influence is reduced. Each case keeps its project-specific material identity instead of changing shape on section or link hover. Fine rules and restrained image-edge reflections carry the motif into the framing.

All 29 case-study images have source dimensions. Product screenshots preserve their full proportions; Neuromosaic's original square identity is centered at a restrained desktop size. The previous circular loupe is replaced on case-study visuals with a caption-level full-image action and an accessible native dialog. Captions continue to distinguish product UI, identity work, diagrams, concept art, and public demo previews.

Validation: all eight heroes were inspected at 375px and 1440px with no document or heading overflow, no foreground material study, and preserved image proportions. Mobile project images start 280–419px from the viewport top. Desktop Neuromosaic identity is capped at 576px. The full-image viewer passed fit/actual-size toggling, keyboard panning, Escape, focus return, and body-scroll restoration. A tall-image fit issue discovered during the OrgX evidence check was corrected and the exact case rechecked; the full 560 × 1686 capture now fits without scrolling until actual-size mode is selected. Full ESLint, TypeScript, the optimized build (34 static pages), and diff whitespace checks passed. The development browser returned no console errors during the final image-viewer checks.

The final local production preview also passed Home → Work navigation with their existing studies and ambient mode, and Meridian mobile fit/actual-size/close behavior with case-study framing. No console errors were returned. The viewport override was reset and Meridian was left open for review. No deployment was performed.

## Workspace and delivery state

Implemented in the isolated `codex/material-continuity` worktree at `/Users/hopeatina/Code/portfolio-material-continuity`, based on fetched `origin/main` at `936f784`. The existing proof work from the original dirty checkout was carried forward; the original checkout and its unrelated files were preserved.

Local production preview: `http://127.0.0.1:4173/`. These changes are not committed, merged, or deployed. Case-study metadata uses each project's raster artwork, with the site image retained as a fallback for SVG artwork; the new study export is a separate user-triggered composition.

## Four added projects

BrainBuffet, Neuromosaic, Chaos Riders, and Meridian now have dedicated case studies, source-backed narratives, and existing project imagery. One selected-project registry feeds the homepage, Work page, material selector, and discovery metadata. BrainBuffet, Neuromosaic, and Meridian have been promoted from the archive; the archive now contains nine projects, and their former redirects have been removed.

The shared ribbon takes a contextual form for each project: BrainBuffet's weave describes a path through knowledge; Neuromosaic's knot connects papers, architecture, and experiments; Chaos Riders' orbit describes motion with consequence; Meridian's bridge connects evidence to a decision. The same mapping drives selected studies and the ambient background.

All four material deep links restored the correct project, form, exposed layers, and case-study link. Their pages and content bounds passed browser checks at 375px and 1440px. The Chaos Riders evidence link was exercised. A long-title mobile clipping issue found on Neuromosaic was corrected in the shared case-study layout. Final production responses were HTTP 200 without archive redirects; the homepage, Work page, sitemap, and both LLM discovery documents included all four routes.

Source provenance, image captions, and prototype boundaries are recorded in:

- [BrainBuffet and Neuromosaic](new-project-evidence-brain-neuro.md)
- [Chaos Riders](new-project-evidence-chaos-riders.md)
- [Meridian](new-project-evidence-meridian.md)

Source repositories were inspected read-only. No source application was launched, published, or activated as part of this portfolio addition.

## Skills and brand coverage refinement

The homepage's former 16-tool, predominantly OrgX-focused atlas has become a shared practice registry with 59 evidence-linked tools across seven disciplines. Home and About show the complete capability map, a representative 14-tool overview, discipline filters, cross-discipline search, explicit empty-state recovery, and the option to inspect all tools. On mobile the selected tool's explanation opens directly beneath its button. Hiring now includes the seven capability domains and a broader product/backend/data introduction; About restores visible MD Anderson experience and direct skills links.

The seven disciplines cover product and interaction; backend, cloud and data; AI and agents; research and ML; 3D and games; native developer tools; and creative direction/community. Specific tools remain tied to inspected projects or the existing public career record. The evidence audit is in [skills coverage evidence](skills-coverage-evidence.md).

A shared `TechnologyMark` corrects name-to-logo mismatches throughout the active homepage and every case-study atlas. Its verified product assets include Claude, Codex, Cursor, OpenCode, OpenClaw, MCP, Inngest, Motion, Remotion, Trigger.dev, React Flow, Convex, DRF, Lightweight Charts, Playwright, and E2B. Unverified utilities are labeled with their full names without a fabricated badge or borrowed logo. The implementation covers 72 unique names across current surfaces; 61 resolve to actual marks. [Asset provenance and presentation](technology-logo-sources.md) documents sources and faithful format adaptations.

BrainBuffet, Neuromosaic, Chaos Riders, and Meridian previously had stack text but no interactive tool atlas. All four now have one; the seven non-flagship case studies contain 62 tool entries in total. OpenClaw's outdated JSON-only / zero-dependency description was corrected against its inspected remote-tracking source: SQLite WAL, an outbox, JSON migration, and dependency recovery. See [case study coverage](case-study-tool-coverage.md).

Validation: full ESLint, TypeScript, optimized production build (34 static pages), and diff whitespace checks passed. Browser checks covered all eight case-study tool sections, About, and Hiring at 375px; home interaction and shared layouts were also checked at 1440px. Search for Capital One returned Spark, Scala, and Snowflake; no-match recovery and expanding all 59 tools passed. Tab/Return selected a capability with a visible focus outline. Mobile Blender selection displayed its inline evidence, and final AI product logo assets loaded successfully. Console errors were absent in the final development browser pass. The route checks also caught and fixed a mobile min-content overflow in OrgX's reproduction instructions. These remain local changes, not a deployment.
