import type { CSSProperties } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getKarya, renderMarkdown } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { wa } from '@/lib/site';
import mitra from '@/data/mitra.json';
import Device from '@/components/Device';
import WorkCard from '@/components/WorkCard';
import Testimoni from '@/components/Testimoni';
import '@/styles/pages/karyadetail.css';

type Params = { params: Promise<{ id: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return getKarya().map((k) => ({ id: k.id }));
}

export async function generateMetadata({ params }: Params) {
  const { id } = await params;
  const d = getKarya().find((k) => k.id === id);
  if (!d) return {};
  return pageMeta({ title: `${d.title} — Studi Kasus`, description: d.ringkasan, path: `/karya/${d.id}`, image: d.cover });
}

export default async function KaryaDetail({ params }: Params) {
  const { id } = await params;
  const all = getKarya();
  const i = all.findIndex((k) => k.id === id);
  if (i < 0) notFound();
  const d = all[i];
  const next = all[(i + 1) % all.length];
  const { html } = await renderMarkdown(d.body);
  const logo = (mitra.daftar as { nama: string; logo?: string; latar?: string; karya?: string }[]).find((m) => m.karya === d.id && m.logo);

  return (
    <div className="c-karyadetail">
      <header className="phead">
        <div className="wrap">
          <nav className="crumbs" aria-label="Lokasi halaman"><Link href="/">Beranda</Link><span aria-hidden="true">/</span><Link href="/karya">Karya</Link></nav>
          {logo && <span className="clogo" style={{ '--bg': logo.latar || '#fff' } as CSSProperties}><img src={logo.logo} alt={`Logo ${logo.nama}`} /></span>}
          <span className="kicker" style={{ display: 'block', marginTop: 14 }}>{d.industri}</span>
          <h1>{d.title}</h1>
          <p>{d.ringkasan}</p>
        </div>
      </header>

      <div className="wrap hero-shot reveal">
        <Device cover={d.cover} mockup={d.mockup} warna={d.warna} alt={`Tampilan aplikasi ${d.title}`} judul={d.title} />
      </div>

      <section>
        <div className="wrap cols">
          <aside className="facts">
            <dl>
              <div><dt>Bidang usaha</dt><dd>{d.industri}</dd></div>
              {d.platform && <div><dt>Platform</dt><dd>{d.platform}</dd></div>}
              {d.pengguna && <div><dt>Pengguna</dt><dd>{d.pengguna}</dd></div>}
            </dl>
            {d.modul.length > 0 && <><h4>Modul</h4><ul className="chips">{d.modul.map((m) => <li key={m}>{m}</li>)}</ul></>}
            <a className="btn btn-p" href={wa(`Halo Ruftech, saya lihat studi kasus ${d.title}. Saya mau aplikasi serupa.`)} target="_blank" rel="noopener">Mau aplikasi seperti ini</a>
          </aside>
          <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
        {d.galeri.length > 0 && (
          <div className="wrap gal">
            {d.galeri.map((g) => <img key={g} src={g} alt={`Tampilan ${d.title}`} loading="lazy" />)}
          </div>
        )}
      </section>

      <Testimoni karya={d.id} judul={`Kata ${d.title}`} />

      <section className="pt0">
        <div className="wrap">
          <div className="nexthead"><span className="kicker">Karya berikutnya</span></div>
          <div className="nextone"><WorkCard item={next} /></div>
        </div>
      </section>
    </div>
  );
}
