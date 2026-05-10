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
    enum: ["Active", "Access Completed", "Expired"],
    default: "Active",
  },
  limitsLeft: {
    type: Number,
    default: 1,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: {
      expires: 0,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Token = mongoose.model("Token", tokenSchema);
