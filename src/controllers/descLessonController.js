import { createDescLessonService, deleteDescLessonService, getAllDescLessonService, getDescLessonByIdService, updateDescLessonService } from "../services/descLessonService.js";

export const getAllDescLessonController = async (req, res) => {
  try {
    const descLessons = await getAllDescLessonService();

    const parsedDescLessons = descLessons.map((descLesson) => {
      return {
        ...descLesson.toJSON(),
        description: JSON.parse(descLesson.description),
      };
    });

    res.json(parsedDescLessons);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const getDescLessonByIdController = async (req, res) => {
  try {
    const descLesson = await getDescLessonByIdService(req.params.id);
    if (!descLesson) return res.status(404).json({ error: "lesson non trouvé" });

    const parsedDescLesson = {
      ...descLesson.toJSON(),
      description: JSON.parse(descLesson.description),
    };

    res.json(parsedDescLesson);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const createDescLessonController = async (req, res) => {
  try {
    const desclesson = await createDescLessonService(req.body);

    res.status(201).json(desclesson);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const updateDescLessonController = async (req, res) => {
  try {
    const descLesson = await updateDescLessonService(req.params.id, req.body);
    if (!descLesson) return res.status(404).json({ error: "lesson non trouvé" });
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const deleteDescLessonController = async (req, res) => {
  try {
    const descLesson = await deleteDescLessonService(req.params.id)
    if (!descLesson) return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};