import { ApiError } from "../utils/ApiError.js";

export const errorHandler = (err, req, res, next) => {
  console.error("🔥 Global Error Handler:", err.message);

  // Handle ApiError
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
      errors: Array.isArray(err.errors) ? err.errors : [],
      data: null,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }

  // Unknown errors fallback
  const statusCode = err.statusCode || err.status || 500;
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message: err.message || "Internal Server Error",
    errors: [],
    data: null,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
