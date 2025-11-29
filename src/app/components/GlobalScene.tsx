'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Canvas3D = dynamic(() => import('./Canvas3D'), {
  ssr: false,
  loading: () => <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: '#0a0a0a', zIndex: 0 }} />
});

export default function GlobalScene() {
  return (
    <Suspense fallback={<div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: '#0a0a0a', zIndex: 0 }} />}>
      <Canvas3D />
    </Suspense>
  );
}
