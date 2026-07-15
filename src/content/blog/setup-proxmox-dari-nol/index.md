---
title: "Cara Setup Proxmox VE dari Nol di ThinkPad X270"
date: 2026-06-17
description: "Panduan lengkap instalasi dan konfigurasi awal Proxmox VE 9 di laptop ThinkPad X270 untuk homelab."
tags: ["proxmox", "homelab", "linux", "devops"]
draft: false
author: "Reza Ramdan Permana"
---

## Latar Belakang

Saya ingin menjadikan ThinkPad X270 lama saya sebagai server homelab. Setelah riset, Proxmox VE adalah pilihan yang tepat karena bisa menjalankan VM dan Container sekaligus dengan antarmuka web yang mudah digunakan.

## Persiapan

Sebelum install, ada beberapa hal yang perlu disiapkan:

- USB minimal 8GB
- Kabel ethernet (LAN) — wajib, jangan pakai WiFi
- ISO Proxmox VE dari proxmox.com/downloads

## Setting BIOS

Masuk BIOS dengan tekan F1 saat booting, lalu aktifkan:

- Intel VT-x Technology → Enabled
- Intel VT-d Feature → Enabled
- Boot Order → USB pertama
- Secure Boot → Disabled

## Instalasi

Setelah boot dari USB, ikuti wizard installer. Yang perlu diperhatikan:

1. Pilih **"Install Proxmox VE (Graphical)"**
2. Target disk → pilih SSD
3. Timezone → Asia/Jakarta
4. Set password root yang kuat

## Konfigurasi Awal Setelah Install

Hal pertama yang harus dilakukan adalah menonaktifkan repository enterprise yang butuh lisensi berbayar:

```bash
echo "# disabled" > /etc/apt/sources.list.d/pve-enterprise.list
echo "# disabled" > /etc/apt/sources.list.d/pve-enterprise.sources
echo "deb http://download.proxmox.com/debian/pve trixie pve-no-subscription" > /etc/apt/sources.list.d/pve-no-subscription.list
apt update && apt dist-upgrade -y
```

## Hasil

Setelah semua konfigurasi selesai, Proxmox sudah bisa diakses di `https://192.168.1.x:8006` dan siap untuk membuat VM pertama.
