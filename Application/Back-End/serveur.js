const express = require("express");
const bodyParser = require("body-parser");
const apirouter = require("./api/apirouter").router;

const app = express();
const port = 3000;

// Fonction asynchrone pour vérifier la connexion à la base de données

// Middleware pour traiter les requêtes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apirouter);

app.get("/", function (req, res) {
  res.setHeader("content-type", "text/html");
  res.status(200).send("Hello, World!"); // Exemple de réponse HTML
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur Node démarré sur le port ${port}`);
  // Appel de la fonction pour vérifier la base de données
});
