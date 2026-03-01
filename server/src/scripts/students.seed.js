import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import mongoose from "mongoose";
import connectDB from "../db/index.js";
import { Student } from "../models/students.model.js";
import { Subject } from "../models/subjects.model.js";
import { courseBranchMap } from "../utils/courseBranchMap.js";

/*
  ┌─────────────────────────────────────────────────────────────────┐
  │  Student Seed — GNDEC B.Tech CSE (2018 batch syllabus)         │
  │  Prerequisite: Run subjects.seed.js FIRST so Subject IDs exist │
  └─────────────────────────────────────────────────────────────────┘
*/

// ─── Subject codes grouped by semester (must match subjects.seed.js) ──
const subjectCodesBySemester = {
  3: [
    "PCCS-301",
    "PCCS-302",
    "ESCS-101",
    "BSCS-101",
    "LPCCS-101",
    "LPCCS-102",
    "LESCS-101",
    "PRCS-101",
  ],
  4: [
    "PCCS-103",
    "PCCS-104",
    "PCCS-105",
    "PCCS-106",
    "PCCS-107",
    "LPCCS-103",
    "LPCCS-104",
    "LPCCS-105",
    "MCCS-101",
  ],
  5: [
    "PCCS-108",
    "PCCS-109",
    "PCCS-110",
    "PCCS-111",
    "LPCCS-106",
    "LPCCS-107",
    "LPCCS-108",
  ],
  6: [
    "PCCS-112",
    "PCCS-113",
    "PCCS-114",
    "PCCS-115",
    "LPCCS-109",
    "LPCCS-110",
    "PECS-126",
    "LPECS-113",
  ],
};

// ─── Realistic Indian Names ─────────────────────────────────────
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

// ─── Helpers ────────────────────────────────────────────────────
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const generateFullName = () =>
  `${randomItem(firstNames)} ${randomItem(lastNames)}`;

/**
 * Generate realistic marks for one subject.
 * ~12% chance of detention in theory, ~5% in practical.
 */
const generateSubjectPerformance = (subjectDoc) => {
  const isTheory = subjectDoc.type === "T";
  const detentionChance = isTheory ? 0.12 : 0.05;
  const detained = Math.random() < detentionChance;

  let internalMarks, externalMarks, internalDetained, externalDetained;

  if (detained) {
    const detainType = randomItem(["internal", "external", "both"]);

    if (detainType === "internal" || detainType === "both") {
      internalMarks = randomInt(0, subjectDoc.minInternalPassMarks - 1);
      internalDetained = true;
    } else {
      internalMarks = randomInt(
        subjectDoc.minInternalPassMarks,
        subjectDoc.maxInternalMarks,
      );
      internalDetained = false;
    }

    if (subjectDoc.maxExternalMarks === 0) {
      // No external exam (e.g. PRCS-101, MCCS-101)
      externalMarks = 0;
      externalDetained = false;
    } else if (detainType === "external" || detainType === "both") {
      externalMarks = randomInt(0, subjectDoc.minExternalPassMarks - 1);
      externalDetained = true;
    } else {
      externalMarks = randomInt(
        subjectDoc.minExternalPassMarks,
        subjectDoc.maxExternalMarks,
      );
      externalDetained = false;
    }
  } else {
    // Passing student
    internalMarks = randomInt(
      subjectDoc.minInternalPassMarks,
      subjectDoc.maxInternalMarks,
    );
    internalDetained = false;

    if (subjectDoc.maxExternalMarks === 0) {
      externalMarks = 0;
      externalDetained = false;
    } else {
      externalMarks = randomInt(
        subjectDoc.minExternalPassMarks,
        subjectDoc.maxExternalMarks,
      );
      externalDetained = false;
    }
  }

  return {
    subject: subjectDoc._id,
    internalMarks,
    externalMarks,
    totalMarks: internalMarks + externalMarks,
    internalDetained,
    externalDetained,
    status: internalDetained || externalDetained ? "Detained" : "Pass",
  };
};

/**
 * SGPA = Σ(gradePoint × credits) / Σ(credits)
 * Grade: 90%→10, 80%→9, 70%→8, 60%→7, 50%→6, 40%→5, <40%→0
 */

