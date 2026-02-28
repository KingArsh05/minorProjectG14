import { useState, useRef } from "react";
import {
  Upload,
  Send,
  CheckCircle,
  X,
  CloudUpload,
  FileSpreadsheet,
  AlertCircle,
} from "lucide-react";

const courseBranchMap = {
  "B.Tech": [
    "Computer Science & Engineering",
    "Information Technology",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electronics & Communication Engineering",
    "Robotics & AI",
  ],
  "M.Tech": [
    "Computer Science & Engineering",
    "Electronics Engineering",
    "Mechanical Engineering",
    "Production Engineering",
    "Geo Technical Engineering",
    "Structural Engineering",
    "Power Engineering",
    "Environmental Science & Engineering",
  ],
  MBA: ["Finance", "Marketing", "Human Resource"],
  MCA: ["Computer Applications"],
  "B.Voc.": ["Interior Design"],
  "B.Com": ["Entrepreneurship"],
  BBA: [],
  BCA: [],
  "B.Arch": [],
};

const previewData = [
  {
    urn: "2200001",
    crn: "2200101",
    name: "Arjun Sharma",
    branch: "CSE",
    sem: "4",
    sgpa: "8.6",
  },
  {
    urn: "2200002",
    crn: "2200102",
    name: "Priya Nair",
    branch: "IT",
    sem: "4",
    sgpa: "7.5",
  },
  {
    urn: "2200003",
    crn: "2200103",
    name: "Rahul Verma",
    branch: "EE",
    sem: "1",
    sgpa: "6.5",
  },
  {
    urn: "2200004",
    crn: "2200104",
    name: "Ananya Singh",
    branch: "ME",
    sem: "2",
    sgpa: "9.3",
  },
];

