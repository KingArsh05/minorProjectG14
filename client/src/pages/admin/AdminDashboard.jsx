import { Upload, CheckCircle, Database, Users, TrendingUp } from "lucide-react";
import {
  dashboardStats,
  notificationActivity,
  branchDistribution,
  recentUploads,
} from "../../data/stats";
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

const statCards = [
  {
    label: "Total Students",
    value: dashboardStats.totalStudents,
    sub: "Across all branches",
    icon: Users,
    iconBg: "from-[#6366f1] to-[#4f46e5]",
    bl: "border-l-[3px] border-l-[#6366f1]",
  },
  {
    label: "Notifications Sent",
    value: dashboardStats.notificationsSent,
    sub: "This semester",
    icon: Upload,
    iconBg: "from-[#06b6d4] to-[#0891b2]",
    bl: "border-l-[3px] border-l-[#06b6d4]",
  },
  {
    label: "Detained Students",
    value: dashboardStats.detainedStudents,
    sub: "Needs attention",
    icon: TrendingUp,
    iconBg: "from-[#ef4444] to-[#b91c1c]",
    bl: "border-l-[3px] border-l-[#ef4444]",
  },
  {
    label: "Active Tokens",
    value: dashboardStats.activeTokens,
    sub: "Valid & not expired",
    icon: CheckCircle,
    iconBg: "from-[#10b981] to-[#059669]",
    bl: "border-l-[3px] border-l-[#10b981]",
  },
  {
    label: "Courses Offered",
    value: dashboardStats.coursesOffered,
    sub: "B.Tech, MCA, MBA…",
    icon: Database,
    iconBg: "from-[#f59e0b] to-[#d97706]",
    bl: "border-l-[3px] border-l-[#f59e0b]",
  },
  {
    label: "Average CGPA",
    value: dashboardStats.avgCGPA,
    sub: "Institution-wide",
    icon: TrendingUp,
    iconBg: "from-[#8b5cf6] to-[#7c3aed]",
    bl: "border-l-[3px] border-l-[#8b5cf6]",
  },
];

