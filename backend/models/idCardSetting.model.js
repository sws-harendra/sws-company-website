module.exports = (sequelize, Sequelize) => {
  const IdCardSetting = sequelize.define("IdCardSetting", {
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

  return IdCardSetting;
};
