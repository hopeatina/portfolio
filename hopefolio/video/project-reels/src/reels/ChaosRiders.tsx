import React from 'react';
import { AbsoluteFill, Img, random, staticFile, useCurrentFrame } from 'remotion';
import { Audio } from '@remotion/media';
import { HOUSE, TRAVEL, clamp, mix, prog } from '../lib/ease';
import { GRIDS } from '../lib/grid';
import { T, rec } from '../lib/theme';
import { EndCard, Flash, Grain, Vignette } from '../lib/Frame';
import { Cam, Key, X, Z, keyedCamera, project, v3 } from '../lib/space';
import { Blur, Box, Fog, Plane } from '../lib/World';
import cues from '../data/cues_chaosriders.json';

/**
 * CHAOS RIDERS v2: "Read the road. Find the line. Hold your nerve."
 * Frame 0 is the concept art (labelled: the visual target), pushing in.
 * On the snare the camera flies through it into a true 3D road: red dirt,
 * market stalls, a low-poly taxi. Before the drop the driver fights the road:
 * potholes land on the snares, the taxi jolts and overcorrects. On the drop
 * the golden line draws itself through the field ahead and the run goes into
 * FLOW: faster, every pothole dodged on the beat. Then the camera rises to
 * the captured browser prototype, labelled as the playable build (the case
 * study's rule: target and build always identified). Rewatch: the taxi's
 * plate is the concept art's plate; the golden line is the same route
 * function the prototype's track uses.
 */
const g = GRIDS.chaosriders;
const C = cues.cue;
const D = C.drop;
const GOLD = '#ffb02e';
const FOG: Fog = { near: 2500, far: 11000 };
const Z0 = -2600; // where the ride starts, just past the concept art
const ART = v3(0, -420, -1600);

// distance travelled after the ride starts: steady, then FLOW, then parked for the prototype
const travelled = (f: number) => {
  let d = 0;
  for (let k = C.ride; k < Math.min(f, C.proto + 20); k++) d += k < D ? 34 : k < D + 12 ? mix(34, 62, (k - D) / 12) : 62;
  return d;
};
const zT = (f: number) => Z0 - travelled(f);
const line = (z: number) => 230 * Math.sin((z - Z0) * 0.0011); // the route through the field
const bumpAt = (f: number) => C.bumps.reduce((a, b) => a + (f >= b ? Math.exp(-(f - b) / 5) * Math.sin((f - b) * 1.1) : 0), 0);
const xT = (f: number) => {
  if (f < D) {
    // fights the road: overcorrects after every pothole
    const k = C.bumps.reduce((a, b, i) => a + (f >= b ? (i % 2 ? -1 : 1) * 150 * Math.exp(-(f - b) / 22) * Math.cos((f - b) * 0.16) : 0), 0);
    return 60 * Math.sin(f * 0.05) + k;
  }
  return mix(60 * Math.sin(D * 0.05), line(zT(f) - 300), HOUSE(prog(f, D, D + 20)));
};
// potholes: the ones you hit (before the drop), the ones you read and miss (after)
const HOLES = [
  ...C.bumps.map((b) => ({ z: zT(b) - 120, x: xT(b) + 20, r: 1 })),
  ...new Array(26).fill(0).map((_, i) => ({ z: zT(C.ride) - 2200 - i * 900 - random(`hz${i}`) * 400, x: (random(`hx${i}`) - 0.5) * 760, r: 0.7 + random(`hr${i}`) * 0.6 })),
  ...C.dodges.map((d, i) => ({ z: zT(d) - 140, x: line(zT(d) - 140) + (i % 2 ? 220 : -220), r: 1.2 })),
];
const STALL_COLS = ['#c0392b', '#e67e22', '#f1c40f', '#2980b9', '#27ae60', '#8e44ad'];

