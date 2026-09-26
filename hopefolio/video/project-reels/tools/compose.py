"""Compose a film score from one of Hope's own tracks, on the film's beat grid.

The v3 scores were one contiguous 15 s window. v4 edits the track like a film composer would:
sections are placed on output beats, and each can be low-passed ("inside the machine"),
reversed (a swell into a hit), tape-stopped (the freeze), stuttered (a build) or dropped out
(silence before the turn). Output positions are exact multiples of the measured beat period,
so the picture can key to the same grid.

  .venv/bin/python tools/compose.py <proj>        (spec in tools/compositions.json)

Spec: {file, bpm, anchor (a downbeat in the song, s), beats (film length in output beats),
       ops: [{at, src, beats, lp:[hz0,hz1], hp:[hz0,hz1], gain, rev, stop, stutter, fin, fout}],
       button (output beat of the final hit), markers {name: output beat}}
Writes public/audio/<proj>_raw.wav and src/data/grid_<proj>.json.
"""
import json, sys, wave
import numpy as np, librosa
from scipy import signal

SR, FPS = 48000, 60
proj = sys.argv[1]
spec = json.load(open('tools/compositions.json'))[proj]
y, _ = librosa.load(spec['file'], sr=SR, mono=False)
if y.ndim == 1:
    y = np.vstack([y, y])

# measure the song's beat period and snap the anchor to the grid
mono = librosa.to_mono(librosa.resample(y, orig_sr=SR, target_sr=22050))
oenv = librosa.onset.onset_strength(y=mono, sr=22050, hop_length=256)
_, bf = librosa.beat.beat_track(onset_envelope=oenv, sr=22050, hop_length=256, start_bpm=spec['bpm'])
bt = librosa.frames_to_time(bf, sr=22050, hop_length=256)
per = np.median(np.diff(bt))
k = np.round((bt - bt[0]) / per)
per, off = np.linalg.lstsq(np.vstack([k, np.ones_like(k)]).T, bt, rcond=None)[0]
anchor = off + round((spec['anchor'] - off) / per) * per
beatN = per * SR
N = int(round(spec['beats'] * beatN)) + int(SR * 0.05)
out = np.zeros((2, N))


def src_seg(src, beats):
    a = int(round(anchor * SR + src * beatN)); b = a + int(round(beats * beatN))
    seg = np.zeros((2, b - a)); lo, hi = max(a, 0), min(b, y.shape[1])
    if hi > lo:
        seg[:, lo - a:hi - a] = y[:, lo:hi]
    return seg


def sweep(x, kind, f0, f1, blk=512):
    """Time-varying Butterworth, block-wise with carried state (log-frequency sweep)."""
    n = x.shape[1]; res = np.zeros_like(x); zi = None
    for i in range(0, n, blk):
        t = i / max(1, n - 1); fc = np.exp(np.log(f0) + (np.log(f1) - np.log(f0)) * t)
        sos = signal.butter(4, min(fc, SR / 2 * 0.95) / (SR / 2), btype=kind, output='sos')
        if zi is None:
            zi = np.zeros((2, sos.shape[0], 2))
        for c in range(2):
            res[c, i:i + blk], zi[c] = signal.sosfilt(sos, x[c, i:i + blk], zi=zi[c])
    return res


def tapestop(x, frac):
    """Last `frac` of the segment slows to a halt (speed 1 → 0, quadratic)."""
    n = x.shape[1]; s0 = int(n * (1 - frac)); m = n - s0
    t = np.arange(m) / m; speed = (1 - t) ** 2
    pos = s0 + np.cumsum(speed)
    tail = np.vstack([np.interp(pos, np.arange(n), x[c]) for c in range(2)]) * (1 - t) ** 0.5
    return np.hstack([x[:, :s0], tail])


def room(sec, seed):
    n = int(sec * SR); t = np.arange(n) / SR; res = []
    for c in range(2):
        r = np.random.default_rng(seed + c); v = r.standard_normal(n) * np.exp(-t / (sec / 6.2))
        v = signal.sosfilt(signal.butter(2, 5200 / (SR / 2), output='sos'), v); res.append(v / np.sqrt((v ** 2).sum()))
    return res


for op in spec['ops']:
    seg = src_seg(op['src'], op['beats'])
    if op.get('stutter'):  # repeat the first 1/n beat to fill the segment, getting denser
        sl = int(beatN / op['stutter']); pat = seg[:, :sl]
        reps = int(np.ceil(seg.shape[1] / sl)); seg = np.tile(pat, reps)[:, :seg.shape[1]]
        seg *= np.linspace(0.55, 1, seg.shape[1])
    if op.get('rev'):
        seg = seg[:, ::-1] * np.linspace(0, 1, seg.shape[1]) ** 2.2
    if 'lp' in op:
        seg = sweep(seg, 'low', *op['lp'])
    if 'hp' in op:
        seg = sweep(seg, 'high', *op['hp'])
    if op.get('stop'):
        seg = tapestop(seg, op['stop'])
    fi = int(op.get('fin', 0.004) * SR); fo = int(op.get('fout', 0.01) * SR)
    seg[:, :fi] *= np.linspace(0, 1, fi); seg[:, seg.shape[1] - fo:] *= np.linspace(1, 0, fo)
    seg *= 10 ** (op.get('gain', 0) / 20)
    a = int(round(op['at'] * beatN)); b = min(N, a + seg.shape[1])
    out[:, a:b] += seg[:, :b - a]

# button: the hit at the final beat blooms into a hall tail, then the picture's end card rides it
btn = spec['button']
if spec.get('button_src') is not None:
    hit = src_seg(spec['button_src'], 0.45)
    H = room(3.4, 31); tail = np.vstack([signal.fftconvolve(np.pad(hit[c], (0, int(3.4 * SR))), H[c]) for c in range(2)])
    i0 = int(round(btn * beatN)); n = min(tail.shape[1], N - i0)
    out[:, i0:i0 + n] += tail[:, :n] * 10 ** (-5 / 20)
fade = np.ones(N); kf = int(N - 0.6 * SR); fade[kf:] = np.linspace(1, 0, N - kf) ** 1.5; out *= fade
out = out / np.max(np.abs(out)) * 10 ** (-1 / 20)
pcm = (np.clip(out.T, -1, 1) * 32767).astype('<i2')
with wave.open(f'public/audio/{proj}_raw.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())

bF = per * FPS
g = dict(track=spec['track'], bpm=round(60 / per, 3), beatF=round(bF, 3),
         beats=[round(i * bF, 2) for i in range(int(spec['beats']) + 1)],
         downbeats=[round(i * bF, 2) for i in range(0, int(spec['beats']) + 1, 4)],
         drop=round(spec['markers'].get('drop', 0) * bF, 2), button=round(btn * bF, 2),
         markers={k: round(v * bF, 2) for k, v in spec['markers'].items()},
         anchor_s=round(anchor, 3), frames=int(round(spec['beats'] * bF)))
json.dump(g, open(f'src/data/grid_{proj}.json', 'w'), indent=1)
print(proj, spec['track'], 'bpm', g['bpm'], 'beatF', g['beatF'], 'frames', g['frames'], g['markers'])
