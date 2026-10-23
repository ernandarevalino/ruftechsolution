/**
 * Deretan klien/mitra yang berjalan. Logo diambil dari src/data/mitra.json (bisa diedit lewat admin).
 * Selama logo belum diunggah, nama usaha ditampilkan sebagai teks.
 */
import type { CSSProperties } from 'react';
import Link from 'next/link';
import mitra from '@/data/mitra.json';
import './Mitra.css';

type M = { nama: string; logo?: string; latar?: string; karya?: string };

export default function Mitra() {
  const list = (mitra.daftar as M[]).filter((m) => m.nama);
  if (!list.length) return null;
  const loop = [...list, ...list, ...list];
  return (
    <section className="c-mitra mitra" aria-label={mitra.judul}>
      <div className="wrap"><p className="lbl">{mitra.judul}</p></div>
      <div className="belt">
        <div className="row">
          {loop.map((m, i) => {
            const hidden = i >= list.length;
            const isi = m.logo
              ? <span className="tile" style={{ '--bg': m.latar || '#ffffff' } as CSSProperties}><img src={m.logo} alt={m.nama} loading="lazy" /></span>
              : <span className="wm"><i></i>{m.nama}</span>;
            return m.karya
              ? <Link key={i} className="it" href={`/karya/${m.karya}`} aria-hidden={hidden || undefined} tabIndex={hidden ? -1 : undefined} prefetch={false}>{isi}</Link>
              : <a key={i} className="it" aria-hidden={hidden || undefined}>{isi}</a>;
          })}
        </div>
      </div>
    </section>
  );
}
