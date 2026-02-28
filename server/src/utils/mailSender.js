import nodemailer from "nodemailer";

// ✅ Create transporter ONCE (important for performance & stability)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Gmail SSL
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

// ✅ Verify transporter at startup
transporter.verify((err) => {
  if (err) {
    console.error("❌ Email Server Error:", err.message);
  } else {
    console.log("✅ Email Server Ready");
  }
});

export const mailSender = async (guardianEmail, studentName, dynamicUrl) => {
  try {
    const info = await transporter.sendMail({
      from: `"University Admin" <${process.env.EMAIL_USER}>`,
      to: guardianEmail,
      subject: `Academic Update for ${studentName}`,
      text: `Dear Guardian,\n\nA new semester report is available for ${studentName}.\nView it here: ${dynamicUrl}`,
      html: `
        <!doctype html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Academic Update</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="100%" style="max-width: 480px; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                    <tr>
                      <td style="background: #0ea5e9; padding: 24px; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">Academic Update</h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 32px 28px;">
                        <p style="margin: 0 0 16px; color: #334155; font-size: 16px;">Dear Guardian,</p>
                        <p style="margin: 0 0 24px; color: #475569; font-size: 15px; line-height: 1.6;">
                          A new semester report is available for <strong>${studentName}</strong>.
                        </p>
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" style="padding: 12px 0 24px;">
                              <a href="${dynamicUrl}" style="display: inline-block; padding: 12px 24px; background-color: #0ea5e9; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">View Report</a>
                            </td>
                          </tr>
                        </table>
                        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 0 0 20px;" />
                        <p style="margin: 0; color: #64748b; font-size: 13px; line-height: 1.6; text-align: center">
                          If you have any questions, please contact the administration.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    console.log("✅ Report Link Mail Sent:", guardianEmail, info.messageId);
    return true;
  } catch (err) {
    console.error("❌ Report Link Mail Failed:", guardianEmail, err.message);
    return false;
  }
};
