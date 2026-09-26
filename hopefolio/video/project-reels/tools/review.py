"""Extract frame strips from a rendered cut for review.
usage: review.py video.mp4 outdir name:start:end:step [...]"""
import subprocess, sys, os
from PIL import Image, ImageDraw
vid, outdir, *specs = sys.argv[1:]
os.makedirs(outdir, exist_ok=True)
for spec in specs:
    name, a, b, step = spec.split(':')
    frames = list(range(int(a), int(b) + 1, int(step)))
    tiles = []
    for fr in frames:
        p = f'{outdir}/{name}_{fr:03d}.png'
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', vid, '-vf', f'select=eq(n\\,{fr}),scale=480:270', '-vframes', '1', p], check=True)
        tiles.append((fr, Image.open(p).convert('RGB')))
    cols = min(6, len(tiles))
    rows = (len(tiles) + cols - 1) // cols
    sheet = Image.new('RGB', (cols * 480, rows * 290), (25, 25, 25))
    d = ImageDraw.Draw(sheet)
    for i, (fr, im) in enumerate(tiles):
        x, y = (i % cols) * 480, (i // cols) * 290
        sheet.paste(im, (x, y + 20))
        d.text((x + 4, y + 4), f'{name} f{fr} ({fr/60:.2f}s)', fill=(255, 220, 0))
    sheet.save(f'{outdir}/sheet_{name}.png')
    print(f'{outdir}/sheet_{name}.png')
