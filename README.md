# A WORK IN PROGRESS 🌌

> *"I am not a finished product. I am an evolving idea."*

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=flat-square&logo=three.js&logoColor=white)](https://threejs.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

An award-winning personal identity and creative digital experience built with **React**, **TypeScript**, **Tailwind CSS**, and **Three.js**. Designed not as a conventional resume or business portfolio, but as an interactive art piece exploring curiosity, cognitive models, evolving perspectives, and future aspirations.

---

## ✨ Features & Architecture

### 1. 🪐 3D Hero Constellation Centerpiece
- **Interactive Particle Nebula**: Over 750 mathematical vertices in a golden-ratio spherical field with connected neural filament lines and additive blending.
- **Cursor Physics**: Real-time smooth tilt and mouse-following inertia.
- **Orbiting Axioms**: Floating, depth-projected 3D concept nodes (*Curiosity*, *Imagination*, *Discipline*, *Possibility*, *Resilience*).
- **Identity Customizer**: Live archetype customizer modal with instantaneous multi-section state synchronization and local storage persistence.

### 2. 🌊 The Human Substrate ("More Than a Title")
- **Editorial Typography**: Large-format editorial layout inspired by contemporary digital publications and high-end agency design.
- **Topographic Consciousness Wave**: Procedural canvas simulation generating interactive Bézier contour waves that ripple with cursor proximity.

### 3. 🧠 Cognitive Architecture ("My Default Settings")
- **Five Interactive Principles**:
  - `CURIOSITY`: *Understanding something deeply matters more than pretending to know it all.*
  - `CREATIVITY`: *Familiar problems deserve unfamiliar perspectives.*
  - `DISCIPLINE`: *Motivation starts things. Consistent effort moves them forward.*
  - `RESILIENCE`: *Failure is feedback. Progress is rarely a straight line.*
  - `POSSIBILITY`: *The most interesting version of my future is still unwritten.*
- **Orbital Constellation Visualizer**: Real-time canvas representing principles in orbital harmony with interactive ray-casting and harmonic sound chimes.

### 4. 🖼️ My World, In Fragments
- **Asymmetrical Gallery**: Six thematic dimensions exploring craft, paradigms, acoustic frequency, stillness, perspective shifts, and latent dreams.
- **Custom Generative Artwork**: Hand-crafted mathematical SVGs and wireframe blueprints.
- **Inspection Drawer**: Fullscreen lightbox modals displaying inner reflections and architectural specifications.

### 5. 🔭 Future State Synthesis ("The Next Version")
- **Guiding Statement**: *“I do not want to predict my future. I want to participate in creating it.”*
- **3D Rotating Monolith**: Dual-axis rotating geometric wireframe with luminous vertices and infinite perspective grid floor.
- **Aspiration Vectors**: Concrete blueprints for positive impact and continuous learning.

### 6. ✉️ Temporal Transmission ("A Note to My Future Self")
- **Distant Horizon Particle Stream**: Ambient vertical light stream simulating infinite temporal passage.
- **Editorial Graduation Letter**: High-contrast, dignified typography providing grounding wisdom.

### 7. 🎵 Procedural Ambient Sound Engine
- **Web Audio API**: 100% procedurally synthesized 432Hz ambient soundscape and crystalline harmonic chimes—**zero external audio files or network latency**.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + CSS Variables
- **3D & Graphics**: [Three.js](https://threejs.org/) + Native HTML5 Canvas 2D
- **Icons**: [Lucide React](https://lucide.dev/)
- **Micro-Interactions**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Audio**: Web Audio API (polyphonic oscillators, low-pass biquad filters, stereo panners)

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sam17122004/me_web.git
   cd me_web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://127.0.0.1:5173/
   ```

### Production Build

To compile a production-ready bundle:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 📂 Project Structure

```
me_web/
├── public/
│   └── favicon.svg              # Custom orbital icon
├── src/
│   ├── components/
│   │   ├── AboutSection.tsx      # "More Than a Title" + Topographic wave
│   │   ├── CustomCursor.tsx     # Desktop inertia follower
│   │   ├── FooterSection.tsx    # "The Story Continues" + active links
│   │   ├── HeroCenterpiece.tsx  # Three.js 3D Constellation & Orbitals
│   │   ├── HeroSection.tsx      # Opening headline & identity
│   │   ├── IdentityModal.tsx    # Real-time name customization modal
│   │   ├── LetterSection.tsx    # "A Note to My Future Self" + particle ray
│   │   ├── MindsetSection.tsx   # 5 Principles + Orbital Canvas
│   │   ├── Navbar.tsx           # Navigation, scroll progress, audio toggle
│   │   ├── VisionSection.tsx    # 3D Monolith + Aspirations
│   │   └── WorldGallerySection.tsx # Asymmetrical fragments & modal
│   ├── utils/
│   │   └── audio.ts             # Web Audio procedural soundscape engine
│   ├── App.tsx                  # Root application orchestrator
│   ├── index.css                # Design system tokens, grain & typography
│   └── main.tsx                 # Entrypoint
├── index.html                   # Fonts (Syne, Plus Jakarta Sans, Space Mono)
├── package.json
├── tsconfig.json
└── vite.config.ts               # Vite configuration with Tailwind CSS v4
```

---

## 🎨 Color Palette

| Token | Hex | Role |
| :--- | :--- | :--- |
| **Midnight Black** | `#07080D` | Primary background substrate |
| **Deep Charcoal** | `#11131B` | Surface panels and glass containers |
| **Electric Blue** | `#6685FF` | Core accent, interactive states, primary glow |
| **Soft Violet** | `#A18CFF` | Secondary harmonic, orbital filaments |
| **Cool White** | `#F4F5FA` | High-contrast editorial typography |
| **Muted Gray** | `#9396A7` | Technical annotations, coordinates, subtext |

---

## ⌨️ Keyboard Shortcuts

- <kbd>I</kbd> — Open the **Identity Archetype Customizer** modal
- <kbd>M</kbd> — Toggle the **Ambient Procedural Soundscape**

---

## 👤 Author

**Sambeet Sabat**
- **Email**: [sambeet.sabat.2002@gmail.com](mailto:sambeet.sabat.2002@gmail.com)
- **GitHub**: [@sam17122004](https://github.com/sam17122004)
- **LinkedIn**: [sambeet-sabat-640996304](https://linkedin.com/in/sambeet-sabat-640996304)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
