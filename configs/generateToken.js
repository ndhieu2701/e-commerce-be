import jwt from "jsonwebtoken";
import configs from "./index.js";

const generateToken = async ({ id, type }) => {
  const token = await jwt.sign({ id, type }, configs.jwt_secret);
  return token;
};

export default generateToken;
