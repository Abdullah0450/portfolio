"use client";

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Group } from 'three';

function Robot({ speed = 1 }: { speed?: number }) {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    if (ref.current) {
      // bob and rotate head
      ref.current.rotation.y = Math.sin(t / 2) * 0.25;
      ref.current.position.y = Math.sin(t) * 0.08;
      const head = ref.current.getObjectByName('robot-head');
      if (head) head.rotation.y = Math.sin(t * 2) * 0.4;
      const armL = ref.current.getObjectByName('arm-l');
      const armR = ref.current.getObjectByName('arm-r');
      if (armL) armL.rotation.z = Math.sin(t * 4) * 0.7 - 0.7;
      if (armR) armR.rotation.z = Math.cos(t * 4) * 0.7 + 0.7;
    }
  });

  return (
    <group ref={ref} dispose={null}>
      {/* Body */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[1.2, 1.2, 0.8]} />
        <meshStandardMaterial color="#64ffda" metalness={0.4} roughness={0.3} emissive="#64ffda" emissiveIntensity={0.12} />
      </mesh>

      {/* Head */}
      <group name="robot-head" position={[0, 0.2, 0.05]}>
        <mesh position={[0, 0.45, 0]}>
          <boxGeometry args={[0.7, 0.6, 0.6]} />
          <meshStandardMaterial color="#94f9d4" metalness={0.4} roughness={0.3} emissive="#64ffda" emissiveIntensity={0.15} />
        </mesh>
        {/* Eye */}
        <mesh position={[0, 0.45 + 0.02, 0.31]}> 
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#062028" emissive="#0ff5d3" emissiveIntensity={0.4} />
        </mesh>
      </group>

      {/* Left Arm */}
      <group name="arm-l" position={[-0.85, -0.05, 0]}>
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.7, 12]} />
          <meshStandardMaterial color="#8ff9d0" metalness={0.3} roughness={0.35} emissive="#64ffda" emissiveIntensity={0.08} />
        </mesh>
        <mesh position={[0, -0.85, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#8ff9d0" emissive="#64ffda" emissiveIntensity={0.1} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group name="arm-r" position={[0.85, -0.05, 0]}>
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.7, 12]} />
          <meshStandardMaterial color="#8ff9d0" metalness={0.3} roughness={0.35} emissive="#64ffda" emissiveIntensity={0.08} />
        </mesh>
        <mesh position={[0, -0.85, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#8ff9d0" emissive="#64ffda" emissiveIntensity={0.1} />
        </mesh>
      </group>

      {/* Antenna */}
      <mesh position={[0, 1.05, 0.02]}> 
        <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
        <meshStandardMaterial color="#bfffe9" emissive="#64ffda" emissiveIntensity={0.15} />
      </mesh>
      <mesh position={[0, 1.3, 0.02]}> 
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#64ffda" emissive="#64ffda" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

export default function StarterBot({ onClose }: { onClose?: () => void }) {
  // auto-close after 5.5 seconds to keep UX snappy
  useEffect(() => {
    const t = setTimeout(() => onClose?.(), 5500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <Canvas camera={{ position: [0, 0, 4.4], fov: 45 }} style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 6, 1]} intensity={1} />
      <pointLight position={[-4, 2, 4]} intensity={0.8} color="#64ffda" />
      <pointLight position={[4, -2, 3]} intensity={0.5} color="#94f9d4" />
      <Robot speed={1.3} />
    </Canvas>
  );
}
