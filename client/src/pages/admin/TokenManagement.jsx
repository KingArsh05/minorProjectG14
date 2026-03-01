import { useState, useEffect } from "react";
import {
  KeyRound,
  Trash2,
  RotateCcw,
  CheckCircle,
  Clock,
  Search,
  Eye,
  Copy,
  Inbox,
  Loader2,
  ExternalLink,
} from "lucide-react";

const statusBadge = (s) => {
  if (s === "Active")
    return (
      <span className="inline-flex items-center gap-1 px-[0.65rem] py-[0.2rem] rounded-full text-[0.72rem] font-semibold bg-[rgba(16,185,129,0.15)] text-[#34d399] border border-[rgba(16,185,129,0.25)] uppercase">
        <CheckCircle size={9} /> Active
      </span>
    );
  if (s === "Used")
    return (
      <span className="inline-flex items-center gap-1 px-[0.65rem] py-[0.2rem] rounded-full text-[0.72rem] font-semibold bg-[rgba(6,182,212,0.15)] text-[#22d3ee] border border-[rgba(6,182,212,0.25)] uppercase">
        <Eye size={9} /> Used
      </span>
    );
  if (s === "Expired")
    return (
      <span className="inline-flex items-center gap-1 px-[0.65rem] py-[0.2rem] rounded-full text-[0.72rem] font-semibold bg-[rgba(239,68,68,0.15)] text-[#f87171] border border-[rgba(239,68,68,0.25)] uppercase">
        <Clock size={9} /> Expired
      </span>
    );
  return null;
};

const viaBadge = (v) => {
  if (v === "Email")
    return (
      <span className="inline-flex px-[0.65rem] py-[0.2rem] rounded-full text-[0.72rem] font-semibold bg-[rgba(99,102,241,0.15)] text-[#818cf8] border border-[rgba(99,102,241,0.25)]">
        📧 Email
      </span>
    );
  if (v === "SMS")
    return (
      <span className="inline-flex px-[0.65rem] py-[0.2rem] rounded-full text-[0.72rem] font-semibold bg-[rgba(245,158,11,0.15)] text-[#fbbf24] border border-[rgba(245,158,11,0.25)]">
        📱 SMS
      </span>
    );
  return (
    <span className="inline-flex px-[0.65rem] py-[0.2rem] rounded-full text-[0.72rem] font-semibold bg-[rgba(6,182,212,0.15)] text-[#22d3ee] border border-[rgba(6,182,212,0.25)]">
      📧📱 Both
    </span>
  );
};

