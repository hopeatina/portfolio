"""Two-pass EBU R128 master: −14 LUFS integrated, −1.0 dBTP, linear gain only."""
import json, subprocess, sys
src, dst = sys.argv[1], sys.argv[2]
r = subprocess.run(['ffmpeg', '-hide_banner', '-nostdin', '-i', src, '-af', 'loudnorm=I=-14:TP=-1.0:LRA=20:print_format=json', '-f', 'null', '-'], capture_output=True, text=True)
txt = r.stderr
j = json.loads(txt[txt.rindex('{'):txt.rindex('}') + 1])
af = (f"loudnorm=I=-14:TP=-1.0:LRA=20:measured_I={j['input_i']}:measured_TP={j['input_tp']}:"
      f"measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true")
subprocess.run(['ffmpeg', '-hide_banner', '-nostdin', '-y', '-i', src, '-af', af, '-ar', '48000', '-c:a', 'pcm_s24le', dst], check=True, capture_output=True)
print('measured', j['input_i'], 'LUFS', j['input_tp'], 'dBTP →', dst)
# loudnorm's linear mode can land off target on short cuts with long tails: measure, then trim with plain gain
r2 = subprocess.run(['ffmpeg', '-hide_banner', '-nostdin', '-i', dst, '-af', 'ebur128', '-f', 'null', '-'], capture_output=True, text=True).stderr
got = float(r2[r2.rindex('I:') + 2:].split('LUFS')[0])
if abs(got + 14) > 0.15:
    tmp = dst + '.tmp.wav'
    subprocess.run(['ffmpeg', '-hide_banner', '-nostdin', '-y', '-i', dst, '-af', f'volume={-14 - got:.2f}dB', '-c:a', 'pcm_s24le', tmp], check=True, capture_output=True)
    subprocess.run(['mv', tmp, dst], check=True)
    print(f'trimmed {got:+.1f} → -14.0 LUFS')
