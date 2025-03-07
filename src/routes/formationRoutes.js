import express from "express";
import formationController from "../controllers/formationController.js";
import { upload } from "../utils/upload.js";

const router = express.Router();

router.get("/", formationController.getAllFormationController);
router.get("/:id", formationController.getFormationByIdController)
router.post("/", upload.single("file"), formationController.createFormationController);

export default router;