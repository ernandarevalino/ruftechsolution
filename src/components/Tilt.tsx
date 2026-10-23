'use client';
import { useEffect, useRef, type ReactNode } from 'react';

/** Laptop sedikit miring mengikuti kursor (hanya di perangkat dengan mouse). */
export default function Tilt({ className, children }: { className: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const st = ref.current;
    const lap = st?.querySelector<HTMLElement>('.laptop');
    if (!st || !lap) return;
    if (!matchMedia('(hover:hover) and (pointer:fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const move = (e: PointerEvent) => {
      const r = st.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      lap.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 8}deg) translateZ(20px)`;
      st.style.setProperty('--sx', `${(x + .5) * 100}%`); st.style.setProperty('--sy', `${(y + .5) * 100}%`);
    };
    const leave = () => { lap.style.transform = ''; };
    st.addEventListener('pointermove', move);
    st.addEventListener('pointerleave', leave);
    return () => { st.removeEventListener('pointermove', move); st.removeEventListener('pointerleave', leave); };
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
