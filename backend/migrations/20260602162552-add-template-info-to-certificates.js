'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Certificates', 'templateUrl', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Certificates', 'templateFileType', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Certificates', 'config', {
      type: Sequelize.JSON,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Certificates', 'templateUrl');
    await queryInterface.removeColumn('Certificates', 'templateFileType');
    await queryInterface.removeColumn('Certificates', 'config');
  }
};
