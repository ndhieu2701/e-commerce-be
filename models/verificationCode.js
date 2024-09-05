import mongoose from "mongoose";

const Schema = mongoose.Schema;

const VerifyCodeSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const VerifyCode = mongoose.model("VerifyCode", VerifyCodeSchema);
export default VerifyCode;