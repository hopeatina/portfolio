import React from 'react';
import { AbsoluteFill, Img, random, staticFile, useCurrentFrame } from 'remotion';
import { Audio } from '@remotion/media';
import { HOUSE, TRAVEL, clamp, mix, prog } from '../lib/ease';
import { GRIDS } from '../lib/grid';
import { rec } from '../lib/theme';
import { Flash, Grain, Vignette } from '../lib/Frame';
import { Cam, Key, X, Z, edit, v3 } from '../lib/space';
import { Blur, Box, DofCtx, Fog, Plane } from '../lib/World';
import { Dust, Glow, Grade, Letterbox, ramp } from '../lib/Env';
import { BrandEnd } from '../lib/BrandEnd';
import cues from '../data/cues_chaosriders.json';

/**
 * CHAOS RIDERS v3: "Read the road."
 * Golden hour in Yaoundé, and car-chase grammar. Frame 0 is the concept art
 * (labelled: the visual target), pushing in on the taxi. Match cut: the same
 * taxi, same framing, now a real 3D car on a red-dirt road through the market.
 * The driver fights the road: a low front tracking shot, a side track with
 * stalls whipping past, a bumper cam, Dutch-angle impacts on the snares. Time
 * slows into the drop as a golden line shimmers onto the road; on the drop it
 * snaps to full speed: FLOW, every pothole read and missed, a drone shot of the
 * line threading the field. Then the HUD match-cuts into the captured, playable
 * browser prototype (target and build always labelled). The golden line in the
 * concept art is the gameplay line; the taxi's plate is the concept art's.
 */
const g = GRIDS.chaosriders;
const C = cues.cue;
const D = C.drop;
const GOLD = '#ffb02e';
const SUN = '#ffcf6a';
const FOG: Fog = { near: 3000, far: 14000 };
const Z0 = -2600;
const ART = v3(0, -420, -1600);

// world time: slow motion into the drop, then the snap
const worldT = (f: number) => ramp(f, C.slow, D, 0.35);
const travelled = (t: number) => {
  let d = 0;
  for (let k = C.match; k < Math.min(t, C.proto + 30); k++) d += k < D - 20 ? 36 : k < D ? 36 : k < D + 10 ? mix(36, 66, (k - D) / 10) : 66;
  return d;
};
const zT = (f: number) => Z0 - travelled(worldT(f));
const line = (z: number) => 230 * Math.sin((z - Z0) * 0.0011);
const bumpAt = (f: number) => C.bumps.reduce((a, b) => a + (f >= b ? Math.exp(-(f - b) / 5) * Math.sin((f - b) * 1.1) : 0), 0);
const xT = (f: number) => {
  if (f < D) {
    const k = C.bumps.reduce((a, b, i) => a + (f >= b ? (i % 2 ? -1 : 1) * 160 * Math.exp(-(f - b) / 22) * Math.cos((f - b) * 0.16) : 0), 0);
    return 60 * Math.sin(worldT(f) * 0.05) + k;
  }
  return mix(60 * Math.sin(worldT(D) * 0.05), line(zT(f) - 300), HOUSE(prog(f, D, D + 20)));
};
const HOLES = [
  ...C.bumps.map((b) => ({ z: zT(b) - 120, x: xT(b) + 20, r: 1 })),
  ...new Array(30).fill(0).map((_, i) => ({ z: zT(C.match) - 2200 - i * 900 - random(`hz${i}`) * 400, x: (random(`hx${i}`) - 0.5) * 760, r: 0.7 + random(`hr${i}`) * 0.6 })),
  ...C.dodges.map((d, i) => ({ z: zT(d) - 140, x: line(zT(d) - 140) + (i % 2 ? 230 : -230), r: 1.2 })),
];
const UMB = ['#e63946', '#f4a261', '#2a9d8f', '#e9c46a', '#457b9d', '#9d4edd'];

