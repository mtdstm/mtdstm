"use client";

import Mascot from "@/components/organisms/Mascot";
import Button from "@/components/atoms/Button";



export default function Footer() {
  return (
    <footer id="footer" className="relative border-t border-line px-5 py-24 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 text-center">
        <span className="font-pixel text-[9px] uppercase tracking-[0.4em] text-cyan">
          Mission Complete? Not Yet.
        </span>
        <h2 className="max-w-2xl font-display text-3xl font-black uppercase leading-tight tracking-wide text-fg sm:text-5xl">
          QUER ACESSO?
        </h2>

        <Button variant="solid" accent="magenta" className="text-sm">
          PEGAR MINHA KEY
        </Button>

        <Mascot className="mt-4" />

        <div className="mt-8 flex w-full flex-col items-center justify-between gap-6 border-t border-line pt-8 sm:flex-row">
          <p className="font-pixel text-[8px] uppercase tracking-widest text-muted">
            © {new Date().getFullYear()} STM Studio. All rights reserved.
          </p>
          <div className="flex gap-6 font-pixel text-[8px] uppercase tracking-widest text-muted">
          </div>
        </div>
      </div>
    </footer>
  );
}
