module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define("Invoice", {
    invoiceId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    companyName: { type: DataTypes.STRING },
    number: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    gstNumber: { type: DataTypes.STRING },
    address: { type: DataTypes.TEXT },
    gst: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 18 },
    discount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
    totalAmount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
    totalReceived: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
    dueAmount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
    status: {
      type: DataTypes.ENUM("draft", "sent", "paid", "partial", "cancelled"),
      defaultValue: "draft",
    },
    version: { type: DataTypes.INTEGER, defaultValue: 1 },
  });

  Invoice.associate = (models) => {
    Invoice.hasMany(models.InvoiceService, {
      foreignKey: "invoiceId",
      as: "services",
    });
    Invoice.hasMany(models.InvoicePayment, {
      foreignKey: "invoiceId",
      as: "payments",
    });
    Invoice.hasMany(models.InvoiceDetail, {
      foreignKey: "invoiceId",
      as: "details",
    });
    Invoice.hasMany(models.InvoiceHistory, {
      foreignKey: "invoiceId",
      as: "histories",
    });
  };

  return Invoice;
};
