'use client';
/**
 * Simulasi perjalanan klien (scroll-driven):
 * 1 cerita masalah (WhatsApp) → 2 diskusi alur → 3 rancangan → 4 dibangun → 5 aplikasi berjalan.
 * Contoh diambil dari pola proyek titip jual (UDrinks). Semua angka adalah data simulasi.
 *
 * Animasinya dijalankan langsung pada elemen (tanpa re-render React) supaya tetap mulus 60fps.
 */
import { useEffect, useRef, type CSSProperties } from 'react';
import './Journey.css';

const steps = [
  { t: 'Kamu cerita masalahnya', d: 'Lewat WhatsApp, apa adanya. Tidak perlu istilah teknis.' },
  { t: 'Kita diskusikan alurnya', d: 'Video call singkat untuk memetakan cara usahamu berjalan hari ini.' },
  { t: 'Rancangan & DP 30%', d: 'Desain kamu setujui dulu, lalu DP 30% sebagai tanda mulai pengerjaan.' },
  { t: 'Dibangun & direvisi', d: 'Setiap tahap bisa kamu coba dan minta revisi sampai pas, diuji dengan data asli.' },
  { t: 'Serah terima & pelunasan', d: 'Aplikasi diserahkan, pelunasan 70%, lalu dipakai setiap hari. Kami tetap mendampingi.' },
];
const phases = ['Database Google Sheets', 'Form titip jual', 'Stok & setoran', 'Nota WhatsApp', 'Revisi & uji data asli'];
const css = (v: Record<string, string | number>) => v as CSSProperties;

