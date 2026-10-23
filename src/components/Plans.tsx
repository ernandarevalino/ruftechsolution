import Link from 'next/link';
import harga from '@/data/harga.json';
import { wa } from '@/lib/site';
import './Plans.css';

const Arrow = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

export default function Plans() {
  return (
    <div className="c-plans">
      <div className="plans">
        {harga.paket.map((p) => (
          <div key={p.nama} className={['plan', 'glow', 'lift', 'reveal', p.unggulan && 'hi'].filter(Boolean).join(' ')}>
            <div className="nm">{p.nama}{p.unggulan && <small>Paling dipilih</small>}</div>
            <div className="pr">{p.harga}<span>{p.keterangan}</span></div>
            <p>{p.untuk}</p>
            <ul>{p.fitur.map((f) => <li key={f} className={f.startsWith('Semua fitur') ? 'inc' : undefined}>{f}</li>)}</ul>
            <a className={p.unggulan ? 'btn btn-p' : 'btn btn-g'} href={wa(`Halo Ruftech, saya tertarik paket ${p.nama}`)} target="_blank" rel="noopener">Pilih {p.nama}</a>
          </div>
        ))}
      </div>
      <div className="custom">
        <div><b>{harga.custom.judul}</b><p>{harga.custom.isi}</p></div>
        <a className="more" href={wa('Halo Ruftech, saya mau tanya paket custom')} target="_blank" rel="noopener">Diskusikan kebutuhanmu <Arrow /></a>
      </div>
      <p className="note">{harga.catatan}</p>
      <p className="calc-link"><Link className="more" href="/harga#estimasi">Hitung estimasi sesuai kebutuhanmu <Arrow /></Link></p>
    </div>
  );
}
