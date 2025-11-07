module.exports = (sequelize, DataTypes) => {
  const InvoiceHistory = sequelize.define("InvoiceHistory", {
    invoiceId: { type: DataTypes.INTEGER, allowNull: false },
    snapshot: { type: DataTypes.JSON, allowNull: false }, // store entire invoice object
    version: { type: DataTypes.INTEGER },
  });

  InvoiceHistory.associate = (models) => {
    InvoiceHistory.belongsTo(models.Invoice, { foreignKey: "invoiceId" });
  };

  return InvoiceHistory;
};
