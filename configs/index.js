import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
  jwt_secret: process.env.JWT_SECRET,
  cloud_name: process.env.CLOUD_NAME,
  cloud_api_key: process.env.CLOUD_API_KEY,
  cloud_api_secret: process.env.CLOUD_API_SECRET,
  host: process.env.HOST,
  mail_port: process.env.MAIL_PORT,
  mail_account: process.env.MAIL_ACCOUNT,
  mail_pass: process.env.MAIL_PASS,
};

export default config;
