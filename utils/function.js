import bcrypt from "bcrypt";
import cloudinary from "../configs/cloudinary.js";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
};

const comparePassword = async (password, receivePassword) => {
  const isMatch = await bcrypt.compare(receivePassword, password);
  return isMatch;
};

const cloudinaryUpload = async (img) => {
  if (!img) return "";
  const imgUploaded = await cloudinary.uploader.upload(img.path, {
    resource_type: "auto",
  });
  const imgUrl = imgUploaded.secure_url;
  return imgUrl;
};

export { hashPassword, comparePassword, cloudinaryUpload };
