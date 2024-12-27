"use client";

import * as THREE from "three";
import { useRef, useReducer, useMemo } from "react";
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
} from "@react-three/rapier";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import { easing } from "maath";
import {
  Mesh,
  Material,
  BufferGeometry,
  Vector3,
  MeshStandardMaterial,
  Object3D,
} from "three";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

// Default gradient for fallback
const defaultGradient =
  "linear-gradient(120deg, rgba(0, 238, 92, 0.9) 0%, rgba(51, 255, 153, 0.8) 35%, rgba(0, 179, 74, 0.9) 100%)";

type GLTFResult = {
  nodes: {
    connector: THREE.Mesh;
  };
  materials: {
    base: THREE.Material & { map: THREE.Texture };
  };
};

// Get CSS variables from the theme
const getThemeGradient = (gradientValue: string) => {
  const matches = gradientValue.match(/rgba?\([^)]+\)/g);
  if (!matches) return ["#141622"];
  return matches.map((color) => color.replace(/rgba?\(([^)]+)\)/, "rgb($1)"));
};

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
    // Primary color objects
    { color: colors[0], roughness: 0.1, accent: true },
    { color: colors[0], roughness: 0.75, accent: true },
    // Accent color objects
    { color: colors[1], roughness: 0.1, accent: true },
    { color: colors[1], roughness: 0.75, accent: true },
    // Secondary color objects
    { color: colors[2], roughness: 0.1, accent: true },
    { color: colors[2], roughness: 0.75, accent: true },
    // Highlight color objects
    { color: colors[3], roughness: 0.1, accent: true },
    { color: colors[3], roughness: 0.75, accent: true },
    // One more with random theme color for variety
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

  useFrame((state, delta) => {
    delta = Math.min(0.1, delta);
    if (api.current) {
      const current = api.current as any;
      current.applyImpulse(
        vec.copy(current.translation()).negate().multiplyScalar(0.2)
      );
    }
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
    if (ref.current) {
      const current = ref.current as any;
      current.setNextKinematicTranslation(
        vec.set(
          (mouse.x * viewport.width) / 2,
          (mouse.y * viewport.height) / 2,
          0
        )
      );
    }
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

interface ModelProps {
  children?: React.ReactNode;
  color?: string;
  roughness?: number;
}

function Model({ children, color = "white", roughness = 0 }: ModelProps) {
  const meshRef = useRef<Mesh>(null);
  const gltf = useGLTF("/models/c-transformed.glb");
  const { nodes, materials } = gltf as unknown as GLTFResult;

  useFrame((state, delta) => {
    if (
      meshRef.current?.material &&
      meshRef.current.material instanceof MeshStandardMaterial
    ) {
      easing.dampC(meshRef.current.material.color, color, 0.2, delta);
    }
  });

  return (
    <mesh
      ref={meshRef}
      castShadow
      receiveShadow
      scale={10}
      geometry={nodes.connector.geometry}
    >
      <meshStandardMaterial
        metalness={0.2}
        roughness={roughness}
        map={materials.base.map}
      />
      {children}
    </mesh>
  );
}

const ConnectorScene = () => {
  const [, click] = useReducer((state) => state + 1, 0);
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
      {gradientColors.map((color, index) => (
        <mesh key={index} position={[0, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.5 - index * 0.1}
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
      <Physics gravity={[0, 0, 0]}>
        <Pointer />
        {connectors.map((props, i) => (
          <Connector key={i} {...props} />
        ))}
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
