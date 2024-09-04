import mongoose from "mongoose";
import configs from "./index.js";

const connectDB = async () => {
  const connect = await mongoose.connect(configs.mongo_uri, {
    ssl: true,
    tlsAllowInvalidCertificates: true,
  });
  console.log("DB connected: ", connect.connection.host);
};

export default connectDB;
