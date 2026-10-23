// Pelacakan sumber pengunjung & klik WhatsApp (hanya berjalan di browser).
// - Link bio: pakai ?utm_source=tiktok (atau instagram, google, dll.) di akhir alamat web.
// - Sumber itu disimpan selama kunjungan, lalu ditambahkan di akhir pesan WhatsApp,
//   jadi kamu tahu klien datang dari mana langsung dari chat-nya.
// - Kalau ID Google Analytics diisi di Pengaturan, setiap klik WhatsApp juga dicatat sebagai event.

declare global { interface Window { gtag?: (...args: unknown[]) => void } }

const KEY = 'rt_sumber';

function detect(): string {
  const q = new URLSearchParams(location.search);
  const utm = q.get('utm_source') || q.get('ref') || q.get('src');
  if (utm) return utm.toLowerCase().slice(0, 30);
  const r = document.referrer.toLowerCase();
  if (!r || r.includes(location.hostname)) return '';
  if (r.includes('tiktok')) return 'tiktok';
  if (r.includes('instagram')) return 'instagram';
  if (r.includes('facebook') || r.includes('fb.')) return 'facebook';
  if (r.includes('google')) return 'google';
  if (r.includes('youtube')) return 'youtube';
  return '';
}

export function sumber(): string {
  try { return sessionStorage.getItem(KEY) || ''; } catch { return ''; }
}

export function tambahSumber(pesan: string): string {
  const s = sumber();
  return s ? `${pesan}\n\n(via ${s})` : pesan;
}

export function catatKlik(label: string) {
  window.gtag?.('event', 'klik_whatsapp', { sumber: sumber() || 'langsung', halaman: location.pathname, tombol: label.slice(0, 60) });
}

/** Dipanggil sekali saat website dibuka. Mengembalikan fungsi untuk melepas listener. */
export function mulaiPelacakan() {
  const found = detect();
  if (found) { try { sessionStorage.setItem(KEY, found); } catch { /* abaikan */ } }
  const onClick = (e: MouseEvent) => {
    const a = (e.target as Element | null)?.closest?.('a[href*="wa.me/"]') as HTMLAnchorElement | null;
    if (!a) return;
    try {
      const url = new URL(a.href);
      const text = url.searchParams.get('text') || '';
      if (sumber() && !text.includes('(via ')) a.href = `${url.origin}${url.pathname}?text=${encodeURIComponent(tambahSumber(text))}`;
    } catch { /* abaikan */ }
    catatKlik((a.textContent || a.getAttribute('aria-label') || 'WhatsApp').trim());
  };
  document.addEventListener('click', onClick, true);
  return () => document.removeEventListener('click', onClick, true);
}
