# 🌱 WasteWise - Aplikasi Pengolahan dan Pemilahan Sampah

Aplikasi web **fully responsive** untuk membantu mengelola dan memilah sampah dengan sistem reward yang menarik. Bekerja sempurna di **mobile, tablet, dan desktop**!

## 📱 Fitur Aplikasi

### 1. **Beranda** 🏠
- Menampilkan total poin pengguna (Sinkron antara menu dan dashboard)
- Statistik sampah yang terkumpul (Kg Terkumpul)
- Jumlah jadwal aktif yang sedang diproses
- Menu navigasi cepat ke Jadwal, Panduan, dan Reward
- Notifikasi terpisah yang selalu terlihat di header

### 2. **Jadwal Penjemputan** 📅
- Pembuatan jadwal berdasarkan hari operasional (Senin & Kamis)
- Pilihan jenis sampah (Organik, Anorganik, Campuran)
- Input estimasi berat sampah (Kg)
- Integrasi Peta (Leaflet) untuk penentuan titik penjemputan 📍
- Sistem **Poin Dinamis**: Mendapatkan +10 poin untuk setiap 1 kg sampah yang dijemput

### 3. **Panduan Pemilahan** 📚
- Tab Sampah Organik & Anorganik
- Informasi detail mengenai kategori sampah (Plastik, Kertas, Kaleng, Kaca)
- Tips pengolahan sampah mandiri

### 4. **Reward System** 🎁
- Status level pengguna (Pemula, Berkembang, Mahir, Ahli, Master)
- **Voucher Saya**: Menyimpan daftar voucher yang sudah ditukarkan
- Cara mendapatkan poin:
  - Selesaikan Penjemputan: **+10 poin per 1 kg**
- Katalog Hadiah menarik (Bibit, Tas Belanja, Tumbler, Pulsa, dll)

### 5. **Navigasi Cerdas** �
- **Tombol Kembali**: Tersedia tombol "⬅️ Kembali ke Beranda" di setiap fitur untuk navigasi yang lebih cepat.
- **Adaptive UI**: Tampilan menu berubah otomatis menyesuaikan ukuran layar.

## 🎨 Desain & Teknologi

### Teknologi
- **HTML5** - Struktur aplikasi semantik
- **CSS3** - Custom styling, Flexbox, Grid, & Media Queries
- **JavaScript (Vanilla)** - Logika aplikasi & State management
- **Leaflet.js** - Integrasi peta penjemputan
- **LocalStorage** - Penyimpanan data persisten di browser

### Desain
- **Tema**: Eco-friendly Emerald Green
- **Modern UI**: Glassmorphism, Smooth Gradients, Backdrop Blur
- **Iconography**: Gabungan Emoji dan CSS-based icons (Hamburger menu)
- **UX**: Truncated text pada mobile untuk mencegah layout berantakan

## 📐 Responsive Design

Aplikasi ini menggunakan sistem **Fluid & Adaptive Responsive**:

### 📱 Mobile (< 768px)
- **Navigation**: Hamburger Menu (3-bar CSS) di pojok kanan atas
- **Stand-alone Notification**: Bell icon terpisah di samping menu
- **Layout**: Header kompak dengan judul yang mengecil otomatis jika layar terlalu sempit

### 💻 Laptop & Desktop (>= 768px)
- **Navigation**: Top Navigation Bar (Beranda, Jadwal, Panduan, Reward)
- **Layout**: Spacing lebih luas dan menu hamburger disembunyikan

## 🚀 Cara Menggunakan

### Instalasi
1. Download atau clone folder `wastewise`
2. Buka file `index.html` di browser favorit Anda

### Penggunaan
1. **Buat Jadwal**: Masuk ke menu Jadwal, pilih lokasi di peta, isi estimasi berat sampah.
2. **Selesaikan Tugas**: Setelah petugas menjemput, klik "Selesaikan Penjemputan" untuk mendapatkan poin.
3. **Redeem**: Tukarkan poin Anda di menu Reward untuk mendapatkan voucher belanja atau hadiah fisik.

## 💾 Penyimpanan Data

Aplikasi menggunakan **LocalStorage** browser untuk menyimpan:
- Total poin & Level
- Daftar jadwal & Voucher yang dimiliki
- Riwayat notifikasi
- Statistik total sampah terkumpul

**Catatan**: Data Anda aman dan tersimpan meskipun browser ditutup atau di-refresh.

---

**Dibuat dengan ❤️ untuk Bumi yang lebih bersih** 🌍
