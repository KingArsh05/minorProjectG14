import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Eye,
  ChevronRight,
  GraduationCap,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { students } from "../../data/students";

const sgpaColor = (sgpa) => {
  if (sgpa >= 9) return "sgpa-excellent";
  if (sgpa >= 8) return "sgpa-good";
  if (sgpa >= 7) return "sgpa-average";
  return "sgpa-poor";
};

const detainedCount = (student) =>
  student.semesters
    .flatMap((s) => s.subjects)
    .filter((sub) => sub.status === "Detained").length;

export default function StudentList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [view, setView] = useState("grid"); // 'grid' | 'table'

  const filtered = students.filter((s) => {
    const q = search.toLowerCase();
    const matchQ =
      !q ||
      s.fullName.toLowerCase().includes(q) ||
      String(s.urn).includes(q) ||
      String(s.crn).includes(q) ||
      s.branch?.toLowerCase().includes(q);
    const matchC = !courseFilter || s.course === courseFilter;
    return matchQ && matchC;
  });

  const latestSGPA = (s) =>
    s.semesters.length > 0 ? s.semesters[s.semesters.length - 1].sgpa : null;

  const latestAttendance = (s) =>
    s.semesters.length > 0
      ? s.semesters[s.semesters.length - 1].attendance
      : null;

  return (
    <div className="fade-in">
      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative", flex: "1 1 220px" }}>
          <Search
            size={15}
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
            type="text"
            placeholder="Search by name, URN, branch..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: "2.4rem" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            position: "relative",
          }}
        >
          <Filter size={14} style={{ color: "var(--text-muted)" }} />
          <select
            className="select-field"
            style={{ width: "160px" }}
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          >
            <option value="">All Courses</option>
            {[
              "B.Tech",
              "M.Tech",
              "MBA",
              "MCA",
              "BBA",
              "BCA",
              "B.Arch",
              "B.Voc.",
              "B.Com",
            ].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: "flex", gap: "0.4rem", marginLeft: "auto" }}>
          <button
            className={`btn-icon ${view === "grid" ? "btn-primary" : ""}`}
            onClick={() => setView("grid")}
            style={
              view === "grid"
                ? {
                    background: "var(--primary)",
                    borderColor: "var(--primary)",
                    color: "white",
                  }
                : {}
            }
          >
            ▦
          </button>
          <button
            className={`btn-icon`}
            onClick={() => setView("table")}
            style={
              view === "table"
                ? {
                    background: "var(--primary)",
                    borderColor: "var(--primary)",
                    color: "white",
                  }
                : {}
            }
          >
            ≡
          </button>
        </div>
      </div>

      <p
        style={{
          fontSize: "0.78rem",
          color: "var(--text-muted)",
          marginBottom: "1rem",
        }}
      >
        Showing{" "}
        <strong style={{ color: "var(--text-primary)" }}>
          {filtered.length}
        </strong>{" "}
        of {students.length} students
      </p>

      {view === "grid" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1rem",
          }}
        >
          {filtered.map((student) => {
            const sgpa = latestSGPA(student);
            const att = latestAttendance(student);
            const detained = detainedCount(student);

            return (
              <div
                key={student._id}
                className="card"
                style={{ cursor: "pointer", transition: "all 0.25s" }}
                onClick={() => navigate(`/admin/students/${student._id}`)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--primary)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.transform = "none";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: "0.9rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.65rem",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        background: `linear-gradient(135deg, hsl(${(student.urn * 47) % 360},60%,40%), hsl(${(student.urn * 47 + 40) % 360},70%,35%))`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.95rem",
                        fontWeight: 800,
                        color: "white",
                        flexShrink: 0,
                      }}
                    >
                      {student.fullName[0]}
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "0.88rem",
                          fontWeight: 700,
                          color: "var(--text-primary)",
                          lineHeight: 1.2,
                        }}
                      >
                        {student.fullName}
                      </p>
                      <p
                        style={{
                          fontSize: "0.7rem",
                          color: "var(--text-muted)",
                          fontFamily: "monospace",
                        }}
                      >
                        URN: {student.urn}
                      </p>
                    </div>
                  </div>
                  {detained > 0 && (
                    <span className="badge badge-danger">
                      <AlertTriangle size={9} /> {detained} detain
                    </span>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "0.4rem",
                    flexWrap: "wrap",
                    marginBottom: "0.9rem",
                  }}
                >
                  <span className="badge badge-purple">{student.course}</span>
                  {student.branch && (
                    <span className="chip">{student.branch.split(" ")[0]}</span>
                  )}
                  <span className="chip">Sem {student.semesters.length}</span>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "0.5rem",
                    marginTop: "0.75rem",
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      background: "var(--bg-elevated)",
                      borderRadius: "8px",
                      padding: "0.5rem",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "1rem",
                        fontWeight: 800,
                        color: "var(--primary-light)",
                        fontFamily: "Outfit, sans-serif",
                      }}
                    >
                      {sgpa ?? "—"}
                    </p>
                    <p
                      style={{
                        fontSize: "0.62rem",
                        color: "var(--text-muted)",
                        marginTop: "1px",
                      }}
                    >
                      SGPA
                    </p>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      background: "var(--bg-elevated)",
                      borderRadius: "8px",
                      padding: "0.5rem",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "1rem",
                        fontWeight: 800,
                        color: att >= 75 ? "var(--success)" : "var(--danger)",
                        fontFamily: "Outfit, sans-serif",
                      }}
                    >
                      {att ? `${att}%` : "—"}
                    </p>
                    <p
                      style={{
                        fontSize: "0.62rem",
                        color: "var(--text-muted)",
                        marginTop: "1px",
                      }}
                    >
                      Attend.
                    </p>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      background: "var(--bg-elevated)",
                      borderRadius: "8px",
                      padding: "0.5rem",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "1rem",
                        fontWeight: 800,
                        color: "var(--accent-light)",
                        fontFamily: "Outfit, sans-serif",
                      }}
                    >
                      {student.semesters.length}
                    </p>
                    <p
                      style={{
                        fontSize: "0.62rem",
                        color: "var(--text-muted)",
                        marginTop: "1px",
                      }}
                    >
                      Sems
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "0.85rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--primary-light)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.2rem",
                    }}
                  >
                    View Profile <ChevronRight size={13} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>URN / CRN</th>
                  <th>Course & Branch</th>
                  <th>Semesters</th>
                  <th>Latest SGPA</th>
                  <th>Attendance</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((student) => {
                  const sgpa = latestSGPA(student);
                  const att = latestAttendance(student);
                  const detained = detainedCount(student);
                  return (
                    <tr
                      key={student._id}
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/admin/students/${student._id}`)}
                    >
                      <td>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.6rem",
                          }}
                        >
                          <div
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "8px",
                              background: `linear-gradient(135deg, hsl(${(student.urn * 47) % 360},60%,40%), hsl(${(student.urn * 47 + 40) % 360},70%,35%))`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.85rem",
                              fontWeight: 700,
                              color: "white",
                              flexShrink: 0,
                            }}
                          >
                            {student.fullName[0]}
                          </div>
                          {student.fullName}
                        </div>
                      </td>
                      <td
                        style={{ fontFamily: "monospace", fontSize: "0.78rem" }}
                      >
                        <span style={{ color: "var(--primary-light)" }}>
                          {student.urn}
                        </span>
                        <br />
                        <span style={{ color: "var(--text-muted)" }}>
                          {student.crn}
                        </span>
                      </td>
                      <td>
                        <span
                          className="badge badge-purple"
                          style={{
                            marginBottom: "3px",
                            display: "inline-block",
                          }}
                        >
                          {student.course}
                        </span>
                        <br />
                        <span
                          style={{
                            fontSize: "0.72rem",
                            color: "var(--text-muted)",
                          }}
                        >
                          {student.branch || "—"}
                        </span>
                      </td>
                      <td>{student.semesters.length}</td>
                      <td>
                        {sgpa ? (
                          <span className={`sgpa-pill ${sgpaColor(sgpa)}`}>
                            {sgpa}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td
                        style={{
                          color: att >= 75 ? "var(--success)" : "var(--danger)",
                          fontWeight: 600,
                        }}
                      >
                        {att ? `${att}%` : "—"}
                      </td>
                      <td>
                        {detained > 0 ? (
                          <span className="badge badge-danger">
                            <AlertTriangle size={9} /> {detained} Detain
                          </span>
                        ) : (
                          <span className="badge badge-success">Clear</span>
                        )}
                      </td>
                      <td>
                        <button className="btn-icon">
                          <Eye size={14} />
                        </button>
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
