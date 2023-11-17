// Importation du module bcrypt pour le hachage des mots de passe
const bcrypt = require("bcrypt");

// Exportation des fonctions utilitaires
module.exports = {
  // Fonction pour hacher un mot de passe
  hashPassword: async (password) => {
    // Définition du nombre de "salts" pour le hachage
    const saltRounds = 10;

    try {
      // Utilisation de la fonction hash de bcrypt pour hacher le mot de passe
      const hash = await bcrypt.hash(password, saltRounds);
      return hash; // Retourne le mot de passe haché
    } catch (error) {
      throw error; // En cas d'erreur, propage l'erreur
    }
  },

  // Fonction pour valider une adresse e-mail
  validateEmail: (email) => {
    // Expression régulière pour la validation d'une adresse e-mail
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3.[0-9]{1,3.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    // Teste l'adresse e-mail par rapport à l'expression régulière
    return emailRegex.test(email);
  },
};
