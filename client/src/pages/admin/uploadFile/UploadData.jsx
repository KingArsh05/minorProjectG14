import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import {
  Upload,
  CheckCircle,
  X,
  CloudUpload,
  FileSpreadsheet,
  AlertCircle,
  Send,
  Settings,
  TableProperties,
  Info,
  Download,
} from "lucide-react";
import axios from "axios";

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

const courseDurationMap = {
  "B.Tech": 4,
  "M.Tech": 2,
  MBA: 2,
  MCA: 2,
  "B.Voc.": 3,
  "B.Com": 3,
  BBA: 3,
  BCA: 3,
  "B.Arch": 5,
};

const INPUT =
  "w-full h-[54px] rounded-2xl border border-[#232844] bg-[#161925] px-5 text-[0.95rem] text-white outline-none focus:border-[#6366f1] transition-all appearance-none cursor-pointer";
const LABEL = "block text-[0.8rem] font-semibold text-[#5e6787] mb-2";

export default function UploadData() {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [batch, setBatch] = useState("");
  const [previewHeaders, setPreviewHeaders] = useState([]);
  const [previewData, setPreviewData] = useState([]);
  const [step, setStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [processedRecords, setProcessedRecords] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef();

  const API_URL = import.meta.env.VITE_API_URL;

  const handleFile = async (f) => {
    if (!f) return;

    setFile(f);
    const ext = f.name.split(".").pop().toLowerCase();

    try {
      let headers = [];
      let parsed = [];

      if (ext === "csv") {
        // Parse CSV
        const text = await f.text();
        const lines = text.split("\n").filter((l) => l.trim() !== "");

        if (lines.length > 1) {
          headers = lines[0].split(",").map((h) => h.trim());
          parsed = lines.slice(1).map((line) => {
            const values = line.split(",").map((v) => v.trim());
            const obj = {};
            headers.forEach((h, i) => {
              obj[h] = values[i] ?? "";
            });
            return obj;
          });
        }
      } else if (ext === "xlsx" || ext === "xls") {
        // Parse Excel
        const data = await f.arrayBuffer();
        const workbook = XLSX.read(data, { type: "array" });

        // Read first sheet
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, {
          header: 1, // Returns array of arrays
          defval: "", // Default value for empty cells
          blankrows: false, // Skip empty rows
        });

        if (jsonData.length > 1) {
          headers = jsonData[0].map((h) => String(h).trim());
          parsed = jsonData.slice(1).map((row) => {
            const obj = {};
            headers.forEach((h, i) => {
              obj[h] = row[i] ?? "";
            });
            return obj;
          });
        }
      }

      setPreviewHeaders(headers);
      setPreviewData(parsed);
      setStep(2);
    } catch (err) {
      console.error("File parse error:", err);
      setErrorMsg("Failed to parse file. Please check the format.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleProcess = async () => {
    if (!file || !course || !branch || !semester || !batch) return;

    const academic_details = {
      course,
      branch,
      semester,
      batch,
    };
    setUploading(true);
    setErrorMsg("");

    try {
      const normalizedUserObject = previewData.map((u) => {
        const subjects = [];

        for (let i = 1; i <= 6; i++) {
          const internalMarks = Number(u[`sub${i}_int`]);
          const externalMarks = Number(u[`sub${i}_ext`]);

          const internalDetained = u[`sub${i}_intDet`] === "true";
          const externalDetained = u[`sub${i}_extDet`] === "true";

          subjects.push({
            subject: u[`sub${i}_code`],
            internalMarks,
            externalMarks,
            totalMarks: internalMarks + externalMarks,
            internalDetained,
            externalDetained,
            status:
              internalDetained || externalDetained
                ? "Detained"
                : internalMarks + externalMarks >= 40
                  ? "Pass"
                  : "Fail",
          });
        }

        return {
          fullName: u.fullName,
          guardianEmail: u.guardianEmail,
          urn: Number(u.urn),
          crn: Number(u.crn),

          course: academic_details.course,
          branch: academic_details.branch,

          admissionYear: Number(academic_details.batch.split("-")[0]),
          graduationYear: Number(academic_details.batch.split("-")[1]),

          semesters: [
            {
              semesterNumber: Number(academic_details.semester),
              sgpa: Number(u.sgpa),
              subjects,
            },
          ],
        };
      });

      console.log({ normalizedUserObject });

      const { data } = await axios.post(
        `${API_URL}/students/upload`,
        normalizedUserObject,
        {
          withCredentials: true,
        },
      );



      if (data.success) {
        setProcessedRecords(data.data.upsertedCount);
        setStep(3);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || "Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  const branches = courseBranchMap[course] || [];

  if (step === 3) {
    return (
      <div className="w-full mx-auto mt-4 fade-in">
        <div className="rounded-3xl h-[72vh] flex flex-col justify-center items-center border border-[#252b42] bg-[#11131f] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[260px] h-[40vh] bg-[#10b981]/10 blur-3xl pointer-events-none" />

          <div className="relative text-center">
            <div className="w-[70px] h-[70px] rounded-full border border-emerald-500/20 bg-emerald-500/10 flex items-center justify-center mx-auto mb-6 shadow-[0_15px_40px_rgba(16,185,129,0.12)]">
              <CheckCircle size={36} className="text-emerald-400" />
            </div>

            <h2 className="text-[24px] font-bold text-white font-outfit">
              Upload Successful
            </h2>

            <p className="text-[#8b93b2] text-sm leading-relaxed max-w-[400px] mx-auto mt-2">
              Successfully processed and stored{" "}
              <span className="text-[#818cf8] font-semibold">
                {processedRecords}
              </span>{" "}
              student records from{" "}
              <span className="text-[#e2e8f0] font-medium">{file?.name}</span>.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { l: "Records Processed", v: processedRecords },
              { l: "Course Selected", v: course },
              { l: "Semester Selected", v: semester },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-[22px] border border-[#252b42] bg-[#141826] p-5 text-center transition-all hover:border-[#353d60]"
              >
                <p className="text-[1.8rem] font-bold text-[#818cf8] font-outfit mb-1">
                  {s.v}
                </p>
                <p className="text-[0.8rem] text-[#697292] font-medium">
                  {s.l}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => {
                setStep(1);
                setFile(null);
              }}
              className="h-[54px] px-6 rounded-2xl border border-[#252b42] bg-[#171b2a] hover:bg-[#1c2133] text-[#9ba2c0] hover:text-white font-medium transition-all"
            >
              Upload More
            </button>
            <button
              onClick={() => (window.location.href = "/admin/notifications")}
              className="h-[54px] px-6 rounded-2xl bg-[#6366f1] hover:bg-[#5855eb] text-white font-semibold shadow-[0_12px_35px_rgba(99,102,241,0.24)] transition-all flex items-center justify-center gap-2"
            >
              <Send size={18} />
              Send Notifications
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full flex-col xl:flex-row gap-5 fade-in">
      <div className="w-full flex flex-col lg:flex-row gap-4">
        {/* Left Panel */}
        <div className="w-[70vw] flex flex-col gap-5">
          {/* Upload Card */}
          <div className="rounded-3xl h-[40vh] flex flex-col border border-[#252b42] bg-[#11131f] p-6 shadow-[0_15px_45px_rgba(0,0,0,0.28)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-[#181c2c] border border-[#2b3350] flex items-center justify-center">
                <CloudUpload size={18} className="text-[#818cf8]" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white font-outfit">
                  {step === 1 ? "Upload Data File" : "File Selected"}
                </h2>
                <p className="text-[#68708f] text-[10px] mt-1">
                  {step === 1
                    ? "Select CSV or Excel file to process"
                    : "Ready for configuration and processing"}
                </p>
              </div>
            </div>

            {!file ? (
              <div
                className={`relative flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-[28px] py-6 px-8 text-center transition-all cursor-pointer ${
                  dragOver
                    ? "border-[#6366f1] bg-[#6366f1]/10"
                    : "border-[#2e3354] bg-[#141826] hover:border-[#6366f1]/50 hover:bg-[#1a1e30]"
                }`}
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
                <div
                  className={`w-[70px] h-[70px] mx-auto rounded-full bg-[#181c2c] border border-[#2b3350] flex items-center justify-center mb-5 transition-transform ${dragOver ? "scale-110" : ""}`}
                >
                  <CloudUpload size={32} className="text-[#818cf8]" />
                </div>
                <p className="text-[1.05rem] font-semibold text-white mb-2">
                  Drop your file here or click to browse
                </p>
                <p className="text-[#68708f] text-sm">
                  Supports{" "}
                  <span className="text-[#818cf8] font-medium">.csv</span>,{" "}
                  <span className="text-[#22d3ee] font-medium">.xlsx</span>,{" "}
                  <span className="text-[#22d3ee] font-medium">.xls</span> (max
                  10 MB)
                </p>
              </div>
            ) : (
              <div className="rounded-[24px] border border-[#20253b] bg-[#141826] p-5 flex items-center gap-4">
                <div className="w-[52px] h-[52px] rounded-2xl border border-[#10b981]/20 bg-[#10b981]/10 flex items-center justify-center shrink-0">
                  <FileSpreadsheet size={24} className="text-[#10b981]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-[0.95rem] truncate">
                    {file.name}
                  </h3>
                  <p className="text-[#10b981] text-[0.75rem] font-medium mt-0.5">
                    {(file.size / 1024).toFixed(1)} KB — Ready to process
                  </p>
                </div>
                <button
                  onClick={() => {
                    setFile(null);
                    setStep(1);
                  }}
                  className="w-10 h-10 rounded-xl border border-[#252b42] bg-[#171b2a] hover:bg-[#1c2133] hover:border-red-500/30 text-[#9ba2c0] hover:text-red-400 transition-all flex items-center justify-center shrink-0"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Config Card */}
          <div
            className={`transition-all duration-500 ${!file ? "opacity-50 pointer-events-none" : "opacity-100"}`}
          >
            <div className="rounded-3xl h-[32vh] flex flex-col border border-[#252b42] bg-[#11131f] p-6 shadow-[0_15px_45px_rgba(0,0,0,0.28)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-2xl bg-[#181c2c] border border-[#2b3350] flex items-center justify-center">
                  <Settings size={18} className="text-[#22d3ee]" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white font-outfit">
                    Upload Configuration
                  </h2>
                  <p className="text-[#68708f] text-[10px] mt-1">
                    Set academic parameters for the uploaded data
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={LABEL}>Course</label>
                  <select
                    className={INPUT}
                    value={course}
                    onChange={(e) => {
                      setCourse(e.target.value);
                      setBranch("");
                      setBatch("");
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
                  <label className={LABEL}>Batch</label>
                  <select
                    className={INPUT}
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    disabled={!course}
                  >
                    <option value="">Select batch</option>
                    {course &&
                      Array.from({ length: 6 }, (_, i) => {
                        const startYear = new Date().getFullYear() - i;
                        const dur = courseDurationMap[course] || 4;
                        return `${startYear}-${startYear + dur}`;
                      }).map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar (30%) */}
        <div className="w-[30vw] flex flex-col gap-5">
          <div className="rounded-3xl h-[40vh] flex flex-col border border-[#20253b] bg-[#11131f] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.28)]">
            <div className="relative flex items-center gap-3 mb-5 shrink-0">
              <div className="w-10 h-10 rounded-2xl bg-[#181c2c] border border-[#2b3350] flex items-center justify-center">
                <Info size={16} className="text-[#a78bfa]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-outfit">
                  Data Structure Guide
                </h3>
                <p className="text-[#68708f] text-[10px] mt-1">
                  Expected schema for student records
                </p>
              </div>

              <div className="absolute flex items-center justify-end right-0 top-0">
                <a
                  href="/student_upload_template.csv"
                  download
                  className="flex items-center gap-2 text-xs font-medium text-[#22d3ee] bg-[#22d3ee]/10 hover:bg-[#22d3ee]/20 px-3 py-1.5 rounded-xl transition-all border border-[#22d3ee]/20"
                >
                  <Download size={14} /> Template
                </a>
              </div>
            </div>

            <div className="bg-[#141826] border border-[#20253b] rounded-2xl p-4 font-mono text-[0.75rem] leading-[1.8] overflow-y-auto flex-1 custom-scrollbar shadow-inner">
              <span className="text-[#5e6787] text-bold mb-1">
                // Core Details
              </span>
              <p className="text-[#22d3ee] mb-4">
                urn, crn, fullName, guardianEmail
              </p>
              <span className="text-[#5e6787] text-bold mb-1">
                // Semester Data
              </span>
              <p className="text-[#818cf8] mb-4">sgpa</p>
              <span className="text-[#5e6787] mb-1">
                // Subjects (Columns sub1 to sub6)
              </span>
              <p className="text-[#10b981]">
                subX_code, subX_int, subX_ext, subX_intDet, subX_extDet
              </p>
            </div>
          </div>

          <div className="rounded-3xl h-[32vh] flex flex-col border border-[#20253b] bg-[#11131f] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.28)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-[#181c2c] border border-[#2b3350] flex items-center justify-center">
                <CheckCircle size={16} className="text-[#10b981]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-outfit">
                  Validation Rules
                </h3>
                <p className="text-[#68708f] text-[10px] mt-1">
                  Data integrity checks
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                "URN must be unique across records",
                "internalDetained: boolean (true/false)",
                "Marks values must be ≥ 0",
                "Course must match allowed system list",
                "Branch must map correctly to course",
              ].map((r, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 mt-0.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center shrink-0">
                    <CheckCircle size={10} className="text-[#10b981]" />
                  </div>
                  <p className="text-[0.8rem] text-[#8b93b2] leading-relaxed">
                    {r}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Preview Card (100% width) */}
      {file && (
        <div className="w-full relative rounded-3xl border border-[#252b42] bg-[#11131f] p-6 shadow-[0_15px_45px_rgba(0,0,0,0.28)] flex flex-col animation-slide-up mt-5">
          <div className="absolute top-6 right-6 flex items-center gap-3 z-20">
            <button
              className="h-[44px] px-5 rounded-xl border border-[#252b42] bg-[#171b2a] hover:bg-[#1c2133] text-[#9ba2c0] hover:text-white font-medium transition-all inline-flex items-center justify-center gap-2"
              onClick={() => {
                setFile(null);
                setStep(1);
              }}
            >
              <X size={16} /> Cancel
            </button>
            <button
              className="h-[44px] px-6 rounded-xl bg-[#6366f1] hover:bg-[#5855eb] text-white font-semibold shadow-[0_12px_30px_rgba(99,102,241,0.2)] transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              onClick={handleProcess}
              disabled={uploading || !file || !course || !batch || !semester}
            >
              {uploading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Upload size={16} /> Process & Save
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-3 mb-5 shrink-0">
            <div className="w-11 h-11 rounded-2xl bg-[#181c2c] border border-[#2b3350] flex items-center justify-center">
              <TableProperties size={18} className="text-[#a78bfa]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white font-outfit">
                Data Preview
              </h2>
              <p className="text-[#68708f] text-[10px] mt-1">
                Showing all rows from the uploaded file
              </p>
            </div>
          </div>

          <div className="overflow-x-auto overflow-y-auto max-h-[50vh] custom-scrollbar mb-2 rounded-2xl border border-[#252b42] bg-[#141826]">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-[#161a28] z-10">
                <tr>
                  {previewHeaders.map((h, idx) => (
                    <th
                      key={idx}
                      className="px-5 py-4 text-[#697292] text-[0.72rem] font-bold tracking-widest uppercase border-b border-[#252b42] whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#252b42]">
                {previewData.map((r, i) => (
                  <tr key={i} className="hover:bg-[#1a1e30] transition-colors">
                    {previewHeaders.map((h, idx) => (
                      <td
                        key={idx}
                        className="px-5 py-4 font-mono text-[#9ba2c0] text-[0.82rem] whitespace-nowrap"
                      >
                        {r[h]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {errorMsg && (
            <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {errorMsg}
            </div>
          )}
        </div>
      )}

      <div className="w-full rounded-[24px] border border-amber-500/20 bg-amber-500/5 p-5 shadow-[0_10px_30px_rgba(245,158,11,0.05)] mt-5">
        <div className="flex gap-3 items-start">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
            <AlertCircle size={16} className="text-amber-500" />
          </div>
          <div>
            <p className="text-[0.85rem] font-bold text-amber-500 mb-1">
              Important Note
            </p>
            <p className="text-[0.75rem] text-amber-500/70 leading-relaxed">
              Uploading data for an existing semester will overwrite the
              previous records. Ensure the CSV is verified before processing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
