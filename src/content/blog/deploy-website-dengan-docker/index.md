---
title: "Deploy Website dengan Docker dan Cloudflare Tunnel"
date: 2026-06-29
description: "Cara deploy website portofolio ke homelab menggunakan Docker dan expose ke internet lewat Cloudflare Tunnel tanpa port forwarding."
tags: ["docker", "cloudflare", "devops", "homelab"]
draft: false
author: "Reza Ramdan Permana"
---

## Masalah yang Ingin Diselesaikan

Saya punya website portofolio yang jalan di VM Proxmox di rumah. Masalahnya — bagaimana cara agar website ini bisa diakses dari internet tanpa perlu port forwarding yang rumit, apalagi ISP rumahan sering memblokir port 80 dan 443.

## Solusi: Cloudflare Tunnel

Cloudflare Tunnel bekerja dengan cara berbeda dari port forwarding biasa. Alih-alih membuka port di router, VM kita yang aktif "menghubungi" server Cloudflare dari dalam. Hasilnya, tidak ada port yang perlu dibuka di router.

## Setup Docker

Pertama, buat `Dockerfile` untuk website Astro:

```dockerfile
FROM node:lts-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Setup Cloudflare Tunnel

Install cloudflared di VM:

```bash
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb -o cloudflared.deb
sudo dpkg -i cloudflared.deb
```

Login ke akun Cloudflare dan buat tunnel baru lewat dashboard Zero Trust.

## Hasil

Website sekarang bisa diakses dari manapun lewat `https://ezaa.me` tanpa perlu setting router sama sekali.
