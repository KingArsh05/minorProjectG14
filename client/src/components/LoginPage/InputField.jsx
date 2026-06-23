import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function InputField({
  label,
  id,
  type = "text",
  register,
  rules,
  errors,
  placeholder,
  icon,
}) {
  const { darkMode } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;
  const hasError = errors?.[id];

  return (
    <div className="mb-1">
      {label && (
        <label
          htmlFor={id}
          className={`block text-[0.75rem] font-semibold uppercase tracking-wide mb-1.5 ${darkMode ? "text-[#6b6e9c]" : "bg-clip-text text-transparent bg-gradient-to-br from-indigo-500 to-cyan-500"}`}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span
            className={`absolute inset-y-0 left-0 flex items-center pl-3.5 ${darkMode ? "text-[#5c6385]" : "text-indigo-300"}`}
          >
            {icon}
          </span>
        )}

        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          className={`w-full rounded-xl text-sm outline-none transition-all duration-200 py-[0.65rem] ${icon ? "pl-10" : "px-4"} ${type === "password" ? "pr-10" : "pr-4"} ${darkMode ? "bg-[#161925] text-[#f0f1fa] placeholder-[#5c6385] border" : "bg-white text-slate-700 placeholder-slate-300 border"} ${hasError ? (darkMode ? "border-red-500/60 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]" : "border-red-300 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.10)]") : darkMode ? "border-[#252840] hover:border-[#3a3f5c] focus:border-[#6366f1] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.12)]" : "border-indigo-100 hover:border-indigo-200 focus:border-indigo-400 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.10)]"}`}
          {...register(id, rules)}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className={`absolute inset-y-0 right-0 flex items-center pr-3.5 transition-colors touch-manipulation ${darkMode ? "text-[#5c6385] hover:text-[#9ba2c0]" : "text-indigo-300 hover:text-indigo-500"}`}
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        )}
      </div>

      <div className="min-h-[1.25rem] pt-1">
        {hasError && (
          <p
            className={`flex items-center gap-1 text-[10px] ${darkMode ? "text-red-400" : "text-red-500"}`}
          >
            <svg
              className="w-3.5 h-3.5 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors[id].message}
          </p>
        )}
      </div>
    </div>
  );
}
