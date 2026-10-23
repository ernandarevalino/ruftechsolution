import { getKarya } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { site } from '@/lib/site';
import PageHead from '@/components/PageHead';
import WorkCard from '@/components/WorkCard';
import '@/styles/pages/karyaindex.css';

export const metadata = pageMeta({
  title: 'Karya',
  path: '/karya',
  description: `Studi kasus aplikasi custom yang dibuat Ruftech Solutions untuk ${site.jumlahKlien}+ UMKM: kasir, stok, titip jual, booking, dan distribusi.`,
});

export default function KaryaIndex() {
  return (
    <div className="c-karyaindex">
      <PageHead kicker="Karya" sub="Setiap klien punya cara kerja berbeda, jadi tidak ada dua aplikasi yang sama. Berikut sebagian karya Ruftech untuk UMKM di berbagai bidang.">
        Aplikasi yang sudah dipakai <em>setiap hari</em>
      </PageHead>
      <section className="pt0">
        <div className="wrap grid">
          {getKarya().map((k) => <WorkCard key={k.id} item={k} />)}
        </div>
      </section>
    </div>
  );
}
