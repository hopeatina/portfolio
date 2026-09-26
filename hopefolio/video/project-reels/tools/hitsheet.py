"""Measured drum hits per film (reel frames @60) from the mastered cut.
kick = 30-150 Hz flux, snare = 150-2500 Hz, hat = 5-16 kHz. Writes src/data/hits_<proj>.json"""
import sys, json, numpy as np, librosa
proj = sys.argv[1]
y, sr = librosa.load(f'public/audio/{proj}.wav', sr=48000, mono=True)
hop = 200
S = np.abs(librosa.stft(y, n_fft=2048, hop_length=hop)); fr = librosa.fft_frequencies(sr=sr, n_fft=2048)
def flux(a, b):
    m = (fr >= a) & (fr < b); e = np.log1p(S[m].sum(0)); d = np.maximum(0, np.diff(e, prepend=e[0])); return d / (d.max() + 1e-9)
out = {}
for name, (a, b, thr, gap) in {'kick': (30, 150, 0.28, 10), 'snare': (150, 2500, 0.3, 14), 'hat': (5000, 16000, 0.3, 4)}.items():
    e = flux(a, b)
    pk = librosa.util.peak_pick(e, pre_max=6, post_max=6, pre_avg=14, post_avg=14, delta=0.06, wait=gap * 4)
    out[name] = [[round(p * hop / sr * 60, 1), round(float(e[p]), 2)] for p in pk if e[p] >= thr and p * hop / sr < 14.4]
rms = librosa.feature.rms(y=y, hop_length=hop)[0]
out['energy'] = [round(float(v), 3) for v in np.interp(np.arange(0, 900, 15), np.arange(len(rms)) * hop / sr * 60, rms / rms.max())]
json.dump(out, open(f'src/data/hits_{proj}.json', 'w'))
print(proj, {k: len(v) for k, v in out.items() if k != 'energy'})
