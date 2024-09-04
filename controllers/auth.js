import generateToken from "../configs/generateToken.js";
import User from "../models/user.js";
import { userType } from "../utils/constant.js";
import { comparePassword } from "../utils/function.js";

// [POST] /auth/login
export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (!existUser)
      return res.status(404).json({ message: "User not found", code: 404 });
    const isMatch = await comparePassword(existUser.password, password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid password", code: 400 });
    existUser.password = undefined;
    return res.status(200).json({
      message: "Login success",
      data: existUser,
      token: generateToken({ id: existUser._id, type: userType.USER }),
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", code: 500 });
  }
};
