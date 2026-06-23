import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Check } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function CustomSelect({
  value,
  onChange,
  options,
  disabled,
  className = "",
  placeholder = "Select option",
  icon,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);
  const { darkMode } = useTheme();

  // Handle outside clicks to close desktop dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen && !isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, isMobile]);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Prevent body scroll when mobile bottom sheet is open
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, isMobile]);

  const selectedOption = options.find((o) => o?.value === value || o === value);
  const displayLabel = selectedOption
    ? (selectedOption.label || selectedOption)
    : placeholder;

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div
      className={`relative w-full ${disabled ? "opacity-50 pointer-events-none" : ""}`}
      ref={dropdownRef}
    >
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-11 flex items-center justify-between px-4 rounded-xl border text-xs font-semibold cursor-pointer outline-none focus:border-[#6366f1] ${
          darkMode
            ? "border-[#232844] bg-[#161925] text-white hover:bg-[#1e2235]"
            : "border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100"
        } ${className}`}
      >
        <div className="flex items-center gap-2 truncate">
          {icon}
          <span className="truncate">{displayLabel}</span>
        </div>
        <svg
          className={`w-3.5 h-3.5 shrink-0 text-slate-400 dark:text-[#5e6787] ${
            isOpen && !isMobile ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Desktop Dropdown Options */}
      {isOpen && !isMobile && (
        <div
          className={`absolute z-50 left-0 right-0 mt-1.5 max-h-60 overflow-y-auto rounded-xl border shadow-xl backdrop-blur-md ${
            darkMode
              ? "border-[#2c3254] bg-[#10131d]/95 text-white"
              : "border-indigo-100 bg-white/95 text-slate-800"
          }`}
        >
          {options.map((opt) => {
            const optVal = opt?.value !== undefined ? opt.value : opt;
            const optLabel = opt?.label !== undefined ? opt.label : opt;
            const isSel = optVal === value;

            return (
              <button
                key={optVal}
                type="button"
                onClick={() => handleSelect(optVal)}
                className={`w-full text-left px-4 py-2.5 text-xs font-semibold flex items-center justify-between first:rounded-t-xl last:rounded-b-xl cursor-pointer ${
                  isSel
                    ? "bg-[#6366f1] text-white"
                    : darkMode
                      ? "hover:bg-[#1a1e30] text-slate-300"
                      : "hover:bg-slate-50 text-slate-700"
                }`}
              >
                <span className="truncate pr-2">{optLabel}</span>
                {isSel && <Check size={14} className="shrink-0" />}
              </button>
            );
          })}
        </div>
      )}

      {/* Mobile Bottom Sheet Modal */}
      {isOpen &&
        isMobile &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-end justify-center">
            {/* Backdrop */}
            <div
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />
            {/* Bottom Sheet Card */}
            <div
              className={`relative w-full max-h-[75vh] flex flex-col rounded-t-[28px] border-t shadow-2xl p-5 pb-8 animate-slide-up ${
                darkMode
                  ? "bg-[#10131d] border-[#2c3254] text-white"
                  : "bg-white border-slate-100 text-slate-800"
              }`}
            >
              {/* Drag Handle */}
              <div className="w-12 h-1 rounded-full bg-slate-200 dark:bg-slate-800 mx-auto mb-5 shrink-0" />

              {/* Header */}
              <div className="flex items-center justify-between mb-4 shrink-0 px-1">
                <h3 className="text-[0.72rem] font-extrabold uppercase tracking-widest text-slate-400 dark:text-[#5e6787]">
                  {placeholder}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center border cursor-pointer ${
                    darkMode
                      ? "border-[#232844] bg-[#161925] text-slate-400 hover:text-white"
                      : "border-slate-100 bg-slate-50 text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Options Scroll Container */}
              <div className="overflow-y-auto space-y-2 pr-1">
                {options.map((opt) => {
                  const optVal = opt?.value !== undefined ? opt.value : opt;
                  const optLabel = opt?.label !== undefined ? opt.label : opt;
                  const isSel = optVal === value;

                  return (
                    <button
                      key={optVal}
                      type="button"
                      onClick={() => handleSelect(optVal)}
                      className={`w-full text-left px-5 py-4 text-sm font-semibold rounded-2xl flex items-center justify-between border cursor-pointer ${
                        isSel
                          ? "bg-[#6366f1] border-[#6366f1] text-white"
                          : darkMode
                            ? "bg-[#161925] border-[#232844] text-slate-300 active:bg-[#1e2235]"
                            : "bg-slate-50 border-slate-200 text-slate-700 active:bg-slate-100"
                      }`}
                    >
                      <span className="truncate pr-2">{optLabel}</span>
                      {isSel && <Check size={16} className="shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
