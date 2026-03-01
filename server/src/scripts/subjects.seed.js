import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import mongoose from "mongoose";
import connectDB from "../db/index.js";
import { Subject } from "../models/subjects.model.js";

/*
  ┌─────────────────────────────────────────────────────────────────┐
  │  B.Tech CSE — GNDEC Ludhiana (2018 batch onwards)              │
  │  Extracted from: server/public/syllabus.pdf                    │
  │  Covers: Semester 3 – 8 (Compulsory + select Electives)        │
  └─────────────────────────────────────────────────────────────────┘
*/

const allSubjects = [
  // ══════════════════════ SEMESTER 3 ══════════════════════
  // Theory
  {
    subjectTitle: "Computer Networks",
    subjectCode: "PCCS-301",
    type: "T",
    credits: 4,
    maxInternalMarks: 40,
    maxExternalMarks: 60,
    maxTotalMarks: 100,
    minInternalPassMarks: 16,
    minExternalPassMarks: 24,
    minTotalPassMarks: 40,
  },
  {
    subjectTitle: "Object Oriented Programming",
    subjectCode: "PCCS-302",
    type: "T",
    credits: 4,
    maxInternalMarks: 40,
    maxExternalMarks: 60,
    maxTotalMarks: 100,
    minInternalPassMarks: 16,
    minExternalPassMarks: 24,
    minTotalPassMarks: 40,
  },
  {
    subjectTitle: "Digital Electronics",
    subjectCode: "ESCS-101",
    type: "T",
    credits: 3,
    maxInternalMarks: 40,
    maxExternalMarks: 60,
    maxTotalMarks: 100,
    minInternalPassMarks: 16,
    minExternalPassMarks: 24,
    minTotalPassMarks: 40,
  },
  {
    subjectTitle: "Mathematics III",
    subjectCode: "BSCS-101",
    type: "T",
    credits: 4,
    maxInternalMarks: 40,
    maxExternalMarks: 60,
    maxTotalMarks: 100,
    minInternalPassMarks: 16,
    minExternalPassMarks: 24,
    minTotalPassMarks: 40,
  },
  // Practical
  {
    subjectTitle: "Object Oriented Programming Laboratory",
    subjectCode: "LPCCS-101",
    type: "P",
    credits: 2,
    maxInternalMarks: 30,
    maxExternalMarks: 20,
    maxTotalMarks: 50,
    minInternalPassMarks: 12,
    minExternalPassMarks: 8,
    minTotalPassMarks: 25,
  },
  {
    subjectTitle: "Computer Networks Laboratory",
    subjectCode: "LPCCS-102",
    type: "P",
    credits: 1,
    maxInternalMarks: 30,
    maxExternalMarks: 20,
    maxTotalMarks: 50,
    minInternalPassMarks: 12,
    minExternalPassMarks: 8,
    minTotalPassMarks: 25,
  },
  {
    subjectTitle: "Digital Electronics Laboratory",
    subjectCode: "LESCS-101",
    type: "P",
    credits: 1,
    maxInternalMarks: 30,
    maxExternalMarks: 20,
    maxTotalMarks: 50,
    minInternalPassMarks: 12,
    minExternalPassMarks: 8,
    minTotalPassMarks: 25,
  },
  {
    subjectTitle: "Seminar and Technical Report Writing",
    subjectCode: "PRCS-101",
    type: "P",
    credits: 1,
    maxInternalMarks: 50,
    maxExternalMarks: 0,
    maxTotalMarks: 50,
    minInternalPassMarks: 25,
    minExternalPassMarks: 0,
    minTotalPassMarks: 25,
  },

  // ══════════════════════ SEMESTER 4 ══════════════════════
  // Theory
  {
    subjectTitle: "Discrete Mathematics",
    subjectCode: "PCCS-103",
    type: "T",
    credits: 4,
    maxInternalMarks: 40,
    maxExternalMarks: 60,
    maxTotalMarks: 100,
    minInternalPassMarks: 16,
    minExternalPassMarks: 24,
    minTotalPassMarks: 40,
  },
  {
    subjectTitle: "Computer Architecture and Microprocessors",
    subjectCode: "PCCS-104",
    type: "T",
    credits: 3,
    maxInternalMarks: 40,
    maxExternalMarks: 60,
    maxTotalMarks: 100,
    minInternalPassMarks: 16,
    minExternalPassMarks: 24,
    minTotalPassMarks: 40,
  },
  {
    subjectTitle: "Operating Systems",
    subjectCode: "PCCS-105",
    type: "T",
    credits: 4,
    maxInternalMarks: 40,
    maxExternalMarks: 60,
    maxTotalMarks: 100,
    minInternalPassMarks: 16,
    minExternalPassMarks: 24,
    minTotalPassMarks: 40,
  },
  {
    subjectTitle: "Data Structures",
    subjectCode: "PCCS-106",
    type: "T",
    credits: 3,
    maxInternalMarks: 40,
    maxExternalMarks: 60,
    maxTotalMarks: 100,
    minInternalPassMarks: 16,
    minExternalPassMarks: 24,
    minTotalPassMarks: 40,
  },
  {
    subjectTitle: "Software Engineering",
    subjectCode: "PCCS-107",
    type: "T",
    credits: 4,
    maxInternalMarks: 40,
    maxExternalMarks: 60,
    maxTotalMarks: 100,
    minInternalPassMarks: 16,
    minExternalPassMarks: 24,
    minTotalPassMarks: 40,
  },
  // Practical
  {
    subjectTitle: "Computer Architecture and Microprocessors Lab",
    subjectCode: "LPCCS-103",
    type: "P",
    credits: 1,
    maxInternalMarks: 30,
    maxExternalMarks: 20,
    maxTotalMarks: 50,
    minInternalPassMarks: 12,
    minExternalPassMarks: 8,
    minTotalPassMarks: 25,
  },
  {
    subjectTitle: "Operating Systems Laboratory",
    subjectCode: "LPCCS-104",
    type: "P",
    credits: 1,
    maxInternalMarks: 30,
    maxExternalMarks: 20,
    maxTotalMarks: 50,
    minInternalPassMarks: 12,
    minExternalPassMarks: 8,
    minTotalPassMarks: 25,
  },
  {
    subjectTitle: "Data Structures Laboratory",
    subjectCode: "LPCCS-105",
    type: "P",
    credits: 2,
    maxInternalMarks: 30,
    maxExternalMarks: 20,
    maxTotalMarks: 50,
    minInternalPassMarks: 12,
    minExternalPassMarks: 8,
    minTotalPassMarks: 25,
  },
  // Audit (0 credit but in system)
  {
    subjectTitle: "Environmental Sciences",
    subjectCode: "MCCS-101",
    type: "T",
    credits: 0,
    maxInternalMarks: 50,
    maxExternalMarks: 0,
    maxTotalMarks: 50,
    minInternalPassMarks: 25,
    minExternalPassMarks: 0,
    minTotalPassMarks: 25,
  },

  // ══════════════════════ SEMESTER 5 ══════════════════════
  // Theory
  {
    subjectTitle: "Artificial Intelligence",
    subjectCode: "PCCS-108",
    type: "T",
    credits: 3,
    maxInternalMarks: 40,
    maxExternalMarks: 60,
    maxTotalMarks: 100,
    minInternalPassMarks: 16,
    minExternalPassMarks: 24,
    minTotalPassMarks: 40,
  },
  {
    subjectTitle: "Database Management Systems",
    subjectCode: "PCCS-109",
    type: "T",
    credits: 3,
    maxInternalMarks: 40,
    maxExternalMarks: 60,
    maxTotalMarks: 100,
    minInternalPassMarks: 16,
    minExternalPassMarks: 24,
    minTotalPassMarks: 40,
  },
  {
    subjectTitle: "Formal Language and Automata Theory",
    subjectCode: "PCCS-110",
    type: "T",
    credits: 4,
    maxInternalMarks: 40,
    maxExternalMarks: 60,
    maxTotalMarks: 100,
    minInternalPassMarks: 16,
    minExternalPassMarks: 24,
    minTotalPassMarks: 40,
  },
  {
    subjectTitle: "Design and Analysis of Algorithms",
    subjectCode: "PCCS-111",
    type: "T",
    credits: 4,
    maxInternalMarks: 40,
    maxExternalMarks: 60,
    maxTotalMarks: 100,
    minInternalPassMarks: 16,
    minExternalPassMarks: 24,
    minTotalPassMarks: 40,
  },
  // Practical
  {
    subjectTitle: "Artificial Intelligence Laboratory",
    subjectCode: "LPCCS-106",
    type: "P",
    credits: 1,
    maxInternalMarks: 30,
    maxExternalMarks: 20,
    maxTotalMarks: 50,
    minInternalPassMarks: 12,
    minExternalPassMarks: 8,
    minTotalPassMarks: 25,
  },
  {
    subjectTitle: "Database Management Systems Laboratory",
    subjectCode: "LPCCS-107",
    type: "P",
    credits: 1,
    maxInternalMarks: 30,
    maxExternalMarks: 20,
    maxTotalMarks: 50,
    minInternalPassMarks: 12,
    minExternalPassMarks: 8,
    minTotalPassMarks: 25,
  },
  {
    subjectTitle: "Design and Analysis of Algorithms Lab",
    subjectCode: "LPCCS-108",
    type: "P",
    credits: 1,
    maxInternalMarks: 30,
    maxExternalMarks: 20,
    maxTotalMarks: 50,
    minInternalPassMarks: 12,
    minExternalPassMarks: 8,
    minTotalPassMarks: 25,
  },

  // ══════════════════════ SEMESTER 6 ══════════════════════
  // Theory (Compulsory)
  {
    subjectTitle: "Compiler Design",
    subjectCode: "PCCS-112",
    type: "T",
    credits: 4,
    maxInternalMarks: 40,
    maxExternalMarks: 60,
    maxTotalMarks: 100,
    minInternalPassMarks: 16,
    minExternalPassMarks: 24,
    minTotalPassMarks: 40,
  },
  {
    subjectTitle: "Computer Graphics",
    subjectCode: "PCCS-113",
    type: "T",
    credits: 4,
    maxInternalMarks: 40,
    maxExternalMarks: 60,
    maxTotalMarks: 100,
    minInternalPassMarks: 16,
    minExternalPassMarks: 24,
    minTotalPassMarks: 40,
  },
  {
    subjectTitle: "Machine Learning",
    subjectCode: "PCCS-114",
    type: "T",
    credits: 3,
    maxInternalMarks: 40,
    maxExternalMarks: 60,
    maxTotalMarks: 100,
    minInternalPassMarks: 16,
    minExternalPassMarks: 24,
    minTotalPassMarks: 40,
  },
  {
    subjectTitle: "Cyber Security",
    subjectCode: "PCCS-115",
    type: "T",
    credits: 3,
    maxInternalMarks: 40,
    maxExternalMarks: 60,
    maxTotalMarks: 100,
    minInternalPassMarks: 16,
    minExternalPassMarks: 24,
    minTotalPassMarks: 40,
  },
  // Practical (Compulsory)
  {
    subjectTitle: "Computer Graphics Laboratory",
    subjectCode: "LPCCS-109",
    type: "P",
    credits: 1,
    maxInternalMarks: 30,
    maxExternalMarks: 20,
    maxTotalMarks: 50,
    minInternalPassMarks: 12,
    minExternalPassMarks: 8,
    minTotalPassMarks: 25,
  },
  {
    subjectTitle: "Machine Learning Laboratory",
    subjectCode: "LPCCS-110",
    type: "P",
    credits: 1,
    maxInternalMarks: 30,
    maxExternalMarks: 20,
    maxTotalMarks: 50,
    minInternalPassMarks: 12,
    minExternalPassMarks: 8,
    minTotalPassMarks: 25,
  },
  // Elective-I (pick one — seeding one common choice)
  {
    subjectTitle: "Java Programming",
    subjectCode: "PECS-126",
    type: "T",
    credits: 3,
    maxInternalMarks: 40,
    maxExternalMarks: 60,
    maxTotalMarks: 100,
    minInternalPassMarks: 16,
    minExternalPassMarks: 24,
    minTotalPassMarks: 40,
  },
  {
    subjectTitle: "Java Programming Laboratory",
    subjectCode: "LPECS-113",
    type: "P",
    credits: 1,
    maxInternalMarks: 30,
    maxExternalMarks: 20,
    maxTotalMarks: 50,
    minInternalPassMarks: 12,
    minExternalPassMarks: 8,
    minTotalPassMarks: 25,
  },

  // ══════════════════════ SEMESTER 7 ══════════════════════
  // Elective-II (common choices)
  {
    subjectTitle: "Cloud Computing",
    subjectCode: "PECS-117",
    type: "T",
    credits: 3,
    maxInternalMarks: 40,
    maxExternalMarks: 60,
    maxTotalMarks: 100,
    minInternalPassMarks: 16,
    minExternalPassMarks: 24,
    minTotalPassMarks: 40,
  },
  {
    subjectTitle: "Cloud Computing Laboratory",
    subjectCode: "LPECS-108",
    type: "P",
    credits: 1,
    maxInternalMarks: 30,
    maxExternalMarks: 20,
    maxTotalMarks: 50,
    minInternalPassMarks: 12,
    minExternalPassMarks: 8,
    minTotalPassMarks: 25,
  },
  {
    subjectTitle: "Data Warehousing and Data Mining",
    subjectCode: "PECS-115",
    type: "T",
    credits: 4,
    maxInternalMarks: 40,
    maxExternalMarks: 60,
    maxTotalMarks: 100,
    minInternalPassMarks: 16,
    minExternalPassMarks: 24,
    minTotalPassMarks: 40,
  },
  {
    subjectTitle: "Web Technologies",
    subjectCode: "PECS-128",
    type: "T",
    credits: 3,
    maxInternalMarks: 40,
    maxExternalMarks: 60,
    maxTotalMarks: 100,
    minInternalPassMarks: 16,
    minExternalPassMarks: 24,
    minTotalPassMarks: 40,
  },
  {
    subjectTitle: "Web Technologies Laboratory",
    subjectCode: "LPECS-114",
    type: "P",
    credits: 1,
    maxInternalMarks: 30,
    maxExternalMarks: 20,
    maxTotalMarks: 50,
    minInternalPassMarks: 12,
    minExternalPassMarks: 8,
    minTotalPassMarks: 25,
  },
  // Compulsory
  {
    subjectTitle: "Technical Aptitude",
    subjectCode: "PRCS-106",
    type: "P",
    credits: 1,
    maxInternalMarks: 50,
    maxExternalMarks: 0,
    maxTotalMarks: 50,
    minInternalPassMarks: 25,
    minExternalPassMarks: 0,
    minTotalPassMarks: 25,
  },

  // ══════════════════════ SEMESTER 8 ══════════════════════
  // Elective-III (common choices)
  {
    subjectTitle: "Blockchain Technology",
    subjectCode: "PECS-113",
    type: "T",
    credits: 3,
    maxInternalMarks: 40,
    maxExternalMarks: 60,
    maxTotalMarks: 100,
    minInternalPassMarks: 16,
    minExternalPassMarks: 24,
    minTotalPassMarks: 40,
  },
  {
    subjectTitle: "Internet of Things",
    subjectCode: "PECS-112",
    type: "T",
    credits: 3,
    maxInternalMarks: 40,
    maxExternalMarks: 60,
    maxTotalMarks: 100,
    minInternalPassMarks: 16,
    minExternalPassMarks: 24,
    minTotalPassMarks: 40,
  },
  {
    subjectTitle: "Mobile Application Development",
    subjectCode: "PECS-130",
    type: "T",
    credits: 3,
    maxInternalMarks: 40,
    maxExternalMarks: 60,
    maxTotalMarks: 100,
    minInternalPassMarks: 16,
    minExternalPassMarks: 24,
    minTotalPassMarks: 40,
  },
  {
    subjectTitle: "Mobile Application Development Laboratory",
    subjectCode: "LPECS-115",
    type: "P",
    credits: 1,
    maxInternalMarks: 30,
    maxExternalMarks: 20,
    maxTotalMarks: 50,
    minInternalPassMarks: 12,
    minExternalPassMarks: 8,
    minTotalPassMarks: 25,
  },
  // Compulsory
  {
    subjectTitle: "Software Management Tools",
    subjectCode: "PRCS-107",
    type: "P",
    credits: 1,
    maxInternalMarks: 50,
    maxExternalMarks: 0,
    maxTotalMarks: 50,
    minInternalPassMarks: 25,
    minExternalPassMarks: 0,
    minTotalPassMarks: 25,
  },
];

