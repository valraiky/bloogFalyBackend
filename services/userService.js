import { createUserRepository, deleteUserRepository, getAllUsersRepository, getUserByIdRepository, updateUserRepository } from "../repository/userRepository.js";

// 🟢 Fonction pour récupérer tous les utilisateurs
const getAllUsers = async () => {
  return await getAllUsersRepository();
};

// 🟢 Fonction pour récupérer un utilisateur par ID
const getUserById = async (id) => {
  return await getUserByIdRepository(id);
};

// 🟢 Fonction pour créer un utilisateur
const createUser = async (data) => {
  return await createUserRepository(data);
};

// 🟢 Fonction pour mettre à jour un utilisateur
const updateUser = async (id, data) => {
  const user = await getUserByIdRepository(id);
  if (!user) return null;
  return await updateUserRepository(id, data);
};

// 🟢 Fonction pour supprimer un utilisateur
const deleteUser = async (id) => {
  const user = await getUserByIdRepository(id);
  if (!user) return null;
  await deleteUserRepository(id);
  return user;
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};