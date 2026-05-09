import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Menu, X } from 'lucide-react';

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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-[rgba(10,11,20,0.85)] backdrop-blur-xl border-[#252840] py-3' : 'bg-transparent border-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-linear-to-br from-[#6366f1] to-[#06b6d4] shadow-[0_4px_20px_rgba(99,102,241,0.3)]">
            <GraduationCap size={20} className="text-white" />
          </div>
          <span className="text-2xl font-extrabold gradient-text tracking-tight" style={{ fontFamily: "Outfit, sans-serif" }}>ASTNS</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-[#8f9bb3] hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm font-medium text-[#8f9bb3] hover:text-white transition-colors">How it works</a>
          <div className="h-4 w-px bg-[#252840]"></div>
          <div className="flex gap-4">
            <Link to="/guardian" className="px-5 py-2.5 text-sm font-semibold rounded-lg bg-[rgba(37,40,64,0.5)] border border-[#2e3354] text-white hover:bg-[#252840] transition-all">
              Guardian Portal
            </Link>
            <Link to="/login" className="px-5 py-2.5 text-sm font-semibold rounded-lg bg-[#6366f1] hover:bg-[#4f46e5] text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] transition-all">
              Admin Login
            </Link>
          </div>
        </div>

        <button className="md:hidden text-[#8f9bb3]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0a0b14] border-b border-[#252840] p-6 flex flex-col gap-4 shadow-2xl">
          <a href="#features" className="text-[#8f9bb3] hover:text-white py-2" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#how-it-works" className="text-[#8f9bb3] hover:text-white py-2" onClick={() => setMobileMenuOpen(false)}>How it works</a>
          <div className="h-px bg-[#252840] my-2"></div>
          <Link to="/guardian" className="w-full text-center px-5 py-3 rounded-lg bg-[rgba(37,40,64,0.5)] border border-[#2e3354] text-white" onClick={() => setMobileMenuOpen(false)}>Guardian Portal</Link>
          <Link to="/login" className="w-full text-center px-5 py-3 rounded-lg bg-[#6366f1] text-white" onClick={() => setMobileMenuOpen(false)}>Admin Login</Link>
        </div>
      )}
    </nav>
  );
}
