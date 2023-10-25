("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class homelocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  homelocation.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      homeID: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "userinfo",
          key: "userId",
        },
      },
      namelocation: DataTypes.STRING,
      infolocation: DataTypes.STRING,
      adresslocation: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "homelocation",
    },
  );
  return homelocation;
};
