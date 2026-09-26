import React from 'react';
import { AbsoluteFill, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { Audio } from '@remotion/media';
import { HOUSE, RESOLVE, clamp, mix, prog } from '../lib/ease';
import { T, rec } from '../lib/theme';
import { Grain, Vignette } from '../lib/Frame';
import { resolveText } from '../lib/decode';
import cues from '../data/cues_highlight.json';
import portrait from '../data/portrait_line.json';

/**
 * HOPE ATINA v4: "The thread."
 *
 * v3's thread was a wipe. v4's thread is a line of meaning. Every film already
 * owns a line (OrgX's check, Alma's shield stroke, Perf Pulse's pulse, the
 * OpenClaw bridge, BrainBuffet's mountain path, Neuromosaic's vector, Chaos
 * Riders' amber road, Meridian's price line). One continuous thread runs along
 * the bottom of the whole reel and becomes each of those lines in turn, in each
 * brand's colour, and each film is framed by the value of Hope's it proves
 * (from the site's own copy), with the project name in its own brand type.
 *
 * Opening: black and one taut thread; Hope's own voice (Figma Config 2021)
 * plucks it word by word. Ending: the eight lines braid and draw Hope's portrait
 * as one continuous stroke, one film's colour per beat, the values stacking
 * beside it; the photograph resolves under the line for a beat, then the name.
 */
export const HIGHLIGHT_DUR = 1758;
const C = cues.cue;
const LIME = T.signal;
const VOICE = ["I'm", 'less', 'about', 'talk', 'and', 'more', 'about', 'action.'];
const A = C.arrive;
const BEAT = 28.8;
const BASE = 905; // the thread's baseline

type Motif = 'check' | 'shield' | 'pulse' | 'bridge' | 'mountain' | 'vector' | 'road' | 'price';
type Shot = { id: string; name: string; font: React.CSSProperties; accent: string; from: number; to: number; start: number; value: string; outcome: string; motif: Motif };
const SHOTS: Shot[] = [
  { id: 'OrgX', name: 'OrgX', font: { fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 800, letterSpacing: '-0.03em' }, accent: '#b7f34a', from: A[0], to: A[1], start: 380, value: 'Set up the conditions where people make things together.', outcome: 'proof for AI-delivered work', motif: 'check' },
  { id: 'Alma', name: 'Alma', font: { fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 700, letterSpacing: '-0.04em' }, accent: '#00e5a0', from: A[1], to: A[2], start: 318, value: 'A problem can look solved while the person living with it still pays for it.', outcome: 'a thousand audits a month, down to a short queue · 72% adoption', motif: 'shield' },
  { id: 'PerfPulse', name: 'PerfPulse', font: { fontFamily: '-apple-system, "SF Pro Display", sans-serif', fontWeight: 750, letterSpacing: '-0.03em' }, accent: '#dc2626', from: A[2], to: A[3], start: 372, value: 'Timing, tension, release.', outcome: 'the warning, nine minutes before the freeze', motif: 'pulse' },
  { id: 'OpenClaw', name: 'OrgX × OpenClaw', font: { ...rec(1, 0, 900) }, accent: '#ff4f40', from: A[3], to: A[4], start: 330, value: 'Room for someone else to play.', outcome: 'the company’s memory, inside the host', motif: 'bridge' },
  { id: 'BrainBuffet', name: 'BrainBuffet', font: { fontFamily: '"Hind", "Poppins", system-ui, sans-serif', fontWeight: 700, letterSpacing: '-0.03em' }, accent: '#c99fff', from: A[4], to: A[5], start: 368, value: 'Start with the person.', outcome: 'a question to a course in under five minutes', motif: 'mountain' },
  { id: 'Neuromosaic', name: 'neuromosaic', font: { fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 600, letterSpacing: '-0.02em' }, accent: '#8b5cf6', from: A[5], to: A[6], start: 336, value: 'Systems with depth.', outcome: 'a paper you can follow back to its choices', motif: 'vector' },
  { id: 'ChaosRiders', name: 'CHAOS RIDERS', font: { fontFamily: 'Anton, Impact, sans-serif', fontWeight: 400, letterSpacing: '0.01em' }, accent: '#ffb02e', from: A[6], to: A[7], start: 78, value: 'A bend can become a break. A break can reveal the next weave.', outcome: 'from a Lego box to the real taxi, and the road', motif: 'road' },
  { id: 'Meridian', name: 'Meridian', font: { fontFamily: 'Newsreader, serif', fontWeight: 400, letterSpacing: '0.01em' }, accent: '#d4a24c', from: A[7], to: C.recap, start: 400, value: 'Details with a reason.', outcome: 'conviction, with its ingredients showing', motif: 'price' },
];

const hexRgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mixHex = (a: string, b: string, t: number) => {
  const A1 = hexRgb(a);
  const B1 = hexRgb(b);
  return `rgb(${A1.map((v, i) => Math.round(v + (B1[i] - v) * t)).join(',')})`;
};

/** Each film's own line, as an offset from the baseline at x (0..1920). */
const motifY = (m: Motif, x: number, f: number): number => {
  const u = x / 1920;
  switch (m) {
    case 'check': {
      const c = 1500;
      return x > c - 60 && x < c ? (x - (c - 60)) * 0.9 : x >= c && x < c + 110 ? 54 - (x - c) * 1.3 : 0;
    }
    case 'shield': {
      const c = 1560;
      return Math.abs(x - c) < 70 ? -Math.sqrt(Math.max(0, 70 * 70 - (x - c) ** 2)) * 0.9 : 0;
    }
    case 'pulse': {
      const ph = u * 6 - f / 18;
      return -(Math.max(0, Math.sin(ph * Math.PI)) ** 18) * 70;
    }
    case 'bridge':
      return Math.round(Math.sin(u * 40) * 0.5) * 6 + (Math.floor(x / 48) % 2 ? 0 : -4);
    case 'mountain':
      return -Math.max(0, u - 0.35) * 260 + Math.sin(u * 26) * 10;
    case 'vector':
      return Math.floor(x / 60) % 2 ? -8 : 8;
    case 'road':
      return Math.sin(u * 7 + f / 30) * 34;
    case 'price':
      return -Math.round((Math.sin(u * 17) * 16 + Math.sin(u * 5) * 26 - u * 40) / 6) * 6;
  }
};

/** The thread: one line, the whole reel, becoming each film's line at its cut. */
const Thread: React.FC<{ f: number }> = ({ f }) => {
  const i = SHOTS.findIndex((s) => f >= s.from && f < s.to);
  if (i < 0) return null;
  const s = SHOTS[i];
  const prev = SHOTS[Math.max(0, i - 1)];
  const morph = i === 0 ? 1 : HOUSE(prog(f, s.from - 4, s.from + 12));
  const col = i === 0 ? s.accent : mixHex(prev.accent, s.accent, morph);
  const pts: string[] = [];
  for (let x = -20; x <= 1940; x += 10) pts.push(`${x},${(BASE + mix(motifY(prev.motif, x, f), motifY(s.motif, x, f), morph)).toFixed(1)}`);
  const spark = ((f - s.from) / (s.to - s.from)) * 1920;
  return (
    <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0, zIndex: 860000, pointerEvents: 'none' }}>
      <polyline points={pts.join(' ')} stroke={col} strokeWidth={12} opacity={0.25} fill="none" style={{ filter: 'blur(6px)' }} />
      <polyline points={pts.join(' ')} stroke={col} strokeWidth={3.5} fill="none" strokeLinejoin="round" />
      <circle cx={spark} cy={BASE + motifY(s.motif, spark, f)} r={7} fill="#fff" style={{ filter: `drop-shadow(0 0 12px ${col})` }} />
    </svg>
  );
};

