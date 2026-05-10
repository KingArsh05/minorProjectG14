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
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/admin/dashboard" },
  { label: "Upload Data", icon: Upload, to: "/admin/upload" },
  { label: "Students", icon: Users, to: "/admin/students" },
  { label: "Send Notifications", icon: Send, to: "/admin/notifications" },
  { label: "Token Management", icon: KeyRound, to: "/admin/tokens" },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  const { logout } = useAuth();

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
      <aside
        className={`fixed left-0 top-0 h-screen bg-[#11131f] border-r border-[#20253b] z-50 flex flex-col overflow-hidden transition-all duration-300 ${
          collapsed ? "w-[84px]" : "w-[270px]"
        }`}
      >
        {/* Top */}
        <div className="px-4 py-5 border-b border-[#20253b]">
          <div
            className={`flex items-center ${
              collapsed ? "justify-center" : "justify-between"
            }`}
          >
            {!collapsed && (
              <div className="flex items-center gap-3">
                <div className="w-[42px] h-[42px] rounded-2xl bg-[#6366f1] flex items-center justify-center shadow-[0_8px_25px_rgba(99,102,241,0.25)] cursor-pointer" onClick={()=> navigate("/")}>
                  <GraduationCap size={20} className="text-white" />
                </div>

                <div>
                  <p className="text-[1rem] font-bold text-white font-outfit">
                    ASTNS
                  </p>

                  <p className="text-[0.7rem] text-[#66708f]">Admin Panel</p>
                </div>
              </div>
            )}

            {collapsed && (
              <div className="w-[42px] h-[42px] rounded-2xl bg-[#6366f1] flex items-center justify-center shadow-[0_8px_25px_rgba(99,102,241,0.25)] cursor-pointer" onClick={()=> navigate("/")}>
                <GraduationCap size={20} className="text-white" />
              </div>
            )}
          </div>

          {/* Collapse Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`mt-5 w-full h-[44px] rounded-2xl border border-[#252b42] bg-[#161925] hover:bg-[#1a1e2d] text-[#9ba2c0] flex items-center transition-all ${
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

        {/* Navigation */}
        <nav className="flex-1 py-4">
          {!collapsed && (
            <p className="text-[0.68rem] font-semibold tracking-[0.18em] uppercase text-[#5c6385] px-6 mb-3">
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
                  className={`group flex items-center rounded-2xl transition-all duration-200 ${
                    collapsed
                      ? "justify-center h-[52px]"
                      : "gap-3 px-4 h-[52px]"
                  } ${
                    active
                      ? "bg-[#1b2033] border border-[#2d3554] text-[#818cf8]"
                      : "text-[#98a1c0] hover:bg-[#181c2c] hover:text-white"
                  }`}
                >
                  <item.icon size={19} strokeWidth={1.9} />

                  {!collapsed && (
                    <>
                      <span className="flex-1 text-[0.92rem] font-medium">
                        {item.label}
                      </span>

                      {active && (
                        <ChevronRight size={15} className="opacity-60" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-[#20253b]">
          {!collapsed ? (
            <>
              <div className="rounded-2xl border border-[#252b42] bg-[#171b2a] p-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-[42px] h-[42px] rounded-2xl bg-[#6366f1] flex items-center justify-center text-white font-semibold">
                    A
                  </div>

                  <div className="min-w-0">
                    <p className="text-[0.9rem] font-semibold text-white">
                      Admin
                    </p>

                    <p className="text-[0.72rem] text-[#66708f] truncate">
                      admin@acadm.edu
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowLogoutModal(true)}
                className="w-full h-[48px] rounded-2xl border border-[#252b42] bg-[#151925] hover:bg-[#1b2031] text-[#98a1c0] hover:text-white transition-all flex items-center justify-center gap-2 text-[0.9rem] font-medium"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-full h-[48px] rounded-2xl border border-[#252b42] bg-[#151925] hover:bg-[#1b2031] text-[#98a1c0] hover:text-white transition-all flex items-center justify-center"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
      </aside>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[rgba(3,6,18,0.78)] backdrop-blur-md"
            onClick={() => setShowLogoutModal(false)}
          />

          {/* Glow */}
          <div className="absolute w-[320px] h-[320px] rounded-full bg-[#6366f1]/20 blur-3xl pointer-events-none" />

          {/* Modal */}
          <div className="relative w-full max-w-[420px] overflow-hidden rounded-[34px] border border-[#252b42] bg-[#10131d]/95 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
            {/* Top Gradient Line */}
            <div className="h-[2px] w-full bg-linear-to-r from-[#6366f1] via-[#818cf8] to-[#22d3ee]" />

            <div className="p-7">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-3xl bg-orange-500/20 blur-xl" />

                    <div className="relative w-[58px] h-[58px] rounded-[22px] border border-orange-500/20 bg-linear-to-br from-orange-500/15 to-red-500/10 flex items-center justify-center shadow-[0_10px_30px_rgba(249,115,22,0.15)]">
                      <AlertCircle size={28} className="text-orange-400" />
                    </div>
                  </div>

                  {/* Text */}
                  <div>
                    <h2 className="text-[1.45rem] font-bold text-white font-outfit tracking-tight">
                      Sign Out
                    </h2>

                    <p className="text-[0.82rem] text-[#697292] mt-1">
                      End your current admin session securely
                    </p>
                  </div>
                </div>

                {/* Close */}
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="w-10 h-10 rounded-2xl border border-transparent hover:border-[#2a314c] hover:bg-[#181c29] flex items-center justify-center text-[#697292] hover:text-white transition-all group"
                >
                  <X size={18} className="transition-all duration-300 ease-in-out group-hover:rotate-45" />
                </button>
              </div>

              {/* Content */}
              <div className="rounded-[24px] border border-[#20253b] bg-[#141826] p-6 mb-7 overflow-hidden relative">
                {/* Processing State */}
                {loggingOut ? (
                  <div className="flex flex-col items-center justify-center py-3">
                    <div className="relative mb-5">
                      <div className="absolute inset-0 rounded-full bg-[#6366f1]/20 blur-2xl" />

                      <div className="relative w-[72px] h-[72px] rounded-full border border-[#2b3350] bg-[#171c2b] flex items-center justify-center">
                        <Loader2
                          size={34}
                          className="text-[#818cf8] animate-spin"
                        />
                      </div>
                    </div>

                    <h3 className="text-white font-semibold text-[1.05rem] mb-2">
                      Signing You Out
                    </h3>

                    <p className="text-[#7d86a7] text-sm text-center leading-relaxed max-w-[260px]">
                      Ending your admin session and securely clearing
                      authentication data...
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

                    <h3 className="text-white font-semibold text-[1.05rem] mb-2">
                      Successfully Signed Out
                    </h3>

                    <p className="text-[#7d86a7] text-sm text-center">
                      Redirecting to login page...
                    </p>
                  </div>
                ) : (
                  /* Default State */
                  <>
                    <p className="text-sm text-center leading-relaxed text-[#97a0bf]">
                      You are about to sign out from the
                      <br />
                      <span className="text-white font-semibold text-base">
                        ASTNS Admin Panel
                      </span>
                      <br />
                      <br />
                      You will need to log in again to access dashboards,
                      student records, and notification controls.
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-7">
                      <button
                        onClick={() => setShowLogoutModal(false)}
                        className="flex-1 h-[54px] rounded-2xl border border-[#252b42] bg-[#171b2a] hover:bg-[#1c2133] text-[#9ba2c0] hover:text-white font-medium transition-all"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={confirmLogout}
                        className="flex-1 h-[54px] rounded-2xl bg-[#6366f1] hover:bg-[#5855eb] text-white font-semibold shadow-[0_12px_35px_rgba(99,102,241,0.28)] transition-all hover:scale-[1.015] active:scale-[0.98]"
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
