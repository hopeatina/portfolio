import { loadFont as loadBricolage } from "@remotion/google-fonts/BricolageGrotesque";
import { loadFont as loadInstrument } from "@remotion/google-fonts/InstrumentSerif";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";
import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const { fontFamily: sans } = loadBricolage("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
const { fontFamily: serif } = loadInstrument("italic", {
  weights: ["400"],
  subsets: ["latin"],
});
const { fontFamily: mono } = loadMono("normal", {
  weights: ["400", "500", "600"],
  subsets: ["latin"],
});

const palette = {
  ink: "#080A09",
  paper: "#F1F0EA",
  signal: "#B7F34A",
  ochre: "#DFA548",
  muted: "#A2A79F",
  line: "rgba(241, 240, 234, 0.18)",
};

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const enter = (frame: number, fps: number, delay = 0) =>
  spring({
    frame: frame - delay,
    fps,
    durationInFrames: Math.round(fps * 0.72),
    config: { damping: 200 },
  });

const Kicker: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = palette.signal,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 18,
      color,
      fontFamily: mono,
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
    }}
  >
    <span style={{ width: 46, height: 3, backgroundColor: color }} />
    {children}
  </div>
);

const SignalIndex: React.FC<{ current: string; dark?: boolean }> = ({
  current,
  dark = true,
}) => (
  <div
    style={{
      position: "absolute",
      top: 82,
      left: 72,
      right: 72,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      zIndex: 10,
      color: dark ? palette.paper : palette.ink,
      fontFamily: mono,
      fontSize: 16,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
    }}
  >
    <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: palette.signal,
          boxShadow: `0 0 22px ${palette.signal}`,
        }}
      />
      Hope Atina
    </span>
    <span style={{ opacity: 0.64 }}>{current} / 06</span>
  </div>
);

const ScanLine: React.FC<{ frame: number; color?: string }> = ({
  frame,
  color = palette.signal,
}) => {
  const x = interpolate(frame, [0, 92], [-180, 1080], {
    ...clamp,
    easing: Easing.inOut(Easing.quad),
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: 0,
        bottom: 0,
        width: 2,
        backgroundColor: color,
        opacity: 0.58,
        boxShadow: `0 0 26px ${color}`,
      }}
    />
  );
};

const BrowserFrame: React.FC<{
  asset: string;
  top: number;
  width?: number;
  height?: number;
  progress: number;
  rotate?: number;
  imageScale?: number;
}> = ({
  asset,
  top,
  width = 936,
  height = 650,
  progress,
  rotate = 0,
  imageScale = 1,
}) => (
  <div
    style={{
      position: "absolute",
      top,
      left: "50%",
      width,
      height,
      overflow: "hidden",
      borderRadius: 34,
      border: `1px solid ${palette.line}`,
      backgroundColor: "#0B0E0C",
      boxShadow: "0 36px 100px rgba(0,0,0,0.48)",
      transform: `translateX(-50%) translateY(${interpolate(progress, [0, 1], [72, 0])}px) scale(${interpolate(progress, [0, 1], [0.95, 1])}) rotate(${rotate}deg)`,
      opacity: progress,
    }}
  >
    <div
      style={{
        height: 54,
        borderBottom: `1px solid ${palette.line}`,
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "0 22px",
      }}
    >
      {[0, 1, 2].map((dot) => (
        <span
          key={dot}
          style={{
            width: 9,
            height: 9,
            borderRadius: "50%",
            backgroundColor: dot === 0 ? palette.signal : "rgba(241,240,234,0.24)",
          }}
        />
      ))}
      <span
        style={{
          marginLeft: "auto",
          color: palette.muted,
          fontFamily: mono,
          fontSize: 13,
          letterSpacing: "0.08em",
        }}
      >
        HOPEATINA / LIVE PROOF
      </span>
    </div>
    <Img
      src={staticFile(`video/portfolio-film/${asset}`)}
      style={{
        width: "100%",
        height: `calc(100% - 54px)`,
        objectFit: "cover",
        objectPosition: "center top",
        transform: `scale(${imageScale})`,
      }}
    />
  </div>
);

const HookScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const first = enter(frame, fps, 4);
  const second = enter(frame, fps, 38);
  const portrait = enter(frame, fps, 10);
  const portraitScale = interpolate(frame, [0, 135], [1.08, 1.015], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: palette.ink, color: palette.paper, overflow: "hidden" }}>
      <SignalIndex current="01" />
      <div
        style={{
          position: "absolute",
          top: 270,
          left: 72,
          width: 880,
          zIndex: 4,
        }}
      >
        <Kicker>The continuity question</Kicker>
        <div
          style={{
            marginTop: 62,
            fontFamily: sans,
            fontSize: 132,
            lineHeight: 0.87,
            letterSpacing: "-0.075em",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              opacity: first,
              transform: `translateY(${interpolate(first, [0, 1], [48, 0])}px)`,
            }}
          >
            AI can act.
          </div>
          <div
            style={{
              marginTop: 18,
              color: palette.signal,
              fontFamily: serif,
              fontSize: 148,
              lineHeight: 0.84,
              letterSpacing: "-0.055em",
              fontWeight: 400,
              textTransform: "none",
              opacity: second,
              transform: `translateY(${interpolate(second, [0, 1], [54, 0])}px)`,
            }}
          >
            Can it keep
            <br />
            the plot?
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 940,
          overflow: "hidden",
          opacity: portrait,
          clipPath: `inset(${interpolate(portrait, [0, 1], [100, 0])}% 0 0 0)`,
        }}
      >
        <Img
          src={staticFile("images/hope-profile.jpg")}
          style={{
            position: "absolute",
            width: 1080,
            height: 1055,
            bottom: -115,
            objectFit: "cover",
            objectPosition: "center top",
            transform: `scale(${portraitScale})`,
            filter: "contrast(1.05) saturate(0.88)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(8,10,9,0.14)",
            borderTop: `1px solid ${palette.line}`,
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: 72,
          bottom: 58,
          zIndex: 4,
          color: palette.paper,
          fontFamily: mono,
          fontSize: 18,
          letterSpacing: "0.13em",
          textTransform: "uppercase",
        }}
      >
        Hope Atina · AI systems engineer
      </div>
      <ScanLine frame={frame} />
    </AbsoluteFill>
  );
};

const ThesisScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const title = enter(frame, fps, 8);
  const panel = enter(frame, fps, 24);
  const tags = ["Context", "Memory", "Review"];

  return (
    <AbsoluteFill style={{ backgroundColor: palette.ink, color: palette.paper, overflow: "hidden" }}>
      <SignalIndex current="02" />
      <div style={{ position: "absolute", top: 214, left: 72, right: 72 }}>
        <Kicker>Founder · systems engineer</Kicker>
        <h1
          style={{
            margin: "52px 0 0",
            width: 930,
            fontFamily: sans,
            fontSize: 104,
            fontWeight: 650,
            lineHeight: 0.91,
            letterSpacing: "-0.065em",
            opacity: title,
            transform: `translateY(${interpolate(title, [0, 1], [48, 0])}px)`,
          }}
        >
          I build the
          <br />
          <em style={{ fontFamily: serif, color: palette.signal, fontWeight: 400 }}>
            continuity layer.
          </em>
        </h1>
      </div>

      <BrowserFrame asset="hero.png" top={666} progress={panel} rotate={-1.4} />

      <div
        style={{
          position: "absolute",
          top: 1438,
          left: 72,
          right: 72,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          borderTop: `1px solid ${palette.line}`,
          borderBottom: `1px solid ${palette.line}`,
        }}
      >
        {tags.map((tag, index) => {
          const item = enter(frame, fps, 45 + index * 8);
          return (
            <div
              key={tag}
              style={{
                padding: "34px 18px",
                borderRight: index < tags.length - 1 ? `1px solid ${palette.line}` : undefined,
                color: index === 0 ? palette.signal : palette.paper,
                fontFamily: mono,
                fontSize: 18,
                letterSpacing: "0.14em",
                textAlign: "center",
                textTransform: "uppercase",
                opacity: item,
              }}
            >
              0{index + 1} / {tag}
            </div>
          );
        })}
      </div>

      <p
        style={{
          position: "absolute",
          left: 72,
          right: 160,
          top: 1624,
          margin: 0,
          color: palette.muted,
          fontFamily: sans,
          fontSize: 31,
          lineHeight: 1.35,
          letterSpacing: "-0.025em",
        }}
      >
        The agent is only as reliable as what survives between one handoff and the next.
      </p>
      <ScanLine frame={frame - 16} />
    </AbsoluteFill>
  );
};

const ContinuityScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const title = enter(frame, fps, 4);
  const panel = enter(frame, fps, 18);
  const stages = [
    ["01", "Context survives", "Memory carries decisions forward."],
    ["02", "Agents act", "Delegation stays visible and scoped."],
    ["03", "Humans decide", "Risk returns to a review boundary."],
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: palette.ink, color: palette.paper, overflow: "hidden" }}>
      <SignalIndex current="03" />
      <div style={{ position: "absolute", top: 210, left: 72, right: 72 }}>
        <Kicker>One continuity loop</Kicker>
        <h1
          style={{
            margin: "42px 0 0",
            fontFamily: sans,
            fontSize: 88,
            fontWeight: 650,
            lineHeight: 0.92,
            letterSpacing: "-0.06em",
            opacity: title,
          }}
        >
          The work keeps
          <br />
          <em style={{ color: palette.signal, fontFamily: serif, fontWeight: 400 }}>
            its state.
          </em>
        </h1>
      </div>

      <BrowserFrame asset="continuity.png" top={532} height={630} progress={panel} imageScale={1.025} />

      <div
        style={{
          position: "absolute",
          top: 1248,
          left: 72,
          right: 72,
          borderTop: `1px solid ${palette.line}`,
        }}
      >
        {stages.map(([number, heading, body], index) => {
          const stage = enter(frame, fps, 42 + index * 14);
          const active = frame >= 42 + index * 14;
          return (
            <div
              key={number}
              style={{
                minHeight: 142,
                display: "grid",
                gridTemplateColumns: "92px 1fr",
                alignItems: "center",
                borderBottom: `1px solid ${palette.line}`,
                opacity: stage,
                transform: `translateX(${interpolate(stage, [0, 1], [32, 0])}px)`,
              }}
            >
              <span
                style={{
                  color: active ? palette.signal : palette.muted,
                  fontFamily: mono,
                  fontSize: 18,
                  letterSpacing: "0.1em",
                }}
              >
                {number}
              </span>
              <div>
                <div
                  style={{
                    fontFamily: sans,
                    fontSize: 38,
                    fontWeight: 600,
                    letterSpacing: "-0.035em",
                  }}
                >
                  {heading}
                </div>
                <div
                  style={{
                    marginTop: 8,
                    color: palette.muted,
                    fontFamily: sans,
                    fontSize: 22,
                  }}
                >
                  {body}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const ProofScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const title = enter(frame, fps, 4);
  const panel = enter(frame, fps, 18);
  const proofs = [
    ["61", "MCP tools shipped"],
    ["12", "Repos on one platform"],
    ["999", "Agent-authored commits"],
    ["93%", "Fewer bugs at Vessel"],
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: palette.paper, color: palette.ink, overflow: "hidden" }}>
      <SignalIndex current="04" dark={false} />
      <div style={{ position: "absolute", top: 212, left: 72, right: 72 }}>
        <Kicker color="#5D7115">Selected systems</Kicker>
        <h1
          style={{
            margin: "44px 0 0",
            fontFamily: sans,
            fontSize: 96,
            fontWeight: 650,
            lineHeight: 0.9,
            letterSpacing: "-0.065em",
            opacity: title,
          }}
        >
          Proof
          <br />
          <em style={{ color: "#92601B", fontFamily: serif, fontWeight: 400 }}>
            compounds.
          </em>
        </h1>
      </div>

      <div style={{ filter: "drop-shadow(0 30px 60px rgba(8,10,9,0.2))" }}>
        <BrowserFrame asset="systems.png" top={558} height={596} progress={panel} rotate={1.1} />
      </div>

      <div
        style={{
          position: "absolute",
          top: 1240,
          left: 72,
          right: 72,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderTop: "1px solid rgba(8,10,9,0.18)",
          borderLeft: "1px solid rgba(8,10,9,0.18)",
        }}
      >
        {proofs.map(([figure, label], index) => {
          const proof = enter(frame, fps, 42 + index * 10);
          return (
            <div
              key={label}
              style={{
                height: 220,
                padding: "30px 34px",
                borderRight: "1px solid rgba(8,10,9,0.18)",
                borderBottom: "1px solid rgba(8,10,9,0.18)",
                opacity: proof,
                transform: `translateY(${interpolate(proof, [0, 1], [28, 0])}px)`,
              }}
            >
              <div
                style={{
                  fontFamily: sans,
                  fontSize: 82,
                  fontWeight: 700,
                  lineHeight: 0.9,
                  letterSpacing: "-0.06em",
                }}
              >
                {figure}
              </div>
              <div
                style={{
                  marginTop: 18,
                  color: "#50544F",
                  fontFamily: mono,
                  fontSize: 16,
                  lineHeight: 1.35,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const JudgmentScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const title = enter(frame, fps, 4);
  const panel = enter(frame, fps, 20);
  const orbit = interpolate(frame, [0, 150], [0, 15], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: palette.ink, color: palette.paper, overflow: "hidden" }}>
      <SignalIndex current="05" />
      <div style={{ position: "absolute", top: 204, left: 72, right: 72, zIndex: 3 }}>
        <Kicker>The differentiator</Kicker>
        <h1
          style={{
            margin: "46px 0 0",
            fontFamily: sans,
            fontSize: 82,
            fontWeight: 650,
            lineHeight: 0.92,
            letterSpacing: "-0.058em",
            opacity: title,
          }}
        >
          It isn’t autonomy.
          <br />
          <em style={{ color: palette.signal, fontFamily: serif, fontWeight: 400 }}>
            It’s judgment architecture.
          </em>
        </h1>
      </div>

      <BrowserFrame asset="judgment.png" top={616} height={662} progress={panel} imageScale={1.02} />

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 878,
          width: 300,
          height: 300,
          marginLeft: -150,
          borderRadius: "50%",
          border: `1px solid rgba(183,243,74,${0.22 + panel * 0.2})`,
          transform: `rotate(${orbit}deg) scale(${0.9 + panel * 0.1})`,
          boxShadow: `0 0 80px rgba(183,243,74,${0.08 * panel})`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 1360,
          left: 72,
          right: 72,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          borderTop: `1px solid ${palette.line}`,
          borderLeft: `1px solid ${palette.line}`,
        }}
      >
        {[
          ["Preserve", "Context before speed"],
          ["Delegate", "Leverage without theater"],
          ["Escalate", "Risk returns to people"],
          ["Remember", "Every decision compounds"],
        ].map(([verb, detail], index) => {
          const item = enter(frame, fps, 44 + index * 8);
          return (
            <div
              key={verb}
              style={{
                minHeight: 155,
                padding: "28px 30px",
                borderRight: `1px solid ${palette.line}`,
                borderBottom: `1px solid ${palette.line}`,
                opacity: item,
              }}
            >
              <div style={{ color: palette.signal, fontFamily: mono, fontSize: 16, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                {String(index + 1).padStart(2, "0")} / {verb}
              </div>
              <div style={{ marginTop: 18, fontFamily: sans, fontSize: 27, letterSpacing: "-0.02em" }}>
                {detail}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const HandoffScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const title = enter(frame, fps, 4);
  const portrait = enter(frame, fps, 24);
  const identity = enter(frame, fps, 54);
  const portraitScale = interpolate(frame, [0, 180], [1.05, 1], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: palette.ochre, color: palette.ink, overflow: "hidden" }}>
      <SignalIndex current="06" dark={false} />
      <div
        style={{
          position: "absolute",
          top: 214,
          left: 72,
          right: 72,
          zIndex: 4,
        }}
      >
        <Kicker color={palette.ink}>The next handoff</Kicker>
        <h1
          style={{
            margin: "54px 0 0",
            width: 930,
            fontFamily: sans,
            fontSize: 116,
            fontWeight: 650,
            lineHeight: 0.87,
            letterSpacing: "-0.07em",
            opacity: title,
            transform: `translateY(${interpolate(title, [0, 1], [50, 0])}px)`,
          }}
        >
          I engineer
          <br />
          <em style={{ fontFamily: serif, fontWeight: 400 }}>
            both sides
          </em>
          <br />
          of the handoff.
        </h1>
      </div>

      <div
        style={{
          position: "absolute",
          left: -118,
          bottom: -40,
          width: 780,
          height: 938,
          overflow: "hidden",
          opacity: portrait,
          mixBlendMode: "multiply",
          clipPath: `inset(${interpolate(portrait, [0, 1], [100, 0])}% 0 0 0)`,
        }}
      >
        <Img
          src={staticFile("images/hope-profile.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            transform: `scale(${portraitScale})`,
            filter: "grayscale(1) sepia(0.5) contrast(1.15)",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          right: 70,
          bottom: 336,
          width: 470,
          padding: "34px 0 0 34px",
          borderTop: `3px solid ${palette.ink}`,
          opacity: identity,
          transform: `translateX(${interpolate(identity, [0, 1], [40, 0])}px)`,
          zIndex: 5,
        }}
      >
        <div style={{ fontFamily: sans, fontSize: 48, fontWeight: 700, letterSpacing: "-0.045em" }}>
          Hope Atina
        </div>
        <div
          style={{
            marginTop: 14,
            fontFamily: mono,
            fontSize: 17,
            lineHeight: 1.55,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          AI systems engineer
          <br />
          Founder, OrgX
        </div>
        <div style={{ marginTop: 32, fontFamily: sans, fontSize: 26, fontWeight: 600 }}>
          hopeatina@gmail.com
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 72,
          right: 72,
          bottom: 236,
          height: 3,
          backgroundColor: palette.ink,
          transformOrigin: "left center",
          transform: `scaleX(${interpolate(frame, [38, 140], [0, 1], clamp)})`,
        }}
      />
    </AbsoluteFill>
  );
};

export const PortfolioFilm = () => {
  const { fps } = useVideoConfig();
  const transition = linearTiming({ durationInFrames: Math.round(fps * 0.5) });

  return (
    <AbsoluteFill style={{ backgroundColor: palette.ink }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={135} premountFor={fps}>
          <HookScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={transition} />
        <TransitionSeries.Sequence durationInFrames={150} premountFor={fps}>
          <ThesisScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-left" })} timing={transition} />
        <TransitionSeries.Sequence durationInFrames={150} premountFor={fps}>
          <ContinuityScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={transition} />
        <TransitionSeries.Sequence durationInFrames={150} premountFor={fps}>
          <ProofScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={transition} />
        <TransitionSeries.Sequence durationInFrames={150} premountFor={fps}>
          <JudgmentScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-right" })} timing={transition} />
        <TransitionSeries.Sequence durationInFrames={180} premountFor={fps}>
          <HandoffScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Audio
        src={staticFile("video/portfolio-film/continuity-score.wav")}
        volume={(frame) => interpolate(frame, [0, fps * 0.25, fps * 27.55, fps * 28], [0, 0.94, 0.94, 0], clamp)}
      />
    </AbsoluteFill>
  );
};

export const PortfolioFilmCover = () => (
  <AbsoluteFill style={{ backgroundColor: palette.ochre, color: palette.ink, overflow: "hidden" }}>
    <SignalIndex current="FILM" dark={false} />
    <div style={{ position: "absolute", top: 218, left: 72, right: 72, zIndex: 3 }}>
      <Kicker color={palette.ink}>Hope Atina · Portfolio film</Kicker>
      <h1
        style={{
          margin: "58px 0 0",
          fontFamily: sans,
          fontSize: 132,
          fontWeight: 650,
          lineHeight: 0.86,
          letterSpacing: "-0.075em",
        }}
      >
        Keep
        <br />
        <em style={{ fontFamily: serif, fontWeight: 400 }}>the plot.</em>
      </h1>
    </div>
    <Img
      src={staticFile("images/hope-profile.jpg")}
      style={{
        position: "absolute",
        left: -80,
        bottom: -60,
        width: 980,
        height: 1120,
        objectFit: "cover",
        objectPosition: "center top",
        filter: "grayscale(1) sepia(0.5) contrast(1.14)",
        mixBlendMode: "multiply",
      }}
    />
    <div
      style={{
        position: "absolute",
        right: 72,
        bottom: 112,
        width: 410,
        paddingTop: 24,
        borderTop: `3px solid ${palette.ink}`,
        fontFamily: mono,
        fontSize: 18,
        lineHeight: 1.55,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}
    >
      AI systems engineer
      <br />
      Founder, OrgX
    </div>
  </AbsoluteFill>
);
