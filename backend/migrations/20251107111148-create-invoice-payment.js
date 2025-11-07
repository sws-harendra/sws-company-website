"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("InvoicePayments", {
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
      modeOfPayment: {
        type: Sequelize.ENUM("cash", "bank_transfer", "upi", "cheque", "other"),
        allowNull: false,
      },
      receivedAmount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      paymentDate: { type: Sequelize.DATEONLY, allowNull: false },
      note: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("InvoicePayments");
  },
};
