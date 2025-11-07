module.exports = (sequelize, DataTypes) => {
  const InvoiceDetail = sequelize.define("InvoiceDetail", {
    invoiceId: { type: DataTypes.INTEGER, allowNull: false },
    gstNumber: { type: DataTypes.STRING },
    accountNumber: { type: DataTypes.STRING },
    ifsc: { type: DataTypes.STRING },
    accountName: { type: DataTypes.STRING },
  });

  InvoiceDetail.associate = (models) => {
    InvoiceDetail.belongsTo(models.Invoice, { foreignKey: "invoiceId" });
  };

  return InvoiceDetail;
};
