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
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-2xl border border-[#23293f] bg-[#141824] px-4 py-3 shadow-2xl">
      <p className="text-[#68708f] text-[0.72rem] mb-2 font-medium">{label}</p>

      {payload.map((p, i) => (
        <p key={i} className="text-[0.82rem] font-semibold text-white">
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
    <div className="space-y-6 fade-in">
      {/* Hero */}

      <div className="relative overflow-hidden rounded-3xl border border-[#1d2335] bg-[#10131d] p-8">
        {/* Soft Glow */}

        <div className="absolute top-0 right-0 h-[240px] w-[240px] bg-[#6366f1]/5 blur-3xl pointer-events-none" />

        <div className="absolute bottom-0 left-0 h-[220px] w-[220px] bg-[#6366f1]/5 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#23293f] bg-[#141824] px-4 py-2 text-[0.78rem] text-[#9ba2c0] mb-5">
              <div className="h-2 w-2 rounded-full bg-[#4ade80]" />
              Live Institution Overview
            </div>

            <h2 className="text-[2.2rem] leading-tight font-bold text-white max-w-[680px]">
              Academic Overview
            </h2>

            <p className="mt-4 text-[#8b93b2] max-w-[620px] leading-relaxed">
              Monitor student records, guardian notifications, departmental
              performance, and real-time academic analytics from a unified
              dashboard.
            </p>

            <div className="flex flex-wrap gap-6 mt-6">
              <div>
                <p className="text-[1.6rem] font-bold text-white">
                  {stats?.totalStudents || 0}
                </p>

                <p className="text-[#68708f] text-[0.82rem]">Total Students</p>
              </div>

              <div>
                <p className="text-[1.6rem] font-bold text-white">
                  {stats?.detainedStudents || 0}
                </p>

                <p className="text-[#68708f] text-[0.82rem]">
                  Detained Students
                </p>
              </div>

              <div>
                <p className="text-[1.6rem] font-bold text-white">
                  {stats?.avgCGPA || "—"}
                </p>

                <p className="text-[#68708f] text-[0.82rem]">Average CGPA</p>
              </div>
            </div>
          </div>

          {/* Actions */}

          <div className="flex items-center gap-3">
            <button onClick={()=>navigate("/admin/notifications")} className="inline-flex items-center gap-2 h-[52px] px-5 rounded-2xl bg-[#6366f1] hover:bg-[#5855eb] text-white font-medium transition-all shadow-[0_10px_30px_rgba(99,102,241,0.18)]">
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
            className="group relative overflow-hidden rounded-[30px] border border-[#1d2335] bg-[#10131d] p-5 transition-all cursor-pointer hover:border-[#2d3550] hover:shadow-[0_12px_35px_rgba(99,102,241,0.06)]"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#818cf8]/30 to-transparent" />

            <div className="relative flex items-start justify-between max-h-20">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#68708f] font-semibold mb-2">
                  {s.label}
                </p>

                <h2 className="text-3xl leading-none font-bold text-white tracking-tight">
                  {loading ? (
                    <div className="w-7 h-7 rounded-xl bg-[#1b2031] animate-pulse" />
                  ) : (
                    s.value
                  )}
                </h2>

                <p className="text-[#68708f] text-xs mt-3 truncate">{s.sub}</p>
              </div>

              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-2xl bg-[#6366f1]/10 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative flex md:h-[60px] md:w-[60px] xl:h-[72px] xl:w-[72px] items-center justify-center rounded-[24px] border border-[#2a3047] bg-[#181c2b] transition-all duration-300 group-hover:border-[#3b4261]">
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

        <div className="rounded-3xl border border-[#1d2335] bg-[#10131d] p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[#68708f] font-semibold mb-2">
                Notification Activity
              </p>

              <h3 className="text-[1.1rem] font-semibold text-white">
                Monthly Overview
              </h3>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#1f3a2f] bg-[#15222c] px-3 py-1 text-[0.72rem] font-medium text-[#4ade80]">
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

              <CartesianGrid stroke="#1d2335" vertical={false} />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#68708f",
                  fontSize: 11,
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#68708f",
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

        <div className="rounded-3xl border border-[#1d2335] bg-[#10131d] p-6">
          <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[#68708f] font-semibold mb-2">
            Branch Distribution
          </p>

          <h3 className="text-[1.1rem] font-semibold text-white mb-6">
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
                <CartesianGrid stroke="#1d2335" horizontal={false} />

                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#68708f",
                    fontSize: 10,
                  }}
                />

                <YAxis
                  type="category"
                  dataKey="branch"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#9ba2c0",
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

      <div className="overflow-hidden rounded-3xl border border-[#1d2335] bg-[#10131d]">
        <div className="flex items-center justify-between border-b border-[#1d2335] px-6 py-5">
          <div>
            <h3 className="text-[1rem] font-semibold text-white">
              Recent Uploads
            </h3>

            <p className="text-[#68708f] text-[0.82rem] mt-1">
              Latest imported academic records
            </p>
          </div>

          <span className="text-[#68708f] text-[0.78rem]">Last 5 uploads</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1d2335]">
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
                    className="px-6 py-4 text-left text-[0.72rem] uppercase tracking-[0.16em] text-[#68708f] font-semibold whitespace-nowrap"
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
                  className="border-b border-[#1d2335] last:border-none hover:bg-[#141824] transition-all"
                >
                  <td className="px-6 py-4 font-mono text-[#c7d0f5] text-[0.82rem] whitespace-nowrap">
                    {u.fileName}
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full border border-[#23293f] bg-[#141824] px-3 py-1 text-[0.72rem] text-[#9ba2c0]">
                      {u.course}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-[#9ba2c0] text-[0.84rem] whitespace-nowrap">
                    {u.branch}
                  </td>

                  <td className="px-6 py-4 text-[#9ba2c0] text-[0.84rem]">
                    Sem {u.semester}
                  </td>

                  <td className="px-6 py-4 font-semibold text-white">
                    {u.records}
                  </td>

                  <td className="px-6 py-4 text-[#68708f] text-[0.82rem] whitespace-nowrap">
                    {u.uploadedAt}
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#1f3a2f] bg-[#15222c] px-3 py-1 text-[0.72rem] font-medium text-[#4ade80]">
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
