"""Designed sweeteners for a project film, keyed to the SAME cue sheet the picture
uses (src/data/cues_<proj>.json), so a sound can never drift off its event.

cues_<proj>.json: {"cue": {name: frame | [frames]}, "sfx": [[cue|frame, kind, dB, pan, {params}], ...]}
A cue that is a list fires the sound on every frame ("spread" pans across them).
Bed = public/audio/<proj>.wav (the mastered music cut). All sweeteners share one
room, the bed ducks under hits marked "duck". Output public/audio/<proj>_mix_raw.wav
(then tools/master.py → <proj>_mix.wav).
Kit (public/sfx, from orgx/tools/film-kit/audio): whump riser tick_metal freeze awe ticks.
Kinds: whump whump_lo thup stamp drop_sub metal tick key bell chord freeze riser
       air_in air_out pass glint fan glitch beep rewind
"""
import sys, json, wave
import numpy as np
from scipy import signal
import librosa

SR = 48000
FPS = 60
proj = sys.argv[1]
KIT = 'public/sfx'
rng = np.random.default_rng(7)


def read(path):
    y, _ = librosa.load(path, sr=SR, mono=False)
    return y if y.ndim == 2 else np.vstack([y, y])


def db(v):
    return 10 ** (v / 20)


def lp(x, fc, o=2):
    return signal.sosfilt(signal.butter(o, fc / (SR / 2), output='sos'), x, axis=-1)


def hp(x, fc, o=2):
    return signal.sosfilt(signal.butter(o, fc / (SR / 2), 'high', output='sos'), x, axis=-1)


def fade(x, fi=0.002, fo=0.02):
    n = x.shape[-1]
    e = np.ones(n)
    a, b = int(fi * SR), int(fo * SR)
    if a: e[:a] = np.linspace(0, 1, a)
    if b: e[-b:] = np.minimum(e[-b:], np.linspace(1, 0, b))
    return x * e


def pitch(x, st):
    r = 2 ** (st / 12)
    return signal.resample(x, max(8, int(x.shape[-1] / r)), axis=-1)


def pink(n, seed):
    w = np.random.default_rng(seed).standard_normal(n)
    return signal.lfilter([0.049922035, -0.095993537, 0.050612699, -0.004408786], [1, -2.494956002, 2.017265875, -0.5221894], w) * 4


def stereo(x):
    return x if x.ndim == 2 else np.vstack([x, x])


def room(sec=1.6, seed=21, fc=7000):
    n = int(sec * SR); t = np.arange(n) / SR; out = []
    for c in range(2):
        x = np.random.default_rng(seed + c).standard_normal(n) * np.exp(-t / (sec / 6.2))
        x = np.concatenate([np.zeros(int(0.012 * SR)), lp(x, fc)]); out.append(x / np.sqrt((x ** 2).sum()))
    return out


def conv(bus, ir):
    return np.vstack([signal.fftconvolve(bus[c], ir[c])[: bus.shape[1]] for c in range(2)])


def whoosh(d, f0, f1, p0, p1, seed, shape='swell', q=0.8):
    n = int(d * SR); x = pink(n, seed); out = np.zeros(n); zi = np.zeros(2)
    for i in range(0, n, 256):
        fc = f0 * (f1 / f0) ** (i / max(1, n - 1)); w0 = 2 * np.pi * fc / SR; al = np.sin(w0) / (2 * q)
        b = np.array([al, 0, -al]); a = np.array([1 + al, -2 * np.cos(w0), 1 - al])
        seg, zi = signal.lfilter(b / a[0], a / a[0], x[i:i + 256], zi=zi); out[i:i + 256] = seg
    t = np.arange(n) / n
    e = np.sin(np.pi * t ** 0.75) ** 2 if shape == 'swell' else (t ** 2.4 if shape == 'rise' else np.exp(-t * 5) * np.minimum(1, t * 40))
    y = out * e; p = p0 + (p1 - p0) * t; a = (p + 1) * np.pi / 4
    return np.vstack([y * np.cos(a) * 1.414, y * np.sin(a) * 1.414])


def bell(freq, dur=1.2):
    n = int(dur * SR); t = np.arange(n) / SR; out = []
    for det in [-1.5, 1.5]:
        f = freq * 2 ** (det / 1200); idx = 2.6 * np.exp(-t / 0.045) + 0.25
        car = np.sin(2 * np.pi * f * t + idx * np.sin(2 * np.pi * f * 3.5 * t))
        env = (1 - np.exp(-t / 0.0015)) * np.exp(-t / 0.42)
        out.append(car * env + 0.25 * np.sin(2 * np.pi * f * 2.76 * t) * np.exp(-t / 0.18) * env)
    return fade(np.vstack(out) * 0.4, 0.0005, 0.2)


