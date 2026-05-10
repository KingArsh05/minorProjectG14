import { useState, useEffect } from "react";
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
} from "lucide-react";

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

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data: response } = await axios.get(`${API_URL}/students`, {
          withCredentials: true,
        });

        console.log({ data: response.data });

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

  const filtered = students.filter((s) => {
    const q = search.toLowerCase();

    return (
      !q || s.fullName.toLowerCase().includes(q) || String(s.urn).includes(q)
    );
  });

  const toggle = (id) =>
    setSelected((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id],
    );

  const toggleAll = () =>
    setSelected(
      filtered.length === selected.length ? [] : filtered.map((s) => s._id),
    );

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
      <div className="max-w-[700px] mx-auto mt-10 fade-in">
        <div className="rounded-[36px] border border-[#252b42] bg-[#11131f] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[260px] h-[140px] bg-emerald-500/10 blur-3xl pointer-events-none" />

          <div className="relative text-center">
            <div className="w-[88px] h-[88px] rounded-full border border-emerald-500/20 bg-emerald-500/10 flex items-center justify-center mx-auto mb-6 shadow-[0_15px_40px_rgba(16,185,129,0.12)]">
              <CheckCircle2 size={42} className="text-emerald-400" />
            </div>

            <h2 className="text-[1.9rem] font-bold text-white font-outfit mb-3">
              Notifications Sent
            </h2>

            <p className="text-[#8b93b2] text-[0.95rem] leading-relaxed max-w-[520px] mx-auto">
              Successfully generated and delivered secure guardian access links
              for{" "}
              <span className="text-[#818cf8] font-semibold">
                {createdTokens.length}
              </span>{" "}
              student
              {createdTokens.length !== 1 ? "s" : ""}.
            </p>
          </div>

          <div className="mt-8 rounded-[28px] border border-[#252b42] bg-[#141826] p-5 max-h-[380px] overflow-y-auto">
            <div className="flex flex-col gap-3">
              {createdTokens.map((t) => (
                <div
                  key={t._id}
                  className="rounded-[22px] border border-[#252b42] bg-[#171b2a] p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-[52px] h-[52px] rounded-2xl border border-[#2a314d] bg-[#1a2033] flex items-center justify-center text-white font-bold">
                      {t.student?.fullName?.[0] || "?"}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-[0.92rem] truncate">
                        {t.student?.fullName || "Unknown"}
                      </h3>

                      <p className="text-[#22d3ee] text-[0.72rem] font-mono truncate mt-1">
                        /guardian?token=
                        {t.token}
                      </p>
                    </div>

                    <div className="px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[0.72rem] font-medium">
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
              className="h-[54px] px-6 rounded-2xl border border-[#252b42] bg-[#171b2a] hover:bg-[#1c2133] text-[#9ba2c0] hover:text-white font-medium transition-all"
            >
              Send More
            </button>

            <button
              onClick={() => (window.location.href = "/admin/tokens")}
              className="h-[54px] px-6 rounded-2xl bg-[#6366f1] hover:bg-[#5855eb] text-white font-semibold shadow-[0_12px_35px_rgba(99,102,241,0.24)] transition-all"
            >
              View Tokens
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full flex flex-col xl:flex-row gap-5">
      {/* Right Panel */}
      <div className="w-full xl:w-[70%]">
        {/* Search */}
        <div className="relative overflow-hidden rounded-[34px] border border-[#252b42] bg-[#11131f] p-4 shadow-[0_15px_45px_rgba(0,0,0,0.32)] mb-5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[260px] h-[140px] bg-[#6366f1]/10 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
            <div className="group flex-1 h-[64px] rounded-[24px] border border-[#252b42] bg-[#141826] hover:border-[#353d60] focus-within:border-[#6366f1] transition-all overflow-hidden">
              <div className="flex items-center h-full px-6 gap-4">
                <div className="text-[#697292] group-focus-within:text-[#818cf8] transition-all">
                  <Search size={22} strokeWidth={2} />
                </div>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search student by name, URN, branch..."
                  className="w-full bg-transparent outline-none border-none text-white placeholder:text-[#697292] text-[1rem]"
                />
              </div>
            </div>

            <button
              onClick={toggleAll}
              className="h-14 w-36 px-6 rounded-[22px] border border-[#2c3350] bg-[#1a1e2d] hover:bg-[#202538] text-[#d6dcf7] font-medium transition-all whitespace-nowrap text-center"
            >
              {`${loading || selected.length < students.length ? "Select All" : "Deselect All"}`}
            </button>
            <div className="h-14 w-36 px-6 rounded-[22px] border border-cyan-500/20 bg-cyan-500/10 flex items-center justify-center shadow-[0_8px_25px_rgba(34,211,238,0.08)] whitespace-nowrap text-center">
              <span className="text-cyan-400 font-semibold text-[0.95rem]">
                {selected.length} selected
              </span>
            </div>
          </div>
        </div>

        {/* Error */}
        {sendError && (
          <div className="mb-5 rounded-[24px] border border-red-500/20 bg-red-500/10 px-5 py-4 flex items-center gap-3 shadow-[0_10px_30px_rgba(239,68,68,0.08)]">
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

        {/* Loading */}
        {loading ? (
          <div className="rounded-[34px] border border-[#252b42] bg-[#11131f] h-[500px] flex flex-col items-center justify-center shadow-[0_15px_45px_rgba(0,0,0,0.28)]">
            <div className="relative mb-6">
              <div className="absolute inset-0 rounded-full bg-[#6366f1]/20 blur-2xl" />

              <div className="relative w-[72px] h-[72px] rounded-full border border-[#2b3350] bg-[#171c2b] flex items-center justify-center">
                <Loader2 size={34} className="animate-spin text-[#818cf8]" />
              </div>
            </div>

            <h3 className="text-white font-semibold text-[1.05rem] mb-2">
              Loading Students
            </h3>

            <p className="text-[#697292] text-sm">
              Fetching academic records and guardian data...
            </p>
          </div>
        ) : (
          <div className="rounded-[34px] border border-[#252b42] bg-[#11131f] p-5 shadow-[0_15px_45px_rgba(0,0,0,0.28)]">
            <div className="flex items-center justify-between mb-5 px-1">
              <div>
                <h2 className="text-[1.2rem] font-bold text-white font-outfit">
                  Student Directory
                </h2>

                <p className="text-[#697292] text-[0.8rem] mt-1">
                  Select students to generate secure guardian access links
                </p>
              </div>

              <div className="h-[42px] px-4 rounded-2xl border border-[#252b42] bg-[#171b2a] flex items-center justify-center">
                <span className="text-[#8b93b2] text-[0.82rem] font-medium">
                  {filtered.length} students
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {filtered.map((student) => {
                const isSel = selected.includes(student._id);

                // const lastSem = student.semesters[student.semesters.length - 1];
                const avgSgpa = (
                  student.semesters.reduce((acc, sem) => acc + sem.sgpa, 0) /
                  student.semesters.length
                ).toFixed(2);

                return (
                  <div
                    key={student._id}
                    onClick={() => toggle(student._id)}
                    className={`group relative overflow-hidden rounded-[28px] border p-4 cursor-pointer transition-all duration-300 ${
                      isSel
                        ? "border-[#6366f1] bg-[#161c30] shadow-[0_12px_35px_rgba(99,102,241,0.12)]"
                        : "border-[#252b42] bg-[#141826] hover:border-[#313957] hover:bg-[#171b2a]"
                    }`}
                  >
                    {isSel && (
                      <div className="absolute top-0 right-0 w-[180px] h-[120px] bg-[#6366f1]/10 blur-3xl pointer-events-none" />
                    )}

                    <div className="relative flex items-center gap-4">
                      <div
                        className={`w-6 h-6 rounded-xl border flex items-center justify-center shrink-0 transition-all ${
                          isSel
                            ? "bg-[#6366f1] border-[#6366f1]"
                            : "border-[#313957] bg-[#171b2a]"
                        }`}
                      >
                        {isSel && (
                          <CheckCircle2 size={20} className="text-white" />
                        )}
                      </div>

                      <div className="w-[52px] h-[52px] rounded-2xl border border-[#2a314d] bg-[#1a2033] flex items-center justify-center text-white text-[1rem] font-bold shrink-0 shadow-inner">
                        {student.fullName[0]}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-[0.95rem] font-semibold text-white truncate">
                            {student.fullName}
                          </h3>

                          <div className="px-2.5 py-1 rounded-full border border-[#2b3350] bg-[#1b2031] text-[#818cf8] text-[0.68rem] font-medium">
                            {student.course}
                          </div>
                        </div>

                        <p className="text-[0.76rem] text-[#697292] mt-1 truncate">
                          URN {student.urn} · {student.branch}
                        </p>
                      </div>

                      {/* {lastSem?.sgpa && (
                        <div className="w-[84px] h-[62px] rounded-2xl border border-[#252b42] bg-[#171b2a] flex flex-col items-center justify-center shrink-0">
                          <p className="text-[1rem] font-bold text-[#818cf8] font-outfit leading-none">
                            {lastSem.sgpa}
                          </p>

                          <p className="text-[9px] text-center text-[#697292] mt-1 tracking-wide">
                            Last Sem SGPA
                          </p>
                        </div>
                      )} */}

                      {avgSgpa && (
                        <div className="w-[124px] h-[62px] rounded-2xl border border-[#252b42] bg-[#171b2a] flex flex-col items-center justify-center shrink-0">
                          <p className="text-[1rem] font-bold text-[#818cf8] font-outfit leading-none">
                            {student.semesters
                              .map((sem) => sem.semesterNumber)
                              .join(", ")}
                          </p>

                          <p className="text-[9px] text-center text-[#697292] mt-1 tracking-wide">
                            Semesters Completed
                          </p>
                        </div>
                      )}
                      {avgSgpa && (
                        <div className="w-[84px] h-[62px] rounded-2xl border border-[#252b42] bg-[#171b2a] flex flex-col items-center justify-center shrink-0">
                          <p className="text-[1rem] font-bold text-[#818cf8] font-outfit leading-none">
                            {avgSgpa}
                          </p>

                          <p className="text-[9px] text-center text-[#697292] mt-1 tracking-wide">
                            Average SGPA
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {filtered.length === 0 && (
                <div className="h-[360px] flex flex-col items-center justify-center text-center">
                  <div className="w-[82px] h-[82px] rounded-[28px] border border-[#252b42] bg-[#171b2a] flex items-center justify-center mb-5">
                    <SearchX size={34} className="text-[#697292]" />
                  </div>

                  <h3 className="text-white font-semibold text-[1.05rem] mb-2">
                    No Students Found
                  </h3>

                  <p className="text-[#697292] text-sm max-w-[320px] leading-relaxed">
                    Try searching using another student name, URN, or branch.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Left Panel */}
      <div className="w-full xl:w-[30%]">
        <div className="rounded-[32px] border border-[#20253b] bg-[#11131f] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.28)]">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-2xl bg-[#181c2c] border border-[#2b3350] flex items-center justify-center">
              <Mail size={18} className="text-[#818cf8]" />
            </div>

            <div>
              <h2 className="text-[1rem] font-bold text-white font-outfit">
                Notification Settings
              </h2>

              <p className="text-[#68708f] text-[0.78rem] mt-0.5">
                Configure secure guardian email delivery
              </p>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm block mb-2 text-[#5e6787] font-semibold">
              Delivery Method
            </label>

            <div className="h-[54px] rounded-2xl border border-[#6366f1]/30 bg-[#6366f1] text-white flex items-center justify-center gap-2 font-semibold shadow-[0_10px_25px_rgba(99,102,241,0.18)]">
              <Mail size={16} />
              Email Delivery
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 mb-8">
            <div className="flex-1">
              <label className="text-sm block mb-2 text-[#5e6787] font-semibold">
                Token Expiry
              </label>

              <select
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="w-full h-[58px] rounded-2xl border border-[#232844] bg-[#161925] px-5 text-[0.95rem] text-white outline-none focus:border-[#6366f1] transition-all appearance-none cursor-pointer"
              >
                {["24 hours", "48 hours", "72 hours", "7 days"].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="text-sm block mb-2 text-[#5e6787] font-semibold">
                Access Limit
              </label>

              <select
                value={accessLimit}
                onChange={(e) => setAccessLimit(e.target.value)}
                className="w-full h-[58px] rounded-2xl border border-[#232844] bg-[#161925] px-5 text-[0.95rem] text-white outline-none focus:border-[#6366f1] transition-all appearance-none cursor-pointer"
              >
                {[
                  "1-time access",
                  "2-time access",
                  "3-time access",
                ].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            disabled={selected.length === 0 || sending}
            onClick={handleSend}
            className="w-full h-[58px] rounded-2xl bg-[#6366f1] hover:bg-[#5855eb] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-[0.95rem] shadow-[0_12px_30px_rgba(99,102,241,0.2)] transition-all flex items-center justify-center gap-2"
          >
            {sending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={16} />
                Send to {selected.length} Parent
                {selected.length !== 1 ? "s" : ""}
              </>
            )}
          </button>
        </div>

        <div className="rounded-[30px] border border-[#20253b] bg-[#11131f] mt-5 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.22)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-[#181c2c] border border-[#2b3350] flex items-center justify-center">
              <BellRing size={16} className="text-[#22d3ee]" />
            </div>

            <div>
              <h3 className="text-[1rem] font-bold text-white font-outfit">
                How It Works
              </h3>

              <p className="text-[#68708f] text-[0.75rem] mt-0.5">
                Secure guardian notification workflow
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              "Select students and configure settings",
              "Unique secure guardian links are generated",
              "Links expire automatically after selected duration",
              "Track access from Token Management dashboard",
            ].map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-7 h-7 shrink-0 rounded-xl bg-[#181c2c] border border-[#2b3350] flex items-center justify-center text-[#818cf8] text-xs font-bold">
                  {index + 1}
                </div>

                <p className="text-[#8b93b2] text-[0.78rem] leading-relaxed pt-1">
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
