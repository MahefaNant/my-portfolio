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
import Education from "@/components/Education";
import { Toaster } from "sonner";

export default function Home() {

  const isReady = useDocumentReadyState();

  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => {
        setShowNavbar(true);
      }, 2000); 
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  if (!isReady) {
    return <Loading />;
  }

  return (
    <>
      {showNavbar ? <Navbar /> : <Loading />} 
      
      <main className="overflow-x-hidden">
        <Hero />
        <Skills />
        <Timeline />
        <Education />
        <Projects />
        <Contact />
      </main>
      <Footer />

      <Toaster />
    </>
    
  );
}