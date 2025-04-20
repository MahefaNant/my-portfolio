"use client";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import useDocumentReadyState from "@/hooks/useDocumentReadyState";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

export default function Home() {

  const isReady = useDocumentReadyState();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (isReady) {
      const timeout = setTimeout(() => setShowLoading(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [isReady]);

  if (showLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        <Hero />
        <Skills />
        <Timeline />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
    
  );
}