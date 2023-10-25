"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class notelocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      notelocation.belongsTo(models.homelocation, {
        // This is the association with the table userinfo
        foreignKey: "home_Id", // This is the foreign key of the table userinfo
        as: "notelocation", // This is the alias of the table userinfo
      });
    }
  }
  notelocation.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      locationID: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "homelocations",
          key: "homeID",
        },
      },
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      picture: DataTypes.BLOB,
    },
    {
      sequelize,
      modelName: "notelocation",
    },
  );
  return notelocation;
};
