# CATATAN — GRAHANA CHECKING

## Tujuan
Membangun frontend direktori informasi usaha/properti Bali dan dashboard demonstrasi pengelolaan/pemeriksaan.

## Konsep
- Public Website: Accommodation, Restaurant, Mall.
- Government Dashboard: data usaha, status pemeriksaan, catatan/riwayat, laporan simulasi.
- Tagline: Know the Place. Trust the Information.

## Batasan
Frontend only; Vite + Vanilla JavaScript + CSS. LocalStorage hanya untuk data simulasi. Tidak ada backend, login palsu, integrasi pemerintah, atau data rahasia.

## Risiko yang diperiksa
XSS/DOM injection, validasi input, manipulasi LocalStorage, JSON impor rusak, URL berbahaya, kebocoran secret, dependency supply chain, dan klaim keamanan dashboard.

## Hasil pengujian (isi setelah dijalankan)
- Node/npm:
- npm test:
- npm run build:
- npm audit:
- Uji XSS:
- Temuan dan remediasi:
- URL GitHub:
- URL demo:
