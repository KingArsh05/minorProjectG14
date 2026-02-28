import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  GraduationCap,
  Download,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  BookOpen,
  User,
  Calendar,
} from "lucide-react";
import { students } from "../../data/students";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Map token to student (dummy: first token→student1, second→student2 etc.)
const tokenMap = {
  a3f9c2e8d1b7a6f4c9e3d2b8a1f7c6e4: "stu_001",
  b4g0d3f9e2c8b7a5d0f4e3c9b2a8f7d5: "stu_002",
  c5h1e4g0f3d9c8b6e1g5f4d0c3b9g8e6: "stu_003",
  d6i2f5h1g4e0d9c7f2h6g5e1d4c0h9f7: "stu_004",
  e7j3g6i2h5f1e0d8g3i7h6f2e5d1i0g8: "stu_005",
  // Demo token to show
  demo: "stu_001",
};

const sgpaClass = (s) => {
  if (s >= 9) return "sgpa-excellent";
  if (s >= 8) return "sgpa-good";
  if (s >= 7) return "sgpa-average";
  return "sgpa-poor";
};

const AttendanceRing = ({ value }) => {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const fill = (value / 100) * circ;
  const color =
    value >= 75
      ? "var(--success)"
      : value >= 60
        ? "var(--warning)"
        : "var(--danger)";
  return (
    <div
      style={{
        position: "relative",
        width: "70px",
        height: "70px",
        flexShrink: 0,
      }}
    >
      <svg width="70" height="70" style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx="35"
          cy="35"
          r={r}
          fill="none"
          stroke="var(--bg-elevated)"
          strokeWidth="6"
        />
        <circle
          cx="35"
          cy="35"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeDasharray={`${fill} ${circ}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1s ease" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <p
          style={{ fontSize: "0.75rem", fontWeight: 800, color, lineHeight: 1 }}
        >
          {value}%
        </p>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length)
    return (
      <div
        className="glass"
        style={{
          padding: "0.5rem 0.8rem",
          borderRadius: "9px",
          fontSize: "0.78rem",
        }}
      >
        <p style={{ color: "var(--text-muted)" }}>{label}</p>
        <p style={{ color: "#818cf8", fontWeight: 700 }}>
          SGPA: {payload[0]?.value}
        </p>
      </div>
    );
  return null;
};

export default function GuardianDashboard() {
  const [params] = useSearchParams();
  const token = params.get("token") || "demo";
  const studentId = tokenMap[token];
  const student = students.find((s) => s._id === studentId);
  const [openSem, setOpenSem] = useState(null);

  if (!student) {
    return (
      <div
        className="guardian-bg"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "rgba(239,68,68,0.1)",
              border: "2px solid var(--danger)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.25rem",
            }}
          >
            <AlertTriangle size={32} color="var(--danger)" />
          </div>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              marginBottom: "0.5rem",
            }}
          >
            Invalid Access
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            This link is invalid, expired, or has already been used.
          </p>
        </div>
      </div>
    );
  }

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
    .filter((sub) => sub.status === "Detained").length;
  const lastSem = student.semesters[student.semesters.length - 1];

  return (
    <div
      className="guardian-bg"
      style={{ padding: "1.5rem", minHeight: "100vh" }}
    >
      {/* Top Bar */}
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.75rem",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "9px",
                background:
                  "linear-gradient(135deg, var(--primary), var(--accent))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <GraduationCap size={18} color="white" />
            </div>
            <div>
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: 800,
                  fontFamily: "Outfit, sans-serif",
                  color: "var(--text-primary)",
                }}
              >
                AcadAlert
              </p>
              <p style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>
                Academic Report Portal
              </p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
            <span
              className="badge badge-success"
              style={{ fontSize: "0.65rem" }}
            >
              <CheckCircle size={9} /> Secure Link
            </span>
            <button className="btn-secondary" style={{ fontSize: "0.78rem" }}>
              <Download size={13} /> Download PDF
            </button>
          </div>
        </div>

        {/* Student Banner */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(6,182,212,0.08))",
            border: "1px solid rgba(99,102,241,0.2)",
            borderRadius: "20px",
            padding: "1.75rem",
            marginBottom: "1.5rem",
            display: "flex",
            gap: "1.25rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "68px",
              height: "68px",
              borderRadius: "18px",
              flexShrink: 0,
              background: `linear-gradient(135deg, hsl(${(student.urn * 47) % 360},60%,40%), hsl(${(student.urn * 47 + 40) % 360},70%,35%))`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.8rem",
              fontWeight: 800,
              color: "white",
              boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            }}
          >
            {student.fullName[0]}
          </div>
          <div style={{ flex: 1 }}>
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                fontFamily: "Outfit, sans-serif",
                color: "var(--text-primary)",
                marginBottom: "0.3rem",
              }}
            >
              {student.fullName}
            </h1>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <span className="chip">
                <User size={11} /> URN: {student.urn}
              </span>
              <span className="badge badge-purple">{student.course}</span>
              {student.branch && <span className="chip">{student.branch}</span>}
              <span className="chip">
                <Calendar size={11} /> {student.admissionYear} –{" "}
                {student.graduationYear}
              </span>
            </div>
          </div>
          {totalDetained > 0 ? (
            <div
              style={{
                background: "rgba(239,68,68,0.12)",
                border: "1px solid rgba(239,68,68,0.25)",
                borderRadius: "12px",
                padding: "0.75rem 1.1rem",
                textAlign: "center",
              }}
            >
              <AlertTriangle
                size={20}
                color="var(--danger)"
                style={{ display: "block", margin: "0 auto 0.25rem" }}
              />
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--danger-light)",
                  fontWeight: 600,
                }}
              >
                {totalDetained} Subject{totalDetained > 1 ? "s" : ""} Detained
              </p>
            </div>
          ) : (
            <div
              style={{
                background: "rgba(16,185,129,0.1)",
                border: "1px solid rgba(16,185,129,0.2)",
                borderRadius: "12px",
                padding: "0.75rem 1.1rem",
                textAlign: "center",
              }}
            >
              <CheckCircle
                size={20}
                color="var(--success)"
                style={{ display: "block", margin: "0 auto 0.25rem" }}
              />
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--success)",
                  fontWeight: 600,
                }}
              >
                All Clear
              </p>
            </div>
          )}
        </div>

        {/* Overview Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "0.85rem",
            marginBottom: "1.5rem",
          }}
        >
          {[
            {
              label: "Semesters Completed",
              val: student.semesters.length,
              color: "var(--primary-light)",
            },
            {
              label: "Current Avg SGPA",
              val: avgSGPA,
              color: "var(--accent-light)",
            },
            {
              label: "Latest SGPA",
              val: lastSem?.sgpa ?? "—",
              color: "var(--success)",
            },
            {
              label: "Last Attendance",
              val: lastSem?.attendance ? `${lastSem.attendance}%` : "—",
              color:
                lastSem?.attendance >= 75 ? "var(--success)" : "var(--danger)",
            },
            {
              label: "CGPA",
              val: student.cgpa ?? "Pending",
              color: "var(--warning)",
            },
          ].map((c) => (
            <div key={c.label} className="card" style={{ textAlign: "center" }}>
              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  fontFamily: "Outfit, sans-serif",
                  color: c.color,
                }}
              >
                {c.val}
              </p>
              <p
                style={{
                  fontSize: "0.67rem",
                  color: "var(--text-muted)",
                  marginTop: "3px",
                }}
              >
                {c.label}
              </p>
            </div>
          ))}
        </div>

        {/* Chart */}
        {chartData.length > 1 && (
          <div className="card" style={{ marginBottom: "1.5rem" }}>
            <p
              style={{
                fontSize: "0.73rem",
                color: "var(--text-muted)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "0.25rem",
              }}
            >
              Performance Trend
            </p>
            <h3
              style={{
                fontSize: "0.95rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "1rem",
              }}
            >
              SGPA across Semesters
            </h3>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 10]}
                  tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="SGPA"
                  stroke="#818cf8"
                  strokeWidth={2.5}
                  dot={{ fill: "#818cf8", r: 5, strokeWidth: 0 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Semester Accordion */}
        <div>
          <p
            style={{
              fontSize: "0.73rem",
              color: "var(--text-muted)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: "0.85rem",
            }}
          >
            Semester-wise Details
          </p>
          {student.semesters.map((sem) => {
            const isOpen = openSem === sem._id;
            const detained = sem.subjects.filter(
              (s) => s.status === "Detained",
            ).length;
            return (
              <div
                key={sem._id}
                className="sem-card"
                style={{ marginBottom: "0.85rem" }}
              >
                <div
                  className="sem-header"
                  onClick={() => setOpenSem(isOpen ? null : sem._id)}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.85rem",
                    }}
                  >
                    {sem.attendance && (
                      <AttendanceRing value={sem.attendance} />
                    )}
                    <div>
                      <p
                        style={{
                          fontSize: "0.92rem",
                          fontWeight: 700,
                          color: "var(--text-primary)",
                        }}
                      >
                        Semester {sem.semesterNumber}
                      </p>
                      <p
                        style={{
                          fontSize: "0.7rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        {sem.subjects.length} subjects
                        {sem.attendance && ` · Attendance: ${sem.attendance}%`}
                        {sem.attendance < 75 && " ⚠️"}
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                    }}
                  >
                    {detained > 0 && (
                      <span className="badge badge-danger">
                        <AlertTriangle size={9} /> {detained} detained
                      </span>
                    )}
                    <span className={`sgpa-pill ${sgpaClass(sem.sgpa)}`}>
                      SGPA {sem.sgpa}
                    </span>
                    {isOpen ? (
                      <ChevronUp
                        size={16}
                        style={{ color: "var(--text-muted)" }}
                      />
                    ) : (
                      <ChevronDown
                        size={16}
                        style={{ color: "var(--text-muted)" }}
                      />
                    )}
                  </div>
                </div>

                {isOpen && (
                  <div style={{ padding: "1.25rem 1.5rem" }}>
                    <div style={{ overflowX: "auto" }}>
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>Subject</th>
                            <th>Code</th>
                            <th>Type</th>
                            <th>Internal</th>
                            <th>External</th>
                            <th>Total</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sem.subjects.map((sub) => (
                            <tr key={sub._id}>
                              <td style={{ fontSize: "0.82rem" }}>
                                {sub.subjectTitle}
                              </td>
                              <td
                                style={{
                                  fontFamily: "monospace",
                                  fontSize: "0.76rem",
                                  color: "var(--accent-light)",
                                }}
                              >
                                {sub.subjectCode}
                              </td>
                              <td>
                                <span
                                  className={`badge ${sub.type === "T" ? "badge-info" : "badge-warning"}`}
                                >
                                  {sub.type === "T" ? "Theory" : "Practical"}
                                </span>
                              </td>
                              <td
                                style={{
                                  fontWeight: 600,
                                  color: sub.internalDetained
                                    ? "var(--danger)"
                                    : "var(--text-secondary)",
                                }}
                              >
                                {sub.internalMarks}
                                {sub.internalDetained && " ⚠"}
                              </td>
                              <td
                                style={{
                                  fontWeight: 600,
                                  color: sub.externalDetained
                                    ? "var(--danger)"
                                    : "var(--text-secondary)",
                                }}
                              >
                                {sub.externalMarks}
                                {sub.externalDetained && " ⚠"}
                              </td>
                              <td
                                style={{
                                  fontWeight: 700,
                                  color: "var(--text-primary)",
                                }}
                              >
                                {sub.totalMarks}
                              </td>
                              <td>
                                <span
                                  className={`badge ${sub.status === "Pass" ? "badge-success" : "badge-danger"}`}
                                >
                                  {sub.status === "Pass" ? (
                                    <CheckCircle size={9} />
                                  ) : (
                                    <AlertTriangle size={9} />
                                  )}{" "}
                                  {sub.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            padding: "2rem 0 1rem",
            borderTop: "1px solid var(--border)",
            marginTop: "2rem",
          }}
        >
          <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
            🔒 This link expires in 24 hours · Academic Status Transparency
            Notification System · Group 14
          </p>
        </div>
      </div>
    </div>
  );
}
