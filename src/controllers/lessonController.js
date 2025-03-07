import { createLessonService, deleteLessonService, getAllLessonService, getLessonByIdService, updateLessonService } from "../services/lessonService.js";

export const getAllLessonController = async (req, res) => {
  try {
    const lessons = await getAllLessonService();

    const parsedLessons = lessons.map((lesson) => {
        return {
          ...lesson.toJSON(),
          description: JSON.parse(lesson.description),
          prerequis: JSON.parse(lesson.prerequis),
          duration: JSON.parse(lesson.duration),
        };
    });
  
    res.json(parsedLessons);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const getLessonByIdController = async (req, res) => {
  try {
    const lessonWithDescLessons  = await getLessonByIdService(req.params.id);
    if (!lessonWithDescLessons) return res.status(404).json({ error: "lesson non trouvé" });

    const parsedLessonWithDescLessons = {
      ...lessonWithDescLessons.toJSON(),
      description: JSON.parse(lessonWithDescLessons.description),
      prerequis: JSON.parse(lessonWithDescLessons.prerequis),
      duration: JSON.parse(lessonWithDescLessons.duration),
      descLessons: lessonWithDescLessons.descLessons.map((descLesson) => ({
        ...descLesson.toJSON(),
        description: JSON.parse(descLesson.description),
      })),
    };

    res.json(parsedLessonWithDescLessons);
  } catch (error) {
    console.log("erreur du serveur:", error);
    
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const createLessonController = async (req, res) => {
  try {
    const lesson = await createLessonService(req.body);
    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const updateLessonController = async (req, res) => {
  try {
    const lesson = await updateLessonService(req.params.id, req.body);
    if (!lesson) return res.status(404).json({ error: "lesson non trouvé" });
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const deleteLessonController = async (req, res) => {
  try {
    const lesson = await deleteLessonService(req.params.id);
    if (!lesson) return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
