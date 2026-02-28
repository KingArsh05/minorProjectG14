import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  GraduationCap,
  Download,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle,
  Calendar,
  User,
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

const tokenMap = {
  a3f9c2e8d1b7a6f4c9e3d2b8a1f7c6e4: "stu_001",
  b4g0d3f9e2c8b7a5d0f4e3c9b2a8f7d5: "stu_002",
  demo: "stu_001",
};

const sgpaPill = (s) => {
  if (s >= 9)
    return "bg-[rgba(16,185,129,0.15)] text-[#34d399] border border-[rgba(16,185,129,0.3)]";
  if (s >= 8)
    return "bg-[rgba(99,102,241,0.15)] text-[#818cf8] border border-[rgba(99,102,241,0.3)]";
  if (s >= 7)
    return "bg-[rgba(245,158,11,0.15)] text-[#fbbf24] border border-[rgba(245,158,11,0.3)]";
  return "bg-[rgba(239,68,68,0.15)] text-[#f87171] border border-[rgba(239,68,68,0.3)]";
};

const TT = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#161925] border border-[#2e3354] rounded-lg px-3 py-2 text-xs">
      <p className="text-[#5c6385]">{label}</p>
      <p className="text-[#818cf8] font-bold">SGPA: {payload[0]?.value}</p>
    </div>
  );
};

const AttRing = ({ value }) => {
  const r = 28,
    circ = 2 * Math.PI * r,
    fill = (value / 100) * circ;
  const color = value >= 75 ? "#34d399" : value >= 60 ? "#fbbf24" : "#f87171";
  return (
    <div className="relative w-[70px] h-[70px] shrink-0">
      <svg width="70" height="70" style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx="35"
          cy="35"
          r={r}
          fill="none"
          stroke="#161925"
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
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-[0.75rem] font-extrabold" style={{ color }}>
          {value}%
        </p>
      </div>
    </div>
  );
};

