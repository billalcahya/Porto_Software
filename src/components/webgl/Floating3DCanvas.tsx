"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x += delta * 0.3;
      wireframeRef.current.rotation.y += delta * 0.4;
      wireframeRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Solid Inner Geometry with Iridescent Gradient Color */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshPhysicalMaterial
          color="#2563eb"
          roughness={0.1}
          metalness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.6}
          thickness={0.8}
          ior={1.5}
        />
      </mesh>

      {/* Outer Cyan Wireframe Structure */}
      <lineSegments ref={wireframeRef}>
        <wireframeGeometry args={[new THREE.IcosahedronGeometry(1.65, 1)]} />
        <lineBasicMaterial color="#06b6d4" transparent opacity={0.6} />
      </lineSegments>
    </group>
  );
}

function SmallFloatingSpheres() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[2.2, 1.2, -0.5]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#ec4899" roughness={0.2} metalness={0.5} />
      </mesh>

      <mesh position={[-2.4, -1.0, 0.5]}>
        <torusGeometry args={[0.4, 0.15, 16, 32]} />
        <meshStandardMaterial color="#8b5cf6" roughness={0.1} metalness={0.8} />
      </mesh>

      <mesh position={[1.8, -1.5, -0.8]}>
        <octahedronGeometry args={[0.35]} />
        <meshStandardMaterial color="#10b981" roughness={0.2} metalness={0.6} />
      </mesh>
    </group>
  );
}

const emptySubscribe = () => () => {};
function useIsMounted() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function Floating3DCanvas() {
  const mounted = useIsMounted();

  if (!mounted) return null;

  return (
    <div className="w-full h-80 sm:h-112.5 relative pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1.2} color="#06b6d4" />
        <pointLight position={[5, -5, 5]} intensity={1.2} color="#ec4899" />
        <FloatingShape />
        <SmallFloatingSpheres />
      </Canvas>
    </div>
  );
}
