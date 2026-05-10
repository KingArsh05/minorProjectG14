import { Router } from "express";
import { sendMailToStudents } from "../controllers/mailSender.controller.js";

const router = Router();

router.route("/send-guardian-tokens").post(sendMailToStudents);

export default router;
