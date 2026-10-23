'use client';
/** Form kontak: isinya dirangkai jadi pesan WhatsApp yang siap dikirim. */
import type { FormEvent } from 'react';
import { tambahSumber, catatKlik } from '@/lib/track';

const butuhList = ['Kasir & POS', 'Stok & gudang', 'Keuangan & laporan', 'Piutang & tempo', 'Absensi karyawan', 'Booking online', 'Titip jual', 'Belum tahu'];

export default function KontakForm({ whatsapp }: { whatsapp: string }) {
  const kirim = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const butuh = fd.getAll('butuh').join(', ') || '-';
    const msg = [
      'Halo Ruftech, saya mau konsultasi aplikasi.',
      '',
      `Nama: ${fd.get('nama')}`,
      `Usaha: ${fd.get('usaha')} (${fd.get('jenis')})`,
      `Kebutuhan: ${butuh}`,
      fd.get('cerita') ? `Cerita: ${fd.get('cerita')}` : '',
    ].filter((l, i) => l !== '' || i === 1).join('\n');
    catatKlik('Form kontak');
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(tambahSumber(msg))}`, '_blank', 'noopener');
  };
  return (
    <form className="card form" onSubmit={kirim}>
      <div className="row2">
        <label>Nama<input id="f-nama" name="nama" required autoComplete="name" placeholder="Nama kamu" /></label>
        <label>Nama usaha<input id="f-usaha" name="usaha" required placeholder="Mis. Toko Sumber Rejeki" /></label>
      </div>
      <label>Jenis usaha
        <select id="f-jenis" name="jenis">
          <option>Toko / ritel</option><option>Cafe / kuliner</option><option>Distributor / grosir</option>
          <option>Produsen (titip jual)</option><option>Jasa (laundry, salon, dll.)</option><option>Tempat hiburan / sewa</option><option>Lainnya</option>
        </select>
      </label>
      <fieldset>
        <legend>Yang dibutuhkan</legend>
        <div className="checks">
          {butuhList.map((c, i) => (
            <label key={c} className="ck"><input type="checkbox" name="butuh" value={c} id={`f-b${i}`} /><span>{c}</span></label>
          ))}
        </div>
      </fieldset>
      <label>Cerita singkat<textarea id="f-cerita" name="cerita" rows={4} placeholder="Mis. sekarang masih catat di buku, sering selisih stok, ada 2 kasir…"></textarea></label>
      <button className="btn btn-wa" type="submit">Kirim lewat WhatsApp</button>
      <p className="hint">Tombol ini membuka WhatsApp dengan pesan yang sudah terisi. Kamu tinggal tekan kirim.</p>
    </form>
  );
}
