import React from 'react';
import { AbsoluteFill, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { Audio } from '@remotion/media';
import { HOUSE, RESOLVE, TRAVEL, clamp, mix, prog, settle } from '../lib/ease';
import { T, rec } from '../lib/theme';
import { Flash, Grain, Vignette } from '../lib/Frame';
import { resolveText } from '../lib/decode';
import grid from '../data/grid_highlight.json';

/**
 * HOPE ATINA — the thread.
 * Hope's own voice opens it ("I'm less about talk and more about action.",
 * Figma Config 2021) over the textural runway of his own track, UBEAT V1.
 * On the entrance the thread wipes into eight worlds, one bar each, OrgX two:
 * the actual project films, cut at their turns. A recap grid lights all eight
 * on the beat, the thread stitching them, and the name lands on the final hit.
 */
export const HIGHLIGHT_DUR = 1758;
const DB = grid.downbeats.map(Math.round);
const beat = grid.beatF;
const LIME = T.signal;

type Shot = { id: string; label: string; accent: string; drop: number; from: number; to: number };
const SHOTS: Shot[] = [
  { id: 'OrgX', label: '01 · OrgX · proof for AI-delivered work', accent: '#0ad4c4', drop: 424, from: DB[0], to: DB[2] },
  { id: 'Alma', label: '02 · Alma · clinical production systems', accent: '#48c7ff', drop: 330, from: DB[2], to: DB[3] },
  { id: 'PerfPulse', label: '03 · Perf Pulse · developer tooling', accent: '#b7f34a', drop: 487, from: DB[3], to: DB[4] },
  { id: 'OpenClaw', label: '04 · OrgX × OpenClaw · continuity plugin', accent: '#ff4f40', drop: 302, from: DB[4], to: DB[5] },
  { id: 'BrainBuffet', label: '05 · BrainBuffet · learning product', accent: '#9b7bff', drop: 307, from: DB[5], to: DB[6] },
  { id: 'Neuromosaic', label: '06 · Neuromosaic · research infrastructure', accent: '#8f6bff', drop: 380, from: DB[6], to: DB[7] },
  { id: 'ChaosRiders', label: '07 · Chaos Riders · game world', accent: '#ffb02e', drop: 302, from: DB[7], to: DB[8] },
  { id: 'Meridian', label: '08 · Meridian · decision interfaces', accent: '#3ee6b4', drop: 490, from: DB[8], to: DB[9] },
];
const RECAP = [DB[9], DB[11]] as const;
const END = DB[11];
const BUTTON = Math.round(grid.button);
const VOICE = "I'm less about talk and more about action.";

/** The wipe edge: a lime thread crossing the frame, revealing the next world. */
const Thread: React.FC<{ t: number; color: string }> = ({ t, color }) =>
  t <= 0 || t >= 1 ? null : (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${t * 100}%`, width: 4, background: color, boxShadow: `0 0 30px ${color}, 0 0 80px ${color}` }} />
  );

export const Highlight: React.FC = () => {
  const f = useCurrentFrame();
  const introLine = HOUSE(prog(f, 20, 200));
  const recapOn = f >= RECAP[0] && f < RECAP[1] + 24;
  const endT = HOUSE(prog(f, END, END + 26));
  const nameT = HOUSE(prog(f, END + 6, END + 40));
  const credT = HOUSE(prog(f, BUTTON, BUTTON + 30));
  return (
    <AbsoluteFill style={{ background: T.carbon, overflow: 'hidden' }}>
      {/* intro: the voice, captioned for sound-off, the thread drawing in */}
      {f < DB[0] + 16 ? (
        <AbsoluteFill>
          <div style={{ position: 'absolute', left: 160, top: 150, ...rec(1, 0, 600), fontSize: 22, letterSpacing: '0.22em', color: LIME, opacity: HOUSE(prog(f, 10, 30)) }}>HOPE ATINA · SELECTED WORK · 2026</div>
          <div style={{ position: 'absolute', left: 0, top: 538, width: 1920 * introLine, height: 4, background: LIME, boxShadow: `0 0 24px ${LIME}` }} />
          <div style={{ position: 'absolute', left: 160, top: 600, width: 1600, fontFamily: T.serif, fontStyle: 'italic', fontSize: 84, color: T.mineral, lineHeight: 1.1 }}>
            {VOICE.split(' ').map((w, i) => (
              <span key={i} style={{ opacity: HOUSE(prog(f, 26 + i * 23, 34 + i * 23)) }}>{i === 0 ? '“' : ''}{w}{i === VOICE.split(' ').length - 1 ? '”' : ''} </span>
            ))}
          </div>
          <div style={{ position: 'absolute', left: 160, top: 720, ...rec(1, 0, 450), fontSize: 20, letterSpacing: '0.16em', color: T.mineral3, opacity: HOUSE(prog(f, 210, 236)) }}>HOPE ATINA · FIGMA CONFIG 2021</div>
        </AbsoluteFill>
      ) : null}
      {/* eight worlds, one bar each */}
      {SHOTS.map((s) => {
        if (f < s.from - 1 || f >= s.to + 16) return null;
        const wipe = TRAVEL(prog(f, s.from, s.from + 16));
        return (
          <AbsoluteFill key={s.id} style={{ clipPath: `inset(0 ${(1 - wipe) * 100}% 0 0)` }}>
            <Sequence from={s.from} layout="none">
              <OffthreadVideo src={staticFile(`clips/${s.id}.mp4`)} startFrom={Math.max(0, s.drop - 16)} muted style={{ width: 1920, height: 1080 }} />
            </Sequence>
            <div style={{ position: 'absolute', left: 60, bottom: 50, padding: '10px 18px', background: 'rgba(8,8,6,0.78)', ...rec(1, 0, 600), fontSize: 22, letterSpacing: '0.1em', color: s.accent, opacity: HOUSE(prog(f, s.from + 10, s.from + 24)) }}>{s.label.toUpperCase()}</div>
          </AbsoluteFill>
        );
      })}
      {SHOTS.map((s) => <Thread key={s.id} t={TRAVEL(prog(f, s.from, s.from + 16))} color={s.accent} />)}
      {/* recap: all eight light up on the beat, stitched by the thread */}
      {recapOn ? (
        <AbsoluteFill style={{ background: T.carbon, opacity: HOUSE(prog(f, RECAP[0], RECAP[0] + 12)) * (1 - HOUSE(prog(f, RECAP[1], RECAP[1] + 24))) }}>
          {SHOTS.map((s, i) => {
            const on = RECAP[0] + Math.round(i * beat);
            const a = settle(prog(f, on, on + 12), 0.9);
            const col = i % 4;
            const row = Math.floor(i / 4);
            const x = 110 + col * 432;
            const y = 300 + row * 300;
            return (
              <div key={s.id} style={{ position: 'absolute', left: x, top: y, width: 400, height: 225, opacity: clamp(a), transform: `scale(${mix(0.85, 1, a)})`, border: `2px solid ${s.accent}`, overflow: 'hidden' }}>
                {f >= on ? (
                  <Sequence from={on} layout="none">
                    <OffthreadVideo src={staticFile(`clips/${s.id}.mp4`)} startFrom={s.drop + 40} muted style={{ width: 400, height: 225 }} />
                  </Sequence>
                ) : null}
              </div>
            );
          })}
          <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
            <path d={SHOTS.map((_, i) => { const x = 110 + (i % 4) * 432 + 200; const y = 300 + Math.floor(i / 4) * 300 + 112; return `${i ? 'L' : 'M'}${x} ${y}`; }).join(' ')} stroke={LIME} strokeWidth={3} fill="none" pathLength={1} strokeDasharray={`${RESOLVE(prog(f, RECAP[0], RECAP[0] + 8 * beat))} 1`} opacity={0.8} />
          </svg>
          <div style={{ position: 'absolute', left: 110, top: 220, ...rec(1, 0, 600), fontSize: 22, letterSpacing: '0.2em', color: T.mineral3 }}>CLINICAL SOFTWARE · DATA PLATFORMS · AI AGENTS · GAME WORLDS</div>
        </AbsoluteFill>
      ) : null}
      {/* the name, on the final hit */}
      {f >= END ? (
        <AbsoluteFill style={{ opacity: endT }}>
          <div style={{ position: 'absolute', left: 0, top: 538, width: 1920 * HOUSE(prog(f, END, END + 30)), height: 4, background: LIME, boxShadow: `0 0 24px ${LIME}` }} />
          <div style={{ position: 'absolute', left: 160, top: 300, fontFamily: T.serif, fontSize: 200, lineHeight: 0.95, letterSpacing: '-0.02em', color: T.mineral, clipPath: `inset(0 ${(1 - nameT) * 100}% -20% 0)` }}>Hope Atina</div>
          <div style={{ position: 'absolute', left: 160, top: 580, ...rec(0.2, 0.4, 440), fontSize: 42, color: T.mineral2 }}>Engineer, founder, product thinker. Also made the beat.</div>
          <div style={{ position: 'absolute', left: 160, bottom: 120, display: 'flex', gap: 36, ...rec(1, 0, 500), fontSize: 22, letterSpacing: '0.14em', color: T.mineral3, opacity: credT }}>
            <span style={{ color: LIME }}>HOPEATINA.COM</span>
            <span>SCORE: “UBEAT V1” BY HOPE ATINA</span>
            <span>FILMS BUILT IN CODE WITH CLAUDE OPUS 5.5</span>
          </div>
        </AbsoluteFill>
      ) : null}
      <Flash a={f >= DB[0] ? 0.12 * Math.exp(-(f - DB[0]) / 6) : 0} color="183,243,74" />
      <Flash a={f >= BUTTON ? 0.1 * Math.exp(-(f - BUTTON) / 8) : 0} />
      <Vignette />
      <Grain />
      <Audio src={staticFile('audio/highlight.wav')} />
    </AbsoluteFill>
  );
};
