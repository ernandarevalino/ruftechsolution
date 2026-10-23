import { pageMeta } from '@/lib/seo';
import harga from '@/data/harga.json';
import kalk from '@/data/kalkulator.json';
import PageHead from '@/components/PageHead';
import Plans from '@/components/Plans';
import Kalkulator from '@/components/Kalkulator';
import Faq from '@/components/Faq';
import Rv from '@/components/Rv';
import '@/styles/pages/harga.css';

export const metadata = pageMeta({
  title: 'Harga',
  path: '/harga',
  description: 'Paket harga aplikasi custom Ruftech Solutions. Sekali bayar tanpa biaya bulanan, mulai dari paket Basic hingga Custom.',
});

export default function Harga() {
  const garansi = (harga as { garansi?: string[] }).garansi || [];
  return (
    <div className="c-harga">
      <PageHead kicker="Harga" sub="Tidak ada biaya langganan. Pilih paket yang paling dekat dengan kebutuhanmu, lalu kita sesuaikan saat konsultasi.">
        Sekali bayar, <em>aplikasinya jadi milikmu</em>
      </PageHead>
      <section className="pt0"><div className="wrap"><Plans /></div></section>

      <section className="pt0" id="estimasi">
        <div className="wrap">
          <div className="sh"><span className="kicker">Kalkulator</span><Rv>{kalk.judul}</Rv><p>Centang fitur yang kamu butuhkan. Estimasi biaya, DP, dan pelunasan langsung terhitung, lalu rinciannya bisa dikirim ke WhatsApp.</p></div>
          <Kalkulator />
        </div>
      </section>

      <section className="pt0">
        <div className="wrap">
          <div className="sh"><span className="kicker">Sistem pembayaran</span><Rv>Dua kali bayar, tanpa kejutan</Rv></div>
          <div className="pay">
            <div className="pc card glow lift reveal"><span className="pct">30%</span><div><h3>DP setelah rancangan disetujui</h3><p>Setelah alur dan desain aplikasi kamu setujui, DP 30% menjadi tanda mulai pengerjaan.</p></div></div>
            <div className="arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></div>
            <div className="pc card glow lift reveal"><span className="pct">70%</span><div><h3>Pelunasan saat serah terima</h3><p>Setelah aplikasi selesai, revisi beres, dan siap dipakai, sisa 70% dilunasi saat serah terima.</p></div></div>
          </div>
        </div>
      </section>

      {garansi.length > 0 && (
        <section className="pt0">
          <div className="wrap">
            <div className="gr card reveal">
              <div><span className="kicker">Garansi Ruftech</span><h2>Kamu terlindungi setelah serah terima</h2></div>
              <ul>{garansi.map((g) => <li key={g}>{g}</li>)}</ul>
            </div>
          </div>
        </section>
      )}

      <section className="pt0">
        <div className="wrap">
          <div className="sh"><span className="kicker">Termasuk di semua paket</span><Rv>Yang kamu dapat tanpa biaya tambahan</Rv></div>
          <div className="incl">
            <div className="card glow lift reveal"><h3>Pemasangan</h3><p>Kami pasang aplikasi di akun Google milikmu dan menyiapkan data awal.</p></div>
            <div className="card glow lift reveal"><h3>Pelatihan</h3><p>Owner dan kasir diajari sampai lancar, langsung atau lewat video call.</p></div>
            <div className="card glow lift reveal"><h3>Pendampingan</h3><p>Kami tetap mendampingi setelah aplikasi dipakai untuk pertanyaan dan perbaikan.</p></div>
          </div>
        </div>
      </section>

      <section className="pt0">
        <div className="wrap">
          <div className="sh"><span className="kicker">FAQ</span><Rv>Pertanyaan yang sering muncul</Rv></div>
          <Faq />
        </div>
      </section>
    </div>
  );
}
