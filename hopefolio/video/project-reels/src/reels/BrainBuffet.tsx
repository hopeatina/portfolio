import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from 'remotion';
import { Audio } from '@remotion/media';
import { HOUSE, RESOLVE, TRAVEL, clamp, mix, prog, settle } from '../lib/ease';
import { GRIDS } from '../lib/grid';
import { rec } from '../lib/theme';
import { Flash, Grain, Vignette } from '../lib/Frame';
import { monotone } from '../lib/spline';
import { Cam, Key, X, Z, edit, spinAbout, v3, vlerp } from '../lib/space';
import { Blur, Box, DofCtx, Fog, Plane } from '../lib/World';
import { Bokeh, Glow, Grade, Whip } from '../lib/Env';
import { BrandEnd } from '../lib/BrandEnd';
import cues from '../data/cues_brainbuffet.json';

/**
 * BRAINBUFFET v3: "A buffet, not a search box."
 * In BrainBuffet's own world: the violet horizon glow of the product, a lilac
 * buffet, and the smiling brain hanging over it as the host. Frame 0: a
 * search box answering in one line. Snap zoom out: that answer is a snack on
 * a saucer at the head of a buffet. Food-show grammar: a whip pan to each
 * dish on the beat (topic, what you know, subtopics, a quiz), overhead
 * flat-lays of the tray filling between them. Drop: a low hero angle as the
 * tray stands up into the course outline. Then the real study surface: a
 * note sticks to the lesson, the chapter quiz fills the bar.
 */
const g = GRIDS.brainbuffet;
const C = cues.cue;
const D = C.drop;
const VIOLET = '#b57dff';
const LILAC = '#bea6f8';
const INK = '#1c1823';
const SANS = 'system-ui, -apple-system, Helvetica Neue, sans-serif';
const FOG: Fog = { near: 2600, far: 8000 };
const DISHES = [
  { k: 'TOPIC', v: 'Building wealth with passive income', c: '#f4b740', x: 900 },
  { k: 'YOU KNOW', v: 'A little. Skip the basics.', c: '#5cc8ff', x: 1600 },
  { k: 'SUBTOPICS', v: 'Affiliate marketing · Picking products', c: '#8ee06a', x: 2300 },
  { k: 'QUIZ', v: '3 questions to find your edge', c: '#ff7a8a', x: 3000 },
];
const CHAPTERS = ['Understanding affiliate marketing', 'Selecting the right products and platforms', 'Chapter quiz, with feedback', 'Your notes, attached to the lesson'];
const SCREEN = v3(4300, -620, -600);
const SW = 1770;
const SH = 996;
const TRAY_X = monotone([0, C.picks[0] - 30, C.picks[0], C.picks[1], C.picks[2], C.picks[3], D, 900], [520, 520, 900, 1600, 2300, 3000, 3060, 3060]);
const TRAY_Z = 230;

