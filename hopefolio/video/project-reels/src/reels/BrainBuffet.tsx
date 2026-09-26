import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from 'remotion';
import { Audio } from '@remotion/media';
import { HOUSE, RESOLVE, TRAVEL, clamp, mix, prog, settle } from '../lib/ease';
import { GRIDS } from '../lib/grid';
import { T, rec } from '../lib/theme';
import { EndCard, Flash, Grain, Vignette } from '../lib/Frame';
import { monotone } from '../lib/spline';
import { Cam, Key, X, Z, keyedCamera, spinAbout, v3, vlerp } from '../lib/space';
import { Blur, Box, Fog, Plane } from '../lib/World';
import cues from '../data/cues_brainbuffet.json';

/**
 * BRAINBUFFET v2: "A buffet, not a search box."
 * Frame 0: a search box answers in one line. The camera pulls back: that
 * answer is sitting on a saucer, the first plate of a long buffet counter.
 * An answer is a snack. The learner's tray slides down the counter and takes
 * one dish per beat, in the product's real order: topic, what you already
 * know, subtopics, a short expertise quiz. On the drop the tray stands up and
 * the dishes become the course outline; then the camera dollies into the real
 * study surface, where a note attaches to the lesson and the chapter quiz
 * fills the progress bar. Rewatch: the saucer's one-line answer reappears,
 * expanded, as chapter 1; the dishes' colours are the chapters' numbers.
 */
const g = GRIDS.brainbuffet;
const C = cues.cue;
const D = C.drop;
const VIOLET = '#9b7bff';
const FOG: Fog = { near: 2000, far: 6500 };
const DISHES = [
  { k: 'TOPIC', v: 'Building wealth with passive income', c: '#d9a62e', x: 700 },
  { k: 'YOU KNOW', v: 'A little. Skip the basics.', c: '#48c7ff', x: 1300 },
  { k: 'SUBTOPICS', v: 'Affiliate marketing · Picking products', c: '#b7f34a', x: 1900 },
  { k: 'QUIZ', v: '3 questions to find your edge', c: '#ff5738', x: 2500 },
];
const CHAPTERS = ['Understanding affiliate marketing', 'Selecting the right products and platforms', 'Chapter quiz, with feedback', 'Your notes, attached to the lesson'];
const SCREEN = v3(3700, -600, -500); // the study surface, centre
const SW = 1770;
const SH = 996;
const TRAY_X = monotone([0, 60, C.picks[0], C.picks[1], C.picks[2], C.picks[3], D, 900], [300, 300, 700, 1300, 1900, 2500, 2560, 2560]);

const KEYS: Key[] = [
  [0, 0, -130, -170, 430, 0, 2, 0], // the answer, macro
  [30, 0, -130, -170, 470, 0, 2, 0],
  [96, 420, -60, -150, 1600, -30, 15, 0], // it's a saucer on a buffet
  [C.picks[0], 700, -40, -60, 1100, 16, 17, 0],
  [C.picks[1], 1300, -40, -60, 1080, 14, 17, 0],
  [C.picks[2], 1900, -40, -60, 1080, 12, 17, 0],
  [C.picks[3], 2450, -60, -40, 1150, 8, 15, 0],
  [D - 6, 2560, -120, 40, 1250, 6, 12, 0],
  [D + 26, 2560, -440, 140, 1250, 0, 1, 0], // the tray stands up: the outline
  [C.study - 2, 2560, -440, 140, 1180, 0, 1, 0],
  [C.study + 34, 3700, -600, -500, 1180, 0, 0, 0], // the real study surface
  [C.note - 10, 4300, -840, -500, 760, -4, 0, 0], // Add note
  [C.note + 20, 4300, -840, -500, 740, -4, 0, 0],
  [C.quiz - 8, 3740, -950, -500, 820, 2, 0, 0], // the progress bar
  [C.quiz + 18, 3740, -950, -500, 800, 2, 0, 0],
  [C.end, 3700, -600, -500, 1500, 0, 0, 0],
  [900, 3700, -600, -500, 1600, 0, 0, 0],
];
const CAM = keyedCamera(KEYS, [
  { frames: C.picks, tau: 5, punch: 0.025, px: 5 },
  { frames: [D], tau: 6, punch: 0.05, px: 11 },
  { frames: [C.note, C.quiz], tau: 4, punch: 0.015, px: 3 },
]);

