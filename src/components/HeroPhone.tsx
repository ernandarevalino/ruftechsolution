'use client';
/**
 * HP berisi aplikasi yang "hidup" untuk hero beranda:
 * omzet bertambah, transaksi baru masuk, dan notifikasi melayang di sekitarnya.
 * Data contoh.
 */
import { useEffect, useRef, useState } from 'react';
import './HeroPhone.css';

interface Tx { no: number; qris: boolean; jam: string; nilai: number; baru: boolean }
const fmt = (n: number) => 'Rp' + n.toLocaleString('id-ID');
const amounts = [18500, 64000, 27000, 112000, 45500, 39000, 86000, 23500];
const awal: Tx[] = [
  { no: 47, qris: false, jam: '10.42', nilai: 48000, baru: false },
  { no: 46, qris: true, jam: '10.31', nilai: 126500, baru: false },
  { no: 45, qris: false, jam: '10.18', nilai: 32000, baru: false },
];

export default function HeroPhone() {
  const [s, setS] = useState({ omz: 2418000, laba: 612000, trx: 47, min: 42, rows: awal });
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !listRef.current) return;
    let visible = true;
    const io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; });
    io.observe(listRef.current);
    const t = setInterval(() => {
      if (!visible) return;
      setS((p) => {
        const a = amounts[p.trx % amounts.length];
        const trx = p.trx + 1, min = p.min + 3 + (trx % 5);
        const jam = `${10 + Math.floor(min / 60)}.${String(min % 60).padStart(2, '0')}`;
        const row: Tx = { no: trx, qris: trx % 3 === 0, jam, nilai: a, baru: true };
        return { omz: p.omz + a, laba: p.laba + Math.round(a * 0.26), trx, min, rows: [row, ...p.rows].slice(0, 4) };
      });
    }, 2600);
    return () => { clearInterval(t); io.disconnect(); };
  }, []);

  return (
    <div className="c-herophone hp" aria-hidden="true">
      <div className="glowring"></div>
      <div className="phone">
        <div className="island"></div>
        <div className="scr">
          <div className="top">
            <div><small>Laporan hari ini</small><b>Toko Sumber Rejeki</b></div>
            <span className="live">Live</span>
          </div>
          <div className="omz">
            <small>Omzet</small>
            <b key={s.trx} className={s.trx > 47 ? 'mono bump' : 'mono'}>{fmt(s.omz)}</b>
            <span className="up">▲ 12% dari kemarin</span>
          </div>
          <div className="two">
            <div><small>Laba kotor</small><b className="mono">{fmt(s.laba)}</b></div>
            <div><small>Transaksi</small><b className="mono">{s.trx}</b></div>
          </div>
          <div className="spark">
            <svg viewBox="0 0 200 50" preserveAspectRatio="none"><defs><linearGradient id="hpg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#8A2BFF" stopOpacity=".35" /><stop offset="1" stopColor="#8A2BFF" stopOpacity="0" /></linearGradient></defs><path d="M0 40 L25 34 L50 37 L75 26 L100 29 L125 18 L150 22 L175 10 L200 6 L200 50 L0 50Z" fill="url(#hpg)" /><path className="ln" d="M0 40 L25 34 L50 37 L75 26 L100 29 L125 18 L150 22 L175 10 L200 6" fill="none" stroke="#8A2BFF" strokeWidth="2.2" pathLength={1} /></svg>
          </div>
          <div className="list" ref={listRef}>
            {s.rows.map((r) => (
              <div key={r.no} className={r.baru ? 'tx new' : 'tx'}>
                <span className={r.qris ? 'ic q' : 'ic k'}></span>
                <div><b>Penjualan #{String(r.no).padStart(3, '0')}</b><small>{r.qris ? 'QRIS' : 'Tunai'} · {r.jam}</small></div>
                <em className="mono">+{r.nilai.toLocaleString('id-ID')}</em>
              </div>
            ))}
          </div>
          <div className="tabbar"><i className="on"></i><i></i><i></i><i></i></div>
        </div>
      </div>
      <div className="chip c1"><span className="d g"></span>Nota terkirim ke WhatsApp <span className="ticks"></span></div>
      <div className="chip c2"><span className="d y"></span>Stok Gula 1kg tinggal 4</div>
      <div className="chip c3"><span className="d p"></span>Laporan bulanan siap · PDF</div>
    </div>
  );
}
