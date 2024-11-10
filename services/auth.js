const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

exports.sendEmail = async (to, companyId) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER, // Access from .env
      pass: process.env.EMAIL_PASS, // Access from .env
    },
  });

  const mailOptions = {
    from: `"Company Support Team" <${process.env.EMAIL_USER}>`, // Professional sender name
    to,
    subject: "Your Company Registration ID - Action Required",
    text: `Dear User,

We are pleased to inform you that your registration has been successfully completed. Below is your unique Company ID, which is required to log into your account:

Company ID: ${companyId}

Please keep this ID secure, as it will be used for future logins.

If you have any questions or encounter issues, feel free to contact our support team.

Best regards,
Company Support Team
Email: support@company.com
Phone: (123) 456-7890
Website: www.company.com`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
