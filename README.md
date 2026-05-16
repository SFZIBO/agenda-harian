# Agenda Harian

Aplikasi manajemen tugas harian berbasis web yang menyimpan data secara lokal di browser pengguna menggunakan Local Storage. Aplikasi ini tidak memerlukan backend, database eksternal, atau koneksi internet untuk berfungsi.

## Fitur

- Tambah, tandai selesai, dan hapus tugas dengan cepat
- Kategorisasi tugas (Kerja, Pribadi, Belanja, Kesehatan, Lainnya)
- Filter tampilan berdasarkan status (Semua, Aktif, Selesai) dan kategori
- Statistik real-time: total tugas, tugas selesai, tugas tersisa, dan persentase progress
- Penyimpanan otomatis di browser menggunakan Local Storage
- Panduan penggunaan interaktif yang dapat dibuka dan ditutup
- Desain responsif untuk perangkat desktop dan mobile
- Proteksi dasar terhadap input berbahaya (XSS prevention)

## Teknologi yang Digunakan

- HTML5
- CSS3 (CSS Variables, Flexbox, Grid, Media Queries)
- Vanilla JavaScript (ES6+)
- Web Storage API (localStorage)

## Struktur File

```
agenda-harian/
├── index.html   # Struktur utama dan elemen antarmuka
├── style.css    # Styling, layout, animasi, dan responsivitas
└── script.js    # Logika aplikasi, manajemen data, dan event handling
```

## Cara Menggunakan

1. Simpan ketiga file (`index.html`, `style.css`, `script.js`) dalam satu folder.
2. Buka file `index.html` menggunakan browser modern (Chrome, Firefox, Safari, atau Edge).
3. Tidak diperlukan instalasi tambahan atau server lokal. Aplikasi dapat berjalan langsung dari sistem file.
4. Ketik tugas pada kolom input, pilih kategori, lalu tekan tombol Tambah atau kunci Enter.
5. Gunakan kotak centang untuk menandai tugas selesai, atau tombol X untuk menghapus tugas tertentu.
6. Gunakan tombol filter untuk menyaring tampilan tugas sesuai status atau kategori.
7. Klik tombol Panduan Penggunaan jika memerlukan penjelasan fitur lebih lanjut.

## Cara Kerja Penyimpanan Data

Aplikasi ini menggunakan `localStorage` browser untuk menyimpan daftar tugas dalam format JSON. Setiap kali terjadi perubahan (penambahan, penghapusan, atau perubahan status), array tugas akan dikonversi menjadi string JSON dan disimpan di kunci `agendaTasks`. Saat halaman dimuat, data akan diambil, diparsing kembali menjadi array JavaScript, dan dirender ke DOM. Data akan tetap tersimpan secara persisten hingga pengguna menghapus data browser atau cache secara manual.

## Kompatibilitas Browser

Aplikasi ini didukung oleh semua browser modern yang mengimplementasikan standar HTML5 dan Web Storage API. Fitur tidak akan berfungsi jika pengguna menonaktifkan JavaScript atau memblokir penyimpanan lokal.

## Lisensi

Proyek ini bersifat open-source dan disediakan untuk keperluan pembelajaran serta penggunaan pribadi. Silakan modifikasi, kembangkan, atau distribusikan sesuai kebutuhan.
