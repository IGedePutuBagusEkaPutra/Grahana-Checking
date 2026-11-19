# Catatan Pembaruan Visual

## Arah desain
Bali Luxury Editorial: deep forest green, ivory, muted gold, fotografi perjalanan dan properti yang realistis.

## Perubahan
- Hero menggunakan foto suasana Bali sebagai visual utama.
- Kartu direktori menggunakan foto kategori Accommodation, Restaurant, dan Mall.
- Tipografi, ukuran foto, bayangan, jarak, dan hover state diperhalus.
- Tampilan mobile tetap menggunakan breakpoint CSS.
- Government Dashboard mempertahankan alur dan fungsi prototype; styling dirapikan agar konsisten.

## Sumber foto
Foto dimuat dari endpoint gambar Unsplash (`images.unsplash.com`) melalui URL foto yang ditentukan di `src/main.js` dan `src/style.css`. Foto bukan data/foto usaha tertentu dan hanya bersifat representatif. Untuk rilis resmi, ganti dengan foto usaha yang telah mendapat izin penggunaan dan beri teks alternatif yang sesuai.

## Keamanan dan batasan
CSP `img-src` hanya ditambah untuk `https://images.unsplash.com`. Fitur bisnis tetap demo frontend dan penyimpanan lokal. Tidak ada autentikasi backend atau verifikasi legalitas.
