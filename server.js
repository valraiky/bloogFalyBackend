import express from "express";
import dotenv from "dotenv";
import { initDatabase } from "./models/index.js";
import passport from "passport";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import formationRoutes from "./routes/formationRoutes.js";
import "./config/passport.js";
import cors from 'cors';
import morgan from "morgan";
import bodyParser from "body-parser";
import { upload } from "./utils/upload.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app
  .use(morgan("dev"))
  .use(bodyParser.json())

// app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use("/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/formations", formationRoutes)

const PORT = process.env.PORT || 3000;

// Route pour uploader un fichier
app.post('/upload', upload.single("file"), (req, res) => {
  try {
    console.log("body",req.body);
    
    if (!req.file) {
      return res.status(400).json({ message: 'Aucun fichier sélectionné ou type non autorisé' });
    }

    console.log("eq.file.filename,", req.file.filename, "req.file.path", req.file.path);
    

    res.json({
      message: 'Fichier uploadé avec succès',
      file: req.file.filename,
      path: req.file.path
    });
  }catch (error) {
    console.log(error);
      
    res.json("erreur interne")
  }
});

app.use((req, res, next) => {
  res.status(404).send("Désolé, la page que vous recherchez n'existe pas.");
});

const startServer = async () => {
  await initDatabase();
  app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));
};

startServer();