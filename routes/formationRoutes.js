import express from "express";
import formationController from "../controllers/formationController.js";

const router = express.Router();

router.get("/", formationController.getAllFormationController);
router.post("/", formationController.createFormationController);

export default router;