const calculateSGPA = (performances, subjectDocs) => {
  let totalCreditPoints = 0;
  let totalCredits = 0;

  performances.forEach((perf, i) => {
    const doc = subjectDocs[i];
    if (doc.credits === 0) return; // skip audit courses like Environmental Sciences

    const percentage =
      doc.maxTotalMarks > 0 ? (perf.totalMarks / doc.maxTotalMarks) * 100 : 0;
    let gradePoint;

    if (perf.status === "Detained") gradePoint = 0;
    else if (percentage >= 90) gradePoint = 10;
    else if (percentage >= 80) gradePoint = 9;
    else if (percentage >= 70) gradePoint = 8;
    else if (percentage >= 60) gradePoint = 7;
    else if (percentage >= 50) gradePoint = 6;
    else gradePoint = 5;

    totalCreditPoints += gradePoint * doc.credits;
    totalCredits += doc.credits;
  });

  return totalCredits > 0 ? +(totalCreditPoints / totalCredits).toFixed(2) : 0;
};

// ─── Main Seed ──────────────────────────────────────────────────
const seed = async () => {
  try {
    await connectDB();
    console.log("\n🌱 Starting Student Seed...\n");

    // ── Step 1: Verify subjects exist ──────────────────────────
    const subjectCount = await Subject.countDocuments();
    if (subjectCount === 0) {
      console.error("❌ No subjects found! Run subjects.seed.js first.");
      return;
    }
    console.log(`📚 Found ${subjectCount} subjects in DB`);

    // ── Step 2: Load subject docs by code per semester ─────────
    const subjectDocsBySemester = {};
    for (const [sem, codes] of Object.entries(subjectCodesBySemester)) {
      const docs = await Subject.find({ subjectCode: { $in: codes } });
      // Preserve ordering from our code list
      subjectDocsBySemester[sem] = codes
        .map((code) => docs.find((d) => d.subjectCode === code))
        .filter(Boolean);

      if (subjectDocsBySemester[sem].length !== codes.length) {
        const found = subjectDocsBySemester[sem].map((d) => d.subjectCode);
        const missing = codes.filter((c) => !found.includes(c));
        console.warn(`⚠️  Sem ${sem}: Missing subjects: ${missing.join(", ")}`);
      }
    }

    // ── Step 3: Clear existing students ───────────────────────
    await Student.deleteMany({});
    console.log("🗑️  Cleared existing students");

    // ── Step 4: Generate 60 B.Tech students ───────────────────
    const STUDENT_COUNT = 60;
    const btechBranches = courseBranchMap["B.Tech"];
    const semesters = Object.keys(subjectCodesBySemester).map(Number);

    let inserted = 0;

    for (let i = 0; i < STUDENT_COUNT; i++) {
      const branch = btechBranches[i % btechBranches.length];
      // Each student has 1–4 semesters completed (sem 3 to sem 6)
      const completedSemCount = randomInt(1, semesters.length);

      const studentSemesters = [];
      for (let j = 0; j < completedSemCount; j++) {
        const sem = semesters[j];
        const semSubjectDocs = subjectDocsBySemester[sem];

        const performances = semSubjectDocs.map((doc) =>
          generateSubjectPerformance(doc),
        );
        const sgpa = calculateSGPA(performances, semSubjectDocs);

        studentSemesters.push({
          semesterNumber: sem,
          sgpa,
          subjects: performances,
        });
      }

      const urn = 2203001 + i;
      const crn = 2203101 + i;

      const student = new Student({
        fullName: generateFullName(),
        urn,
        crn,
        course: "B.Tech",
        branch,
        admissionYear: 2022,
        graduationYear: 2026,
        semesters: studentSemesters,
      });

      await student.save(); // triggers pre-save CGPA hook
      inserted++;

      if (inserted % 15 === 0) {
        console.log(`   ✏️  Created ${inserted}/${STUDENT_COUNT} students...`);
      }
    }

    console.log(`\n✅ Inserted ${inserted} students successfully`);

    // ── Summary ───────────────────────────────────────────────
    const total = await Student.countDocuments();
    const detainedCount = await Student.countDocuments({
      "semesters.subjects.status": "Detained",
    });
    const branchCounts = {};
    for (const b of btechBranches) {
      branchCounts[b] = await Student.countDocuments({ branch: b });
    }

    console.log("\n📊 Seed Summary:");
    console.log(`   Total students   : ${total}`);
    console.log(`   With detentions  : ${detainedCount}`);
    console.log("   Branch distribution:");
    for (const [b, c] of Object.entries(branchCounts)) {
      console.log(`     ${b}: ${c}`);
    }
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