const KEYS: Key[] = [
  // before C.ride targets are absolute; after, z is relative to the taxi (added below)
  [0, 0, -420, -1600, 1500, 0, 0, 0], // the concept art, square on
  [C.through - 6, 0, -420, -1600, 820, 0, 0, 0],
  [C.ride, 0, -110, 0, 900, 0, 12, 0], // through it: behind the taxi
  [D - 10, 0, -110, 0, 820, 0, 10, 0],
  [D + 14, 0, -150, -500, 1250, -10, 17, 0], // FLOW: up and over the roof, the line running ahead
  [C.proto - 4, 0, -150, -500, 1300, -8, 16, 0],
  [C.proto + 30, 0, -700, -2700, 1700, 0, 3, 0], // up to the playable prototype
  [900, 0, -700, -2700, 1780, 0, 3, 0],
];
const REL = keyedCamera(KEYS, [
  { frames: C.bumps, tau: 4, punch: 0.03, px: 16 },
  { frames: [D], tau: 6, punch: 0.06, px: 12 },
  { frames: C.dodges, tau: 4, punch: 0.01, px: 4 },
]);
const camAt = (f: number): Cam => {
  const c = REL.at(f);
  if (f < C.through) return c;
  const w = HOUSE(prog(f, C.through, C.ride)); // key targets turn taxi-relative across the fly-through
  const lead = w * (1 - HOUSE(prog(f, C.proto, C.proto + 30)));
  return { ...c, x: c.x + xT(f) * 0.55 * lead, z: c.z + w * zT(f) };
};

const Taxi: React.FC<{ cam: Cam; f: number }> = ({ cam, f }) => {
  const x = xT(f);
  const z = zT(f);
  const b = bumpAt(f) * 26;
  const body = '#e2b93b';
  const plate = (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', left: 20, right: 20, top: 16, height: 14, background: '#2a6fb0' }} />
      <div style={{ position: 'absolute', left: 16, top: 36, width: 46, height: 22, borderRadius: 4, background: '#ff3b2a', boxShadow: f >= D ? 'none' : '0 0 24px #ff3b2a' }} />
      <div style={{ position: 'absolute', right: 16, top: 36, width: 46, height: 22, borderRadius: 4, background: '#ff3b2a', boxShadow: f >= D ? 'none' : '0 0 24px #ff3b2a' }} />
      <div style={{ position: 'absolute', left: '50%', top: 34, transform: 'translateX(-50%)', padding: '2px 8px', background: '#f2efe4', ...rec(1, 0, 800), fontSize: 18, color: '#111', whiteSpace: 'nowrap' }}>04 12 81</div>
    </div>
  );
  return (
    <>
      <Box cam={cam} c={v3(x, -80 - b, z)} size={[300, 96, 560]} color={body} fog={FOG} face={plate} edge="rgba(0,0,0,0.25)" />
      <Box cam={cam} c={v3(x, -162 - b, z + 30)} size={[250, 72, 290]} color="#cfa42f" fog={FOG} face={<div style={{ position: 'absolute', inset: 8, background: 'rgba(20,30,40,0.85)' }} />} edge="rgba(0,0,0,0.25)" />
      {[-1, 1].map((sx) =>
        [-1, 1].map((sz) => <Box key={`${sx}${sz}`} cam={cam} c={v3(x + sx * 150, -40, z + sz * 190)} size={[46, 80, 80]} color="#141414" fog={FOG} edge="rgba(0,0,0,0.3)" />)
      )}
    </>
  );
};

