'use client';
/** Angka yang menghitung naik saat terlihat di layar. */
import { useEffect, useRef, useState } from 'react';

export default function Count({ to, suf = '' }: { to: number; suf?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [v, setV] = useState<number | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    let raf = 0;
    const io = new IntersectionObserver((es) => {
      if (!es[0].isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t: number) => { const k = Math.min(1, (t - t0) / 1400); setV(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) raf = requestAnimationFrame(step); };
      raf = requestAnimationFrame(step);
    }, { threshold: .6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <b ref={ref}>{v === null ? to : v}{suf}</b>;
}
