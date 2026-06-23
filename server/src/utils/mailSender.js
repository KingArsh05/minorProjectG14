import nodemailer from "nodemailer";

let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
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

    transporter.verify((err) => {
      if (err) {
        console.error("❌ Email Server Error:", err.message);
      } else {
        console.log("✅ Email Server Ready");
      }
    });
  }
  return transporter;
};

export const mailSender = async (guardianEmail, studentName, dynamicUrl, expiry, accessLimit) => {
  try {
    const hasConstraints = !!(expiry || accessLimit);
    const mailTransporter = getTransporter();
    const info = await mailTransporter.sendMail({
      from: `"University Admin" <${process.env.EMAIL_USER}>`,
      to: guardianEmail,
      subject: `Official Semester Progress Report: ${studentName} - ASTNS Portal`,
      text: `Dear Guardian,\n\nAn official semester report has been published for ${studentName}.\n${
        hasConstraints
          ? `\nPortal Access Guidelines:\n- Validity Window: ${expiry}\n- View Limit: ${accessLimit}\n`
          : ""
      }\nAccess the dashboard here: ${dynamicUrl}\n\nTo maintain student record privacy, access will close once the view limit is reached or the time expires. For assistance, contact the student affairs office.`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Official Academic Report</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f3f4f6; padding: 48px 16px;">
              <tr>
                <td align="center">
                  <table width="100%" style="max-width: 520px; background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05); border: 1px solid #e5e7eb;">
                    <!-- Header Banner -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%); padding: 36px 32px; text-align: center;">
                        <div style="font-size: 28px; font-weight: 800; color: #ffffff; letter-spacing: -0.025em; font-family: system-ui, -apple-system, sans-serif;">
                          ASTNS
                        </div>
                        <div style="font-size: 13px; font-weight: 600; color: rgba(255, 255, 255, 0.85); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 6px;">
                          Academic Status Transparency System
                        </div>
                      </td>
                    </tr>
                    
                    <!-- Body Content -->
                    <tr>
                      <td style="padding: 40px 36px;">
                        <p style="margin: 0 0 16px; color: #1f2937; font-size: 17px; font-weight: 700;">Dear Guardian,</p>
                        <p style="margin: 0 0 24px; color: #4b5563; font-size: 15px; line-height: 1.6; font-weight: 500;">
                          An official academic status update and semester report has been published for <strong>${studentName}</strong>. 
                        </p>
                        
                        <!-- Access constraints notice card -->
                        ${
                          hasConstraints
                            ? `
                        <div style="background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 16px; padding: 20px; margin-bottom: 32px; text-align: left;">
                          <div style="margin-bottom: 8px; font-size: 14px; font-weight: 800; color: #0369a1; text-transform: uppercase; letter-spacing: 0.05em;">
                            📋 Portal Access Guidelines
                          </div>
                          <p style="margin: 0; color: #0284c7; font-size: 13.5px; line-height: 1.5; font-weight: 500;">
                            To ensure student privacy, this official report link has been configured with the following access details:
                          </p>
                          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 12px;">
                            <tr>
                              <td style="padding: 6px 0; font-size: 13px; color: #0369a1; font-weight: 600;" width="40%">⌛ Time Expiry:</td>
                              <td style="padding: 6px 0; font-size: 13px; color: #075985; font-weight: 700;">${expiry}</td>
                            </tr>
                            <tr>
                              <td style="padding: 6px 0; font-size: 13px; color: #0369a1; font-weight: 600;">👁️ View Limits:</td>
                              <td style="padding: 6px 0; font-size: 13px; color: #075985; font-weight: 700;">${accessLimit}</td>
                            </tr>
                          </table>
                          <p style="margin: 8px 0 0 0; font-size: 11px; color: #0284c7; line-height: 1.4; font-weight: 500; font-style: italic;">
                            * Access will close once the view limit is reached or the time window expires.
                          </p>
                        </div>
                            `
                            : ""
                        }
                        
                        <!-- Action Button -->
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tr>
                            <td align="center" style="padding: 8px 0 32px;">
                              <a href="${dynamicUrl}" target="_blank" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%); color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 15px; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3); text-transform: uppercase; letter-spacing: 0.02em;">
                                Access Student Dashboard
                              </a>
                            </td>
                          </tr>
                        </table>
                        
                        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 0 0 24px;" />
                        
                        <p style="margin: 0; color: #9ca3af; font-size: 12px; line-height: 1.6; text-align: center; font-weight: 500;">
                          This is an automated administrative notification from the institution. For questions or assistance, please contact the student affairs office directly.
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Footer copyright -->
                    <tr>
                      <td style="background-color: #f9fafb; padding: 20px 36px; text-align: center; border-top: 1px solid #f3f4f6;">
                        <p style="margin: 0; color: #9ca3af; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
                          ASTNS • Official Portal Notification
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
