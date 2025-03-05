import formationService from "../services/formationService.js";


// 🟢 Récupérer tous les utilisateurs
const getAllFormationController = async (req, res) => {
  try {
    const formations = await formationService.getAllFormationService();
    
    // Transformer `prerequis` en objet JSON
    const formattedFormations = formations.map(f => ({
      ...f.toJSON(), 
      prerequis: JSON.parse(f.prerequis) // Convertir en objet
    }));

    res.json(formattedFormations);
  } catch (error) {

    res.status(500).json({ error: "Erreur serveur" });
  }
};

// 🟢 Créer un utilisateur
const createFormationController = async (req, res) => {
  try {
    const formation = await formationService.createFormationService(req.body)
    res.status(201).json(formation);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export default {
  getAllFormationController, createFormationController
};
