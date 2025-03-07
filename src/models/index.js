import sequelize from "../config/database.js";
import DescLesson from "./DescLesson.js";
import Formation from "./Formation.js";
import Lessons from "./Lesson.js";
import User from "./User.js";

Lessons.belongsTo(Formation, {
  foreignKey: "formationId",
  as: "formation", // Optionnel : nom de l'association
});

Formation.hasMany(Lessons, {
  foreignKey: "formationId",
  as: "lessons", // Optionnel : nom de l'association
});

DescLesson.belongsTo(Lessons, {
  foreignKey:"lessonId",
  as: "lessons"
})

Lessons.hasMany(DescLesson, {
  foreignKey: "lessonId",
  as: "descLessons"
})

// Initialiser les modèles
const db = {
  sequelize,
  User,
  Formation,
  Lessons,
  DescLesson
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
