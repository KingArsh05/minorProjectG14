import { useState } from "react";
import {
  Search,
  Send,
  CheckCircle,
  Mail,
  Phone,
  BellRing,
  Filter,
} from "lucide-react";
import { students } from "../../data/students";

export default function SendNotification() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [via, setVia] = useState("Email");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const filtered = students.filter((s) => {
    const q = search.toLowerCase();
    return (
      !q || s.fullName.toLowerCase().includes(q) || String(s.urn).includes(q)
    );
  });

  const toggle = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  const toggleAll = () =>
    setSelected(
      filtered.length === selected.length ? [] : filtered.map((s) => s._id),
    );

  const handleSend = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 2000);
  };

  const selectedStudents = students.filter((s) => selected.includes(s._id));

  if (sent) {
    return (
      <div
        className="fade-in"
        style={{ maxWidth: "560px", margin: "3rem auto", textAlign: "center" }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "rgba(16,185,129,0.15)",
            border: "2px solid var(--success)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
          }}
        >
          <CheckCircle size={36} color="var(--success)" />
        </div>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 800,
            fontFamily: "Outfit, sans-serif",
            color: "var(--text-primary)",
            marginBottom: "0.5rem",
          }}
        >
          Notifications Sent!
        </h2>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "0.9rem",
            marginBottom: "2rem",
          }}
        >
          Secure dashboard links dispatched to{" "}
          <strong style={{ color: "var(--primary-light)" }}>
            {selected.length}
          </strong>{" "}
          parent{selected.length > 1 ? "s" : ""} via{" "}
          <strong style={{ color: "var(--accent-light)" }}>{via}</strong>.
        </p>
        <div
          className="card"
          style={{ padding: "1rem", marginBottom: "1.5rem", textAlign: "left" }}
        >
          {selectedStudents.map((s) => (
            <div
              key={s._id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.6rem",
              }}
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "7px",
                  background: `linear-gradient(135deg, hsl(${(s.urn * 47) % 360},60%,40%), hsl(${(s.urn * 47 + 40) % 360},70%,35%))`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "white",
                  flexShrink: 0,
                }}
              >
                {s.fullName[0]}
              </div>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  {s.fullName}
                </p>
                <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                  {via === "Email" ? s.parentEmail : s.parentPhone}
                </p>
              </div>
              <CheckCircle size={14} color="var(--success)" />
            </div>
          ))}
        </div>
        <div
          style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}
        >
          <button
            className="btn-secondary"
            onClick={() => {
              setSent(false);
              setSelected([]);
            }}
          >
            Send More
          </button>
          <button
            className="btn-primary"
            onClick={() => (window.location.href = "/admin/tokens")}
          >
            <BellRing size={14} /> View Tokens
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fade-in"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 340px",
        gap: "1.5rem",
      }}
    >
      {/* Left: student list */}
      <div>
        <div
          className="card"
          style={{
            padding: "1rem 1.25rem",
            marginBottom: "1.25rem",
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative", flex: "1 1 180px" }}>
            <Search
              size={14}
              style={{
                position: "absolute",
                left: "0.9rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
              }}
            />
            <input
              className="input-field"
              placeholder="Search student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: "2.2rem" }}
            />
          </div>
          <button className="btn-secondary" onClick={toggleAll}>
            {selected.length === filtered.length && filtered.length > 0
              ? "Deselect All"
              : "Select All"}
          </button>
          <span className="badge badge-info">{selected.length} selected</span>
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
        >
          {filtered.map((student) => {
            const isSelected = selected.includes(student._id);
            const lastSem = student.semesters[student.semesters.length - 1];
            return (
              <div
                key={student._id}
                className="card"
                style={{
                  padding: "0.9rem 1.1rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  borderColor: isSelected ? "var(--primary)" : "var(--border)",
                  background: isSelected
                    ? "rgba(99,102,241,0.05)"
                    : "var(--bg-card)",
                  transition: "all 0.2s",
                }}
                onClick={() => toggle(student._id)}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "5px",
                    border: `2px solid ${isSelected ? "var(--primary)" : "var(--border-light)"}`,
                    background: isSelected ? "var(--primary)" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.2s",
                  }}
                >
                  {isSelected && <CheckCircle size={12} color="white" />}
                </div>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "9px",
                    flexShrink: 0,
                    background: `linear-gradient(135deg, hsl(${(student.urn * 47) % 360},60%,40%), hsl(${(student.urn * 47 + 40) % 360},70%,35%))`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  {student.fullName[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    {student.fullName}
                  </p>
                  <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                    URN {student.urn} · {student.course} ·{" "}
                    {student.branch?.split(" ")[0]}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                    📧 {student.parentEmail}
                  </p>
                  <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                    📱 {student.parentPhone}
                  </p>
                </div>
                {lastSem?.sgpa && (
                  <div
                    style={{
                      background: "var(--bg-elevated)",
                      borderRadius: "7px",
                      padding: "0.3rem 0.6rem",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        color: "var(--primary-light)",
                        fontFamily: "Outfit, sans-serif",
                      }}
                    >
                      {lastSem?.sgpa}
                    </p>
                    <p
                      style={{ fontSize: "0.6rem", color: "var(--text-muted)" }}
                    >
                      SGPA
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: compose panel */}
      <div>
        <div className="card" style={{ marginBottom: "1rem" }}>
          <h3
            style={{
              fontSize: "0.9rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            📤 Notification Settings
          </h3>
          <div style={{ marginBottom: "1rem" }}>
            <label className="form-label">Send Via</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {["Email", "SMS", "Both"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setVia(opt)}
                  className={via === opt ? "btn-primary" : "btn-ghost"}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    fontSize: "0.8rem",
                  }}
                >
                  {opt === "Email" ? (
                    <Mail size={12} />
                  ) : opt === "SMS" ? (
                    <Phone size={12} />
                  ) : (
                    <BellRing size={12} />
                  )}
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label className="form-label">Semester</label>
            <select className="select-field">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <option key={s}>Semester {s}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label className="form-label">Token Expiry</label>
            <select className="select-field">
              <option>24 hours</option>
              <option>48 hours</option>
              <option>72 hours</option>
              <option>7 days</option>
            </select>
          </div>
          <div style={{ marginBottom: "1.25rem" }}>
            <label className="form-label">Custom Message (optional)</label>
            <textarea
              className="input-field"
              rows={3}
              placeholder="Add note to parent notification..."
              style={{ resize: "vertical", lineHeight: 1.6 }}
            />
          </div>
          <button
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center", height: "44px" }}
            disabled={selected.length === 0 || sending}
            onClick={handleSend}
          >
            {sending ? (
              <span
                style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
              >
                <span
                  style={{
                    width: "12px",
                    height: "12px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTop: "2px solid white",
                    borderRadius: "50%",
                    animation: "spin 0.7s linear infinite",
                  }}
                />
                Sending...
              </span>
            ) : (
              <>
                <Send size={14} /> Send to {selected.length || "..."} Parent
                {selected.length !== 1 ? "s" : ""}
              </>
            )}
          </button>
        </div>

        {/* Link preview */}
        <div className="card">
          <h3
            style={{
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "var(--text-muted)",
              marginBottom: "0.75rem",
            }}
          >
            🔗 Sample Secure Link
          </h3>
          <div
            style={{
              background: "var(--bg-elevated)",
              borderRadius: "8px",
              padding: "0.65rem 0.9rem",
              fontFamily: "monospace",
              fontSize: "0.7rem",
              color: "var(--accent-light)",
              wordBreak: "break-all",
              lineHeight: 1.7,
            }}
          >
            https://acadalert.edu/dashboard
            <br />
            ?token=
            <span style={{ color: "var(--primary-light)" }}>
              a3f9c2e8d1b7a6f4
            </span>
          </div>
          <p
            style={{
              fontSize: "0.72rem",
              color: "var(--text-muted)",
              marginTop: "0.6rem",
              lineHeight: 1.6,
            }}
          >
            Each parent receives a unique, time-limited secure link. No login
            required.
          </p>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
