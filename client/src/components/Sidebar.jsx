import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  Users,
  Send,
  KeyRound,
  GraduationCap,
  ChevronRight,
  LogOut,
  AlertCircle,
  X,
  CheckCircle2,
  Loader2,
  PanelLeftClose,
  PanelLeftOpen,
  Sun,
  Moon,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/admin/dashboard" },
  { label: "Upload Data", icon: Upload, to: "/admin/upload" },
  { label: "Students", icon: Users, to: "/admin/students" },
  { label: "Send Notifications", icon: Send, to: "/admin/notifications" },
  { label: "Token Management", icon: KeyRound, to: "/admin/tokens" },
];

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const { logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutSuccess, setLogoutSuccess] = useState(false);

  const confirmLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      setLoggingOut(false);
      setLogoutSuccess(true);
      setTimeout(() => {
        navigate("/");
        logout();
      }, 800);
    }, 800);
  };

  return (
    <>
      {/* Backdrop for Mobile Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-[rgba(3,6,18,0.6)] backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed left-0 top-0 h-screen z-50 flex flex-col overflow-hidden transition-[width,transform] duration-300 border-r
          ${darkMode ? "bg-[#11131f] border-[#20253b]" : "bg-white border-slate-200"}
          ${collapsed ? "md:w-[84px]" : "md:w-[270px]"}
          w-[270px]
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Top Header */}
        <div className={`px-4 py-5 border-b ${darkMode ? "border-[#20253b]" : "border-slate-200"}`}>
          <div className="flex items-center justify-between">
            {/* Logo and brand name */}
            <div className={`flex items-center gap-3 ${collapsed ? "md:justify-center md:w-full" : ""}`}>
              <div 
                className="w-[42px] h-[42px] shrink-0 rounded-2xl bg-[#6366f1] flex items-center justify-center shadow-[0_8px_25px_rgba(99,102,241,0.25)] cursor-pointer" 
                onClick={() => {
                  navigate("/");
                  setMobileOpen(false);
                }}
              >
                <GraduationCap size={20} className="text-white" />
              </div>

              {/* Show ASTNS text if NOT collapsed, OR on mobile (where it's never collapsed visually) */}
              <div className={`${collapsed ? "md:hidden" : "block"}`}>
                <p className={`text-[1rem] font-bold font-outfit leading-tight ${darkMode ? "text-white" : "text-slate-800"}`}>
                  ASTNS
                </p>
                <p className="text-[0.7rem] text-[#66708f]">Admin Panel</p>
              </div>
            </div>

            {/* Action buttons (Theme Toggle, Mobile Close) */}
            <div className={`flex items-center gap-2 ${collapsed ? "md:hidden" : "flex"}`}>
              <button
                type="button"
                onClick={toggleTheme}
                className={`p-2 rounded-xl border transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                  darkMode
                    ? "border-[#252b42] bg-[#161925] text-amber-400 hover:bg-[#1e2235]"
                    : "border-slate-200 bg-slate-50 text-indigo-600 hover:bg-slate-100"
                }`}
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className={`md:hidden p-2 rounded-xl border transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                  darkMode
                    ? "border-[#252b42] bg-[#161925] text-[#9ba2c0] hover:text-white"
                    : "border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900"
                }`}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Theme toggle for collapsed state on desktop */}
          {collapsed && (
            <div className="hidden md:flex justify-center mt-4">
              <button
                type="button"
                onClick={toggleTheme}
                className={`p-2 rounded-xl border transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                  darkMode
                    ? "border-[#252b42] bg-[#161925] text-amber-400 hover:bg-[#1e2235]"
                    : "border-slate-200 bg-slate-50 text-indigo-600 hover:bg-slate-100"
                }`}
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          )}

          {/* Collapse Button (Desktop Only) */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`hidden md:flex mt-5 w-full h-[44px] rounded-2xl border flex items-center transition-all cursor-pointer ${
              darkMode 
                ? "border-[#252b42] bg-[#161925] hover:bg-[#1a1e2d] text-[#9ba2c0]" 
                : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600"
            } ${
              collapsed ? "justify-center" : "justify-between px-4"
            }`}
          >
            {!collapsed && (
              <span className="text-[0.82rem] font-medium">Collapse Menu</span>
            )}

            {collapsed ? (
              <PanelLeftOpen size={18} />
            ) : (
              <PanelLeftClose size={18} />
            )}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {!collapsed && (
            <p className={`text-[0.68rem] font-semibold tracking-[0.18em] uppercase px-6 mb-3 ${
              darkMode ? "text-[#5c6385]" : "text-slate-400"
            }`}>
              Main Menu
            </p>
          )}

          <div className="space-y-1 px-3">
            {navItems.map((item) => {
              const active = location.pathname.startsWith(item.to);

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={`group flex items-center rounded-2xl transition-colors duration-150 ${
                    collapsed
                      ? "md:justify-center h-[52px]"
                      : "gap-3 px-4 h-[52px]"
                  } ${
                    active
                      ? darkMode
                        ? "bg-[#1b2033] border border-[#2d3554] text-[#818cf8]"
                        : "bg-indigo-50 border border-indigo-100 text-indigo-600"
                      : darkMode
                        ? "text-[#98a1c0] hover:bg-[#181c2c] hover:text-white"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <item.icon size={19} strokeWidth={1.9} />

                  {/* Show text if NOT collapsed, OR on mobile */}
                  <span className={`flex-1 text-[0.92rem] font-medium ${
                    collapsed ? "md:hidden" : "block"
                  }`}>
                    {item.label}
                  </span>

                  {active && !collapsed && (
                    <ChevronRight size={15} className="opacity-60 md:block hidden" />
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Bottom User Info & Logout */}
        <div className={`p-4 border-t ${darkMode ? "border-[#20253b]" : "border-slate-200"}`}>
          {!collapsed ? (
            <>
              <div className={`rounded-2xl border p-4 mb-3 ${
                darkMode ? "border-[#252b42] bg-[#171b2a]" : "border-slate-200 bg-slate-50"
              }`}>
                <div className="flex items-center gap-3">
                  <div className="w-[42px] h-[42px] shrink-0 rounded-2xl bg-[#6366f1] flex items-center justify-center text-white font-semibold shadow-sm">
                    A
                  </div>

                  <div className="min-w-0">
                    <p className={`text-[0.9rem] font-semibold leading-none mb-1 ${
                      darkMode ? "text-white" : "text-slate-800"
                    }`}>
                      Admin
                    </p>

                    <p className="text-[0.72rem] text-[#66708f] truncate">
                      admin@acadm.edu
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowLogoutModal(true)}
                className={`w-full h-[48px] rounded-2xl border transition-all flex items-center justify-center gap-2 text-[0.9rem] font-medium cursor-pointer ${
                  darkMode 
                    ? "border-[#252b42] bg-[#151925] hover:bg-[#1b2031] text-[#98a1c0] hover:text-white" 
                    : "border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900"
                }`}
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setShowLogoutModal(true)}
              className={`w-full h-[48px] rounded-2xl border transition-all flex items-center justify-center cursor-pointer ${
                darkMode 
                  ? "border-[#252b42] bg-[#151925] hover:bg-[#1b2031] text-[#98a1c0] hover:text-white" 
                  : "border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900"
              }`}
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
      </aside>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[rgba(3,6,18,0.78)] backdrop-blur-md"
            onClick={() => setShowLogoutModal(false)}
          />

          {/* Glow */}
          <div className="absolute w-[320px] h-[320px] rounded-full bg-[#6366f1]/20 blur-3xl pointer-events-none" />

          {/* Modal */}
          <div className={`relative w-full max-w-[420px] overflow-hidden rounded-[34px] border shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl ${
            darkMode 
              ? "border-[#252b42] bg-[#10131d]/95" 
              : "border-slate-200 bg-white/95"
          }`}>
            {/* Top Gradient Line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-[#6366f1] via-[#818cf8] to-[#22d3ee]" />

            <div className="p-7">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-3xl bg-orange-500/20 blur-xl" />

                    <div className="relative w-[58px] h-[58px] rounded-[22px] border border-orange-500/20 bg-gradient-to-br from-orange-500/15 to-red-500/10 flex items-center justify-center shadow-[0_10px_30px_rgba(249,115,22,0.15)]">
                      <AlertCircle size={28} className="text-orange-400" />
                    </div>
                  </div>

                  {/* Text */}
                  <div>
                    <h2 className={`text-[1.45rem] font-bold font-outfit tracking-tight ${
                      darkMode ? "text-white" : "text-slate-800"
                    }`}>
                      Sign Out
                    </h2>

                    <p className={`text-[0.82rem] mt-1 ${
                      darkMode ? "text-[#697292]" : "text-slate-500"
                    }`}>
                      End your current admin session securely
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setShowLogoutModal(false)}
                  className={`w-10 h-10 rounded-2xl border border-transparent flex items-center justify-center group cursor-pointer ${
                    darkMode 
                      ? "hover:border-[#2a314c] hover:bg-[#181c29] text-[#697292] hover:text-white" 
                      : "hover:border-slate-200 hover:bg-slate-100 text-slate-400 hover:text-slate-800"
                  }`}
                >
                  <X size={18} className="transition-transform duration-300 ease-in-out group-hover:rotate-45" />
                </button>
              </div>

              {/* Content */}
              <div className={`rounded-[24px] border p-6 mb-7 overflow-hidden relative ${
                darkMode ? "border-[#20253b] bg-[#141826]" : "border-slate-200 bg-slate-50"
              }`}>
                {/* Processing State */}
                {loggingOut ? (
                  <div className="flex flex-col items-center justify-center py-3">
                    <div className="relative mb-5">
                      <div className="absolute inset-0 rounded-full bg-[#6366f1]/20 blur-2xl" />

                      <div className="relative w-[72px] h-[72px] rounded-full border border-[#2b3350] bg-[#171c2b] flex items-center justify-center">
                        <Loader2 size={34} className="text-[#818cf8] animate-spin" />
                      </div>
                    </div>

                    <h3 className={`font-semibold text-[1.05rem] mb-2 ${darkMode ? "text-white" : "text-slate-800"}`}>
                      Signing You Out
                    </h3>

                    <p className={`text-sm text-center leading-relaxed max-w-[260px] ${
                      darkMode ? "text-[#7d86a7]" : "text-slate-500"
                    }`}>
                      Ending your admin session and securely clearing authentication data...
                    </p>
                  </div>
                ) : logoutSuccess ? (
                  /* Success State */
                  <div className="flex flex-col items-center justify-center py-3">
                    <div className="relative mb-5">
                      <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-2xl" />

                      <div className="relative w-[72px] h-[72px] rounded-full border border-emerald-500/20 bg-emerald-500/10 flex items-center justify-center">
                        <CheckCircle2 size={34} className="text-emerald-400" />
                      </div>
                    </div>

                    <h3 className={`font-semibold text-[1.05rem] mb-2 ${darkMode ? "text-white" : "text-slate-800"}`}>
                      Successfully Signed Out
                    </h3>

                    <p className={`text-sm text-center ${
                      darkMode ? "text-[#7d86a7]" : "text-slate-500"
                    }`}>
                      Redirecting to login page...
                    </p>
                  </div>
                ) : (
                  /* Default State */
                  <>
                    <p className={`text-sm text-center leading-relaxed ${
                      darkMode ? "text-[#97a0bf]" : "text-slate-600"
                    }`}>
                      You are about to sign out from the
                      <br />
                      <span className={`font-semibold text-base ${darkMode ? "text-white" : "text-slate-800"}`}>
                        ASTNS Admin Panel
                      </span>
                      <br />
                      <br />
                      You will need to log in again to access dashboards, student records, and notification controls.
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-7">
                      <button
                        type="button"
                        onClick={() => setShowLogoutModal(false)}
                        className={`flex-1 h-[54px] rounded-2xl border font-medium transition-all cursor-pointer ${
                          darkMode 
                            ? "border-[#252b42] bg-[#171b2a] hover:bg-[#1c2133] text-[#9ba2c0] hover:text-white" 
                            : "border-slate-200 bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        Cancel
                      </button>

                      <button
                        type="button"
                        onClick={confirmLogout}
                        className="flex-1 h-[54px] rounded-2xl bg-[#6366f1] hover:bg-[#5855eb] text-white font-semibold shadow-[0_12px_35px_rgba(99,102,241,0.28)] transition-all hover:scale-[1.015] active:scale-[0.98] cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
