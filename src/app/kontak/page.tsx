import { pageMeta } from '@/lib/seo';
import { site, wa, ig } from '@/lib/site';
import PageHead from '@/components/PageHead';
import KontakForm from '@/components/KontakForm';
import CopyButton from '@/components/CopyButton';
import '@/styles/pages/kontak.css';

export const metadata = pageMeta({
  title: 'Kontak',
  path: '/kontak',
  description: 'Hubungi Ruftech Solutions untuk konsultasi gratis pembuatan aplikasi custom UMKM lewat WhatsApp atau Instagram.',
});

export default function Kontak() {
  return (
    <div className="c-kontak">
      <PageHead kicker="Kontak" sub="Konsultasi pertama gratis dan tanpa kewajiban lanjut. Isi form singkat di bawah, pesannya langsung terkirim ke WhatsApp kami.">
        Ceritakan usahamu, <em>kita rapikan bersama</em>
      </PageHead>

      <section className="pt0">
        <div className="wrap cols">
          <KontakForm whatsapp={site.whatsapp} />

          <aside className="side">
            <div className="card info">
              <span className="kicker">WhatsApp</span>
              <div className="big">{site.whatsappTampil}</div>
              <div className="acts">
                <a className="btn btn-p" href={wa()} target="_blank" rel="noopener">Chat langsung</a>
                <CopyButton className="btn btn-g" text={`+${site.whatsapp}`} label="Salin nomor" />
              </div>
            </div>
            <div className="card info">
              <span className="kicker">Instagram</span>
              <a className="big" href={ig()} target="_blank" rel="noopener">@{site.instagram}</a>
            </div>
            {site.email && <div className="card info"><span className="kicker">Email</span><a className="big" href={`mailto:${site.email}`}>{site.email}</a></div>}
            <div className="card info">
              <span className="kicker">Lokasi & jam kerja</span>
              <p>{site.kota}<br />{site.jamKerja}</p>
              <p className="dim">Melayani klien di seluruh Indonesia secara online.</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
