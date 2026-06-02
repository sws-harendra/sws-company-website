module.exports = (sequelize, Sequelize) => {
  const CertificateSetting = sequelize.define("CertificateSetting", {
    templateUrl: {
      type: Sequelize.STRING(1000),
      allowNull: true,
    },
    templateFileType: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    config: {
      type: Sequelize.JSON,
      allowNull: true,
    },
  });

  return CertificateSetting;
};
