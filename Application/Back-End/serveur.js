const express = require("express");
const bodyParser = require("body-parser");
const apirouter = require("./api/apirouter").router;
const cors = require("cors");

const app = express();
const port = 3000;

// Fonction asynchrone pour vérifier la connexion à la base de données

// Middleware pour ajouter des headers sur les requêtes

// Middleware pour traiter les requêtes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware pour les routes
app.use("/api", apirouter);
app.use(cors());

// Middleware pour gérer les erreurs
app.use(errorHandler);

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur Node démarré sur le port ${port}`);
  // Appel de la fonction pour vérifier la base de données
});
