# Project films v2: from 2/10 to the OrgX reel's bar

Hope's verdict on v1: "each is sitting like a two out of 10." The concepts were mostly
right, but the execution was slideware. v2 rebuilds every film to the craft of the OrgX
motion reel (`orgx/tools/film-kit/showreel`).

## What made the OrgX reel work, and what each v2 film now does

| OrgX reel craft | v1 | v2 (every film) |
|---|---|---|
| One continuous 3D world with one keyed camera (graph-editor splines, exact per-plane perspective, motion blur on moves, crisp on reads) | Flat 2D layouts, no camera | `src/lib/space.ts` + `World.tsx`: an orbit camera keyed like a graph editor (monotone cubic per channel). Every card, crate, tower and screen is a plane with its own exact homography. `CameraMotionBlur` runs only on moves. |
| Frame-0 hook that is a feeling | An italic headline over an empty shape | A relatable moment in macro, readable with sound off (see below) |
| Every musical hit does something | Only the drop and the button | Measured hits (`tools/hitsheet.py`: kick/snare/hat flux) feed a per-film cue sheet (`src/data/cues_<film>.json`). The picture and the SFX read the same cues, so they can't drift apart. |
| A hero object that persists and transforms | Nothing persists | One per film (below) |
| Capability theater | Screenshots faded in | Real UI states changing: form state machines, terminals printing, a notification, a stop button pressed, a progress bar filling, a stamp |
| Type that performs | One headline swapped at the drop | "Saving…" strains under weight; Day 1→5 flips faster; FLOW stretches with speed; "why?" decodes; the 84 is sliced |
| Designed sound | Raw music | `tools/sfx.py`: film-kit sweeteners (whump, freeze, awe chord pitched to the bed's key, metal/clock ticks, shaped-noise whooshes, FM bells, glitch) in one shared room, then −14 LUFS |
| A hidden layer for the rewatch | None | 2–3 per film (below) |
| Draft → strips → critique → fix → final | One stills pass | 2–3 stills passes per film, full renders, and frame extraction at the transitions |

The soundtrack windows were also re-picked so each film's turn lands on a real drop, with
spectrogram panels as the check. OpenClaw moved from Bop (no drop) to Ravioli, and
Neuromosaic from Synthyrecover to Macros. BrainBuffet's real drop is the drum entry at f436,
not the beat tracker's f380.

## The films

| Film | Frame 0 | Hero object | The turn (drop) | Rewatch layer |
|---|---|---|---|---|
| Alma (Kdila) | A therapist's cursor on Save, PHI redacted | The saved note on its rail | The crates of consequence peel off the note into audited Celery lanes. The rail twangs straight. One lane fails, retries, passes. A flag flips off and on. The camera cranes up: it's the continuity map. | Crate serials count to #0999; the map is on the floor from frame 0 |
| Perf Pulse (Tues) | The rainbow beachball, 14:39:07, not responding | The memory tide rising through a city of processes | Crash Guard's real notification lands before the freeze. The camera flies through it into the real dashboard. "Stop safely" on the snare. The tide drains. | The end clock reads 14:39:07 again, responsive; "about 9 min" is the gap |
| OrgX × OpenClaw (Ravioli) | The canonical pixel lobster: "Who do I work for?" | The lobster | OrgX's island rises and the /orgx/mcp bridge builds plank-per-hat. Day 5 it remembers. The Wi-Fi dies and the SQLite outbox replays. Pull back: one card in the real OrgX Live dashboard. | The session number never resets after the bridge; the bubble shrinks each day |
| BrainBuffet (Feeling) | A search box answering in one line | The tray | The answer is on a saucer at the head of a buffet. The tray stands up into the course outline, then the real study surface (note attached, chapter quiz fills the bar). | Dish colours are chapter numbers |
| Neuromosaic (Macros) | A paper in raking light, "12 layers" glowing | The tiles | The snare-driven build shatters phrases into tiles that orbit into a mosaic. It encodes into one vector, then the code, a version, and a recorded run threaded back to the tiles. | The page keeps the holes; the first six cells are the tiles in paper order |
| Chaos Riders (Drvn) | The concept art (labelled), pushing in | The taxi | Fly through the art into a true 3D road. Potholes on the snares. The golden line draws itself. FLOW. Then the labelled playable prototype. | The taxi's plate is the concept art's plate, 04 12 81 |
| Meridian (Montay) | 84, huge, cursor drifting to BUY | The number | The numeral slices into its ingredients (slice height = weight). The camera walks the stack as the evidence resolves. The hidden concern rises in red. Then the plan (real preview values) and LIVE EXECUTION: DISABLED. | 24 + 21 + 26 + 9 + 12 − 8 = 84 |
| Highlight (UBEAT V1) | Hope's Config 2021 line, captioned to the voice | The lime thread and its bead | Eight screens hung on one thread, one per downbeat (OrgX two). Pull back: all eight light in order. The name lands on the final hit. | Every film has its own thread: rail, waterline, bridge, tray, threads, golden line, slices |

## Critique log (what the passes caught)

- **Alma:** hook framing off-centre; build tower too small to read; lanes and gates too wide; flag close-up out of frame; drop had no payoff. Fixed with a spring twang on the rail, a light pulse down each lane, a faster peel, fading the foreground posts, and moving the build line to the top.
- **Perf Pulse:** beachball filled the frame and read mushy (moved to hard-stop segments and pulled back). The leaker tower sat in the fly-through corridor. Copy aligned to the real screenshot: 9.9 GiB, "about 9 min", and the real Stop-safely coordinates.
- **OpenClaw:** drop framing too wide to feel the island rise; inventory collided with the Day headline.
- **BrainBuffet:** dishes were hidden by the counter top (a painter's-sort bug, fixed with plane depth bias). The flat tray was oversized. Frame 0 now shows the query already typed.
- **Neuromosaic:** code and run too small; restored the case study's end-card line.
- **Chaos Riders:** the golden line (the drop's payoff) was invisible inside `CameraMotionBlur` (visible with blur off; root cause not isolated). Removed the long FLOW blur; speed lines carry the speed.
- **Meridian:** slice range didn't match the glyph (measured it on frame 0). Two camera keys on the same frame broke the spline, so `keyedCamera` now throws on non-increasing keys.

## Numbers (unchanged rule)

Only numbers the case studies state appear as claims: 72% (self-reported), 999 commits,
2.7 years. Screenshot values are shown as they appear (Crash Guard 9.9 GiB, 40/100,
27.2 GiB; Meridian's plan 2285/2271/2310/$4,200). Everything illustrative is labelled on
screen: Meridian demo values, the OpenClaw inventory, the Neuromosaic run.