/** A film, playing from `start`, with a push-in cut on the way in. */
const Segment: React.FC<{ s: Shot; f: number }> = ({ s, f }) => {
  const inT = HOUSE(prog(f, s.from, s.from + 10));
  const outT = prog(f, s.to - 6, s.to);
  const scale = mix(1.08, 1, inT) * (1 + 0.1 * outT ** 2);
  const blur = (1 - inT) * 8 + outT ** 2 * 12;
  return (
    <AbsoluteFill style={{ transform: `scale(${scale})`, filter: blur > 0.3 ? `blur(${blur.toFixed(1)}px)` : undefined }}>
      <Sequence from={s.from} durationInFrames={s.to - s.from + 1} layout="none">
        <OffthreadVideo src={staticFile(`clips/${s.id}.mp4`)} startFrom={s.start} muted style={{ width: 1920, height: 1080 }} />
      </Sequence>
    </AbsoluteFill>
  );
};

/** The frame on every film: the value it proves, above the thread; the project, below it. */
const Framing: React.FC<{ s: Shot; f: number; i: number }> = ({ s, f, i }) => {
  const t = HOUSE(prog(f, s.from + 6, s.from + 20));
  const out = HOUSE(prog(f, s.to - 12, s.to - 2));
  const k = t * (1 - out);
  return (
    <AbsoluteFill style={{ zIndex: 850000, pointerEvents: 'none' }}>
      <AbsoluteFill style={{ background: `linear-gradient(180deg, transparent 58%, rgba(6,6,5,${0.78 * k}) 80%, rgba(6,6,5,${0.9 * k}) 100%)` }} />
      <div style={{ position: 'absolute', left: 110, bottom: 1080 - BASE + 26, width: 1700, fontFamily: T.serif, fontStyle: 'italic', fontSize: s.value.length > 50 ? 46 : 66, lineHeight: 1.08, color: T.mineral, clipPath: `inset(-20% ${(1 - k) * 100}% -30% 0)`, textShadow: '0 4px 30px rgba(0,0,0,0.9)' }}>{s.value}</div>
      <div style={{ position: 'absolute', left: 110, top: BASE + 24, display: 'flex', alignItems: 'baseline', gap: 26, opacity: k }}>
        <span style={{ ...rec(1, 0, 600), fontSize: 20, letterSpacing: '0.18em', color: 'rgba(242,239,228,0.55)' }}>{String(i + 1).padStart(2, '0')}</span>
        <span style={{ ...s.font, fontSize: 46, color: s.accent, lineHeight: 1 }}>{s.name}</span>
        <span style={{ ...rec(1, 0, 450), fontSize: 22, color: 'rgba(242,239,228,0.75)' }}>{s.outcome}</span>
      </div>
    </AbsoluteFill>
  );
};

