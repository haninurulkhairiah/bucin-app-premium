<div align="center">
  <h1>💖 Bucin App</h1>
  <p><em>Aplikasi web romantis spesial untuk orang tersayang, dilengkapi dengan berbagai fitur interaktif dan tampilan yang elegan.</em></p>
</div>

<br>

## ✨ Fitur Utama

- **🎨 Desain Premium & Responsif:** Tampilan modern bergaya *Glassmorphism* dengan animasi halus (particle, hover effects) yang menyesuaikan dengan semua ukuran layar (HP, Tablet, maupun Laptop).
- **🌍 Multi-Bahasa Otomatis:** Terintegrasi langsung dengan **Google Translate API**. Pengguna dapat menerjemahkan seluruh halaman ke dalam 5 bahasa (Indonesia, Inggris, Jepang, Korea, Prancis) hanya dengan satu klik!
- **🌓 Mode Tampilan (Dark/Light):** Dilengkapi dengan fitur Pengaturan Tema (Otomatis menyesuaikan sistem, Mode Terang, dan Mode Gelap).
- **🕌 Jadwal Sholat Real-time:** Fitur Islami tersembunyi di pengaturan yang menampilkan jadwal sholat sangat presisi berdasarkan lokasi GPS pengguna (terintegrasi dengan Aladhan API Kemenag RI v3).
- **🎵 Pemutar Musik Romantis:** Musik latar yang akan otomatis berputar (autoplay) untuk membangun suasana (*browser-policy friendly*).
- **📸 Galeri Foto Interaktif:** Kumpulan kenangan foto dengan efek transisi menarik.
- **💬 Papan Pesan Real-time:** Terintegrasi dengan database **Firebase Firestore** mode produksi, memungkinkan pengunjung untuk meninggalkan pesan atau komentar yang akan tersimpan selamanya secara *real-time*.

## 🚀 Cara Penggunaan

1. **Persiapan File:**
   Aplikasi ini sangat simpel dan tidak memerlukan instalasi Node.js atau *build tools*. Pastikan kamu memiliki file berikut dalam satu folder yang sama:
   - `index.html`
   - `style.css`
   - `app.js`
   - File foto (`couple.jpg`, `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, `photo4.jpg`, `photo5.jpg`)
   - File musik (`Nadhif Basalamah - bergema sampai selamanya.mp3`)

2. **Menjalankan di Lokal:**
   - Cukup buka file `index.html` menggunakan browser favoritmu (disarankan menggunakan ekstensi seperti **Live Server** di VSCode untuk pengalaman terbaik).

3. **Deploy ke Internet (GitHub Pages / Vercel / Netlify):**
   - Upload (push) seluruh isi folder ke repository GitHub.
   - Aktifkan fitur GitHub Pages, atau sambungkan repository ke Vercel/Netlify.
   - Website romantismu siap dibagikan ke si dia!

## 🔧 Konfigurasi Firebase (Untuk Fitur Pesan)

Secara bawaan, aplikasi ini siap digunakan. Namun jika kamu ingin menggunakan database milikmu sendiri untuk menampung pesan, ubah bagian ini di `app.js`:

```javascript
const firebaseConfig = {
    apiKey:            "API_KEY_ANDA",
    authDomain:        "PROJECT_ID.firebaseapp.com",
    projectId:         "PROJECT_ID",
    storageBucket:     "PROJECT_ID.appspot.com",
    messagingSenderId: "MESSAGING_SENDER_ID",
    appId:             "APP_ID"
};
```
Pastikan aturan Firestore (Database Rules) sudah diatur sesuai standar produksi agar aman dari spam.

## 👨‍💻 Hak Cipta & Kreator
Dibuat oleh: **SukaCoding** 
© Hanif 2026 - All rights reserved.- **🎵 Pemutar Musik Romantis:** Musik latar yang akan otomatis berputar (autoplay) untuk membangun suasana (*browser-policy friendly*).
- **📸 Galeri Foto Interaktif:** Kumpulan kenangan foto dengan efek transisi menarik.
- **💬 Papan Pesan Real-time:** Terintegrasi dengan database **Firebase Firestore** mode produksi, memungkinkan pengunjung untuk meninggalkan pesan atau komentar yang akan tersimpan selamanya secara *real-time*.

## 🚀 Cara Penggunaan

1. **Persiapan File:**
   Aplikasi ini sangat simpel dan tidak memerlukan instalasi Node.js atau *build tools*. Pastikan kamu memiliki file berikut dalam satu folder yang sama:
   - `index.html`
   - `style.css`
   - `app.js`
   - File foto (`couple.jpg`, `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, `photo4.jpg`, `photo5.jpg`)
   - File musik (`Nadhif Basalamah - bergema sampai selamanya.mp3`)

2. **Menjalankan di Lokal:**
   - Cukup buka file `index.html` menggunakan browser favoritmu (disarankan menggunakan ekstensi seperti **Live Server** di VSCode untuk pengalaman terbaik).

3. **Deploy ke Internet (GitHub Pages / Vercel / Netlify):**
   - Upload (push) seluruh isi folder ke repository GitHub.
   - Aktifkan fitur GitHub Pages, atau sambungkan repository ke Vercel/Netlify.
   - Website romantismu siap dibagikan ke si dia!

## 🔧 Konfigurasi Firebase (Untuk Fitur Pesan)

Secara bawaan, aplikasi ini siap digunakan. Namun jika kamu ingin menggunakan database milikmu sendiri untuk menampung pesan, ubah bagian ini di `app.js`:

```javascript
const firebaseConfig = {
    apiKey:            "API_KEY_ANDA",
    authDomain:        "PROJECT_ID.firebaseapp.com",
    projectId:         "PROJECT_ID",
    storageBucket:     "PROJECT_ID.appspot.com",
    messagingSenderId: "MESSAGING_SENDER_ID",
    appId:             "APP_ID"
};
```
Pastikan aturan Firestore (Database Rules) sudah diatur sesuai standar produksi agar aman dari spam.

## 👨‍💻 Hak Cipta & Kreator
Dibuat oleh: SukaCoding 
© Hanif 2026 - All rights reserved.
