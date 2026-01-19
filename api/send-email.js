// const nodemailer = require('nodemailer');

// const sendEmailHandler = async (req, res) => {
//   // Handle preflight OPTIONS request
//   // if (req.method === 'OPTIONS') {
//   //   res.setHeader('Access-Control-Allow-Origin', 'https://atharvx.vercel.app'); // Set your frontend URL
//   //   res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
//   //   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   //   res.setHeader('Access-Control-Allow-Credentials', 'true'); // If needed
//   //   return res.status(200).end();
//   // }

//   // Handle POST request to send an email
//   // if (req.method !== 'POST') {
//   //   return res.status(405).json({ message: 'Method not allowed' });
//   // }

//   const { name, email, message } = req.body;

//   // Set up Nodemailer transport
//   const transport = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.SMTP_EMAIL,
//       pass: process.env.SMTP_PASSWORD,
//     },
//   });

//   const emailBody = `
//     <h3>New Contact Form Submission</h3>
//     <p><strong>Name:</strong> ${name}</p>
//     <p><strong>Email:</strong> ${email}</p>
//     <p><strong>Message:</strong> ${message}</p>
//   `;

//   try {
//     const result = await transport.sendMail({
//       from: process.env.SMTP_EMAIL,
//       to: 'justchilloo86@gmail.com', // Change to your email
//       subject: 'New Message from Contact Form',
//       html: emailBody,
//     });

//    // res.setHeader('Access-Control-Allow-Origin', 'https://atharvx.vercel.app'); // Ensure response also has CORS headers
//     res.status(200).json({ message: 'Email sent successfully', result });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     //res.setHeader('Access-Control-Allow-Origin', 'https://atharvx.vercel.app'); // Ensure response also has CORS headers
//     res.status(500).json({ message: 'Failed to send email', error });
//   }
// };

// module.exports = sendEmailHandler;


import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // ✅ ALWAYS allow origin (no credentials used)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: "justchilloo86@gmail.com",
      subject: "New Message from Contact Form",
      html: `
        <h3>New Contact Form Submission</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Email error:", err);
    return res.status(500).json({ message: "Failed to send email" });
  }
}