const Plate: React.FC<{ c: string; size: number }> = ({ c, size }) => (
  <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle, #f2efe4 0 58%, #d9d4c4 60%, #f2efe4 64%, rgba(0,0,0,0) 66%)' }}>
    <div style={{ position: 'absolute', left: size * 0.22, top: size * 0.22, width: size * 0.56, height: size * 0.56, borderRadius: '50%', background: `radial-gradient(circle at 38% 34%, rgba(255,255,255,0.45), ${c} 45%, rgba(0,0,0,0.35) 100%)` }} />
  </div>
);

const Placard: React.FC<{ i: number; taken: boolean }> = ({ i, taken }) => {
  const d = DISHES[i];
  return (
    <div style={{ position: 'absolute', inset: 0, borderRadius: 14, background: '#15121c', boxShadow: `inset 0 0 0 2px ${taken ? d.c : 'rgba(242,239,228,0.14)'}`, padding: '18px 22px' }}>
      <div style={{ ...rec(1, 0, 700), fontSize: 18, letterSpacing: '0.16em', color: d.c }}>{`0${i + 1} ${d.k}`}</div>
      <div style={{ ...rec(0, 0.5, 520), fontSize: 30, color: T.mineral, marginTop: 8, lineHeight: 1.15 }}>{d.v}</div>
    </div>
  );
};

