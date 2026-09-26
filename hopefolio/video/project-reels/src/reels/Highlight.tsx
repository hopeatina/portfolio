import React from 'react';
import { AbsoluteFill, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { Audio } from '@remotion/media';
import { HOUSE, RESOLVE, clamp, mix, prog } from '../lib/ease';
import { T, rec } from '../lib/theme';
import { Grain, Vignette } from '../lib/Frame';
import { resolveText } from '../lib/decode';
import cues from '../data/cues_highlight.json';

/**
 * HOPE ATINA v3: the thread.
 * Made from the films themselves, full-bleed, each in its own world. Hope's
 * own voice ("I'm less about talk and more about action.", Figma Config 2021)
 * opens it over the first frames of OrgX. On the entrance the films arrive one
 * per downbeat, each at its turn (OrgX gets two bars). Every cut has the same
 * signature: the outgoing world pushes in and blurs, a lime thread sweeps
 * across the frame, and the incoming world lands with a flash of its own brand
 * colour. Then a parade of the eight brand lockups, one per beat, and the
 * name over a spectrum of those colours on the final hit.
 */
export const HIGHLIGHT_DUR = 1758;
const C = cues.cue;
const LIME = T.signal;
const VOICE = ["I'm", 'less', 'about', 'talk', 'and', 'more', 'about', 'action.'];
const A = C.arrive;

type Shot = { id: string; label: string; accent: string; from: number; to: number; start: number; endCard: number };
const SHOTS: Shot[] = [
  { id: 'OrgX', label: '01 · OrgX · proof for AI-delivered work', accent: '#0ad4c4', from: A[0], to: A[1], start: 380, endCard: 820 },
  { id: 'Alma', label: '02 · Alma · clinical production systems', accent: '#00e5a0', from: A[1], to: A[2], start: 398, endCard: 830 },
  { id: 'PerfPulse', label: '03 · Perf Pulse · developer tooling', accent: '#dc2626', from: A[2], to: A[3], start: 400, endCard: 780 },
  { id: 'OpenClaw', label: '04 · OrgX × OpenClaw · continuity plugin', accent: '#ff4f40', from: A[3], to: A[4], start: 368, endCard: 800 },
  { id: 'BrainBuffet', label: '05 · BrainBuffet · learning product', accent: '#b57dff', from: A[4], to: A[5], start: 402, endCard: 780 },
  { id: 'Neuromosaic', label: '06 · Neuromosaic · research infrastructure', accent: '#8b5cf6', from: A[5], to: A[6], start: 336, endCard: 800 },
  { id: 'ChaosRiders', label: '07 · Chaos Riders · game world', accent: '#ffb02e', from: A[6], to: A[7], start: 384, endCard: 720 },
  { id: 'Meridian', label: '08 · Meridian · decision interfaces', accent: '#e6b85c', from: A[7], to: C.recap, start: 386, endCard: 800 },
];
const BEAT = 28.8;

const hexRgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)).join(',');

/** A film, playing from `start` for the length of its window, with the cut signature at both ends. */
const Segment: React.FC<{ s: Shot; f: number }> = ({ s, f }) => {
  const inT = HOUSE(prog(f, s.from, s.from + 10));
  const outT = prog(f, s.to - 7, s.to);
  const scale = mix(1.1, 1, inT) * (1 + 0.12 * outT ** 2);
  const blur = (1 - inT) * 10 + outT ** 2 * 14;
  return (
    <AbsoluteFill style={{ transform: `scale(${scale})`, filter: blur > 0.3 ? `blur(${blur.toFixed(1)}px)` : undefined }}>
      <Sequence from={s.from} durationInFrames={s.to - s.from + 1} layout="none">
        <OffthreadVideo src={staticFile(`clips/${s.id}.mp4`)} startFrom={s.start} muted style={{ width: 1920, height: 1080 }} />
      </Sequence>
    </AbsoluteFill>
  );
};

