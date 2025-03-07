import { db } from "../models/index.js";

export const createDescLessonRepository = async (data) => await db.DescLesson.create(data);
export const getAllDescLessonRepository = async () => await db.DescLesson.findAll();
export const getDescLessonRepositoryById = async (id) => await db.DescLesson.findByPk(id);
export const updateDescLessonRepository = async (id, data) => await db.DescLesson.update(data, {where: {id} })
export const deleteDescLessonRepository = async (id) => await db.DescLesson.destroy({where: {id} });