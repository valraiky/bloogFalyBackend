import { body, validationResult } from "express-validator";
import User from "../models/User.js";


export const validateUser = [
  body("fullname").notEmpty().withMessage("Le nom est requis"),
  body("role").notEmpty().withMessage("Le role de l'utilisateur est requis"),
  body("email").isEmail().withMessage("L'email n'est pas valide"),
  body("passwordHash")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const isExisteMail = async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(404).json({ message: "cet email est dejà utilisé" });
    }

    next();
}
