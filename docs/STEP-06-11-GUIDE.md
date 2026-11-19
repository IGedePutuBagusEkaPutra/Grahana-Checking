# PANDUAN LANGKAH 06–11 — GRAHANA CHECKING

Paket ini melanjutkan proyek Grahana Checking setelah kerangka Vite dan halaman publik berhasil berjalan. Gunakan sebagai overlay/replacement file proyek, bukan membuat proyek baru.

## 06 · Government Dashboard
- Buka Government Dashboard dari navbar.
- Periksa banner simulasi dan statistik kategori.
- Uji tambah, edit, hapus data fiktif.
- Uji status Not Checked, Under Review, Needs Follow-up, Completed.
- Periksa riwayat aktivitas, ringkasan laporan, ekspor CSV/JSON, dan import JSON.
- Mall dan tenant tetap record terpisah. Relasi tenant tidak berarti verifikasi tenant otomatis.

## 07 · Pengujian fungsional & UI/UX
Jalankan:
```bash
npm test
npm run build
```
Uji manual: filter tiga kategori, pencarian, detail, CRUD, refresh LocalStorage, import JSON rusak, export, dan viewport mobile 390px. Simpan screenshot dan hasil aktual.

## 08 · Secure Vibe Coding
1. Pada localhost milik sendiri, buat record dengan nama `<img src=x onerror=alert(1)>`. Hasil aman: string tampil sebagai teks dan tidak ada alert.
2. Coba nama kosong, input terlalu panjang, kategori/status tidak valid, nomor telepon invalid, URL `javascript:`.
3. Import JSON rusak dan JSON dengan struktur salah; aplikasi harus menolak.
4. Jalankan `npm audit`, `git diff --check`, dan review perubahan.
5. Jangan masukkan data pribadi, pajak, dokumen rahasia, password, atau API key.
6. Catat hasil di `docs/SECURITY-RESULTS.md`.

Batasan: LocalStorage bisa dimodifikasi dari browser. Tidak ada server-side authentication/authorization. Dashboard hanya demo.

## 09 · Deployment
- Jalankan `npm test` dan `npm run build`.
- Buat repository GitHub, push branch `main`.
- Atur `base` pada `vite.config.js` sesuai nama repo, misalnya `/grahana-checking/`.
- GitHub → Settings → Pages → Source: GitHub Actions.
- Workflow `.github/workflows/deploy.yml` membangun dan deploy folder `dist`.
- Setelah deploy, buka URL dari perangkat/browser dan lakukan smoke test.
- Alternatif: Vercel/Netlify dengan build command `npm run build`, output `dist`.

## 10 · Troubleshooting
- Port 5173 terpakai: `npm run dev -- --port 5174`.
- CSS tidak tampil: periksa `<link rel="stylesheet" href="/src/style.css">`, file `src/style.css`, dan tab Network.
- Build gagal: baca pesan error pertama di terminal; jangan menghapus file acak.
- `npm audit` menemukan isu: cek paket terdampak dan versi perbaikannya sebelum update.
- Hindari perintah destruktif seperti `git reset --hard` atau `git clean -fd` tanpa memahami dampaknya.

## 11 · Kirim hasil training
Isi URL repository dan URL demo pada form trainer. Lampirkan catatan fitur, test aktual, audit keamanan, kendala/perbaikan, dan refleksi. Pastikan link dapat dibuka trainer. Minimal satu link wajib diisi sesuai instruksi platform; idealnya repository dan demo sama-sama tersedia.