export default function UploadData() {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [step, setStep] = useState(1); // 1=upload, 2=preview, 3=success
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef();

  const handleFile = (f) => {
    if (f) {
      setFile(f);
      setStep(2);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleProcess = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setStep(3);
    }, 2000);
  };

  const branches = courseBranchMap[course] || [];

  if (step === 3) {
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
          Upload Successful!
        </h2>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "0.9rem",
            marginBottom: "2rem",
          }}
        >
          {previewData.length} student records from{" "}
          <strong style={{ color: "var(--text-secondary)" }}>
            {file?.name}
          </strong>{" "}
          have been processed and stored.
        </p>
        <div
          className="card"
          style={{
            padding: "1rem 1.25rem",
            marginBottom: "1.5rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "1rem",
            textAlign: "center",
          }}
        >
          {[
            { label: "Records", val: previewData.length },
            { label: "Course", val: course || "B.Tech" },
            { label: "Semester", val: semester || "4" },
          ].map((s) => (
            <div key={s.label}>
              <p
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 800,
                  color: "var(--primary-light)",
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                {s.val}
              </p>
              <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
        <div
          style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}
        >
          <button
            className="btn-secondary"
            onClick={() => {
              setStep(1);
              setFile(null);
            }}
          >
            Upload More
          </button>
          <button className="btn-primary">
            <Send size={14} />
            Send Notifications
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
      {/* Left */}
      <div>
        {/* Step 1: drop zone */}
        <div className="card" style={{ marginBottom: "1.25rem" }}>
          <h3
            style={{
              fontSize: "0.95rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1.25rem",
            }}
          >
            {step === 1 ? "📁 Upload CSV / Excel File" : "✅ File Selected"}
          </h3>

          {!file ? (
            <div
              className={`drop-zone ${dragOver ? "drag-over" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current.click()}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                style={{ display: "none" }}
                onChange={(e) => handleFile(e.target.files[0])}
              />
              <CloudUpload
                size={40}
                style={{
                  color: "var(--primary-light)",
                  margin: "0 auto 1rem",
                  display: "block",
                  opacity: 0.8,
                }}
              />
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: "0.4rem",
                }}
              >
                Drop your file here or click to browse
              </p>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Supports{" "}
                <strong style={{ color: "var(--primary-light)" }}>.csv</strong>,{" "}
                <strong style={{ color: "var(--accent-light)" }}>.xlsx</strong>,{" "}
                <strong style={{ color: "var(--accent-light)" }}>.xls</strong> —
                max 10 MB
              </p>
            </div>
          ) : (
            <div
              style={{
                background: "rgba(16,185,129,0.05)",
                border: "1px solid rgba(16,185,129,0.2)",
                borderRadius: "12px",
                padding: "1rem 1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <FileSpreadsheet size={28} style={{ color: "var(--success)" }} />
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  {file.name}
                </p>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  {(file.size / 1024).toFixed(1)} KB — ready to process
                </p>
              </div>
              <button
                className="btn-icon"
                onClick={() => {
                  setFile(null);
                  setStep(1);
                }}
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Config */}
        <div className="card" style={{ marginBottom: "1.25rem" }}>
          <h3
            style={{
              fontSize: "0.95rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1.25rem",
            }}
          >
            ⚙️ Upload Configuration
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div>
              <label className="form-label">Course</label>
              <select
                className="select-field"
                value={course}
                onChange={(e) => {
                  setCourse(e.target.value);
                  setBranch("");
                }}
              >
                <option value="">Select course</option>
                {Object.keys(courseBranchMap).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Branch</label>
              <select
                className="select-field"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                disabled={!course || branches.length === 0}
              >
                <option value="">
                  {branches.length === 0 && course
                    ? "No branches"
                    : "Select branch"}
                </option>
                {branches.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Semester</label>
              <select
                className="select-field"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              >
                <option value="">Select semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={s}>
                    Semester {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Academic Year</label>
              <select className="select-field">
                <option>2024-25</option>
                <option>2023-24</option>
              </select>
            </div>
          </div>
        </div>

        {/* Preview Table */}
        {file && (
          <div className="card">
            <h3
              style={{
                fontSize: "0.95rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "1rem",
              }}
            >
              📊 Data Preview (first 4 rows)
            </h3>
            <div style={{ overflowX: "auto" }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>URN</th>
                    <th>CRN</th>
                    <th>Full Name</th>
                    <th>Branch</th>
                    <th>Semester</th>
                    <th>SGPA</th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((r) => (
                    <tr key={r.urn}>
                      <td
                        style={{
                          fontFamily: "monospace",
                          color: "var(--primary-light)",
                        }}
                      >
                        {r.urn}
                      </td>
                      <td style={{ fontFamily: "monospace" }}>{r.crn}</td>
                      <td>{r.name}</td>
                      <td>
                        <span className="badge badge-purple">{r.branch}</span>
                      </td>
                      <td>Sem {r.sem}</td>
                      <td
                        style={{
                          fontWeight: 700,
                          color: "var(--accent-light)",
                        }}
                      >
                        {r.sgpa}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div
              style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem" }}
            >
              <button
                className="btn-secondary"
                onClick={() => {
                  setFile(null);
                  setStep(1);
                }}
              >
                <X size={14} /> Cancel
              </button>
              <button
                className="btn-primary"
                onClick={handleProcess}
                disabled={uploading}
              >
                {uploading ? (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    <span
                      style={{
                        width: "12px",
                        height: "12px",
                        border: "2px solid rgba(255,255,255,0.3)",
                        borderTop: "2px solid white",
                        borderRadius: "50%",
                        display: "inline-block",
                        animation: "spin 0.7s linear infinite",
                      }}
                    />
                    Processing...
                  </span>
                ) : (
                  <>
                    <Upload size={14} /> Process & Save
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right sidebar - Instructions */}
      <div>
        <div className="card" style={{ marginBottom: "1rem" }}>
          <h3
            style={{
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            📋 CSV Format Guide
          </h3>
          <div
            style={{
              background: "var(--bg-elevated)",
              borderRadius: "8px",
              padding: "0.75rem",
              fontFamily: "monospace",
              fontSize: "0.72rem",
              color: "var(--accent-light)",
              lineHeight: 1.8,
              overflowX: "auto",
            }}
          >
            <span style={{ color: "var(--text-muted)" }}>
              // Headers required:
            </span>
            <br />
            urn, crn, fullName,
            <br />
            course, branch,
            <br />
            admissionYear,
            <br />
            graduationYear,
            <br />
            internalMarks,
            <br />
            externalMarks,
            <br />
            internalDetained,
            <br />
            externalDetained
          </div>
        </div>

        <div className="card" style={{ marginBottom: "1rem" }}>
          <h3
            style={{
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "0.75rem",
            }}
          >
            ✅ Validation Rules
          </h3>
          {[
            "URN must be unique",
            "internalDetained: true/false",
            "Marks must be ≥ 0",
            "Course must match allowed list",
            "Branch must match course",
          ].map((rule, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.4rem",
              }}
            >
              <CheckCircle
                size={13}
                style={{ color: "var(--success)", flexShrink: 0 }}
              />
              <p
                style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}
              >
                {rule}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "rgba(245,158,11,0.08)",
            border: "1px solid rgba(245,158,11,0.2)",
            borderRadius: "12px",
            padding: "1rem",
          }}
        >
          <div
            style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}
          >
            <AlertCircle
              size={15}
              style={{
                color: "var(--warning)",
                flexShrink: 0,
                marginTop: "1px",
              }}
            />
            <div>
              <p
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "var(--warning)",
                  marginBottom: "0.3rem",
                }}
              >
                Important Note
              </p>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                Uploading data for an existing semester will overwrite the
                previous records. Ensure the CSV is verified before processing.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
