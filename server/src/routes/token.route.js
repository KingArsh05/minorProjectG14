import express from "express";
import {
  // createTokens,
  // revokeToken,
  validateToken,
  getAllTokens,
  deleteToken,
  generatePreviewToken
} from "../controllers/token.controller.js";

const router = express.Router();

router.get("/validate", validateToken); // GET /api/tokens/validate?token=xxx
// router.post("/", createTokens); // POST /api/tokens
// router.patch("/:id/revoke", revokeToken); // PATCH /api/tokens/:id/revoke
router.get("/", getAllTokens); // GET /api/tokens
router.delete("/delete/:id", deleteToken);
router.post("/preview", generatePreviewToken);

export default router;
