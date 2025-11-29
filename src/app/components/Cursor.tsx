"use client";

import React, { useEffect, useRef } from 'react';

export default function Cursor() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      el.style.left = e.clientX + 'px';
      el.style.top = e.clientY + 'px';
    };

    const onEnter = () => el.classList.add('cursor-hover');
    const onLeave = () => el.classList.remove('cursor-hover');

    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerdown', onEnter);
    document.addEventListener('pointerup', onLeave);

    // give interactive elements hover scaling
    document.querySelectorAll('a, button, .btn-primary, .btn-secondary').forEach((node) => {
      node.addEventListener('pointerenter', onEnter);
      node.addEventListener('pointerleave', onLeave);
    });

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerdown', onEnter);
      document.removeEventListener('pointerup', onLeave);
      document.querySelectorAll('a, button, .btn-primary, .btn-secondary').forEach((node) => {
        node.removeEventListener('pointerenter', onEnter);
        node.removeEventListener('pointerleave', onLeave);
      });
    };
  }, []);

  return <div ref={ref} className="custom-cursor" aria-hidden />;
}
