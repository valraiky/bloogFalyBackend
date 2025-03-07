import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Lessons = sequelize.define("Lessons", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  lessonName: {type: DataTypes.STRING, allowNull: false },
  title: {type: DataTypes.STRING, allowNull: true },
  description: {type: DataTypes.JSON, allowNull: false },
  prerequis: {type: DataTypes.JSON, allowNull: false },
  duration: {type: DataTypes.JSON, allowNull:true}
});

export default Lessons;