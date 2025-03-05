import express from "express";
import userController from "../controllers/userController.js";
import { authenticateJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/",userController.getAllUsers);
// router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.get("/profile", authenticateJWT, userController.getUserProfile);

export default router;