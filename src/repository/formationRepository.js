import { db } from "../models/index.js";

export const getFormationByIdRepository = async (id) => await db.Formation.findByPk(id, {
    include: [{ model: db.Lessons, as: "lessons" }],
  }
);
export const updateFormationRepository = async (id, data) => await db.Formation.update(data, {where: {id} })
export const deleteFormationRepository = async (id) => await db.Formation.destroy({where: {id} });