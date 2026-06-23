import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import {
  GraduationCap,
  Download,
  ChevronDown,
  AlertTriangle,
  CheckCircle,
  Calendar,
  User,
  BookOpen,
  Activity,
  Award,
  Loader2,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

const sgpaPill = (s, isDark) => {
  if (s >= 9) {
    return isDark
      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
      : "bg-emerald-50 text-emerald-600 border border-emerald-200";
  }
  if (s >= 8) {
    return isDark
      ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/30"
      : "bg-indigo-50 text-indigo-600 border border-indigo-200";
  }
  if (s >= 7) {
    return isDark
      ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
      : "bg-amber-50 text-amber-600 border border-amber-200";
  }
  return isDark
    ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
    : "bg-rose-50 text-rose-600 border border-rose-200";
};

// Premium Dashboard Skeleton and Cryptographic Portal Verifier (Staychat AI style)
function DashboardSkeleton() {
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${
        darkMode ? "bg-[#06070d]" : "bg-gradient-to-br from-indigo-50/50 via-slate-50 to-cyan-50/50"
      }`}
    >
      {/* Background ambient glows */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse select-none">
        {/* Navbar Header Skeleton */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl ${darkMode ? "bg-[#1b2031]" : "bg-slate-200"} shrink-0`} />
            <div className="space-y-2">
              <div className={`w-20 h-5 rounded-lg ${darkMode ? "bg-[#1b2031]" : "bg-slate-200"}`} />
              <div className={`w-40 h-3 rounded-lg ${darkMode ? "bg-[#1b2031]" : "bg-slate-200"}`} />
            </div>
          </div>
          <div className={`w-36 h-8 rounded-full ${darkMode ? "bg-[#1b2031]" : "bg-slate-200"} hidden sm:block`} />
        </div>

        {/* Columns Grid Skeleton */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column Skeletons */}
          <div className="xl:col-span-1 space-y-6">
            {/* Profile Card Skeleton */}
            <div
              className={`rounded-3xl border p-6 ${
                darkMode ? "bg-[#111322]/80 border-white/5" : "bg-white/80 border-slate-200 shadow-sm"
              }`}
            >
              <div className="flex flex-col items-center">
                <div className={`w-24 h-24 rounded-3xl mb-5 ${darkMode ? "bg-[#1b2031]" : "bg-slate-200"}`} />
                <div className={`w-32 h-6 rounded-lg mb-2 ${darkMode ? "bg-[#1b2031]" : "bg-slate-200"}`} />
                <div className={`w-24 h-5 rounded-lg mb-6 ${darkMode ? "bg-[#1b2031]" : "bg-slate-200"}`} />
                <div className={`w-full h-px mb-4 ${darkMode ? "bg-white/5" : "bg-slate-200"}`} />
                <div className="grid grid-cols-2 w-full gap-3">
                  <div className={`h-14 rounded-xl ${darkMode ? "bg-[#1b2031]/50" : "bg-slate-100"}`} />
                  <div className={`h-14 rounded-xl ${darkMode ? "bg-[#1b2031]/50" : "bg-slate-100"}`} />
                </div>
              </div>
            </div>

            {/* Alert Widget Skeleton */}
            <div
              className={`rounded-3xl border p-6 h-36 ${
                darkMode ? "bg-[#111322]/80 border-white/5" : "bg-white/80 border-slate-200 shadow-sm"
              }`}
            >
              <div className={`w-40 h-5 rounded-lg mb-4 ${darkMode ? "bg-[#1b2031]" : "bg-slate-200"}`} />
              <div className={`w-full h-16 rounded-2xl ${darkMode ? "bg-[#1b2031]" : "bg-slate-200"}`} />
            </div>
          </div>

          {/* Right Column Skeletons */}
          <div className="xl:col-span-2 space-y-6">
            {/* KPI metrics row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`rounded-3xl border p-5 h-28 ${
                    darkMode ? "bg-[#111322]/80 border-white/5" : "bg-white/80 border-slate-200 shadow-sm"
                  }`}
                />
              ))}
            </div>

            {/* Trend Chart Skeleton */}
            <div
              className={`rounded-3xl border p-6 h-72 ${
                darkMode ? "bg-[#111322]/80 border-white/5" : "bg-white/80 border-slate-200 shadow-sm"
              }`}
            >
              <div className={`w-48 h-5 rounded-lg mb-2 ${darkMode ? "bg-[#1b2031]" : "bg-slate-200"}`} />
              <div className={`w-32 h-3 rounded-lg mb-8 ${darkMode ? "bg-[#1b2031]" : "bg-slate-200"}`} />
              <div className="w-full h-36 border-b border-l border-slate-200 dark:border-slate-800/80 flex items-end justify-around pb-2">
                <div className={`w-8 h-20 rounded ${darkMode ? "bg-[#1b2031]/40" : "bg-slate-100"}`} />
                <div className={`w-8 h-28 rounded ${darkMode ? "bg-[#1b2031]/40" : "bg-slate-100"}`} />
                <div className={`w-8 h-24 rounded ${darkMode ? "bg-[#1b2031]/40" : "bg-slate-100"}`} />
              </div>
            </div>
          </div>
        </div>
      </div>

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
      `}</style>

      {/* Central Glassmorphic Cryptographic Verifier Scanner */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
        <div
          className={`max-w-sm w-full rounded-[32px] border p-8 text-center shadow-[0_25px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl relative overflow-hidden ${
            darkMode
              ? "bg-[#111322]/90 border-white/10 text-white shadow-black/80"
              : "bg-white/95 border-indigo-50 text-slate-800 shadow-indigo-100/50"
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

          <h3 className="font-extrabold text-[0.95rem] tracking-wide font-outfit uppercase mb-2">
            Establishing Portal Cryptolink
          </h3>
          <p
            className={`text-xs leading-relaxed max-w-[260px] mx-auto ${
              darkMode ? "text-[#9ba2c0]" : "text-slate-500"
            }`}
          >
            Verifying secure access signature and building student report view...
          </p>
        </div>
      </div>
    </div>
  );
}

export default function GuardianDashboard() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const { darkMode } = useTheme();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSem, setOpenSem] = useState(null);
  const [defaultSemSet, setDefaultSemSet] = useState(false);
  const hasValidated = useRef(false);

  useEffect(() => {
    if (hasValidated.current) return;
    hasValidated.current = true;

    const validate = async () => {
      if (!token) {
        setError(
          "No access token provided. Please use the link sent by your institution."
        );
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const API_URL = import.meta.env.VITE_API_URL;
        const { data } = await axios.get(
          `${API_URL}/tokens/validate?token=${encodeURIComponent(token)}`
        );
        if (!data.success) throw new Error(data.message || "Invalid token");
        setStudent(data.data);
      } catch (err) {
        const msg = err.response?.data?.message || err.message;
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    validate();
  }, [token]);

  // Set default open semester once student loads
  useEffect(() => {
    if (student && student.semesters?.length > 0 && !defaultSemSet) {
      const lastSem = student.semesters[student.semesters.length - 1];
      setOpenSem(lastSem._id);
      setDefaultSemSet(true);
    }
  }, [student, defaultSemSet]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  // Error screen styling matching dark/light themes
  if (error || !student) {
    const isExpired = error?.toLowerCase().includes("expired");
    const isLimitReached = error?.toLowerCase().includes("access limit");

    let title = "Invalid Access Link";
    let description =
      error ||
      "This academic report link is invalid. Please contact the administration for a new access token.";

    if (isExpired) {
      title = "Link Expired";
      description =
        "This access link has expired. Please contact the administration for a new link.";
    } else if (isLimitReached) {
      title = "Access Limit Reached";
      description =
        "You have used all available views for this link. Please contact the administration if you need further access.";
    }

    return (
      <div
        className={`min-h-screen flex items-center justify-center p-6 font-['Inter'] ${
          darkMode ? "bg-[#06070d]" : "bg-gradient-to-br from-indigo-50 via-slate-50 to-cyan-50"
        }`}
      >
        <div
          className={`text-center p-10 rounded-[32px] border max-w-md w-full shadow-2xl ${
            darkMode
              ? "bg-[#13162b] border-[#252840] text-white shadow-black/80"
              : "bg-white border-slate-200 text-slate-800 shadow-slate-200/40"
          }`}
        >
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 ${
              darkMode
                ? "bg-rose-500/10 border-rose-500/40 text-rose-500"
                : "bg-rose-50 border-rose-200 text-rose-600"
            }`}
          >
            {isExpired || isLimitReached ? (
              <ShieldAlert size={36} />
            ) : (
              <AlertTriangle size={36} />
            )}
          </div>
          <h1
            className={`text-2xl font-black mb-3 font-outfit tracking-tight ${
              darkMode ? "text-white" : "text-slate-800"
            }`}
          >
            {title}
          </h1>
          <p
            className={`text-sm leading-relaxed ${
              darkMode ? "text-[#9ba2c0]" : "text-slate-500 font-medium"
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    );
  }

  const avatarGrad = `linear-gradient(135deg, hsl(${(student.urn * 47) % 360}, 70%, 45%), hsl(${(student.urn * 47 + 40) % 360}, 75%, 35%))`;
  const chartData = student.semesters.map((s) => ({
    name: `S${s.semesterNumber}`,
    SGPA: s.sgpa,
  }));
  const avgSGPA = student.semesters.length
    ? (
        student.semesters.reduce((a, s) => a + s.sgpa, 0) /
        student.semesters.length
      ).toFixed(2)
    : "—";
  const totalDetained = student.semesters
    .flatMap((s) => s.subjects)
    .filter((s) => s.status === "Detained").length;
  const lastSem = student.semesters[student.semesters.length - 1];
  const isAtRisk = totalDetained > 0;

  // Custom tooltips closing over theme status
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div
        className={`backdrop-blur-md border rounded-xl px-4 py-2.5 shadow-xl ${
          darkMode
            ? "bg-[#1e2132]/95 border-[#2e3354] text-white"
            : "bg-white/95 border-slate-200 text-slate-800"
        }`}
      >
        <p className={`text-xs font-semibold mb-1 ${darkMode ? "text-[#9ba2c0]" : "text-slate-400"}`}>
          {label}
        </p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#6366f1]"></div>
          <p className={`font-bold text-sm ${darkMode ? "text-white" : "text-slate-800"}`}>
            SGPA: {payload[0]?.value}
          </p>
        </div>
      </div>
    );
  };

  const getKpiColor = (baseColor) => {
    if (darkMode) return baseColor;
    if (baseColor.includes("amber")) return "text-amber-600";
    if (baseColor.includes("emerald")) return "text-emerald-600";
    if (baseColor.includes("cyan")) return "text-cyan-600";
    return "text-indigo-600";
  };

  return (
    <div
      className={`min-h-screen font-['Inter'] selection:bg-indigo-500/30 ${
        darkMode
          ? "bg-[#06070d] text-slate-300"
          : "bg-gradient-to-br from-indigo-50/50 via-slate-50 to-cyan-50/50 text-slate-700"
      }`}
    >
      {/* Ambient background glows */}
      <div className={`fixed inset-0 z-0 pointer-events-none ${darkMode ? "opacity-40" : "opacity-20"}`}>
        <div
          className={`absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] ${
            darkMode ? "bg-indigo-600/20" : "bg-indigo-400/10"
          }`}
        />
        <div
          className={`absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] ${
            darkMode ? "bg-cyan-600/10" : "bg-cyan-400/8"
          }`}
        />
        {isAtRisk && (
          <div
            className={`absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] ${
              darkMode ? "bg-rose-600/10" : "bg-rose-400/8"
            }`}
          />
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Navbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 shrink-0">
              <GraduationCap size={24} className="text-white" />
            </div>
            <div>
              <h1
                className={`text-2xl font-black font-outfit tracking-tight ${
                  darkMode ? "text-white" : "text-slate-800"
                }`}
              >
                ASTNS
              </h1>
              <p
                className={`text-xs font-semibold ${
                  darkMode ? "text-indigo-200/60" : "text-slate-500"
                }`}
              >
                Official Academic Report Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div
              className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border ${
                darkMode
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  : "bg-emerald-50 border-emerald-100 text-emerald-600 font-semibold"
              }`}
            >
              <CheckCircle size={14} />
              <span className="text-xs">Secure Guardian Link</span>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
          {/* Left Column: Student Identity & Crucial Alerts */}
          <div className="xl:col-span-1 space-y-6 xl:sticky xl:top-8 xl:self-start">
            {/* Student Profile Card */}
            <div
              className={`backdrop-blur-xl border rounded-3xl p-6 shadow-2xl ${
                darkMode
                  ? "border-white/5 bg-[#111322]/80 shadow-black/45"
                  : "border-slate-200/80 bg-white/85 shadow-slate-200/50"
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className="w-24 h-24 rounded-3xl mb-5 flex items-center justify-center text-4xl font-black text-white shadow-xl shadow-black/40 border border-white/10"
                  style={{ background: avatarGrad }}
                >
                  {student.fullName[0]}
                </div>
                <h2
                  className={`text-2xl font-black font-outfit mb-1 ${
                    darkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  {student.fullName}
                </h2>
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold mb-4 border ${
                    darkMode
                      ? "bg-white/5 border-white/5 text-[#9ba2c0]"
                      : "bg-slate-100 border-slate-200 text-slate-600"
                  }`}
                >
                  <User size={12} /> URN: <span className={darkMode ? "text-white" : "text-slate-800"}>{student.urn}</span>
                </div>

                <div className={`w-full h-px mb-4 ${darkMode ? "bg-white/5" : "bg-slate-200"}`}></div>

                <div className="grid grid-cols-2 w-full gap-3 text-left">
                  <div
                    className={`rounded-xl p-3 border ${
                      darkMode ? "bg-black/20 border-white/5" : "bg-slate-50 border-slate-100"
                    }`}
                  >
                    <p
                      className={`text-[10px] uppercase font-bold mb-1 flex items-center gap-1 ${
                        darkMode ? "text-[#5c6385]" : "text-slate-400"
                      }`}
                    >
                      <BookOpen size={10} /> Course
                    </p>
                    <p
                      className={`text-sm font-bold truncate ${darkMode ? "text-white" : "text-slate-800"}`}
                      title={`${student.course} ${student.branch ? `- ${student.branch}` : ""}`}
                    >
                      {student.course} {student.branch ? `(${student.branch})` : ""}
                    </p>
                  </div>
                  <div
                    className={`rounded-xl p-3 border ${
                      darkMode ? "bg-black/20 border-white/5" : "bg-slate-50 border-slate-100"
                    }`}
                  >
                    <p
                      className={`text-[10px] uppercase font-bold mb-1 flex items-center gap-1 ${
                        darkMode ? "text-[#5c6385]" : "text-slate-400"
                      }`}
                    >
                      <Calendar size={10} /> Batch
                    </p>
                    <p className={`text-sm font-bold ${darkMode ? "text-white" : "text-slate-800"}`}>
                      {student.admissionYear} - {student.graduationYear}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Alert Widget */}
            <div
              className={`backdrop-blur-xl border rounded-3xl p-6 shadow-2xl relative overflow-hidden ${
                isAtRisk
                  ? darkMode
                    ? "border-rose-500/30 bg-[#111322]/80 shadow-rose-950/20"
                    : "border-rose-200 bg-rose-50/20 shadow-rose-100/30"
                  : darkMode
                    ? "border-white/5 bg-[#111322]/80 shadow-black/40"
                    : "border-slate-200/80 bg-white/85 shadow-slate-200/50"
              }`}
            >
              {isAtRisk && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-[50px] -mr-10 -mt-10" />
              )}

              <div className="flex items-center justify-between mb-6 relative z-10">
                <h3 className={`text-lg font-bold flex items-center gap-2 ${darkMode ? "text-white" : "text-slate-800"}`}>
                  <Activity size={18} className="text-[#6366f1] dark:text-indigo-400" /> Current Academic Status
                </h3>
              </div>

              <div className="space-y-3 relative z-10">
                {totalDetained > 0 ? (
                  <div
                    className={`rounded-2xl p-4 flex gap-3 border ${
                      darkMode ? "bg-rose-500/10 border-rose-500/30" : "bg-red-50/60 border-red-150"
                    }`}
                  >
                    <AlertTriangle size={20} className="text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className={`font-bold text-sm mb-1 ${darkMode ? "text-rose-400" : "text-red-700"}`}>
                        Detention Alert
                      </h4>
                      <p className={`text-xs leading-relaxed ${darkMode ? "text-rose-400/80" : "text-red-600 font-medium"}`}>
                        Student is currently marked detained in{" "}
                        <strong className={darkMode ? "text-rose-400" : "text-red-700 font-bold"}>
                          {totalDetained} subject(s)
                        </strong>{" "}
                        across their academic record.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`rounded-2xl p-4 flex gap-3 items-center border ${
                      darkMode ? "bg-emerald-500/10 border-emerald-500/20" : "bg-emerald-50/60 border-emerald-100"
                    }`}
                  >
                    <CheckCircle size={20} className="text-emerald-500 shrink-0" />
                    <div>
                      <h4 className={`font-bold text-sm ${darkMode ? "text-emerald-400" : "text-emerald-700"}`}>
                        Clear Record
                      </h4>
                      <p className={`text-xs mt-0.5 ${darkMode ? "text-emerald-400/80" : "text-emerald-600 font-medium"}`}>
                        No current subject detainments reported.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Key Metrics & Deep Dive */}
          <div className="xl:col-span-2 space-y-6">
            {/* Top Level KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  label: "CGPA",
                  val: student.cgpa ?? "N/A",
                  color: "text-amber-400",
                  sub: "Overall",
                  icon: Award,
                },
                {
                  label: "Latest SGPA",
                  val: lastSem?.sgpa ?? "—",
                  color: "text-emerald-400",
                  sub: `Sem ${lastSem?.semesterNumber || "—"}`,
                  icon: Activity,
                },
                {
                  label: "Avg SGPA",
                  val: avgSGPA,
                  color: "text-cyan-400",
                  sub: "Aggregate",
                  icon: BookOpen,
                },
                {
                  label: "Semesters",
                  val: student.semesters.length,
                  color: "text-indigo-400",
                  sub: "Completed",
                  icon: Calendar,
                },
              ].map((k) => (
                <div
                  key={k.label}
                  className={`border rounded-3xl p-5 relative overflow-hidden group ${
                    darkMode
                      ? "bg-[#111322]/80 border-white/5 shadow-black/45"
                      : "bg-white border-slate-200 shadow-sm hover:border-indigo-100"
                  }`}
                >
                  <div
                    className={`absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity ${k.color}`}
                  >
                    <k.icon
                      size={48}
                      className="-mr-4 -mt-4 transform group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <p
                    className={`text-xs uppercase font-bold tracking-wider mb-2 relative z-10 ${
                      darkMode ? "text-[#5c6385]" : "text-slate-400"
                    }`}
                  >
                    {k.label}
                  </p>
                  <p
                    className={`text-3xl font-black font-outfit mb-1 relative z-10 ${getKpiColor(
                      k.color
                    )}`}
                  >
                    {k.val}
                  </p>
                  <p
                    className={`text-[11px] font-medium relative z-10 ${
                      darkMode ? "text-[#5c6385]" : "text-slate-400"
                    }`}
                  >
                    {k.sub}
                  </p>
                </div>
              ))}
            </div>

            {/* Performance Trend Chart */}
            {chartData.length > 1 && (
              <div
                className={`border rounded-3xl p-6 shadow-2xl ${
                  darkMode
                    ? "border-white/5 bg-[#111322]/80 shadow-black/45"
                    : "border-slate-200/80 bg-white/85 shadow-slate-200/50"
                }`}
              >
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className={`text-lg font-bold ${darkMode ? "text-white" : "text-slate-800"}`}>
                      Performance Trend
                    </h3>
                    <p className={`text-sm ${darkMode ? "text-[#5c6385]" : "text-slate-450"}`}>
                      SGPA progression across semesters
                    </p>
                  </div>
                </div>
                <div className="h-[220px] w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorSGPA" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={darkMode ? "rgba(255,255,255,0.05)" : "rgba(99,102,241,0.06)"}
                        vertical={false}
                      />
                      <XAxis
                        dataKey="name"
                        tick={{
                          fill: darkMode ? "#5c6385" : "#94a3b8",
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                        axisLine={false}
                        tickLine={false}
                        dy={10}
                      />
                      <YAxis
                        domain={[0, 10]}
                        tick={{
                          fill: darkMode ? "#5c6385" : "#94a3b8",
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                        axisLine={false}
                        tickLine={false}
                        dx={-10}
                      />
                      <Tooltip
                        cursor={{
                          stroke: darkMode ? "rgba(255,255,255,0.1)" : "rgba(99,102,241,0.1)",
                          strokeWidth: 1,
                          strokeDasharray: "3 3",
                        }}
                        content={<CustomTooltip />}
                      />
                      <Line
                        type="monotone"
                        dataKey="SGPA"
                        stroke={darkMode ? "#818cf8" : "#6366f1"}
                        strokeWidth={3}
                        dot={{
                          fill: darkMode ? "#111322" : "#fff",
                          stroke: darkMode ? "#818cf8" : "#6366f1",
                          strokeWidth: 2,
                          r: 5,
                        }}
                        activeDot={{
                          r: 8,
                          fill: darkMode ? "#818cf8" : "#6366f1",
                          stroke: "#fff",
                          strokeWidth: 2,
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Academic Record Accordions */}
            <div>
              <div className="flex items-center justify-between mb-4 px-1">
                <h3 className={`text-lg font-bold ${darkMode ? "text-white" : "text-slate-800"}`}>
                  Detailed Academic Record
                </h3>
                <span className={`text-xs font-semibold ${darkMode ? "text-[#5c6385]" : "text-slate-400"}`}>
                  Tap a semester to expand
                </span>
              </div>

              <div className="space-y-4">
                {student.semesters.map((sem) => {
                  const isOpen = openSem === sem._id;
                  const detained = sem.subjects.filter((s) => s.status === "Detained").length;

                  return (
                    <div
                      key={sem._id}
                      className={`border rounded-3xl overflow-hidden ${
                        isOpen
                          ? darkMode
                            ? "border-indigo-500/30 bg-[#111322]/85 shadow-lg shadow-indigo-950/20"
                            : "border-indigo-200 bg-white shadow-sm"
                          : darkMode
                            ? "border-white/5 bg-[#111322]/80"
                            : "border-slate-200/80 bg-white/70 shadow-xs"
                      }`}
                    >
                      <div
                        className={`px-6 py-5 flex items-center justify-between cursor-pointer ${
                          darkMode ? "hover:bg-white/2" : "hover:bg-slate-50/40"
                        }`}
                        onClick={() => setOpenSem(isOpen ? null : sem._id)}
                      >
                        <div className="flex items-center gap-5">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <p className={`text-lg font-bold ${darkMode ? "text-white" : "text-slate-800"}`}>
                                Semester {sem.semesterNumber}
                              </p>
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${sgpaPill(
                                  sem.sgpa,
                                  darkMode
                                )}`}
                              >
                                SGPA {sem.sgpa}
                              </span>
                            </div>
                            <p
                              className={`text-xs font-medium flex items-center gap-2 ${
                                darkMode ? "text-[#9ba2c0]" : "text-slate-550"
                              }`}
                            >
                              {sem.subjects.length} Subjects Registered
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {detained > 0 && (
                            <span
                              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                                darkMode
                                  ? "bg-rose-500/15 text-rose-400 border-rose-500/30"
                                  : "bg-red-50 text-red-650 border-red-200"
                              }`}
                            >
                              <AlertTriangle size={12} /> {detained} Detained
                            </span>
                          )}
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                              isOpen
                                ? "rotate-180 bg-indigo-500/20 text-[#818cf8] dark:text-indigo-400"
                                : darkMode
                                  ? "bg-white/5 text-[#5c6385]"
                                  : "bg-slate-100 text-slate-400"
                            }`}
                          >
                            <ChevronDown size={18} />
                          </div>
                        </div>
                      </div>

                      <div
                        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div
                            className={`p-4 pt-0 border-t ${
                              darkMode ? "border-white/5 bg-black/20" : "border-slate-100 bg-slate-50/20"
                            }`}
                          >
                            <div
                              className={`overflow-x-auto rounded-xl border my-2 ${
                                darkMode ? "border-white/5 bg-transparent" : "border-slate-200 bg-white"
                              }`}
                            >
                              <table className="w-full text-left whitespace-nowrap">
                                <thead>
                                  <tr
                                    className={`text-xs uppercase tracking-wider font-semibold ${
                                      darkMode ? "bg-[#111322] text-[#5c6385]" : "bg-slate-50 text-slate-500"
                                    }`}
                                  >
                                    <th className="px-5 py-3.5">Subject</th>
                                    <th className="px-5 py-3.5 text-center">Internal</th>
                                    <th className="px-5 py-3.5 text-center">External</th>
                                    <th className="px-5 py-3.5 text-center">Total</th>
                                    <th className="px-5 py-3.5 text-right">Status</th>
                                  </tr>
                                </thead>
                                <tbody className={`divide-y ${darkMode ? "divide-white/5" : "divide-slate-200"}`}>
                                  {sem.subjects.map((sub) => {
                                    const subjectData = sub.subject || {};
                                    return (
                                      <tr
                                        key={sub._id}
                                        className={`transition-colors group ${
                                          darkMode ? "hover:bg-white/2" : "hover:bg-slate-50/50"
                                        }`}
                                      >
                                        <td className="px-5 py-3">
                                          <div className="flex flex-col">
                                            <span className={`text-sm font-bold ${darkMode ? "text-white" : "text-slate-800"}`}>
                                              {subjectData.subjectTitle || "—"}
                                            </span>
                                            <span className={`text-xs font-mono mt-0.5 ${darkMode ? "text-[#5c6385]" : "text-slate-400"}`}>
                                              {subjectData.subjectCode || "—"} ·{" "}
                                              {subjectData.type === "T" ? "Theory" : "Practical"}
                                            </span>
                                          </div>
                                        </td>
                                        <td className="px-5 py-3 text-center">
                                          <span
                                            className={`text-sm font-semibold ${
                                              sub.internalDetained
                                                ? "text-rose-500 font-bold"
                                                : darkMode
                                                  ? "text-[#9ba2c0]"
                                                  : "text-slate-600"
                                            }`}
                                          >
                                            {sub.internalMarks}
                                          </span>
                                        </td>
                                        <td className="px-5 py-3 text-center">
                                          <span
                                            className={`text-sm font-semibold ${
                                              sub.externalDetained
                                                ? "text-rose-500 font-bold"
                                                : darkMode
                                                  ? "text-[#9ba2c0]"
                                                  : "text-slate-600"
                                            }`}
                                          >
                                            {sub.externalMarks}
                                          </span>
                                        </td>
                                        <td className="px-5 py-3 text-center">
                                          <span className={`text-sm font-black ${darkMode ? "text-white" : "text-slate-800"}`}>
                                            {sub.totalMarks}
                                          </span>
                                        </td>
                                        <td className="px-5 py-3 text-right">
                                          <div className="flex justify-end">
                                            <span
                                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                                                sub.status === "Pass"
                                                  ? darkMode
                                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                    : "bg-emerald-50 text-emerald-600 border-emerald-250"
                                                  : darkMode
                                                    ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                                                    : "bg-red-50 text-red-650 border-red-250"
                                              }`}
                                            >
                                              {sub.status}
                                            </span>
                                          </div>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center pb-6">
          <p
            className={`text-xs font-semibold flex items-center justify-center gap-2 ${
              darkMode ? "text-[#5c6385]" : "text-slate-400"
            }`}
          >
            <span>🔒 Confidential Guardian Portal Link</span>
            <span>•</span>
            <span>Automatically expires based on token settings</span>
          </p>
        </div>
      </div>
    </div>
  );
}
