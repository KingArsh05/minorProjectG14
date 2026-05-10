// StudentDetail.jsx

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

export default function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

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

          <div className="relative w-[72px] h-[72px] rounded-full border border-[#2a3047] bg-[#1a1f33] flex items-center justify-center shadow-inner">
            <Loader2 size={34} className="animate-spin text-[#818cf8]" />
          </div>
        </div>

        <h3 className="text-white font-semibold text-[1.05rem] mb-2">
          Loading Student
        </h3>

        <p className="text-[#697292] text-sm">
          Fetching academic records and details...
        </p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center py-24 fade-in">
        <div className="w-[82px] h-[82px] rounded-[28px] border border-[#1f2638] bg-[#161b29] flex items-center justify-center mb-5">
          <AlertTriangle size={34} className="text-[#697292]" />
        </div>

        <h3 className="text-white font-semibold text-[1.05rem] mb-2">
          Student Not Found
        </h3>

        <p className="text-[#697292] text-sm mb-6">
          The student record could not be located.
        </p>

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 h-[44px] px-5 rounded-2xl border border-[#1d2335] bg-[#161b29] text-[#9ba2c0] hover:border-[#6366f1] hover:text-white transition-all"
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

  return (
    <div className="space-y-5 fade-in">
      {/* Back */}

      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 h-[44px] px-5 rounded-2xl border border-[#1d2335] bg-[#10131d] text-[#9ba2c0] hover:border-[#6366f1] hover:text-white transition-all"
      >
        <ArrowLeft size={15} />
        Back to Students
      </button>

      {/* Header Card */}

      <div className="relative overflow-hidden rounded-3xl border border-[#1d2335] bg-[#10131d] p-7 shadow-[0_15px_45px_rgba(0,0,0,0.32)]">
        <div className="absolute top-0 right-0 w-[300px] h-[200px] bg-[#6366f1]/5 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="absolute inset-0 rounded-[24px] bg-[#6366f1]/10 blur-xl" />

              <div className="relative w-20 h-20 rounded-[24px] border border-[#2a314d] bg-[#1a2033] flex items-center justify-center text-[2rem] font-bold text-white shadow-inner">
                {student.fullName?.[0]}
              </div>
            </div>

            <div>
              <h1 className="text-[1.5rem] font-bold text-white font-outfit">
                {student.fullName}
              </h1>

              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-3 py-1 rounded-full border border-[#2b3350] bg-[#1b2031] text-[#818cf8] text-[0.72rem] font-medium">
                  URN {student.urn}
                </span>

                {student.crn && (
                  <span className="px-3 py-1 rounded-full border border-[#1f2638] bg-[#161b29] text-[#8b93b2] text-[0.72rem]">
                    CRN {student.crn}
                  </span>
                )}

                <span className="px-3 py-1 rounded-full border border-[#6366f1]/20 bg-[#6366f1]/10 text-[#818cf8] text-[0.72rem] font-medium">
                  {student.course}
                </span>

                {student.branch && (
                  <span className="px-3 py-1 rounded-full border border-[#1f2638] bg-[#161b29] text-[#8b93b2] text-[0.72rem]">
                    {student.branch}
                  </span>
                )}

                {student.admissionYear && (
                  <span className="px-3 py-1 rounded-full border border-[#1f2638] bg-[#161b29] text-[#8b93b2] text-[0.72rem]">
                    🎓 {student.admissionYear} — {student.graduationYear}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button className="inline-flex items-center justify-center gap-2 h-[50px] px-6 rounded-2xl border border-[#22d3ee]/20 bg-[#22d3ee]/10 text-[#22d3ee] font-medium hover:bg-[#22d3ee]/15 transition-all shadow-[0_8px_25px_rgba(34,211,238,0.08)]">
            <Eye size={16} />
            View as Guardian
          </button>
        </div>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          {
            label: "CGPA",
            value: student.cgpa || "—",
            icon: BarChart3,
            color: "#22d3ee",
          },

          {
            label: "Avg SGPA",
            value: avgSgpa,
            icon: BarChart3,
            color: "#818cf8",
          },

          {
            label: "Semesters",
            value: student.semesters?.length || 0,
            icon: Calendar,
            color: "#fbbf24",
          },

          {
            label: "Total Subjects",
            value: totalSubjects || 0,
            icon: BookOpen,
            color: "#818cf8",
          },

          {
            label: "Detained",
            value: detainedCount || 0,
            icon: AlertTriangle,
            color: detainedCount > 0 ? "#f87171" : "#4ade80",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="group relative overflow-hidden rounded-[30px] border border-[#1d2335] bg-[#10131d] p-5 transition-all cursor-pointer hover:border-[#2d3550] hover:shadow-[0_12px_35px_rgba(99,102,241,0.06)]"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#818cf8]/30 to-transparent" />

            <div className="flex items-start justify-between mb-3">
              <p className="text-xs uppercase tracking-wider text-[#68708f] font-semibold">
                {item.label}
              </p>

              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-xl bg-[#6366f1]/10 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative flex w-10 h-10 items-center justify-center rounded-[14px] border border-[#2a3047] bg-[#181c2b] transition-all duration-300 group-hover:border-[#3b4261]">
                  <item.icon size={16} style={{ color: item.color }} />
                </div>
              </div>
            </div>

            <p
              className="text-[1.8rem] leading-none font-bold font-outfit"
              style={{ color: item.color }}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Semesters */}

      <div>
        <p className="text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-[#5e6787] mb-4 px-1">
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
                className={`rounded-3xl border bg-[#10131d] overflow-hidden transition-all ${
                  open
                    ? "border-[#6366f1]/30 shadow-[0_12px_35px_rgba(99,102,241,0.08)]"
                    : "border-[#1d2335] hover:border-[#2d3550]"
                }`}
              >
                {/* Header */}

                <div
                  onClick={() => setOpenSem(open ? null : sem._id)}
                  className="flex items-center justify-between p-5 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-[16px] border border-[#2a314d] bg-[#1a2033] flex items-center justify-center text-white font-bold text-[0.85rem] shadow-inner">
                      S{sem.semesterNumber}
                    </div>

                    <div>
                      <h2 className="text-white font-semibold text-[1rem]">
                        Semester {sem.semesterNumber}
                      </h2>

                      <p className="text-[#697292] text-[0.78rem] mt-1">
                        {sem.subjects?.length} subjects
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {detained > 0 && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.72rem] font-medium bg-[#2a1d22] border border-[#40252d] text-[#f87171]">
                        <AlertTriangle size={11} /> {detained} Detained
                      </span>
                    )}

                    <div
                      className={`px-4 py-2 rounded-2xl border text-[0.85rem] font-semibold ${
                        sem.sgpa >= 8
                          ? "border-[#1f3a2f] bg-[#15222c] text-[#4ade80]"
                          : sem.sgpa >= 7
                            ? "border-[#6366f1]/20 bg-[#6366f1]/10 text-[#818cf8]"
                            : sem.sgpa >= 6
                              ? "border-[#fbbf24]/20 bg-[#fbbf24]/10 text-[#fbbf24]"
                              : "border-[#40252d] bg-[#2a1d22] text-[#f87171]"
                      }`}
                    >
                      SGPA {sem.sgpa}
                    </div>

                    {open ? (
                      <ChevronUp size={18} className="text-[#697292]" />
                    ) : (
                      <ChevronDown size={18} className="text-[#697292]" />
                    )}
                  </div>
                </div>

                {/* Subjects Table */}

                {open && (
                  <div className="border-t border-[#1d2335] p-5 overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left">
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
                              className="pb-4 text-[#5e6787] text-[0.72rem] uppercase tracking-[0.14em] font-semibold px-3 first:pl-0"
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
                              className="border-t border-[#1d2335] hover:bg-[#161b29] transition-colors"
                            >
                              <td className="py-4 px-3 first:pl-0 text-white text-[0.88rem] font-medium">
                                {subjectData.subjectTitle || "—"}
                              </td>

                              <td className="py-4 px-3 text-[#22d3ee] text-[0.82rem] font-mono">
                                {subjectData.subjectCode || "—"}
                              </td>

                              <td className="py-4 px-3">
                                <span
                                  className={`inline-flex px-2.5 py-1 rounded-full text-[0.7rem] font-medium ${
                                    subjectData.type === "T"
                                      ? "bg-[#22d3ee]/10 text-[#22d3ee] border border-[#22d3ee]/20"
                                      : "bg-[#fbbf24]/10 text-[#fbbf24] border border-[#fbbf24]/20"
                                  }`}
                                >
                                  {subjectData.type === "T"
                                    ? "Theory"
                                    : "Practical"}
                                </span>
                              </td>

                              <td
                                className="py-4 px-3 text-[0.88rem] font-medium"
                                style={{
                                  color: sub.internalDetained
                                    ? "#f87171"
                                    : "#9ba2c0",
                                }}
                              >
                                {sub.internalMarks}
                                {sub.internalDetained && " ⚠"}
                              </td>

                              <td
                                className="py-4 px-3 text-[0.88rem] font-medium"
                                style={{
                                  color: sub.externalDetained
                                    ? "#f87171"
                                    : "#9ba2c0",
                                }}
                              >
                                {sub.externalMarks}
                                {sub.externalDetained && " ⚠"}
                              </td>

                              <td className="py-4 px-3 text-white font-bold text-[0.88rem]">
                                {sub.totalMarks}
                              </td>

                              <td className="py-4 px-3">
                                <span
                                  className={`px-3 py-1 rounded-full text-[0.72rem] font-medium border ${
                                    sub.status === "Pass"
                                      ? "bg-[#15222c] border-[#1f3a2f] text-[#4ade80]"
                                      : "bg-[#2a1d22] border-[#40252d] text-[#f87171]"
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
            <div className="rounded-3xl border border-[#1d2335] bg-[#10131d] p-10 text-center">
              <div className="w-[72px] h-[72px] rounded-[24px] border border-[#1f2638] bg-[#161b29] flex items-center justify-center mx-auto mb-5">
                <GraduationCap size={30} className="text-[#697292]" />
              </div>

              <h3 className="text-white font-semibold text-[1.05rem] mb-2">
                No Semester Data
              </h3>

              <p className="text-[#697292] text-sm">
                No academic records have been uploaded for this student yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
