"""Cut a 15 s score from one of Hope's own tracks: a beat-aligned window with a
build and a drop, cut on a downbeat, then a hall 'button' tail. Writes
public/audio/<proj>.wav (mastered later) and src/data/grid_<proj>.json."""
import sys, json, wave, numpy as np, librosa
from scipy import signal
SR=48000; FPS=60; DUR=float(sys.argv[3]) if len(sys.argv)>3 else 15.0; N=int(DUR*SR)
proj, spec = sys.argv[1], json.loads(sys.argv[2])
f, start, drop = spec['file'], spec['start'], spec['drop']
y,_=librosa.load(f,sr=SR,mono=False)
if y.ndim==1: y=np.vstack([y,y])
mono=y.mean(0)
oenv=librosa.onset.onset_strength(y=mono[int(start*SR)-SR:int((start+DUR+2)*SR)],sr=SR,hop_length=512)
_,bf=librosa.beat.beat_track(onset_envelope=oenv,sr=SR,hop_length=512,start_bpm=spec['bpm'])
bt=librosa.frames_to_time(bf,sr=SR,hop_length=512)+start-1.0
bt=bt[(bt>=start-0.01)&(bt<start+DUR)]
per=float(np.median(np.diff(bt)))
di=int(np.argmin(abs(bt-drop))); drop=float(bt[di])
down=[float(b) for i,b in enumerate(bt) if (i-di)%4==0]
cut=max([d for d in down if d-start<=DUR-1.6 and d-start>=DUR-4.5] or [start+DUR-1.6])
def room(sec,seed):
    n=int(sec*SR); t=np.arange(n)/SR; out=[]
    for c in range(2):
        r=np.random.default_rng(seed+c); x=r.standard_normal(n)*np.exp(-t/(sec/6.2))
        x=signal.sosfilt(signal.butter(2,5200/(SR/2),output='sos'),x); out.append(x/np.sqrt((x**2).sum()))
    return out
m=y[:,int(start*SR):int((cut+0.18)*SR)].copy()
fi=int(0.01*SR); m[:,:fi]*=np.linspace(0,1,fi); fo=int(0.05*SR); m[:,-fo:]*=np.linspace(1,0,fo)
out=np.zeros((2,N)); out[:,:m.shape[1]]+=m[:,:N]
hit=y[:,int((cut-0.01)*SR):int((cut+0.18)*SR)]
H=room(3.4,31); tail=np.vstack([signal.fftconvolve(np.pad(hit[c],(0,int(3.4*SR))),H[c]) for c in range(2)])
i0=int((cut-start-0.01)*SR); n=min(tail.shape[1],N-i0); out[:,i0:i0+n]+=tail[:,:n]*10**(-5/20)
fade=np.ones(N); k=int((DUR-0.6)*SR); fade[k:]=np.linspace(1,0,N-k)**1.5; out*=fade
out=out/np.max(np.abs(out))*10**(-1/20)
pcm=(np.clip(out.T,-1,1)*32767).astype('<i2')
with wave.open(f'public/audio/{proj}_raw.wav','wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
fr=lambda s: round((s-start)*FPS,2)
g=dict(track=spec['track'],bpm=round(60/per,2),beatF=round(per*FPS,3),beats=[fr(b) for b in bt],downbeats=[fr(d) for d in down],drop=fr(drop),button=fr(cut),start_s=start)
json.dump(g,open(f'src/data/grid_{proj}.json','w'))
print(proj,spec['track'],'bpm',g['bpm'],'drop f',g['drop'],'button f',g['button'],'beats',len(bt))