const dishShot = (i: number, from: number, to: number): { name: string; from: number; keys: Key[] } => {
  const d = DISHES[i];
  return { name: `pick${i}`, from, keys: [[from, d.x - 40, -150, -200, 2000, 24, 16, 0, 50], [to, d.x + 40, -150, -180, 1850, 18, 17, 0, 50]] };
};
const flatShot = (from: number, to: number, x0: number, x1: number): { name: string; from: number; keys: Key[] } => ({
  name: 'flat',
  from,
  keys: [[from, x0, -10, TRAY_Z, 1900, 0, 88, 0, 35], [to, x1, -10, TRAY_Z, 1800, 0, 88, 0, 35]],
});
const EDIT = edit([
  { name: 'search', from: 0, keys: [[0, 0, -120, -170, 1500, 0, 6, 0, 85], [C.snap, 0, -120, -170, 1420, 0, 6, 0, 85]] },
  { name: 'reveal', from: C.snap, keys: [[C.snap, 0, -120, -170, 1420, 0, 6, 0, 85], [C.snap + 14, 800, -260, -300, 2600, -34, 14, 0, 24], [C.picks[0], 1100, -300, -300, 2500, -28, 14, 0, 24]] },
  dishShot(0, C.picks[0], C.flat[0]),
  flatShot(C.flat[0], C.picks[1], 900, 1100),
  dishShot(1, C.picks[1], C.flat[1]),
  flatShot(C.flat[1], C.picks[2], 1600, 1750),
  dishShot(2, C.picks[2], C.flat[2]),
  flatShot(C.flat[2], C.picks[3], 2300, 2400),
  dishShot(3, C.picks[3], C.flat[3]),
  { name: 'full', from: C.flat[3], keys: [[C.flat[3], 3060, -10, TRAY_Z, 1700, 0, 70, 0, 35], [D, 3060, -10, TRAY_Z, 1350, 0, 60, 0, 35]] },
  { name: 'stand', from: D, keys: [[D, 3060, -300, 200, 2300, 0, -8, 0, 35], [D + 30, 3060, -470, 190, 1900, 0, -3, 0, 35], [C.study - 4, 3060, -470, 190, 1800, 0, -2, 0, 35]], kicks: [{ frames: [D], tau: 6, punch: 0.05, px: 10 }] },
  { name: 'study', from: C.study, keys: [[C.study, 3060, -470, 190, 1800, 0, -2, 0, 35], [C.study + 34, SCREEN.x, SCREEN.y, SCREEN.z, 1380, 0, 0, 0, 35], [C.note - 10, SCREEN.x + 650, SCREEN.y - 240, SCREEN.z, 750, -4, 0, 0, 35], [C.note + 20, SCREEN.x + 650, SCREEN.y - 240, SCREEN.z, 730, -4, 0, 0, 35], [C.quiz - 8, SCREEN.x + 40, SCREEN.y - 360, SCREEN.z, 820, 2, 0, 0, 35], [C.quiz + 18, SCREEN.x + 40, SCREEN.y - 360, SCREEN.z, 800, 2, 0, 0, 35], [C.end, SCREEN.x, SCREEN.y, SCREEN.z, 1500, 0, 0, 0, 35]] },
]);

const Plate: React.FC<{ c: string; size: number }> = ({ c, size }) => (
  <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle, #fffaf2 0 58%, #e6dccb 60%, #fffaf2 64%, transparent 66%)', boxShadow: '0 10px 20px rgba(40,20,80,0.25)' }}>
    <div style={{ position: 'absolute', left: size * 0.22, top: size * 0.22, width: size * 0.56, height: size * 0.56, borderRadius: '50%', background: `radial-gradient(circle at 38% 34%, rgba(255,255,255,0.55), ${c} 45%, rgba(0,0,0,0.25) 100%)` }} />
  </div>
);

const Placard: React.FC<{ i: number; taken: boolean }> = ({ i, taken }) => {
  const d = DISHES[i];
  return (
    <div style={{ position: 'absolute', inset: 0, borderRadius: 22, background: '#fff', boxShadow: `0 10px 30px rgba(60,20,120,0.25), inset 0 0 0 4px ${taken ? d.c : '#eee7ff'}`, padding: '20px 26px', fontFamily: SANS }}>
      <div style={{ ...rec(1, 0, 700), fontSize: 20, letterSpacing: '0.14em', color: '#8a6fd6' }}>{`0${i + 1} ${d.k}`}</div>
      <div style={{ fontSize: 34, fontWeight: 650, color: INK, marginTop: 8, lineHeight: 1.15 }}>{d.v}</div>
    </div>
  );
};

