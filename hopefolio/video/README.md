# Portfolio social film

`The Spoken Faultline` is a 27.2-second Remotion film built from Hope Atina’s redesigned portfolio, genuine OrgX product evidence, Hope’s Config 2021 voice, and his SoundCloud track `tiktok_pipes`.

The film follows one causal arc: point of view → portfolio thesis → continuity model → proof → range → person. It avoids generated UI, fake browser chrome, vanity metrics, stock footage, and repeated portraits.

## Commands

- `npm run video:studio` — open all Remotion compositions
- `npm run video:poster` — render the 9:16 social cover
- `npm run video:render` — render the unnormalized 9:16 master
- `npm run video:final` — render and loudness-normalize the 9:16 share master
- `npm run video:variants` — render and normalize the 1:1 and 16:9 derived masters

## Share masters

- `video/output/hope-atina-portfolio-social-final.mp4` — 1080×1920, 9:16
- `video/output/hope-atina-portfolio-social-square-final.mp4` — 1080×1080, 1:1
- `video/output/hope-atina-portfolio-social-landscape-final.mp4` — 1920×1080, 16:9
- `video/output/hope-atina-portfolio-cover.png` — 1080×1920 cover
- `video/preproduction/captions-v4.srt` — accessible caption file

All three masters measure −14.12 LUFS integrated and −1.00 dBTP, with AAC stereo at 48 kHz. Pre-production evidence lives in `video/preproduction/`; frame, waveform, variant, and media-conformance evidence lives in `video/qa/`.
