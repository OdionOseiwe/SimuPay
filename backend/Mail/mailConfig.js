import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "oseiweifebhor@gmail.com",
    pass:  ""                 //process.env.APP_PASSWORD 
  },
});



