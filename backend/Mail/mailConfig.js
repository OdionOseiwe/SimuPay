import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465
  auth: {
    user: "oseiweifebhor@gmail.com",
    pass: process.env.APP_PASSWORD 
  },
  tls: {
    rejectUnauthorized: false, // helps if behind strict firewalls
  },
});



