import { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import {
  Search,
  Send,
  CheckCircle2,
  SearchX,
  AlertTriangle,
  Loader2,
  Mail,
  BellRing,
  X,
} from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import CustomSelect from "../../../components/CustomSelect";


export default function SendNotification() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [accessLimit, setAccessLimit] = useState("1-time access");
  const [expiry, setExpiry] = useState("24 hours");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [createdTokens, setCreatedTokens] = useState([]);
  const [sendError, setSendError] = useState(null);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const timeoutRef = useRef(null);
  const { darkMode } = useTheme();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data: response } = await axios.get(`${API_URL}/students`, {
          withCredentials: true,
        });

        if (response.success) {
          setStudents(response.data || []);
        }
      } catch (err) {
        console.error("Failed to load students:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [API_URL]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setDebouncedQuery(search);
    }, 300);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [search]);

  const filteredStudents = useMemo(() => {
    if (!debouncedQuery.trim()) return students;

    return students
      .map((student) => {
        let score = 0;

        if (!isNaN(debouncedQuery)) {
          const q = debouncedQuery.trim();

          if (student.urn?.toString() === q) score += 1000;
          else if (student.urn?.toString().includes(q)) score += 50;

          if (student.crn?.toString() === q) score += 100;
          else if (student.crn?.toString().includes(q)) score += 50;
        } else {
          const q = debouncedQuery.toLowerCase();

          if (student.fullName?.toLowerCase().startsWith(q)) {
            score += 100;
          } else if (student.fullName?.toLowerCase().includes(q)) {
            score += 50;
          }
          if (student.guardianEmail?.toLowerCase().startsWith(q)) score += 80;
          else if (student.guardianEmail?.toLowerCase().includes(q)) score += 40;
        }

        return { student, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ student }) => student);
  });

  const toggle = (id) =>
    setSelected((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id],
    );

  const allFilteredSelected =
    filteredStudents.length > 0 &&
    filteredStudents.every((s) => selected.includes(s._id));

  const toggleAll = () => {
    if (allFilteredSelected) {
      setSelected((prev) =>
        prev.filter((id) => !filteredStudents.find((s) => s._id === id))
      );
    } else {
      setSelected((prev) => {
        const newSelected = new Set([
          ...prev,
          ...filteredStudents.map((s) => s._id),
        ]);
        return Array.from(newSelected);
      });
    }
  };

  const handleSend = async () => {
    setSending(true);
    setSendError(null);

    try {
      const recipients = selected.map((id) => {
        const student = students.find((s) => s._id === id);

        return {
          studentId: id,
          email: student?.guardianEmail,
        };
      });

      const { data } = await axios.post(
        `${API_URL}/mailsender/send-guardian-tokens`,
        {
          recipients,
          expiry,
          accessLimit,
        },
        {
          withCredentials: true,
        },
      );

      if (!data.success) {
        throw new Error(data.message || "Failed to send notifications");
      }

      setCreatedTokens(
        data.data.details.filter((d) => d.status === "success") || [],
      );

      setSent(true);
    } catch (err) {
      setSendError(err.message);
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="max-w-2xl w-full mx-auto mt-4 fade-in">
        <div className={`rounded-3xl border p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden relative ${
          darkMode ? "border-[#252b42] bg-[#11131f]" : "border-indigo-100 bg-white"
        }`}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[260px] h-[40vh] bg-emerald-500/10 blur-3xl pointer-events-none" />

          <div className="relative text-center">
            <div className="w-[70px] h-[70px] rounded-full border border-emerald-500/20 bg-emerald-500/10 flex items-center justify-center mx-auto mb-6 shadow-[0_15px_40px_rgba(16,185,129,0.12)]">
              <CheckCircle2 size={36} className="text-emerald-400" />
            </div>

            <h2 className={`text-[24px] font-bold font-outfit ${darkMode ? "text-white" : "text-slate-800"}`}>
              Notifications Sent
            </h2>

            <p className={`text-sm leading-relaxed w-full mx-auto mt-2 ${darkMode ? "text-[#8b93b2]" : "text-slate-500"}`}>
              Successfully generated and delivered secure guardian access links for{" "}
              <span className="text-[#818cf8] font-bold">
                {createdTokens.length}
              </span>{" "}
              student
              {createdTokens.length !== 1 ? "s" : ""}.
            </p>
          </div>

          <div className={`mt-8 rounded-3xl border p-5 max-h-[380px] overflow-y-auto custom-scrollbar ${
            darkMode ? "border-[#252b42] bg-[#141826]" : "border-indigo-50 bg-slate-50"
          }`}>
            <div className="flex flex-col gap-3">
              {createdTokens.map((t) => (
                <div
                  key={t._id}
                  className={`rounded-[22px] border p-4 ${
                    darkMode ? "border-[#252b42] bg-[#171b2a]" : "border-slate-200 bg-white shadow-xs"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-[52px] h-[52px] rounded-2xl border flex items-center justify-center font-bold shadow-sm ${
                      darkMode ? "border-[#2a314d] bg-[#1a2033] text-white" : "border-slate-200 bg-slate-100 text-slate-700"
                    }`}>
                      {t.student?.fullName?.[0] || "?"}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold text-[0.92rem] truncate ${darkMode ? "text-white" : "text-slate-800"}`}>
                        {t.student?.fullName || "Unknown"}
                      </h3>

                      <p className="text-[#22d3ee] dark:text-cyan-500 text-[0.72rem] font-mono truncate mt-1">
                        /guardian?token={t.token}
                      </p>
                    </div>

                    <div className="px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[0.72rem] font-medium shrink-0">
                      Delivered
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => {
                setSent(false);
                setSelected([]);
                setCreatedTokens([]);
              }}
              className={`h-[54px] px-6 rounded-2xl border font-medium cursor-pointer ${
                darkMode
                  ? "border-[#252b42] bg-[#171b2a] hover:bg-[#1c2133] text-[#9ba2c0] hover:text-white"
                  : "border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900"
              }`}
            >
              Send More
            </button>

            <button
              onClick={() => (window.location.href = "/admin/tokens")}
              className="h-[54px] px-6 rounded-2xl bg-[#6366f1] hover:bg-[#5855eb] text-white font-semibold shadow-[0_12px_35px_rgba(99,102,241,0.24)] cursor-pointer"
            >
              View Tokens
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full flex flex-col xl:flex-row gap-5 fade-in text-slate-800 dark:text-white">
      {/* Directory Panel */}
      <div className="w-full xl:w-[70%] h-auto">
        {/* Search */}
        <div className={`relative overflow-hidden rounded-3xl border p-2 shadow-sm mb-5 ${
          darkMode ? "border-[#252b42] bg-[#11131f]" : "border-indigo-100 bg-white"
        }`}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[260px] h-[140px] bg-[#6366f1]/10 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-center justify-center gap-3">
            <div className={`group flex-1 h-[64px] rounded-3xl border overflow-hidden w-full ${
              darkMode 
                ? "border-[#252b42] bg-[#141826] hover:border-[#353d60] focus-within:border-[#6366f1]" 
                : "border-slate-200 bg-slate-50 hover:border-slate-300 focus-within:border-[#6366f1]"
            }`}>
              <div className="flex items-center h-full px-6 gap-4">
                <div className="text-[#697292] group-focus-within:text-[#818cf8]">
                  <Search size={22} strokeWidth={2} />
                </div>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search student by name, URN, branch..."
                  className={`w-full bg-transparent outline-none border-none text-base ${
                    darkMode ? "text-white placeholder:text-[#697292]" : "text-slate-800 placeholder:text-slate-400"
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto self-stretch">
              <button
                onClick={toggleAll}
                className={`text-xs md:text-sm h-[64px] flex-1 md:flex-initial md:px-6 rounded-3xl border font-bold whitespace-nowrap text-center cursor-pointer ${
                  darkMode 
                    ? "border-[#2c3350] bg-[#1a1e2d] hover:bg-[#202538] text-[#d6dcf7]" 
                    : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-sm"
                }`}
              >
                {loading ? "Select All" : allFilteredSelected ? "Deselect All" : "Select All"}
              </button>

              <div className={`h-[64px] flex-1 md:flex-initial md:px-6 rounded-3xl border flex items-center justify-center whitespace-nowrap text-center ${
                darkMode 
                  ? "border-cyan-500/20 bg-cyan-500/10 text-cyan-400" 
                  : "border-cyan-200 bg-cyan-50 text-cyan-700 font-bold"
              }`}>
                <span className="text-xs md:text-sm">
                  {selected.length} selected
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Error */}
        {sendError && (
          <div className="mb-5 rounded-3xl border border-red-500/20 bg-red-500/10 px-5 py-4 flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
              <AlertTriangle size={18} className="text-red-400" />
            </div>

            <div>
              <p className="text-[0.88rem] font-semibold text-red-300">
                Failed to Send Notification
              </p>
              <p className="text-[0.78rem] text-red-400/80 mt-0.5">
                {sendError}
              </p>
            </div>
          </div>
        )}

        {loading ? (
          <div className={`rounded-3xl border h-[62vh] flex flex-col items-center justify-center ${
            darkMode ? "border-[#252b42] bg-[#11131f]" : "border-indigo-100 bg-white shadow-sm"
          }`}>
            <div className="relative mb-6">
              <div className="absolute inset-0 rounded-full bg-[#6366f1]/20 blur-2xl" />
              <div className={`relative w-[72px] h-[72px] rounded-full border flex items-center justify-center ${
                darkMode ? "border-[#2b3350] bg-[#171c2b]" : "border-slate-200 bg-slate-50"
              }`}>
                <Loader2 size={34} className="animate-spin text-[#818cf8]" />
              </div>
            </div>

            <h3 className={`font-semibold text-[1.05rem] mb-2 ${darkMode ? "text-white" : "text-slate-800"}`}>
              Loading Students
            </h3>
            <p className={`text-sm ${darkMode ? "text-[#697292]" : "text-slate-400"}`}>
              Fetching academic records and guardian data...
            </p>
          </div>
        ) : (
          <div className={`rounded-3xl border p-5 flex flex-col h-[62vh] ${
            darkMode ? "border-[#252b42] bg-[#11131f]" : "border-indigo-100 bg-white shadow-sm"
          }`}>
            <div className="flex items-center justify-between mb-5 px-1 shrink-0">
              <div>
                <h2 className={`text-lg font-extrabold font-outfit ${darkMode ? "text-white" : "text-slate-800"}`}>
                  Student Directory
                </h2>

                <p className={`text-xs mt-1 ${darkMode ? "text-[#697292]" : "text-slate-400"}`}>
                  Select students to generate secure guardian access links
                </p>
              </div>

              <div className={`h-[40px] px-4 rounded-2xl border flex items-center justify-center ${
                darkMode ? "border-[#252b42] bg-[#171b2a]" : "border-slate-200 bg-slate-50"
              }`}>
                <span className={`text-[0.82rem] font-bold ${darkMode ? "text-[#8b93b2]" : "text-slate-600"}`}>
                  {filteredStudents.length} students
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 flex-1 h-0 overflow-y-auto custom-scrollbar pr-2">
              {filteredStudents.map((student) => {
                const isSel = selected.includes(student._id);

                const avgSgpa = student.semesters?.length
                  ? (
                      student.semesters.reduce(
                        (acc, sem) => acc + (sem.sgpa || 0),
                        0,
                      ) / student.semesters.length
                    ).toFixed(2)
                  : null;

                return (
                  <div
                    key={student._id}
                    onClick={() => toggle(student._id)}
                    className={`group relative rounded-[28px] border p-4 cursor-pointer ${
                      isSel
                        ? darkMode
                          ? "border-[#6366f1] bg-[#161c30] shadow-[0_12px_35px_rgba(99,102,241,0.12)]"
                          : "border-[#6366f1] bg-indigo-50/40 shadow-[0_8px_25px_rgba(99,102,241,0.06)]"
                        : darkMode
                          ? "border-[#252b42] bg-[#141826] hover:border-[#313957] hover:bg-[#171b2a]"
                          : "border-slate-200 bg-white hover:border-indigo-100 hover:bg-slate-50 shadow-sm"
                    }`}
                  >
                    {isSel && darkMode && (
                      <div className="absolute top-0 right-0 w-[180px] h-[120px] bg-[#6366f1]/10 blur-3xl pointer-events-none" />
                    )}

                    <div className="relative flex items-center gap-4">
                      <div
                        className={`w-6 h-6 rounded-xl border flex items-center justify-center shrink-0 ${
                          isSel
                            ? "bg-[#6366f1] border-[#6366f1]"
                            : darkMode
                              ? "border-[#313957] bg-[#171b2a]"
                              : "border-slate-300 bg-slate-50"
                        }`}
                      >
                        {isSel && (
                          <CheckCircle2 size={20} className="text-white" />
                        )}
                      </div>

                      <div className={`w-[52px] h-[52px] rounded-2xl border flex items-center justify-center text-[1rem] font-bold shrink-0 shadow-inner ${
                        darkMode ? "border-[#2a314d] bg-[#1a2033] text-white" : "border-slate-200 bg-slate-100 text-slate-800"
                      }`}>
                        {student.fullName?.[0] || "?"}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className={`text-[0.95rem] font-bold truncate ${darkMode ? "text-white" : "text-slate-800"}`}>
                            {student.fullName}
                          </h3>

                          <div className={`px-2.5 py-1 rounded-full border text-[0.68rem] font-semibold ${
                            darkMode 
                              ? "border-[#2b3350] bg-[#1b2031] text-[#818cf8]" 
                              : "border-indigo-50 bg-indigo-50 text-indigo-600"
                          }`}>
                            {student.course}
                          </div>
                        </div>

                        <p className={`text-[0.76rem] mt-1 truncate ${darkMode ? "text-[#697292]" : "text-slate-400"}`}>
                          URN {student.urn} · {student.branch}
                        </p>
                      </div>

                      {avgSgpa && (
                        <div className={`w-[124px] h-[62px] rounded-2xl border flex flex-col items-center justify-center shrink-0 ${
                          darkMode ? "border-[#252b42] bg-[#171b2a]" : "border-slate-200 bg-slate-50"
                        }`}>
                          <p className={`text-[1rem] font-bold font-outfit leading-none ${
                            darkMode ? "text-[#818cf8]" : "text-indigo-600"
                          }`}>
                            {student.semesters
                              .map((sem) => sem.semesterNumber)
                              .join(", ")}
                          </p>

                          <p className={`text-[9px] text-center mt-1 tracking-wide ${darkMode ? "text-[#697292]" : "text-slate-400"}`}>
                            Semesters Completed
                          </p>
                        </div>
                      )}
                      
                      {avgSgpa && (
                        <div className={`w-[84px] h-[62px] rounded-2xl border flex flex-col items-center justify-center shrink-0 ${
                          darkMode ? "border-[#252b42] bg-[#171b2a]" : "border-slate-200 bg-slate-50"
                        }`}>
                          <p className={`text-[1rem] font-bold font-outfit leading-none ${
                            darkMode ? "text-[#818cf8]" : "text-indigo-600"
                          }`}>
                            {avgSgpa}
                          </p>

                          <p className={`text-[9px] text-center mt-1 tracking-wide ${darkMode ? "text-[#697292]" : "text-slate-400"}`}>
                            Average SGPA
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {filteredStudents.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className={`w-[82px] h-[82px] rounded-[28px] border flex items-center justify-center mb-5 ${
                    darkMode ? "border-[#252b42] bg-[#171b2a]" : "border-slate-200 bg-slate-50"
                  }`}>
                    <SearchX size={34} className="text-[#697292]" />
                  </div>

                  <h3 className={`font-semibold text-[1.05rem] mb-2 ${darkMode ? "text-white" : "text-slate-800"}`}>
                    No Students Found
                  </h3>

                  <p className={`text-sm max-w-[320px] leading-relaxed ${darkMode ? "text-[#697292]" : "text-slate-400"}`}>
                    Try searching using another student name, URN, or branch.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Settings Panel */}
      <div className="w-full xl:w-[30%] flex flex-col justify-between xl:h-[calc(62vh+84px)] gap-4">
        {/* Settings Box */}
        <div className={`rounded-3xl border p-4 ${
          darkMode ? "border-[#20253b] bg-[#11131f] shadow-[0_10px_40px_rgba(0,0,0,0.28)]" : "border-indigo-100 bg-white shadow-sm"
        }`}>
          <div className="flex items-center justify-between gap-3 mb-3.5 border-b pb-2.5 dark:border-slate-800 border-slate-100">
            <div className="flex items-center gap-3.5">
              <div className={`w-8.5 h-8.5 rounded-2xl border flex items-center justify-center shrink-0 ${
                darkMode ? "border-[#2b3350] bg-[#181c2c]" : "border-slate-200 bg-slate-50 shadow-sm"
              }`}>
                <Mail size={16} className="text-[#818cf8]" />
              </div>

              <div>
                <h2 className={`text-sm font-bold font-outfit ${darkMode ? "text-white" : "text-slate-800"}`}>
                  Settings
                </h2>
                <p className={`text-[0.68rem] mt-0.5 ${darkMode ? "text-[#68708f]" : "text-slate-400"}`}>
                  Guardian email config
                </p>
              </div>
            </div>

            <div className={`px-2 py-0.5 rounded-full text-[0.62rem] font-bold border ${
              darkMode 
                ? "border-[#2b3350] bg-[#1b2031] text-[#818cf8]" 
                : "border-indigo-100 bg-indigo-50 text-indigo-600"
            }`}>
              Email Delivery
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <div>
              <label className={`text-[0.68rem] block mb-1 font-bold ${darkMode ? "text-[#5e6787]" : "text-slate-400"}`}>
                Token Expiry
              </label>
              <CustomSelect
                value={expiry}
                onChange={setExpiry}
                options={["24 hours", "48 hours", "72 hours", "7 days"]}
                className="h-10 rounded-xl px-4 text-xs"
              />
            </div>

            <div>
              <label className={`text-[0.68rem] block mb-1 font-bold ${darkMode ? "text-[#5e6787]" : "text-slate-400"}`}>
                Access Limit
              </label>
              <CustomSelect
                value={accessLimit}
                onChange={setAccessLimit}
                options={["1-time access", "2-time access", "3-time access"]}
                className="h-10 rounded-xl px-4 text-xs"
              />
            </div>
          </div>

          <button
            disabled={selected.length === 0 || sending}
            onClick={handleSend}
            className="w-full h-10 rounded-xl bg-[#6366f1] hover:bg-[#5855eb] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs shadow-[0_10px_25px_rgba(99,102,241,0.12)] flex items-center justify-center gap-2 cursor-pointer"
          >
            {sending ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={14} />
                Send to {selected.length} Parent{selected.length !== 1 ? "s" : ""}
              </>
            )}
          </button>
        </div>

        {/* How it works */}
        <div className={`rounded-3xl border p-4 ${
          darkMode ? "border-[#20253b] bg-[#11131f] shadow-[0_10px_40px_rgba(0,0,0,0.22)]" : "border-indigo-100 bg-white shadow-sm"
        }`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${
              darkMode ? "border-[#2b3350] bg-[#181c2c]" : "border-slate-200 bg-slate-50 shadow-sm"
            }`}>
              <BellRing size={13} className="text-[#22d3ee]" />
            </div>

            <div>
              <h3 className={`text-xs font-bold font-outfit ${darkMode ? "text-white" : "text-slate-800"}`}>
                How It Works
              </h3>
              <p className={`text-[0.65rem] mt-0.5 ${darkMode ? "text-[#68708f]" : "text-slate-400"}`}>
                Secure guardian notification workflow
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {[
              "Select students and configure settings",
              "Unique secure guardian links are generated",
              "Links expire automatically after selected duration",
              "Track access from Token Management dashboard",
            ].map((step, index) => (
              <div key={index} className="flex items-start gap-2.5">
                <div className={`w-5 h-5 shrink-0 rounded-lg border flex items-center justify-center text-[0.62rem] font-extrabold ${
                  darkMode ? "bg-[#181c2c] border-[#2b3350] text-[#818cf8]" : "bg-indigo-50 border-indigo-100 text-indigo-600"
                }`}>
                  {index + 1}
                </div>

                <p className={`text-[0.68rem] leading-relaxed pt-0.5 ${darkMode ? "text-[#8b93b2]" : "text-slate-500"}`}>
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
