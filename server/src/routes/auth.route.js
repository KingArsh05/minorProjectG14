import express from "express";
import {
  loginAdmin,
  logoutAdmin,
  getProfile,
} from "../controllers/auth.controller.js";
import { checkAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/logout", checkAuth, logoutAdmin);
router.get("/profile", checkAuth, getProfile);

export default router;
