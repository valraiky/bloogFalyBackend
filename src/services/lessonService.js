import { createLessonRepository, deleteLessonRepository, getAllLessonRepository, getLessonRepositoryById } from "../repository/lessonRepository.js";

export const getAllLessonService = async () => {
  return await getAllLessonRepository();
};

export const getLessonByIdService = async (id) => {
  return await getLessonRepositoryById(id);
};

export const createLessonService = async (data) => {
  return await createLessonRepository(data);
};

export const updateLessonService = async (id, data) => {
  const lesson = await getLessonRepositoryById(id);
    if (!lesson){
      return null
    }
  return await updateLessonService(id, data);
};

export const deleteLessonService = async (id) => {
  const lesson = await getLessonRepositoryById(id);
  if (!lesson) return null;
  await deleteLessonRepository(id);
  return lesson;
};