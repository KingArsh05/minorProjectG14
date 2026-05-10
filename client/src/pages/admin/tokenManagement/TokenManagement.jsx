import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  KeyRound,
  Search,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Clock3,
  Users,
  Eye,
  Loader2,
  AlertTriangle,
} from "lucide-react";

export default function TokenManagement() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [copied, setCopied] = useState("");
  const [deleting, setDeleting] = useState("");

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/tokens`, {
          withCredentials: true,
        });

        if (data.success) {
          setTokens(data.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch tokens", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, [API_URL]);

  const getTokenStatus = (token) => {
    const expired = new Date(token.expiresAt) < new Date();

    if (expired) return "Expired";

    if (token.usedCount >= token.accessLimit) {
      return "Completed";
    }

    return "Active";
  };

  const filteredTokens = useMemo(() => {
    return tokens.filter((token) => {
      const q = search.toLowerCase();

      const studentId = token.studentId || {};

      const matchesSearch =
        !q ||
        studentId.fullName?.toLowerCase().includes(q) ||
        String(studentId.urn || "").includes(q);

      const status = getTokenStatus(token);

      const matchesFilter = filter === "All" ? true : status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [tokens, search, filter]);

  const stats = {
    total: tokens.length,

    active: tokens.filter((t) => getTokenStatus(t) === "Active").length,

    completed: tokens.filter((t) => getTokenStatus(t) === "Completed").length,

    expired: tokens.filter((t) => getTokenStatus(t) === "Expired").length,
  };

  const copyLink = async (token) => {
    try {
      const url = `${window.location.origin}/guardian?token=${token}`;

      await navigator.clipboard.writeText(url);

      setCopied(token);

      setTimeout(() => {
        setCopied("");
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteToken = async (id) => {
    try {
      setDeleting(id);

      await axios.delete(`${API_URL}/tokens/delete/${id}`, {
        withCredentials: true,
      });

      setTokens((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting("");
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRemainingTime = (date) => {
    const diff = new Date(date) - new Date();

    if (diff <= 0) return "Expired";

    const hours = Math.floor(diff / (1000 * 60 * 60));

    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} left`;
    }

    return `${hours} hour${hours > 1 ? "s" : ""} left`;
  };

  const StatusBadge = ({ status }) => {
    if (status === "Active") {
      return (
        <div className="inline-flex items-center gap-2 rounded-full border border-[#1f3a2f] bg-[#15222c] px-3 py-1 text-[0.72rem] font-medium text-[#4ade80]">
          <div className="h-2 w-2 rounded-full bg-[#4ade80]" />
          Active
        </div>
      );
    }

    if (status === "Completed") {
      return (
        <div className="inline-flex items-center gap-2 rounded-full border border-[#233347] bg-[#182433] px-3 py-1 text-[0.72rem] font-medium text-[#60a5fa]">
          <div className="h-2 w-2 rounded-full bg-[#60a5fa]" />
          Completed
        </div>
      );
    }

    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-[#40252d] bg-[#2a1d22] px-3 py-1 text-[0.72rem] font-medium text-[#f87171]">
        <div className="h-2 w-2 rounded-full bg-[#f87171]" />
        Expired
      </div>
    );
  };

  return (
    <div className="space-y-5 fade-in">
      {/* Header */}

      <div>
        <h1 className="text-[1.8rem] font-bold text-white font-outfit">
          Token Management
        </h1>

        <p className="text-[#68708f] text-[0.92rem] mt-1">
          Monitor guardian access tokens and activity
        </p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            title: "Issued Tokens",
            value: stats.total,
            icon: KeyRound,
          },

          {
            title: "Currently Active",
            value: stats.active,
            icon: ShieldCheck,
          },

          {
            title: "Access Completed",
            value: stats.completed,
            icon: Eye,
          },

          {
            title: "Expired",
            value: stats.expired,
            icon: Clock3,
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-[28px] border border-[#1d2335] bg-[#10131d] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.18)]"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm block mb-2 text-[#5e6787] font-semibold">
                  {card.title}
                </p>

                <h2 className="text-[2rem] font-bold text-white">
                  {loading ? (
                    <div className="h-8 w-14 rounded-lg bg-[#1b2031] animate-pulse" />
                  ) : (
                    card.value
                  )}
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#2b3350] bg-[#1b2031]">
                <card.icon size={20} className="text-[#818cf8]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}

      <div className="rounded-[30px] border border-[#1d2335] bg-[#10131d] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col xl:flex-row gap-4">
          {/* Search */}

          <div className="group flex-1 overflow-hidden rounded-2xl border border-[#1d2335] bg-[#141824] focus-within:border-[#6366f1] transition-all">
            <div className="flex items-center gap-4 px-5 h-[56px]">
              <Search size={19} className="text-[#68708f]" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by student name or URN..."
                className="w-full bg-transparent outline-none text-white placeholder:text-[#68708f]"
              />
            </div>
          </div>

          {/* Filters */}

          <div className="flex items-center gap-2 overflow-x-auto">
            {["All", "Active", "Completed", "Expired"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`h-[56px] px-4 rounded-2xl border whitespace-nowrap transition-all text-[0.9rem] font-medium
                  
                  ${
                    filter === f
                      ? "border-[#6366f1] bg-[#6366f1] text-white"
                      : "border-[#1d2335] bg-[#141824] text-[#8b93b2] hover:border-[#2f3650]"
                  }
                `}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading */}

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 size={28} className="animate-spin text-[#6366f1]" />
        </div>
      ) : filteredTokens.length === 0 ? (
        <div className="rounded-[32px] border border-[#1d2335] bg-[#10131d] p-14 text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[28px] border border-[#1d2335] bg-[#141824]">
            <AlertTriangle size={32} className="text-[#68708f]" />
          </div>

          <h2 className="text-[1.15rem] font-semibold text-white mb-2">
            No Tokens Found
          </h2>

          <p className="text-[#68708f] text-[0.92rem]">
            No matching guardian access tokens available.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
          {filteredTokens.map((token) => {
            const student = token.studentId || {};

            const status = getTokenStatus(token);

            return (
              <div
                key={token._id}
                className="rounded-[30px] border border-[#1d2335] bg-[#10131d] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.18)] transition-all hover:border-[#2d3550]"
              >
                {/* Top */}

                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-[#1a1f33] border border-[#2a3047] text-white text-[1rem] font-semibold">
                      {student.fullName?.[0] || "?"}
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate text-[1rem] font-semibold text-white">
                        {student.fullName}
                      </h2>

                      <div className="mt-2 flex items-center gap-2 flex-wrap">
                        <span className="rounded-full border border-[#23293f] bg-[#141824] px-3 py-1 text-[0.72rem] text-[#8b93b2]">
                          URN {student.urn}
                        </span>

                        <span className="rounded-full border border-[#23293f] bg-[#141824] px-3 py-1 text-[0.72rem] text-[#8b93b2]">
                          {token.usedCount}/{token.accessLimit} Access
                        </span>
                      </div>
                    </div>
                  </div>

                  <StatusBadge status={status} />
                </div>

                {/* Token */}

                <div className="rounded-[24px] border border-[#20253b] bg-[#141824] p-5 mb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm block mb-2 text-[#5e6787] font-semibold">
                        Secure Token
                      </p>

                      <code className="block truncate text-[0.82rem] text-[#c7d0f5]">
                        {token.token}
                      </code>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => copyLink(token.token)}
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#23293f] bg-[#181c2b] hover:border-[#6366f1] transition-all"
                      >
                        {copied === token.token ? (
                          <Check size={17} className="text-emerald-400" />
                        ) : (
                          <Copy size={17} className="text-[#9ba2c0]" />
                        )}
                      </button>

                      <a
                        href={`/guardian?token=${token.token}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#23293f] bg-[#181c2b] hover:border-[#6366f1] transition-all"
                      >
                        <ExternalLink size={17} className="text-[#9ba2c0]" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Bottom Cards */}

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="rounded-[22px] border border-[#20253b] bg-[#141824] p-4">
                    <p className="text-sm block mb-2 text-[#5e6787] font-semibold">
                      Access Type
                    </p>

                    <div className="flex items-center gap-2 text-white font-medium">
                      <Users size={15} className="text-[#818cf8]" />
                      {token.limitsLeft} Time Access
                    </div>
                  </div>

                  <div className="rounded-[22px] border border-[#20253b] bg-[#141824] p-4">
                    <p className="text-sm block mb-2 text-[#5e6787] font-semibold">
                      Expires
                    </p>

                    <div className="text-white font-medium">
                      {getRemainingTime(token.expiresAt)}
                    </div>

                    <p className="text-[0.72rem] text-[#68708f] mt-1">
                      {formatDate(token.expiresAt)}
                    </p>
                  </div>
                </div>

                {/* Footer */}

                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-sm block mb-2 text-[#5e6787] font-semibold">
                      Created
                    </p>

                    <p className="text-[0.84rem] text-[#c7d0f5]">
                      {formatDate(token.createdAt)}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteToken(token._id)}
                    disabled={deleting === token._id}
                    className="inline-flex h-[46px] items-center gap-2 rounded-2xl border border-[#2b3045] bg-[#181c2b] px-5 text-[0.88rem] font-medium text-[#9ba2c0] transition-all hover:border-red-500/30 hover:text-red-400"
                  >
                    {deleting === token._id ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        Removing...
                      </>
                    ) : (
                      <>
                        <Trash2 size={15} />
                        Delete Token
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer */}

      <div className="rounded-[28px] border border-[#1d2335] bg-[#10131d] p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#23293f] bg-[#141824]">
            <ShieldCheck size={19} className="text-[#818cf8]" />
          </div>

          <div>
            <h3 className="text-white font-semibold mb-2">
              Guardian Access Security
            </h3>

            <p className="text-[0.88rem] leading-relaxed text-[#8b93b2]">
              All guardian links use cryptographically secure tokens with
              configurable access limits and automatic expiry using MongoDB TTL
              indexes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
