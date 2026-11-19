# SECURITY REVIEW — BASIC FRONTEND

## Scope
Pengujian dasar pada prototipe frontend milik sendiri. Ini bukan penetration test menyeluruh atau sertifikasi keamanan.

## Checklist
- [ ] XSS: masukkan `<img src=x onerror=alert(1)>` pada nama usaha. Pastikan tidak dieksekusi.
- [ ] DOM: data user dirender dengan `textContent`/DOM API, bukan `innerHTML`.
- [ ] Validasi: nama/lokasi kosong, panjang melebihi batas, kategori/status invalid.
- [ ] URL: protokol javascript ditolak; hanya HTTP/HTTPS.
- [ ] Import JSON: JSON rusak, object bukan array, field invalid, file lebih dari 1 MB.
- [ ] LocalStorage: JSON rusak pulih ke data demo; storage bukan tempat data sensitif.
- [ ] Secrets: tidak ada API key, token, password atau credential dalam source.
- [ ] Dependencies: jalankan `npm audit`; evaluasi hasil aktual.
- [ ] Git: `git status`, `git diff --check`, review file sebelum commit.
- [ ] CSP: review meta CSP; untuk production set HTTP response header di hosting.
- [ ] Dashboard: peringatan simulasi terlihat; tidak ada klaim login/otorisasi sungguhan.
- [ ] Data: semua data contoh fiktif; tidak ada dokumen pajak/legalitas asli.

## Hasil aktual
Tanggal:
Node/npm:
`npm test`:
`npm run build`:
`npm audit`:
Uji XSS:
Temuan:
Remediasi:
Retest:

## Batasan
LocalStorage dapat dibaca/diubah pengguna. Tidak ada server-side validation, authentication, authorization, database access control, audit trail terpercaya, atau proteksi multiuser. Jangan gunakan untuk operasional pemerintah/komersial nyata.
