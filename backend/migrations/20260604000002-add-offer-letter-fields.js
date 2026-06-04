'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Certificates', 'skills', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Certificates', 'desc', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn('Certificates', 'signDate', {
      type: Sequelize.DATEONLY,
      allowNull: true,
    });

    // Make existing fields nullable to support Offer Letters smoothly
    await queryInterface.changeColumn('Certificates', 'endDate', {
      type: Sequelize.DATEONLY,
      allowNull: true,
    });
    await queryInterface.changeColumn('Certificates', 'serialNo', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('Certificates', 'issueDate', {
      type: Sequelize.DATEONLY,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Certificates', 'skills');
    await queryInterface.removeColumn('Certificates', 'desc');
    await queryInterface.removeColumn('Certificates', 'signDate');

    // Note: Reverting back to allowNull: false might fail if there are null rows,
    // so in production down migrations you'd need to handle that.
    await queryInterface.changeColumn('Certificates', 'endDate', {
      type: Sequelize.DATEONLY,
      allowNull: false,
    });
    await queryInterface.changeColumn('Certificates', 'serialNo', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('Certificates', 'issueDate', {
      type: Sequelize.DATEONLY,
      allowNull: false,
    });
  }
};
