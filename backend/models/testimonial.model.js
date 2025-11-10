"use strict";
module.exports = (sequelize, DataTypes) => {
  const Testimonial = sequelize.define(
    "Testimonial",
    {
      client_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      client_position: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "testimonials",
      timestamps: true,
    }
  );

  return Testimonial;
};
