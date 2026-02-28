import {
  BarChart2,
  Users,
  KeyRound,
  Send,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  Activity,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import {
  dashboardStats,
  monthlyNotifications,
  branchDistribution,
  uploadHistory,
} from "../../data/stats";

const StatCard = ({ icon: Icon, label, value, sub, accent, border }) => (
  <div
    className={`card ${border}`}
    style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}
  >
    <div
      style={{
        width: "44px",
        height: "44px",
        borderRadius: "12px",
        background: accent,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Icon size={20} color="white" />
    </div>
    <div>
      <p
        style={{
          fontSize: "0.75rem",
          color: "var(--text-muted)",
          marginBottom: "0.2rem",
          fontWeight: 500,
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: "1.6rem",
          fontWeight: 800,
          color: "var(--text-primary)",
          lineHeight: 1,
          fontFamily: "Outfit, sans-serif",
        }}
      >
        {value}
      </p>
      {sub && (
        <p
          style={{
            fontSize: "0.72rem",
            color: "var(--text-muted)",
            marginTop: "0.25rem",
          }}
        >
          {sub}
        </p>
      )}
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div
        className="glass"
        style={{
          padding: "0.6rem 0.9rem",
          borderRadius: "10px",
          fontSize: "0.8rem",
        }}
      >
        <p style={{ color: "var(--text-muted)", marginBottom: "4px" }}>
          {label}
        </p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color, fontWeight: 600 }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminDashboard() {
  return (
    <div className="fade-in">
      {/* Welcome Banner */}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(6,182,212,0.1))",
          border: "1px solid rgba(99,102,241,0.2)",
          borderRadius: "16px",
          padding: "1.5rem 2rem",
          marginBottom: "1.75rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--primary-light)",
              fontWeight: 600,
              marginBottom: "0.2rem",
            }}
          >
            Welcome back 👋
          </p>
          <h2
            style={{
              fontSize: "1.4rem",
              fontWeight: 800,
              fontFamily: "Outfit, sans-serif",
              color: "var(--text-primary)",
            }}
          >
            Academic Summary — Spring 2025
          </h2>
          <p
            style={{
              fontSize: "0.82rem",
              color: "var(--text-secondary)",
              marginTop: "0.25rem",
            }}
          >
            {dashboardStats.notificationsSentToday} notifications dispatched
            today · {dashboardStats.activeTokens} active tokens
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button className="btn-secondary">View Reports</button>
          <button className="btn-primary">
            <Send size={14} />
            Notify Parents
          </button>
        </div>
      </div>

      {/* Stat Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: "1rem",
          marginBottom: "1.75rem",
        }}
      >
        <StatCard
          icon={Users}
          label="Total Students"
          value={dashboardStats.totalStudents}
          sub="Across all branches"
          accent="linear-gradient(135deg,#6366f1,#4f46e5)"
          border="stat-border-primary"
        />
        <StatCard
          icon={Send}
          label="Notifications Sent"
          value={dashboardStats.totalNotificationsSent}
          sub="This semester"
          accent="linear-gradient(135deg,#06b6d4,#0891b2)"
          border="stat-border-accent"
        />
        <StatCard
          icon={AlertTriangle}
          label="Detained Students"
          value={dashboardStats.detainedStudents}
          sub="Needs attention"
          accent="linear-gradient(135deg,#ef4444,#b91c1c)"
          border="stat-border-danger"
        />
        <StatCard
          icon={KeyRound}
          label="Active Tokens"
          value={dashboardStats.activeTokens}
          sub="Valid & not expired"
          accent="linear-gradient(135deg,#10b981,#059669)"
          border="stat-border-success"
        />
        <StatCard
          icon={BookOpen}
          label="Courses Offered"
          value={dashboardStats.coursesOffered}
          sub="B.Tech, MCA, MBA…"
          accent="linear-gradient(135deg,#f59e0b,#d97706)"
          border="stat-border-warning"
        />
        <StatCard
          icon={TrendingUp}
          label="Avg. CGPA"
          value={dashboardStats.averageCGPA}
          sub="Institution-wide"
          accent="linear-gradient(135deg,#8b5cf6,#6d28d9)"
          border="stat-border-primary"
        />
      </div>

      {/* Charts Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: "1.25rem",
          marginBottom: "1.75rem",
        }}
      >
        {/* Monthly notifications */}
        <div className="card" style={{ padding: "1.5rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.25rem",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.72rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Notification Activity
              </p>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                }}
              >
                Monthly Overview
              </h3>
            </div>
            <span className="badge badge-info">
              <Activity size={10} /> Live
            </span>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={monthlyNotifications}>
              <defs>
                <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOpened" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="month"
                tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="sent"
                name="Sent"
                stroke="#6366f1"
                fill="url(#colorSent)"
                strokeWidth={2}
                dot={{ fill: "#6366f1", r: 3 }}
              />
              <Area
                type="monotone"
                dataKey="opened"
                name="Opened"
                stroke="#06b6d4"
                fill="url(#colorOpened)"
                strokeWidth={2}
                dot={{ fill: "#06b6d4", r: 3 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Branch Distribution */}
        <div className="card" style={{ padding: "1.5rem" }}>
          <p
            style={{
              fontSize: "0.72rem",
              color: "var(--text-muted)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: "0.3rem",
            }}
          >
            Branch Distribution
          </p>
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1.25rem",
            }}
          >
            Students per Branch
          </h3>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={branchDistribution} layout="vertical" barSize={10}>
              <XAxis
                type="number"
                tick={{ fill: "var(--text-muted)", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: "var(--text-secondary)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={38}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="students"
                name="Students"
                fill="#6366f1"
                radius={[0, 6, 6, 0]}
                background={{
                  fill: "var(--bg-elevated)",
                  radius: [0, 6, 6, 0],
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Uploads */}
      <div className="card">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.25rem",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "0.72rem",
                color: "var(--text-muted)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Data Ingestion
            </p>
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              Recent Uploads
            </h3>
          </div>
          <button className="btn-ghost">View All</button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Semester</th>
                <th>Branch</th>
                <th>Records</th>
                <th>Uploaded By</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {uploadHistory.map((row, i) => (
                <tr key={i}>
                  <td>{row.date}</td>
                  <td>{row.semester}</td>
                  <td>{row.branch}</td>
                  <td>
                    <span className="badge badge-info">
                      {row.records} students
                    </span>
                  </td>
                  <td>{row.uploadedBy}</td>
                  <td>
                    <span className="badge badge-success">Processed</span>
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
