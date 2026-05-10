import { useState, useEffect } from "react";
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

const CARD =
  "relative overflow-hidden rounded-[30px] border border-[#1d2335] bg-[#10131d] p-5 transition-all cursor-pointer hover:border-[#2d3550] hover:shadow-[0_12px_35px_rgba(99,102,241,0.06)] group";

const SkeletonCard = () => (
  <div className="rounded-[30px] border border-[#1d2335] bg-[#10131d] p-5 animate-pulse">
    <div className="flex items-center gap-4 mb-5">
      <div className="w-[52px] h-[52px] rounded-2xl bg-[#1a2033] border border-[#2a314d]" />
      <div className="flex-1">
        <div className="h-4 w-28 bg-[#1a2033] rounded-lg mb-2" />
        <div className="h-3 w-20 bg-[#161b29] rounded-lg" />
      </div>
    </div>

    <div className="flex gap-2 mb-5">
      <div className="h-6 w-16 bg-[#1a2033] rounded-full" />
      <div className="h-6 w-24 bg-[#161b29] rounded-full" />
    </div>

    <div className="grid grid-cols-3 gap-3">
      {[1, 2, 3].map((n) => (
        <div key={n} className="h-16 rounded-2xl bg-[#161b29] border border-[#1f2638]" />
      ))}
    </div>
  </div>
);

