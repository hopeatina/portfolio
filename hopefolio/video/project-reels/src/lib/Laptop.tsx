import React from 'react';
import { Cam, Vec3, X, v3, vlerp, vscale } from './space';
import { Box, Plane } from './World';

/**
 * A laptop on a desk: base, hinged screen (content is a real UI component),
 * and the lid's back. `angle` is the lid's tilt back from vertical in radians
 * (0.24 open; -π/2 closed flat onto the base).
 */
export const screenFrame = (hinge: Vec3, w: number, h: number, angle: number) => {
  const V = v3(0, Math.cos(angle), Math.sin(angle));
  const top = v3(hinge.x, hinge.y - h * Math.cos(angle), hinge.z - h * Math.sin(angle));
  return { V, center: vlerp(top, hinge, 0.5), at: (u: number, v: number): Vec3 => v3(top.x - w / 2 + u, top.y + v * V.y, top.z + v * V.z) };
};

export const Laptop: React.FC<{
  cam: Cam;
  hinge: Vec3;
  w: number;
  h: number;
  angle: number;
  screen: React.ReactNode;
  back?: React.ReactNode;
  body?: string;
  glow?: string;
}> = ({ cam, hinge, w, h, angle, screen, back, body = '#b9bdc3', glow }) => {
  const sf = screenFrame(hinge, w, h, angle);
  return (
    <>
      <Box cam={cam} c={v3(hinge.x, hinge.y + 11, hinge.z + 290)} size={[w + 20, 22, 600]} color={body} edge="rgba(0,0,0,0.25)" z={1000} top={<div style={{ position: 'absolute', inset: 30, borderRadius: 10, background: '#26292e' }} />} />
      <Plane cam={cam} c={sf.center} U={X} V={sf.V} w={w} h={h} oneSided z={5000} noDof>
        <div style={{ position: 'absolute', inset: 0, borderRadius: 18, background: '#121418', padding: 16, boxShadow: glow ? `0 0 160px ${glow}` : 'none' }}>
          <div style={{ position: 'absolute', inset: 16, borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ width: w, height: h, transform: `scale(${(w - 32) / w}, ${(h - 32) / h})`, transformOrigin: '0 0', position: 'relative' }}>{screen}</div>
          </div>
        </div>
      </Plane>
      <Plane cam={cam} c={sf.center} U={vscale(X, -1)} V={sf.V} w={w} h={h} oneSided z={5000}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: 18, background: `linear-gradient(160deg, ${body}, #8f949b)` }}>{back}</div>
      </Plane>
    </>
  );
};
