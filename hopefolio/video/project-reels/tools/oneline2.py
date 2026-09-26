"""One-stroke contour portrait: tone-mapped iso-contours + edges, linked end-to-end into a single path.
python tools/oneline2.py <photo> → src/data/portrait_line.json + out/portrait_preview.png"""
import sys, json, numpy as np
from PIL import Image, ImageOps, ImageFilter, ImageDraw
from skimage import measure, exposure, feature
S = 900
im = Image.open(sys.argv[1]).convert('L'); im = im.resize((S, int(S * im.height / im.width)))
a = np.asarray(im, dtype=float) / 255
bg = a > 0.9
eq = exposure.equalize_adapthist(a, clip_limit=0.02, kernel_size=64)  # local contrast: features inside dark skin
sm = np.asarray(Image.fromarray((eq * 255).astype('uint8')).filter(ImageFilter.GaussianBlur(2.2)), dtype=float) / 255
paths = []
for lv in [0.26, 0.46]:
    for c in measure.find_contours(sm, lv):
        if len(c) < 70: continue
        c = c[:, ::-1]
        if c[:, 1].mean() > 0.66 * a.shape[0] and len(c) < 400: continue  # the shirt stays quiet
        if bg[np.clip(c[:, 1].astype(int), 0, S - 1), np.clip(c[:, 0].astype(int), 0, S - 1)].mean() > 0.5 and lv < 0.6: continue
        paths.append(c[::3])
# the outline against the backdrop
for c in measure.find_contours(np.asarray(Image.fromarray((bg * 255).astype('uint8')).filter(ImageFilter.GaussianBlur(3)), dtype=float) / 255, 0.5):
    if len(c) > 200: paths.append(c[:, ::-1][::3])
paths.sort(key=lambda c: -len(c))
paths = paths[:70]
# link into one stroke: greedy nearest endpoint, reversing as needed
cur = min(range(len(paths)), key=lambda i: paths[i][:, 1].min())
out = [paths[cur]]; left = set(range(len(paths))) - {cur}
while left:
    p = out[-1][-1]
    best = None
    for i in left:
        for rev in (False, True):
            q = paths[i][-1] if rev else paths[i][0]
            d = (q[0] - p[0]) ** 2 + (q[1] - p[1]) ** 2
            if best is None or d < best[0]: best = (d, i, rev)
    _, i, rev = best
    out.append(paths[i][::-1] if rev else paths[i]); left.remove(i)
P = np.vstack(out)
H = a.shape[0]
json.dump({'w': S, 'h': H, 'segs': [[[round(float(x), 1), round(float(y), 1)] for x, y in seg[::2]] for seg in out]}, open('src/data/portrait_line.json', 'w'))
prev = Image.new('RGB', (S, H), (10, 10, 8)); ImageDraw.Draw(prev).line([tuple(p) for p in P], fill=(183, 243, 74), width=2)
prev.save('out/portrait_preview.png'); print('segments', len(out), 'points', len(P))
