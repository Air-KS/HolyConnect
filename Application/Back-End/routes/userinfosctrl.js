// importation des modules
const jwtUtils = require("../utils/jwt");
const { Userinfo } = require("../Models"); // Assurez-vous d'importer le bon modèle

// routes
module.exports = {
  createprofile: async (req, res) => {
    // récupération du header d'authentification
    const headerAuth = req.headers["authorization"];
    const userId = jwtUtils.getUserid(headerAuth);

    // récupération des paramètres
    const {
      firstname,
      username,
      dateofbirth,
      phonenumber,
      adress1,
      adress2,
      city,
      zipcode,
      country,
    } = req.body;

    // vérification des paramètres
    if (
      !firstname ||
      !username ||
      !dateofbirth ||
      !phonenumber ||
      !adress1 ||
      !adress2 ||
      !city ||
      !zipcode ||
      !country
    ) {
      return res
        .status(400)
        .json({ error: "Paramètres d'inscription de profil manquants" });
    }
    if (firstname.length < 3 || firstname.length > 12) {
      // vérification de la longueur du prénom
      return res.status(400).json({
        error: "Le prénom doit être compris entre 3 et 12 caractères",
      });
    }
    if (dateofbirth.length < 5 || dateofbirth.length > 10) {
      // vérification de la longueur de la date de naissance
      return res.status(400).json({
        error: "La date de naissance doit être afficher comme cela DD/MM/YYYY",
      });
    }
    if (phonenumber.length < 10 || phonenumber.length > 12) {
      // vérification de la longueur du numéro de téléphone
      return res.status(400).json({ error: "Numéro de téléphone incorrect" });
    }
    // vérification si l'utilisateur existe déjà
    const userFound = await Userinfo.findOne({
      where: { userId: userId },
    });

    if (userFound) {
      // retour si l'utilisateur existe déjà
      return res.status(409).json({ error: "L'utilisateur existe déjà" });
    }

    // Création du profil
    Userinfo.create({
      firstname,
      username,
      dateofbirth,
      phonenumber,
      adress1,
      adress2,
      city,
      zipcode,
      country,
      userId: userId,
    })
      .then(function (newUser) {
        // retour si le profil est créé
        return res.status(201).json({
          userid: newUser.userId,
        });
      })
      .catch(function (err) {
        console.log("Erreur lors de la création du profil :", err); // retour si le profil n'est pas créé
        return res
          .status(500)
          .json({ error: "Impossible d'ajouter cette l'utilisateur" });
      });
  },

  // route readprofile
  readprofile: async (req, res) => {
    // Code pour lire le profil
    const headerAuth = req.headers["authorization"];
    const userId = jwtUtils.getUserid(headerAuth);

    Userinfo.findOne({
      where: { userId: userId },
    })
      .then(function (userFound) {
        // retour si le profil est trouvé
        if (userFound) {
          return res.status(200).json(userFound);
        } else {
          return res.status(404).json({ error: "L'utilisateur n'existe pas" });
        }
      })
      .catch(function (err) {
        // retour si le profil n'est pas trouvé
        return res
          .status(500)
          .json({ error: "Impossible de vérifier le profil" });
      });
  },

  // route updateprofile
  updateprofile: async (req, res) => {
    // Code pour modifier le profil
    const headerAuth = req.headers["authorization"];
    const userId = jwtUtils.getUserid(headerAuth);

    Userinfo.findOne({
      // vérification si le profil existe déjà
      where: { userId: userId },
    })
      .then(function (userFound) {
        // retour si le profil est trouvé
        if (userFound) {
          userFound
            .update({
              firstname: req.body.firstname,
              username: req.body.username,
              dateofbirth: req.body.dateofbirth,
              phonenumber: req.body.phonenumber,
              adress1: req.body.adress1,
              adress2: req.body.adress2,
              city: req.body.city,
              zipcode: req.body.zipcode,
              country: req.body.country,
            })
            .then(function () {
              // retour si le profil est modifié
              return res.status(201).json({ message: "Profil modifié" });
            })
            .catch(function (err) {
              // retour si le profil n'est pas modifié
              return res
                .status(500)
                .json({ error: "Impossible de modifier le profil" });
            });
        } else {
          // retour si utilisateur inconnu
          return res.status(404).json({ error: "L'utilisateur n'existe pas" });
        }
      })
      .catch(function (err) {
        // retour si le profil n'est pas trouvé
        return res
          .status(500)
          .json({ error: "Impossible de vérifier le profil" });
      });
  },

  // route deleteprofile
  deleteprofile: async (req, res) => {
    // Code pour supprimer le profil
    const headerAuth = req.headers["authorization"];
    const userId = jwtUtils.getUserid(headerAuth);

    Userinfo.findOne({
      // vérification si le profil existe déjà
      where: { userId: userId },
    })
      .then(function (userFound) {
        // retour si le profil est trouvé
        if (userFound) {
          userFound
            .destroy({
              // suppression du profil
              where: { user_id: userId },
            })
            .then(function () {
              // retour si le profil est supprimé
              return res.status(201).json({ message: "Profil supprimé" });
            })
            .catch(function (err) {
              // retour si le profil n'est pas supprimé
              return res
                .status(500)
                .json({ error: "Impossible de supprimer le profil" });
            });
        } else {
          // retour si utilisateur inconnu
          return res.status(404).json({ error: "L'utilisateur n'existe pas" });
        }
      })
      .catch(function (err) {
        // retour si le profil n'est pas trouvé
        return res
          .status(500)
          .json({ error: "Impossible de vérifier le profil" });
      });
  },
};