// ── the portrait: one stroke, from the photograph (tools/oneline2.py)
type Seg = number[][];
const SEGS = (portrait as { segs: Seg[] }).segs;
const PW = (portrait as { w: number }).w;
const PH = (portrait as { h: number }).h;
const segLen = (s: Seg) => s.reduce((a, p, i) => (i ? a + Math.hypot(p[0] - s[i - 1][0], p[1] - s[i - 1][1]) : 0), 0);
const LENS = SEGS.map(segLen);
const TOTAL = LENS.reduce((a, b) => a + b, 0);
const CUM = LENS.reduce<number[]>((acc, l) => [...acc, (acc[acc.length - 1] ?? 0) + l], []);
const segColor = (k: number) => SHOTS[Math.min(7, Math.floor(((CUM[k] - LENS[k] / 2) / TOTAL) * 8))].accent;

const Portrait: React.FC<{ f: number; x: number; y: number; h: number }> = ({ f, x, y, h }) => {
  const p = clamp(prog(f, C.recap, C.name - 10)) * TOTAL;
  const sc = h / PH;
  return (
    <svg width={PW * sc} height={h} viewBox={`0 0 ${PW} ${PH}`} style={{ position: 'absolute', left: x, top: y, overflow: 'visible' }}>
      {SEGS.map((s, k) => {
        const start = CUM[k] - LENS[k];
        if (p <= start) return null;
        const frac = clamp((p - start) / LENS[k]);
        const d = s.map((pt, j) => `${j ? 'L' : 'M'}${pt[0]} ${pt[1]}`).join(' ');
        const next = SEGS[k + 1];
        return (
          <g key={k}>
            <path d={d} stroke={segColor(k)} strokeWidth={2.2} fill="none" strokeLinejoin="round" strokeLinecap="round" pathLength={1} strokeDasharray={`${frac} 1`} />
            {frac >= 1 && next && p > CUM[k] ? <line x1={s[s.length - 1][0]} y1={s[s.length - 1][1]} x2={next[0][0]} y2={next[0][1]} stroke={segColor(k)} strokeWidth={0.8} opacity={0.22} /> : null}
          </g>
        );
      })}
    </svg>
  );
};

