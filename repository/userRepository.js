import { db } from "../models/index.js";

export const createUserRepository = async (data) => await db.User.create(data);
export const getAllUsersRepository = async () => await db.User.findAll();
export const getUserByIdRepository = async (id) => await db.User.findByPk(id);
export const updateUserRepository = async (id, data) => await db.User.update(data, { where: { id } });
export const deleteUserRepository = async (id) => await db.User.destroy({ where: { id } });
