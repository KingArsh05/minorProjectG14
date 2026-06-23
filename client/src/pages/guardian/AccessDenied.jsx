import { ShieldX } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function AccessDenied() {
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 ${
        darkMode
          ? "bg-[#06070d] text-white"
          : "bg-gradient-to-br from-indigo-50 via-slate-50 to-cyan-50 text-slate-800"
      }`}
      style={{
        backgroundImage: darkMode
          ? "radial-gradient(ellipse at 50% 40%, rgba(239,68,68,0.06) 0%, transparent 65%)"
          : "radial-gradient(ellipse at 50% 40%, rgba(239,68,68,0.03) 0%, transparent 65%)",
      }}
    >
      <div className="text-center max-w-[420px] w-full">
        {/* Shield Icon Container */}
        <div
          className={`w-[84px] h-[84px] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg ${
            darkMode
              ? "bg-[#ef4444]/10 border border-[#ef4444]/30 shadow-red-950/20"
              : "bg-red-50 border border-red-200 shadow-red-100/50"
          }`}
        >
          <ShieldX size={36} className="text-[#ef4444]" />
        </div>

        {/* Title */}
        <h1
          className={`text-[1.8rem] font-extrabold mb-3 font-outfit tracking-tight ${
            darkMode ? "text-white" : "text-slate-800"
          }`}
        >
          Access Denied
        </h1>

        {/* Core Descriptions */}
        <p
          className={`text-sm leading-relaxed mb-2 ${
            darkMode ? "text-[#9ba2c0]" : "text-slate-600"
          }`}
        >
          The link you used is either{" "}
          <strong className="text-[#ef4444] font-semibold">invalid</strong>,{" "}
          <strong className="text-[#fbbf24] font-semibold">expired</strong>, or has already
          been accessed.
        </p>

        <p
          className={`text-[0.82rem] leading-relaxed mb-6 ${
            darkMode ? "text-[#5c6385]" : "text-slate-400"
          }`}
        >
          For security, links automatically expire after a set time limit or single access. Please contact the institution administrator to obtain a new token.
        </p>

        {/* Reasons Card */}
        <div
          className={`border rounded-2xl p-5 mb-6 text-left ${
            darkMode
              ? "bg-[#111322]/80 border-white/5 shadow-inner"
              : "bg-white border-slate-200 shadow-sm"
          }`}
        >
          <p
            className={`text-[0.68rem] font-bold mb-3 uppercase tracking-[0.16em] ${
              darkMode ? "text-[#5c6385]" : "text-slate-400"
            }`}
          >
            Possible Reasons
          </p>

          <div className="space-y-2.5">
            {[
              "Cryptographic link has expired",
              "Link has already been accessed once",
              "Session was manually terminated by administrator",
              "Secure access token has been modified or tampered",
            ].map((r, i) => (
              <div key={i} className="flex gap-2.5 items-start">
                <span className="text-[#ef4444] text-[0.8rem] leading-none select-none mt-0.5">
                  ✕
                </span>
                <p
                  className={`text-[0.8rem] font-semibold ${
                    darkMode ? "text-[#9ba2c0]" : "text-slate-600"
                  }`}
                >
                  {r}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <p
          className={`text-[0.68rem] font-medium tracking-wide ${
            darkMode ? "text-[#5c6385]" : "text-slate-400"
          }`}
        >
          🔒 Academic Status Transparency Notification System — ASTNS
        </p>
      </div>
    </div>
  );
}
