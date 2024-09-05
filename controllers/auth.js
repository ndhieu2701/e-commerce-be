import generateToken from "../configs/generateToken.js";
import config from "../configs/index.js";
import transporter from "../configs/nodemailer.js";
import User from "../models/user.js";
import VerifyCode from "../models/verificationCode.js";
import jwt from "jsonwebtoken";
import {
  FIRST_RANDOM_NUMBER,
  SECOND_RANDOM_NUMBER,
  userType,
} from "../utils/constant.js";
import {
  cloudinaryUpload,
  comparePassword,
  hashPassword,
} from "../utils/function.js";

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

//[POST] /auth/register
export const userRegister = async (req, res, next) => {
  try {
    const { username, email, password, address, phone } = req.body;
    if (!username || !email || !password)
      return res
        .status(400)
        .json({ message: "Please filled all required fields", code: 400 });
    const existUser = await User.findOne({ email });
    if (existUser)
      return res
        .status(401)
        .json({ message: "Email exist. Please try other email" });
    const avatar = req.file;
    const avatarUrl = await cloudinaryUpload(avatar);
    const passwordHash = await hashPassword(password);
    await User.create({
      username,
      email,
      password: passwordHash,
      address,
      phone,
      avatar: avatarUrl,
    });
    return res
      .status(201)
      .json({ message: "User register success", code: 201 });
  } catch (error) {
    return res.status(500).json({ message: "Server error", code: 500 });
  }
};

//[POST] /auth/get-code
export const getVerifyCode = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existUser = await User.findOne({ email });
    if (!existUser)
      return res
        .status(404)
        .json({ message: "User does not exist", code: 404 });
    const code = Math.floor(
      FIRST_RANDOM_NUMBER + Math.random() * SECOND_RANDOM_NUMBER
    ).toString();

    await VerifyCode.create({
      email,
      code,
    });

    const mailOptions = {
      from: config.mail_account,
      to: email,
      subject: "Reset password code",
      text: `Your reset password code is: ${code}`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return res
          .status(500)
          .json({ code: 500, message: "Error sending email." });
      }
      return res.status(201).json({
        code: 201,
        message: "Verification code has been sent to your email.",
      });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", code: 500 });
  }
};

//[POST] /auth/verify-code
export const verifyCode = async (req, res, next) => {
  try {
    const { email, code } = req.body;
    const verifyModel = await VerifyCode.findOne({ email }).sort("-createdAt");
    const user = await User.findOne({ email });
    if (verifyModel.code === code) {
      return res.status(200).json({
        code: 200,
        message: "Verify code success!",
        token: generateToken({
          id: user._id,
          type: userType.USER,
          expiresIn: 10 * 1000 * 60,
        }),
      });
    } else
      return res
        .status(400)
        .json({ message: "Verify code not match", code: 400 });
  } catch (error) {
    return res.status(500).json({ message: "Server error", code: 500 });
  }
};

//[POST] /auth/reset-password -> reset password when not login
export const resetPassword = async (req, res, next) => {
  try {
    const { password, token } = req.body;
    const { id } = jwt.verify(token, config.jwt_secret);
    if (!id)
      return res.status(400).json({ code: 400, message: "Token is wrong!" });
    const existUser = await User.findOne({ _id: id });
    if (!existUser)
      return res.status(404).json({ message: "User not found", code: 404 });
    const passwordHashed = await hashPassword(password);
    await User.findByIdAndUpdate(
      id,
      { password: passwordHashed },
      { new: true }
    );
    return res.status(201).json({
      message: "Update password success",
      code: 201,
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ code: 401, message: "Token has expired!" });
    }
    return res.status(500).json({ code: 500, message: "An error occurred!" });
  }
};
