"use client";

import * as THREE from "three";
import { useRef, useReducer, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  MeshTransmissionMaterial,
  Environment,
  Lightformer,
} from "@react-three/drei";
import {
  CuboidCollider,
  BallCollider,
  Physics,
  RigidBody,
  RapierRigidBody,
} from "@react-three/rapier";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  Mesh,
  Vector3,
  MeshStandardMaterial,
  Group,
  Material,
} from "three";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

// Default fallback gradient
const defaultGradient =
  "linear-gradient(120deg, rgba(0, 238, 92, 0.9) 0%, rgba(51, 255, 153, 0.8) 35%, rgba(0, 179, 74, 0.9) 100%)";

// Model paths configuration
const MODEL_PATHS = {
  default: "/models/c-transformed.glb",
  base: "/models/c-transformed.glb",
  cameroonian: "/models/emblem.glb",
  rice: "/models/rice_logo.glb",
  futuristic: "/models/c-transformed.glb",
} as const;

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
  r?: (range: number) => number;
  accent?: boolean;
  color?: string;
  roughness?: number;
}

function Connector({
  position,
  children,
  vec = new THREE.Vector3(),
  r = THREE.MathUtils.randFloatSpread,
  accent,
  ...props
}: ConnectorProps) {
  const api = useRef<RapierRigidBody | null>(null);
  const pos = useMemo(
    () => position || new Vector3(r(10), r(10), r(10)),
    [position, r]
  );

  useFrame(() => {
    if (!api.current) return;
    const current = api.current;
    const translation = current.translation();
    current.applyImpulse(
      vec.set(-translation.x * 0.2, -translation.y * 0.2, -translation.z * 0.2),
      true
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

function Pointer() {
  const ref = useRef<RapierRigidBody | null>(null);

  useFrame(({ mouse, viewport }) => {
    if (!ref.current) return;
    const current = ref.current;
    current.setNextKinematicTranslation(
      {
        x: (mouse.x * viewport.width) / 2,
        y: (mouse.y * viewport.height) / 2,
        z: 0,
      }
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
  const [modelError, setModelError] = useState(false);

  // Memoize model path
  const modelPath = useMemo(() => {
    const path =
      MODEL_PATHS[theme as keyof typeof MODEL_PATHS] || MODEL_PATHS.default;
    return path;
  }, [theme]);

  // Load model with error handling and optimization
  const { nodes } = useGLTF(modelPath, true, undefined, (error) => {
    console.error(`Error loading model ${modelPath}:`, error);
    setModelError(true);
  });

  // Memoize material
  const material = useMemo(
    () =>
      new MeshStandardMaterial({
        color,
        roughness,
        transparent: true,
        opacity: 0.8,
      }),
    [color, roughness]
  );

  useEffect(() => {
    const group = groupRef.current;
    if (group) {
      // Optimize geometry
      group.traverse((child: THREE.Object3D) => {
        if (child instanceof Mesh) {
          child.geometry.computeBoundingBox();
          child.geometry.computeBoundingSphere();
          // Only update when necessary
          child.matrixAutoUpdate = false;
          child.updateMatrix();
        }
      });
    }

    // Cleanup
    return () => {
      if (group) {
        group.traverse((child: THREE.Object3D) => {
          if (child instanceof Mesh) {
            child.geometry.dispose();
            if (child.material instanceof Material) {
              child.material.dispose();
            }
          }
        });
      }
    };
  }, []);

  // If model fails to load, render a simple cube as fallback
  if (modelError) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} roughness={roughness} />
      </mesh>
    );
  }

  // If no nodes, return null
  if (!nodes) return null;

  return (
    <group ref={groupRef}>
      {Object.values(nodes).map((node: THREE.Object3D) => {
        if (node instanceof Mesh) {
          return (
            <mesh
              key={node.uuid}
              geometry={node.geometry}
              material={material}
              position={node.position}
              rotation={node.rotation}
              scale={node.scale}
            />
          );
        }
        return null;
      })}
      {children}
    </group>
  );
}

function RotatingScene({
  connectors,
  gradientColors,
}: {
  connectors: ConnectorProps[];
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

  const themeColors = useMemo(
    () =>
      style
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
          },
    [style]
  );

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
