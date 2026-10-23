import { pageMeta } from '@/lib/seo';
import { wa } from '@/lib/site';
import { splitWords } from '@/lib/split';
import IntroSection from '@/components/IntroSection';
import HeroFx from '@/components/HeroFx';
import Journey from '@/components/Journey';
import Faq from '@/components/Faq';
import Rv from '@/components/Rv';
import '@/styles/pages/carakerja.css';

export const metadata = pageMeta({
  title: 'Cara Kerja',
  path: '/cara-kerja',
  description: 'Simulasi bekerja bersama Ruftech: dari cerita masalah lewat WhatsApp, diskusi alur, rancangan, pembangunan bertahap, sampai aplikasi berjalan setiap hari.',
});

export default function CaraKerja() {
  return (
    <div className="c-carakerja">
      <IntroSection className="ck-hero" id="ck-hero">
        <HeroFx />
        <div className="wrap">
          <span className="kicker">Cara kerja</span>
          <h1>{splitWords(<>Begini rasanya <em>bekerja dengan Ruftech</em></>, true)}</h1>
          <p>Lima tahap dari pesan WhatsApp pertama sampai aplikasi dipakai setiap hari. Gulir ke bawah untuk melihat simulasinya.</p>
          <a className="scroll" href="#perjalanan">MULAI SIMULASI<i></i></a>
        </div>
      </IntroSection>

      <Journey />

      <section>
        <div className="wrap">
          <div className="sh"><span className="kicker">FAQ</span><Rv>Pertanyaan yang sering muncul</Rv></div>
          <Faq />
          <div className="ck-cta"><a className="btn btn-p" href={wa('Halo Ruftech, saya mau mulai konsultasi')} target="_blank" rel="noopener">Mulai dari tahap pertama</a></div>
        </div>
      </section>
    </div>
  );
}
