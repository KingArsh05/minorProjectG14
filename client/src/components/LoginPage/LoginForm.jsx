import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ShieldCheck, Mail, Lock, AlertCircle } from "lucide-react";
import InputField from "./InputField";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm({
    defaultValues: {
      email: "arshabs@gmail.com",
      password: "abn@123RockArsh",
    },
  });

  const watchEmail = watch("email");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      clearErrors();
      const response = await login({
        email: data.email,
        password: data.password,
      });
      if (response.success) {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error("Login Error:", error);
      const message = error.response?.data?.message || "Invalid credentials";
      setError("root", {
        type: "manual",
        message,
      });
    } finally {
      setLoading(false);
    }
  };

  const hasRootError = errors.root?.message;

  return (
    <div className="w-full max-w-[420px] mx-auto">
      {/* Glassmorphism card container */}
      <div className="relative bg-[#13142a]/80 backdrop-blur-xl border border-[#2e2f5a]/60 rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]">
        {/* Top accent glow */}
        <div className="absolute -top-px left-6 right-6 h-px bg-linear-to-r from-transparent via-[#6366f1]/50 to-transparent" />

        {/* Header */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/20 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
            <ShieldCheck size={22} className="text-[#818cf8]" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold text-[#f0f1fa] tracking-tight">
              Admin Login
            </h1>
            <p className="text-sm text-[#6b6e9c] mt-1">
              Enter your credentials to access the dashboard
            </p>
          </div>
        </div>

        {/* Global error alert */}
        {hasRootError && (
          <div className="mb-6 flex items-start gap-2.5 p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-in fade-in slide-in-from-top-1 duration-200">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>{errors.root.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email field */}
          <div className="space-y-1.5">
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
                  value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                  message: "Enter a valid Gmail address",
                },
                onChange: () => {
                  clearErrors("email");
                  clearErrors("root");
                },
              }}
              errors={errors}
            />
            {watchEmail && !errors.email && (
              <p className="text-[10px] text-[#4ade80]/70 px-1 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-[#4ade80]/70" />
                Email format looks good
              </p>
            )}
          </div>

          {/* Password field */}
          <div className="space-y-1.5">
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
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full mt-2 flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl text-white text-sm font-semibold cursor-pointer transition-all duration-300 bg-linear-to-br from-[#6366f1] to-[#4f46e5] shadow-[0_4px_20px_rgba(99,102,241,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(99,102,241,0.45)] active:translate-y-0 active:shadow-[0_2px_10px_rgba(99,102,241,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[0_4px_20px_rgba(99,102,241,0.3)] overflow-hidden"
          >
            {/* Button shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/10 to-transparent" />

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

        {/* Footer hint */}
        <p className="text-center text-[11px] text-[#4b4d7a] mt-6">
          Protected by admin authentication protocols
        </p>
      </div>
    </div>
  );
}
