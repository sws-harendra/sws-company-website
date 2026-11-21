"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable("Blogs").catch(() => null);
    if (tableInfo && !tableInfo.title_color) {
      await queryInterface.addColumn("Blogs", "title_color", {
        type: Sequelize.STRING(50),
        allowNull: true,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable("Blogs").catch(() => null);
    if (tableInfo && tableInfo.title_color) {
      await queryInterface.removeColumn("Blogs", "title_color").catch(() => {});
    }
  },
};
