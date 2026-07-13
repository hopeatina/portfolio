import { loadFont as loadBricolage } from "@remotion/google-fonts/BricolageGrotesque";
import { loadFont as loadInstrument } from "@remotion/google-fonts/InstrumentSerif";
import { loadFont as loadJetBrains } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont as loadManrope } from "@remotion/google-fonts/Manrope";
import { Audio } from "@remotion/media";
import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const { fontFamily: display } = loadBricolage("normal", { weights: ["400", "500", "600", "700", "800"], subsets: ["latin"] });
const { fontFamily: serif } = loadInstrument("italic", { weights: ["400"], subsets: ["latin"] });
const { fontFamily: body } = loadManrope("normal", { weights: ["400", "500", "600", "700"], subsets: ["latin"] });
const { fontFamily: mono } = loadJetBrains("normal", { weights: ["400", "500", "600"], subsets: ["latin"] });

const color = {
  carbon: "#080A09",
  mineral: "#F2EFE7",
  signal: "#B7F34A",
  amber: "#D69A45",
  cold: "#48A7D8",
  heat: "#FF5738",
  dim: "#93958C",
  rule: "rgba(242,239,231,.18)",
};

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

const SCENES = [
  { id: "held", from: 0, duration: 129 },
  { id: "visible", from: 129, duration: 116 },
  { id: "proof", from: 245, duration: 58 },
  { id: "architecture", from: 303, duration: 115 },
  { id: "gate", from: 418, duration: 58 },
  { id: "range", from: 476, duration: 114 },
  { id: "human", from: 590, duration: 116 },
  { id: "resolution", from: 706, duration: 115 },
  { id: "memory", from: 821, duration: 58 },
];

const enter = (frame: number, fps: number, delay = 0, duration = 22) => spring({
  frame: frame - delay,
  fps,
  durationInFrames: duration,
  config: { damping: 200, stiffness: 170, mass: 0.9 },
});

const Grid = ({ light = false }: { light?: boolean }) => (
  <AbsoluteFill style={{
    opacity: light ? 0.09 : 0.11,
    backgroundImage: `linear-gradient(${light ? "rgba(8,10,9,.34)" : "rgba(242,239,231,.28)"} 1px, transparent 1px), linear-gradient(90deg, ${light ? "rgba(8,10,9,.34)" : "rgba(242,239,231,.28)"} 1px, transparent 1px)`,
    backgroundSize: "60px 60px",
  }} />
);

const Label = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14, color: light ? color.carbon : color.signal, fontFamily: mono, fontSize: 16, fontWeight: 600, letterSpacing: ".11em", textTransform: "uppercase" }}>
    <span style={{ width: 34, height: 2, background: light ? color.heat : color.signal }} />
    {children}
  </div>
);

const MaterialWeave = ({ light = false, opacity = 1 }: { light?: boolean; opacity?: number }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const draw = interpolate(frame, [0, Math.min(46, durationInFrames * 0.5)], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const drift = interpolate(frame, [0, durationInFrames], [-18, 18], clamp);
  const paths = [
    "M-80 340C95 92 250 102 398 276S724 494 1180 86",
    "M-60 104C132 442 354 486 520 230S870 -18 1180 350",
    "M110 -60C238 180 334 260 538 268S884 174 1012 620",
    "M-50 510C210 336 322 650 610 472S876 246 1160 530",
  ];
  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity, transform: `translateY(${drift}px) rotate(-1.4deg)`, overflow: "visible" }}>
      <defs>
        <linearGradient id="film-fiber" x1="0" x2="1"><stop stopColor={color.cold} /><stop offset=".45" stopColor={light ? color.carbon : color.mineral} /><stop offset="1" stopColor={color.signal} /></linearGradient>
        <filter id="film-depth" x="-30%" y="-40%" width="160%" height="180%"><feDropShadow dx="0" dy="12" stdDeviation="9" floodColor="#000" floodOpacity={light ? ".25" : ".72"} /><feDropShadow dx="-5" dy="-3" stdDeviation="3" floodColor={color.heat} floodOpacity=".28" /></filter>
      </defs>
      <g filter="url(#film-depth)">{paths.map((d) => <path key={`shadow-${d}`} d={d} fill="none" stroke={light ? "#AAA99F" : "#5C5D58"} strokeWidth="18" strokeLinecap="round" strokeDasharray="1800" strokeDashoffset={(1 - draw) * 1800} />)}</g>
      <g>{paths.map((d) => <path key={`core-${d}`} d={d} fill="none" stroke="url(#film-fiber)" strokeWidth="2" strokeLinecap="round" strokeDasharray="1800" strokeDashoffset={(1 - draw) * 1800} />)}</g>
    </svg>
  );
};