const Hall: React.FC<{ f: number; cam: Cam }> = ({ f, cam }) => {
  const stand = TRAVEL(prog(f, D, D + 26));
  const trayX = TRAY_X(f);
  const V = spinAbout(Z, X, -stand * (Math.PI / 2));
  const trayC = v3(trayX, mix(-8, -470, stand), mix(TRAY_Z, 190, stand));
  const answerT = HOUSE(prog(f, C.answer, C.answer + 10));
  const studyOn = HOUSE(prog(f, C.study - 20, C.study + 14));
  const noteT = settle(prog(f, C.note - 8, C.note + 4), 1.0);
  const quizT = RESOLVE(prog(f, C.quiz - 4, C.quiz + 14));
  return (
    <>
      {/* the room: BrainBuffet's violet horizon */}
      <Plane cam={cam} c={v3(2000, -1200, -2800)} w={16000} h={6000} z={-400000}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #120c26 0%, #2a1656 45%, #6b2fd6 62%, #f08bff 66%, #3a1f73 70%, #1a0f35 100%)' }} />
      </Plane>
      <Plane cam={cam} c={v3(2000, 240, -800)} U={X} V={Z} w={16000} h={7000} z={-390000}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 20%, #5a38a8, #2a1a58 60%, #160d30)' }} />
      </Plane>
      {/* the host: the smiling brain over the buffet */}
      <Plane cam={cam} c={v3(1950, -1300, -900)} w={900} h={900} fog={FOG}>
        <Img src={staticFile('img/bb-logo.png')} style={{ width: 900, height: 900, filter: 'drop-shadow(0 0 60px rgba(190,166,248,0.8))' }} />
      </Plane>
      {/* the counter */}
      <Box cam={cam} c={v3(1800, 110, -120)} size={[4600, 220, 500]} color="#cdbdf5" fog={FOG} edge="rgba(255,255,255,0.4)" z={-200000} top={<div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #efe8ff, #fbf8ff 50%, #efe8ff)' }} />} />
      {/* the tray rail */}
      <Box cam={cam} c={v3(1800, 40, TRAY_Z)} size={[4600, 20, 360]} color="#8f79d9" fog={FOG} z={-150000} top={<div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(90deg, #a893ee 0 30px, #9a84e4 30px 36px)' }} />} />
      {/* heat lamps */}
      {DISHES.map((d) => (
        <Plane key={`h${d.k}`} cam={cam} c={v3(d.x, -560, -120)} w={260} h={120} fog={FOG}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '130px 130px 20px 20px', background: '#f5c26b', boxShadow: '0 40px 90px 30px rgba(255,190,110,0.45)' }} />
        </Plane>
      ))}
      {/* the snack: one answer on a saucer */}
      <Plane cam={cam} c={v3(0, -1, -120)} U={X} V={Z} w={240} h={240} fog={FOG} z={30000}>
        <Plate c="#6a5a8a" size={240} />
      </Plane>
      <Plane cam={cam} c={v3(0, -150, -180)} w={480} h={230} fog={FOG}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: 22, background: '#fff', padding: '18px 22px', boxShadow: '0 20px 40px rgba(40,20,80,0.35)', fontFamily: SANS }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderRadius: 24, background: '#f1edfa', fontSize: 20, color: INK }}>⌕ how do I build passive income?</div>
          <div style={{ marginTop: 16, fontSize: 22, lineHeight: 1.3, color: INK, opacity: answerT, clipPath: `inset(0 ${(1 - answerT) * 100}% 0 0)` }}>Earn money with little ongoing effort, e.g. affiliate links.</div>
          <div style={{ marginTop: 10, ...rec(1, 0, 600), fontSize: 13, letterSpacing: '0.14em', color: '#9a91b0', opacity: answerT }}>ONE ANSWER</div>
        </div>
      </Plane>
      {/* the buffet */}
      {DISHES.map((d, i) => {
        const at = C.picks[i];
        const t = TRAVEL(prog(f, at - 12, at + 4));
        const slot = v3(trayX - 330 + i * 220, 20, TRAY_Z);
        const home = v3(d.x, -2, -140);
        const lift = Math.sin(Math.PI * t) * -260;
        const onTray = f >= at + 4;
        let p = vlerp(home, slot, t);
        p = v3(p.x, p.y + lift, p.z);
        if (onTray) p = slot;
        const toOutline = HOUSE(prog(f, D + 2 + i * 3, D + 20 + i * 3));
        return (
          <React.Fragment key={d.k}>
            <Plane cam={cam} c={v3(d.x, -200, -340)} w={520} h={170} fog={FOG}>
              <Placard i={i} taken={f >= at} />
            </Plane>
            {toOutline < 1 ? (
              <Plane cam={cam} c={p} U={X} V={Z} w={210} h={210} fog={FOG} opacity={1 - toOutline} z={onTray || t > 0 ? 60000 : 30000}>
                <Plate c={d.c} size={210} />
              </Plane>
            ) : null}
          </React.Fragment>
        );
      })}
      {/* the tray (hero): slides, fills, stands up into the course */}
      <Plane cam={cam} c={trayC} U={X} V={V} w={mix(900, 1100, stand)} h={mix(320, 620, stand)} fog={FOG} z={stand > 0.3 ? 70000 : 40000}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: 30, background: stand > 0.5 ? '#fff' : VIOLET, boxShadow: `0 30px 80px rgba(40,10,90,0.45)` }} />
        {stand > 0.5 ? (
          <div style={{ position: 'absolute', inset: 0, padding: '36px 46px', fontFamily: SANS }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Img src={staticFile('img/bb-logo.png')} style={{ width: 54, height: 54 }} />
              <div style={{ ...rec(1, 0, 700), fontSize: 18, letterSpacing: '0.14em', color: '#8a6fd6' }}>YOUR COURSE · INSPECT THE PLAN BEFORE YOU START</div>
            </div>
            {CHAPTERS.map((c, i) => {
              const a = settle(prog(f, C.chapters[i] - 6, C.chapters[i] + 4), 1.0);
              return (
                <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '18px 0', borderBottom: '2px solid #f1edfa', opacity: clamp(a), transform: `translateX(${(1 - clamp(a)) * 60}px)` }}>
                  <span style={{ width: 52, height: 52, borderRadius: 26, background: DISHES[i].c, color: '#fff', fontSize: 28, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
                  <span style={{ fontSize: 34, fontWeight: 650, color: INK }}>{c}</span>
                </div>
              );
            })}
          </div>
        ) : null}
      </Plane>
      {/* the real study surface */}
      <Plane cam={cam} c={SCREEN} w={SW} h={SH} opacity={studyOn} z={-60000}>
        <Img src={staticFile('img/bb-screen.png')} style={{ width: SW, height: SH, borderRadius: 18, boxShadow: `0 0 160px rgba(181,125,255,${0.5 * studyOn})` }} />
        {f >= C.note - 8 ? (
          <div style={{ position: 'absolute', left: 1496, top: 190, width: 250, padding: '14px 16px', borderRadius: 10, background: '#fde68a', color: '#2a2630', fontFamily: SANS, fontSize: 21, fontWeight: 600, lineHeight: 1.25, transform: `translateY(${(1 - clamp(noteT)) * -80}px) rotate(${mix(-8, -2, clamp(noteT))}deg) scale(${mix(0.8, 1, clamp(noteT))})`, opacity: clamp(noteT * 2), boxShadow: '0 10px 30px rgba(0,0,0,0.45)' }}>
            Pick products my audience already trusts.
            <div style={{ ...rec(1, 0, 600), fontSize: 12, letterSpacing: '0.12em', marginTop: 8, color: '#7a6a2a' }}>ATTACHED · CH 4</div>
          </div>
        ) : null}
        <div style={{ position: 'absolute', left: 868, top: 130, width: 78 * quizT, height: 10, borderRadius: 5, background: '#8ee06a', boxShadow: `0 0 ${20 * quizT}px #8ee06a` }} />
        {quizT > 0.3 ? <div style={{ position: 'absolute', left: 820, top: 160, padding: '6px 12px', borderRadius: 8, background: 'rgba(20,16,30,0.9)', ...rec(1, 0, 600), fontSize: 18, color: '#8ee06a', opacity: HOUSE(prog(f, C.quiz, C.quiz + 12)) }}>✓ chapter quiz · 3/3</div> : null}
      </Plane>
    </>
  );
};

