---
title: "Perbedaan map(), forEach(), dan reduce() di JavaScript"
date: 2026-07-15
description: "Panduan singkat kapan harus menggunakan map, forEach, atau reduce saat memanipulasi array di JavaScript."
draft: false
author: "Reza Ramdan Permana"
tags: ["javascript", "frontend", "web-development"]
---

Sering bingung kapan harus pakai `map`, `forEach`, atau `reduce`? Hari ini saya merangkum perbedaan utamanya agar tidak salah pakai lagi.

## 1. forEach()
Gunakan ketika: **Hanya ingin melakukan looping** tanpa perlu mengembalikan nilai baru.
- **Return value:** `undefined`
- **Contoh:** Mengirim data ke API atau logging console.

```javascript
const numbers = [1, 2, 3];
numbers.forEach(num => console.log(num));
// Output: 1, 2, 3 (tidak ada array baru)

2. map()
Gunakan ketika: Ingin mengubah setiap elemen dalam array dan mendapatkan array baru dengan panjang yang sama.

Return value: Array baru
Contoh: Mengubah array ID menjadi array URL.
const ids = [1, 2, 3];
const urls = ids.map(id => `https://api.site.com/users/${id}`);
// Output: ["https://...", "https://...", "https://..."]

3. reduce()
Gunakan ketika: Ingin mengubah array menjadi satu nilai tunggal (bisa angka, string, atau objek).

Return value: Satu nilai (akumulator)
Contoh: Menjumlahkan total harga keranjang belanja.
const prices = [10000, 20000, 30000];
const total = prices.reduce((acc, curr) => acc + curr, 0);
// Output: 60000

Kesimpulan Singkat
Butuh looping biasa? 👉 forEach
Butuh array baru? 👉 map
Butuh satu nilai akhir? 👉 reduce