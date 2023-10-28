"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("locationIDs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      locationID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "homeLocations",
          key: "homeid",
        },
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      coordinates: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("locationIDs");
  },
};
