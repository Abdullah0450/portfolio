"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function EnhancedScene() {
  const headRef = useRef<THREE.Group | null>(null);
  const leftEyeRef = useRef<THREE.Mesh | null>(null);
  const rightEyeRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.InstancedMesh | null>(null);
  const particles = useRef<Array<{ pos: THREE.Vector3; vel: THREE.Vector3 }>>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Track mouse globally for the full-screen canvas
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      setMousePos({
        x,
        y,
      });
      mouse.current = {
        x,
        y,
      };
    };

    const init = () => {
      if (particles.current.length === 0) {
        particles.current = Array.from({ length: 20 }).map(() => ({
          pos: new THREE.Vector3((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 4),
          vel: new THREE.Vector3((Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02),
        }));
      }
    };
    init();

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (headRef.current) {
      headRef.current.rotation.y += (mousePos.x * 0.3 - headRef.current.rotation.y) * 0.08;
      headRef.current.rotation.x += (mousePos.y * 0.25 - headRef.current.rotation.x) * 0.08;
    }

    if (leftEyeRef.current && rightEyeRef.current) {
      const lx = THREE.MathUtils.clamp(mousePos.x * 0.1, -0.05, 0.05);
      const ly = THREE.MathUtils.clamp(mousePos.y * 0.1, -0.05, 0.05);
      leftEyeRef.current.position.x = -0.35 + lx;
      leftEyeRef.current.position.y = 0.3 + ly;
      rightEyeRef.current.position.x = 0.35 + lx;
      rightEyeRef.current.position.y = 0.3 + ly;
    }

    if (particlesRef.current && particles.current.length > 0) {
      particles.current.forEach((p, i) => {
        const cursor = new THREE.Vector3(mouse.current.x * 4, mouse.current.y * 3, 0);
        const dir = p.pos.clone().sub(cursor);
        if (dir.length() < 1.8) p.vel.add(dir.normalize().multiplyScalar(0.015));
        p.vel.multiplyScalar(0.98);
        p.pos.add(p.vel);

        const axes: Array<'x' | 'y' | 'z'> = ['x', 'y', 'z'];
        axes.forEach((axis) => {
          if (p.pos[axis] > 3) p.pos[axis] = -3;
          if (p.pos[axis] < -3) p.pos[axis] = 3;
        });

        const mat = new THREE.Matrix4().setPosition(p.pos);
        particlesRef.current!.setMatrixAt(i, mat);
      });
      particlesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      <group ref={headRef} position={[0, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.9, 32, 32]} />
          <meshStandardMaterial color="#0f1724" emissive="#052027" metalness={0.1} roughness={0.6} />
        </mesh>
        <mesh position={[-0.35, 0.3, 0.85]}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.35, 0.3, 0.85]}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh ref={leftEyeRef} position={[-0.35, 0.3, 1.05]}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial color="#ec4899" emissive="#be185d" emissiveIntensity={0.7} />
        </mesh>
        <mesh ref={rightEyeRef} position={[0.35, 0.3, 1.05]}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial color="#ec4899" emissive="#be185d" emissiveIntensity={0.7} />
        </mesh>
      </group>
      <instancedMesh ref={particlesRef} args={[undefined, undefined, 20] as any}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#64ffda" emissive="#22c55e" emissiveIntensity={0.5} />
      </instancedMesh>
    </group>
  );
}

export default function ContactCanvas({ className = '' }: { className?: string }) {
  return (
    <div className={`contact-canvas-wrapper w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 1.2, 3.5], fov: 50 }} style={{ width: '100%', height: '100%' }}>
        <color attach="background" args={["#020617"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 7]} intensity={0.9} />
        <pointLight position={[-5, 5, -7]} intensity={0.4} color="#64ffda" />
        <EnhancedScene />
      </Canvas>
    </div>
  );
}
