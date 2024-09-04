import multer from "multer";
import path from "path";
import { v4 as uuidV4 } from "uuid";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/");
  },
  filename: (req, file, cb) => {
    const newName = Date.now() + "-" + uuidV4();
    cb(null, newName + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
export default upload;