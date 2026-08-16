"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

function Bubbles({ count = 100 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.005 + Math.random() / 200;
      const xFactor = -40 + Math.random() * 80;
      const yFactor = -40 + Math.random() * 80;
      const zFactor = -40 + Math.random() * 80;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.max(0.2, Math.cos(t));
      
      dummy.position.set(
        xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      if (mesh.current) {
        mesh.current.setMatrixAt(i, dummy.matrix);
      }
    });
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshPhysicalMaterial 
        roughness={0.1}
        transmission={1}
        thickness={1}
        ior={1.4}
        color="#ffffff"
      />
    </instancedMesh>
  );
}

export function LiveBubblesBackground() {
  const container = useRef<HTMLDivElement>(null);
  return (
    <div ref={container} className="absolute inset-0 w-full h-full z-0 bg-[#f7f7f5]">
      <Canvas eventSource={container} camera={{ position: [0, 0, 40], fov: 60 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
        <directionalLight position={[-10, -10, -10]} intensity={1} color="#a0c0ff" />
        <Environment preset="studio" />
        <Bubbles count={150} />
      </Canvas>
    </div>
  );
}