/** The signature on every cut: a lime thread sweeping across, and the incoming brand's flash. */
const Cut: React.FC<{ f: number; at: number; accent: string; dir: number }> = ({ f, at, accent, dir }) => {
  const u = prog(f, at - 6, at + 8);
  if (u <= 0 || u >= 1) return null;
  const x = mix(-200, 2120, HOUSE(u));
  const flash = f >= at ? Math.exp(-(f - at) / 4) : 0;
  const y0 = dir > 0 ? 1180 : -100;
  const y1 = dir > 0 ? -100 : 1180;
  return (
    <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 800000 }}>
      <AbsoluteFill style={{ background: `rgba(${hexRgb(accent)},${0.28 * flash})`, mixBlendMode: 'screen' }} />
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <filter id={`cg${at}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={12} />
          </filter>
        </defs>
        <line x1={x - 380} y1={y0} x2={x + 380} y2={y1} stroke={LIME} strokeWidth={26} opacity={0.45} filter={`url(#cg${at})`} />
        <line x1={x - 380} y1={y0} x2={x + 380} y2={y1} stroke={LIME} strokeWidth={6} />
      </svg>
    </AbsoluteFill>
  );
};

export const Highlight: React.FC = () => {
  const f = useCurrentFrame();
  const intro = f < C.entrance + 10;
  const introOut = HOUSE(prog(f, C.entrance - 20, C.entrance));
  const shot = SHOTS.find((s) => f >= s.from && f < s.to);
  const labelT = shot ? HOUSE(prog(f, shot.from + 8, shot.from + 20)) * (1 - HOUSE(prog(f, shot.to - 20, shot.to - 10))) : 0;
  const recap = f >= C.recap && f < C.name;
  const ri = recap ? Math.min(7, Math.floor((f - C.recap) / BEAT)) : -1;
  const rs = recap ? SHOTS[ri] : null;
  const rLocal = recap ? f - C.recap - ri * BEAT : 0;
  const nameT = HOUSE(prog(f, C.name + 6, C.name + 40));
  const endT = HOUSE(prog(f, C.name, C.name + 20));
  const credT = HOUSE(prog(f, C.button, C.button + 30));
  return (
    <AbsoluteFill style={{ background: '#0b0c0a', overflow: 'hidden' }}>
      {/* intro: the voice over OrgX's first frames */}
      {intro ? (
        <AbsoluteFill style={{ filter: `blur(${mix(10, 2, HOUSE(prog(f, 120, C.entrance)))}px) brightness(${mix(0.35, 0.9, HOUSE(prog(f, 150, C.entrance)))})`, transform: `scale(${mix(1.08, 1, HOUSE(prog(f, 0, C.entrance)))})` }}>
          <OffthreadVideo src={staticFile('clips/OrgX.mp4')} startFrom={0} muted style={{ width: 1920, height: 1080 }} />
        </AbsoluteFill>
      ) : null}
      {SHOTS.map((s) => (f >= s.from - 1 && f < s.to + 1 ? <Segment key={s.id} s={s} f={f} /> : null))}
      {SHOTS.map((s, i) => (
        <Cut key={s.id} f={f} at={s.from} accent={s.accent} dir={i % 2 ? 1 : -1} />
      ))}
      {/* the parade: eight brand lockups, one per beat */}
      {rs ? (
        <AbsoluteFill style={{ transform: `scale(${mix(1.06, 1, HOUSE(clamp(rLocal / 10)))})` }}>
          <Sequence from={Math.round(C.recap + ri * BEAT)} durationInFrames={Math.ceil(BEAT) + 1} layout="none">
            <OffthreadVideo src={staticFile(`clips/${rs.id}.mp4`)} startFrom={rs.endCard} muted style={{ width: 1920, height: 1080 }} />
          </Sequence>
        </AbsoluteFill>
      ) : null}
      {recap ? SHOTS.map((s, i) => <Cut key={`r${s.id}`} f={f} at={Math.round(C.recap + i * BEAT)} accent={s.accent} dir={i % 2 ? 1 : -1} />) : null}
      {recap ? (
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 40, display: 'flex', justifyContent: 'center', gap: 14, zIndex: 850000 }}>
          {SHOTS.map((s, i) => (
            <span key={s.id} style={{ width: 70, height: 8, borderRadius: 4, background: i <= ri ? s.accent : 'rgba(255,255,255,0.18)' }} />
          ))}
        </div>
      ) : null}
      {/* voice, captioned */}
      {intro ? (
        <AbsoluteFill style={{ opacity: 1 - introOut, zIndex: 900000 }}>
          <div style={{ position: 'absolute', left: 160, top: 160, ...rec(1, 0, 600), fontSize: 22, letterSpacing: '0.22em', color: LIME }}>HOPE ATINA · SELECTED WORK · 2026</div>
          <div style={{ position: 'absolute', left: 160, top: 620, width: 1600, fontFamily: T.serif, fontStyle: 'italic', fontSize: 96, color: T.mineral, lineHeight: 1.1, textShadow: '0 6px 40px rgba(0,0,0,0.8)' }}>
            {VOICE.map((w, i) => {
              const t = HOUSE(prog(f, C.words[i] - 2, C.words[i] + 8));
              return (
                <span key={i} style={{ display: 'inline-block', marginRight: 28, opacity: mix(0.18, 1, t), transform: `translateY(${(1 - t) * 10}px)` }}>
                  {i === 0 ? '“' : ''}
                  {w}
                  {i === VOICE.length - 1 ? '”' : ''}
                </span>
              );
            })}
          </div>
          <div style={{ position: 'absolute', left: 160, top: 760, ...rec(1, 0, 450), fontSize: 20, letterSpacing: '0.16em', color: T.mineral3, opacity: HOUSE(prog(f, 200, 226)) }}>HOPE ATINA · FIGMA CONFIG 2021</div>
        </AbsoluteFill>
      ) : null}
      {shot ? (
        <div style={{ position: 'absolute', left: 64, bottom: 54, padding: '10px 18px', background: 'rgba(8,8,6,0.82)', ...rec(1, 0, 650), fontSize: 22, letterSpacing: '0.1em', color: shot.accent, opacity: labelT, zIndex: 850000 }}>{shot.label.toUpperCase()}</div>
      ) : null}
      {/* the name, over the spectrum of the worlds */}
      {f >= C.name ? (
        <AbsoluteFill style={{ opacity: endT, zIndex: 950000 }}>
          <AbsoluteFill style={{ background: '#0b0c0a' }} />
          <AbsoluteFill style={{ background: `linear-gradient(100deg, ${SHOTS.map((s, i) => `${s.accent} ${((i + (f - C.name) / 120) % 8) * 12.5}%`).join(', ')})`, opacity: 0.22, filter: 'blur(60px)' }} />
          <div style={{ position: 'absolute', left: 0, top: 538, width: 1920 * HOUSE(prog(f, C.name, C.name + 30)), height: 4, background: LIME, boxShadow: `0 0 24px ${LIME}` }} />
          <div style={{ position: 'absolute', left: 160, top: 300, fontFamily: T.serif, fontSize: 200, lineHeight: 0.95, letterSpacing: '-0.02em', color: T.mineral, clipPath: `inset(0 ${(1 - nameT) * 100}% -20% 0)` }}>Hope Atina</div>
          <div style={{ position: 'absolute', left: 160, top: 580, ...rec(0.2, 0.4, 440), fontSize: 42, color: T.mineral2, whiteSpace: 'pre' }}>{resolveText(''.padEnd(55, ' '), 'Engineer, founder, product thinker. Also made the beat.', RESOLVE(prog(f, C.name + 20, C.name + 60)), 'hname', f)}</div>
          <div style={{ position: 'absolute', left: 160, top: 680, display: 'flex', gap: 12 }}>
            {SHOTS.map((s, i) => (
              <span key={s.id} style={{ width: 60, height: 6, borderRadius: 3, background: s.accent, opacity: HOUSE(prog(f, C.name + 30 + i * 4, C.name + 40 + i * 4)) }} />
            ))}
          </div>
          <div style={{ position: 'absolute', left: 160, bottom: 120, display: 'flex', gap: 36, ...rec(1, 0, 500), fontSize: 22, letterSpacing: '0.14em', color: T.mineral3, opacity: credT }}>
            <span style={{ color: LIME }}>HOPEATINA.COM</span>
            <span>SCORE: “UBEAT V1” BY HOPE ATINA</span>
            <span>FILMS BUILT IN CODE WITH CLAUDE OPUS 5.5</span>
          </div>
        </AbsoluteFill>
      ) : null}
      <Vignette s={0.45} />
      <Grain opacity={0.04} />
      <Audio src={staticFile('audio/highlight_mix.wav')} />
    </AbsoluteFill>
  );
};
