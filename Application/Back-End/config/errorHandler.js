// errorHandler.js
// 1.0.0
// Auteur: LENNE Sebastien
//
// Gestionnaire d'erreurs global

module.exports = (err, req, res) => {
  console.error(err);
  return res.status(500).json({ error: "Une erreur est survenue" });
};
