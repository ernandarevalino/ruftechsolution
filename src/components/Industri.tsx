/** Jalan masuk per jenis usaha: masalah umum + contoh aplikasi yang relevan. */
import Link from 'next/link';
import Rv from './Rv';
import './Industri.css';

const items = [
  { j: 'Toko & ritel', m: 'Ratusan produk, kasir harus cepat, stok sering tidak cocok.', s: 'Kasir barcode, stok, struk thermal', href: '/karya/alesha-store', ic: 'M4 7h16l-1.5 11a2 2 0 0 1-2 1.8H7.5a2 2 0 0 1-2-1.8L4 7Zm4 0V5a4 4 0 0 1 8 0v2' },
  { j: 'Cafe & kuliner', m: 'Pesanan per meja, menu banyak, laba per menu tidak kelihatan.', s: 'Kasir menu, HPP per menu, nota WA', href: '/produk/cafepos', ic: 'M5 8h11v5a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V8Zm11 1h1.5a2.5 2.5 0 0 1 0 5H16M8 3v2M11 3v2' },
  { j: 'Distributor & grosir', m: 'Harga beda tiap pelanggan, banyak yang bayar tempo.', s: 'Stok gudang, piutang, laporan PDF', href: '/karya/katabond', ic: 'M3 7l9-4 9 4v10l-9 4-9-4V7Zm0 0 9 4 9-4M12 11v10' },
  { j: 'Produsen titip jual', m: 'Barang dititip ke banyak warung, setoran sering selisih.', s: 'Titip jual, setoran, lokasi warung', href: '/karya/udrinks', ic: 'M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z' },
  { j: 'Sewa & hiburan', m: 'Booking lewat chat, jadwal bentrok, DP tercecer.', s: 'Booking online, DP QRIS, member', href: '/karya/fahouse-mahjong', ic: 'M4 6h16v13H4zM4 10h16M8 3v4M16 3v4' },
  { j: 'Pangan segar', m: 'Jual per kg dan per ekor, pelanggan langganan sering ngutang.', s: 'Kasir per satuan, hutang, laba harian', href: '/karya/ud-rezeki-bersama', ic: 'M4 19c8 0 14-6 16-15C11 6 5 11 4 19Zm0 0 7-7' },
];

export default function Industri() {
  return (
    <section className="c-industri ind">
      <div className="wrap">
        <div className="sh">
          <span className="kicker">Untuk usaha seperti apa?</span>
          <Rv>Pilih yang paling mirip dengan usahamu</Rv>
        </div>
        <div className="grid">
          {items.map((it) => (
            <Link key={it.j} className="it glow lift reveal" href={it.href}>
              <span className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={it.ic} /></svg></span>
              <h3>{it.j}</h3>
              <p>{it.m}</p>
              <span className="sol">{it.s}</span>
              <span className="go">Lihat contohnya <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
