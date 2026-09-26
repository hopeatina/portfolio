import React from 'react';
import { AbsoluteFill, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { Audio } from '@remotion/media';
import { HOUSE, RESOLVE, mix, prog } from '../lib/ease';
import { T, rec } from '../lib/theme';
import { Flash, Grain, Vignette } from '../lib/Frame';
import { resolveText } from '../lib/decode';
import { Cam, Key, Vec3, X, Y, keyedCamera, project, spinAbout, v3, vadd, vscale } from '../lib/space';
import { Blur, Plane, polyline } from '../lib/World';
import cues from '../data/cues_highlight.json';

/**
 * HOPE ATINA v2: the thread.
 * One world, one camera, one line. Hope's own voice opens it ("I'm less about
 * talk and more about action.", Figma Config 2021) over the runway of his own
 * track, UBEAT V1, while a lime thread draws itself out of the dark. On the
 * entrance a bead of light runs down the thread into the first of eight
 * screens hung on it, each playing its project film at the turn; on every
 * downbeat the camera follows the bead to the next world (OrgX gets two
 * bars). Then the camera pulls back: all eight worlds on one thread, lighting
 * in order, each showing its title. The name lands on the final hit.
 * Rewatch: every film has its own version of the thread (Alma's rail, Perf
 * Pulse's waterline, OpenClaw's bridge, BrainBuffet's tray, Neuromosaic's
 * threads, Chaos Riders' golden line, Meridian's slices).
 */
export const HIGHLIGHT_DUR = 1758;
const C = cues.cue;
const LIME = T.signal;
const VOICE = ["I'm", 'less', 'about', 'talk', 'and', 'more', 'about', 'action.'];

type Shot = { id: string; label: string; accent: string; from: number; to: number; start: number };
const A = C.arrive;
const SHOTS: Shot[] = [
  { id: 'OrgX', label: '01 · OrgX · proof for AI-delivered work', accent: '#0ad4c4', from: A[0], to: A[1], start: 380 },
  { id: 'Alma', label: '02 · Alma · clinical production systems', accent: '#48c7ff', from: A[1], to: A[2], start: 392 },
  { id: 'PerfPulse', label: '03 · Perf Pulse · developer tooling', accent: '#b7f34a', from: A[2], to: A[3], start: 412 },
  { id: 'OpenClaw', label: '04 · OrgX × OpenClaw · continuity plugin', accent: '#ff4f40', from: A[3], to: A[4], start: 364 },
  { id: 'BrainBuffet', label: '05 · BrainBuffet · learning product', accent: '#9b7bff', from: A[4], to: A[5], start: 414 },
  { id: 'Neuromosaic', label: '06 · Neuromosaic · research infrastructure', accent: '#8f6bff', from: A[5], to: A[6], start: 378 },
  { id: 'ChaosRiders', label: '07 · Chaos Riders · game world', accent: '#ffb02e', from: A[6], to: A[7], start: 384 },
  { id: 'Meridian', label: '08 · Meridian · decision interfaces', accent: '#3ee6b4', from: A[7], to: C.recap, start: 398 },
];
const SW = 1920;
const SH = 1080;
const SPACING = 2700;
const yawOf = (i: number) => (i % 2 ? -1 : 1) * 0.2;
const posOf = (i: number): Vec3 => v3(i * SPACING, Math.sin(i * 1.1) * 420, -(i % 2) * 700);
const axisOf = (i: number) => spinAbout(X, Y, yawOf(i));
const edge = (i: number, side: -1 | 1) => vadd(posOf(i), vscale(axisOf(i), (side * SW) / 2));
const START = v3(-4200, -200, 400);

// the thread: out of the dark, then from each screen's right edge to the next one's left, sagging between
const threadPts = (): Vec3[] => {
  const pts: Vec3[] = [];
  const seg = (a: Vec3, b: Vec3, sag: number) => {
    for (let s = 0; s <= 20; s++) {
      const u = s / 20;
      pts.push(v3(mix(a.x, b.x, u), mix(a.y, b.y, u) + Math.sin(Math.PI * u) * sag, mix(a.z, b.z, u)));
    }
  };
  seg(START, edge(0, -1), 380);
  for (let i = 0; i < SHOTS.length; i++) {
    seg(edge(i, -1), edge(i, 1), 0);
    if (i < SHOTS.length - 1) seg(edge(i, 1), edge(i + 1, -1), 300);
  }
  return pts;
};
const THREAD = threadPts();

const KEYS: Key[] = [[0, START.x + 900, START.y - 80, START.z, 1500, 0, 0, 0], [C.entrance - 60, START.x + 2200, START.y, START.z - 100, 1700, 8, 2, 0]];
SHOTS.forEach((s, i) => {
  const p = posOf(i);
  const yaw = (yawOf(i) * 180) / Math.PI;
  KEYS.push([s.from + 6, p.x, p.y, p.z, 1080, yaw, 0, 0]);
  KEYS.push([s.to - 20, p.x, p.y, p.z, 1010, yaw, 0, 0]);
});
const MID = v3(((SHOTS.length - 1) * SPACING) / 2, 0, -350);
KEYS.push([C.recap + 44, MID.x - 600, MID.y - 420, MID.z, 5200, 50, 2, 0]); // down the thread, three-quarter
KEYS.push([C.name, MID.x + 300, MID.y - 420, MID.z, 5600, 44, 2, 0]);
KEYS.push([HIGHLIGHT_DUR, MID.x + 600, MID.y - 420, MID.z, 6200, 40, 3, 0]);
const CAM = keyedCamera(KEYS, [{ frames: [C.entrance, ...A.slice(1)], tau: 5, punch: 0.02, px: 4 }]);

/** the bead: where the light is on the thread (0..1 of its length), riding it between screens */
const beadU = (f: number) => {
  const n = THREAD.length - 1;
  const segStart = (i: number) => (21 + i * 42) / n; // index of screen i's left edge
  if (f < C.entrance) return mix(0, segStart(0), HOUSE(prog(f, 120, C.entrance)));
  for (let i = SHOTS.length - 1; i >= 0; i--) {
    if (f >= SHOTS[i].from) {
      const here = mix(segStart(i), segStart(i) + 20 / n, 0.5);
      if (i === SHOTS.length - 1 || f < SHOTS[i + 1].from - 26) return here;
      return mix(here, mix(segStart(i + 1), segStart(i + 1) + 20 / n, 0.5), HOUSE(prog(f, SHOTS[i + 1].from - 26, SHOTS[i + 1].from + 4)));
    }
  }
  return 0;
};

const World: React.FC<{ f: number; cam: Cam }> = ({ f, cam }) => {
  const drawn = f < C.entrance ? HOUSE(prog(f, 60, C.entrance)) : 1;
  const n = THREAD.length;
  const upto = f < C.entrance ? Math.floor(beadU(f) * (n - 1)) + 1 : n;
  const pts = THREAD.slice(0, Math.max(2, upto)).map((p) => project(cam, p)).filter((p) => p.d > 40);
  const bu = beadU(f) * (n - 1);
  const bi = Math.floor(bu);
  const bp = THREAD[Math.min(n - 1, bi)];
  const bq = THREAD[Math.min(n - 1, bi + 1)];
  const bead = project(cam, v3(mix(bp.x, bq.x, bu - bi), mix(bp.y, bq.y, bu - bi), mix(bp.z, bq.z, bu - bi)));
  const recapT = HOUSE(prog(f, C.recap, C.recap + 40));
  const nameDim = HOUSE(prog(f, C.name - 10, C.name + 30));
  return (
    <>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0, zIndex: 1, overflow: 'visible' }}>
        <defs>
          <filter id="hglow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={10} />
          </filter>
        </defs>
        {pts.length > 1 ? (
          <>
            <path d={polyline(pts)} stroke={LIME} strokeWidth={12} fill="none" opacity={0.35 * drawn} filter="url(#hglow)" />
            <path d={polyline(pts)} stroke={LIME} strokeWidth={3.5} fill="none" opacity={drawn} />
          </>
        ) : null}
      </svg>
      {SHOTS.map((s, i) => {
        const p = posOf(i);
        const inBar = f >= s.from - 40 && f < s.to + 30;
        const inRecap = f >= C.recap - 10;
        const lit = inRecap ? HOUSE(prog(f, C.recapLights[i] - 4, C.recapLights[i] + 10)) : 1;
        const on = inBar || inRecap;
        return (
          <Plane key={s.id} cam={cam} c={p} U={axisOf(i)} V={Y} w={SW} h={SH} z={1000}>
            <div style={{ position: 'absolute', inset: 0, background: '#050506', boxShadow: `0 0 0 6px ${s.accent}, 0 0 ${inRecap ? 160 * lit : 90}px ${s.accent}55`, opacity: inRecap ? mix(0.55, 1, lit) * (1 - 0.7 * nameDim) : 1 }}>
              {on && !inRecap ? (
                <Sequence from={s.from - 40} durationInFrames={s.to - s.from + 70} layout="none">
                  <OffthreadVideo src={staticFile(`clips/${s.id}.mp4`)} startFrom={s.start - 40} muted style={{ width: SW, height: SH }} />
                </Sequence>
              ) : null}
              {inRecap ? (
                <Sequence from={C.recap - 10} durationInFrames={HIGHLIGHT_DUR - C.recap + 10} layout="none">
                  <OffthreadVideo src={staticFile(`clips/${s.id}.mp4`)} startFrom={700} endAt={900} playbackRate={0.42} muted style={{ width: SW, height: SH }} />
                </Sequence>
              ) : null}
            </div>
            <div style={{ position: 'absolute', left: 0, top: SH + 34, ...rec(1, 0, 650), fontSize: 64, letterSpacing: '0.1em', color: s.accent, whiteSpace: 'nowrap', opacity: inRecap ? recapT * (1 - nameDim) : 0 }}>{s.label.toUpperCase()}</div>
          </Plane>
        );
      })}
      {bead.d > 40 && f < C.recap && (f < C.entrance + 6 || A.slice(1).some((a) => f >= a - 30 && f < a + 8)) ? (
        <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0, zIndex: 400000, overflow: 'visible', pointerEvents: 'none' }}>
          <circle cx={bead.sx} cy={bead.sy} r={Math.max(6, 22 * bead.s)} fill={LIME} filter="url(#hglow)" opacity={0.9} />
          <circle cx={bead.sx} cy={bead.sy} r={Math.max(3, 8 * bead.s)} fill="#f7ffe6" />
        </svg>
      ) : null}
    </>
  );
};

