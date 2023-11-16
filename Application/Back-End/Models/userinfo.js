"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Userinfo extends Model {
    static associate(models) {
      // define association here
      Userinfo.belongsTo(models.User, {
        // This is the association with the table userinfo
        foreignKey: "userId", // This is the foreign key of the table userinfo
        as: "userinfo", // This is the alias of the table userinfo
      });
    }
  }
  Userinfo.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
      firstname: DataTypes.STRING,
      username: DataTypes.STRING,
      dateofbirth: DataTypes.STRING,
      phonenumber: DataTypes.STRING,
      adress1: DataTypes.STRING,
      adress2: DataTypes.STRING,
      city: DataTypes.STRING,
      zipcode: DataTypes.INTEGER,
      country: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Userinfo",
    },
  );
  return Userinfo;
};
