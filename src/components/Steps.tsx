import './Steps.css';

const steps = [
  { t: 'Konsultasi', d: 'Ngobrol lewat WhatsApp atau video call tentang alur usahamu dan masalah yang ingin diselesaikan. Gratis.' },
  { t: 'Rancangan & DP 30%', d: 'Kami susun alur, fitur, dan tampilan aplikasi. Setelah kamu setujui, DP 30% menjadi tanda mulai pengerjaan.' },
  { t: 'Pengembangan & revisi', d: 'Aplikasi dibangun per tahap. Kamu mencoba demonya dan bisa minta revisi sampai sesuai kebutuhan.' },
  { t: 'Serah terima & pelunasan', d: 'Aplikasi dipasang dan diserahkan, owner dan kasir dilatih, lalu pelunasan 70%. Kami tetap mendampingi setelahnya.' },
];

export default function Steps() {
  return (
    <ol className="c-steps steps">
      {steps.map((s) => <li key={s.t}><h3>{s.t}</h3><p>{s.d}</p></li>)}
    </ol>
  );
}
