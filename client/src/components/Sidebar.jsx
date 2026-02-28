import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  Users,
  Send,
  KeyRound,
  GraduationCap,
  ChevronRight,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/admin/dashboard" },
  { label: "Upload Data", icon: Upload, to: "/admin/upload" },
  { label: "Students", icon: Users, to: "/admin/students" },
  { label: "Send Notifications", icon: Send, to: "/admin/notifications" },
  { label: "Token Management", icon: KeyRound, to: "/admin/tokens" },
];

export default function Sidebar() {
  const location = useLocation();
  return (
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
              AcadAlert
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
          onClick={() => (window.location.href = "/")}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-[0.8rem] text-[#9ba2c0] border border-[#252840] bg-transparent cursor-pointer transition-all hover:border-[#6366f1] hover:text-[#818cf8]"
        >
          <LogOut size={14} /> Sign Out
        </button>
      </div>
    </aside>
  );
}
