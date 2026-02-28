import { useState, useRef } from "react";
import {
  Upload,
  CheckCircle,
  X,
  CloudUpload,
  FileSpreadsheet,
  AlertCircle,
  Send,
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

// Shared class strings
const INPUT =
  "w-full bg-[#161925] border border-[#252840] text-[#f0f1fa] px-4 py-[0.65rem] rounded-xl text-sm outline-none transition-all focus:border-[#6366f1] appearance-none cursor-pointer";
const CARD =
  "bg-[#13162b] border border-[#252840] rounded-2xl p-6 transition-colors hover:border-[#2e3354]";
const LABEL =
  "block text-[0.78rem] font-semibold text-[#5c6385] tracking-wide uppercase mb-[0.4rem]";

export default function UploadData() {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [step, setStep] = useState(1);
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
      <div className="fade-in max-w-[560px] mx-auto mt-12 text-center">
        <div className="w-20 h-20 rounded-full bg-[rgba(16,185,129,0.15)] border-2 border-[#10b981] flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={36} color="#10b981" />
        </div>
        <h2
          className="text-[1.5rem] font-extrabold text-[#f0f1fa] mb-2"
          style={{ fontFamily: "Outfit,sans-serif" }}
        >
          Upload Successful!
        </h2>
        <p className="text-[#5c6385] text-[0.9rem] mb-6">
          {previewData.length} student records from{" "}
          <strong className="text-[#9ba2c0]">{file?.name}</strong> have been
          processed and stored.
        </p>
        <div className={`${CARD} grid grid-cols-3 gap-4 text-center mb-6`}>
          {[
            { l: "Records", v: previewData.length },
            { l: "Course", v: course || "B.Tech" },
            { l: "Semester", v: semester || "4" },
          ].map((s) => (
            <div key={s.l}>
              <p
                className="text-[1.3rem] font-extrabold text-[#818cf8]"
                style={{ fontFamily: "Outfit,sans-serif" }}
              >
                {s.v}
              </p>
              <p className="text-[0.7rem] text-[#5c6385]">{s.l}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-3 justify-center">
          <button
            className="inline-flex items-center gap-2 px-5 py-[0.6rem] rounded-xl text-[#9ba2c0] text-sm font-medium bg-[#1e2132] border border-[#2e3354] hover:text-[#f0f1fa] hover:border-[#6366f1] transition-all cursor-pointer"
            onClick={() => {
              setStep(1);
              setFile(null);
            }}
          >
            Upload More
          </button>
          <button className="inline-flex items-center gap-2 px-5 py-[0.6rem] rounded-xl text-white text-sm font-semibold bg-linear-to-br from-[#6366f1] to-[#4f46e5] shadow-[0_4px_15px_rgba(99,102,241,0.25)] hover:-translate-y-px transition-all cursor-pointer">
            <Send size={14} /> Send Notifications
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in grid grid-cols-[1fr_320px] gap-6">
      {/* Left */}
      <div>
        {/* Drop zone */}
        <div className={CARD + " mb-5"}>
          <h3 className="text-[0.95rem] font-bold text-[#f0f1fa] mb-4">
            {step === 1 ? "📁 Upload CSV / Excel File" : "✅ File Selected"}
          </h3>
          {!file ? (
            <div
              className={`border-2 border-dashed rounded-2xl py-12 px-8 text-center transition-all cursor-pointer ${dragOver ? "border-[#6366f1] bg-[rgba(99,102,241,0.05)]" : "border-[#2e3354] hover:border-[#6366f1] hover:bg-[rgba(99,102,241,0.03)]"}`}
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
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
              />
              <CloudUpload
                size={40}
                className="text-[#818cf8] mx-auto mb-4 opacity-80"
              />
              <p className="text-[1rem] font-semibold text-[#f0f1fa] mb-1">
                Drop your file here or click to browse
              </p>
              <p className="text-[0.8rem] text-[#5c6385]">
                Supports <strong className="text-[#818cf8]">.csv</strong>,{" "}
                <strong className="text-[#22d3ee]">.xlsx</strong>,{" "}
                <strong className="text-[#22d3ee]">.xls</strong> — max 10 MB
              </p>
            </div>
          ) : (
            <div className="bg-[rgba(16,185,129,0.05)] border border-[rgba(16,185,129,0.2)] rounded-xl p-4 flex items-center gap-3">
              <FileSpreadsheet size={28} className="text-[#10b981]" />
              <div className="flex-1">
                <p className="text-[0.9rem] font-semibold text-[#f0f1fa]">
                  {file.name}
                </p>
                <p className="text-[0.75rem] text-[#5c6385]">
                  {(file.size / 1024).toFixed(1)} KB — ready to process
                </p>
              </div>
              <button
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1e2132] border border-[#252840] text-[#9ba2c0] hover:border-[#6366f1] hover:text-[#818cf8] transition-all cursor-pointer"
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
        <div className={CARD + " mb-5"}>
          <h3 className="text-[0.95rem] font-bold text-[#f0f1fa] mb-4">
            ⚙️ Upload Configuration
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={LABEL}>Course</label>
              <select
                className={INPUT}
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
              <label className={LABEL}>Branch</label>
              <select
                className={INPUT}
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
              <label className={LABEL}>Semester</label>
              <select
                className={INPUT}
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
              <label className={LABEL}>Academic Year</label>
              <select className={INPUT}>
                <option>2024-25</option>
                <option>2023-24</option>
              </select>
            </div>
          </div>
        </div>

        {/* Preview */}
        {file && (
          <div className={CARD}>
            <h3 className="text-[0.95rem] font-bold text-[#f0f1fa] mb-4">
              📊 Data Preview (first 4 rows)
            </h3>
            <div className="overflow-x-auto mb-4">
              <table
                className="w-full"
                style={{ borderCollapse: "separate", borderSpacing: 0 }}
              >
                <thead>
                  <tr>
                    {[
                      "URN",
                      "CRN",
                      "Full Name",
                      "Branch",
                      "Semester",
                      "SGPA",
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
                  {previewData.map((r) => (
                    <tr
                      key={r.urn}
                      className="border-b border-[#252840] hover:bg-[#1e2132] transition-colors"
                    >
                      <td className="px-4 py-3 font-mono text-[#818cf8] text-[0.8rem]">
                        {r.urn}
                      </td>
                      <td className="px-4 py-3 font-mono text-[#9ba2c0] text-[0.8rem]">
                        {r.crn}
                      </td>
                      <td className="px-4 py-3 text-[#f0f1fa] text-[0.82rem]">
                        {r.name}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-[0.65rem] py-[0.2rem] rounded-full text-[0.72rem] font-semibold bg-[rgba(99,102,241,0.15)] text-[#818cf8] border border-[rgba(99,102,241,0.25)]">
                          {r.branch}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#9ba2c0] text-[0.82rem]">
                        Sem {r.sem}
                      </td>
                      <td className="px-4 py-3 font-bold text-[#22d3ee]">
                        {r.sgpa}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex gap-3">
              <button
                className="inline-flex items-center gap-2 px-5 py-[0.6rem] rounded-xl text-[#9ba2c0] text-sm bg-[#1e2132] border border-[#2e3354] hover:border-[#6366f1] hover:text-[#f0f1fa] transition-all cursor-pointer"
                onClick={() => {
                  setFile(null);
                  setStep(1);
                }}
              >
                <X size={14} /> Cancel
              </button>
              <button
                className="inline-flex items-center gap-2 px-5 py-[0.6rem] rounded-xl text-white text-sm font-semibold bg-linear-to-br from-[#6366f1] to-[#4f46e5] shadow-[0_4px_15px_rgba(99,102,241,0.25)] hover:-translate-y-px transition-all cursor-pointer disabled:opacity-60"
                onClick={handleProcess}
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    &nbsp;Processing…
                  </>
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

      {/* Right sidebar */}
      <div>
        <div className={CARD + " mb-4"}>
          <h3 className="text-[0.85rem] font-bold text-[#f0f1fa] mb-3">
            📋 CSV Format Guide
          </h3>
          <div className="bg-[#161925] rounded-lg px-3 py-3 font-mono text-[0.72rem] text-[#22d3ee] leading-[1.8] overflow-x-auto">
            <span className="text-[#5c6385]">// Required headers:</span>
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

        <div className={CARD + " mb-4"}>
          <h3 className="text-[0.85rem] font-bold text-[#f0f1fa] mb-3">
            ✅ Validation Rules
          </h3>
          {[
            "URN must be unique",
            "internalDetained: true/false",
            "Marks must be ≥ 0",
            "Course must match allowed list",
            "Branch must match course",
          ].map((r, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <CheckCircle size={13} className="text-[#10b981] shrink-0" />
              <p className="text-[0.78rem] text-[#9ba2c0]">{r}</p>
            </div>
          ))}
        </div>

        <div className="bg-[rgba(245,158,11,0.08)] border border-[rgba(245,158,11,0.2)] rounded-xl p-4">
          <div className="flex gap-2 items-start">
            <AlertCircle size={15} className="text-[#f59e0b] shrink-0 mt-px" />
            <div>
              <p className="text-[0.78rem] font-semibold text-[#f59e0b] mb-1">
                Important Note
              </p>
              <p className="text-[0.75rem] text-[#9ba2c0] leading-relaxed">
                Uploading data for an existing semester will overwrite the
                previous records. Ensure the CSV is verified before processing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
