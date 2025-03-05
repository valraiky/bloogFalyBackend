import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../config/database.js";

const Formation = sequelize.define("Formation", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  formationName: {type: DataTypes.STRING, allowNull: false },
  title: {type: DataTypes.STRING, allowNull: false },
  description: {type: DataTypes.STRING, allowNull: false },
  prerequis: {type: DataTypes.JSON, allowNull: false },
  file_url: {type: DataTypes.STRING, allowNull: false }
});

export default Formation;