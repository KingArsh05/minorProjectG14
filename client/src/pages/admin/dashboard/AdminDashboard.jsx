import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  Database,
  Users,
  TrendingUp,
  Loader2,
  BellRing,
} from "lucide-react";

import { notificationActivity, recentUploads } from "../../../data/stats";
import { useTheme } from "../../../context/ThemeContext";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

const TT = ({ active, payload, label }) => {
  const { darkMode } = useTheme();
  if (!active || !payload?.length) return null;

  return (
    <div className={`rounded-2xl border px-4 py-3 shadow-2xl ${
      darkMode ? "border-[#23293f] bg-[#141824]" : "border-indigo-100 bg-white"
    }`}>
      <p className="text-[#68708f] text-[0.72rem] mb-2 font-medium">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className={`text-[0.82rem] font-semibold ${
          darkMode ? "text-white" : "text-slate-800"
        }`}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { darkMode } = useTheme();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/students/stats`, {
          withCredentials: true,
        });

        if (data.success) {
          setStats(data.data);
        }
      } catch (err) {
        console.error("Failed to load stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [API_URL]);

  const statCards = [
    {
      label: "Total Students",
      value: stats?.totalStudents ?? "—",
      sub: "Across all branches",
      icon: Users,
    },
    {
      label: "Detained Students",
      value: stats?.detainedStudents ?? "—",
      sub: "Needs attention",
      icon: TrendingUp,
    },
    {
      label: "Courses Offered",
      value: stats?.coursesOffered ?? "—",
      sub: "Institution-wide",
      icon: Database,
    },
    {
      label: "Average CGPA",
      value: stats?.avgCGPA ?? "—",
      sub: "Overall academic score",
      icon: TrendingUp,
    },
  ];

  const branchDistribution = stats?.branchDistribution || [];

  return (
    <div className="space-y-6 fade-in text-slate-800 dark:text-white">
      {/* Hero */}
      <div className={`relative overflow-hidden rounded-3xl border p-6 md:p-8 ${
        darkMode ? "border-[#1d2335] bg-[#10131d]" : "border-indigo-100 bg-white shadow-sm"
      }`}>
        {/* Soft Glow */}
        <div className={`absolute top-0 right-0 h-[240px] w-[240px] blur-3xl pointer-events-none ${
          darkMode ? "bg-[#6366f1]/5" : "bg-indigo-300/10"
        }`} />
        <div className={`absolute bottom-0 left-0 h-[220px] w-[220px] blur-3xl pointer-events-none ${
          darkMode ? "bg-[#6366f1]/5" : "bg-indigo-300/10"
        }`} />

        <div className="relative flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
          <div>
            <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.78rem] mb-5 ${
              darkMode ? "border-[#23293f] bg-[#141824] text-[#9ba2c0]" : "border-indigo-100 bg-indigo-50/60 text-indigo-600 font-semibold"
            }`}>
              <div className="h-2 w-2 rounded-full bg-[#4ade80]" />
              Live Institution Overview
            </div>

            <h2 className={`text-[1.8rem] md:text-[2.2rem] leading-tight font-extrabold font-outfit ${
              darkMode ? "text-white" : "text-slate-800"
            }`}>
              Academic Overview
            </h2>

            <p className={`mt-4 text-[0.92rem] max-w-[620px] leading-relaxed ${
              darkMode ? "text-[#8b93b2]" : "text-slate-500"
            }`}>
              Monitor student records, guardian notifications, departmental performance, and real-time academic analytics from a unified dashboard.
            </p>

            <div className="flex flex-wrap gap-6 mt-6">
              <div>
                <p className={`text-[1.4rem] md:text-[1.6rem] font-bold ${
                  darkMode ? "text-white" : "text-slate-800"
                }`}>
                  {stats?.totalStudents || 0}
                </p>
                <p className={`text-[0.82rem] ${darkMode ? "text-[#68708f]" : "text-slate-400 font-medium"}`}>Total Students</p>
              </div>

              <div>
                <p className={`text-[1.4rem] md:text-[1.6rem] font-bold ${
                  darkMode ? "text-white" : "text-slate-800"
                }`}>
                  {stats?.detainedStudents || 0}
                </p>
                <p className={`text-[0.82rem] ${darkMode ? "text-[#68708f]" : "text-slate-400 font-medium"}`}>
                  Detained Students
                </p>
              </div>

              <div>
                <p className={`text-[1.4rem] md:text-[1.6rem] font-bold ${
                  darkMode ? "text-white" : "text-slate-800"
                }`}>
                  {stats?.avgCGPA || "—"}
                </p>
                <p className={`text-[0.82rem] ${darkMode ? "text-[#68708f]" : "text-slate-400 font-medium"}`}>Average CGPA</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate("/admin/notifications")} 
              className="inline-flex items-center gap-2 h-[52px] px-5 rounded-2xl bg-[#6366f1] hover:bg-[#5855eb] text-white font-semibold transition-all shadow-[0_10px_30px_rgba(99,102,241,0.18)] cursor-pointer"
            >
              <BellRing size={16} />
              Notify Parents
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map((s) => (
          <div
            key={s.label}
            className={`group relative overflow-hidden rounded-[30px] border p-5 cursor-pointer ${
              darkMode 
                ? "border-[#1d2335] bg-[#10131d] hover:border-[#2d3550] hover:shadow-[0_12px_35px_rgba(99,102,241,0.06)]" 
                : "border-indigo-50 bg-white hover:border-indigo-100 hover:shadow-[0_8px_30px_rgba(99,102,241,0.06)] shadow-sm"
            }`}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#818cf8]/30 to-transparent" />

            <div className="relative flex items-start justify-between max-h-20">
              <div>
                <p className={`text-xs uppercase tracking-wider font-bold mb-2 ${
                  darkMode ? "text-[#68708f]" : "text-slate-400"
                }`}>
                  {s.label}
                </p>

                <h2 className={`text-3xl leading-none font-bold tracking-tight ${
                  darkMode ? "text-white" : "text-slate-800"
                }`}>
                  {loading ? (
                    <div className={`w-7 h-7 rounded-xl animate-pulse ${darkMode ? "bg-[#1b2031]" : "bg-slate-100"}`} />
                  ) : (
                    s.value
                  )}
                </h2>

                <p className={`text-xs mt-3 truncate ${darkMode ? "text-[#68708f]" : "text-slate-400"}`}>{s.sub}</p>
              </div>

              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-2xl bg-[#6366f1]/10 blur-xl opacity-0 group-hover:opacity-100" />
                <div className={`relative flex h-[56px] w-[56px] md:h-[60px] md:w-[60px] xl:h-[72px] xl:w-[72px] items-center justify-center rounded-[24px] border ${
                  darkMode 
                    ? "border-[#2a3047] bg-[#181c2b] group-hover:border-[#3b4261]" 
                    : "border-indigo-50 bg-indigo-50/50 group-hover:border-indigo-100"
                }`}>
                  <s.icon size={28} className="text-[#818cf8]" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-5">
        {/* Area */}
        <div className={`rounded-3xl border p-6 ${
          darkMode ? "border-[#1d2335] bg-[#10131d]" : "border-indigo-100/80 bg-white shadow-sm"
        }`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className={`text-[0.72rem] uppercase tracking-[0.18em] font-bold mb-2 ${
                darkMode ? "text-[#68708f]" : "text-slate-400"
              }`}>
                Notification Activity
              </p>
              <h3 className={`text-[1.1rem] font-bold ${
                darkMode ? "text-white" : "text-slate-800"
              }`}>
                Monthly Overview
              </h3>
            </div>

            <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.72rem] font-medium ${
              darkMode ? "border-[#1f3a2f] bg-[#15222c] text-[#4ade80]" : "border-emerald-200 bg-emerald-50 text-emerald-600"
            }`}>
              <div className="h-2 w-2 rounded-full bg-[#4ade80]" />
              Live
            </div>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={notificationActivity}>
              <defs>
                <linearGradient id="mainChart" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke={darkMode ? "#1d2335" : "#f1f5f9"} vertical={false} />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: darkMode ? "#68708f" : "#64748b",
                  fontSize: 11,
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: darkMode ? "#68708f" : "#64748b",
                  fontSize: 11,
                }}
              />

              <Tooltip content={<TT />} />

              <Area
                type="monotone"
                dataKey="sent"
                stroke="#818cf8"
                fill="url(#mainChart)"
                strokeWidth={2.5}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Branch Distribution */}
        <div className={`rounded-3xl border p-6 ${
          darkMode ? "border-[#1d2335] bg-[#10131d]" : "border-indigo-100/80 bg-white shadow-sm"
        }`}>
          <p className={`text-[0.72rem] uppercase tracking-[0.18em] font-bold mb-2 ${
            darkMode ? "text-[#68708f]" : "text-slate-400"
          }`}>
            Branch Distribution
          </p>

          <h3 className={`text-[1.1rem] font-bold mb-6 ${
            darkMode ? "text-white" : "text-slate-800"
          }`}>
            Students per Branch
          </h3>

          {loading ? (
            <div className="flex items-center justify-center h-[280px]">
              <Loader2 size={24} className="animate-spin text-[#6366f1]" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={branchDistribution}
                layout="vertical"
                barSize={10}
              >
                <CartesianGrid stroke={darkMode ? "#1d2335" : "#f1f5f9"} horizontal={false} />

                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: darkMode ? "#68708f" : "#64748b",
                    fontSize: 10,
                  }}
                />

                <YAxis
                  type="category"
                  dataKey="branch"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: darkMode ? "#9ba2c0" : "#475569",
                    fontSize: 11,
                  }}
                />

                <Tooltip content={<TT />} />

                <Bar dataKey="students" fill="#818cf8" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Uploads */}
      <div className={`overflow-hidden rounded-3xl border ${
        darkMode ? "border-[#1d2335] bg-[#10131d]" : "border-indigo-100/80 bg-white shadow-sm"
      }`}>
        <div className={`flex items-center justify-between border-b px-6 py-5 ${
          darkMode ? "border-[#1d2335]" : "border-indigo-50"
        }`}>
          <div>
            <h3 className={`text-[1rem] font-bold ${
              darkMode ? "text-white" : "text-slate-800"
            }`}>
              Recent Uploads
            </h3>

            <p className={`text-[0.82rem] mt-1 ${
              darkMode ? "text-[#68708f]" : "text-slate-400"
            }`}>
              Latest imported academic records
            </p>
          </div>

          <span className={`text-[0.78rem] ${darkMode ? "text-[#68708f]" : "text-slate-400"}`}>Last 5 uploads</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${darkMode ? "border-[#1d2335]" : "border-indigo-50"}`}>
                {[
                  "File",
                  "Course",
                  "Branch",
                  "Semester",
                  "Records",
                  "Uploaded",
                  "Status",
                ].map((h) => (
                  <th
                    key={h}
                    className={`px-6 py-4 text-left text-[0.72rem] uppercase tracking-[0.16em] font-bold whitespace-nowrap ${
                      darkMode ? "text-[#68708f]" : "text-slate-400"
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {recentUploads.map((u, i) => (
                <tr
                  key={i}
                  className={`border-b last:border-none ${
                    darkMode 
                      ? "border-[#1d2335] hover:bg-[#141824]" 
                      : "border-indigo-50 hover:bg-slate-50/50"
                  }`}
                >
                  <td className={`px-6 py-4 font-mono text-[0.82rem] whitespace-nowrap ${
                    darkMode ? "text-[#c7d0f5]" : "text-slate-700"
                  }`}>
                    {u.fileName}
                  </td>

                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full border px-3 py-1 text-[0.72rem] ${
                      darkMode 
                        ? "border-[#23293f] bg-[#141824] text-[#9ba2c0]" 
                        : "border-slate-200 bg-slate-50 text-slate-600"
                    }`}>
                      {u.course}
                    </span>
                  </td>

                  <td className={`px-6 py-4 text-[0.84rem] whitespace-nowrap ${
                    darkMode ? "text-[#9ba2c0]" : "text-slate-600"
                  }`}>
                    {u.branch}
                  </td>

                  <td className={`px-6 py-4 text-[0.84rem] ${
                    darkMode ? "text-[#9ba2c0]" : "text-slate-600"
                  }`}>
                    Sem {u.semester}
                  </td>

                  <td className={`px-6 py-4 font-bold ${
                    darkMode ? "text-white" : "text-slate-800"
                  }`}>
                    {u.records}
                  </td>

                  <td className={`px-6 py-4 text-[0.82rem] whitespace-nowrap ${
                    darkMode ? "text-[#68708f]" : "text-slate-400"
                  }`}>
                    {u.uploadedAt}
                  </td>

                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.72rem] font-medium ${
                      darkMode 
                        ? "border-[#1f3a2f] bg-[#15222c] text-[#4ade80]" 
                        : "border-emerald-200 bg-emerald-50/60 text-emerald-600"
                    }`}>
                      <div className="h-2 w-2 rounded-full bg-[#4ade80]" />
                      Success
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
