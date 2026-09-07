import {
  BufferGeometry,
  Float32BufferAttribute,
  Sphere,
  Vector3,
} from 'three/webgpu';

export type MaterialForm = 'knot' | 'weave' | 'orbit' | 'bridge';

export const MATERIAL_FORMS: MaterialForm[] = ['knot', 'weave', 'orbit', 'bridge'];

const SEGMENTS = 512;
const TAU = Math.PI * 2;
const BAND_SPACING = 0.33;
const BAND_WIDTH = 0.285;
const BAND_DEPTH = 0.072;

/** One continuous path, expressed four ways; all forms retain the same topology. */
function pointOnForm(form: MaterialForm, t: number, target: Vector3) {
  if (form === 'knot') {
    const radius = (2 + Math.cos(3 * t)) * 0.59;
    return target.set(radius * Math.cos(2 * t), radius * Math.sin(2 * t), Math.sin(3 * t) * 0.66);
  }
  if (form === 'weave') {
    return target.set(1.78 * Math.cos(t), 0.77 * Math.sin(2 * t), 0.6 * Math.sin(t));
  }
  if (form === 'bridge') {
    return target.set(1.84 * Math.cos(t), 0.48 * Math.sin(t), 0.52 * Math.sin(2 * t));
  }
  const radius = 1.42 + 0.1 * Math.cos(3 * t);
  return target.set(radius * Math.cos(t), radius * Math.sin(t), 0.28 * Math.sin(3 * t));
}

function roundedProfile(): [number, number][] {
  const radius = BAND_DEPTH * 0.5;
  const halfWidth = BAND_WIDTH * 0.5 - radius;
  const points: [number, number][] = [];
  // A machined, capsule-shaped section: broad faces and genuinely rounded edges.
  for (let i = 0; i <= 6; i++) {
    const angle = -Math.PI / 2 + (i / 6) * Math.PI;
    points.push([halfWidth + Math.cos(angle) * radius, Math.sin(angle) * radius]);
  }
  for (let i = 0; i <= 6; i++) {
    const angle = Math.PI / 2 + (i / 6) * Math.PI;
    points.push([-halfWidth + Math.cos(angle) * radius, Math.sin(angle) * radius]);
  }
  return points;
}

function sweep(form: MaterialForm, strand: number, accent: boolean) {
  const profile: [number, number][] = accent
    ? Array.from({ length: 8 }, (_, i) => [Math.cos((i / 8) * TAU) * 0.011, Math.sin((i / 8) * TAU) * 0.011])
    : roundedProfile();
  const positions: number[] = [];
  const colors: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const center = new Vector3();
  const ahead = new Vector3();
  const behind = new Vector3();
  const tangent = new Vector3();
  const across = new Vector3();
  const normal = new Vector3();
  const vertex = new Vector3();
  const twistAxis = new Vector3(1, 0, 0);

  for (let i = 0; i <= SEGMENTS; i++) {
    const t = (i / SEGMENTS) * TAU;
    pointOnForm(form, t, center);
    tangent.subVectors(pointOnForm(form, t + 0.0001, ahead), pointOnForm(form, t - 0.0001, behind)).normalize();
    // Project a radial vector into the curve's normal plane. Unlike a Frenet
    // frame, this remains continuous at the weave's inflection points.
    across.set(Math.cos(form === 'knot' ? 2 * t : t), Math.sin(form === 'knot' ? 2 * t : t), 0);
    across.addScaledVector(tangent, -across.dot(tangent)).normalize();
    normal.crossVectors(tangent, across).normalize();

    const strandOffset = (strand - 1) * BAND_SPACING;
    const twist = form === 'orbit' ? (strand - 1) * 0.31 : 0;
    for (let j = 0; j < profile.length; j++) {
      const [width, depth] = profile[j];
      vertex.copy(center)
        .addScaledVector(across, width + strandOffset + (accent ? BAND_WIDTH * 0.24 : 0))
        .addScaledVector(normal, depth + (accent ? -BAND_DEPTH * 0.5 - 0.013 : 0));
      if (twist) vertex.applyAxisAngle(twistAxis, twist);
      positions.push(vertex.x, vertex.y, vertex.z);
      // The edge finish is darker than the brushed face, making actual band
      // thickness readable even when a softbox reflects across the front.
      const finish = accent ? 1 : 0.5 + 0.5 * Math.pow(Math.abs(depth) / (BAND_DEPTH * 0.5), 0.7);
      colors.push(finish, finish, finish);
      uvs.push(i / SEGMENTS, j / profile.length);
    }
  }

  const ringSize = profile.length;
  for (let i = 0; i < SEGMENTS; i++) {
    for (let j = 0; j < ringSize; j++) {
      const a = i * ringSize + j;
      const b = (i + 1) * ringSize + j;
      const c = (i + 1) * ringSize + ((j + 1) % ringSize);
      const d = i * ringSize + ((j + 1) % ringSize);
      indices.push(a, c, b, a, d, c);
    }
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
  geometry.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  // Duplicate seam vertices share normals, avoiding a visible weld line.
  const normals = geometry.getAttribute('normal');
  for (let j = 0; j < ringSize; j++) {
    const last = SEGMENTS * ringSize + j;
    normal.set(normals.getX(j) + normals.getX(last), normals.getY(j) + normals.getY(last), normals.getZ(j) + normals.getZ(last)).normalize();
    normals.setXYZ(j, normal.x, normal.y, normal.z);
    normals.setXYZ(last, normal.x, normal.y, normal.z);
  }
  return geometry;
}

/** Native morph targets let the GPU perform form transitions without CPU remeshing. */
export function createRibbonGeometry(strand: number, accent = false) {
  const geometry = sweep('knot', strand, accent);
  geometry.morphAttributes.position = [];
  geometry.morphAttributes.normal = [];
  for (const form of MATERIAL_FORMS.slice(1)) {
    const variant = sweep(form, strand, accent);
    geometry.morphAttributes.position.push(variant.getAttribute('position'));
    geometry.morphAttributes.normal.push(variant.getAttribute('normal'));
    variant.dispose();
  }
  // Include every form so intermediate morphs cannot be culled unexpectedly.
  geometry.boundingSphere = new Sphere(new Vector3(), 3.1);
  return geometry;
}
