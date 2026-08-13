"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import clsx from "clsx";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// object-position per image: bo7's cover art is a tall poster whose vertical
// center is the darkest part (near-black gear), which was blending into the
// site's near-black background under object-cover's default center crop —
// pin it to the top instead, where the lit face/eyes read against the dark.
const MARQUEE_ITEMS = [
  { src: "/images/fz.png", position: "object-center" },
  { src: "/images/bo7.jpeg", position: "object-center" },
  { src: "/images/gta-v2.jpeg", position: "object-center" },
  { src: "/images/nba.jpeg", position: "object-center" },
  { src: "/images/fc6.jpeg", position: "object-center" },
  { src: "/images/fc.jpeg", position: "object-center" },
  { src: "/images/punk.jpeg", position: "object-center" },
  { src: "/images/ac.jpeg", position: "object-center" },
  { src: "/images/spider.jpeg", position: "object-center" },
  { src: "/images/blade.jpeg", position: "object-center" },
];

// Repeated enough times that the track stays wider than any viewport —
// otherwise the translateX(-50%..0) loop leaves gaps of bare background
// on wide screens, which reads as "only the first image is showing".
const MARQUEE_IMAGES = Array(4).fill(MARQUEE_ITEMS).flat();

export default function Pitch() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.from(".pitch-line", {
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="pitch" ref={rootRef} className="relative border-t border-line px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="pitch-line font-display text-2xl font-bold leading-tight tracking-wide text-fg sm:text-4xl lg:text-5xl">
          SEU NOVO UNIVERSO GAMER COMEÇA AQUI! 
        </p>

        <p className="pitch-line mt-8 max-w-2xl font-body text-base leading-relaxed text-muted sm:text-lg">
          Cansado de gastar uma fortuna para ter varias opções de jogos?
          Por que ter apenas um jogo quando você pode ter VÁRIAS OPÇÕES em um único método?
          Imagine ter acesso a sua biblioteca steam cheia de opções para escolher o que jogar, quando quiser.
        </p>
      </div>

      <div className="relative mt-20 w-full overflow-hidden border-y border-line">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent sm:w-32" />

        <div
          className={clsx(
            "flex w-max items-center gap-6 py-6",
            !reduced && "animate-marquee-reverse"
          )}
        >
          {[...MARQUEE_IMAGES, ...MARQUEE_IMAGES].map(({ src, position }, i) => (
            <div
              key={`${src}-${i}`}
              className="relative h-50 w-64 shrink-0 overflow-hidden border border-line bg-panel sm:h-82 sm:w-96"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 640px) 256px, 384px"
                className={clsx("object-cover", position)}
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
