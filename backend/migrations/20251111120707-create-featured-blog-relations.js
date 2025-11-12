"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("FeaturedBlogRelations", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      blogId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Blogs",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      featuredBlogId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Blogs",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("FeaturedBlogRelations");
  },
};
