import { Token } from "../models/token.model.js";
import "../models/students.model.js"; // ensure Student schema is registered
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const EXPIRY_MAP = {
  "24 hours": 24,
  "48 hours": 48,
  "72 hours": 72,
  "7 days": 168,
};

// ─── POST /api/tokens  — Generate tokens for selected students ──
export const createTokens = asyncHandler(async (req, res) => {
  const {
    studentIds,
    sentVia = "Email",
    semester = 1,
    expiry = "24 hours",
  } = req.body;

  if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
    throw new ApiError(400, "studentIds array is required");
  }

  const hours = EXPIRY_MAP[expiry] || 24;
  const expiresAt = new Date(Date.now() + hours * 60 * 60 * 1000);

  const tokens = await Promise.all(
    studentIds.map((studentId) =>
      Token.create({
        student: studentId,
        sentVia,
        semester,
        expiresAt,
      }),
    ),
  );

  // Populate student info for the response
  const populated = await Token.find({
    _id: { $in: tokens.map((t) => t._id) },
  })
    .populate("student", "fullName urn crn course branch")
    .lean();

  res
    .status(201)
    .json(new ApiResponse(populated, `${tokens.length} token(s) created`));
});

// ─── GET /api/tokens  — List all tokens ─────────────────────────
export const getAllTokens = asyncHandler(async (req, res) => {
  // Auto-expire tokens that are past their expiry date
  await Token.updateMany(
    { status: "Active", expiresAt: { $lt: new Date() } },
    { $set: { status: "Expired" } },
  );

  const tokens = await Token.find()
    .populate("student", "fullName urn crn course branch")
    .sort({ createdAt: -1 })
    .lean();

  res.status(200).json(new ApiResponse(tokens, "Tokens fetched"));
});

// ─── PATCH /api/tokens/:id/revoke  — Revoke a token ────────────
export const revokeToken = asyncHandler(async (req, res) => {
  const token = await Token.findById(req.params.id);
  if (!token) throw new ApiError(404, "Token not found");
  if (token.status !== "Active")
    throw new ApiError(400, "Only active tokens can be revoked");

  token.status = "Expired";
  await token.save();

  res.status(200).json(new ApiResponse(null, "Token revoked"));
});

// ─── GET /api/tokens/validate?token=xxx  — Guardian access ──────
export const validateToken = asyncHandler(async (req, res) => {
  const { token } = req.query;
  if (!token) throw new ApiError(400, "Token is required");

  // Auto-expire first
  await Token.updateMany(
    { status: "Active", expiresAt: { $lt: new Date() } },
    { $set: { status: "Expired" } },
  );

  const found = await Token.findOne({ token })
    .populate({
      path: "student",
      populate: {
        path: "semesters.subjects.subject",
        select: "subjectTitle subjectCode type credits",
      },
    })
    .lean();

  if (!found) throw new ApiError(404, "Invalid or unknown token");
  if (found.status === "Expired")
    throw new ApiError(410, "This token has expired");

  // Mark as used if first time
  if (found.status === "Active") {
    await Token.findByIdAndUpdate(found._id, {
      status: "Used",
      usedAt: new Date(),
    });
  }

  res.status(200).json(new ApiResponse(found.student, "Token validated"));
});
