import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const DescLesson = sequelize.define("DescLesson", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: {type: DataTypes.STRING, allowNull: true },
  description: {type: DataTypes.JSON, allowNull: false }
});

export default DescLesson;