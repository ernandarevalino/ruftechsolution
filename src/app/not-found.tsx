import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import '@/styles/pages/notfound.css';

export const metadata: Metadata = { ...pageMeta({ title: 'Halaman tidak ditemukan', path: '/404' }), robots: { index: false } };

export default function NotFound() {
  return (
    <div className="c-notfound">
      <header className="phead nf">
        <div className="wrap">
          <span className="kicker">404</span>
          <h1>Halaman ini <em>tidak ditemukan</em></h1>
          <p>Mungkin alamatnya salah ketik atau halamannya sudah dipindah.</p>
          <div className="acts"><Link className="btn btn-p" href="/">Kembali ke beranda</Link><Link className="btn btn-g" href="/karya">Lihat karya</Link></div>
        </div>
      </header>
    </div>
  );
}
