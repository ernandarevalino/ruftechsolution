import type { Metadata } from 'next';
import { site, SITE_URL } from './site';

interface PageMeta {
  /** Judul halaman. Kosongkan untuk beranda. */
  title?: string;
  description?: string;
  /** Alamat halaman, mis. "/karya". */
  path: string;
  image?: string;
  type?: 'website' | 'article';
}

/** Judul, deskripsi, canonical, dan preview link (WhatsApp/Instagram/Google) per halaman. */
export function pageMeta({ title, description = site.deskripsi, path, image = '/og-image.png', type = 'website' }: PageMeta): Metadata {
  const fullTitle = title ? `${title} | ${site.nama}` : `${site.nama} — Aplikasi Custom untuk UMKM`;
  const url = `${SITE_URL}${path.endsWith('/') ? path : path + '/'}`;
  const img = new URL(image, SITE_URL).toString();
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: { type, siteName: site.nama, locale: 'id_ID', title: fullTitle, description, url, images: [img] },
    twitter: { card: 'summary_large_image' },
  };
}
