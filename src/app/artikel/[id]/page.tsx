import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArtikel, renderMarkdown } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { formatTanggal, wa, site } from '@/lib/site';
import PostCard from '@/components/PostCard';
import '@/styles/pages/artikeldetail.css';

type Params = { params: Promise<{ id: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return getArtikel().map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: Params) {
  const { id } = await params;
  const d = getArtikel().find((a) => a.id === id);
  if (!d) return {};
  return pageMeta({ title: d.title, description: d.deskripsi, path: `/artikel/${d.id}`, image: d.cover, type: 'article' });
}

export default async function ArtikelDetail({ params }: Params) {
  const { id } = await params;
  const posts = getArtikel();
  const d = posts.find((a) => a.id === id);
  if (!d) notFound();
  const lain = posts.filter((p) => p.id !== d.id).slice(0, 2);
  const { html, headings } = await renderMarkdown(d.body);
  const toc = headings.filter((h) => h.depth === 2);
  const menit = Math.max(1, Math.round(d.body.split(/\s+/).length / 200));
  const schema = {
    '@context': 'https://schema.org', '@type': 'Article', headline: d.title, description: d.deskripsi,
    datePublished: d.tanggal.toISOString(), author: { '@type': 'Organization', name: d.penulis },
    publisher: { '@type': 'Organization', name: site.nama },
  };

  return (
    <div className="c-artikeldetail">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header className="phead">
        <div className="wrap">
          <nav className="crumbs" aria-label="Lokasi halaman"><Link href="/">Beranda</Link><span aria-hidden="true">/</span><Link href="/artikel">Artikel</Link></nav>
          <span className="kicker" style={{ display: 'block', marginTop: 14 }}>{d.kategori}</span>
          <h1 className="ah">{d.title}</h1>
          <p className="meta">{d.penulis} · <time dateTime={d.tanggal.toISOString()}>{formatTanggal(d.tanggal)}</time> · {menit} menit baca</p>
        </div>
      </header>
      {d.cover && <div className="wrap cover"><img src={d.cover} alt="" /></div>}
      <section className="pt0">
        <div className="wrap cols">
          <aside className="toc">
            {toc.length > 0 && (
              <>
                <span className="kicker">Isi artikel</span>
                <ol>{toc.map((h) => <li key={h.slug}><a href={`#${h.slug}`}>{h.text}</a></li>)}</ol>
              </>
            )}
          </aside>
          <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
        <div className="wrap wrap-narrow">
          <div className="box card">
            <h3>Butuh aplikasi untuk usahamu?</h3>
            <p>Ceritakan alur usahamu ke tim Ruftech. Konsultasi pertama gratis.</p>
            <a className="btn btn-p" href={wa(`Halo Ruftech, saya baru baca artikel "${d.title}" dan mau konsultasi.`)} target="_blank" rel="noopener">Konsultasi via WhatsApp</a>
          </div>
        </div>
      </section>
      {lain.length > 0 && (
        <section className="pt0">
          <div className="wrap">
            <span className="kicker">Artikel lainnya</span>
            <div className="more-grid">{lain.map((p) => <PostCard key={p.id} post={p} />)}</div>
          </div>
        </section>
      )}
    </div>
  );
}
