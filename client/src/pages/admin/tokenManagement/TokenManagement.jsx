import { useEffect, useMemo, useState, useRef } from "react";
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
import { useTheme } from "../../../context/ThemeContext";
import CustomSelect from "../../../components/CustomSelect";


export default function TokenManagement() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { darkMode } = useTheme();

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
    if (token.limitsLeft <= 0) {
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
        <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.72rem] font-semibold ${
          darkMode ? "border-[#1f3a2f] bg-[#15222c] text-[#4ade80]" : "border-emerald-200 bg-emerald-50 text-emerald-600"
        }`}>
          <div className="h-2 w-2 rounded-full bg-[#4ade80]" />
          Active
        </div>
      );
    }

    if (status === "Completed") {
      return (
        <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.72rem] font-semibold ${
          darkMode ? "border-[#233347] bg-[#182433] text-[#60a5fa]" : "border-blue-200 bg-blue-50 text-blue-600"
        }`}>
          <div className="h-2 w-2 rounded-full bg-[#60a5fa]" />
          Completed
        </div>
      );
    }

    return (
      <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.72rem] font-semibold ${
        darkMode ? "border-[#40252d] bg-[#2a1d22] text-[#f87171]" : "border-red-200 bg-red-50 text-red-600"
      }`}>
        <div className="h-2 w-2 rounded-full bg-[#f87171]" />
        Expired
      </div>
    );
  };

  return (
    <div className="space-y-5 fade-in text-slate-800 dark:text-white">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {[
          {
            title: "Issued Tokens",
            value: stats.total,
            icon: KeyRound,
            subtitle: "Total generated secure links",
          },
          {
            title: "Currently Active",
            value: stats.active,
            icon: ShieldCheck,
            subtitle: "Accessible guardian sessions",
          },
          {
            title: "Access Completed",
            value: stats.completed,
            icon: Eye,
            subtitle: "Usage limit reached",
          },
          {
            title: "Expired",
            value: stats.expired,
            icon: Clock3,
            subtitle: "Automatically invalidated",
          },
        ].map((card) => (
          <div
            key={card.title}
            className={`group relative overflow-hidden rounded-3xl border px-4 py-3 ${
              darkMode ? "border-[#1d2335] bg-[#10131d]" : "border-indigo-50 bg-white shadow-sm"
            }`}
          >
            {/* Glow */}
            <div className="absolute top-0 right-0 w-[140px] h-[140px] bg-[#6366f1]/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />

            {/* Top Border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#818cf8]/30 to-transparent" />

            <div className="relative flex items-start justify-between max-h-20">
              <div>
                <p className={`text-xs font-bold mb-2 ${darkMode ? "text-[#68708f]" : "text-slate-400"}`}>
                  {card.title}
                </p>

                <h2 className={`text-3xl leading-none font-bold tracking-tight ${darkMode ? "text-white" : "text-slate-800"}`}>
                  {loading ? (
                    <div className={`w-7 h-7 rounded-xl animate-pulse ${darkMode ? "bg-[#1b2031]" : "bg-slate-100"}`} />
                  ) : (
                    card.value
                  )}
                </h2>

                <p className={`text-[12px] mt-2 leading-relaxed max-w-[180px] ${darkMode ? "text-[#7d86a7]" : "text-slate-400"}`}>
                  {card.subtitle}
                </p>
              </div>

              {/* Right Icon */}
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-2xl bg-[#6366f1]/10 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className={`relative flex h-[56px] w-[56px] md:h-[60px] md:w-[60px] xl:h-[72px] xl:w-[72px] items-center justify-center rounded-[24px] border ${
                  darkMode 
                    ? "border-[#2a3047] bg-[#181c2b] group-hover:border-[#3b4261]" 
                    : "border-slate-200 bg-slate-50 group-hover:border-slate-300"
                }`}>
                  <card.icon size={28} className="text-[#818cf8]" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className={`rounded-3xl border p-2 shadow-sm ${
        darkMode ? "border-[#1d2335] bg-[#10131d]" : "border-indigo-100 bg-white"
      }`}>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className={`group flex-1 overflow-hidden rounded-2xl border ${
            darkMode ? "border-[#1d2335] bg-[#141824] focus-within:border-[#6366f1]" : "border-slate-200 bg-slate-50 focus-within:border-[#6366f1]"
          }`}>
            <div className="flex items-center gap-4 px-5 h-12">
              <Search size={19} className="text-[#68708f]" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by student name or URN..."
                className={`w-full bg-transparent outline-none ${
                  darkMode ? "text-white placeholder:text-[#68708f]" : "text-slate-800 placeholder:text-slate-400"
                }`}
              />
            </div>
          </div>

          {/* Filters Dropdown */}
          <div className="w-full md:w-48">
            <CustomSelect
              value={filter}
              onChange={setFilter}
              options={["All", "Active", "Completed", "Expired"]}
              className="h-[48px] rounded-2xl text-xs"
            />
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-24 h-[40vh]">
          <Loader2 size={28} className="animate-spin text-[#6366f1]" />
        </div>
      ) : filteredTokens.length === 0 ? (
        <div className={`rounded-3xl h-[40vh] flex flex-col justify-center items-center border p-14 text-center ${
          darkMode ? "border-[#1d2335] bg-[#10131d]" : "border-indigo-100 bg-white shadow-sm"
        }`}>
          <div className={`mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[28px] border ${
            darkMode ? "border-[#1d2335] bg-[#141824]" : "border-slate-200 bg-slate-50"
          }`}>
            <AlertTriangle size={32} className="text-[#68708f]" />
          </div>

          <h2 className={`text-[1.15rem] font-bold mb-2 ${darkMode ? "text-white" : "text-slate-800"}`}>
            No Tokens Found
          </h2>

          <p className={`text-sm ${darkMode ? "text-[#68708f]" : "text-slate-400"}`}>
            No matching guardian access tokens available.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto custom-scrollbar mb-2 pr-1">
          {filteredTokens.map((token) => {
            const student = token.studentId || {};
            const status = getTokenStatus(token);

            return (
              <div
                key={token._id}
                className={`rounded-[30px] border p-5 shadow-sm hover:shadow-md ${
                  darkMode 
                    ? "border-[#1d2335] bg-[#10131d] hover:border-[#2d3550]" 
                    : "border-slate-100 bg-slate-50 hover:border-indigo-100"
                }`}
              >
                {/* Top */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] border text-[1rem] font-bold shadow-inner ${
                      darkMode ? "border-[#2a3047] bg-[#1a1f33] text-white" : "border-slate-200 bg-slate-100 text-slate-700"
                    }`}>
                      {student.fullName?.[0] || "?"}
                    </div>

                    <div className="min-w-0">
                      <h2 className={`truncate text-[1rem] font-bold ${darkMode ? "text-white" : "text-slate-800"}`}>
                        {student.fullName}
                      </h2>

                      <div className="mt-2 flex items-center gap-2 flex-wrap">
                        <span className={`rounded-full border px-3 py-1 text-[0.72rem] font-semibold ${
                          darkMode ? "border-[#23293f] bg-[#141824] text-[#8b93b2]" : "border-slate-200 bg-white text-slate-500 shadow-xs"
                        }`}>
                          URN {student.urn}
                        </span>

                        <span className={`rounded-full border px-3 py-1 text-[0.72rem] font-semibold ${
                          darkMode ? "border-[#23293f] bg-[#141824] text-[#8b93b2]" : "border-slate-200 bg-white text-slate-500 shadow-xs"
                        }`}>
                          {token.limitsLeft} Time(s) Access Left
                        </span>
                      </div>
                    </div>
                  </div>

                  <StatusBadge status={status} />
                </div>

                {/* Token */}
                <div className={`rounded-[24px] border p-5 mb-4 ${
                  darkMode ? "border-[#20253b] bg-[#141824]" : "border-slate-200 bg-white"
                }`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className={`text-xs block mb-2 font-bold ${darkMode ? "text-[#5e6787]" : "text-slate-400"}`}>
                        Secure Token
                      </p>

                      <code className={`block truncate text-[0.82rem] font-semibold ${darkMode ? "text-[#c7d0f5]" : "text-slate-700"}`}>
                        {token.token}
                      </code>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => copyLink(token.token)}
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl border cursor-pointer ${
                          darkMode 
                            ? "border-[#23293f] bg-[#181c2b] hover:border-[#6366f1]" 
                            : "border-slate-200 bg-slate-50 hover:border-slate-300"
                        }`}
                        title="Copy Guardian Link"
                      >
                        {copied === token.token ? (
                          <Check size={17} className="text-emerald-400" />
                        ) : (
                          <Copy size={17} className={darkMode ? "text-[#9ba2c0]" : "text-slate-500"} />
                        )}
                      </button>

                      <a
                        href={`/guardian?token=${token.token}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${
                          darkMode 
                            ? "border-[#23293f] bg-[#181c2b] hover:border-[#6366f1]" 
                            : "border-slate-200 bg-slate-50 hover:border-slate-300"
                        }`}
                        title="Open Link"
                      >
                        <ExternalLink size={17} className={darkMode ? "text-[#9ba2c0]" : "text-slate-500"} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Bottom Cards */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className={`rounded-[22px] border p-4 ${
                    darkMode ? "border-[#20253b] bg-[#141824]" : "border-slate-200 bg-white"
                  }`}>
                    <p className={`text-xs block mb-2 font-bold ${darkMode ? "text-[#5e6787]" : "text-slate-400"}`}>
                      Access Type
                    </p>

                    <div className={`flex items-center gap-2 font-bold text-[0.88rem] ${darkMode ? "text-white" : "text-slate-800"}`}>
                      <Users size={15} className="text-[#818cf8]" />
                      {token.limitsLeft} Time Access
                    </div>
                  </div>

                  <div className={`rounded-[22px] border p-4 ${
                    darkMode ? "border-[#20253b] bg-[#141824]" : "border-slate-200 bg-white"
                  }`}>
                    <p className={`text-xs block mb-2 font-bold ${darkMode ? "text-[#5e6787]" : "text-slate-400"}`}>
                      Expires
                    </p>

                    <div className={`font-bold text-[0.88rem] ${darkMode ? "text-white" : "text-slate-800"}`}>
                      {getRemainingTime(token.expiresAt)}
                    </div>

                    <p className={`text-[0.72rem] mt-1 ${darkMode ? "text-[#68708f]" : "text-slate-400 font-semibold"}`}>
                      {formatDate(token.expiresAt)}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <p className={`text-xs block mb-1 font-bold ${darkMode ? "text-[#5e6787]" : "text-slate-400"}`}>
                      Created
                    </p>

                    <p className={`text-[0.84rem] font-semibold ${darkMode ? "text-[#c7d0f5]" : "text-slate-600"}`}>
                      {formatDate(token.createdAt)}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteToken(token._id)}
                    disabled={deleting === token._id}
                    className={`inline-flex h-[46px] items-center gap-2 rounded-2xl border px-5 text-[0.88rem] font-bold transition-all cursor-pointer ${
                      darkMode 
                        ? "border-[#2b3045] bg-[#181c2b] text-[#9ba2c0] hover:border-red-500/30 hover:text-red-400" 
                        : "border-slate-200 bg-white text-slate-500 hover:border-red-200 hover:text-red-500 hover:bg-red-50/20"
                    }`}
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

      {/* Security Footer */}
      <div className={`rounded-3xl border mt-4 p-4 ${
        darkMode ? "border-[#1d2335] bg-[#10131d]" : "border-indigo-100 bg-white shadow-sm"
      }`}>
        <div className="flex items-start gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${
            darkMode ? "border-[#23293f] bg-[#141824]" : "border-slate-200 bg-slate-50 shadow-xs"
          }`}>
            <ShieldCheck size={19} className="text-[#818cf8]" />
          </div>

          <div>
            <h3 className={`font-bold mb-2 ${darkMode ? "text-white" : "text-slate-800"}`}>
              Guardian Access Security
            </h3>

            <p className={`text-xs md:text-sm leading-relaxed ${darkMode ? "text-[#8b93b2]" : "text-slate-500"}`}>
              All guardian links use cryptographically secure tokens with configurable access limits and automatic expiry using MongoDB TTL indexes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
