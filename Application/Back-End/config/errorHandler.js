// errorHandler.js
module.exports = (err, req, res) => {
  console.error(err); // Vous pouvez ajouter une journalisation des erreurs pour le débogage.
  return res.status(500).json({ error: "Une erreur est survenue" });
};
