import express from "express";
import { createLessonController, deleteLessonController, getAllLessonController, getLessonByIdController, updateLessonController } from "../controllers/lessonController.js";

const router = express.Router();

router.get("/", getAllLessonController);
router.get("/:id", getLessonByIdController);
router.post("/", createLessonController);
router.put("/:id", updateLessonController);
router.delete("/:id", deleteLessonController);

export default router;