"use client";

import React, { useRef, useEffect } from 'react';

type Props = React.PropsWithChildren<{
  className?: string;
  glare?: boolean;
}>;

export default function TiltCard({ children, className = '', glare = true }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const ioRef = useRef<IntersectionObserver | null>(null);
  const raf = useRef<number | null>(null);
  const state = useRef({ rx: 0, ry: 0, r: 0, gx: 50, gy: 50, go: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; // 0..1
      const py = (e.clientY - rect.top) / rect.height;

      const ry = (px - 0.5) * 22; // rotateY
      const rx = (0.5 - py) * 18; // rotateX
      const r = Math.hypot(ry, rx);

      state.current.rx = rx;
      state.current.ry = ry;
      state.current.r = r;
      state.current.gx = px * 100;
      state.current.gy = py * 100;
      state.current.go = Math.min(0.6, 0.2 + r / 50);

      if (raf.current == null) {
        raf.current = requestAnimationFrame(update);
      }
    };

    const onLeave = () => {
      state.current.rx = 0;
      state.current.ry = 0;
      state.current.r = 0;
      state.current.go = 0;
      if (raf.current == null) {
        raf.current = requestAnimationFrame(update);
      }
    };

    const update = () => {
      raf.current = null;
      if (!el) return;
      const { rx, ry, gx, gy, go } = state.current;
      el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
      const glareEl = el.querySelector('.tilt-glare') as HTMLDivElement | null;
      if (glareEl) {
        glareEl.style.opacity = String(go);
        glareEl.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.18), transparent 40%)`;
      }
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('pointercancel', onLeave);
    el.addEventListener('pointerdown', onMove);
    // IntersectionObserver to toggle in-view class for left-line highlight
    if ('IntersectionObserver' in window) {
      ioRef.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.target instanceof HTMLElement) {
            if (entry.isIntersecting) entry.target.classList.add('in-view');
            else entry.target.classList.remove('in-view');
          }
        });
      }, { threshold: 0.25 });
      ioRef.current.observe(el);
    }

    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('pointercancel', onLeave);
      el.removeEventListener('pointerdown', onMove);
      if (ioRef.current && el) ioRef.current.unobserve(el);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div ref={ref} className={`tilt-card relative ${className}`}>
      <div className="tilt-inner relative">
        {children}
      </div>
      {glare && <div aria-hidden className="tilt-glare absolute inset-0 rounded-lg pointer-events-none" />}
    </div>
  );
}
