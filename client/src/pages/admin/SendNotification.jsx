import { useState, useEffect } from "react";
import {
  Search,
  Send,
  CheckCircle,
  Mail,
  Phone,
  BellRing,
  Loader2,
  ExternalLink,
} from "lucide-react";

const avatarGrad = (s) =>
  `linear-gradient(135deg, hsl(${(s.urn * 47) % 360},60%,38%), hsl(${(s.urn * 47 + 40) % 360},65%,32%))`;

export default function SendNotification() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [via, setVia] = useState("Email");
  const [semester, setSemester] = useState(1);
  const [expiry, setExpiry] = useState("24 hours");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [createdTokens, setCreatedTokens] = useState([]);
  const [sendError, setSendError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/students");
        const json = await res.json();
        if (res.ok) setStudents(json.data || []);
      } catch (err) {
        console.error("Failed to load students:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

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
      const res = await fetch("/api/tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentIds: selected,
          sentVia: via,
          semester,
          expiry,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed to create tokens");
      setCreatedTokens(json.data || []);
      setSent(true);
    } catch (err) {
      setSendError(err.message);
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="fade-in max-w-[600px] mx-auto mt-10">
        <div className="text-center mb-6">
          <div className="w-20 h-20 rounded-full bg-[rgba(16,185,129,0.12)] border-2 border-[#10b981] flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={36} color="#10b981" />
          </div>
          <h2
            className="text-[1.5rem] font-extrabold text-[#f0f1fa] mb-2"
            style={{ fontFamily: "Outfit,sans-serif" }}
          >
            Tokens Generated!
          </h2>
          <p className="text-[#5c6385] text-[0.9rem]">
            <strong className="text-[#818cf8]">{createdTokens.length}</strong>{" "}
            unique guardian link{createdTokens.length > 1 ? "s" : ""} created
            via <strong className="text-[#22d3ee]">{via}</strong>
          </p>
        </div>
        <div className="bg-[#13162b] border border-[#252840] rounded-2xl p-4 mb-5">
          {createdTokens.map((t) => (
            <div key={t._id} className="flex items-center gap-3 mb-3 last:mb-0">
              <div
                className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-[0.8rem] font-bold text-white"
                style={{
                  background: `linear-gradient(135deg, hsl(${((t.student?.urn || 0) * 47) % 360},60%,38%), hsl(${((t.student?.urn || 0) * 47 + 40) % 360},65%,32%))`,
                }}
              >
                {t.student?.fullName?.[0] || "?"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[0.83rem] font-semibold text-[#f0f1fa]">
                  {t.student?.fullName || "Unknown"}
                </p>
                <p className="text-[0.68rem] font-mono text-[#22d3ee] truncate">
                  /guardian?token={t.token}
                </p>
              </div>
              <a
                href={`/guardian?token=${t.token}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#1e2132] border border-[#252840] cursor-pointer hover:border-[#6366f1] transition-all shrink-0"
              >
                <ExternalLink size={11} className="text-[#9ba2c0]" />
              </a>
            </div>
          ))}
        </div>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => {
              setSent(false);
              setSelected([]);
              setCreatedTokens([]);
            }}
            className="inline-flex items-center gap-2 px-5 py-[0.6rem] rounded-xl text-[#9ba2c0] text-sm bg-[#1e2132] border border-[#2e3354] hover:border-[#6366f1] hover:text-[#f0f1fa] transition-all cursor-pointer"
          >
            Send More
          </button>
          <button
            onClick={() => (window.location.href = "/admin/tokens")}
            className="inline-flex items-center gap-2 px-5 py-[0.6rem] rounded-xl text-white text-sm font-semibold bg-linear-to-br from-[#6366f1] to-[#4f46e5] shadow-[0_4px_14px_rgba(99,102,241,0.25)] hover:-translate-y-px transition-all cursor-pointer"
          >
            <BellRing size={14} /> View Tokens
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in grid grid-cols-[1fr_320px] gap-6">
      {/* Left: student list */}
      <div>
        <div className="bg-[#13162b] border border-[#252840] rounded-2xl p-4 mb-4 flex flex-wrap gap-3 items-center hover:border-[#2e3354] transition-colors">
          <div className="relative flex-1 min-w-[180px]">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c6385]"
            />
            <input
              className="w-full bg-[#161925] border border-[#252840] text-[#f0f1fa] pl-9 pr-3 py-[0.65rem] rounded-xl text-sm outline-none focus:border-[#6366f1] placeholder:text-[#5c6385]"
              placeholder="Search student…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={toggleAll}
            className="inline-flex items-center gap-2 px-4 py-[0.55rem] rounded-lg text-sm text-[#9ba2c0] bg-[#1e2132] border border-[#2e3354] hover:border-[#6366f1] hover:text-[#f0f1fa] transition-all cursor-pointer"
          >
            {selected.length === filtered.length && filtered.length > 0
              ? "Deselect All"
              : "Select All"}
          </button>
          <span className="inline-flex items-center gap-1 px-[0.65rem] py-[0.2rem] rounded-full text-[0.72rem] font-semibold bg-[rgba(6,182,212,0.15)] text-[#22d3ee] border border-[rgba(6,182,212,0.25)]">
            {selected.length} selected
          </span>
        </div>

        {sendError && (
          <div className="bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.25)] rounded-xl p-3 mb-4 text-[0.8rem] text-[#f87171]">
            ⚠ {sendError}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={24} className="animate-spin text-[#5c6385]" />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map((student) => {
              const isSel = selected.includes(student._id);
              const lastSem = student.semesters[student.semesters.length - 1];
              return (
                <div
                  key={student._id}
                  onClick={() => toggle(student._id)}
                  className={`flex items-center gap-3 bg-[#13162b] rounded-2xl p-4 cursor-pointer transition-all ${isSel ? "border border-[#6366f1] bg-[rgba(99,102,241,0.04)]" : "border border-[#252840] hover:border-[#2e3354]"}`}
                >
                  <div
                    className={`w-5 h-5 rounded-[5px] border-2 flex items-center justify-center shrink-0 transition-all ${isSel ? "bg-[#6366f1] border-[#6366f1]" : "border-[#252840]"}`}
                  >
                    {isSel && <CheckCircle size={12} color="white" />}
                  </div>
                  <div
                    className="w-9 h-9 rounded-[9px] shrink-0 flex items-center justify-center text-[0.9rem] font-bold text-white"
                    style={{ background: avatarGrad(student) }}
                  >
                    {student.fullName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[0.88rem] font-semibold text-[#f0f1fa]">
                      {student.fullName}
                    </p>
                    <p className="text-[0.7rem] text-[#5c6385]">
                      URN {student.urn} · {student.course} ·{" "}
                      {student.branch?.split(" ")[0]}
                    </p>
                  </div>
                  {lastSem?.sgpa && (
                    <div className="bg-[#161925] rounded-lg px-3 py-1 text-center">
                      <p
                        className="text-[0.85rem] font-bold text-[#818cf8]"
                        style={{ fontFamily: "Outfit,sans-serif" }}
                      >
                        {lastSem.sgpa}
                      </p>
                      <p className="text-[0.6rem] text-[#5c6385]">SGPA</p>
                    </div>
                  )}
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div className="text-center py-10">
                <p className="text-[#5c6385] text-sm">No students found.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right panel */}
      <div>
        <div className="bg-[#13162b] border border-[#252840] rounded-2xl p-5 mb-4 hover:border-[#2e3354] transition-colors">
          <h3 className="text-[0.9rem] font-bold text-[#f0f1fa] mb-4">
            📤 Notification Settings
          </h3>

          <div className="mb-4">
            <label className="block text-[0.78rem] font-semibold text-[#5c6385] tracking-wide uppercase mb-[0.4rem]">
              Send Via
            </label>
            <div className="flex gap-2">
              {["Email", "SMS", "Both"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setVia(opt)}
                  className={`flex-1 flex items-center justify-center gap-1 px-3 py-[0.55rem] rounded-lg text-[0.8rem] font-medium cursor-pointer transition-all border ${opt === via ? "bg-linear-to-br from-[#6366f1] to-[#4f46e5] text-white border-[#6366f1] shadow-[0_4px_14px_rgba(99,102,241,0.2)]" : "text-[#9ba2c0] border-[#252840] bg-transparent hover:border-[#6366f1] hover:text-[#818cf8]"}`}
                >
                  {opt === "Email" ? (
                    <Mail size={12} />
                  ) : opt === "SMS" ? (
                    <Phone size={12} />
                  ) : (
                    <BellRing size={12} />
                  )}{" "}
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-[0.78rem] font-semibold text-[#5c6385] tracking-wide uppercase mb-[0.4rem]">
              Semester
            </label>
            <select
              value={semester}
              onChange={(e) => setSemester(Number(e.target.value))}
              className="w-full bg-[#161925] border border-[#252840] text-[#f0f1fa] px-4 py-[0.65rem] rounded-xl text-sm outline-none focus:border-[#6366f1] appearance-none cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <option key={s} value={s}>
                  Semester {s}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label className="block text-[0.78rem] font-semibold text-[#5c6385] tracking-wide uppercase mb-[0.4rem]">
              Token Expiry
            </label>
            <select
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="w-full bg-[#161925] border border-[#252840] text-[#f0f1fa] px-4 py-[0.65rem] rounded-xl text-sm outline-none focus:border-[#6366f1] appearance-none cursor-pointer"
            >
              {["24 hours", "48 hours", "72 hours", "7 days"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>

          <button
            disabled={selected.length === 0 || sending}
            onClick={handleSend}
            className="w-full flex items-center justify-center gap-2 h-11 rounded-xl text-white text-sm font-semibold bg-linear-to-br from-[#6366f1] to-[#4f46e5] shadow-[0_4px_14px_rgba(99,102,241,0.25)] hover:-translate-y-px transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating…
              </>
            ) : (
              <>
                <Send size={14} /> Send to {selected.length || "…"} Parent
                {selected.length !== 1 ? "s" : ""}
              </>
            )}
          </button>
        </div>

        <div className="bg-[#13162b] border border-[#252840] rounded-2xl p-4">
          <h3 className="text-[0.82rem] font-semibold text-[#5c6385] mb-3">
            ℹ️ How It Works
          </h3>
          <div className="text-[0.72rem] text-[#5c6385] leading-relaxed space-y-2">
            <p>1. Select students and configure settings</p>
            <p>
              2. Each parent gets a{" "}
              <strong className="text-[#818cf8]">unique, time-limited</strong>{" "}
              secure link
            </p>
            <p>3. Links auto-expire after the selected duration</p>
            <p>
              4. Track usage on the{" "}
              <strong className="text-[#22d3ee]">Token Management</strong> page
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