// ─── Seed Function ───────────────────────────────────────────────
const seedSubjects = async () => {
  try {
    await connectDB();
    console.log("\n📚 Starting Subject Seed...\n");

    const deleted = await Subject.deleteMany({});
    console.log(`🗑️  Cleared ${deleted.deletedCount} existing subjects`);

    const docs = await Subject.insertMany(allSubjects);
    console.log(`✅ Inserted ${docs.length} subjects successfully\n`);

    // Semester-wise summary (extract semester from code pattern)
    const semesterMap = {
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
    };

    const semCodePrefix = {
      "PCCS-30": 3,
      "ESCS-10": 3,
      "BSCS-10": 3,
      "LPCCS-10": 3,
      "LESCS-10": 3,
      "PRCS-10": 3,
      "PCCS-10": 4,
      "LPCCS-10": 4,
      "MCCS-10": 4,
      "PCCS-10": 5,
      "PCCS-11": 5,
      "LPCCS-10": 5,
      "PCCS-11": 6,
      "LPCCS-10": 6,
      "LPCCS-11": 6,
      "PECS-12": 6,
      "LPECS-11": 6,
      "PECS-11": 7,
      "PECS-12": 7,
      "LPECS-10": 7,
      "LPECS-11": 7,
      "PRCS-10": 7,
      "PECS-11": 8,
      "PECS-13": 8,
      "LPECS-11": 8,
      "PRCS-10": 8,
    };

    // Simple count by type
    const theory = docs.filter((s) => s.type === "T").length;
    const practical = docs.filter((s) => s.type === "P").length;
    const totalCredits = docs.reduce((sum, s) => sum + s.credits, 0);

    console.log(`   Theory subjects  : ${theory}`);
    console.log(`   Practical subjects: ${practical}`);
    console.log(`   Total credits    : ${totalCredits}`);
    console.log(`\n📊 Total: ${docs.length} subjects (Semester 3-8)\n`);
  } catch (error) {
    console.log(error);
    console.error("❌ Subject seed failed:", error.message);
    if (error.writeErrors) {
      error.writeErrors.forEach((e) => console.error(`   → ${e.err.errmsg}`));
    }
  } finally {
    await mongoose.disconnect();
    console.log("📴 Disconnected from MongoDB\n");
  }
};

seedSubjects();
