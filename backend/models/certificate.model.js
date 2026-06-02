module.exports = (sequelize, Sequelize) => {
  const Certificate = sequelize.define("Certificate", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    startDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    serialNo: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    issueDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    templateUrl: {
      type: Sequelize.STRING,
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

  return Certificate;
};
