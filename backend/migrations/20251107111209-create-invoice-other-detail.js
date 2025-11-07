"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("InvoiceDetails", {
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
      gstNumber: { type: Sequelize.STRING },
      accountNumber: { type: Sequelize.STRING },
      ifsc: { type: Sequelize.STRING },
      accountName: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("InvoiceDetails");
  },
};
