import { Component, type ReactNode, useRef } from "react";
import { Canvas, useFrame, type RootState } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Hero3D — the cinematic centerpiece.
 *
 * A slowly drifting system of frosted ice-blue rings around a faceted cold core
 * — abstract HVAC "airflow + cold light", in the Comfort Aircon palette. Lives
 * only on the right of the desktop hero, behind the headline.
 *
 * Why this is safe to ship:
 *  - Lazy-loaded (its own chunk) — three.js never enters the initial bundle.
 *  - Mounted only on desktop, after idle, never under reduced motion (gated by
 *    the caller), and only when WebGL is available.
 *  - WebGL init failures are swallowed by an error boundary → the existing
 *    video + AirflowCanvas hero remains the universal fallback.
 *  - Geometry is emissive, so it reads as intentional cold-light glow regardless
 *    of exact light tuning; counts are tiny → sub-millisecond frames.
 *  - dpr capped, low-power context, transparent — no layout cost, GPU-composited.
 */

function detectWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

class WebGLErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  componentDidCatch() {
    this.setState({ failed: true });
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

// ─── Drifting ring + core system ─────────────────────────────────────────────

const RingSystem = () => {
  const group = useRef<THREE.Group>(null);

  useFrame((state: RootState, delta: number) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    // Continuous, autonomous drift — no pointer dependency (layer is inert to
    // clicks so the headline beneath stays fully interactive).
    g.rotation.z += delta * 0.12;
    g.rotation.y += delta * 0.06;
    g.rotation.x = 0.34 + Math.sin(t * 0.3) * 0.08;
  });

  return (
    <group ref={group} rotation={[0.34, 0, 0]} scale={1.05}>
      {/* Outer ring — polished ice rim */}
      <mesh>
        <torusGeometry args={[1.3, 0.055, 24, 140]} />
        <meshStandardMaterial
          color="#cfeeff"
          metalness={0.9}
          roughness={0.18}
          emissive="#0b5e8c"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Mid ring — crossed plane, electric-blue catch */}
      <mesh rotation={[Math.PI / 2.5, 0.5, 0]}>
        <torusGeometry args={[0.98, 0.032, 20, 120]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.85}
          roughness={0.22}
          emissive="#0bb6f0"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Inner ring — tilted the other way for depth */}
      <mesh rotation={[-Math.PI / 3, -0.4, 0.3]}>
        <torusGeometry args={[0.72, 0.022, 16, 100]} />
        <meshStandardMaterial
          color="#9fe0ff"
          metalness={0.8}
          roughness={0.25}
          emissive="#0a7fb8"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Faceted cold core */}
      <mesh>
        <icosahedronGeometry args={[0.4, 1]} />
        <meshStandardMaterial
          color="#7fd4ff"
          metalness={0.55}
          roughness={0.32}
          emissive="#0a6fa0"
          emissiveIntensity={0.45}
          flatShading
        />
      </mesh>
    </group>
  );
};

const Hero3D = () => {
  if (!detectWebGL()) return null;

  return (
    <WebGLErrorBoundary>
      <Canvas
        camera={{ position: [0, 0, 4.3], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[-3, 2.5, 4]} intensity={1.6} color="#eaf7ff" />
        <pointLight position={[3, -1.5, 2]} intensity={18} color="#0bb6f0" distance={14} decay={2} />
        <pointLight position={[-2.5, 2, 3]} intensity={12} color="#9fe6ff" distance={14} decay={2} />
        <RingSystem />
      </Canvas>
    </WebGLErrorBoundary>
  );
};

export default Hero3D;
