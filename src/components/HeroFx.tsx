'use client';
/**
 * Latar hero interaktif: cahaya aurora bergerak, jaringan titik yang bereaksi
 * pada kursor, dan sorot cahaya yang mengikuti mouse.
 * Taruh di dalam elemen ber-`position: relative; overflow: hidden`.
 */
import { useEffect, useRef } from 'react';
import './HeroFx.css';

export default function HeroFx() {
  const fxRef = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLCanvasElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fx = fxRef.current, cv = cvRef.current, spot = spotRef.current;
    const host = fx?.parentElement;
    if (!fx || !cv || !spot || !host) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
    if (reduce) { cv.style.display = 'none'; return; }

    const mouse = { x: -999, y: -999 };
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
      if (fine) { spot.style.setProperty('--hx', `${mouse.x}px`); spot.style.setProperty('--hy', `${mouse.y}px`); }
    };
    const onLeave = () => { mouse.x = mouse.y = -999; };
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);

    const ctx = cv.getContext('2d')!;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let W = 0, H = 0, run = true, raf = 0, alive = true;
    let pts: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const size = () => {
      W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(70, (W * H) / 16000));
      pts = Array.from({ length: count }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25, r: Math.random() * 1.4 + .6 }));
    };
    size(); addEventListener('resize', size);

    const tick = () => {
      if (!run || !alive) return;
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]; p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (dm < 140) { p.x += ((p.x - mouse.x) / dm) * .6; p.y += ((p.y - mouse.y) / dm) * .6; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fillStyle = 'rgba(183,160,255,.8)'; ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 130) { ctx.strokeStyle = `rgba(150,150,255,${(1 - d / 130) * .28})`; ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
        }
        if (dm < 180) { ctx.strokeStyle = `rgba(183,140,255,${(1 - dm / 180) * .5})`; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
      }
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((es) => { const was = run; run = es[0].isIntersecting; if (run && !was) tick(); });
    io.observe(host);
    tick();

    return () => {
      alive = false; cancelAnimationFrame(raf); io.disconnect();
      removeEventListener('resize', size);
      host.removeEventListener('pointermove', onMove); host.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div className="c-herofx fx" aria-hidden="true" ref={fxRef}>
      <div className="aurora"><i></i><i></i><i></i></div>
      <canvas className="net" ref={cvRef}></canvas>
      <div className="spot" ref={spotRef}></div>
    </div>
  );
}