export const Highlight: React.FC = () => {
  const f = useCurrentFrame();
  const cam = CAM.at(f);
  const introOut = HOUSE(prog(f, C.entrance - 24, C.entrance));
  const shot = SHOTS.find((s) => f >= s.from && f < s.to);
  const labelT = shot ? HOUSE(prog(f, shot.from + 8, shot.from + 22)) * (1 - HOUSE(prog(f, shot.to - 24, shot.to - 12))) : 0;
  const nameT = HOUSE(prog(f, C.name + 6, C.name + 40));
  const endT = HOUSE(prog(f, C.name, C.name + 26));
  const credT = HOUSE(prog(f, C.button, C.button + 30));
  const moving = A.map((a): [number, number, number] => [a - 26, a + 6, 8]);
  return (
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 45%, #0b0c0a, #030303 75%)', overflow: 'hidden' }}>
      <Blur ranges={[...moving, [C.recap - 4, C.recap + 44, 8]]}>
        <AbsoluteFill>
          <World f={f} cam={cam} />
        </AbsoluteFill>
      </Blur>
      {/* the voice, captioned for sound-off */}
      {f < C.entrance + 4 ? (
        <AbsoluteFill style={{ opacity: 1 - introOut }}>
          <div style={{ position: 'absolute', left: 160, top: 160, ...rec(1, 0, 600), fontSize: 22, letterSpacing: '0.22em', color: LIME, opacity: 1 }}>HOPE ATINA · SELECTED WORK · 2026</div>
          <div style={{ position: 'absolute', left: 160, top: 640, width: 1600, fontFamily: T.serif, fontStyle: 'italic', fontSize: 92, color: T.mineral, lineHeight: 1.1 }}>
            {VOICE.map((w, i) => {
              const t = HOUSE(prog(f, C.words[i] - 2, C.words[i] + 8));
              return (
                <span key={i} style={{ display: 'inline-block', marginRight: 26, opacity: mix(0.16, 1, t), transform: `translateY(${(1 - t) * 10}px)`, textShadow: t > 0.5 ? '0 0 30px rgba(183,243,74,0.15)' : 'none' }}>
                  {i === 0 ? '“' : ''}
                  {w}
                  {i === VOICE.length - 1 ? '”' : ''}
                </span>
              );
            })}
          </div>
          <div style={{ position: 'absolute', left: 160, top: 770, ...rec(1, 0, 450), fontSize: 20, letterSpacing: '0.16em', color: T.mineral3, opacity: HOUSE(prog(f, 200, 226)) }}>HOPE ATINA · FIGMA CONFIG 2021</div>
        </AbsoluteFill>
      ) : null}
      {shot ? (
        <div style={{ position: 'absolute', left: 64, bottom: 54, padding: '10px 18px', background: 'rgba(8,8,6,0.8)', ...rec(1, 0, 600), fontSize: 22, letterSpacing: '0.1em', color: shot.accent, opacity: labelT }}>{shot.label.toUpperCase()}</div>
      ) : null}
      {f >= C.recap + 30 && f < C.name ? (
        <div style={{ position: 'absolute', left: 120, top: 96, ...rec(1, 0, 600), fontSize: 22, letterSpacing: '0.2em', color: T.mineral3, opacity: HOUSE(prog(f, C.recap + 30, C.recap + 50)) * (1 - HOUSE(prog(f, C.name - 16, C.name))) }}>CLINICAL SOFTWARE · DATA PLATFORMS · AI AGENTS · GAME WORLDS</div>
      ) : null}
      {/* the name, on the final hit */}
      {f >= C.name ? (
        <AbsoluteFill style={{ opacity: endT }}>
          <div style={{ position: 'absolute', left: 0, top: 538, width: 1920 * HOUSE(prog(f, C.name, C.name + 30)), height: 4, background: LIME, boxShadow: `0 0 24px ${LIME}` }} />
          <div style={{ position: 'absolute', left: 160, top: 300, fontFamily: T.serif, fontSize: 200, lineHeight: 0.95, letterSpacing: '-0.02em', color: T.mineral, clipPath: `inset(0 ${(1 - nameT) * 100}% -20% 0)` }}>Hope Atina</div>
          <div style={{ position: 'absolute', left: 160, top: 580, ...rec(0.2, 0.4, 440), fontSize: 42, color: T.mineral2, whiteSpace: 'pre' }}>{resolveText(''.padEnd(55, ' '), 'Engineer, founder, product thinker. Also made the beat.', RESOLVE(prog(f, C.name + 20, C.name + 60)), 'hname', f)}</div>
          <div style={{ position: 'absolute', left: 160, bottom: 120, display: 'flex', gap: 36, ...rec(1, 0, 500), fontSize: 22, letterSpacing: '0.14em', color: T.mineral3, opacity: credT }}>
            <span style={{ color: LIME }}>HOPEATINA.COM</span>
            <span>SCORE: “UBEAT V1” BY HOPE ATINA</span>
            <span>FILMS BUILT IN CODE WITH CLAUDE OPUS 5.5</span>
          </div>
        </AbsoluteFill>
      ) : null}
      <Flash a={f >= C.entrance ? 0.12 * Math.exp(-(f - C.entrance) / 6) : 0} color="183,243,74" />
      <Flash a={f >= C.button ? 0.1 * Math.exp(-(f - C.button) / 8) : 0} />
      <Vignette s={0.62} />
      <Grain />
      <Audio src={staticFile('audio/highlight_mix.wav')} />
    </AbsoluteFill>
  );
};