def ticks_from(src, rel):
    e = signal.sosfilt(signal.butter(2, 80 / (SR / 2), output='sos'), np.abs(hp(src, 2000)).mean(0))
    p, _ = signal.find_peaks(e, distance=int(0.1 * SR), height=e.max() * rel)
    out = []
    for q in p:
        x = fade(src[:, max(0, q - int(0.004 * SR)):q + int(0.09 * SR)], 0.001, 0.05)
        out.append(x / (np.abs(x).max() + 1e-9) * 0.5)
    return out


K = {k: read(f'{KIT}/{k}.wav') for k in ['whump', 'riser', 'tick_metal', 'freeze', 'awe', 'ticks']}
METAL = ticks_from(K['tick_metal'], 0.04)
CLOCK = ticks_from(K['ticks'], 0.08)
bed = read(f'public/audio/{proj}.wav')
N = bed.shape[1]
# the bed's key, so tonal sweeteners sit in it (awe.wav is C major)
chroma = librosa.feature.chroma_cqt(y=bed.mean(0)[: SR * 12], sr=SR).mean(1)
KEY = int(np.argmax(chroma))
KEY_ST = KEY - 12 if KEY > 6 else KEY
ROOT = 261.63 * 2 ** (KEY / 12)
PENTA = [ROOT * 2 ** (s / 12) for s in [0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24]]


def make(kind, prm, i):
    st = prm.get('st', 0)
    if kind == 'whump': return fade(K['whump'][:, : int(prm.get('len', 1.2) * SR)], 0.0005, 0.5)
    if kind == 'whump_lo': return fade(lp(K['whump'][:, : int(prm.get('len', 0.5) * SR)], prm.get('fc', 380)), 0.0005, 0.2)
    if kind == 'thup': return fade(lp(hp(K['whump'][:, : int(0.14 * SR)], 60), 700), 0.0005, 0.08)
    if kind == 'drop_sub':
        t = np.arange(int(1.1 * SR)) / SR; f = 38 + 60 * np.exp(-t / 0.05)
        return stereo(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.35) * 0.9)
    if kind == 'stamp':
        n = int(0.09 * SR); nz = hp(pink(n, 3 + i), 700) * np.exp(-np.arange(n) / (0.015 * SR))
        s = stereo(nz / (np.abs(nz).max() + 1e-9) * 0.6); w = fade(lp(K['whump'][:, : int(0.35 * SR)], 300), 0.0005, 0.15)
        out = w.copy(); out[:, :n] += s; return out
    if kind == 'metal': return pitch(METAL[(prm.get('n', i)) % len(METAL)], st)
    if kind == 'tick': return pitch(CLOCK[(prm.get('n', i * 7)) % len(CLOCK)], st)
    if kind == 'key': return fade(lp(pitch(CLOCK[(i * 7) % len(CLOCK)], -3 + rng.random() * 2), 6500), 0.0005, 0.03)
    if kind == 'bell':
        f = prm['hz'] if 'hz' in prm else PENTA[int(prm.get('deg', i)) % len(PENTA)] * 2
        return bell(f, prm.get('len', 1.3))
    if kind == 'chord': return fade(pitch(K['awe'], KEY_ST + st)[:, : int(prm.get('len', 3.0) * SR)], prm.get('fi', 0.04), 1.0)
    if kind == 'freeze':
        a, b = prm.get('from', 1.1), prm.get('to', 2.45); return fade(K['freeze'][:, int(a * SR):int(b * SR)], 0.3, 0.01)
    if kind == 'riser': return fade(K['riser'][:, : int(prm.get('len', 2.0) * SR)], 0.2, 0.01)
    if kind == 'air_in': return whoosh(prm.get('len', 0.3), prm.get('f0', 600), prm.get('f1', 6000), -0.3, 0.3, 11 + i, 'rise', 0.9)
    if kind == 'air_out': return whoosh(prm.get('len', 0.4), prm.get('f0', 3000), prm.get('f1', 400), 0.3, -0.3, 23 + i, 'swell', 0.8)
    if kind == 'pass': return whoosh(prm.get('len', 0.5), prm.get('f0', 400), prm.get('f1', 2600), prm.get('p0', -0.6), prm.get('p1', 0.6), 37 + i, 'swell', 0.8)
    if kind == 'glint': return whoosh(prm.get('len', 0.35), 5000, 12500, -0.4, 0.5, 51 + i, 'swell', 1.2)
    if kind == 'fan':
        d = prm.get('len', 3.0); n = int(d * SR); t = np.arange(n) / SR; u = t / d
        f = prm.get('f0', 900) + (prm.get('f1', 2400) - prm.get('f0', 900)) * u ** 1.5
        tone = np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.25 + 0.2 * hp(pink(n, 9), 1200)
        return stereo(tone * np.minimum(1, u * 6) * (0.4 + 0.6 * u))
    if kind == 'glitch':
        n = int(prm.get('len', 0.12) * SR); x = pink(n, 70 + i); step = 24
        x = np.repeat(x[::step], step)[:n]; x = np.round(x * 6) / 6
        return stereo(fade(hp(x, 500) * 0.5, 0.001, 0.01))
    if kind == 'beep':
        return bell(PENTA[4] * 2, 0.6) + np.pad(bell(PENTA[6] * 2, 0.6), ((0, 0), (int(0.09 * SR), 0)))[:, : int(0.6 * SR)]
    if kind == 'rewind':
        a = int(prm['at'] / FPS * SR); src = bed[:, max(0, a - int(0.34 * SR)):a][:, ::-1]
        return fade(hp(signal.resample(src, int(src.shape[1] / 2.1), axis=1), 180), 0.004, 0.03)
    if kind == 'knock':
        one = fade(lp(K['whump'][:, : int(0.16 * SR)], 900), 0.0005, 0.06) + stereo(hp(pink(int(0.16 * SR), 5), 1200) * np.exp(-np.arange(int(0.16 * SR)) / (0.01 * SR)) * 0.25)
        out = np.zeros((2, int(0.6 * SR)))
        for t in (0.0, 0.19, 0.36):
            i0 = int(t * SR); out[:, i0:i0 + one.shape[1]] += one * (1.0 if t < 0.3 else 0.8)
        return out
    if kind == 'click':
        n = int(0.03 * SR); x = hp(pink(n, 17 + i), 2500) * np.exp(-np.arange(n) / (0.003 * SR))
        return stereo(x / (np.abs(x).max() + 1e-9) * 0.5)
    if kind == 'lid':
        return fade(lp(K['whump'][:, : int(0.35 * SR)], 260), 0.002, 0.2) * 0.8
    if kind == 'clock':
        return pitch(CLOCK[(i * 3) % len(CLOCK)], prm.get('st', 0))
    raise ValueError(kind)


