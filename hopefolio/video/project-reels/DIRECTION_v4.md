# Project films v4 — a director's critique, and the fidelity plan

Hope's v3 review: Perf Pulse doesn't make the problem clear. OpenClaw never goes deep into the
interface. BrainBuffet needs its design sub-parts lifted out so the user outcome is obvious.
Alma should be told the way Hope actually tells it. Meridian doesn't say why it's better or what
the outcome is. The music is a bed, not a score. The camera is competent, not intentional. The
subliminal layer from the OrgX reel is gone. The props are low fidelity. Chaos Riders ignores
the new models. And the highlight's thread line, page framing and bookends are weak, and Hope is
absent from it.

## Sources used (the ground truth for every claim on screen)

| Film | Source |
|---|---|
| Alma | Hope's recorded interview (MacWhisper transcript, 2026-08-28): "audit 1,000 notes per month… we only have two clinicians… they're just looking at a Metabase dashboard"; a two-day prototype sprint with the clinical lead; "he's not bogged down by the number of audits". Codex history: the Upheal treatment-plan review integration; the two-way workflow with OAuth, idempotent authenticated webhooks, polling fallback and degradation alerts; HIPAA reassessment treated as a launch requirement; 72% adoption among eligible clinicians; episodic strikes toward violations, carrot + stick. Resume. |
| Perf Pulse | The project page: agents, builds and desktop apps eat memory or disk until the Mac stops responding, while Activity Monitor sits unopened. Crash Guard: a per-user agent, thresholds plus forecasting, a notification into the live dashboard, and identity-checked stop (PID + name + start time). Real screenshots: dashboard, CLI, TUI, Meeting Mode. |
| OpenClaw | The page: the host already had agents, but it lacked organizational continuity. The /orgx/mcp local bridge, the SQLite outbox replay, SSE with polling fallback, Next Up kept separate from In Progress. Real screenshots: overview, sessions, mission control, full dashboard, activity timeline. |
| BrainBuffet | The source repo `~/Code/brainbuffet`: the CreateCourseFlow (topic → expertise → subtopics → learning style → expertise quiz → CoursePreview with outcomes + outline), the ChapterFlow (progress track, video, quiz, notes sidebar), the LearningMountain (a glowing path up a mountain), and the theme (#1B1823, #272334, #30293e, #8F39FF, #C99FFF, #f6eeff). The landing copy: "Create your own learning adventure". Resume: 250+ courses, a course in under 5 minutes, −90% creation time. |
| Meridian | The page: "A confidence score can hide the most important part of a decision"; the conviction stack of contributions and concerns; decision nodes linked back to evidence; the plan (entry, stop, target, size); live execution disabled. |
| Chaos Riders | The latest Blender authoring models in `chaos-riders-launch/blender/source-attempt2/survivor-panel-rebuild-r5.blend` and `source-fleet-attempt2/{needle,tank}-component-r6.blend` (Sept 4, "not game export"). The Astra thread: "the car I kept telling AI looked like Lego". The live demo at chaos-riders-launch.vercel.app: "THE ROAD FIGHTS BACK.", "FIND THE LINE. HOLD YOUR NERVE.", and "ONE ROAD. 20 SECONDS.", with the amber line through pothole fields, a speed surge and near-miss bonuses. |
| Highlight | The hopefolio values copy, `hope-profile.jpg`, and the Config 2021 photo. |

**Two repos, one game.** `~/Code/chaos-riders` is the game, and `~/Code/chaos-riders-launch`
is the launch site plus the playable micro-demo that is deployed to Vercel. The deployed demo
still drives an older car. The R5/R6 models are Blender authoring studies that haven't been
exported to the game yet, and the film labels them that way.

---

## The critique, film by film

The scores use the award-launch-film rubric, as a director sees the whole film in one pass.

### Perf Pulse (v3: 5/10). The problem is never shown, only named.

- **What fails.** The cold open is a frozen call with a beachball, which reads as "the Wi-Fi
  died" as easily as "the Mac died". The "process city" of tan boxes under a red tide is a
  metaphor with no key: a viewer can't tell that the boxes are processes, that the tide is
  memory, or why it rises. The dashboard arrives as a tilted screenshot we can't read. There's
  no villain. The film says "Crash Guard is watching" but never shows *what* it saw.
- **The fix: make memory a physical quantity with a ceiling.**
  - Start in the real macOS moment everyone recognizes: the *"Your system has run out of
    application memory"* dialog over a frozen screen share. The chat pings: "you froze".
  - Rewind nine minutes, then take the one impossible shot in the film: a continuous push from
    the menu bar through the lid onto the logic board and into the memory itself.
  - Inside, the 18 GB of RAM is a glass column. Every app is a coloured block with its name and
    size. The villain is `vitest --watch` spawned by an agent, which grows by one block on every
    hat of the track. When the stack hits the 18 GB line, blocks spill down into swap on the SSD
    and visibly crawl. That crawl *is* the freeze. Now the viewer understands the mechanism.
  - The turn: the same rewind with Crash Guard. The notification names the villain and the
    forecast ("vitest +11 GB in 6 min · unresponsive in ~9 min"). One click opens the real
    dashboard, pushed in until it's legible. "Stop safely" re-checks the PID, name and start
    time. The villain's blocks dissolve on the snare, the column drops, and we pull back out
    through the lid in one move.
  - It ends at 14:39:07, the same second as the open, still mid-sentence on the call.
- **Camera psychology.** The problem is shot handheld on a long lens, off-centre and
  claustrophobic. The mechanism is a clean, symmetrical, "explainer" camera: the viewer is being
  taught. The fix is a locked frame that breathes. The oner through the lid is the film's
  signature, and it plays in reverse at the end as a callback.
- **Subliminal.** The column's block labels spell `BEFORE` across six processes for 8 frames
  (Hope's value: *timing, tension, release*).

### Alma (v3: 5/10). The wrong story, beautifully lit.

- **What fails.** v3 is about Save latency. That isn't Hope's Alma story, and it isn't what
  Hope's resume or interviews say. The underworld lanes look good but carry a generic
  "async jobs" idea that any backend engineer could claim.
- **The real story, in Hope's own words.** Insurance needs therapy notes to be *auditable*. The
  goal was 1,000 audits a month, and there were two clinical reviewers staring at a Metabase
  dashboard. Hope ran a two-day prototype sprint with the clinical lead. The AI takes the first
  pass (the Upheal treatment-plan review integration), and the clinicians judge only what's
  flagged. Therapists get *coached*, not punished: episodic strikes track toward violations
  (the stick) while a coaching tip helps the next note pass (the carrot). The integration is
  production-grade: OAuth, idempotent signed webhooks, a polling fallback when the webhooks go
  quiet, and a degradation alert, with HIPAA reassessment as a launch requirement. The result
  was 72% adoption among eligible clinicians, and the clinical lead stopped drowning.
- **The fix.**
  - **Open on scale.** A single note card, pull back, and it's 1,000 cards to the horizon. The
    impossible shot is a drone rise over a paper landscape with two small desk lamps in it (the
    two reviewers). The counter reads "Audited this month: 37 / 1,000", and the calendar pages
    flip on the kicks.
  - **The turn.** "Two days. One prototype." A green scan line sweeps the field on the drop, and
    cards flip in waves to pass (quiet), flag (amber) or fail (red). The field collapses into a
    short queue in front of the lamps.
  - **The human beat.** A therapist's view of the compliance hub. A strike appears ("Treatment
    plan: goal isn't measurable · 1 of 3") with a coaching tip beside it. The next note passes,
    and the strike streak resets. Carrot, then stick.
  - **Reality underneath.** Illustrated as an Alma ↔ vendor signal line. A webhook drops (the
    line breaks), polling takes over as a dashed line, the degradation alert chimes, and nothing
    is lost.
  - **End.** 72% of eligible clinicians. The shield-check lockup.
- **Camera psychology.** Overwhelm is a high angle that keeps rising (the viewer gets smaller as
  the pile gets bigger). Relief is eye level, with the queue brought to human scale. The
  therapist beat is a close, warm 85mm: dignity.
- **Subliminal.** In the 1,000-card field, the flagged cards briefly form `CARE` when seen from
  the drone (Hope's value: *start with the person*).
- **Integrity.** No real names, no patient content. The note text is illustrative and labelled
  "illustrative".

### Meridian (v3: 5/10). A beautiful split with no stakes.

- **What fails.** The 84 slicing into its ingredients is the best image in the set, but the
  viewer never learns why seeing the ingredients *changes anything*. There's no before and
  after, no decision made differently, and no outcome.
- **The fix: one setup, two desks, shot as a split screen.**
  - **Left, the usual desk:** 84 and BUY, a click, then CPI prints the next morning. A red
    candle. "Why did I take this?" The desk has no answer.
  - **Right, Meridian:** the same 84. Click the number and the conviction stack opens:
    +24 regime, +21 positioning, +26 orderflow, +12 history, +9… and then the hidden −8,
    *calendar: CPI tomorrow, 8:30*. The trader sizes down and waits. The same red candle
    passes harmlessly. The decision node records the reason ("waited: calendar −8").
  - The outcome line: **You can defend every decision — before you take it and after.**
  - The honest stamp stays: demo values, live execution disabled.
- **Camera psychology.** The FOMO pressure stays on 85–135mm, with a slow push toward BUY that
  the viewer can feel. The split screen is a locked, symmetrical comparison, a courtroom frame.
  The −8 gets the film's only rack focus: everything else goes soft.
- **Subliminal.** The price line on the left desk traces a flat `?` when paused, while the
  right desk's decision graph reads `WHY` (Hope's value: *systems with depth, details with a
  reason*).

### BrainBuffet (v3: 6/10). The metaphor ate the product.

- **What fails.** The buffet and tray metaphor is charming, but the real product appears only
  as a blurred study screen. A viewer can't name one thing the product does *for them*. The
  pastel white world is also off-brand: the real app is dark plum (#1B1823) with violet
  (#8F39FF), and the brand world is a violet mountain at night.
- **The fix: exploded product callouts, each paired with an outcome.**
  - Rebuild the real flow's sub-parts from the source as legible 1080p components, and give
    each one a beat. The camera zooms in, the component lifts off the screen on Z, and one
    outcome line lands on the snare:
    - **Topic:** "how do I build passive income?"
    - **Expertise (Beginner / Some / Expert):** *it skips what you already know*.
    - **Subtopics:** *you choose the path, not a prompt*.
    - **Expertise quiz, 3 questions:** *it finds where your knowledge stops*.
    - **Course preview, outcomes + outline:** *you see what you'll be able to do before you
      start*.
    - **Chapter: progress track, video, quiz feedback:** *you always know where you are*.
    - **Notes pinned to chapter 4:** *your notes come back with the lesson*.
  - The impossible shot: the chapter outline becomes the **LearningMountain**, a glowing path up
    the violet mountain from the brand's hero, and the camera flies the path, one lit point per
    chapter on the hats.
  - The buffet lives on as the *host* (the smiling brain) and the snack → meal line, and no
    longer carries the film.
  - Outcome card: **a question to a course plan in under 5 minutes · 250+ courses**.
- **Subliminal.** The quiz answer letters, read top to bottom across the three questions, spell
  `YOU` (Hope's value: *start with the person*).

### OrgX × OpenClaw (v3: 6/10). The joke lands, the product doesn't.

- **What fails.** The pixel Groundhog Day works emotionally. But the real interface appears once,
  as a thumbnail inside a thumbnail, for under two seconds. Nobody learns what the plugin *is*.
- **The fix: the lobster walks into the product.**
  - Keep Days 1–4, but tighten them to half their length.
  - On the drop, the impossible shot: push into the lobster's terminal on the island. The
    pixels resolve into the real OpenClaw control UI at full resolution, and the pixel lobster
    is now a tiny sprite walking along the UI.
  - The sprite leads the tour on the hats:
    1. The OrgX tab inside OpenClaw.
    2. Mission control: named agents, what each is doing, blocked decisions.
    3. The initiative, constraints and prior decisions arriving in the agent's session ("it
       remembers").
    4. The activity timeline.
    5. Next Up vs In Progress, kept separate.
    6. The storm, shown as the UI going offline: events stack in the outbox (a counter climbs),
       Wi-Fi returns, and the counter drains to 0 as they replay. *Nothing lost.*
  - Pull back out through the terminal to the island, now at sunset, into the lockup.
- **Camera.** The island stays locked (repetition is the joke). The UI tour is a smooth
  "documentary macro" slider, pixel-snapped whenever the sprite is on screen.
- **Subliminal.** The Day counter's pixels reshape into `WE` for a frame on Day 5 (Hope's value:
  *make things together*).

### Chaos Riders (v3: 4/10). A Lego car in a film about a better car.

- **What fails.** The code-built box taxi is precisely what the project spent months escaping
  ("the car I kept telling AI looked like Lego"). The golden line and FLOW are good, but the
  brand type is wrong: the site uses tall condensed caps, "THE ROAD FIGHTS BACK.", on gold and
  dust.
- **The fix: the evolution *is* the plot.**
  1. **Cold open.** Our own v3 box taxi, on a turntable, with the caption "It looked like Lego."
  2. **The rebuild.** Hard cut on the kick to the real R5 Survivor, Cycles-rendered from its
     saved Blender geometry, from the same angle. A match-cut orbit, with panels, glazing and
     paint called out on the snares.
  3. **The fleet.** Needle and Tank R6 slam in on the kicks.
  4. **Gameplay.** "FIND THE LINE. HOLD YOUR NERVE." Real captured gameplay from the live demo:
     the market, the amber line through a pothole field, the speed gauge climbing, a near-miss.
  5. **Brand ending.** "THE ROAD FIGHTS BACK."
- **Labels.** "Blender authoring model · not yet in game" and "Live demo · chaos-riders-launch".
- **Camera.** Car-commercial grammar on the renders: a low 3/4 view on a long lens, a slow
  orbit, and a light sweep across the paint. On the gameplay, speed ramps.
- **Subliminal.** The number plates read `04 12 81` → `BEND` for 6 frames (Hope's value: *a
  bend can become a break; a break can reveal the next weave*).

### Neuromosaic (v3: 7/10). Closest to done.

- **What works.** It has the strongest single idea (the paper shatters into the sphere).
- **The fix: score-sync and prop fidelity.** Lift the paper to real-typeset fidelity, key the
  shards to melodic onsets rather than only snares, and add a rewatch layer (tile IDs that are
  real arXiv-style anchors).
- **Subliminal.** The sphere's tiles briefly show `DEPTH` (Hope's value: *systems with depth*).

### Highlight (v3: 6/10). Good pace, weak spine, no author.

- **What fails.**
  - The "thread" is a lime diagonal wipe, a transition rather than a line of meaning.
  - The per-film framing is tiny mono captions.
  - It opens on a quote over dark footage and closes on a name over a gradient.
  - Hope never appears, and neither do Hope's values.
- **The fix: the thread is literal, and it is Hope.**
  - Every film already owns a *line*: Alma's shield stroke, Perf Pulse's pulse, OpenClaw's
    bridge, BrainBuffet's mountain path, Neuromosaic's vector, Chaos Riders' amber line, and
    Meridian's price line.
  - The highlight carries **one continuous thread** across every cut: it leaves each film *as*
    that film's line and enters the next.
  - Each segment is framed by the **value** it proves, set large in Newsreader italic, with the
    project name in the film's own brand type as a designed lower third:

    | Segment | Value |
    |---|---|
    | Alma / BrainBuffet | *Start with the person.* |
    | Perf Pulse | *Timing, tension, release.* |
    | OpenClaw | *Make things together.* |
    | Chaos Riders | *A bend can become a break.* |
    | Neuromosaic / Meridian | *Systems with depth. Details with a reason.* |

  - **Opening.** No quote card. A single thread is pulled taut across black, it plucks like a
    string on the first note, and the vibration becomes the OrgX line.
  - **Ending.** Every film's line flies back and they braid, then the braid draws **Hope's
    portrait as one continuous line** (a single-stroke drawing computed from `hope-profile.jpg`),
    each film's colour visible in the stroke. The photo resolves underneath for one beat, then
    back to line, and the name lands on the last hit.

---

## What changes in every film (the systems)

1. **Score, not bed.**
   - Each track is re-edited as a score: a hard stop-down to silence before the turn, a
     low-pass "inside the machine" filter, reverse swells built from the track's own drop, and
     a tape-stop on the freeze.
   - Picture keys to *sub-elements*, not just the drop. A per-band onset map (kick / snare /
     hat, plus harmonic note onsets via HPSS) is written to `src/data/beats_<film>.json`:
     - kicks → camera kicks and slams;
     - snares → cuts and state changes;
     - hats → micro-motion (counters, blocks, the lit points);
     - melodic onsets → type reveals.
2. **Camera with intent.** Every film has a written emotional camera:
   - anxiety = long lens + handheld + off-centre;
   - explanation = symmetrical + locked + slow;
   - relief = eye level + wide + still.
   Each film also gets exactly **one impossible oner** at its turn, with a callback in reverse.
   Moves use anticipation → move → settle (`cine` ease), and never linear.
3. **The subliminal layer.** Each film hides one of Hope's value words for 6–8 frames inside its
   own props, and the highlight surfaces all of them.
4. **Prop fidelity.** Real UI rebuilt from source or real screenshots pushed until legible,
   real models rendered in Cycles, real gameplay, and the macOS dialog at system-font fidelity.
   No box proxies where a real asset exists.
5. **Brand genre.** Each film's type, palette and texture match the product's real identity
   (Chaos Riders' condensed caps on gold and dust; BrainBuffet's dark plum app and violet
   mountain).

---

## What was built (v4)

| Film | Score (composed from Hope's track) | The one impossible shot | Rewatch layer |
|---|---|---|---|
| Perf Pulse | *Tues*. It tape-stops on the freeze, rewinds, stays low-passed inside the machine and opens as the leak grows, stutters into a beat of silence under the warning, then drops on the click. | The push from the desk through the lid into an 18 GB memory column, reversed at the end. | Six real macOS daemons light their initials: B-E-F-O-R-E. |
| Alma | *Kdila*. The pile of notes sits under a closing low-pass, a stutter builds on "two days", and the hats arrive with the scan. | A drone rise from one note card to a thousand cards to the horizon. | From directly above, the flagged cards spell CARE, camouflaged among ordinary flags. |
| Meridian | *Montay*. Sparse bars for the FOMO push, the music stops dead on BUY, silence and a reverse swell into the replay, which builds into the drop on the new plan. | A rack focus to the −8 concern, the only one in the film. | WHY rides the ticker tape for 7 frames. |
| BrainBuffet | *Feeling*. A thin intro for the one-answer hook; the create flow on the opening filter; the drop on the course preview. | The chapter outline becomes the LearningMountain, and the camera climbs it one lit point per hat. | The outline's chapter initials spell Y-O-U. |
| OpenClaw | *Ravioli*. Drumless bars for the lonely island; drums with the bridge; the Wi-Fi dropping is a low-pass inside the tour. | Into the lobster's terminal, where the pixels resolve into the real OpenClaw UI. | The tour's chips and bubbles carry the plugin's real states. |
| Chaos Riders | *Drvn*. It sputters and stops on the Lego joke, the energetic section carries the rebuild, then a reverse swell into gameplay. | A hard cut from the box taxi to the real Cycles taxi at the same angle. | A BEND CAN BECOME A BREAK rides the slow-motion. |
| Neuromosaic | *Macros*. A closing low-pass as the paper shatters, and a reverse swell into the same drop frame. | Unchanged (the sphere orbit). | The front tiles spell DEPTH for 7 frames. |
| Highlight | *UBEAT V1* (unchanged). | The thread draws Hope's portrait. | Each segment is framed by the value it proves; the braid stacks all eight. |

### Tooling added
- **`tools/compose.py` + `tools/compositions.json`**: scores built on the beat grid from sections of Hope's tracks, with low-pass/high-pass sweeps, tape-stop, reverse swells and stutters, plus named markers the picture keys to.
- **`tools/bars.py`**: a bar-by-bar band-energy map, used to pick sections.
- **`tools/scope.py`**: a spectrogram with the markers, for a visual listen.
- **`tools/hitsheet.py`**: now also writes harmonic note onsets (HPSS) across the full length.
- **`src/lib/score.ts`**: `pulse`, `count`, `sub` (the subliminal window), `handheld`, `ANTIC` and `CINE` eases.
- **`tools/blender/film_orbit.py`**: read-only Cycles renders of the Chaos Riders authoring models on a shadow catcher with golden-hour light. It never saves the source file, and a hash check proves that.
- **`tools/capture_chaos.mjs`**: real gameplay from the deployed demo via a CDP screencast in installed Chrome, cropped to the game frame.
- **`tools/oneline2.py`**: Hope's portrait as one stroke, from tone-mapped iso-contours linked end to end.

### What the passes caught
- **Perf Pulse.**
  - The frozen dialog showed the live growth value (3.2 GB) instead of the future's 11.3 GB; the model now takes an explicit `future` flag.
  - The dashboard push translated the wrong way. The camera is now a target point plus scale in dashboard pixels.
  - The HUD clock collided with the call's own top bar, so it moved to the bottom right.
- **Alma.** CARE was legible from the oblique aerial, which made the data look staged. It is now camouflaged by ordinary flags and resolves only from above.
- **Meridian.** The replay card grew downward and fought the flex centring, and the CPI chart overlapped it. The card is now absolutely placed, with focus points in card space.
- **BrainBuffet.** The white hook picked up the dark vignette as a grey blotch. There was also an 8-frame empty beat between callouts; each callout now whips in as the last one whips out.
- **Chaos Riders.**
  - `orbit()` takes radians and was given degrees: the Lego taxi was seen from under the floor.
  - The slams stacked on top of each other and now have lifetimes.
  - The low-angle orbit run silently produced no frames when chained after another Blender job, and was re-run alone.
  - The Needle and Tank were framed too tight by the size-based fill and were re-rendered at a fill of 0.42.
- **Highlight.**
  - Frames past 900 failed because `hope-profile.jpg` wasn't in the film's `public/`.
  - The photo reveal first showed a grey rectangle (screen blend on a white backdrop); a radial mask turned it into a halo.
  - Stippling (TSP art) couldn't resolve the face at a usable point count, so the portrait uses contours instead.

### Honest gaps
- **Alma.** The vendor is described, not named (it isn't named anywhere public). Note content and the clinician table are illustrative.
- **Chaos Riders.** The film shows the latest Blender authoring models, which the deployed demo doesn't drive. Both are labelled on screen.
- **Voice Memos.** The app's library is blocked by macOS privacy (TCC). The Alma story came from Hope's recorded interviews transcribed in MacWhisper, plus Codex history.
