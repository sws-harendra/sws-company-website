"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Contacts", "firstName");
    await queryInterface.removeColumn("Contacts", "lastName");
    await queryInterface.removeColumn("Contacts", "businessName");

    await queryInterface.addColumn("Contacts", "fullname", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Contacts", "fullname");

    await queryInterface.addColumn("Contacts", "firstName", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Contacts", "lastName", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Contacts", "businessName", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
