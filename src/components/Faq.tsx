import './Faq.css';

const items = [
  { q: 'Berapa lama aplikasinya selesai?', a: 'Tergantung jumlah modul dan kerumitan alurnya. Setelah konsultasi, kami beri estimasi waktu per tahap supaya kamu tahu kapan bisa mencoba demonya.' },
  { q: 'Saya tidak paham teknologi. Apakah jadi masalah?', a: 'Tidak. Kamu cukup cerita cara usahamu berjalan. Bagian teknis kami yang urus, dan setelah selesai kami ajari owner dan kasir sampai lancar.' },
  { q: 'Bagaimana sistem pembayarannya?', a: 'Dua kali bayar. DP 30% setelah rancangan kamu setujui, sebagai tanda mulai pengerjaan. Sisanya 70% dilunasi saat serah terima, setelah aplikasi selesai dan revisi beres.' },
  { q: 'Apakah ada biaya bulanan?', a: 'Tidak ada. Aplikasi berjalan di atas Google Sheets dan Google Apps Script milik akunmu sendiri, jadi kamu hanya membayar biaya pembuatan, tanpa tagihan bulanan.' },
  { q: 'Datanya disimpan di mana dan milik siapa?', a: 'Semua data tersimpan di Google Sheets atas nama usahamu. Kamu bisa membuka, mengunduh, atau mencadangkannya kapan saja.' },
  { q: 'Bisa dipakai di HP, tablet, atau Chromebook?', a: 'Bisa. Aplikasi berjalan lewat browser, jadi cukup buka link-nya di perangkat apa pun yang terhubung internet.' },
  { q: 'Bisa dikerjakan tanpa bertemu langsung?', a: 'Bisa. Konsultasi, demo, dan pelatihan bisa lewat WhatsApp atau video call. Untuk area Tangerang dan sekitarnya, kami juga bisa datang langsung.' },
];
const schema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
};

export default function Faq() {
  return (
    <>
      <div className="c-faq faq">
        {items.map((i) => <details key={i.q}><summary>{i.q}<i aria-hidden="true"></i></summary><div className="ans">{i.a}</div></details>)}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
