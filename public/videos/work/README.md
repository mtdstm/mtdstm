Drop one reel per project card here, named to match each project's
`video` field in src/data/projects.ts:
  voidcraft.mp4  nebula.mp4  arc.mp4  hexforge.mp4
  glitchbound.mp4  pixelunion.mp4  ironclad.mp4  starforge.mp4

Recommended: 4-8s loop, no audio needed (cards are always muted),
under 2MB each so the grid stays light. Missing files fall back to a
static gradient automatically (see ProjectCard.tsx / VideoBackground.tsx).