const SiteCrop = ({ src, top = 0, left = 0, width = 1320, scale = 1, dim = false }: { src: string; top?: number; left?: number; width?: number; scale?: number; dim?: boolean }) => (
  <Img src={staticFile(src)} style={{ position: "absolute", top, left, width, height: "auto", maxWidth: "none", transform: `scale(${scale})`, transformOrigin: "top left", filter: dim ? "brightness(.5) saturate(.72)" : undefined }} />
);

const HeldSignal = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const quote = "I’m less about talk and more about action.";
  const characters = Math.floor(interpolate(frame, [8, 100], [0, quote.length], clamp));
  const proof = enter(frame, fps, 70, 24);
  return (
    <AbsoluteFill style={{ background: color.carbon, color: color.mineral, overflow: "hidden" }}>
      <Img src={staticFile("images/generated/inspection-field.jpg")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "47% center", filter: "brightness(.34) contrast(1.25) saturate(.76)" }} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(8,10,9,.08), rgba(8,10,9,.92))" }} />
      <div style={{ position: "absolute", inset: "170px -220px 540px 220px" }}><MaterialWeave opacity={0.88} /></div>
      <div style={{ position: "absolute", left: 68, right: 68, top: 94 }}><Label>Hope Atina · Config 2021</Label></div>
      <div style={{ position: "absolute", left: 68, right: 68, top: 560, minHeight: 500, fontFamily: serif, fontSize: 116, lineHeight: .92, letterSpacing: "-.052em" }}>
        “{quote.slice(0, characters)}<span style={{ color: color.signal, opacity: characters < quote.length ? 1 : 0 }}>▌</span>{characters >= quote.length ? "”" : ""}
      </div>
      <div style={{ position: "absolute", right: 68, bottom: 104, width: 370, height: 208, overflow: "hidden", borderTop: `2px solid ${color.signal}`, opacity: proof, transform: `translateY(${interpolate(proof, [0, 1], [34, 0])}px)` }}>
        <Img src={staticFile("images/evidence/figma-config-2021.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ position: "absolute", left: 68, bottom: 112, color: color.dim, fontFamily: mono, fontSize: 15, lineHeight: 1.6, letterSpacing: ".1em", textTransform: "uppercase" }}>Engineer / founder<br />product thinker</div>
    </AbsoluteFill>
  );
};

const VisibleSystem = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const title = enter(frame, fps, 0, 24);
  const image = enter(frame, fps, 8, 30);
  const travel = interpolate(frame, [0, 116], [0, -590], clamp);
  return (
    <AbsoluteFill style={{ background: color.carbon, color: color.mineral, overflow: "hidden" }}>
      <Grid />
      <div style={{ position: "absolute", left: 68, top: 96, opacity: title }}><Label>One authored system</Label></div>
      <div style={{ position: "absolute", left: 68, top: 212, width: 760, opacity: title, fontFamily: display, fontSize: 112, fontWeight: 650, lineHeight: .87, letterSpacing: "-.073em" }}>
        Intelligence<br /><span style={{ color: color.signal }}>survives</span><br />the handoff.
      </div>
      <div style={{ position: "absolute", right: -120, top: 672, width: 960, height: 1030, overflow: "hidden", opacity: image, transform: "rotate(2.2deg)", border: `1px solid ${color.rule}`, boxShadow: "-40px 50px 100px rgba(0,0,0,.55)" }}>
        <SiteCrop src="video/portfolio-film/v6-home-full.png" top={travel} left={-50} width={1080} />
      </div>
      <div style={{ position: "absolute", left: 68, bottom: 120, width: 290, color: color.dim, fontFamily: body, fontSize: 23, lineHeight: 1.45 }}>Not another AI wrapper. The context, quality, consequence, and proof beneath the clients.</div>
      <div style={{ position: "absolute", left: 0, top: 654, width: `${interpolate(frame, [12, 70], [0, 100], clamp)}%`, height: 4, background: color.signal, boxShadow: `0 -8px 0 ${color.heat}, 0 8px 0 ${color.cold}` }} />
    </AbsoluteFill>
  );
};

