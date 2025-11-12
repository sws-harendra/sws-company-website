"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Blogs", "contactus", {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // ✅ Rollback logic
    await queryInterface.removeColumn("Blogs", "contactus");
  },
};
