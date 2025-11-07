"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Invoices", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      invoiceId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      companyName: { type: Sequelize.STRING },
      number: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      gstNumber: { type: Sequelize.STRING },
      address: { type: Sequelize.TEXT },
      discount: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0.0 },
      totalAmount: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0.0 },
      totalReceived: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0.0 },
      dueAmount: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0.0 },
      status: {
        type: Sequelize.ENUM("draft", "sent", "paid", "partial", "cancelled"),
        defaultValue: "draft",
      },
      version: { type: Sequelize.INTEGER, defaultValue: 1 },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Invoices");
  },
};
