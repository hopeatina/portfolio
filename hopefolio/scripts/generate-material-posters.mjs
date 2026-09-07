/**
 * Deterministic, transparent loading stills from the SAME mesh as the live study.
 * Run with Node 24+: node scripts/generate-material-posters.mjs
 *
 * This is a small CPU mesh projector, not a second illustration of the object.
 * Morph targets, surface normals, material finish, and inlay all come directly
 * from createRibbonGeometry. Regenerate after changing knot-geometry.ts.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { Color, Euler, Matrix4, PerspectiveCamera, Vector3 } from 'three/webgpu';
import { createRibbonGeometry, MATERIAL_FORMS } from '../src/components/material/knot-geometry.ts';

const output = new URL('../public/images/material/', import.meta.url);
const source = await readFile(new URL('../src/components/material/knot-geometry.ts', import.meta.url));
const revision = createHash('sha256').update(source).digest('hex').slice(0, 12);
const SIZE = 600;
const SEGMENT_STRIDE = 4;
const camera = new PerspectiveCamera(34, 1, 0.1, 50);
camera.position.set(0, 0.05, 8.3);
camera.updateMatrixWorld();
const rotation = new Matrix4().makeRotationFromEuler(new Euler(0.16, -0.36, -0.2));
const key = new Vector3(-3, 5, 4).normalize();
const fill = new Vector3(4, 1, 2).normalize();
const rim = new Vector3(0, 5, -1).normalize();
const baseColors = [new Color(0xc5cabe), new Color(0xb6bdb2), new Color(0x899285)];
// Match MaterialObject's settled form colors and material-atmosphere.css.
const inlays = {
  knot: { color: new Color(0xb7f34a), name: 'lime' },
  weave: { color: new Color(0xa1b79b), name: 'sage' },
  bridge: { color: new Color(0xd6a965), name: 'warm brass' },
  orbit: { color: new Color(0xd6e1c7), name: 'pale mineral' },
};
const round = (n) => Math.round(n * 10) / 10;
const clamp = (n) => Math.max(0, Math.min(1, n));

function colorFor(normal, view, finish, strand, accent, form) {
  if (accent) {
    return inlays[form].color.clone().multiplyScalar(0.7 + 0.3 * Math.max(0, normal.dot(key))).getHexString();
  }
  // Broad reflected softboxes give the metal its bright faces and darker edges.
  // This is intentionally a cheap static approximation of MaterialObject's studio.
  const reflected = view.clone().reflect(normal).negate();
  const illumination = 0.28 + 0.58 * Math.max(0, normal.dot(key))
    + 0.2 * Math.max(0, normal.dot(fill));
  const softbox = 0.6 * Math.pow(Math.max(0, reflected.dot(key)), 18)
    + 0.35 * Math.pow(Math.max(0, reflected.dot(fill)), 28)
    + 0.4 * Math.pow(Math.max(0, reflected.dot(rim)), 12);
  const color = baseColors[strand].clone().multiplyScalar(illumination * finish + softbox);
  // Quantize only the finish, never the geometry: the compact palette keeps
  // hundreds of depth-sorted faces small enough to ship in server-rendered HTML.
  color.r = Math.round(clamp(color.r) * 48) / 48;
  color.g = Math.round(clamp(color.g) * 48) / 48;
  color.b = Math.round(clamp(color.b) * 48) / 48;
  return color.getHexString();
}

function meshFaces(geometry, formIndex, strand, accent) {
  const position = formIndex === 0 ? geometry.getAttribute('position') : geometry.morphAttributes.position[formIndex - 1];
  const normal = formIndex === 0 ? geometry.getAttribute('normal') : geometry.morphAttributes.normal[formIndex - 1];
  const finish = geometry.getAttribute('color');
  const ringSize = accent ? 8 : 14;
  const segments = position.count / ringSize - 1;
  // Preserve the broad machined faces and both halves of each rounded edge.
  const profile = accent ? [0, 2, 4, 6] : [0, 3, 6, 7, 10, 13];
  const world = Array.from({ length: position.count }, (_, i) => new Vector3().fromBufferAttribute(position, i).applyMatrix4(rotation));
  const normals = Array.from({ length: normal.count }, (_, i) => new Vector3().fromBufferAttribute(normal, i).transformDirection(rotation));
  const projected = world.map((vertex) => {
    const point = vertex.clone().project(camera);
    return [round((point.x + 1) * SIZE / 2), round((1 - point.y) * SIZE / 2)];
  });
  const faces = [];
  for (let i = 0; i < segments; i += SEGMENT_STRIDE) {
    const next = Math.min(segments, i + SEGMENT_STRIDE);
    for (let j = 0; j < profile.length; j++) {
      const a = profile[j];
      const b = profile[(j + 1) % profile.length];
      const indices = [i * ringSize + a, next * ringSize + a, next * ringSize + b, i * ringSize + b];
      const center = indices.reduce((sum, index) => sum.add(world[index]), new Vector3()).multiplyScalar(0.25);
      const faceNormal = indices.reduce((sum, index) => sum.add(normals[index]), new Vector3()).normalize();
      const view = camera.position.clone().sub(center).normalize();
      if (faceNormal.dot(view) <= 0) continue;
      const materialFinish = indices.reduce((sum, index) => sum + finish.getX(index), 0) / 4;
      faces.push({
        // A narrow surface inlay and a wide face have different centroids.
        // Tiny painter's-order bias prevents that mismatch from stippling the
        // inlay while remaining far below the depth between crossing ribbons.
        depth: center.z + (accent ? 0.025 : 0),
        color: colorFor(faceNormal, view, materialFinish, strand, accent, MATERIAL_FORMS[formIndex]),
        points: indices.map((index) => projected[index]),
      });
    }
  }
  return faces;
}

await mkdir(output, { recursive: true });
const ribbons = [0, 1, 2].map((strand) => createRibbonGeometry(strand));
const trace = createRibbonGeometry(1, true);
for (const [formIndex, form] of MATERIAL_FORMS.entries()) {
  const faces = ribbons.flatMap((geometry, strand) => meshFaces(geometry, formIndex, strand, false));
  faces.push(...meshFaces(trace, formIndex, 1, true));
  faces.sort((a, b) => a.depth - b.depth);
  const palette = [...new Set(faces.map((face) => face.color))];
  const classes = new Map(palette.map((color, index) => [color, `c${index}`]));
  const styles = palette.map((color) => `.${classes.get(color)}{fill:#${color};stroke:#${color}}`).join('');
  const paths = faces.map((face) => {
    const [start, ...rest] = face.points;
    return `<path class="${classes.get(face.color)}" d="M${start.join(' ')}L${rest.map((point) => point.join(' ')).join(' ')}Z"/>`;
  }).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600" fill="none"><title>Continuity study — ${form}</title><desc>Three mineral silver ribbons with one ${inlays[form].name} inlay, projected from the interactive ${form} geometry.</desc><!-- Generated by scripts/generate-material-posters.mjs; knot-geometry.ts sha256:${revision}. --><style>${styles}</style><g stroke-width=".65" stroke-linejoin="round">${paths}</g></svg>\n`;
  const path = new URL(`study-${form}.svg`, output);
  await writeFile(path, svg);
  console.log(`${fileURLToPath(path)}: ${faces.length} faces, ${(Buffer.byteLength(svg) / 1024).toFixed(1)} KB`);
}
for (const geometry of [...ribbons, trace]) geometry.dispose();
