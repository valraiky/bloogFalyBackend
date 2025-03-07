import { db } from "../models/index.js";
import { getFormationByIdRepository } from "../repository/formationRepository.js";

// 🟢 Fonction pour récupérer tous les formations
const getAllFormationService = async () => {
  return await db.Formation.findAll();
};

// 🟢 Fonction pour créer un formations
const createFormationService = async (data) => {
  return await db.Formation.create(data);
};

const getFormationByIdService = async (id) => {
  try {
    const formation = await getFormationByIdRepository(id);

  formation.description = JSON.parse(formation.description);
  formation.prerequis = JSON.parse(formation.prerequis);

  formation?.lessons?.forEach((lesson) => {
    lesson.description = JSON.parse(lesson.description);
    lesson.prerequis = JSON.parse(lesson.prerequis);
    lesson.duration = JSON.parse(lesson.duration);
  });
  
  return formation;
  } catch (error) {
    console.log("erreur:", error);
    
    return null
  }
};

export default {
  getAllFormationService, createFormationService, getFormationByIdService
};