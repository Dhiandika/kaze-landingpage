# Technical Documentation - Kaze Kreativ

## 5. Perencanaan Teknis Website (Tech Plan)

### Tech Stack Recommendation
Kami merekomendasikan stack modern yang performant, SEO-friendly, dan scalable.

- **Frontend Framework**: **Next.js 14+ (App Router)**.
  - *Alasan*: Server-Side Rendering (SSR) sangat krusial untuk SEO landing page. Performa tinggi dan ekosistem React yang luas.
- **Styling**: **Tailwind CSS**.
  - *Alasan*: Pengembangan cepat, file size kecil (utility-first), mudah kustomisasi desain unik.
- **Language**: **TypeScript**.
  - *Alasan*: Type safety meminimalisir bug, kode lebih mudah dimaintain jangka panjang.
- **Animation**: **Framer Motion**.
  - *Alasan*: Library animasi standar industri untuk React, mudah membuat micro-interactions halus.
- **Hosting**: **Vercel**.
  - *Alasan*: Native support untuk Next.js, global CDN, HTTPS otomatis, setup CI/CD zero-config.

### Integrasi
- **Contact Form**: **Web3Forms** atau **Formspree** (Free tier cukup untuk awal).
  - *Alternatif*: Integrasi langsung ke API WhatsApp (klik tombol langsung buka WA).
- **Analytics**: **Google Analytics 4 (GA4)** via `@next/third-parties/google`.
- **SEO**: Built-in Next.js Metadata API.

---

## 6. Technical Documentation (Untuk Developer)

### 6.1 Tech Stack Overview
- **Core**: Next.js (React), TypeScript.
- **Style**: Tailwind CSS, Lucide React (Icons).
- **Motion**: Framer Motion.
- **Package Manager**: pnpm / npm.

### 6.2 Arsitektur Frontend
Website ini adalah **Single Page Application (SPA)** secara UX, namun di-render secara **Server-Side (SSR)** atau **Static Site Generation (SSG)** untuk performa.
- Semua section (Hero, About, Services) adalah komponen terpisah yang dimuat di `page.tsx` utama.
- Navigasi menggunakan *anchor link* (`#services`, `#contact`) dengan smooth scroll.

### 6.3 Struktur Folder & File Utama
```
kaze-landingpage/
├── app/
│   ├── layout.tsx       # Root layout (HTML/Body, Fonts, Metadata)
│   ├── page.tsx         # Halaman utama (Landing Page)
│   └── globals.css      # Tailwind directives & global styles
├── components/
│   ├── ui/              # Reusable basic components (Button, Card, Input)
│   ├── sections/        # Section components
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Portfolio.tsx
│   │   └── Contact.tsx
│   └── layout/          # Navbar, Footer
├── public/              # Static assets (images, icons)
├── lib/                 # Utility functions, constants
└── tailwind.config.ts   # Design system config (colors, fonts)
```

### 6.4 Cara Setup & Menjalankan Project

1. **Clone Repository**
   ```bash
   git clone <repo-url>
   cd kaze-landingpage
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # atau
   pnpm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Buka `http://localhost:3000` di browser.

4. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

### 6.5 Standar Kode & Konvensi
- **Component Name**: PascalCase (e.g., `HeroSection.tsx`).
- **Function Name**: camelCase.
- **Styling**: Gunakan Tailwind utility classes. Hindari CSS module kecuali terpaksa.
- **Responsiveness**: Mobile-first approach. Tulis class mobile dulu, baru breakpoint (e.g., `w-full md:w-1/2`).
- **Commits**: Gunakan Conventional Commits (e.g., `feat: add hero section`, `fix: mobile padding`).

### 6.6 Integrasi Pihak Ketiga
- **Google Analytics**:
  Tambahkan ID GA4 di `.env.local`: `NEXT_PUBLIC_GA_ID=G-XXXXXXXX`.
  Load di `layout.tsx` menggunakan komponen `<GoogleAnalytics />`.
- **WhatsApp Link**:
  Gunakan format `https://wa.me/628XXXXXXXXXX?text=Halo%20Kaze%20Kreativ...`.

### 6.7 Checklist Performance & SEO
- [ ] **Images**: Gunakan komponen `<Image />` dari Next.js untuk otomatis lazy load & resize.
- [ ] **Fonts**: Gunakan `next/font` untuk self-hosting Google Fonts (tanpa request eksternal).
- [ ] **Metadata**: Isi `title`, `description`, `openGraph` di `layout.tsx` atau `page.tsx`.
- [ ] **Lighthouse Score**: Targetkan score > 90 untuk Performance, Accessibility, SEO.
