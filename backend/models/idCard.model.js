module.exports = (sequelize, Sequelize) => {
  const IdCard = sequelize.define("IdCard", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    idNumber: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    bloodGroup: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    issueDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    photoUrl: {
      type: Sequelize.STRING,
      allowNull: true,
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

  return IdCard;
};
