# 🌱 WasteWise - Aplikasi Pengolahan dan Pemilahan Sampah

Aplikasi web **fully responsive** untuk membantu mengelola dan memilah sampah dengan sistem reward yang menarik. Bekerja sempurna di **mobile, tablet, dan desktop**!

## 📱 Fitur Aplikasi

### 1. **Beranda** 🏠
- Menampilkan total poin pengguna
- Statistik sampah yang terkumpul
- Jumlah jadwal aktif
- Menu navigasi ke halaman lain
- Bonus login harian (+20 poin)

### 2. **Jadwal Penjemputan** 📅
- Input tanggal dan waktu penjemputan sampah
- Pilihan jenis sampah (Organik, Anorganik, Campuran)
- Input estimasi berat sampah
- Alamat penjemputan
- Daftar jadwal yang sudah dibuat
- Mendapat +10 poin setiap membuat jadwal

### 3. **Panduan Pemilahan** 📚
- Tab Sampah Organik
  - Penjelasan lengkap sampah organik
  - Contoh-contoh sampah organik
  - Cara pengolahan yang benar
- Tab Sampah Anorganik
  - Penjelasan lengkap sampah anorganik
  - Kategori sampah (Plastik, Kertas, Kaleng, Kaca)
  - Tips pengolahan dengan metode 3R (Reduce, Reuse, Recycle)

### 4. **Reward System** 🎁
- Menampilkan total poin
- Status level pengguna (Pemula, Berkembang, Mahir, Ahli, Master)
- Cara mendapatkan poin:
  - Buat jadwal: +10 poin
  - Setor sampah: +5 poin per kg
  - Bonus harian: +20 poin
- Katalog Hadiah:
  - Bibit Tanaman (50 poin)
  - Tas Belanja (100 poin)
  - Tumbler Eksklusif (150 poin)
  - Voucher Pulsa (200 poin)
  - Backpack Eco (300 poin)
  - Sertifikat Juara (500 poin)

### 5. **Notifikasi** 🔔
- Daftar semua notifikasi
- Badge notifikasi yang belum dibaca
- Notifikasi welcome
- Notifikasi jadwal berhasil dibuat
- Notifikasi reward ditukar
- Notifikasi bonus harian

## 🎨 Desain & Teknologi

### Teknologi
- **HTML5** - Struktur aplikasi
- **CSS3** - Styling dengan desain modern
- **JavaScript (Vanilla)** - Logika aplikasi
- **LocalStorage** - Penyimpanan data lokal

### Desain
- **Tema**: Eco-friendly dengan warna hijau dominan
- **Font**: Inter (Google Fonts)
- **Mobile-First**: Dioptimalkan untuk perangkat mobile
- **Responsive**: Berfungsi baik di berbagai ukuran layar
- **Animasi**: Smooth transitions dan micro-animations
- **Modern UI**: Glassmorphism, gradients, shadows

### Fitur Desain
- ✅ Splash screen dengan animasi
- ✅ Adaptive navigation (bottom/top/sidebar)
- ✅ Toast notifications
- ✅ Empty states yang informatif
- ✅ Badge untuk notifikasi
- ✅ Cards dengan hover effects
- ✅ Smooth page transitions

## 📐 Responsive Design

Aplikasi ini **sepenuhnya responsif** dengan layout yang optimal untuk setiap ukuran layar:

### 📱 Mobile (< 768px)
- **Navigation**: Bottom navigation bar (thumb-friendly)
- **Layout**: Single column, compact spacing
- **Grids**: 2 kolom untuk features & rewards
- **Max Width**: 480px centered
- **Perfect for**: Smartphone, iPhone, Android phones

### 📱 Tablet (768px - 1023px)
- **Navigation**: Horizontal navigation bar di atas
- **Layout**: Single column, comfortable spacing
- **Grids**: 2 kolom dengan spacing lebih lebar
- **Max Width**: 768px
- **Font Sizes**: Medium (lebih besar dari mobile)
- **Perfect for**: iPad, Android tablets, tablet mode

### 💻 Desktop (1024px+)
- **Navigation**: Sidebar vertikal di kiri (250px)
- **Layout**: Grid dengan sidebar + main content
- **Grids**: 3-4 kolom untuk optimal browsing
- **Max Width**: 1200px - 1400px
- **Font Sizes**: Large (optimal untuk reading)
- **Features Grid**: 4 kolom
- **Rewards Grid**: 3-4 kolom
- **Perfect for**: Laptop, desktop, monitors

