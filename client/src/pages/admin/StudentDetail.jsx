import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Send,
  Download,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  Eye,
  ChevronUp,
  BookOpen,
  Loader2,
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

const sgpaColor = (s) =>
  s >= 9 ? "#34d399" : s >= 8 ? "#818cf8" : s >= 7 ? "#fbbf24" : "#f87171";

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

/* ─── Loading Skeleton ─────────────────────────────────────────── */
const DetailSkeleton = () => (
  <div className="fade-in animate-pulse">
    <div className="h-8 w-36 bg-[#252840] rounded-lg mb-5" />
    <div className="bg-[#13162b] border border-[#252840] rounded-2xl p-6 mb-5">
      <div className="flex gap-6 items-start">
        <div className="w-16 h-16 rounded-[16px] bg-[#252840]" />
        <div className="flex-1">
          <div className="h-6 w-48 bg-[#252840] rounded mb-3" />
          <div className="flex gap-2">
            <div className="h-5 w-20 bg-[#1e2132] rounded" />
            <div className="h-5 w-20 bg-[#1e2132] rounded" />
            <div className="h-5 w-16 bg-[#1e2132] rounded" />
          </div>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-5 gap-3 mb-5">
      {[1, 2, 3, 4, 5].map((n) => (
        <div
          key={n}
          className="bg-[#161925] border border-[#252840] rounded-xl p-4 h-20"
        />
      ))}
    </div>
  </div>
);

