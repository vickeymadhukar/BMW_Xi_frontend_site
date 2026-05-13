# BMW iX1 — Automotive Frontend Experience

A high-end, cinematic automotive landing page built for the **BMW iX1 M60**, featuring scroll-driven animations, a 126-frame image sequence video effect, an interactive 3D car configurator, and a premium glassmorphic UI — all crafted with React, GSAP, Three.js, and Tailwind CSS.

---

## ✨ Features

- **Hero Section** — Full-screen pinned hero with animated horizontal background typography, floating glassmorphic stat cards, and a smooth SVG notch transition
- **Showcase Section** — Split-layout dark section with GSAP scroll-triggered entrance animations and interactive GIF media cards
- **Scroll Video Section** — 126-frame canvas-rendered image sequence locked to scroll, with cinematic text overlays (ELECTRIC REVOLUTION) and performance stats that fade in at the climax
- **3D Model Configurator** — Interactive BMW X3 M40i GLB model centered on screen, rotatable via drag using an invisible `PresentationControls` box, with soft baked shadows and a full BMW configurator-style stats UI
- **Responsive Design** — Fully responsive across desktop, tablet, and mobile viewports
- **Performance Optimized** — Capped device pixel ratio, alpha-disabled canvas, baked contact shadows, and high-performance WebGL mode

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | Component framework |
| Vite | Build tool & dev server |
| Tailwind CSS | Utility-first styling |
| GSAP + ScrollTrigger | Scroll animations & pinned sequences |
| Three.js | 3D rendering engine |
| @react-three/fiber | React renderer for Three.js |
| @react-three/drei | 3D helpers (GLTF loader, shadows, controls) |
| Lucide React | Icon library |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm v9+

### Installation

```bash
# Clone the repository
git clone https://github.com/vickeymadhukar/BMW_Xi_frontend_site.git

# Navigate into the project
cd BMW_Xi_frontend_site

# Install dependencies
npm install --legacy-peer-deps
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
carwebsite/
├── public/
│   ├── bmw-x3-m40i/         # 3D GLB model + textures
│   ├── imageseq/            # 126 JPG frames for scroll video
│   ├── images/              # Static images & BMW logo
│   └── video/               # GIF & MP4 assets
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── HeroSection.jsx
│   │   ├── BackgroundTypography.jsx
│   │   ├── FloatingCards.jsx
│   │   ├── ShowcaseSection.jsx
│   │   ├── ScrollVideoSection.jsx
│   │   └── ModelSection.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 📸 Sections Overview

### Hero Section
Pinned full-screen section with scrolling background text, floating cards showing live BMW specs, and a cinematic notch transition into the dark showcase.

### Showcase Section
Dark, premium layout showcasing BMW's design and technology with hover-activated GIF media cards and GSAP-triggered entrance animations.

### Scroll Video Section
A 126-frame JPEG sequence rendered on HTML5 Canvas, synchronized to the scroll position via GSAP ScrollTrigger. The page is pinned for the entire duration. Performance stats and the "ELECTRIC REVOLUTION" title fade in at 70% completion.

### 3D Model Configurator
An interactive BMW iX1 M60 configurator UI powered by Three.js. Drag to rotate the car in 3D space. Features spring-physics snap-back animation, baked soft floor shadows, and a full glassmorphic stats dashboard.

---

## ⚡ Performance Notes

- Canvas DPR is capped at `1.5` to balance sharpness and GPU load
- `ContactShadows` uses `frames={1}` to bake shadows once on load
- WebGL context initialized with `powerPreference: "high-performance"`
- Image sequence uses `alpha: false` canvas context for faster 2D rendering

---

## 📄 License

This project is for educational and portfolio purposes only.  
BMW and all related trademarks belong to **Bayerische Motoren Werke AG**.

---

> Built with ❤️ by [Vickey Madhukar](https://github.com/vickeymadhukar)
