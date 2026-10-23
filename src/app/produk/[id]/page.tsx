import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProduk, renderMarkdown } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { wa } from '@/lib/site';
import Device from '@/components/Device';
import '@/styles/pages/produkdetail.css';

type Params = { params: Promise<{ id: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return getProduk().map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Params) {
  const { id } = await params;
  const d = getProduk().find((p) => p.id === id);
  if (!d) return {};
  return pageMeta({ title: d.title, description: d.tagline, path: `/produk/${d.id}`, image: d.cover });
}

export default async function ProdukDetail({ params }: Params) {
  const { id } = await params;
  const d = getProduk().find((p) => p.id === id);
  if (!d) notFound();
  const { html } = await renderMarkdown(d.body);
  const soon = d.status === 'Segera hadir';
  const pesan = soon ? `Halo Ruftech, saya tertarik ${d.title}. Kabari saya kalau sudah tersedia.` : `Halo Ruftech, saya tertarik ${d.title}.`;

  return (
    <div className="c-produkdetail">
      <header className="phead">
        <div className="wrap">
          <nav className="crumbs" aria-label="Lokasi halaman"><Link href="/">Beranda</Link><span aria-hidden="true">/</span><Link href="/produk">Produk</Link></nav>
          <span className="kicker" style={{ display: 'block', marginTop: 14 }}>{d.status}</span>
          <h1>{d.title}</h1>
          <p>{d.tagline}</p>
        </div>
      </header>
      <div className="wrap pshot reveal">
        <Device cover={d.cover} mockup={d.mockup} warna={d.warna} alt={`Tampilan ${d.title}`} judul={d.title} />
      </div>
      <section>
        <div className="wrap cols">
          <aside className="buy card">
            <span className="kicker">Harga</span>
            <div className="pr">{d.harga}</div>
            {d.catatanHarga && <p className="note">{d.catatanHarga}</p>}
            <p className="for"><b>Cocok untuk:</b> {d.untuk}</p>
            <a className="btn btn-p" href={wa(pesan)} target="_blank" rel="noopener">{soon ? 'Kabari saya' : 'Pesan sekarang'}</a>
          </aside>
          <div>
            <h2 className="fh">Fitur</h2>
            <ul className="feat">{d.fitur.map((f) => <li key={f}>{f}</li>)}</ul>
            <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>
      </section>
    </div>
  );
}