const TT = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1e2132] border border-[#2e3354] rounded-lg px-3 py-2 text-xs shadow-lg">
      <p className="text-[#5c6385] mb-1 font-medium">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="font-bold">
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

export default function AdminDashboard() {
  return (
    <div className="fade-in">
      {/* ── Welcome Banner ─────────────────────────────────── */}
      <div
        className="relative rounded-2xl overflow-hidden mb-8 p-7 border border-[rgba(99,102,241,0.3)]"
        style={{
          background:
            "linear-gradient(135deg, #1a1040 0%, #0f1f3d 50%, #091820 100%)",
        }}
      >
        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #818cf8 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* Glow blobs */}
        <div
          className="absolute -top-10 -left-10 w-48 h-48 rounded-full blur-[60px] opacity-30"
          style={{
            background: "radial-gradient(circle, #6366f1, transparent)",
          }}
        />
        <div
          className="absolute -bottom-10 right-10 w-48 h-48 rounded-full blur-[60px] opacity-20"
          style={{
            background: "radial-gradient(circle, #06b6d4, transparent)",
          }}
        />

        <div className="relative flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="text-[#818cf8] text-sm font-semibold mb-1">
              Welcome back 👋
            </p>
            <h2
              className="text-[1.7rem] font-extrabold text-white mb-1"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Academic Summary — Spring 2025
            </h2>
            <p className="text-[#9ba2c0] text-[0.85rem]">
              <span className="text-[#34d399] font-semibold">
                {dashboardStats.notificationsSent}
              </span>{" "}
              notifications dispatched today &nbsp;·&nbsp;
              <span className="text-[#22d3ee] font-semibold">
                {dashboardStats.activeTokens}
              </span>{" "}
              active tokens
            </p>
          </div>
          <div className="flex gap-3 relative">
            <button className="inline-flex items-center gap-2 px-5 py-[0.6rem] rounded-xl text-[#9ba2c0] text-sm font-medium border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] hover:text-white transition-all cursor-pointer">
              View Reports
            </button>
            <button className="inline-flex items-center gap-2 px-5 py-[0.6rem] rounded-xl text-white text-sm font-semibold bg-linear-to-br from-[#6366f1] to-[#4f46e5] shadow-[0_4px_20px_rgba(99,102,241,0.4)] hover:-translate-y-px transition-all cursor-pointer">
              <Upload size={14} /> Notify Parents
            </button>
          </div>
        </div>
      </div>

      {/* ── Stat Cards (3×2 grid) ───────────────────────────── */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {statCards.map((s) => (
          <div
            key={s.label}
            className={`bg-[#13162b] border border-[#252840] rounded-2xl p-5 ${s.bl} transition-all hover:border-[#2e3354] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[0.7rem] text-[#5c6385] font-semibold uppercase tracking-widest mb-2">
                  {s.label}
                </p>
                <p
                  className="text-[2rem] font-extrabold text-[#f0f1fa] leading-none mb-1"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {s.value}
                </p>
                <p className="text-[0.72rem] text-[#5c6385]">{s.sub}</p>
              </div>
              <div
                className={`w-11 h-11 rounded-xl bg-linear-to-br ${s.iconBg} flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.3)]`}
              >
                <s.icon size={20} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Charts Row ──────────────────────────────────────── */}
      <div className="grid grid-cols-[1fr_320px] gap-5 mb-8">
        {/* Area Chart */}
        <div className="bg-[#13162b] border border-[#252840] rounded-2xl p-6 hover:border-[#2e3354] transition-colors">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[0.7rem] text-[#5c6385] font-semibold uppercase tracking-widest mb-1">
                Notification Activity
              </p>
              <h3
                className="text-[1.05rem] font-bold text-[#f0f1fa]"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Monthly Overview
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.7rem] font-semibold bg-[rgba(16,185,129,0.12)] text-[#34d399] border border-[rgba(16,185,129,0.25)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />{" "}
              LIVE
            </span>
          </div>
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart
              data={notificationActivity}
              margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gSent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gOpened" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1e2132"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "#5c6385", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#5c6385", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<TT />} />
              <Area
                type="monotone"
                dataKey="sent"
                name="Sent"
                stroke="#6366f1"
                fill="url(#gSent)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
              <Area
                type="monotone"
                dataKey="opened"
                name="Opened"
                stroke="#06b6d4"
                fill="url(#gOpened)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-[#13162b] border border-[#252840] rounded-2xl p-6 hover:border-[#2e3354] transition-colors">
          <p className="text-[0.7rem] text-[#5c6385] font-semibold uppercase tracking-widest mb-1">
            Branch Distribution
          </p>
          <h3
            className="text-[1.05rem] font-bold text-[#f0f1fa] mb-5"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Students per Branch
          </h3>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart
              data={branchDistribution}
              layout="vertical"
              barSize={8}
              margin={{ left: -8, right: 8 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1e2132"
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{ fill: "#5c6385", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="branch"
                width={36}
                tick={{ fill: "#9ba2c0", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<TT />} />
              <Bar
                dataKey="students"
                name="Students"
                fill="url(#barGrad)"
                radius={[0, 4, 4, 0]}
              >
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Recent Uploads Table ─────────────────────────────── */}
      <div className="bg-[#13162b] border border-[#252840] rounded-2xl overflow-hidden hover:border-[#2e3354] transition-colors">
        <div className="px-6 py-4 border-b border-[#252840] flex items-center justify-between">
          <h3
            className="text-[0.95rem] font-bold text-[#f0f1fa]"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Recent Uploads
          </h3>
          <span className="text-[0.72rem] text-[#5c6385]">Last 5 imports</span>
        </div>
        <div className="overflow-x-auto">
          <table
            className="w-full"
            style={{ borderCollapse: "separate", borderSpacing: 0 }}
          >
            <thead>
              <tr>
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
                    className="bg-[#161925] text-[#5c6385] text-[0.7rem] font-semibold tracking-widest uppercase px-5 py-3 text-left border-b border-[#252840] whitespace-nowrap"
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
                  className="border-b border-[#252840] last:border-b-0 hover:bg-[#1e2132] transition-colors"
                >
                  <td className="px-5 py-3 font-mono text-[#818cf8] text-[0.78rem]">
                    {u.fileName}
                  </td>
                  <td className="px-5 py-3">
                    <span className="inline-flex px-[0.65rem] py-[0.2rem] rounded-full text-[0.7rem] font-semibold bg-[rgba(99,102,241,0.15)] text-[#818cf8] border border-[rgba(99,102,241,0.25)]">
                      {u.course}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-[0.82rem] text-[#9ba2c0]">
                    {u.branch}
                  </td>
                  <td className="px-5 py-3 text-[0.82rem] text-[#9ba2c0]">
                    Sem {u.semester}
                  </td>
                  <td className="px-5 py-3 font-bold text-[#22d3ee] text-[0.9rem]">
                    {u.records}
                  </td>
                  <td className="px-5 py-3 text-[0.78rem] text-[#5c6385] whitespace-nowrap">
                    {u.uploadedAt}
                  </td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1 px-[0.65rem] py-[0.2rem] rounded-full text-[0.7rem] font-semibold bg-[rgba(16,185,129,0.15)] text-[#34d399] border border-[rgba(16,185,129,0.25)]">
                      ✓ Success
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
