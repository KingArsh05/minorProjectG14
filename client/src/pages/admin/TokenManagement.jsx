import { useState } from "react";
import {
  KeyRound,
  Trash2,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Clock,
  Search,
  Eye,
  Copy,
} from "lucide-react";
import { tokens } from "../../data/tokens";

const statusBadge = (s) => {
  if (s === "Active")
    return (
      <span className="badge badge-success">
        <CheckCircle size={9} /> Active
      </span>
    );
  if (s === "Used")
    return (
      <span className="badge badge-info">
        <Eye size={9} /> Used
      </span>
    );
  if (s === "Expired")
    return (
      <span className="badge badge-danger">
        <Clock size={9} /> Expired
      </span>
    );
  return null;
};

const viaBadge = (v) => {
  if (v === "Email")
    return <span className="badge badge-purple">📧 Email</span>;
  if (v === "SMS") return <span className="badge badge-warning">📱 SMS</span>;
  return <span className="badge badge-info">📧📱 Both</span>;
};

function CountCard({ icon: Icon, label, value, color }) {
  return (
    <div
      className="card"
      style={{ display: "flex", alignItems: "center", gap: "1rem" }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          background: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={18} color="white" />
      </div>
      <div>
        <p
          style={{
            fontSize: "1.4rem",
            fontWeight: 800,
            color: "var(--text-primary)",
            fontFamily: "Outfit, sans-serif",
          }}
        >
          {value}
        </p>
        <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
          {label}
        </p>
      </div>
    </div>
  );
}

export default function TokenManagement() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [list, setList] = useState(tokens);
  const [copied, setCopied] = useState("");

  const displayed = list.filter((t) => {
    const q = search.toLowerCase();
    const matchQ =
      !q ||
      t.studentName.toLowerCase().includes(q) ||
      String(t.urn).includes(q);
    const matchF = filter === "All" || t.status === filter;
    return matchQ && matchF;
  });

  const revoke = (id) =>
    setList((prev) =>
      prev.map((t) =>
        t._id === id ? { ...t, status: "Expired", isExpired: true } : t,
      ),
    );

  const copyLink = (token) => {
    const link = `https://acadalert.edu/dashboard?token=${token}`;
    navigator.clipboard.writeText(link).catch(() => {});
    setCopied(token);
    setTimeout(() => setCopied(""), 2000);
  };

  const activeCount = list.filter((t) => t.status === "Active").length;
  const usedCount = list.filter((t) => t.status === "Used").length;
  const expiredCount = list.filter((t) => t.status === "Expired").length;

  return (
    <div className="fade-in">
      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "0.85rem",
          marginBottom: "1.5rem",
        }}
      >
        <CountCard
          icon={KeyRound}
          label="Total Tokens"
          value={list.length}
          color="linear-gradient(135deg,var(--primary),var(--primary-dark))"
        />
        <CountCard
          icon={CheckCircle}
          label="Active"
          value={activeCount}
          color="linear-gradient(135deg,var(--success),#059669)"
        />
        <CountCard
          icon={Eye}
          label="Used"
          value={usedCount}
          color="linear-gradient(135deg,var(--accent),var(--accent-dark))"
        />
        <CountCard
          icon={Clock}
          label="Expired"
          value={expiredCount}
          color="linear-gradient(135deg,var(--danger),#b91c1c)"
        />
      </div>

      {/* Filter Row */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          marginBottom: "1.25rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative", flex: "1 1 200px" }}>
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
            placeholder="Search by name or URN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: "2.2rem" }}
          />
        </div>
        <div style={{ display: "flex", gap: "0.4rem" }}>
          {["All", "Active", "Used", "Expired"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={filter === f ? "btn-primary" : "btn-ghost"}
              style={{ fontSize: "0.78rem" }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>URN</th>
                <th>Token (partial)</th>
                <th>Sent Via</th>
                <th>Created</th>
                <th>Expires</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map((tok) => (
                <tr key={tok._id}>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.55rem",
                      }}
                    >
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "7px",
                          background: `linear-gradient(135deg, hsl(${(tok.urn * 47) % 360},60%,40%), hsl(${(tok.urn * 47 + 40) % 360},70%,35%))`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "white",
                          flexShrink: 0,
                        }}
                      >
                        {tok.studentName[0]}
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "0.83rem",
                            fontWeight: 600,
                            color: "var(--text-primary)",
                          }}
                        >
                          {tok.studentName}
                        </p>
                        <p
                          style={{
                            fontSize: "0.68rem",
                            color: "var(--text-muted)",
                          }}
                        >
                          {tok.parentEmail}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td
                    style={{
                      fontFamily: "monospace",
                      color: "var(--primary-light)",
                      fontSize: "0.8rem",
                    }}
                  >
                    {tok.urn}
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <code
                        style={{
                          fontSize: "0.72rem",
                          color: "var(--text-secondary)",
                          background: "var(--bg-elevated)",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "5px",
                        }}
                      >
                        {tok.token.slice(0, 12)}…
                      </code>
                      <button
                        className="btn-icon"
                        style={{ width: "26px", height: "26px" }}
                        onClick={() => copyLink(tok.token)}
                        title="Copy link"
                      >
                        {copied === tok.token ? (
                          <CheckCircle
                            size={11}
                            style={{ color: "var(--success)" }}
                          />
                        ) : (
                          <Copy size={11} />
                        )}
                      </button>
                    </div>
                  </td>
                  <td>{viaBadge(tok.sentVia)}</td>
                  <td
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {new Date(tok.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td
                    style={{
                      fontSize: "0.78rem",
                      color: tok.isExpired
                        ? "var(--danger-light)"
                        : "var(--success)",
                    }}
                  >
                    {new Date(tok.expiresAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>{statusBadge(tok.status)}</td>
                  <td>
                    <div style={{ display: "flex", gap: "0.4rem" }}>
                      {tok.status === "Active" && (
                        <button
                          className="btn-danger"
                          onClick={() => revoke(tok._id)}
                        >
                          <Trash2 size={11} /> Revoke
                        </button>
                      )}
                      {tok.status === "Expired" && (
                        <button className="btn-success">
                          <RotateCcw size={11} /> Resend
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {displayed.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    style={{
                      textAlign: "center",
                      padding: "2.5rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    No tokens match your filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Note */}
      <div
        style={{
          marginTop: "1.25rem",
          background: "rgba(99,102,241,0.06)",
          border: "1px solid rgba(99,102,241,0.15)",
          borderRadius: "12px",
          padding: "0.9rem 1.1rem",
          display: "flex",
          alignItems: "flex-start",
          gap: "0.6rem",
        }}
      >
        <AlertTriangle
          size={15}
          style={{
            color: "var(--primary-light)",
            flexShrink: 0,
            marginTop: "1px",
          }}
        />
        <p
          style={{
            fontSize: "0.78rem",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
          }}
        >
          Tokens are generated using cryptographically secure random bytes. Once
          a token is marked as <strong>Used</strong>, it cannot be reused.
          Expired tokens are automatically invalidated on the server side.
          Revoking an Active token immediately invalidates the link.
        </p>
      </div>
    </div>
  );
}
