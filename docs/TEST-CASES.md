# TEST CASE MANUAL

| ID | Skenario | Langkah | Hasil yang diharapkan |
|---|---|---|---|
| TC01 | Katalog | Buka halaman awal | Data contoh tampil |
| TC02 | Filter | Pilih Restaurant | Hanya restoran tampil |
| TC03 | Search | Cari Ubud | Usaha terkait lokasi/nama tampil |
| TC04 | Empty state | Cari string acak | Pesan tidak ditemukan tampil |
| TC05 | Detail | Klik Lihat informasi | Detail usaha tampil |
| TC06 | Dashboard | Buka Government Dashboard | Banner simulasi terlihat |
| TC07 | CRUD | Tambah usaha valid | Record dan statistik berubah |
| TC08 | Validasi | Simpan nama kosong | Ditolak |
| TC09 | Edit | Ubah deskripsi | Perubahan tersimpan |
| TC10 | Hapus | Hapus record demo | Konfirmasi tampil |
| TC11 | Persistensi | Refresh browser | Data demo tetap ada |
| TC12 | Import invalid | Impor JSON rusak | Ditolak tanpa crash |
| TC13 | Export | Klik Export JSON/CSV | File diunduh |
| TC14 | XSS | Masukkan string uji XSS | Tampil sebagai teks |
| TC15 | Mobile | Viewport 390px | Tidak ada scroll horizontal |