export const Highlight: React.FC = () => {
  const f = useCurrentFrame();
  const intro = f < C.entrance;
  const shotI = SHOTS.findIndex((s) => f >= s.from && f < s.to);
  const recap = f >= C.recap;
  const ri = recap ? Math.min(7, Math.floor((f - C.recap) / BEAT)) : -1;
  const photoT = HOUSE(prog(f, C.name - 6, C.name + 16)) * (1 - HOUSE(prog(f, C.name + 60, C.name + 100)));
  const nameT = HOUSE(prog(f, C.name + 10, C.name + 40));
  const credT = HOUSE(prog(f, C.button, C.button + 30));
  // the opening thread: taut, plucked by each word
  const pluck = C.words.reduce((a, w) => a + (f >= w ? Math.exp(-(f - w) / 10) * Math.sin((f - w) * 0.9) : 0), 0);
  const drawIn = HOUSE(prog(f, 0, 40));
  const snap = HOUSE(prog(f, C.entrance - 14, C.entrance));
  return (
    <AbsoluteFill style={{ background: '#0b0c0a', overflow: 'hidden' }}>
      {/* ── opening: one thread, plucked by Hope's own voice */}
      {intro ? (
        <AbsoluteFill>
          <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
            <path d={`M 0 540 Q 960 ${540 + pluck * 60} 1920 540`} stroke={LIME} strokeWidth={3 + 2 * Math.abs(pluck)} fill="none" pathLength={1} strokeDasharray={`${drawIn} 1`} style={{ filter: `drop-shadow(0 0 ${10 + 20 * Math.abs(pluck)}px ${LIME})` }} />
          </svg>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 420, textAlign: 'center', fontFamily: T.serif, fontStyle: 'italic', fontSize: 92, color: T.mineral, transform: `translateY(${-snap * 30}px)`, opacity: 1 - snap }}>
            {VOICE.map((w, i) => {
              const t = HOUSE(prog(f, C.words[i] - 2, C.words[i] + 8));
              return (
                <span key={i} style={{ display: 'inline-block', marginRight: 26, opacity: mix(0.0, 1, t), transform: `translateY(${(1 - t) * 14}px)` }}>
                  {i === 0 ? '“' : ''}
                  {w}
                  {i === VOICE.length - 1 ? '”' : ''}
                </span>
              );
            })}
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 590, textAlign: 'center', ...rec(1, 0, 500), fontSize: 20, letterSpacing: '0.22em', color: 'rgba(242,239,228,0.45)', opacity: HOUSE(prog(f, 170, 200)) * (1 - snap) }}>HOPE ATINA · FIGMA CONFIG 2021 · EIGHT FILMS, ONE THREAD</div>
        </AbsoluteFill>
      ) : null}

      {/* ── the films, each framed by what it proves */}
      {SHOTS.map((s) => (f >= s.from - 1 && f < s.to + 1 ? <Segment key={s.id} s={s} f={f} /> : null))}
      {shotI >= 0 ? <Framing s={SHOTS[shotI]} f={f} i={shotI} /> : null}
      <Thread f={f} />
      {SHOTS.map((s) => (f >= s.from && f < s.from + 14 ? <AbsoluteFill key={`fl${s.id}`} style={{ background: `rgba(${hexRgb(s.accent).join(',')},${0.3 * Math.exp(-(f - s.from) / 4)})`, mixBlendMode: 'screen', zIndex: 870000 }} /> : null))}

      {/* ── the braid: the eight lines draw the person */}
      {recap ? (
        <AbsoluteFill style={{ background: '#0b0c0a', zIndex: 900000 }}>
          <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(183,243,74,0.06), transparent 60%)' }} />
          <Img src={staticFile('img/hope-profile.jpg')} style={{ position: 'absolute', left: 940, top: 90, height: 900, width: (900 * 1295) / 1266, objectFit: 'cover', opacity: 0.85 * photoT, filter: 'contrast(1.05) brightness(0.95)', WebkitMaskImage: 'radial-gradient(ellipse 36% 46% at 50% 42%, #000 55%, transparent 100%)', maskImage: 'radial-gradient(ellipse 36% 46% at 50% 42%, #000 55%, transparent 100%)' }} />
          <Portrait f={f} x={940} y={90} h={900} />
          <div style={{ position: 'absolute', left: 120, top: 150, width: 800, opacity: 1 - HOUSE(prog(f, C.name, C.name + 16)) }}>
            {SHOTS.map((s, k) => {
              const t = HOUSE(prog(f, C.recap + k * BEAT, C.recap + k * BEAT + 12));
              return (
                <div key={s.id} style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginTop: 14, opacity: t * (k === ri ? 1 : 0.55), transform: `translateX(${(1 - t) * -20}px)` }}>
                  <span style={{ width: 14, height: 14, borderRadius: 7, background: s.accent, flexShrink: 0, transform: 'translateY(-4px)' }} />
                  <span style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 34, color: T.mineral, lineHeight: 1.15 }}>{s.value}</span>
                </div>
              );
            })}
          </div>
          {f >= C.name ? (
            <>
              <div style={{ position: 'absolute', left: 120, top: 330, fontFamily: T.serif, fontSize: 190, lineHeight: 0.95, letterSpacing: '-0.02em', color: T.mineral, clipPath: `inset(-10% ${(1 - nameT) * 100}% -20% 0)` }}>Hope Atina</div>
              <div style={{ position: 'absolute', left: 124, top: 560, ...rec(0.2, 0.4, 440), fontSize: 38, color: T.mineral2, whiteSpace: 'pre' }}>{resolveText(''.padEnd(52, ' '), 'Engineer, founder, product thinker. Made the beats.', RESOLVE(prog(f, C.name + 26, C.name + 64)), 'hname', f)}</div>
              <div style={{ position: 'absolute', left: 124, top: 640, display: 'flex', gap: 12 }}>
                {SHOTS.map((s, i) => (
                  <span key={s.id} style={{ width: 54, height: 6, borderRadius: 3, background: s.accent, opacity: HOUSE(prog(f, C.name + 36 + i * 4, C.name + 46 + i * 4)) }} />
                ))}
              </div>
              <div style={{ position: 'absolute', left: 124, bottom: 110, display: 'flex', gap: 34, ...rec(1, 0, 500), fontSize: 20, letterSpacing: '0.14em', color: T.mineral3, opacity: credT }}>
                <span style={{ color: LIME }}>HOPEATINA.COM</span>
                <span>SCORES BY HOPE ATINA</span>
                <span>FILMS BUILT IN CODE WITH CLAUDE</span>
              </div>
            </>
          ) : null}
        </AbsoluteFill>
      ) : null}
      <Vignette s={0.42} />
      <Grain opacity={0.04} />
      <Audio src={staticFile('audio/highlight_mix.wav')} />
    </AbsoluteFill>
  );
};
