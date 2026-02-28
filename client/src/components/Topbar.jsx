import { useState } from "react";
import { Search, Bell, ChevronDown } from "lucide-react";

const notes = [
  { msg: "14 notifications sent today", time: "2 min ago" },
  { msg: "CSV upload completed – CSE Sem 4", time: "1 hr ago" },
  { msg: "3 tokens expired – action needed", time: "3 hrs ago" },
];

export default function Topbar({ title, subtitle }) {
  const [showNotif, setShowNotif] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-[260px] h-[68px] bg-[rgba(17,19,31,0.95)] backdrop-blur-md border-b border-[#252840] z-90 flex items-center justify-between px-8">
      {/* Left */}
      <div>
        <h1
          className="text-[1.15rem] font-bold text-[#f0f1fa] leading-tight"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-[0.75rem] text-[#5c6385] mt-px">{subtitle}</p>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c6385]"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-[220px] h-9 bg-[#161925] border border-[#252840] text-[#f0f1fa] pl-9 pr-3 rounded-xl text-[0.8rem] outline-none transition-all focus:border-[#6366f1] placeholder:text-[#5c6385]"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-[#1e2132] border border-[#252840] text-[#9ba2c0] cursor-pointer transition-all hover:border-[#6366f1] hover:text-[#818cf8]"
          >
            <Bell size={16} />
            <span className="absolute top-[6px] right-[6px] w-[7px] h-[7px] bg-[#ef4444] rounded-full border-[1.5px] border-[#11131f]" />
          </button>
          {showNotif && (
            <div className="absolute right-0 top-[calc(100%+8px)] w-[280px] bg-[#161925] border border-[#2e3354] rounded-xl p-3 z-200 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
              <p className="text-[0.72rem] font-semibold text-[#5c6385] mb-2 uppercase tracking-widest">
                Notifications
              </p>
              {notes.map((n, i) => (
                <div
                  key={i}
                  className="px-3 py-[0.6rem] rounded-lg bg-[#1e2132] mb-1 cursor-pointer hover:bg-[#252840] transition-colors"
                >
                  <p className="text-[0.8rem] text-[#f0f1fa] leading-snug">
                    {n.msg}
                  </p>
                  <p className="text-[0.7rem] text-[#5c6385] mt-[2px]">
                    {n.time}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2 bg-[#1e2132] border border-[#252840] rounded-[10px] px-3 py-[0.35rem] cursor-pointer">
          <div className="w-7 h-7 rounded-[7px] flex items-center justify-center text-[0.78rem] font-bold text-white bg-linear-to-br from-[#6366f1] to-[#06b6d4]">
            A
          </div>
          <span className="text-[0.82rem] font-semibold text-[#f0f1fa]">
            Admin
          </span>
          <ChevronDown size={13} className="text-[#5c6385]" />
        </div>
      </div>
    </header>
  );
}
