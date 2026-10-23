'use client';
/** Section hero yang memutar animasi masuk (kata per kata) saat halaman dibuka. */
import { useEffect, useState, type ReactNode } from 'react';

export default function IntroSection({ className, id, children }: { className: string; id?: string; children: ReactNode }) {
  const [go, setGo] = useState(false);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = requestAnimationFrame(() => setGo(true));
    return () => cancelAnimationFrame(r);
  }, []);
  return <section className={go ? `${className} go` : className} id={id}>{children}</section>;
}
