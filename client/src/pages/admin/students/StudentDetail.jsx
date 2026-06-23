import { useState, useEffect } from "react";
import axios from "axios";
import {
  ArrowLeft,
  Eye,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  BookOpen,
  BarChart3,
  Calendar,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";

export default function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openSem, setOpenSem] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/students/${id}`, {
          withCredentials: true,
        });

        if (data.success) {
          setStudent(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [API_URL, id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 min-h-[60vh] fade-in">
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-[#6366f1]/10 blur-2xl" />
          <div className={`relative w-[72px] h-[72px] rounded-full border flex items-center justify-center shadow-inner ${
            darkMode ? "border-[#2a3047] bg-[#1a1f33]" : "border-slate-200 bg-slate-50"
          }`}>
            <Loader2 size={34} className="animate-spin text-[#818cf8]" />
          </div>
        </div>

        <h3 className={`font-semibold text-[1.05rem] mb-2 ${darkMode ? "text-white" : "text-slate-800"}`}>
          Loading Student
        </h3>
        <p className={`text-sm ${darkMode ? "text-[#697292]" : "text-slate-400"}`}>
          Fetching academic records and details...
        </p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center py-24 fade-in">
        <div className={`w-[82px] h-[82px] rounded-[28px] border flex items-center justify-center mb-5 ${
          darkMode ? "border-[#1f2638] bg-[#161b29]" : "border-slate-200 bg-slate-50"
        }`}>
          <AlertTriangle size={34} className="text-[#697292]" />
        </div>

        <h3 className={`font-semibold text-[1.05rem] mb-2 ${darkMode ? "text-white" : "text-slate-800"}`}>
          Student Not Found
        </h3>
        <p className={`text-sm mb-6 ${darkMode ? "text-[#697292]" : "text-slate-400"}`}>
          The student record could not be located.
        </p>

        <button
          onClick={() => navigate(-1)}
          className={`inline-flex items-center gap-2 h-[44px] px-5 rounded-2xl border transition-all cursor-pointer ${
            darkMode 
              ? "border-[#1d2335] bg-[#161b29] text-[#9ba2c0] hover:border-[#6366f1] hover:text-white" 
              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-sm"
          }`}
        >
          <ArrowLeft size={15} />
          Go Back
        </button>
      </div>
    );
  }

  const avgSgpa = student.semesters?.length
    ? (
        student.semesters.reduce((a, s) => a + s.sgpa, 0) /
        student.semesters.length
      ).toFixed(2)
    : "—";

  const totalSubjects = student.semesters?.reduce(
    (acc, s) => acc + (s.subjects?.length || 0),
    0,
  );

  const detainedCount = student.semesters
    ?.flatMap((s) => s.subjects || [])
    .filter((s) => s.status === "Detained").length;

  const handleViewAsGuardian = async () => {
    try {
      const { data } = await axios.post(
        `${API_URL}/tokens/preview`,
        { studentId: student._id },
        { withCredentials: true }
      );
      if (data.success) {
        window.open(`/guardian?token=${data.data.token}`, "_blank");
      }
    } catch (err) {
      console.error("Failed to generate preview token", err);
      alert("Failed to open guardian preview");
    }
  };

  return (
    <div className="space-y-5 fade-in text-slate-800 dark:text-white">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className={`inline-flex items-center gap-2 h-[44px] px-5 rounded-2xl border transition-all cursor-pointer ${
          darkMode 
            ? "border-[#1d2335] bg-[#10131d] text-[#9ba2c0] hover:border-[#6366f1] hover:text-white" 
            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-sm"
        }`}
      >
        <ArrowLeft size={15} />
        Back to Students
      </button>

      {/* Header Card */}
      <div className={`relative overflow-hidden rounded-3xl border p-6 md:p-7 shadow-sm ${
        darkMode ? "border-[#1d2335] bg-[#10131d]" : "border-indigo-100 bg-white"
      }`}>
        <div className="absolute top-0 right-0 w-[300px] h-[200px] bg-[#6366f1]/5 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-[24px] bg-[#6366f1]/10 blur-xl" />
              <div className={`relative w-20 h-20 rounded-[24px] border flex items-center justify-center text-[2rem] font-bold shadow-inner ${
                darkMode ? "border-[#2a314d] bg-[#1a2033] text-white" : "border-slate-200 bg-slate-100 text-slate-800"
              }`}>
                {student.fullName?.[0]}
              </div>
            </div>

            <div>
              <h1 className={`text-[1.5rem] font-bold font-outfit ${darkMode ? "text-white" : "text-slate-800"}`}>
                {student.fullName}
              </h1>

              <div className="flex flex-wrap gap-2 mt-3">
                <span className={`px-3 py-1 rounded-full border text-[0.72rem] font-medium transition-all ${
                  darkMode ? "border-[#2b3350] bg-[#1b2031] text-[#818cf8]" : "border-indigo-50 bg-indigo-50 text-indigo-600"
                }`}>
                  URN {student.urn}
                </span>

                {student.crn && (
                  <span className={`px-3 py-1 rounded-full border text-[0.72rem] transition-all ${
                    darkMode ? "border-[#1f2638] bg-[#161b29] text-[#8b93b2]" : "border-slate-200 bg-slate-50 text-slate-500"
                  }`}>
                    CRN {student.crn}
                  </span>
                )}

                <span className={`px-3 py-1 rounded-full border text-[0.72rem] font-semibold transition-all ${
                  darkMode ? "border-[#6366f1]/20 bg-[#6366f1]/10 text-[#818cf8]" : "border-cyan-100 bg-cyan-50 text-cyan-600"
                }`}>
                  {student.course}
                </span>

                {student.branch && (
                  <span className={`px-3 py-1 rounded-full border text-[0.72rem] transition-all ${
                    darkMode ? "border-[#1f2638] bg-[#161b29] text-[#8b93b2]" : "border-slate-200 bg-slate-50 text-slate-500"
                  }`}>
                    {student.branch}
                  </span>
                )}

                {student.admissionYear && (
                  <span className={`px-3 py-1 rounded-full border text-[0.72rem] transition-all ${
                    darkMode ? "border-[#1f2638] bg-[#161b29] text-[#8b93b2]" : "border-slate-200 bg-slate-50 text-slate-500"
                  }`}>
                    🎓 {student.admissionYear} — {student.graduationYear}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button 
            onClick={handleViewAsGuardian} 
            className="inline-flex items-center justify-center gap-2 h-[50px] px-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-500 font-semibold hover:bg-cyan-500/15 transition-all shadow-[0_8px_25px_rgba(34,211,238,0.08)] cursor-pointer"
          >
            <Eye size={16} />
            View as Guardian
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          {
            label: "CGPA",
            value: student.cgpa || "—",
            icon: BarChart3,
            color: "#22d3ee",
            accentClass: "text-[#22d3ee] dark:text-cyan-400",
          },
          {
            label: "Avg SGPA",
            value: avgSgpa,
            icon: BarChart3,
            color: "#818cf8",
            accentClass: "text-[#818cf8] dark:text-indigo-400",
          },
          {
            label: "Semesters",
            value: student.semesters?.length || 0,
            icon: Calendar,
            color: "#fbbf24",
            accentClass: "text-amber-500 dark:text-amber-400",
          },
          {
            label: "Total Subjects",
            value: totalSubjects || 0,
            icon: BookOpen,
            color: "#818cf8",
            accentClass: "text-indigo-500 dark:text-indigo-400",
          },
          {
            label: "Detained",
            value: detainedCount || 0,
            icon: AlertTriangle,
            color: detainedCount > 0 ? "#f87171" : "#4ade80",
            accentClass: detainedCount > 0 ? "text-red-500 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400",
          },
        ].map((item) => (
          <div
            key={item.label}
            className={`group relative overflow-hidden rounded-[30px] border p-5 cursor-pointer ${
              darkMode 
                ? "border-[#1d2335] bg-[#10131d] hover:border-[#2d3550] hover:shadow-[0_12px_35px_rgba(99,102,241,0.06)]" 
                : "border-indigo-50 bg-white hover:border-indigo-100 hover:shadow-[0_8px_30px_rgba(99,102,241,0.04)] shadow-sm"
            }`}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#818cf8]/30 to-transparent" />

            <div className="flex items-start justify-between mb-3">
              <p className={`text-xs uppercase tracking-wider font-bold ${darkMode ? "text-[#68708f]" : "text-slate-400"}`}>
                {item.label}
              </p>

              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-xl bg-[#6366f1]/10 blur-xl opacity-0 group-hover:opacity-100" />
                <div className={`relative flex w-10 h-10 items-center justify-center rounded-[14px] border ${
                  darkMode 
                    ? "border-[#2a3047] bg-[#181c2b] group-hover:border-[#3b4261]" 
                    : "border-slate-200 bg-slate-50 group-hover:border-slate-300"
                }`}>
                  <item.icon size={16} style={{ color: item.color }} />
                </div>
              </div>
            </div>

            <p className={`text-[1.8rem] leading-none font-extrabold font-outfit ${item.accentClass}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Semesters */}
      <div>
        <p className={`text-[0.72rem] font-bold tracking-[0.18em] uppercase mb-4 px-1 ${
          darkMode ? "text-[#5e6787]" : "text-slate-400"
        }`}>
          Semester Records
        </p>

        <div className="space-y-3">
          {student.semesters?.map((sem) => {
            const open = openSem === sem._id;
            const detained = (sem.subjects || []).filter(
              (s) => s.status === "Detained",
            ).length;

            return (
              <div
                key={sem._id}
                className={`rounded-3xl border overflow-hidden ${
                  open
                    ? darkMode
                      ? "border-[#6366f1]/30 bg-[#10131d] shadow-[0_12px_35px_rgba(99,102,241,0.08)]"
                      : "border-indigo-200 bg-white shadow-sm"
                    : darkMode
                      ? "border-[#1d2335] bg-[#10131d] hover:border-[#2d3550]"
                      : "border-indigo-50 bg-white/70 hover:border-indigo-100 shadow-sm"
                }`}
              >
                {/* Header */}
                <div
                  onClick={() => setOpenSem(open ? null : sem._id)}
                  className="flex items-center justify-between p-4 md:p-5 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-[16px] border flex items-center justify-center font-bold text-[0.85rem] shadow-inner ${
                      darkMode ? "border-[#2a314d] bg-[#1a2033] text-white" : "border-slate-200 bg-slate-100 text-slate-800"
                    }`}>
                      S{sem.semesterNumber}
                    </div>

                    <div>
                      <h2 className={`font-bold text-[1rem] ${darkMode ? "text-white" : "text-slate-800"}`}>
                        Semester {sem.semesterNumber}
                      </h2>

                      <p className={`text-xs mt-1 ${darkMode ? "text-[#697292]" : "text-slate-400"}`}>
                        {sem.subjects?.length} subjects
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {detained > 0 && (
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.72rem] font-semibold border ${
                        darkMode
                          ? "bg-[#2a1d22] border-[#40252d] text-[#f87171]"
                          : "bg-red-50 border-red-100 text-red-600"
                      }`}>
                        <AlertTriangle size={11} /> {detained} Detained
                      </span>
                    )}

                    <div
                      className={`px-4 py-2 rounded-2xl border text-[0.85rem] font-bold ${
                        sem.sgpa >= 8
                          ? darkMode
                            ? "border-[#1f3a2f] bg-[#15222c] text-[#4ade80]"
                            : "border-emerald-200 bg-emerald-50 text-emerald-600"
                          : sem.sgpa >= 7
                            ? darkMode
                              ? "border-[#6366f1]/20 bg-[#6366f1]/10 text-[#818cf8]"
                              : "border-indigo-100 bg-indigo-50 text-indigo-600"
                            : sem.sgpa >= 6
                              ? darkMode
                                ? "border-[#fbbf24]/20 bg-[#fbbf24]/10 text-[#fbbf24]"
                                : "border-amber-200 bg-amber-50 text-amber-600"
                              : darkMode
                                ? "border-[#40252d] bg-[#2a1d22] text-[#f87171]"
                                : "border-red-100 bg-red-50 text-red-600"
                      }`}
                    >
                      SGPA {sem.sgpa}
                    </div>

                    {open ? (
                      <ChevronUp size={18} className={darkMode ? "text-[#697292]" : "text-slate-400"} />
                    ) : (
                      <ChevronDown size={18} className={darkMode ? "text-[#697292]" : "text-slate-400"} />
                    )}
                  </div>
                </div>

                {/* Subjects Table */}
                {open && (
                  <div className={`border-t p-4 md:p-5 overflow-x-auto ${darkMode ? "border-[#1d2335]" : "border-indigo-50 bg-slate-50/20"}`}>
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b border-dashed border-slate-200 dark:border-slate-800">
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
                              className={`pb-4 text-[0.72rem] uppercase tracking-[0.14em] font-bold px-3 first:pl-0 ${
                                darkMode ? "text-[#5e6787]" : "text-slate-400"
                              }`}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {sem.subjects?.map((sub) => {
                          const subjectData = sub.subject || {};

                          return (
                            <tr
                              key={sub._id}
                              className={`border-t last:border-none transition-colors ${
                                darkMode ? "border-[#1d2335] hover:bg-[#161b29]" : "border-indigo-50/50 hover:bg-slate-50"
                              }`}
                            >
                              <td className={`py-4 px-3 first:pl-0 text-[0.88rem] font-bold ${
                                darkMode ? "text-white" : "text-slate-800"
                              }`}>
                                {subjectData.subjectTitle || "—"}
                              </td>

                              <td className="py-4 px-3 text-[#22d3ee] dark:text-cyan-500 text-[0.82rem] font-mono font-semibold">
                                {subjectData.subjectCode || "—"}
                              </td>

                              <td className="py-4 px-3">
                                <span
                                  className={`inline-flex px-2.5 py-1 rounded-full text-[0.7rem] font-semibold ${
                                    subjectData.type === "T"
                                      ? "bg-[#22d3ee]/10 text-[#22d3ee] border border-[#22d3ee]/20 dark:bg-cyan-500/10 dark:text-cyan-400"
                                      : "bg-[#fbbf24]/10 text-[#fbbf24] border border-[#fbbf24]/20 dark:bg-amber-500/10 dark:text-amber-400"
                                  }`}
                                >
                                  {subjectData.type === "T"
                                    ? "Theory"
                                    : "Practical"}
                                </span>
                              </td>

                              <td
                                className="py-4 px-3 text-[0.88rem] font-semibold"
                                style={{
                                  color: sub.internalDetained
                                    ? "#f87171"
                                    : darkMode ? "#9ba2c0" : "#475569",
                                }}
                              >
                                {sub.internalMarks}
                                {sub.internalDetained && " ⚠"}
                              </td>

                              <td
                                className="py-4 px-3 text-[0.88rem] font-semibold"
                                style={{
                                  color: sub.externalDetained
                                    ? "#f87171"
                                    : darkMode ? "#9ba2c0" : "#475569",
                                }}
                              >
                                {sub.externalMarks}
                                {sub.externalDetained && " ⚠"}
                              </td>

                              <td className={`py-4 px-3 font-extrabold text-[0.88rem] ${
                                darkMode ? "text-white" : "text-slate-800"
                              }`}>
                                {sub.totalMarks}
                              </td>

                              <td className="py-4 px-3">
                                <span
                                  className={`px-3 py-1 rounded-full text-[0.72rem] font-semibold border ${
                                    sub.status === "Pass"
                                      ? darkMode
                                        ? "bg-[#15222c] border-[#1f3a2f] text-[#4ade80]"
                                        : "bg-emerald-50 border-emerald-200 text-emerald-600"
                                      : darkMode
                                        ? "bg-[#2a1d22] border-[#40252d] text-[#f87171]"
                                        : "bg-red-50 border-red-200 text-red-600"
                                  }`}
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

          {(!student.semesters || student.semesters.length === 0) && (
            <div className={`rounded-3xl border p-10 text-center ${
              darkMode ? "border-[#1d2335] bg-[#10131d]" : "border-indigo-100 bg-white"
            }`}>
              <div className={`w-[72px] h-[72px] rounded-[24px] border flex items-center justify-center mx-auto mb-5 ${
                darkMode ? "border-[#1f2638] bg-[#161b29]" : "border-slate-200 bg-slate-50"
              }`}>
                <GraduationCap size={30} className="text-[#697292]" />
              </div>

              <h3 className={`font-semibold text-[1.05rem] mb-2 ${darkMode ? "text-white" : "text-slate-800"}`}>
                No Semester Data
              </h3>

              <p className={`text-sm ${darkMode ? "text-[#697292]" : "text-slate-400"}`}>
                No academic records have been uploaded for this student yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
