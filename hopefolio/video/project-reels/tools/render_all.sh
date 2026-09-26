#!/usr/bin/env bash
cd "$(dirname "$0")/.."
for c in "$@"; do
  npx remotion render src/index.ts "$c" "out/$c.mp4" --image-format=jpeg --jpeg-quality=95 --color-space=bt709 --codec=h264 --crf=16 --x264-preset=slow --audio-codec=aac --audio-bitrate=320k --concurrency=${CONC:-3} --gl=angle > "out/render_$c.log" 2>&1 && echo "$c OK" || echo "$c FAIL"
done

find "${TMPDIR:-/tmp}" -maxdepth 1 -name "remotion-webpack-bundle-*" -exec rm -rf {} + 2>/dev/null
