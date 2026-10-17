"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable("Invoices");
    if (!tableInfo.invoiceDate) {
      await queryInterface.addColumn("Invoices", "invoiceDate", {
        type: Sequelize.DATEONLY,
        allowNull: true,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable("Invoices");
    if (tableInfo.invoiceDate) {
      await queryInterface.removeColumn("Invoices", "invoiceDate");
    }
  },
};
