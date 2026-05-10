import { Student } from "../models/students.model.js";
import { Subject } from "../models/subjects.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Readable } from "stream";
import csvParser from "csv-parser";

// ─── GET /api/students ──────────────────────────────────────────
export const getAllStudents = asyncHandler(async (req, res) => {
  const { course, search } = req.query;

  const filter = {};

  if (course && course !== "All") {
    filter.course = course;
  }

  if (search) {
    const q = search.trim();
    filter.$or = [
      { fullName: { $regex: q, $options: "i" } },
      { branch: { $regex: q, $options: "i" } },
    ];
    // If the search looks like a number, also search URN/CRN
    if (!isNaN(q)) {
      filter.$or.push({ urn: Number(q) }, { crn: Number(q) });
    }
  }

  const students = await Student.find(filter)
    .populate(
      "semesters.subjects.subject",
      "subjectTitle subjectCode type credits maxTotalMarks",
    )
    .sort({ urn: 1 })
    .lean();

  res
    .status(200)
    .json(new ApiResponse(students, "Students fetched successfully"));
});

// ─── GET /api/students/stats ────────────────────────────────────
export const getDashboardStats = asyncHandler(async (req, res) => {
  const [totalStudents, detainedStudents, branchAgg, cgpaAgg, courseList] =
    await Promise.all([
      Student.countDocuments(),
      Student.countDocuments({ "semesters.subjects.status": "Detained" }),
      Student.aggregate([
        { $match: { branch: { $ne: null } } },
        { $group: { _id: "$branch", students: { $sum: 1 } } },
        { $sort: { students: -1 } },
      ]),
      Student.aggregate([
        { $match: { cgpa: { $gt: 0 } } },
        { $group: { _id: null, avgCGPA: { $avg: "$cgpa" } } },
      ]),
      Student.distinct("course"),
    ]);

  const branchDistribution = branchAgg.map((b) => ({
    branch: b._id
      .split(" ")
      .map((w) => w[0])
      .join(""), // e.g. "CSE"
    fullName: b._id,
    students: b.students,
  }));

  const avgCGPA = cgpaAgg.length ? cgpaAgg[0].avgCGPA.toFixed(2) : "0.00";

  const stats = {
    totalStudents,
    detainedStudents,
    coursesOffered: courseList.length,
    avgCGPA,
    branchDistribution,
  };

  res.status(200).json(new ApiResponse(stats, "Dashboard stats fetched"));
});

// ─── GET /api/students/:id ──────────────────────────────────────
export const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id)
    .populate(
      "semesters.subjects.subject",
      "subjectTitle subjectCode type credits maxInternalMarks maxExternalMarks maxTotalMarks",
    )
    .lean();

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  res
    .status(200)
    .json(new ApiResponse(student, "Student fetched successfully"));
});

// ─── POST /api/students/upload ──────────────────────────────────
export const uploadStudents = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "No CSV file uploaded");
  }

  const { course, branch, semester, batch } = req.body;
  if (!course || !semester || !batch) {
    throw new ApiError(400, "Course, semester, and batch must be provided in the request body");
  }

  const [admissionYearStr, graduationYearStr] = batch.split("-");
  const admissionYear = Number(admissionYearStr);
  const graduationYear = Number(graduationYearStr);

  const courseDurationMap = {
    "B.Tech": 4,
    "M.Tech": 2,
    "MBA": 2,
    "MCA": 2,
    "B.Voc.": 3,
    "B.Com": 3,
    "BBA": 3,
    "BCA": 3,
    "B.Arch": 5,
  };
  const duration = courseDurationMap[course] || 4;
  const semNum = Number(semester);

  const results = [];
  const stream = Readable.from(req.file.buffer);

  await new Promise((resolve, reject) => {
    stream
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", resolve)
      .on("error", reject);
  });

  // Parse wide format (1 row = 1 student)
  const studentsToProcess = [];
  const uniqueSubjectCodes = new Set();

  results.forEach((row) => {
    const urn = Number(row.urn);
    if (!urn) return; // skip invalid rows

    const studentData = {
      urn,
      crn: Number(row.crn),
      fullName: row.fullName,
      guardianEmail: row.guardianEmail,
      course: course,
      branch: branch || null,
      admissionYear: admissionYear,
      graduationYear: graduationYear,
      semesterNumber: semNum,
      sgpa: Number(row.sgpa) || 0,
      subjects: [],
    };

    // Extract up to 6 subjects
    for (let i = 1; i <= 6; i++) {
      const code = row[`sub${i}_code`];
      if (code && code.trim()) {
        const cleanCode = code.trim().toUpperCase();
        uniqueSubjectCodes.add(cleanCode);
        studentData.subjects.push({
          subjectCode: cleanCode,
          internalMarks: Number(row[`sub${i}_int`]) || 0,
          externalMarks: Number(row[`sub${i}_ext`]) || 0,
          internalDetained: row[`sub${i}_intDet`] === "true" || row[`sub${i}_intDet`] === "TRUE",
          externalDetained: row[`sub${i}_extDet`] === "true" || row[`sub${i}_extDet`] === "TRUE",
        });
      }
    }

    studentsToProcess.push(studentData);
  });

  // Look up ObjectIDs for all unique subject codes
  const subjectsFromDb = await Subject.find({
    subjectCode: { $in: Array.from(uniqueSubjectCodes) },
  }).lean();

  const subjectMap = {};
  subjectsFromDb.forEach((sub) => {
    subjectMap[sub.subjectCode.toUpperCase()] = sub._id;
  });

  // Check if any subject code from CSV is invalid
  const invalidSubjects = [];
  uniqueSubjectCodes.forEach((code) => {
    if (!subjectMap[code]) invalidSubjects.push(code);
  });

  if (invalidSubjects.length > 0) {
    throw new ApiError(
      400,
      `Invalid subject codes found in CSV: ${invalidSubjects.join(", ")}`
    );
  }

  // Update or create students
  const promises = studentsToProcess.map(async (studentData) => {
    const preparedSubjects = studentData.subjects.map((sub) => ({
      subject: subjectMap[sub.subjectCode],
      internalMarks: sub.internalMarks,
      externalMarks: sub.externalMarks,
      internalDetained: sub.internalDetained,
      externalDetained: sub.externalDetained,
    }));

    const newSemester = {
      semesterNumber: studentData.semesterNumber,
      sgpa: studentData.sgpa,
      subjects: preparedSubjects,
    };

    // Find student by URN
    let student = await Student.findOne({ urn: studentData.urn });

    if (!student) {
      // Create new student
      student = new Student({
        urn: studentData.urn,
        crn: studentData.crn,
        fullName: studentData.fullName,
        guardianEmail: studentData.guardianEmail,
        course: studentData.course,
        branch: studentData.branch,
        admissionYear: studentData.admissionYear,
        graduationYear: studentData.graduationYear,
        semesters: [newSemester],
      });
    } else {
      // Update core fields
      student.crn = studentData.crn;
      student.fullName = studentData.fullName;
      student.guardianEmail = studentData.guardianEmail;
      student.course = studentData.course;
      student.branch = studentData.branch;
      student.admissionYear = studentData.admissionYear;
      student.graduationYear = studentData.graduationYear;

      // Check if semester already exists, if so remove it
      student.semesters = student.semesters.filter(
        (s) => s.semesterNumber !== studentData.semesterNumber
      );
      // Push new semester
      student.semesters.push(newSemester);
    }

    await student.save();
  });

  await Promise.all(promises);

  res
    .status(200)
    .json(
      new ApiResponse(
        { processedRecords: studentsToProcess.length },
        "Student records uploaded and processed successfully"
      )
    );
});
