'use client';
/**
 * Kalkulator estimasi biaya: pengunjung mencentang fitur, total & DP langsung terhitung,
 * lalu rinciannya bisa dikirim ke WhatsApp. Data harga: src/data/kalkulator.json (bisa diedit lewat admin).
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import k from '@/data/kalkulator.json';
import { site, rp } from '@/lib/site';
import './Kalkulator.css';

type Item = { id: string; nama: string; ket: string; harga: number };
type Paket = { nama: string; item: string[] };
const grup = k.grup as { nama: string; item: Item[] }[];
const preset = k.preset as Paket[];
const contoh = ((k as { contoh?: Paket[] }).contoh || []) as Paket[];
const semua = grup.flatMap((g) => g.item);
const jumlahFitur = semua.length;
const bukaAwal = grup.map((_, gi) => gi < 2);
const teksCari = (it: Item) => `${it.nama}${it.ket}+${rp(it.harga)}`.toLowerCase();

export default function Kalkulator() {
  const [dipilih, setDipilih] = useState<Set<string>>(new Set());
  const [cari, setCari] = useState('');
  const [buka, setBuka] = useState<boolean[]>(bukaAwal);
  const [tampil, setTampil] = useState<number>(k.dasar.harga);
  const [bump, setBump] = useState(0);
  const [mbar, setMbar] = useState(false);
  const shown = useRef<number>(k.dasar.harga);
  const pickRef = useRef<HTMLDivElement>(null);
  const sumRef = useRef<HTMLElement>(null);

  // daftar fitur terpilih, urut sesuai tampilan
  const sel = useMemo(() => semua.filter((it) => dipilih.has(it.id)), [dipilih]);
  const total = k.dasar.harga + sel.reduce((s, it) => s + it.harga, 0);

  // angka total berjalan halus ke nilai baru
  const pertama = useRef(true);
  useEffect(() => {
    if (pertama.current) { pertama.current = false; return; }
    const from = shown.current, to = total, t0 = performance.now();
    shown.current = to;
    setBump((b) => b + 1);
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / 450);
      setTampil(from + (to - from) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [total]);

  // HP: bar ringkas di bawah layar selama daftar fitur terlihat dan ringkasan belum terlihat
  useEffect(() => {
    if (!matchMedia('(max-width: 900px)').matches || !('IntersectionObserver' in window) || !pickRef.current || !sumRef.current) return;
    let pickIn = false, sumIn = false;
    const sync = () => setMbar(pickIn && !sumIn);
    const a = new IntersectionObserver((e) => { pickIn = e[0].isIntersecting; sync(); });
    const b = new IntersectionObserver((e) => { sumIn = e[0].isIntersecting; sync(); }, { threshold: .25 });
    a.observe(pickRef.current); b.observe(sumRef.current);
    return () => { a.disconnect(); b.disconnect(); };
  }, []);

  const ids = [...dipilih].sort().join(',');
  const match = [...preset, ...contoh].find((p) => [...p.item].sort().join(',') === ids);
  const isPaket = !!match && preset.some((p) => p.nama === match.nama);

  const toggle = (id: string) => setDipilih((s) => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const pakai = (item: string[]) => {
    const n = new Set(item);
    setDipilih(n);
    setBuka((b) => b.map((o, gi) => o || grup[gi].item.some((it) => n.has(it.id))));
  };

  const q = cari.trim().toLowerCase();
  const hasil = grup.map((g) => g.item.map((it) => !q || teksCari(it).includes(q)));
  const adaHasil = hasil.some((h) => h.some(Boolean));
  const onCari = (v: string) => {
    setCari(v);
    const qq = v.trim().toLowerCase();
    setBuka(grup.map((g, gi) => {
      const hit = g.item.filter((it) => !qq || teksCari(it).includes(qq)).length;
      return qq ? hit > 0 : bukaAwal[gi] || g.item.some((it) => dipilih.has(it.id));
    }));
  };

  const pesan = [
    'Halo Ruftech, saya sudah coba kalkulator estimasi di website.',
    '',
    'Fitur yang saya butuhkan:',
    `- ${k.dasar.nama}`,
    ...sel.map((it) => `- ${it.nama}`),
    '',
    `Estimasi: ${rp(total)}`,
    '',
    'Boleh dibantu konsultasi?',
  ].join('\n');

  return (
    <div className="c-kalkulator calc" id="kalkulator">
      <div className="pick" ref={pickRef}>
        <div className="presets">
          <span>Mulai dari paket:</span>
          {preset.map((p) => <button key={p.nama} type="button" className={match?.nama === p.nama ? 'pre on' : 'pre'} onClick={() => pakai(p.item)}>{p.nama}</button>)}
        </div>
        {contoh.length > 0 && (
          <div className="presets">
            <span>Contoh usaha:</span>
            {contoh.map((p) => <button key={p.nama} type="button" className={match?.nama === p.nama ? 'pre alt on' : 'pre alt'} onClick={() => pakai(p.item)}>{p.nama}</button>)}
            <button type="button" className="pre ghost" onClick={() => pakai([])}>Kosongkan</button>
          </div>
        )}
        <div className="search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          <input type="search" id="c-cari" value={cari} onChange={(e) => onCari(e.target.value)} placeholder={`Cari di ${jumlahFitur} fitur, mis. "stok" atau "WhatsApp"`} autoComplete="off" />
        </div>

        <div className="base">
          <span className="chk on" aria-hidden="true"></span>
          <div><b>{k.dasar.nama}</b><small>{k.dasar.isi}</small></div>
          <span className="pr mono">{rp(k.dasar.harga)}</span>
          <span className="tag">Selalu termasuk</span>
        </div>

        {grup.map((g, gi) => {
          const n = g.item.filter((it) => dipilih.has(it.id)).length;
          const hit = hasil[gi].filter(Boolean).length;
          return (
            <details key={g.nama} className="grp" open={buka[gi]} hidden={!!q && !hit}
              onToggle={(e) => { const o = (e.currentTarget as HTMLDetailsElement).open; setBuka((b) => (b[gi] === o ? b : b.map((x, i) => (i === gi ? o : x)))); }}>
              <summary><span>{g.nama}</span><em className="cnt">{n ? n : ''}</em><small>{g.item.length} fitur</small><i aria-hidden="true"></i></summary>
              <div className="items">
                {g.item.map((it, ii) => (
                  <label key={it.id} className="opt" htmlFor={`f-${it.id}`} hidden={!hasil[gi][ii]}>
                    <input type="checkbox" id={`f-${it.id}`} value={it.id} checked={dipilih.has(it.id)} onChange={() => toggle(it.id)} />
                    <span className="chk" aria-hidden="true"></span>
                    <span className="tx"><b>{it.nama}</b><small>{it.ket}</small></span>
                    <span className="pr mono">+{rp(it.harga)}</span>
                  </label>
                ))}
              </div>
            </details>
          );
        })}
        <p className="nores" hidden={adaHasil}>Fitur tidak ditemukan. Ceritakan kebutuhanmu lewat WhatsApp, kami bantu carikan solusinya.</p>
      </div>

      <aside className="sum" id="c-sum" aria-live="polite" ref={sumRef}>
        <span className="kicker">Estimasi biaya</span>
        <div key={bump} className={bump ? 'total mono bump' : 'total mono'}>{rp(tampil)}</div>
        <p className="paket">
          {!sel.length ? 'Pilih fitur yang kamu butuhkan.'
            : match ? (isPaket ? <>Sama dengan paket <b>{match.nama}</b>.</> : <>Contoh kebutuhan usaha <b>{match.nama}</b>, {sel.length} fitur.</>)
            : `${sel.length} fitur dipilih, racikan custom.`}
        </p>
        <div className="split">
          <div><small>DP 30%</small><b className="mono">{sel.length ? rp(total * 0.3) : '-'}</b><span>setelah rancangan disetujui</span></div>
          <div><small>Pelunasan 70%</small><b className="mono">{sel.length ? rp(total * 0.7) : '-'}</b><span>saat serah terima</span></div>
        </div>
        <ul className="list">
          {sel.length ? sel.map((it) => <li key={it.id}><span>{it.nama}</span><span>+{rp(it.harga)}</span></li>)
            : <li className="muted">Belum ada fitur dipilih</li>}
        </ul>
        {/* sumber pengunjung (via tiktok, dll.) ditambahkan otomatis saat diklik, lihat lib/track.ts */}
        <a className="btn btn-wa" href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(pesan)}`} target="_blank" rel="noopener">Kirim rincian ke WhatsApp</a>
        <p className="fine">{k.catatan}</p>
      </aside>
      <a className="mbar" href="#c-sum" hidden={!mbar}><span>Estimasi</span><b className="mono">{rp(total)}</b><em>Lihat rincian</em></a>
    </div>
  );
}
