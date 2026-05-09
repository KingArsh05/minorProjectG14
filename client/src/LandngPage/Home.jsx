import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import ScrollToTop from "./components/ScrollToTop";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0b14] text-[#f0f1fa] font-sans selection:bg-[#6366f1] selection:text-white relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <CTA />
      <Contact />
      <Footer />
    </div>
  );
}