// shots: keys relative to the taxi (added below), except the concept art
const rel = (from: number, keys: Key[], extra: object = {}) => ({ name: 'rel', from, keys, ...extra });
const EDIT = edit([
  { name: 'art', from: 0, keys: [[0, 0, -420, -1600, 1500, 0, 0, 0, 18], [C.match, 0, -470, -1600, 820, 0, 0, 0, 18]] },
  { ...rel(C.match, [[C.match, 0, -120, 0, 900, 160, 4, 0, 35], [C.bumps[0], 0, -120, 0, 820, 166, 5, 0, 35]], { hand: { px: 5, roll: 0.5 } }), name: 'front' },
  { ...rel(C.cuts[0], [[C.cuts[0], 0, -110, 0, 820, 92, 2, 0, 35], [C.cuts[1], 0, -110, 0, 760, 86, 2, 0, 35]], { hand: { px: 6, roll: 0.6 }, kicks: [{ frames: [C.bumps[0]], tau: 4, punch: 0.03, px: 18 }] }), name: 'side' },
  { ...rel(C.cuts[1], [[C.cuts[1], 0, -70, 0, 560, 0, 3, 0, 24], [C.cuts[2], 0, -70, 0, 520, 0, 3, 0, 24]], { hand: { px: 8, roll: 0.4 } }), name: 'bumper' },
  { ...rel(C.cuts[2], [[C.cuts[2], 0, -120, 0, 760, -32, 10, 12, 35], [C.cuts[3], 0, -120, 0, 720, -26, 9, 10, 35]], { kicks: [{ frames: [C.bumps[1]], tau: 4, punch: 0.04, px: 24 }] }), name: 'impact' },
  { ...rel(C.cuts[3], [[C.cuts[3], 0, -60, 250, 620, 24, 2, -6, 24], [C.cuts[4], 0, -60, 250, 580, 20, 2, -6, 24]], { kicks: [{ frames: [C.bumps[2]], tau: 3, punch: 0.04, px: 20 }] }), name: 'wheel' },
  { ...rel(C.cuts[4], [[C.cuts[4], 0, -120, 0, 900, 8, 6, -8, 35], [C.slow, 0, -120, 0, 880, 6, 6, -6, 35]], { kicks: [{ frames: [C.bumps[3]], tau: 4, punch: 0.04, px: 20 }] }), name: 'rear' },
  { ...rel(C.slow, [[C.slow, 0, -120, 0, 900, 6, 6, 0, 35], [D, 0, -150, -500, 1250, -8, 16, 0, 35]]), name: 'rise' },
  { ...rel(D, [[D, 0, -150, -500, 1250, -10, 17, 0, 35], [C.drone, 0, -150, -500, 1300, -8, 16, 0, 35]], { kicks: [{ frames: [D], tau: 6, punch: 0.06, px: 12 }] }), name: 'flow' },
  { ...rel(C.drone, [[C.drone, 0, 0, -700, 3000, 0, 86, 0, 24], [C.side, 0, 0, -900, 3300, 0, 86, 0, 24]]), name: 'drone' },
  { ...rel(C.side, [[C.side, 0, -110, 0, 950, -78, 3, 0, 35], [C.proto, 0, -110, 0, 900, -84, 3, 0, 35]], { hand: { px: 5, roll: 0.4 }, kicks: [{ frames: C.dodges.slice(4), tau: 4, punch: 0.01, px: 6 }] }), name: 'side2' },
  { ...rel(C.proto, [[C.proto, 0, -150, -500, 1250, 0, 12, 0, 35], [C.end, 0, -150, -500, 1300, 0, 12, 0, 35]]), name: 'hud' },
]);
const camAt = (f: number) => {
  const { cam, shot, focus } = EDIT.at(f);
  if (shot.name === 'art') return { cam, shot, focus };
  return { cam: { ...cam, x: cam.x + xT(f) * 0.6, z: cam.z + zT(f) } as Cam, shot, focus };
};

