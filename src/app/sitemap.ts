import type { MetadataRoute } from 'next';
import { getArtikel, getKarya, getProduk } from '@/lib/content';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const halaman = ['/', '/karya/', '/layanan/', '/cara-kerja/', '/produk/', '/harga/', '/artikel/', '/tentang/', '/kontak/'];
  return [
    ...halaman.map((p) => ({ url: `${SITE_URL}${p}` })),
    ...getKarya().map((k) => ({ url: `${SITE_URL}/karya/${k.id}/` })),
    ...getProduk().map((p) => ({ url: `${SITE_URL}/produk/${p.id}/` })),
    ...getArtikel().map((a) => ({ url: `${SITE_URL}/artikel/${a.id}/`, lastModified: a.tanggal })),
  ];
}
