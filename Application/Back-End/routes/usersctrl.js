// Description: fichier controleur pour les utilisateurs (usersctrl.js)
// Version: 1.1.0
// Auteur: LENNE Sebastien
// Modifier et organiser: ROGERET Kevin

// Import des modules nécessaires
const bcrypt = require("bcrypt");
const jwtUtils = require("../utils/jwt");
const { User } = require("../Models");
const db = require("../config/db");
const tokenBlacklist = new Set();

// Validation des données avec regex
const emailREGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zAZ]{2,}))$/;
const passwordREGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?:;&])[A-Za-z\d@$!%*#?:;&]{8,}$/;

  // Configuration de l'environnement
require("dotenv").config();

module.exports = {
  // Fonction pour enregistrer un nouvel utilisateur
  register: async function (req, res) {
    console.log("Fonction register appelée");
    try {
      console.log("verification des champs - S'inscrire");
      const email = req.body.email;
      const username = req.body.username;
      const password = req.body.password;

      // Affichage des données reçues dans la console
      console.log("Données reçues :");
      console.log("Email:", email);
      console.log("Nom d'utilisateur:", username);
      console.log("Mot de passe:", password);

      // Vérifie que tous les champs sont remplis
      if (!username || !email || !password) {
        return res
          .status(400)
          .json({ error: "Les champs obligatoires sont manquants" });
      }

      // Valide la longueur du nom d'utilisateur
      if (username.length < 5 || username.length > 15) {
        return res.status(400).json({
          error: "Le nom d'utilisateur doit contenir entre 5 et 15 caractères",
        });
      }

      // Valide le format de l'e-mail
      if (!emailREGEX.test(email)) {
        return res.status(400).json({ error: "Email non valide" });
      }

      // Valide le format du mot de passe
      if (!passwordREGEX.test(password)) {
        return res.status(400).json({
          error:
          "Afin de mieux proteger vos donnees. Votre mot de passe doit contenir:\
          \n\n8 Caractères minimum,\
          \nune Majuscule, \nune Minuscule, \nun Chiffre \nun Caractère spécial",
        });
      }

      // Vérifie si l'email existe déjà
      const userFound = await User.findOne({
        attributes: ["email"],
        where: { email: email },
      });
      if (userFound) {
        return res.status(400).json({ error: "Cette adresse e-mail est déjà utilisée" });
      }

      // Hashage du mot de passe et création du nouvel utilisateur
      const bcryptedPassword = await bcrypt.hash(password, 5);
      const newUser = await User.create({
        email: email,
        username: username,
        password: bcryptedPassword,
      });

      // Vérification de la création de l'utilisateur et envoi de la réponse
      if (newUser) {
        console.log("Nouvel utilisateur créé avec succès");
        return res.status(201).json({ User_id: newUser.id });
      } else {
        console.log("Échec de la création de l'utilisateur");
        return res.status(400).json({ error: "Échec de l'enregistrement" });
      }

      // return res.status(201).json({ User_id: newUser.id });
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement de l'utilisateur :",
        error,
      );
      return res
        .status(400)
        .json({ error: "Impossible d'ajouter cet utilisateur" });
    }
  },

  // Fonction pour connecter un utilisateur
  login: async function (req, res) {
    //console.log("Fonction login appelée");
    try {
      console.log("Vérification des champs - Login");
      const email = req.body.email;
      const password = req.body.password;

      // Vérifie que tous les champs sont remplis
      if (!email || !password) {
        console.log("Les paramètres sont manquants");
        return res.status(400).json({ error: "Les paramètres sont manquants" });
      }

      // Recherche de l'utilisateur dans la base de données par email
      console.log("Recherche de l'utilisateur en cours...");
      const userFound = await User.findOne({
        where: { email: email },
      });
      console.log("Utilisateur trouvé:", userFound);

      // Vérification si l'utilisateur existe ou non
      if (!userFound) {
        console.log("Utilisateur non trouvé");
        return res.status(400).json({ error: "Utilisateur n'existe pas" });
      }

      // Comparaison du mot de passe pour authentification
      console.log("Vérification du mot de passe...");
      const passwordMatch = await bcrypt.compare(password, userFound.password);

      // Gestion des cas où le mot de passe ne correspond pas
      if (!passwordMatch) {
        console.log("Mot de passe incorrect");
        return res.status(400).json({ error: "Mot de passe incorrect" });
      }

      // Envoi du token après authentification réussie
      console.log("Utilisateur authentifié. Envoi du token...");
      return res.status(200).json({
        userId: userFound.id,
        token: jwtUtils.generateTokenForUser(userFound),
        username: userFound.username,
      });
    } catch (error) {
      console.error("Erreur lors de la connexion de l'utilisateur :", error);
      console.log("Erreur catchée, appel de errorHandler");
      return res.status(400).json({ error: "Impossible de se connecter" }); // errorHandler est non défini
    }
  },

  // Fonction pour déconnecter un utilisateur
  UserLogout: async function (req, res) {
    const headerAuth = req.headers["authorization"];

    // Ajoutez le token à la liste noire
    tokenBlacklist.add(headerAuth);

    // Supprimez le cookie contenant le token (si utilisé)
    res.clearCookie("token");

    res.status(200).json({ message: "Déconnexion réussie" });
  },

  // Fonction pour réinitialiser le mot de passe
  resetpassword: async function (req, res) {
    const email = req.body.email;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return errorHandler(res, "Utilisateur non trouvé");
    }

    // Générer un token temporaire
    const temporaryToken = jwtUtils.generateTemporaryToken(user.id);

    // Associer le token temporaire à l'utilisateur (par exemple, en le stockant dans la base de données)
    user.temporaryPasswordResetToken = temporaryToken;
    user.temporaryPasswordResetExpires = Date.now() + 1800000; // 30 minutes d'expiration

    await user.save();

    // Envoyer un e-mail à l'utilisateur avec un lien de réinitialisation contenant temporaryToken
    // Le lien serait quelque chose comme : http://votresite.com/reset-password?token=temporaryToken

    res.status(200).json({
      message: "Demande de réinitialisation de mot de passe enregistrée",
    });
  },

  // Fonction pour supprimer un utilisateur
  userdelete: async function (req, res) {
    // Code pour supprimer l'utilisateur
    const headerAuth = req.headers["authorization"];
    const userId = jwtUtils.getUserid(headerAuth);

    User.findOne({
      where: { id: userId },
    })
      .then(function (userFound) {
        if (userFound) {
          userFound
            .destroy({
              where: { id: userId },
            })
            .then(function () {
              return res.status(201).json({ message: "Utilisateur supprimé" });
            })
            .catch(function (err) {
              return res
                .status(500)
                .json({ error: "Impossible de supprimer l'utilisateur" });
            });
        } else {
          return res.status(404).json({ error: "L'utilisateur n'existe pas" });
        }
      })
      .catch(function (err) {
        return res
          .status(500)
          .json({ error: "Impossible de vérifier l'utilisateur" });
      });
  },
};
