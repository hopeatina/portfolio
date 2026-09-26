import React from 'react';
import { Composition } from 'remotion';
import './lib/theme';
import { Alma } from './reels/Alma';
import { PerfPulse } from './reels/PerfPulse';
import { OpenClaw } from './reels/OpenClaw';
import { BrainBuffet } from './reels/BrainBuffet';
import { Neuromosaic } from './reels/Neuromosaic';
import { ChaosRiders } from './reels/ChaosRiders';
import { Meridian } from './reels/Meridian';
import { Highlight, HIGHLIGHT_DUR } from './reels/Highlight';

const common = { durationInFrames: 900, fps: 60, width: 1920, height: 1080 };
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Alma" component={Alma} {...common} />
    <Composition id="PerfPulse" component={PerfPulse} {...common} />
    <Composition id="OpenClaw" component={OpenClaw} {...common} />
    <Composition id="BrainBuffet" component={BrainBuffet} {...common} />
    <Composition id="Neuromosaic" component={Neuromosaic} {...common} />
    <Composition id="ChaosRiders" component={ChaosRiders} {...common} />
    <Composition id="Meridian" component={Meridian} {...common} />
    <Composition id="Highlight" component={Highlight} {...common} durationInFrames={HIGHLIGHT_DUR} />
  </>
);
