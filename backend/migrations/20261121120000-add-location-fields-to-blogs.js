"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable("Blogs").catch(() => null);
    if (tableInfo && !tableInfo.is_location_blog) {
      await queryInterface.addColumn("Blogs", "is_location_blog", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      });
    }
    if (tableInfo && !tableInfo.location) {
      await queryInterface.addColumn("Blogs", "location", {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable("Blogs").catch(() => null);
    if (tableInfo && tableInfo.is_location_blog) {
      await queryInterface.removeColumn("Blogs", "is_location_blog").catch(() => {});
    }
    if (tableInfo && tableInfo.location) {
      await queryInterface.removeColumn("Blogs", "location").catch(() => {});
    }
  },
};
