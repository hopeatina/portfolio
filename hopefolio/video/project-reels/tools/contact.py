"""Contact sheet of rendered stills: python tools/contact.py out/st/Alma_*.png → out/st/sheet.jpg"""
import sys
from PIL import Image, ImageDraw
fs = sorted(sys.argv[1:]); W, H = 480, 270
sh = Image.new('RGB', (W * 4, H * ((len(fs) + 3) // 4)))
for i, f in enumerate(fs):
    im = Image.open(f).convert('RGB').resize((W, H)); ImageDraw.Draw(im).text((6, 4), f.split('_')[-1][:-4], fill=(255, 255, 0))
    sh.paste(im, ((i % 4) * W, (i // 4) * H))
out = fs[0].rsplit('/', 1)[0] + '/sheet.jpg'; sh.save(out, quality=85); print(out)
