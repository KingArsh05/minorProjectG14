import { Router } from "express";
import { sendMailToStudents } from "../controllers/mailSender.controller.js";

const router = Router();

router.route("/send").post(sendMailToStudents);

export default router;
