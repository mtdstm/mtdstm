# Wonder Games — Studio Site

A one-page, scroll-driven arcade site for a game design & dev studio.
Dark/neon CRT aesthetic, GSAP ScrollTrigger reveals, an R3F hero scene,
a custom cursor, and a bunch of game-UI HUD flourishes (FPS counter,
Player 1 badge, loading screen, "insert coin" CTA, etc.).

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **GSAP** + `ScrollTrigger` for scroll-driven animation
- **Framer Motion** available for micro-interactions (hover/tap states)
- **React Three Fiber** + `three` + `@react-three/drei` for the hero's 3D core
- Fonts: `Orbitron` (display/headlines), `Space Grotesk` (body), `Press Start 2P` (pixel/HUD accents) via `next/font/google`

## Running it

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Production build: `npm run build && npm run start`.

## Where things live (atomic-ish structure)

```
src/
  app/               page.tsx (composes everything), layout.tsx, globals.css
  components/
    atoms/           Button, Tag, IconGeo (triangle/plus)
    molecules/       Hud (FPS/audio widgets), ScrollCue, VideoBackground,
                      ProjectCard, AwardBadge
    organisms/        LoadingScreen, Navbar, Hero, HeroScene (R3F),
                      Pitch, Work, Partners, Footer, Mascot,
                      CustomCursor, CrtOverlay
  data/              projects.ts, misc.ts (specialties/partners/nav)
  hooks/             useReducedMotion, useFPS
  context/           AudioContext (HUD mute toggle)
  lib/               gsap.ts (registers ScrollTrigger once)
```

## Swapping placeholder content for the real thing

- **Studio name / copy**: edit `src/components/organisms/Hero.tsx`,
  `Pitch.tsx`, and `Footer.tsx` directly — all headline/manifesto text
  lives inline in those files.
- **Projects**: edit `src/data/projects.ts`. Each entry drives a card
  in the "Our Work" grid (client, title, description, tags, CTA,
  status, optional award ribbon, accent color, video path).
- **Project reels**: drop `.mp4` files into `public/videos/work/`
  named to match each project's `video` field (see
  `public/videos/work/README.md` for the exact filenames). Missing
  files fall back to a static gradient automatically — nothing breaks.
- **Hero background loop**: drop `hero-loop.mp4` into
  `public/videos/hero/`. Consider adding a lighter mobile-specific cut
  and swapping it in via a viewport check in
  `src/components/molecules/VideoBackground.tsx`.
- **Partner / client logos**: `src/data/misc.ts` currently lists
  partner names rendered as wordmarks in `Partners.tsx`. Swap the
  `<span>` for an `<Image>` per partner once you have real SVG/PNG
  logos, and swap the monogram badges in `ProjectCard.tsx` for real
  client logomarks.
- **Ambient audio**: optional — drop `ambient.mp3` into `public/audio/`
  to make the HUD's audio toggle actually play something
  (`src/context/AudioContext.tsx`).
- **Mascot character**: `src/components/organisms/Mascot.tsx` is a
  hand-built SVG character (eyes track the cursor, idle float loop) so
  the project has zero external asset dependencies out of the box. If
  the studio produces a real Rive (`.riv`) or Lottie (`.json`)
  character, swap the SVG markup for a `<Rive>` / `lottie-react` player
  inside that same wrapper `<div>`.
- **3D hero core**: `src/components/organisms/HeroScene.tsx` uses a
  plain wireframe icosahedron + point field so it stays fast with zero
  asset loading. Replace `<Icosahedron>` with a real logomark mesh
  (`.glb` via `useGLTF`) if/when one exists.

## Notes on the game-y UI details

- **Loading screen** (`LoadingScreen.tsx`): simulated progress bar,
  ~2.2s on first paint, instant under `prefers-reduced-motion`.
- **HUD** (`Hud.tsx`): FPS counter is a real rAF-based counter (cosmetic,
  not a perf tool); audio toggle is wired to `AudioContext`.
- **Custom cursor** (`CustomCursor.tsx`): disabled automatically on
  touch devices and under `prefers-reduced-motion`; morphs into a
  larger magenta ring over anything tagged `data-cursor="link"`.
- **CRT overlay** (`CrtOverlay.tsx`): fixed scanline/vignette/grain
  layers, `pointer-events: none`, grain layer skipped under reduced
  motion.

## Accessibility / performance

- All GSAP scroll animations check `useReducedMotion()` and skip to
  the resting state instead of animating when the OS setting is on.
- Videos use `preload="none"` and only start once actually
  needed/hovered — swap in `loading="lazy"` posters if you add real
  poster images.
- The R3F hero scene is skipped entirely under reduced motion.
