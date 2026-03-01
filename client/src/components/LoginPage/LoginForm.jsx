import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ShieldCheck, Mail, Lock } from "lucide-react";
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
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
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
      setError("email", {
        type: "manual",
        message,
      });
      setError("password", {
        type: "manual",
        message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Section heading */}
      <div className="flex items-center gap-2 mb-5 justify-center align-center">
        <ShieldCheck size={15} className="text-[#818cf8]" />
        <p className="text-center font-bold text-[#f0f1fa]">Admin Login</p>
      </div>

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
          onChange: () => clearErrors("password"),
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
        rules={{
          required: "Password is required",
          onChange: () => clearErrors("password"),
        }}
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
