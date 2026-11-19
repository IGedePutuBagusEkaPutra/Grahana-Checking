# SPEC — GRAHANA CHECKING

## 1. Tujuan
Menyediakan direktori informasi publik usaha/properti di Bali dan area dashboard demonstrasi untuk alur pengelolaan serta pemeriksaan usaha.

## 2. Pengguna dan area
- Publik/wisatawan: mencari informasi umum usaha.
- Petugas/penguji: mengelola data contoh dalam dashboard lokal.

## 3. Kategori
- Accommodation: hotel, villa, resort, guest house.
- Restaurant: restoran, cafe, tempat makan.
- Mall: pusat perbelanjaan.
Mall management dan tenant harus menjadi entitas usaha terpisah. Verifikasi mall tidak otomatis memverifikasi tenant.

## 4. Fitur publik
Katalog, pencarian nama/lokasi, filter kategori, sorting, detail, deskripsi, fasilitas, kontak dan website publik. Informasi internal pemeriksaan, pajak dan dokumen rahasia tidak ditampilkan.

## 5. Fitur dashboard simulasi
CRUD, statistik, status pemeriksaan, riwayat aktivitas, laporan ringkas, export CSV/JSON, import JSON tervalidasi.

## 6. Model data
`id`, `name`, `category`, `location`, `status`, `description`, `facilities[]`, `phone`, `website`, `parentMallId`, `publicInfoStatus`.

## 7. Status
Not Checked, Under Review, Needs Follow-up, Completed. Status adalah status alur kerja, bukan keputusan legal/ilegal atau kepatuhan pajak. Status informasi publik: Available, Not Found, Needs Review; Not Found tidak berarti ilegal atau menunggak pajak.

## 8. Batasan
Frontend only; Vite + Vanilla JS + CSS; LocalStorage demo. Tidak ada backend, login palsu, integrasi OSS/pemerintah, data pajak nyata, atau dokumen rahasia.

## 9. Acceptance criteria
- Tiga kategori tampil dan dapat difilter.
- Search bekerja untuk nama/lokasi.
- Detail usaha dapat dibuka.
- Dashboard CRUD memperbarui katalog dan statistik.
- Data bertahan setelah refresh melalui LocalStorage.
- Import invalid ditolak.
- Input ditampilkan aman sebagai teks.
- Unit test dan build dapat dijalankan.
- Website responsif pada lebar 390px.
