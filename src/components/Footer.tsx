import Link from 'next/link';
import { site, wa, ig, menu } from '@/lib/site';
import './Footer.css';

export default function Footer() {
  const tahun = new Date().getFullYear();
  return (
    <footer className="c-footer">
      <div className="wrap">
        <div className="fcta">
          <h2>Punya usaha yang ingin <em>lebih rapi</em>?</h2>
          <a className="btn btn-p" href={wa()} target="_blank" rel="noopener">Konsultasi gratis via WhatsApp</a>
        </div>
        <div className="fcols">
          <div>
            <Link className="logo" href="/"><img src="/img/logo-ruftech-light.png" alt="Ruftech Solutions" width={153} height={52} /></Link>
            <p className="about">Aplikasi kasir, stok, keuangan, dan absensi custom untuk UMKM, berbasis Google Sheets milikmu sendiri.</p>
            <img className="bantu" src="/img/bantu-umkm.png" alt="#BantuUMKMNaikKelas" width={200} height={66} loading="lazy" />
          </div>
          <div>
            <h4>Menu</h4>
            {menu.map((m) => <Link key={m.href} href={m.href}>{m.label}</Link>)}
            <Link href="/kontak">Kontak</Link>
          </div>
          <div>
            <h4>Hubungi</h4>
            <a href={wa()} target="_blank" rel="noopener">WhatsApp {site.whatsappTampil}</a>
            <a href={ig()} target="_blank" rel="noopener">Instagram @{site.instagram}</a>
            {site.tiktok && <a href={`https://www.tiktok.com/@${site.tiktok}`} target="_blank" rel="noopener">TikTok @{site.tiktok}</a>}
            {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
            <span>{site.kota}</span>
            <span className="dim">{site.jamKerja}</span>
          </div>
        </div>
        <div className="fbase">
          <span>© {tahun} {site.nama}. Semua hak dilindungi.</span>
          <span>Dibuat dengan Next.js · Data aman di Google Sheets milik klien</span>
        </div>
      </div>
    </footer>
  );
}
