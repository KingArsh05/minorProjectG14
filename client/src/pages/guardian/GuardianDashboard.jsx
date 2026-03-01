import { useState, useEffect } from "react";
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
  BookOpen,
  Activity,
  Award,
  Loader2,
  ShieldAlert,
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

const sgpaPill = (s) => {
  if (s >= 9)
    return "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30";
  if (s >= 8)
    return "bg-indigo-500/15 text-indigo-400 border border-indigo-500/30";
  if (s >= 7)
    return "bg-amber-500/15 text-amber-400 border border-amber-500/30";
  return "bg-rose-500/15 text-rose-400 border border-rose-500/30";
};

const TT = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1e2132]/95 backdrop-blur-md border border-[#2e3354] rounded-xl px-4 py-3 shadow-xl">
      <p className="text-[#9ba2c0] text-xs font-medium mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
        <p className="text-white font-bold text-sm">
          SGPA: {payload[0]?.value}
        </p>
      </div>
    </div>
  );
};

export default function GuardianDashboard() {
  const [params] = useSearchParams();
  const token = params.get("token");

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSem, setOpenSem] = useState(null);
  const [defaultSemSet, setDefaultSemSet] = useState(false);

  useEffect(() => {
    const validate = async () => {
      if (!token) {
        setError(
          "No access token provided. Please use the link sent by your institution.",
        );
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(
          `/api/tokens/validate?token=${encodeURIComponent(token)}`,
        );
        const json = await res.json();
        if (!res.ok) throw new Error(json.message || "Invalid token");
        setStudent(json.data);
      } catch (err) {
        setError(err.message);
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
    return (
      <div className="min-h-screen bg-[#07080f] flex items-center justify-center">
        <div className="text-center">
          <Loader2
            size={36}
            className="animate-spin text-indigo-400 mx-auto mb-4"
          />
          <p className="text-[#9ba2c0] text-sm">Validating your access link…</p>
        </div>
      </div>
    );
  }

  if (error || !student)
    return (
      <div className="min-h-screen bg-[#0a0b14] flex items-center justify-center p-6 font-['Inter']">
        <div className="text-center bg-[#13162b] p-10 rounded-3xl border border-[#252840] max-w-md w-full shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-rose-500/10 border-2 border-rose-500/50 flex items-center justify-center mx-auto mb-6">
            {error?.includes("expired") ? (
              <ShieldAlert size={36} className="text-rose-500" />
            ) : (
              <AlertTriangle size={36} className="text-rose-500" />
            )}
          </div>
          <h1 className="text-2xl font-black text-white mb-3 font-['Outfit'] tracking-tight">
            {error?.includes("expired")
              ? "Link Expired"
              : "Invalid Access Link"}
          </h1>
          <p className="text-[#9ba2c0] text-sm leading-relaxed">
            {error ||
              "This academic report link is invalid. Please contact the administration for a new access token."}
          </p>
        </div>
      </div>
    );

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

  return (
    <div className="min-h-screen bg-[#07080f] text-slate-300 font-['Inter'] selection:bg-indigo-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px]" />
        {isAtRisk && (
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-rose-600/10 rounded-full blur-[100px]" />
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Navbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
              <GraduationCap size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white font-['Outfit'] tracking-tight">
                AcadAlert
              </h1>
              <p className="text-sm text-indigo-200/60 font-medium">
                Official Academic Report Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <CheckCircle size={14} className="text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400">
                Secure Guardian Link
              </span>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
          {/* Left Column: Student Identity & Crucial Alerts — STICKY */}
          <div className="xl:col-span-1 space-y-6 xl:sticky xl:top-8 xl:self-start">
            {/* Student Profile Card */}
            <div className="bg-[#111322]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl">
              <div className="flex flex-col items-center text-center">
                <div
                  className="w-24 h-24 rounded-3xl mb-5 flex items-center justify-center text-4xl font-black text-white shadow-xl shadow-black/50 border border-white/10"
                  style={{ background: avatarGrad }}
                >
                  {student.fullName[0]}
                </div>
                <h2 className="text-2xl font-black text-white font-['Outfit'] mb-1">
                  {student.fullName}
                </h2>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-lg text-xs font-medium text-[#9ba2c0] mb-4 border border-white/5">
                  <User size={12} /> URN:{" "}
                  <span className="text-white">{student.urn}</span>
                </div>

                <div className="w-full h-px bg-white/5 mb-4"></div>

                <div className="grid grid-cols-2 w-full gap-3 text-left">
                  <div className="bg-black/20 rounded-xl p-3 border border-white/5">
                    <p className="text-[10px] uppercase text-[#5c6385] font-bold mb-1 flex items-center gap-1">
                      <BookOpen size={10} /> Course
                    </p>
                    <p
                      className="text-sm font-semibold text-white truncate"
                      title={`${student.course} ${student.branch ? `- ${student.branch}` : ""}`}
                    >
                      {student.course}{" "}
                      {student.branch ? `(${student.branch})` : ""}
                    </p>
                  </div>
                  <div className="bg-black/20 rounded-xl p-3 border border-white/5">
                    <p className="text-[10px] uppercase text-[#5c6385] font-bold mb-1 flex items-center gap-1">
                      <Calendar size={10} /> Batch
                    </p>
                    <p className="text-sm font-semibold text-white">
                      {student.admissionYear} - {student.graduationYear}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Alert Widget */}
            <div
              className={`bg-[#111322]/80 backdrop-blur-xl border ${isAtRisk ? "border-rose-500/30 shadow-rose-500/10" : "border-white/5"} rounded-3xl p-6 shadow-2xl relative overflow-hidden`}
            >
              {isAtRisk && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-[50px] -mr-10 -mt-10" />
              )}

              <div className="flex items-center justify-between mb-6 relative z-10">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Activity size={18} className="text-indigo-400" /> Current
                  Academic Status
                </h3>
              </div>

              <div className="space-y-3 relative z-10">
                {totalDetained > 0 ? (
                  <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 flex gap-3">
                    <AlertTriangle
                      size={20}
                      className="text-rose-500 shrink-0 mt-0.5"
                    />
                    <div>
                      <h4 className="text-rose-400 font-bold text-sm mb-1">
                        Detention Alert
                      </h4>
                      <p className="text-rose-500/80 text-xs leading-relaxed">
                        Student is currently marked detained in{" "}
                        <strong className="text-rose-400">
                          {totalDetained} subject(s)
                        </strong>{" "}
                        across their academic record.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex gap-3 items-center">
                    <CheckCircle
                      size={20}
                      className="text-emerald-400 shrink-0"
                    />
                    <div>
                      <h4 className="text-emerald-400 font-bold text-sm">
                        Clear Record
                      </h4>
                      <p className="text-emerald-500/80 text-xs">
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
                  className="bg-[#111322]/80 backdrop-blur-md border border-white/5 rounded-3xl p-5 relative overflow-hidden group hover:border-white/20 transition-all"
                >
                  <div
                    className={`absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity ${k.color}`}
                  >
                    <k.icon
                      size={48}
                      className="-mr-4 -mt-4 transform group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <p className="text-xs uppercase text-[#5c6385] font-bold tracking-wider mb-2 relative z-10">
                    {k.label}
                  </p>
                  <p
                    className={`text-3xl font-black font-['Outfit'] mb-1 relative z-10 ${k.color}`}
                  >
                    {k.val}
                  </p>
                  <p className="text-[11px] text-[#5c6385] font-medium relative z-10">
                    {k.sub}
                  </p>
                </div>
              ))}
            </div>

            {/* Performance Trend Chart */}
            {chartData.length > 1 && (
              <div className="bg-[#111322]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Performance Trend
                    </h3>
                    <p className="text-sm text-[#5c6385]">
                      SGPA progression across semesters
                    </p>
                  </div>
                </div>
                <div className="h-[220px] w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
                      margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorSGPA"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#818cf8"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#818cf8"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.05)"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="name"
                        tick={{
                          fill: "#5c6385",
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
                          fill: "#5c6385",
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                        axisLine={false}
                        tickLine={false}
                        dx={-10}
                      />
                      <Tooltip
                        cursor={{
                          stroke: "rgba(255,255,255,0.1)",
                          strokeWidth: 1,
                          strokeDasharray: "3 3",
                        }}
                        content={<TT />}
                      />
                      <Line
                        type="monotone"
                        dataKey="SGPA"
                        stroke="#818cf8"
                        strokeWidth={3}
                        dot={{
                          fill: "#111322",
                          stroke: "#818cf8",
                          strokeWidth: 2,
                          r: 5,
                        }}
                        activeDot={{
                          r: 8,
                          fill: "#818cf8",
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
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">
                  Detailed Academic Record
                </h3>
                <span className="text-sm text-[#5c6385]">
                  Tap a semester to expand
                </span>
              </div>

              <div className="space-y-4">
                {student.semesters.map((sem) => {
                  const isOpen = openSem === sem._id;
                  const detained = sem.subjects.filter(
                    (s) => s.status === "Detained",
                  ).length;

                  return (
                    <div
                      key={sem._id}
                      className={`bg-[#111322]/80 backdrop-blur-xl border ${isOpen ? "border-indigo-500/50 shadow-lg shadow-indigo-500/5" : "border-white/5"} rounded-3xl overflow-hidden transition-all duration-300`}
                    >
                      <div
                        className="px-6 py-5 flex items-center justify-between cursor-pointer hover:bg-white/2"
                        onClick={() => setOpenSem(isOpen ? null : sem._id)}
                      >
                        <div className="flex items-center gap-5">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <p className="text-lg font-bold text-white">
                                Semester {sem.semesterNumber}
                              </p>
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${sgpaPill(sem.sgpa)}`}
                              >
                                SGPA {sem.sgpa}
                              </span>
                            </div>
                            <p className="text-xs text-[#9ba2c0] font-medium flex items-center gap-2">
                              {sem.subjects.length} Subjects Registered
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {detained > 0 && (
                            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                              <AlertTriangle size={12} /> {detained} Detained
                            </span>
                          )}
                          <div
                            className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-transform duration-300 ${isOpen ? "rotate-180 bg-indigo-500/20 text-indigo-400" : "text-[#5c6385]"}`}
                          >
                            <ChevronDown size={18} />
                          </div>
                        </div>
                      </div>

                      <div
                        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                      >
                        <div className="overflow-hidden">
                          <div className="p-4 pt-0 border-t border-white/5 bg-black/20">
                            <div className="overflow-x-auto rounded-xl border border-white/5 my-2">
                              <table className="w-full text-left whitespace-nowrap">
                                <thead>
                                  <tr className="bg-[#111322] text-[#5c6385] text-xs uppercase tracking-wider font-semibold">
                                    <th className="px-5 py-3">Subject</th>
                                    <th className="px-5 py-3 text-center">
                                      Internal
                                    </th>
                                    <th className="px-5 py-3 text-center">
                                      External
                                    </th>
                                    <th className="px-5 py-3 text-center">
                                      Total
                                    </th>
                                    <th className="px-5 py-3 text-right">
                                      Status
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                  {sem.subjects.map((sub) => {
                                    const subjectData = sub.subject || {};
                                    return (
                                      <tr
                                        key={sub._id}
                                        className="hover:bg-white/2 transition-colors group"
                                      >
                                        <td className="px-5 py-3">
                                          <div className="flex flex-col">
                                            <span className="text-white text-sm font-medium">
                                              {subjectData.subjectTitle || "—"}
                                            </span>
                                            <span className="text-[#5c6385] text-xs font-mono mt-0.5">
                                              {subjectData.subjectCode || "—"} ·{" "}
                                              {subjectData.type === "T"
                                                ? "Theory"
                                                : "Practical"}
                                            </span>
                                          </div>
                                        </td>
                                        <td className="px-5 py-3 text-center">
                                          <span
                                            className={`text-sm font-semibold ${sub.internalDetained ? "text-rose-400" : "text-[#9ba2c0]"}`}
                                          >
                                            {sub.internalMarks}
                                          </span>
                                        </td>
                                        <td className="px-5 py-3 text-center">
                                          <span
                                            className={`text-sm font-semibold ${sub.externalDetained ? "text-rose-400" : "text-[#9ba2c0]"}`}
                                          >
                                            {sub.externalMarks}
                                          </span>
                                        </td>
                                        <td className="px-5 py-3 text-center">
                                          <span className="text-sm font-bold text-white">
                                            {sub.totalMarks}
                                          </span>
                                        </td>
                                        <td className="px-5 py-3 text-right">
                                          <div className="flex justify-end">
                                            <span
                                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                                                sub.status === "Pass"
                                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                  : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
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
          <p className="text-xs text-[#5c6385] font-medium flex items-center justify-center gap-2">
            <span>🔒 Confidential Guardian Portal Link</span>
            <span>•</span>
            <span>Automatically expires based on token settings</span>
          </p>
        </div>
      </div>
    </div>
  );
}
