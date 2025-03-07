import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../config/database.js";

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fullname: {type: DataTypes.STRING, allowNull: false },
  role: {type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  resetToken: { type: DataTypes.STRING, allowNull: true },
  resetTokenExpires: { type: DataTypes.DATE, allowNull: true }, 
});

User.beforeCreate(async (user) => {
  user.passwordHash = await bcrypt.hash(user.passwordHash, 10);
});

User.prototype.comparePassword = async function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

export default User;