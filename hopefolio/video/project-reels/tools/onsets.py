import subprocess, sys
import numpy as np
src = sys.argv[1]
a = subprocess.run(['ffmpeg', '-v', 'error', '-i', src, '-ac', '1', '-ar', '48000', '-f', 'f32le', '-'], capture_output=True).stdout
x = np.frombuffer(a, np.float32)
# sample-accurate onset: first sample in a ±12-frame window where |x| exceeds 30% of the window's peak envelope rise
env = np.convolve(np.abs(x), np.ones(48) / 48, mode='same')
def onset_near(fr):
    c = int(fr / 60 * 48000)
    lo, hi = max(0, c - 800), min(len(x), c + 800)
    seg = env[lo:hi]
    base = np.median(env[max(0, lo - 4800):lo]) if lo > 0 else 0
    d = np.diff(seg)
    k = int(np.argmax(d))  # steepest rise
    return (lo + k) / 48000 * 60 - fr
# v3 cues: snap, the three sends, the 8 kicks, drop, snare 1 (knot), snare 2 (pulses land), bar 8 (period), bar 9 (decision), the button
FRAMES = [int(a) for a in sys.argv[2:]] or [64, 85, 106, 117, 253, 275, 295, 318, 337, 360, 379, 401, 424, 465, 549, 593, 678, 763]
for fr in FRAMES:
    print(f'{fr:4d}: {onset_near(fr):+5.2f} frames')
