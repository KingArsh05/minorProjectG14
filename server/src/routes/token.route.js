import express from "express";
import {
  validateToken,
  getAllTokens,
  deleteToken,
  generatePreviewToken
} from "../controllers/token.controller.js";
import { checkAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/validate", validateToken); // GET /api/tokens/validate?token=xxx (Public)
router.get("/", checkAuth, getAllTokens); // GET /api/tokens (Admin only)
router.delete("/delete/:id", checkAuth, deleteToken); // Admin only
router.post("/preview", checkAuth, generatePreviewToken); // Admin only

export default router;
