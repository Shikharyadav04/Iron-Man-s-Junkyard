import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendMail = async ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Gmail SMTP
    port: 587, // TLS
    secure: false, // Set to true if using SSL (port 465)
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address
      pass: process.env.GMAIL_PASS, // App-specific password
    },
  });

  const info = await transporter.sendMail({
    from: `"ScrapMan_Admin" <${process.env.GMAIL_USER}>`, // Sender's email
    to,
    subject,
    text,
    html,
  });

  console.log(`Message sent to: ${info.messageId}`);
};

export { sendMail };
