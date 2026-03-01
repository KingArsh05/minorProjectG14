import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import mongoose from "mongoose";
import connectDB from "../db/index.js";
import { Student } from "../models/students.model.js";
import { Subject } from "../models/subjects.model.js";
import { courseBranchMap } from "../utils/courseBranchMap.js";

// ─── Realistic Indian Names ───────────────────────────────────────
const firstNames = [
  "Aarav",
  "Vivaan",
  "Aditya",
  "Vihaan",
  "Arjun",
  "Sai",
  "Reyansh",
  "Ayaan",
  "Krishna",
  "Ishaan",
  "Shaurya",
  "Atharv",
  "Advik",
  "Pranav",
  "Dhruv",
  "Kabir",
  "Ritvik",
  "Aarush",
  "Karan",
  "Arshdeep",
  "Ananya",
  "Diya",
  "Myra",
  "Sara",
  "Aarohi",
  "Anika",
  "Navya",
  "Ira",
  "Riya",
  "Prisha",
  "Kavya",
  "Tanya",
  "Sanya",
  "Mehak",
  "Simran",
  "Harleen",
  "Jasmine",
  "Ramanpreet",
  "Gurvinder",
  "Sukhmani",
  "Manpreet",
  "Harjot",
  "Gurman",
  "Ekam",
  "Jaskaran",
  "Lovepreet",
  "Rohit",
  "Mohit",
  "Sahil",
  "Nikhil",
  "Rahul",
  "Amit",
  "Sumit",
  "Gaurav",
  "Varun",
  "Tarun",
  "Ankur",
  "Deepak",
  "Rajat",
  "Kunal",
];

const lastNames = [
  "Sharma",
  "Singh",
  "Kumar",
  "Gupta",
  "Patel",
  "Verma",
  "Joshi",
  "Kaur",
  "Malhotra",
  "Chopra",
  "Khanna",
  "Mehra",
  "Bhatia",
  "Sethi",
  "Arora",
  "Kapoor",
  "Bansal",
  "Garg",
  "Rana",
  "Thakur",
  "Dhillon",
  "Grewal",
  "Gill",
  "Sandhu",
  "Sidhu",
  "Brar",
  "Mann",
  "Bajwa",
  "Saini",
  "Chahal",
  "Pannu",
  "Cheema",
  "Randhawa",
  "Johal",
];

