import nodemailer from "nodemailer";
import config from "./index.js";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: config.host,
  port: config.mail_port,
  secure: false,
  auth: {
    user: config.mail_account,
    pass: config.mail_pass,
  },
});

export default transporter;
