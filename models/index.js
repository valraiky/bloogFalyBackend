import sequelize from "../config/database.js";
import Formation from "./Formation.js";
import User from "./User.js";

// Initialiser les modèles
const db = {
  sequelize,
  User,
  Formation
};

// Synchronisation avec la base de données
const initDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // Utilisation de alter pour mettre à jour la structure si nécessaire
    console.log("✅ Database synchronized successfully.");
  } catch (error) {
    console.error("❌ Error synchronizing database:", error);
  }
};

export { db, initDatabase };
