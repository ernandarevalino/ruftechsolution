# Website Ruftech Solutions

Website company profile Ruftech Solutions, dibangun dengan **Next.js** (App Router, ekspor statis) dan panel admin **Sveltia CMS**.

## Isi website

| Halaman | Alamat | Sumber isi |
|---|---|---|
| Beranda | `/` | `src/app/page.tsx` |
| Karya (daftar + detail) | `/karya`, `/karya/nama-klien` | `src/content/karya/*.md` (bisa diedit di admin) |
| Layanan | `/layanan` | `src/lib/layanan.ts` |
| Cara Kerja (simulasi) | `/cara-kerja` | `src/components/Journey.tsx` |
| Produk (daftar + detail) | `/produk`, `/produk/nama-produk` | `src/content/produk/*.md` (admin) |
| Harga + kalkulator | `/harga` | `src/data/harga.json`, `src/data/kalkulator.json` (admin) |
| Artikel (daftar + detail) | `/artikel`, `/artikel/judul` | `src/content/artikel/*.md` (admin) |
| Tentang | `/tentang` | `src/app/tentang/page.tsx` |
| Kontak | `/kontak` | form yang membuka WhatsApp |
| Panel admin | `/admin/` | `public/admin/config.yml` |

Otomatis dibuat juga: `sitemap.xml`, `robots.txt`, `rss.xml`, halaman 404, data terstruktur untuk Google, dan preview link untuk WhatsApp/Instagram.

Nomor WhatsApp, Instagram, email, kota, dan jumlah klien diatur di `src/data/site.json` atau lewat admin di menu **Pengaturan Website**.

### Struktur folder

```
src/
  app/          halaman (satu folder = satu alamat, file page.tsx)
  components/   bagian-bagian tampilan + file .css masing-masing
  content/      isi Markdown: karya, produk, artikel, testimoni
  data/         pengaturan JSON: kontak, harga, kalkulator, logo mitra
  lib/          fungsi bantu (pembaca konten, link WhatsApp, SEO, pelacakan)
  styles/       gaya global + gaya per halaman
public/         gambar, favicon, dan panel admin
```

Setiap komponen punya file CSS sendiri yang diawali kelas unik (mis. `.c-kalkulator`), jadi mengubah gaya satu bagian tidak memengaruhi bagian lain.

---

## 1. Menjalankan di laptop (sekali saja untuk setup)

1. Install **Node.js versi 22 atau lebih baru** dari nodejs.org.
2. Ekstrak folder ini, buka Terminal / Command Prompt (atau terminal VS Code) di dalamnya, lalu jalankan:

   ```bash
   npm install
   npm run dev
   ```

3. Buka `http://localhost:3000` di browser.
4. Untuk mencoba panel admin di laptop, buka `http://localhost:3000/admin/index.html` di Chrome atau Edge, klik **Work with Local Repository**, lalu pilih folder ini. Perubahan langsung tersimpan ke file di laptop.

## 2. Upload ke GitHub

1. Buat akun di github.com (gratis), lalu klik **New repository**, beri nama `ruftech-web`, pilih **Private**.
2. Paling mudah lewat aplikasi **GitHub Desktop**: *File → Add local repository* → pilih folder ini → *Publish repository*.

## 3. Online-kan di Netlify (gratis)

1. Login ke netlify.com memakai akun GitHub.
2. **Add new site → Import an existing project → GitHub** → pilih `ruftech-web`.
3. Pengaturan build sudah otomatis dari `netlify.toml` (perintah `npm run build`, folder `out`). Klik **Deploy**.
4. Di **Site configuration → Environment variables**, tambahkan `SITE_URL` berisi alamat web, mis. `https://ruftech.id`. Lalu deploy ulang.

Setiap ada perubahan di GitHub (dari admin atau dari laptop), Netlify otomatis membangun ulang website dalam 1–2 menit.

## 4. Pasang domain

1. Beli domain (mis. `ruftech.id` atau `ruftechsolutions.com`).
2. Netlify: **Domain management → Add a domain** → ikuti petunjuk mengubah DNS di tempat beli domain.
3. Ganti `SITE_URL` di Netlify dan `site_url`/`display_url` di `public/admin/config.yml` dengan domain baru.

