// fichier qui contient la logique métier pour les lieux de l'utilisateur
// version: 1.0.0
// Auteur: LENNE Sebastien

// importation des modules
const { homelocation } = require("../Models");
const jwt = require("../utils/jwt");

module.exports = {
  newlocations: async (req, res) => {
    // récupération du header d'authentification
    try {
      console.log("Nouvelle requête de création de lieu.");

      const headerAuth = req.headers["authorization"];
      const userId = jwt.getUserid(headerAuth);

      console.log("ID de l'utilisateur extrait du token :", userId);

      /**
       * Finds a user's home location by their user ID.
       * @async
       * @function
       * @param {number} userId - The user ID to search for.
       * @returns {Promise<object>} - A Promise that resolves with the user's home location object if found, or null if not found.
       */
      const userFound = await homelocation.findOne({
        where: { homeID: userId },
      });

      const { namelocation, infolocation, adresslocation } = req.body;

      console.log("Données reçues de la requête :", req.body);

      if (!namelocation || !infolocation || !adresslocation) {
        console.log("Paramètres manquants.");
        return res.status(400).json({ error: "Paramètres manquants" });
      }

      if (namelocation.length < 5 || namelocation.length > 20) {
        console.log("Le nom du lieu ne respecte pas la longueur requise.");
        return res.status(400).json({
          error: "Le nom du lieu doit être compris entre 5 et 20 caractères",
        });
      }

      if (infolocation.length < 5 || infolocation.length > 350) {
        console.log("Les informations ne respectent pas la longueur requise.");
        return res.status(400).json({
          error:
            "Les informations doivent être comprises entre 5 et 350 caractères",
        });
      }

      if (adresslocation.length < 5 || adresslocation.length > 100) {
        console.log("L'adresse ne respecte pas la longueur requise.");
        return res.status(400).json({
          error: "L'adresse doit être comprise entre 5 et 100 caractères",
        });
      }

      homelocation
        .create({
          homeID: userId,
          namelocation,
          infolocation,
          adresslocation,
        })
        .then(function (newLocation) {
          console.log("Nouvelle location créée :", newLocation);
          return res.status(201).json({
            locationID: newLocation.homeID,
            message: "Nouvelle location créée",
          });
        })
        .catch(function (err) {
          console.error("Erreur lors de la création de la location :", err);
          return res
            .status(500)
            .json({ error: "Erreur inattendue : merci de recommencer" });
        });
    } catch (error) {
      console.error("Erreur inattendue :", error);
    }
  },

  // route getlocations
  getlocations: async (req, res) => {
    try {
      console.log("Nouvelle requête pour obtenir les lieux de l'utilisateur.");

      const headerAuth = req.headers["authorization"];
      const userId = jwt.getUserid(headerAuth);

      console.log("ID de l'utilisateur extrait du token :", userId);

      homelocation
        .findAll({
          where: { homeID: userId },
        })
        .then(function (userFound) {
          // retour si l'utilisateur existe déjà
          if (userFound && userFound.length > 0) {
            console.log("Voici les résultats");
            return res.status(200).json(userFound);
          } else {
            console.log("L'utilisateur n'a pas de lieu.");
            return res
              .status(404)
              .json({ error: "L'utilisateur n'a pas de putain de lieu" });
          }
        })
        .catch(function (err) {
          console.error("Erreur lors de la récupération des lieux :", err);
          return res
            .status(500)
            .json({ error: "Impossible de récupérer les lieux" });
        });
    } catch (error) {
      console.error("Erreur inattendue :", error);
    }
  },

  // route updatelocations
  updatelocations: async (req, res) => {
    try {
      console.log("Nouvelle requête de modification de lieu.");

      const headerAuth = req.headers["authorization"];
      const userId = jwt.getUserid(headerAuth);

      console.log("ID de l'utilisateur extrait du token :", userId);

      homelocation
        .findOne({
          where: { homeID: userId },
        })
        .then(function (userFound) {
          if (userFound) {
            userFound
              .update({
                namelocation: req.body.namelocation,
                infolocation: req.body.infolocation,
                adresslocation: req.body.adresslocation,
              })
              .then(function () {
                console.log("Location modifié avec succès.");
                return res.status(201).json({ message: "Lieu modifié" });
              })
              .catch((err) => {
                console.error("Erreur lors de la modification du lieu :", err);
                return res
                  .status(500)
                  .json({ error: "Impossible de modifier le lieu" });
              });
          } else {
            return res.status(404).json({ error: "Le lieu n'existe pas" });
          }
        })
        .catch(function (err) {
          console.error("Erreur lors de la modification du lieu :", err);
          return res
            .status(500)
            .json({ error: "Impossible de modifier le lieu" });
        });
    } catch (error) {
      console.error("Erreur inattendue :", error);
    }
  },

  // route deletelocations
  deletelocations: async (req, res) => {
    try {
      console.log("Nouvelle requête de suppression de lieu.");

      const headerAuth = req.headers["authorization"];
      const userId = jwt.getUserid(headerAuth);

      console.log("ID de l'utilisateur extrait du token :", userId);

      const userFound = await homelocation.findOne({
        where: { homeID: userId },
      });

      if (!userFound) {
        console.log("Le lieu n'existe pas.");
        return res.status(404).json({ error: "Le lieu n'existe pas" });
      }

      userFound
        .destroy()
        .then(function () {
          console.log("Lieu supprimé avec succès.");
          return res.status(201).json({ message: "Lieu supprimé" });
        })
        .catch(function (err) {
          console.error("Erreur lors de la suppression du lieu :", err);
          return res
            .status(500)
            .json({ error: "Impossible de supprimer le lieu" });
        });
    } catch (error) {
      console.error("Erreur inattendue :", error);
    }
  },
};