const World: React.FC<{ f: number; cam: Cam }> = ({ f, cam }) => {
  const zt = zT(f);
  const seg = 900;
  const segs = [];
  for (let k = 0; k < 18; k++) {
    const zc = Math.floor((zt + 1200) / seg) * seg - k * seg - seg / 2;
    if (zc > -1700) continue;
    segs.push(zc);
  }
  const flow = HOUSE(prog(f, D, D + 20));
  const lineReveal = TRAVEL(prog(f, D - 2, D + 26));
  // the golden line: glowing segments painted on the road (in the world, so the taxi occludes it)
  const gold: { c: { x: number; y: number; z: number }; a: number; b: number; o: number }[] = [];
  if (lineReveal > 0)
    for (let z = zt + 200; z > zt - 9000 * lineReveal; z -= 160) {
      const dx = 230 * 0.0011 * Math.cos((z - Z0) * 0.0011) * -160;
      const l = Math.hypot(dx, 160);
      gold.push({ c: v3(line(z - 80), -3, z - 80), a: dx / l, b: -160 / l, o: clamp((z - (zt - 9000 * lineReveal)) / 800) });
    }
  const artT = f < C.ride + 4;
  const protoOn = HOUSE(prog(f, C.proto, C.proto + 20));
  return (
    <>
      {/* the far world */}
      <Plane cam={cam} c={v3(0, -1500, zt - 11000)} w={14000} h={7800} z={-500000} opacity={f >= C.through - 4 ? 1 : 0}>
        <Img src={staticFile('img/bamenda-world.webp')} style={{ width: 14000, height: 7800, objectFit: 'cover', filter: 'sepia(0.35) brightness(0.7) blur(3px)' }} />
      </Plane>
      {/* the road, in segments */}
      {segs.map((zc) => (
        <React.Fragment key={zc}>
          <Plane cam={cam} c={v3(0, 0, zc)} U={X} V={Z} w={1200} h={seg + 4} z={-400000}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #5a2e14, #9a5428 18%, #a85d2c 50%, #9a5428 82%, #5a2e14)' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, rgba(40,18,8,0.18) 0 6px, transparent 6px 60px)' }} />
          </Plane>
          <Plane cam={cam} c={v3(-1800, 2, zc)} U={X} V={Z} w={2400} h={seg + 4} z={-410000}>
            <div style={{ position: 'absolute', inset: 0, background: '#3c2414' }} />
          </Plane>
          <Plane cam={cam} c={v3(1800, 2, zc)} U={X} V={Z} w={2400} h={seg + 4} z={-410000}>
            <div style={{ position: 'absolute', inset: 0, background: '#3c2414' }} />
          </Plane>
          {[-1, 1].map((side) => {
            const i = Math.abs(Math.round(zc / seg)) * 2 + (side > 0 ? 1 : 0);
            const col = STALL_COLS[i % STALL_COLS.length];
            const h = 220 + (i % 3) * 60;
            return <Box key={side} cam={cam} c={v3(side * (820 + (i % 2) * 80), -h / 2, zc)} size={[300, h, 380]} color="#2a1a10" fog={FOG} top={<div style={{ position: 'absolute', inset: 0, background: col }} />} face={<div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 60, background: col, opacity: 0.9 }} />} />;
          })}
        </React.Fragment>
      ))}
      {/* potholes */}
      {HOLES.map((h, i) =>
        h.z < zt + 800 && h.z > zt - 10000 ? (
          <Plane key={i} cam={cam} c={v3(h.x, -1, h.z)} U={X} V={Z} w={130 * h.r} h={90 * h.r} z={-300000}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(ellipse, #1a0c05 40%, #3a1c0c 70%, rgba(0,0,0,0) 72%)' }} />
          </Plane>
        ) : null
      )}
      {gold.map((gs, k) => (
        <Plane key={`g${k}`} cam={cam} c={gs.c} U={v3(gs.b, 0, -gs.a)} V={v3(gs.a, 0, gs.b)} w={34} h={172} z={-250000} opacity={gs.o}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: 17, background: '#ffe2a0', boxShadow: `0 0 26px 10px ${GOLD}` }} />
        </Plane>
      ))}
      {/* the concept art: the visual target (flown through) */}
      {artT ? (
        <Plane cam={cam} c={ART} w={2400} h={1340} z={100000}>
          <Img src={staticFile('img/world-market.webp')} style={{ width: 2400, height: 1340 }} />
        </Plane>
      ) : null}
      {f >= C.through - 4 ? <Taxi cam={cam} f={f} /> : null}
      {/* the playable prototype */}
      <Plane cam={cam} c={v3(0, -700, zT(C.proto + 20) - 2700)} w={2304} h={1440} opacity={protoOn} z={150000}>
        <Img src={staticFile('img/prototype-gameplay.png')} style={{ width: 2304, height: 1440, boxShadow: `0 0 120px rgba(255,176,46,0.35)` }} />
      </Plane>
      {flow > 0 && f < C.proto
        ? new Array(14).fill(0).map((_, k) => {
            const zz = zt - ((f * 90 + k * 400) % 5600);
            const a = project(cam, v3((k % 2 ? 1 : -1) * (560 + (k % 3) * 60), -60 - (k % 4) * 40, zz));
            const b = project(cam, v3((k % 2 ? 1 : -1) * (560 + (k % 3) * 60), -60 - (k % 4) * 40, zz - 700));
            if (a.d < 40 || b.d < 40) return null;
            return (
              <svg key={k} width={1920} height={1080} style={{ position: 'absolute', inset: 0, zIndex: 250000 }}>
                <line x1={a.sx} y1={a.sy} x2={b.sx} y2={b.sy} stroke="rgba(255,217,138,0.5)" strokeWidth={3} />
              </svg>
            );
          })
        : null}
    </>
  );
};

