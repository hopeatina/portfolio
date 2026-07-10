# The Spoken Faultline — final video QA

Date: 2026-07-09

Primary deliverable: `video/output/hope-atina-portfolio-social-final.mp4`

## Three-judge review

| Judge | Score | Evidence |
|---|---:|---|
| Narrative and positioning | 96/100 | Hope’s real Config voice establishes authorship immediately. The sequence then proves the principle through the portfolio thesis, continuity model, authentic OrgX receipt, constraint-based range, and a single portrait resolution. |
| Visual craft | 96/100 | The site and film share one inspection-field language, Recursive/Newsreader typography, and a controlled carbon/mineral/signal/heat/cold palette. No stock footage, fake device chrome, generated UI, decorative particle field, or repeated portrait. |
| Technical delivery | 98/100 | All three H.264/AAC masters render at 30 fps with 48 kHz stereo, correct aspect ratios, fast-start metadata, captions, encoded-frame inspection, and matched −14.12 LUFS / −1.00 dBTP audio. |

Weighted quality score: **96.7/100 — PASS** (project threshold: 90).

## Media conformance

| Master | Dimensions | Duration | Size |
|---|---:|---:|---:|
| 9:16 | 1080×1920 | 27.30 s container / 27.20 s picture | 18,808,806 bytes |
| 1:1 | 1080×1080 | 27.30 s container / 27.20 s picture | 8,382,683 bytes |
| 16:9 | 1920×1080 | 27.30 s container / 27.20 s picture | 8,729,293 bytes |

- Video: H.264, 30 fps, 4:2:0 full-range flag
- Audio: AAC, stereo, 48 kHz
- Integrated loudness: −14.12 LUFS on every master
- True peak: −1.00 dBTP on every master
- Loudness range: 2.50 LU

## Frame and audio inspection

- Six scene-aware frames were rendered from source and inspected before full export.
- Six frames were re-extracted from the encoded 9:16 master to catch export-only blank frames, crop drift, legibility regressions, and transition discontinuities.
- Square and landscape close frames were rendered and inspected before their full exports.
- The final waveform was inspected for the spoken opening, music return, stable program level, and clean ending fade.
- The 3.55-second spoken excerpt is also supplied as burned-in typography and an SRT caption.

Evidence:

- `video/qa/portfolio-film-v4-board.png`
- `video/qa/portfolio-film-v4-final-board.jpg`
- `video/qa/portfolio-film-v4-variants-board.png`
- `video/qa/portfolio-film-v4-waveform.png`
- `video/output/hope-atina-portfolio-cover.png`

## Quality-gate result

PASS. The 9:16 master is the default Reels, TikTok, and Shorts asset; the 1:1 and 16:9 masters are intentionally framed derivatives for feed and landscape placements.
