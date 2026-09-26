# Project films v3: eight films, eight worlds

Hope's v2 review: every film sat in the same black void with the same camera. Nothing in the
edit made clear what the viewer thinks is happening versus what is actually happening, and none
had an emotional turn, a plot turn, or a reason to exist. v3 fixes that film by film.

## What changes in every film

1. **Its own world, in its own brand.** No void. Each film is lit, coloured and typeset from the
   project's real identity: palette, logo, product surfaces, cover art.
2. **Surface vs reality.** Each film shows what the user experiences and what the system is
   actually doing, and the twist is the moment we see both. That is the product's reason to
   exist, dramatized.
3. **Editing, not one camera.** Several shots per film, each with its own lens and behaviour
   (locked, handheld, macro, drone, top-down, tele compression). Cuts land on the beat, and
   transitions carry meaning: match cuts, whip pans, push-throughs, rack focus, speed ramps. At
   least one callback per film.
4. **One idea per shot**, readable in under a second with the sound off. The UI is legible at
   1080p, and fewer elements are on screen at once.
5. **An emotional beat and a plot turn**, written below before any code.

## 1. Alma: "Saved."

- **Brand.** Alma green (#0b2a20 → #14402f), the white Alma wordmark, a shield-check motif, and
  mono labels in the "HIPAA · PRODUCTION" style.
- **Reason to exist.** A therapist should never feel the system. The request path stays narrow,
  and the failure mode stays small.
- **Emotional beat.** Ten minutes between clients. It's 10:59, the note is still saving, and
  someone knocks at the door.
- **Twist.** The first half is the world where everything rides on Save: the spinner, the
  consequences piling onto the request, the clock creeping. Smash to black: *In Alma, Save only
  saves.* Click, and it's saved instantly. The camera drops through the desk into the green
  underworld, where the same five jobs run as durable, audited, retryable lanes. The therapist
  never saw any of it.
- **Camera.**
  - Office (surface): a warm dusk plate, 50–85 mm, locked, shallow depth of field, still and
    human.
  - Underworld (reality): Alma green, 24 mm, fast mechanical tracking, fog.
  - The drop is a vertical crane through the desk.
- **Callbacks.** The mug's steam freezes while it's saving and flows again once saved. The
  shield check on the audit gates is the same mark as Alma's logo, which lands on the end card.

| Frames | Music | Shot | Lens / camera | Picture |
|---|---|---|---|---|
| 0–48 | intro | S1 macro | 85 mm, rack focus to the button | Cursor on Save. Corner: 10:52 · next client 11:00. Click on the kick at 14. |
| 48–312 | build | S2 office | 50 mm locked; each kick cuts to an insert | The laptop on the desk in the warm office. Each kick appends a consequence to the request on screen (+ render document, + reminders, + vendor audit, + backfill, + eligibility). The spinner slows, the clock climbs to 10:59, the steam stops. |
| 312–380 | snare 346 | S3 the door | 50 mm, handheld tremor | A knock (snare). Light under the door. Still "Saving…". |
| 380–414 | pre-drop | S4 black | none | Smash to black. Type: *In Alma, Save only saves.* |
| 414 | DROP | S5 office | 50 mm | Click → **Saved ✓**, instantly. The steam flows again. |
| 420–450 | | S6 crane | vertical crane down through the desk | Into the underworld. |
| 450–600 | stamps | S7 underworld | 24 mm tracking | The same five jobs as lanes. Shield gates stamp ✓ on the snares, one retries and passes. |
| 600–690 | flag | S8 switch | 35 mm, close | A physical switch: reassessments_v2 goes off (rollback path), then on again. |
| 692–745 | crane | S9 back up | crane up through the desk | The door is open, warm light spills in, 11:00. The laptop lid closes. |
| 745–900 | button | end | | Alma wordmark on green, then 72% · 999 · 2.7 yrs. |

## 2. Perf Pulse: "The minute before."

- **Brand.** Perf Pulse red (#b91c1c → #dc2626) with the pulse-line motif, and the product's dark
  UI with its blue app mark. Rust.
- **Reason to exist.** Activity Monitor can show a problem, but it doesn't watch for the moment
  before the machine goes down. A warning earns trust when it carries you to a clear choice.
- **Emotional beat.** You're mid-call, presenting, and the machine chokes: the other face freezes
  mid-word (Meeting Mode is a real Perf Pulse feature).
- **Twist.** It opens on the freeze, then rewinds nine minutes. This time Perf Pulse is watching:
  the warning arrives first, Stop safely, and at 14:39:07 (the same second) the call is still
  smooth.
- **Camera.**
  - Night desk (surface): handheld, anxious, macro inserts on numbers.
  - Inside the machine (reality): a red-lit process city under a rising tide, drone passes; the
    picture drops frames.
  - After the fix: locked and calm.
- **Callbacks.** The brand's pulse line is the EKG: it flatlines on the freeze and beats steadily
  at the end. The beachball from the hook sets like a sun.

| Frames | Music | Shot | Picture |
|---|---|---|---|
| 0–40 | | S1 macro, handheld | A call tile frozen and pixelated, the beachball over it, the red pulse line flat. 14:39:07 · NOT RESPONDING. |
| 40–62 | | S2 rewind | Tape rewind (reversed frames, scanlines) to 14:30. |
| 62–250 | hats | S3 night desk | The laptop in a dark room lit by the screen and a red LED strip. The call runs fine; a small memory meter climbs. Hat cuts to macro inserts of the leaker growing. |
| 250–400 | | S4 push-through | Through the screen into the red process city. The tide rises and the picture starts dropping frames. |
| 402–446 | silence | S5 | Freeze. At 419 the real Crash Guard notification slides in (macro). |
| 446 | DROP | S6 | Click → the real dashboard. "Stop safely" lands on the snare at 599, and the tide drains from red to calm. |
| 640–700 | | S7 pull-out | Back out through the screen to the desk. The call is smooth, 14:39:07 · RESPONSIVE, and the pulse line beats. The install line types. |
| 700– | button | end | The Perf Pulse red cover lockup. |

## 3. OrgX × OpenClaw: "The lobster that forgot."

- **Brand.** OpenClaw's red pixel lobster and dark red-accented UI; OrgX's lime and teal mark;
  the plugin's green cover. The real lockup.
- **Reason to exist.** A capable local agent can still wake up without the company in its head.
  Bring the organization into the host; OpenClaw stays OpenClaw.
- **Emotional beat.** Groundhog Day comedy, then pride.
- **Twist.** Mid-task, the Wi-Fi dies, and nothing is lost.
- **Camera: repetition is the joke.**
  - Days 1–4 are the same locked-off wide shot (a colourful pixel island, a sunrise each
    morning), hard-cut on every downbeat, each day faster.
  - On the drop the camera moves for the first time: a pan across the water reveals OrgX's island
    as the bridge builds.
  - Day 5 returns to the same locked frame, and this time the lobster knows.
  - The storm is handheld and glitchy.
  - The final pull-back lands on the real lockup.
- **Callback.** The identical Day 1 framing; the speech bubble shrinking each day, then Day 5's
  confident one.

## 4. BrainBuffet: "A buffet, not a search box."

- **Brand.** Lavender and purple with the horizon glow from the product's gradient, the smiling
  brain logo, rounded friendly type.
- **Reason to exist.** Getting an answer and learning a subject ask different things of a
  product. Each answer should make the next choice more useful.
- **Emotional beat.** Curiosity, then appetite, then the satisfaction of a plan.
- **Twist.** The answer at the start was a snack on a saucer. Pull back: a whole buffet, hosted
  by the smiling brain.
- **Camera: food-show and tabletop-commercial language.**
  - A snap zoom out.
  - Whip pans between dishes on the beat.
  - Overhead flat-lays of the tray filling.
  - The tray stands up into the course.
  - A push into the real study surface.
- **Callbacks.** The brain logo's smile; the snack answer returns as chapter 1.

## 5. Neuromosaic: "A paper, shattered into an architecture."

- **Brand.** The iridescent violet/blue mosaic sphere, the lowercase neuromosaic wordmark, glass
  tiles.
- **Reason to exist.** Research knowledge loses its structure on the way into code. A useful
  research surface lets you follow a result back to its choices.
- **Emotional beat.** The fog of a dense paper at night, then clarity and awe.
- **Twist.** The shards orbiting in the build assemble into the Neuromosaic sphere itself (the
  brand mark), then compress into one vector, then code, then a run that threads back to the
  exact tiles.
- **Camera.**
  - A research desk under a lamp: raking light and a rack-focus macro on the paper.
  - Every snare hard-cuts to a new macro angle as a phrase breaks free.
  - The only orbit in the film is around the forming sphere.
  - Then a fast dolly along the vector.
- **Callback.** The page keeps the holes; the sphere reappears on the end card.

## 6. Chaos Riders: "Read the road."

- **Brand.** The concept art's golden hour, Yaoundé market colour, dust, and the prototype's HUD
  (timer, speed).
- **Reason to exist.** The place shapes the driving, down to the next small correction. A world
  feels real when a small action changes what happens next.
- **Emotional beat.** Nerve: potholes, a crowd, then holding the line.
- **Twist.** The golden line painted in the concept art is the gameplay line. Target and build
  agree.
- **Camera: car-chase grammar.**
  - Match cut from the concept-art taxi to the 3D taxi in the same framing.
  - Low bumper cam, side tracking, a Dutch angle on impacts, and snare cuts between angles.
  - A slow-motion speed ramp into the drop, then a snap to full speed: FLOW.
  - A drone top-down that shows the line threading the field.
  - A HUD overlay that becomes the real prototype capture.
- **Environment.** A gold sky, dust haze, sun glare, and colourful stalls and umbrellas, in the
  concept art's palette. Never black.

## 7. Meridian: "The score is not the reason."

- **Brand.** Meridian navy and blue (#1e3a5f → #1e40af) with gold, the serif line "The Operating
  System for Conviction.", and the real signal preview.
- **Reason to exist.** A confidence score can hide the most important part of a decision. A
  convincing interface must leave room for an unconvincing hypothesis.
- **Emotional beat.** FOMO: the cursor itching toward BUY, the number getting bigger. Then
  discipline.
- **Twist.** The ingredients add up to 92, and the hidden −8 concern is what made it 84: the part
  the score was hiding. The honest end is a stamp: live execution disabled.
- **Camera.**
  - Pressure: 85–135 mm tele push-ins and a Dutch tilt as the build tightens; BUY and cursor
    inserts on the snares.
  - The split: the numeral slices apart.
  - Engineering calm: a clean top-down exploded diagram and evidence inserts.
- **Environment.** A navy trading desk at night with city bokeh and monitor glow, and gold for
  conviction.

## 8. Highlight: "The thread"

The highlight is made from the films themselves, full-bleed in their own worlds. Each cut is a
match on a shape the next film shares, with a lime thread drawing the shape across the cut:

| Cut | Matched on |
|---|---|
| OrgX → Alma | the ✓ becomes the shield check |
| Alma → Perf Pulse | the green rail becomes the red pulse line |
| Perf Pulse → OpenClaw | the beachball becomes the pixel sun |
| OpenClaw → BrainBuffet | the bridge plank becomes the tray |
| BrainBuffet → Neuromosaic | the plate becomes the sphere |
| Neuromosaic → Chaos Riders | the vector becomes the golden line |
| Chaos Riders → Meridian | the speedometer's number becomes 84 |
| Meridian → the name | the slices reassemble as the name |

It opens on Hope's Config 2021 line and closes on the name at the final hit.

## What the passes caught (v3)

- **Engine: the world wasn't a stacking context.** Planes with negative z-index (walls, floors,
  desks) rendered behind the page background. v2 hid this because its world wrapper had a CSS
  filter. Every world layer now sets `isolation: isolate`.
- **Engine: depth of field on huge planes.** A CSS blur on a 12,000 px plane exceeds Chrome's
  texture limit and silently drops the whole plane. Large planes skip DOF.
- **Engine: DOF blurs whole planes.** Screens and pages the camera reads are marked `noDof`.
  Neuromosaic's page fakes a real lens instead: a sharp copy plus a blurred copy masked away
  around the phrase being read.
- **Engine: focus.** DOF now auto-focuses on each shot's subject (its keyed distance).
- **Engine: guard.** `keyedCamera` throws on non-increasing keys. It caught two bad edits
  before they rendered.
- **Engine: lenses.** Lens is a key channel in mm (18 mm is roughly the old fixed lens), so
  shots range from 24 mm drone passes to 135 mm tele inserts.
- **Alma.** The window and door sat outside the frame, the door shot was blocked by the desk
  (the camera now sits behind it), the knock needed feet in the light, and the macro inserts
  were out of focus.
- **Perf Pulse.** The hook needed the whole frozen call, not only the beachball. The screen
  inserts rendered soft until screens were exempt from DOF.
- **OpenClaw.** The drop pan cut OrgX's island in half, the sun sat behind the palm, and the
  item tags piled up on the island.
- **BrainBuffet.** Dish shots cropped their placards (re-angled to a three-quarter food-show
  shot), and frame 0 was too tight.
- **Neuromosaic.** Macro shots aimed at the middle of the line, not the highlighted word. Tile
  text was mirrored (a flipped cross product). The brand mark hid behind the tiles; it now takes
  over the frame as the sphere completes.
- **Chaos Riders.** Front plates were mirrored, the wheel close-up was unreadable (replaced by a
  low rear impact angle), and the golden line hid directly under the car until the FLOW camera
  rose above the roof.
- **Meridian.** Frame 0 was too tight for the signal card, and the sum line was cropped and then
  occluded.
- **Not possible this pass.** Generated environment plates: the fal account returns Forbidden
  for every model. Every set is built in code.
