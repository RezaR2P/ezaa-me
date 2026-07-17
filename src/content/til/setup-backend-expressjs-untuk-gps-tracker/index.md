---
title: "Setup Backend Express.js untuk IoT GPS Tracker"
date: 2026-07-17
description: "Setup Backend dengan express js untuk project iot gps tracker"
draft: false
author: "Reza"
tags: ["iot", "esp32", "gps-tracker", "backend", "express", "socket.io"]
---

Hari ini saya belajar cara membangun arsitektur backend menggunakan **Express.js** yang terintegrasi dengan database **MySQL** dan **WebSockets (Socket.io)**. Backend ini dirancang untuk menerima data koordinat secara _real-time_ dari perangkat ESP32, menyimpannya ke database, dan meneruskannya langsung ke aplikasi web frontend.

## 1. Inisialisasi Projek & Struktur Folder

Langkah awal adalah membuat folder projek, masuk ke dalamnya melalui terminal, lalu jalankan perintah berikut untuk membuat file `package.json` secara otomatis:

```bash
npm init -y
```

### Struktur Folder (Arsitektur MVC)

Untuk menjaga kode tetap rapi dan mudah dirawat, buat struktur folder seperti di bawah ini. File utama `server.js` diletakkan di _root_ (luar), sedangkan folder modul lainnya dimasukkan ke dalam folder `src`:

```
gps-track-backend/
├── node_modules/
├── src/
│ ├── config/ # Tempat konfigurasi database (MySQL)
│ ├── controllers/ # Tempat logika bisnis dan fungsi utama
│ ├── middleware/ # Tempat fungsi perantara (misalnya untuk Auth)
│ ├── models/ # Tempat query database (SQL)
│ └── routes/ # Tempat mendefinisikan endpoint/rute API
├── .env # Tempat menyimpan konfigurasi sensitif (Secret)
├── .gitignore # Mengabaikan folder node_modules dan file .env saat push ke GitHub
├── package.json
└── server.js # Gerbang utama aplikasi (Root)
```

## 2. Instalasi Dependensi

Instal semua library yang diperlukan untuk mendukung fungsionalitas REST API, koneksi database, dan komunikasi real-time:

### Dependensi Utama (Production)

```bash

npm install express mysql2 dotenv cors body-parser socket.io

```

- **`express`**: Framework minimalis untuk membangun server dan REST API di Node.js.
- **`mysql2`**: Driver untuk menghubungkan dan menjalankan query ke database MySQL.
- **`dotenv`**: Mengamankan data sensitif seperti _credentials_ database dengan menyimpannya di file `.env` agar tidak bocor ke GitHub.
- **`cors`**: Mengizinkan frontend (Web/Mobile) mengakses API backend tanpa terblokir oleh kebijakan keamanan browser.
- **`body-parser`**: Middleware untuk membaca data kiriman dari luar. Sangat penting agar Express bisa membaca data JSON berisi koordinat `latitude` dan `longitude` yang dikirim oleh ESP32 melalui perintah `app.use(bodyParser.json())`.
- **`socket.io`**: Library berbasis WebSockets untuk mengirimkan data secara dua arah (real-time) ke browser tanpa perlu menekan tombol _refresh_.

### Dependensi Pengembangan (Development)

```bash
npm install --save-dev nodemon
```

- **`nodemon`**: Alat bantu untuk memantau perubahan kode. Server akan otomatis melakukan _restart_ setiap kali ada file yang disimpan, sehingga tidak perlu mematikan server manual dengan `Ctrl + C`.

## 3. Konfigurasi `package.json`

Buka file `package.json` di root projek, pastikan properti `"main"` diarahkan ke file utama (`server.js`), lalu tambahkan script `"dev"` di dalam objek `"scripts"` untuk menjalankan nodemon:

```json
{
  "name": "gps-track-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

Untuk menjalankan server dalam mode pengembangan, sekarang cukup ketik perintah berikut di terminal:

```bash
npm run dev
```

## 4. Gambaran Alur Kode pada `server.js`

Berikut adalah kerangka dasar file `server.js` sebagai pondasi utama yang menyatukan Express, Body-Parser, dan Socket.io:

```js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").createServer(app);

// Setup Socket.io dengan konfigurasi CORS
const io = require("socket.io")(http, {
  cors: { origin: "*" },
});

// Middleware Global
app.use(cors());
app.use(bodyParser.json()); // Mengizinkan pembacaan format JSON dari ESP32

// Mendengarkan koneksi WebSocket dari aplikasi web frontend
io.on("connection", (socket) => {
  console.log("Aplikasi web frontend terhubung ke WebSocket");
});

// Endpoint Dummy: Simulasi menerima data dari ESP32
app.post("/api/gps", (req, res) => {
  const { latitude, longitude } = req.body;
  console.log(
    `Menerima koordinat dari ESP32 -> Lat: ${latitude}, Lng: ${longitude}`,
  );

  // Melempar data koordinat secara real-time ke frontend lewat WebSocket
  io.emit("locationUpdate", { latitude, longitude });
  res.status(200).json({ message: "Data koordinat berhasil diproses" });
});

// Jalankan Server menggunakan instance HTTP (wajib jika menggunakan Socket.io)
const PORT = process.env.PORT || 5000;

http.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
```
