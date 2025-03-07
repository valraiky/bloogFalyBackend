import express from "express";
import { createDescLessonController, deleteDescLessonController, getAllDescLessonController, getDescLessonByIdController, updateDescLessonController } from "../controllers/descLessonController.js";

const router = express.Router();

router.get("/", getAllDescLessonController);
router.get("/:id", getDescLessonByIdController);
router.post("/", createDescLessonController);
router.put("/:id", updateDescLessonController);
router.delete("/:id", deleteDescLessonController);

export default router;