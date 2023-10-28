// Configuration de la connexion à la base de données.
// 1.0.0
// Auteur: LENNE Sebastien

// importation du module sequelize
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "database_hollyconnect_development",
  "root",
  "qwertyseb",
  {
    host: "127.0.0.1",
    port: "3306",
    dialect: "mysql",
    // Autres options de configuration si nécessaires
  },
);

// Vérification de la connexion à la base de données
sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion à la base de données réussie.");
  })
  .catch((err) => {
    console.error("Impossible de se connecter à la base de données :", err);
  });

module.exports = sequelize;
