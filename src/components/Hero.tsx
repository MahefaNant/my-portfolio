"use client";
import { AnimatedBackground } from "./hero/AnimatedBackground";
import { Info } from "./hero/Infos";
import { DownloadSection } from "./hero/DownloadSection";
import { AvatarSection } from "./hero/AvatarSection";
import { Scrool } from "./hero/Scrool";

export default function Hero() {

  return (
    <section aria-labelledby="main-heading" id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">

      <AnimatedBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left order-2 lg:order-1">
          <Info />
          <DownloadSection />
        </div>
        <AvatarSection />
      </div>

      <Scrool/>

    </section>
  );
}