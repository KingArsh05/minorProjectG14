import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  getAllStudents,
  getStudentById,
  getDashboardStats,
  uploadStudents,
} from "../controllers/student.controller.js";

const router = express.Router();

router.get("/", getAllStudents);
router.get("/stats", getDashboardStats);
router.get("/:id", getStudentById);
router.post("/upload", upload.single("file"), uploadStudents);
// Stats route MUST come before /:id to avoid "stats" being treated as an id

export default router;