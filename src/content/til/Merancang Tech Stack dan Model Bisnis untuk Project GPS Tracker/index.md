---
title: "Merancang Tech Stack dan Model Bisnis untuk Project GPS Tracker"
date: 2026-07-16
description: "Catatan riset soal dropshipping vs bikin produk sendiri, sampai keputusan tech stack untuk project GPS tracker berbasis ESP32 + NEO-6M."
draft: false
author: "Reza"
tags: ["iot", "esp32", "gps-tracker", "backend", "business", "express", "react"]
---

## Konteks

Hari ini mulai dari mencari info soal dropshipping (riset niche, supplier, platform jualan, marketing), lalu belok ke ide melanjutkan project pribadi yang belum selesai: **GPS tracker untuk mobil/motor** berbasis ESP32 + GPS module NEO-6M yang nempel ke aki. Endingnya jadi sesi perencanaan bisnis + tech stack buat project ini.

## Insight Dropshipping (buat referensi nanti)

- **Jangan ambil barang dari Shopee lalu jual lagi di Shopee** — harga gampang dibandingkan langsung sama pembeli. Solusinya: bundling produk, atau jual di platform beda dari tempat ambil barang (misal ambil dari Shopee, jual di TikTok Shop).
- Shopee Ads pakai sistem **CPC (cost per click)** dengan **budget harian sebagai limit**, bukan biaya flat per hari — jadi kalau nggak ada yang klik, nggak ada biaya keluar, tapi kalau banyak klik dan zero closing, budget tetap habis.
- Per Mei 2026, biaya layanan Gratis Ongkir Xtra Shopee naik jadi 8% (kategori biasa) / 9,5% (kategori khusus), dan mulai Juni 2026 ada kewajiban seller ikut menanggung ongkir retur (maks Rp5.000/arah).

## Keputusan: Bikin Produk Sendiri (GPS Tracker) Lebih Menjanjikan

Dibanding dropship barang generik, bikin GPS tracker sendiri punya keunggulan:

- Produk unik → nggak gampang dibandingkan harga secara langsung
- Bisa pakai model **subscription** (harga alat + biaya langganan bulanan buat akses dashboard) → ada **recurring revenue**, bukan cuma untung sekali per transaksi

## Pertimbangan Teknis Hardware

- ESP32 nggak punya modul cellular, wajib ditambah modul GSM/4G. Ini harus diriset lagi demi menekan budget dan memastikan alat bisa terpakai dalam jangka waktu yang lama.
- Kalau daya diambil dari aki mobil (12V, bisa naik ke ~14.4V saat alternator ngecas), wajib pakai **buck converter** ke 5V/3.3V, plus proteksi: fuse inline, dioda anti reverse-polarity, dan idealnya low-voltage cutoff biar aki nggak tekor kalau device dipasang "always-on".
- Kartu SIM bisa menggunakan provider seperti 3 (AON) atau by.U untuk paket kuota yang hemat dan masa aktif panjang.

## Keputusan Tech Stack

Berikut adalah rincian teknologi yang dipilih beserta alasan penerapannya:

- **Firmware (ESP32): PlatformIO + TinyGPS++ + TinyGSM + ArduinoJson**

- **Backend API: Express.js + MySQL (raw `mysql2`) + JWT (auth user) + device token (auth ESP32)**

- **Realtime: Socket.io**
  Berfungsi untuk broadcast lokasi baru ke dashboard seketika setelah device mengirimkan data koordinat. Logika realtime diletakkan di layer komunikasi, bukan pada database.

- **Web Dashboard: React + Vite + react-leaflet**

- **Mobile App: React Native via Expo**

## Estimasi Modal Produksi (Per Unit)

Berikut adalah perkiraan biaya modal awal untuk perakitan hardware per unit (harga dapat berubah tergantung supplier dan negosiasi kuantitas):

- **ESP32 Devkit:** Kisaran Rp40.000 - Rp60.000
- **GPS Module (NEO-6M):** Kisaran Rp45.000 - Rp65.000
- **Modul 4G/GSM (SIM7600/A7670, atau SIM800L):** Kisaran Rp150.000 - Rp300.000 _(Catatan: SIM800L lebih murah namun masih berbasis 2G)_
- **Buck Converter (12V ke 5V):** Kisaran Rp10.000 - Rp20.000
- **Komponen Proteksi (Fuse, dioda, kabel, konektor):** Kisaran Rp15.000 - Rp25.000
- **Casing Pelindung (Waterproof box):** Kisaran Rp20.000 - Rp50.000
- **SIM Card + Aktivasi Paket:** Kisaran Rp15.000 - Rp30.000

**Total Estimasi Modal per Unit (Rakitan Manual):** Sekitar Rp300.000 - Rp550.000

## Next Steps

- [ ] Melakukan wiring fisik antara ESP32, NEO-6M, dan modul GSM/4G, lalu menguji pengiriman data dummy ke endpoint lokal.
- [ ] Membuat endpoint backend `POST /api/devices/location` beserta perancangan skema tabel database `devices` dan `locations`.
- [ ] Setup server Socket.io minimal untuk keperluan broadcast realtime ke satu client dashboard sebagai tahap awal testing.
- [ ] Melakukan riset mendalam mengenai harga modal komponen dalam jumlah grosir serta finalisasi skema biaya langganan (subscription).
