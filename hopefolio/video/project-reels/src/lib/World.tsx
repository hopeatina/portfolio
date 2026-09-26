import React from 'react';
import { useCurrentFrame } from 'remotion';
import { CameraMotionBlur } from '@remotion/motion-blur';
import { Cam, Vec3, X, Y, Z, placePlane, vadd, vscale } from './space';
import { clamp } from './ease';

export type Fog = { near: number; far: number };

/**
 * One planar element in the film's world. Depth-sorted by zIndex (painter's
 * algorithm on the centre), fogged by distance, culled behind the lens.
 */
export const Plane: React.FC<{
  cam: Cam;
  c: Vec3;
  U?: Vec3;
  V?: Vec3;
  w: number;
  h: number;
  fog?: Fog;
  oneSided?: boolean;
  z?: number;
  opacity?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ cam, c, U = X, V = Y, w, h, fog, oneSided, z = 0, opacity = 1, style, children }) => {
  if (opacity <= 0.002) return null;
  const p = placePlane(cam, c, U, V, w, h);
  if (!p || (oneSided && p.back)) return null;
  const dim = fog ? clamp((p.d - fog.near) / (fog.far - fog.near)) : 0;
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: w,
        height: h,
        transformOrigin: '0 0',
        transform: p.transform,
        zIndex: Math.round(200000 - p.d * 4) + z,
        opacity: opacity * (1 - dim * 0.92),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * A solid box (crate, building, block): only faces toward the lens are drawn,
 * each shaded by its normal so it reads as volume under one key light.
 */
export const Box: React.FC<{
  cam: Cam;
  c: Vec3;
  size: [number, number, number];
  color: string;
  fog?: Fog;
  face?: React.ReactNode;
  top?: React.ReactNode;
  edge?: string;
  opacity?: number;
  z?: number;
}> = ({ cam, c, size, color, fog, face, top, edge = 'rgba(242,239,228,0.18)', opacity = 1, z = 0 }) => {
  const [w, h, d] = size;
  const faces: { c: Vec3; U: Vec3; V: Vec3; w: number; h: number; shade: number; content?: React.ReactNode }[] = [
    { c: vadd(c, vscale(Z, d / 2)), U: X, V: Y, w, h, shade: 1, content: face },
    { c: vadd(c, vscale(Z, -d / 2)), U: vscale(X, -1), V: Y, w, h, shade: 0.55 },
    { c: vadd(c, vscale(X, w / 2)), U: vscale(Z, -1), V: Y, w: d, h, shade: 0.72 },
    { c: vadd(c, vscale(X, -w / 2)), U: Z, V: Y, w: d, h, shade: 0.62 },
    { c: vadd(c, vscale(Y, -h / 2)), U: X, V: Z, w, h: d, shade: 1.18, content: top },
    { c: vadd(c, vscale(Y, h / 2)), U: X, V: vscale(Z, -1), w, h: d, shade: 0.4 },
  ];
  return (
    <>
      {faces.map((fc, i) => (
        <Plane key={i} cam={cam} c={fc.c} U={fc.U} V={fc.V} w={fc.w} h={fc.h} fog={fog} oneSided opacity={opacity} z={z}>
          <div style={{ position: 'absolute', inset: 0, background: color, filter: `brightness(${fc.shade})`, boxShadow: `inset 0 0 0 1.5px ${edge}` }} />
          {fc.content}
        </Plane>
      ))}
    </>
  );
};

/** DOM motion blur re-renders the whole frame once per sample; at 10 samples a blurred frame took ~30 s. */
const MAX_BLUR_SAMPLES = 6;

/** True sub-frame motion blur, only inside the listed [from, to, samples, shutter?) ranges. */
export const Blur: React.FC<{ ranges: [number, number, number, number?][]; children: React.ReactNode }> = ({ ranges, children }) => {
  const f = useCurrentFrame();
  const r = ranges.find(([a, b]) => f >= a && f < b);
  if (!r) return <>{children}</>;
  return (
    <CameraMotionBlur samples={Math.min(r[2], MAX_BLUR_SAMPLES)} shutterAngle={r[3] ?? 220}>
      {children}
    </CameraMotionBlur>
  );
};

/** SVG path through projected points (rails, lanes, threads, beams). */
export const polyline = (pts: { sx: number; sy: number }[]) => pts.map((p, i) => `${i ? 'L' : 'M'}${p.sx.toFixed(1)} ${p.sy.toFixed(1)}`).join(' ');
