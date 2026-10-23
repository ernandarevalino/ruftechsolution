import siteData from '@/data/site.json';

export type Site = typeof siteData & {
  founder?: { nama?: string; peran?: string; foto?: string; cerita?: string };
  ga4?: string;
};
export const site = siteData as Site;

/** Alamat website. Ganti lewat environment variable SITE_URL di Netlify/Vercel. */
export const SITE_URL = (process.env.SITE_URL || 'https://ruftechsolutions.netlify.app').replace(/\/$/, '');

/** Link WhatsApp dengan pesan pembuka. */
export const wa = (pesan = 'Halo Ruftech, saya mau konsultasi aplikasi') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(pesan)}`;

export const ig = () => `https://www.instagram.com/${site.instagram}`;

export const menu = [
  { href: '/karya', label: 'Karya' },
  { href: '/layanan', label: 'Layanan' },
  { href: '/cara-kerja', label: 'Cara Kerja' },
  { href: '/produk', label: 'Produk' },
  { href: '/harga', label: 'Harga' },
  { href: '/artikel', label: 'Artikel' },
  { href: '/tentang', label: 'Tentang' },
];

export const formatTanggal = (d: Date) =>
  d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta' });

export const rp = (n: number) => 'Rp' + Math.round(n).toLocaleString('id-ID');
