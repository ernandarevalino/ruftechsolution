import { layanan } from '@/lib/layanan';
import { pageMeta } from '@/lib/seo';
import { wa } from '@/lib/site';
import PageHead from '@/components/PageHead';
import Steps from '@/components/Steps';
import Rv from '@/components/Rv';
import '@/styles/pages/layanan.css';

export const metadata = pageMeta({
  title: 'Layanan',
  path: '/layanan',
  description: 'Layanan pembuatan aplikasi custom Ruftech: kasir & POS, stok gudang, titip jual, keuangan, piutang, absensi karyawan, booking online, dan member.',
});

export default function Layanan() {
  return (
    <div className="c-layanan">
      <PageHead kicker="Layanan" sub="Kami tidak menjual paket kaku. Pilih modul yang sesuai alur usahamu, dan kami rangkai menjadi satu aplikasi yang terasa dibuat khusus untukmu.">
        Satu aplikasi, dirangkai dari <em>modul yang kamu butuhkan</em>
      </PageHead>

      <section className="pt0">
        <div className="wrap groups">
          {layanan.map((l, i) => (
            <div key={l.id} className="group reveal" id={l.id}>
              <div className="gh">
                <span className="num">0{i + 1}</span>
                <h2>{l.judul}</h2>
                <p>{l.ringkas}</p>
              </div>
              <div className="items">
                {l.detail.map((x) => <div key={x.t} className="item card glow lift"><h3>{x.t}</h3><p>{x.d}</p></div>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pt0">
        <div className="wrap">
          <div className="base card reveal">
            <div>
              <span className="kicker">Fondasi semua aplikasi</span>
              <h2>Google Sheets milikmu, Google Apps Script, dan browser</h2>
            </div>
            <ul>
              <li><b>Data milikmu.</b> Tersimpan di Google Drive atas nama usahamu.</li>
              <li><b>Tanpa biaya bulanan.</b> Berjalan di layanan Google yang gratis.</li>
              <li><b>Jalan di mana saja.</b> HP, tablet, Chromebook, atau laptop.</li>
              <li><b>Bisa berkembang.</b> Modul baru bisa ditambah saat usahamu tumbuh.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="pt0">
        <div className="wrap">
          <div className="sh"><span className="kicker">Proses</span><Rv>Empat tahap yang kita sepakati bersama</Rv></div>
          <Steps />
          <div className="cta"><a className="btn btn-p" href={wa()} target="_blank" rel="noopener">Mulai konsultasi gratis</a></div>
        </div>
      </section>
    </div>
  );
}
