import type { CSSProperties } from 'react';
import Link from 'next/link';
import { getArtikel, getKarya } from '@/lib/content';
import { layanan } from '@/lib/layanan';
import { pageMeta } from '@/lib/seo';
import { site, wa } from '@/lib/site';
import { splitWords } from '@/lib/split';
import harga from '@/data/harga.json';
import IntroSection from '@/components/IntroSection';
import HeroFx from '@/components/HeroFx';
import HeroPhone from '@/components/HeroPhone';
import Mitra from '@/components/Mitra';
import Industri from '@/components/Industri';
import KaryaSlider from '@/components/KaryaSlider';
import Device from '@/components/Device';
import Testimoni from '@/components/Testimoni';
import Steps from '@/components/Steps';
import Plans from '@/components/Plans';
import PostCard from '@/components/PostCard';
import Faq from '@/components/Faq';
import Count from '@/components/Count';
import Rv from '@/components/Rv';
import '@/styles/pages/home.css';

export const metadata = pageMeta({ path: '/' });

const Arrow = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

export default function Home() {
  const karya = getKarya().filter((k) => k.unggulan);
  const artikel = getArtikel().slice(0, 3);
  const mulai = harga.paket[0]?.harga ?? '';

  return (
    <div className="c-home">
      <IntroSection className="hero" id="hero">
        <HeroFx />
        <div className="wrap hgrid">
          <div className="htxt">
            <span className="badge"><i></i><span>Dipakai {site.jumlahKlien}+ UMKM<span className="opt"> di Tangerang dan sekitarnya</span></span></span>
            <h1>{splitWords(<>Stok tidak selisih, <em>untung kelihatan</em> setiap hari</>, true)}</h1>
            <p>Aplikasi kasir, stok, dan keuangan yang dibuat mengikuti cara usahamu. Cukup dibuka dari HP, datanya tersimpan di Google Sheets milikmu sendiri.</p>
            <div className="price"><b>Mulai {mulai}</b><span>sekali bayar · tanpa biaya bulanan</span></div>
            <div className="acts">
              <a className="btn btn-p" href={wa()} target="_blank" rel="noopener">Konsultasi gratis via WhatsApp <Arrow /></a>
              <Link className="btn btn-g" href="/cara-kerja">Lihat cara kerja</Link>
            </div>
          </div>
          <div className="hvis"><HeroPhone /></div>
        </div>
      </IntroSection>

      <Mitra />

      <Industri />

      <section className="work" id="karya">
        <span className="kicker">Karya pilihan</span>
        <KaryaSlider count={karya.length} footer={<div className="all"><Link className="more" href="/karya">Semua karya <Arrow /></Link></div>}>
          {karya.map((k) => (
            <Link key={k.id} className="slide" href={`/karya/${k.id}`}>
              <div className="meta"><b>{k.title}</b><span>{k.ringkasan.split(/[.,]/)[0]}</span></div>
              <Device cover={k.cover} mockup={k.mockup} warna={k.warna} alt={`Tampilan aplikasi ${k.title}`} judul={k.title} />
            </Link>
          ))}
        </KaryaSlider>
      </section>

      <section className="pt0">
        <div className="wrap">
          <div className="sh">
            <span className="kicker">Layanan</span>
            <Rv>Cara kerja usahamu yang menentukan bentuk aplikasinya</Rv>
          </div>
          <div className="svc">
            {layanan.map((l) => (
              <Link key={l.id} className="glow lift reveal" href={`/layanan#${l.id}`}>
                <div className="hd"><h3>{l.judul}</h3><span className="ar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M7 17L17 7M9 7h8v8" /></svg></span></div>
                <p>{l.ringkas}</p>
                <ul>{l.poin.map((p) => <li key={p}>{p}</li>)}</ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pt0">
        <div className="wrap appr">
          <Rv>Kami mulai dari memahami <em className="a">cara usahamu berjalan</em> hari ini.</Rv>
          <div className="body reveal">
            <p>Setiap usaha punya kebiasaan sendiri. Ada yang menjual dengan harga berbeda per pelanggan, ada yang menitip barang ke puluhan warung, ada yang menerima booking lewat Instagram.</p>
            <p>Kami pelajari alur itu dulu, lalu membangun aplikasinya bertahap dengan demo yang bisa kamu coba sejak awal.</p>
            <Link className="more" href="/tentang">Tentang Ruftech <Arrow /></Link>
          </div>
        </div>
        <div className="wrap">
          <div className="stats">
            <div className="stat glow lift reveal"><Count to={site.jumlahKlien} suf="+" /><span>Klien UMKM sudah memakai aplikasi Ruftech</span></div>
            <div className="stat glow lift reveal"><Count to={9} /><span>Modul siap dirangkai sesuai kebutuhan</span></div>
            <div className="stat glow lift reveal"><b>Rp0</b><span>Biaya langganan bulanan</span></div>
            <div className="stat glow lift reveal"><Count to={100} suf="%" /><span>Data tersimpan di Google Sheets milikmu</span></div>
          </div>
        </div>
      </section>

      <section className="pt0">
        <div className="wrap">
          <div className="sh">
            <span className="kicker">Dampak di usaha</span>
            <Rv>Perubahan yang terasa sejak minggu pertama</Rv>
          </div>
          <div className="imp">
            <article className="glow lift reveal">
              <div className="vis v1"><div className="sheet">
                <div className="h"><span>Transaksi</span><span>Google Sheets</span></div>
                <div className="r hd"><span></span><span>Tanggal</span><span>Produk</span><span>Total</span></div>
                <div className="r"><span>2</span><span className="mono">16/10</span><span>Botol Besar</span><span className="mono">72.000</span></div>
                <div className="r"><span>3</span><span className="mono">16/10</span><span>Botol Kecil</span><span className="mono">96.000</span></div>
                <div className="r new"><span>4</span><span className="mono">16/10</span><span>Botol Besar</span><span className="mono">36.000</span></div>
              </div></div>
              <div className="txt"><b>Catatan tidak tercecer</b>Semua transaksi tersimpan di satu tempat, jadi tidak ada lagi buku yang hilang atau hitungan ganda.</div>
            </article>
            <article className="glow lift reveal">
              <div className="vis v2"><div className="chatbox">
                <div className="typing"><i></i><i></i><i></i></div>
                <div className="bub">
                  <b>Nota Titip Jual</b><br /><span className="mono">TJ-0427 · 14/10/2026</span><hr />
                  <div className="r"><span>Botol Kecil 12×</span><span className="mono">96.000</span></div>
                  <div className="r"><span>Botol Besar 6×</span><span className="mono">72.000</span></div><hr />
                  <div className="r"><b>Total</b><b className="mono">168.000</b></div>
                  <span className="wm">Aplikasi dibuat custom oleh Ruftech Solutions</span><span className="tm">10.42</span>
                </div>
              </div></div>
              <div className="txt"><b>Nota langsung ke pelanggan</b>Nota dikirim ke WhatsApp sekali klik, rapi dan bisa jadi bukti kapan saja.</div>
            </article>
            <article className="glow lift reveal">
              <div className="vis v3"><div className="chart">
                <small>Omzet 7 hari terakhir</small><b className="mono">Rp18,4 jt</b>
                <div className="bars">{[48, 62, 40, 71, 58, 84, 96].map((h, i) => <i key={i} style={{ height: `${h}%`, '--i': i } as CSSProperties}></i>)}</div>
              </div></div>
              <div className="txt"><b>Laporan bisa dicek dari HP</b>Omzet, laba, dan stok terlihat kapan saja, termasuk saat owner sedang tidak di toko.</div>
            </article>
          </div>
        </div>
      </section>

      <Testimoni />

      <section className="pt0">
        <div className="wrap">
          <div className="sh"><span className="kicker">Ritme kerja</span><Rv>Empat tahap yang kita sepakati bersama</Rv></div>
          <Steps />
          <div className="all"><Link className="more" href="/cara-kerja">Lihat simulasinya <Arrow /></Link></div>
        </div>
      </section>

      <section className="pt0">
        <div className="wrap">
          <div className="sh"><span className="kicker">Paket</span><Rv>Sekali bayar, aplikasinya jadi milikmu</Rv></div>
          <Plans />
        </div>
      </section>

      {artikel.length > 0 && (
        <section className="pt0">
          <div className="wrap">
            <div className="sh"><span className="kicker">Artikel</span><Rv>Catatan untuk pemilik usaha</Rv></div>
            <div className="posts">{artikel.map((p) => <PostCard key={p.id} post={p} />)}</div>
            <div className="all"><Link className="more" href="/artikel">Semua artikel <Arrow /></Link></div>
          </div>
        </section>
      )}

      <section className="pt0">
        <div className="wrap">
          <div className="sh"><span className="kicker">FAQ</span><Rv>Pertanyaan yang sering muncul</Rv></div>
          <Faq />
        </div>
      </section>
    </div>
  );
}
