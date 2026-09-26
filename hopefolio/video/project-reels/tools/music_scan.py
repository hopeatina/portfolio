import glob, numpy as np, librosa, json
out=[]
for f in sorted(glob.glob('music/*.wav')):
    y,sr=librosa.load(f,sr=22050,mono=True)
    dur=len(y)/sr
    tempo,beats=librosa.beat.beat_track(y=y,sr=sr)
    rms=librosa.feature.rms(y=y)[0]; t=librosa.times_like(rms,sr=sr)
    # biggest energy jump (a "drop") after 4s: rise of 2s-mean
    win=int(2/(t[1]-t[0])); m=np.convolve(rms,np.ones(win)/win,'same')
    d=m[win:]-m[:-win]; i=int(np.argmax(d)); drop=float(t[i+win//2])
    cent=float(np.mean(librosa.feature.spectral_centroid(y=y,sr=sr)))
    key=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'][int(np.argmax(librosa.feature.chroma_cqt(y=y,sr=sr).mean(1)))]
    out.append(dict(name=f.split('_',1)[1][:-4],file=f,dur=round(dur,1),bpm=round(float(np.atleast_1d(tempo)[0]),1),drop=round(drop,1),dyn=round(float(m.max()/(np.median(m)+1e-6)),2),bright=int(cent),key=key))
    print(out[-1]['name'],out[-1]['dur'],'s bpm',out[-1]['bpm'],'drop@',out[-1]['drop'],'dyn',out[-1]['dyn'],'bright',out[-1]['bright'],out[-1]['key'])
json.dump(out,open('music/scan.json','w'),indent=1)
