import multer from "multer";
import path from "path";
import { v4 as uuidV4 } from "uuid";
import { IMAGE_FILE_SIZE } from "../utils/constant.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/");
  },
  filename: (req, file, cb) => {
    const newName = Date.now() + "-" + uuidV4();
    cb(null, newName + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: IMAGE_FILE_SIZE * 1024 * 1024,
});

const multerUpload = async (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
      return res.status(401).json({ message: "File too large" });
    } else if (err) {
      return res.status(500).json({ message: "Upload file error" });
    }
    next();
  });
};

export default multerUpload;
