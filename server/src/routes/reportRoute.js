import express from 'express';
import { notifyGuardian } from '../controllers/reportController.js';

const router = express.Router();

router.post('/notify-guardian', notifyGuardian);

export default router;
