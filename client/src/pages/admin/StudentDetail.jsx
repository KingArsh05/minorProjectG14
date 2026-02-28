import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Send,
  Download,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  BookOpen,
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
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";

const sgpaClass = (s) => {
  if (s >= 9) return "sgpa-excellent";
  if (s >= 8) return "sgpa-good";
  if (s >= 7) return "sgpa-average";
  return "sgpa-poor";
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length)
    return (
      <div
        className="glass"
        style={{
          padding: "0.6rem 0.9rem",
          borderRadius: "10px",
          fontSize: "0.8rem",
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

export default function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = students.find((s) => s._id === id);
  const [openSem, setOpenSem] = useState(null);

  if (!student) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
        <p style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>
          Student not found.
        </p>
        <button
          className="btn-secondary"
          style={{ marginTop: "1rem" }}
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  const chartData = student.semesters.map((s) => ({
    name: `Sem ${s.semesterNumber}`,
    SGPA: s.sgpa,
  }));
  const totalDetained = student.semesters
    .flatMap((s) => s.subjects)
    .filter((sub) => sub.status === "Detained").length;
  const avgSGPA = student.semesters.length
    ? (
        student.semesters.reduce((a, s) => a + s.sgpa, 0) /
        student.semesters.length
      ).toFixed(2)
    : "—";
  const avgAtt = student.semesters.filter((s) => s.attendance).length
    ? (
        student.semesters
          .filter((s) => s.attendance)
          .reduce((a, s) => a + s.attendance, 0) /
        student.semesters.filter((s) => s.attendance).length
      ).toFixed(1)
    : null;

  return (
    <div className="fade-in">
      {/* Back */}
      <button
        className="btn-ghost"
        style={{ marginBottom: "1.25rem" }}
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={14} /> Back to Students
      </button>

      {/* Header */}
      <div
        className="card"
        style={{
          marginBottom: "1.25rem",
          display: "flex",
          gap: "1.5rem",
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "16px",
            flexShrink: 0,
            background: `linear-gradient(135deg, hsl(${(student.urn * 47) % 360},60%,40%), hsl(${(student.urn * 47 + 40) % 360},70%,35%))`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.6rem",
            fontWeight: 800,
            color: "white",
          }}
        >
          {student.fullName[0]}
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              alignItems: "center",
              marginBottom: "0.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.3rem",
                fontWeight: 800,
                fontFamily: "Outfit, sans-serif",
                color: "var(--text-primary)",
              }}
            >
              {student.fullName}
            </h2>
            {totalDetained > 0 ? (
              <span className="badge badge-danger">
                <AlertTriangle size={10} /> {totalDetained} Detained
              </span>
            ) : (
              <span className="badge badge-success">
                <CheckCircle size={10} /> All Clear
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <span className="chip">URN: {student.urn}</span>
            <span className="chip">CRN: {student.crn}</span>
            <span className="badge badge-purple">{student.course}</span>
            {student.branch && <span className="chip">{student.branch}</span>}
            <span className="chip">
              {student.admissionYear} – {student.graduationYear}
            </span>
          </div>
          <div
            style={{
              marginTop: "0.75rem",
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            <span className="chip">📧 {student.parentEmail}</span>
            <span className="chip">📱 {student.parentPhone}</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
          <button className="btn-secondary">
            <Download size={14} /> Download PDF
          </button>
          <button className="btn-primary">
            <Send size={14} /> Send Link
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
          gap: "0.85rem",
          marginBottom: "1.25rem",
        }}
      >
        {[
          {
            label: "Semesters",
            val: student.semesters.length,
            color: "var(--primary-light)",
          },
          { label: "Avg SGPA", val: avgSGPA, color: "var(--accent-light)" },
          {
            label: "Avg Attendance",
            val: avgAtt ? `${avgAtt}%` : "—",
            color: avgAtt >= 75 ? "var(--success)" : "var(--danger)",
          },
          {
            label: "CGPA",
            val: student.cgpa ?? "In Progress",
            color: "var(--warning)",
          },
          {
            label: "Detained Subjects",
            val: totalDetained,
            color: totalDetained > 0 ? "var(--danger)" : "var(--success)",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="card-sm"
            style={{ textAlign: "center" }}
          >
            <p
              style={{
                fontSize: "1.4rem",
                fontWeight: 800,
                fontFamily: "Outfit, sans-serif",
                color: s.color,
              }}
            >
              {s.val}
            </p>
            <p
              style={{
                fontSize: "0.68rem",
                color: "var(--text-muted)",
                marginTop: "2px",
              }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Chart + Semesters */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "340px 1fr",
          gap: "1.25rem",
          marginBottom: "1.25rem",
        }}
      >
        {/* SGPA Chart */}
        <div className="card">
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "0.25rem",
            }}
          >
            Performance
          </p>
          <h3
            style={{
              fontSize: "0.95rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            SGPA Progression
          </h3>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "var(--text-muted)", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 10]}
                  tick={{ fill: "var(--text-muted)", fontSize: 10 }}
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
          ) : (
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.8rem",
                textAlign: "center",
                padding: "2rem 0",
              }}
            >
              No data yet
            </p>
          )}
        </div>

        {/* Semester Accordion */}
        <div>
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            Semester Records
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
                style={{ marginBottom: "0.75rem" }}
              >
                <div
                  className="sem-header"
                  onClick={() => setOpenSem(isOpen ? null : sem._id)}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        background:
                          "linear-gradient(135deg, var(--primary), var(--accent))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        color: "white",
                      }}
                    >
                      S{sem.semesterNumber}
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "0.88rem",
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
                        {sem.subjects.length} subjects · Att:{" "}
                        {sem.attendance ?? "N/A"}%
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
                        <AlertTriangle size={9} /> {detained}
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
                  <div style={{ padding: "1rem 1.5rem" }}>
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
                                fontSize: "0.78rem",
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
                                {sub.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
          {student.semesters.length === 0 && (
            <div
              className="card"
              style={{ textAlign: "center", padding: "2rem" }}
            >
              <BookOpen
                size={24}
                style={{ color: "var(--text-muted)", margin: "0 auto 0.5rem" }}
              />
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                No semester data available yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
