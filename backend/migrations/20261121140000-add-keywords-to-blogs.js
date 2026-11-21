"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable("Blogs").catch(() => null);
    if (tableInfo && !tableInfo.keywords) {
      await queryInterface.addColumn("Blogs", "keywords", {
        type: Sequelize.TEXT,
        allowNull: true,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable("Blogs").catch(() => null);
    if (tableInfo && tableInfo.keywords) {
      await queryInterface.removeColumn("Blogs", "keywords").catch(() => {});
    }
  },
};
