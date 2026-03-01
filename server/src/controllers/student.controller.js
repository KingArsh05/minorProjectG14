import { Student } from "../models/students.model.js";
import "../models/subjects.model.js"; // register Subject schema for populate
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

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
