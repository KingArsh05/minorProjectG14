import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Menu,
  X,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3'
          : 'py-5'
      }`}
    >
      {/* Background */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          isScrolled
            ? 'bg-[rgba(8,10,20,0.72)] backdrop-blur-2xl border-b border-[#20243b] shadow-[0_10px_40px_rgba(0,0,0,0.35)]'
            : 'bg-transparent border-transparent'
        }`}
      ></div>

      {/* Glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#6366f1]/40 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-4 group"
        >
          <div className="relative">

            <div className="absolute inset-0 rounded-2xl bg-[#6366f1]/35 blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>

            <div className="relative w-11 h-11 rounded-2xl bg-linear-to-br from-[#6366f1] to-[#06b6d4] flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.45)]">
              <GraduationCap size={20} className="text-white" />
            </div>
          </div>

          <div className="flex flex-col">
            <span
              className="text-2xl font-extrabold tracking-tight text-white"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              ASTNS
            </span>

            <span className="hidden sm:block text-[11px] text-[#6f7898] -mt-1">
              Academic Transparency System
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">

          <div className="flex items-center gap-8">

            {/* IMPORTANT */}
            {/* Add id="features" in Features section */}
            <a
              href="#features"
              className="relative text-sm font-medium text-[#9098b7] hover:text-white transition-colors after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[#818cf8] hover:after:w-full after:transition-all"
            >
              Features
            </a>

            {/* IMPORTANT */}
            {/* Add id="how-it-works" in your HowItWorks component */}
            <a
              href="#how-it-works"
              className="relative text-sm font-medium text-[#9098b7] hover:text-white transition-colors after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[#818cf8] hover:after:w-full after:transition-all"
            >
              How it works
            </a>

            <a
              href="#contact"
              className="relative text-sm font-medium text-[#9098b7] hover:text-white transition-colors after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[#818cf8] hover:after:w-full after:transition-all"
            >
              Contact
            </a>
          </div>

          {/* Divider */}
          <div className="h-5 w-px bg-[#252840]"></div>

          {/* Right Buttons */}
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="group px-5 py-2.5 rounded-xl bg-[#6366f1] hover:bg-[#5855eb] text-white text-sm font-semibold shadow-[0_0_25px_rgba(99,102,241,0.45)] hover:shadow-[0_0_40px_rgba(99,102,241,0.65)] transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              Admin Login

              <ChevronRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden relative z-50 w-11 h-11 rounded-xl border border-[#2b3050] bg-[rgba(255,255,255,0.03)] flex items-center justify-center text-[#c7d0ea]"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 transition-all duration-500 overflow-hidden ${
          mobileMenuOpen
            ? 'max-h-[500px] opacity-100'
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="mx-4 mt-3 rounded-3xl border border-[#20243b] bg-[rgba(9,11,22,0.96)] backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.55)] overflow-hidden">

          {/* Top */}
          <div className="p-6 border-b border-[#1d2138]">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-[#6366f1] to-[#06b6d4] flex items-center justify-center">
                <GraduationCap size={18} className="text-white" />
              </div>

              <div>
                <h2
                  className="text-white font-bold text-lg"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  ASTNS
                </h2>

                <p className="text-[#6f7898] text-xs">
                  Academic Transparency
                </p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="p-6 space-y-2">

            <a
              href="#features"
              onClick={closeMenu}
              className="flex items-center justify-between px-4 py-4 rounded-2xl hover:bg-[#12172b] text-[#c7d0ea] transition-all"
            >
              <span>Features</span>

              <ChevronRight size={16} />
            </a>

            <a
              href="#how-it-works"
              onClick={closeMenu}
              className="flex items-center justify-between px-4 py-4 rounded-2xl hover:bg-[#12172b] text-[#c7d0ea] transition-all"
            >
              <span>How it works</span>

              <ChevronRight size={16} />
            </a>

            <a
              href="#contact"
              onClick={closeMenu}
              className="flex items-center justify-between px-4 py-4 rounded-2xl hover:bg-[#12172b] text-[#c7d0ea] transition-all"
            >
              <span>Contact</span>

              <ChevronRight size={16} />
            </a>
          </div>

          {/* Buttons */}
          <div className="p-6 pt-0 space-y-4">

            <Link
              to="/guardian"
              onClick={closeMenu}
              className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-2xl border border-[#2d3252] bg-[rgba(255,255,255,0.03)] text-white font-semibold"
            >
              <ShieldCheck size={18} className="text-[#818cf8]" />

              Guardian Portal
            </Link>

            <Link
              to="/login"
              onClick={closeMenu}
              className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-[#6366f1] text-white font-semibold shadow-[0_0_30px_rgba(99,102,241,0.45)]"
            >
              Admin Login

              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}