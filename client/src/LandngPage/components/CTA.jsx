// CTA.jsx

import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section id="how-it-works" className="relative py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#4f46e5]/10 blur-[140px] pointer-events-none"></div>

      <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[70px_70px]"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="relative overflow-hidden rounded-[36px] border border-[rgba(99,102,241,0.18)] bg-[linear-gradient(135deg,rgba(18,20,38,0.98),rgba(11,12,24,0.98))] px-8 py-20 md:px-20 text-center shadow-[0_0_60px_rgba(0,0,0,0.45)]">
          {/* Top Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#6366f1]/20 blur-[120px] rounded-full"></div>

          {/* Decorative Orbs */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-linear-to-br from-[#6366f1] to-[#06b6d4] opacity-20 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3"></div>

          <div className="absolute bottom-0 left-0 w-72 h-72 bg-linear-to-tr from-[#818cf8] to-[#c084fc] opacity-20 blur-3xl rounded-full -translate-x-1/3 translate-y-1/3"></div>

          {/* Badge */}
          <div className="relative z-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#6366f1]/20 bg-[#6366f1]/10 backdrop-blur-xl text-[#a5b4fc] text-sm font-medium mb-8">
            <Sparkles size={16} />
            Smart Academic Management
          </div>

          {/* Heading */}
          <h2
            className="relative z-10 text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-white mb-8"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Ready to streamline
            <br />
            your institution?
          </h2>

          {/* Description */}
          <p className="relative z-10 text-lg md:text-xl text-[#aeb6d3] leading-9 max-w-3xl mx-auto mb-12">
            Empower administrators, strengthen guardian communication, and
            modernize academic transparency with a beautifully integrated
            platform.
          </p>

          {/* Buttons */}
          <div className="relative z-10 flex flex-col sm:flex-row justify-center items-center gap-5">
            <Link
              to="/login"
              className="group inline-flex items-center gap-3 px-9 py-4 rounded-2xl bg-[#6366f1] hover:bg-[#5855eb] text-white text-base font-semibold shadow-[0_0_30px_rgba(99,102,241,0.45)] hover:shadow-[0_0_45px_rgba(99,102,241,0.65)] transition-all duration-300 hover:-translate-y-1"
            >
              Log in to Dashboard
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>

            <a
              href="#features"
              className="px-8 py-4 rounded-2xl border border-[#2f3457] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] text-[#c7d0ea] hover:text-white font-medium transition-all duration-300"
            >
              Explore Features
            </a>
          </div>

          {/* Bottom Stats */}
          <div className="relative z-10 mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-[#232844] bg-[rgba(255,255,255,0.02)] p-6 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-white h-20">
                Personalized <br />Access
              </h3>

              <p className="text-[#8f9bb3] leading-7 text-sm">
                Guardians receive unique secure links through email to access
                only their student's academic details and semester records.
              </p>
            </div>

            <div className="rounded-2xl border border-[#232844] bg-[rgba(255,255,255,0.02)] p-6 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-white h-20">
                Real-time Transparency
              </h3>

              <p className="text-[#8f9bb3] leading-7 text-sm">
                Instantly share attendance, marks, detained subjects, and
                academic progress with guardians without manual communication.
              </p>
            </div>

            <div className="rounded-2xl border border-[#232844] bg-[rgba(255,255,255,0.02)] p-6 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-white h-20">
                Secure Student Reports
              </h3>

              <p className="text-[#8f9bb3] leading-7 text-sm">
                Each shared portal is protected with private tokenized access so
                guardians can only view authorized student information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
