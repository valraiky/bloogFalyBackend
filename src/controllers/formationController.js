import formationService from "../services/formationService.js";
import dotenv from "dotenv";

const PORT = process.env.PORT || 3000;


// 🟢 Récupérer tous les utilisateurs
const getAllFormationController = async (req, res) => {
  try {
    const formations = await formationService.getAllFormationService();
    
    // Transformer `prerequis` en objet JSON
    const formattedFormations = formations.map(f => ({
      ...f.toJSON(),
      description: JSON.parse(f.description),
      prerequis: JSON.parse(f.prerequis) // Convertir en objet
    }));

    res.json(formattedFormations);
  } catch (error) {

    console.log(error);
    

    res.status(500).json({ error: "Erreur serveur" });
  }
};

// 🟢 Créer un utilisateur
const createFormationController = async (req, res) => {
  try {
    const formationData = {
      formationName: req.body.formationName,
      title: req.body.title,
      description: req.body.description,
      prerequis: JSON.parse(req.body.prerequis),
      file_url: `http://localhost:3000/images/${req.file.filename}`
    };

    const formation = await formationService.createFormationService(formationData)
    res.status(201).json(formation);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const getFormationByIdController = async (req, res) => {
  try {
    const formation = await formationService.getFormationByIdService(req?.params?.id);
    
    console.log("formation", formation);

    res.status(201).json(formation);
  } catch (error) {
    res.status(500).json({error: "erreur du serveur"})
  }
}

export default {
  getAllFormationController, createFormationController, getFormationByIdController
};
