---
title: "Belajar Astro dari Nol untuk Bikin Blog Developer"
date: 2026-07-01
description: "Pengalaman pertama saya belajar Astro sebagai framework untuk membangun portofolio dan blog pribadi."
tags: ["astro", "webdev", "javascript"]
draft: false
author: "Reza"
---

## Kenapa Astro?

Sebelumnya saya hanya kenal React dan Vite. Tapi untuk blog dan portofolio, React terasa terlalu berat — saya harus setup router sendiri, tidak ada dukungan Markdown bawaan, dan hasilnya banyak JavaScript yang tidak perlu dikirim ke browser.

Astro menawarkan pendekatan berbeda — **ship zero JavaScript by default**. Halaman statis hanya berisi HTML dan CSS murni, tanpa JavaScript kecuali memang dibutuhkan.

## Perbedaan Astro dengan React

Yang paling saya rasakan langsung:

- **Routing berbasis file** — buat file `about.astro` di folder `pages/`, otomatis jadi halaman `/about`. Tidak perlu setup router manual.
- **Markdown sebagai halaman** — tulis artikel dalam format `.md`, Astro langsung jadikan halaman HTML.
- **Content Collections** — sistem untuk mengelola konten Markdown dengan validasi schema menggunakan Zod.

## Content Collections

Ini fitur yang paling berguna untuk blog. Dengan mendefinisikan schema di `src/content.config.ts`, setiap artikel yang saya tulis akan divalidasi — kalau lupa isi judul atau tanggal, VS Code langsung kasih error.

```typescript
const blog = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      description: z.string(),
    }),
});
```

## Kesimpulan

Untuk blog dan portofolio developer, Astro adalah pilihan yang tepat. Lebih simpel dari React untuk kasus konten statis, tapi tetap fleksibel kalau nanti butuh interaktivitas.
