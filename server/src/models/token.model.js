import mongoose from "mongoose";
import crypto from "crypto";

const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
      default: () => crypto.randomBytes(16).toString("hex"),
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    sentVia: {
      type: String,
      enum: ["Email", "SMS", "Both"],
      default: "Email",
    },
    semester: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Used", "Expired"],
      default: "Active",
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    usedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

// Auto-expire check via virtual
tokenSchema.virtual("isExpired").get(function () {
  return this.status === "Expired" || new Date() > this.expiresAt;
});

tokenSchema.set("toJSON", { virtuals: true });
tokenSchema.set("toObject", { virtuals: true });

export const Token = mongoose.model("Token", tokenSchema);
