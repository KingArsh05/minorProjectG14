import { Token } from "../models/token.model.js";
import { Student } from "../models/students.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import crypto from "crypto";

const EXPIRY_MAP = {
  "24 hours": 24,
  "48 hours": 48,
  "72 hours": 72,
  "7 days": 168,
};

const ACCESS_LIMIT_MAP = {
  "1-time access": 1,
  "2-time access": 2,
  "3-time access": 3,
};

export function generateSecureToken() {
  const TOKEN_SECRET = process.env.TOKEN_SECRET;

  const rawToken = crypto.randomBytes(32).toString("base64url");
  const hashedToken = crypto
    .createHash("sha256")
    .update(TOKEN_SECRET)
    .update(rawToken)
    .update(TOKEN_SECRET)
    .digest("base64url");

  return hashedToken;
}

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
    { status: { $in: ["Active", "Used"] }, expiresAt: { $lt: new Date() } },
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
  if (found.status === "Completed")
    throw new ApiError(410, "This token access limit has been reached");

  let isAdmin = false;
  try {
    const sid = req.signedCookies?.sid;
    if (sid) {
      // Basic check, if cookie exists it's highly likely a valid admin session in this context
      isAdmin = true;
    }
  } catch (e) {}
  
  await Token.findByIdAndUpdate(found._id, {
    status: found.limitsLeft -1 <= 0 ? "Completed" : "Used",
    usedAt: new Date(),
    $inc: { limitsLeft: -1 },
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

// ─── POST /api/tokens/preview  — Generate preview token for admin ────────────
export const generatePreviewToken = asyncHandler(async (req, res) => {
  const { studentId } = req.body;
  if (!studentId) throw new ApiError(400, "Student ID is required");

  const hashedToken = generateSecureToken();

  await Token.create({
    studentId,
    token: hashedToken,
    limitsLeft: 3,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000,
  });

  res
    .status(200)
    .json(new ApiResponse({ token: hashedToken }, "Preview token generated"));
});
