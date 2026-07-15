---
title: "Mengoptimalkan Image Docker dengan Multi-Stage Builds"
date: 2026-07-14
description: "Cara mengurangi ukuran image Docker hingga 80% menggunakan teknik multi-stage build untuk aplikasi Node.js."
draft: false
author: "Reza Ramdan Permana"
tags: ["docker", "optimization", "nodejs", "devops"]
---

Hari ini saya belajar cara mengecilkan ukuran image Docker yang sebelumnya membengkak hingga 1GB lebih. Masalahnya terjadi karena image produksi ikut membawa `node_modules` untuk development dan source code yang tidak perlu.

## Solusi: Multi-Stage Build

Teknik ini memungkinkan kita menggunakan satu image untuk proses _build_ (yang berat), dan image lain yang lebih ringan untuk hasil akhirnya.

### Dockerfile Sebelum (Boros)

```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "server.js"]
# Ukuran image: ~1.1 GB

Dockerfile Sesudah (Optimal)
# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/server.js"]
# Ukuran image: ~180 MB

Hasil
Ukuran image turun drastis dari 1.1 GB menjadi hanya 180 MB. Ini mempercepat proses deploy dan menghemat bandwidth server secara signifikan.

Catatan: Pastikan output build Anda ada di folder dist sesuai konfigurasi project.
```
