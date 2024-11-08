import express from "express";
const nodemailer = require("nodemailer");

const sendMail = async ({ to, subject, text, html }) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "cordia16@ethereal.email",
      pass: "Rr3x8bEucau5QQRaRK",
    },
  });

  const info = await transporter.sendMail({
    from: '"ScrapMan_Admin" <cordia16@ethereal.email>',
    to,
    subject,
    text,
    html,
  });

  console.log(`message sent to  : ${info.messageId}`);
};

export { sendMail };
