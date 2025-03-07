import multer from "multer";
import path from "path";
import fs from 'fs'


// Définition des types de fichiers acceptés
const fileCategories = {
    images: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    pdfs: ['application/pdf'],
    videos: ['video/mp4', 'video/mpeg', 'video/avi', 'video/mov']
};

// Dossiers de stockage
const uploadDirs = {
    images: 'src/uploads/images',
    pdfs: 'src/uploads/pdfs',
    videos: 'src/uploads/videos',
    others: 'src/uploads/others'
};

// Vérifier et créer les dossiers au démarrage
Object.values(uploadDirs).forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 Dossier créé : ${dir}`);
    }
});

// Configuration du stockage dynamique
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath = uploadDirs.others; // Dossier par défaut si non reconnu

        if (fileCategories.images.includes(file.mimetype)) {
            uploadPath = uploadDirs.images;
        } else if (fileCategories.pdfs.includes(file.mimetype)) {
            uploadPath = uploadDirs.pdfs;
        } else if (fileCategories.videos.includes(file.mimetype)) {
            uploadPath = uploadDirs.videos;
        }

        // Vérifier et créer le dossier si nécessaire
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Renommer avec timestamp
    }
});

// Filtrer les fichiers non pris en charge
const fileFilter = (req, file, cb) => {
    const allTypes = [...fileCategories.images, ...fileCategories.pdfs, ...fileCategories.videos];

    if (allTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Type de fichier non pris en charge. Seuls les images, PDFs et vidéos sont autorisés.'));
    }
};

export const upload = multer({ storage, fileFilter });