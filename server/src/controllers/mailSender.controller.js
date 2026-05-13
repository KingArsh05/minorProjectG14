import { Student } from "../models/students.model.js";
import { Token } from "../models/token.model.js";
import { mailSender } from "../utils/mailSender.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateSecureToken } from "./token.controller.js";

const EXPIRY_MAP = {
  "24 hours": 24,
  "48 hours": 48,
  "72 hours": 72,
  "7 days": 7 * 24,
};
const ACCESS_LIMIT_MAP = {
  "1-time access": 1,
  "2-time access": 2,
  "3-time access": 3,
};

export const sendMailToStudents = asyncHandler(async (req, res) => {
  const { recipients, expiry, accessLimit } = req.body;

  if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
    throw new ApiError(400, "Recipients array is required");
  }

  const studentIds = recipients.map((r) => r.studentId);
  const students = await Student.find({
    _id: { $in: studentIds },
  })
    .select("fullName guardianEmail course branch urn")
    .lean();

  if (!students || students.length === 0) {
    throw new ApiError(404, "No students found for given data!");
  }

  const recipientMap = {};
  recipients.forEach((r) => {
    recipientMap[r.studentId] = r.email;
  });

  const hours = EXPIRY_MAP[expiry] || 24;
  const limitCount = ACCESS_LIMIT_MAP[accessLimit] || 1;
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

  const emailPromises = students.map(async (student) => {
    try {
      const email = recipientMap[student._id] || student.guardianEmail;

      if (!email) {
        return {
          id: student._id,
          name: student.fullName,
          status: "failed",
          error: "No guardian email found for Student!",
        };
      }

      // 1. Generate token using shared utility (reads TOKEN_SECRET lazily)
      const hashedToken = generateSecureToken();

      // 2. Store in DB with correct expiry and access limit
      await Token.create({
        studentId: student._id,
        token: hashedToken,
        limitsLeft: limitCount,
        expiresAt: new Date(Date.now() + hours * 60 * 60 * 1000),
      });

      // 3. Construct URL
      const dynamicUrl = `${frontendUrl}/guardian?token=${hashedToken}`;

      // 4. Send Mail
      const sent = await mailSender(email, student.fullName, dynamicUrl);

      if (sent) {
        return {
          status: "success",
          token: hashedToken,
          student: {
            _id: student._id,
            fullName: student.fullName,
            urn: student.urn,
          },
        };
      } else {
        return {
          id: student._id,
          name: student.fullName,
          status: "failed",
          error: "Email service failed",
        };
      }
    } catch (err) {
      console.error(`Error sending mail to ${student.fullName}:`, err);
      return {
        id: student._id,
        name: student.fullName,
        status: "failed",
        error: err.message,
      };
    }
  });

  const processedResults = await Promise.all(emailPromises);

  const successCount = processedResults.filter(
    (r) => r.status === "success",
  ).length;
  const failureCount = processedResults.length - successCount;

  res.status(200).json(
    new ApiResponse(
      {
        summary: {
          total: students.length,
          success: successCount,
          failure: failureCount,
        },
        details: processedResults,
      },
      `Emails processed: ${successCount} successful, ${failureCount} failed`,
    ),
  );
});
