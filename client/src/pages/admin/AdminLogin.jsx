import { GraduationCap } from "lucide-react";
import LoginForm from "../../components/LoginPage/LoginForm";

export default function AdminLogin() {
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

        {/* Login Form Component */}
        <LoginForm />
      </div>

      <p className="absolute bottom-5 text-[0.72rem] text-[#5c6385]">
        Academic Status Transparency Notification System — G14
      </p>
    </div>
  );
}
