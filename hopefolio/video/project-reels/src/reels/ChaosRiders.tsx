import React from 'react';
import { AbsoluteFill, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { Audio } from '@remotion/media';
import { loadFont } from '@remotion/fonts';
import { HOUSE, clamp, mix, prog, settle } from '../lib/ease';
import { GRIDS } from '../lib/grid';
import { rec } from '../lib/theme';
import { Flash, Grain, Vignette } from '../lib/Frame';
import { Cam, DEG, mm, orbit, v3 } from '../lib/space';
import { Box } from '../lib/World';
import { Dust, Glow } from '../lib/Env';
import { BrandEnd } from '../lib/BrandEnd';
import { pulse, sub } from '../lib/score';

loadFont({ family: 'Anton', url: staticFile('fonts/cr/anton.woff2'), weight: '400', format: 'woff2' });
loadFont({ family: 'Bebas Neue', url: staticFile('fonts/cr/bebasneue.woff2'), weight: '400', format: 'woff2' });

/**
 * CHAOS RIDERS v4: "It looked like Lego."
 *
 * The evolution is the plot. Cold open on our own v3 box taxi, turning on a
 * dusty plate — the car Hope kept telling AI looked like Lego — while the score
 * sputters to a stop. Hard cut on the kick to the real thing: the Survivor R5
 * taxi rendered in Cycles from its saved Blender geometry, same angle, low and
 * slow on a long lens (car-commercial grammar), PANELS / GLAZING / PAINT slammed
 * in the brand's Anton caps on the snares. The fleet lands on the kicks (Needle,
 * Tank). One beat of black: FIND THE LINE. On the drop, real captured gameplay
 * from the deployed demo: the market, the amber line, the potholes, the surge
 * ring, with speed ramps. Brand ending: THE ROAD FIGHTS BACK.
 *
 * Honesty: the R5/R6 models are Blender authoring studies not yet exported to
 * the game; the deployed demo still drives an older car. Both are labelled.
 * Subliminal: A BEND CAN BECOME A BREAK rides the slow-motion for 7 frames.
 */
const g = GRIDS.chaosriders;
const Mk = g.markers as Record<string, number>;
const REB = Math.round(Mk.rebuild);
const PAN = Math.round(Mk.panels);
const GLZ = Math.round(Mk.glazing);
const PNT = Math.round(Mk.paint);
const FLEET = Math.round(Mk.fleet);
const NDL = Math.round(Mk.needle);
const TNK = Math.round(Mk.tank);
const LINE = Math.round(Mk.line);
const D = Math.round(Mk.drop);
const FLOW = Math.round(Mk.flow);
const NERVE = Math.round(Mk.nerve);
const END = Math.round(Mk.end);

const GOLD = '#ffb02e';
const CREAM = '#efe9dc';
const DARK = '#0e0b08';
const ANTON = 'Anton, Impact, sans-serif';
const BEBAS = '"Bebas Neue", Anton, sans-serif';

// ── the Lego taxi (v3's own box car), for the joke
const LegoTaxi: React.FC<{ cam: Cam }> = ({ cam }) => {
  const plate = <div style={{ position: 'absolute', left: '50%', top: 40, transform: 'translateX(-50%)', padding: '2px 8px', background: CREAM, ...rec(1, 0, 800), fontSize: 18, color: '#111', whiteSpace: 'nowrap' }}>04 12 81</div>;
  const front = (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', left: 30, right: 30, top: 14, height: 22, background: 'repeating-linear-gradient(90deg, #2b2b2b 0 8px, #555 8px 12px)' }} />
      <div style={{ position: 'absolute', left: 12, top: 14, width: 40, height: 26, borderRadius: 6, background: '#fff6d8' }} />
      <div style={{ position: 'absolute', right: 12, top: 14, width: 40, height: 26, borderRadius: 6, background: '#fff6d8' }} />
      {plate}
    </div>
  );
  return (
    <>
      <Box cam={cam} c={v3(0, -82, 0)} size={[300, 96, 560]} color="#e2b93b" face={front} back={front} top={<div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 40%, #2a6fb0 40% 60%, transparent 60%)' }} />} edge="rgba(0,0,0,0.25)" />
      <Box cam={cam} c={v3(0, -164, 30)} size={[250, 72, 290]} color="#cfa42f" face={<div style={{ position: 'absolute', inset: 8, background: 'rgba(20,30,40,0.85)' }} />} back={<div style={{ position: 'absolute', inset: 8, background: 'rgba(20,30,40,0.85)' }} />} edge="rgba(0,0,0,0.25)" />
      <Box cam={cam} c={v3(0, -214, 30)} size={[120, 30, 60]} color={CREAM} face={<div style={{ ...rec(1, 0, 800), fontSize: 20, textAlign: 'center', color: '#111', lineHeight: '30px' }}>TAXI</div>} back={<div style={{ ...rec(1, 0, 800), fontSize: 20, textAlign: 'center', color: '#111', lineHeight: '30px' }}>TAXI</div>} />
      {[-1, 1].map((sx) => [-1, 1].map((sz) => <Box key={`${sx}${sz}`} cam={cam} c={v3(sx * 150, -40, sz * 190)} size={[46, 80, 80]} color="#141414" edge="rgba(0,0,0,0.3)" />))}
    </>
  );
};

/** A Cycles image sequence, crossfaded between neighbouring renders so the orbit reads smooth. */
const Seq: React.FC<{ dir: string; n: number; idx: number; style?: React.CSSProperties }> = ({ dir, n, idx, style }) => {
  const i0 = Math.max(0, Math.min(n - 1, Math.floor(idx)));
  const i1 = Math.min(n - 1, i0 + 1);
  const t = clamp(idx - i0);
  const src = (i: number) => staticFile(`cr/${dir}/${String(i).padStart(4, '0')}.png`);
  return (
    <div style={{ position: 'absolute', ...style }}>
      <Img src={src(i0)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      {i1 !== i0 && t > 0.02 ? <Img src={src(i1)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: t }} /> : null}
    </div>
  );
};

/** Golden-hour plate: the concept art, pushed far out of focus, as the world behind the model. */
const Plate: React.FC<{ f: number; blur?: number; dim?: number }> = ({ f, blur = 26, dim = 0.35 }) => (
  <AbsoluteFill>
    <Img src={staticFile('img/world-market.webp')} style={{ position: 'absolute', inset: -80, width: 2080, height: 1240, objectFit: 'cover', filter: `blur(${blur}px) saturate(1.2)`, transform: `translateX(${-f * 0.15}px)` }} />
    <AbsoluteFill style={{ background: `linear-gradient(180deg, rgba(20,10,4,${dim}) 0%, rgba(40,20,6,${dim * 0.5}) 55%, rgba(60,32,10,${dim + 0.25}) 100%)` }} />
    <div style={{ position: 'absolute', left: -200, right: -200, top: 760, bottom: -100, background: 'radial-gradient(ellipse 60% 55% at 50% 40%, rgba(150,90,40,0.85), rgba(60,32,12,0.95) 70%)' }} />
  </AbsoluteFill>
);

const Slam: React.FC<{ f: number; at: number; to?: number; text: string; sub2?: string; x: number; y: number; size?: number; color?: string }> = ({ f, at: a, to = 1e9, text, sub2, x, y, size = 190, color = GOLD }) => {
  if (f < a - 1 || f >= to) return null;
  const t = settle(prog(f, a, a + 7), 1.4);
  return (
    <div style={{ position: 'absolute', left: x, top: y, zIndex: 900000, transform: `scale(${mix(1.6, 1, clamp(t))})`, transformOrigin: '0 50%', opacity: clamp(t * 2) }}>
      <div style={{ fontFamily: ANTON, fontSize: size, lineHeight: 0.9, color, letterSpacing: '0.005em', textShadow: '0 10px 40px rgba(0,0,0,0.6)' }}>{text}</div>
      {sub2 ? <div style={{ fontFamily: BEBAS, fontSize: size * 0.2, letterSpacing: '0.08em', color: CREAM, marginTop: 10, opacity: HOUSE(prog(f, a + 6, a + 16)) }}>{sub2}</div> : null}
    </div>
  );
};

const Mark: React.FC<{ size: number }> = ({ size }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: size * 0.22 }}>
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx={50} cy={50} r={40} stroke={GOLD} strokeWidth={11} fill="none" />
      <path d="M30 70 L70 30" stroke={GOLD} strokeWidth={11} strokeLinecap="round" />
    </svg>
    <div style={{ fontFamily: ANTON, fontSize: size * 0.62, lineHeight: 0.86, color: CREAM, letterSpacing: '0.01em' }}>
      CHAOS
      <br />
      <span style={{ color: GOLD }}>RIDERS</span>
    </div>
  </div>
);

export const ChaosRiders: React.FC = () => {
  const f = useCurrentFrame();
  // ── cold open: the Lego turntable, sputtering
  const lego = f < REB;
  const legoCam = orbit(v3(0, -120, 0), 1700, mix(-40, -20, prog(f, 0, REB)) * DEG, 10 * DEG, 0, mm(50));
  // ── the rebuild: low long-lens push, then the orbit
  const low = f >= REB && f < GLZ;
  const lowIdx = mix(0, 59, HOUSE(prog(f, REB, GLZ + 4)));
  const orbIdx = mix(6, 44, prog(f, GLZ, FLEET));
  const carScale = low ? mix(1.0, 1.14, HOUSE(prog(f, REB, GLZ))) : mix(1.02, 1.1, prog(f, GLZ, FLEET));
  const fleet = f >= FLEET && f < LINE;
  const pre = f >= LINE && f < D;
  const game = f >= D && f < END;
  const bend = sub(f, 560, 7);
  return (
    <AbsoluteFill style={{ background: DARK, overflow: 'hidden' }}>
      {lego ? (
        <AbsoluteFill>
          <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 70%, #6b4520, #1c120a 70%)' }} />
          <AbsoluteFill style={{ isolation: 'isolate', transform: `translateY(40px) scale(${1 + 0.02 * pulse([Math.round(REB * 0.88)], f, 4)})` }}>
            <LegoTaxi cam={legoCam} />
          </AbsoluteFill>
          <div style={{ position: 'absolute', left: 120, top: 110, zIndex: 900000 }}>
            <div style={{ fontFamily: ANTON, fontSize: 150, lineHeight: 0.9, color: CREAM, clipPath: `inset(-10% ${(1 - HOUSE(prog(f, 18, 34))) * 100}% -20% 0)` }}>IT LOOKED LIKE LEGO.</div>
            <div style={{ fontFamily: 'Newsreader', fontStyle: 'italic', fontSize: 40, color: 'rgba(239,233,220,0.75)', marginTop: 16, opacity: HOUSE(prog(f, 34, 50)) }}>the car I kept telling AI looked like Lego</div>
          </div>
          <div style={{ position: 'absolute', right: 120, bottom: 110, ...rec(1, 0, 600), fontSize: 20, letterSpacing: '0.16em', color: 'rgba(239,233,220,0.5)' }}>V3 OF THIS FILM · A BOX CAR IN CODE</div>
        </AbsoluteFill>
      ) : null}

      {f >= REB && f < FLEET ? (
        <AbsoluteFill>
          <Plate f={f} />
          <Glow x={1500} y={260} r={900} color="rgba(255,190,110,0.5)" a={0.7} />
          {low ? (
            <Seq dir="survivor_low" n={60} idx={lowIdx} style={{ left: 960 - 800 * carScale, top: 600 - 450 * carScale, width: 1600 * carScale, height: 900 * carScale }} />
          ) : (
            <Seq dir="survivor" n={120} idx={orbIdx} style={{ left: 960 - 800 * carScale * 1.1, top: 540 - 450 * carScale * 1.1, width: 1600 * carScale * 1.1, height: 900 * carScale * 1.1 }} />
          )}
          <Dust n={60} seed="crd" f={f} color="rgba(255,210,150,0.9)" speed={1.4} a={0.5} />
          <Slam f={f} at={PAN} to={GLZ} text="PANELS." x={120} y={90} size={170} />
          <Slam f={f} at={GLZ} to={PNT} text="GLAZING." x={120} y={90} size={170} />
          <Slam f={f} at={PNT} text="PAINT." sub2="SURVIVOR R5 · RENDERED FROM ITS SAVED BLENDER GEOMETRY" x={120} y={90} size={170} />
          <div style={{ position: 'absolute', right: 120, bottom: 90, ...rec(1, 0, 600), fontSize: 20, letterSpacing: '0.14em', color: 'rgba(239,233,220,0.7)', zIndex: 900000 }}>BLENDER AUTHORING MODEL · NOT YET IN THE GAME BUILD</div>
        </AbsoluteFill>
      ) : null}

      {fleet ? (
        <AbsoluteFill>
          <Plate f={f} dim={0.5} />
          {[
            { dir: 'survivor', n: 120, idx: 8, at: FLEET, name: 'SURVIVOR', line: 'PANELS + GLAZING + PAINT', x: 0 },
            { dir: 'needle', n: 60, idx: 20, at: NDL, name: 'NEEDLE', line: 'CLOTH + TIMBER + PRODUCE', x: 640 },
            { dir: 'tank', n: 60, idx: 30, at: TNK, name: 'TANK', line: 'CAB + CHASSIS + TIMBER LOAD', x: 1280 },
          ].map((v) => {
            if (f < v.at - 1) return null;
            const t = settle(prog(f, v.at, v.at + 8), 1.2);
            return (
              <div key={v.name} style={{ position: 'absolute', left: v.x, top: 0, width: 640, height: 1080, transform: `translateY(${(1 - clamp(t)) * 80}px)`, opacity: clamp(t * 2) }}>
                <Seq dir={v.dir} n={v.n} idx={v.idx + (f - v.at) * 0.12} style={{ left: -120, top: 260, width: 880, height: 495 }} />
                <div style={{ position: 'absolute', left: 60, top: 760, fontFamily: ANTON, fontSize: 110, color: GOLD, lineHeight: 1 }}>{v.name}</div>
                <div style={{ position: 'absolute', left: 62, top: 880, fontFamily: BEBAS, fontSize: 36, letterSpacing: '0.06em', color: CREAM }}>{v.line}</div>
              </div>
            );
          })}
          <div style={{ position: 'absolute', left: 60, top: 90, ...rec(1, 0, 600), fontSize: 22, letterSpacing: '0.16em', color: 'rgba(239,233,220,0.75)' }}>THREE VEHICLES · THREE MATERIAL PROBLEMS</div>
        </AbsoluteFill>
      ) : null}

      {pre ? (
        <AbsoluteFill style={{ background: DARK, justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ fontFamily: ANTON, fontSize: 250, color: CREAM, lineHeight: 0.9, transform: `scale(${mix(1.08, 1, HOUSE(prog(f, LINE, D)))})` }}>FIND THE LINE.</div>
        </AbsoluteFill>
      ) : null}

      {game ? (
        <AbsoluteFill style={{ background: '#000' }}>
          <Sequence from={D} durationInFrames={FLOW + 20 - D}>
            <OffthreadVideo src={staticFile('clips/cr_gameplay.mp4')} startFrom={150} muted style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.06)' }} />
          </Sequence>
          <Sequence from={FLOW + 20} durationInFrames={NERVE - FLOW - 20}>
            <OffthreadVideo src={staticFile('clips/cr_gameplay.mp4')} startFrom={540} playbackRate={0.4} muted style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.12)' }} />
          </Sequence>
          <Sequence from={NERVE} durationInFrames={END - NERVE}>
            <OffthreadVideo src={staticFile('clips/cr_gameplay.mp4')} startFrom={780} playbackRate={1.2} muted style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.06)' }} />
          </Sequence>
          <AbsoluteFill style={{ boxShadow: `inset 0 0 0 10px ${GOLD}`, opacity: 0.9 }} />
          <Slam f={f} at={D} to={NERVE} text="HOLD YOUR NERVE." x={110} y={80} size={150} />
          {f >= FLOW + 20 && f < NERVE ? <div style={{ position: 'absolute', left: 120, top: 250, fontFamily: BEBAS, fontSize: 58, letterSpacing: '0.06em', color: CREAM, textShadow: '0 4px 20px rgba(0,0,0,0.8)', opacity: HOUSE(prog(f, FLOW + 24, FLOW + 36)) }}>SKIM A POTHOLE · NEAR-MISS BONUS</div> : null}
          <Slam f={f} at={NERVE} text="ONE ROAD. 20 SECONDS." x={110} y={80} size={130} color={CREAM} />
          <div style={{ position: 'absolute', left: 120, bottom: 70, ...rec(1, 0, 600), fontSize: 20, letterSpacing: '0.14em', color: CREAM, textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>REAL CAPTURE · LIVE DEMO · CHAOS-RIDERS-LAUNCH.VERCEL.APP</div>
          {bend ? <div style={{ position: 'absolute', right: 130, bottom: 140, fontFamily: BEBAS, fontSize: 30, letterSpacing: '0.12em', color: GOLD, opacity: 0.55 }}>A BEND CAN BECOME A BREAK</div> : null}
        </AbsoluteFill>
      ) : null}

      <Flash a={0.35 * pulse([REB], f, 4)} color="255,210,140" />
      <Flash a={0.3 * pulse([D], f, 5)} color="255,176,46" />
      <BrandEnd
        g={g}
        from={END}
        bg={`radial-gradient(ellipse at 50% 45%, #3a2210, ${DARK} 72%)`}
        accent={GOLD}
        muted="rgba(239,233,220,0.75)"
        kicker="AN OPEN WORLD BORN IN CAMEROON"
        font={BEBAS}
        wipe="iris"
        logo={
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
            <Mark size={150} />
            <div style={{ fontFamily: ANTON, fontSize: 120, lineHeight: 0.9, color: CREAM }}>
              THE ROAD FIGHTS <span style={{ color: GOLD }}>BACK.</span>
            </div>
          </div>
        }
        line="Race the streets you know. Move what matters."
      />
      <Vignette s={0.5} />
      <Grain opacity={0.08} />
      <Audio src={staticFile('audio/chaosriders_mix.wav')} />
    </AbsoluteFill>
  );
};
