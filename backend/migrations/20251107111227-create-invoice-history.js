"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("InvoiceHistories", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      invoiceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Invoices", key: "id" },
        onDelete: "CASCADE",
      },
      snapshot: { type: Sequelize.JSON, allowNull: false },
      version: { type: Sequelize.INTEGER },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("InvoiceHistories");
  },
};
