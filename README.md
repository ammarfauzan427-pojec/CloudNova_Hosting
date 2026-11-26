# 🚀 CloudNova Hosting

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

**CloudNova Hosting** adalah platform web modern untuk layanan penyedia web hosting, registrasi domain, dan server cloud berkecepatan tinggi dengan uptime 99.9%. Dibangun dengan teknologi mutakhir untuk memberikan pengalaman pengguna yang cepat, responsif, dan interaktif.

---

## ✨ Fitur Utama

- ⚡ **Katalog Paket Hosting Interaktif**: Pilihan paket *Starter*, *Business*, dan *Professional* dengan toggle tagihan Bulanan / Tahunan (diskon spesial).
- 🧭 **Rekomendasi Paket Pintar (Smart Hosting Advisor)**: Membantu calon pelanggan memilih paket sesuai estimasi pengunjung dan jenis website (Blog, Toko Online, Aplikasi Web/Layanan Kritis).
- 🔍 **Cek Ketersediaan Domain Instant**: Simulasi pengecekan domain cepat langsung dari beranda.
- 🛒 **Halaman Checkout & Simulasi Pembayaran**: Dilengkapi rincian biaya, pilihan siklus langganan, diskon otomatis, dan metode pembayaran (QRIS, Virtual Account, Transfer Bank).
- 📡 **Server Status & Monitoring Realtime**: Halaman pantau status uptime, latensi server Jakarta & Singapura, load rata-rata, serta riwayat insiden/pemeliharaan berkala.
- 📱 **Desain Modern & Responsif**: Tampilan clean dengan palet warna dark/modern tech yang nyaman diakses dari desktop, tablet, maupun smartphone.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI & Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Bootstrap Icons](https://icons.getbootstrap.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Runtime**: Node.js

---

## 📁 Struktur Direktori

```text
CloudNova_Hosting/
├── cloudnova-app/               # Sumber kode aplikasi Next.js
│   ├── public/                  # File publik & aset statis
│   ├── src/
│   │   ├── app/
│   │   │   ├── cart/            # Halaman Checkout & Keranjang
│   │   │   ├── status/          # Halaman Server Status & Monitoring
│   │   │   ├── globals.css      # Styling global Tailwind
│   │   │   ├── layout.tsx       # Root layout aplikasi
│   │   │   └── page.tsx         # Landing page utama
│   │   └── components/
│   │       ├── Navbar.tsx       # Navigasi utama
│   │       └── Footer.tsx       # Footer informasi & kontak
│   ├── package.json
│   └── tsconfig.json
├── start-nextjs.bat             # Script runner cepat untuk Windows
└── README.md                    # Dokumentasi repositori
```

---

## 🚀 Memulai (Quick Start)

### Prasyarat
Pastikan Anda sudah menginstal:
- [Node.js](https://nodejs.org/) (versi 18.x atau lebih baru)
- npm, yarn, atau pnpm

### Instalasi & Menjalankan Lokal

1. **Clone repositori:**
   ```bash
   git clone https://github.com/username/CloudNova_Hosting.git
   cd CloudNova_Hosting/cloudnova-app
   ```

2. **Install dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan:**
   ```bash
   npm run dev
   ```
   *Atau jika menggunakan Windows, Anda dapat langsung menjalankan file `start-nextjs.bat` di root direktori.*

4. **Buka di browser:**
   Akses [http://localhost:3000](http://localhost:3000) untuk melihat aplikasi.

---

## 📦 Build untuk Produksi

Untuk membuat build produksi yang dioptimalkan:

```bash
cd cloudnova-app
npm run build
npm run start
```

---

## 📄 Lisensi

Didistribusikan di bawah lisensi [MIT](LICENSE). Lihat file `LICENSE` untuk informasi lebih lanjut.
