"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Blogs", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      short_description: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      image_url: {
        type: Sequelize.STRING,
      },
      author: {
        type: Sequelize.STRING,
      },
      published_at: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.ENUM("draft", "published"),
        defaultValue: "draft",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Blogs");
  },
};