export default function TokenManagement() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const res = await fetch("/api/tokens");
        const json = await res.json();
        if (res.ok) setList(json.data || []);
      } catch (err) {
        console.error("Failed to load tokens:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTokens();
  }, []);

  const displayed = list.filter((t) => {
    const q = search.toLowerCase();
    const name = t.student?.fullName || "";
    const urn = String(t.student?.urn || "");
    return (
      (!q || name.toLowerCase().includes(q) || urn.includes(q)) &&
      (filter === "All" || t.status === filter)
    );
  });

  const revoke = async (id) => {
    try {
      const res = await fetch(`/api/tokens/${id}/revoke`, { method: "PATCH" });
      if (res.ok) {
        setList((p) =>
          p.map((t) => (t._id === id ? { ...t, status: "Expired" } : t)),
        );
      }
    } catch (err) {
      console.error("Failed to revoke:", err);
    }
  };

  const copyLink = (tok) => {
    const url = `${window.location.origin}/guardian?token=${tok}`;
    navigator.clipboard.writeText(url).catch(() => {});
    setCopied(tok);
    setTimeout(() => setCopied(""), 2000);
  };

  const counts = {
    Active: list.filter((t) => t.status === "Active").length,
    Used: list.filter((t) => t.status === "Used").length,
    Expired: list.filter((t) => t.status === "Expired").length,
  };
  const avatarGrad = (urn) =>
    `linear-gradient(135deg, hsl(${(urn * 47) % 360},60%,38%), hsl(${(urn * 47 + 40) % 360},65%,32%))`;

  return (
    <div className="fade-in">
      {/* Stats */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 mb-6">
        {[
          {
            icon: KeyRound,
            label: "Total Tokens",
            val: list.length,
            grad: "from-[#6366f1] to-[#4f46e5]",
          },
          {
            icon: CheckCircle,
            label: "Active",
            val: counts.Active,
            grad: "from-[#10b981] to-[#059669]",
          },
          {
            icon: Eye,
            label: "Used",
            val: counts.Used,
            grad: "from-[#06b6d4] to-[#0891b2]",
          },
          {
            icon: Clock,
            label: "Expired",
            val: counts.Expired,
            grad: "from-[#ef4444] to-[#b91c1c]",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-[#13162b] border border-[#252840] rounded-2xl p-5 flex items-center gap-4 hover:border-[#2e3354] transition-colors"
          >
            <div
              className={`w-10 h-10 rounded-xl bg-linear-to-br ${s.grad} flex items-center justify-center shrink-0`}
            >
              <s.icon size={18} className="text-white" />
            </div>
            <div>
              <p
                className="text-[1.4rem] font-extrabold text-[#f0f1fa]"
                style={{ fontFamily: "Outfit,sans-serif" }}
              >
                {loading ? (
                  <span className="inline-block w-8 h-6 bg-[#252840] rounded animate-pulse" />
                ) : (
                  s.val
                )}
              </p>
              <p className="text-[0.72rem] text-[#5c6385]">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap gap-3 mb-5 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c6385]"
          />
          <input
            className="w-full bg-[#161925] border border-[#252840] text-[#f0f1fa] pl-9 pr-4 py-[0.65rem] rounded-xl text-sm outline-none focus:border-[#6366f1] placeholder:text-[#5c6385]"
            placeholder="Search by name or URN…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-1">
          {["All", "Active", "Used", "Expired"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-lg text-[0.8rem] font-medium cursor-pointer transition-all border ${f === filter ? "bg-linear-to-br from-[#6366f1] to-[#4f46e5] text-white border-[#6366f1]" : "text-[#9ba2c0] border-[#252840] bg-transparent hover:border-[#6366f1] hover:text-[#818cf8]"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table or Empty or Loading */}
      <div className="bg-[#13162b] border border-[#252840] rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={24} className="animate-spin text-[#5c6385]" />
          </div>
        ) : list.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-[rgba(99,102,241,0.1)] flex items-center justify-center mx-auto mb-4">
              <Inbox size={28} className="text-[#5c6385]" />
            </div>
            <p className="text-[#5c6385] text-[0.9rem] font-semibold mb-1">
              No tokens generated yet
            </p>
            <p className="text-[#5c6385] text-[0.78rem]">
              Send notifications to parents to generate access tokens.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table
              className="w-full"
              style={{ borderCollapse: "separate", borderSpacing: 0 }}
            >
              <thead>
                <tr>
                  {[
                    "Student",
                    "URN",
                    "Token",
                    "Sent Via",
                    "Created",
                    "Expires",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="bg-[#161925] text-[#5c6385] text-[0.72rem] font-semibold tracking-widest uppercase px-4 py-[0.85rem] text-left border-b border-[#252840]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayed.map((tok) => {
                  const stu = tok.student || {};
                  return (
                    <tr
                      key={tok._id}
                      className="border-b border-[#252840] hover:bg-[#1e2132] transition-colors"
                    >
                      <td className="px-4 py-[0.85rem]">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-[0.78rem] font-bold text-white"
                            style={{ background: avatarGrad(stu.urn || 0) }}
                          >
                            {stu.fullName?.[0] || "?"}
                          </div>
                          <p className="text-[0.83rem] font-semibold text-[#f0f1fa]">
                            {stu.fullName || "Unknown"}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-[0.85rem] font-mono text-[#818cf8] text-[0.8rem]">
                        {stu.urn || "—"}
                      </td>
                      <td className="px-4 py-[0.85rem]">
                        <div className="flex items-center gap-2">
                          <code className="text-[0.72rem] text-[#9ba2c0] bg-[#161925] px-2 py-[0.2rem] rounded-md">
                            {tok.token.slice(0, 12)}…
                          </code>
                          <button
                            onClick={() => copyLink(tok.token)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#1e2132] border border-[#252840] cursor-pointer hover:border-[#6366f1] transition-all"
                            title="Copy guardian link"
                          >
                            {copied === tok.token ? (
                              <CheckCircle size={11} color="#10b981" />
                            ) : (
                              <Copy size={11} className="text-[#9ba2c0]" />
                            )}
                          </button>
                          <a
                            href={`/guardian?token=${tok.token}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#1e2132] border border-[#252840] cursor-pointer hover:border-[#6366f1] transition-all"
                            title="Open guardian link"
                          >
                            <ExternalLink
                              size={11}
                              className="text-[#9ba2c0]"
                            />
                          </a>
                        </div>
                      </td>
                      <td className="px-4 py-[0.85rem]">
                        {viaBadge(tok.sentVia)}
                      </td>
                      <td className="px-4 py-[0.85rem] text-[0.78rem] text-[#9ba2c0] whitespace-nowrap">
                        {new Date(tok.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td
                        className="px-4 py-[0.85rem] text-[0.78rem] whitespace-nowrap"
                        style={{
                          color:
                            tok.status === "Expired" ||
                            new Date(tok.expiresAt) < new Date()
                              ? "#f87171"
                              : "#34d399",
                        }}
                      >
                        {new Date(tok.expiresAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-4 py-[0.85rem]">
                        {statusBadge(tok.status)}
                      </td>
                      <td className="px-4 py-[0.85rem]">
                        {tok.status === "Active" && (
                          <button
                            onClick={() => revoke(tok._id)}
                            className="inline-flex items-center gap-1 px-3 py-[0.4rem] rounded-lg text-white text-[0.78rem] font-semibold bg-linear-to-br from-[#ef4444] to-[#b91c1c] hover:opacity-90 hover:-translate-y-px transition-all cursor-pointer"
                          >
                            <Trash2 size={11} /> Revoke
                          </button>
                        )}
                        {tok.status === "Expired" && (
                          <button className="inline-flex items-center gap-1 px-3 py-[0.4rem] rounded-lg text-white text-[0.78rem] font-semibold bg-linear-to-br from-[#10b981] to-[#059669] hover:opacity-90 hover:-translate-y-px transition-all cursor-pointer">
                            <RotateCcw size={11} /> Resend
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {displayed.length === 0 && list.length > 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="text-center py-10 text-[#5c6385]"
                    >
                      No tokens match your filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Note */}
      <div className="mt-4 bg-[rgba(99,102,241,0.06)] border border-[rgba(99,102,241,0.15)] rounded-xl p-4 flex items-start gap-3">
        <KeyRound size={15} className="text-[#818cf8] shrink-0 mt-px" />
        <p className="text-[0.78rem] text-[#9ba2c0] leading-relaxed">
          Tokens use cryptographically secure random bytes. Once{" "}
          <strong>Used</strong>, they cannot be reused. Revoking an Active token
          immediately invalidates the link.
        </p>
      </div>
    </div>
  );
}
