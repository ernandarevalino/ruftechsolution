import Link from 'next/link';
import type { Artikel } from '@/lib/content';
import { formatTanggal } from '@/lib/site';
import './PostCard.css';

export default function PostCard({ post: d }: { post: Artikel }) {
  return (
    <Link className="c-postcard pc glow lift reveal" href={`/artikel/${d.id}`}>
      {d.cover ? <img src={d.cover} alt="" loading="lazy" /> : <div className="ph" aria-hidden="true"><span>{d.kategori}</span></div>}
      <div className="body">
        <div className="m"><span>{d.kategori}</span><time dateTime={d.tanggal.toISOString()}>{formatTanggal(d.tanggal)}</time></div>
        <h3>{d.title}</h3>
        <p>{d.deskripsi}</p>
      </div>
    </Link>
  );
}
