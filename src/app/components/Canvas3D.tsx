'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

// Tracking head with eyes that follow cursor
function TrackingHead() {
  const headRef = useRef<THREE.Group | null>(null);
  const leftEyeRef = useRef<THREE.Mesh | null>(null);
  const rightEyeRef = useRef<THREE.Mesh | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (headRef.current) {
      headRef.current.rotation.y += (mousePos.x * 0.4 - headRef.current.rotation.y) * 0.08;
      headRef.current.rotation.x += (mousePos.y * 0.3 - headRef.current.rotation.x) * 0.08;
    }
    if (leftEyeRef.current && rightEyeRef.current) {
      // simple pupil offset
      const lx = THREE.MathUtils.clamp(mousePos.x * 0.12, -0.06, 0.06);
      const ly = THREE.MathUtils.clamp(mousePos.y * 0.12, -0.06, 0.06);
      leftEyeRef.current.position.x = -0.35 + lx;
      leftEyeRef.current.position.y = 0.3 + ly;
      rightEyeRef.current.position.x = 0.35 + lx;
      rightEyeRef.current.position.y = 0.3 + ly;
    }
  });

  return (
    <group ref={headRef} position={[0, 0, 0]}>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#0f1724" emissive="#052027" metalness={0.1} roughness={0.6} />
      </mesh>

      <mesh position={[-0.35, 0.3, 0.95]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      <mesh position={[0.35, 0.3, 0.95]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      <mesh ref={leftEyeRef} position={[-0.35, 0.3, 1.15]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#ec4899" emissive="#be185d" emissiveIntensity={0.6} />
      </mesh>

      <mesh ref={rightEyeRef} position={[0.35, 0.3, 1.15]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#ec4899" emissive="#be185d" emissiveIntensity={0.6} />
      </mesh>

      <mesh position={[0, -0.3, 0.95]}>
        <torusGeometry args={[0.32, 0.08, 8, 64]} />
        <meshStandardMaterial color="#121212" />
      </mesh>
    </group>
  );
}

// Particle system
function ParticleSystem() {
  const particlesRef = useRef<THREE.InstancedMesh | null>(null);
  const particles = useRef<Array<{ pos: THREE.Vector3; vel: THREE.Vector3 }>>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const gathering = useRef(false);

  useEffect(() => {
    const count = 24;
    particles.current = Array.from({ length: count }).map(() => ({
      pos: new THREE.Vector3((Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 6),
      vel: new THREE.Vector3((Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02),
    }));

    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') gathering.current = !gathering.current;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  useFrame(() => {
    if (!particlesRef.current) return;
    particles.current.forEach((p, i) => {
      const cursor = new THREE.Vector3(mouse.current.x * 5, mouse.current.y * 3, 0);
      if (gathering.current) {
        const dir = new THREE.Vector3().subVectors(new THREE.Vector3(0, 0, 0), p.pos).normalize().multiplyScalar(0.02);
        p.vel.lerp(dir, 0.05);
      } else {
        const dir = p.pos.clone().sub(cursor);
        if (dir.length() < 2.2) p.vel.add(dir.normalize().multiplyScalar(0.02));
        p.vel.multiplyScalar(0.98);
      }
      p.pos.add(p.vel);

      // wrap bounds
      const axes: Array<'x' | 'y' | 'z'> = ['x', 'y', 'z'];
      axes.forEach((axis) => {
        if (p.pos[axis] > 6) p.pos[axis] = -6;
        if (p.pos[axis] < -6) p.pos[axis] = 6;
      });

      const mat = new THREE.Matrix4().setPosition(p.pos);
      particlesRef.current!.setMatrixAt(i, mat);
    });
    particlesRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={particlesRef} args={[undefined, undefined, 24] as any}>
      <sphereGeometry args={[0.18, 16, 16]} />
      <meshStandardMaterial color="#64ffda" emissive="#22c55e" emissiveIntensity={0.4} />
    </instancedMesh>
  );
}

export default function Canvas3D() {
  return (
    <Canvas
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
      camera={{ position: [0, 1.6, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#020617"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 7]} intensity={1} />
      <pointLight position={[-5, 5, -7]} intensity={0.6} color="#64ffda" />
      <Environment preset="night" />

      <TrackingHead />
      <ParticleSystem />
    </Canvas>
  );
}
