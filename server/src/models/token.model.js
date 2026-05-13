import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Active", "Expired", "Completed", "Used"],
    default: "Active",
  },
  limitsLeft: {
    type: Number,
    default: 1,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  usedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Removed bcrypt hashing since token is already hashed securely via sha256 before saving, and validated via direct findOne.

export const Token = mongoose.model("Token", tokenSchema);