// ─── Subject Data per Semester (B.Tech CSE) ───────────────────────
const subjectsBySemester = {
  1: [
    {
      subjectTitle: "Engineering Mathematics-I",
      subjectCode: "BTAM101",
      type: "T",
      credits: 4,
      maxInternal: 40,
      maxExternal: 60,
      maxTotal: 100,
      minInternal: 16,
      minExternal: 24,
      minTotal: 40,
    },
    {
      subjectTitle: "Engineering Physics",
      subjectCode: "BTPH101",
      type: "T",
      credits: 4,
      maxInternal: 40,
      maxExternal: 60,
      maxTotal: 100,
      minInternal: 16,
      minExternal: 24,
      minTotal: 40,
    },
    {
      subjectTitle: "Programming in C",
      subjectCode: "BTCS101",
      type: "T",
      credits: 4,
      maxInternal: 40,
      maxExternal: 60,
      maxTotal: 100,
      minInternal: 16,
      minExternal: 24,
      minTotal: 40,
    },
    {
      subjectTitle: "Communication Skills",
      subjectCode: "BTHU101",
      type: "T",
      credits: 3,
      maxInternal: 40,
      maxExternal: 60,
      maxTotal: 100,
      minInternal: 16,
      minExternal: 24,
      minTotal: 40,
    },
    {
      subjectTitle: "C Programming Lab",
      subjectCode: "BTCS111",
      type: "P",
      credits: 2,
      maxInternal: 30,
      maxExternal: 20,
      maxTotal: 50,
      minInternal: 12,
      minExternal: 8,
      minTotal: 25,
    },
    {
      subjectTitle: "Physics Lab",
      subjectCode: "BTPH111",
      type: "P",
      credits: 1,
      maxInternal: 30,
      maxExternal: 20,
      maxTotal: 50,
      minInternal: 12,
      minExternal: 8,
      minTotal: 25,
    },
  ],
  2: [
    {
      subjectTitle: "Engineering Mathematics-II",
      subjectCode: "BTAM201",
      type: "T",
      credits: 4,
      maxInternal: 40,
      maxExternal: 60,
      maxTotal: 100,
      minInternal: 16,
      minExternal: 24,
      minTotal: 40,
    },
    {
      subjectTitle: "Engineering Chemistry",
      subjectCode: "BTCH201",
      type: "T",
      credits: 4,
      maxInternal: 40,
      maxExternal: 60,
      maxTotal: 100,
      minInternal: 16,
      minExternal: 24,
      minTotal: 40,
    },
    {
      subjectTitle: "Data Structures",
      subjectCode: "BTCS201",
      type: "T",
      credits: 4,
      maxInternal: 40,
      maxExternal: 60,
      maxTotal: 100,
      minInternal: 16,
      minExternal: 24,
      minTotal: 40,
    },
    {
      subjectTitle: "Digital Electronics",
      subjectCode: "BTEC201",
      type: "T",
      credits: 3,
      maxInternal: 40,
      maxExternal: 60,
      maxTotal: 100,
      minInternal: 16,
      minExternal: 24,
      minTotal: 40,
    },
    {
      subjectTitle: "Data Structures Lab",
      subjectCode: "BTCS211",
      type: "P",
      credits: 2,
      maxInternal: 30,
      maxExternal: 20,
      maxTotal: 50,
      minInternal: 12,
      minExternal: 8,
      minTotal: 25,
    },
    {
      subjectTitle: "Chemistry Lab",
      subjectCode: "BTCH211",
      type: "P",
      credits: 1,
      maxInternal: 30,
      maxExternal: 20,
      maxTotal: 50,
      minInternal: 12,
      minExternal: 8,
      minTotal: 25,
    },
  ],
  3: [
    {
      subjectTitle: "Discrete Mathematics",
      subjectCode: "BTAM301",
      type: "T",
      credits: 4,
      maxInternal: 40,
      maxExternal: 60,
      maxTotal: 100,
      minInternal: 16,
      minExternal: 24,
      minTotal: 40,
    },
    {
      subjectTitle: "Object Oriented Programming",
      subjectCode: "BTCS301",
      type: "T",
      credits: 4,
      maxInternal: 40,
      maxExternal: 60,
      maxTotal: 100,
      minInternal: 16,
      minExternal: 24,
      minTotal: 40,
    },
    {
      subjectTitle: "Computer Organization",
      subjectCode: "BTCS302",
      type: "T",
      credits: 4,
      maxInternal: 40,
      maxExternal: 60,
      maxTotal: 100,
      minInternal: 16,
      minExternal: 24,
      minTotal: 40,
    },
    {
      subjectTitle: "Database Management Systems",
      subjectCode: "BTCS303",
      type: "T",
      credits: 4,
      maxInternal: 40,
      maxExternal: 60,
      maxTotal: 100,
      minInternal: 16,
      minExternal: 24,
      minTotal: 40,
    },
    {
      subjectTitle: "OOP Lab",
      subjectCode: "BTCS311",
      type: "P",
      credits: 2,
      maxInternal: 30,
      maxExternal: 20,
      maxTotal: 50,
      minInternal: 12,
      minExternal: 8,
      minTotal: 25,
    },
    {
      subjectTitle: "DBMS Lab",
      subjectCode: "BTCS312",
      type: "P",
      credits: 2,
      maxInternal: 30,
      maxExternal: 20,
      maxTotal: 50,
      minInternal: 12,
      minExternal: 8,
      minTotal: 25,
    },
  ],
  4: [
    {
      subjectTitle: "Operating Systems",
      subjectCode: "BTCS401",
      type: "T",
      credits: 4,
      maxInternal: 40,
      maxExternal: 60,
      maxTotal: 100,
      minInternal: 16,
      minExternal: 24,
      minTotal: 40,
    },
    {
      subjectTitle: "Design & Analysis of Algorithms",
      subjectCode: "BTCS402",
      type: "T",
      credits: 4,
      maxInternal: 40,
      maxExternal: 60,
      maxTotal: 100,
      minInternal: 16,
      minExternal: 24,
      minTotal: 40,
    },
    {
      subjectTitle: "Software Engineering",
      subjectCode: "BTCS403",
      type: "T",
      credits: 3,
      maxInternal: 40,
      maxExternal: 60,
      maxTotal: 100,
      minInternal: 16,
      minExternal: 24,
      minTotal: 40,
    },
    {
      subjectTitle: "Theory of Computation",
      subjectCode: "BTCS404",
      type: "T",
      credits: 4,
      maxInternal: 40,
      maxExternal: 60,
      maxTotal: 100,
      minInternal: 16,
      minExternal: 24,
      minTotal: 40,
    },
    {
      subjectTitle: "OS Lab",
      subjectCode: "BTCS411",
      type: "P",
      credits: 2,
      maxInternal: 30,
      maxExternal: 20,
      maxTotal: 50,
      minInternal: 12,
      minExternal: 8,
      minTotal: 25,
    },
    {
      subjectTitle: "Algorithms Lab",
      subjectCode: "BTCS412",
      type: "P",
      credits: 2,
      maxInternal: 30,
      maxExternal: 20,
      maxTotal: 50,
      minInternal: 12,
      minExternal: 8,
      minTotal: 25,
    },
  ],
};

