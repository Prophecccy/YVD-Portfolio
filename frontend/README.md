# YVD Bespoke Sofas - Frontend Architecture Guide

Welcome to the frontend codebase for the **YVD (Yadhu Associates)** luxury digital platform, showcasing custom-engineered bespoke sofas and premium interior manufacturing.

---

## 🎨 Design System & Visual Tokens
The application implements a premium, high-end dark luxury aesthetic:
- **Primary Color:** Gold / Rich Mustard (`#D4AF37`) for high-fidelity CTAs, typography borders, and indicators.
- **Background:** Deep Monolithic Charcoal (`#111111`) and slight elevation panels (`#1A1A1A`).
- **Typography:** Custom global typography using Google's **Inter (Variable)** font family with ultra-sleek custom character tracking and line-heights.
- **Section Pacing:** Strict **100vh viewport constraints** across sections to structure content like an elegant physical publication.

---

## 🏗️ Technical Stack & Core Modules

### 1. 3D WebGL Engine (`Sofa3D.tsx`)
- Powered by **React Three Fiber (R3F)** and **Three.js**.
- Implements highly realistic physical PBR models (`sofa.glb`) illuminated by a custom local studio light rig (no external network dependencies).
- **Performance & Loading Architecture:** 
  - **HTML-Level Preloading:** Preloads `/models/sofa.glb` in `index.html` using a high-priority `<link rel="preload">` tag, parallelizing asset downloads with JS bundle execution.
  - **Instant Procedural Fallback:** Instantly (within 0.01 seconds) renders a custom, high-fidelity procedural luxury velvet sofa with polished gold legs directly inside the WebGL context. This completely bypasses network latencies and guarantees that the user is immediately greeted by a beautiful, rotating 3D element.
  - **Dynamic Cross-Fade Engine:** Once the heavy GLTF model finishes loading in the background, a high-performance interpolation system smoothly cross-fades the material opacities, fading out the procedural fallback and fading in the highly-detailed actual asset with absolutely zero pop-in or visual stutter.
  - **Zero-Dependency Lighting:** Utilizes a custom offline-ready **5-Point Studio Lighting Rig** (Ambient, Key, Fill, Rim, and Top directional lights) to completely bypass third-party environment map CDNs and eliminate fetch bottlenecks.
  - **Minimal Streaming Overlay:** Renders a clean, non-intrusive luxury indicator in the corner ("Streaming High-Detail Asset...") with high legibility and contrast instead of blocking the entire viewport.
  - **GPU-Scoped Scopes:** Framerate locked to **60 FPS** utilizing GPU layer promotion.
  - **Dynamic Frame Loops & Canvas Loop Bug Fix:** Canvas loops are dynamically managed using `frameloop={isModelLoaded ? (isInView ? "always" : "demand") : "always"}`. This forces continuous rendering frames while loading the model to ensure successful Suspense mount and compilation, before reverting back to demand-driven frames when out-of-view.
  - **Adaptive Scaling:** WebGL viewport downscales dynamically from `3.0` scaling (desktop) to `1.7` (mobile touchscreens) based on screen width.
  - **Direct GPU-Level Float-In Animation:** Integrates a direct Three.js mutation engine inside the R3F `useFrame` rendering loop that smoothly interpolates uniform scale (from `70%` to `100%`) and vertical position (from a raised `positionY + 0.6` down to standard offsets) on mount using `THREE.MathUtils.lerp`. This completely bypasses React state re-renders to ensure silky smooth 60-120Hz entrance sweeps on touchscreens without visual layer pops.


### 2. GPU-Accelerated Contrast Blending
- Solves the editorial "split-screen background" challenge (intersecting `#E6E4DD` cream paper and `#111111` deep black cut).
- The text container employs `mix-blend-mode: difference` and `color: #ffffff`.
- Text automatically renders as **dark slate (`#191b22`)** on the light background, and as **crisp off-white (`#eeeeee`)** on the dark background.
- Dynamic lines and separators utilize `background-color: currentColor` to blend dynamically along their intersection segments.

### 3. Draggable Infinite Portfolio Gallery (`DualMarqueeGallery.tsx`)
- Employs a custom `requestAnimationFrame` sub-pixel math engine scrolling two separate rows of luxury items in opposite directions.
- Drag friction scaling provides natural, fluid touch swipes and click drags.
- **Touchscreen-Aware Overrides (`@media (hover: none)`):**
  - Hover blur filters on adjacent items are systematically neutralized on mobile to avoid sticky tap layouts.
  - Information coordinates (`.hover-badge`) are locked in place at the bottom of each image container permanently on touch devices, showing sofa names with a premium semi-transparent ribbon overlay.

---

## 📱 Mobile Architecture Guidelines
- **Navbar:** Sticky header horizontal padding reduces to `1rem 1.5rem` under `768px`. Logo scales smoothly from `65px` to `45px` to maximize viewport space.
- **Bespoke Process Grid:** Swaps from a 50/50 horizontal CSS grid layout to an elegant, single-column vertical stack.
- **Footer CTA:** CTA headings use robust `clamp()` sizing limits (`clamp(2.5rem, 9vw, 4.5rem)`) to protect text boundaries on small displays. Large left offsets (`padding-left: 20%`) are neutralized under mobile views.
- **Interactive Targets:** Every menu button, close element, and navigation link strictly respects the **44px x 44px** minimum touch boundary constraint.

---

## 🛠️ Verification & Building

To run the high-fidelity dev server locally:
```bash
npm run dev
```

To compile production bundles and validate CSS lint rules:
```bash
npm run build
```
