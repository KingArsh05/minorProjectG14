import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ShieldCheck, Mail, Lock } from "lucide-react";
import InputField from "./InputField";

export default function LoginForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "admin@gmail.com",
      password: "admin123",
    },
  });

  const onSubmit = (data) => {
    setServerError("");
    if (data.email === "admin@gmail.com" && data.password === "admin123") {
      setLoading(true);
      setTimeout(() => navigate("/admin/dashboard"), 1200);
    } else {
      setServerError("Invalid credentials. Try admin@acadm.edu / admin123");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Section heading */}
      <div className="flex items-center gap-2 mb-5 justify-center align-center">
        <ShieldCheck size={15} className="text-[#818cf8]" />
        <p className="text-center font-bold text-[#f0f1fa]">
          Admin Login
        </p>
      </div>

      {/* Server-level error */}
      {serverError && (
        <div className="bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] text-[#f87171] text-[0.82rem] rounded-xl px-4 py-3 mb-4 leading-snug">
          {serverError}
        </div>
      )}

      {/* Email field */}
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
            message: "Enter a valid email address",
          },
        }}
        errors={errors}
      />

      {/* Password field */}
      <InputField
        label="Password"
        id="password"
        type="password"
        placeholder="Enter password"
        icon={<Lock size={15} />}
        register={register}
        rules={{ required: "Password is required" }}
        errors={errors}
      />

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full mt-12 flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-white text-sm font-semibold cursor-pointer transition-all bg-linear-to-br from-[#6366f1] to-[#4f46e5] shadow-[0_4px_15px_rgba(99,102,241,0.25)] hover:-translate-y-px hover:shadow-[0_6px_22px_rgba(99,102,241,0.38)] disabled:opacity-60 disabled:cursor-not-allowed"
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
  );
}
