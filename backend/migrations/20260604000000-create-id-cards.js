'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableExists = await queryInterface.tableExists('idCards');
    if (!tableExists) {
      await queryInterface.createTable('idCards', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: Sequelize.STRING, allowNull: false },
        role: { type: Sequelize.STRING, allowNull: false },
        idNumber: { type: Sequelize.STRING, allowNull: false, unique: true },
        bloodGroup: { type: Sequelize.STRING, allowNull: true },
        phone: { type: Sequelize.STRING, allowNull: true },
        email: { type: Sequelize.STRING, allowNull: true },
        issueDate: { type: Sequelize.DATEONLY, allowNull: false },
        photoUrl: { type: Sequelize.STRING, allowNull: true },
        templateUrl: { type: Sequelize.STRING, allowNull: true },
        templateFileType: { type: Sequelize.STRING, allowNull: true },
        config: { type: Sequelize.JSON, allowNull: true },
        createdAt: { type: Sequelize.DATE, allowNull: false },
        updatedAt: { type: Sequelize.DATE, allowNull: false },
      });
    }

    const settingsTableExists = await queryInterface.tableExists('idCardSettings');
    if (!settingsTableExists) {
      await queryInterface.createTable('idCardSettings', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        templateUrl: { type: Sequelize.STRING, allowNull: true },
        templateFileType: { type: Sequelize.STRING, allowNull: true },
        config: { type: Sequelize.JSON, allowNull: true },
        createdAt: { type: Sequelize.DATE, allowNull: false },
        updatedAt: { type: Sequelize.DATE, allowNull: false },
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('idCardSettings');
    await queryInterface.dropTable('idCards');
  }
};
