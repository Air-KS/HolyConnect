// fichier qui contient la logique des Midlewaqare, permet de lancer le serveur: node serveur.js
// version: 1.0.0
// Auteur: LENNE Sebastien
// Mise à jours, Version: 1.5.2 : ROGERET Kevin

/*
  Mise à jours : [1.5.2]
  Modifi l'ordre des approprié des Middleware
  Ajoute les methods : get, post, put, delete dans le cors
*/

const express = require("express");
const bodyParser = require("body-parser");
const apirouter = require("./Back-End/api/apirouter").router;
const errorHandler = require("./Back-End/config/errorHandler");

const cors = require("cors");

const app = express();
const port = 3000;

// Fonction asynchrone pour vérifier la connexion à la base de données

// Middleware pour ajouter des headers sur les requêtes

// Middleware pour traiter les requêtes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware CORS
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Middleware pour les logs
app.use((req, res, next) => {
  console.log(`Requête reçue: ${req.method} ${req.url}`);
  next();
});

// Middleware pour les routes
app.use("/api", apirouter);

// Middleware pour gérer les erreurs
app.use(errorHandler);

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur Node démarré sur le port ${port}`);
  // Appel de la fonction pour vérifier la base de données
});
