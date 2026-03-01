import express from "express";
import {
  getAllStudents,
  getStudentById,
  getDashboardStats,
} from "../controllers/studentController.js";

const router = express.Router();

// Stats route MUST come before /:id to avoid "stats" being treated as an id
router.get("/stats", getDashboardStats);
router.get("/", getAllStudents);
router.get("/:id", getStudentById);

export default router;
