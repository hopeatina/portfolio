"""Contact sheet: python sheet.py out.png cols img1 img2 ... (labels = filenames)."""
import sys
from PIL import Image, ImageDraw
out, cols, *imgs = sys.argv[1:]
cols = int(cols)
tw, th = 640, 360
rows = (len(imgs) + cols - 1) // cols
sheet = Image.new('RGB', (cols * tw, rows * (th + 22)), (30, 30, 30))
d = ImageDraw.Draw(sheet)
for i, p in enumerate(imgs):
    im = Image.open(p).convert('RGB').resize((tw, th))
    x, y = (i % cols) * tw, (i // cols) * (th + 22)
    sheet.paste(im, (x, y + 22))
    d.text((x + 6, y + 4), p.split('/')[-1], fill=(255, 255, 0))
sheet.save(out)
print(out)
