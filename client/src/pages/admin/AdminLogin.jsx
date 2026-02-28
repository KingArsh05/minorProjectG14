import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@acadm.edu" && password === "admin123") {
      setLoading(true);
      setTimeout(() => navigate("/admin/dashboard"), 1200);
    } else {
      setError("Invalid credentials. Try admin@acadm.edu / admin123");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b14] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Glows */}
      <div
        className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.12), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[-80px] right-[-100px] w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(6,182,212,0.08), transparent 70%)",
        }}
      />
      {/* Grid bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#252840 1px,transparent 1px),linear-gradient(90deg,#252840 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-[440px] bg-[rgba(19,22,43,0.85)] backdrop-blur-xl border border-[#252840] rounded-2xl p-10 fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_8px_30px_rgba(99,102,241,0.35)] bg-linear-to-br from-[#6366f1] to-[#06b6d4]">
            <GraduationCap size={28} className="text-white" />
          </div>
          <h1
            className="text-[2rem] font-extrabold gradient-text"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            AcadAlert
          </h1>
          <p className="text-[0.85rem] text-[#5c6385] mt-1">
            Academic Status Notification System
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-2 mb-5">
            <ShieldCheck size={15} className="text-[#818cf8]" />
            <p className="text-[0.875rem] font-semibold text-[#f0f1fa]">
              Admin Login
            </p>
          </div>

          {error && (
            <div className="bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] text-[#f87171] text-[0.82rem] rounded-xl px-4 py-3 mb-4 leading-snug">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="block text-[0.78rem] font-semibold text-[#5c6385] tracking-wide uppercase mb-[0.4rem]">
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={15}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5c6385]"
              />
              <input
                type="email"
                placeholder="admin@acadm.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#161925] border border-[#252840] text-[#f0f1fa] pl-10 pr-4 py-[0.65rem] rounded-xl text-sm outline-none transition-all focus:border-[#6366f1] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.12)] placeholder:text-[#5c6385]"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-[0.78rem] font-semibold text-[#5c6385] tracking-wide uppercase mb-[0.4rem]">
              Password
            </label>
            <div className="relative">
              <Lock
                size={15}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5c6385]"
              />
              <input
                type={showPw ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#161925] border border-[#252840] text-[#f0f1fa] pl-10 pr-11 py-[0.65rem] rounded-xl text-sm outline-none transition-all focus:border-[#6366f1] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.12)] placeholder:text-[#5c6385]"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5c6385] hover:text-[#9ba2c0] transition-colors"
                onClick={() => setShowPw(!showPw)}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-5 py-[0.7rem] rounded-xl text-white text-sm font-semibold cursor-pointer transition-all bg-linear-to-br from-[#6366f1] to-[#4f46e5] shadow-[0_4px_15px_rgba(99,102,241,0.25)] hover:-translate-y-px hover:shadow-[0_6px_22px_rgba(99,102,241,0.38)] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in…
              </>
            ) : (
              "Sign In to Dashboard"
            )}
          </button>
        </form>

        {/* Demo hint */}
        <div className="mt-5 bg-[rgba(99,102,241,0.08)] border border-[rgba(99,102,241,0.2)] rounded-xl px-4 py-3">
          <p className="text-[0.72rem] text-[#5c6385] mb-1 font-semibold uppercase tracking-wide">
            Demo Credentials
          </p>
          <p className="text-[0.8rem] text-[#818cf8] font-mono">
            admin@acadm.edu / admin123
          </p>
        </div>
      </div>

      <p className="absolute bottom-5 text-[0.72rem] text-[#5c6385]">
        Academic Status Transparency Notification System — G14
      </p>
    </div>
  );
}
