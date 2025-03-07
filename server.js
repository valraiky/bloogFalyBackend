import express from "express";
import dotenv from "dotenv";
import { initDatabase } from "./src/models/index.js";
import passport from "passport";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import formationRoutes from "./src/routes/formationRoutes.js";
import lessonRoutes from "./src/routes/lessonRoutes.js";
import descLessonRoutes from "./src/routes/descLesssonRoutes.js"
import "./src/config/passport.js";
import cors from 'cors';
import morgan from "morgan";
import bodyParser from "body-parser";
import { upload } from "./src/utils/upload.js";
import path from "path";
import { fileURLToPath } from 'url';

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
app.use("/formations", formationRoutes);
app.use("/lessons", lessonRoutes);
app.use("/descLessons", descLessonRoutes);

// Obtenir le chemin du répertoire courant
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration des fichiers statiques
app.use('/images', express.static(path.join(__dirname, 'src/uploads/images')));

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