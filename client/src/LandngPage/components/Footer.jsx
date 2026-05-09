// Footer.jsx

import React from "react";
import { GraduationCap, Github, Mail, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-[#20233a] bg-[#070812] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#4f46e5]/10 blur-[140px] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Top Footer */}
        <div className="py-16 flex flex-col lg:flex-row justify-between gap-14">
          {/* Brand */}
          <div className="max-w-md">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-[#6366f1]/40 blur-xl rounded-2xl"></div>

                <div className="relative w-12 h-12 rounded-2xl bg-linear-to-br from-[#6366f1] to-[#06b6d4] flex items-center justify-center shadow-[0_0_25px_rgba(99,102,241,0.45)]">
                  <GraduationCap size={22} className="text-white" />
                </div>
              </div>

              <div>
                <h2
                  className="text-2xl font-bold text-white tracking-tight"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  ASTNS
                </h2>

                <p className="text-sm text-[#7f88a8]">
                  Academic Transparency System
                </p>
              </div>
            </div>

            <p className="text-[#9aa3c0] leading-8 text-[15px]">
              ASTNS simplifies academic communication between institutions and
              guardians through intelligent dashboards, notifications, and
              secure data access.
            </p>

            {/* Social / Contact */}
            <div className="flex items-center gap-4 mt-8">
              <a
                href="#"
                className="w-11 h-11 rounded-xl border border-[#2b3050] bg-[rgba(255,255,255,0.03)] hover:bg-[#6366f1] flex items-center justify-center text-[#b5bed8] hover:text-white transition-all duration-300"
              >
                <Github size={18} />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-xl border border-[#2b3050] bg-[rgba(255,255,255,0.03)] hover:bg-[#6366f1] flex items-center justify-center text-[#b5bed8] hover:text-white transition-all duration-300"
              >
                <Mail size={18} />
              </a>

              <div className="flex items-center gap-2 text-[#7f88a8] text-sm ml-2">
                <ShieldCheck size={16} className="text-[#818cf8]" />
                Secure Platform
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div>
              <h3 className="text-white font-semibold mb-5">Platform</h3>

              <div className="space-y-4 text-[#8f9bb3]">
                <a
                  href="#features"
                  className="block hover:text-white transition-colors"
                >
                  Features
                </a>

                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Dashboard
                </a>

                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Guardian Portal
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-5">Resources</h3>

              <div className="space-y-4 text-[#8f9bb3]">
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Documentation
                </a>

                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Support
                </a>

                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Help Center
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-5">Legal</h3>

              <div className="space-y-4 text-[#8f9bb3]">
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>

                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Terms of Service
                </a>

                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Security
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#1c1f33]"></div>

        {/* Bottom */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#6e7694] text-center md:text-left">
            © {new Date().getFullYear()} Academic Status Transparency
            Notification System — Group 14. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-[#7f88a8]">
            <span>Made with precision for institutions</span>

            <div className="w-2 h-2 rounded-full bg-[#6366f1] animate-pulse"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
