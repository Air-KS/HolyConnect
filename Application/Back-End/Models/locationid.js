"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class locationID extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      locationID.belongsTo(models.homelocation, {
        // This is the association with the table userinfo
        foreignKey: "homelocation_id", // This is the foreign key of the table userinfo
        as: "locationID", // This is the alias of the table userinfo
      });
    }
  }
  locationID.init(
    {
      name: DataTypes.STRING,
      coordinates: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "locationID",
    },
  );
  return locationID;
};
