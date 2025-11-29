"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the heavy ThreeHero component (no SSR)
const DynamicThreeHero = dynamic(() => import('./ThreeHero'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-b from-transparent to-black/10" />,
});

export default function HeroCanvasLoader() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => evaluate();

    function evaluate() {
      const reduced = mq.matches;
      const smallScreen = window.innerWidth < 768; // don't load on small viewports
      setShouldLoad(!reduced && !smallScreen);
    }

    evaluate();
    mq.addEventListener?.('change', onChange);
    window.addEventListener('resize', onChange);

    return () => {
      mq.removeEventListener?.('change', onChange);
      window.removeEventListener('resize', onChange);
    };
  }, []);

  if (!shouldLoad) {
    // Render a subtle static fallback (keeps visual continuity)
    return <div className="w-full h-full bg-gradient-to-b from-transparent to-black/10" aria-hidden />;
  }

  return <DynamicThreeHero />;
}
