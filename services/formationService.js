import { db } from "../models/index.js";

// 🟢 Fonction pour récupérer tous les formations
const getAllFormationService = async () => {
  return await db.Formation.findAll();
};

// 🟢 Fonction pour créer un formations
const createFormationService = async (data) => {
  return await db.Formation.create(data);
};

export default {
  getAllFormationService, createFormationService
};