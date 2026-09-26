"""Spectrogram + beat markers of a composed score → out/scope_<proj>.png (a visual listen)."""
import sys, json, numpy as np, librosa, librosa.display, matplotlib
matplotlib.use('Agg'); import matplotlib.pyplot as plt
p=sys.argv[1]; f=sys.argv[2] if len(sys.argv)>2 else f'public/audio/{p}_raw.wav'
y,sr=librosa.load(f,sr=22050); g=json.load(open(f'src/data/grid_{p}.json'))
S=librosa.amplitude_to_db(np.abs(librosa.stft(y,hop_length=256)),ref=np.max)
fig,ax=plt.subplots(figsize=(18,5)); librosa.display.specshow(S,sr=sr,hop_length=256,x_axis='time',y_axis='log',ax=ax)
for k,v in g['markers'].items(): ax.axvline(v/60,color='w',lw=1); ax.text(v/60,8000,k,color='w',rotation=90)
for b in g['downbeats']: ax.axvline(b/60,color='y',lw=.4,alpha=.6)
plt.tight_layout(); plt.savefig(f'out/scope_{p}.png',dpi=70); print(f'out/scope_{p}.png')
