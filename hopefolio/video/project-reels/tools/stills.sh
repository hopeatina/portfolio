#!/usr/bin/env bash
# tools/stills.sh Comp f,f,f  → out/st/<Comp>_*.png + out/st/sheet.jpg (cleans the webpack bundle after)
cd "$(dirname "$0")/.."
rm -rf out/st && node tools/stills_multi.mjs out/st "$1:$2" 2>&1 | grep -i "fail\|error" ; .venv/bin/python tools/contact.py out/st/$1_*.png
rm -rf out/.bundle-stills-*   # only this tool's own bundles (never a running render's)
