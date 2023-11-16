// Définition du modèle User
// version 1.0.0
// Auteur: LENNE Sebastien

"use strict";
const { Model } = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // module basé sur la documentation de sequelize pour les modèles
  class User extends Model {}
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
    },
  );

  return User;
};
module.exports.associate = (models) => {
  // module basé sur la documentation de sequelize pour les relations entre modèles
  const User = models.User;
  const UserInfo = models.UserInfo;

  User.hasMany(UserInfo, {
    foreignKey: "user_id",
    as: "userinfo",
  });
};
