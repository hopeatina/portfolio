import { loadFont as loadNewsreader } from "@remotion/google-fonts/Newsreader";
import { loadFont as loadRecursive } from "@remotion/google-fonts/Recursive";
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

const { fontFamily: sans } = loadRecursive("normal", {
  weights: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
const { fontFamily: serif } = loadNewsreader("italic", {
  weights: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

const palette = {
  carbon: "#080806",
  mineral: "#F2EFE4",
  signal: "#C7FF36",
  heat: "#FF5738",
  cold: "#48C7FF",
  dim: "#9D9D92",
  line: "rgba(242,239,228,0.2)",
};

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const SCENES = {
  faultline: { from: 0, duration: 109 },
  hero: { from: 109, duration: 165 },
  continuity: { from: 274, duration: 162 },
  receipt: { from: 436, duration: 81 },
  range: { from: 517, duration: 162 },
  close: { from: 679, duration: 137 },
};

const appear = (frame: number, fps: number, delay = 0, duration = 22) =>
  spring({
    frame: frame - delay,
    fps,
    durationInFrames: duration,
    config: { damping: 200, mass: 0.9, stiffness: 180 },
  });

const Grid = ({ light = false }: { light?: boolean }) => (
  <AbsoluteFill
    style={{
      opacity: light ? 0.08 : 0.14,
      backgroundImage: `linear-gradient(${light ? "rgba(8,8,6,.35)" : "rgba(242,239,228,.35)"} 1px, transparent 1px), linear-gradient(90deg, ${light ? "rgba(8,8,6,.35)" : "rgba(242,239,228,.35)"} 1px, transparent 1px)`,
      backgroundSize: "72px 72px",
    }}
  />
);

const FilmIndex = ({
  label,
  index,
  total = "06",
  light = false,
}: {
  label: string;
  index: string;
  total?: string;
  light?: boolean;
}) => (
  <div
    style={{
      position: "absolute",
      top: 62,
      left: 64,
      right: 64,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: light ? palette.carbon : palette.mineral,
      fontFamily: sans,
      fontSize: 18,
      fontWeight: 650,
      letterSpacing: "0.13em",
      textTransform: "uppercase",
      zIndex: 20,
    }}
  >
    <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <span style={{ width: 12, height: 12, background: palette.signal }} />
      {label}
    </span>
    <span style={{ opacity: 0.55 }}>
      {index} / {total}
    </span>
  </div>
);

const Kicker = ({ children, color = palette.signal }: { children: React.ReactNode; color?: string }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 14,
      color,
      fontFamily: sans,
      fontSize: 18,
      fontWeight: 700,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
    }}
  >
    <span style={{ width: 42, height: 3, background: color }} />
    {children}
  </div>
);

const FaultlineFlash = () => {
  const frame = useCurrentFrame();
  const cuts = [109, 274, 436, 517, 679];
  const distance = Math.min(...cuts.map((cut) => Math.abs(frame - cut)));
  const opacity = interpolate(distance, [0, 2, 5], [0.9, 0.38, 0], clamp);
  if (opacity === 0) return null;

  return (
    <AbsoluteFill style={{ zIndex: 100, pointerEvents: "none", opacity }}>
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: -20,
          right: -20,
          height: 5,
          background: palette.signal,
          transform: "rotate(-1.6deg)",
          boxShadow: `0 -12px 0 ${palette.heat}, 0 12px 0 ${palette.cold}`,
        }}
      />
    </AbsoluteFill>
  );
};

