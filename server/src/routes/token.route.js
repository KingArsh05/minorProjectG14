import express from "express";
import {
  createTokens,
  getAllTokens,
  revokeToken,
  validateToken,
} from "../controllers/token.controller.js";

const router = express.Router();

router.get("/validate", validateToken); // GET /api/tokens/validate?token=xxx
router.get("/", getAllTokens); // GET /api/tokens
router.post("/", createTokens); // POST /api/tokens
router.patch("/:id/revoke", revokeToken); // PATCH /api/tokens/:id/revoke

export default router;
