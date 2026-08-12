"use client";

import { useState } from "react";
import LoadingScreen from "@/components/organisms/LoadingScreen";
import Navbar from "@/components/organisms/Navbar";
import Hero from "@/components/organisms/Hero";
import Pitch from "@/components/organisms/Pitch";
import Work from "@/components/organisms/Work";
import Partners from "@/components/organisms/Partners";
import Footer from "@/components/organisms/Footer";
import CustomCursor from "@/components/organisms/CustomCursor";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <CustomCursor />
      <Navbar />
      <main>
        <Hero ready={loaded} />
        <Pitch />
        <Work />
        <Partners />
      </main>
      <Footer />
    </>
  );
}
