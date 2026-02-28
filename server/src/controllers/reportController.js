import { mailSender } from '../utils/mailSender.js';

export const notifyGuardian = async (req, res) => {
    try {
        const { studentName, guardianEmail, urn } = req.body;

        if (!studentName || !guardianEmail || !urn) {
            return res.status(400).json({ error: "Missing required fields: studentName, guardianEmail, urn" });
        }

        const frontendBaseUrl = process.env.FRONTEND_URL || "http://localhost:3000";

        const dynamicUrl = `${frontendBaseUrl}/report/${urn}`;

        const emailSent = await mailSender(guardianEmail, studentName, dynamicUrl);

        if (emailSent) {
            return res.status(200).json({ 
                success: true, 
                message: "Email dispatched successfully" 
            });
        } else {
            return res.status(500).json({ error: "Email service failed to send." });
        }
    } catch (error) {
        console.error("Route Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
