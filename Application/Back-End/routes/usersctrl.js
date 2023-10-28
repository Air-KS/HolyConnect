// Description: fichier controleur pour les utilisateurs (usersctrl.js)
// Version: 1.0.0
// Auteur: LENNE Sebastien

// Import
const bcrypt = require("bcrypt");
const jwtUtils = require("../utils/jwt");
const { User } = require("../Models");
const db = require("../config/db");
const tokenBlacklist = new Set();

// Constantes de validation
const emailREGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zAZ]{2,}))$/;
const passwordREGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

require("dotenv").config();

module.exports = {
  // fonction d'enregistrement
  register: async function (req, res) {
    try {
      console.log("verificatiom des champs");
      const email = req.body.email;
      const username = req.body.username;
      const password = req.body.password;

      if (!username || !email || !password) {
        return res
          .status(400)
          .json({ error: "Les champs obligatoires sont manquants" });
      }

      if (username.length < 5 || username.length > 15) {
        return res.status(400).json({
          error: "Le nom d'utilisateur doit contenir entre 5 et 15 caractères",
        });
      }

      if (!emailREGEX.test(email)) {
        return res.status(400).json({ error: "Email non valide" });
      }

      if (!passwordREGEX.test(password)) {
        return res.status(400).json({
          error:
            "Afin de mieux proteger vos donnees. Votre mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial. Veuillez réessayer.",
        });
      }

      const userFound = await User.findOne({
        //
        attributes: ["email"],
        where: { email: email },
      });

      if (userFound) {
        return res.status(400).json({ error: "Utilisateur existe deja" });
      }

      const bcryptedPassword = await bcrypt.hash(password, 5);
      const newUser = await User.create({
        email: email,
        username: username,
        password: bcryptedPassword,
      });

      return res.status(201).json({ User_id: newUser.id });
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

  // fonction de connexion
  login: async function (req, res) {
    try {
      console.log("verificatiom des champs");
      const email = req.body.email;
      const password = req.body.password;

      if (!email || !password) {
        return res.status(400).json({ error: "Les paramètres sont manquants" });
      }

      const userFound = await User.findOne({
        where: { email: email },
      });

      if (!emailREGEX.test(email)) {
        return res.status(400).json({ error: "Email non valide" });
      }

      if (!userFound) {
        return res.status(400).json({ error: "utilisateur n'existe pas" });
      }

      const passwordMatch = await bcrypt.compare(password, userFound.password);

      if (!passwordMatch) {
        return res.status(400).json({ error: "Mot de passe incorrect" });
      }

      return res.status(200).json({
        userId: userFound.id,
        token: jwtUtils.generateTokenForUser(userFound),
      });
    } catch (error) {
      console.error("Erreur lors de la connexion de l'utilisateur :", error);
      return errorHandler(res, "Impossible de se connecter");
    }
  },

  //  fonction de mise à jour du profil utilisateur
  UserLogout: async function (req, res) {
    const headerAuth = req.headers["authorization"];

    // Ajoutez le token à la liste noire
    tokenBlacklist.add(headerAuth);

    // Supprimez le cookie contenant le token (si utilisé)
    res.clearCookie("token");

    res.status(200).json({ message: "Déconnexion réussie" });
  },

  // fonction de mise à jour du profil utilisateur
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

  // fonction de mise à jour du mot de passe utilisateur
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