### 🎯 Adaptive Features
- ✅ **Navigation berubah otomatis**: bottom → top → sidebar
- ✅ **Grid columns bertambah**: 2 → 3 → 4 kolom
- ✅ **Typography scales**: Font sizes menyesuaikan layar
- ✅ **Spacing responsive**: Padding meningkat di layar besar
- ✅ **Icons adaptive**: Ukuran icons menyesuaikan
- ✅ **Touch-friendly pada mobile**, hover-friendly pada desktop

📖 **[Lihat dokumentasi lengkap Responsive Design](RESPONSIVE.md)**


## 🚀 Cara Menggunakan

### Instalasi
1. Download atau clone folder `wastewise`
2. Buka file `index.html` di browser
3. Aplikasi siap digunakan!

### Penggunaan
1. **Pertama kali buka**: Anda akan mendapat bonus welcome +20 poin
2. **Buat Jadwal**: 
   - Klik menu "Jadwal" di bottom navigation
   - Isi form penjemputan sampah
   - Klik "Buat Jadwal" untuk mendapat +10 poin
3. **Lihat Panduan**: 
   - Klik menu "Panduan"
   - Pilih tab Organik atau Anorganik
   - Pelajari cara memilah sampah dengan benar
4. **Tukar Reward**:
   - Klik menu "Reward"
   - Pilih hadiah yang diinginkan
   - Klik "Tukar" jika poin cukup
5. **Cek Notifikasi**:
   - Klik ikon 🔔 di header atau menu "Notifikasi"
   - Lihat semua pengingat dan informasi

## 💾 Penyimpanan Data

Aplikasi menggunakan **LocalStorage** browser untuk menyimpan:
- Total poin pengguna
- Daftar jadwal penjemputan
- Riwayat notifikasi
- Total sampah yang terkumpul
- Tanggal login terakhir (untuk bonus harian)

**Catatan**: Data akan tetap tersimpan meskipun browser ditutup.

## 🎯 Level Pengguna

| Level | Poin Minimal |
|-------|--------------|
| Pemula | 0 - 49 |
| Berkembang | 50 - 149 |
| Mahir | 150 - 299 |
| Ahli | 300 - 499 |
| Master | 500+ |

## 🧪 Testing

Untuk mencoba aplikasi dengan data demo:
1. Buka Console di browser (F12)
2. Ketik: `loadDemoData()`
3. Aplikasi akan terisi dengan data contoh

## 📱 Kompatibilitas

- ✅ Chrome (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile Browsers

## 🔧 Struktur File

```
wastewise/
├── index.html        # Struktur aplikasi
├── style.css         # Styling & desain responsif
├── script.js         # Logika aplikasi
├── README.md         # Dokumentasi utama
└── RESPONSIVE.md     # Dokumentasi responsive design
```

## 🌟 Fitur Unggulan

1. **💚 Ramah Lingkungan**: Tema eco-friendly dengan edukasi pemilahan sampah
2. **🎮 Gamifikasi**: Sistem poin dan reward membuat pengelolaan sampah lebih menyenangkan
3. **📊 Tracking**: Monitor berapa kg sampah yang sudah Anda kelola
4. **🔔 Notifikasi**: Pengingat dan informasi penting
5. **💾 Offline**: Bekerja tanpa koneksi internet
6. **📱💻 Fully Responsive**: Tampilan optimal di mobile, tablet, dan desktop
7. **🎨 Modern UI**: Desain yang menarik dan mudah digunakan
8. **⚡ Fast & Lightweight**: Pure HTML, CSS, JS tanpa framework berat

## 📝 Tips Penggunaan

1. Login setiap hari untuk mendapat bonus +20 poin
2. Buat jadwal penjemputan rutin untuk mengumpulkan poin
3. Pelajari panduan pemilahan agar bisa memilah sampah dengan benar
4. Tukar poin dengan reward yang Anda inginkan
5. Cek notifikasi secara berkala

## 🤝 Kontribusi

Aplikasi ini dibuat untuk tujuan edukasi dan dapat dikembangkan lebih lanjut dengan fitur:
- Integrasi dengan backend/API
- Sistem authentication
- Leaderboard pengguna
- Tracking lokasi GPS
- Push notifications
- Pembayaran digital
- Dan lainnya

## 📄 Lisensi

Free to use untuk tujuan edukasi dan pengembangan.

---

**Dibuat dengan ❤️ untuk Bumi yang lebih bersih** 🌍
