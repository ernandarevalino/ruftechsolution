import Link from 'next/link';
import type { Karya } from '@/lib/content';
import Device from './Device';
import './WorkCard.css';

export default function WorkCard({ item: d }: { item: Karya }) {
  return (
    <Link className="c-workcard wc reveal" href={`/karya/${d.id}`}>
      <Device cover={d.cover} mockup={d.mockup} warna={d.warna} alt={`Tampilan aplikasi ${d.title}`} judul={d.title} />
      <div className="meta">
        <div><span className="ind">{d.industri}</span><h3>{d.title}</h3></div>
        <span className="go" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M7 17L17 7M9 7h8v8" /></svg></span>
      </div>
      <p>{d.ringkasan}</p>
    </Link>
  );
}
