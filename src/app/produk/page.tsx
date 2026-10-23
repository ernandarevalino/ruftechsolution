import Link from 'next/link';
import { getProduk } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { wa } from '@/lib/site';
import PageHead from '@/components/PageHead';
import Device from '@/components/Device';
import '@/styles/pages/produkindex.css';

export const metadata = pageMeta({
  title: 'Produk',
  path: '/produk',
  description: 'Produk aplikasi siap pakai dari Ruftech Solutions untuk UMKM, dipasang langsung oleh tim kami.',
});

export default function ProdukIndex() {
  return (
    <div className="c-produkindex">
      <PageHead kicker="Produk" sub="Untuk usaha dengan alur yang umum, produk siap pakai lebih cepat dan hemat. Tetap dipasang dan dilatih langsung oleh tim Ruftech.">
        Aplikasi <em>siap pakai</em> untuk jenis usaha tertentu
      </PageHead>

      <section className="pt0">
        <div className="wrap list">
          {getProduk().map((p) => (
            <Link key={p.id} className="prod card glow reveal" href={`/produk/${p.id}`}>
              <div className="txt">
                <span className={p.status === 'Segera hadir' ? 'status soon' : 'status'}>{p.status}</span>
                <h2>{p.title}</h2>
                <p>{p.tagline}</p>
                <ul>{p.fitur.slice(0, 4).map((f) => <li key={f}>{f}</li>)}</ul>
                <span className="more">Lihat detail <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
              </div>
              <Device cover={p.cover} mockup={p.mockup} warna={p.warna} alt={`Tampilan ${p.title}`} judul={p.title} />
            </Link>
          ))}
          <div className="ask card reveal">
            <div>
              <h3>Usahamu tidak ada di daftar?</h3>
              <p>Hampir semua aplikasi Ruftech dibuat custom. Ceritakan alurmu, kami buatkan yang pas.</p>
            </div>
            <a className="btn btn-g" href={wa('Halo Ruftech, saya mau tanya aplikasi untuk usaha saya')} target="_blank" rel="noopener">Tanya via WhatsApp</a>
          </div>
        </div>
      </section>
    </div>
  );
}
