import { createDescLessonRepository, getAllDescLessonRepository, getDescLessonRepositoryById } from "../repository/descLessonRepository.js";
import { getLessonByIdService } from "./lessonService.js";

export const getAllDescLessonService = async () => {
  const descLessons = await getAllDescLessonRepository();

  return descLessons;
};

export const getDescLessonByIdService = async (id) => {
  const descLesson = await getDescLessonRepositoryById(id);

  return descLesson;
};

export const createDescLessonService = async (data) => {
  return await createDescLessonRepository(data);
};

export const updateDescLessonService = async (id, data) => {
  const descLesson = await getDescLessonRepositoryById(id);
    if (!descLesson){
      return null
    }
  return await updateLessonService(id, data);
};

export const deleteDescLessonService = async (id) => {
  const descLesson = await getDescLessonRepositoryById(id);
  if (!descLesson) return null;
  await deleteLessonRepository(id);
  return descLesson;
};