import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApiError } from "./utils/ApiError.js";

const app = express();

app.disable("x-powered-by");

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "x-client-key",
      "x-client-token",
      "x-client-secret",
    ],
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser(process.env.MY_SECRET_KEY));
app.use(express.static("public"));

// ─── Routes ─────────────────────────────────────────────────────
import reportRouter from "./routes/reportRoute.js";
import studentRouter from "./routes/studentRoute.js";
import tokenRouter from "./routes/tokenRoute.js";

app.use("/api", reportRouter);
app.use("/api/students", studentRouter);
app.use("/api/tokens", tokenRouter);

// ─── Global Error Handler ───────────────────────────────────────
app.use((err, _req, res, _next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  }

  console.error("Unhandled error:", err);
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

export { app };
