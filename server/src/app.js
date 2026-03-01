import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

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
import authRouter from "./routes/auth.route.js";
import reportRouter from "./routes/report.route.js";
import studentRouter from "./routes/student.route.js";
import tokenRouter from "./routes/token.route.js";
import mailSenderRouter from "./routes/mailSender.route.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { checkAuth } from "./middlewares/auth.middleware.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/students", checkAuth, studentRouter);
app.use("/api/v1/reports", checkAuth, reportRouter);
app.use("/api/v1/tokens", checkAuth, tokenRouter);
app.use("/api/v1/mailsender", checkAuth, mailSenderRouter);

app.use(errorHandler);

export { app };
