# Project films

Nine short films for the portfolio. One per homepage project (15 s each) and a
29 s highlight. Each is built in code (Remotion / React) and cut to one of
Hope's own tracks from soundcloud.com/hope-atina. The flips and mashups on
that profile were excluded because they contain other artists' recordings.

v2 rebuilds every film to the OrgX motion reel's craft: one 3D world and one keyed camera
per film, a frame-0 hook, a hero object, every measured hit mapped to a picture event and a
designed sound, and a rewatch layer. What changed, per film, and the critique log:
`DIRECTION_v2.md`.

| Film | Idea (the project's quirk) | Score |
|---|---|---|
| OrgX | Motion isn't progress. Proof is. (source: `orgx/tools/film-kit/showreel`) | site copy is silent; the master's track is unlicensed |
| Alma | The request path stays narrow: consequence lifts off into audited, reversible lanes | Kdila |
| Perf Pulse | The minute before: the picture itself drops frames until Crash Guard warns | Tues |
| OrgX × OpenClaw | The lobster that forgot: amnesia every session until one local bridge | Ravioli |
| BrainBuffet | A buffet, not a search box: one choice per beat, plated into a course | Feeling |
| Neuromosaic | A paper, shattered into an architecture, then code, then a run | Macros |
| Chaos Riders | Read the road: concept art, then potholes on the beat and the golden line | Drvn |
| Meridian | The score is not the reason: 84 slices into its evidence | Montay |
| Highlight | One thread through eight worlds, opening on Hope's Config 2021 line | UBEAT V1 |

**Numbers.** Only numbers the case studies already state appear: 72% (marked self-reported, as on
the site), 999 commits, 2.7 years. Everything else is an illustrative demo and is labelled on
screen that way: the Meridian values, the Neuromosaic run, the OpenClaw inventory.

**Checks run on the masters.** Every film is −14 LUFS (±0.3), and each drop and final hit lands
within one frame of the measured beat (`tools/onsets.py`).

## Rebuild

```bash
npm ci && python3 -m venv .venv && .venv/bin/pip install librosa scipy numpy pillow soundfile
# tracks (gitignored): music/<soundcloud id>_<name>.wav
yt-dlp -x --audio-format wav -o "music/%(id)s_<name>.%(ext)s" https://soundcloud.com/hope-atina/<name>
# 1. the music cut + beat grid, from the window in tools/music-windows.json
.venv/bin/python tools/score_project.py <proj> "$(python3 -c "import json;print(json.dumps(json.load(open('tools/music-windows.json'))['<proj>']))")"
.venv/bin/python tools/master.py public/audio/<proj>_raw.wav public/audio/<proj>.wav
# 2. measured kick/snare/hat → src/data/hits_<proj>.json (read these to key src/data/cues_<proj>.json)
.venv/bin/python tools/hitsheet.py <proj>
# 3. designed sweeteners on the same cue sheet the picture uses → <proj>_mix.wav (what the film plays)
.venv/bin/python tools/sfx.py <proj> && .venv/bin/python tools/master.py public/audio/<proj>_mix_raw.wav public/audio/<proj>_mix.wav
# critique stills: out/st/sheet.jpg
./tools/stills.sh Alma 0,120,414,700
./tools/render_all.sh Alma PerfPulse OpenClaw BrainBuffet Neuromosaic ChaosRiders Meridian
# the highlight plays the rendered films: copy them in, score it, render it
cp out/{Alma,PerfPulse,OpenClaw,BrainBuffet,Neuromosaic,ChaosRiders,Meridian}.mp4 public/clips/
.venv/bin/python tools/score_highlight.py && .venv/bin/python tools/sfx.py highlight && .venv/bin/python tools/master.py public/audio/highlight_mix_raw.wav public/audio/highlight_mix.wav
./tools/render_all.sh Highlight
```

`public/` (gitignored) needs `fonts/` (from hopefolio/public/fonts), `img/` (the case-study images,
`bb-screen.png` cropped from `desktop-study.png`, `orgx-logo.png`, and grain tiles from the showreel's
`tools/make_grain.py`), `sfx/` (whump, riser, tick_metal, freeze, awe, ticks from
`orgx/tools/film-kit/audio/*.mp3`, as 48 kHz wav), `audio/` (the scored cuts plus `voice.wav` =
public/video/portfolio-film/hope-config-voice.wav), and `clips/` (the rendered films plus `OrgX.mp4`,
the site's silent OrgX cut). Web copies live in `hopefolio/public/video/reels/`.

The 3D engine is `src/lib/space.ts` (keyed orbit camera, exact per-plane perspective) and
`src/lib/World.tsx` (planes, boxes, motion blur on listed ranges). In Chaos Riders the golden-line
SVG vanished inside `CameraMotionBlur` (Alma's rail did not; root cause not isolated), so if a
projected SVG line disappears, render the frame without blur first.
