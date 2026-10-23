import { pageMeta } from '@/lib/seo';
import { site, wa } from '@/lib/site';
import PageHead from '@/components/PageHead';
import Rv from '@/components/Rv';
import '@/styles/pages/tentang.css';

export const metadata = pageMeta({
  title: 'Tentang',
  path: '/tentang',
  description: 'Ruftech Solutions adalah jasa pembuatan aplikasi custom untuk UMKM yang berbasis di Tangerang, membangun aplikasi di atas Google Sheets milik klien.',
});

const nilai = [
  { t: 'Mulai dari alur, bukan template', d: 'Kami pelajari cara usahamu berjalan sebelum menulis satu baris kode.' },
  { t: 'Data tetap milik klien', d: 'Semua catatan tersimpan di Google Sheets atas nama usaha klien, bukan di server kami.' },
  { t: 'Sederhana untuk dipakai', d: 'Kasir harus bisa belajar dalam hitungan menit. Fitur yang tidak perlu kami tinggalkan.' },
  { t: 'Terbuka soal biaya', d: 'Harga disepakati di awal dan dibayar sekali. Tidak ada tagihan bulanan yang muncul belakangan.' },
];

export default function Tentang() {
  const f = site.founder;
  return (
    <div className="c-tentang">
      <PageHead kicker="Tentang Ruftech" sub={<>Ruftech Solutions adalah jasa pembuatan aplikasi custom yang berbasis di {site.kota}. Kami membuat aplikasi kasir, stok, keuangan, dan absensi untuk usaha kecil dan menengah.</>}>
        Membantu UMKM <em>naik kelas</em> lewat aplikasi yang pas
      </PageHead>

      <section className="pt0">
        <div className="wrap story">
          <div className="logo-card card reveal"><img src="/img/logo-ruftech-full.png" alt="Logo Ruftech Solutions" width={1200} height={403} /></div>
          <div className="prose reveal">
            <h2>Kenapa Ruftech ada</h2>
            <p>Banyak pemilik usaha sudah mencoba aplikasi kasir siap pakai, lalu harus mengakali fiturnya karena tidak cocok dengan cara mereka berjualan. Ada yang menjual dengan harga berbeda untuk tiap pelanggan, ada yang menitip barang ke puluhan warung, ada yang menyewakan meja per jam.</p>
            <p>Ruftech hadir untuk usaha seperti itu. Kami membangun aplikasi yang mengikuti alur usaha, bukan sebaliknya, dengan biaya yang masuk akal untuk UMKM.</p>
            <p>Sampai hari ini, lebih dari {site.jumlahKlien} usaha telah memakai aplikasi buatan Ruftech, dari kuliner, ritel, kosmetik, distribusi, sampai tempat hiburan.</p>
          </div>
        </div>
      </section>

      {f?.nama && (
        <section className="pt0">
          <div className="wrap">
            <div className="fd card reveal">
              {f.foto ? <img className="fd-img" src={f.foto} alt={`Foto ${f.nama}`} /> : <span className="fd-img fd-ini">{f.nama.split(/\s+/).map((w) => w[0]).slice(0, 2).join('')}</span>}
              <div>
                <span className="kicker">Di balik Ruftech</span>
                <h2>{f.nama}</h2>
                <p className="role">{f.peran}</p>
                {f.cerita && <p className="story">{f.cerita}</p>}
                <a className="btn btn-p" href={wa(`Halo ${f.nama.split(' ')[0]}, saya mau konsultasi aplikasi`)} target="_blank" rel="noopener">Ngobrol langsung</a>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="pt0">
        <div className="wrap">
          <div className="sh"><span className="kicker">Cara kami bekerja</span><Rv>Empat hal yang kami pegang di setiap proyek</Rv></div>
          <div className="vals">
            {nilai.map((v) => <div key={v.t} className="card glow lift reveal"><h3>{v.t}</h3><p>{v.d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="pt0">
        <div className="wrap">
          <div className="hl card reveal">
            <img src="/img/bantu-umkm.png" alt="#BantuUMKMNaikKelas" width={320} height={106} loading="lazy" />
            <div>
              <span className="kicker">Sorotan</span>
              <h3>Narasumber IG Live bersama Telkom AI Center</h3>
              <p>15 Oktober 2026, Ruftech diundang sebagai narasumber di Instagram Live @indigo.telkom dengan tema “A Digital Solution That Fits Your UMKM”.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pt0">
        <div className="wrap center">
          <a className="btn btn-p" href={wa()} target="_blank" rel="noopener">Ngobrol dengan Ruftech</a>
        </div>
      </section>
    </div>
  );
}