// ─── Helpers ──────────────────────────────────────────────────────
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min, max) =>
  +(Math.random() * (max - min) + min).toFixed(2);

const generateFullName = () =>
  `${randomItem(firstNames)} ${randomItem(lastNames)}`;

/**
 * Generate realistic marks for one subject.
 * ~15% chance of being detained in a theory subject.
 */
const generateSubjectPerformance = (subjectId, subjectMeta) => {
  const isTheory = subjectMeta.type === "T";
  const detained = isTheory && Math.random() < 0.15; // 15% detention rate

  let internalMarks, externalMarks, internalDetained, externalDetained;

  if (detained) {
    // Randomly detained in internal, external, or both
    const detainType = randomItem(["internal", "external", "both"]);
    if (detainType === "internal" || detainType === "both") {
      internalMarks = randomInt(0, subjectMeta.minInternal - 1);
      internalDetained = true;
    } else {
      internalMarks = randomInt(
        subjectMeta.minInternal,
        subjectMeta.maxInternal,
      );
      internalDetained = false;
    }
    if (detainType === "external" || detainType === "both") {
      externalMarks = randomInt(0, subjectMeta.minExternal - 1);
      externalDetained = true;
    } else {
      externalMarks = randomInt(
        subjectMeta.minExternal,
        subjectMeta.maxExternal,
      );
      externalDetained = false;
    }
  } else {
    // Passing student — generate marks above minimum
    internalMarks = randomInt(subjectMeta.minInternal, subjectMeta.maxInternal);
    externalMarks = randomInt(subjectMeta.minExternal, subjectMeta.maxExternal);
    internalDetained = false;
    externalDetained = false;
  }

  return {
    subject: subjectId,
    internalMarks,
    externalMarks,
    totalMarks: internalMarks + externalMarks,
    internalDetained,
    externalDetained,
    status: internalDetained || externalDetained ? "Detained" : "Pass",
  };
};

/**
 * Calculate SGPA from subject performances using credit-weighted formula.
 * Grade points: 90+→10, 80+→9, 70+→8, 60+→7, 50+→6, 40+→5, below→0
 */
const calculateSGPA = (performances, subjectMetas) => {
  let totalCreditPoints = 0;
  let totalCredits = 0;

  performances.forEach((perf, i) => {
    const meta = subjectMetas[i];
    const percentage = (perf.totalMarks / meta.maxTotal) * 100;
    let gradePoint;

    if (perf.status === "Detained") gradePoint = 0;
    else if (percentage >= 90) gradePoint = 10;
    else if (percentage >= 80) gradePoint = 9;
    else if (percentage >= 70) gradePoint = 8;
    else if (percentage >= 60) gradePoint = 7;
    else if (percentage >= 50) gradePoint = 6;
    else gradePoint = 5;

    totalCreditPoints += gradePoint * meta.credits;
    totalCredits += meta.credits;
  });

  return totalCredits > 0 ? +(totalCreditPoints / totalCredits).toFixed(2) : 0;
};

