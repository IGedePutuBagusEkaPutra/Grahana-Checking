# Grahana Checking — Paket Lanjutan Langkah 06–11

## Cara menggunakan ZIP ini
ZIP ini berisi file proyek lengkap yang dapat menggantikan file dengan nama sama pada folder proyek `Grahana-Checking`. Sebelum mengekstrak, buat salinan folder proyek lama sebagai backup.

1. Tutup tab editor file yang sedang diedit (server Vite boleh dihentikan dengan Ctrl+C).
2. Backup folder `Grahana-Checking`.
3. Extract ZIP ini ke folder proyek `Grahana-Checking`, pilih Replace/Overwrite untuk file dengan nama sama.
4. Pastikan `src/style.css` tetap ada. File CSS yang sudah kamu gunakan untuk tampilan saat ini tidak disertakan ulang supaya tidak menimpa styling yang sudah berhasil.
5. Buka terminal pada folder proyek dan jalankan `npm install`, `npm test`, `npm run build`.
6. Jalankan `npm run dev` untuk memeriksa aplikasi.

## File penting dalam paket
- `index.html`: struktur halaman public dan dashboard, stylesheet dipanggil langsung.
- `src/main.js`: interaksi public, dashboard, CRUD, export/import.
- `src/data.js`, `src/security.js`, `src/store.js`: data demo, validasi, penyimpanan.
- `tests/security.test.js`: 14 unit test.
- `docs/`: panduan langkah 06–11, checklist keamanan, refleksi pengumpulan.
- `.github/workflows/deploy.yml`: workflow GitHub Pages.
- `vite.config.js`: konfigurasi Vite.

Catatan: CSS tidak ditimpa karena file style.css yang sedang tampil di browser sudah bekerja. Jangan hapus file CSS yang ada.
