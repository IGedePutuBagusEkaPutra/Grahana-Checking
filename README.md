# GRAHANA CHECKING
**Property & Business Bali Checking**  
*Know the Place. Trust the Information.*

Grahana Checking adalah prototipe frontend direktori informasi usaha dan properti di Bali. Paket ini disiapkan untuk latihan workshop 11 langkah dan pengujian keamanan dasar.

## Area aplikasi
### 1. Public Website
- Direktori Accommodation, Restaurant, dan Mall.
- Pencarian nama/lokasi, filter kategori, sorting.
- Detail usaha, deskripsi, fasilitas, kontak dan website publik jika tersedia.
- Tidak menampilkan status pemeriksaan internal atau data rahasia.

### 2. Government Dashboard (simulasi)
- Ringkasan jumlah usaha dan kategori.
- CRUD data usaha.
- Status simulasi: Not Checked, Under Review, Needs Follow-up, Completed.
- Riwayat aktivitas lokal.
- Ringkasan laporan dan ekspor CSV/JSON.
- Import JSON dengan validasi struktur.
- Mall dan tenant direpresentasikan sebagai record usaha terpisah; tenant contoh memiliki `parentMallId`.

## Teknologi
Vite, Vanilla JavaScript (ES modules), HTML, CSS, LocalStorage, Node built-in test runner. Tidak ada backend dan tidak ada login palsu.

## Menjalankan proyek
Prasyarat: Node.js LTS dan npm.

```bash
npm install
npm run dev
```
Buka URL lokal yang muncul di terminal (umumnya `http://localhost:5173`).

## Pengujian dan build
```bash
npm test
npm run build
npm run preview
npm audit
```
Catat output aktual. Jangan mengklaim lulus sebelum perintah benar-benar dijalankan.

## Deployment
Lihat `docs/DEPLOYMENT.md`. Template GitHub Actions tersedia di `.github/workflows/deploy.yml`. Sesuaikan `base` pada `vite.config.js` dengan nama repository.

## Data & batasan keamanan
- Semua data bawaan adalah contoh fiktif untuk demonstrasi.
- LocalStorage dapat dibaca dan dimodifikasi oleh pengguna browser.
- Dashboard tidak memiliki autentikasi server-side atau otorisasi role.
- Jangan memasukkan NPWP, data pajak, dokumen legalitas rahasia, password, atau data pribadi.
- Status pemeriksaan bukan keputusan legalitas atau kepatuhan pajak.
- Tidak ada integrasi OSS, pemerintah, atau database pajak.
- CSP meta adalah baseline, bukan pengganti HTTP response header.
- Untuk operasional nyata diperlukan backend, autentikasi, otorisasi, database, audit log, enkripsi, backup, kebijakan privasi, dan pengujian keamanan profesional.

## Struktur
- `src/data.js`: data simulasi.
- `src/security.js`: validasi input, URL dan JSON.
- `src/store.js`: LocalStorage.
- `src/main.js`: UI, interaksi, CRUD dan ekspor.
- `src/style.css`: desain responsif.
- `tests/`: unit test.
- `docs/`: panduan workshop dan keamanan.


## Pembaruan Visual – Bali Luxury Editorial

Versi ini mempertahankan struktur dan fungsi prototype yang sudah ada, dengan penyegaran visual pada hero, kartu katalog, warna, jarak, dan responsivitas. Foto hero serta kartu kategori dimuat dari Unsplash melalui `images.unsplash.com`, sehingga koneksi internet diperlukan agar foto tampil. Jika foto gagal dimuat, kartu tetap menampilkan warna latar cadangan.

### Memasang pembaruan
1. Backup folder project lama.
2. Ekstrak ZIP ini dan buka folder `Grahana-Checking-Visual-Upgrade` di VS Code.
3. Jalankan `npm install`.
4. Jalankan `npm test`, lalu `npm run build`.
5. Jalankan `npm run dev` untuk memeriksa tampilan lokal.
6. Jika sudah sesuai, salin perubahan ke project Git yang terhubung ke Vercel atau gunakan folder ini sebagai project Git baru.
7. Untuk memperbarui website Vercel yang sudah ada, commit dan push perubahan ke branch `main` dari repository yang sama. Vercel akan melakukan deployment otomatis.

### Batasan
Ini tetap frontend prototype dengan data demonstrasi dan LocalStorage. Penyegaran visual tidak menambahkan backend, autentikasi server, atau verifikasi legalitas. Jangan memasukkan dokumen rahasia atau data pajak asli.
