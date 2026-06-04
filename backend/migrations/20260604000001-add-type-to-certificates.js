'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add type column to Certificates
    const tableDescCert = await queryInterface.describeTable('Certificates').catch(() => ({}));
    if (!tableDescCert.type) {
      await queryInterface.addColumn('Certificates', 'type', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Internship Certificate'
      });
    }

    // Add type column to CertificateSettings
    const tableDescSettings = await queryInterface.describeTable('CertificateSettings').catch(() => ({}));
    if (!tableDescSettings.type) {
      await queryInterface.addColumn('CertificateSettings', 'type', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Internship Certificate'
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Certificates', 'type');
    await queryInterface.removeColumn('CertificateSettings', 'type');
  }
};