const World: React.FC<{ f: number; cam: Cam }> = ({ f, cam }) => {
  const stand = TRAVEL(prog(f, D, D + 26));
  const trayX = TRAY_X(f);
  const V = spinAbout(Z, X, -stand * (Math.PI / 2));
  const trayC = v3(trayX, mix(-8, -440, stand), mix(170, 150, stand));
  const answerT = HOUSE(prog(f, C.answer, C.answer + 10));
  const typed = 'how do I build passive income?';
  const studyOn = HOUSE(prog(f, C.study - 30, C.study + 10));
  const noteT = settle(prog(f, C.note - 8, C.note + 4), 1.0);
  const quizT = RESOLVE(prog(f, C.quiz - 4, C.quiz + 14));
  return (
    <>
      {/* the floor + the counter */}
      <Plane cam={cam} c={v3(2000, 240, -600)} U={X} V={Z} w={9000} h={5000} z={-400000}>
        <div style={{ position: 'absolute', inset: 0, background: '#07060a' }} />
      </Plane>
      <Box cam={cam} c={v3(1500, 110, -150)} size={[3900, 220, 440]} color="#18131a" fog={FOG} edge="rgba(155,123,255,0.25)" top={<div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #1f1924, #2a2130 50%, #1f1924)' }} />} />
      {/* heat lamps (warm light over each dish) */}
      {DISHES.map((d, i) => (
        <Plane key={`l${i}`} cam={cam} c={v3(d.x, -220, -330)} w={520} h={420} fog={FOG} z={-90000}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 20%, rgba(255,170,90,0.16), rgba(255,170,90,0) 65%)' }} />
        </Plane>
      ))}
      {/* the snack: one answer, on a saucer */}
      <Plane cam={cam} c={v3(0, -1, -150)} U={X} V={Z} w={220} h={220} fog={FOG} z={30000}>
        <Plate c="#3a3346" size={220} />
      </Plane>
      <Plane cam={cam} c={v3(0, -120, -170)} w={440} h={200} fog={FOG}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: 18, background: '#f2efe4', padding: '16px 20px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', borderRadius: 22, background: '#e4dfd0', ...rec(0, 0, 500), fontSize: 18, color: '#2a2630' }}>
            <span>⌕</span>
            {typed}
            {f < C.answer ? <span style={{ opacity: Math.floor(f / 8) % 2 }}>|</span> : null}
          </div>
          <div style={{ marginTop: 14, ...rec(0, 0.3, 500), fontSize: 19, lineHeight: 1.3, color: '#2a2630', opacity: answerT, clipPath: `inset(0 ${(1 - answerT) * 100}% 0 0)` }}>Earn money with little ongoing effort, e.g. affiliate links.</div>
          <div style={{ marginTop: 8, ...rec(1, 0, 600), fontSize: 13, letterSpacing: '0.14em', color: '#8a8494', opacity: answerT }}>ONE ANSWER</div>
        </div>
      </Plane>
      {/* the buffet */}
      {DISHES.map((d, i) => {
        const at = C.picks[i];
        const t = TRAVEL(prog(f, at - 14, at));
        const slot = v3(trayX - 330 + i * 220, -24, 170);
        const home = v3(d.x, -2, -150);
        const lift = Math.sin(Math.PI * t) * -220;
        const onTray = f >= at;
        let p = vlerp(home, slot, t);
        p = v3(p.x, p.y + lift, p.z);
        if (onTray) p = slot;
        const toOutline = HOUSE(prog(f, D + 8 + i * 4, D + 30 + i * 4));
        return (
          <React.Fragment key={d.k}>
            <Plane cam={cam} c={v3(d.x, -140, -330)} w={420} h={150} fog={FOG}>
              <Placard i={i} taken={f >= at} />
            </Plane>
            {toOutline < 1 ? (
              <Plane cam={cam} c={p} U={X} V={Z} w={200} h={200} fog={FOG} opacity={1 - toOutline} z={onTray || t > 0 ? 60000 : 30000}>
                <Plate c={d.c} size={200} />
              </Plane>
            ) : null}
          </React.Fragment>
        );
      })}
      {/* the tray (hero): slides, fills, stands up into the course */}
      <Plane cam={cam} c={trayC} U={X} V={V} w={mix(840, 1000, stand)} h={mix(300, 560, stand)} fog={FOG} z={stand > 0.3 ? 70000 : 40000}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: 26, background: stand > 0.5 ? '#13101a' : `${VIOLET}`, boxShadow: `inset 0 0 0 3px ${VIOLET}, 0 30px 80px rgba(0,0,0,0.5)` }} />
        {stand > 0.5 ? (
          <div style={{ position: 'absolute', inset: 0, padding: '34px 44px' }}>
            <div style={{ ...rec(1, 0, 700), fontSize: 18, letterSpacing: '0.16em', color: T.mineral3 }}>COURSE PREVIEW · INSPECT THE PLAN BEFORE YOU START</div>
            {CHAPTERS.map((c, i) => {
              const a = settle(prog(f, C.chapters[i] - 6, C.chapters[i] + 4), 1.0);
              return (
                <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '17px 0', borderBottom: '1px solid rgba(242,239,228,0.12)', opacity: clamp(a), transform: `translateX(${(1 - clamp(a)) * 60}px)` }}>
                  <span style={{ fontFamily: T.serif, fontSize: 48, color: DISHES[i].c, width: 44 }}>{i + 1}</span>
                  <span style={{ ...rec(0, 0.4, 480), fontSize: 32, color: T.mineral }}>{c}</span>
                </div>
              );
            })}
          </div>
        ) : null}
      </Plane>
      {/* the real study surface */}
      <Plane cam={cam} c={SCREEN} w={SW} h={SH} opacity={studyOn} z={-60000}>
        <Img src={staticFile('img/bb-screen.png')} style={{ width: SW, height: SH, borderRadius: 14, boxShadow: `0 0 120px rgba(155,123,255,${0.3 * studyOn})` }} />
        {/* a note, attached to the lesson */}
        {f >= C.note - 8 ? (
          <div style={{ position: 'absolute', left: 1496, top: 190, width: 250, padding: '14px 16px', borderRadius: 10, background: '#fde68a', color: '#2a2630', ...rec(0, 0.8, 520), fontSize: 20, lineHeight: 1.25, transform: `translateY(${(1 - clamp(noteT)) * -80}px) rotate(${mix(-8, -2, clamp(noteT))}deg) scale(${mix(0.8, 1, clamp(noteT))})`, opacity: clamp(noteT * 2), boxShadow: '0 10px 30px rgba(0,0,0,0.45)' }}>
            Pick products my audience already trusts.
            <div style={{ ...rec(1, 0, 600), fontSize: 12, letterSpacing: '0.12em', marginTop: 8, color: '#7a6a2a' }}>ATTACHED · CH 4</div>
          </div>
        ) : null}
        {/* the chapter quiz fills the progress bar */}
        <div style={{ position: 'absolute', left: 868, top: 130, width: 78 * quizT, height: 10, borderRadius: 5, background: T.signal, boxShadow: `0 0 ${20 * quizT}px ${T.signal}` }} />
        {quizT > 0.3 ? (
          <div style={{ position: 'absolute', left: 820, top: 160, padding: '6px 12px', borderRadius: 8, background: 'rgba(8,8,6,0.85)', ...rec(1, 0, 600), fontSize: 18, color: T.signal, opacity: HOUSE(prog(f, C.quiz, C.quiz + 12)) }}>✓ chapter quiz · 3/3</div>
        ) : null}
      </Plane>
    </>
  );
};

