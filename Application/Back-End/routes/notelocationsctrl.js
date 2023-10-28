// controleur des notes de locations
// Path: Application/Back-End/routes/notelocationsctrl.js
// 1.0.0
// Auteur: LENNE Sebastien

// importation des modules
const { notelocation } = require("../Models");
const multer = require("multer");
const jwt = require("../utils/jwt");
const errorHandler = require("../config/errorHandler");
const path = require("path");
const fs = require("fs");

// Configuration de multer pour le téléchargement de fichiers
const storage = multer.memoryStorage(); // Stocke le fichier en mémoire
const upload = multer({ storage: storage });

module.exports = {
  // Fonction de création des notes
  newnotes: async (req, res) => {
    try {
      // Récupération du header d'authentification
      const headerAuth = req.headers["authorization"];
      const userId = jwt.getUserid(headerAuth);

      const { title, content } = req.body;

      if (!title || !content) {
        // Vérification de la présence des paramètres
        console.log("Paramètres manquants");
        return res.status(400).json({ error: "Paramètres manquants" });
      }

      if (title.length < 5 || title.length > 40) {
        // Vérification de la longueur du titre
        return res.status(400).json({
          error: "Le titre doit être compris entre 5 et 40 caractères",
        });
      }

      // Traitement de l'image (si elle est envoyée)
      let pictureData = null;
      if (req.file && req.file.buffer) {
        pictureData = req.file.buffer;
        // Vous pouvez enregistrer ou traiter l'image ici, par exemple, la sauvegarder sur le serveur
        const picturePath = path.join(
          __dirname,
          "uploads",
          `${userId}_${Date.now()}.jpg`,
        );
        fs.writeFileSync(picturePath, pictureData);
        // Vous pouvez également stocker le chemin de l'image dans la base de données
      }

      if (content.length < 5 || content.length > 1500) {
        // Vérification de la longueur du contenu
        return res.status(400).json({
          error: "Le contenu doit être compris entre 5 et 1500 caractères",
        });
      }

      notelocation
        .create({
          locationID: userId,
          title,
          content,
          picture: pictureData, // Enregistrement de l'image
        })
        .then(function (newnote) {
          // Envoi de la note
          console.log("Nouvelle note créée :", newnote);
          return res.status(201).json({
            locationID: userId,
            message: "Nouvelle note créée",
          });
        })
        .catch(function (err) {
          // Gestion des erreurs
          console.error("Erreur lors de la création de la note :", err);
          return res
            .status(500)
            .json({ error: "Erreur inattendue : merci de recommencer" });
        });
    } catch (error) {
      // Gestion des erreurs inattendues
      console.error("Erreur inattendue :", error);
      return res.status(500).json({ error: "Erreur inattendue" });
    }
  },

  // fonction de récupération des notes
  getnotes: async (req, res) => {
    try {
      // récupération du header d'authentification
      console.log("Nouvelle requête pour obtenir les notes de l'utilisateur.");

      const headerAuth = req.headers["authorization"];
      const userId = jwt.getUserid(headerAuth);

      console.log("ID de l'utilisateur :", userId);

      notelocation
        .findAll({
          where: { locationID: userId },
        })
        .then(function (userfound) {
          // Vérification de l'existence de la note
          if (userfound && userfound.length > 0) {
            // Envoi de la note
            console.log("Notes trouvées");
            return res.status(200).json(userfound);
          } else {
            // Si aucune note n'a été trouvée
            console.log("Aucune note trouvée.");
            return res
              .status(404)
              .json({ message: "Aucune note trouvée pour cet utilisateur." });
          }
        })
        .catch(function (error) {
          // Gérez les erreurs potentielles ici
          console.error("Erreur lors de la récupération des notes :", error);
          return res.status(500).json({
            message:
              "Une erreur s'est produite lors de la récupération des notes.",
          });
        });
    } catch (error) {
      console.error("Erreur lors de la récupération des notes :", error);
      return res.status(500).json({
        message: "Une erreur s'est produite lors de la récupération des notes.",
      });
    }
  },

  // fonction mise a jour des notes
  updatenotes: async (req, res) => {
    try {
      console.log("Nouvelle requête de modification de note.");

      const headerAuth = req.headers["authorization"];
      const userId = jwt.getUserid(headerAuth);

      console.log("ID de l'utilisateur extrait du token :", userId);

      notelocation
        .findOne({
          where: { locationID: userId },
        })
        .then(function (userFound) {
          // Vérification de l'existence de la note
          if (userFound) {
            userFound
              .update({
                title: req.body.title,
                content: req.body.title,
                picture: req.body.picture,
              })
              .then(function () {
                console.log("Note modifiée ok");
                // Envoi de la note
                return res.status(200).json({ message: "Note modifiée" });
              })
              .catch((err) => {
                // gestion des erreurs
                return res
                  .status(500)
                  .json({ error: "Impossible de modifier la note" });
              });
          } else {
            return res.status(404).json({ error: "La note n'existe pas" });
          }
        });
    } catch (error) {
      console.error("Erreur inattendue :", error);
    }
  },

  // fonction suppression des notes
  deletenotes: async (req, res) => {
    try {
      // récupération du header d'authentification
      console.log("Nouvelle requête de suppression de note.");

      const headerAuth = req.headers["authorization"];
      const userId = jwt.getUserid(headerAuth);

      console.log("ID de l'utilisateur extrait du token :", userId);

      notelocation
        .findOne({
          // Utilisez la méthode "findOne" du modèle "notelocation"
          where: { locationID: userId },
        })
        .then(function (userFound) {
          // Vérification de l'existence de la note
          if (userFound) {
            userFound
              .destroy()
              .then(function () {
                console.log("Note supprimée avec succès.");
                return res.status(201).json({ message: "Note supprimée" });
              })
              .catch((err) => {
                // gestion des erreurs
                console.error(
                  "Erreur lors de la suppression de la note :",
                  err,
                );
                return res
                  .status(500)
                  .json({ error: "Impossible de supprimer la note" });
              });
          } else {
            // Si aucune note n'a été trouvée
            return res.status(404).json({ error: "La note n'existe pas" });
          }
        });
    } catch (error) {
      // gestion des erreurs inattendues
      console.error("Erreur inattendue :", error);
    }
  },
};