export default function StudentList() {
  const navigate = useNavigate();

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
  }, []);

  const courses = ["All", ...new Set(students.map((s) => s.course))];

  const filtered = students.filter((s) => {
    const q = search.toLowerCase();

    const matchesSearch =
      !q || s.fullName.toLowerCase().includes(q) || String(s.urn).includes(q);

    const matchesCourse = course === "All" || s.course === course;

    return matchesSearch && matchesCourse;
  });

  const detainedCount = students.filter((s) =>
    s.semesters?.flatMap((x) => x.subjects || []).some((x) => x.status === "Detained"),
  ).length;

  const avgCgpa = students.length
    ? (
        students.reduce((a, s) => a + (s.cgpa || 0), 0) / students.length
      ).toFixed(2)
    : "—";

  return (
    <div className="space-y-5 fade-in">
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
            value: loading
              ? "—"
              : new Set(students.map((s) => s.course)).size,
            icon: GraduationCap,
            color: "#fbbf24",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-[30px] border border-[#1d2335] bg-[#10131d] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.18)]"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#5e6787] font-semibold mb-2">
                  {card.title}
                </p>

                <h2 className="text-[2rem] font-bold text-white font-outfit">
                  {loading ? (
                    <div className="h-8 w-14 rounded-lg bg-[#1a2033] animate-pulse" />
                  ) : (
                    card.value
                  )}
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-[18px] border border-[#2a3047] bg-[#1a1f33]">
                <card.icon size={20} style={{ color: card.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}

      <div className="rounded-[30px] border border-[#1d2335] bg-[#10131d] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}

          <div className="group relative flex-1">
            <Search
              size={19}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-[#697292] group-focus-within:text-[#818cf8] transition-all"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or URN..."
              className="w-full h-[56px] rounded-2xl border border-[#1d2335] bg-[#161b29] pl-13 pr-5 text-white placeholder:text-[#697292] outline-none focus:border-[#6366f1] transition-all"
            />
          </div>

          {/* Right controls */}

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-5 h-[56px] rounded-2xl border border-[#1d2335] bg-[#161b29]">
              <Filter size={16} className="text-[#697292]" />

              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="bg-transparent text-[#d6dcf7] outline-none text-[0.9rem] cursor-pointer"
              >
                {courses.map((c) => (
                  <option key={c} value={c} className="bg-[#161b29]">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="h-[56px] px-5 rounded-2xl border border-[#1d2335] bg-[#161b29] flex items-center text-[#8b93b2] text-[0.9rem] whitespace-nowrap font-medium">
              {filtered.length} Students
            </div>

            {/* View Toggle */}

            <div className="flex gap-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`w-[56px] h-[56px] rounded-2xl border flex items-center justify-center transition-all ${
                  viewMode === "grid"
                    ? "bg-[#6366f1] border-[#6366f1] text-white shadow-[0_8px_25px_rgba(99,102,241,0.2)]"
                    : "bg-[#161b29] border-[#1d2335] text-[#8b93b2] hover:border-[#2d3550]"
                }`}
              >
                <LayoutGrid size={17} />
              </button>

              <button
                onClick={() => setViewMode("list")}
                className={`w-[56px] h-[56px] rounded-2xl border flex items-center justify-center transition-all ${
                  viewMode === "list"
                    ? "bg-[#6366f1] border-[#6366f1] text-white shadow-[0_8px_25px_rgba(99,102,241,0.2)]"
                    : "bg-[#161b29] border-[#1d2335] text-[#8b93b2] hover:border-[#2d3550]"
                }`}
              >
                <List size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading */}

      {loading && viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Grid View */}

      {!loading && viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
          {filtered.map((student) => {
            const lastSem = student.semesters?.[student.semesters.length - 1];
            const detained = student.semesters
              ?.flatMap((s) => s.subjects || [])
              .filter((s) => s.status === "Detained").length;

            return (
              <div
                key={student._id}
                className={CARD}
                onClick={() => navigate(`/admin/students/${student._id}`)}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-[52px] h-[52px] rounded-2xl border border-[#2a314d] bg-[#1a2033] flex items-center justify-center text-white text-[1rem] font-bold shrink-0 shadow-inner">
                      {student.fullName?.[0]}
                    </div>

                    <div>
                      <h2 className="text-[0.95rem] font-semibold text-white">
                        {student.fullName}
                      </h2>

                      <p className="text-[0.78rem] text-[#697292] mt-1">
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
                  <span className="px-2.5 py-1 rounded-full border border-[#2b3350] bg-[#1b2031] text-[#818cf8] text-[0.68rem] font-medium">
                    {student.course}
                  </span>

                  {student.branch && (
                    <span className="px-2.5 py-1 rounded-full border border-[#1f2638] bg-[#161b29] text-[#8b93b2] text-[0.68rem] font-medium">
                      {student.branch}
                    </span>
                  )}

                  {detained > 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.68rem] font-medium bg-[#2a1d22] text-[#f87171] border border-[#40252d]">
                      <AlertTriangle size={10} /> {detained} Detained
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      label: "SGPA",
                      value: lastSem?.sgpa || "—",
                      color:
                        lastSem?.sgpa >= 8
                          ? "#4ade80"
                          : lastSem?.sgpa >= 7
                            ? "#818cf8"
                            : lastSem?.sgpa >= 6
                              ? "#fbbf24"
                              : lastSem?.sgpa
                                ? "#f87171"
                                : "#697292",
                    },

                    {
                      label: "CGPA",
                      value: student.cgpa || "—",
                      color: "#22d3ee",
                    },

                    {
                      label: "Sems",
                      value: student.semesters?.length || 0,
                      color: "#9ba2c0",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-[#1f2638] bg-[#161b29] p-3 text-center"
                    >
                      <p
                        className="font-bold text-[1.05rem] font-outfit"
                        style={{ color: item.color }}
                      >
                        {item.value}
                      </p>

                      <p className="text-[#697292] text-[0.62rem] mt-1 uppercase tracking-wider">
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

      {!loading && viewMode === "list" && (
        <div className="rounded-[30px] border border-[#1d2335] bg-[#10131d] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.18)]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
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
                      className="bg-[#161b29] text-[#5e6787] text-[0.72rem] font-semibold tracking-[0.14em] uppercase px-5 py-4 text-left border-b border-[#1d2335] first:pl-6 last:pr-6"
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
                      className="border-b border-[#1d2335] hover:bg-[#161b29] cursor-pointer transition-colors"
                      onClick={() =>
                        navigate(`/admin/students/${student._id}`)
                      }
                    >
                      <td className="px-5 py-4 first:pl-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl border border-[#2a314d] bg-[#1a2033] flex items-center justify-center text-[0.8rem] font-bold text-white shrink-0">
                            {student.fullName?.[0]}
                          </div>

                          <span className="text-[0.88rem] font-semibold text-white">
                            {student.fullName}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4 font-mono text-[0.82rem] text-[#818cf8]">
                        {student.urn}
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex px-2.5 py-1 rounded-full text-[0.72rem] font-medium bg-[#1b2031] text-[#818cf8] border border-[#2b3350]">
                          {student.course}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-[0.85rem] text-[#9ba2c0]">
                        {student.branch || "—"}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className="font-bold text-[0.92rem] font-outfit"
                          style={{
                            color: lastSem
                              ? lastSem.sgpa >= 8
                                ? "#4ade80"
                                : lastSem.sgpa >= 7
                                  ? "#818cf8"
                                  : lastSem.sgpa >= 6
                                    ? "#fbbf24"
                                    : "#f87171"
                              : "#697292",
                          }}
                        >
                          {lastSem?.sgpa || "—"}
                        </span>
                      </td>

                      <td className="px-5 py-4 font-bold text-[0.92rem] text-[#22d3ee] font-outfit">
                        {student.cgpa ?? "—"}
                      </td>

                      <td className="px-5 py-4 text-[#9ba2c0] font-medium">
                        {student.semesters?.length || 0}
                      </td>

                      <td className="px-5 py-4 last:pr-6">
                        {detained > 0 ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.68rem] font-medium bg-[#2a1d22] text-[#f87171] border border-[#40252d]">
                            <AlertTriangle size={10} /> {detained}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.68rem] font-medium bg-[#15222c] text-[#4ade80] border border-[#1f3a2f]">
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

      {/* Empty */}

      {!loading && filtered.length === 0 && (
        <div className="rounded-[30px] border border-[#1d2335] bg-[#10131d] p-14 text-center shadow-[0_4px_20px_rgba(0,0,0,0.18)]">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[24px] border border-[#1f2638] bg-[#161b29]">
            <SearchX size={32} className="text-[#697292]" />
          </div>

          <h2 className="text-[1.15rem] font-semibold text-white mb-2">
            No Students Found
          </h2>

          <p className="text-[#697292] text-[0.92rem]">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
}
