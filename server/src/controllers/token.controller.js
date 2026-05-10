import { Token } from "../models/token.model.js";
import { Student } from "../models/students.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const EXPIRY_MAP = {
  "24 hours": 24,
  "48 hours": 48,
  "72 hours": 72,
  "7 days": 168,
};

// ─── GET /api/tokens  — List all tokens ─────────────────────────
export const getAllTokens = asyncHandler(async (req, res) => {
  const tokens = await Token.find()
    .populate("studentId", "fullName urn crn course branch")
    .sort({ createdAt: -1 })
    .lean();

  res.status(200).json(new ApiResponse(tokens, "Tokens fetched"));
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
      path: "studentId",
      populate: {
        path: "semesters.subjects.subject",
        select: "subjectTitle subjectCode type credits",
      },
    })
    .lean();

  if (!found) throw new ApiError(404, "Invalid or unknown token");
  if (found.status === "Expired")
    throw new ApiError(410, "This token has expired");

  if (found.limitsLeft <= 0) {
    // Already hit limit
    throw new ApiError(410, "This token access limit has been reached");
  }

  // Decrement limitsLeft
  await Token.findByIdAndUpdate(found._id, {
    status: "Used",
    usedAt: new Date(),
    $inc: { limitsLeft: -1 }
  });

  res.status(200).json(new ApiResponse(found.studentId, "Token validated"));
});

// ─── DELETE /api/tokens/delete/:id  — Delete a token ────────────
export const deleteToken = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const token = await Token.findById(id);
  console.log(token);
  if (!token) throw new ApiError(404, "Token not found");

  await token.deleteOne();
  res.status(200).json(new ApiResponse(null, "Token deleted"));
});