export default function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSem, setOpenSem] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get(`${API_URL}/students/${id}`, {
          withCredentials: true,
        });
        if (!data.success) throw new Error(data.message || "Student not found");
        setStudent(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  if (loading) return <DetailSkeleton />;

  if (error || !student)
    return (
      <div className="fade-in text-center py-16">
        <div className="w-16 h-16 rounded-2xl bg-[rgba(239,68,68,0.15)] flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={28} className="text-[#f87171]" />
        </div>
        <p className="text-[#f87171] text-lg font-bold mb-1">
          {error || "Student not found"}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-5 py-[0.6rem] rounded-xl text-[#9ba2c0] text-sm bg-[#1e2132] border border-[#2e3354] hover:border-[#6366f1] transition-all cursor-pointer mt-4"
        >
          <ArrowLeft size={14} /> Go Back
        </button>
      </div>
    );

  const avatarGrad = `linear-gradient(135deg, hsl(${(student.urn * 47) % 360},60%,38%), hsl(${(student.urn * 47 + 40) % 360},65%,32%))`;
  const chartData = student.semesters.map((s) => ({
    name: `Sem ${s.semesterNumber}`,
    SGPA: s.sgpa,
  }));
  const totalDetained = student.semesters
    .flatMap((s) => s.subjects)
    .filter((s) => s.status === "Detained").length;
  const avgSGPA = student.semesters.length
    ? (
        student.semesters.reduce((a, s) => a + s.sgpa, 0) /
        student.semesters.length
      ).toFixed(2)
    : "—";

  const handleViewAsGuardian = async () => {
    try {
      const { data } = await axios.post(
        `${API_URL}/tokens`,
        {
          studentIds: [student._id],
          sentVia: "Email",
          semester: student.semesters.length,
          expiry: "24 hours",
        },
        { withCredentials: true },
      );
      if (data.success && data.data?.[0]?.token) {
        window.open(`/guardian?token=${data.data[0].token}`, "_blank");
      }
    } catch (err) {
      console.error("Failed to generate preview token:", err);
    }
  };

  return (
    <div className="fade-in">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-lg text-[0.8rem] text-[#9ba2c0] border border-[#252840] bg-transparent hover:border-[#6366f1] hover:text-[#818cf8] transition-all cursor-pointer"
      >
        <ArrowLeft size={14} /> Back to Students
      </button>

      {/* Header */}
      <div className="bg-[#13162b] border border-[#252840] rounded-2xl p-6 mb-5 flex flex-wrap gap-6 items-start hover:border-[#2e3354] transition-colors">
        <div
          className="w-16 h-16 rounded-[16px] shrink-0 flex items-center justify-center text-[1.6rem] font-extrabold text-white shadow-[0_6px_20px_rgba(0,0,0,0.4)]"
          style={{ background: avatarGrad }}
        >
          {student.fullName[0]}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 items-center mb-2">
            <h2
              className="text-[1.3rem] font-extrabold text-[#f0f1fa]"
              style={{ fontFamily: "Outfit,sans-serif" }}
            >
              {student.fullName}
            </h2>
            {totalDetained > 0 ? (
              <span className="inline-flex items-center gap-1 px-[0.65rem] py-[0.2rem] rounded-full text-[0.72rem] font-semibold bg-[rgba(239,68,68,0.15)] text-[#f87171] border border-[rgba(239,68,68,0.25)]">
                <AlertTriangle size={10} /> {totalDetained} Detained
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-[0.65rem] py-[0.2rem] rounded-full text-[0.72rem] font-semibold bg-[rgba(16,185,129,0.15)] text-[#34d399] border border-[rgba(16,185,129,0.25)]">
                <CheckCircle size={10} /> All Clear
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-[0.6rem] py-[0.2rem] bg-[#161925] border border-[#252840] rounded-md text-[0.75rem] text-[#9ba2c0]">
              URN: {student.urn}
            </span>
            <span className="inline-flex items-center px-[0.6rem] py-[0.2rem] bg-[#161925] border border-[#252840] rounded-md text-[0.75rem] text-[#9ba2c0]">
              CRN: {student.crn}
            </span>
            <span className="inline-flex items-center px-[0.65rem] py-[0.2rem] rounded-full text-[0.72rem] font-semibold bg-[rgba(99,102,241,0.15)] text-[#818cf8] border border-[rgba(99,102,241,0.25)]">
              {student.course}
            </span>
            {student.branch && (
              <span className="inline-flex items-center px-[0.6rem] py-[0.2rem] bg-[#161925] border border-[#252840] rounded-md text-[0.75rem] text-[#9ba2c0]">
                {student.branch}
              </span>
            )}
            <span className="inline-flex items-center px-[0.6rem] py-[0.2rem] bg-[#161925] border border-[#252840] rounded-md text-[0.72rem] text-[#9ba2c0]">
              🎓 {student.admissionYear} — {student.graduationYear}
            </span>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handleViewAsGuardian}
            className="inline-flex items-center gap-2 px-4 py-[0.55rem] rounded-xl text-[#22d3ee] text-sm font-semibold bg-[rgba(6,182,212,0.1)] border border-[rgba(6,182,212,0.25)] hover:bg-[rgba(6,182,212,0.18)] hover:-translate-y-px transition-all cursor-pointer"
          >
            <Eye size={14} /> View as Guardian
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-[0.55rem] rounded-xl text-white text-sm font-semibold bg-linear-to-br from-[#6366f1] to-[#4f46e5] shadow-[0_4px_14px_rgba(99,102,241,0.25)] hover:-translate-y-px transition-all cursor-pointer">
            <Send size={14} /> Send Link
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-3 mb-5">
        {[
          {
            label: "Semesters",
            val: student.semesters.length,
            color: "#818cf8",
          },
          { label: "Avg SGPA", val: avgSGPA, color: "#22d3ee" },
          {
            label: "CGPA",
            val: student.cgpa ?? "In Progress",
            color: "#fbbf24",
          },
          {
            label: "Detained Subjects",
            val: totalDetained,
            color: totalDetained > 0 ? "#f87171" : "#34d399",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-[#161925] border border-[#252840] rounded-xl p-4 text-center"
          >
            <p
              className="text-[1.4rem] font-extrabold"
              style={{ color: s.color, fontFamily: "Outfit,sans-serif" }}
            >
              {s.val}
            </p>
            <p className="text-[0.68rem] text-[#5c6385] mt-[2px]">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Chart + Semesters */}
      <div className="grid grid-cols-[320px_1fr] gap-5">
        {/* Chart */}
        <div className="bg-[#13162b] border border-[#252840] rounded-2xl p-6 h-fit">
          <p className="text-[0.72rem] text-[#5c6385] font-semibold tracking-widest uppercase mb-1">
            Performance
          </p>
          <h3 className="text-[0.9rem] font-bold text-[#f0f1fa] mb-4">
            SGPA Progression
          </h3>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={170}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#252840" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#5c6385", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 10]}
                  tick={{ fill: "#5c6385", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<TT />} />
                <Line
                  type="monotone"
                  dataKey="SGPA"
                  stroke="#818cf8"
                  strokeWidth={2.5}
                  dot={{ fill: "#818cf8", r: 4, strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-[#5c6385] text-[0.8rem] text-center py-8">
              No data yet
            </p>
          )}
        </div>

        {/* Semester Accordion */}
        <div>
          <p className="text-[0.72rem] text-[#5c6385] font-semibold tracking-widest uppercase mb-3">
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
                className="bg-[#13162b] border border-[#252840] rounded-2xl overflow-hidden transition-all hover:border-[#6366f1] hover:-translate-y-0.5 mb-3"
              >
                <div
                  className="px-6 py-4 flex items-center justify-between border-b border-[#252840] cursor-pointer"
                  onClick={() => setOpenSem(isOpen ? null : sem._id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#6366f1] to-[#06b6d4] flex items-center justify-center text-[0.7rem] font-bold text-white">
                      S{sem.semesterNumber}
                    </div>
                    <div>
                      <p className="text-[0.88rem] font-bold text-[#f0f1fa]">
                        Semester {sem.semesterNumber}
                      </p>
                      <p className="text-[0.7rem] text-[#5c6385]">
                        {sem.subjects.length} subjects
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {detained > 0 && (
                      <span className="inline-flex items-center gap-1 px-2 py-[0.15rem] rounded-full text-[0.68rem] font-semibold bg-[rgba(239,68,68,0.15)] text-[#f87171] border border-[rgba(239,68,68,0.25)]">
                        <AlertTriangle size={9} /> {detained}
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
                        {sem.subjects.map((sub) => {
                          // Subject is populated with subjectTitle, subjectCode, type
                          const subjectData = sub.subject || {};
                          return (
                            <tr
                              key={sub._id}
                              className="border-b border-[#252840] hover:bg-[#1e2132] transition-colors"
                            >
                              <td className="px-3 py-3 text-[#f0f1fa] text-[0.82rem]">
                                {subjectData.subjectTitle || "—"}
                              </td>
                              <td className="px-3 py-3 font-mono text-[#22d3ee] text-[0.78rem]">
                                {subjectData.subjectCode || "—"}
                              </td>
                              <td className="px-3 py-3">
                                <span
                                  className={`inline-flex px-[0.65rem] py-[0.2rem] rounded-full text-[0.7rem] font-semibold ${subjectData.type === "T" ? "bg-[rgba(6,182,212,0.15)] text-[#22d3ee] border border-[rgba(6,182,212,0.25)]" : "bg-[rgba(245,158,11,0.15)] text-[#fbbf24] border border-[rgba(245,158,11,0.25)]"}`}
                                >
                                  {subjectData.type === "T"
                                    ? "Theory"
                                    : "Practical"}
                                </span>
                              </td>
                              <td
                                className="px-3 py-3 font-semibold text-[0.85rem]"
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
                                className="px-3 py-3 font-semibold text-[0.85rem]"
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
                                  {sub.status}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
          {student.semesters.length === 0 && (
            <div className="bg-[#13162b] border border-[#252840] rounded-2xl p-8 text-center">
              <BookOpen size={24} className="text-[#5c6385] mx-auto mb-2" />
              <p className="text-[#5c6385] text-[0.85rem]">
                No semester data available yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
