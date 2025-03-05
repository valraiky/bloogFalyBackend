import passport from "passport";

export const authenticateJWT = passport.authenticate("jwt", { session: false });

// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import User from "../models/User.js";

// dotenv.config();

// export const authenticateJWT = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Accès refusé. Token manquant ou invalide." });
//   }

//   const token = authHeader.split(" ")[1]; // Récupération du token

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérification du token
//     const user = await User.findByPk(decoded.id); // Récupération de l'utilisateur

//     if (!user) {
//       return res.status(401).json({ message: "Utilisateur introuvable" });
//     }

//     req.user = user; // Ajout de l'utilisateur au `req`
//     next(); // Passage à la route suivante
//   } catch (error) {
//     return res.status(403).json({ message: "Token invalide ou expiré." });
//   }
// };