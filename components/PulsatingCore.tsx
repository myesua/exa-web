import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

const PULSE_COLOR = '#0070F3';

const PulsatingCore = () => {
  const meshRef = useRef(null);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    timeRef.current += delta;
    const t = Math.sin(timeRef.current * 2) * 0.25 + 1.25;

    if (meshRef.current) {
      (meshRef.current as THREE.Mesh).scale.set(t, t, t);
      const material = (meshRef.current as THREE.Mesh)
        .material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = t * 0.2;
    }
  });

  return (
    <Float floatIntensity={0.5} speed={1}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={PULSE_COLOR}
          emissive={PULSE_COLOR}
          emissiveIntensity={1}
          toneMapped={false}
        />
      </mesh>
    </Float>
  );
};

export const PulsatingCoreOnly = () => {
  return (
    <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <PulsatingCore />
      </Suspense>
    </Canvas>
  );
};
