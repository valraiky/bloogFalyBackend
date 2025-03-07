import { db } from "../models/index.js";

export const createLessonRepository = async (data) => await db.Lessons.create(data);
export const getAllLessonRepository = async () => await db.Lessons.findAll();
export const getLessonRepositoryById = async (id) => await db.Lessons.findByPk(id, {
  include: [{ model: db.DescLesson, as: "descLessons" }],
});
export const updateLessonRepository = async (id, data) => await db.Lessons.update(data, {where: {id} })
export const deleteLessonRepository = async (id) => await db.Lessons.destroy({where: {id} });
