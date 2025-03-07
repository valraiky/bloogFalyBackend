import express from "express";
import { register, login, forgotPassword, resetPassword } from "../controllers/authController.js";
import {isExisteMail, validateUser} from "../middlewares/validators.js";

const router = express.Router();

router.post("/register", isExisteMail, validateUser ,register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;