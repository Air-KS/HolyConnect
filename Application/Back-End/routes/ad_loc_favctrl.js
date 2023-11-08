const { favorites } = require("../Models");
const jwt = require("../utils/jwt");

module.exports = {
  addLocationToFavorites: async (req, res) => {
    // Récupération des données de l'utilisateur
    try {
      console.log("Nouvelle requête de création de lieu.");

      const headerAuth = req.headers["authorization"];
      const userId = jwt.getUserid(headerAuth);

      console.log("ID de l'utilisateur extrait du token :", userId);

      const { homelocationid } = req.body;

      // Vérifiez si un favori existant correspond à cet emplacement et à cet utilisateur
      const existingFavorite = await favorites.findOne({
        where: {
          userid: userId,
          homelocationid: homelocationid,
        },
      });

      if (existingFavorite) {
        // Un favori pour cet emplacement et cet utilisateur existe déjà
        return res
          .status(400)
          .json({
            message:
              "Cet emplacement est déjà dans les favoris de cet utilisateur.",
          });
      }

      // Si aucun favori existant n'a été trouvé, créez-en un nouveau
      const favorites = await favorites.create({
        userId: userId,
        locationId: locationId,
      });

      // Effectuez l'ajout de la location aux favoris ici
      console.log("Location ajoutée aux favoris");
      return res.status(200).json({ message: "Location ajoutée aux favoris" });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};
