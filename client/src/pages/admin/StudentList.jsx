import { useState } from "react";
import {
  Search,
  LayoutGrid,
  List,
  Filter,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { students } from "../../data/students";

const CARD =
  "bg-[#13162b] border border-[#252840] rounded-2xl p-5 transition-all cursor-pointer hover:border-[#6366f1] hover:-translate-y-0.5";

const sgpaColor = (s) =>
  s >= 8 ? "#34d399" : s >= 7 ? "#818cf8" : s >= 6 ? "#fbbf24" : "#f87171";
const attColor = (a) => (a >= 75 ? "#34d399" : a >= 60 ? "#fbbf24" : "#f87171");

export default function StudentList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("All");
  const [viewMode, setViewMode] = useState("grid");

  const courses = ["All", ...new Set(students.map((s) => s.course))];

  const filtered = students.filter((s) => {
    const q = search.toLowerCase();
    const matchQ =
      !q ||
      s.fullName.toLowerCase().includes(q) ||
      String(s.urn).includes(q) ||
      String(s.crn).includes(q) ||
      (s.branch || "").toLowerCase().includes(q);
    const matchC = course === "All" || s.course === course;
    return matchQ && matchC;
  });

  const avatarGrad = (s) =>
    `linear-gradient(135deg, hsl(${(s.urn * 47) % 360},60%,38%), hsl(${(s.urn * 47 + 40) % 360},65%,32%))`;

  return (
    <div className="fade-in">
      {/* Quick stats */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-4 mb-6">
        {[
          { label: "Total Students", val: students.length, color: "#818cf8" },
          {
            label: "Detained",
            val: students.filter((s) =>
              s.semesters
                .flatMap((x) => x.subjects)
                .some((x) => x.status === "Detained"),
            ).length,
            color: "#f87171",
          },
          {
            label: "Avg SGPA ≥ 8",
            val: students.filter(
              (s) =>
                s.semesters.length &&
                s.semesters[s.semesters.length - 1]?.sgpa >= 8,
            ).length,
            color: "#34d399",
          },
          {
            label: "Att < 75%",
            val: students.filter((s) =>
              s.semesters.some((x) => x.attendance && x.attendance < 75),
            ).length,
            color: "#fbbf24",
          },
        ].map((c) => (
          <div
            key={c.label}
            className="bg-[#13162b] border border-[#252840] rounded-xl p-4 text-center"
          >
            <p
              className="text-[1.5rem] font-extrabold"
              style={{ color: c.color, fontFamily: "Outfit,sans-serif" }}
            >
              {c.val}
            </p>
            <p className="text-[0.68rem] text-[#5c6385] mt-px">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c6385]"
          />
          <input
            className="w-full bg-[#161925] border border-[#252840] text-[#f0f1fa] pl-9 pr-4 py-[0.65rem] rounded-xl text-sm outline-none transition-all focus:border-[#6366f1] placeholder:text-[#5c6385]"
            placeholder="Search by name, URN, branch…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-[#5c6385]" />
          <select
            className="bg-[#161925] border border-[#252840] text-[#f0f1fa] px-3 py-[0.6rem] rounded-xl text-sm outline-none focus:border-[#6366f1] cursor-pointer appearance-none"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            {courses.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-all cursor-pointer ${viewMode === "grid" ? "bg-[#6366f1] border-[#6366f1] text-white" : "bg-[#1e2132] border-[#252840] text-[#9ba2c0] hover:border-[#6366f1]"}`}
          >
            <LayoutGrid size={15} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-all cursor-pointer ${viewMode === "list" ? "bg-[#6366f1] border-[#6366f1] text-white" : "bg-[#1e2132] border-[#252840] text-[#9ba2c0] hover:border-[#6366f1]"}`}
          >
            <List size={15} />
          </button>
        </div>
        <p className="text-[0.8rem] text-[#5c6385]">
          Showing <strong className="text-[#818cf8]">{filtered.length}</strong>{" "}
          of {students.length} students
        </p>
      </div>

      {/* Grid view */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-4">
          {filtered.map((student) => {
            const lastSem = student.semesters[student.semesters.length - 1];
            const detained = student.semesters
              .flatMap((s) => s.subjects)
              .filter((s) => s.status === "Detained").length;
            return (
              <div
                key={student._id}
                className={CARD}
                onClick={() => navigate(`/admin/students/${student._id}`)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-[11px] flex items-center justify-center text-[1rem] font-bold text-white shrink-0"
                      style={{ background: avatarGrad(student) }}
                    >
                      {student.fullName[0]}
                    </div>
                    <div>
                      <p className="text-[0.9rem] font-bold text-[#f0f1fa] leading-tight">
                        {student.fullName}
                      </p>
                      <p className="text-[0.7rem] text-[#5c6385]">
                        URN: {student.urn}
                      </p>
                    </div>
                  </div>
                  {detained > 0 && (
                    <span className="inline-flex items-center gap-1 px-2 py-[0.15rem] rounded-full text-[0.68rem] font-semibold bg-[rgba(239,68,68,0.15)] text-[#f87171] border border-[rgba(239,68,68,0.25)]">
                      <AlertTriangle size={9} /> {detained} DETAIN
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="inline-flex items-center px-[0.65rem] py-[0.2rem] rounded-full text-[0.7rem] font-semibold bg-[rgba(99,102,241,0.15)] text-[#818cf8] border border-[rgba(99,102,241,0.25)]">
                    {student.course}
                  </span>
                  {student.branch && (
                    <span className="inline-flex items-center px-[0.6rem] py-[0.2rem] bg-[#161925] border border-[#252840] rounded-md text-[0.72rem] text-[#9ba2c0]">
                      {student.branch.split(" ")[0]}
                    </span>
                  )}
                  {lastSem && (
                    <span className="inline-flex items-center px-[0.6rem] py-[0.2rem] bg-[#161925] border border-[#252840] rounded-md text-[0.72rem] text-[#9ba2c0]">
                      Sem {lastSem.semesterNumber}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    {
                      label: "SGPA",
                      val: lastSem?.sgpa ?? "—",
                      color: lastSem ? sgpaColor(lastSem.sgpa) : "#5c6385",
                    },
                    {
                      label: "Attend.",
                      val: lastSem?.attendance ? `${lastSem.attendance}%` : "—",
                      color: lastSem?.attendance
                        ? attColor(lastSem.attendance)
                        : "#5c6385",
                    },
                    {
                      label: "Sems",
                      val: student.semesters.length,
                      color: "#9ba2c0",
                    },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="text-center bg-[#161925] rounded-lg py-2"
                    >
                      <p
                        className="text-[1rem] font-extrabold"
                        style={{
                          color: s.color,
                          fontFamily: "Outfit,sans-serif",
                        }}
                      >
                        {s.val}
                      </p>
                      <p className="text-[0.62rem] text-[#5c6385]">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-end text-[0.78rem] text-[#818cf8] font-semibold gap-1">
                  View Profile <ChevronRight size={13} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* List view */}
      {viewMode === "list" && (
        <div className="bg-[#13162b] border border-[#252840] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table
              className="w-full"
              style={{ borderCollapse: "separate", borderSpacing: 0 }}
            >
              <thead>
                <tr>
                  {[
                    "Student",
                    "URN / CRN",
                    "Course",
                    "Branch",
                    "SGPA",
                    "Attendance",
                    "Sems",
                    "Status",
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
                {filtered.map((student) => {
                  const lastSem =
                    student.semesters[student.semesters.length - 1];
                  const detained = student.semesters
                    .flatMap((s) => s.subjects)
                    .filter((s) => s.status === "Detained").length;
                  return (
                    <tr
                      key={student._id}
                      className="border-b border-[#252840] hover:bg-[#1e2132] cursor-pointer transition-colors"
                      onClick={() => navigate(`/admin/students/${student._id}`)}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white shrink-0"
                            style={{ background: avatarGrad(student) }}
                          >
                            {student.fullName[0]}
                          </div>
                          <span className="text-[0.85rem] font-semibold text-[#f0f1fa]">
                            {student.fullName}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-[0.78rem] text-[#818cf8]">
                        {student.urn}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex px-[0.65rem] py-[0.2rem] rounded-full text-[0.7rem] font-semibold bg-[rgba(99,102,241,0.15)] text-[#818cf8] border border-[rgba(99,102,241,0.25)]">
                          {student.course}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[0.82rem] text-[#9ba2c0]">
                        {student.branch?.split(" ")[0] || "—"}
                      </td>
                      <td
                        className="px-4 py-3 font-bold text-[0.9rem]"
                        style={{
                          color: lastSem ? sgpaColor(lastSem.sgpa) : "#5c6385",
                        }}
                      >
                        {lastSem?.sgpa || "—"}
                      </td>
                      <td
                        className="px-4 py-3 font-bold text-[0.9rem]"
                        style={{
                          color: lastSem?.attendance
                            ? attColor(lastSem.attendance)
                            : "#5c6385",
                        }}
                      >
                        {lastSem?.attendance ? `${lastSem.attendance}%` : "—"}
                      </td>
                      <td className="px-4 py-3 text-[#9ba2c0]">
                        {student.semesters.length}
                      </td>
                      <td className="px-4 py-3">
                        {detained > 0 ? (
                          <span className="inline-flex items-center gap-1 px-2 py-[0.15rem] rounded-full text-[0.68rem] font-semibold bg-[rgba(239,68,68,0.15)] text-[#f87171] border border-[rgba(239,68,68,0.25)]">
                            <AlertTriangle size={9} /> {detained}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-[0.15rem] rounded-full text-[0.68rem] font-semibold bg-[rgba(16,185,129,0.15)] text-[#34d399] border border-[rgba(16,185,129,0.25)]">
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
    </div>
  );
}
