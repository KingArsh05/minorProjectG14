import { Student } from "../models/students.model.js";
import { Token } from "../models/token.model.js";
import { mailSender } from "../utils/mailSender.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const EXPIRY_MAP = {
  "24 hours": 24,
  "48 hours": 48,
  "72 hours": 72,
  "7 days": 168,
};

// @desc    Generate tokens and send emails to multiple students
// @route   POST /api/v1/mailsender/send
// @access  Private (Admin)
export const sendMailToStudents = asyncHandler(async (req, res) => {
  const {
    recipients, // Array of { studentId, email }
    sentVia = "Email",
    semester = 1,
    expiry = "24 hours",
  } = req.body;

  if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
    throw new ApiError(400, "recipients array is required");
  }

  const studentIds = recipients.map((r) => r.studentId);
  const students = await Student.find({ _id: { $in: studentIds } });
  if (!students || students.length === 0) {
    throw new ApiError(404, "No students found for the provided IDs");
  }

  // Create a map for quick email lookup by student ID from the payload
  const recipientMap = {};
  recipients.forEach((r) => {
    recipientMap[r.studentId] = r.email;
  });

  const hours = EXPIRY_MAP[expiry] || 24;
  const expiresAt = new Date(Date.now() + hours * 60 * 60 * 1000);
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

  const results = [];

  // Parallel processing with Promise.allSettled for robustness
  const emailPromises = students.map(async (student) => {
    try {
      const email = recipientMap[student._id] || student.guardianEmail;

      if (!email) {
        return {
          id: student._id,
          name: student.fullName,
          status: "failed",
          error: "No guardian email found in payload or database",
        };
      }

      // 1. Create Token
      const token = await Token.create({
        student: student._id,
        sentVia,
        semester,
        expiresAt,
      });

      // 2. Construct URL
      const dynamicUrl = `${frontendUrl}/guardian?token=${token.token}`;

      // 3. Send Mail
      const sent = await mailSender(email, student.fullName, dynamicUrl);

      if (sent) {
        return {
          status: "success",
          token: token.token,
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
