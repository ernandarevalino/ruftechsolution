import { getArtikel } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import PageHead from '@/components/PageHead';
import PostCard from '@/components/PostCard';
import '@/styles/pages/artikelindex.css';

export const metadata = pageMeta({
  title: 'Artikel',
  path: '/artikel',
  description: 'Tips dan panduan digitalisasi untuk pemilik UMKM: pencatatan, kasir, stok, titip jual, dan keuangan usaha.',
});

export default function ArtikelIndex() {
  return (
    <div className="c-artikelindex">
      <PageHead kicker="Artikel" sub="Tips praktis soal pencatatan, kasir, stok, dan keuangan usaha kecil. Ditulis dari pengalaman membangun aplikasi untuk UMKM.">
        Catatan untuk <em>pemilik usaha</em>
      </PageHead>
      <section className="pt0">
        <div className="wrap grid">{getArtikel().map((p) => <PostCard key={p.id} post={p} />)}</div>
      </section>
    </div>
  );
}
