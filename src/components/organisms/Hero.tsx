"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Button from "@/components/atoms/Button";
import ScrollCue from "@/components/molecules/ScrollCue";

const TITLE = "método stm";

export default function Hero({ ready }: { ready: boolean }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      const chars = titleRef.current?.querySelectorAll(".char");
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.set(rootRef.current, { autoAlpha: 1 });
      if (chars && !reduced) {
        tl.from(chars, {
          yPercent: 120,
          opacity: 0,
          duration: 1,
          stagger: 0.035,
        });
      } else if (chars) {
        tl.set(chars, { opacity: 1, yPercent: 0 });
      }
      tl.from(
        ".hero-sub, .hero-cta, .hero-hud",
        { y: reduced ? 0 : 20, opacity: 0, duration: 0.7, stagger: 0.1 },
        "-=0.5"
      );
    }, rootRef);
    return () => ctx.revert();
  }, [ready, reduced]);

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-cover bg-center invisible"
      style={{ backgroundImage: "url(/images/image-35.png)" }}
    >
      <div className="absolute inset-0 bg-bg/60" />
      <div className="crt-vignette !z-10" />

      <div className="relative z-20 flex flex-col items-center px-4 text-center">
        <span className="hero-sub mb-4 font-pixel text-[15px] uppercase tracking-[0.4em] text-cyan">
          + 44.000 Jogos
        </span>

        <h1
          ref={titleRef}
          className="flex flex-wrap justify-center overflow-hidden font-display text-[13vw] font-black leading-[0.9] tracking-[0.06em] text-fg sm:text-[9vw] lg:text-[7.5vw]"
          aria-label={TITLE}
        >
          {/* Each word wraps as a unit (whitespace-nowrap) so line breaks
              only ever fall between words, never mid-letter; chars stay
              individually targetable (".char") for the stagger reveal. */}
          {TITLE.split(" ").map((word, wi, words) => (
            <span key={wi} className="inline-block whitespace-nowrap">
              {word.split("").map((c, i) => (
                <span key={i} className="char inline-block">
                  {c}
                </span>
              ))}
              {wi < words.length - 1 && <span className="char inline-block">&nbsp;</span>}
            </span>
          ))}
        </h1>

        <p className="hero-sub mt-6 max-w-md font-body text-sm text-muted sm:text-base">
          Adquira sua KEY e tenha acesso ao MÉTODO STM, com conteúdo exclusivo e atualizado.
        </p>

        <div className="hero-cta mt-9 flex flex-wrap items-center justify-center gap-4">
          <Button variant="solid" accent="cyan">
            Pegar minha KEY
          </Button>
        </div>
      </div>

      <div className="hero-hud absolute left-4 top-20 z-20 hidden font-pixel text-[9px] uppercase tracking-widest text-muted sm:block">
        <p>Level: 01 / Home</p>
        <p className="text-lime">Status: Loaded</p>
      </div>

      <ScrollCue />
    </section>
  );
}
