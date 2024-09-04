import mongoose from "mongoose";
import { EMAIL_REGEX, PHONE_REGEX } from "../utils/regex.js";

const schema = mongoose.Schema;

const UserSchema = new schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      required: true,
      unique: true,
      match: [EMAIL_REGEX, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    avatar: String,
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: [
        PHONE_REGEX,
        "Please fill a valid phone number with exactly 10 digits",
      ],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
