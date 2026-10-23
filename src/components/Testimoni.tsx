/**
 * Testimoni klien. Tidak tampil sama sekali selama belum ada testimoni yang diisi lewat admin.
 * `karya` (opsional): hanya tampilkan testimoni untuk karya tertentu.
 */
import Link from 'next/link';
import { getTestimoni } from '@/lib/content';
import Rv from './Rv';
import './Testimoni.css';

const inisial = (n: string) => n.split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();

export default function Testimoni({ karya, judul = 'Kata mereka yang sudah memakai' }: { karya?: string; judul?: string }) {
  const list = getTestimoni(karya);
  if (!list.length) return null;
  return (
    <section className={['c-testimoni', 'tst', !karya && 'pt0'].filter(Boolean).join(' ')}>
      <div className="wrap">
        <div className="sh"><span className="kicker">Testimoni</span><Rv>{judul}</Rv></div>
        <div className={list.length === 1 ? 'grid one' : 'grid'}>
          {list.map((t) => (
            <figure key={t.id} className="q card glow lift reveal">
              <span className="mark" aria-hidden="true">“</span>
              <blockquote>{t.kutipan}</blockquote>
              {t.bukti && <img className="bukti" src={t.bukti} alt={`Bukti testimoni dari ${t.nama}`} loading="lazy" />}
              <figcaption>
                {t.foto ? <img className="av" src={t.foto} alt="" loading="lazy" /> : <span className="av ini">{inisial(t.nama)}</span>}
                <span><b>{t.nama}</b><small>{t.usaha}</small></span>
                {t.karya && !karya && <Link className="lnk" href={`/karya/${t.karya}`}>Lihat aplikasinya</Link>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
