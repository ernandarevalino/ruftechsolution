/**
 * Layar aplikasi tiruan (contoh data) untuk dipajang di dalam laptop.
 * Dipakai bila karya/produk belum punya screenshot asli.
 */
import type { CSSProperties } from 'react';
import type { Mockup as Jenis } from '@/lib/content';
import Tick from './Tick';
import './Mockup.css';

export default function Mockup({ jenis, judul = '' }: { jenis: Jenis; judul?: string }) {
  return (
    <div className="c-mockup scr">
      {jenis === 'meja' && (
        <>
          <div className="bar">Status Meja <span className="mono">Jum 16 Okt · 19:05</span></div>
          <div className="tables">
            <div className="tb"><b>Meja 1</b><span className="st play">Main</span><Tick start="01:42:07" /></div>
            <div className="tb"><b>Meja 2</b><span className="st play">Main</span><Tick start="00:28:41" /></div>
            <div className="tb"><b>Meja 3</b><span className="st free">Kosong</span><span className="mono">-</span></div>
            <div className="tb"><b>Meja 4</b><span className="st book">Booking</span><span className="mono">20:00</span></div>
            <div className="tb"><b>Meja 5</b><span className="st free">Kosong</span><span className="mono">-</span></div>
            <div className="tb"><b>Meja 6</b><span className="st play">Main</span><Tick start="02:10:15" /></div>
            <div className="tb"><b>Meja 7</b><span className="st book">Booking</span><span className="mono">19:30</span></div>
            <div className="tb"><b>Meja 8</b><span className="st free">Kosong</span><span className="mono">-</span></div>
          </div>
          <div className="rows">
            <div className="rw"><span>19:30 · Meja 7 · Rina</span><span className="mono">DP 20.000</span><span className="pill ok">Disetujui</span></div>
            <div className="rw"><span>20:00 · Meja 4 · Kevin</span><span className="mono">DP 20.000</span><span className="pill warn">Menunggu</span></div>
          </div>
        </>
      )}
      {jenis === 'titip' && (
        <>
          <div className="bar">Titipan Aktif <span>Minggu ini</span></div>
          <div className="sum"><div><small>Botol dititip</small><b className="mono">214</b></div><div><small>Terjual</small><b className="mono">168</b></div><div><small>Setoran</small><b className="mono">Rp1,49 jt</b></div></div>
          <div className="rows">
            <div className="rw hdr"><span>Warung</span><span>Sisa</span><span>Status</span></div>
            <div className="rw"><span>Warung Bu Kokom<small className="mono">-6.2297, 106.6094</small></span><span className="mono">4</span><span className="pill warn">Isi ulang</span></div>
            <div className="rw"><span>Toko Sumber Rejeki<small className="mono">-6.2311, 106.6150</small></span><span className="mono">11</span><span className="pill ok">Aman</span></div>
            <div className="rw"><span>Warung Mang Ujang<small className="mono">-6.2254, 106.6021</small></span><span className="mono">0</span><span className="pill busy">Setor</span></div>
          </div>
        </>
      )}
      {jenis === 'piutang' && (
        <>
          <div className="bar">Piutang Pelanggan <span>Oktober 2026</span></div>
          <div className="sum"><div><small>Total piutang</small><b className="mono">Rp21,15 jt</b></div><div><small>Jatuh tempo minggu ini</small><b className="mono">1</b></div><div><small>Lunas bulan ini</small><b className="mono">7</b></div></div>
          <div className="rows">
            <div className="rw hdr"><span>Pelanggan</span><span>Sisa</span><span>Jatuh tempo</span></div>
            <div className="rw"><span>CV Maju Bangun<small>TOP 1 bulan</small></span><span className="mono">Rp8.400.000</span><span className="pill warn">3 hari lagi</span></div>
            <div className="rw"><span>Toko Bangunan Sinar<small>TOP 3 bulan</small></span><span className="mono">Rp12.750.000</span><span className="pill busy">12 Des</span></div>
            <div className="rw"><span>PT Graha Karya<small>Transfer</small></span><span className="mono">Rp0</span><span className="pill ok">Lunas</span></div>
          </div>
        </>
      )}
      {jenis === 'kasir' && (
        <>
          <div className="bar">Kasir {judul && <>· {judul}</>} <span className="mono">Jum 16 Okt 2026</span></div>
          <div className="pos">
            <div className="prods">
              <div className="scan"><i></i>Scan barcode atau cari produk…</div>
              <div className="p"><b>Es Kopi Susu</b><span className="mono">Rp18.000</span></div>
              <div className="p"><b>Croissant</b><span className="mono">Rp22.000</span></div>
              <div className="p"><b>Matcha Latte</b><span className="mono">Rp24.000</span></div>
              <div className="p"><b>Nasi Goreng</b><span className="mono">Rp28.000</span></div>
              <div className="p"><b>Teh Lemon</b><span className="mono">Rp12.000</span></div>
              <div className="p"><b>Kentang</b><span className="mono">Rp17.000</span></div>
            </div>
            <div className="cart">
              <div className="ln"><span>Es Kopi Susu ×2</span><span className="mono">36.000</span></div>
              <div className="ln"><span>Croissant</span><span className="mono">22.000</span></div>
              <div className="ln"><span>Matcha Latte</span><span className="mono">24.000</span></div>
              <div className="tot"><span>Total</span><span className="mono">Rp82.000</span></div>
              <div className="pay">Bayar · QRIS / Tunai</div>
            </div>
          </div>
        </>
      )}
      {jenis === 'laporan' && (
        <>
          <div className="bar">Laporan Harian <span className="mono">Jum 16 Okt 2026</span></div>
          <div className="sum"><div><small>Omzet</small><b className="mono">Rp6,82 jt</b></div><div><small>Laba kotor</small><b className="mono">Rp1,24 jt</b></div><div><small>Hutang pelanggan</small><b className="mono">Rp950 rb</b></div></div>
          <div className="rows">
            <div className="rw hdr"><span>Produk</span><span>Terjual</span><span>Stok</span></div>
            <div className="rw"><span>Ayam utuh<small>per ekor</small></span><span className="mono">46</span><span className="pill ok">38</span></div>
            <div className="rw"><span>Dada fillet<small>per kg</small></span><span className="mono">18,5</span><span className="pill warn">4,2</span></div>
            <div className="rw"><span>Sayap<small>per kg</small></span><span className="mono">12</span><span className="pill ok">9,8</span></div>
          </div>
        </>
      )}
      {jenis === 'distribusi' && (
        <>
          <div className="bar">Nota Pengiriman <span>Oktober 2026</span></div>
          <div className="rows">
            <div className="rw hdr"><span>Toko</span><span>Tagihan</span><span>Status</span></div>
            <div className="rw"><span>Toko Buah Segar Jaya<small>NP-1029 · 42 kg</small></span><span className="mono">Rp3.360.000</span><span className="pill ok">Lunas</span></div>
            <div className="rw"><span>Kios Durian Pak Udin<small>NP-1031 · 3 kg retur</small></span><span className="mono">Rp1.840.000</span><span className="pill warn">Retur menunggu</span></div>
            <div className="rw"><span>Toko Duren Montong<small>NP-1034 · 28 kg</small></span><span className="mono">Rp2.240.000</span><span className="pill busy">Piutang</span></div>
          </div>
        </>
      )}
      {jenis === 'umum' && (
        <>
          <div className="bar">{judul || 'Dashboard'} <span>Bulan ini</span></div>
          <div className="sum"><div><small>Omzet</small><b className="mono">Rp18,4 jt</b></div><div><small>Transaksi</small><b className="mono">642</b></div><div><small>Laba bersih</small><b className="mono">Rp4,1 jt</b></div></div>
          <div className="chartbox"><div className="bars">{[48, 62, 40, 71, 58, 84, 96].map((h, i) => <i key={i} style={{ height: `${h}%` } as CSSProperties}></i>)}</div></div>
        </>
      )}
    </div>
  );
}
