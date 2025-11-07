module.exports = (sequelize, DataTypes) => {
  const InvoicePayment = sequelize.define("InvoicePayment", {
    invoiceId: { type: DataTypes.INTEGER, allowNull: false },
    modeOfPayment: {
      type: DataTypes.ENUM("cash", "bank_transfer", "upi", "cheque", "other"),
      allowNull: false,
    },
    receivedAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    paymentDate: { type: DataTypes.DATEONLY, allowNull: false },
    note: { type: DataTypes.STRING },
  });

  InvoicePayment.associate = (models) => {
    InvoicePayment.belongsTo(models.Invoice, { foreignKey: "invoiceId" });
  };

  return InvoicePayment;
};
