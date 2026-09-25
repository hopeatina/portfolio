import numpy as np, librosa, json, sys
picks={'alma':'kdila','perfpulse':'tues','openclaw':'bop','brainbuffet':'feeling','neuromosaic':'synthyrecover','chaosriders':'drvn','meridian':'montay','highlight':'ubeat-v1'}
alts=['hackamuse','heartbrake','smovie','yerr','choppy','macros','flyover','funky','crossover-v1','almostmeeting','topline-v1','tuf','shakey','beep','saturdayjams']
res={}
def analyze(name, L=15.0):
    import glob
    f=glob.glob(f'music/*_{name}.wav')[0]
    y,sr=librosa.load(f,sr=22050,mono=True)
    oenv=librosa.onset.onset_strength(y=y,sr=sr)
    tempo,beats=librosa.beat.beat_track(onset_envelope=oenv,sr=sr)
    bt=librosa.frames_to_time(beats,sr=sr)
    lo=librosa.feature.rms(y=librosa.effects.preemphasis(y,coef=-0.9))[0]  # low-weighted energy
    rms=librosa.feature.rms(y=y)[0]; t=librosa.times_like(rms,sr=sr)
    def E(a,b): m=(t>=a)&(t<b); return float(rms[m].mean()) if m.any() else 0
    best=None
    for s in bt:
        if s+L>len(y)/sr: break
        for frac in (0.35,0.45,0.55):
            d=s+L*frac
            # find nearest beat to d
            db=bt[np.argmin(abs(bt-d))]
            pre=E(db-2.5,db-0.3); post=E(db+0.1,db+3); head=E(s,s+1.5); endv=E(s+L-2,s+L)
            score=post/(pre+1e-6) + 0.5*post/(head+1e-6)
            if best is None or score>best[0]: best=(score,float(s),float(db),pre,post)
    per=60/float(np.atleast_1d(tempo)[0])
    return dict(file=f,bpm=round(float(np.atleast_1d(tempo)[0]),2),start=round(best[1],3),drop=round(best[2],3),drop_in_window=round(best[2]-best[1],3),contrast=round(best[0],2))
for proj,name in picks.items():
    r=analyze(name); res[proj]=dict(track=name,**r); print(proj,name,r)
print('--- alternates')
for n in alts:
    try: r=analyze(n); print(n,r['bpm'],'contrast',r['contrast'],'drop_in_window',r['drop_in_window'])
    except Exception as e: print(n,'err',e)
json.dump(res,open('music/windows.json','w'),indent=1)