export default function GuardianDashboard() {
  const [params] = useSearchParams();
  const token = params.get("token") || "demo";
  const studentId = tokenMap[token];
  const student = students.find((s) => s._id === studentId);
  const [openSem, setOpenSem] = useState(null);

  if (!student)
    return (
      <div className="min-h-screen bg-[#0a0b14] flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-[72px] h-[72px] rounded-full bg-[rgba(239,68,68,0.1)] border-2 border-[#ef4444] flex items-center justify-center mx-auto mb-5">
            <AlertTriangle size={32} color="#ef4444" />
          </div>
          <h1
            className="text-[1.5rem] font-extrabold text-[#f0f1fa] mb-2"
            style={{ fontFamily: "Outfit,sans-serif" }}
          >
            Invalid Access
          </h1>
          <p className="text-[#5c6385] text-[0.9rem]">
            This link is invalid, expired, or has already been used.
          </p>
        </div>
      </div>
    );

  const avatarGrad = `linear-gradient(135deg, hsl(${(student.urn * 47) % 360},60%,38%), hsl(${(student.urn * 47 + 40) % 360},65%,32%))`;
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

  return (
    <div
      className="min-h-screen bg-[#0a0b14] p-6"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 10% 20%, rgba(99,102,241,0.08) 0%, transparent 60%), radial-gradient(ellipse at 90% 80%, rgba(6,182,212,0.06) 0%, transparent 60%)",
      }}
    >
      <div className="max-w-[960px] mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[9px] bg-linear-to-br from-[#6366f1] to-[#06b6d4] flex items-center justify-center">
              <GraduationCap size={18} className="text-white" />
            </div>
            <div>
              <p
                className="text-[1rem] font-extrabold text-[#f0f1fa]"
                style={{ fontFamily: "Outfit,sans-serif" }}
              >
                AcadAlert
              </p>
              <p className="text-[0.65rem] text-[#5c6385]">
                Academic Report Portal
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <span className="inline-flex items-center gap-1 px-[0.65rem] py-[0.2rem] rounded-full text-[0.68rem] font-semibold bg-[rgba(16,185,129,0.15)] text-[#34d399] border border-[rgba(16,185,129,0.25)]">
              <CheckCircle size={9} /> Secure Link
            </span>
            <button className="inline-flex items-center gap-2 px-4 py-[0.55rem] rounded-xl text-[#9ba2c0] text-[0.82rem] bg-[#1e2132] border border-[#2e3354] hover:border-[#6366f1] hover:text-[#f0f1fa] transition-all cursor-pointer">
              <Download size={13} /> Download PDF
            </button>
          </div>
        </div>

        {/* Student Banner */}
        <div
          className="border border-[rgba(99,102,241,0.2)] rounded-2xl p-6 mb-5 flex flex-wrap gap-4 items-center"
          style={{
            background:
              "linear-gradient(135deg,rgba(99,102,241,0.15),rgba(6,182,212,0.08))",
          }}
        >
          <div
            className="w-16 h-16 rounded-[18px] shrink-0 flex items-center justify-center text-[1.8rem] font-extrabold text-white shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
            style={{ background: avatarGrad }}
          >
            {student.fullName[0]}
          </div>
          <div className="flex-1">
            <h1
              className="text-[1.5rem] font-extrabold text-[#f0f1fa] mb-2"
              style={{ fontFamily: "Outfit,sans-serif" }}
            >
              {student.fullName}
            </h1>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-[0.6rem] py-[0.2rem] bg-[#1e2132] border border-[#252840] rounded-md text-[0.75rem] text-[#9ba2c0]">
                <User size={11} /> URN: {student.urn}
              </span>
              <span className="inline-flex items-center px-[0.65rem] py-[0.2rem] rounded-full text-[0.72rem] font-semibold bg-[rgba(99,102,241,0.15)] text-[#818cf8] border border-[rgba(99,102,241,0.25)]">
                {student.course}
              </span>
              {student.branch && (
                <span className="inline-flex items-center px-[0.6rem] py-[0.2rem] bg-[#1e2132] border border-[#252840] rounded-md text-[0.75rem] text-[#9ba2c0]">
                  {student.branch}
                </span>
              )}
              <span className="inline-flex items-center gap-1 px-[0.6rem] py-[0.2rem] bg-[#1e2132] border border-[#252840] rounded-md text-[0.75rem] text-[#9ba2c0]">
                <Calendar size={11} /> {student.admissionYear} –{" "}
                {student.graduationYear}
              </span>
            </div>
          </div>
          {totalDetained > 0 ? (
            <div className="bg-[rgba(239,68,68,0.12)] border border-[rgba(239,68,68,0.25)] rounded-xl px-4 py-3 text-center">
              <AlertTriangle
                size={20}
                color="#ef4444"
                className="mx-auto mb-1"
              />
              <p className="text-[0.75rem] text-[#f87171] font-semibold">
                {totalDetained} Subject{totalDetained > 1 ? "s" : ""} Detained
              </p>
            </div>
          ) : (
            <div className="bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)] rounded-xl px-4 py-3 text-center">
              <CheckCircle size={20} color="#10b981" className="mx-auto mb-1" />
              <p className="text-[0.75rem] text-[#34d399] font-semibold">
                All Clear
              </p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 mb-5">
          {[
            {
              label: "Semesters Completed",
              val: student.semesters.length,
              color: "#818cf8",
            },
            { label: "Current Avg SGPA", val: avgSGPA, color: "#22d3ee" },
            {
              label: "Latest SGPA",
              val: lastSem?.sgpa ?? "—",
              color: "#34d399",
            },
            {
              label: "Last Attendance",
              val: lastSem?.attendance ? `${lastSem.attendance}%` : "—",
              color: lastSem?.attendance >= 75 ? "#34d399" : "#f87171",
            },
            { label: "CGPA", val: student.cgpa ?? "Pending", color: "#fbbf24" },
          ].map((c) => (
            <div
              key={c.label}
              className="bg-[#13162b] border border-[#252840] rounded-xl p-4 text-center"
            >
              <p
                className="text-[1.5rem] font-extrabold"
                style={{ color: c.color, fontFamily: "Outfit,sans-serif" }}
              >
                {c.val}
              </p>
              <p className="text-[0.67rem] text-[#5c6385] mt-[3px]">
                {c.label}
              </p>
            </div>
          ))}
        </div>

        {/* Chart */}
        {chartData.length > 1 && (
          <div className="bg-[#13162b] border border-[#252840] rounded-2xl p-6 mb-5">
            <p className="text-[0.73rem] text-[#5c6385] font-semibold uppercase tracking-widest mb-1">
              Performance Trend
            </p>
            <h3 className="text-[0.95rem] font-bold text-[#f0f1fa] mb-4">
              SGPA across Semesters
            </h3>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#252840" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#5c6385", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 10]}
                  tick={{ fill: "#5c6385", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<TT />} />
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
        <p className="text-[0.73rem] text-[#5c6385] font-semibold uppercase tracking-widest mb-3">
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
              className="bg-[#13162b] border border-[#252840] rounded-2xl overflow-hidden mb-4 transition-all hover:border-[#6366f1]"
            >
              <div
                className="px-6 py-4 flex items-center justify-between border-b border-[#252840] cursor-pointer"
                onClick={() => setOpenSem(isOpen ? null : sem._id)}
              >
                <div className="flex items-center gap-4">
                  {sem.attendance && <AttRing value={sem.attendance} />}
                  <div>
                    <p className="text-[0.92rem] font-bold text-[#f0f1fa]">
                      Semester {sem.semesterNumber}
                    </p>
                    <p className="text-[0.7rem] text-[#5c6385]">
                      {sem.subjects.length} subjects
                      {sem.attendance
                        ? ` · Attendance: ${sem.attendance}%${sem.attendance < 75 ? " ⚠️" : ""}`
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {detained > 0 && (
                    <span className="inline-flex items-center gap-1 px-2 py-[0.15rem] rounded-full text-[0.68rem] font-semibold bg-[rgba(239,68,68,0.15)] text-[#f87171] border border-[rgba(239,68,68,0.25)]">
                      <AlertTriangle size={9} /> {detained} detained
                    </span>
                  )}
                  <span
                    className={`inline-flex items-center px-3 py-[0.3rem] rounded-lg font-bold text-[0.85rem] ${sgpaPill(sem.sgpa)}`}
                  >
                    SGPA {sem.sgpa}
                  </span>
                  {isOpen ? (
                    <ChevronUp size={16} className="text-[#5c6385]" />
                  ) : (
                    <ChevronDown size={16} className="text-[#5c6385]" />
                  )}
                </div>
              </div>
              {isOpen && (
                <div className="p-4 overflow-x-auto">
                  <table
                    className="w-full"
                    style={{ borderCollapse: "separate", borderSpacing: 0 }}
                  >
                    <thead>
                      <tr>
                        {[
                          "Subject",
                          "Code",
                          "Type",
                          "Internal",
                          "External",
                          "Total",
                          "Status",
                        ].map((h) => (
                          <th
                            key={h}
                            className="bg-[#161925] text-[#5c6385] text-[0.7rem] font-semibold tracking-widest uppercase px-3 py-3 text-left border-b border-[#252840]"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sem.subjects.map((sub) => (
                        <tr
                          key={sub._id}
                          className="border-b border-[#252840] hover:bg-[#1e2132] transition-colors"
                        >
                          <td className="px-3 py-3 text-[#f0f1fa] text-[0.82rem]">
                            {sub.subjectTitle}
                          </td>
                          <td className="px-3 py-3 font-mono text-[#22d3ee] text-[0.76rem]">
                            {sub.subjectCode}
                          </td>
                          <td className="px-3 py-3">
                            <span
                              className={`inline-flex px-[0.65rem] py-[0.2rem] rounded-full text-[0.7rem] font-semibold ${sub.type === "T" ? "bg-[rgba(6,182,212,0.15)] text-[#22d3ee] border border-[rgba(6,182,212,0.25)]" : "bg-[rgba(245,158,11,0.15)] text-[#fbbf24] border border-[rgba(245,158,11,0.25)]"}`}
                            >
                              {sub.type === "T" ? "Theory" : "Practical"}
                            </span>
                          </td>
                          <td
                            className="px-3 py-3 font-semibold"
                            style={{
                              color: sub.internalDetained
                                ? "#f87171"
                                : "#9ba2c0",
                            }}
                          >
                            {sub.internalMarks}
                            {sub.internalDetained ? " ⚠" : ""}
                          </td>
                          <td
                            className="px-3 py-3 font-semibold"
                            style={{
                              color: sub.externalDetained
                                ? "#f87171"
                                : "#9ba2c0",
                            }}
                          >
                            {sub.externalMarks}
                            {sub.externalDetained ? " ⚠" : ""}
                          </td>
                          <td className="px-3 py-3 font-bold text-[#f0f1fa]">
                            {sub.totalMarks}
                          </td>
                          <td className="px-3 py-3">
                            <span
                              className={`inline-flex items-center gap-1 px-[0.65rem] py-[0.2rem] rounded-full text-[0.7rem] font-semibold ${sub.status === "Pass" ? "bg-[rgba(16,185,129,0.15)] text-[#34d399] border border-[rgba(16,185,129,0.25)]" : "bg-[rgba(239,68,68,0.15)] text-[#f87171] border border-[rgba(239,68,68,0.25)]"}`}
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
              )}
            </div>
          );
        })}

        <div className="text-center pt-4 mt-4 border-t border-[#252840]">
          <p className="text-[0.72rem] text-[#5c6385]">
            🔒 This link expires in 24 hours · Academic Status Transparency
            Notification System · Group 14
          </p>
        </div>
      </div>
    </div>
  );
}