export const BrainBuffet: React.FC = () => {
  const f = useCurrentFrame();
  const cam = CAM.at(f);
  const endDim = HOUSE(prog(f, C.end - 10, C.end + 16));
  const line = (a: number, b: number) => HOUSE(prog(f, a, a + 14)) * (1 - HOUSE(prog(f, b, b + 10)));
  const words: [string, number][] = [
    ['An answer is a snack.', line(C.saucer - 6, C.picks[0] - 16)],
    ['A subject is a meal.', line(C.picks[0] - 6, D - 10)],
    ['Your choices, plated into a course.', line(D + 18, C.study + 20)],
  ];
  return (
    <AbsoluteFill style={{ background: '#060509', overflow: 'hidden' }}>
      <Blur
        ranges={[
          [34, 96, 8],
          [D - 2, D + 28, 10],
          [C.study, C.study + 36, 10],
        ]}
      >
        <AbsoluteFill style={{ filter: `brightness(${1 - 0.72 * endDim}) blur(${5 * endDim}px)` }}>
          <World f={f} cam={cam} />
        </AbsoluteFill>
      </Blur>
      <AbsoluteFill style={{ opacity: 1 - endDim }}>
        <div style={{ position: 'absolute', left: 120, top: 92, ...rec(1, 0, 600), fontSize: 20, letterSpacing: '0.2em', color: VIOLET, opacity: HOUSE(prog(f, C.saucer - 10, C.saucer + 6)) }}>BRAINBUFFET · PERSONAL LEARNING PATHWAYS</div>
        {words.map(([w, o]) =>
          o > 0.002 ? (
            <div key={w} style={{ position: 'absolute', left: 120, top: 128, fontFamily: T.serif, fontStyle: 'italic', fontSize: 84, color: T.mineral, opacity: o, clipPath: `inset(0 ${(1 - o) * 100}% -20% 0)` }}>
              {w}
            </div>
          ) : null
        )}
      </AbsoluteFill>
      <Flash a={f >= D ? 0.14 * Math.exp(-(f - D) / 5) : 0} color="155,123,255" />
      <EndCard g={g} index="05 / LEARNING PRODUCT" title="BrainBuffet" line="Each answer makes the next choice more useful." accent={VIOLET} from={C.end} />
      <Vignette s={0.6} />
      <Grain />
      <Audio src={staticFile('audio/brainbuffet_mix.wav')} />
    </AbsoluteFill>
  );
};

