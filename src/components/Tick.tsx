'use client';
import { useEffect, useState } from 'react';

const p = (n: number) => String(n).padStart(2, '0');
const fmt = (v: number) => `${p(Math.floor(v / 3600))}:${p(Math.floor(v % 3600 / 60))}:${p(v % 60)}`;

/** Timer meja yang berjalan per detik (contoh di mockup). */
export default function Tick({ start }: { start: string }) {
  const [h, m, s] = start.split(':').map(Number);
  const [v, setV] = useState(h * 3600 + m * 60 + s);
  useEffect(() => {
    const t = setInterval(() => setV((x) => x + 1), 1000);
    return () => clearInterval(t);
  }, []);
  return <span className="mono tick">{fmt(v)}</span>;
}
