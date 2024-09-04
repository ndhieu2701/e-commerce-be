import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import configs from "./configs/index.js";
import dotenv from "dotenv";
import connectDB from "./configs/connectDB.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());

const PORT = configs.port || 3001;
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log("app listen on port: ", PORT));
  })
  .catch((error) => {
    console.log(error);
  });
