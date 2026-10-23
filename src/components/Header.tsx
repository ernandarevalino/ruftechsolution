'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { menu, wa } from '@/lib/site';
import './Header.css';

export default function Header() {
  const path = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const active = (href: string) => path === href || path.startsWith(href + '/');

  useEffect(() => {
    const onS = () => setSolid(scrollY > 30);
    addEventListener('scroll', onS, { passive: true }); onS();
    return () => removeEventListener('scroll', onS);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [open]);

  // tutup menu HP setiap pindah halaman
  useEffect(() => { setOpen(false); }, [path]);

  const close = () => setOpen(false);
  return (
    <div className="c-header">
      <header className={solid ? 'top solid' : 'top'} id="top">
        <div className="wrap bar">
          <Link className="logo" href="/" aria-label="Ruftech Solutions, ke beranda">
            <img src="/img/logo-ruftech-light.png" alt="Ruftech Solutions" width={124} height={42} />
          </Link>
          <nav className="nav" aria-label="Utama">
            {menu.map((m) => <Link key={m.href} href={m.href} aria-current={active(m.href) ? 'page' : undefined}>{m.label}</Link>)}
            <a className="cta-s" href={wa()} target="_blank" rel="noopener">Konsultasi</a>
          </nav>
          <button className="burger" type="button" aria-label="Buka menu" aria-expanded={open} onClick={() => setOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
        </div>
      </header>
      <div className="drawer" hidden={!open}>
        <button className="burger x" type="button" aria-label="Tutup menu" onClick={close}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <Link href="/" onClick={close}>Beranda</Link>
        {menu.map((m) => <Link key={m.href} href={m.href} onClick={close}>{m.label}</Link>)}
        <Link href="/kontak" onClick={close}>Kontak</Link>
        <a className="btn btn-p" href={wa()} target="_blank" rel="noopener" onClick={close}>Konsultasi gratis</a>
      </div>
    </div>
  );
}
