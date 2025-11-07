module.exports = (sequelize, DataTypes) => {
  const InvoiceService = sequelize.define("InvoiceService", {
    invoiceId: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    hsnCode: { type: DataTypes.STRING },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    discount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
  });

  InvoiceService.associate = (models) => {
    InvoiceService.belongsTo(models.Invoice, { foreignKey: "invoiceId" });
  };

  return InvoiceService;
};