const Taxi: React.FC<{ cam: Cam; f: number }> = ({ cam, f }) => {
  const x = xT(f);
  const z = zT(f);
  const b = bumpAt(f) * 26;
  const rear = (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', left: 20, right: 20, top: 16, height: 14, background: '#2a6fb0' }} />
      <div style={{ position: 'absolute', left: 16, top: 38, width: 46, height: 22, borderRadius: 4, background: '#ff3b2a', boxShadow: '0 0 24px #ff3b2a' }} />
      <div style={{ position: 'absolute', right: 16, top: 38, width: 46, height: 22, borderRadius: 4, background: '#ff3b2a', boxShadow: '0 0 24px #ff3b2a' }} />
      <div style={{ position: 'absolute', left: '50%', top: 36, transform: 'translateX(-50%)', padding: '2px 8px', background: '#f2efe4', ...rec(1, 0, 800), fontSize: 18, color: '#111', whiteSpace: 'nowrap' }}>04 12 81</div>
    </div>
  );
  const front = (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', left: 30, right: 30, top: 18, height: 30, background: 'repeating-linear-gradient(90deg, #2b2b2b 0 8px, #555 8px 12px)' }} />
      <div style={{ position: 'absolute', left: 12, top: 20, width: 40, height: 30, borderRadius: 8, background: '#fff6d8', boxShadow: '0 0 40px 10px rgba(255,240,190,0.7)' }} />
      <div style={{ position: 'absolute', right: 12, top: 20, width: 40, height: 30, borderRadius: 8, background: '#fff6d8', boxShadow: '0 0 40px 10px rgba(255,240,190,0.7)' }} />
      <div style={{ position: 'absolute', left: '50%', top: 56, transform: 'translateX(-50%)', padding: '2px 8px', background: '#f2efe4', ...rec(1, 0, 800), fontSize: 18, color: '#111', whiteSpace: 'nowrap' }}>04 12 81</div>
    </div>
  );
  const hood = <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 40%, #2a6fb0 40% 60%, transparent 60%)' }} />;
  return (
    <>
      <Box cam={cam} c={v3(x, -82 - b, z)} size={[300, 96, 560]} color="#e2b93b" fog={FOG} face={rear} back={front} top={hood} edge="rgba(0,0,0,0.25)" />
      <Box cam={cam} c={v3(x, -164 - b, z + 30)} size={[250, 72, 290]} color="#cfa42f" fog={FOG} face={<div style={{ position: 'absolute', inset: 8, background: 'rgba(20,30,40,0.85)' }} />} back={<div style={{ position: 'absolute', inset: 8, background: 'linear-gradient(180deg, rgba(255,210,150,0.5), rgba(20,30,40,0.85))' }} />} edge="rgba(0,0,0,0.25)" />
      <Box cam={cam} c={v3(x, -214 - b, z + 30)} size={[120, 30, 60]} color="#f2efe4" fog={FOG} face={<div style={{ ...rec(1, 0, 800), fontSize: 20, textAlign: 'center', color: '#111', lineHeight: '30px' }}>TAXI</div>} back={<div style={{ ...rec(1, 0, 800), fontSize: 20, textAlign: 'center', color: '#111', lineHeight: '30px' }}>TAXI</div>} />
      {[-1, 1].map((sx) => [-1, 1].map((sz) => <Box key={`${sx}${sz}`} cam={cam} c={v3(x + sx * 150, -40, z + sz * 190)} size={[46, 80, 80]} color="#141414" fog={FOG} edge="rgba(0,0,0,0.3)" />))}
    </>
  );
};

const Stall: React.FC<{ cam: Cam; x: number; z: number; i: number }> = ({ cam, x, z, i }) => {
  const col = UMB[i % UMB.length];
  const h = 180 + (i % 3) * 40;
  return (
    <>
      <Box cam={cam} c={v3(x, -h / 2, z)} size={[300, h, 300]} color="#6b4428" fog={FOG} top={<div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(90deg, #e76f51 0 30px, #f4a261 30px 60px, #8ab17d 60px 90px)' }} />} />
      <Box cam={cam} c={v3(x, -h - 160, z)} size={[12, 320, 12]} color="#3a2a1a" fog={FOG} />
      <Plane cam={cam} c={v3(x, -h - 320, z)} U={X} V={Z} w={440} h={440} fog={FOG}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: `repeating-conic-gradient(${col} 0 30deg, #fff4e0 30deg 60deg)`, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }} />
      </Plane>
      {i % 2 === 0 ? (
        <Plane cam={cam} c={v3(x + (x > 0 ? -210 : 210), -170, z + 40)} w={120} h={340} fog={FOG}>
          <svg width={120} height={340} viewBox="0 0 120 340">
            <circle cx={60} cy={40} r={28} fill="#2a1a10" />
            <path d="M20 90 Q60 60 100 90 L108 250 L12 250 Z" fill={UMB[(i + 2) % UMB.length]} opacity={0.9} />
            <rect x={30} y={250} width={22} height={90} fill="#2a1a10" />
            <rect x={68} y={250} width={22} height={90} fill="#2a1a10" />
          </svg>
        </Plane>
      ) : null}
    </>
  );
};

const Palm: React.FC<{ cam: Cam; x: number; z: number }> = ({ cam, x, z }) => (
  <Plane cam={cam} c={v3(x, -700, z)} w={700} h={1400} fog={FOG}>
    <svg width={700} height={1400} viewBox="0 0 700 1400">
      <path d="M350 1400 C340 1000 380 600 360 300" stroke="#5a3d22" strokeWidth={34} fill="none" />
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <path key={k} d={`M360 300 Q${200 + k * 60} ${140 + (k % 2) * 60} ${40 + k * 125} ${320 + (k % 3) * 40}`} stroke="#3f7a2c" strokeWidth={40} fill="none" strokeLinecap="round" />
      ))}
    </svg>
  </Plane>
);

