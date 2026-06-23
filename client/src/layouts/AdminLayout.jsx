import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";

const pageMeta = {
  "/admin/dashboard": {
    title: "Dashboard",
    subtitle: "Academic overview and institutional analytics",
  },
  "/admin/upload": {
    title: "Upload Data",
    subtitle: "Import and manage institutional records",
  },
  "/admin/students": {
    title: "Students",
    subtitle: "Manage student profiles and academic data",
  },
  "/admin/notifications": {
    title: "Send Notifications",
    subtitle: "Generate secure guardian access links",
  },
  "/admin/tokens": {
    title: "Token Management",
    subtitle: "Monitor secure guardian access tokens",
  },
};

export default function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { darkMode } = useTheme();
  const location = useLocation();

  const meta = Object.entries(pageMeta).find(([path]) =>
    location.pathname.startsWith(path),
  );

  const { title, subtitle } = meta
    ? meta[1]
    : {
        title: "Admin Panel",
        subtitle: "Institution management dashboard",
      };

  return (
    <div className={`relative min-h-screen ${
      darkMode ? "bg-[#06070d] text-white" : "bg-gradient-to-br from-indigo-50 via-slate-50 to-cyan-50 text-slate-800"
    }`}>
      {/* Background */}
      <div className="fixed inset-0 z-0">
        {/* Main Gradient */}
        <div className={`absolute inset-0 ${
          darkMode ? "bg-[radial-gradient(circle_at_top_left,#131a35_0%,#090b14_38%,#05060b_100%)] animate-pulse-slow" : "bg-transparent"
        }`} />
        {/* Grid */}
        <div className={`absolute inset-0 ${
          darkMode 
            ? "opacity-[0.035] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]" 
            : "opacity-[0.05] bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)]"
        } bg-size-[70px_70px]`} />
        {/* Purple Glow */}
        <div className={`absolute top-[-120px] left-[10%] w-[500px] h-[500px] rounded-full blur-3xl ${
          darkMode ? "bg-[#6366f1]/10" : "bg-indigo-300/15"
        }`} />
        {/* Blue Glow */}
        <div className={`absolute bottom-[-200px] right-[5%] w-[420px] h-[420px] rounded-full blur-3xl ${
          darkMode ? "bg-[#06b6d4]/10" : "bg-cyan-300/15"
        }`} />
        {/* Center Glow */}
        <div className={`absolute top-[30%] left-[45%] w-[280px] h-[280px] rounded-full blur-3xl ${
          darkMode ? "bg-[#8b5cf6]/5" : "bg-violet-300/8"
        }`} />
      </div>

      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Area */}
      <div
        className={`relative z-10 transition-all duration-300 min-h-screen flex flex-col
          ml-0
          ${sidebarCollapsed ? "md:ml-[88px]" : "md:ml-[270px]"}
        `}
      >
        {/* Main */}
        <main className="relative flex-1 flex justify-center items-center py-4 md:py-6">
          {/* Decorative Lines */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden hidden md:block">
            <div className={`absolute top-[140px] left-[4%] w-[220px] h-[220px] border rounded-full ${
              darkMode ? "border-white/[0.03]" : "border-indigo-900/[0.02]"
            }`} />
            <div className={`absolute bottom-[120px] right-[5%] w-[180px] h-[180px] border rounded-full ${
              darkMode ? "border-white/[0.03]" : "border-indigo-900/[0.02]"
            }`} />
            <div className={`absolute top-[40%] left-[60%] w-[2px] h-[180px] ${
              darkMode ? "bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" : "bg-gradient-to-b from-transparent via-indigo-900/[0.02] to-transparent"
            }`} />
          </div>

          {/* Content Wrapper */}
          <div className="relative z-10 w-full px-4 md:px-8 flex justify-center items-center">
            
            {/* Main Content Glass Layer */}
            <div className={`relative overflow-hidden rounded-3xl box-border w-full h-[92vh] border backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] overflow-y-auto ${
              darkMode
                ? "border-[#1a2033] bg-[rgba(10,12,20,0.72)] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
                : "border-indigo-100/80 bg-white/75 shadow-[0_8px_30px_rgba(99,102,241,0.04)]"
            }`}>
              {/* Top Shine */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent`} />
              {/* Side Glow */}
              <div className={`absolute top-[20%] right-[-120px] w-[240px] h-[240px] blur-3xl rounded-full ${
                darkMode ? "bg-[#6366f1]/8" : "bg-indigo-300/10"
              }`} />
              {/* Inner Overlay */}
              <div className={`absolute inset-0 pointer-events-none bg-gradient-to-b ${
                darkMode ? "from-white/[0.01] to-transparent" : "from-indigo-50/[0.05] to-transparent"
              }`} />

              {/* Content */}
              <div className="relative z-10 p-6 md:p-8">
                {/* Tiny Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7 pb-6 border-b border-dashed border-slate-200 dark:border-slate-800">
                  <div className="flex items-start gap-4">
                    {/* Mobile Hamburger Menu Button */}
                    <button
                      onClick={() => setMobileOpen(true)}
                      className={`md:hidden mt-1 p-2.5 rounded-2xl border transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                        darkMode
                          ? "border-[#252b42] bg-[#161925]/80 text-[#9ba2c0] hover:text-white"
                          : "border-slate-200 bg-white text-slate-600 hover:text-slate-900 shadow-sm"
                      }`}
                      aria-label="Toggle Sidebar"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </button>

                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="h-2 w-2 rounded-full bg-[#4ade80]" />
                        <span className={`text-[0.68rem] tracking-[0.15em] font-bold ${
                          darkMode ? "text-[#7d86a7]" : "text-slate-400"
                        }`}>
                          ASTNS ADMIN SYSTEM
                        </span>
                      </div>
                      <h1 className={`text-[1.8rem] md:text-[2rem] font-extrabold font-outfit leading-tight ${
                        darkMode ? "text-white" : "text-slate-800"
                      }`}>
                        {title}
                      </h1>
                      <p className={`text-[0.88rem] mt-1.5 leading-relaxed ${
                        darkMode ? "text-[#7d86a7]" : "text-slate-500"
                      }`}>
                        {subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Live Badge */}
                  <div className={`self-start md:self-auto flex items-center gap-3 px-4 py-3 rounded-2xl border ${
                    darkMode 
                      ? "border-[#1f3a2f] bg-[#0d1b1a]" 
                      : "border-emerald-200/60 bg-emerald-50/50"
                  }`}>
                    <div className="relative">
                      <div className="h-2.5 w-2.5 rounded-full bg-[#4ade80]" />
                      <div className="absolute inset-0 animate-ping rounded-full bg-[#4ade80]" />
                    </div>
                    <div>
                      <p className={`text-[0.72rem] uppercase tracking-[0.16em] font-bold ${
                        darkMode ? "text-[#4ade80]" : "text-emerald-600"
                      }`}>
                        System Active
                      </p>
                      <p className={`text-[0.74rem] mt-0.5 ${
                        darkMode ? "text-[#7d86a7]" : "text-slate-500"
                      }`}>
                        Real-time sync enabled
                      </p>
                    </div>
                  </div>
                </div>

                {/* Outlet */}
                <div className="w-full">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
