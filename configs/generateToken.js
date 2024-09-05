import jwt from "jsonwebtoken";
import configs from "./index.js";

const generateToken = async ({ id, type, expiresIn }) => {
  const token = await jwt.sign({ id, type }, configs.jwt_secret, {
    expiresIn,
  });
  return token;
};

export default generateToken;
