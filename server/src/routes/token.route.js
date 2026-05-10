import express from "express";
import {
  // createTokens,
  // revokeToken,
  // validateToken,
  getAllTokens,
  deleteToken
} from "../controllers/token.controller.js";

const router = express.Router();

// router.get("/validate", validateToken); // GET /api/tokens/validate?token=xxx
// router.post("/", createTokens); // POST /api/tokens
// router.patch("/:id/revoke", revokeToken); // PATCH /api/tokens/:id/revoke
router.get("/", getAllTokens); // GET /api/tokens
router.delete("/delete/:id", deleteToken);

export default router;