export const ChaosRiders: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camAt(f);
  const endDim = HOUSE(prog(f, C.end - 10, C.end + 16));
  const flowT = HOUSE(prog(f, D, D + 12));
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(180deg, #2a180c, #7a4a24 55%, #3c2010)', overflow: 'hidden' }}>
      <Blur
        ranges={[
          [C.through - 8, C.ride + 6, 10],
          [D - 2, D + 12, 8],
          [C.proto, C.proto + 30, 10],
        ]}
      >
        <AbsoluteFill style={{ filter: `brightness(${1 - 0.72 * endDim}) blur(${5 * endDim}px)` }}>
          <World f={f} cam={cam} />
        </AbsoluteFill>
      </Blur>
      <AbsoluteFill style={{ opacity: 1 - endDim }}>
        <div style={{ position: 'absolute', left: 120, top: 92, ...rec(1, 0, 600), fontSize: 20, letterSpacing: '0.2em', color: GOLD }}>CHAOS RIDERS · GAME WORLD</div>
        {f < C.ride ? (
          <div style={{ position: 'absolute', left: 120, bottom: 100, ...rec(1, 0, 700), fontSize: 20, letterSpacing: '0.2em', color: T.mineral, background: 'rgba(8,8,6,0.6)', padding: '8px 14px' }}>CONCEPT ART · THE VISUAL TARGET · YAOUNDÉ MARKET</div>
        ) : null}
        {f >= C.ride && f < D ? (
          <div style={{ position: 'absolute', left: 120, top: 128, fontFamily: T.serif, fontStyle: 'italic', fontSize: 84, color: T.mineral, opacity: HOUSE(prog(f, C.ride, C.ride + 16)), textShadow: '0 4px 30px rgba(0,0,0,0.6)' }}>
            {f < 280 ? 'Read the road.' : 'Find the line.'}
          </div>
        ) : null}
        {f >= D && f < C.proto ? (
          <div style={{ position: 'absolute', left: 120, top: 120, fontFamily: T.serif, fontSize: 200, lineHeight: 0.9, color: GOLD, letterSpacing: `${mix(-0.04, 0.12, flowT)}em`, opacity: flowT * (1 - HOUSE(prog(f, C.proto - 12, C.proto))), textShadow: '0 6px 40px rgba(0,0,0,0.5)' }}>FLOW</div>
        ) : null}
        {f >= C.proto + 14 ? (
          <div style={{ position: 'absolute', left: 120, bottom: 100, ...rec(1, 0, 700), fontSize: 22, letterSpacing: '0.16em', color: GOLD, background: 'rgba(8,8,6,0.7)', padding: '8px 14px', opacity: HOUSE(prog(f, C.proto + 14, C.proto + 26)) }}>CAPTURED BROWSER PROTOTYPE · THREE.JS + REACT · PLAYABLE</div>
        ) : null}
      </AbsoluteFill>
      <Flash a={f >= D ? 0.18 * Math.exp(-(f - D) / 5) : 0} color="255,176,46" />
      <Flash a={C.bumps.reduce((a, b) => a + (f >= b ? 0.05 * Math.exp(-(f - b) / 3) : 0), 0)} />
      <EndCard g={g} index="07 / GAME WORLD" title="Chaos Riders" line="Cameroon's roads, under your thumb." accent={GOLD} from={C.end} />
      <Vignette s={0.62} />
      <Grain opacity={0.08} />
      <Audio src={staticFile('audio/chaosriders_mix.wav')} />
    </AbsoluteFill>
  );
};
