import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Search,
  LayoutGrid,
  List,
  Filter,
  AlertTriangle,
  ChevronRight,
  Loader2,
  Users,
  GraduationCap,
  BarChart3,
  SearchX,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import CustomSelect from "../../../components/CustomSelect";


const SkeletonCard = () => {
  const { darkMode } = useTheme();
  return (
    <div className={`rounded-[30px] border p-5 animate-pulse ${
      darkMode ? "border-[#1d2335] bg-[#10131d]" : "border-slate-100 bg-slate-50/50"
    }`}>
      <div className="flex items-center gap-4 mb-5">
        <div className={`w-[52px] h-[52px] rounded-2xl ${darkMode ? "bg-[#1a2033] border border-[#2a314d]" : "bg-slate-200 border border-slate-300"}`} />
        <div className="flex-1">
          <div className={`h-4 w-28 rounded-lg mb-2 ${darkMode ? "bg-[#1a2033]" : "bg-slate-200"}`} />
          <div className={`h-3 w-20 rounded-lg ${darkMode ? "bg-[#161b29]" : "bg-slate-200"}`} />
        </div>
      </div>

      <div className="flex gap-2 mb-5">
        <div className={`h-6 w-16 rounded-full ${darkMode ? "bg-[#1a2033]" : "bg-slate-200"}`} />
        <div className={`h-6 w-24 rounded-full ${darkMode ? "bg-[#161b29]" : "bg-slate-200"}`} />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={`h-16 rounded-2xl border ${darkMode ? "bg-[#161b29] border-[#1f2638]" : "bg-slate-100 border-slate-200"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function StudentList() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("All");

  const [viewMode, setViewMode] = useState("grid");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/students`, {
          withCredentials: true,
        });

        if (data.success) {
          setStudents(data.data || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [API_URL]);

  const courses = ["All", ...new Set(students.map((s) => s.course))];

  const filtered = students.filter((s) => {
    const q = search.toLowerCase();

    const matchesSearch =
      !q || s.fullName.toLowerCase().includes(q) || String(s.urn).includes(q);

    const matchesCourse = course === "All" || s.course === course;

    return matchesSearch && matchesCourse;
  });

  const detainedCount = students.filter((s) =>
    s.semesters
      ?.flatMap((x) => x.subjects || [])
      .some((x) => x.status === "Detained"),
  ).length;

  const avgCgpa = students.length
    ? (
        students.reduce((a, s) => a + (s.cgpa || 0), 0) / students.length
      ).toFixed(2)
    : "—";

  return (
    <div className="space-y-5 fade-in text-slate-800 dark:text-white">
      {/* Stats Row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            title: "Total Students",
            value: loading ? "—" : students.length,
            icon: Users,
            color: "#818cf8",
          },
          {
            title: "Detained",
            value: loading ? "—" : detainedCount,
            icon: AlertTriangle,
            color: "#f87171",
          },
          {
            title: "Avg CGPA",
            value: loading ? "—" : avgCgpa,
            icon: BarChart3,
            color: "#22d3ee",
          },
          {
            title: "Courses",
            value: loading ? "—" : new Set(students.map((s) => s.course)).size,
            icon: GraduationCap,
            color: "#fbbf24",
          },
        ].map((card) => (
          <div
            key={card.title}
            className={`group relative overflow-hidden rounded-[30px] border p-5 cursor-pointer ${
              darkMode 
                ? "border-[#1d2335] bg-[#10131d] hover:border-[#2d3550] hover:shadow-[0_12px_35px_rgba(99,102,241,0.06)]" 
                : "border-indigo-50 bg-white hover:border-indigo-100 hover:shadow-[0_8px_30px_rgba(99,102,241,0.04)] shadow-sm"
            }`}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#818cf8]/30 to-transparent" />

            <div className="relative flex items-start justify-between max-h-20">
              <div>
                <p className={`text-xs uppercase tracking-wider font-bold mb-2 ${darkMode ? "text-[#68708f]" : "text-slate-400"}`}>
                  {card.title}
                </p>

                <h2 className={`text-3xl leading-none font-bold tracking-tight ${darkMode ? "text-white" : "text-slate-800"}`}>
                  {loading ? (
                    <div className={`w-7 h-7 rounded-xl animate-pulse ${darkMode ? "bg-[#1b2031]" : "bg-slate-100"}`} />
                  ) : (
                    card.value
                  )}
                </h2>
              </div>

              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-2xl bg-[#6366f1]/10 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className={`relative flex h-[56px] w-[56px] md:h-[60px] md:w-[60px] xl:h-[72px] xl:w-[72px] items-center justify-center rounded-[24px] border ${
                  darkMode 
                    ? "border-[#2a3047] bg-[#181c2b] group-hover:border-[#3b4261]" 
                    : "border-slate-200 bg-slate-50 group-hover:border-slate-300"
                }`}>
                  <card.icon size={28} style={{ color: card.color }} />
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
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="group relative flex-1">
            <Search
              size={19}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-[#697292] group-focus-within:text-[#818cf8]"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or URN..."
              className={`w-full h-[56px] rounded-2xl border pl-13 pr-5 outline-none ${
                darkMode 
                  ? "border-[#1d2335] bg-[#161b29] text-white placeholder:text-[#697292] focus:border-[#6366f1]" 
                  : "border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:border-[#6366f1]"
              }`}
            />
          </div>

          {/* Right controls */}
          <div className="flex flex-wrap lg:flex-nowrap justify-center xl:justify-end items-center gap-3 w-full lg:w-auto">
            {/* Courses Dropdown */}
            <div className="w-full lg:w-56">
              <CustomSelect
                value={course}
                onChange={setCourse}
                options={courses}
                icon={<Filter size={16} className="text-[#697292] shrink-0" />}
                className="h-[56px] rounded-2xl px-5 text-sm"
              />
            </div>

            {/* total Students Count */}
            <div className={`h-[56px] px-5 rounded-2xl border flex items-center text-sm whitespace-nowrap font-bold shrink-0 ${
              darkMode ? "border-[#1d2335] bg-[#161b29] text-[#8b93b2]" : "border-slate-200 bg-slate-50 text-slate-600"
            }`}>
              {filtered.length} Students
            </div>

            {/* View Toggle */}
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setViewMode("grid")}
                className={`w-[56px] h-[56px] rounded-2xl border flex items-center justify-center cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-[#6366f1] border-[#6366f1] text-white shadow-[0_8px_25px_rgba(99,102,241,0.2)]"
                    : darkMode 
                      ? "bg-[#161b29] border-[#1d2335] text-[#8b93b2] hover:border-[#2d3550]" 
                      : "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                <LayoutGrid size={17} />
              </button>

              <button
                onClick={() => setViewMode("list")}
                className={`w-[56px] h-[56px] rounded-2xl border flex items-center justify-center cursor-pointer ${
                  viewMode === "list"
                    ? "bg-[#6366f1] border-[#6366f1] text-white shadow-[0_8px_25px_rgba(99,102,241,0.2)]"
                    : darkMode 
                      ? "bg-[#161b29] border-[#1d2335] text-[#8b93b2] hover:border-[#2d3550]" 
                      : "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                <List size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Directory Content Area */}
      <div className={`rounded-3xl border p-5 shadow-sm ${
        darkMode ? "border-[#1d2335] bg-[#10131d]" : "border-indigo-100 bg-white"
      }`}>
        {/* Loading */}
        {loading && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Grid View */}
        {!loading && viewMode === "grid" && filtered.length > 0 && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 max-h-[52vh] overflow-y-auto custom-scrollbar pr-1">
            {filtered.map((student) => {
              const lastSem = student.semesters?.[student.semesters.length - 1];
              const detained = student.semesters
                ?.flatMap((s) => s.subjects || [])
                .filter((s) => s.status === "Detained").length;

              return (
                <div
                  key={student._id}
                  className={`relative rounded-3xl border p-6 cursor-pointer group ${
                    darkMode 
                      ? "border-[#1d2335] bg-[#10131d] hover:border-[#2d3550] hover:shadow-[0_12px_35px_rgba(99,102,241,0.06)]" 
                      : "border-slate-100 bg-slate-50/50 hover:border-indigo-100 hover:shadow-sm"
                  }`}
                  onClick={() => navigate(`/admin/students/${student._id}`)}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-[16px] border flex items-center justify-center shrink-0 ${
                        darkMode ? "bg-[#1a1e2d] border-[#2c3350]" : "bg-slate-200 border-slate-300"
                      }`}>
                        <span className={`font-semibold text-lg ${darkMode ? "text-[#d6dcf7]" : "text-slate-800"}`}>
                          {student.fullName?.[0]}
                        </span>
                      </div>

                      <div>
                        <h2 className={`text-[0.95rem] font-bold ${darkMode ? "text-white" : "text-slate-800"}`}>
                          {student.fullName}
                        </h2>

                        <p className={`text-[0.78rem] mt-1 ${darkMode ? "text-[#697292]" : "text-slate-400"}`}>
                          URN {student.urn}
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      size={18}
                      className="text-[#697292] group-hover:text-[#818cf8] transition-colors"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className={`px-2.5 py-1 rounded-full border text-[0.68rem] font-semibold ${
                      darkMode 
                        ? "border-[#2b3350] bg-[#1b2031] text-[#818cf8]" 
                        : "border-indigo-50 bg-indigo-50 text-indigo-600"
                    }`}>
                      {student.course}
                    </span>

                    {student.branch && (
                      <span className={`px-2.5 py-1 rounded-full border text-[0.68rem] font-medium ${
                        darkMode ? "border-[#1f2638] bg-[#161b29] text-[#8b93b2]" : "border-slate-200 bg-slate-100 text-slate-500"
                      }`}>
                        {student.branch}
                      </span>
                    )}

                    {detained > 0 && (
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.68rem] font-semibold border ${
                        darkMode 
                          ? "bg-[#2a1d22] text-[#f87171] border-[#40252d]" 
                          : "bg-red-50 text-red-600 border-red-100"
                      }`}>
                        <AlertTriangle size={10} /> {detained} Detained
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      {
                        label: "SGPA",
                        value: lastSem?.sgpa || "—",
                        colorClass: "text-[#818cf8] dark:text-indigo-400",
                      },
                      {
                        label: "CGPA",
                        value: student.cgpa || "—",
                        colorClass: "text-[#22d3ee] dark:text-cyan-400",
                      },
                      {
                        label: "Sems",
                        value: student.semesters?.length || 0,
                        colorClass: "text-slate-600 dark:text-[#9ba2c0]",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className={`rounded-2xl border p-3 text-center ${
                          darkMode ? "border-[#1f2638] bg-[#161b29]" : "border-slate-200 bg-white"
                        }`}
                      >
                        <p className={`font-extrabold text-[1.05rem] font-outfit ${item.colorClass}`}>
                          {item.value}
                        </p>

                        <p className={`text-[0.62rem] mt-1 uppercase tracking-wider font-semibold ${
                          darkMode ? "text-[#697292]" : "text-slate-400"
                        }`}>
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* List View */}
        {!loading && viewMode === "list" && filtered.length > 0 && (
          <div className={`overflow-hidden rounded-3xl border shadow-sm ${
            darkMode ? "border-[#1d2335] bg-[#10131d]" : "border-indigo-100 bg-white"
          }`}>
            <div className="overflow-auto max-h-[52vh] custom-scrollbar">
              <table className="w-full text-left">
                <thead>
                  <tr className={darkMode ? "bg-[#161b29]" : "bg-slate-50"}>
                    {[
                      "Student",
                      "URN",
                      "Course",
                      "Branch",
                      "SGPA",
                      "CGPA",
                      "Sems",
                      "Status",
                    ].map((h) => (
                      <th
                        key={h}
                        className={`text-[0.72rem] font-bold tracking-[0.14em] uppercase px-5 py-4 border-b first:pl-6 last:pr-6 ${
                          darkMode ? "border-[#1d2335] text-[#5e6787]" : "border-indigo-50 text-slate-400"
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((student) => {
                    const lastSem =
                      student.semesters?.[student.semesters.length - 1];
                    const detained = student.semesters
                      ?.flatMap((s) => s.subjects || [])
                      .filter((s) => s.status === "Detained").length;

                    return (
                      <tr
                        key={student._id}
                        className={`border-b hover:bg-slate-50/50 cursor-pointer transition-colors ${
                          darkMode ? "border-[#1d2335] hover:bg-[#161b29]" : "border-indigo-50"
                        }`}
                        onClick={() =>
                          navigate(`/admin/students/${student._id}`)
                        }
                      >
                        <td className="px-5 py-4 first:pl-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-[0.8rem] font-bold shrink-0 ${
                              darkMode ? "border-[#2a314d] bg-[#1a2033] text-white" : "border-slate-200 bg-slate-100 text-slate-800"
                            }`}>
                              {student.fullName?.[0]}
                            </div>

                            <span className={`text-[0.88rem] font-bold ${darkMode ? "text-white" : "text-slate-800"}`}>
                              {student.fullName}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-4 font-mono text-[0.82rem] font-semibold text-[#818cf8] dark:text-indigo-400">
                          {student.urn}
                        </td>

                        <td className="px-5 py-4">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-[0.72rem] font-semibold border ${
                            darkMode ? "border-[#2b3350] bg-[#1b2031] text-[#818cf8]" : "border-indigo-50 bg-indigo-50 text-indigo-600"
                          }`}>
                            {student.course}
                          </span>
                        </td>

                        <td className={`px-5 py-4 text-[0.85rem] ${darkMode ? "text-[#9ba2c0]" : "text-slate-600"}`}>
                          {student.branch || "—"}
                        </td>

                        <td className="px-5 py-4">
                          <span className="font-bold text-[0.92rem] font-outfit text-[#818cf8] dark:text-indigo-400">
                            {lastSem?.sgpa || "—"}
                          </span>
                        </td>

                        <td className="px-5 py-4 font-bold text-[0.92rem] text-[#22d3ee] dark:text-cyan-400 font-outfit">
                          {student.cgpa ?? "—"}
                        </td>

                        <td className={`px-5 py-4 font-bold ${darkMode ? "text-[#9ba2c0]" : "text-slate-600"}`}>
                          {student.semesters?.length || 0}
                        </td>

                        <td className="px-5 py-4 last:pr-6">
                          {detained > 0 ? (
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.68rem] font-semibold border ${
                              darkMode 
                                ? "bg-[#2a1d22] text-[#f87171] border-[#40252d]" 
                                : "bg-red-50 text-red-600 border-red-100"
                            }`}>
                              <AlertTriangle size={10} /> {detained}
                            </span>
                          ) : (
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.68rem] font-semibold border ${
                              darkMode 
                                ? "bg-[#15222c] border-[#1f3a2f] text-[#4ade80]" 
                                : "bg-emerald-50 border-emerald-100 text-emerald-600"
                            }`}>
                              ✓ Clear
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="flex flex-col justify-center items-center text-center py-16">
            <div className={`mb-5 flex h-20 w-20 items-center justify-center rounded-[24px] border ${
              darkMode ? "border-[#1f2638] bg-[#161b29]" : "border-slate-200 bg-slate-50"
            }`}>
              <SearchX size={32} className="text-[#697292]" />
            </div>

            <h2 className={`text-[1.15rem] font-bold mb-2 ${darkMode ? "text-white" : "text-slate-800"}`}>
              No Students Found
            </h2>

            <p className={`text-sm max-w-[280px] leading-relaxed ${darkMode ? "text-[#697292]" : "text-slate-400"}`}>
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
