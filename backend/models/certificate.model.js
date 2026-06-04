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
      allowNull: true,
    },
    endDate: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    serialNo: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    },
    issueDate: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    skills: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    desc: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    signDate: {
      type: Sequelize.DATEONLY,
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
    type: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Internship Certificate'
    },
  });

  return Certificate;
};