const World: React.FC<{ f: number; cam: Cam }> = ({ f, cam }) => {
  const zt = zT(f);
  const seg = 900;
  const segs: number[] = [];
  for (let k = 0; k < 20; k++) {
    const zc = Math.floor((zt + 1800) / seg) * seg - k * seg - seg / 2;
    if (zc > -1700) continue;
    segs.push(zc);
  }
  const reveal = f < C.slow ? 0 : f < D ? 0.12 * prog(f, C.slow, D) : TRAVEL(prog(f, D - 2, D + 24));
  const gold: { x: number; z: number; a: number; b: number; o: number }[] = [];
  if (reveal > 0)
    for (let z = zt + 400; z > zt - 10000 * Math.max(0.08, reveal); z -= 160) {
      const dx = 230 * 0.0011 * Math.cos((z - Z0) * 0.0011) * -160;
      const l = Math.hypot(dx, 160);
      gold.push({ x: line(z - 80), z: z - 80, a: dx / l, b: -160 / l, o: f < D ? 0.35 + 0.35 * Math.sin(f / 3 + z / 300) : clamp((z - (zt - 10000 * reveal)) / 900) });
    }
  const artOn = f < C.match + 2;
  return (
    <>
      {/* sky, sun, the hills */}
      <Plane cam={cam} c={v3(0, -3200, zt - 14000)} w={30000} h={9000} z={-500000}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #6b3a1c 0%, #d9822b 40%, #ffcf6a 62%, #f3a64a 70%, #b8652a 100%)' }} />
      </Plane>
      <Plane cam={cam} c={v3(0, -1600, zt - 13000)} w={16000} h={4400} z={-490000}>
        <Img src={staticFile('img/bamenda-world.webp')} style={{ width: 16000, height: 4400, objectFit: 'cover', opacity: 0.55, mixBlendMode: 'multiply', filter: 'sepia(0.6) blur(4px)' }} />
      </Plane>
      {segs.map((zc) => (
        <React.Fragment key={zc}>
          <Plane cam={cam} c={v3(0, 0, zc)} U={X} V={Z} w={1300} h={seg + 4} z={-400000}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #7a3a18, #c46a32 18%, #d4783a 50%, #c46a32 82%, #7a3a18)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 30%, rgba(60,25,10,0.3) 34%, transparent 38%, transparent 62%, rgba(60,25,10,0.3) 66%, transparent 70%)' }} />
          </Plane>
          <Plane cam={cam} c={v3(-2200, 2, zc)} U={X} V={Z} w={3200} h={seg + 4} z={-410000}>
            <div style={{ position: 'absolute', inset: 0, background: '#8a4e26' }} />
          </Plane>
          <Plane cam={cam} c={v3(2200, 2, zc)} U={X} V={Z} w={3200} h={seg + 4} z={-410000}>
            <div style={{ position: 'absolute', inset: 0, background: '#8a4e26' }} />
          </Plane>
          {[-1, 1].map((side) => {
            const i = Math.abs(Math.round(zc / seg)) * 2 + (side > 0 ? 1 : 0);
            return <Stall key={side} cam={cam} x={side * (900 + (i % 2) * 90)} z={zc} i={i} />;
          })}
          {Math.abs(Math.round(zc / seg)) % 3 === 0 ? <Palm cam={cam} x={(Math.round(zc / seg) % 2 ? 1 : -1) * 1700} z={zc - 300} /> : null}
        </React.Fragment>
      ))}
      {HOLES.map((h, i) =>
        h.z < zt + 800 && h.z > zt - 12000 ? (
          <Plane key={i} cam={cam} c={v3(h.x, -1, h.z)} U={X} V={Z} w={140 * h.r} h={96 * h.r} z={-300000}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(ellipse, #2a1206 40%, #5a2a10 70%, transparent 72%)' }} />
          </Plane>
        ) : null
      )}
      {gold.map((gs, k) => (
        <Plane key={`g${k}`} cam={cam} c={v3(gs.x, -3, gs.z)} U={v3(gs.b, 0, -gs.a)} V={v3(gs.a, 0, gs.b)} w={36} h={172} z={-250000} opacity={gs.o}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: 18, background: '#fff0c2', boxShadow: `0 0 30px 12px ${GOLD}` }} />
        </Plane>
      ))}
      {artOn ? (
        <Plane cam={cam} c={ART} w={2400} h={1340} z={100000}>
          <Img src={staticFile('img/world-market.webp')} style={{ width: 2400, height: 1340 }} />
        </Plane>
      ) : (
        <Taxi cam={cam} f={f} />
      )}
    </>
  );
};

