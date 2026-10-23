'use client';
/**
 * Animasi umum seluruh halaman: judul menyala kata per kata saat di-scroll,
 * cahaya kursor di kartu (.glow), dan pelacakan sumber klik WhatsApp.
 */
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { mulaiPelacakan } from '@/lib/track';

export default function Effects() {
  const pathname = usePathname();

  // sekali saja: pelacakan + cahaya kursor (event delegation, jadi berlaku untuk semua halaman)
  useEffect(() => {
    const stop = mulaiPelacakan();
    const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.('.glow') as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    if (fine) document.addEventListener('pointermove', onMove, { passive: true });
    return () => { stop(); document.removeEventListener('pointermove', onMove); };
  }, []);

  // per halaman: judul .rv menyala kata per kata
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const heads = Array.from(document.querySelectorAll<HTMLElement>('.rv'));
    const words = heads.map((h) => Array.from(h.querySelectorAll<HTMLElement>('.w')));
    let ticking = false;
    const upd = () => {
      ticking = false;
      const vh = innerHeight;
      heads.forEach((h, k) => {
        const r = h.getBoundingClientRect();
        const p = Math.max(0, Math.min(1, (vh * .92 - r.top) / (vh * .45)));
        const w = words[k], n = w.length;
        for (let i = 0; i < n; i++) {
          const v = Math.max(0, Math.min(1, p * (n + 2) - i));
          w[i].style.setProperty('--o', (.18 + v * .82).toFixed(3));
        }
      });
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(upd); } };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', upd);
    upd();
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', upd); };
  }, [pathname]);

  return null;
}
