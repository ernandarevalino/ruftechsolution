import { Fragment, type ReactNode } from 'react';
import Link from 'next/link';

interface Props { kicker: string; crumbs?: { href: string; label: string }[]; sub?: ReactNode; children: ReactNode }

/** Judul halaman (sub halaman). */
export default function PageHead({ kicker, crumbs = [], sub, children }: Props) {
  return (
    <header className="phead">
      <div className="wrap">
        {crumbs.length > 0 && (
          <nav className="crumbs" aria-label="Lokasi halaman">
            <Link href="/">Beranda</Link>
            {crumbs.map((c) => <Fragment key={c.href}><span aria-hidden="true">/</span><Link href={c.href}>{c.label}</Link></Fragment>)}
          </nav>
        )}
        <span className="kicker" style={crumbs.length ? { display: 'block', marginTop: 14 } : undefined}>{kicker}</span>
        <h1>{children}</h1>
        {sub && <p>{sub}</p>}
      </div>
    </header>
  );
}