/** The prototype's own HUD, drawn where the real capture has it, so the cut to the capture is a match. */
const Hud: React.FC<{ f: number; a: number }> = ({ f, a }) => {
  const secs = 19.39 - (f - C.proto) / 60;
  return (
    <AbsoluteFill style={{ opacity: a, zIndex: 905000 }}>
      <div style={{ position: 'absolute', left: 58, top: 76, ...rec(1, 0, 600), fontSize: 18, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.8)' }}>TIME LEFT</div>
      <div style={{ position: 'absolute', left: 56, top: 100, ...rec(1, 0, 800), fontSize: 50, color: '#ffc21a', fontVariantNumeric: 'tabular-nums' }}>00:{secs.toFixed(2).padStart(5, '0')}</div>
      <div style={{ position: 'absolute', right: 60, bottom: 50, width: 150, height: 150, borderRadius: 75, border: '10px solid rgba(255,255,255,0.15)', borderTopColor: GOLD, borderRightColor: GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', ...rec(1, 0, 800), color: '#fff' }}>
        <span style={{ fontSize: 56, lineHeight: 1 }}>45</span>
        <span style={{ fontSize: 14, letterSpacing: '0.1em' }}>KM/H</span>
      </div>
    </AbsoluteFill>
  );
};

const Brand: React.FC<{ size: number }> = ({ size }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: size * 0.2 }}>
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx={50} cy={50} r={40} stroke={GOLD} strokeWidth={12} fill="none" />
      <path d="M30 72 L70 28" stroke={GOLD} strokeWidth={12} strokeLinecap="round" />
    </svg>
    <div style={{ fontFamily: 'system-ui, -apple-system, Helvetica Neue, sans-serif', fontWeight: 900, fontStyle: 'italic', fontSize: size * 0.72, letterSpacing: '-0.02em', color: '#ffc21a', lineHeight: 0.9 }}>CHAOS RIDERS</div>
  </div>
);

export const ChaosRiders: React.FC = () => {
  const f = useCurrentFrame();
  const { cam, shot, focus } = camAt(f);
  const dof = { focus, aperture: shot.name === 'art' ? 0 : shot.name === 'bumper' ? 0 : shot.name === 'drone' || shot.name === 'wheel' ? 0.15 : 0.4 };
  const slowT = f >= C.slow && f < D ? 1 : 0;
  const hudA = HOUSE(prog(f, C.proto, C.proto + 8));
  const capture = HOUSE(prog(f, C.proto + 12, C.proto + 22));
  const zoomOut = HOUSE(prog(f, C.proto + 24, C.end - 2));
  const sunX = shot.name === 'front' ? 1500 : shot.name === 'side' || shot.name === 'side2' ? 200 : 960;
  return (
    <AbsoluteFill style={{ background: '#d9822b', overflow: 'hidden' }}>
      <Blur ranges={[[C.match - 4, C.match + 6, 8], [C.cuts[0], C.cuts[1], 5, 180], [C.side, C.proto, 5, 160]]}>
        <DofCtx.Provider value={dof}>
          <AbsoluteFill style={{ isolation: 'isolate', filter: slowT ? 'saturate(1.25) contrast(1.05)' : undefined }}>
            <World f={f} cam={cam} />
          </AbsoluteFill>
        </DofCtx.Provider>
      </Blur>
      {shot.name !== 'art' && shot.name !== 'drone' ? (
        <>
          <Glow x={sunX} y={380} r={900} color="rgba(255,207,106,0.8)" a={0.65} />
          <div style={{ position: 'absolute', left: 0, right: 0, top: 360, height: 6, background: `linear-gradient(90deg, transparent, rgba(255,230,170,0.5) ${(sunX / 1920) * 100}%, transparent)`, filter: 'blur(3px)' }} />
          <Dust n={70} seed="cr" f={f} speed={slowT ? 0.6 : 3} color="rgba(255,210,150,0.9)" a={0.35} />
        </>
      ) : null}
      <Grade tint={SUN} a={0.2} />
      <Letterbox t={['front', 'side', 'impact', 'rise', 'side2', 'wheel', 'rear', 'bumper'].includes(shot.name) ? 1 : 0} />
      {/* the playable build: the HUD matches, then the real capture takes over */}
      {f >= C.proto ? <Hud f={f} a={hudA * (1 - capture)} /> : null}
      {capture > 0 ? (
        <AbsoluteFill style={{ opacity: capture, background: '#efeae0', zIndex: 906000 }}>
          <div style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transformOrigin: '50% 50%', transform: `scale(${mix(1, 0.8, zoomOut)})` }}>
            <Img src={staticFile('img/prototype-gameplay.png')} style={{ position: 'absolute', width: mix(2120, 1920 * 0.98, zoomOut), height: mix(1325, 1200 * 0.98, zoomOut), left: mix(-100, 0, zoomOut), top: mix(-171, -60, zoomOut) }} />
          </div>
          <div style={{ position: 'absolute', left: 120, bottom: 80, ...rec(1, 0, 700), fontSize: 22, letterSpacing: '0.16em', color: '#1a1a1a', background: GOLD, padding: '8px 14px', opacity: zoomOut }}>CAPTURED BROWSER PROTOTYPE · THREE.JS + REACT · PLAYABLE</div>
        </AbsoluteFill>
      ) : null}
      {f < C.match ? <div style={{ position: 'absolute', left: 120, bottom: 100, ...rec(1, 0, 700), fontSize: 20, letterSpacing: '0.2em', color: '#fff', background: 'rgba(8,8,6,0.6)', padding: '8px 14px', zIndex: 910000 }}>CONCEPT ART · THE VISUAL TARGET · YAOUNDÉ MARKET</div> : null}
      {f >= C.match && f < D ? <div style={{ position: 'absolute', left: 120, top: 120, fontFamily: 'Newsreader, Georgia, serif', fontStyle: 'italic', fontSize: 84, color: '#fff', textShadow: '0 4px 30px rgba(80,30,0,0.7)', zIndex: 910000, opacity: HOUSE(prog(f, C.match + 6, C.match + 20)) }}>{f < C.slow ? 'Read the road.' : 'Find the line.'}</div> : null}
      {f >= D && f < C.proto ? <div style={{ position: 'absolute', left: 120, top: 110, fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 900, fontStyle: 'italic', fontSize: 190, lineHeight: 0.9, color: '#ffc21a', letterSpacing: `${mix(-0.06, 0.08, HOUSE(prog(f, D, D + 12)))}em`, textShadow: '0 8px 40px rgba(120,40,0,0.6)', zIndex: 910000, opacity: 1 - HOUSE(prog(f, C.drone - 10, C.drone)) }}>FLOW</div> : null}
      <Flash a={f >= D ? 0.2 * Math.exp(-(f - D) / 5) : 0} color="255,176,46" />
      <Flash a={C.bumps.reduce((a, b) => a + (f >= b ? 0.06 * Math.exp(-(f - b) / 3) : 0), 0)} />
      <BrandEnd
        g={g}
        from={C.end}
        bg="linear-gradient(180deg, #2a1206 0%, #7a3a18 55%, #d9822b 100%)"
        accent={GOLD}
        kicker="GAME WORLD · YAOUNDÉ"
        wipe="left"
        logo={<Brand size={150} />}
        line="Cameroon's roads, under your thumb."
      />
      <Vignette s={0.55} />
      <Grain opacity={0.07} />
      <Audio src={staticFile('audio/chaosriders_mix.wav')} />
    </AbsoluteFill>
  );
};

