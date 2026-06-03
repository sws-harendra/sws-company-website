module.exports = (sequelize, Sequelize) => {
  const InvoiceSetting = sequelize.define("InvoiceSetting", {
    gstNumber: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    accountNumber: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    ifsc: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    accountName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return InvoiceSetting;
};
