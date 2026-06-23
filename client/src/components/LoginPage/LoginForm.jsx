import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  ShieldCheck,
  Mail,
  Lock,
  AlertCircle,
  GraduationCap,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import InputField from "./InputField";

const GMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

export default function LoginForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { darkMode } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm({
    defaultValues: { email: "arshabs@gmail.com", password: "abn@123RockArsh" },
    mode: "onChange",
  });

  const watchEmail = watch("email");
  const emailLooksGood =
    watchEmail && GMAIL_REGEX.test(watchEmail) && !errors.email;

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      clearErrors();
      const response = await login({
        email: data.email,
        password: data.password,
      });
      if (response.success) navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      const message = error.response?.data?.message || "Invalid credentials";
      setError("root", { type: "manual", message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 relative overflow-hidden transition-colors duration-300 ${darkMode ? "bg-[#0a0b14]" : "bg-gradient-to-br from-indigo-50 via-slate-50 to-cyan-50"}`}
    >
      {/* Glow blobs */}
      <div
        className={`absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none ${darkMode ? "opacity-100" : "opacity-70"}`}
        style={{
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.18), transparent 70%)",
        }}
      />
      <div
        className={`absolute bottom-[-80px] right-[-100px] w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none ${darkMode ? "opacity-100" : "opacity-60"}`}
        style={{
          background:
            "radial-gradient(ellipse, rgba(6,182,212,0.14), transparent 70%)",
        }}
      />
      <div
        className={`absolute bottom-1/4 left-[-80px] w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none ${darkMode ? "opacity-0" : "opacity-40"}`}
        style={{
          background:
            "radial-gradient(ellipse, rgba(139,92,246,0.12), transparent 70%)",
        }}
      />

      {/* Grid overlay */}
      <div
        className={`absolute inset-0 pointer-events-none ${darkMode ? "opacity-[0.03]" : "opacity-[0.035]"}`}
        style={{
          backgroundImage:
            "linear-gradient(#6366f1 1px,transparent 1px),linear-gradient(90deg,#6366f1 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Card */}
      <div
        className={`relative z-10 w-full max-w-[440px] backdrop-blur-xl rounded-2xl p-10 fade-in border transition-all duration-300 ${darkMode ? "bg-[#13142a]/85 border-[#252840] shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]" : "bg-white/80 border-indigo-100 shadow-[0_8px_40px_rgba(99,102,241,0.10),0_2px_8px_rgba(99,102,241,0.06)]"}`}
      >
        {/* Top accent line */}
        <div
          className={`absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent to-transparent ${darkMode ? "via-[#6366f1]/50" : "via-indigo-400/40"}`}
        />

        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_8px_30px_rgba(99,102,241,0.35)] bg-gradient-to-br from-indigo-500 to-cyan-500">
            <GraduationCap size={28} className="text-white" />
          </div>
          <h1 className="text-[2rem] font-extrabold font-['Outfit'] bg-clip-text text-transparent bg-gradient-to-br from-indigo-500 to-cyan-500">
            ASTNS
          </h1>
          <p
            className={`text-[0.85rem] mt-1 ${darkMode ? "text-[#5c6385]" : "text-slate-500"}`}
          >
            Academic Status Transparency Notification System
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className={`flex-1 h-px ${darkMode ? "bg-[#252840]" : "bg-indigo-100"}`}
          />
          <div className="flex items-center justify-center gap-1.5">
            <ShieldCheck
              size={14}
              className={darkMode ? "text-[#818cf8]" : "text-indigo-500"}
            />
            <span
              className={`text-[0.72rem] font-semibold uppercase tracking-widest ${darkMode ? "text-[#6b6e9c]" : "bg-clip-text text-transparent bg-gradient-to-br from-indigo-500 to-cyan-500"}`}
            >
              Admin Login
            </span>
          </div>
          <div
            className={`flex-1 h-px ${darkMode ? "bg-[#252840]" : "bg-indigo-100"}`}
          />
        </div>

        {/* Root error alert */}
        {errors.root?.message && (
          <div
            className={`mb-5 flex items-start gap-2.5 p-3.5 rounded-lg text-sm border ${darkMode ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-red-50 border-red-200 text-red-500"}`}
          >
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>{errors.root.message}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          {/* Email field */}
          <div>
            <InputField
              label="Email Address"
              id="email"
              type="email"
              placeholder="admin@gmail.com"
              icon={<Mail size={15} />}
              register={register}
              rules={{
                required: "Email is required",
                pattern: {
                  value: GMAIL_REGEX,
                  message: "Enter a valid Gmail address",
                },
                onChange: () => {
                  clearErrors("email");
                  clearErrors("root");
                },
              }}
              errors={errors}
            />
            {emailLooksGood && (
              <p
                className={`flex items-center gap-1 -mt-3 mb-2 px-1 text-[10px] ${darkMode ? "text-[#4ade80]/80" : "text-emerald-500"}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${darkMode ? "bg-[#4ade80]/80" : "bg-emerald-400"}`}
                />
                Email format looks good
              </p>
            )}
          </div>

          {/* Password field */}
          <InputField
            label="Password"
            id="password"
            type="password"
            placeholder="Enter your password"
            icon={<Lock size={15} />}
            register={register}
            rules={{
              required: "Password is required",
              onChange: () => {
                clearErrors("password");
                clearErrors("root");
              },
            }}
            errors={errors}
          />

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full mt-3 flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl text-white text-sm font-semibold cursor-pointer transition-all duration-300 overflow-hidden bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-[0_4px_20px_rgba(99,102,241,0.30),0_2px_8px_rgba(6,182,212,0.15),inset_0_1px_0_rgba(255,255,255,0.10)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(99,102,241,0.40),0_4px_16px_rgba(6,182,212,0.20)] active:translate-y-0 active:shadow-[0_2px_10px_rgba(99,102,241,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[0_4px_20px_rgba(99,102,241,0.30)]"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            {loading ? (
              <>
                <span className="relative w-4 h-4 border-[2.5px] border-white/20 border-t-white rounded-full animate-spin" />
                <span className="relative">Authenticating...</span>
              </>
            ) : (
              <>
                <span className="relative">Sign In to Dashboard</span>
                <svg
                  className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </>
            )}
          </button>
        </form>

        <p
          className={`text-center text-[11px] mt-5 ${darkMode ? "text-[#4b4d7a]" : "text-indigo-300"}`}
        >
          Protected by admin authentication protocols
        </p>
      </div>

      {/* Page footer */}
      <p
        className={`absolute bottom-5 text-[0.72rem] ${darkMode ? "text-[#5c6385]" : "text-indigo-400"}`}
      >
        Academic Status Transparency Notification System — G14
      </p>
    </div>
  );
}
