import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useState, useEffect } from "react";
import { useTheme } from "./ThemeContext";
import { ShieldCheck } from "lucide-react";

function LoadingScreen() {
  const { darkMode } = useTheme();
  const [stage, setStage] = useState(0);
  const stages = [
    "Verifying session...",
    "Validating security tokens...",
    "Establishing secure tunnel...",
    "Decrypting credentials..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev + 1) % stages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-colors duration-500 ${
        darkMode ? "bg-[#06070d]" : "bg-gradient-to-br from-indigo-50/70 via-slate-50 to-cyan-50/70"
      }`}
    >
      {/* Dynamic Keyframes */}
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes orbit-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-ccw {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes pulse-glow-1 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.12; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.18; }
        }
        @keyframes pulse-glow-2 {
          0%, 100% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.08; }
          50% { transform: translate(-50%, -50%) scale(1.0); opacity: 0.14; }
        }
      `}</style>

      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-[140px] ${
            darkMode ? "bg-indigo-500" : "bg-indigo-400"
          }`}
          style={{
            animation: "pulse-glow-1 8s ease-in-out infinite",
            transformOrigin: "center",
          }}
        />
        <div
          className={`absolute bottom-1/4 right-1/3 w-[450px] h-[450px] rounded-full blur-[160px] ${
            darkMode ? "bg-cyan-500" : "bg-cyan-400"
          }`}
          style={{
            animation: "pulse-glow-2 10s ease-in-out infinite",
            transformOrigin: "center",
          }}
        />
      </div>

      {/* Glassmorphic Verification Hub Card */}
      <div
        className={`relative max-w-sm w-full mx-4 rounded-[32px] border p-8 text-center shadow-2xl backdrop-blur-xl transition-all duration-300 overflow-hidden ${
          darkMode
            ? "bg-[#111322]/80 border-white/10 shadow-black/60"
            : "bg-white/85 border-slate-200/80 shadow-indigo-100/50"
        }`}
      >
        {/* Sweeping Laser Scan Line */}
        <div className="absolute inset-0 overflow-hidden rounded-[32px] pointer-events-none">
          <div
            className="w-full h-[3px] bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent absolute"
            style={{
              animation: "scan 3s cubic-bezier(0.4, 0, 0.2, 1) infinite",
            }}
          />
        </div>

        {/* Concentric Rotating Scanner Rings */}
        <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          {/* Outer Spin Ring */}
          <div
            className={`absolute inset-0 rounded-full border-[3px] border-transparent ${
              darkMode ? "border-t-indigo-500/80 border-b-indigo-500/20" : "border-t-indigo-600/80 border-b-indigo-600/10"
            }`}
            style={{ animation: "orbit-cw 3s linear infinite" }}
          />

          {/* Middle Counter-Spin Ring */}
          <div
            className={`absolute inset-2.5 rounded-full border-2 border-transparent ${
              darkMode ? "border-r-cyan-400/80 border-l-cyan-400/20" : "border-r-cyan-500/80 border-l-cyan-500/10"
            }`}
            style={{ animation: "orbit-ccw 2s linear infinite" }}
          />

          {/* Inner Breathing Glowing Ring */}
          <div
            className={`absolute inset-5 rounded-full flex items-center justify-center shadow-inner ${
              darkMode
                ? "bg-indigo-500/10 shadow-indigo-500/20 text-indigo-400 border border-white/5"
                : "bg-indigo-50 shadow-indigo-200/50 text-indigo-600 border border-slate-200"
            }`}
            style={{ animation: "breathe 2s ease-in-out infinite" }}
          >
            <ShieldCheck className="w-7 h-7" />
          </div>
        </div>

        {/* Dynamic Status Typography */}
        <div className="relative z-10 space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest font-outfit uppercase border bg-indigo-500/10 border-indigo-500/20 text-[#818cf8] dark:text-indigo-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#818cf8] dark:bg-indigo-400 animate-pulse" />
            Security Gateway
          </div>
          
          <h3
            className={`text-base font-extrabold font-outfit tracking-wide transition-all duration-300 ${
              darkMode ? "text-white" : "text-slate-800"
            }`}
          >
            {stages[stage]}
          </h3>
          
          <p
            className={`text-xs leading-relaxed max-w-[280px] mx-auto transition-colors duration-300 ${
              darkMode ? "text-[#9ba2c0]" : "text-slate-500"
            }`}
          >
            Please wait while ASTNS establishes a secure encrypted tunnel and validates session tokens.
          </p>
        </div>
      </div>
    </div>
  );
}


export default function ProtectedRoute({ children }) {
  const { loading, isAuthenticated, authChecked, checkAuth } = useAuth();
  const location = useLocation();

  // Lazy auth check — only runs when navigating to a protected route
  useEffect(() => {
    if (!authChecked) {
      checkAuth();
    }
  }, [authChecked, checkAuth]);

  // Still checking session
  if (loading || !authChecked) {
    return <LoadingScreen />;
  }

  // Not authenticated → redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Authenticated → render children
  return children;
}
