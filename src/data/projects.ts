// PLACEHOLDER PROJECT DATA — swap for real case studies before launch.
// `video` should point at /public/videos/work/<file>.mp4 (see README).
// `logo` is a short client monogram used until real client logos land.

export interface Project {
  id: string;
  client: string;
  logo: string; // 1-3 letter monogram placeholder
  title: string;
  description: string;
  tags: string[];
  cta: { label: string; href: string };
  status: "live" | "coming-soon";
  award?: string; // e.g. "Site of the Day"
  accent: "cyan" | "magenta" | "lime";
  video: string;
}

export const projects: Project[] = [
  {
    id: "voidcraft",
    client: "Voidcraft Studios",
    logo: "VC",
    title: "Voidcraft — Launch Site",
    description: "A zero-gravity landing page for a roguelike shooter.",
    tags: ["UX/UI", "Frontend", "3D", "React"],
    cta: { label: "Visit live website", href: "#" },
    status: "live",
    award: "Site of the Day",
    accent: "cyan",
    video: "/videos/work/voidcraft.mp4",
  },
  {
    id: "nebula-dao",
    client: "Nebula DAO",
    logo: "ND",
    title: "Nebula — Web3 Portal",
    description: "Token-gated hub for a play-to-earn universe.",
    tags: ["Web3", "Solidity", "Frontend"],
    cta: { label: "Visit live website", href: "#" },
    status: "live",
    accent: "magenta",
    video: "/videos/work/nebula.mp4",
  },
  {
    id: "arc-interactive",
    client: "Arc Interactive",
    logo: "AI",
    title: "Arc — Brand & Motion",
    description: "Full identity system and animated trailer site.",
    tags: ["Animation", "Branding", "3D"],
    cta: { label: "Learn more", href: "#" },
    status: "live",
    accent: "lime",
    video: "/videos/work/arc.mp4",
  },
  {
    id: "hexforge",
    client: "Hexforge",
    logo: "HF",
    title: "Hexforge — Store Front",
    description: "Three.js product configurator for in-game skins.",
    tags: ["Three.js", "React", "E-commerce"],
    cta: { label: "Visit live website", href: "#" },
    status: "live",
    accent: "cyan",
    video: "/videos/work/hexforge.mp4",
  },
  {
    id: "glitchbound",
    client: "Glitchbound",
    logo: "GB",
    title: "Glitchbound — Teaser",
    description: "Pre-launch teaser with real-time particle system.",
    tags: ["Game UX/UI", "WebGL", "Animation"],
    cta: { label: "Coming soon", href: "#" },
    status: "coming-soon",
    accent: "magenta",
    video: "/videos/work/glitchbound.mp4",
  },
  {
    id: "pixel-union",
    client: "Pixel Union",
    logo: "PU",
    title: "Pixel Union — Community Hub",
    description: "Forum, patch notes, and leaderboard in one shell.",
    tags: ["Frontend", "UX/UI", "Design System"],
    cta: { label: "Visit live website", href: "#" },
    status: "live",
    accent: "lime",
    video: "/videos/work/pixelunion.mp4",
  },
  {
    id: "ironclad",
    client: "Ironclad Games",
    logo: "IG",
    title: "Ironclad — Press Kit",
    description: "Interactive press kit with dynamic media reel.",
    tags: ["Frontend", "Animation"],
    cta: { label: "Learn more", href: "#" },
    status: "live",
    accent: "cyan",
    video: "/videos/work/ironclad.mp4",
  },
  {
    id: "starforge-dao",
    client: "Starforge",
    logo: "SF",
    title: "Starforge — NFT Mint",
    description: "Mint experience with on-chain rarity reveal.",
    tags: ["Web3", "Solidity", "3D"],
    cta: { label: "Coming soon", href: "#" },
    status: "coming-soon",
    accent: "magenta",
    video: "/videos/work/starforge.mp4",
  },
];
