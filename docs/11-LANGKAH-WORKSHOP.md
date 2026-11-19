# 11 LANGKAH WORKSHOP — GRAHANA CHECKING

Panduan ini mengikuti struktur dan urutan modul workshop CHAT Bali. Contoh RasaNusa diadaptasi menjadi Grahana Checking.

## 01 · Persiapan lingkungan
Periksa `node --version`, `npm --version`, `git --version`. Pastikan Git identity terkonfigurasi. Jalankan AI agent di folder proyek dan tinjau izin file/perintah sebelum menyetujuinya.

## 02 · Prinsip Vibe Coding
Baca `CATATAN.md`. Gunakan prompt kecil dan terukur. Manusia tetap memeriksa spesifikasi, perubahan, pengujian, keamanan, dan commit.

## 03 · Perencanaan & kebutuhan
Tinjau `SPEC.md`, `UI-SPEC.md`, dan `TASKS.md`. Pastikan dua area aplikasi dan batasan frontend-only dipahami sebelum coding.

## 04 · Kerangka aplikasi
Jalankan `npm install`, lalu `npm run dev`. Periksa localhost, browser Console, dan Network. Commit baseline setelah memeriksa `git diff`.

## 05 · Public Website
Uji landing page, tiga kategori, pencarian nama/lokasi, filter kategori, sorting, detail usaha, fasilitas, kontak, dan tampilan mobile. Informasi internal tidak boleh ditampilkan ke publik.

## 06 · Government Dashboard
Buka Government Dashboard. Uji CRUD, status, statistik, riwayat, laporan, export/import JSON. Dashboard adalah simulasi lokal tanpa login atau otorisasi sungguhan. Mall dan tenant adalah record terpisah.

## 07 · Pengujian fungsional & UX
Jalankan `npm test` dan `npm run build`. Uji pencarian kosong, input panjang, kategori/status invalid, CRUD, refresh, import JSON rusak, ekspor, dan viewport 390px. Catat hasil aktual.

## 08 · Secure Vibe Coding
- Masukkan `<img src=x onerror=alert(1)>` pada nama usaha di localhost; harus tampil sebagai teks, bukan dieksekusi.
- Review `innerHTML`, `eval`, penanganan URL, validasi form, dan JSON import.
- Uji LocalStorage rusak dan manipulasi data.
- Jalankan `npm audit`, `git status`, `git diff --check`.
- Pastikan tidak ada secret atau data sensitif.
- Perbaiki temuan terverifikasi, kemudian retest.
Pengujian hanya pada aplikasi sendiri/yang diizinkan.

## 09 · Deployment
Jalankan test dan build. Push repository ke GitHub. Deploy statis dengan GitHub Pages, Netlify, atau Vercel. Hosting statis tidak menyediakan autentikasi backend. Lihat `docs/DEPLOYMENT.md`.

## 10 · Troubleshooting
Port sibuk: `npm run dev -- --port 5174`. Build gagal: baca pesan terminal. Git push ditolak: simpan commit, lalu pull/rebase dengan hati-hati. Jangan gunakan `git reset --hard`, `git clean -fd`, atau penghapusan massal tanpa memahami dampaknya.

## 11 · Kirim hasil training
Isi URL repository dan URL demo/hosting di halaman training. Lampirkan catatan hasil dan refleksi: fitur selesai, bukti test aktual, hasil audit keamanan, kendala, screenshot, dan perbaikan. Minimal satu URL harus diisi; idealnya keduanya tersedia dan dapat dibuka trainer.