const ProofSprint = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tiles = [
    { src: "images/case-studies/widgets/initiative-pulse.png", x: 44, y: 330, w: 460, rot: -2 },
    { src: "images/case-studies/orgx-v4/quality-settings.png", x: 358, y: 112, w: 700, rot: 1.6 },
    { src: "images/case-studies/widgets/decisions.png", x: 620, y: 720, w: 410, rot: 2.2 },
    { src: "images/case-studies/orgx-v4/artifact-receipt.png", x: 60, y: 1110, w: 820, rot: -1 },
  ];
  return (
    <AbsoluteFill style={{ background: color.carbon, color: color.mineral, overflow: "hidden" }}>
      <Grid />
      <div style={{ position: "absolute", left: 56, top: 62, zIndex: 10 }}><Label>Real surfaces / fast proof</Label></div>
      {tiles.map((tile, index) => {
        const p = enter(frame, fps, index * 6, 16);
        return <Img key={tile.src} src={staticFile(tile.src)} style={{ position: "absolute", left: tile.x, top: tile.y, width: tile.w, height: "auto", opacity: p, transform: `translateY(${interpolate(p, [0, 1], [72, 0])}px) rotate(${tile.rot}deg) scale(${interpolate(p, [0, 1], [.94, 1])})`, border: `1px solid ${color.rule}`, boxShadow: "0 22px 70px rgba(0,0,0,.6)" }} />;
      })}
      <div style={{ position: "absolute", left: 56, right: 56, bottom: 70, display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 15, color: color.dim, textTransform: "uppercase" }}><span>brief</span><span>quality</span><span>decision</span><span>receipt</span></div>
    </AbsoluteFill>
  );
};

const ArchitectureBreath = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const mechanisms = ["Pass the work", "Set the bar", "Prove movement", "Govern tools", "Reweave failure"];
  return (
    <AbsoluteFill style={{ background: color.carbon, color: color.mineral, overflow: "hidden" }}>
      <Grid />
      <div style={{ position: "absolute", inset: "0 430px 0 -280px", opacity: .72 }}><MaterialWeave /></div>
      <div style={{ position: "absolute", left: 68, top: 110 }}><Label>OrgX / system anatomy</Label></div>
      <div style={{ position: "absolute", left: 68, top: 300, width: 440 }}>
        <div style={{ fontFamily: display, fontSize: 94, fontWeight: 650, lineHeight: .9, letterSpacing: "-.07em" }}>One graph.</div>
        <div style={{ marginTop: 18, color: color.signal, fontFamily: serif, fontSize: 78, fontWeight: 400, lineHeight: .94, letterSpacing: "-.04em" }}>Five controls.</div>
      </div>
      <div style={{ position: "absolute", right: 68, top: 218, width: 460 }}>
        {mechanisms.map((item, index) => {
          const p = enter(frame, fps, 12 + index * 12, 18);
          return <div key={item} style={{ display: "grid", gridTemplateColumns: "48px 1fr", gap: 18, padding: "30px 0", borderTop: `1px solid ${color.rule}`, opacity: p, transform: `translateX(${interpolate(p, [0, 1], [42, 0])}px)` }}><span style={{ color: index === 3 ? color.heat : color.signal, fontFamily: mono, fontSize: 16 }}>0{index + 1}</span><span style={{ fontFamily: display, fontSize: 34, fontWeight: 550, letterSpacing: "-.035em" }}>{item}</span></div>;
        })}
      </div>
      <div style={{ position: "absolute", left: 68, bottom: 100, width: 420, color: color.dim, fontFamily: body, fontSize: 22, lineHeight: 1.48 }}>A goal becomes work. Work meets a boundary. The result returns with enough evidence to teach the next run.</div>
    </AbsoluteFill>
  );
};

const JudgmentGate = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = enter(frame, fps, 0, 18);
  const gate = interpolate(frame, [5, 48], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ background: color.mineral, color: color.carbon, overflow: "hidden" }}>
      <Grid light />
      <div style={{ position: "absolute", left: 66, top: 86 }}><Label light>Judgment is a product surface</Label></div>
      <div style={{ position: "absolute", left: 66, top: 248, right: 66, opacity: p, fontFamily: display, fontSize: 108, fontWeight: 650, lineHeight: .88, letterSpacing: "-.075em" }}>You set the bar.<br /><span style={{ fontFamily: serif, fontWeight: 400, color: color.heat }}>Consequence sets the gate.</span></div>
      <div style={{ position: "absolute", left: 66, right: 66, top: 720, height: 850, overflow: "hidden", background: color.carbon, clipPath: `inset(0 ${100 - gate * 100}% 0 0)` }}>
        <SiteCrop src="images/case-studies/orgx-v4/quality-settings.png" top={0} left={-70} width={1080} />
      </div>
      <div style={{ position: "absolute", left: 66, bottom: 66, fontFamily: mono, fontSize: 16, color: color.carbon, letterSpacing: ".08em", textTransform: "uppercase" }}>Owner-authored quality / human-gated external effects</div>
    </AbsoluteFill>
  );
};

