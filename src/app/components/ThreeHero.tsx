"use client";

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Preload, useGLTF } from '@react-three/drei';
// Note: removed @react-three/postprocessing and postprocessing imports to avoid install conflicts

function Orb({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  return (
    <Float speed={1} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh position={position} scale={scale} castShadow receiveShadow>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.18} roughness={0.4} metalness={0.2} />
      </mesh>
    </Float>
  );
}

function ModelOrFallback({ path }: { path?: string }) {
  // Use an external small sample model if no local model is provided.
  const MODEL_URL = path || 'https://threejs.org/examples/models/gltf/Duck/glTF-Binary/Duck.glb';
  const { scene } = useGLTF(MODEL_URL) as any;
  return <primitive object={scene} scale={1.2} position={[0, -1.2, 0]} />;
}

useGLTF.preload('https://threejs.org/examples/models/gltf/Duck/glTF-Binary/Duck.glb');

function CameraParallax() {
  const ref = useRef<any>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // gentle, slow parallax for camera parent
    if (ref.current) ref.current.position.x = Math.sin(t / 6) * 0.4;
  });
  return <group ref={ref} />;
}

export default function ThreeHero() {
  return (
    <div className="w-full h-full">
      <Canvas shadows gl={{ antialias: true }} camera={{ position: [0, 0, 12], fov: 45 }} style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <Suspense fallback={null}>
          <group position={[0, -1, 0]}>
            <Orb position={[-3.5, 0.5, -1]} color="#64ffda" scale={2.2} />
            <Orb position={[2.5, 0.7, -0.5]} color="#8cc7ff" scale={1.6} />
            <Orb position={[0.5, -1.2, 0.5]} color="#ff7fb6" scale={1.2} />
            {/* Model or fallback primitive */}
            <ModelOrFallback />
          </group>
        </Suspense>

        {/* Note: Postprocessing removed to keep dependency tree simple.
            Emissive materials are slightly increased to give a subtle glow effect. */}

        <Preload all />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}