## 5. Mengaktifkan panel admin (/admin)

1. Buka `public/admin/config.yml`, ganti `USERNAME-GITHUB/ruftech-web` dengan nama repository kamu, lalu commit.
2. Pilih salah satu cara login:

   **A. Login dengan token (paling cepat)**
   Buka `alamat-web/admin/` → **Sign In with Token**. Ikuti link yang muncul untuk membuat *fine-grained token* di GitHub, pilih repository `ruftech-web`, beri izin **Contents: Read and write**. Tempel tokennya. Token tersimpan di browser itu saja.

   **B. Tombol "Sign in with GitHub"**
   - GitHub → *Settings → Developer settings → OAuth Apps → New OAuth App*.
     Homepage URL: alamat website. Callback URL: `https://api.netlify.com/auth/done`.
   - Netlify → *Site configuration → Access & security → OAuth → Install provider → GitHub*, isi Client ID dan Client Secret dari langkah sebelumnya.

3. Di admin kamu bisa menambah **Karya**, **Produk**, **Artikel**, upload screenshot, dan mengubah **harga** serta **kontak**. Klik **Save/Publish**, website diperbarui otomatis.

## Bukti & kepercayaan (isi dari admin)

Bagian berikut **otomatis tersembunyi selama kosong**, dan langsung tampil begitu diisi:

- **Testimoni Klien** (menu admin *Testimoni Klien*): nama, usaha, kutipan, foto, dan screenshot chat. Kalau kolom *ID karya terkait* diisi (mis. `udrinks`), testimoni juga tampil di halaman karya itu. Minta izin klien dulu dan samarkan nomor telepon di screenshot.
- **Founder** (*Pengaturan Website → Info usaha & kontak → Founder*): nama, foto, dan cerita singkat. Tampil di halaman Tentang.
- **Garansi** (*Pengaturan Website → Paket harga → Poin garansi*): mis. "Perbaikan bug gratis 30 hari setelah serah terima". Tampil di halaman Harga.

## Mengukur dari mana klien datang

1. **Link bio pakai penanda sumber.** Di bio TikTok tulis `https://alamat-web/?utm_source=tiktok`, di Instagram `?utm_source=instagram`, di Google Business `?utm_source=google`.
2. Saat pengunjung dari link itu menekan tombol WhatsApp, pesannya otomatis diakhiri **(via tiktok)** atau sumber lain. Jadi dari chat yang masuk kamu langsung tahu asalnya.
3. **Opsional, Google Analytics 4:** buat property di analytics.google.com, salin ID `G-XXXXXXX`, isi di *Pengaturan Website → ID Google Analytics 4*. Setiap klik WhatsApp tercatat sebagai event `klik_whatsapp` lengkap dengan sumber dan halamannya.

## Tips konten

- **Screenshot karya:** upload di kolom *Screenshot utama*. Rasio 16:10 paling pas. Selama kosong, website memakai mockup bawaan.
- **Artikel:** gunakan subjudul `##`. Daftar isi di samping artikel dibuat otomatis dari subjudul tersebut.
- **Urutan karya:** atur di kolom *Urutan tampil*. Angka kecil tampil lebih dulu.

## Perintah

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Menjalankan website di laptop untuk dicoba (`localhost:3000`) |
| `npm run build` | Membuat versi siap online di folder `out/` |
| `npm start` | Melihat hasil build (folder `out/`) sebelum di-upload |

## Hosting selain Netlify

Hasil `npm run build` adalah website statis di folder `out/`, jadi bisa di-hosting di mana saja:

- **Vercel:** Import repository dari GitHub, framework otomatis terdeteksi sebagai Next.js. Tambahkan environment variable `SITE_URL`.
- **Cloudflare Pages:** build command `npm run build`, output directory `out`.
- **Hosting biasa (cPanel):** jalankan `npm run build` di laptop, lalu upload isi folder `out/` ke `public_html`. Catatan: perubahan dari panel admin hanya tampil otomatis di hosting yang membangun ulang dari GitHub (Netlify, Vercel, Cloudflare Pages). Di cPanel kamu perlu build dan upload ulang sendiri.
