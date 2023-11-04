// fichier qui contient la logique métier pour les lieux de l'utilisateur
// version: 1.0.0
// Auteur: LENNE Sebastien
// Mise à jours, Version: 2.0.0 : ROGERET Kevin

/*
  Mise à jours : [2.0.0]
    Refonte des fonctions pour les adapter au front.
    getlocation ainsi que deletelocation ont été revisitées
    pour faciliter l'accès et la compréhension entre le back et le front.

  -- Des commentaires ont été ajoutés pour une meilleure lisibilité --
*/

// importation des modules
const { homelocation } = require("../Models");
const jwt = require("../utils/jwt");

// Fonction pour ajouter un nouveau lieu
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

      // comment
      const { namelocation, infolocation, adresslocation } = req.body;

      console.log("Données reçues de la requête :", req.body);

      // Validation de la longueur du nom du lieu
      if (!namelocation || !infolocation || !adresslocation) {
        console.log("Paramètres manquants.");
        return res.status(400).json({ error: "Paramètres manquants" });
      }

      // Validation de la longueur des informations du lieu
      if (namelocation.length < 1 || namelocation.length > 20) {
        console.log("Le nom du lieu ne respecte pas la longueur requise.");
        return res.status(400).json({
          error: "Le nom du lieu doit être compris entre 1 et 20 caractères",
        });
      }

      // Validation de la longueur des informations du lieu
      if (infolocation.length < 1 || infolocation.length > 350) {
        console.log("Les informations ne respectent pas la longueur requise.");
        return res.status(400).json({
          error:
            "Les informations doivent être comprises entre 1 et 350 caractères",
        });
      }

      // Validation de la longueur de l'adresse du lieu
      if (adresslocation.length < 1 || adresslocation.length > 100) {
        console.log("L'adresse ne respecte pas la longueur requise.");
        return res.status(400).json({
          error: "L'adresse doit être comprise entre 5 et 100 caractères",
        });
      }

      // Création du lieu et réponse au client
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

  // Ajoute cette fonction dans ton module.exports

  getlocationId: async (req, res) => {
    try {
      console.log("Nouvelle requête pour obtenir les IDs des lieux.");
      // Supposons que l'ID de l'utilisateur est transmis directement dans la requête (par exemple, dans la query ou les paramètres)
      const locationId = req.params.id;  // ou req.params.userId selon ton routage

      console.log("ID de l'utilisateur reçu dans la requête :", locationId);

      // Récupération des IDs des lieux associés à l'utilisateur
      const location = await homelocation.findOne({
        where: { id: locationId }
      });

      // Si des lieux sont trouvés, renvoie les IDs, sinon renvoie une réponse indiquant qu'aucun lieu n'a été trouvé
      // Si la location est trouvée, renvoie les informations de la location, sinon renvoie une réponse indiquant qu'aucune location n'a été trouvée
      if (location) {
        console.log("Informations de la location trouvées :", location);
        return res.status(200).json(location);
      } else {
        console.log("Aucune location trouvé pour cet ID.");
        return res.status(204).send();
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des IDs des lieux :", error);
      return res.status(500).json({ error: "Erreur interne du serveur" });
    }
  },

  // Fonction pour récupérer tous les lieux d'un utilisateur
  getlocations: async (req, res) => {
    console.log("Requête GET reçue pour /api/homelocation/getloc");
    try {
      console.log("Nouvelle requête pour obtenir les lieux de l'utilisateur.");
      const headerAuth = req.headers["authorization"];
      console.log("Token reçu depuis le client :", headerAuth);
      const userId = jwt.getUserid(headerAuth);

      console.log("ID de l'utilisateur extrait du token :", userId);

      // Récupération des lieux associés à l'utilisateur
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
            console.log("L'utilisateur n'a pas de lieu enregistrer");
            return res.status(204).send();
              //.json({ error: "L'utilisateur n'a pas de lieu enregistrer pour le moment" });
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

  // Mise à jour d'un lieu après vérification de son existence
  updatelocations: async (req, res) => {
    try {
      console.log("Nouvelle requête de modification de lieu.");

      // comment
      const headerAuth = req.headers["authorization"];
      const userId = jwt.getUserid(headerAuth);

      console.log("ID de l'utilisateur extrait du token :", userId);

      // comment
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

  // Fonction pour supprimer un lieu spécifique d'un utilisateur
  deletelocations: async (req, res) => {
    try {
      const locationId = parseInt(req.params.id);
      console.log("Nouvelle requête de suppression de lieu.");
      const headerAuth = req.headers["authorization"];
      const userId = jwt.getUserid(headerAuth);

      console.log("ID de l'utilisateur extrait du token :", userId);

      // Recherche du lieu à supprimer
      const userFound = await homelocation.findOne({
        where: { id: locationId },
      });
      if (!userFound) {
        console.log("Le lieu n'existe pas.");
        return res.status(404).json({ error: "Le lieu n'existe pas" });
      }

      // Suppression du lieu trouvé
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
