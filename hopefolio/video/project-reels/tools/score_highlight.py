"""The highlight's bed: Hope's own "UBEAT V1" from song 12.04 s (its textural
runway, then the entrance at reel frame 257), Hope's Figma Config 2021 line
laid over the runway with the music ducked under it, cut on the downbeat at
reel frame 1640 with a hall "button" tail. Writes public/audio/highlight.wav
(pre-sweetener; tools/sfx.py highlight adds the designed hits, then master.py).
"""
import json, wave
import numpy as np
from scipy import signal
import librosa

SR = 48000
FPS = 60
g = json.load(open('src/data/grid_highlight.json'))
DUR = 1758 / FPS
N = int(DUR * SR)
start = g['start_s']
cut = start + g['button'] / FPS
y, _ = librosa.load('music/1893461586_ubeat-v1.wav', sr=SR, mono=False)
voice, _ = librosa.load('public/audio/voice.wav', sr=SR, mono=True)


def room(sec, seed):
    n = int(sec * SR); t = np.arange(n) / SR; out = []
    for c in range(2):
        x = np.random.default_rng(seed + c).standard_normal(n) * np.exp(-t / (sec / 6.2))
        x = signal.sosfilt(signal.butter(2, 5200 / (SR / 2), output='sos'), x); out.append(x / np.sqrt((x ** 2).sum()))
    return out


m = y[:, int(start * SR):int((cut + 0.18) * SR)].copy()
fi = int(0.01 * SR); m[:, :fi] *= np.linspace(0, 1, fi); fo = int(0.05 * SR); m[:, -fo:] *= np.linspace(1, 0, fo)
out = np.zeros((2, N)); out[:, :m.shape[1]] += m[:, :N]
hit = y[:, int((cut - 0.01) * SR):int((cut + 0.18) * SR)]
H = room(3.4, 31)
tail = np.vstack([signal.fftconvolve(np.pad(hit[c], (0, int(3.4 * SR))), H[c]) for c in range(2)])
i0 = int((cut - start - 0.01) * SR); n = min(tail.shape[1], N - i0); out[:, i0:i0 + n] += tail[:, :n] * 10 ** (-5 / 20)
# duck the runway under the voice
duck = np.ones(N); a, b = int(0.05 * SR), int((len(voice) / SR + 0.25) * SR)
duck[a:b] = 10 ** (-7 / 20); r = int(0.25 * SR); duck[b:b + r] = np.linspace(10 ** (-7 / 20), 1, r)
out *= duck
v = voice / (np.abs(voice).max() + 1e-9) * 0.9
out[:, :len(v)] += np.vstack([v, v])[:, :N] * 1.0
fade = np.ones(N); k = int((DUR - 0.6) * SR); fade[k:] = np.linspace(1, 0, N - k) ** 1.5; out *= fade
out = out / np.max(np.abs(out)) * 10 ** (-1 / 20)
pcm = (np.clip(out.T, -1, 1) * 32767).astype('<i2')
with wave.open('public/audio/highlight.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
print('highlight bed', round(DUR, 2), 's, cut at', round(cut - start, 3), 's')
