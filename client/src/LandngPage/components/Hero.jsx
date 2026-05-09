import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  BellRing,
  BarChart3,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center pt-36 pb-36">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-[#060816]"></div>

      {/* Main Glow */}
      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[#6366f1]/15 blur-[140px]"></div>

      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[130px]"></div>

      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-violet-500/10 blur-[120px]"></div>

      {/* Floating Elements */}
      <div className="absolute left-[2%] top-[40%] hidden xl:flex items-center gap-3 px-4 py-3 rounded-2xl border border-[#2a2f4f] bg-[rgba(13,15,30,0.75)] backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.45)] rotate-[-8deg] animate-[float_6s_ease-in-out_infinite]">
        <div className="w-10 h-10 rounded-xl bg-[#6366f1]/15 flex items-center justify-center">
          <BellRing size={18} className="text-[#818cf8]" />
        </div>

        <div>
          <p className="text-white text-sm font-semibold">Notifications Sent</p>

          <p className="text-[#8f9bb3] text-xs">Parents updated instantly</p>
        </div>
      </div>

      <div className="absolute right-[1%] top-[45%] hidden xl:flex items-center gap-3 px-4 py-3 rounded-2xl border border-[#2a2f4f] bg-[rgba(13,15,30,0.75)] backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.45)] animate-[float_7s_ease-in-out_infinite]">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
          <BarChart3 size={18} className="text-cyan-400" />
        </div>

        <div>
          <p className="text-white text-sm font-semibold">Live Analytics</p>

          <p className="text-[#8f9bb3] text-xs">Real-time academic insights</p>
        </div>
      </div>

      <div className="absolute left-[50%] bottom-[2%] hidden xl:flex items-center gap-3 px-4 py-3 rounded-2xl border border-[#2a2f4f] bg-[rgba(13,15,30,0.75)] backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.45)] rotate-6 animate-[float_8s_ease-in-out_infinite]">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
          <ShieldCheck size={18} className="text-emerald-400" />
        </div>

        <div>
          <p className="text-white text-sm font-semibold">Secure Access</p>

          <p className="text-[#8f9bb3] text-xs">Protected student records</p>
        </div>
      </div>

      {/* Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.025] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#6366f1]/20 bg-[#6366f1]/10 text-[#a5b4fc] text-sm font-medium mb-10 backdrop-blur-xl shadow-[0_0_20px_rgba(99,102,241,0.15)]">
          <Sparkles size={15} />
          Academic Status Transparency
        </div>

        {/* Heading */}
        <h1
          className="text-5xl md:text-7xl lg:text-[88px] font-extrabold tracking-[-0.04em] leading-[0.95] text-white mb-8"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          Real-time insights
          <br />
          <span className="bg-linear-to-r from-[#818cf8] via-[#60a5fa] to-[#22d3ee] bg-clip-text text-transparent">
            into student performance.
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-[#98a2c3] max-w-3xl mx-auto leading-9 mb-12">
          Bridge the gap between administrators, educators, and guardians with
          intelligent academic monitoring, seamless communication, and beautiful
          real-time dashboards.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link
            to="/login"
            className="group px-9 py-4 rounded-2xl bg-[#6366f1] hover:bg-[#5b57ee] text-white text-base font-semibold shadow-[0_0_35px_rgba(99,102,241,0.45)] hover:shadow-[0_0_50px_rgba(99,102,241,0.65)] transition-all duration-300 hover:-translate-y-1 flex items-center gap-3"
          >
            Admin Access
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>

          <Link
            to="/guardian"
            className="px-9 py-4 rounded-2xl border border-[#2d3252] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.05)] hover:border-[#6366f1]/40 text-white font-semibold backdrop-blur-xl transition-all duration-300"
          >
            Guardian Portal
          </Link>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-24 relative mx-auto w-full max-w-6xl">
          {/* Glow */}
          <div className="absolute -inset-4 bg-linear-to-r from-[#6366f1]/15 via-cyan-500/10 to-[#6366f1]/15 blur-3xl rounded-[40px]"></div>

          {/* Main Window */}
          <div className="relative overflow-hidden rounded-[32px] border border-[#232844] bg-[linear-gradient(180deg,rgba(18,20,38,0.98),rgba(8,9,20,0.98))] shadow-[0_0_70px_rgba(0,0,0,0.55)]">
            {/* macOS Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#1d2138] bg-[rgba(255,255,255,0.02)]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
              </div>

              <div className="hidden sm:flex px-4 py-1.5 rounded-full bg-[#12172b] border border-[#2a2f4f] text-[#7f88a8] text-xs">
                ASTNS Guardian Dashboard
              </div>

              <div className="w-10"></div>
            </div>

            {/* Dashboard Content */}
            <div className="p-4 sm:p-6 lg:p-8">
              {/* Top Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                {/* Student Status */}
                <div className="rounded-3xl border border-[#20253d] bg-[rgba(255,255,255,0.025)] p-5">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#6366f1]/15 flex items-center justify-center">
                      <BarChart3 size={20} className="text-[#818cf8]" />
                    </div>

                    <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs">
                      Active
                    </div>
                  </div>

                  <h3 className="text-white text-2xl font-bold mb-2">
                    Semester 4
                  </h3>

                  <p className="text-[#8f9bb3] text-sm leading-7">
                    Student academic records and subject performance updated
                    successfully.
                  </p>
                </div>

                {/* Guardian Access */}
                <div className="rounded-3xl border border-[#20253d] bg-[rgba(255,255,255,0.025)] p-5">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
                      <BellRing size={20} className="text-cyan-400" />
                    </div>

                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                  </div>

                  <h3 className="text-white text-2xl font-bold mb-2">
                    Guardian Link Sent
                  </h3>

                  <p className="text-[#8f9bb3] text-sm leading-7">
                    Personalized student access link securely delivered to
                    guardian email.
                  </p>
                </div>

                {/* Security */}
                <div className="rounded-3xl border border-[#20253d] bg-[rgba(255,255,255,0.025)] p-5">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                      <ShieldCheck size={20} className="text-emerald-400" />
                    </div>

                    <div className="px-3 py-1 rounded-full bg-[#11182d] text-[#7f88a8] text-xs">
                      Tokenized
                    </div>
                  </div>

                  <h3 className="text-white text-2xl font-bold mb-2">
                    Secure Access
                  </h3>

                  <p className="text-[#8f9bb3] text-sm leading-7">
                    Guardians can only access authorized student records through
                    private links.
                  </p>
                </div>
              </div>

              {/* Main Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
                {/* Performance */}
                <div className="rounded-3xl border border-[#20253d] bg-[rgba(255,255,255,0.02)] p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-white text-xl font-semibold mb-1">
                        Semester Performance
                      </h3>

                      <p className="text-[#7f88a8] text-sm">
                        Subject-wise internal marks
                      </p>
                    </div>

                    <div className="text-emerald-400 text-sm">
                      Updated today
                    </div>
                  </div>

                  {/* Subject Bars */}
                  <div className="space-y-5">
                    {[
                      {
                        subject: "Data Structures",
                        marks: "84%",
                        width: "84%",
                      },
                      {
                        subject: "Operating System",
                        marks: "76%",
                        width: "76%",
                      },
                      {
                        subject: "Computer Networks",
                        marks: "91%",
                        width: "91%",
                      },
                      { subject: "DBMS", marks: "69%", width: "69%" },
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[#c7d0ea] text-sm">
                            {item.subject}
                          </span>

                          <span className="text-[#8f9bb3] text-sm">
                            {item.marks}
                          </span>
                        </div>

                        <div className="h-3 rounded-full bg-[#12172b] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-linear-to-r from-[#6366f1] to-cyan-400"
                            style={{ width: item.width }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Detained Subject */}
                  <div className="mt-8 p-4 rounded-2xl border border-red-500/10 bg-red-500/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-red-300 font-medium mb-1">
                          Detained Subject Alert
                        </h4>

                        <p className="text-red-200/70 text-sm">
                          Mathematics-II attendance below required threshold.
                        </p>
                      </div>

                      <div className="px-3 py-1 rounded-full bg-red-500/10 text-red-300 text-xs">
                        Attention
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notification Panel */}
                <div className="rounded-3xl border border-[#20253d] bg-[rgba(255,255,255,0.02)] p-5 sm:p-6">
                  <h3 className="text-white text-xl font-semibold mb-1">
                    Guardian Notifications
                  </h3>

                  <p className="text-[#7f88a8] text-sm mb-6">
                    Recent communication activity
                  </p>

                  <div className="space-y-4">
                    {[
                      {
                        title: "Attendance report shared",
                        desc: "Guardian viewed attendance summary",
                        time: "2 min ago",
                      },
                      {
                        title: "Semester marks uploaded",
                        desc: "Academic records updated successfully",
                        time: "15 min ago",
                      },
                      {
                        title: "Secure access link generated",
                        desc: "Private guardian portal activated",
                        time: "Today",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-[#222742] bg-[#111528] p-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#6366f1]/15 flex items-center justify-center shrink-0">
                              <BellRing size={16} className="text-[#818cf8]" />
                            </div>

                            <div>
                              <h4 className="text-white text-sm font-medium mb-1">
                                {item.title}
                              </h4>

                              <p className="text-[#7f88a8] text-xs leading-6">
                                {item.desc}
                              </p>
                            </div>
                          </div>

                          <span className="text-[#5f6888] text-[11px] whitespace-nowrap">
                            {item.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Email Preview */}
                  <div className="mt-6 rounded-2xl border border-[#20253d] bg-[rgba(255,255,255,0.02)] p-4">
                    <p className="text-[#7f88a8] text-xs mb-2">
                      Guardian Email
                    </p>

                    <div className="text-sm text-[#c7d0ea] break-all">
                      guardian.parent@studentmail.com
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating animation */}
      <style>
        {`
          @keyframes float {
            0%,100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-12px);
            }
          }
        `}
      </style>
    </section>
  );
}
