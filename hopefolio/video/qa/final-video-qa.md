# Intelligence Survives the Handoff — final video QA

Date: 2026-07-13

Primary deliverable: `video/output/hope-atina-portfolio-social-final.mp4`

## Critical review

| Dimension | Score | Evidence |
|---|---:|---|
| Recruiter signal | 97/100 | The first five seconds establish authorship through Hope's real Config voice, then state the systems thesis. The cut proves engineering, product judgment, founder range, and multidisciplinary origin instead of listing titles. |
| Narrative and pacing | 96/100 | Nine scenes land on a 123 BPM timing map. A restrained opening gives the spoken line space, then UBEAT V1 releases into proof, architecture, judgment, range, origin, role fit, and a held CTA. |
| Visual craft | 97/100 | The portfolio's material weave becomes cursor, crop edge, architecture trace, quality gate, and memory line. Typography and asymmetric spacing are composed for each aspect ratio rather than center-cropped. |
| Technical delivery | 98/100 | Three H.264/AAC masters render at 30 fps with 48 kHz stereo. The vertical master is 29.4 seconds, measures -14.26 LUFS / -0.94 dBTP, and contains no detected black interval. |

Weighted quality score: **97/100 — PASS** (project threshold: 90).

## Media conformance

| Master | Dimensions | Duration | Size |
|---|---:|---:|---:|
| 9:16 | 1080x1920 | 29.40 s | 15,202,773 bytes |
| 1:1 | 1080x1080 | 29.40 s | 5,779,717 bytes |
| 16:9 | 1920x1080 | 29.40 s | 5,951,395 bytes |

- Video: H.264, 30 fps, 4:2:0
- Audio: AAC, stereo, 48 kHz
- Vertical integrated loudness: -14.26 LUFS
- Vertical true peak: -0.94 dBTP
- Vertical loudness range: 5.50 LU

## Frame and audio inspection

- Nine scene-aware source frames were rendered and inspected before full export. One architecture-heading collision was found and corrected before the final render.
- Thirty encoded frames were extracted at one-second intervals and inspected as a contact sheet for blank frames, crop drift, contrast, legibility, and transition discontinuities.
- Square and landscape frames were re-extracted at 10 and 22 seconds. Both variants preserve the proof and origin compositions without clipping.
- FFmpeg black detection found no black interval of 0.5 seconds or longer.
- Freeze detection found one 2.53-second interval from 24.8 to 27.33 seconds. This is the intentional recruiter-role hold before the final CTA, not a stalled render.
- Loudness analysis confirms the opening voice remains intelligible while the music is ducked, with UBEAT V1 returning after the spoken line.

Evidence:

- `video/qa/v6-keyframes/contact-sheet.png`
- `video/qa/v6-final-contact-sheet.jpg`
- `video/qa/v6-variant-contact-sheet.jpg`
- `video/output/hope-atina-portfolio-cover.png`
- `video/preproduction/beat-grid-v5.json`
- `video/preproduction/timing-map-v5.json`

## Quality-gate result

PASS. The 9:16 master is the default Reels, TikTok, and Shorts asset. The 1:1 and 16:9 masters are purpose-framed derivatives for feed and landscape placements.
