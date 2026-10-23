import { getArtikel } from '@/lib/content';
import { site, SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function GET() {
  const items = getArtikel().map((p) => {
    const url = `${SITE_URL}/artikel/${p.id}/`;
    return `<item><title>${esc(p.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${p.tanggal.toUTCString()}</pubDate><description>${esc(p.deskripsi)}</description></item>`;
  }).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Artikel ${esc(site.nama)}</title><link>${SITE_URL}/</link><description>${esc(site.deskripsi)}</description><language>id</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
