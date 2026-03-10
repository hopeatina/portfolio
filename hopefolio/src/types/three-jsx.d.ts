// Global JSX type augmentation for @react-three/fiber
// This enables Three.js elements (mesh, pointLight, etc.) in JSX
import type { ThreeElements } from "@react-three/fiber";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}
