#!/usr/bin/env bash
# Web copies for hopefolio: tools/web_encode.sh <Comp> <slug> <poster frame>
# → hopefolio/public/video/reels/<slug>.mp4 (1080p60 H.264, faststart) + <slug>.jpg (the billboard frame)
set -euo pipefail
cd "$(dirname "$0")/.."
comp="$1"; slug="$2"; poster="$3"
dst="../../public/video/reels"
ffmpeg -v error -y -i "out/$comp.mp4" -c:v libx264 -preset slow -crf 24 -maxrate 4M -bufsize 8M -profile:v high -pix_fmt yuv420p \
  -color_primaries bt709 -color_trc bt709 -colorspace bt709 -c:a aac -b:a 160k -movflags +faststart "$dst/$slug.mp4"
ffmpeg -v error -y -ss "$(python3 -c "print($poster/60)")" -i "out/$comp.mp4" -frames:v 1 -q:v 3 "$dst/$slug.jpg"
ls -la "$dst/$slug.mp4" "$dst/$slug.jpg" | awk '{print $5, $9}'
