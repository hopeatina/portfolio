"""Bar map of a track: per-bar energy in kick/mid/hat bands, to pick sections for compose.py.
python tools/bars.py music/x.wav bpm anchor_s"""
import sys, numpy as np, librosa
f,bpm,anc=sys.argv[1],float(sys.argv[2]),float(sys.argv[3])
y,sr=librosa.load(f,sr=22050,mono=True)
oenv=librosa.onset.onset_strength(y=y,sr=sr,hop_length=256)
tempo,bf=librosa.beat.beat_track(onset_envelope=oenv,sr=sr,hop_length=256,start_bpm=bpm)
bt=librosa.frames_to_time(bf,sr=sr,hop_length=256)
# refine period by regression over steady beats
d=np.diff(bt);per=np.median(d)
k=np.round((bt-bt[0])/per);A=np.vstack([k,np.ones_like(k)]).T;per,off=np.linalg.lstsq(A,bt,rcond=None)[0]
ph=(anc-off)/per; anc=off+round(ph)*per
S=np.abs(librosa.stft(y,n_fft=2048,hop_length=512));fr=librosa.fft_frequencies(sr=sr,n_fft=2048)
tt=librosa.frames_to_time(np.arange(S.shape[1]),sr=sr,hop_length=512)
def band(a,b):return S[(fr>=a)&(fr<b)].sum(0)
bands={'low':band(30,150),'mid':band(150,2500),'hi':band(5000,11000)}
mx={k:np.percentile(v,99) for k,v in bands.items()}
dur=len(y)/sr;bar=4*per
print(f'bpm {60/per:.3f} period {per:.5f} anchor {anc:.3f} dur {dur:.1f}')
i0=-int(anc/bar)
for i in range(i0,int((dur-anc)/bar)):
  a=anc+i*bar;m=(tt>=a)&(tt<a+bar)
  if not m.any():continue
  row=' '.join(f"{k}:{'#'*int(10*min(1,bands[k][m].mean()/mx[k]*2.2)):<10}" for k in bands)
  print(f'bar {i:+4d} t={a:6.2f}  {row}')