export const BrainBuffet: React.FC = () => {
  const f = useCurrentFrame();
  const { cam, shot, focus } = EDIT.at(f);
  const macro = shot.name === 'search' || shot.name === 'study';
  const dof = { focus, aperture: macro ? 0.9 : shot.name === 'flat' || shot.name === 'full' ? 0.5 : 0.6 };
  const line = (a: number, b: number) => HOUSE(prog(f, a, a + 12)) * (1 - HOUSE(prog(f, b, b + 10)));
  const words: [string, number][] = [
    ['An answer is a snack.', line(C.snap + 10, C.picks[0] - 10)],
    ['A subject is a meal.', line(C.picks[0] + 10, D - 14)],
    ['Your choices, plated into a course.', line(D + 22, C.study + 30)],
  ];
  const whips = C.picks.map((p) => p);
  return (
    <AbsoluteFill style={{ background: '#1a0f35', overflow: 'hidden' }}>
      <Blur ranges={[[C.snap, C.snap + 16, 8], [D, D + 20, 6], [C.study, C.study + 34, 6]]}>
        <DofCtx.Provider value={dof}>
          <AbsoluteFill style={{ isolation: 'isolate' }}>
            <Hall f={f} cam={cam} />
          </AbsoluteFill>
        </DofCtx.Provider>
      </Blur>
      <Glow x={960} y={620} r={1300} color="rgba(240,139,255,0.35)" a={0.5} />
      <Bokeh n={22} seed="bb" colors={['rgba(255,200,120,0.6)', 'rgba(190,166,248,0.6)', 'rgba(255,255,255,0.5)']} area={[0, 0, 1920, 520]} size={[10, 36]} f={f} a={0.3} />
      <Grade tint="#b57dff" a={0.14} />
      {whips.map((w) => (
        <Whip key={w} f={f} at={w} dir={1} len={6} />
      ))}
      {f < C.end ? <div style={{ position: 'absolute', left: 120, top: 88, ...rec(1, 0, 650), fontSize: 20, letterSpacing: '0.2em', color: LILAC, zIndex: 910000 }}>BRAINBUFFET · PERSONAL LEARNING PATHWAYS</div> : null}
      {words.map(([w, o]) =>
        o > 0.002 ? (
          <div key={w} style={{ position: 'absolute', left: 120, bottom: 96, fontFamily: SANS, fontSize: 82, fontWeight: 750, letterSpacing: '-0.03em', color: '#fff', opacity: o, transform: `translateY(${(1 - o) * 30}px)`, textShadow: '0 6px 40px rgba(40,10,90,0.7)', zIndex: 910000 }}>
            {w}
          </div>
        ) : null
      )}
      <Flash a={f >= D ? 0.16 * Math.exp(-(f - D) / 5) : 0} color="240,139,255" />
      <BrandEnd
        g={g}
        from={C.end}
        bg="linear-gradient(180deg, #1c1035 0%, #3a1f73 55%, #b57dff 100%)"
        accent={LILAC}
        kicker="PERSONAL LEARNING PATHWAYS"
        wipe="up"
        logo={
          <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
            <Img src={staticFile('img/bb-logo.png')} style={{ width: 190, height: 190, transform: `rotate(${Math.sin(f / 14) * 3}deg)` }} />
            <div style={{ fontFamily: SANS, fontSize: 150, fontWeight: 750, letterSpacing: '-0.04em', color: '#fff' }}>BrainBuffet</div>
          </div>
        }
        line="Each answer makes the next choice more useful."
      />
      <Vignette s={0.5} />
      <Grain />
      <Audio src={staticFile('audio/brainbuffet_mix.wav')} />
    </AbsoluteFill>
  );
};

