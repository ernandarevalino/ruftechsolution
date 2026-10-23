export const layanan = [
  {
    id: 'operasional',
    judul: 'Operasional',
    ringkas: 'Pencatatan harian yang cepat di HP, tablet, atau Chromebook.',
    poin: ['Kasir & POS dengan barcode', 'Stok & gudang', 'Titip jual & distribusi'],
    detail: [
      { t: 'Kasir & POS', d: 'Scan barcode dari scanner atau kamera HP, struk thermal 58/80mm, nota ke WhatsApp, pembayaran tunai dan QRIS.' },
      { t: 'Stok & gudang', d: 'Barang masuk dan keluar, sisa stok terkini, koreksi stok, dan stok per lokasi.' },
      { t: 'Titip jual & distribusi', d: 'Barang titipan di warung atau toko mitra, nota pengiriman, retur, dan setoran.' },
    ],
  },
  {
    id: 'keuangan',
    judul: 'Keuangan & Laporan',
    ringkas: 'Angka usaha yang bisa dicek kapan saja tanpa menghitung manual.',
    poin: ['Omzet, HPP & laba', 'Piutang & pembayaran tempo', 'Laporan bulanan ke PDF'],
    detail: [
      { t: 'Omzet, HPP & laba', d: 'Pendapatan, pengeluaran, harga modal per produk, laba kotor dan bersih.' },
      { t: 'Piutang & tempo', d: 'Penjualan tempo otomatis jadi piutang, lengkap dengan jatuh tempo dan pembayaran gabungan.' },
      { t: 'Laporan PDF', d: 'Laporan harian dan bulanan yang bisa diunduh atau dikirim ke owner.' },
    ],
  },
  {
    id: 'tim-pelanggan',
    judul: 'Tim & Pelanggan',
    ringkas: 'Karyawan dan pelanggan ikut terhubung ke sistem yang sama.',
    poin: ['Absensi selfie + GPS', 'Booking online & DP QRIS', 'Member & poin loyalitas'],
    detail: [
      { t: 'Absensi karyawan', d: 'Absen dengan foto selfie dan lokasi GPS dalam radius toko, jadwal shift, rekap telat dan lembur.' },
      { t: 'Booking online', d: 'Halaman pemesanan untuk pelanggan, DP lewat QRIS, dan persetujuan oleh kasir.' },
      { t: 'Member & poin', d: 'Poin per kelipatan belanja yang bisa ditukar potongan harga, dikenali dari nomor HP.' },
    ],
  },
];