const SpokenFaultline = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const quote = "I’m less about talk and more about action.";
  const characters = Math.floor(interpolate(frame, [5, 88], [0, quote.length], clamp));
  const line = interpolate(frame, [0, 100], [0, 100], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const source = appear(frame, fps, 58, 18);
  const imageScale = interpolate(frame, [0, 109], [1.18, 1.08], clamp);

  return (
    <AbsoluteFill style={{ background: palette.carbon, color: palette.mineral, overflow: "hidden" }}>
      <Img
        src={staticFile("images/generated/inspection-field.jpg")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "53% center",
          transform: `scale(${imageScale})`,
          filter: "brightness(.48) contrast(1.18) saturate(.84)",
        }}
      />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(8,8,6,.26), rgba(8,8,6,.93))" }} />
      <FilmIndex label="A point of view" index="01" />
      <div style={{ position: "absolute", left: 64, right: 64, top: 485 }}>
        <Kicker>Hope Atina · Config 2021</Kicker>
        <div
          style={{
            marginTop: 48,
            minHeight: 460,
            fontFamily: serif,
            fontSize: 112,
            fontWeight: 400,
            lineHeight: 0.94,
            letterSpacing: "-0.052em",
            textWrap: "balance",
          }}
        >
          “{quote.slice(0, characters)}
          <span style={{ color: palette.signal, opacity: characters < quote.length ? 1 : 0 }}>▌</span>
          {characters >= quote.length ? "”" : ""}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 1330,
          height: 4,
          width: `${line}%`,
          background: palette.signal,
          boxShadow: `0 -8px 0 ${palette.heat}, 0 8px 0 ${palette.cold}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 64,
          bottom: 78,
          opacity: source,
          color: palette.dim,
          fontFamily: sans,
          fontSize: 17,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        Figma and Chill · connection, community, culture
      </div>
    </AbsoluteFill>
  );
};

const HeroPlane = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const heading = appear(frame, fps, 2);
  const plane = appear(frame, fps, 12, 28);
  const moveY = interpolate(frame, [0, 165], [44, -44], clamp);
  const reveal = interpolate(frame, [10, 38], [0, 100], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ background: palette.carbon, color: palette.mineral, overflow: "hidden" }}>
      <Grid />
      <FilmIndex label="The invisible layer" index="02" />
      <div style={{ position: "absolute", top: 232, left: 64, right: 64, opacity: heading }}>
        <Kicker>Engineer · founder · product thinker</Kicker>
        <div
          style={{
            marginTop: 42,
            fontFamily: sans,
            fontSize: 104,
            fontWeight: 760,
            lineHeight: 0.89,
            letterSpacing: "-0.075em",
            textTransform: "uppercase",
          }}
        >
          Make the
          <br />
          <span style={{ color: palette.signal }}>invisible</span>
          <br />
          layer visible.
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 845,
          left: 64,
          width: 952,
          height: 720,
          overflow: "hidden",
          opacity: plane,
          clipPath: `inset(0 ${100 - reveal}% 0 0)`,
          borderTop: `2px solid ${palette.signal}`,
          background: palette.carbon,
        }}
      >
        <Img
          src={staticFile("video/portfolio-film/v4-home.png")}
          style={{
            position: "absolute",
            top: moveY,
            left: 0,
            width: 1420,
            height: "auto",
            maxWidth: "none",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 64,
          right: 64,
          bottom: 82,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 16,
          fontFamily: sans,
          fontSize: 17,
          fontWeight: 650,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        {["Systems", "AI clients", "Interfaces"].map((item, index) => (
          <div key={item} style={{ borderTop: `1px solid ${palette.line}`, paddingTop: 17, color: index === 1 ? palette.cold : palette.mineral }}>
            {item}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const ContinuityModel = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const title = appear(frame, fps, 0);
  const scan = interpolate(frame, [0, 162], [0, 1], clamp);
  const imageY = interpolate(scan, [0, 1], [0, -145], clamp);
  const stages = ["Context survives", "Agents act", "Judgment gates risk", "Outcome becomes memory"];

  return (
    <AbsoluteFill style={{ background: palette.mineral, color: palette.carbon, overflow: "hidden" }}>
      <Grid light />
      <FilmIndex label="The operating model" index="03" light />
      <div style={{ position: "absolute", top: 226, left: 64, right: 64, opacity: title }}>
        <Kicker color={palette.heat}>Continuity is the real work</Kicker>
        <div
          style={{
            marginTop: 36,
            fontFamily: sans,
            fontSize: 94,
            fontWeight: 760,
            lineHeight: 0.91,
            letterSpacing: "-0.072em",
            textTransform: "uppercase",
          }}
        >
          Intelligence
          <br />
          <span style={{ fontFamily: serif, fontWeight: 400, textTransform: "none" }}>across handoffs.</span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 64,
          right: 64,
          top: 670,
          height: 655,
          overflow: "hidden",
          background: palette.carbon,
          border: `2px solid ${palette.carbon}`,
        }}
      >
        <Img
          src={staticFile("video/portfolio-film/v4-continuity.png")}
          style={{ width: "100%", height: "auto", transform: `translateY(${imageY}px) scale(1.08)`, transformOrigin: "top left" }}
        />
        <div
          style={{
            position: "absolute",
            top: `${interpolate(scan, [0, 1], [8, 92], clamp)}%`,
            left: 0,
            right: 0,
            height: 3,
            background: palette.signal,
            boxShadow: `0 -5px 0 ${palette.heat}, 0 5px 0 ${palette.cold}`,
          }}
        />
      </div>
      <div style={{ position: "absolute", left: 64, right: 64, bottom: 74 }}>
        {stages.map((stage, index) => {
          const progress = appear(frame, fps, 20 + index * 18, 16);
          return (
            <div
              key={stage}
              style={{
                display: "grid",
                gridTemplateColumns: "56px 1fr",
                gap: 18,
                alignItems: "center",
                borderTop: "1px solid rgba(8,8,6,.22)",
                padding: "20px 0",
                opacity: progress,
                transform: `translateX(${interpolate(progress, [0, 1], [30, 0])}px)`,
                fontFamily: sans,
                fontSize: 25,
                fontWeight: 630,
                letterSpacing: "-0.02em",
              }}
            >
              <span style={{ color: index === 2 ? palette.heat : palette.carbon, fontSize: 17, letterSpacing: ".12em" }}>0{index + 1}</span>
              {stage}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const ReceiptProof = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const title = appear(frame, fps, 0, 16);
  const aperture = interpolate(frame, [8, 58], [90, 420], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const drift = interpolate(frame, [0, 81], [0, -28], clamp);

  return (
    <AbsoluteFill style={{ background: palette.carbon, color: palette.mineral, overflow: "hidden" }}>
      <FilmIndex label="Proof, not posture" index="04" />
      <div style={{ position: "absolute", top: 208, left: 64, right: 64, opacity: title }}>
        <div
          style={{
            fontFamily: sans,
            fontSize: 88,
            fontWeight: 760,
            lineHeight: 0.91,
            letterSpacing: "-0.068em",
            textTransform: "uppercase",
          }}
        >
          Autonomy is easy.
          <br />
          <span style={{ color: palette.signal }}>Continuity is the work.</span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 580,
          left: 0,
          right: 0,
          height: 970,
          overflow: "hidden",
          borderTop: `2px solid ${palette.signal}`,
          borderBottom: `2px solid ${palette.signal}`,
        }}
      >
        <Img
          src={staticFile("images/case-studies/orgx-v4/artifact-receipt.png")}
          style={{
            position: "absolute",
            top: drift,
            left: -130,
            height: 970,
            width: "auto",
            filter: "brightness(.34) saturate(.72)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            clipPath: `circle(${aperture}px at 67% 47%)`,
          }}
        >
          <Img
            src={staticFile("images/case-studies/orgx-v4/artifact-receipt.png")}
            style={{ position: "absolute", top: drift, left: -130, height: 970, width: "auto" }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: `calc(67% - ${aperture}px)`,
            top: `calc(47% - ${aperture}px)`,
            width: aperture * 2,
            height: aperture * 2,
            border: `3px solid ${palette.signal}`,
            borderRadius: "50%",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 64,
          bottom: 82,
          display: "flex",
          alignItems: "center",
          gap: 18,
          color: palette.dim,
          fontFamily: sans,
          fontSize: 18,
          fontWeight: 650,
          letterSpacing: ".1em",
          textTransform: "uppercase",
        }}
      >
        <span style={{ width: 11, height: 11, background: palette.signal }} />
        Authentic OrgX artifact receipt
      </div>
    </AbsoluteFill>
  );
};

const ConstraintRange = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const title = appear(frame, fps, 0);
  const rangeY = interpolate(frame, [0, 162], [20, -125], clamp);
  const constraints = [
    { label: "Continuity", color: palette.signal },
    { label: "Clinical ambiguity", color: palette.heat },
    { label: "Decision latency", color: palette.cold },
    { label: "Trustworthy automation", color: palette.mineral },
  ];

  return (
    <AbsoluteFill style={{ background: palette.carbon, color: palette.mineral, overflow: "hidden" }}>
      <Grid />
      <FilmIndex label="Range under constraint" index="05" />
      <div style={{ position: "absolute", top: 220, left: 64, right: 64, opacity: title }}>
        <Kicker>Different systems. Same judgment.</Kicker>
        <div
          style={{
            marginTop: 38,
            fontFamily: sans,
            fontSize: 94,
            fontWeight: 760,
            lineHeight: 0.9,
            letterSpacing: "-0.072em",
            textTransform: "uppercase",
          }}
        >
          Not a list.
          <br />
          <span style={{ fontFamily: serif, fontWeight: 400, textTransform: "none" }}>A way of seeing.</span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 655,
          left: 64,
          right: 64,
          height: 655,
          overflow: "hidden",
          borderTop: `2px solid ${palette.signal}`,
          background: palette.carbon,
        }}
      >
        <Img
          src={staticFile("video/portfolio-film/v4-range.png")}
          style={{ width: "1120px", maxWidth: "none", height: "auto", transform: `translate(-38px, ${rangeY}px) scale(1.02)` }}
        />
      </div>
      <div style={{ position: "absolute", left: 64, right: 64, bottom: 72 }}>
        {constraints.map((constraint, index) => {
          const progress = appear(frame, fps, 20 + index * 24, 17);
          return (
            <div
              key={constraint.label}
              style={{
                display: "grid",
                gridTemplateColumns: "30px 1fr auto",
                gap: 18,
                alignItems: "center",
                borderTop: `1px solid ${palette.line}`,
                padding: "21px 0",
                opacity: progress,
                fontFamily: sans,
                fontSize: 24,
                fontWeight: 620,
                letterSpacing: "-0.02em",
              }}
            >
              <span style={{ width: 11, height: 11, background: constraint.color }} />
              {constraint.label}
              <span style={{ color: palette.dim, fontSize: 16, letterSpacing: ".14em" }}>0{index + 1}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const AuthoredClose = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const portrait = appear(frame, fps, 5, 26);
  const identity = appear(frame, fps, 16, 24);
  const cta = appear(frame, fps, 42, 20);
  const fieldScale = interpolate(frame, [0, 137], [1.14, 1.05], clamp);

  return (
    <AbsoluteFill style={{ background: palette.carbon, color: palette.mineral, overflow: "hidden" }}>
      <Img
        src={staticFile("images/generated/reflection-field.jpg")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          transform: `scale(${fieldScale})`,
          filter: "brightness(.44) contrast(1.14) saturate(.86)",
        }}
      />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(8,8,6,.15), rgba(8,8,6,.94))" }} />
      <FilmIndex label="The person behind the system" index="06" />
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 64,
          right: 64,
          height: 790,
          overflow: "hidden",
          opacity: portrait,
          clipPath: `polygon(0 0, ${interpolate(portrait, [0, 1], [0, 100])}% 0, 92% 100%, 0 100%)`,
          borderBottom: `4px solid ${palette.signal}`,
        }}
      >
        <Img
          src={staticFile("images/hope-profile.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 28%",
            filter: "grayscale(.16) contrast(1.07)",
            transform: `scale(${interpolate(portrait, [0, 1], [1.08, 1])})`,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 1030,
          left: 64,
          right: 64,
          opacity: identity,
        }}
      >
        <Kicker>Hope Atina</Kicker>
        <div
          style={{
            marginTop: 34,
            fontFamily: sans,
            fontSize: 108,
            fontWeight: 780,
            lineHeight: 0.88,
            letterSpacing: "-0.076em",
            textTransform: "uppercase",
          }}
        >
          Depth,
          <br />
          made visible.
        </div>
        <div
          style={{
            marginTop: 42,
            color: palette.mineral,
            fontFamily: sans,
            fontSize: 25,
            fontWeight: 620,
            letterSpacing: ".06em",
            textTransform: "uppercase",
          }}
        >
          Engineer <span style={{ color: palette.heat }}>↗</span> Founder <span style={{ color: palette.cold }}>↗</span> Product thinker
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 64,
          right: 64,
          bottom: 62,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderTop: `1px solid ${palette.line}`,
          paddingTop: 24,
          opacity: cta,
          fontFamily: sans,
          textTransform: "uppercase",
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 740, letterSpacing: "-.02em" }}>hopeatina.com</div>
        <div style={{ color: palette.dim, fontSize: 14, lineHeight: 1.45, letterSpacing: ".1em", textAlign: "right" }}>
          Original track
          <br />
          tiktok_pipes
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const PortfolioFilm = () => {
  const musicVolume = (audioFrame: number) => {
    const ducked = audioFrame < 112 ? 0.22 : interpolate(audioFrame, [112, 132], [0.22, 0.72], clamp);
    const finalFade = interpolate(audioFrame, [786, 815], [1, 0], clamp);
    return ducked * finalFade;
  };

  return (
    <AbsoluteFill style={{ background: palette.carbon }}>
      <Audio src={staticFile("video/portfolio-film/tiktok-pipes.wav")} volume={musicVolume} />
      <Sequence from={4} durationInFrames={107} premountFor={30}>
        <Audio src={staticFile("video/portfolio-film/hope-config-voice.wav")} volume={1} />
      </Sequence>
      <Sequence from={SCENES.faultline.from} durationInFrames={SCENES.faultline.duration} premountFor={30}>
        <SpokenFaultline />
      </Sequence>
      <Sequence from={SCENES.hero.from} durationInFrames={SCENES.hero.duration} premountFor={30}>
        <HeroPlane />
      </Sequence>
      <Sequence from={SCENES.continuity.from} durationInFrames={SCENES.continuity.duration} premountFor={30}>
        <ContinuityModel />
      </Sequence>
      <Sequence from={SCENES.receipt.from} durationInFrames={SCENES.receipt.duration} premountFor={30}>
        <ReceiptProof />
      </Sequence>
      <Sequence from={SCENES.range.from} durationInFrames={SCENES.range.duration} premountFor={30}>
        <ConstraintRange />
      </Sequence>
      <Sequence from={SCENES.close.from} durationInFrames={SCENES.close.duration} premountFor={30}>
        <AuthoredClose />
      </Sequence>
      <FaultlineFlash />
    </AbsoluteFill>
  );
};

export const FramedPortfolioFilm = () => {
  const { width, height } = useVideoConfig();
  const scale = height / 1920;
  const filmWidth = 1080 * scale;
  const isWide = width / height > 1.3;

  return (
    <AbsoluteFill style={{ background: palette.carbon, color: palette.mineral, overflow: "hidden" }}>
      <Img
        src={staticFile("images/generated/reflection-field.jpg")}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.25) contrast(1.2) saturate(.7)" }}
      />
      <Grid />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: (width - filmWidth) / 2,
          width: 1080,
          height: 1920,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          overflow: "hidden",
          boxShadow: "0 0 100px rgba(0,0,0,.72)",
        }}
      >
        <PortfolioFilm />
      </div>
      <div
        style={{
          position: "absolute",
          left: isWide ? 54 : 28,
          top: isWide ? 52 : 34,
          width: Math.max(150, (width - filmWidth) / 2 - (isWide ? 96 : 50)),
          fontFamily: sans,
          textTransform: "uppercase",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, color: palette.signal, fontSize: isWide ? 16 : 12, fontWeight: 720, letterSpacing: ".14em" }}>
          <span style={{ width: 10, height: 10, background: palette.signal }} /> Hope Atina
        </div>
        {isWide ? (
          <div style={{ marginTop: 210, fontSize: 68, fontWeight: 780, lineHeight: .88, letterSpacing: "-.07em" }}>
            Depth,
            <br />
            made
            <br />
            visible.
          </div>
        ) : null}
      </div>
      <div
        style={{
          position: "absolute",
          right: isWide ? 54 : 28,
          bottom: isWide ? 52 : 34,
          width: Math.max(150, (width - filmWidth) / 2 - (isWide ? 96 : 50)),
          fontFamily: sans,
          textAlign: "right",
          textTransform: "uppercase",
        }}
      >
        {isWide ? (
          <div style={{ color: palette.dim, fontSize: 15, fontWeight: 650, lineHeight: 1.65, letterSpacing: ".12em" }}>
            Engineer
            <br />
            Founder
            <br />
            Product thinker
          </div>
        ) : null}
        <div style={{ marginTop: 28, color: palette.mineral, fontSize: isWide ? 18 : 12, fontWeight: 720, letterSpacing: ".05em" }}>
          hopeatina.com
        </div>
      </div>
      <div style={{ position: "absolute", top: 0, bottom: 0, left: (width - filmWidth) / 2 - 3, width: 3, background: palette.heat }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, left: (width + filmWidth) / 2, width: 3, background: palette.cold }} />
    </AbsoluteFill>
  );
};

export const PortfolioFilmCover = () => (
  <AbsoluteFill style={{ background: palette.carbon, color: palette.mineral, overflow: "hidden" }}>
    <Img
      src={staticFile("images/generated/inspection-field.jpg")}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "54% center",
        filter: "brightness(.42) contrast(1.18) saturate(.84)",
      }}
    />
    <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(8,8,6,.2), rgba(8,8,6,.96))" }} />
    <div style={{ position: "absolute", top: 70, left: 64, right: 64, display: "flex", justifyContent: "space-between", fontFamily: sans, fontSize: 18, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase" }}>
      <span style={{ display: "flex", alignItems: "center", gap: 14 }}><span style={{ width: 12, height: 12, background: palette.signal }} />Hope Atina</span>
      <span style={{ opacity: .6 }}>Portfolio / 2026</span>
    </div>
    <div style={{ position: "absolute", top: 545, left: 64, right: 64 }}>
      <Kicker>A portfolio film</Kicker>
      <div style={{ marginTop: 46, fontFamily: sans, fontSize: 122, fontWeight: 780, lineHeight: .86, letterSpacing: "-.078em", textTransform: "uppercase" }}>
        Make the
        <br />
        <span style={{ color: palette.signal }}>invisible</span>
        <br />
        layer visible.
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1360, height: 5, background: palette.signal, boxShadow: `0 -10px 0 ${palette.heat}, 0 10px 0 ${palette.cold}` }} />
    <div style={{ position: "absolute", left: 64, right: 64, bottom: 72, display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: `1px solid ${palette.line}`, paddingTop: 25, fontFamily: sans, textTransform: "uppercase" }}>
      <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: ".02em" }}>Engineer · founder · product thinker</div>
      <div style={{ color: palette.dim, fontSize: 14, lineHeight: 1.5, letterSpacing: ".12em", textAlign: "right" }}>Original track<br />tiktok_pipes</div>
    </div>
  </AbsoluteFill>
);