def place(bus, x, t0, g, pan):
    x = stereo(x)
    if pan is not None:
        a = (pan + 1) * np.pi / 4; x = np.vstack([x[0] * np.cos(a) * 1.414, x[1] * np.sin(a) * 1.414])
    i0 = int(round(t0 * SR))
    if i0 < 0: x = x[:, -i0:]; i0 = 0
    n = min(x.shape[1], bus.shape[1] - i0)
    if n > 0: bus[:, i0:i0 + n] += g * x[:, :n]


C = json.load(open(f'src/data/cues_{proj}.json'))
cues = C['cue']
sfx = np.zeros((2, N)); duck = np.ones(N); count = 0
for row in C['sfx']:
    ref, kind, g, pan = row[:4]
    prm = row[4] if len(row) > 4 else {}
    frames = cues[ref] if isinstance(ref, str) else ref
    frames = frames if isinstance(frames, list) else [frames]
    sel = prm.get('pick')
    if sel is not None: frames = [frames[j] for j in sel]
    for i, fr in enumerate(frames):
        p = pan
        if 'spread' in prm and len(frames) > 1: p = prm['spread'][0] + (prm['spread'][1] - prm['spread'][0]) * i / (len(frames) - 1)
        gg = g + prm.get('ramp', 0) * i
        if 'jit' in prm: gg += (rng.random() - 0.5) * prm['jit']
        x = make(kind, prm, i)
        lead = prm.get('lead', 0.0)
        if kind in ('freeze', 'riser'): lead = x.shape[1] / SR
        place(sfx, x, (fr + prm.get('off', 0)) / FPS - lead - 0.003, db(gg), p)
        if prm.get('duck'):
            j = int(fr / FPS * SR); m = int(0.25 * SR); duck[j:j + m] = np.minimum(duck[j:j + m], np.linspace(db(-prm['duck']), 1, m))
        count += 1
wet = sfx + 0.22 * conv(sfx, room())
mix = bed * duck + wet
mix = np.tanh(mix * 0.9) / 0.9
mix = mix / np.max(np.abs(mix)) * db(-1)
pcm = (np.clip(mix.T, -1, 1) * 32767).astype('<i2')
with wave.open(f'public/audio/{proj}_mix_raw.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
print(proj, 'key', ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'][KEY], 'events', count)
