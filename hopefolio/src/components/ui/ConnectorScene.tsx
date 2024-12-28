"use client";

import * as THREE from "three";
import { useRef, useReducer, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  MeshTransmissionMaterial,
  Environment,
  Lightformer,
  OrbitControls,
} from "@react-three/drei";
import {
  CuboidCollider,
  BallCollider,
  Physics,
  RigidBody,
} from "@react-three/rapier";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import { easing } from "maath";
import {
  Mesh,
  BufferGeometry,
  Vector3,
  MeshStandardMaterial,
  Color,
  Group,
  Box3,
} from "three";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

// Default fallback gradient
const defaultGradient =
  "linear-gradient(120deg, rgba(0, 238, 92, 0.9) 0%, rgba(51, 255, 153, 0.8) 35%, rgba(0, 179, 74, 0.9) 100%)";

// -------------- Helpers to get & set color ranges --------------

// Audits the min/max hue of a given color attribute
function auditColorRange(
  colorAttr: THREE.BufferAttribute | THREE.InterleavedBufferAttribute,
  result: { minHue: number; maxHue: number }
) {
  const tmpColor = new THREE.Color();
  const tmpHSL = { h: 0, s: 0, l: 0 };

  for (let i = 0; i < colorAttr.count; i++) {
    const r = colorAttr.getX(i);
    const g = colorAttr.getY(i);
    const b = colorAttr.getZ(i);

    tmpColor.setRGB(r, g, b);
    tmpColor.getHSL(tmpHSL);

    if (tmpHSL.h < result.minHue) result.minHue = tmpHSL.h;
    if (tmpHSL.h > result.maxHue) result.maxHue = tmpHSL.h;
  }
}

// Actually does the remapping
function remapColorAttr(
  colorAttr: THREE.BufferAttribute | THREE.InterleavedBufferAttribute,
  oldRange: { minHue: number; maxHue: number },
  newRange: { start: number; end: number }
) {
  const tmpColor = new THREE.Color();
  const tmpHSL = { h: 0, s: 0, l: 0 };

  const { minHue, maxHue } = oldRange;
  const { start, end } = newRange;
  const oldRangeHueDelta = maxHue - minHue || 1; // avoid 0

  for (let i = 0; i < colorAttr.count; i++) {
    const r = colorAttr.getX(i);
    const g = colorAttr.getY(i);
    const b = colorAttr.getZ(i);

    tmpColor.setRGB(r, g, b);
    tmpColor.getHSL(tmpHSL);

    // Original hue
    const oldHue = tmpHSL.h;

    // Map hue from [minHue, maxHue] to [start, end]
    const alpha = (oldHue - minHue) / oldRangeHueDelta;
    tmpHSL.h = start + alpha * (end - start);

    tmpColor.setHSL(tmpHSL.h, tmpHSL.s, tmpHSL.l);

    // For debugging: log a few points
    if (i < 3) {
      console.log(
        `  Vertex #${i}: oldHue=${oldHue.toFixed(3)}, newHue=${tmpHSL.h.toFixed(
          3
        )}`
      );
    }

    colorAttr.setXYZ(i, tmpColor.r, tmpColor.g, tmpColor.b);
  }
  colorAttr.needsUpdate = true;
}

// -------------------------------------------------------------

function getThemeGradient(gradientValue: string) {
  const matches = gradientValue.match(/rgba?\([^)]+\)/g);
  if (!matches) return ["#141622"];
  return matches.map((color) => color.replace(/rgba?\(([^)]+)\)/, "rgb($1)"));
}

const shuffle = (themeColors: {
  primary: string;
  accent: string;
  secondary: string;
  highlight: string;
  gradientPrimary: string;
}) => {
  const colors = [
    themeColors.primary,
    themeColors.accent,
    themeColors.secondary,
    themeColors.highlight,
  ].filter(Boolean);

  if (colors.length === 0) {
    return [
      { color: "#00EE5C", roughness: 0.1, accent: true },
      { color: "#00B34A", roughness: 0.75, accent: true },
      { color: "#33FF99", roughness: 0.1, accent: true },
      { color: "#00FF99", roughness: 0.75, accent: true },
    ];
  }

  return [
    { color: colors[0], roughness: 0.1, accent: true },
    { color: colors[0], roughness: 0.75, accent: true },
    { color: colors[1], roughness: 0.1, accent: true },
    { color: colors[1], roughness: 0.75, accent: true },
    { color: colors[2], roughness: 0.1, accent: true },
    { color: colors[2], roughness: 0.75, accent: true },
    { color: colors[3], roughness: 0.1, accent: true },
    { color: colors[3], roughness: 0.75, accent: true },
    {
      color: colors[Math.floor(Math.random() * colors.length)],
      roughness: 0.1,
      accent: true,
    },
  ];
};

