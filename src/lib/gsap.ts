"use client";

// Central GSAP setup — import { gsap, ScrollTrigger } from "@/lib/gsap"
// anywhere you need scroll-driven animation instead of importing gsap
// directly, so the plugin registration always happens first.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
