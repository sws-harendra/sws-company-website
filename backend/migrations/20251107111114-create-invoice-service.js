"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("InvoiceServices", {
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
      description: { type: Sequelize.STRING, allowNull: false },
      hsnCode: { type: Sequelize.STRING },
      amount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      discount: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0.0 },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("InvoiceServices");
  },
};
