# Project films

Nine short films for the portfolio. One per homepage project (15 s each) and a
29 s highlight. Each is built in code (Remotion / React) and cut to one of
Hope's own tracks from soundcloud.com/hope-atina. The flips and mashups on
that profile were excluded because they contain other artists' recordings.

| Film | Idea (the project's quirk) | Score |
|---|---|---|
| OrgX | Motion isn't progress. Proof is. (source: `orgx/tools/film-kit/showreel`) | site copy is silent; the master's track is unlicensed |
| Alma | The request path stays narrow: consequence lifts off into audited, reversible lanes | Kdila |
| Perf Pulse | The minute before: the picture itself drops frames until Crash Guard warns | Tues |
| OrgX × OpenClaw | The lobster that forgot: amnesia every session until one local bridge | Bop |
| BrainBuffet | A buffet, not a search box: one choice per beat, plated into a course | Feeling |
| Neuromosaic | A paper, shattered into an architecture, then code, then a run | Synthyrecover |
| Chaos Riders | Read the road: concept art, then potholes on the beat and the golden line | Drvn |
| Meridian | The score is not the reason: 84 cracks open into its evidence | Montay |
| Highlight | One thread through eight worlds, opening on Hope's Config 2021 line | UBEAT V1 |

**Numbers.** Only numbers the case studies already state appear: 72% (marked self-reported, as on
the site), 999 commits, 2.7 years. Everything else is an illustrative demo and is labelled on
screen that way: the Meridian values, the Neuromosaic run, the OpenClaw inventory.

**Checks run on the masters.** Every film is −14 LUFS (±0.3), and each drop and final hit lands
within one frame of the measured beat (`tools/onsets.py`).

## Rebuild

```bash
# from a Remotion 4.0.529 workspace (same toolchain as orgx film-kit/showreel)
yt-dlp -x --audio-format wav -o "music/%(id)s_<name>.%(ext)s" https://soundcloud.com/hope-atina/<name>
python tools/score_project.py <proj> '<window json from tools/music-windows.json>'   # → public/audio + src/data/grid_<proj>.json
python tools/master.py public/audio/<proj>_raw.wav public/audio/<proj>.wav
./tools/render_all.sh Alma PerfPulse OpenClaw BrainBuffet Neuromosaic ChaosRiders Meridian
cp out/*.mp4 public/clips/ && ./tools/render_all.sh Highlight
```

`public/` needs `fonts/` (from hopefolio/public/fonts), `img/` (the case-study images plus grain tiles),
`audio/` (the scored cuts plus `voice.wav` from public/video/portfolio-film), and `clips/` (the rendered
films, for the highlight). Web copies live in `hopefolio/public/video/reels/`.