interface ConnectorProps {
  position?: [number, number, number];
  children?: React.ReactNode;
  vec?: THREE.Vector3;
  scale?: number;
  r?: (range: number) => number;
  accent?: boolean;
  color?: string;
  roughness?: number;
}

function Connector({
  position,
  children,
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  accent,
  ...props
}: ConnectorProps) {
  const api = useRef(null);
  const pos = useMemo(
    () => position || new Vector3(r(10), r(10), r(10)),
    [position, r]
  );

  useFrame((_, delta) => {
    if (!api.current) return;
    delta = Math.min(0.1, delta);
    const current = api.current as any;
    current.applyImpulse(
      vec.copy(current.translation()).negate().multiplyScalar(0.2)
    );
  });

  return (
    <RigidBody
      linearDamping={4}
      angularDamping={1}
      friction={0.1}
      position={pos}
      ref={api}
      colliders={false}
    >
      <CuboidCollider args={[0.38, 1.27, 0.38]} />
      <CuboidCollider args={[1.27, 0.38, 0.38]} />
      <CuboidCollider args={[0.38, 0.38, 1.27]} />
      {children ? children : <Model {...props} />}
      {accent && (
        <pointLight intensity={4} distance={2.5} color={props.color} />
      )}
    </RigidBody>
  );
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef(null);

  useFrame(({ mouse, viewport }) => {
    if (!ref.current) return;
    const current = ref.current as any;
    current.setNextKinematicTranslation(
      vec.set(
        (mouse.x * viewport.width) / 2,
        (mouse.y * viewport.height) / 2,
        0
      )
    );
  });

  return (
    <RigidBody
      position={[0, 0, 0]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[1]} />
    </RigidBody>
  );
}

// --------------------------------------------
// Model that loads multi-mesh GLTF
// --------------------------------------------
interface ModelProps {
  children?: React.ReactNode;
  color?: string;
  roughness?: number;
}

function Model({ children, color = "white", roughness = 0 }: ModelProps) {
  const groupRef = useRef<Group>(null);

  const { theme } = useTheme();
  const modelPath = (() => {
    switch (theme) {
      case "cameroonian":
        return "/models/emblem.glb";
      case "rice":
        return "/models/rice_logo.glb";
      default:
        return "/models/c-transformed.glb";
    }
  })();

  // 1. Load the entire GLTF (which may contain multiple meshes)
  const gltf = useGLTF(modelPath);

  // 2. Gather all meshes and also compute bounding box for the entire scene
  const { allMeshes, sceneScale } = useMemo(() => {
    // Collect all Meshes
    const meshes: Mesh[] = [];
    gltf.scene.traverse((child) => {
      if (child instanceof Mesh) meshes.push(child);
    });
    if (meshes.length === 0) {
      console.error("No Meshes found in GLTF!");
      return { allMeshes: [], sceneScale: 1 };
    }

    // Compute a bounding box on the entire GLTF scene
    const box = new Box3().setFromObject(gltf.scene);
    const size = box.getSize(new Vector3());
    const diagonal = Math.sqrt(
      size.x * size.x + size.y * size.y + size.z * size.z
    );

    // We'll scale so that the diagonal is ~2 units
    const targetDiagonal = 3;
    const scale = diagonal > 0 ? targetDiagonal / diagonal : 1;

    return { allMeshes: meshes, sceneScale: scale };
  }, [gltf]);

  // 3. Perform color remapping across ALL mesh geometry
  //    - We'll do a two-pass approach so that minHue/maxHue is consistent for all.
  useEffect(() => {
    if (!allMeshes.length) return;

    // First pass: find global minHue & maxHue
    const globalRange = { minHue: Infinity, maxHue: -Infinity };
    for (const mesh of allMeshes) {
      if (!mesh.geometry) continue;
      const colorAttr = mesh.geometry.getAttribute("color");
      if (!colorAttr) continue;
      auditColorRange(colorAttr, globalRange);
    }
    if (globalRange.minHue === Infinity || globalRange.maxHue === -Infinity) {
      // Means no color attributes exist at all
      console.log("No vertex colors found in any mesh. Skipping hue remap.");
      return;
    }

    console.log(
      `Global hue range across all submeshes: minHue=${globalRange.minHue.toFixed(
        3
      )} maxHue=${globalRange.maxHue.toFixed(3)}`
    );

    // Define your new hue range. Example: [0.7..0.9] (purple to pink).
    const newRange = { start: 0.7, end: 0.9 };

    // Second pass: apply that remap
    for (const mesh of allMeshes) {
      const colorAttr = mesh.geometry.getAttribute("color");
      if (!colorAttr) continue;
      console.log(`Remapping vertex colors in mesh: ${mesh.name || mesh.uuid}`);
      remapColorAttr(colorAttr, globalRange, newRange);
    }
  }, [allMeshes]);

  // 4. Animate the *material* color to match passed-in `color` (existing logic).
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.traverse((child) => {
      if (
        child instanceof Mesh &&
        child.material instanceof MeshStandardMaterial
      ) {
        easing.dampC(child.material.color, color, 0.2, delta);
      }
    });
  });

  // 5. Return a <group> with sub-meshes
  //    - We replicate the original structure or simply re-render them
  if (!allMeshes.length) return null;

  return (
    <group
      ref={groupRef}
      scale={sceneScale}
      rotation={(() => {
        switch (theme) {
          case "cameroonian":
            return [0, 0, 0];
          default:
            return [0, Math.PI / 4, 0]; // Original 90-degree rotation for other models
        }
      })()}
    >
      {allMeshes.map((origMesh) => {
        const geo = origMesh.geometry;
        return (
          <mesh
            key={origMesh.uuid}
            geometry={geo}
            castShadow
            receiveShadow
            // Maintain local transform offsets from original gltf, if needed:
            position={origMesh.position}
            quaternion={origMesh.quaternion}
            scale={origMesh.scale} // Usually 0.01 for your case, etc.
          >
            <meshStandardMaterial
              metalness={0.2}
              roughness={roughness}
              vertexColors // use the updated vertex colors
            />
            {children}
          </mesh>
        );
      })}
    </group>
  );
}

