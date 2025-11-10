"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Invoices", "gst", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 18,
    });
  },

  async down(queryInterface, Sequelize) {
    // ✅ Rollback logic
    await queryInterface.removeColumn("Invoices", "gst");
  },
};
