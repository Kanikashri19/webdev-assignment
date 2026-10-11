# ITZFIZZ — Scroll-Driven Hero Section Animation

A cinematic, high-performance scroll-driven hero section animation inspired by the [car-scroll-animation reference](https://paraschaturvedi.github.io/car-scroll-animation). Built with **React 18**, **Tailwind CSS**, and **GSAP ScrollTrigger**, featuring butter-smooth 60fps animations, letter-by-letter synchronized neon illumination, dynamic floating impact metric cards, real-time telemetry HUD, and synthetic Web Audio sound effects.

---

## 🔗 Links

- **Live Demo:** [https://Kanikashri19.github.io/car-scroll-animation/](https://Kanikashri19.github.io/car-scroll-animation/)
- **GitHub Repository:** [https://github.com/Kanikashri19/car-scroll-animation](https://github.com/Kanikashri19/car-scroll-animation)
- **Original Inspiration:** [https://paraschaturvedi.github.io/car-scroll-animation](https://paraschaturvedi.github.io/car-scroll-animation)

---

##  Key Features

### 1. Above-The-Fold Hero Section Layout
- **Letter-Spaced Headline:** `W E L C O M E   I T Z F I Z Z` rendered across the centerfold highway track with subtle base styling above the fold.
- **Top Bar & Brand Nav:** Sleek glassmorphism header displaying live FPS, pinned status, audio synthesizer toggle, and GitHub links.
- **McLaren 720S Supercar:** High-resolution top-view aerodynamic supercar staged on an asphalt raceway with lane dividers and curb kerbs.

### 2. Initial Load Cinematic Intro
- **Staggered Headline Reveal:** Headline letters fade and glide upward with smooth `power3.out` easing on initial load.
- **Engine Staging:** Vehicle glides smoothly into the staging grid with glowing green underlight.
- **Subtle Preview:** Teaser transitions for floating metric cards.

### 3. Scroll-Driven Core Animation (GSAP ScrollTrigger)
- **Pinned Track Viewport:** Virtual runway of `280vh` pinned seamlessly using GSAP ScrollTrigger.
- **Scrubbed Vehicle Travel:** Horizontal translation (`x`) scrubbed with smooth interpolation (`scrub: 0.8`), ensuring fluid motion without abrupt jumps.
- **Laser Tarmac Trail:** Dynamic emerald green trail (`#45db7d`) matching the car's wheel base with sub-pixel precision.
- **Letter Collision Illumination:** Coordinates of every letter in `W E L C O M E   I T Z F I Z Z` are monitored in real time. When the supercar passes each letter, it ignites into intense glowing neon white and emerald green. Reverse scroll cleanly deactivates them.
- **4 Floating Impact Metric Cards:**
  - `58%` — *Increase in pick up point use* (Volt Lime `#DEF54F`)
  - `23%` — *Decreased in customer phone calls* (Electric Cyan `#6AC9FF`)
  - `27%` — *Surge in fulfillment throughput* (Carbon Dark `#242424`)
  - `40%` — *Drop in dispatch turnaround time* (Flame Orange `#FA7328`)

### 4. Interactive Telemetry HUD & Engine Sound
- **Real-Time Speedometer:** Computes instantaneous velocity ($\Delta y / \Delta t$) up to 295 km/h.
- **Gearbox Indicator:** Simulates automatic gear shifts (`P` $\rightarrow$ `D1` to `D7`).
- **Native Web Audio Synthesizer:** Real-time harmonic frequency modulation based on velocity when audio is enabled.
- **Interactive Teleport Controls:** Quick-jump buttons (`0%`, `25%`, `50%`, `75%`, `100%`) and confetti celebration.

### 5. Motion & Performance Architecture
- **GPU-Accelerated Transforms:** All positional movements use `transform: translate3d()` and `scale()`.
- **Zero Layout Reflow:** Road dimensions and letter offsets are cached and updated only on window resize.
- **Responsive Design:** Fluid layout adapting across mobile, tablet, laptop, and ultra-wide displays.

---

##  Tech Stack

- **Framework:** React 18
- **Animation Engine:** GSAP 3.12 (with ScrollTrigger plugin)
- **Styling:** Tailwind CSS + Custom CSS Utilities
- **Build Tool:** Vite 6
- **Icons:** Lucide React
- **Audio:** Web Audio API (Synthesizer)
- **Deployment:** GitHub Pages (Automated GitHub Actions CI/CD)

---

## 💻 Local Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation
```bash
# Clone the repository
git clone https://github.com/Kanikashri19/car-scroll-animation.git

# Navigate into the project directory
cd car-scroll-animation

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be accessible at `http://localhost:5173`.

### Production Build & Preview
```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deploying to GitHub Pages

1. **Create Repository:** Create a new repository named `car-scroll-animation` on GitHub under your account (`Kanikashri19`).
2. **Push Code:**
   ```bash
   git init
   git add .
   git commit -m "feat: complete scroll-driven hero animation showcase"
   git branch -M main
   git remote add origin https://github.com/Kanikashri19/car-scroll-animation.git
   git push -u origin main
   ```
3. **Enable GitHub Pages:**
   - In GitHub repository settings $\rightarrow$ **Pages**.
   - Under **Build and deployment** $\rightarrow$ **Source**, select **GitHub Actions**.
   - The workflow `.github/workflows/deploy.yml` will automatically build and publish the live site at `https://Kanikashri19.github.io/car-scroll-animation/`.
