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
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/admin/dashboard" },
  { label: "Upload Data", icon: Upload, to: "/admin/upload" },
  { label: "Students", icon: Users, to: "/admin/students" },
  { label: "Send Notifications", icon: Send, to: "/admin/notifications" },
  { label: "Token Management", icon: KeyRound, to: "/admin/tokens" },
];

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const confirmLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <aside className="fixed left-0 top-0 h-screen w-[260px] bg-[#11131f] border-r border-[#252840] z-100 flex flex-col overflow-y-auto overflow-x-hidden">
        {/* Logo */}
        <div className="px-5 py-[1.4rem] border-b border-[#252840]">
          <div className="flex items-center gap-3">
            <div className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center shrink-0 shadow-[0_4px_15px_rgba(99,102,241,0.25)] bg-linear-to-br from-[#6366f1] to-[#06b6d4]">
              <GraduationCap size={20} className="text-white" />
            </div>
            <div>
              <p
                className="text-[0.9rem] font-bold text-[#f0f1fa]"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                ASTNS
              </p>
              <p className="text-[0.65rem] text-[#5c6385] tracking-[0.05em]">
                Admin Panel
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 pt-3">
          <p className="text-[0.65rem] font-semibold text-[#5c6385] tracking-widest uppercase px-6 mb-1">
            Main Menu
          </p>
          {navItems.map((item) => {
            const active = location.pathname.startsWith(item.to);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-5 py-[0.7rem] mx-3 my-[0.15rem] rounded-[10px] text-[0.875rem] font-medium transition-all duration-200 no-underline
                ${
                  active
                    ? "bg-linear-to-r from-[rgba(99,102,241,0.2)] to-[rgba(6,182,212,0.1)] text-[#818cf8] border border-[rgba(99,102,241,0.2)]"
                    : "text-[#9ba2c0] hover:bg-[#1e2132] hover:text-[#f0f1fa]"
                }`}
              >
                <item.icon size={18} strokeWidth={1.8} />
                <span className="flex-1">{item.label}</span>
                {active && <ChevronRight size={14} className="opacity-60" />}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-[#252840]">
          <div className="bg-[rgba(99,102,241,0.08)] border border-[rgba(99,102,241,0.2)] rounded-xl p-[0.85rem] mb-3">
            <div className="flex items-center gap-[0.6rem]">
              <div className="w-[30px] h-[30px] rounded-lg bg-linear-to-br from-[#6366f1] to-[#4f46e5] flex items-center justify-center text-[0.8rem] font-bold text-white shrink-0">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[0.8rem] font-semibold text-[#f0f1fa] leading-tight">
                  Admin
                </p>
                <p className="text-[0.68rem] text-[#5c6385] overflow-hidden text-ellipsis whitespace-nowrap">
                  admin@acadm.edu
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-[0.8rem] text-[#9ba2c0] border border-[#252840] bg-transparent cursor-pointer transition-all hover:border-[#6366f1] hover:text-[#818cf8]"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 fade-in">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowLogoutModal(false)}
          />
  
          {/* Modal Content */}
          <div className="relative w-full max-w-sm bg-[#13162b] border border-[#252840] rounded-2xl shadow-2xl p-6 overflow-hidden">
            {/* Decorative background glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20">
                <AlertCircle size={24} className="text-orange-500" />
              </div>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="p-2 text-[#5c6385] hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2 font-['Outfit']">
                Sign Out?
              </h3>
              <p className="text-[#9ba2c0] text-sm leading-relaxed">
                Are you sure you want to sign out? You will need to log in again
                to access the admin panel.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#252840] text-[#9ba2c0] text-sm font-semibold hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 px-4 py-2.5 rounded-xl bg-linear-to-r from-indigo-500 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
