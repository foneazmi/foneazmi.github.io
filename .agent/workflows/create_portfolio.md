---
description: Add full portfolio page and components
---
1. Create `src/ui/components/navbar.tsx` – sticky header, dark‑mode toggle, links (Home, About, Projects, Contact).
2. Create `src/ui/components/section.tsx` – wrapper with `id`, `className="py-20"` and fade‑in using `animate-fade-in` (Tailwind keyframes).
3. Create `src/ui/components/project-card.tsx` – glass‑morphism card (`bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:scale-105 transition`).
4. Create `src/ui/components/footer.tsx` – centered text, social icons (simple SVGs).
5. Create `src/ui/screens/portfolio.tsx` – hero section with background image (`bg-[url('/portfolio-bg.jpg')]`), headline, button, then `<Section id="about">…</Section>`, `<Section id="projects">…</Section>`, `<Section id="contact">…</Section>`.
6. Add `import PortfolioScreen from "./ui/screens/portfolio"` and a new route `{ path: "/portfolio", element: <PortfolioScreen/> }` to `src/router.tsx`.
7. Copy generated hero image to `public/portfolio-bg.jpg`.
8. Update `tailwind.config.cjs` to enable `darkMode: 'class'` (already present) and add custom animation `fadeIn`.
9. Run `bun install` to ensure Tailwind plugins are ready.
// turbo-all
