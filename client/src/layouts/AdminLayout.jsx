import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

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
    <div className="relative max-h-screen bg-[#06070d] text-white">
      {/* Background */}

      <div className="fixed inset-0 z-0">
        {/* Main Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#131a35_0%,#090b14_38%,#05060b_100%)]" />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[70px_70px]" />
        {/* Purple Glow */}
        <div className="absolute top-[-120px] left-[10%] w-[500px] h-[500px] rounded-full bg-[#6366f1]/10 blur-3xl" />
        {/* Blue Glow */}
        <div className="absolute bottom-[-200px] right-[5%] w-[420px] h-[420px] rounded-full bg-[#06b6d4]/10 blur-3xl" />
        {/* Center Glow */}
        <div className="absolute top-[30%] left-[45%] w-[280px] h-[280px] rounded-full bg-[#8b5cf6]/5 blur-3xl" />
      </div>

      {/* Sidebar */}

      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* Main Area */}
      <div
        className={`relative z-10 transition-all duration-300 ${
          sidebarCollapsed ? "ml-[88px]" : "ml-[270px]"
        }`}
      >
        {/* Main */}
        <main className="relative h-screen">
          {/* Decorative Lines */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute top-[140px] left-[4%] w-[220px] h-[220px] border border-[#ffffff08] rounded-full" />
            <div className="absolute bottom-[120px] right-[5%] w-[180px] h-[180px] border border-[#ffffff08] rounded-full" />
            <div className="absolute top-[40%] left-[60%] w-[2px] h-[180px] bg-linear-to-b from-transparent via-[#ffffff08] to-transparent" />
          </div>

          {/* Content Wrapper */}
          <div className="relative z-10 h-screen flex justify-center items-center">
            
            {/* Main Content Glass Layer */}
            <div className="relative overflow-hidden rounded-3xl box-border m-8 w-screen h-[92vh] border border-[#1a2033] bg-[rgba(10,12,20,0.72)] backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] overflow-y-auto">
              {/* Top Shine */}
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#818cf8]/40 to-transparent" />
              {/* Side Glow */}
              <div className="absolute top-[20%] right-[-120px] w-[240px] h-[240px] bg-[#6366f1]/10 blur-3xl rounded-full" />
              {/* Inner Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.015),transparent)] pointer-events-none" />

              
              {/* Content */}
              <div className="relative z-10 p-8">
                {/* Tiny Header */}
                <div className="flex items-center justify-between mb-7">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-2 w-2 rounded-full bg-[#4ade80]" />
                      <span className="text-xs tracking-[0.15em] text-[#7d86a7] font-semibold">
                        ASTNS ADMIN SYSTEM
                      </span>
                    </div>
                    <h1 className="text-[1.9rem] md:text-[2.1rem] font-bold text-white font-outfit leading-tight">
                      {title}
                    </h1>
                    <p className="text-[#7d86a7] text-[0.92rem] mt-2">
                      {subtitle}
                    </p>
                  </div>

                  {/* Live Badge */}
                  <div className="hidden lg:flex items-center gap-3 px-4 py-3 rounded-2xl border border-[#1f3a2f] bg-[#0d1b1a]">
                    <div className="relative">
                      <div className="h-2.5 w-2.5 rounded-full bg-[#4ade80]" />
                      <div className="absolute inset-0 animate-ping rounded-full bg-[#4ade80]" />
                    </div>
                    <div>
                      <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[#4ade80] font-semibold">
                        System Active
                      </p>
                      <p className="text-[0.76rem] text-[#7d86a7] mt-0.5">
                        Real-time sync enabled
                      </p>
                    </div>
                  </div>
                </div>

                {/* Outlet */}
                <Outlet />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