function RotatingScene({
  connectors,
  gradientColors,
}: {
  connectors: any[];
  gradientColors: string[];
}) {
  const rotationRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (rotationRef.current) {
      rotationRef.current.rotation.y += delta * 0.05; // Adjust speed by changing multiplier
    }
  });

  return (
    <>
      {gradientColors.map((c, i) => (
        <mesh key={i} position={[0, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshBasicMaterial
            color={c}
            transparent
            opacity={0.5 - i * 0.1}
            depthWrite={false}
          />
        </mesh>
      ))}

      <ambientLight intensity={0.4} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <group ref={rotationRef}>
        <Physics gravity={[0, 0, 0]}>
          <Pointer />
          {connectors.map((props, i) => (
            <Connector key={i} {...props} />
          ))}
          {/* Example: a single connector with a "transparent glass" type material */}
          <Connector position={[10, 10, 5]}>
            <Model>
              <MeshTransmissionMaterial
                clearcoat={1}
                thickness={0.1}
                anisotropicBlur={0.1}
                chromaticAberration={0.1}
                samples={8}
                resolution={512}
              />
            </Model>
          </Connector>
        </Physics>
      </group>
    </>
  );
}

const ConnectorScene = () => {
  const [, click] = useReducer((s) => s + 1, 0);
  const style = useTheme();

  const themeColors = style
    ? {
        primary: style.themeProps.colors.primary,
        accent: style.themeProps.colors.accent,
        secondary: style.themeProps.colors.secondary,
        highlight: style.themeProps.colors.highlight,
        gradientPrimary: style.themeProps.colors.gradients.primary,
      }
    : {
        primary: "",
        accent: "",
        secondary: "",
        highlight: "",
        gradientPrimary: defaultGradient,
      };

  const connectors = useMemo(() => shuffle(themeColors), [themeColors]);
  const gradientColors = useMemo(() => {
    if (!style) return ["#141622"];
    return [
      style.themeProps.colors.primary,
      style.themeProps.colors.accent,
      style.themeProps.colors.secondary,
    ];
  }, [style]);

  return (
    <Canvas
      onClick={click}
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: false }}
      camera={{ position: [0, 0, 15], fov: 17.5, near: 1, far: 20 }}
    >
      <color attach="background" args={[gradientColors[0]]} />
      <RotatingScene connectors={connectors} gradientColors={gradientColors} />
      <EffectComposer enableNormalPass={false} multisampling={8}>
        <N8AO distanceFalloff={1} aoRadius={1} intensity={4} />
      </EffectComposer>
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer
            form="circle"
            intensity={4}
            rotation-x={Math.PI / 2}
            position={[0, 5, -9]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, 1, -1]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, -1, -1]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={8}
          />
        </group>
      </Environment>
    </Canvas>
  );
};

export default ConnectorScene;