// ─── Main Seed Function ──────────────────────────────────────────
const seed = async () => {
  try {
    await connectDB();
    console.log("\n🌱 Starting seed...\n");

    // ── Step 1: Clear existing data ────────────────────────────
    await Student.deleteMany({});
    await Subject.deleteMany({});
    console.log("🗑️  Cleared existing Students & Subjects");

    // ── Step 2: Insert all subjects & collect IDs per semester ──
    const subjectIdsBySemester = {};

    for (const [semNum, subjects] of Object.entries(subjectsBySemester)) {
      const docs = await Subject.insertMany(
        subjects.map((s) => ({
          subjectTitle: s.subjectTitle,
          subjectCode: s.subjectCode,
          type: s.type,
          credits: s.credits,
          maxInternalMarks: s.maxInternal,
          maxExternalMarks: s.maxExternal,
          maxTotalMarks: s.maxTotal,
          minInternalPassMarks: s.minInternal,
          minExternalPassMarks: s.minExternal,
          minTotalPassMarks: s.minTotal,
        })),
      );
      subjectIdsBySemester[semNum] = docs.map((d) => d._id);
      console.log(`📚 Semester ${semNum}: Inserted ${docs.length} subjects`);
    }

    // ── Step 3: Generate students ──────────────────────────────
    const STUDENT_COUNT = 60;
    const students = [];

    // Distribute across B.Tech branches (main focus)
    const btechBranches = courseBranchMap["B.Tech"];

    for (let i = 0; i < STUDENT_COUNT; i++) {
      const course = "B.Tech";
      const branch = btechBranches[i % btechBranches.length];
      const admissionYear = 2022;
      const graduationYear = 2026;

      // Each student has 1–4 semesters of data (simulating current progress)
      const completedSemesters = randomInt(1, 4);

      const semesters = [];
      for (let sem = 1; sem <= completedSemesters; sem++) {
        const semSubjects = subjectsBySemester[sem];
        const semSubjectIds = subjectIdsBySemester[sem];

        const performances = semSubjects.map((meta, idx) =>
          generateSubjectPerformance(semSubjectIds[idx], meta),
        );

        const sgpa = calculateSGPA(performances, semSubjects);

        semesters.push({
          semesterNumber: sem,
          sgpa,
          subjects: performances,
        });
      }

      const urn = 2200001 + i;
      const crn = 2200101 + i;

      students.push({
        fullName: generateFullName(),
        urn,
        crn,
        course,
        branch,
        admissionYear,
        graduationYear,
        semesters,
      });
    }

    // ── Step 4: Insert students using .save() for pre-save hooks ──
    let inserted = 0;
    for (const data of students) {
      const student = new Student(data);
      await student.save();
      inserted++;
    }

    console.log(`\n✅ Inserted ${inserted} students successfully`);

    // ── Summary ────────────────────────────────────────────────
    const totalSubjects = await Subject.countDocuments();
    const totalStudents = await Student.countDocuments();
    const detainedCount = await Student.countDocuments({
      "semesters.subjects.status": "Detained",
    });

    console.log("\n📊 Seed Summary:");
    console.log(`   Subjects  : ${totalSubjects}`);
    console.log(`   Students  : ${totalStudents}`);
    console.log(`   With Detentions : ${detainedCount}`);
    console.log("");
  } catch (error) {
    console.error("❌ Seed failed:", error.message);
    if (error.errors) {
      Object.entries(error.errors).forEach(([key, val]) => {
        console.error(`   → ${key}: ${val.message}`);
      });
    }
  } finally {
    await mongoose.disconnect();
    console.log("📴 Disconnected from MongoDB\n");
  }
};

seed();