export default function Journey() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = root?.querySelector<HTMLElement>('#jr-track');
    if (!root || !track) return;
    root.classList.add('ready');
    const frame = root.querySelector<HTMLElement>('#jr-frame')!;
    const scenes = Array.from(root.querySelectorAll<HTMLElement>('.sc'));
    const lis = Array.from(root.querySelectorAll<HTMLLIElement>('#jr-steps li'));
    const phone2 = root.querySelector<HTMLElement>('#jr-phone2')!;
    const burst = root.querySelector<HTMLElement>('#jr-burst')!;
    const N = scenes.length;
    let last = -1, burstDone = false, ticking = false;

    const clamp = (v: number) => Math.max(0, Math.min(1, v));
    const fmt = (n: number, rp: boolean) => (rp ? 'Rp' : '') + Math.round(n).toLocaleString('id-ID');

    function update() {
      ticking = false;
      const r = track!.getBoundingClientRect();
      const total = track!.offsetHeight - innerHeight;
      const p = clamp(-r.top / total);
      const raw = p * N;
      const step = Math.min(N - 1, Math.floor(raw));
      const lp = step === N - 1 ? clamp((raw - step) * 1.15) : clamp(raw - step);

      if (step !== last) {
        scenes.forEach((s, i) => s.classList.toggle('on', i === step));
        frame.classList.toggle('phone', step === 0);
        last = step;
      }
      lis.forEach((li, i) => {
        li.classList.toggle('on', i === step);
        li.classList.toggle('done', i < step);
        li.style.setProperty('--lp', String(i < step ? 1 : i === step ? lp : 0));
      });

      const sc = scenes[step];
      sc.querySelectorAll<HTMLElement>('[data-at]').forEach((el) => {
        const at = parseFloat(el.dataset.at || '0');
        const until = el.dataset.until ? parseFloat(el.dataset.until) : 2;
        el.classList.toggle('in', lp >= at && lp < until);
      });
      sc.querySelectorAll<HTMLElement | SVGElement>('[data-from]').forEach((el) => {
        const a = parseFloat(el.dataset.from || '0'), b = parseFloat(el.dataset.to || '1');
        const d = clamp((lp - a) / (b - a));
        el.style.setProperty('--d', d.toFixed(3));
        el.classList.toggle('done', d >= 1);
        const bar = el.querySelector<HTMLElement>('.pb i'); if (bar) bar.style.setProperty('--d', d.toFixed(3));
      });

      if (step === 2) sc.classList.toggle('real', lp > .3);
      if (step === 4) {
        const g = clamp((lp - .3) / .45);
        sc.querySelectorAll<HTMLElement>('[data-count]').forEach((b) => { b.textContent = fmt(+b.dataset.count! * (1 - Math.pow(1 - g, 3)), !!b.dataset.rp); });
        sc.querySelectorAll<HTMLElement>('.bars i').forEach((b, k) => b.style.setProperty('--grow', clamp(g * 1.4 - k * .06).toFixed(3)));
      }
      phone2.classList.toggle('in', step === 4 && lp > .66);
      phone2.classList.toggle('read', step === 4 && lp > .8);
      if (step === 4 && lp > .86 && !burstDone) { burstDone = true; burst.classList.remove('go'); void burst.offsetWidth; burst.classList.add('go'); }
      if (step < 4 || lp < .6) burstDone = false;
    }

    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', update);
    update();

    // klik langkah = lompat ke bagian itu
    const onClick = (e: Event) => {
      const b = (e.target as Element).closest<HTMLButtonElement>('[data-go]');
      if (!b) return;
      const i = +b.dataset.go!;
      const total = track.offsetHeight - innerHeight;
      const top = track.getBoundingClientRect().top + scrollY + total * ((i + .55) / N);
      scrollTo({ top, behavior: 'smooth' });
    };
    root.addEventListener('click', onClick);

    return () => {
      removeEventListener('scroll', onScroll); removeEventListener('resize', update);
      root.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <section className="c-journey jr" id="perjalanan" aria-label="Simulasi perjalanan klien bersama Ruftech" ref={rootRef}>
      <div className="track" id="jr-track">
        <div className="sticky">
          <div className="wrap grid">
            {/* kiri: cerita langkah */}
            <div className="story">
              <span className="kicker">Simulasi</span>
              <h2>Dari cerita masalah sampai <em>aplikasi berjalan</em></h2>
              <ol className="steps" id="jr-steps">
                {steps.map((s, i) => (
                  <li key={i} data-i={i}>
                    <button type="button" data-go={i}>
                      <span className="n">0{i + 1}</span>
                      <span className="tx"><b>{s.t}</b><small>{s.d}</small></span>
                    </button>
                    <i className="bar"><i></i></i>
                  </li>
                ))}
              </ol>
            </div>

            {/* kanan: panggung perangkat */}
            <div className="stage" aria-hidden="true">
              <div className="halo"></div>
              <div className="frame phone" id="jr-frame">
                <div className="notch"></div>
                <div className="screen">

                  {/* 1. CHAT WHATSAPP */}
                  <div className="sc s0 on" data-s="0">
                    <div className="wa-head">
                      <span className="av"><img src="/img/logo-mark-white.png" alt="" /></span>
                      <div><b>Ruftech Solutions</b><small>online</small></div>
                    </div>
                    <div className="wa-body">
                      <div className="day">Hari ini</div>
                      <div className="m me" data-at=".04">Halo kak, saya produsen es cincau botolan.<time>09.12</time></div>
                      <div className="m me" data-at=".18">Saya titip ke sekitar 30 warung, tapi catatannya masih di buku. Tiap setoran sering selisih.<time>09.12</time></div>
                      <div className="typing" data-at=".32" data-until=".46"><i></i><i></i><i></i></div>
                      <div className="m them" data-at=".46">Siap kak. Boleh ceritakan alurnya dari produksi sampai uang setoran masuk?<time>09.14</time></div>
                      <div className="m me voice" data-at=".64"><span className="play"></span><span className="wave">{Array.from({ length: 26 }, (_, k) => <i key={k} style={css({ '--h': `${20 + ((k * 37) % 70)}%` })}></i>)}</span><span className="dur">0:42</span><time>09.16</time></div>
                      <div className="m them" data-at=".82">Paham kak. Yuk kita bahas lewat video call, saya gambarkan alurnya.<time>09.17</time></div>
                    </div>
                    <div className="wa-input"><span>Ketik pesan</span><i></i></div>
                  </div>

                  {/* 2. DISKUSI / PAPAN ALUR */}
                  <div className="sc s1" data-s="1">
                    <div className="call">
                      <span className="rec"></span> Video call · Alur titip jual
                      <span className="tiles"><i>Owner</i><i className="me">Ruftech</i></span>
                    </div>
                    <div className="board">
                      <svg viewBox="0 0 600 300" className="flow" preserveAspectRatio="none">
                        <defs><marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#8A2BFF" /></marker></defs>
                        <path className="ln" data-from=".14" data-to=".26" pathLength={1} d="M160 70 H 246" />
                        <path className="ln" data-from=".3" data-to=".42" pathLength={1} d="M392 70 H 440" />
                        <path className="ln" data-from=".46" data-to=".56" pathLength={1} d="M510 104 V 182" />
                        <path className="ln" data-from=".6" data-to=".72" pathLength={1} d="M442 220 H 396" />
                        <path className="ln dash" data-from=".74" data-to=".86" pathLength={1} d="M250 220 C 120 220, 90 170, 90 116" />
                      </svg>
                      <div className="node" style={{ left: '3%', top: '13%' }} data-at=".04"><b>Produksi</b><small>Cincau botolan</small></div>
                      <div className="node" style={{ left: '42%', top: '13%' }} data-at=".2"><b>Titip ke warung</b><small>±30 warung</small></div>
                      <div className="node" style={{ left: '74%', top: '13%' }} data-at=".36"><b>Warung jual</b><small>Kabari stok via WA</small></div>
                      <div className="node hot" style={{ left: '74%', top: '62%' }} data-at=".52"><b>Setoran</b><small>Sering selisih</small></div>
                      <div className="node" style={{ left: '42%', top: '62%' }} data-at=".66"><b>Titip ulang</b><small>Isi stok kosong</small></div>
                      <div className="note n1" data-at=".8">Foto bukti titip</div>
                      <div className="note n2" data-at=".86">Titik lokasi warung</div>
                      <div className="note n3" data-at=".92">Nota otomatis ke WA</div>
                    </div>
                  </div>

                  {/* 3. RANCANGAN */}
                  <div className="sc s2" data-s="2">
                    <div className="app">
                      <aside className="side">
                        <b className="brand">UDrinks</b>
                        <span className="nav on">Catat titipan</span><span className="nav">Stok warung</span><span className="nav">Setoran</span><span className="nav">Laporan</span>
                      </aside>
                      <div className="main">
                        <div className="wf w1"><span>Catat Titipan Baru</span></div>
                        <div className="row2">
                          <div className="wf w2 fld"><small>Warung</small><span>Warung Bu Kokom</span></div>
                          <div className="wf w3 fld"><small>Tanggal</small><span className="mono">17/10/2026</span></div>
                        </div>
                        <div className="wf w4 items">
                          <div><span>Cincau Botol Kecil</span><span className="mono">12 × 8.000</span></div>
                          <div><span>Cincau Botol Besar</span><span className="mono">6 × 12.000</span></div>
                        </div>
                        <div className="row2">
                          <div className="wf w5 photo"><span>Foto bukti terlampir</span></div>
                          <div className="wf w6 map"><span className="mono">-6.2297, 106.6094</span></div>
                        </div>
                        <div className="wf w7 cta"><span>Simpan &amp; kirim nota</span></div>
                      </div>
                    </div>
                    <div className="stamp" data-at=".5">Desain disetujui</div>
                    <div className="inv" data-at=".7">
                      <div className="inv-h"><b>Invoice DP</b><span className="mono">INV-0427-A</span></div>
                      <div className="inv-r"><span>Paket Pro · 30%</span><b className="mono">Rp525.000</b></div>
                      <div className="inv-s"><span className="paid">Lunas</span><small>Pengerjaan dimulai</small></div>
                    </div>
                  </div>

                  {/* 4. DIBANGUN */}
                  <div className="sc s3" data-s="3">
                    <div className="code">
                      <div className="tabs"><span className="on">Code.gs</span><span>Index.html</span></div>
                      <pre><code>
                        <span className="cl" data-at=".02"><i className="k">function</i>{' '}<i className="f">simpanTitipan</i>{'(data) {'}</span>{'\n'}
                        <span className="cl" data-at=".1">{'  '}<i className="k">const</i>{' sh = SpreadsheetApp.getActive()'}</span>{'\n'}
                        <span className="cl" data-at=".17">{'    .getSheetByName('}<i className="s">{"'Titipan'"}</i>{');'}</span>{'\n'}
                        <span className="cl" data-at=".25">{'  sh.appendRow(['}<i className="k">new</i>{' Date(), data.warung,'}</span>{'\n'}
                        <span className="cl" data-at=".32">{'    data.produk, data.qty, data.foto]);'}</span>{'\n'}
                        <span className="cl" data-at=".4">{'  '}<i className="f">updateStokWarung</i>{'(data.warung, data.qty);'}</span>{'\n'}
                        <span className="cl" data-at=".48">{'  '}<i className="k">return</i>{' '}<i className="f">kirimNotaWA</i>{'(data);'}</span>{'\n'}
                        <span className="cl" data-at=".55">{'}'}</span>
                      </code></pre>
                    </div>
                    <div className="phases">
                      <b className="ph-t">Tahap pengembangan</b>
                      {phases.map((p, i) => (
                        <div key={p} className="ph" data-from={(0.06 + i * 0.16).toFixed(2)} data-to={(0.2 + i * 0.16).toFixed(2)}>
                          <span>{p}</span><i className="pb"><i></i></i><em className="ok"></em>
                        </div>
                      ))}
                    </div>
                    <div className="rev" data-at=".6" data-until=".9"><b>Revisi dari owner</b>Tambah kolom catatan di form titipan ya kak</div>
                    <div className="toast" data-at=".9">Revisi selesai · siap serah terima</div>
                  </div>

                  {/* 5. BERJALAN */}
                  <div className="sc s4" data-s="4">
                    <div className="handover" data-at="0" data-until=".3">
                      <span className="hk">Serah terima</span>
                      <b>Aplikasi UDrinks siap dipakai</b>
                      <div className="inv-r"><span>Pelunasan 70%</span><b className="mono">Rp1.225.000</b></div>
                      <span className="paid">Lunas</span>
                    </div>
                    <div className="dash-h"><b>UDrinks · Hari ini</b><span className="live">Live</span></div>
                    <div className="kpis">
                      <div><small>Botol terjual</small><b className="mono" data-count="168">0</b></div>
                      <div><small>Setoran masuk</small><b className="mono" data-count="1490000" data-rp="1">Rp0</b></div>
                      <div><small>Warung aktif</small><b className="mono" data-count="30">0</b></div>
                    </div>
                    <div className="lower">
                      <div className="feed">
                        <div className="fi" data-at=".36"><span className="mono">10.42</span><b>Warung Bu Kokom</b><em className="g">Setor Rp168.000</em></div>
                        <div className="fi" data-at=".48"><span className="mono">11.05</span><b>Toko Sumber Rejeki</b><em className="b">Titip 24 botol</em></div>
                        <div className="fi" data-at=".6"><span className="mono">11.30</span><b>Warung Mang Ujang</b><em className="y">Stok habis</em></div>
                        <div className="fi" data-at=".72"><span className="mono">12.10</span><b>Warung Bu Sari</b><em className="g">Setor Rp96.000</em></div>
                      </div>
                      <div className="chart"><small>Setoran 7 hari</small><div className="bars">{[42, 55, 38, 64, 58, 77, 92].map((h, i) => <i key={i} style={css({ '--h': `${h}%`, '--k': i })}></i>)}</div></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* HP kedua: nota terkirim */}
              <div className="phone2" id="jr-phone2">
                <div className="p2-h"><span className="av2">WK</span><b>Warung Bu Kokom</b></div>
                <div className="p2-b">
                  <div className="nota">
                    <b>Nota Titip Jual</b><span className="mono">TJ-0427</span>
                    <div><span>Botol Kecil 12×</span><span className="mono">96.000</span></div>
                    <div><span>Botol Besar 6×</span><span className="mono">72.000</span></div>
                    <div className="t"><b>Total</b><b className="mono">168.000</b></div>
                    <time>10.42 <i className="ticks"></i></time>
                  </div>
                </div>
              </div>
              <div className="burst" id="jr-burst">{Array.from({ length: 14 }, (_, k) => <i key={k} style={css({ '--a': `${k * (360 / 14)}deg`, '--d': k % 3 })}></i>)}</div>
              <span className="badge-sim">Simulasi</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