const RangeRun = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const projects = [
    ["OrgX", "agent continuity", color.signal],
    ["Alma", "regulated production", color.heat],
    ["PerfPulse", "local-first systems", color.cold],
    ["OrgX for OpenClaw", "plugin architecture", color.mineral],
  ] as const;
  return (
    <AbsoluteFill style={{ background: color.carbon, color: color.mineral, overflow: "hidden" }}>
      <Grid />
      <div style={{ position: "absolute", left: 68, top: 92 }}><Label>Range under pressure</Label></div>
      <div style={{ position: "absolute", left: 68, top: 210, right: 68, fontFamily: display, fontSize: 88, fontWeight: 650, lineHeight: .9, letterSpacing: "-.065em" }}>Different material.<br /><span style={{ fontFamily: serif, fontWeight: 400 }}>The same depth.</span></div>
      <div style={{ position: "absolute", left: 68, right: 68, top: 580 }}>
        {projects.map(([name, pressure, accent], index) => {
          const p = enter(frame, fps, 12 + index * 17, 18);
          return <div key={name} style={{ display: "grid", gridTemplateColumns: "54px 1fr auto", alignItems: "center", minHeight: 190, borderTop: `1px solid ${color.rule}`, opacity: p, transform: `translateY(${interpolate(p, [0, 1], [42, 0])}px)` }}><span style={{ color: accent, fontFamily: mono, fontSize: 16 }}>0{index + 1}</span><span style={{ color: accent, fontFamily: display, fontSize: name.length > 12 ? 48 : 66, fontWeight: 600, letterSpacing: "-.05em" }}>{name}</span><span style={{ color: color.dim, fontFamily: mono, fontSize: 14, letterSpacing: ".08em", textTransform: "uppercase" }}>{pressure}</span></div>;
        })}
      </div>
      <div style={{ position: "absolute", left: 68, right: 68, bottom: 70, height: 170, overflow: "hidden", borderTop: `2px solid ${color.signal}` }}><SiteCrop src="video/portfolio-film/v6-work-full.png" top={-230} left={0} width={944} dim /></div>
    </AbsoluteFill>
  );
};

