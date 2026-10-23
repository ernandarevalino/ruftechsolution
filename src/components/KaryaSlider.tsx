'use client';
/** Slider karya di beranda: geser otomatis tiap 5,2 detik, berhenti saat kursor di atasnya. */
import { useEffect, useRef, type ReactNode } from 'react';

export default function KaryaSlider({ count, children, footer }: { count: number; children: ReactNode; footer?: ReactNode }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const slider = sliderRef.current, track = trackRef.current, dots = dotsRef.current;
    if (!slider || !track || !dots) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const slides = Array.from(track.children) as HTMLElement[];
    if (!slides.length) return;
    const pad = () => parseFloat(getComputedStyle(track).paddingLeft);
    const idx = () => { let best = 0, bd = 1e9; const l = track.getBoundingClientRect().left + pad(); slides.forEach((s, i) => { const d = Math.abs(s.getBoundingClientRect().left - l); if (d < bd) { bd = d; best = i; } }); return best; };
    const paint = () => { const k = idx(); Array.from(dots.children).forEach((d, i) => d.classList.toggle('on', i === k)); };
    const go = (i: number) => { i = (i + slides.length) % slides.length; track.scrollTo({ left: slides[i].offsetLeft - pad(), behavior: 'smooth' }); };
    let timer: number | undefined;
    const restart = () => {
      clearInterval(timer); if (reduce) return;
      timer = window.setInterval(() => { if (!slider.classList.contains('paused')) go(idx() + 1); }, 5200);
      const on = dots.querySelector('.on'); if (on) { on.classList.remove('on'); void (on as HTMLElement).offsetWidth; on.classList.add('on'); }
    };
    const onPrev = () => { go(idx() - 1); restart(); };
    const onNext = () => { go(idx() + 1); restart(); };
    const onDot = (e: Event) => { const i = Array.from(dots.children).indexOf(e.target as Element); if (i >= 0) { go(i); restart(); } };
    const enter = () => slider.classList.add('paused');
    const leave = () => slider.classList.remove('paused');
    let st: number | undefined;
    const onScroll = () => { clearTimeout(st); st = window.setTimeout(paint, 60); };
    prevRef.current?.addEventListener('click', onPrev);
    nextRef.current?.addEventListener('click', onNext);
    dots.addEventListener('click', onDot);
    slider.addEventListener('pointerenter', enter);
    slider.addEventListener('pointerleave', leave);
    track.addEventListener('touchstart', restart, { passive: true });
    track.addEventListener('scroll', onScroll, { passive: true });
    paint();
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) restart(); else clearInterval(timer); }, { threshold: .3 });
    io.observe(slider);
    return () => {
      clearInterval(timer); clearTimeout(st); io.disconnect();
      prevRef.current?.removeEventListener('click', onPrev);
      nextRef.current?.removeEventListener('click', onNext);
      dots.removeEventListener('click', onDot);
      slider.removeEventListener('pointerenter', enter);
      slider.removeEventListener('pointerleave', leave);
      track.removeEventListener('touchstart', restart);
      track.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="slider" ref={sliderRef}>
      <div className="track" ref={trackRef}>{children}</div>
      <div className="ctrl">
        <button type="button" ref={prevRef} aria-label="Karya sebelumnya"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg></button>
        <div className="dots" ref={dotsRef}>{Array.from({ length: count }, (_, i) => <i key={i}></i>)}</div>
        <button type="button" ref={nextRef} aria-label="Karya berikutnya"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg></button>
      </div>
      {footer}
    </div>
  );
}
