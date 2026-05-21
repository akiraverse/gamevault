# 🎮 GameVault

Platform katalog game modern untuk para gamer Indonesia — temukan game baru, baca detailnya, dan simpan wishlist kamu.

---

## 📦 Cara Menjalankan Project Secara Lokal

### Prerequisites

Pastikan sudah terinstall di mesin kamu:

- **Node.js** v18 ke atas
- **npm** atau **yarn**

### Langkah Instalasi

```bash
# 1. Clone repository
git clone https://github.com/username/gamevault.git
cd gamevault

# 2. Install dependencies
npm install
# atau
yarn install

# 3. Jalankan development server
npm run dev
# atau
yarn dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser kamu.

### Build untuk Production

```bash
npm run build
npm run start
```

---

## 🛠️ Tech Stack & Alasan Pemilihan

| Teknologi | Versi | Alasan Pemilihan |
|---|---|---|
| **Next.js** (App Router) | 14+ | Framework utama. Alasan personal menggunakan ini karena sudah cenderung lebih mature dibanding SvelteKit |
| **TypeScript** | 5+ | sifat nya yang type safe dan dapat melihat bug ketika compilation |
| **Tailwind CSS** | 3+ | Kebebasan dalam menggunakan styling karena konsep utility-first CSS memungkinkan styling cepat langsung di JSX tanpa context switching ke file `.css` terpisah |
| **Lucide React** | Latest | Icon library yang ringan, tree-shakable, dan konsisten secara visual |
| **Custom Hook + localStorage** | — | Untuk state management. Localstoraing untuk memasukkan data di browser tanpa perlu backend |
| **ESLint** | — | Untuk konsistensi kode dan menangkap potensi bug sejak development |


---

## 📁 Struktur Folder

```
gamevault/
├── public/                    # Static assets (favicon, dll)
├── src/
│   ├── app/                   # App Router — routing berbasis folder
│   │   ├── games/
│   │   │   └── page.tsx
│   │   │   └── loading.tsx
│   │   │   └── [slug]/        # Dynamic route halaman detail game
│   │   │       ├── loading.tsx
│   │   │       ├── not-found.tsx
│   │   │       └── page.tsx
│   │   ├── wishlist/          # Halaman wishlist
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout (Navbar, dll)
│   │   ├── loading.tsx        # Loading state homepage
│   │   ├── not-found.tsx      # Global 404 page
│   │   └── page.tsx           # Homepage (/)
│   ├── components/            # Reusable UI components
│   │   ├── Card.tsx           # Game card untuk grid list
│   │   ├── LoadingSpinner.tsx # Komponen loading state
│   │   ├── Navbar.tsx         # Navigasi global
│   │   ├── NotFoundPage.tsx   # Komponen tampilan 404
│   │   └── SlidingBanner.tsx  # Hero/banner carousel homepage
│   ├── data/
│   │   └── games.json         # Data dummy 30+ game
│   ├── types/
│   │   └── IGameInfo.ts       # TypeScript interface untuk data game
│   └── utils/
│       └── wishlist.ts        # Custom hook wishlist (localStorage)
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## ✅ Daftar Fitur

### Sudah Selesai


- [x] **Homepage (`/`)** — Hero banner (`SlidingBanner.tsx`) untuk game `featured: true`, grid list semua game
- [x] **Halaman List Games (`/games`)** — List of games ditambah dengan fitur search, filter, dan sort
- [x] **Halaman Detail Game (`/games/[slug]`)** — Dynamic routing per game, halaman detail lengkap
- [x] **Halaman Wishlist (`/wishlist`)** — Menampilkan game yang disimpan user
- [x] **Wishlist persistence** — Data disimpan via `localStorage`, tidak perlu login
- [x] **Loading state** — `loading.tsx` di setiap route level + `LoadingSpinner` component
- [x] **404 Page** — `not-found.tsx` global + per halaman detail game (`/games/[slug]`)
- [x] **Navbar** — Navigasi global antar halaman
- [x] **TypeScript** — Interface `IGameInfo` untuk type safety data game
- [x] **Data dummy** — `games.json` sebagai sumber data statis
- [x] **Responsive layout** — Menggunakan Tailwind CSS utility classes

### Belum / Perlu Dikerjakan

- [ ] **Pagination / infinite scroll** — Belum ada untuk list game
- [ ] **Empty state** — UI untuk wishlist kosong dan hasil search nol
- [ ] **Image optimization** — Perlu memastikan `next/image` digunakan (bukan `<img>` biasa)

---

## ⚖️ Catatan Trade-off & Kendala

### 1. Data Statis vs. API
Keputusan: Data game disimpan sebagai `games.json` statis  
Trade-off: Hal ini membuat mudah dan cepat diimplementasi, namun tidak scalable. Selanjutnya, akan lebih baik juga diganti dengan API yang terhubung ke database

### 2. localStorage untuk Wishlist

Keputusan: Wishlist disimpan di `localStorage` browser tanpa backend
Trade-off: User tidak perlu login, implementasi cepat, tapi wishlist tidak bisa diakses dari perangkat lain atau browser berbeda. Sehingga solusi selanjutnya bisa menggunakan autentikasi + database

### 3. Client-side Filtering
Keputusan: Search dan filter dilakukan di sisi client (bukan server)
Trade-off: Dengan 30 entri data, performa tidak jadi masalah. Namun jika data berkembang ke ribuan game, pendekatan ini akan menjadi sangat lambat

### 4. Responsive Design
Kendala: Menentukan ukuran komponen yang konsisten dan estetik di berbagai ukuran layar terbukti menjadi salah satu tantangan terbesar dalam project ini.
Pendekatan awal: Menggunakan unit vw dan vh agar sizing mengikuti ukuran viewport secara dinamis.
Masalah yang ditemukan: Meski responsif terhadap perubahan layar, hasil visualnya tidak selalu sesuai ekspektasi — proporsi elemen terasa "off" di beberapa resolusi, dan kontrol terhadap tampilan akhir menjadi sulit diprediksi.
Keputusan akhir: Beberapa elemen beralih ke nilai fixed (px) untuk menjaga konsistensi visual dan keterbacaan layout.
Trade-off: Fixed sizing lebih mudah dikontrol secara estetik, tapi kurang fleksibel di layar yang sangat kecil atau sangat besar.

---

## 🚀 Deploy

> *(Akan diupdate setelah deployment selesai)*

Live demo: `https://gamevault-xxx.vercel.app`

---