const HumanSignal = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rice = enter(frame, fps, 2, 24);
  const figma = enter(frame, fps, 18, 24);
  const copy = enter(frame, fps, 34, 24);
  return (
    <AbsoluteFill style={{ background: color.carbon, color: color.mineral, overflow: "hidden" }}>
      <Grid />
      <div style={{ position: "absolute", inset: "250px -260px 80px 330px", opacity: .38 }}><MaterialWeave /></div>
      <div style={{ position: "absolute", left: 66, top: 88 }}><Label>The person is part of the architecture</Label></div>
      <div style={{ position: "absolute", left: 58, top: 270, width: 610, height: 475, overflow: "hidden", border: `1px solid ${color.rule}`, opacity: rice, transform: `rotate(-2deg) translateY(${interpolate(rice, [0, 1], [46, 0])}px)` }}><Img src={staticFile("images/evidence/rice-dermashift-team.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
      <div style={{ position: "absolute", right: 52, top: 710, width: 650, height: 366, overflow: "hidden", border: `1px solid ${color.rule}`, opacity: figma, transform: `rotate(1.8deg) translateY(${interpolate(figma, [0, 1], [46, 0])}px)` }}><Img src={staticFile("images/evidence/figma-config-2021.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
      <div style={{ position: "absolute", left: 66, right: 66, bottom: 120, opacity: copy, fontFamily: display, fontSize: 65, fontWeight: 560, lineHeight: .98, letterSpacing: "-.052em" }}>Bioengineering taught me systems.<br /><span style={{ color: color.cold }}>Music taught me timing.</span><br /><span style={{ color: color.signal }}>Community made creation multiplayer.</span></div>
    </AbsoluteFill>
  );
};

const RecruiterResolution = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const portrait = enter(frame, fps, 4, 28);
  const text = enter(frame, fps, 14, 24);
  const receipts = ["Context that travels", "Quality you author", "ROI tied to goals", "Recovery with limits"];
  return (
    <AbsoluteFill style={{ background: color.carbon, color: color.mineral, overflow: "hidden" }}>
      <Img src={staticFile("images/generated/reflection-field.jpg")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.28) contrast(1.25) saturate(.7)" }} />
      <AbsoluteFill style={{ background: "linear-gradient(90deg, rgba(8,10,9,.98), rgba(8,10,9,.32))" }} />
      <div style={{ position: "absolute", right: -70, top: 160, width: 640, height: 900, overflow: "hidden", opacity: portrait, clipPath: `polygon(12% 0,100% 0,100% 100%,0 92%)`, borderBottom: `4px solid ${color.signal}` }}><Img src={staticFile("images/hope-profile.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 24%" }} /></div>
      <div style={{ position: "absolute", left: 66, top: 100 }}><Label>What I bring into the room</Label></div>
      <div style={{ position: "absolute", left: 66, top: 300, width: 620, opacity: text, fontFamily: display, fontSize: 104, fontWeight: 650, lineHeight: .86, letterSpacing: "-.074em" }}>Founding<br />engineer.<br /><span style={{ color: color.cold }}>AI engineer.</span><br /><span style={{ fontFamily: serif, fontWeight: 400, color: color.signal }}>Product thinker.</span></div>
      <div style={{ position: "absolute", left: 66, right: 66, bottom: 80, display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {receipts.map((item, index) => <div key={item} style={{ padding: "22px 14px 22px 0", borderTop: `1px solid ${color.rule}`, color: index === 3 ? color.signal : color.mineral, fontFamily: mono, fontSize: 15, letterSpacing: ".06em", textTransform: "uppercase" }}>{String(index + 1).padStart(2, "0")} / {item}</div>)}
      </div>
    </AbsoluteFill>
  );
};

const MemoryHold = () => {
  const frame = useCurrentFrame();
  const resolve = interpolate(frame, [0, 42], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <AbsoluteFill style={{ background: color.carbon, color: color.mineral, overflow: "hidden" }}>
      <Grid />
      <div style={{ position: "absolute", inset: "260px -320px 480px 260px", opacity: .75 }}><MaterialWeave /></div>
      <div style={{ position: "absolute", left: 66, top: 102 }}><Label>Hope Atina</Label></div>
      <div style={{ position: "absolute", left: 66, top: 640, right: 66, fontFamily: display, fontSize: 116, fontWeight: 650, lineHeight: .87, letterSpacing: "-.075em" }}>Bring me the<br />system that needs<br /><span style={{ fontFamily: serif, fontWeight: 400, color: color.signal }}>to become coherent.</span></div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1350, height: 4, transform: `scaleX(${resolve})`, transformOrigin: "left", background: color.signal, boxShadow: `0 -8px 0 ${color.heat}, 0 8px 0 ${color.cold}` }} />
      <div style={{ position: "absolute", left: 66, right: 66, bottom: 70, display: "flex", justifyContent: "space-between", alignItems: "end", borderTop: `1px solid ${color.rule}`, paddingTop: 24, fontFamily: mono, textTransform: "uppercase" }}><span style={{ fontSize: 25, fontWeight: 600 }}>hopeatina.com</span><span style={{ color: color.dim, fontSize: 14, lineHeight: 1.55, letterSpacing: ".08em", textAlign: "right" }}>Original track<br />UBEAT V1</span></div>
    </AbsoluteFill>
  );
};

const CutTrace = () => {
  const frame = useCurrentFrame();
  const cuts = SCENES.slice(1).map((scene) => scene.from);
  const distance = Math.min(...cuts.map((cut) => Math.abs(frame - cut)));
  const opacity = interpolate(distance, [0, 2, 4], [.9, .28, 0], clamp);
  return opacity <= 0 ? null : <AbsoluteFill style={{ zIndex: 100, pointerEvents: "none", opacity }}><div style={{ position: "absolute", left: -40, right: -40, top: "47%", height: 4, background: color.signal, transform: "rotate(-1.8deg)", boxShadow: `0 -8px 0 ${color.heat},0 8px 0 ${color.cold}` }} /></AbsoluteFill>;
};

const sceneComponents = [HeldSignal, VisibleSystem, ProofSprint, ArchitectureBreath, JudgmentGate, RangeRun, HumanSignal, RecruiterResolution, MemoryHold];

export const PortfolioFilm = () => {
  const musicVolume = (frame: number) => {
    const release = interpolate(frame, [105, 139], [.2, .78], clamp);
    const fade = interpolate(frame, [844, 878], [1, 0], clamp);
    return release * fade;
  };
  return (
    <AbsoluteFill style={{ background: color.carbon }}>
      <Audio src={staticFile("video/portfolio-film/ubeat-portfolio-cut.mp3")} volume={musicVolume} />
      <Sequence from={6} durationInFrames={107} premountFor={30}><Audio src={staticFile("video/portfolio-film/hope-config-voice.wav")} volume={1} /></Sequence>
      {SCENES.map((scene, index) => {
        const Component = sceneComponents[index];
        return <Sequence key={scene.id} from={scene.from} durationInFrames={scene.duration} premountFor={30}><Component /></Sequence>;
      })}
      <CutTrace />
    </AbsoluteFill>
  );
};

export const FramedPortfolioFilm = () => {
  const { width, height } = useVideoConfig();
  const scale = height / 1920;
  const filmWidth = 1080 * scale;
  const wide = width / height > 1.3;
  return (
    <AbsoluteFill style={{ background: color.carbon, color: color.mineral, overflow: "hidden" }}>
      <Grid />
      <div style={{ position: "absolute", top: 0, left: (width - filmWidth) / 2, width: 1080, height: 1920, transform: `scale(${scale})`, transformOrigin: "top left", overflow: "hidden", boxShadow: "0 0 120px rgba(0,0,0,.8)" }}><PortfolioFilm /></div>
      <div style={{ position: "absolute", left: wide ? 52 : 26, top: wide ? 48 : 30, width: Math.max(140, (width - filmWidth) / 2 - 84), fontFamily: display, textTransform: "uppercase" }}><div style={{ color: color.signal, fontFamily: mono, fontSize: wide ? 16 : 11, letterSpacing: ".12em" }}>Hope Atina</div>{wide ? <div style={{ marginTop: 190, fontSize: 66, fontWeight: 650, lineHeight: .88, letterSpacing: "-.065em" }}>Depth<br />made<br />visible.</div> : null}</div>
      <div style={{ position: "absolute", right: wide ? 52 : 26, bottom: wide ? 48 : 30, width: Math.max(140, (width - filmWidth) / 2 - 84), color: color.dim, fontFamily: mono, fontSize: wide ? 14 : 10, lineHeight: 1.65, letterSpacing: ".08em", textAlign: "right", textTransform: "uppercase" }}>{wide ? <>Engineer<br />Founder<br />Product thinker<br /></> : null}<span style={{ color: color.mineral }}>hopeatina.com</span></div>
      <div style={{ position: "absolute", top: 0, bottom: 0, left: (width - filmWidth) / 2 - 3, width: 3, background: color.heat }} /><div style={{ position: "absolute", top: 0, bottom: 0, left: (width + filmWidth) / 2, width: 3, background: color.cold }} />
    </AbsoluteFill>
  );
};

export const PortfolioFilmCover = () => (
  <AbsoluteFill style={{ background: color.carbon, color: color.mineral, overflow: "hidden" }}>
    <Img src={staticFile("images/generated/inspection-field.jpg")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "48% center", filter: "brightness(.32) contrast(1.28) saturate(.74)" }} />
    <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(8,10,9,.05), rgba(8,10,9,.94))" }} />
    <div style={{ position: "absolute", inset: "170px -260px 520px 220px" }}><MaterialWeave opacity={.82} /></div>
    <div style={{ position: "absolute", left: 66, top: 78 }}><Label>Hope Atina · portfolio film</Label></div>
    <div style={{ position: "absolute", left: 66, right: 66, top: 620, fontFamily: display, fontSize: 124, fontWeight: 650, lineHeight: .85, letterSpacing: "-.078em" }}>Intelligence<br /><span style={{ color: color.signal }}>survives</span><br />the handoff.</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1390, height: 4, background: color.signal, boxShadow: `0 -9px 0 ${color.heat}, 0 9px 0 ${color.cold}` }} />
    <div style={{ position: "absolute", left: 66, right: 66, bottom: 70, display: "flex", justifyContent: "space-between", borderTop: `1px solid ${color.rule}`, paddingTop: 24, fontFamily: mono, fontSize: 15, letterSpacing: ".08em", textTransform: "uppercase" }}><span>Engineer · founder · product thinker</span><span style={{ color: color.dim }}>UBEAT V1</span></div>
  </AbsoluteFill>
);
