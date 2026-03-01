import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

const subjectSchema = new mongoose.Schema(
  {
    subjectTitle: {
      type: String,
      required: [true, "Subject title is required"],
      trim: true,
    },

    subjectCode: {
      type: String,
      required: [true, "Subject code is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },

    type: {
      type: String,
      required: [true, "Subject type is required"],
      enum: {
        values: ["T", "P"],
        message: "Subject type must be either 'T' (Theory) or 'P' (Practical)",
      },
    },

    credits: {
      type: Number,
      required: [true, "Credits are required"],
      min: [0, "Credits cannot be negative"],
    },

    // Maximum Marks
    maxInternalMarks: {
      type: Number,
      required: [true, "Maximum internal marks are required"],
      min: [0, "Maximum internal marks cannot be negative"],
    },

    maxExternalMarks: {
      type: Number,
      required: [true, "Maximum external marks are required"],
      min: [0, "Maximum external marks cannot be negative"],
    },

    maxTotalMarks: {
      type: Number,
      required: [true, "Maximum total marks are required"],
      min: [0, "Maximum total marks cannot be negative"],
    },

    // Minimum marks for the student to put under pass category
    minInternalPassMarks: {
      type: Number,
      required: [true, "Minimum internal passing marks are required"],
      min: [0, "Minimum internal passing marks cannot be negative"],
    },

    minExternalPassMarks: {
      type: Number,
      required: [true, "Minimum external passing marks are required"],
      min: [0, "Minimum external passing marks cannot be negative"],
    },

    minTotalPassMarks: {
      type: Number,
      required: [true, "Minimum total passing marks are required"],
      min: [0, "Minimum total passing marks cannot be negative"],
    },
  },
);

/*
  Additional Logical Validation + points or better verification checks
  what it do it ensures = 
  - maxTotalMarks = maxInternal + maxExternal
  - minTotalPassMarks <= maxTotalMarks
*/

subjectSchema.pre("validate", function () {
  if (this.maxTotalMarks < this.maxInternalMarks + this.maxExternalMarks) {
    throw new ApiError(400, "Invalid maximum marks configuration", [
      "maxTotalMarks must be greater than or equal to (maxInternalMarks + maxExternalMarks)",
    ]);
  }

  if (this.minTotalPassMarks > this.maxTotalMarks) {
    throw new ApiError(400, "Invalid passing criteria configuration", [
      "minTotalPassMarks cannot exceed maxTotalMarks",
    ]);
  }
});

export const Subject = mongoose.model("Subject", subjectSchema);
