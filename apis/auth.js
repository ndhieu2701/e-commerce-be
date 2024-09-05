import express from "express";
import { userLogin, userRegister } from "../controllers/auth.js";
import multerUpload from "../middleware/multer.js";
const router = express.Router();

router.post("/login", userLogin);
router.post("/register", multerUpload, userRegister);

export default router;
