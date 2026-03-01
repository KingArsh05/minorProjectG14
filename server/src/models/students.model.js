import mongoose from "mongoose";
import { courseBranchMap } from "../utils/courseBranchMap.js";

const subjectPerformanceSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Types.ObjectId,
    ref: "Subject",
    required: [true, "Subject reference is required"],
  },

  internalMarks: {
    type: Number,
    default: 0,
    min: [0, "Internal marks cannot be negative"],
  },

  externalMarks: {
    type: Number,
    default: 0,
    min: [0, "External marks cannot be negative"],
  },

  totalMarks: {
    type: Number,
    default: 0,
    min: [0, "Total marks cannot be negative"],
  },

  internalDetained: {
    type: Boolean,
    default: false,
  },

  externalDetained: {
    type: Boolean,
    default: false,
  },

  status: {
    type: String,
    enum: {
      values: ["Pass", "Detained"],
      message: "Status must be either Pass or Detained",
    },
    default: "Pass",
  },
});

subjectPerformanceSchema.pre("validate", function () {
  this.totalMarks = this.internalMarks + this.externalMarks;

  if (this.internalDetained || this.externalDetained) {
    this.status = "Detained";
  } else {
    this.status = "Pass";
  }
});

const semesterSchema = new mongoose.Schema({
  semesterNumber: {
    type: Number,
    required: [true, "Semester number is required"],
    min: [1, "Semester number must be at least 1"],
  },

  sgpa: {
    type: Number,
    default: 0,
    min: [0, "SGPA cannot be less than 0"],
    max: [10, "SGPA cannot be greater than 10"],
  },

  subjects: [subjectPerformanceSchema],
});

const studentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },

    urn: {
      type: Number,
      required: [true, "URN is required"],
      unique: true,
    },

    crn: {
      type: Number,
      required: [true, "CRN is required"],
    },

    course: {
      type: String,
      required: [true, "Course is required"],
      validate: {
        validator: function (value) {
          return Object.keys(courseBranchMap).includes(value);
        },
        message: (props) =>
          `${props.value} is not a valid course offered by the institution`,
      },
    },

    branch: {
      type: String,
      default: null,
      validate: {
        validator: function (value) {
          const branches = courseBranchMap[this.course];
          if (!branches) return false;
          if (branches.length === 0) {
            return value === null;
          }
          return branches.includes(value);
        },
        message: function (props) {
          const branches = courseBranchMap[this.course];
          if (!branches) {
            return "Invalid course selected";
          }
          if (branches.length === 0) {
            return `Branch must be null for course ${this.course}`;
          }
          return `${props.value} does not belong to the selected course (${this.course})`;
        },
      },
    },

    admissionYear: {
      type: Number,
      required: [true, "Admission year is required"],
      min: [2000, "Admission year seems invalid"],
    },

    graduationYear: {
      type: Number,
      required: [true, "Graduation year is required"],
      validate: {
        validator: function (value) {
          return value > this.admissionYear;
        },
        message: "Graduation year must be greater than admission year",
      },
    },

    semesters: [semesterSchema],

    cgpa: {
      type: Number,
      default: null, // 🔥 will not be calculated until the student degree is completed
      min: [0, "CGPA cannot be less than 0"],
      max: [10, "CGPA cannot be greater than 10"],
    },
  },
  { timestamps: true },
);

/* 🔥 CGPA calculation ONLY after completion of the student degree */
studentSchema.pre("save", function () {
  if (!this.semesters || this.semesters.length === 0) {
    this.cgpa = 0;
    return;
  }

  const total = this.semesters.reduce((sum, s) => sum + s.sgpa, 0);
  this.cgpa = +(total / this.semesters.length).toFixed(2);
});

export const Student = mongoose.model("Student", studentSchema);
