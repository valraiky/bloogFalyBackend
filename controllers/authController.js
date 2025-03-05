import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { sendResetEmail } from "../utils/emailService.js";
import crypto from "crypto";
import { Op } from "sequelize";

dotenv.config();

// Inscription
export const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: "Utilisateur créé", user: { id: user.id, email: user.email, fullname: user.fullname} });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Connexion
export const login = async (req, res) => {
  console.log("req.body", req.body);
  
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(401).json({ error: "Utilisateur non trouvé" });
    }  

    console.log("user", user.passwordHash);
    
    if (!user || !(await bcrypt.compare(req.body.password, user.passwordHash))) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }
    // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ message: "Connexion réussie", token });
  } catch (error) {
    res.status(500).json({ error: 'connexion echoué'});
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Générer un token sécurisé pour le reset
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpires = new Date(Date.now() + 3600000); // Expire dans 1 heure

    user.resetToken = resetToken;
    user.resetTokenExpires = resetTokenExpires;
    await user.save();

    // Envoyer l'email avec le lien de reset
    await sendResetEmail(email, resetToken);

    res.json({ message: "Email de réinitialisation envoyé !" });
  } catch (error) {
    console.log("erreur",error);
    
    res.status(500).json({ message: "Erreur interne", error });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  console.log("token:", token, "newPassword", newPassword);
  

  try {
    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpires: { [Op.gt]: new Date() }, // Vérifie si le token n'est pas expiré
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Token invalide ou expiré" });
    }

    // Hasher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Mettre à jour le mot de passe et supprimer le token de reset
    user.passwordHash = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpires = null;
    await user.save();

    res.json({ message: "Mot de passe mis à jour avec succès" });
  } catch (error) {
    console.log("erreur:", error);
    
    res.status(500).json({ message: "Erreur interne", error });
  }
};

